// ==UserScript==
// @name        ITnurk - UI fix - postkasti uuendus OFF
// @namespace   v6.nosepicking
// @description Peatab postkastis automaatse "chat mode'i" - uued kirjad ei jää märkamata, sest ei muutu automaatselt loetuks.
// @include     http://itnurk.com/postkast/*
// @version     1
// @grant       none
// ==/UserScript==

// http://userscripts.org/scripts/show/152842

(function(){
function simulate(element, eventName) {
	var options = extend(defaultOptions, arguments[2] || {});
	var oEvent, eventType = null;

	for (var name in eventMatchers){
		if (eventMatchers[name].test(eventName)) { eventType = name; break; }
	}
	if (!eventType) {
		throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
	}
	if (document.createEvent) {
		oEvent = document.createEvent(eventType);
		if (eventType == 'HTMLEvents'){
			oEvent.initEvent(eventName, options.bubbles, options.cancelable);
		} else 	{
			oEvent.initMouseEvent(
				eventName, options.bubbles, options.cancelable, document.defaultView,
				options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
				options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element
			);
		}
		element.dispatchEvent(oEvent);
	} else {
		options.clientX = options.pointerX;
		options.clientY = options.pointerY;
		var evt = document.createEventObject();
		oEvent = extend(evt, options);
		element.fireEvent('on' + eventName, oEvent);
	}
	return element;
}

function extend(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}

var eventMatchers = {
	'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
	'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
	pointerX: 0,
	pointerY: 0,
	button: 0,
	ctrlKey: false,
	altKey: false,
	shiftKey: false,
	metaKey: false,
	bubbles: true,
	cancelable: true
}


/*
You can use it like this:

simulate(document.getElementById("btn"), "click");

Note that as a third parameter you can pass in 'options'. The options you don't specify are taken from the defaultOptions (see bottom of the script).
So if you for example want to specify mouse coordinates you can do something like:

simulate(document.getElementById("btn"), "click", { pointerX: 123, pointerY: 321 }

*/

function staph_autostart() {
	var elem = document.getElementById('autoRefresh');
	if(elem.innerHTML.indexOf('SEES') > -1) {
		simulate(elem, 'click');
	} else {
		window.setTimeout(staph_autostart, 500);
	}
}

staph_autostart();
})();