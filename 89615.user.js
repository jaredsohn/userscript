// ==UserScript==
// @name           dorm.skku.edu Clickable (For GM,Opera,Chrome)
// @description    Enables to click contents in dorm.skku.edu
// @include        http://dorm.skku.edu/*
// @include        http://dorm.skku.edu:*/*
// @include        http://115.145.129.52/*
// @include        http://115.145.129.52:*/*
// @copyright      OLokLiR
// @version        0.400
// ==/UserScript==

if(document.domain=='115.145.129.52'||document.domain=='dorm.skku.edu'){
	var unsafeWindow=this['unsafeWindow']||window; //For Opera (Opera don't know unsafeWindow.)
	function _replace(fnc,name){
		fnc=String(fnc).replace(/location[.]href[(]win_path[)]/g,'location.href=win_path');
		return fnc;
	}
	if(typeof unsafeWindow.win_open!='undefined'){
		eval(_replace(unsafeWindow.win_open,'win_open'));
		unsafeWindow.win_open=win_open;
	}
	if(typeof unsafeWindow.win_open1!='undefined'){
		eval(_replace(unsafeWindow.win_open1,'win_open1'));
		unsafeWindow.win_open1=win_open1;
	}
	if(typeof unsafeWindow.win_open2!='undefined'){
		eval(_replace(unsafeWindow.win_open2,'win_open2'));
		unsafeWindow.win_open2=win_open2;
	}

	if(/chrom/i.test(navigator.userAgent)){ //Chrome can't access functions and variables of the webpage.
		fnc="function _win_open(fnc,name){";
		fnc+="fnc=String(fnc).replace(/location[.]href[(]win_path[)]/g,'location.href=win_path');";
		fnc+="return fnc;";
		fnc+="};";
		fnc+="if(typeof win_open!='undefined'){";
		fnc+="eval(_win_open(win_open,'win_open'));";
		fnc+="};";
		fnc+="if(typeof win_open1!='undefined'){";
		fnc+="eval(_win_open(win_open1,'win_open1'));";
		fnc+="};";
		fnc+="if(typeof win_open2!='undefined'){";
		fnc+="eval(_win_open(win_open2,'win_open2'));";
		fnc+="};";
		var _chrome_a=document.getElementsByTagName('a');
		for(var i=0;i<_chrome_a.length;i++){
			if(_chrome_a[i].href.indexOf('avascript:')==1){
				_chrome_a[i].href=_chrome_a[i].href.replace('javascript:','javascript:'+fnc);
			}
		}
	}
	function nocontextmenu(){
		event.cancelBubble=false;
		event.returnValue=true;
		return true;
	}
	document.oncontextmenu=nocontextmenu;
	document.onselectstart=null;
	document.ondragstart=null;
}