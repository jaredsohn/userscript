// ==UserScript==
// @name           Ankhet Sphinx Autofill
// @namespace      Ankhet
// @description    Search QDB and autofill Sphinx.
// @include        http://www.ankhet.com/*
// @include        http://qdb.ankhet.info/sub_qdb/Search.aspx
// ==/UserScript==


// Only runs on ankhet.
var sphinx = document.getElementById("ctl00_txtAnswer");
if ( sphinx ) {
	var QDB = document.createElement("iframe");
	QDB.setAttribute('id','qdb');
	QDB.setAttribute('name','qdb');
	QDB.setAttribute('width','780px');
	QDB.setAttribute('height','460px');
	var ASK = document.createElement("input");
	ASK.setAttribute("type","button");
	ASK.setAttribute("value","ASK");
	ASK.addEventListener('click',function(ev){
	
		if ( document.getElementById("ctl00_lblText") ) {
			var txtSearch = document.getElementById("ctl00_lblText").firstChild.nextSibling.nextSibling.nextSibling.textContent;
		}
		if ( document.getElementById("ctl00_lblQuestion") ) {
			var txtSearch = document.getElementById("ctl00_lblQuestion").firstChild.nextSibling.nextSibling.nextSibling.textContent;
		}
		unsafeWindow.frames["qdb"].postMessage(txtSearch, "*");
	},false);
	var ANSWER = document.createElement("input");
	ANSWER.setAttribute("type","button");
	ANSWER.setAttribute("value","ANSWER");
	ANSWER.addEventListener('click',function(ev){
		unsafeWindow.frames["qdb"].postMessage("ANSWER", "*");

	},false);
	sphinx.parentNode.appendChild(ASK);
	sphinx.parentNode.appendChild(ANSWER);
	sphinx.parentNode.appendChild(QDB);
	document.getElementById("qdb").src = "http://qdb.ankhet.info/sub_qdb/Search.aspx";
	
	unsafeWindow.window.addEventListener("message", function(event){
		document.getElementById("ctl00_txtAnswer").setAttribute("value",event.data);
	}, false);
}

// Only runs on the QDB frame.
if ( window.location == "http://qdb.ankhet.info/sub_qdb/Search.aspx" ) {
	unsafeWindow.window.addEventListener("message", function(event){
		if ( event.data == "ANSWER" ) {
			var themoney = document.getElementById("Datagrid1") //table
				.firstChild.nextSibling //text/tbody
					.firstChild.nextSibling.nextSibling //tr/tr/tr
						.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling //text/td/td/td/td/td
							.textContent;
			unsafeWindow.parent.postMessage(themoney, "*");
		} else {
			document.getElementById("txtSearch").setAttribute("value",event.data);
			unsafeWindow.theForm.submit();
		}
	}, false);
}
