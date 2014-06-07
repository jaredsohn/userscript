// ==UserScript==
// @name           Show Iframes
// @include        http://*
// @version        0.0.1
// ==/UserScript== 

(function() { 

	var version = "0.0.1";

	function addShowIframe() { 
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


	//attach a location Show/Revealing button to this window/iframe
	addShowIframe();

})(); // anonymous function wrapper end