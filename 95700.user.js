// ==UserScript==
// @name           iGoogle Sidebar & Footer Remover
// @namespace      userscripts.org
// @description    Simply Removes the Google Sidebar
// @include        http://google.*
// @include        http://www.google.*
// @copyright      Bolla
// @version        0.01
// ==/UserScript==


var sidebar = document.getElementById('col1');
sidebar.style.display='none';


var footer = document.getElementById('footerwrap');
footer.style.display='none';

var upperLeftDiv=document.getElementById('gbar');
upperLeftDiv.innerHTML+='<a href="javascript:showHideSidebar()">&laquo;&raquo;</a>';


var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML="function showHideSidebar(){var sidebar = document.getElementById('col1'); if (sidebar.style.display=='none'){sidebar.style.display='block';} else { sidebar.style.display='none'; } }";

document.getElementsByTagName("head")[0].appendChild(scriptElement);