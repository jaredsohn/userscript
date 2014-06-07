// ==UserScript==
// @name        4chan hyperlinks
// @namespace   http://userscripts.org/users/33432
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @version     1.2.6
// ==/UserScript==

var maxLinkLength=35;

function linkLength(text){
	var res=text.length;

	var matches=text.match(/[,&]/g);
	for(var i in matches) res+=4;

	return res;
}

function processText(state){
	var match;
	do{
		var continuationLink=state.continuationLink;
		
		if(continuationLink && state.e.textContent.length!=0){
			match=state.e.wholeText.match(/^([^\s"<>]*)(.*)$/);
			if(match==null) break;
			
			var continuationText=match[1];
			var remainingText=match[2];
			
			if(state.e.previousSibling && state.e.previousSibling.tagName=="BR")
				state.parent.removeChild(state.e.previousSibling);
			
			state.e.textContent=remainingText;
			
			var len=linkLength(continuationText);
			
			continuationLink.textContent=continuationLink.textContent+continuationText;
			continuationLink.href=continuationLink.href+continuationText;
			
//			console.log("A "+len+" ["+continuationText+"] ["+remainingText+"]")
			
			if(len>=maxLinkLength){
				break;
			} else{
				state.continuationLink=null;
			}
			
			continue;
		}
		
		match=state.e.wholeText.match(/^(.*?(>?))((?:https?:\/\/|magnet:)[^\s"<>]*)(.*)$/);
		if(match==null) break;
		
		var preText=match[1];
		var green=match[2];
		var linkText=match[3];
		var text=match[4];
		
		state.e.textContent=preText;
		state.offset+=preText.length;
		
		var link=document.createElement('a');
		link.href=linkText;
		link.textContent=linkText;
		state.parent.insertBefore(link,state.e.nextSibling);

		var len=linkLength(linkText);
		if(green) len+=4;
		
//		console.log("M "+len+" ["+preText+"] ["+linkText+"]")
		
		if(len>=maxLinkLength)
			state.continuationLink=link;
		
		state.e=link;
		
		if(text==null || text=="") break;
		
		state.e=document.createTextNode(text);
		state.parent.insertBefore(state.e,link.nextSibling);
		
	} while(1);
}

function processElements(state){
	var elem=state.e;
	
	for(var e=elem.firstChild;e!=null;e=e.nextSibling){
		state.parent=elem;
		state.e=e;
		
		if(e.nodeType==3){
			processText(state);
		} else if(e.className && e.className=="spoiler" && e.textContent=="" && e.previousSibling.tagName=='A'){
			state.continuationLink=e.previousSibling;
			elem.removeChild(e);
			e=state.continuationLink;
		} else if(e.tagName && e.tagName=="WBR"){
			if(state.continuationLink){
				var ee=e.previousSibling;
				elem.removeChild(e);
				e=ee;
			}
		} else if(e.nodeType==1 && e.tagName!='A'){
			processElements(state);
		}
	}
}

function processBlockquotes(elem){
	var list=elem.getElementsByTagName('blockquote');

	for(var i=0;i<list.length;i++) {   
		var blockquote = list[i];   
		
		var state={
			continuationLink: null,
			parent: null,
			e: blockquote,
		};
		
		processElements(state);
	}
}

processBlockquotes(document.body)

document.addEventListener('DOMNodeInserted', function (e) {
	processBlockquotes(e.target);
}, false);

