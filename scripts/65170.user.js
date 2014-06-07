// ==UserScript==
// @name vk-down-music
// @include http://vkontakte.ru/*
// @include https://vkontakte.ru/*
// ==/UserScript==
function $x(xpath,root,cb){
	root=root?root:document;
	var a=document.evaluate(xpath,root,null,7,null);
	if(cb){
		for(var i = 0; i < a.snapshotLength; i++) {
			cb(a.snapshotItem(i));
		}
		return a.snapshotLength;
	}else{
		var b=[];
		for(var i = 0; i < a.snapshotLength; i++) {
			b[i] = a.snapshotItem(i);
		}
		return b;
	}
}

function Text(txt){
	return document.createTextNode(txt);
}

function mkdl(e){
	var s=e.getAttribute("onclick");
	var src=/'(http:\/\/.*?)'/.exec(s);
	if(src){
		var a=document.createElement("a");
		a.setAttribute("href",src[1]);
		a.appendChild(Text("Download"));
		e.parentNode.appendChild(document.createElement("br"));
		e.parentNode.appendChild(a);
		e.parentNode.setAttribute("style","text-align:center;vertical-align:top");
	}
}
function DO(){


$x("//img[@class='playimg']",document,mkdl);
}
window.addEventListener("load",DO,0);