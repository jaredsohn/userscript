// ==UserScript==
// @name        Ultoo 19 april AnswerIt.
// @namespace   Ultoo
// @description Updated on 19-04-2013, this script answers all AnswerIt questions automatically. So you will have to just login, and go to the AnswerIt page, and let the script do its job. You will be notified on completion of the AnswerIt quiz. Check back for updates.
// @include     http://*ultoo.com/*
// @version        2.2.44
// @author         vir
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="alonso;warner;usha;usa;tsonga;delhi;brad pitt;jb patnaik;nakul;goku;icc;31 may;tn;raja;st johns;chess;messi;usa;love;aamir;rani;paris;maya;Delhi;the iron lady;sitar;plague;yama;shora;jainism;spain;goa;elbe;saif;bse;manali;Delhi;zombie;daga;go;lion;dog;luck;noris;ria salvi;tata motors;204;italy;smallpox;uk;",cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://facebook.com/RajishTips");