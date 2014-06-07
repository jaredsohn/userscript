// ==UserScript==
// @name       Play Store Screenshots Key Navigation
// @namespace  http://chen.asraf.me/
// @version    1.0
// @description  You can now navigate the Play Store screenshots for apps using the keyboard again! (works with new July 2013 version!) Use left/right to move to the next/previous screenshots respectively, or Escape to exit the enlarged view.
// @match      https://play.google.com/store/*
// @copyright  2013, Chen Asraf
// ==/UserScript==

(function() {
	
	keyNav = function(e) {
		if (e.which == 37 || e.which == 39 || e.which == 27) {
			var leftOffset = document.getElementsByClassName('details-section screenshots')[0].childNodes[1].childNodes[1].childNodes[0].style.left;
			var expanded = (parseInt(leftOffset) < 0 && leftOffset.substr(leftOffset.length-1, 1) == '%');
			if (expanded) {
				switch (e.which) {
					case 37: { // left button 
						eventFire(document.getElementsByClassName('expand-button expand-prev')[0], 'click');
						break;
					}
					case 39: { // right button
						eventFire(document.getElementsByClassName('expand-button expand-next')[0], 'click');
						break;
					}
					case 27: { // escape button
						eventFire(document.getElementsByClassName('expand-close play-button')[0], 'click');
						break;
					}
				}
			}
		}
	}
			
	function eventFire(el, etype){
		if (el.fireEvent) {
			(el.fireEvent('on' + etype));
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}
	
	document.addEventListener('keyup', keyNav, false);
    
}());