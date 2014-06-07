// Newsgator Beautifier v0.1
// http://blog.premii.com
// Last updated: 12/14/05
// 
// CSS Framed Layout, one scrollbar for feeds/folders and one for articles 
// Multiple columns
// Stylesheets for printer,
//
// ==UserScript==
// @name          Newsgator
// @namespace     http://blog.premii.com/
// @include       http://www.newsgator.com/ngs/subscriber/WebEd2*
// @description   adds separate css-scrollbar for list of feeds and artical posts.  Also adds stylesheet for printing.
// ==/UserScript==


(function() {
	var divPosts = document.getElementById('divPosts');

	var div = divPosts.getElementsByTagName('div')[0];
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');
    style.innerHTML = '#sidebar {position:fixed; top:125px; float:left; height:89%; width:257px; overflow:auto;}#content-wrapper {position:relative; top:60px;}#header-wrapper {position:fixed; width:100%; height:65px; z-index:10; } #main-wrapper {position:relative; top:63px;} #content-header {position:fixed; width:100%; heigth:30px; z-index:9; }#divPosts table{display:none; } #divPosts {clear:left;}#divPosts:after {content:"."; display:block;height:0;clear:both;visibility:hidden;} .entry, .altentry {margin:0; padding:0; width:46%; border:1px solid #ccc;} .entry {float:left;clear:left;} .altentry {float:right;clear:right;}';
    divPosts.insertBefore(style, div);
	
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		style = document.createElement('style');
		style.setAttribute('media', 'print');
		style.type = 'text/css';
		style.innerHTML = '* {margin:0; padding:0; background:#fff; font-family:candara,Trebuchet MS !important;}#sidebar {display:none;}#content-wrapper {position:relative; background:#ccc; margin:0; padding:0; background-image:none;}#header-wrapper {display:none; } #main-wrapper {position:relative; background:#fff; }#content-header {display:none;}#divPosts table{display:none; } #divPosts {clear:left;}#content {}.postdiv {margin:0 -10px; padding:0;}.entry, .altentry {margin:0; padding:0; border-bottom:2px solid #555;background:#fff; font-size:120%;} .entry-footer img, .entry-footer a{display:none; }.entry h1 a, .entry h1 a:visited, .altentry h1 a {font-size:14px; } ';
		head.appendChild(style);
	}
	var link = document.getElementsByTagName('head')[0];
	link.setAttribute('media', 'screen');
})();