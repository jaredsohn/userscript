// ==UserScript==
// @name          @hotmail.com inserter
// @description   Don't you just hate adding those "@hotmail.com" each time you need to login to hotmail? Well, fear not this script does it for you. Updated for the new hotmail login page.
// @include       http://login.live.com/*
// ==/UserScript==

String.prototype.isEmpty = function(){
	this.replace(/\s/g,'');
	if(this == '') return true;
	return false;
}

function addomain(e){
	var target = e ? e.target : this;
	if(target.value.indexOf("@hotmail.com") < 0 && !target.value.isEmpty()) target.value = target.value+"@hotmail.com";
}

window.addEventListener("load", function(){
	var loginInput = document.getElementById("i0116");
	loginInput.addEventListener("blur", addomain, true);
}, true);
