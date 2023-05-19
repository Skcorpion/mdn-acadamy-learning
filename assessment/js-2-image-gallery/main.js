var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */

  for (let i = 1; i < 6; i++) {
  var newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic' + [i] + '.jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = function(e) {
    let imgSrc = e.target.getAttribute('src');
    displayImage(imgSrc);
  }
}
  function displayImage(imgSrc) {
    displayedImage.setAttribute('src', imgSrc);
  }
  /*newImage.onclick = function() {
    displayedImage.setAttribute('src', 'images/pic' + [i] + '.jpg');
  } */


/* Wiring up the Darken/Lighten button */

btn.onclick = function() {
  if (btn.getAttribute('class') === 'dark') {
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
  } else {
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
  }
}