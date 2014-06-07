// ==UserScript==

// @name           FB People Redirect

// @namespace      Martin Stone

// @description    Redirects to real profiles from the Facebook "people" page when logged in

// @include        http://*.facebook.com/people/*

// ==/UserScript==

location.href = "http://" + startofurl(location.href) + "profile.php?id=" + endofurl(location.href);


function endofurl(inputString) {
   var temp = inputString;
   while (temp.indexOf("/") != -1) {
   	temp = temp.substring(temp.indexOf("/")+1, temp.length);
   }
   return temp;
}

function startofurl(inputString) {
   var temp = inputString.substring(7, inputString.length);
   temp = temp.substring(0, temp.indexOf("/")+1);
   return temp;
}