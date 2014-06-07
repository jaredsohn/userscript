// ==UserScript==
// @name       answer it
// @namespace   Ultoo
// @description Updated on 10-03-2013, this script answers all AnswerIt questions automatically. So you will have to just login, and go to the AnswerIt page, and let the script do its job. You will be notified on completion of the AnswerIt quiz. Check back for updates. If you like this script check out other hacks at http://facebook.com/RajishTips and show me your support. Thanks.
// @include     http://*ultoo.com/*
// @version        2.2.44
// @updateURL		http://userscripts.org/scripts/source/158807.meta.js
// @downloadURL		http://userscripts.org/scripts/source/158807.user.js
// @author         chennaistar
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="Haas;Haas;Vinci;Vinci;Madonna;Sniff Tower;12;India;Pink;Riya;Pele;Fox;Car;York;rakhi;Yuvraj;Zoroastrians;manoj;Kush;Salman;Mehga;Total;Paris;Doctor;Sodium;5;Haasil;Sri Lanka;Vinod Ghosla;Peace;Salwar;Antony;Columbia;Out;Vijay Mallya;KOTAK;Spain;Poet;manoj Mitra;Junglee;Jack;Pakistan;Ullu Banana;rani;India;Disco;Imran;Idea;12;Kabaddi",cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://hugecollection.tk");