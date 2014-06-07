// ==UserScript==
// @name           EditGrid Thinner Header
// @version        1.2
// @namespace      http://userscripts.org/users/18518
// @include        http://www.editgrid.com/user/*/*
// ==/UserScript==

var pageHead;
var pageHeadUser
var bookHead;
var menuBarHolder;
var toolBar;
var siteLogo = document.getElementById("SiteLogo");
var tables = document.getElementsByTagName("TABLE");
{
	var i = 0;
	for (i;i<tables.length;i++) {
		if (tables[i].className=="PageHead") {
			pageHead = tables[i];
			pageHeadUser = pageHead.rows[0].cells[1];
			break;
		}
	}
	for (i;i<tables.length;i++) {
		if (tables[i].className=="BookHead") {
			bookHead = tables[i];
			break;
		}
	}
	for (i;i<tables.length;i++) {
		if (tables[i].className=="MenuBarHolder") {
			menuBarHolder = tables[i];
			break;
		}
	}
	for (i;i<tables.length;i++) {
		if (tables[i].className=="ToolBar") {
			toolBar = tables[i];
			break;
		}
	}
}

//siteLogo.style.height = "23px";
//pageHead.style.height = "24px";
pageHead.style.height = "46px";
bookHead.style.display = "none";
menuBarHolder.style.display = "none";

siteLogo.addEventListener(
	"mouseover",
	function() {
		pageHead.style.display = "none";
		bookHead.style.display = "";
		menuBarHolder.style.display = "";
	},
	false);

toolBar.addEventListener(
	"mouseover",
	function() {
		pageHead.style.display = "";
		bookHead.style.display = "none";
		menuBarHolder.style.display = "none";
	},
	false);