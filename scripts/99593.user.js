// ==UserScript==
// @name           popyard
// @namespace      popyard.com
// @include        http://www.popyard.com/*
// ==/UserScript==
[i,j,k] = document.getElementsByTagName('iframe')
td = k.parentNode
td.parentNode.removeChild(td)
j.parentNode.removeChild(j)
i.parentNode.removeChild(i)

