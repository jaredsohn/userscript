// ==UserScript==
// @name           Disable Video Autoplay on SMH & The Age
// @namespace      http://mattstow.com/smh
// @description    Disables videos in articles from automatically playing on SMH and The Age
// @include        http://*smh.com.au/*
// @include        http://*theage.com.au/*
// ==/UserScript==
// Version 1.0.0

function fireEvent(obj, evt){
	var fireOnThis = obj;
	if (document.createEvent) {
		var evObj = document.createEvent('MouseEvents');
		evObj.initEvent(evt, true, false);
		fireOnThis.dispatchEvent(evObj);
	}
	else if (document.createEventObject) {
		fireOnThis.fireEvent('on' + evt);
	}
}

fireEvent(document.getElementsByClassName('playCountdownStop')[0], 'click');