// ==UserScript==
// @name           photobucket url upload
// @namespace      http://www.userscripts.org/people/171
// @include        *.photobucket.com/albums/*
// ==/UserScript==

function sim_key(node){

	var e = document.createEvent('KeyEvents');
	e.initKeyEvent("keypress",true,true,null,false,false,false,false,0x08,0); 
	node.dispatchEvent(e); 
}

//if(window.location.href.match("action=tageditmany")=="action=tageditmany")
//	window.location.href = window.location.href.replace("?action=tageditmany", "");


var HTML ="<div align='center'><textarea name='url' id='url' cols='50' rows='10'></textarea><br><input name='ok' id='ok' type='button' value='ok' /> </div>";

var box = document.createElement("div");
box.innerHTML = HTML;

toolb = document.getElementById("containerUploadWeb")
toolb.parentNode.insertBefore(box,toolb);

addGlobalStyle('#panelUploader_Web {height: 900px;}');
document.getElementById("ok").addEventListener("click", spliturl, true);	

for (i=3;i<=19;i++){
	document.getElementById("text_web_"+i).style.display = 'block';
}

function spliturl(){
	var url = document.getElementById("url").value
	var url_sp = url.split("\n",20)

	var i=0;
	for (i=0;i<=19;i++){
		if(url_sp[i]!=undefined){
			document.getElementById("text_web_"+i).focus();
			document.getElementById("text_web_"+i).value = url_sp[i]+" ";
			sim_key(document.getElementById("text_web_"+i));
		}
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}