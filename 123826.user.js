// ==UserScript==
// @name           Yahoo login clean and simple
// @namespace      http://www.2opsd457utyjk.com
// @include        https://login.yahoo.com/config/*
// ==/UserScript==

fashion = '#iframeHolder,#footer,#mainBox,#loginHolder,.yuhead-logo,.lgbx-ltr,#helpLnk,#yucs-home_link,#hdBg{display:none !important}'+
          '#loginBox{position:fixed;left:36.5%;top:16%;}'+
          '#yuhead-com-links{position:relative;left:-93%;} #username,#passwd{font-weight:bold;color:#888;outline:none;}'+
          '#username:focus,#passwd:focus{border:solid #888 1px !important;box-shadow:0px 0px 5px #888;}'+
          '#yucs{margin-top:-30px;}.yucs-fl-right{position:relative;left:-37%;}';
          
try
{
document.body.appendChild(document.getElementById('loginBox'));
style=document.createElement('style');
style.innerHTML=fashion;
document.body.appendChild(style);
}
catch(me){console.log(me.message)}
