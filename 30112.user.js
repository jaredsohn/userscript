// ==UserScript==
// @name          Blogger in Draft Large Post Editor
// @namespace     http://fatknowledge.blogspot.com/
// @description   v1.00 - Makes the text editor box in Blogger much bigger and scrunches down the graphics on top.
// @include       http://draft.blogger.com/post-edit.g*
// @include       http://draft.blogger.com/post-create.g*
// ==/UserScript==

/*
    Author: Fat Knowledge fatknowledge@gmail.com
    Date: 2008-7-15


*/

//make the edit textbox width=100% and make the height much bigger
unsafeWindow.addEventListener('load', function() {
	var ea = document.getElementById('postingHtmlBox');
	if (ea) {
		ea.parentNode.parentNode.parentNode.parentNode.parentNode.style.width = '99%';
		ea.parentNode.style.width = '100%';
		ea.style.width = '100%';
		ea.style.height = window.innerHeight-300 +'px';
        
		//Make title textbox 475 pixels
		document.getElementById('postingTitleField').style.width = '475px';

	}
}, false);

//scrunch down all the blank space and big graphics that blogger puts on the top by updating the CSS values
addGlobalStyle('#tabnav span.content { padding:2px 18px 4px 6px ! important; }');
addGlobalStyle('#tabnav { padding:0 0 0px 0 ! important; background:none ! important; }');
addGlobalStyle('#subnav li { padding:2px 1em ! important; }');
addGlobalStyle('#header #blogname { padding: 0px 0 0px 0px ! important; }');
addGlobalStyle('#header h1  { font-size:120% ! important; min-height:0px ! important; background:none ! important; margin:0 0 .2em 0 ! important;}');
addGlobalStyle('#blogname h1 a	{padding:0 0 0 15px ! important; }');
addGlobalStyle('#body {padding: 10px 15px 0 15px ! important; }');


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}