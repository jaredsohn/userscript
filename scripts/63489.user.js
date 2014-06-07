// ==UserScript==
// @name           GLB Document Title
// @namespace      DocumentTitle.js
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

function htmlDecode(s) {
	var str = new String(s);
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/"&quot;"/g, "\"");
	return str;
}

function strip(str) {
	return str.replace(/<(?:.|\s)*?>/g,"");
}

function set_title(title) {
	if (document.all||document.getElementById) {
		document.title=htmlDecode(strip(title));
	}
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var title_object = getElementsByClassName("big_head", document);
var title_text=title_object[0].innerHTML;
if (title_text[0]) {
	set_title("GLB " + title_text);
} else {
	var title_object = getElementsByClassName("big_head subhead_head", document);
	var title_text=title_object[0].innerHTML;
	if (title_text[0]) {
		set_title("GLB " + title_text);
	}
}