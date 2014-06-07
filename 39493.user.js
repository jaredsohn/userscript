// ==UserScript==
// @name	Remove banner from nnm.ru
// @author	skiedr
// @namespace	http://skie.wordpress.com/
// @description	Just Remove banner from nnm.ru
// @include	http://*.nnm.ru/*
// ==/UserScript==

function hide(elem) {
	if( elem.style ) { 
		elem.style.visibility = 'hidden'; 
	} else {
		 if( elem.visibility ) { 
			elem.visibility = 'hide'; 
		} 
	}
}

function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
  if(re.test(els[i].className))a.push(els[i]);
  return a;
}

hide(document.getElementById('bottom-banner-OFF'));
hide(document.getElementById('top-banner'));

//var links = document.getElementsByTagName('a');
var nodes = getElementsByClassName('right-banner');
var l, i;

for (i = 0; l = nodes[i]; i++) {
	hide(l);
}
