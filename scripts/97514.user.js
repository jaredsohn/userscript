// ==UserScript==
// @name          No mail from Rakuten Ichiba !
// @namespace     https://order.step.rakuten.co.jp/
// @description   no R-Mail
// @version       1.0.0
// @include       https://order.step.rakuten.co.jp/rms/mall/basket/vc
// @include       https://*.step.rakuten.co.jp/*
// ==/UserScript==

function uncheckMail() {
	var inputs = document.getElementsByTagName("input");
	
	for (var i=0; i < inputs.length; i++) {
		var input = inputs[i];
		if (input.type != "checkbox") {
			continue;
		}
		var inputName = input.name;
		if (inputName.match(/rmail_check|shop_rating_check|newscheck_[0-9]*/)) {
			// uncheck
			input.checked = false;
		}
	}
}

function addMyEvent(obj, event, handler){
	if(obj.addEventListener){
		obj.addEventListener(event,handler,false);
	}
	else if(obj.attachEvent){
		obj.attachEvent("on"+event,handler);
	}
	else{
		obj["on"+event]=handler;
	}
}

addMyEvent(window, 'load', uncheckMail);
