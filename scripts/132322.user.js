// ==UserScript==
// @id             ettiswil.ch-fullheight
// @name           <www.ettiswil.ch> Full Screen
// @version        0.1
// @namespace      
// @author         Kuno Meyer
// @description    Displays <www.ettiswil.ch> at full screen height.
// @include        http://www.ettiswil.ch/*
// @include        http://ettiswil.ch/*
// @run-at         document-end
// ==/UserScript==

var els = document.getElementsByClassName('abox')

for (var i=0; i<els.length; ++i)
    els[i].style.height = "auto"
