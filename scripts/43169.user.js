// ==UserScript==
// @name	   Bugzilla: hide old comments
// @namespace      http://www.ucw.cz/
// @description    Hide comments older than a week
// @include	   https://bugzilla.novell.com/show_bug.cgi?id=*
// @include	   https://bugzilla.novell.com/process_bug.cgi
// @include	   https://bugzilla.novell.com/post_bug.cgi
// @include	   https://bugzilla.novell.com/attachment.cgi
// ==/UserScript==

var origdatere=/20\d\d-\d\d-\d\d \d\d:\d\d(?::\d\d)* [A-Z][A-Z][A-Z]/;
var curdate=new Date();

function parse_date(dd) {
	var is =  new String(dd);
	var so = new String;
	var s;
	s = is.match(origdatere);
	if (s == null) {
		return 0;
	}
	so=s[0];
	so=so.replace(/ [A-Z][A-Z][A-Z]$/,"");
	so=so.replace(/ (\d\d:\d\d)$/," $1:00");
	if(!window.opera) {
		so=so.replace(/^(\d\d\d\d)-(\d\d)-(\d\d) /,"$2 $3 $1 ");
	}
	var d = new Date(so);
	return d;
}

function find_first_comment_of_last_week() {
	var elements = document.evaluate("//span[contains(@class, 'bz_comment_time')]/..",document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var t;
	var comment_id = new String("");
	var dd = new Date;
	var rc = new Number (9999);
	var cn = new Number;

	for (x=0;x<elements.snapshotLength;x++) {
		var thisElement = elements.snapshotItem(x);
		var head = document.evaluate("./span[contains(@class,'bz_comment_time')]",thisElement,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var pre = document.evaluate("./../pre[contains(@id,'comment_text_')]",thisElement,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		cn = new Number(new String(pre.id).replace(/comment_text_/,""));
		if (cn < rc) {
			dd = parse_date(head.innerHTML);
			if ((curdate - dd) < (7 * 24 * 3600 * 1000)) {
				rc = cn;
			}
		}
	}
	return rc;
}

function write_script() {
	var first_comment_of_last_week = new Number(find_first_comment_of_last_week());
	if (first_comment_of_last_week == 9999)
		return 0;

	var scriptobj = document.createElement("script");
	scriptobj.setAttribute("type","text/javascript");
	scriptobj.innerHTML = ("<" + "!-" + "-\n    var first_comment_of_last_week = " + first_comment_of_last_week + ";\n\nfunction collapse_upper_comments(limit) {\n var comments = document.evaluate(\"//pre[contains(@id,'comment_text_')]\",document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\n for (var x = 0; x < comments.snapshotLength; x++) {\n var comment = comments.snapshotItem(x);\n var id = new Number (new String(comment.id).replace(/^comment_text_/,\"\"));\n var link = document.getElementById('comment_link_' + id);\n if (id < limit)\n collapse_comment(link, comment);\n else\n expand_comment(link, comment);\n }\n }\n\n//--" + ">\n\n");

	var linkobj = document.evaluate("//form[contains(@name,'changeform')]//a[contains(@onclick,'toggle_all_comments')]",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var newlink = linkobj.cloneNode(false);
	newlink.innerHTML = "Collapse comments older than a week";
	newlink.setAttribute("onClick","collapse_upper_comments(first_comment_of_last_week); return true;");
	newlink.setAttribute("href","#c" + first_comment_of_last_week);

	var separator = document.createTextNode(" - ");

	var placement = document.evaluate("//form[contains(@name,'changeform')]//hr",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	linkobj.parentNode.insertBefore(scriptobj,linkobj);
	placement.parentNode.insertBefore(separator,placement);
	placement.parentNode.insertBefore(newlink,placement);
}

write_script();

/* the in-document code is duplicated below for opera browser */

var first_comment_of_last_week = new Number(find_first_comment_of_last_week());
function collapse_upper_comments(limit) {
	var comments = document.evaluate("//pre[contains(@id,'comment_text_')]",document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var x = 0; x < comments.snapshotLength; x++) {
		var comment = comments.snapshotItem(x);
		var id = new Number (new String(comment.id).replace(/^comment_text_/,""));
		var link = document.getElementById('comment_link_' + id);
		if (id < limit)
			collapse_comment(link, comment);
		else
			expand_comment(link, comment);
	}
}
