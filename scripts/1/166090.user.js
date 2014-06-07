// ==UserScript==
// @name           GZ
// @namespace      GZ
// @description    GZ
// @include        http://game-zone.fr/*topic-*.html
// @include        http://game-zone.fr/*topic.php*
// @exclude        http://game-zone.fr/*&editer=*
// @exclude        http://game-zone.fr/*&citer=*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(:ngrom:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://img4.hostingpics.net/pics/242853Nymphgrom.png' />");

var reg=new RegExp("(:nwait:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/17/1367186388-nwait.png' />");

var reg=new RegExp("(:psyboll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367242947-507a3ef6a01742c8accb290e9b9b67c3.png' />");

var reg=new RegExp("(:tboll:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://www.free-community.in/upload/1/9b58311c60094dda3ec85e9b5969d120.png' />");

var reg=new RegExp("(:jtm:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186836-jtm.png' />");


var reg=new RegExp("(:pakool:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/26/1372328816-pakool.png' />");

var reg=new RegExp("(:kikool:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186836-kkool.png' />");

var reg=new RegExp("(:keureuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186904-apeukeureuh.png' />");

var reg=new RegExp("(:apeuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186904-apeuh.png' />");

var reg=new RegExp("(:eureuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186904--.png' />");

var reg=new RegExp("(:noeleuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186904-noeleuh.png' />");

var reg=new RegExp("(:oucheuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367186904-oucheuh.png' />");

var reg=new RegExp("(:tristeuh:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367187012-tristeuh.png' />");

var reg=new RegExp("(:eureuh2:)", "g");
chaine=chaine.replace(reg,"<img border='0' src='http://image.noelshack.com/fichiers/2013/18/1367187035--.png' />");

document.body.innerHTML=chaine;