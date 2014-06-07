// ==UserScript==
// @name           Google Shortcuts
// @author         Steven Zhou
// @namespace      http://www.creative.com/~steven_zhou
// @description    Various Google Shortcuts
// @include        http://google.com/*
// @include        http://www.google.com/*
// exclude        *google.com/reviews*
// exclude        *google.com/search*
// ==/UserScript==

/** licenced under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0
 ** http://creativecommons.org/licenses/by-nc-sa/2.0/
 **
 **		Steven Zhou
 **		http://www.creative.com/~steven_zhou
 **
 ** This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
 ** More info: http://greasemonkey.mozdev.org/
 **/

config = new Array(
	new Array("dirs:",'-inurl:htm -inurl:html intitle:"index of"'),
	new Array("wh:",'web history'),
	new Array("gg:",'site:gougou.com'),
	new Array("gb:",'books.google.com'),
	new Array("gv:",'video.google.com'),
	new Array("mp3:",'mp3.baidu.com'),
	new Array("gd:",'site:godict.com'),
	new Array("f:ppt",'filetype:ppt'),
	new Array("f:pdf",'filetype:pdf'),
	new Array("bd:",'baidu.com'),
	new Array("wk:",'site:wikipedia.org')
	);

var modalMode=false;
var cursor=0;
var tc;
var timeout = 10;
var shiftDown =false;
var cmdBuf="";
window.addEventListener("keyup",function(e){
    if (e.keyCode==16) { // shift
        shiftDown =false;
    }
}, false);

