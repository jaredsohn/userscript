// ==UserScript==
// @name          BNut kill karaoke
// @namespace     http://ang3lfir3.com/userscripts/bnut
// @description	  Removes offtopic forum listings from BonsaiNut
// @include http://*bonsainut.com/*
// @run_at document_end
// ==/UserScript==
(function (){
	 var the_element = document.getElementById('forum5');
	  if(the_element != null){
		the_element.innerHTML = '';
	  }
}());
