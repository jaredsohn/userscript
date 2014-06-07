// ==UserScript==
// @name Αμπαλέα
// @namespace http://www.facebook.com/*
// @description Κάντε το poke αμπαλαέα
// @include http://www.facebook.com/*
// ==/UserScript==

function ChangeAmpalaea(){
	var text=document.getElementById('profile_action_poke').innerHTML;
	if(text!=null){
	(text.replace(/Poke/i, "Αμπαλαέα");
document.getElementById('profile_action_poke').innerHTML=text;
	}
}