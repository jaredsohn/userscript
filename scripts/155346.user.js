// ==UserScript==
// @name           Addic7ed multidownload selection
// @description    Select all subtitles for multidownload
// @include        http://www.addic7ed.com/show/*
// ==/UserScript==


var e = document.createElement('span');
e.innerHTML='<input type="checkbox" id="selAll" onclick="var val=document.getElementById(\'selAll\').checked;var e=document.getElementsByName(\'multishow[]\');for(var i=0; i<e.length; i++){e[i].checked = val;}" style="margin-left: 10px;margin-right: 5px;"><span>Select all&frasl;none</span>';
document.getElementById('sl').appendChild(e);