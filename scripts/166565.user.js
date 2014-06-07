// ==UserScript==
// @name           Script
// @namespace      Script
// @description    Description
// @include        http*
// @exclude        http://game-zone.fr/*&editer=*
// @exclude        data:text/html;charset=utf-8,<textarea name="message" id="message" class="span13" rows="11" cols="61"></textarea></pre>
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:ngrom:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img4.hostingpics.net/pics/242853Nymphgrom.png' />");

var reg=new RegExp("(:nwait:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/17/1367186388-nwait.png' />");

document.body.innerHTML=chaine;