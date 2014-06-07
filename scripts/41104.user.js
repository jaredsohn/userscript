// ==UserScript==
// @name           djangoproject light css
// @namespace      http://userscripts.org/
// @description    change the css of the site http://djangoproject.com/ beacuse the default one feels like someone is hitting you with a dark green hammer.
// @homepage       http://userscripts.org/
// @include        http://*.djangoproject.com/*
// @include        http://djangoproject.com/*


// ==/UserScript==
var css = 
    "@namespace url(http://www.w3.org/1999/xhtml); "+
    "body {  "+
    "    background : #FFFFEE none repeat scroll 0 0;  "+
    "    color : black;  "+
    "}  "+
    "#container   "+
    "{  "+
    "    background : white none repeat scroll 0 0;  "+
    "    border: 1px solid #092e20;  "+
    "    margin-left: 100px;  "+
    "    margin-right: 100px;  "+
    "    min-width: 750px !important;  "+
    "      "+
    "      "+
    "}  "+
    "  "+
    "#billboard  "+
    "{  "+
    "    background: #DDDD88 none repeat-x scroll 0 0 !important;  "+
    "    border-bottom: 2px solid #CCCC88 !important;  "+
    "}  "+
    "  "+
    "#billboard h2 a,  "+
    "#billboard h2  "+
    "{  "+
    "    background: transparent none no-repeat scroll 0 0 !important;  "+
    "    color: #224444 !important;  "+
    "    font-size: 12px !important;  "+
    "    font-weight: bold !important;  "+
    "    padding: 5px !important;  "+
    "    height: auto !important;  "+
    "    text-indent: 0 !important;  "+
    "    width: auto !important;  "+
    "}  "+
    "  "+
    "#billboard  "+
    "{  "+
    "    background-image: none;  "+
    "}  "+
    "  "+
    "#columnwrap {  "+
    "    background : #BBBB77 none repeat scroll 0 0;  "+
    "    padding-bottom : 2px;  "+
    "}  "+
    "  "+
    "#subwrap {  "+
    "    background:#DDDDAA none repeat scroll 0 0;  "+
    "    width:100%;  "+
    "}  "+
    "  "+
    "#content-main {  "+
    "    background:white none repeat scroll 0 0;  "+
    "}  "+
    "  "+
    "#content-related {  "+
    "    color: balck;  "+
    "}  "+
    "  "+
    "#content-secondary h2, .sidebar h2 {  "+
    "    color:black;  "+
    "    font-weight:bold;  "+
    "}  "+
    "  "+
    "#content-related dl {  "+
    "    display : none;  "+
    "}  "+
    "  "+
    "#content-extra {  "+
    "    display:none;  "+
    "    width:0;  "+
    "}  "+
    "  "+
    "#content-secondary {  "+
    "    display:none;  "+
    "}  "+
    "  "+
    "#footer {  "+
    "    background:#CCCC88 none repeat scroll 0 0;  "+
    "    color: black;  "+
    "}  "+
    "  "+
    "a:link, a:visited {  "+
    "    /* color:#DD7733; */  "+
    "    color:#cc3322;  "+
    "}  "+
    "  "+
    "#header a:link, #header a:visited {  "+
    "    color:#ffc757;  "+
    "}  "+
    "  "+
    ".button-download a {  "+
    "    color: white;  "+
    "}  "+
    "  "+
    "#banner #search  "+
    "{  "+
    "    position: relative;  "+
    "    right: 200px;  "+
    "    top: 20px;  "+
    "}  "+
    "  "+
    "#mainnav li {  "+
    "    background:#DDDD88 none repeat scroll 0 0;  "+
    "    border-left: 1px solid #092E20;  "+
    "    border-right: 2px solid #092E20;  "+
    "    border-top: 1px solid #092E20;  "+
    "    border-bottom: 1px solid #092E20;  "+
    "}  "+
    "  "+
    ".nav ul {  "+
    "}  "+
    "  "+
    "#mainnav li a:link, #mainnav a:visited,   "+
    "#mainnav :link, #mainnav :visited {  "+
    "    background: none;  "+
    "    color: #092E20;  "+
    "}  "+
    "  "+
    "#mainnav li.active {  "+
    "    background: #bbbb66 none repeat scroll 0 0;  "+
    "}  "+
    "  "+
    "pre, .literal-block {  "+
    "    background:#F4F4D0 none repeat scroll 0 0;  "+
    "    border-color:#BBBB99;  "+
    "} "+
    " "+


    "";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
