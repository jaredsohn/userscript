
// Newshounds troll killer
// version 0.4
// 2005-09-27
// Released to the public domain.
//
// ==UserScript==
// @name          Newshounds Troll Killer
// @namespace     http://www.newshounds.us/greasemonkey/troll-killer/
// @description   Lets you ignore trolls easily on the Newshounds website
// @include       http://www.newshounds.us/*
// @include       http://newshounds.us/*
// @include       http://forum.newshounds.us/*
// ==/UserScript==
//
// Revision history:
// 2005-09-20: 0.1, initial version.
// 2005-09-24: 0.2, works with forums too now.
// 2005-09-24: 0.3, stores information more robustly,
//                  tracks how often and how long somebody is blocked for,
//                  menu option to view block list and remove people from it,
//					duplicate injection bug workaround included.
// 2005-09-27: 0.4, handles comments made by unregistered guests properly without dying (bug reported by ET),
//                  minimises the annoying jumping down the page when adding somebody to the block list,
//                  unblocked comments reappear automatically without needing to reload the page,
//                  adds facility to rename the ignore button (Tools | User Script Commands).
//
// Contact:
// Please report bugs by PMing user 'Jim' on the Newshounds forum.
// URL of the malfunctioning page is helpful.

if (window.trollsBlocked) return;

var head = document.getElementsByTagName("head")[0];
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "					\
									\
	#blocklist-box {				\
		position: fixed;			\
		top: 15%;					\
		left: 15%;					\
		width: 70%;					\
		height: 70%;				\
		border: 1px solid black;	\
		color: white;				\
		text-align: center;			\
		margin: -1em;				\
		padding: 1em;				\
		background: #777;			\
	}								\
									\
	#blocklist-box h1 {				\
		margin-bottom: 0.75em;		\
	}								\
									\
	#blocklist-box button.close {	\
		position: absolute;			\
		bottom: 1em;				\
		right: 1em;					\
	}								\
									\
	#blocklist-box table {			\
		width: 97%;					\
		margin: 0;					\
		padding: 0;					\
		color: black;				\
		background: #ffe;			\
		border: 1px solid black;	\
		text-align: center;			\
	}								\
									\
	#blocklist-box td {				\
		background: white;			\
		border: 1px solid black;	\
	}								\
									\
	#blocklist-box td:last-child {	\
		background: transparent;	\
		border: 0;					\
	}								\
									\
	#blocklist-box td button {		\
		border: 1px solid black;	\
		cursor: pointer;			\
	}								\
									\
	#blocklist-box .scroller {		\
		width: 85%;					\
		margin: 1em auto;			\
		max-height: 80%;			\
		overflow: auto;				\
	}								\
";
head.appendChild(style);

function inForums()
{
	if (window.location.host == "forum.newshounds.us") return true;
	return false;
}

function getName(sig)
{
	var text = sig.firstChild.nodeValue;
	if (text == "Posted by: ") {
		if (inForums()) {
			if (sig.firstChild.nextSibling.firstChild.firstChild) {
				text = sig.firstChild.nextSibling.firstChild.firstChild.nodeValue;
			} else {
				text = sig.firstChild.nextSibling.firstChild.nodeValue;
			}
		} else {
			text = sig.firstChild.nextSibling.firstChild.nodeValue;
		}
	} else {
		text = text.substring(11, text.lastIndexOf(" at "));
	}
	return text;
}

function ignore(event)
{
	var sig = event.target.parentNode;
	var name = getName(sig);
	blockList["name"].push(name);
	blockList["ignoreCount"].push(0);
	blockList["whenBlocked"].push(new Date().toLocaleString());
	GM_setValue("blockList", uneval(blockList));
	var comments = document.evaluate("//p[@class='comments-post']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < comments.snapshotLength; i++) {
		comment = comments.snapshotItem(i);
		text = getName(comment);
		if (text == name) {
			comment.parentNode.style.display = "none";
		}
	}
}

function unignore(button)
{
	var text;
	var name = button.parentNode.parentNode.firstChild.firstChild.nodeValue;
	for (var i = 0; i < blockList["name"].length; i++) {
		if (blockList["name"][i] == name) {
			blockList["name"].splice(i, 1);
			blockList["ignoreCount"].splice(i, 1);
			blockList["whenBlocked"].splice(i, 1);
		}
	}
	GM_setValue("blockList", uneval(blockList));
	var tbody = button.parentNode.parentNode.parentNode;
	tbody.removeChild(button.parentNode.parentNode);
	if (tbody.childNodes.length == 1) {
		box = tbody.parentNode.parentNode;
		box.removeChild(tbody.parentNode);
		box.appendChild(document.createElement("p"));
		box.lastChild.appendChild(document.createTextNode("You are not blocking anybody."));
	}
	var comments = document.evaluate("//p[@class='comments-post']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < comments.snapshotLength; i++) {
		comment = comments.snapshotItem(i);
		text = getName(comment);
		if (text == name) {
			comment.parentNode.style.display = "block";
		}
	}
}

