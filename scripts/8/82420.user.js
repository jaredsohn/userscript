// ==UserScript==
// @name           pocet hracov
// @namespace      none
// @include        http://www.hojko.com/cs1.php
// ==/UserScript==
count=0;
for(i=8;i<30;i++){
count++;
a=document.getElementsByTagName("tr")[i].innerHTML; 
if(a.search('<td class="row1" colspan="3"><center><span class="genmed"><font color="red"><b>Server je prázdny</b></font></span></center></td>')!=-1){count=2;break;}
if(a.search('<td colspan="3" class="row-bottom"><div><div></div></div></td>')!=-1)break;                                          
}  
count-=2;
mapa=document.getElementsByTagName("b")[1].innerHTML;

document.getElementsByTagName("tbody")[3].innerHTML='<tr><th colspan="5" width="150">&nbsp;Informácie&nbsp;</th></tr><tr> <td class="row1" align="center" width="31"><img src="http://www.hojko.com/styles/avalonblue/imageset/forum_unread.gif" height="23" width="23"></td> <td class="row1"><p class="forumlink">IP adresa:</p></td> <td class="row2" align="center"><p class="topicdetails"><b>86.110.225.249:27015</b></p></td></tr><tr> <td class="row1" align="center" width="31"><img src="http://www.hojko.com/styles/avalonblue/imageset/forum_unread.gif" height="23" width="23"></td> <td class="row1"><p class="forumlink">Aktuálna mapa:</p></td> <td class="row2" align="center"><p class="topicdetails"><b>'+mapa+'</b></p></td></tr><tr> <td class="row1" align="center" width="31"><img src="http://www.hojko.com/styles/avalonblue/imageset/forum_unread.gif" height="23" width="23"></td> <td class="row1"><p class="forumlink">Štatistiky servera:</p></td><td class="row2" align="center"><p class="topicdetails"><b><a target="_blank" href="http://cs.hojko.com/">Psychostats</a></b></p></td></tr> <tr> <td class="row1" align="center" width="31"><img src="http://www.hojko.com/styles/avalonblue/imageset/forum_unread.gif" height="23" width="23"></td> <td class="row1"><p class="forumlink">Počet hráčov:</p></td> <td class="row2" align="center"><p class="topicdetails"><b>'+count+'/19</b></p></td></tr>'      