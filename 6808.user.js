// ==UserScript==
// @name            DLink fixer
// @namespace       
// @include         http://192.168.220.225/*
// ==/UserScript==

(function() {

var x=document.evaluate("//form[@name='usrInput']",document,null,0,null).iterateNext();
if(x) {
    var s=document.createElement("INPUT");
    s.type="submit";
    s.style.display="none";
	x.addEventListener("submit",function(e) {
		e.preventDefault(); e.stopPropagation(); 
		return false;
    },true);
    x.appendChild(s);
}

})();
