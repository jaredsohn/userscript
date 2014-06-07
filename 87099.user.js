// ==UserScript==
// @name           anti-advertisement-page
// @namespace      script
// @version        1.0
// @include        http://*ag.ru/?act=out*
// ==/UserScript==

var blk=document.getElementById('s2')
if(blk){document.location.href = blk.href;}
if(!blk){var blk2=document.getElementById('s1')}
if(blk2){document.location.href = blk2.href;}
if(!blk2){var blk3=document.getElementById('s3')}
if(blk3){document.location.href = blk3.href;}