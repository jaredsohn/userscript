// ==UserScript==
// @name           Don't Use This - I Have No Clue About UserScripts Yet
// @namespace      http://userstyles.org
// @description    Experimenting
// @include        http://*.toodledo.com*
// @include        https://*.toodledo.com*
// ==/UserScript==


var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://pwiki.homeip.net/static/test.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName('head')[0].appendChild(cssNode);

