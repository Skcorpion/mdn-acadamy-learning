// just code
var select = document.querySelector('select');
var list = document.querySelector('ul');
var h1 = document.querySelector('h1');

select.onchange = function() {
  var choice = select.value;

  // ADD CONDITIONAL HERE
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

/* Alternative solution

 select.onchange = function() {
 var choice = select.value;
 var days = 31;
 if(choice === 'February') {
 days = 28;
 } else if(choice === 'April' || choice === 'June' || choice === 'September'|| choice === 'November') {
 days = 30;
 }

 createCalendar(days, choice);
} */

function createCalendar(days, choice) {
  list.innerHTML = '';
  h1.textContent = choice;
  for (var i = 1; i <= days; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = i;
    list.appendChild(listItem);
  }
}

createCalendar(31,'January');