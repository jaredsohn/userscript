// ==UserScript==
// @name SVG Zoom And Pan
// @author Spadar Shut
// @version 1.0
// @description Allows to zoom and pan svg images, either opened directly in browser or embedded 
// ==/UserScript==


if (document.documentElement.suspendRedraw){
	document.documentElement.suspendRedraw(5000);
}


(function(){
window.addEventListener(
  'load',
  function () {
	if (document.documentElement == '[object SVGSVGElement]'){
		window.ZoomNPan = window.ZoomNPan || {
		
			options: {
			
				// Settings. Can be edited with UJS Manager http://unite.opera.com/application/401/
				
				autoRun: /*@ Enable zoom and pan when image loads @bool@*/true/*@*/,
				autoFitViewport: /*@ Scale all images to fit the window @bool@*/true/*@*/, 
				zoomScale: /*@ Default zoom factor @int@*/1.5/*@*/,
				fastZoomMultiplier: /*@ Zoom factor when ALT key is pressed @int@*/5/*@*/,
				toggleZoomKeyCode: /*@ Key code of the button which toggles zoom and pan. Default: 27 (Esc) @int@*/27/*@*/,
				cursorGrab: ' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA////////c3ilYwAAAAN0Uk5T//8A18oNQQAAAD1JREFUeNp0zlEKACAIA9Bt9z90bZBZkQj29qFBEuBOzQHSnWTTyckEfqUuZgFvslH4ch3qLCO/Kr8cAgwATw4Ax6XRCcoAAAAASUVORK5CYII="), move',
				cursorHand: ' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA////////c3ilYwAAAAN0Uk5T//8A18oNQQAAAExJREFUeNp0jwEOwCAIAw///+ixFqZm2qChl1CUYUE3NkRglpdMnqw/wCN24uzgZRUpOdoJLYGYQLGxiFp7BYx+xw7m2vrcR47gEWAAkHEBFiebq0wAAAAASUVORK5CYII="), auto'
				
			},
			
			zoomElt: undefined,
			
			currentState: {
				state: 'none',
				panX: 0,
				panY: 0,
				translateX: 0,
				translateY: 0,
				zoomAllowed: undefined,
				timePrev: 0
					
			},
			
			init: function (zoomElt) {
				// Remember current zoom element
				ZoomNPan.zoomElt = zoomElt;

				
				// Setup event listeners
				zoomElt.addEventListener('mousedown',  ZoomNPan.handleMouseDown, false);
				zoomElt.addEventListener('mouseup',    ZoomNPan.handleMouseUp, false);
				zoomElt.addEventListener('mousemove',  ZoomNPan.handleMouseMove, false);
				zoomElt.addEventListener('mousewheel', ZoomNPan.handleMouseWheel, false);
				zoomElt.addEventListener('keyup',      ZoomNPan.handleKeyUp, false);
				//zoomElt.addEventListener('DOMMouseScroll', ZoomNPan.handleMouseWheel, false);// mousewheel for Firefox
				
				ZoomNPan.currentState.zoomAllowed = ZoomNPan.options.autoRun
				
				// Scale the image to fit screen
				if (ZoomNPan.options.autoFitViewport){
					ZoomNPan.makeViewBox();
				}
				else{
					ZoomNPan.zoomElt.unsuspendRedraw(window.suspID);
				}
			},

					
			handleMouseDown: function (evt) {
			  if (ZoomNPan.currentState.zoomAllowed) {
					// Handle click
					if(evt.preventDefault) {
						evt.preventDefault();
					}

					evt.returnValue = false;

					if(evt.currentTarget.tagName == "svg") {
						// Pan mode
						ZoomNPan.currentState.state = 'pan';
						ZoomNPan.zoomElt.style.cursor = ZoomNPan.options.cursorGrab;
						ZoomNPan.currentState.panX = evt.x;
						ZoomNPan.currentState.panY = evt.y;
					}
				}
			},

			handleMouseUp: function(evt) {
			  if (ZoomNPan.currentState.zoomAllowed){
					// Handle mouse button release
					if(evt.preventDefault){
						evt.preventDefault();
					}
					evt.returnValue = false;

					if (ZoomNPan.currentState.state == 'pan') {
						// Quit pan mode
						ZoomNPan.zoomElt.style.cursor = 'default';//ZoomNPan.options.cursorHand;
						ZoomNPan.currentState.state = '';
					}
				}
			},
			
			handleMouseMove: function (evt) {
			  if (ZoomNPan.currentState.zoomAllowed){
					if(evt.preventDefault){
						evt.preventDefault();
					}
					evt.returnValue = false;

					if(ZoomNPan.currentState.state == 'pan') {
						// Pan mode
						// get difference to previous position
						ZoomNPan.currentState.translateX = evt.x - ZoomNPan.currentState.panX;
						ZoomNPan.currentState.translateY = evt.y - ZoomNPan.currentState.panY;

						evt.currentTarget.currentTranslate.x += ZoomNPan.currentState.translateX;
						evt.currentTarget.currentTranslate.y += ZoomNPan.currentState.translateY;
							
						// Remember previous position
						ZoomNPan.currentState.panX = evt.x;
						ZoomNPan.currentState.panY = evt.y;
					}
				}
			},
			
			handleMouseWheel: function (evt) {
			  if (ZoomNPan.currentState.zoomAllowed){
					if (evt.preventDefault){
						evt.preventDefault();
					}
					
					evt.returnValue = false;
						
					var delta;

					if (evt.wheelDelta) {
						delta = evt.wheelDelta / 360; // Webkit, Opera
					}
					else{
						delta = evt.detail / -9; // Mozilla, Opera
					}
					
					if (evt.altKey){
						delta *= ZoomNPan.options.fastZoomMultiplier;
					}
					
					var z = Math.pow(1 + ZoomNPan.options.zoomScale, delta);
					var oldScale = evt.currentTarget.currentScale;
					var timeNow = Date.now();
					if (timeNow - ZoomNPan.currentState.timePrev > 60) { // skip unnecessary redraw
					
						var oldTranslate = {
							x: evt.currentTarget.currentTranslate.x,
							y: evt.currentTarget.currentTranslate.y
						};

						evt.currentTarget.currentScale *= z;
						
						var vp_width = evt.currentTarget.viewport.width;
						var vp_height = evt.currentTarget.viewport.height;
						
						// Very complicated calculations :)
						// Borrowed from http://jwatt.org/svg/tests/zoom-and-pan-controls.svg
						evt.currentTarget.currentTranslate.x = vp_width/2  - (evt.currentTarget.currentScale/oldScale) * (vp_width/2 - oldTranslate.x);
						evt.currentTarget.currentTranslate.y = vp_height/2 - (evt.currentTarget.currentScale/oldScale) * (vp_height/2 - oldTranslate.y);
					
						ZoomNPan.currentState.timePrev = timeNow;
					 }
				}
			},
			
			handleKeyUp: function (evt) {
				if (evt.keyCode != ZoomNPan.options.toggleZoomKeyCode) {
					return
				}
				// Global killswitch :) 
				// Toggle zoom and pan when toggle key is pressed (default "z")
				ZoomNPan.currentState.zoomAllowed = !ZoomNPan.currentState.zoomAllowed;
				
			},
			
			handleMouseOut: function (evt){
			  if (ZoomNPan.currentState.zoomAllowed){
				// not used, buggy
				// Handle mouse out event
					if(evt.preventDefault){
						evt.preventDefault();
					}
					evt.returnValue = false;

					if (ZoomNPan.currentState.state == 'pan') {
						// Quit pan mode
						ZoomNPan.currentState.state = '';
					}
				}
			},
			
			makeViewBox: function (SVGElt){
			
				var d  = SVGElt || ZoomNPan.zoomElt,
					w  = d.viewport.width,
					h  = d.viewport.height,
					wAttr = d.getAttributeNS(null, "width"),
					hAttr = d.getAttributeNS(null, "height"),
					vB = d.viewBox.baseVal;//SVGRoot.getAttributeNS(null, "viewBox");
					
				if(!wAttr && !hAttr && !vB.width){
					// If there are NO width & height & viewbox try to guess them
					var BBox = d.getBBox();
					vB.x = BBox.x;
					vB.y = BBox.y;
					vB.width = BBox.width;
					vB.height = BBox.height;
				}
				else if ((wAttr || hAttr) && !vB.width) {
				// If there IS width or height and NO viewBox,
				// generate viewbox based on them
					vB.x = d.x.baseVal.value;
					vB.y = d.y.baseVal.value;
					vB.width = w;//d.width.baseVal.value;
					vB.height = h;//d.height.baseVal.value;
					d.removeAttributeNS(null, 'width');
					d.removeAttributeNS(null, 'height');
				}
				else if((wAttr || hAttr) && vB.width){
				// If there are ALL OF width/height/viewBox
				// only remove width and height attibutes
						d.removeAttributeNS(null, 'width');
						d.removeAttributeNS(null, 'height');
				}
				ZoomNPan.zoomElt.unsuspendRedrawAll();
			}
		}
	  // run the script
	  window.ZoomNPan.init(document.documentElement);
	}
	
  },false)
})();