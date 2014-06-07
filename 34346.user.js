// ==UserScript==
// @name           CommunityOverflow
// @namespace      http://avdi.org
// @description    Makes the Stack Overflow "community owned wiki" link checked by default
// @include        http://stackoverflow.com/questions/*
// ==/UserScript==

var checkbox = document.getElementById("communitymode");
if(checkbox) {
  checkbox.checked = 'checked';
}
