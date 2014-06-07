// You'll need to set your breed and gender variables as you want them.

// -- Breed --

// Breed is from 1 to 10.
// Set the appropriate number for the dragon you want.

// +-----+--------------+
// | No. | Dragon       |
// +-----+--------------+
// | 1   | Fae          |
// | 2   | Guardian     |
// | 3   | Mirror       |
// | 4   | Pearlcatcher |
// | 5   | Ridgeback    |
// | 6   | Tundra       |
// | 7   | Spiral       |
// | 8   | Imperial     |
// | 9   | Snapper      |
// | 10  | Wildclaw     |
// +-----+--------------+

// Default is 1 (Fae).

var breed = 6

// -- Gender --

// Gender is from 1 to 2.
// Set the appropriate number for the dragon you want.

// +-----+--------------+
// | No. | Gender       |
// +-----+--------------+
// | 1   | Male         |
// | 2   | Female       |
// +-----+--------------+

// Default is 1 (Male).

var gender = 1

// -- The Script --

// Please don't fiddle with anything below this point!
// The script though is fully commented.
// I've tried my best to explain how it works.

// ==UserScript==

// @name        FlightRising Auto-Selector
// @description Automatically selects a breed/gender for previewing.
// @namespace   Wulf
// @version     003

// @include     http://flightrising.com/*
// @include     https://flightrising.com/*
// @exclude     http://flightrising.com/main.php?p=ah&tab=dragons
// @exclude     https://flightrising.com/main.php?p=ah&tab=dragons
// @exclude     http://flightrising.com/main.php?p=search&search=dragon
// @exclude     https://flightrising.com/main.php?p=search&search=dragon

// ==/UserScript==

// Here we find the two dropdowns we need and store them in variables.

var b_select = document.getElementsByName( "breed" )  // Breed dropdown.
var g_select = document.getElementsByName( "gender" ) // Gender dropdown.

// We're encapsulating our script in a function so that it can be called at any time.
// The reason for this is explained below.

function set_stuff ( ) {

  // The first check is to make sure that the breed dropdown exists.
  // The second check is to make sure that the dropdown is set to 'Select Breed:' specifically.
  // The reason for the second check is so that it doesn't reset the dropdown if a new selection is made manually by the user.
  // We only want the change to occur if no breed has been selected yet.

  if ( b_select[0] && b_select[0].selectedIndex === 0 ) {

    // Here we set the two dropdowns to their correct values based upon the variables above.

    b_select[0].selectedIndex = breed
    g_select[0].selectedIndex = gender

    // This is a function used by the Flight Rising site itself. It's called once selections are made.
    // This is another reason for the checks, so we don't call this function recklessly.
    // The purpose of this function is to provide hte preview based upon the dropdown choices.

    imageSet( )
  }

}

// Due to the way the previews are designed, the only way I can think of altering the dropdowns is checking intermittently on a schedule.
// There may be another way to do this, but for now, considering the light nature of the script, this is fine.

setInterval( set_stuff, 1000 )

// And that's it!