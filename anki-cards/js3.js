// Object basics

let person = {
    name: { // object inside object
        first: 'Roms', 
        last: 'Alex'
    },
    age: 26,
    gender: 'male',
    interests: ['programming','music'],
    bio: function() { // this. = person.
        alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
    },
    greeting: function() {
        alert('Hi! I\'m ' + this.name.first + '.');
    }
};

//---------------------
// Add name & value 

let myDataName = 'height';
let myDataValue = '1.78m';
person[myDataName] = myDataValue;

// Retrieving (or getting) object members
// person.name.first -same- person['name']['first']
person.interests[0]
person.bio()

// Set (update)
person.age = 45;
person['name']['last'] = 'Bober';

// Create completely new members
person['eyes'] = 'blue';
person.farewell = function() { alert('Bye everybody!'); }

/* __________________________________________

Object-oriented JavaScript for beginners

!Process of creating an object instance from a class is called instantiation
*/
// Constructor functions
       // A constructor function name usually starts with a capital letter
       function Person(name) {
           this.name = name;
           this.greeting = function() {
              alert('Hi! I\'m ' + this.name + '.');
           };
       }

       // now create a new person by calling this function
       let slava = new Person('Slava');
       let person1 = new Person('Vladik');
       let person2 = new Person('Mamon');

//-----------------------------------------------------

        // creating our finished constructor
        function Person(first, last, age,
		gender, interests) {
            this.name = {
                'first' : first,
                'last' : last
            };
            this.age = age;
            this.gender = gender;
            this.interests = interests;
            this.bio = function() {
            // first part of text
            let string = this.name.first + 
			' ' + this.name.last + 
			' is ' + this.age + ' years old. ';
            // add pronoun
            let pronoun;
             if (this.gender === 'male') {
               pronoun = 'He likes ';
             } else if (this.gender === 'female') {
               pronoun = 'She likes ';
             } else {
               pronoun = 'They likes ';
             };
 
             string += pronoun;
 
             // check interests length
             if (this.interests.length === 1) {
               string += this.interests[0] + '.'; 
             } else if (this.interests.length === 2) {
               string += this.interests[0] + ' and ' 
			   + this.interests[1] + '.';
             } else {
               // if more the 2 create loop 
               for (let i = 0; i < this.interests.length; i++) {
                 // for last element
                 if (i === this.interests.length - 1) {
                   string += 'and ' + this.interests[i] + '.';
                 // and all else 
                 } else {
                   string += this.interests[i] + ', ';
                 }
               }
             }
             // finally
             alert(string);
            };
            this.greeting = function() {
             alert('Hi! I\'m ' + 
			    this.name.first + '.');
            };
        }
 
        // create an object instance
        let person1 = new Person('Jeremy', 
		'Sibu', 32, 'identitys', ['anime']);

//-------------------------------------------------------------
// Other ways to create object instances

      // The Object() constructor
      let person2 = new Object();
	  
      // add properties and methods
      person2.name = 'Chris';
      person2['age'] = 38;
      person2.greeting = function() {
        alert('Hi! I\'m ' + this.name + '.');
      };
	  
      /* You can also pass an object 
	  literal to the Object() constructor 
	  as a parameter */
      let person3 = new Object({
      name: 'Chris',
      age: 38,
      greeting: function() {
        alert('Hi! I\'m ' + this.name + '.');
      }
    });


// Using the create() method
let person4 = Object.create(person1); // You'll see that person4 has been created based on person1

// The Constructor property 
let person5 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['playing drums', 'mountain climbing']);
/*You won't need to use it often, but it can be really useful when you want to create a new instance 
and don't have a reference to the original constructor easily available for some reason. 


________________________________________________________________________________________

Prototypes
---------------------------------
The prototype property: Where inherited members are defined:
    So Object.prototype.watch(), Object.prototype.valueOf(), etc., are available to any 
    object types that inherit from Object.prototype, including new object instances created 
    from the Person() constructor.

    Object.is(), Object.keys(), and other members not defined inside the prototype bucket are 
    not inherited by object instances or object types that inherit from Object.prototype. They 
    are methods/properties available just on the Object() constructor itself.

---------------------------------
Modifying prototypes

    adds a new method to the constructor's prototype property: */
Person.prototype.farewell = function() {
    alert(this.name.first + ' has left the building. Bye for now!');
  };

  /* ________________________________________________
  Inheritance
*/
  // Defining a Teacher() constructor function
      // create a Teacher() constructor
      function Teacher(first, last, age, gender, interests, subject) {
          Person.call(this, first, last, age, gender, interests); // The first parameter specifies the value of "this" that you want to use when running the function

          this.subject = subject;
      };
      // Setting Teacher()'s prototype and constructor reference
      /* Here our friend create() comes to the rescue again. In this case we are using it to create a new object and make it the value 
      of Teacher.prototype. The new object has Person.prototype as its prototype and will therefore inherit, if and when needed, 
      all the methods available on Person.prototype. */
      Teacher.prototype = Object.create(Person.prototype);
      Teacher.prototype.constructor = Teacher; // new ?

      // Giving Teacher() a new greeting() function
      Teacher.prototype.greeting = function() {
        alert(this.name.first + ' has left the building. Bye for now!');
      }


/* ---------------------------------------------------
*/
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);

    this.color = 'white';
    this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
let evil = new EvilCircle(100, 100, true);

/* -------------------------------------------
ECMA Script
*/
class Person {
    constructor(first, last, age, gender, interests) {
        this.name = {
            first,
            last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
    }

    greeting() {
        console.log(`Hi! I'm ${this.name.first}`);
    };

    farewell() {
        console.log(`${this.name.first} has left the building. Bye for now!`);
    };

}
// Creating a subclass or subclassing - Teacher()
      // +extends keyword

      class Teacher extends Person {
        constructor(first, last, age, gender, interests, subject, grade) { //To call the parent constructor we have to use the super() operator
            super(first, last, age, gender, interests);  // Now `this` is intialized by calling the parent constructor.
            /* Since the super() operator is actually the parent class constructor, passing it the necessary 
            arguments of the Parent class constructor will also initialize the parent class properties in 
            our sub-class, thereby inheriting it */
            this._subject = subject;
            this.grade = grade;
        }

        // Getter and Setter
        get subject() {
          return this._subject;
        }

        set subject(newSubject) {
          this._subject = newSubject;
        }
    }

    /* ____________________________________________
    JSON

        1. JSON is purely a data format — it contains only properties, no methods.
        2. "" - work, '' - don't
        3. Even a single misplaced comma or colon can cause a JSON file to go wrong!
        4. Unlike in JavaScript code in which object properties may be unquoted, in JSON, 
        only quoted strings may be used as properties. 
        5. JSON can actually take the form of any data type that is valid for inclusion inside JSON, 
        not just arrays or objects. So for example, a single string or number would be a valid JSON object.*/

        var superHeroes = {
            "squadName" : "Super hero squad",
            "homeTown" : "Metro City",
            "formed" : 2016,
            "secretBase" : "Super tower",
            "active" : true,
            "members" : [
              {
                "name" : "Molecule Man",
                "age" : 29,
                "secretIdentity" : "Dan Jukes",
                "powers" : [
                  "Radiation resistance",
                  "Turning tiny",
                  "Radiation blast"
                ]
              },/*....*/
            ]
        }