// It's My Hellworld script
// version 0.1 BETA!
// 2010-04-01
// Copyright (c) 2010, snowprint
// http://snow.snowrain.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Baidu MP3 Default Radiobox Selection
// @namespace     http://snow.snowrain.org/scripts/gm/
// @description   script to Hello world
// @include       *://mp3.baidu.com/*
// ==/UserScript==

var lm = document.getElementsByName('lm');
for(var i=0;i<lm.length;i++) 
{
if(lm[i].id=="aM")
    {
        lm[i].checked = false;
    }
if(lm[i].id=="Mp3")
    { 
         lm[i].checked = true;
    }
}
