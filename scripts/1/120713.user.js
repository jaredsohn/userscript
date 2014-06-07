// ==UserScript==
// @name           Shacknews - skip download countdown
// @namespace      SiPlus
// @description    Skips download countdown on Shacknews
// @include        http://www.shacknews.com/downloadpop?file_id=*
// @include        http://shacknews.com/downloadpop?file_id=*
// ==/UserScript==
document.getElementById('countdown').style.display='none';
document.getElementsByClassName('dlfile')[0].style.display='';