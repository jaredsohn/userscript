// Convert hCalendar
// version 1.0
// 2005-07-22
// Copyright (c) 2005, George Hotelling
// Started life as http://web.mit.edu/glasser/www/JSCalendar/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Upcoming hCal", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
// 
// Finds hCalendar events and provides a link to add them to your own calendar
// if you use a calendar program that supports the iCalendar format, like
// Apple's iCal or Mozilla's Sunbird.
//
// hCalendar events are specially formatted web pages that have information
// about an event embedded in them.  
//
// ==UserScript==
// @name          Convert hCalendar
// @namespace     http://george.hotelling.net/projects/converthcal/
// @description   Finds hCalendar events and provides a link to convert them to iCalendar
// @include       *
// ==/UserScript==
(function() {

const subscribe_image_src = 'data:image/gif,GIF89a%0E%00%12%00%B3%0F%00%A157%F3%F3%F3%E4%E4%E4%ED%ED%ED%DE%DE%DE%8A%2F1%B6%B6%B6%FB%FB%FBfff%A9%A9%A9wKL%FC%FC%FCd%3C%3D%FF%FF%FF%82%82%82%FF%FF%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%0E%00%12%00%40%04j%10%94I%95x%18%9B%11%86%E0%5E%10%24Yi%96%05%A0%AE%0A%C3(%8A%F6%09%B3G%93O%BA%AA%CAA%10%99%C4%60H%18%0E%8A%03%9CA%14%100%9D%23M%E3p%10%2C%A8%02%AA%01%A3%DB)~%A8%9D%8AA%05%E7%C4%E2%82%06T%EC%10%3AJ%82%40N%A7%11%94%CF%7C%60%FB0%2C%16%0DVW%03W%7C%0E%08%88%89%8A%0E\'%8D%19%11%00%3B';

// hCalendar factory
var findHCals = function() {
  // hasClass helper function
  // TODO: replace with regex, which is tougher than it sounds since JavaScript
  //       doesn't support \A, \Z or lookbacks and [^|\s] doesn't work
var hasClass = function(element, class_to_match) {
    var classNames = element.className.split(' ');
    for (var j = 0; j < classNames.length; ++j) {
      if (classNames[j] == class_to_match) {
        return true;
      }
    }
    return false;
  };
  
  var hCalendars = new Array();
  var children = document.getElementsByTagName('*');
  for (var i = 0; i < children.length; ++i) {
    var child = children[i];
    if (hasClass(child, 'vevent')) {
      hCalendars.push(child);
    }
  }
  return hCalendars;
};

var makeiCalendarConverterLink = function(event) {
  var converter_link = document.createElement('a');
  converter_link.href = "http://suda.co.uk/projects/X2V/get-vcal.php?uri=" + escape(document.location);
  converter_image = document.createElement('img');
  converter_image.src = subscribe_image_src;
  converter_image.border = 0;
  converter_link.appendChild(converter_image);
  converter_link.appendChild(document.createTextNode('[Add to Calendar]'));
  event.appendChild(converter_link);
};

/**********************************************************/
// This is where the magic happens
/**********************************************************/
var hCals = findHCals();
for(var i=0; i < hCals.length; ++i) {
  makeiCalendarConverterLink(hCals[i]);
}

})();
