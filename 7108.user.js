// ==UserScript==
// @name          Blogger Large Post Editor
// @namespace     http://fatknowledge.blogspot.com/
// @description   v1.03 - Makes the text editor box in Blogger much bigger and scrunches down the graphics on top.
// @include       http://www.blogger.com/post-edit.g*
// @include       http://www.blogger.com/post-create.g*
// ==/UserScript==

/*
    Author: Fat Knowledge fatknowledge@gmail.com
    Date: 2007-10-02

	Based on work by: Jasper de Vries, jepsar@gmail.com
	Date:   2005-12-19

*/

//make the edit textbox width=100% and make the height much bigger
unsafeWindow.addEventListener('load', function() {
	var ea = document.getElementById('textarea');
	if (ea) {
		ea.parentNode.parentNode.parentNode.style.width = '99%';
		ea.parentNode.parentNode.style.width = '99%';
		ea.parentNode.style.width = '100%';
		ea.style.width = '100%';
		ea.style.height = window.innerHeight-300 +'px';
//		ea.style.height = '415px';
        
		//Make title textbox 475 pixels
		document.getElementById('f-title').style.width = '475px';

		document.getElementById('modebar').style.width = '100%';
		document.getElementById('richbars').style.width = '100%';

		var ref = document.getElementById('richeditorframe');
		ref.style.width = '100%';
		ref.style.height = window.innerHeight-300 +'px';
//		ref.style.height = '400px';

		document.getElementById('postoptions').style.width = '100%';
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
addGlobalStyle('#modebar {padding: 0px 5px 0 3px ! important; }');
addGlobalStyle('#modebar SPAN  {padding: 2px 10px 2px 10px ! important; }');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}