window.unignore = unignore;

var buttonText = GM_getValue("buttonText", "Ignore");

var blockList = {"name": [], "ignoreCount": [], "whenBlocked": []};
var hitList = GM_getValue("hitList", "");
if (hitList != "") {
	hitList = hitList.split("<");
	var now = new Date().toLocaleString();
	for (var i = 0; i < hitList.length; i++) {
		blockList["name"].push(hitList[i]);
		blockList["ignoreCount"].push(0);
		blockList["whenBlocked"].push(now);
	}
	GM_setValue("blockList", uneval(blockList));
	GM_setValue("hitList", "");
} else {
	blockList = eval(GM_getValue("blockList", uneval(blockList)));
}

var comment;
var text;
var removed;
var b;

var comments = document.evaluate("//p[@class='comments-post']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < comments.snapshotLength; i++) {
	comment = comments.snapshotItem(i);
	text = getName(comment);
	removed = false;
	for (var j = 0; j < blockList["name"].length; j++) {
		if (blockList["name"][j] == text) {
			comment.parentNode.style.display = "none";
			removed = true;
			blockList["ignoreCount"][j] += 1;
			continue;
		}
	}
	b = document.createElement("button");
	b.setAttribute("class", "ignore");
	b.style.marginLeft = "1em";
	b.style.fontSize = "inherit";
	b.appendChild(document.createTextNode(buttonText));
	b.addEventListener("click", ignore, true);
	comment.appendChild(b);
}
GM_setValue("blockList", uneval(blockList));

function hideList(event)
{
	var box = event.target.parentNode;
	box.parentNode.removeChild(box);
}

function showList()
{
	var table, row;
	var body = document.getElementsByTagName("body")[0];
	var box = document.createElement("div");
	box.setAttribute("id", "blocklist-box");
	box.innerHTML = "<h1>Blocked Newshound Trolls</h1>";
	if (blockList["name"].length == 0) {
		box.innerHTML += "<p>You are not blocking anybody.</p>";
	} else {
		box.innerHTML += "<div class='scroller'><table><tr>\
						<th scope='column'>Name:</th>\
						<th scope='column'>Times Ignored:</th>\
						<th scope='column'>Blocked Since:</th>\
						</tr></table></div>";
		for (var i = 0; i < blockList["name"].length; i++) {
			table = box.lastChild.lastChild;
			row = document.createElement("tr");
			row.appendChild(document.createElement("td"));
			row.lastChild.innerHTML = blockList["name"][i];
			row.appendChild(document.createElement("td"));
			row.lastChild.innerHTML = blockList["ignoreCount"][i];
			row.appendChild(document.createElement("td"));
			row.lastChild.innerHTML = blockList["whenBlocked"][i];
			row.appendChild(document.createElement("td"));
			row.lastChild.appendChild(document.createElement("button"));
			row.lastChild.lastChild.appendChild(document.createTextNode("Unblock"));
			table.lastChild.appendChild(row);
			/* This should work but doesn't. */
			/* row.lastChild.lastChild.addEventListener("click", unignore, true); */
			row.lastChild.lastChild.setAttribute("onclick", "unignore(this)");
		}
	}
	box.innerHTML += "<button class='close'>Close</button>";
	box.lastChild.addEventListener("click", hideList, true);
	body.appendChild(box);
}

window.showList = showList;

GM_registerMenuCommand("Edit Newshounds Troll List", showList);

function renameButton()
{
	buttonText = prompt("Please enter new button text", buttonText);
	var buttons = document.evaluate("//button[@class='ignore']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var button;
	for (var i = 0; i < buttons.snapshotLength; i++) {
		button = buttons.snapshotItem(i);
		button.innerHTML = buttonText;
	}
	GM_setValue("buttonText", buttonText);
}

GM_registerMenuCommand("Rename Newshounds Ignore Button", renameButton);

if (inForums()) {
	var foo = document.evaluate("//table[@id='headertable']/tbody/tr[1]/td[2]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	foo.innerHTML += "<br><a href='javascript:showList();'>Edit Troll List</a>&nbsp;";
}

window.trollsBlocked = true;






