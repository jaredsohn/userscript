// ==UserScript==
// @id             KeyboardNav
// @name           KeyboardNav
// @version        1.2
// @namespace      
// @author         raulchen
// @description    
// @namespace   http://userscripts.org/scripts/show/177025
// @updateUrl   http://userscripts.org/scripts/source/177025.meta.js
// @installUrl  http://userscripts.org/scripts/source/177025.meta.js
// @include     *
// @exclude		http://note.youdao.com/*
// @exclude		http*://mail.google.com/*
// @run-at         document-start
// ==/UserScript==

(function(){

	var LINES_TO_SCROLL=10;

	var keyboardNav=function(event){
		if(event.shiftKey || event.ctrlKey){
			return;
		}
		var keyCode = event.keyCode ? event.keyCode 
			: event.which ? event.which : event.charCode;
		//alt+u || alt+1
		var up=(event.altKey && keyCode==85) ||
			(event.altKey && keyCode==49);
		//alt+i || alt+2
		var down=(event.altKey && keyCode==73) ||
			(event.altKey && keyCode==50);

		if(!up && !down){
			return;
		}

		if(event.target.localName!=null){
			var localName = event.target.localName.toUpperCase();
			if (localName == 'TEXTAREA' || localName == 'INPUT' || localName == 'SELECT')
				return;
		}

		if(up){
			window.scrollByLines(-1*LINES_TO_SCROLL);
		}
		else if(down){
			window.scrollByLines(LINES_TO_SCROLL);
		}
	}

	var hackSpacebar=function(event){
		if(event.shiftKey || event.ctrlKey || event.altKey){
			return;
		}
		if(event.keyCode!=32){
			return;
		}
		if(event.target.localName!=null){
			var localName = event.target.localName.toUpperCase();
			if (localName == 'TEXTAREA' || localName == 'INPUT' || localName == 'SELECT')
				return;
		}
		event.preventDefault();
		window.scrollBy(0,window.innerHeight*0.6);
	}

	window.addEventListener("keydown", function(e){keyboardNav(e)}, true);
	window.addEventListener("keydown", function(e){hackSpacebar(e)}, true);

})();