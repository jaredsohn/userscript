// ==UserScript==
// @name           Iframe Revealer
// @description    Places a button in each iframe, so you can click and get the location.href of that iframe
// @include        http://*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.1
// @copyright      Charlie Ewing
// ==/UserScript== 

(function() { 

	var version = "0.0.1";

	function addIframeReveal() { 
    		var element = document.createElement("input");
 
    		//Assign different attributes to the element.
    		element.setAttribute("type", "button");
    		element.setAttribute("value", "Reveal Href");
    		element.setAttribute("name", "reveal_href");
		element.setAttribute("onclick","alert(location.href)");

		var form = document.createElement("form");
  
    		//Append the element to the form
    		form.appendChild(element);

		//Append the form to the body
		document.body.appendChild(form);
	};


	//attach a location revealing button to this window/iframe
	addIframeReveal();

})(); // anonymous function wrapper end