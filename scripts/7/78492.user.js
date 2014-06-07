// ==UserScript==
// @name           google docs comment window changer
// @namespace      http://userscripts.org/users/geza
// @include        http://spreadsheets.google.com/ccc?*
// ==/UserScript==


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function doit(width, height) {

var playground = document.getElementById('appTable');
var node;

node = getElementsByClassName('commentDiv', playground)[0];
//console.log("n1: "+node); // debug
node.style.width=width+"px";
node.style.height=height+"px";

node = getElementsByClassName('userCommentTextArea', playground)[0];
//console.log("n2: "+node); // debug
node.style.width=width+"px";
node.style.height=height+"px";
node.cols="30";
node.rows="20";

}

function init() {
//	console.log( 'init()' ); // debug

	var playground = document.getElementById('appTable');
	if (playground != null) {
		var comment_div = getElementsByClassName('userCommentTextArea', playground)[0];
		comment_div.addEventListener('mouseover',
		function (event) {
			doit( 400, 200 ); // komment ablak méretének megadása pixelben
		},true);
	}
}

window.addEventListener("load", function(e) {
  init();
}, false);

