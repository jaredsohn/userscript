
// ==UserScript==
// @name        Unwanted Element Remover
// @namespace   http:// userscripts.org/users/tommy
// @description Allow you to remove unwanted element by double-click.Press F1 to Active/Deactive
// @author      .
// @include     *
// @grant       none
// @version     0.0.1
// ==/UserScript==

var key = 112;
var on = false;
var css = '.inspect {\
cursor: default !important;\
box-shadow: 0 0 6px aqua;\
-moz-box-shadow: 0 0px 6px aqua;\
-webkit-box-shadow: 0 0px 6px aqua;}\
a.inspect {\
cursor: default !important;\
box-shadow: 0 0 6px aqua;;\
-moz-box-shadow: 0 0px 6px aqua;\
-webkit-box-shadow: 0 0px 6px aqua;\
user-select:none; !important}'

function remove(a) {
	if (a && a.parentNode) {
		a.parentNode.removeChild(a);
	}
	if (a && a.target) {
		remove(a.target);
	}
}

function stop(e) {
	e.preventDefault();
	e.stopPropagation();
}

function addEvent(a, b, c) {
	if (a.addEventListener) {
		a.addEventListener(b, c, false);
	}
}

function removeEvent(a, b, c) {
	if (a.removeEventListener) {
		a.removeEventListener(b, c, false);
	}
}

function getTarget(a) {
	var b = a.target ? a.target : a.srcElement;
	return b.nodeType == 3 ? b.parentNode : b;
}

function inspector() {
	var a = document.createElement('style');
	a.textContent = css;
	addEvent(window, "keydown", function(e) {
		if (e.keyCode == key && a.parentNode) {
			remove(a);
		}
	})
	document.head.appendChild(a);
}

addEvent(window, "keydown", function(e) {
	if (e.keyCode == key && !on) {
		on = true;
		inspector();
	} else if (e.keyCode == key && on) {
		on = false;
	}
})

addEvent(document.body, 'mouseover', function(e) {
	var a = getTarget(e);
	if (on) {
		stop(e);
		addEvent(a, 'click', stop);
		addEvent(a, 'dblclick', remove);
		addEvent(a, "mouseout", function() {
			a.className = a.className.replace(new RegExp(" inspect\\b", "g"), "");
			removeEvent(a, 'click', stop);
			removeEvent(a, 'dblclick', remove);
		});
		a.className += " inspect";
	}
})
/**
[BONUS POPUP BLOCKER] :p
**/
if (Object.defineProperty) {
    Object.defineProperty(window, 'open', {
        value: {},
        writable: false,
        configurable: false
    });
} else {                 
    window.__defineGetter__('open', function() {
        return {}
    });
}