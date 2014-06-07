// ==UserScript==
// @author        Teerapap Changwichukarn
// @name          Google Surf Keys
// @namespace     http://teerapap.blogspot.com/
// @description   Add HotKey to google search result page. You needn't to touch a mouse anymore!.
// @include       http://*.google.*/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function openLink(index,isNewTab){
	var link = resultNode.eq(index).find("a:first");
	if(isNewTab){
		GM_openInTab(link.attr("href"));
	}else{
		window.location = link.attr("href");
	}
}

function focus_cursor(cursor){
	if(cursor<0||cursor>=resultNode.length||prevCursor==cursor) return;
	if(prevCursor>=0&&prevCursor<resultNode.length){
		resultNode.eq(prevCursor).find(".surf_key").remove();
	}
	var lnk = resultNode.eq(cursor);
	lnk.prepend("<span class=\"surf_key\" style=\"font-weight:bold\">&gt;</span>");
	if(cursor<=1){
		$doc.find("#logo").focus();
	}else if(cursor>=resultNode.length-2){
		$doc.find("#foot").find("a:first").focus();
	}else if(prevCursor<cursor){
		resultNode.eq(cursor+2).find("a:first").focus();
	}else if(prevCursor>cursor){
		resultNode.eq(cursor-2).find("a:first").focus();
	}
	lnk.find("a").focus();
	prevCursor = cursor;
}

function focus_search(){
	var searchbox = document.getElementsByName("q");
	document.getElementById("logo").focus();
	searchbox[0].focus();
	searchbox[0].select();
}

function toggle_indexlabel(){
	if(resultNode.find(".surf_label").length==0){
		resultNode.slice(0,10).each(function(i){
			$(this).find("a:first").before("<span class=\"surf_label\" style=\"font-weight:bold\">["+i+"]</span>");
		});
	}else{
		resultNode.find(".surf_label").remove();
	}
}


var OnKeyShortcut;
var isGPressed = false;
var cursor = -1;
var prevCursor = -1;
var $doc = null;
var resultNode = null;
var isModifier = false;

OnKeyShortcut = function(e){
	if(isModifier) return;
	var isInputSource = (e.target.wrappedJSObject.nodeName == "INPUT");
	if(isInputSource){ isGPressed = false; return; }
	
	var keyChar = String.fromCharCode(e.keyCode);
	
	if(isGPressed){
		isGPressed = false;
		if(e.keyCode>=48&&e.keyCode<=57){
			openLink(e.keyCode-48,true);
		}
	}else{
		if(e.keyCode>=48&&e.keyCode<=57){
			openLink(e.keyCode-48,false);
		}
	}
	if(keyChar=='G'){
		isGPressed = true;
	}
	if(keyChar=='K'){
		if(cursor<0) cursor = 0;
		if(cursor>0) cursor--;
		focus_cursor(cursor);
	}else if(keyChar=='J'){
		if(cursor<0) cursor = 0;
		else if(cursor<resultNode.length-1) cursor++;
		focus_cursor(cursor);
	}else if(keyChar=='S'){
		if (e.stopPropagation) e.stopPropagation();
		if (e.preventDefault) e.preventDefault();
		focus_search();
	}else if(keyChar=='O'){
		if(cursor<0){
			cursor = 0;
			focus_cursor(cursor);
		}
		openLink(cursor,false);
	}else if(keyChar=='T'){
		if(cursor<0){
			cursor = 0;
			focus_cursor(cursor);
		}
		openLink(cursor,true);
	}else if(keyChar=='L'){
		toggle_indexlabel();	
	}
}

OnKeyModDownUp = function(evt){
 	evt = (evt) ? evt : (window.event) ? window.event : ""
    if (evt) {
        if (evt.modifiers) {
            isModifier = (evt.modifiers & Event.ALT_MASK) || (evt.modifiers & Event.CONTROL_MASK) || (evt.modifiers & Event.SHIFT_MASK) || (evt.modifiers & Event.META_MASK);
        } else {
            isModifier = evt.altKey || evt.ctrlKey || evt.shiftKey;
        }
    }	
}

function startSurf(){
	if($doc==null||$doc.length==0){
		alert("Surfkey Error");
		return;	
	}
	resultNode = $doc.find(".r");
	document.addEventListener("keydown",OnKeyModDownUp,0);
	document.addEventListener("keyup",OnKeyModDownUp,0);
	document.addEventListener("keydown",OnKeyShortcut,0);
}

function checkURL(){
	var reg = new RegExp("https?://www\.google\.[a-z\.]*/\#hl.*");
	return reg.test(document.location.href);
}

var poll_n = 0;
var poll_max = 10;

function polling(){
	if(poll_n++<poll_max){
		if($(".r").length>0){
			$doc = $(document);
			startSurf();
		}else{
			setTimeout(function(){polling();},1000);
		}
	}
}

(function(){
	if(checkURL()){
		polling();
	}
	$(document).ready(function() {
		$('iframe').load(function()
			{
				$doc = $(this).parents("body:first");
				startSurf();
			}
		);
	});
	
}());


