// ==UserScript==
// @name           Remove window.open on OTVR
// @description  Remove window.open on OTVR
// @include        http://*.onlinetvrecorder.com/index.php*
// ==/UserScript==

function mkInputActivator(selectid){
	return function(evt){
		cbid=("checkboxdelete"+(parseInt(selectid)-1));
		document.getElementById(cbid).checked=(!document.getElementById(cbid).checked);
		document.getElementById("cell_a_"+selectid).parentNode.style.background=(document.getElementById(cbid).checked?"rgb(205,217,235)":"transparent");
	};
}


function performOnAllChildnodes(HTMLNode, Action){
	var regExp=/cell_a_(\d*)/i;
	
	for(var i=0;i<HTMLNode.childNodes.length;i++){
		if(HTMLNode.childNodes[i].nodeName!="#text" && !regExp.test(HTMLNode.childNodes[i].id) ) performOnAllChildnodes(HTMLNode.childNodes[i], Action);
	}
	if(HTMLNode.nodeName!="#text" && !regExp.test(HTMLNode.id) ) Action(HTMLNode);
}

function mkTrans(Node){
	Node.style.background="transparent";
}


function main(){
	var links=document.getElementsByTagName("a");
	var regExp=/.*window\.open.*?\(.*?['"](.*?)['"].*/i;
	
	for (var i=0;i<links.length;i++){
		var link=links[i];
		if(regExp.test(link.href)){
			realUrl=regExp.exec(link.href);
			link.href=realUrl[1];
		}
	}
	
	
	var links=document.getElementsByTagName("td");
	var regExp=/cell_a_(\d*)/i;
	
	for (var i=0;i<links.length;i++){
		var link=links[i];
		if(regExp.test(link.id)){
			id=regExp.exec(link.id)[1];
			performOnAllChildnodes(link.parentNode, mkTrans);
			link.parentNode.addEventListener("click",mkInputActivator(id),false);
		}
	}
	
	
	unsafeWindow.showToolTip=function(){};
}

main();