window.addEventListener("keydown",function(e){
    var d="dr:";
    var f = document.forms;
    var searchField;
    var fields=document.getElementsByTagName("INPUT");
    var get_JulianDate = function(Y, M, D){
		    var sign = (((100 * Y) + M - 190002.5) >= 0) ? 1 : -1;
		    with (Math) {
			    return round((367 * Y) - floor((7 * (Y + floor((M + 9) / 12))) / 4) + D + floor((275 * M) / 9) + 1721013.5 - (0.5 * sign) + 0.5);
		    }
    }
    var get_SearchField = function () {
        for(i=0;i<fields.length;i++) {
            if(fields[i].type=="text") {
                return fields[i];
            }
        }
    }
    searchField = get_SearchField();

// TODO: Vim style editing of google search box
    if (e.keyCode==16) { // shift
    	shiftDown = true;
	return;
    }
    if (e.keyCode==123) { // F12
        if (modalMode == false) {
	    modalMode =true;
	    cursor = searchField.selectionStart;
	    cmdBuf="";
	    //cursor = 1;
	    //tc = searchField.value.charAt(cursor-1);
	}else {
	    modalMode =false;
	}

    }
    if (f.length && searchField) {
        	for(i=0;i<config.length;i++) {
		    if ( searchField.value.match(config[i][0]) ) {
		        searchField.value = searchField.value.replace(config[i][0],config[i][1]);
		    }
                }
		re = new RegExp(d+'(\\d+)-(\\d+)-(\\d+):(\\d+)-(\\d+)-(\\d+)');
		if ( searchField.value.match(re) ) {
		    sY = Math.floor(RegExp.$1);
		    sM = Math.floor(RegExp.$2);
		    sD = Math.floor(RegExp.$3);
		    eY = Math.floor(RegExp.$4);
		    eM = Math.floor(RegExp.$5);
		    eD = Math.floor(RegExp.$6);
		    startDate=get_JulianDate(sY,sM,sD);
		    endDate=get_JulianDate(eY,eM,eD);
		    searchField.value = searchField.value.replace(re,'daterange:'+startDate+"-"+endDate);
		    searchField.value = searchField.value.replace('  ',' ');
		}
    }
    if (modalMode==true) {
	slength = searchField.value.length;
	searchField.selectionStart =cursor-1;
	searchField.selectionEnd =cursor;
        if (e.keyCode==65) { //a
	    if ( shiftDown == true ) {
		    cursor = slength;
	    }
	    var s = searchField.value;
	    tc = searchField.value.charAt(cursor-1);
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
                searchField.selectionStart =cursor;
	        searchField.selectionEnd =cursor;
	    },timeout);
	    modalMode=false;
	    return;
	}
        if (e.keyCode==67 && shiftDown ==true) { //C
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor-1;
	    }, timeout);
	    modalMode=false;
	    return;
	}
        if (e.keyCode==67 && shiftDown ==false) { //c
	    var s = searchField.value;
	    tc = searchField.value.charAt(cursor-1);
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
		cmdBuf +="c";
	    }, timeout);
	    return;
	}
        if (e.keyCode==73) { //i
	    if ( shiftDown == true ) {
		    cursor = 1;
	    }
	    var s = searchField.value;
	    tc = searchField.value.charAt(cursor-1);
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor-1;
	    }, timeout);
	    modalMode=false;
	    return;
	}
        if (e.keyCode==54 && shiftDown==true) { // ^ 
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		cursor = 1;
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
	    }, timeout);
	    return;
	}
        if (e.keyCode==52 && shiftDown==true) { // $ 
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		cursor = slength;
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
	    }, timeout);
	    return;
	}
	re = new RegExp("(\\d{0,1})\\$");
        if (e.keyCode==87 && (cmdBuf.match(re)|| cmdBuf.length==0) ) { // [n]w
	    var ts = searchField.value.substr(cursor,slength-cursor);
	    var re =new RegExp("(\\S*\\s*)");
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    if (ts.match(re) ) {
	        setTimeout(function(){
		    searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		    m = RegExp.$1;
		    if (cursor+m.length+1 <= slength) {
		       cursor = cursor+m.length+1;
		    }else{
		       cursor = slength;
		    }
		    searchField.selectionStart =cursor-1;
		    searchField.selectionEnd =cursor;
	            cmdBuf="";
	        }, timeout);
	    }
	    return;
	}
	re = new RegExp("(\\d{0,1})c");
        if (e.keyCode==87 && cmdBuf.match(re) ) { // ncw
	    var s = searchField.value;
	    var num = RegExp.$1;
	    if (num.length==0 ) {
		num = 1;
	    }
	    var ts;
	    var tcur=0;
	    ts = s.substr(cursor-1,slength+1-cursor);
	    for(i=0;i<num;i++) {
		var re2 = "(\\S*)(\\s*.*)$"
		if ( ts.match(re2) ) {
	            ts = RegExp.$2;
		}else{
		    break;
		}
	    }
            setTimeout(function(){
		    searchField.value = s.substr(0,cursor-1)+ts;
		    searchField.selectionStart = cursor-1;
		    searchField.selectionEnd = cursor-1;
	            cmdBuf="";
		    modalMode=false;
            }, timeout);
	    return;
	}
	re = new RegExp("(\\d{0,1})d");
        if (e.keyCode==87 && cmdBuf.match(re) ) { // ndw
	    var s = searchField.value;
	    var num = RegExp.$1;
	    if (num.length==0 ) {
		num = 1;
	    }
	    var ts;
	    var tcur=0;
	    ts = s.substr(cursor,slength+1-cursor);
	    for(i=0;i<num;i++) {
		var re2 = "(\\S+\\s+)(.*)$"
		if ( ts.match(re2) ) {
	            ts = RegExp.$2;
		}else{
		    break;
		}
	    }
//	    ts = ts.replace("(\\S+\\s+){2}","");
            setTimeout(function(){
		    searchField.value = s.substr(0,cursor-1)+ts;
		    searchField.selectionStart = cursor-1;
		    searchField.selectionEnd = cursor;
	            cmdBuf="";
            }, timeout);
	    return;
	}
        if (e.keyCode==87  ) { // w
		//alert(cmdBuf);
	}
        if (e.keyCode==69) { //e
	    var ts = searchField.value.substr(cursor,slength-cursor);
	    var re =new RegExp("(\\s*\\S*)");
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    if (ts.match(re) ) {
	        setTimeout(function(){
		    searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		    m = RegExp.$1;
		    cursor = cursor+m.length;
		    searchField.selectionStart =cursor-1;
		    searchField.selectionEnd =cursor;
	        }, timeout);
	    }
	    return;
	}
        if (e.keyCode==66) { //b
	    var ts = searchField.value.substr(0,cursor-1);
	    var re =new RegExp("(\\S*\\s*)$");
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    if (ts.match(re) ) {
	        setTimeout(function(){
		    searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		    m = RegExp.$1;
		    cursor = cursor-m.length;
		    searchField.selectionStart =cursor-1;
		    searchField.selectionEnd =cursor;
	        }, timeout);
	    }
	    return;
	}
        if (e.keyCode==72 || e.keyCode==37) { //h left
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		if (cursor !=1 ) {
		    cursor = cursor -1;
	            searchField.selectionStart =cursor-1;
	            searchField.selectionEnd =cursor;
		}else{
		    cursor = 1;
	            searchField.selectionStart =cursor-1;
	            searchField.selectionEnd =cursor;
		}
	    }, timeout);
	    return;
	}
        if (e.keyCode==76 || e.keyCode==39) { //l
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
		if (cursor !=slength ) {
		    cursor = cursor+1;
	            searchField.selectionStart =cursor-1;
	            searchField.selectionEnd =cursor;
		}else{
	            searchField.selectionStart =cursor-1;
	            searchField.selectionEnd =cursor;
		}
	    }, timeout);
	    return;
	}
        if (e.keyCode==68 && shiftDown ==true) { //D
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1);
		cursor=cursor-1;
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
	    }, timeout);
	    return;
	}
        if (e.keyCode>=48 && e.keyCode<=57 && shiftDown==false ) { //0..9
	    var s = searchField.value;
	    tc = searchField.value.charAt(cursor-1);
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
		cmdBuf +=(e.keyCode-48)+"";
	    }, timeout);
	    return;
	}
        if (e.keyCode==68 ) { //d
	    var s = searchField.value;
	    tc = searchField.value.charAt(cursor-1);
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
		cmdBuf +="d";
	    }, timeout);
	    return;
	}
        if ((e.keyCode==88 && shiftDown ==false)|| e.keyCode==46) { //x delete
	    //tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+s.substr(cursor,slength-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
	    }, timeout);
	    return;
	}
        if ((e.keyCode==88 && shiftDown ==true)||e.keyCode==8) { //X
	    var s = searchField.value;
	    if ( cursor !=1 ) {
	        setTimeout(function(){
	            searchField.value = s.substr(0,cursor-2)+s.substr(cursor-1,slength+1-cursor);
		    cursor=cursor-1;
	            searchField.selectionStart =cursor-1;
	            searchField.selectionEnd =cursor;
	        }, timeout);
	    }
	    return;
	}
	if (e.keyCode>=32 && e.keyCode<=90) {
	    tc = searchField.value.charAt(cursor-1);
	    var s = searchField.value;
	    setTimeout(function(){
	        searchField.value = s.substr(0,cursor-1)+tc+s.substr(cursor,slength+1-cursor);
	        searchField.selectionStart =cursor-1;
	        searchField.selectionEnd =cursor;
	    }, timeout);
	}
    }else {
        if(!(e.target.tagName=="INPUT" &&e.target.name=="q"))searchField.focus();
    }
//    if (e.keyCode==192 && shiftDown ==true) { //~
//	searchField.focus();
//    }
	    
	
}, true);
