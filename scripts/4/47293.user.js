// ==UserScript==
// @name           Third Party Content Remover
// @description    Great for removing ads. (I still recomend using Adblock Plus) (There are tools under User Script Commands)
// @include        *
// @exclude        file:///*
// @exclude        data:*/*;base64,*
// ==/UserScript==
// If you are looking at the code to manually edit the white list go to about:config and "paste greasemonkey.scriptvals./Third Party Content Remover.WL" without quotes.
var whiteList;
if (GM_getValue("WL")){
	whiteList = GM_getValue("WL");
}
else{
	whiteList = '';
}
function Removed(e){
	if (!removed) {
		removed='Nothing has been removed.';
	}
	alert('Removed Objects:\n'+removed.slice(0,removed.length-1));
}
function add2List(e){
	var WL = prompt("Please enter sites to allow as a 3ed party.\nSeparate them with commas (,).\nUse base 2nd level Domains\nex: photobucket.com,tinypic.com,tinyurl.com,gmodules.com\nType 'ClearWhiteList' (without quotes) to reset the White List","")
	if (WL == 'ClearWhiteList'){
		GM_deleteValue("WL");
	}
	else if (WL==''){
		//Apparently you just want to view the list.
	}
	else if (WL.indexOf('.')==-1){
		alert('I thought I told you to use base 2nd level Domains.');
	}
	else if (!GM_getValue("WL")) {
		GM_setValue("WL", WL);
	}
	else if (GM_getValue("WL")){
		GM_setValue("WL", GM_getValue("WL")+','+WL);
	}
	if(GM_getValue("WL")){
		alert("Your White List contains:\n"+GM_getValue("WL").replace(/,/g,'\n'));
	}
	else{
		alert("Your White List is empty.");
	}
}
var loc, This, i, x, l, temp, note, removed;
loc = document.domain;
for (i=0;i<=i+1;i++){
	//This changes stuff like 's2c.d.example.com' or 'sage.example.com' to 'example.com' for evaluation.
	if(loc.indexOf('.')!=loc.lastIndexOf('.')){
		//Anything in here is getting sliced and diced, lol
		loc=document.domain.slice(document.domain.indexOf('.')+1);
	}
	else{
		//There is no more stuff to remove from search term.
		break;
	}
}
note = "This has been removed by the 'Third Party Content Remover' GreaseMonkey script";
//The note will show up to remind you the page was edited when viewing the source code with firebug. (https://addons.mozilla.org/en-US/firefox/addon/1843)
removed='';
for (i=0;i < document.getElementsByTagName('link').length;i++) {
	This = document.getElementsByTagName('link')[i]; 
	if (This.href) {
	//Anything in here has a href attribute.
		if (This.href.slice(0,4) !='data:') {
			//Anything in here is not a data uri.
			temp = document.createElement('a');
			temp.setAttribute('href',This.href);
			source = temp.hostname;
			for (x=0;x<=x+1;x++) {
				//This changes stuff like 's2c.d.example.com' or 'sage.example.com' to 'example.com' for evaluation.
				if(source.indexOf('.')==source.lastIndexOf('.')){
					//There is no more stuff to remove from search term.
					break;
				}
				else{
					//Anything in here is getting sliced and diced, lol
					source=source.slice(source.indexOf('.')+1,source.length);
				}
			}
			//Anything in here has a href attribute.
			if (source.search(loc) == -1) {
				//Anything at this level is not first party.
				if (whiteList != "") {
					//There is apparently a white list.
					if (whiteList.search(source) == -1) {
						//Anything in here is not in the white list.
						removed+='\n'+This.href+'\n';
						if (This.innerHTML) {
							This.innerHTML=note;
						}
						else {
							This.title=note;
						}
						This.style.display='none';
						This.href=null;
					}
				}
				else {
					//There is apparently no white list.
					removed+='\n'+This.href+'\n';
					This.title=note;
					This.href=null;
				}
			}
		}
	}
}
window.addEventListener("load", function(e) {
	for (i=0;i < document.getElementsByTagName('*').length;i++) {
		This = document.getElementsByTagName('*')[i]; 
		if (This.src) {
		//Anything in here has a src attribute.
			if (This.src.slice(0,4) !='data:'){
			//Anything in here is not a data uri.
				temp = document.createElement('a');
				temp.setAttribute('href',This.src);
				source = temp.hostname;
				for (x=0;x<=x+1;x++){
					//This changes stuff like 's2c.d.example.com' or 'sage.example.com' to 'example.com' for evaluation.
					if(source.indexOf('.')==source.lastIndexOf('.')){
						//There is no more stuff to remove from search term.
						break;
					}
					else{
						//Anything in here is getting sliced and diced, lol
						source=source.slice(source.indexOf('.')+1,source.length)
					}
				}
				//Anything in here has a search attribute.
				if (source.search(loc) == -1) {
					//Anything at this level is not first party.
					if (whiteList != "") {
						//There is apparently a white list.
						if (whiteList.search(source) == -1) {
							//Anything in here is not in the white list.
							removed+='\n'+This.src+'\n';
							if (This.innerHTML) {
								
								This.innerHTML=note;
							}
							else {
								This.value=note;
							}
							This.src=null;
							This.style.display='none';
						}
					}
					else {
						//There is apparently no white list.
						removed+='\n'+This.src+'\n';
						if (This.innerHTML) {
							This.innerHTML=note;
						}
						else {
							This.value=note;
						}
						This.src=null;
						This.style.display='none';
					}
				}
			}
		}
	}
}, false);
GM_registerMenuCommand("View a list of content removed by 'Third Party Content Remover'.", Removed);
GM_registerMenuCommand("Add sites to 'Third Party Content Remover' White List.", add2List);