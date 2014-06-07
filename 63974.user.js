// ==UserScript==
// @name           Loaded.it Ad Closer
// @namespace      loaded.it
// @description    Removes waiting time and closes the annoying ad before you can watch a stream
// @include        http://loaded.it/show/*
// ==/UserScript==

if(document.getElementById('page')) document.getElementById('page').style.visibility='visible';
if(document.getElementById('apDiv1')) document.getElementById('apDiv1').style.visibility='hidden';
if(document.getElementById('closer')) document.getElementById('closer').style.visibility='hidden';
if(document.getElementById('myplayer')) document.getElementById('myplayer').style.visibility='visible';
if(document.getElementById('wait')) document.getElementById('wait').submit();