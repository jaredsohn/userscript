// ==UserScript==
// @name           Auto-accept no-java MyNEU
// @namespace      tag:brainonfire.net,2008-06-09:myneu-nojava-ok
// @description    Automatically clicks the "yes I don't want Java" button
// @include        http://myneu.neu.edu/cp/home/check/post?js=true&java=false
// ==/UserScript==

unsafeWindow.doContinue('java');
