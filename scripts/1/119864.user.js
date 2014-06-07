// ==UserScript==
// @name			Redundant Title Attribute Remover
// @description			Removes the title attribute of any element whose inner text is identical to its title attribute.
// @namespace			none
// @include			*
// @version			1.01
// ==/UserScript===
window.onload=function(){all=document.getElementsByTagName("*");for(i=0;i<all.length;i++){if(all[i].hasAttribute("title")&&(all[i].title==all[i].innerText||all[i].title.search(all[i].innerText)&&all[i].title.length<all[i].innerText.length))all[i].title=""}}