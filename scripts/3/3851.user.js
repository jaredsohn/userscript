// Parses hCalendar and creates Google Calendar reminder links w/icon
// version 1.0
// 2006-04-13
// Copyright (c) 2006, Elias Torres
// Started life as http://web.mit.edu/glasser/www/JSCalendar/
// Then morphed into http://george.hotelling.net/90percent/geekery/greasemonkey_and_microformats.php
// ... and now it's what it is.
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
// select "Convert hCalendar to Google Calendar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES
// 
// Finds hCalendar events and provides a link to add them to your own Google Calendar.
// hCalendar events are specially formatted web pages that have information
// about an event embedded in them.  
//
// ==UserScript==
// @name          Convert hCalendar to Google Calendar
// @namespace     http://torrez.us/code/googlehcal/
// @description   Finds hCalendar events and provides a link to add them to Google Calendar
// @include       *
// ==/UserScript==
(function() {



const reminder_image_src = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMESURBVDjLXZNrSFNxGMYPgQQRfYv6EgR9'+
    'kCgKohtFgRAVQUHQh24GQReqhViWlVYbZJlZmZmombfVpJXTdHa3reM8uszmWpqnmQuX5drmLsdj'+
    'enR7ev9DR3Xgd3h43+d5/pw/HA4AN9zITSPUhJ14R0xn87+h2ZzJvZVInJpzAQOXQOQMt+/5rvhM'+
    'CLXv9Vjrt1rSXitmwj+Jua1+Ox+2HfGNdGf6yW8l5sUKPNVcRsiaPDA22Ahv6/7Ae/0aKdviQ0G7'+
    'B/c6f8Zg+gbfh079Mjno0MhS58lflOsgEjh3BXc+bM/0DzbvDwj314znt/bjof0HdPw3FBq6kP+o'+
    'CxVNfdDZvqPsrQmf6zdFRtyPJgbrFoqUTeS+FnPrekpmiC2lS+QcUx+qrf0wmFzodYfgC0nwhoYh'+
    '9oegfdmLsmYXHj7JhV23erS7ZNYHyibGLiLtXsO19BoHSiwu6Ok09gwFg/gy8BO/STOkKFBk7EWh'+
    '2YkLeh5Hy4Ws2B2w157iDvOpxw4UPRPRTSfL41FIsow7ZeXwUFF4dBQ1L96A/xLEFf1HMC/LxAt2'+
    '5PH+VN0HXH1gh2dEwdBoBGO0OKvW4L7hCdIvavBSsMIRVHCi0ArmZZl4wbYrz/yHSq1Ql9vQLylU'+
    'EoE7GMal3OuxMG/7CO848N6n4HheK5iXZeIFmy88Nu+8aYJG24G3ziB+0Ee7wwqemlvQ5w9hcAJw'+
    'yUDtpwBOFLeBeVkmXpB0qlK9RV2HlLsCsvUivHRhQwoQjhCkA1TgJX1OK0JVzIN5WSZesPZ44XKi'+
    'a+P5BqSS4aq+BzZXABLdhyQrsJPOqv4MVcEbMA/zsky8gLHyYO7hI9laecOZWuzLfYXU2zzSblmQ'+
    'erMZqjwTknOeY9dlIw5kVcrMG/8XpoQgCEkOhwNNJn5i7bFSrFDpsCrFEIPpLacr0WxpibYIQpS8'+
    '6/8pMBqNswnJ6XSivqHBv3R3pmbxzgwz4Z+EaTXtwqIogrzjxIJ4QVVV1UyihxgjFv3/K09Bu/lE'+
    'kBgg5rLZH+fT5dvfn7iFAAAAAElFTkSuQmCC';

/*
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
*/

var getElementsByClassName = function (oElm, strTagName, strClassName){
    var arrElements = oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

var makeReminderLink = function(event) {
  var hEvent = parsehCalendar(event);
  var reminder_link = document.createElement('a');
  reminder_link.title = "Add to Google Calendar"
  reminder_link.href = "http://www.google.com/calendar/event?action=TEMPLATE";
  if(hEvent.text) reminder_link.href += "&text=" + hEvent.text;
  if(hEvent.description) reminder_link.href += "&details=" + hEvent.description;
  if(hEvent.dates) reminder_link.href += "&dates=" + hEvent.dates;
  else { 
    // dates are required
    return; 
  }
  if(hEvent.location) reminder_link.href += "&location=" + hEvent.location;
  if(hEvent.urls) {
    for(var i = 0; i < hEvent.urls.length; i++) {
      reminder_link.href += "&sprop=website:" + encodeURI(hEvent.urls[i]);
    }
  }
  
  reminder_image = document.createElement('img');
  reminder_image.src = reminder_image_src;
  reminder_image.border = 0;
  reminder_link.appendChild(reminder_image);
  event.appendChild(reminder_link);
};

var parsehCalendar = function (ev){
  var popFirst = function(arr) {
    return (arr && arr.length > 0) ? arr[0] : null;
  };

  var trim = function(str) { 
    return str.replace(/^\s+|\s+$/, ''); 
  };

  var stripHTML = function(e) {
    return e.innerHTML.replace(/(<([^>]+)>)/ig,""); 
  };

  var cleanDate = function(dt) {
    var date = dt.replace(/-|\/|\:/ig,"");
    if(date.indexOf("+")>-1) {
      return date.substring(0, date.indexOf("+"));
    }
    return date;
  }

  var dtstart = popFirst(getElementsByClassName(ev, "*", "dtstart"));
  var dtend = popFirst(getElementsByClassName(ev, "*", "dtend"));
  var text = popFirst(getElementsByClassName(ev, "*", "summary"));
  var description = popFirst(getElementsByClassName(ev, "*", "description"));
  var location = popFirst(getElementsByClassName(ev, "*", "location"));
  var url = popFirst(getElementsByClassName(ev, "*", "url"));

  text = text ? trim(stripHTML(text)) : null;
  description = description ? trim(stripHTML(description)) : null;
  location = location ? trim(stripHTML(location)) : null;
  dtstart = dtstart && dtstart.title ? cleanDate(dtstart.title) : null;
  dtend = dtend && dtend.title ? cleanDate(dtend.title) : null;
  dates = dtstart && dtend ? dtstart + "/" + dtend : dtstart ? dtstart + "/" + dtstart : null;

  as = ev.getElementsByTagName("a");
  var urls = [];
  if (url) urls.push(url.href);
  for(var i = 0; i < as.length; i++) {
    urls.push(as[i].href);
  }
  
  

  return { "dates" : dates, 
	   "text" : text, 
	   "description" : description, 
	   "location" : location, 
	   "urls" : urls };
}

var hCals = getElementsByClassName(document, "*", "vevent");

for(var i=0; i < hCals.length; ++i) {
  makeReminderLink(hCals[i]);
}

})();

