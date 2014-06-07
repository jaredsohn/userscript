// ==UserScript== 
// @name infract history 
// @namespace http://www.exbii.com 
// @include http://www.exbii.com/showthread.php* 
// @include http://exbii.com/showthread.php* 
// @include http://www.desiproject.com/showthread.php* 
// @include http://www.desiproject.com/showthread.php* 
// @include http://www.exbii.com/showpost.php* 
// ==/UserScript== 

var xx=document.getElementsByTagName('div'); for(var i=0;i<xx.length; i++) { if (xx[i].id.substr(0,9)=='postmenu_' && xx[i].id.indexOf("_menu") !=-1) { var memname=xx[i].getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].innerHTML; xx[i].getElementsByTagName('table')[0].innerHTML+='<tr><td class="vbmenu_option"><a href="search.php?do=process&forumchoice[]=36&titleonly=1&query=for+'+memname+'" >View Infraction history</a></td></tr>'; } }