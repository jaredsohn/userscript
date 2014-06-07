// ==UserScript==
// @name           Inbox Folders
// @namespace      pbr
// @include        http://goallineblitz.com/game/inbox.pl*
// @include        http://goallineblitz.com/game/message.pl?id=*
// @version		   09.01.07
// ==/UserScript==

window.setTimeout( 
	function() {
		if (window.location.href.toString().indexOf("inbox.pl") != -1) {
			inbox_main();
		}
		else {
			message_main();
		}
	}, 
	200
);

function message_main() {
	var folders = GM_getValue("pbr_inbox","Uncategorized");
	folders = folders.split("\t");
	
	for (var i=0; i<folders.length; i++) {
//		console.log(folders[i]);
	}
	
	var head = document.getElementById("message_container");
	var span = document.createElement("span");
	head.parentNode.insertBefore(span, head);
	
	var select = document.createElement("select");
	select.setAttribute("id","Add Tag Select");
	for (var i=0; i<folders.length; i++) {
		if (folders[i] == "") continue;
		var opt = document.createElement("option");
		opt.text = folders[i];
		opt.value = folders[i];
		select.appendChild(opt);
	}
	
	span.appendChild(select);
	
	var blank = document.createElement("input");
	blank.setAttribute("type","text");
	blank.setAttribute("id","Add Tag Input Box");
	blank.setAttribute("value","");
	blank.setAttribute("size","16");
	blank.setAttribute("style","margin-left: 10px; margin-right: 10px");
	span.appendChild(blank);
	
	var add = document.createElement("input");
	add.setAttribute("type","button");
	add.setAttribute("value","Add Tag");
	add.setAttribute("id","Add Tag");
	add.setAttribute("style","margin-left: 10px; margin-right: 10px");
	add.addEventListener("click",editFolder,false);
	span.appendChild(add);
	
	var folderList = document.createElement("span");
	folderList.setAttribute("id","message_folders");
	
	var msgId = window.location.href.toString();
	msgId = msgId.slice(msgId.indexOf("=")+1);

	folderList.appendChild(getMessageFolderList(msgId));
	span.appendChild(folderList);
}

function getMessageFolderList(id) {
	var list = document.createElement("span");
	
	var folders = GM_getValue("pbr_inbox","Uncategorized");
	folders = folders.split("\t");

//	console.log("fld="+folders);
	for (var i=0; i<folders.length; i++) {
		var indexes = GM_getValue("pbr_inbox_"+folders[i],"");
		indexes = indexes.split("\t");
		if (indexes == "") continue;
//		console.log(folders[i]+" --- ind="+indexes);
		for (var j=0; j<indexes.length; j++) {
			if (indexes[j] == id) {
				if (list.childNodes.length > 0) {
					var span = document.createElement("span");
					span.setAttribute("style","margin-left: 2px; margin-right: 2px;");
					span.innerHTML = "|";
					list.appendChild(span);
				}
				var span = document.createElement("a");
				span.addEventListener("click",deleteTag,true);
				span.setAttribute("style","margin-left: 5px;");
				span.innerHTML = folders[i];
				list.appendChild(span);				
				
				break;
			}
		}
	}
	return list;
}

function deleteTag(event) {
//	console.log("deleting tag : "+event.target.innerHTML);
	
	var msgId = window.location.href.toString();
	msgId = msgId.slice(msgId.indexOf("=")+1);
	
	var indexes = GM_getValue("pbr_inbox_"+event.target.innerHTML,"");
	indexes = indexes.split("\t");
	for (var i=0; i<indexes.length; i++) {
		if (indexes[i] == msgId) {
			indexes[i] = "";
			break;
		}
	}
	var newIndexes = "";
	for (var i=0; i<indexes.length; i++) {
		if (indexes[i] == "") continue;
		newIndexes += indexes[i]+"\t";
	}
	GM_setValue("pbr_inbox_"+event.target.innerHTML,newIndexes);
	
	var folderList = document.getElementById("message_folders");
	folderList.innerHTML = "";
	folderList.appendChild(getMessageFolderList(msgId));
}

