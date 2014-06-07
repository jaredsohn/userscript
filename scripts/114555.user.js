// ==UserScript==
// @name           Cleaner Redmine
// @namespace      http://www.nicmyers.com
// @description    Removes the stuff in Redmine that I don't use and reworks the ugly theme.  Please update the include to add your local redmine address. 
// @include        http://
// @version 	   1.2
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
	'body,#wrapper,#main{background-color:#fff}'+
	'a, a:link, a:visited {color: #4d213b;}'+
	'a:hover, a:active {color: #DD4B39; outline:none;}'+
	'#content{box-shadow:12px 0 18px -13px #aaa , -1px 0 1px -6px #fff;}'+
	'#top-menu{margin:0 0 5px;padding:5px 18px 2px;color:#333;}'+
	'#top-menu{background-color:#575757 !important; color:#fff; }'+
	'#top-menu a{color:#fff;font-weight:normal;text-decoration:none;margin-right: 15px;}'+
	'#top-menu #loggedas{color:#aaa;}'+
	'#header{background-color: #f1f1f1;color:#666;border-bottom: 1px solid #E4E4E4;margin:0 0 15px;height:35px;}'+
	'#header:hover{opacity:1;}'+
	'#header img,#header h1{display: none;}'+
	'#quick-search{}'+
	'#quick-search input, #quick-search select{border: 1px solid #E4E4E4; background-color: rgba(255,255,255,1) }'+
	'#quick-search select{ -moz-border-radius: 0 5px 5px 0; padding: 1px 2px 2px; border-left:1px solid #ccc;}'+
	'#quick-search,#quick-search a{color: #f1f1f1;}'+
	'#quick-search a{display:none;}'+
	'#quick-search #q{margin-right:-4px;-moz-border-radius: 5px 0 0 5px;}'+
	'#main-menu{top: 6px;left:17px;}'+
	'#main-menu li a { background: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1) repeat scroll 0 0 transparent !important; -moz-border-radius: 2px; border: 1px solid rgba(0, 0, 0, 0.1);color:#666;font-size:10px; }'+
	'#main-menu li a:hover,#main-menu li a.selected {background:#fff; text-decoration: none;border: 1px solid rgba(0, 0, 0, 0.5);color:#000;}'+
	'h1, h2, h3, h4{font-family: "Century Gothic", "Tw Cen MT", Futura, "URW Gothic L", Arial, sans-serif;}'+
	'#header h1{font-family:"Century Gothic", "Tw Cen MT", Futura, "URW Gothic L", Arial, sans-serif; text-transform:uppercase; margin:0 0 0 10px;font-size:21px;font-weight:normal;color:#464646;text-shadow:0 1px 0 #fff;}'+
	'#sidebar a{ text-decoration: none; padding: 5px 10px; display: block;font-size:11px;}'+
	'#sidebar a:hover{ -moz-border-radius: 5px; background: #eeeeee;}'+
	'#sidebar h3{ color: #DD4B39;margin:10px 0 5px 10px;}'+
	'#sidebar p{margin-left:10px;}'+
	'#sidebar br{line-height: 0; }'+
	'#login-form table{ background-color: #fff; border: 1px solid #ccc; -moz-border-radius: 5px;}'+
	'#sidebar input[type="checkbox"]{float:left; margin-top: 7px;}'+
	'#sidebar label{margin-left:10px;display:block; line-height:24px;}'+
	'div.issue{border: 0 none; background: #fff;}'+
	'#content, #main.nosidebar #content{border: 0 none; }'+
	'#content h2{color:#444;}'+
	'#main.nosidebar #content{box-shadow: none !important;}'+
	'.box{background-color: #fff; border:0 none;}'+
	'.nodata,.warning{background-color:#eee !important;border:1px solid #ccc !important;color:#666 !important;}'+
	'.gantt,.calendar,.news,.settings,.roadmap,.help,.other-formats,#watchers_form{display:none !important;}'+
	'#main-menu li a.new-issue{background:#DD4B39 !important;color:#fff !important;position:absolute;right:-70px;}'+
	'#footer{display:none;}'+
	'fieldset.collapsible{border:0 none;}'+
	'fieldset.collapsed{float:left; opacity:.7;}'+
	'fieldset.collapsed:hover{ opacity:1;}'+
	'.contextual{opacity:.5;}'+
	'.contextual:hover{opacity:1;}'+
	'.buttons a{opacity:.5;}'+
	'.buttons a:hover{opacity:1;}'+
	'table.list thead th{border:0 none;}'+
	'table.list{border:0 none;}'+
	'table.list tbody td, table.list tbody tr:hover td{border:0 none; border-bottom:1px solid #E4E4E4;}'+
	'tbody tr{border-bottom:1px solid #E4E4E4;}'+
	'table.list tbody tr:hover{background-color:#f1f1f1;}'+
	'.context-menu-selection,.context-menu-selection:hover{background-color: #b5ddf7 !important;color:#333 !important;}'+
	'.context-menu-selection a, .context-menu-selection a:hover{color:#333 !important;}'+
	'div.wiki ul.toc {background: #eee; }'+
	'div.flash.notice {border-radius: 0 0 5px 5px;box-shadow: 0 0 5px #000;left: 42%;position: absolute;top: -10px;}'
);
