// ==UserScript==
// @name           SourceForge tweaks
// @namespace      none
// @include        http://sourceforge.net/tracker/*?func=detail&*
// @include        https://sourceforge.net/tracker/*?func=detail&*
// ==/UserScript==

const COMMENT_TEXTAREA_HEIGHT = 150

const COMMENT_TEXTAREA = "//textarea[@id='details']"
const COMMENT_DIV      = "//input[starts-with(@name, 'artifact_comment_')]/parent::div/following-sibling::div[@class='yui-u']/p"
const ARTIFACT_DETAIL  = "//div[@id='artifact_details_content']/p|//div[@class='yui-g box']/p"


var head = document.getElementsByTagName('head')[0];

css(".yui-gf div.first {width:12%;} .yui-gf .yui-u {width:86%;}");
foreach(ARTIFACT_DETAIL, function(p) {
	p.innerHTML = linkify(p.innerHTML)
})
foreach(COMMENT_DIV, function(p) {
	p.innerHTML = pre(diff(linkify(p.innerHTML)))
})
foreach(COMMENT_TEXTAREA, function (box) {
	box.setAttribute("style", box.getAttribute("style")+"; height: "+COMMENT_TEXTAREA_HEIGHT+"px; font-family: Monospace")
	box.setAttribute("cols", 120)
})


function pre(html) {
	return "<pre>"+removeBr(html)+"</pre>"
}

function removeBr(html) {
	return html.replace(/\r?\n/g, "").replace(/<br>/g, "\n")
}

function linkify(html) {
	return html.replace(/(https?:\/\/[a-zA-Z0-9_\-.:/?=&;#]+)/g, "<a href='$1'>$1</a>")
}

function diff(html) {
	var length = html.length
	html = replaceAll(html, /^((---|\+\+\+)\s+\S+)/, "<b>$1</b>")
	html = replaceAll(html, /^(@@\s+\S.+@@)/, "<span style='color: #0080b0'>$1</span>")
	// no diff found?
	if (html.length==length) return html
	html = replaceAll(html, /^(\+(\s+.*)?)/, "<span style='color: #00c030'>$1</span>")
	html = replaceAll(html, /^(\-(\s+.*)?)/, "<span style='color: #f00030'>$1</span>")
	return html
}

/*
 * Library
 */

function replaceAll(text, regexp, by) {
	var lines = text.split("\n")
	var out = ""
	for (var i in lines)
		out += lines[i].replace(regexp, by)+"\n"
	return out
}

function findAll(xpath, origin, sort) {
	origin!=null ? null : origin=document;
	sort ?
		sort = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE :
		sort = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, origin, null, sort, null);
}

function foreach(xpath, action, origin, order) {
	var elems = findAll(xpath, origin, order ? true : false);
	if (!elems) return 0;
	var nb = elems.snapshotLength;
	if (order && order<0)
		for (var i=nb-1; i>=0; i--)
			action(elems.snapshotItem(i), i);
	else
		for (var i=0; i<nb; i++)
			action(elems.snapshotItem(i), i);
	return nb;
}		

function css (css) {
	var style = create("style", [["type", "text/css"]], css);
	head.appendChild(style);
}

function create(tag, att, html) {
	if (!tag)
		return null;
	var e = document.createElement(tag);
	if (att && att.length!=0)
		for (var i=0; i<att.length; i++)
			e.setAttribute(att[i][0], att[i][1]);
	if (html)
		e.innerHTML = html;
	return e;
}