function inbox_main() {
	var table = document.getElementById("messages");
	setMessageClasses(table);
	var rows = table.getElementsByTagName("tr");
	
	var tablesrc = document.createElement("table");
	tablesrc.setAttribute("id","pbr_messages");
	tablesrc.setAttribute("style","visibility: hidden");
	tablesrc.innerHTML = table.getElementsByTagName("tbody")[0].innerHTML;
	
	var folderBar = createFolderBar();
	folderBar.setAttribute("style","position: relative");
	
	table.parentNode.insertBefore(folderBar,table);
	while (table.rows.length > 1) {
		table.deleteRow(1);
	}
	
	var footer = document.getElementById("footer");
	footer.appendChild(tablesrc);	

	var delButton = document.getElementById("delete");
	delButton = delButton.getElementsByTagName("input")[0];
	delButton.addEventListener("click",deleteMessages,true);
	delButton.setAttribute("onClick","");
	delButton.onclick = "";
	
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click",false,false);
	document.getElementById("pbr_inbox_Uncategorized").dispatchEvent(evt);	
}

function setMessageClasses(table) {
	var folders = GM_getValue("pbr_inbox","Uncategorized");
	folders = folders.split("\t");

//	console.log("folders = "+folders);
	var allIndexes = new Array();
	for (var i=0; i<folders.length; i++) {
		var indexes = GM_getValue("pbr_inbox_"+folders[i],"");
//		console.log("Indexes of '"+folders[i]+"' are "+indexes);
		indexes = indexes.split("\t");
		for (var j=1; j<table.rows.length; j++) {
			var id = getMessageId(table.rows[j]);
			if (indexes.indexOf(id) != -1) {
				var c = table.rows[j].getAttribute("class");
				table.rows[j].setAttribute("class",c+" pbr_message_"+folders[i]);
				//console.log("setting messages id : "+id+" - "+folders[j]);
			}
		}
		allIndexes = allIndexes.concat(indexes);
	}
	
	for (var i=1; i<table.rows.length; i++) {
		var id = getMessageId(table.rows[i]);
		if (allIndexes.indexOf(id) == -1) {
			var c = table.rows[i].getAttribute("class");
			table.rows[i].setAttribute("class",c+" pbr_message_Uncategorized");
			//console.log("setting default id : "+id+" - Uncategorized");
		}
	}
	
	var form = document.getElementById("message_form");
	var tbl = document.getElementById("messages").getElementsByTagName("tbody")[0];
	tbl.insertBefore(form,tbl.firstChild.nextSibling);
	
}

unsafeWindow.toggleAll = function() {
	var chk = document.getElementById("checkall").checked;
	var tbl = document.getElementById("messages");
	var boxes = tbl.getElementsByTagName("input");
	for (var i=0; i<boxes.length; i++) {
		if (boxes[i].getAttribute("name") == "message_id") {
			boxes[i].checked = chk;
		}
	}
}

