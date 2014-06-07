// ==UserScript==
// @name        Ultoo AnswerIt Hack By DMgrock
// @namespace   Ultoo
// @description Updated on 14-03-2013, this script answers all AnswerIt questions automatically. So you will have to just login, and go to the AnswerIt page, and let the script do its job. You will be notified on completion of the AnswerIt quiz. Check back for updates. If you like this script check out other hacks at http://facebook.com/hackingdhamaka and show me your support. Thanks.
// @include     http://*ultoo.com/*
// @version        2.2.45
// @updateURL		http://userscripts.org/scripts/source/158807.meta.js
// @downloadURL		http://userscripts.org/scripts/source/158807.user.js
// @author         Rajish Vijayan
// @icon           http://img341.imageshack.us/img341/3755/14060001.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="vidya;zaheer khan;chavez;pakistan;malaika;up;fat;politics;actor;hague;africa;dog;kapil dev;2;5;madan lal;dakhili;abu road;none;gail;smith;none;tokyo;blue;ranchi;golf;tuntun;japan;italy;abhijit sen;sri lanka;319;canada;china;tabu;dravid;sweet;usa;20;esha;3 ltr;gangman style;akbar;14;india;race;china;1411;vikram bhatt;leap;",cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://www.facebook.com/hackingdhamaka");