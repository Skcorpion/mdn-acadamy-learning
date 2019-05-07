/* async and defer

<script defer src="js/vendor/jquery.js"></script>

<script defer src="js/script2.js"></script>

<script defer src="js/script3.js"></script> 

If your scripts don't need to wait for parsing and can 
run independently without dependencies, then use async.

_____________________________________________________

Handling text
----------------
window.prompt
window.alert
*/

button.onclick = function() {
    var name = prompt('What is your name?');
    alert('Hello ' + name + ', nice to see you!');
  }

/* The Number object */
var myString = '123';
var myNum = Number(myString);

/* every number has a method called toString() */
var myNum = 123;
var myString = myNum.toString();

/* __________________________________________________

Useful string methods
-------------------------
Strings as objects

We've said it before, and we'll say it again — everything is an object in JavaScript
--------------------------
The length property. */
var browserType = 'mozilla';
browserType.length;

/* --------------------------
Finding a substring inside a string and extracting it

indexOf() method, which takes a single parameter — the substring you want to search for:
*/
browserType.indexOf('vanilla');
/* This should give you a result of -1 — this is returned when the substring, 
in this case 'vanilla', is not found in the main string. */
if(browserType.indexOf('mozilla') !== -1) {
    // do stuff with the string
  }

  browserType.slice(0,3);
  browserType.slice(2);

/* ---------------------------------
Changing case */
var radData = 'My NaMe Is MuD';
radData.toLowerCase();
radData.toUpperCase();

/* ----------------------------------
Updating parts of a string */
browserType.replace('moz','van');

/* _________________________________________
Arrays 
-------------------
Some useful array methods

------------------------

Converting between strings and arrays

split() method */
var myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
var myArray = myData.split(',');

/* join() method */
var myNewString = myArray.join(',');
/* toString() method */
var dogNames = ['Rocket','Flash','Bella','Slugger'];
dogNames.toString(); //Rocket,Flash,Bella,Slugger

/*------------------------------------
 Adding and removing array items 

 push(), pop(), unshift(), shift() methods */
 myArray.push('Cardiff');
 myArray.pop();
 