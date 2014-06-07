// ==UserScript==
// @name	MillatFacebook Nastaleeq
// @namespace   http://www.atarafi.co.cc
// @description	MillatFacebook Nastaleeq font conversion for Urdu Community.
// @author	Ata Rafee
// @homepage    http://userscripts.org/users/351380
// @include	http://*millatfacebook.com/*
// @include	http://*millatfacebook.com/*
// ==/UserScript==

function UrduStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

UrduStyle('.fsm{font-size:16px;} .fss{font-size:14px;} .uiSideNav .item, .uiSideNav .subitem{padding:6px 28px 8px 8px;} body{font-family:"Jameel Noori Nastaleeq","Alvi Nastaleeq",tahoma;font-size:16px;} .uiLinkButton input{font-family:"Jameel Noori Nastaleeq","Alvi Nastaleeq",tahoma;font-size:16px;} textarea, .inputtext, .inputpassword{font-family:"Jameel Noori Nastaleeq","Alvi Nastaleeq",tahoma;font-size:16px;} button.as_link{font-family:"Jameel Noori Nastaleeq","Alvi Nastaleeq",tahoma;} .uiStream .uiStreamMessage {font-size: 16px;} .uiButton .uiButtonText, .uiButton input{font-family:"Jameel Noori Nastaleeq","Alvi Nastaleeq",tahoma;} .uiComposerMessageBox .input{font-size: 14px; height: 23px;} .uiIconLink .img{top: 6px;} .uiBlingBox .img{vertical-align: middle;} .UIShareStage_Title{font-size: 16px;} #headNav {height: 44px;} .permalink_stream .uiStream .uiStreamMessage {font-size: 16px;} .fbQuestionsPollResultsBar .auxlabel span{top: 0}');
