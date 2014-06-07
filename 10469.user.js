// ==UserScript==
// @name           naBBit_beta
// @namespace      banninations
// @include       *www.bannination.com/comments*
// ==/UserScript==
GM_addStyle("#main .ch .time img {padding-left: 10px!important} ");
var spanArray = document.getElementsByTagName('span');
var i=0;var j=1;var k=0;var idnum=1;var b=spanArray.length/7;
// swap the two and save the img files for a cache. what?
//var urlink="<img src=chrome://nabbit/skin/img/"; 
var urlink="<img src=http://webmonkees.com/naBBits/"; 
var bg=""; var bgn=2; var goof="? "; var inapp=" <a href="; var cool=" <a href=";
var score="0"; var scoreid=""; 
for (i = 0; i < b; i++){k=j+3;idnum=spanArray[j].innerHTML;
spanArray[j].innerHTML=urlink+idnum+".gif width=58 height=18 alt=("+idnum+") title=("+idnum+")>";
k=j+1;
//voting trunc
//beergarden adjust. it's a hack, I know.
bg=spanArray[j+3].innerHTML.slice(73,77);
if (bg !="1000"){bgn=0};
goof=spanArray[j+3].innerHTML.slice(14,92-bgn);
inapp="<a href="+goof+">lame</a>";
goof=spanArray[j+2].innerHTML.slice(14,92-bgn);
cool="<a href="+goof+">cool</a>";
spanArray[j+3].innerHTML=inapp+" | "+cool;
//
//score chart
scoreid=spanArray[j+4].innerHTML.slice(26,27);
if (scoreid =="-"){scoreid="n"+spanArray[j+4].innerHTML.slice(27,28);};
score=urlink+"s"+scoreid+".gif width=16 height=16 alt="+scoreid+">";
spanArray[j+5].innerHTML=score;
//if you  want a middle image, uncomment the next line. otherwise, don't. 

if (idnum != 0){spanArray[k].innerHTML=spanArray[k].innerHTML+"<a href=http://webmonkees.com/naBBits/0/notes.htm#"+idnum+">"+urlink+"m"+idnum+".png width=180 height=18 align=top id= ("+idnum+") title="+idnum+" border=0></a>";}
k=j+2;
spanArray[k].innerHTML="&nbsp;<a href=http://webmonkees.com/naBBit/naBBit.php?key=returning_beta  target=_blank>&#164;</a>";
j=j+7;}
