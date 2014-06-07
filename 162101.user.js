// ==UserScript==
// @name        Ultoo  Auto Answer by TERMINAL.
// @namespace   Ultoo
// @description Updated on 23-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        Terminal
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options="suman;64;pandu;italy;malaria;ashoka leyland;6;tn;january 15;6;dia mirza;patliputra;malinga;ethiopia;germany;taufel;helium;ab;raina;mehmood;au;peacock;agra;daphne;football;gorakh;h2;elephants;kalik;fats;desiyaan;portuguese;hrithik;aral;1767;3g;caspian;tin;jaipur;rhea;sunny deol;mars;ghisna;dadra;hajipur;parul;tej;umesh;irfan;mughal;",cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://facebook.com/bsc24");