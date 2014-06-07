// ==UserScript==
// @name          soundsnap.com downloader
// @namespace     
// @author        tonypai
// @description   Add a download button at category page, easy and quick!
// @include       http://*soundsnap.com*
// ==/UserScript==

// get all objs
var objs = document.getElementsByClassName("ojoo-teaser");
for(var i=0; i<objs.length; i++) {
	
	// match id
	var id = objs[i].id.match(/node-(\d{1,})/)[1];
	
	// source url (before substitution)
	var url = "uggc://jjj.fbhaqfanc.pbz/nhqvb/cynl/"+id+"&cynlreVQ="+id+"&genpx=0k000000&evtugot=0kS27R20&yrsgot=0kOOP5Q8&ot=0kS5S9SQ&evtugvpba=0k000000&yrsgvpba=0k2O3R4Q&nhgbfgneg=ab";;
	var code = {"a": "n","b": "o","c": "p","d": "q","e": "r","f": "s","g": "t","h": "u","i": "v","j": "w","k": "x","l": "y","m": "z","n": "a","o": "b","p": "c","q": "d","r": "e","s": "f","t": "g","u": "h","v": "i","w": "j","x": "k","y": "l","z": "m"};
	var src = "";
	
	// restore
	for(var j=0; j<url.length; j++) {
		if(url[j]=="."||url[j]==":"||url[j]=="/"||url[j]=="&"||url[j]=="="||url[j]=="1"||url[j]=="2"||url[j]=="3"||url[j]=="4"||url[j]=="5"||url[j]=="6"||url[j]=="7"||url[j]=="8"||url[j]=="9"||url[j]=="0")
			src += url[j]
		else
			src += code[url[j]]
	}

	// replace image url and href
	var dom = objs[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0]
	dom.getElementsByTagName('img')[0].src = "http://findicons.com/files/icons/2152/snowish/128/down.png";
	dom.title = "download"
	dom.href = src
}