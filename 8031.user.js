// ==UserScript==
// @name           RTA Trip Planner - Set Defaults
// @author         Mike Harris <mikeharris19@gmail.com>
// @description    This Greasemonkey userscript allows you to customize the default values present when you visit the (northern Illinois) Regional Transportation Authority's online Trip Planner.  This allows you to get in and out of there much more quickly.
// @include        http://tripsweb.rtachicago.com/
// ==/UserScript==

// In these fields, put in the address (in "2") and city (in "3") that you want to be set as your default.
// If you don't want this script to set a default, either remove these lines or type two slashes and a space
// before the line.  Don't forget that the TripPlanner is very finicky about address format: the street
// direction is just a single capital letter, and the street type (St, Ave, etc.) doesn't have a period.

document.forms[0].elements[2].value = "Your Desired Default Address";
document.forms[0].elements[3].value = "Chicago";

// In this field, put in the default city for your destination.

document.forms[0].elements[6].value = "Chicago";

// This command will make the default the *arrival* time, not the departure time.  Obviously, if that doesn't
// work for you, just remove this line, or add two slashes and a space before it.

document.forms[0].elements[8].value = "A";

// This field is for the maximum distance you are willing to walk to your destination once getting off public.
// transit.  Put a 0 in here if you are willing to walk 0.25 miles; a 1 if 0.50 miles; a 2 if 0.75 miles;
// and a 3 if a mile.

document.forms[0].elements[16].selectedIndex = 3;	

// This field is for what you want the planner to consider the highest priority.  If you want the trip that's
// quickest, pick 0.  If you want the trip that's got the fewest transfers, pick 1.  If you want the trip that
// has the least walking, pick 2.  Personally, I'd go with "fewest transfers"; 0 is quickest in a world where
// all the buses are perfectly on their timetable.  Fewest transfers is real-life quickest, IMHO.

document.forms[0].elements[17].selectedIndex = 1;

// This field is for whether you are willing to use both trains and buses (0), just buses (1), or just trains (2).

document.forms[0].elements[18].selectedIndex = 0;

// Since most of the other fields have been filled out, this command here places the cursor to start off with
// in the one field that WON'T be pre-filled out, the destination address.

document.getElementsByName("Dest")[0].focus();