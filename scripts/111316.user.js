// ==UserScript==
// @name           Privacy++
// @namespace      privacy.plus.plus
// @description    Use a password of your choice to show/hide websites
// @include        *
// @version        1.0
// ==/UserScript==

window.combo = 0;

document.documentElement.addEventListener("keyup", keyUpHandler, true);


function keyUpHandler(e){
	var keyID = (window.event) ? event.keyCode : e.keyCode;
	var secret = "sesame";
	var bodyStyle = document.body.style;
	
	if(keyID == secret.toUpperCase().charCodeAt(combo)){
		combo++;
	}else{
		combo = 0;
	}
	
	if(combo == secret.length){
		if(bodyStyle.visibility == 'hidden'){
			bodyStyle.visibility = 'visible';
			bodyStyle.display = '';
		}else{
			bodyStyle.visibility = 'hidden';
			bodyStyle.display = 'none';
		}

		combo = 0;
	}
}