// ==UserScript==
// @name        ITmk Font Size
// @description Font size style for ITmk
// @include     http://www.it.com.mk/*
// @author      ITmk Font Size by Delicon (http://delicon.mk)
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://delicon.mk/clients/it/style.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);