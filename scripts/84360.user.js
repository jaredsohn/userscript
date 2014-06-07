// ==UserScript==
// @name           Custom links in Trac ticket
// @description    Add edit/commit/attach
// @namespace      trac
// @include        http*://bugs.*/ticket*

// ==/UserScript==

Title = '';
Title += '<span style="font-size:12px">';
Title += '<a href="javascript:document.getElementById(\'comment\').focus();">comm</a> &nbsp;';
Title += '<a href="javascript:document.getElementById(\'field-description\').focus();">edit</a> &nbsp;';
Title += '<a href="javascript:document.getElementById(\'attachfile\').submit()">att.</a> &nbsp;';
Title += '</span>';

document.getElementById('content').firstElementChild.innerHTML += Title;