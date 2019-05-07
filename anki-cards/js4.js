/* DOM
-----------------------------------------
 Document.querySelector() is the recommended modern approach, which is convenient 
        because it allows you to select elements using CSS selectors. */
        let link = document.querySelector('a');
        // store first <a>

// querySelectorAll store referance to all <a> elements in array-like object called NodeList

/* Old alternative querySelector:
         Document.getElementById('myId')
         Document.getElementsByTagName('a') 
--------------------------------------------*/

// document.href & document.textContent
link.textContent = 'Mozilla Developer Network';
link.href = 'https://developer.mozilla.org';

/* ------------------------------------------
Creating and placing new nodes */

let sect = document.querySelector('section');
let para = document.createElement('p');
para.textContent = 'We hope you enjoyed the ride.';
sect.appendChild(para);

//let's add a text node to the paragraph the link sits inside, to round off the sentence nicely
//create the text node using Document.createTextNode()
let text = document.createTextNode(' — the premier source for web development knowledge.');
let linkPara = document.querySelector('p');
linkPara.appendChild(text);

// -----------------------------------
// Node.cloneNode()
let clonePara = para.cloneNode(true);
sect.appendChild(clonePara);

// --------------------------------
 // Moving and removing elements

sect.appendChild(linkPara); // move down
sect.removeChild(LinkPara); // remove
// if you don't know the parent
linkPara.parentNode.removeChild(linkPara); // remove itself


//------------------------------------
// Manipulating styles

// HTMLElement.style
para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';
//! [in JS]backgroundColor versus [in CSS]background-color


// Other way to style (using css)

Para.setAttribute('class', 'highlight');

/* ____________________________________________________
Fetching data from server

Simple examples
XMLHttpRequest */
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.onload = function() {
    poemDisplay.textContent = request.response;
};
request.send();
/* fetch
.then() method is a part of Promises, a modern JavaScript feature 
for performing asynchronous operations. */
fetch(url).then(function(response){
    return response.text();
}).then(function(text) {
    poemDisplay.textContent = text;
});
// another fetch(works the same)
fetch(url).then(function(response) { 
    response.text().then(function(text) { 
        poemDisplay.textContent = text; 
    });
});

// Difficult exampels
// First
function fetchBlob(product) {
    /* construct the URL path to the image 
	file from the product.image property */
    var url = 'images/' + product.image;
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';
    request.onload = function() {
      if (request.status === 200) {
        let objectURL = URL.createObjectURL
		(request.response);
        showProduct(objectURL, product);
      } else {
        console.log('Network request for "' 
		+ product.name + '" image failed with response ' 
		+ request.status + ': ' + request.statusText);
      }
    }
    request.send();
  }
// Second
function fetchBlob(product) {

    var url = 'images/' + product.image;
    fetch(url).then(function(response) {
        if(response.ok) {
          response.blob().then(function(blob) {
            /* Convert the blob to an object URL —
			this is basically an temporary internal URL
            that points to an object stored inside the 
			browser*/
            var objectURL = URL.createObjectURL(blob);
            // invoke showProduct
            showProduct(objectURL, product);
          });
        } else {
          console.log('Network request for "' 
		  + product.name + '" image failed with response ' 
		  + response.status + ': ' + response.statusText);
        }
      });
    }