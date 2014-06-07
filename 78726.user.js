// ==UserScript==
// @name           Scopes and how they work in JavaScript
// @namespace      http://userscripts.org/users/23652
// @description    An example of scopes in JavaScript
// @include        http://*.google.*/*
// @include        http://google.*/*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

// set up

var main_room = function(i) {

var floor_color = "green"; // private variable, only accessible through get_floor_color()

this.get_floor_color = function() {
return floor_color;
};

this.item = i;

this.room_1 = function(i) {
this.room1 = i;
};

this.room_2 = function(i) {
this.room2 = i;
};

this.room_3 = function(i) {
this.room3 = i;
};

return this.item;

};


// execution

var mainRoom = new main_room("sandcastle"); // a sandcastle is in the main room
	mainRoom.room_1("truck"); // a truck is in room 1
	mainRoom.room_2("car"); // a car is in room 2
	mainRoom.room_3("book"); // a book is in room 3

try { // just so we don't get an error in this example

// here is the test section of the script. i will explain how to grab stuff,
//		how not to, and what it returns
// the format follows the line below
//		our goal
//		item
//		explanation (optional)
item; // get the main room item
	  // undefined
	  // variable doesn't exist in global scope
mainRoom.item; // get the main room item
			   // sandcastle
			   // accessed the item property of the object itself, so it works
room2; // get the room 2 item
       // undefined
	   // variable doesn't exist in global scope
mainRoom.room2; // get the room 2 item
                // car
				// accessed the item property of the object itself set by the func earlier, so it works
floor_color; // get floor color from global scope
			 // undefined
			 // variable doesn't exist in global scope
mainRoom.floor_color; // get floor color from the mainRoom scope
					  // undefined
					  // not a property of the object, it's a private variable
mainRoom.get_floor_color(); // get floor color from the get_floor_color func to return a private variable
							// green
							// used a safe func created by the object to return its own private variable

} catch(e) {}