// ==UserScript==
// @id             better-libero
// @name           Better Libero.it [Beta]
// @version        0.1
// @namespace      http://libero.it
// @author         nonhocapito
// @description    Removes garbage from libero.it
// @include        http://www.libero.it/*
// @include        http://www.libero.it/?
// @updateURL      http://userscripts.org/scripts/source/154636.user.js
// @run-at         document-end
// @icon           http://www.libero.it/favicon.ico
// ==/UserScript==


/**** HISTORY ****/
//0.1   Tentative Beta


//main function 
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '#ad300bay, #adv_300, #libero_header_adv, #adv_100, #main .R2, .ad300x250, #rightc, #centog, #strip_static, #Partner0, #Partner0c, #adv_600 {display:none !important} ';
	
	//a little make-up
cssStyle += 'body {background-image: url("http://img3.iol.it/c/hf/8.2.12/themes/default/img/bg02.jpg") !important; background-position: 0 33px !important; background-repeat: repeat-x !important;} #centralc{width:90% !important; float:none !important; margin: auto}'; 

  //add CSS
	addGlobalStyle(cssStyle);
		
	//some
	//blockmetarefresh()
	
	}

)()