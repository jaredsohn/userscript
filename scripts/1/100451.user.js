// ==UserScript==
// @name           ORF TV Thek Playlist Download Link
// @namespace      http://userscripts.org/users/90251
// @description    Replaces the media player embed with a download link of the ASX playlist.
// @include        http://tvthek.orf.at/*
// ==/UserScript==
var embed=document.getElementById('WmPlayerEmbed');
var div=document.createElement('div');
var a=document.createElement('a');
var p=embed.parentNode.parentNode;
div.style.cssText=embed.style.cssText;
div.style.display='table-cell';
div.style.textAlign='center';
div.style.verticalAlign='middle';
a.href=embed.src;
a.style.fontWeight='bold';
a.style.color='white';
a.appendChild(document.createTextNode('Download Playlist (ASX)'));
div.appendChild(a);
p.innerHTML='';
p.style.display='table';
p.appendChild(div);
