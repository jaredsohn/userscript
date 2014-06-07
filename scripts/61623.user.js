// ==UserScript==
// @name           Big Resource Auto Clicker
// @namespace      http://userscripts.org/users/76340
// @include        http://www.bigresource.com/*
// ==/UserScript==


BRAP = function() {
	var joinBtn=document.evaluate("//body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/a[@class='navbutton']",document,null,9,null).singleNodeValue;
	if(!joinBtn) return false;
	fireEvent(joinBtn,'click');
}

BRAP();

function fireEvent(obj,evt){
	
	var fireOnThis = obj;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}
}