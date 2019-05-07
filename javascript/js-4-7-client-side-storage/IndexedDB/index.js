// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// Create an instance of a db object for us to store the open database in
let db;


window.onload = function() {
    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request =  window.indexedDB.open('notes', 1);
    /* to handle this in IndexedDB, you create a request object.
    You then use event handlers to run code when the request 
    completes, fails, etc., which you'll see in use below.*/

    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
        console.log('Database failed to open');
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
        console.log('Database opened successfully');

        // store the opened database object in the db variable. This is used a lot below
        db = request.result;

        // run the displayData() function to display the notes already in the IDB
        displayData();
    };



    /* The most important event handler for setting up the database: 
    request.onupdateneeded. This handler runs if the database has not 
    already been set up, or if the database is opened with a bigger 
    version number than the existing stored database */

    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function(e) {
        // drab a reference to the opened database
        let db = e.target.result;

        /* create an objectStore to store our notes in (basically 
        like a single table) including a auto-incrementing key */
        let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });

        // define what data items the objectStore will contain
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');

        /* database schema:
            {
                title: "Buy milk",
                body: "Need both cows milk and soya.",
                id: 8
            } 
        */
    };

    // Adding data to the database

    // when the form is submitted the addData() function is run
    form.onsubmit = addData;

    // define the addData() function
    function addData(e) {
        /* prevent default - we don't want the form to submit in the conventional way 
        (this would cause a page refresh and spoil the experience) */
        e.preventDefault(); 

        // grab the values and store them in an object ready for being inserted into the DB
        let newItem = { title: titleInput.value, body: bodyInput.value };

        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['notes'], 'readwrite');

        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('notes');

        // make a request to add our newItem object to the object store
        var request = objectStore.add(newItem);
        request.onsuccess = function() {
            // clear the form, ready for adding the next entry
            titleInput.value = '';
            bodyInput.value = '';
        };

        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');

            // update the display of data to show the newly added item, by running displayData() again.
            displayData();
        };

        transaction.onerror = function() {
            console.log('Transaction not opened due to error');
        };
    }

    // Displaying the data

    // define the displayData() function
    function displayData() {
        // here we empty the contents of the list element each time the display is updated
        // if you didn't do this, you'd get duplicates listed each time a new note is added
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        /* open our object store and then get a cursor - which 
        iterates through all the different data items in the store */
        let objectStore = db.transaction('notes').objectStore('notes');
        /* the next step is to use IDBObjectStore.openCursor() method to 
        open a request for a cursor — this is a construct that can be 
        used to iterate over the records in an object store */
        objectStore.openCursor().onsuccess = function(e) {
            // get a reference to the cursor
            let cursor = e.target.result;

            /* if there is still another daat item to iterate 
            through, keep running this code */
            if(cursor) {
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                // put the data from the cursor
                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                // store the ID (useful later)
                listItem.setAttribute('data-note-id', cursor.value.id);

                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';

                // run deleteItem() function
                deleteBtn.onclick = deleteItem;

                // iterate to the next item in the cursor
                cursor.continue();
                /* when there are no more records to iterate over, cursor 
                will return undefined, and therefore the else block will run */
            } else {
                // if list item is empty
                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.';
                    list.appendChild(listItem);
                }
                // if there are no more cursor items to iterate through
                console.log('Notes all displayed');
            }
        };
    }

    // Deleting a note
    
    // define the deleteItem() function
    function deleteItem(e) {
        /* retrieve the name of the task we want to delete. 
        We need to convert it to a number before trying it 
        use it with IDB; IDB keyvalues are type-sensitive.*/
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

        /* open a database transaction and delete the task, 
        finding it using the id we retrieved above */
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.delete(noteId);

        // report that the data item has been deleted
        transaction.oncomplete = function() { 
            /* delete the parent of the button which is 
            the list item, so it is no longer displayed */
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Note ' + noteId + ' deleted.');

            // Again, if list item is empty, display a 'No notes stored' message
            if(!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
        };
    } 
};
