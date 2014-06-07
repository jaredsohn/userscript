// ==UserScript==
// @name           Remember The Milk Print Styles
// @description    Makes Remember The Milk tasks print with tags etc... No need to use the "Print" link on the page. Just print the page regular page.
// @namespace      http://TehOne.com/UserScripts
// @include        http://*.rememberthemilk.com/*
// @include        https://*.rememberthemilk.com/*
// ==/UserScript==

var css = "#appheader, #statusbox, #break, #searchoptions, #break2, #mapview, #tools_spacer, #tools, #detailsbox, #add-box, div.appfooter {display: none;}#listtabs ul li:not(.xtab_selected) {display:none;}#midcontent div:first-child {	border: none !important;}#tasks td.xtd {	border: none !important;	height: auto;	padding: 2px !important;}#tasks td.xtd.xtd_arr {	display:none;}#tasks td.xtd.xtd_text {	width: 100%;}#tasks td.xtd.xtd_text span.xtd_tag {	font-style: italic;	font-weight: bold;}#tasks td.xtd.xtd_prio {	text-align: center;}#tasks td.xtd.xtd_prio:after{	content: 'none';	font-size: .9em;	font-weight: bold;}#tasks td.xtd.xtd_prio.prio1:after{	content: 'high';}#tasks td.xtd.xtd_prio.prio2:after{	content: 'medium';}#tasks td.xtd.xtd_prio.prio3:after{	content: 'low';}#tasks td.xtd_check form{border: 1px solid #000; width: 14px; height: 14px;margin: 5px;}#tasks td.xtd_check input {display: none;}#content, #listbox , #list, #listwrap, #midcontent, #tasks {width: 100%;margin: 0;padding: 0;}#content {margin: 5px;}";

var heads = document.getElementsByTagName("head");

if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.media = "print";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}