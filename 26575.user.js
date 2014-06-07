// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Accounts Page
// @description   This script removes everything except for the login box from the Google login page.  Currently supports: Google Alerts, Google Bookmarks, Google Calender, Google Docs, Google Finance, Google Reader, Google Sites, and Gmail
// @include       http*://www.google.com/accounts/*
// ==/UserScript==

/*
QueryStrings
------------
Alerts = "service=alerts"
Blog Search = 
Book Search = "service=print"
Bookmarks = "service=bookmarks"
Calender = "service=cl"
Checkout = "service=sierra"
Custom Search Engine = "service=cprose"
Docs = "service=writely"
Finance = "service=finance"
Gmail = "service=mail"
Reader = "service=reader"
Sites = "service=jotspot"
Must check for "ServiceLogin" in address or "Login"
*/

/*
parent=object, tagType=name of HTML element
*/
function getChildrenByTagName(parent, tagName) {
	var children = [], child;

	for(var i=0; child = parent.childNodes[i]; ++i) {
		if( child.tagName && new String(child.tagName).toLowerCase() == tagName.toLowerCase()) {
			children.push(child);
		}
	}

	return children;
}

if( (self.location.href.indexOf("ServiceLogin") < 0 ? true : false) && (self.location.href.indexOf("Login") < 0 ? true : false) )//check login
	return;

var queryString = function parseQueryString() {
	var loc = self.location.search.substr(1);
	var strings = loc.split("&");
	var qstring = [];
	
	for(var i=0, len=strings.length; i < len; ++i) {
		loc = strings[i].split("=");
		qstring[unescape(loc[0])] = unescape(loc[1]);
	}

	return qstring;
}();

switch(queryString["service"]) {
	case "cl"://Calendar
	case "reader"://Reader
	case "writely"://Docs
	case "finance"://Finance
		/**
		PATH=DIV#main/TABLE[1]/TR/TD[0]
		Reader, Calender, finance, notebook
		*/
		var main = document.getElementById("main");

		if(!main) return;
		var tables = getChildrenByTagName(main, "table");

		if(tables == undefined || tables.length < 2) return;

		var row = tables[1].getElementsByTagName("tr")[0];

		if(row == undefined) return;

		var cells = row.getElementsByTagName("td");

		if(cells.length < 2) return;

		row.removeChild(cells[0]);

		tables[1].style.width = "auto";

		break;

	case "mail"://Gmail
		var tables = getChildrenByTagName(document.getElementsByTagName("body")[0], "table");

		if(tables.length < 2) return;

		var rows = tables[1].getElementsByTagName("tr");

		if(rows.length < 2) return;

		var cells = rows[1].getElementsByTagName("td");

		if(cells.length < 2) return;

		rows[1].removeChild(cells[0]);
		tables[1].style.width = "auto";

		break;

	case "bookmarks"://Bookmarks
		var divs = getChildrenByTagName(document.getElementsByTagName("body")[0], "div");

		if(divs.length < 1) return;

		var row = divs[0].getElementsByTagName("tr")[0];

		if(!row) return;

		var cells = row.getElementsByTagName("td");

		if(cells.length < 3) return;

		row.removeChild(cells[1]);
		row.removeChild(cells[0]);

		break;

	case "jotspot"://Sites
	case "cprose"://Custom Search Engine
	case "print"://Book Search
	case "alerts"://Alerts
		/*
		PATH=BODY/DIV#main/TABLE[1]/TR[0]/TD[0]
		 */
		var main = document.getElementById("main");

		if(!main) return;
		
		var tables = getChildrenByTagName(main, "table");

		if(tables.length < 2) return;

		var row = tables[1].getElementsByTagName("tr")[0];

		var cells = getChildrenByTagName(row, "td");

		if(cells.length < 2) return;

		cells[1].style.paddingLeft = "0";
		cells[0].parentNode.removeChild(cells[0]);
		tables[1].style.width = "auto";
		break;

	case "sierra"://Checkout
		/*
		PATH=BODY/DIV#content
		PATH=BODY/DIV#right
		 */
		var content = document.getElementById("content");

		if(!content) return;

		var right = document.getElementById("right");

		if(!right) return;

		right.style.marginLeft = "auto";
		right.style.marginRight = "auto";
		right.style.cssFloat = "none";
		content.parentNode.removeChild(content);
		break;
		
}
