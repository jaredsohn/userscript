// ==UserScript==
// @name           Userscript Links
// @namespace      userscriptinks
// @description    Add links to your scripts' home page
// @include        http://userscripts.org/home/scripts
// ==/UserScript==

var admin = "admin";
var about = "show";
var source = "review";
var reviews = "reviews";
var discussions = "discuss";
var fans = "fans";
var issues = "issues";
var upload = "upload";
var update = 'edit_src';
var edit = 'edit';

var table = document.getElementsByTagName("table")[0];
var td = null;
var url = "";

for (var i = 1; i < table.rows.length; i++) 
	try {
		url = table.rows[i].cells[0].getElementsByTagName("a")[0].href;

		td = table.rows[i].cells[1];
		td.innerHTML = '<a href="' + url.replace(about, admin) + '">admin</a>'
			+ '<a style="float: right; clear: both;" href="' + url.replace(about, source) + '">sources</a><br />'
			+ '<div style="width: 100%; text-align: center; margin: 0px; padding: 0px;"><a href="' + url.replace(about, discussions) + '">discussions</a></div>'
			+ '<a href="' + url.replace(about, reviews) + '">reviews</a>'
			+ '<a style="float: right; clear: both;" href="' + url.replace(about, issues) + '">issues</a><br />'
			+ '<a href="' + url.replace(about, update) + '">update</a>'
			+ '<a style="float: right; clear: both;" href="' + url.replace(about, upload) + '">upload</a><br />'
			+ '<a href="' + url.replace(about, fans) + '">fans</a>'
			+ '<a style="float: right; clear: both;" href="' + url.replace(about, edit) + '">description</a>';
	}
	catch (e) {
	}