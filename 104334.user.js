// ==UserScript==
// @name           Mod Tools
// @namespace      MikeyS9607
// @include        http://www.newgrounds.com/bbs/topic/*
// @include        http://www.newgrounds.com/bbs/topic/*/*
// ==/UserScript==

var i=0;
for (i=0;i<=900;i++)
{

txt2 = document.getElementsByClassName('userstats')[i].innerHTML;
txt = document.getElementsByClassName('userstats')[i];
txt.innerHTML = '<span class ="mod">[<a href="javascript: initModPop();">ban</a>]   [<a href="javascript: GetBR();">record</a>]</span>'+txt2;



txt3 = document.getElementsByClassName('userlinks')[i].innerHTML;
txt4 = document.getElementsByClassName('userlinks')[i];
txt4.innerHTML = txt3+'<span class ="mod">[<a href="javascript: initModPop();">del</a>   | <a href="javascript: GetBR();">del pic</a>]

</span>';



txt7 = document.getElementsByClassName('nosig')[i].innerHTML;
txt8 = document.getElementsByClassName('nosig')[i];
txt8.innerHTML = txt7+'<span class ="mod">[<a href="javascript: initModPop();">delete</a>] [<a href="javascript: initModPop();">delete 

picture</a>] </span>  ';

txt9 = document.getElementsByClassName('sig')[i].innerHTML;
txt90 = document.getElementsByClassName('sig')[i];
txt90.innerHTML = txt9+'<span class ="mod">[<a href="javascript: initModPop();">delete</a>] [<a href="javascript: initModPop();">delete 

picture</a>] </span>  ';


}
