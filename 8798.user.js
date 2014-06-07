// ==UserScript==
// @name		Snap Shots
// @namespace		http://iescripts.org/
// @description		Add snap.com effect to sites
// @include		*
// ==/UserScript==

(function(){

var elms = document.getElementsByTagName('a');
for(var i=0; i<elms.length; i++){
	var cname = elms[i].className;
	if(cname.indexOf('snap_shots') != -1) continue;
	if(cname != '') cname += ' snap_shots';
	else cname = 'snap_shots';

	elms[i].className = cname;
}


var documentHead = document.getElementsByTagName('head')[0];
var newScriptElement = document.createElement('script');
newScriptElement.type = 'text/javascript';
newScriptElement.src = 'http://shots.snap.com/snap_shots.js';
documentHead.appendChild(newScriptElement);



})();