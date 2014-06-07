// ==UserScript==
// @name           Sage&Noko
// @namespace      karachan.org
// @description    Dodaje przyciski sage & noko
// @include        http://www.karachan.org/*
// ==/UserScript==



function addElementAfter(node,tag,id,htm)
{
  var ne = document.createElement(tag);
  if(id) ne.id = id;
  if(htm) ne.innerHTML = htm;
  node.parentNode.insertBefore(ne,node.nextSibling);
}



var email_field = document.getElementsByName("em")[0];

addElementAfter(email_field,'span','',
'&nbsp;<a style="cursor:default;" onclick="document.getElementsByName(\'em\')[0].value=\'noko\';">noko</a>');

addElementAfter(email_field,'span','',
'&nbsp;<a style="cursor:default;" onclick="document.getElementsByName(\'em\')[0].value=\'sage\';">sage</a>');

