// ==UserScript==
// @name           ifs-googletranslate
// @namespace      ifly2sky
// @include        http://translate.google.com/*
// @include        http://translate.google.co.kr*

// ==/UserScript==



//구글번역(http://translate.google.com/)에 단축키설정(add short cuts to google translate page) 
document.body.onkeydown=function(e){

	e = e || window.event;
	var ak= e.altKey;
	var ek = e.keyCode;
	var dsrc = document.getElementById('source');

	if (ek == 27) {dsrc.value = '';dsrc.focus();} // ESc 입력영역초기화
	else if (ak && ek == 81) {capture('gt-src-listen');}// alt+Q
	else if (ak && ek == 87) {capture('gt-res-listen');}// alt+W

    
    function capture(id) {
	var btn  = document.getElementById(id);
	var ce = document.createEvent('MouseEvents'); 
	ce.initEvent ( 'mouseover', true, true ); btn.dispatchEvent (ce);
	ce.initEvent ( 'mousedown', true, true ); btn.dispatchEvent (ce);
	ce.initEvent ( 'mouseup', true, true ); btn.dispatchEvent (ce);
    }
};

//단축키설명(Key Description)
function note_key() 
{
	var notep = document.getElementById('gt-langs');
	var notec = document.createElement('div');
	notec.innerHTML = '<b>&nbsp;</b>  ☞ 단축키: <b>ESC</b>: 입력영역초기화 <b>Alt+Q</b>: 소스발음듣기 <b>Alt+W</b>:결과발음듣기';
	//notec.innerHTML = '<b>&nbsp;</b>  ☞ Key: <b>ESC</b>: Input Area Reset <b>Alt+Q</b>: Source Listen <b>Alt+W</b>:Result Listen';
	notec.style.cssText ='padding-top:5px';
	notep.appendChild(notec);
}
note_key();
