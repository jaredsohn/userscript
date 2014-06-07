// ==UserScript==
// @name           Mr Doob Harmony Background
// @namespace      http://bejeweledcheats.com
// @description    Testing
// @copyright      2009, fittyfitty <fittyfitty@hotmail.com> (http://www.bejeweledcheats.com)
// @include        http://mrdoob.com/projects/harmony*
// ==/UserScript==


var bodyEl = document.getElementsByTagName("body")[0];

function AddGui(){
	var menuEl 			= document.getElementsByClassName("gui")[0];
	var imageBox 		= document.createElement('input');
	var submitButton	= document.createElement('input');
	var toggleBgButton  = document.createElement('input');
	
    imageBox.type 		= "text";
    imageBox.setAttribute('class','url');
    
	submitButton.type 	= "button";
	submitButton.value   = "Add Background Image"
	submitButton.addEventListener("click", SetBackground, false);
	
	toggleBgButton.type 	= "button";
	toggleBgButton.value   = "Toggle Background"
	toggleBgButton.addEventListener("click", ToggleBackground, false);
	
	menuEl.appendChild(imageBox);
	menuEl.appendChild(submitButton);
	menuEl.appendChild(toggleBgButton);
}



function SetBackground(){
	bodyEl.style.backgroundImage 	= "url(" + document.getElementsByClassName('url')[0].value + ")";
	bodyEl.style.backgroundRepeat 	= "no-repeat";
	bodyEl.style.backgroundPosition = "center";
}

function ToggleBackground(){
	bodyEl.style.backgroundImage 	= bodyEl.style.backgroundImage != "none" ? "none" : "url(" + document.getElementsByClassName('url')[0].value + ")";
}


AddGui();
