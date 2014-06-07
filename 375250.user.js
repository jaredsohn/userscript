// ==UserScript==
// @name        okcupid_no_drugs
// @namespace   gleske.net
// @description Flag OKCupid drug users
// @include     http://www.okcupid.com/profile/*
// @version     1.0
// ==/UserScript==

if(/Often|Sometimes/i.test($("ajax_drugs").innerHTML))
{
  $("ajax_drugs").style.backgroundColor="#ff9b9b";//light red
}