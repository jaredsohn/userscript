// ==UserScript==
// @name          @hotmail.co.uk inserter
// @description   Quick mod of the "@hotmail.com" script by d3x, i take no credit for this!   Original script: http://userscripts.org/scripts/show/10476    this version is just for people in england with a @hotmail.co.uk email.
// @include       http://login.live.com/*
// ==/UserScript==

String.prototype.isEmpty = function(){
	this.replace(/\s/g,'');
	if(this == '') return true;
	return false;
}

function addomain(e){
	var target = e ? e.target : this;
	if(target.value.indexOf("@hotmail.co.uk") < 0 && !target.value.isEmpty()) target.value = target.value+"@hotmail.co.uk";
}

window.addEventListener("load", function(){
	var loginInput = document.getElementById("i0116");
	loginInput.addEventListener("blur", addomain, true);
}, true);
