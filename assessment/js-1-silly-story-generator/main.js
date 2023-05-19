// COMPLETE VARIABLE AND FUNCTION DEFINITIONS

var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)]; // floor round to down (0.9 = 0, 1.7 = 1, 2.9 = 2)
}

// RAW TEXT STRINGS

let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
let insertX = ['Willy the Goblin', 'Big Daddy', 'Father Christmas'];
let insertY = ['the soup kitchen', 'Disneyland', 'the White House'];
let insertZ = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

// EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  // declare variables
  let newStory = storyText; // so we don't rewrite original text
  let xItem = randomValueFromArray(insertX); // pick random value from array
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // replace
  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':inserty:',yItem);
  newStory = newStory.replace(':insertz:',zItem);

  if(customName.value !== '') {
    var name = customName.value;
    newStory = newStory.replace('Bob',name); // replace Bob with custom name

  }

  // convert the weight and temperature
  if(document.getElementById("uk").checked) {
    var weight = Math.round(300 / 14) + ' stones';
    var temperature =  Math.round((94 - 32) * 5 / 9 ) + ' centigrade';
    newStory = newStory.replace('300 pounds',weight);
    newStory = newStory.replace('94 fahrenheit',temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}