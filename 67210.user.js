// ==UserScript==
// @name           google_calendar_age_adder
// @namespace      http://norcimo.com/greasemonkey
// @auther		Norcimo
// @attribution	Darrin Holst
// @description    Adds the age to gcal events ending with " - 9999" where 9999 is the start year of the event.
// @description    Great for birthday and anniversary events.This just modifies the html,it doesn't touch the actual event.
// @description    New settings allows to display only the age without the year. Just add [bd:YYYY] at the end
// @description	Updated by Norcimo to work again. Thanks to the original author for most of the codebase
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

(function() {
	
  var DATE_CONTAINER = 'currentDate:0',
      EVENT_CONTAINER = 'mainbody',
      EVENT_TAG = 'div';

  var addEm = function() {
    
    var year = /^.*(\d{4})$/.exec(document.getElementById(DATE_CONTAINER).innerHTML)[1];
    var events = document.getElementById(EVENT_CONTAINER).getElementsByTagName(EVENT_TAG);
    
    for (var i = 0, j = events.length; i < j; i++) {
      var childNodes = events[i].childNodes
      
      for(var m = 0, n = childNodes.length; m < n; m++){
        var childNode = childNodes[m];
        if (childNode.nodeName=="SPAN") {
		// Needed for day and week views
			childNode=childNode.childNodes[0];
		}
        if (childNode.nodeType == 3) {
          var nodeValue = childNode.nodeValue;
          var oldMatch = /^.* - ((?:19|20)\d\d)$$/.exec(nodeValue);
          var newMatch = /(^.* )(\[bd:(?:19|20)\d\d\])$$/.exec(nodeValue);
          
          if (oldMatch) {
            // shows: xxxxx - YYYY (age)
            childNode.nodeValue = nodeValue + ' (' + (year - oldMatch[1]) + ')';
          }

          if (newMatch) {
            // shows: xxxxx (age)
            var birthyear = newMatch[2].substring(4, 8);
            childNode.nodeValue = newMatch[1] + ' (' + (year - birthyear) + ')';
          }
        }
      }
    }
  }

  document.getElementById(EVENT_CONTAINER).addEventListener('DOMSubtreeModified', addEm, true);
  addEm();
})();
