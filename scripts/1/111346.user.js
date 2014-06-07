// ==UserScript==
// @name	RisingUmmah Nastaleeq
// @namespace   http://www.atarafi.co.cc
// @description	RisingUmmah Nastaleeq font conversion for Urdu Community.
// @author	Ata Rafee
// @homepage    http://userscripts.org/users/351380
// @include	http://*risingummah.com/*
// @include	http://*risingummah.com/*
// ==/UserScript==

function UrduStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

UrduStyle('.fsm{font-size:20px;} .fss{font-size:16px;} .uiSideNav .item, .uiSideNav .subitem{padding:8px 28px 10px 10px;} body{font-family:"Alvi Nastaleeq",tahoma;font-size:20px;} .uiLinkButton input{font-family:"Alvi Nastaleeq",tahoma;font-size:20px;} textarea, .inputtext, .inputpassword{font-family:"Alvi Nastaleeq",tahoma;font-size:20px;} button.as_link{font-family:"Alvi Nastaleeq",tahoma;} .uiStream .uiStreamMessage {font-size: 20px;} .uiButton .uiButtonText, .uiButton input{font-family:"Alvi Nastaleeq",tahoma;} .uiComposerMessageBox .input{font-size: 16px; height: 23px;} .uiIconLink .img{top: 6px;} .uiBlingBox .img{vertical-align: middle;} .UIShareStage_Title{font-size: 20px;} #headNav {height: 44px;} .permalink_stream .uiStream .uiStreamMessage {font-size: 20px;} .fbQuestionsPollResultsBar .auxlabel span{top: 0}');
