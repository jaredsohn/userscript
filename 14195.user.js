// ==UserScript==
// @name           Kill Myspace RTE Posts
// @namespace      myspace.com/xenomark
// @description    sets font styles for forum posts so wankers can't annoy you with outragious text from the new editor...
// @include        http://forums.myspace.com/p/*
// @include        http://forums.myspace.com/t/*
// @include        http://forums.myspace.com/Reply.aspx*
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.ForumPostContentText * {font-family:verdana; color:black; font-style:normal; font-weight:normal; text-decoration:none; font-size:10pt} .ForumPostContentText a{color:blue; text-decoration:underline;} .ForumPostContentText a:hover {color:red;}');

var allimgs, thisimg;
allimgs = document.getElementsByTagName('img');
for (var i = 0; i < allimgs.length; i++) {
	thisimg = allimgs[i];
	var imgurl = thisimg.getAttribute('src'); 
        imgurl = imgurl.substring(0,69);
	var emote = "http://x.myspace.com/js/tiny_mce/jscripts/tiny_mce2/plugins/emotions/"
	var emote2 = "http://x.myspace.com/modules/common/static/img/richtexteditor/images/"
	var emote3 = "http://x.myspacecdn.com/modules/common/static/img/richtexteditor/imag"
	if (imgurl == emote||imgurl ==emote2||imgurl ==emote3) {
		var imgwidth = thisimg.getAttribute('width');
		var imgheight = thisimg.getAttribute('height');
		if (imgwidth > 50 | imgheight > 50) {
    			thisimg.setAttribute ('style','border-style: solid;border-width: thin;border-color: red;height: 16px;width: 16px;');
		}
	}
}

