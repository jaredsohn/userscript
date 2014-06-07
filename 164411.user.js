// ==UserScript==
// @name           jListener
// @version        0.5
// @description    Extension to addEventListener() and removeEventListener() in JavaScript. 
// @license        GPL v2
// @match          *
// ==/UserScript==

if (
	typeof isJRemovingEventListener === 'undefined' && 
	typeof jAddEventListener === 'undefined' && 
	typeof jRemoveEventListener === 'undefined'
) {
	var isJRemovingEventListener = false;
	
	jAddEventListener = function(element, eventString, eventHandler, delay, isLazy) {
		if (
			typeof HTMLElement === "object" ? element instanceof HTMLElement : element && 
			typeof element === "object" && 
			typeof element.nodeName === "string" && 
			element.nodeType === 1 && 
			typeof eventString === "string" && 
			typeof eventHandler === "function"
		)
		{
			var timer = '';
			
			function lastEventHandler(event) {
				if (isJRemovingEventListener === false) {
					if (isLazy) {
						element.removeEventListener(eventString, waitForLastEvent, false);
					}
					eventHandler(event);
					if (isLazy && isJRemovingEventListener === false) {
						element.addEventListener(eventString, waitForLastEvent, false);	
					}
				}
			};
			
			function waitForLastEvent(event) {
				if (typeof timer === "number") {
					clearTimeout(timer);
				}
				
				if (typeof delay !== "number") {
					lastEventHandler(event); 
				}
				else {
					timer = setTimeout(
						function() { 
							lastEventHandler(event); 
						}, 
						delay
					);
				}
			};
			
			element.addEventListener(eventString, waitForLastEvent, false);	
		}
	};
	
	jRemoveEventListener = function(element, eventString, waitForLastEvent) {
		isJRemovingEventListener = true;
		element.removeEventListener(eventString, waitForLastEvent);
	};
	
}