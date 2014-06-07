// ==UserScript==
// @name          Mail.ru message view: "Mark as Unread" command
// @namespace     http://*.mail.ru/cgi-bin/readmsg*
// @description   Adds "Mark as Unread" command to command bar on Mail.ru message view page, allowing you to return to message list marking message you were viewing as "unread".
// @include       http://*.mail.ru/cgi-bin/readmsg*
// ==/UserScript==

// find id of current message
function get_msgid(){
	var msgid;
	var links=document.getElementsByTagName("a");
	if (!links.length) { return; }
	for (var i=0; i<links.length; i++){
		var match;
		if (match=/sentmsg.*reply.*[?&]id=(\d+)/.exec(links[i].href)) { msgid=match[1]; break; }
	}
	// GM_log("MSG ID: "+msgid);
	return msgid;
}

function skip_siblings(element, skip){
	for (var i=0; i<skip; i++){
		element=element.nextSibling;
	}
	return element;
}

var msgid=get_msgid();
var insert_after_sibling=2;

var allTables=document.getElementsByTagName("table");
if (!allTables.length) { return; }
for (var i=0; i<allTables.length; i++){
	if(allTables[i].className=="mail_opc"){
		var after=allTables[i].getElementsByTagName("tr");
		if (!after.length) { return; }
		after=after[0].getElementsByTagName("td");
		if (!after.length) { return; }
		after=skip_siblings(after[0], insert_after_sibling);
		// construct new elements for mail_opc bar 
		// TODO: clone them from existing elements, replacing text, alt, img and link separately
		// new menu item
		var mark_unread=document.createElement("td");
		mark_unread.setAttribute("nowrap", "nowrap");
		mark_unread.innerHTML='<a href="movemsg?markmessage=1&mark=+%EE%EA+&id='+msgid+'"><img align=absmiddle src=http://img.mail.ru/mail/ru/images/500.gif width=14 height=14 title="Mark as unread" hspace=4></a><a href="movemsg?markmessage=1&mark=+%EE%EA+&id='+msgid+'">Unread</a>';
		// new menu separator
		var td_opc_after=document.createElement("td");
		td_opc_after.setAttribute("width", "4%");
		td_opc_after.innerHTML='<img src=http://img.mail.ru/0.gif width=2 height=1>';
		// reverse "unshift" order
		after.parentNode.insertBefore(td_opc_after, after);
		after.parentNode.insertBefore(mark_unread, after);
	}
}
