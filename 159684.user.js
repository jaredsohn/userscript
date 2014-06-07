// ==UserScript==
// @name          Popmundo V2 Forum Looks v1
// @namespace     http://userstyles.org
// @description	  Popmundo V2 Forum Looks v1
// @author        vincefloyd
// @homepage      http://userstyles.org/styles/83333
// @include       http://123.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://123.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://*.123.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://*.123.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://124.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://124.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://*.124.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://*.124.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://125.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://125.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://*.125.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://*.125.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://126.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://126.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://*.126.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://*.126.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://www.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://www.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       http://*.www.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @include       https://*.www.popmundo.com/Forum/Popmundo.aspx/Thread/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "div.tbslw {\nbackground: url(http://www.haberkalem.com/static/images/detail/white-grey-background.jpg);\nheight: 25px;\n}\n\ndiv.tbfbll {\nmargin-left: 20px;\ndisplay: none;\n}\n\ndiv.tb div.tbcy {\nbackground: #ffffb1;\n    border: 1px solid #6D7F8C;\n}\n\ndiv.tb div.tbcb {\nbackground: #6D7F8C;\ncolor: #EFF4FF;\n}\n\ndiv.tb div.tbcg {\nbackground: #EFF4FF;\n  border: 1px solid #6D7F8C;\n}\n\n\ndiv.forumMessageTools {\nfloat: right;\nmargin-left: 10px;\nmargin-top: 11px;\n}\n\ndiv.tb div.tbcw {\nbackground: #EFF4FF;\nborder: 1px solid #6D7F8C;\n}\n\ndiv.tbfblr {\nmargin-right: 0px;\ntext-align: right;\nbackground: #fcfcfc;\nborder: 1px solid #6D7F8C;\nborder-top: 0px;\n}\n\ndiv.marginWrapper {\nmargin-left: 0px;\nmargin-right: 0px;\n  background-color: #fff;\npadding-bottom:1px;\n  padding-top:5px;\n\n}\n\ndiv.forumMessageHeader {\nmargin-bottom: 10px;\nmargin-right: -10px;\nmargin-left: -10px;\npadding-top: 7px;\npadding-left: 7px;\nmin-height: 30px;\nmargin-top: -10px;\nbackground-color: #d1e1e5;\nborder-bottom: 1px solid #6D7F8C;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();