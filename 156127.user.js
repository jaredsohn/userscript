// ==UserScript==
// @name   Teamliquid Calendar Emphasizer
// @description Adds icons and coloring to the calendar-sidebar. Red for DOTA2 and blue for SC2-events.
// @include  http://www.teamliquid.net/*
// ==/UserScript==

function doStuff(calendarContent){
	var elems = calendarContent.getElementsByClassName('rightmenu');
	for(i=0; i<elems.length; i++) {
		if(!hasClass(elems[i],'processed')) {
			if(elems[i].title.toLowerCase().indexOf('dota 2') != -1) {
				currentContent = elems[i].innerHTML;
				addClass(elems[i],'processed');
				addClass(elems[i],'dota2_calendar');
				elems[i].innerHTML = '<img style="vertical-align:middle" src=http://www.teamliquid.net/images/frontpage/games/dota2_13.png> ' + currentContent;
			} else if (elems[i].title.toLowerCase().indexOf('starcraft 2') != -1 || elems[i].title.toLowerCase().indexOf('gomtv') != -1) {
				currentContent = elems[i].innerHTML;
				addClass(elems[i],'processed');
				addClass(elems[i],'sc2_calendar');
				elems[i].innerHTML = '<img style="vertical-align:middle" src=http://www.teamliquid.net/images/frontpage/games/sc2_13.png> ' + currentContent;
			}
		}
	}
}

function GM_addStyle(css) {
  var parent = document.getElementsByTagName("head")[0];
  if (!parent) {
    parent = document.documentElement;
  }
  var style = document.createElement("style");
  style.type = "text/css";
  var textNode = document.createTextNode(css);
  style.appendChild(textNode);
  parent.appendChild(style);
}

var overrideCSS = " \
.dota2_calendar { color:red !important; } \
.sc2_calendar { color:blue !important; } \
";
GM_addStyle(overrideCSS);

(function() {

    var calendarContent;
    
    if ((calendarContent = document.getElementById('calendar_content'))) {
        doStuff (calendarContent);
    }
})();

document.addEventListener('DOMNodeInserted', function(e) {
    var calendarContent;
    if (e.target.id == 'calendar_content') {
        doStuff (e.target);
        return;
    }
	
    if ((calendarContent = document.getElementById('calendar_content'))) {
        doStuff (calendarContent);
		return;
    }

}, false);

function addClass(element, klass) {
	if(!element) return;
	if(!hasClass(element, klass)) {
		if(element.className && element.className.length > 0) {
			element.className += ' ';
		}
		element.className += klass;
	}
}

function hasClass(element, klass) {
	var re = RegExp('\\b' + klass + '\\b');
	return re.test(element.className);
}