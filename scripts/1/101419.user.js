// ==UserScript==
// @name          Airg Textmax
// @namespace     http://userstyles.org
// @description	  Max post length on airg.
// @author        AikiNefarious
// @homepage      http://userstyles.org/styles/46794
// @include       http://airg.com/*
// @include       https://airg.com/*
// @include       http://*.airg.com/*
// @include       https://*.airg.com/*
// @include       http://airg.ca/*
// @include       https://airg.ca/*
// @include       http://*.airg.ca/*
// @include       https://*.airg.ca/*
// ==/UserScript==

 
var instrumentTextarea = function(textarea) {
    var centerTextarea = function() {
	if (textarea.scrollIntoView) {
	    textarea.scrollIntoView(false);
	} else {
	    textarea.wrappedJSObject.scrollIntoView(false);
	}
    
	};
	if(true) {
        textarea.style.width = "98%"; // Make it full width.
		//textarea.style.height = "20px"; // Set minimum height.
        textarea.setAttribute ('maxlength',"250") ;// Set maximum characters to 250 (max on airg chat)
		};
	
    
    
    textarea.addEventListener("keydown", textareaKeydown, 0);
}
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) 
{
   instrumentTextarea(textareas[i]);
}