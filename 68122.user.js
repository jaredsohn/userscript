// ==UserScript==
// @name           Custom links in Trac wiki
// @description    Add edit/commit/attach
// @namespace      trac
// @include        http*://trac*/*/wiki/*

// ==/UserScript==

Title = '&nbsp;';
Title += '<span style="font-size:12px">';
Title += '<a href="javascript:document.getElementById(\'modifypage\').submit();">edit</a> &nbsp;';
Title += '<a href="javascript:document.getElementById(\'attachfile\').submit()">att.</a> &nbsp;';
Title += '</span>';

document.getElementById('content').firstElementChild.firstElementChild.innerHTML += Title;

