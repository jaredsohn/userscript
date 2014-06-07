// ==UserScript==
// @name           Blogger Extra Large Template Editor
// @namespace      http://impartialism.blogspot.com
// @description    Extra large Template Editor and shows Bottom Buttons without scrolling
// @include	       http://*.blogger.com/html*
//
// ==/UserScript==

/*
  Author: faithlessgod, martinfreedman@gmail.com
  Date: 2009-02-04 
  Copyright (c) 2009, faithlessgod 
  Released under the GPL license
  http://www.gnu.org/copyleft/gpl.html
  
  Based on work by:
    Fat Knowledge fatknowledge@gmail.com
    Date: 2007-10-02

	  Jasper de Vries, jepsar@gmail.com
	  Date:   2005-12-19
	  
	  Improbulus consumingexperience.blogspot.com
	  (Portion Copyright (c) 2007, Improbulus 
    Released under the GPL license
    http://www.gnu.org/copyleft/gpl.html)

*/


//scrunch down all the blank space and big graphics that blogger puts on the top by updating the CSS values
addGlobalStyle('#tabnav span.content { padding:2px 18px 4px 6px ! important; }');
addGlobalStyle('#tabnav { padding:0 0 0px 0 ! important; background:none ! important; }');
addGlobalStyle('#subnav li { padding:2px 1em ! important; }');
addGlobalStyle('#header #blogname { padding: 0px 0 0px 0px ! important; }');
addGlobalStyle('#header h1  { font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 .2em 0 ! important;}');
addGlobalStyle('#blogname h1 a	{padding:0 0 0 15px ! important; }');
addGlobalStyle('#body {padding: 0 0 0 15px ! important; }');addGlobalStyle('#app-outer-wrap h3  { font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 0 0 ! important;}');
addGlobalStyle('.content a { font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 0 0 ! important;}');
addGlobalStyle('#app-outer-wrap p { font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 0 0 ! important;}');
addGlobalStyle('.errorbox-good{ font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 0 0 ! important;}');
addGlobalStyle('.row-set-descriptor {font-size: 100% ! important; padding: 0 0 0 0 ! important; }');
addGlobalStyle('#app-outer-wrap h3  { font-size:100% ! important; min-height:0px ! important; background:none ! important; margin:0 0 0 0 ! important;}');
addGlobalStyle('.save-message-inner {font-size: 100% ! important; padding: 0 0 0 0 ! important; }');
addGlobalStyle('.save-message-inner {font-size: 100% ! important; padding: 0 0 0 0 ! important; }');

// copyright (2) 2007 Improblus
document.getElementById('wrap2').style.width = '100%';
document.getElementsByTagName('textarea')[0].setAttribute('cols', 36); 
// end Improblus

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

