/* Conditions 
---------------------
if (condition) {
  code to run if condition is true
} else {
  run some other code instead
}
---------------------
Switch */
select.onchange = function() {
var choice = select.value;
  var days = 31;
  switch(choice){
	case 'April':
	case 'June':
	case 'September':
	case 'November':
	days = 30;
	break;

	case 'February':
	days = 28;
	break;
}
  createCalendar(days, choice); 
}
// -----------------------------
// ternary operator
// ( condition ) ? run this code : run this code instead
let greeting = ( isBirthday ) ? 'Happy birthday Mrs. Smith — we hope you have a great day!' : 'Good morning Mrs. Smith.';

/*__________________________________________________
Loop

--------------------------
for (initializer; exit-condition; final-expression) {
  // code to run
}
--------------------------
Exiting loops with break */

for (let i = 0; i < contacts.length; i++) {
    let splitContacts = contacts[i].split(':');
    if (splitContacts[0] === searchName) {
        paraSec.textContent = splitContacts[0] + '\'s number is ' + splitContacts[1] + '.';
        break;
    } else {
        paraSec.textContent = 'Contact not found.';
    }
}

/* -----------------------
Skipping iteration with continue */

for (let i = 1; i <= num; i++) {
    let sqRoot = Math.sqrt(i);
    if (Math.floor(sqRoot) !== sqRoot) {
        continue;
    }

    paraCon.textContent += i + ' ';
}
/* -----------------------------
while and do ... while

------------
initializer
while (exit-condition) {
  // code to run

  final-expression
}
------------
initializer
do {
  // code to run

  final-expression
} while (exit-condition)


___________________________________________
Functions

The distinction is that methods are functions defined inside objects. 
Built-in browser functions (methods) and variables (which are called properties) 
are stored inside structured objects, to make the code more efficient and easier to handle.
------------------------
Function scope 

*/
function myBigFunction() {
    var myValue = 1;

    subFunction1(myValue);
    subFunction2(myValue);
    subFunction3(myValue);
}

function subFunction1(value) {
    console.log(value);
}
// ... etc.

/* Invoking functions 
to actually use a function after it has been defined, you've got to run — or invoke — it*/
function myFunction() {
    alert('hello');
  }
  
  myFunction()

// Anonymous functions

myButton.onclick = function() {
    alert('hello');
  }

  /*_____________________________
  Build your own function */
  function displayMessage(msgText, msgType) {
      //....
      let msg = document.createElement('p');
          msg.textContent = msgText; //'This is a message box';
          panel.appendChild(msg);
      //....
      if (msgType === 'warning') {
        // some code
    } else if (msgType === 'chat') {
        //some code
    } else {
        //some code
    }
  }

  btn.onclick = function() {
    displayMessage('Woo, this is a different message!');
    displayMessage('Your inbox is almost full — delete some mails', 'warning');
  }

  /* ______________________
  Function return value 
  */
 function rundomNumber(number) {
    return Math.floor(Math.random()*number);
}
/* ---------------------
 interesting condition */
 input.onchange = function() {
    let num = input.value;
    if (isNaN(num)) {
        para.textContent = 'You need to enter a number!';
    } else {
        // some code
    } }

/* _____________________________
Intro to events 

*/
let buttons = document.querySelectorAll('button'); //qSAll - for many button at the time

/* ------------------
e.target
*/
function bgChange(e) { // меняет кнопки цвет
    let rndCol = 'rgb(123,23,240)';
/*document.body.*/e.target.style.backgroundColor = rndCol;
    console.log(e); // event object
}
//---------------------
// new addEventListener
    // Document Object Model (DOM) Level 2 Events Specification
    btn.addEventListener('click',bgChange);
    btn.removeEventListener('click',bgChange);
// Second, you can also register multiple handlers for the same listener
   /* myElement.addEventListener('click', functionA);
    myElement.addEventListener('click', functionB); */

//it is perfectly appropriate to put all the code inside the addEventListener() 
    //function, in an anonymous function

   /* btn.addEventListener('click', function() {
      let rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
      document.body.style.backgroundColor = rndCol;
    }); */

// -----------------------------------------------------------------------------
// .onclick
for ( let i = 1; i < buttons.length ; i++) {
    buttons[i].onclick = bgChange;
  }
  

  //btn.onclick = bgChange;
  //btn.onfocus = bgChange;
  //btn.onblur = bgChange;
  //btn.ondblclick = bgChange;
  //window.onkeypress = bgChange; only work on window. (press any key)
  //window.onkeyup = bgChange;   (when you press key)
  //window.onkeydown = bgChange; (when you let off key)
  //btn.onmouseover = bgChange;
  //btn.onmouseout = bgChange;


//---------------------------------
// Prevent default behaviours
form.onsubmit = function(e) { // event
    if (fname.value === '' || lname.value === '') {
        e.preventDefault(); // prevent submit
        para.textContent = 'You need to fill in both names!';
        }
    }

// ----------------------------------
// Bubbling-cupture problem
video.onclick = function(e) {
    e.stopPropagation(); // fix 
    video.play();
  };

// -----------------------------------
// e-target

var divs = document.querySelectorAll('div');
      for(var i = 0; i < divs.length; i++) {
        divs[i].onclick = function(e) {
          e.target.style.backgroundColor = bgChange();
        }
      }