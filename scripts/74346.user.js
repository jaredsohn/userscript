// ==UserScript==
// @name           Smooth Garrysmod.org
// @namespace      Matsinator
// @include        http://www.garrysmod.org/*
// ==/UserScript==
var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://matsinator.110mb.com/mod.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
