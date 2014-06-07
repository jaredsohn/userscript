// ==UserScript==
// @name        Ultoo  Auto Answer by RAHUL.
// @namespace   Ultoo
// @description Updated on 25-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        Rahul
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="sattar;khiladi;jaggu bhagnani;nandalol;9x;fanta;lippy;kathak;brown rang;tum bin;3;5 yr;electronics;sports;4;abu dhabi;barabati;arjun;horse racing;6;sc jamir;patna;ind-sl;mumbai;assembly;antony;preity;up;japan;jdu;oslo;riboflavin;200;usa;rane;tyres;konark;bear;up;7;usa;governor;ap;history;4 days;prem;dmk;athletes;nuclear weapons;oct 12;",cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://facebook.com/rahulkumar.verma69");
