// ==UserScript==
// @name           Replace the input area in V2EX
// @version        1.1
// @namespace      wordlessking
// @description    wordlessking
// @include        http://www.v2ex.com/t/*
// ==/UserScript==

var mm= document.getElementById('reply_content');
var mmm = document.createElement('input');
mmm.setAttribute('type','text');
mmm.setAttribute('x-webkit-speech',1);
mmm.setAttribute('class','mll');
mmm.setAttribute('style','height:1.3em');
mmm.setAttribute('name','content');
mmm.setAttribute('id','reply_content');
mm.parentElement.insertBefore(mmm,mm);
mm.setAttribute('name','');
mm.setAttribute('id','');
mm.style.display='none';