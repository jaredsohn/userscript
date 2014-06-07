// ==UserScript==
// @name			Middle Click Javascript Fixer
// @author			antiufo
// @version			1.2
// @date				2010-12-02
// @id					middle-click-javascript-fixer
// @homepageURL 		http://at-my-window.blogspot.com/?page=middle-click-javascript-fixer
// @namespace	antiufo
// @description    Prevents Firefox from opening blank javascript pages when using middle click, and tries to parse the javascript code to find the actually linked page or picture (when possible)
// @include          http://*
// @include          https://*
// ==/UserScript==


document.body.addEventListener("mousedown", handle_mousedown, true);
document.body.addEventListener("mouseup", handle_mouseup, true);

var suspendedLink=null;


function getActualLinkNode(event){
	var target = event.target;
	var linkNode;

	if (target instanceof HTMLAnchorElement || target instanceof HTMLAreaElement || target instanceof HTMLLinkElement){
		if (target.hasAttribute("href")) linkNode = target;
	}else {
		linkNode = event.originalTarget;
		while (linkNode && !(linkNode instanceof HTMLAnchorElement))
			linkNode = linkNode.parentNode;
		if (linkNode && !linkNode.hasAttribute("href")) linkNode = null;
	}

	return linkNode;
}

function handle_mousedown(event) {
	GM_log('mousedown');
	if ( (event.button == 1 || (event.button == 0 && (event.ctrlKey || event.shiftKey)))){
	    var target=getActualLinkNode(event);
		if(target && contentAreaClick2(target)){ event.stopPropagation(); }
	}

}


function handle_mouseup(event) {
	GM_log('mouseup');
	
	if(suspendedLink){
		var link=suspendedLink;
		window.setTimeout(function(){
			link.href=link.oldHref;
			link.ignored=false;
			if(link.actionPending){
				link.actionPending=false;
				if(link.href.indexOf('javascript:'==0) && link.href[link.href.length-1] != '#'){
					window.location=link.href;
					click(link);
				}else{
					click(link);
				}
				GM_log('executed.');
			}
		}, 1)
		suspendedLink=null;
	}
}

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

function findUrlFromCode(code){
	var tokens=code.split("'");
	for(var i=0; i<tokens.length; i++){
		if(tokens[i].indexOf('http') == 0) return tokens[i];
	}
	for(var i=0; i<tokens.length; i++){
		if(tokens[i].indexOf('/') == 0 && tokens[i].length > 7) return 'http://'+window.location.host+tokens[i];
	}
	return null;
}

function findActualUrl(node){
		var href=node.href;
		var hasJavascriptHref=(href.indexOf('javascript:')==0)
		var maybeCommand = hasJavascriptHref || (href[href.length-1] == '#')
		
		if(!maybeCommand) return false;

		if(hasJavascriptHref){
			var c=findUrlFromCode(href);
			if(c) return c;
		}

		if(node.getAttribute('onclick')){
			//alert('onclick = '+node.getAttribute('onclick'))
			return findUrlFromCode(node.getAttribute('onclick'))
		}
		return null;
}

function contentAreaClick2(linkNode)
{


	var actualHref = findActualUrl(linkNode);
	var href=linkNode.href;
	
	if(actualHref){
		GM_log('url found in code: '+actualHref)
		GM_openInTab(actualHref)
		
		

		installIgnorer(linkNode);
		return true;
	}else if(actualHref === false && (href.indexOf('http:') == 0 || href.indexOf('https:') == 0 || href.indexOf('javascript:') == 0 )){ // Just a normal link
		GM_log('just a normal link')
		return false;
	}else{ // Unrecognized command or non-http href, simulate normal click
		GM_log('unrecognized command')
		linkNode.actionPending = true;
		installIgnorer(linkNode);
		return true;
		try{
			click(linkNode)
		}catch(e){
			GM_log('onclick error: '+e)
		}
		return true;
	}
	

}

function installIgnorer(el){

	el.oldHref=el.href;
	el.removeAttribute('href');
	el.ingnored=true;
	
	suspendedLink=el;
}






