/* var myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!'; */

// change image in one click
var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/balloon-sq1.jpg') {
      myImage.setAttribute ('src','images/balloon-sq2.jpg');
    } else {
      myImage.setAttribute ('src','images/balloon-sq1.jpg');
    }
}

// storing button and heading inside the variables
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

// set the personalized greeting
function setUserName() {
    var myName = prompt('Please enter your name.'); //prompt - function like alert, but asks the user to enter some data
    localStorage.setItem('name', myName); // API called localStorage, to store data in the browser
    // We use localStorage's setItem() function to create and store a data item called 'name'
    myHeading.textContent = 'Mozilla is cool, ' + myName;
  }

//(!logical NOT) to check whether the 'name' data exists. If not, the setUserName() function is run to create it
if(!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

myButton.onclick = function() {
    setUserName();
  }