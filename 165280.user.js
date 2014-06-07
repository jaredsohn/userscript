// ==UserScript==
// @name        Ultoo  Auto Answer by RAHUL KUMAR. . . .
// @namespace   Ultoo
// @description this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @icon        http://img341.imageshack.us/img341/3755/14060001.png
// @author        Rahul
// ==/UserScript==

var path=window.location.pathname; 
if("/AnswereIt.php"==path){var options=fiction="eric simons;chavez;Delhi;mani ratnam;sari;uma;England;b barman;guru;doggy;dr no;Mumbai;UP;sikh;badal;taka;ciara;massa;spitz;salim;committee;boxing;shaan;usa;goa;au;pandu;calvary;adhiya;paris;ravi;Rose;shiv khera;knee;anna;france;1;pm;red;luni;army;mp;kashi;amar;mind;tt;wundt;ravi kalara;polo;morsi";cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));
    document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];
    document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"