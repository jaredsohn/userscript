// ==UserScript==
// @name        Ultoo  Auto Answer by rahul.
// @namespace   Ultoo
// @description Updated on 24-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        Terminal
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="sameer;world wide web;delhi;alto;daga;tikky singh;gattu;mp;karnal;manali;kaka sippy;karnal;kia salvi;virus;pagal sala;karnal;black;karan johar;48;sp;7;padam shri;tennis;samsher;dog;bse;green;alia;8;don;mount algan;delhi;mumbai;lion;zeba;mp;a;bear;sudan;tn;akshay kumar;luck;taloja;fact;radio;holi;dudhwa;goley;punjabi;dope";,cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://http://www.facebook.com/rahulkumar.verma69");