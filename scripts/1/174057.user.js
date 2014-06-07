// ==UserScript==
// @id             store.nike.com-f9768fbb-7d51-6244-8db2-a7f9e8827a6f@scriptish
// @name           Add to cart
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://store.nike.com/*
// @run-at         window-load
// ==/UserScript==

var $ = unsafeWindow.jQuery;

function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

unsafeWindow.sim = eventFire;

function simulateClick(o) {
	eventFire(o[0], 'mouseover');
	eventFire(o[0], 'mousedown');
	eventFire(o[0], 'focus');
	eventFire(o[0], 'mouseup');
	eventFire(o[0], 'click');
	eventFire(o[0], 'mouseout');
	eventFire(o[0], 'blur');
}

var v = $('option[value$="11"]').attr('value');
$('select.size-dropdown').val(v);

simulateClick($('.add-to-cart.nike-button.nike-button-orange'));

window.setTimeout(function(){
	simulateClick($('.checkout-button.nike-button.nike-button-orange'));
}, 400);