// ==UserScript==
// @name          Dark Throne - Input Enhancer
// @namespace     http://riddle.pl/h/greasemonkey/darkthrone.inputenhc.user.js
// @author        ridd1e_PL
// @description   Appends ten buttons which paste "1" to "10" text in Attack / Spy monit.
// @include       http://beta.darkthrone.com/attack.dt*
// @include       http://beta.darkthrone.com/spy.dt*
// @include       http://beta.darkthrone.com/infiltration.dt*
// @include       http://beta.darkthrone.com/assassination.dt*
// @include       http://www.darkthrone.com/attack.dt*
// @include       http://www.darkthrone.com/spy.dt*
// @include       http://www.darkthrone.com/infiltration.dt*
// @include       http://www.darkthrone.com/assassination.dt*
// ==/UserScript==


document.getElementsByClassName = function(className) {
  var children = document.getElementsByTagName('*') || document.all;
  var elements = new Array();
 
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var classNames = child.className.split(' ');
    for (var j = 0; j < classNames.length; j++) {
      if (classNames[j] == className) {
        elements.push(child);
        break;
      }
    }
  }
 
  return elements;
} 


var con = document.getElementsByClassName('box_header')[0].parentNode.parentNode.parentNode.parentNode;

for (var i = 1; i < 11; i++) {

	var div = document.createElement('a');
	div.appendChild(document.createTextNode(i));
	
	if (i == 1) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 1; document.getElementsByTagName('input')[3].focus; } }
	if (i == 2) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 2; } }
	if (i == 3) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 3; } }
	if (i == 4) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 4; } }
	if (i == 5) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 5; } }
	if (i == 6) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 6; } }
	if (i == 7) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 7; } }
	if (i == 8) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 8; } }
	if (i == 9) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 9; } }
	if (i == 10) { div.onclick = function() { document.getElementsByTagName('input')[3].value = 10; } }

	div.className = 'attlink';
	div.href = '#notarget';
	con.className = 'attcontainer';
	con.appendChild(div);

}

var newSS, styles= 'a.attlink { display: block; float: left; margin-top: 20px; text-decoration: none; cursor: pointer; padding: 15px; } a.attlink:hover { background-color: #777 !important; color: #FFF !important; }';

	if(document.createStyleSheet) {
		document.createStyleSheet("javascript:'"+styles+"'");
	}
	else {
		newSS = document.createElement('link');
		newSS.rel='stylesheet';
		newSS.href='data:text/css,'+escape(styles);
		document.getElementsByTagName("head")[0].appendChild(newSS);
	}






