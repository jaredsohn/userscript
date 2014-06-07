// ==UserScript==
// @name           Google Show Page Number
// @namespace      http://maxkueng.com/gmscripts
// @description    Displays the page number on the upper left on Google search result pages
// @version        1.1
// @author         Max Kueng 
// @homepage       http://maxkueng.com/
// @include        http://*google.*
// ==/UserScript==

(function (){
	
	var spans = document.getElementsByTagName('span');
	for (i=0;i<spans.length;i++) {
		if (spans[i].className == 'i') {
			var pNumber = spans[i].innerHTML;

			var pn = document.createElement('div');
			pn.style.position = 'fixed';
			pn.style.top = '3px';
			pn.style.left = '8px';
			pn.style.fontSize = '12px';
			pn.style.color = '#000000';
			pn.style.fontWeight = 'normal';
			pn.style.background = '#e5ecf9';
			pn.style.padding = '0px 5px 2px 5px';
			pn.style.borderTop = '1px solid #3366cc';
			pn.appendChild(document.createTextNode('Page' + pNumber));

			body = document.getElementsByTagName('body');
			body[0].appendChild(pn);
		}
	}

}());
