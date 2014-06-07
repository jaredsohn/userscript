// ==UserScript==
// @name           iGoogle sidebar collapse
// @namespace      http://www.google.com/ig*
// @description    Collapse new iGoogle sidebar - by Rockmaster - based on theme by Michael Freeman - http://userscripts.org/users/54575
// @include        http://www.google.com/ig*
// ==/UserScript==

document.getElementById('col1').style.display='none';
function togPages(){
	var c = document.getElementById('col1');
	c.style.display = (c.style.display == "none" ? "block" : "none" );
}
      var d  = document.createElement('div');
      d.style.margin = "2px"; d.style.padding = "5px"; d.style.position="absolute";d.style.top="150px"; d.style.left="2px";
	  var a = document.createElement('button');
	  a.href="#";
	  a.innerHTML="Sidebar";
	  a.addEventListener ( 'click', togPages, true);
	  d.appendChild(a);
	  document.getElementById('gbar').appendChild(d);


