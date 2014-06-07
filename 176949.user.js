// ==UserScript==
// @name              Wykop Plus
// @namespace         http://wykop.pl/ludzie/sylwke3100
// @description       Zapisuje wszystkie obserwowane znaleziska
// @author            Sylwke3100
// @version           0.2
// @include 	      http://www.wykop.pl/*
// @grant	      none
// @run-at            document-end
// ==/UserScript==
var C_Url=document.URL;var C_Tit=document.title;var L=new Array();var T=new Array();var cnt=0;function r(){for(var i=0;i<C_Url.length;i++){if((C_Url.substr(i,4)=="link"||C_Url.substr(i,5)=="ramka")&&C_Tit.length>0){if(C_Url.substr(i,4)=="link"){i+=5;}else{i+=6;C_Tit=C_Tit.replace("Zobacz:"," ");}C_Tit=C_Tit.replace("- Wykop.pl"," ");var v=localStorage.getItem("wykop_p_oo");var kr=false;for(var k=0;k<cnt;k++){if(C_Url.substr(i,C_Url.length)==L[k]){kr=true;alert(L[k]);}}if(kr==false&&cnt<20){v="("+C_Tit+"|"+C_Url.substr(i,C_Url.length)+")"+v;localStorage.setItem("wykop_p_oo",v);cnt++;}break;}}var e='<div class="box-rounded gradient size-300-auto;"><h4 class="font-color:#ffffff;">Ostatnio oglądane</h4></div><div class=top>';var mem=localStorage.getItem("wykop_p_oo");var ok=-1,c=0;var t="";for(var i=0;i<mem.length;i++){if(mem.substr(i,1)=="("){ok=i+1;i=ok;}if(mem.substr(i,1)=="|"&&ok>-1){t=mem.substr(ok,i-ok);c=ok+(i-ok)+1;}if(mem.substr(i,1)==")"&&c>0){var r=mem.substr(c,(i-c));e+="<div><p><a href=http://www.wykop.pl/link/"+r+">"+t+"</a></p></div>";T[cnt]=t;L[cnt]=r;i=i+(i-c);ok=-1;c=0;}}e+='</div><hr><a class="link" href="#" onclick="cl()">Czyść</a>';document.getElementById("userPanel").innerHTML+=e;}setTimeout("r()",550);function cl(){localStorage.setItem("wykop_p_oo","");window.location.reload();}