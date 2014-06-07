// ==UserScript==
// @name           unitn_login_onEnterKey
// @namespace      http://jibbo.altervista.org
// @description    does the login when you press the return key.
// @include        https://www3.unitn.it/*
// ==/UserScript==
btn = document.getElementById('clsubmit');
document.onkeypress= function(e){
	if(e.keyCode==13)
		location.assign( "javascript:" + btn.getAttribute("onclick") 
			+ ";void(0)" );
}