function deleteMessages() {
	if (confirm("Really delete the checked messages?") == true) {
		var tbl = document.getElementById("messages");
		var boxes = tbl.getElementsByTagName("input");

		var id = [];
		var string = "http://goallineblitz.com/game/inbox.pl?";
		for (var i=0; i<boxes.length; i++) {
			if (boxes[i].getAttribute("name") == "message_id") {
				if (boxes[i].checked == true) {
					string += "message_id="+boxes[i].value+"&";
					id[id.length] = boxes[i].value;
				}
			}
		}
		if (id.length > 0) {
			var folders = GM_getValue("pbr_inbox","Uncategorized");
			folders = folders.split("\t");

			console.log("folders = "+folders);
			for (var i=0; i<folders.length; i++) {
				var indexes = GM_getValue("pbr_inbox_"+folders[i],"");
//				console.log("Indexes of '"+folders[i]+"' are "+indexes);
				indexes = indexes.split("\t");
				for (var j=0; j<indexes.length; j++) {
					for (var k=0; k<id.length; k++) {
						if (indexes[j] == id[k]) {
							indexes.splice(j,1);
							j--;
						}
					}
				}
				
				var newindexes = "";
				for (var j=0; j<indexes.length; j++) {
					newindexes += indexes[j] + "\t";
				}
				GM_setValue("pbr_inbox_"+folders[i],newindexes);
//				console.log("Indexes of '"+folders[i]+"' are now "+newindexes);
			}

			
			string += "alerts=0&action=Delete";
			unsafeWindow.redirectTo(string);
		}
	}
}
	
function getMessageId(msg) {
	var input = msg.getElementsByTagName("input");
	return input[0].value;
}

function createFolderBar() {
	var folders = GM_getValue("pbr_inbox","Uncategorized");
	folders = folders.split("\t");
	var div = document.createElement("div");
	div.setAttribute("class","subhead_link_bar pbr_inbox");
	for (var i=0; i<folders.length; i++) {
		if (folders[i] == "") continue;
		var tab = document.createElement("div");
		tab.setAttribute("class","tab_off");
		
		var a = document.createElement("a");
		a.innerHTML = folders[i];
		a.addEventListener("click",clickFolder,true);
		a.setAttribute("id","pbr_inbox_"+folders[i]);
		tab.appendChild(a);
		
		div.appendChild(tab);
	}
	return div;
}

function editFolder(event) {
	var id = event.target.getAttribute("id");
	
	var select = document.getElementById("Add Tag Select");
	var text = document.getElementById("Add Tag Input Box");
	var el = document.getElementById(id);
	
	var value = "";
	if (select.value != "Uncategorized") {
		value = select.value;
	}
	else {
		value = text.value;
	}
	
	if (value != "") {
		var msgId = window.location.href.toString();
		msgId = msgId.slice(msgId.indexOf("=")+1);
		
		var folders = GM_getValue("pbr_inbox","Uncategorized");
		if (folders.indexOf("\t"+value+"\t") == -1) {
			folders = folders + "\t" + value + "\t";
			GM_setValue("pbr_inbox",folders);
			GM_setValue("pbr_inbox_"+value,"");
		}
		
		var indexes = GM_getValue("pbr_inbox_"+value);
		indexes += "\t"+msgId;
		GM_setValue("pbr_inbox_"+value,indexes);
		
		window.location = window.location.toString();
	}
}

function clickFolder(event) {
	var id = event.target.getAttribute("id");
	console.log(id);
	
	var el = document.getElementById(id);
	var tabon = el.parentNode.parentNode.getElementsByClassName("tab_on")[0];
	if (tabon != null) {
		tabon.setAttribute("class",tabon.getAttribute("class").replace("tab_on","tab_off"));
	}
	
	var c = el.parentNode.getAttribute("class");
	el.parentNode.setAttribute("class",c.replace("tab_off","tab_on"));
	
	var pbrTable = document.getElementById("pbr_messages");
	var pbrbody = pbrTable.getElementsByTagName("tbody")[0];
	var table = document.getElementById("messages");
	var body = table.getElementsByTagName("tbody")[0];
	while (table.rows.length > 1) {
		var child = body.removeChild(body.childNodes[1])
		pbrbody.appendChild(child);
	}

	messages = document.getElementsByClassName(id.replace("inbox","message"));
	for (i=0; i<messages.length; i++) {
//		console.log(messages.length+" -- "+i+" : "+getMessageId(messages[i]));
		var body = table.getElementsByTagName("tbody");
		var msg = messages[i].parentNode.removeChild(messages[i]);
		body[0].appendChild(msg);
	}
}






