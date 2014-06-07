// ==UserScript==
// @name           jListener with currentTarget
// @version        0.2
// @description    Extension to addEventListener() and removeEventListener() in JavaScript. Any input event handler needs to have an additional parameter serving as event.currentTarget.
// @license        GPL v2
// @match          *
// @grant          none
// ==/UserScript==

if (
	'undefined' === typeof isJRemovingEventListener && 
	'undefined' === typeof jAddEventListener && 
	'undefined' === typeof jRemoveEventListener && 
	'undefined' === typeof jEventListeners
) {
	var isJRemovingEventListener = false;
	var jEventListeners = {};
	
	var jAddEventListener = function(element, eventString, eventHandler, useCapture, delay, isLazy) {
		if (
			'object' === typeof HTMLElement ? element instanceof HTMLElement : element && 
			'object' === typeof element && 
			'string' === typeof element.nodeName && 
			1 === element.nodeType && 
			'string' === typeof eventString && 
			'function' === typeof eventHandler && 
			element.addEventListener
		) {
			var timer = '';
			
			var waitForLastEvent = function(eventHandler) {
				return function(event) {
					if (typeof timer === "number") {
						clearTimeout(timer);
					}
					
					var currentTarget = event.currentTarget.cloneNode(true);
					if (typeof delay !== "number") {
						lastEventHandler(event, eventHandler, currentTarget);
					}
					else {
						timer = setTimeout(
							function() { 
								lastEventHandler(event, eventHandler, currentTarget);
							}, 
							delay
						);
					}
				};
			}(eventHandler);
			
			function lastEventHandler(event, eventHandler, currentTarget) {
				if (isJRemovingEventListener === false) {
					if (isLazy) {
						element.removeEventListener(eventString, waitForLastEvent, useCapture);
					}
					event['currentTarget'] = currentTarget;
					eventHandler(event, currentTarget);
					if (isLazy && isJRemovingEventListener === false) {
						element.addEventListener(eventString, waitForLastEvent, useCapture);	
					}
				}
			};
			
			element.addEventListener(eventString, waitForLastEvent, useCapture);	
			
			jEventListeners[[element, eventString, eventHandler]] = waitForLastEvent;
		}
	};
	
	var jRemoveEventListener = function(element, eventString, eventHandler, useCapture) {
		var waitForLastEvent = jEventListeners[[element, eventString, eventHandler]];
		
		if (
			'object' === typeof HTMLElement ? element instanceof HTMLElement : element && 
			'object' === typeof element && 
			'string' === typeof element.nodeName && 
			1 === element.nodeType && 
			'string' === typeof eventString && 
			'function' === typeof eventHandler && 
			element.removeEventListener &&
			'function' === typeof waitForLastEvent
		) {
			isJRemovingEventListener = true;
			element.removeEventListener(eventString, waitForLastEvent, useCapture);
			
			delete jEventListeners[[element, eventString, eventHandler]];
		}
	};
	
}