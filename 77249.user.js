// ==UserScript==
// @name           SFC Botter
// @namespace      Contact me at sfcscripts@gmail.com to arrange delivery
// @description    Runs missions undetectably
// @include        http://*
// ==/UserScript==
function createDivs() {
var div = document.createElement('div');
		var container = document.createElement('div');
    	div.id = 'overlay';
			div.innerHTML =
		'<center><h2>Contact me at <a href="mailto:sfcscripts@gmail.com">sfcscripts@gmail.com</a href> to arrange delivery</h2></center>';
		container.id = 'form_container';
if (document.body.firstChild){
      	document.body.insertBefore(div, document.body.firstChild);
		document.body.insertBefore(container, document.body.firstChild);
		} else {
      	document.body.appendChild(div);
		document.body.appendChild(container);
		}
}
createDivs();