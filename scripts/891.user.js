// ==UserScript==
// @name           Reduce Google Fusion Logo
// @namespace      http://www.google.com
// @description    Reduces the logo on google.com/ig
// @include        http://google.com/ig
// @include        http://www.google.com/ig
// ==/UserScript==
(function() {
    var img = document.getElementsByTagName('img')[1];
	var new_img = img.cloneNode(true);

	img.parentNode.removeChild(img);

	new_img.setAttribute('src', 'http://www.google.com/logos/Logo_40wht.gif');
	new_img.setAttribute('width', '');
	new_img.setAttribute('height', '');

    var form = document.getElementsByTagName('form')[0];
	form.removeChild(form.childNodes[0]);
	form.removeChild(form.childNodes[0]);

    var table = document.getElementsByTagName('tbody')[2];
	var tr = table.getElementsByTagName('tr')[0];
	var td = table.getElementsByTagName('td')[0];

//	var new_td = document.createElement('TD');	
//	new_td.appendChild(new_img);
//	tr.insertBefore(new_td, td);
	td.setAttribute('align', 'right');

	td.appendChild(new_img);
	
})();