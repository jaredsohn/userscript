// Version 0.1
// Friday, 24 August 2007.
// Linuxmail Link Fix
// Matthew H

// ==UserScript==
// @name           Linuxmail Link Fix
// @description    Replace Javascript Links with Real Links in the Inbox. Now you can mass-open messages in new tabs. ^_^
// @include        http://mymail.linuxmail.org/*
// ==/UserScript==

// Create a list of anchors
var handle = document.getElementsByTagName('a');

// Parse each anchor
for (i=0; i<=handle.length; i++)
{
  var oldString = handle.item(i).href;                        // Old URI
  var searchFor = /javascript:readPopUpMail\(\'/gi;           // Regular expression to match
  var replaceWith = "http://mymail.linuxmail.org";            // Text to replace matches with
  var newString = oldString.replace(searchFor, replaceWith);  // New URI
  
  // If the new URI isn't the same as the old URI, remove the ') from the end.
  if (newString != oldString)
  {
      var searchFor = /\'\)/gi;
      var newString = newString.replace(searchFor, '');
  }
  
  // Commit the changes
  handle.item(i).href = newString;
}