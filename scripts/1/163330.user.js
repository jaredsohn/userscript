// ==UserScript==
// @name        Ultoo  Auto FAST Answer by RAHUL KUMAR.
// @namespace   Ultoo FAST
// @description Updated on 29-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @version    2.65.21.3
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        Rahul
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options=fiction="jains;holy friday;calvary;jesus day;2;peter;jews;20 ad;australia;22;lee;knee;dog;cricket;zakir hussain;gulzar;mother teresa;itlay;6;7;china;ravi;wundt;taste;run;asur;irfan khan;decibel;jazzy b;punjabi;sericulture;egypt;russel;bhangra;6;luck;hema;ranbir;c;taka;tucker;aisha;manish mishra;wb;london;bharti;moscow;gulzar;pcb;li";
 cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://http://www.facebook.com/rahulkumar.verma69");
