// ==UserScript==
// @name        Ultoo  Auto Answer by RAHUL KUMAR
// @namespace   Ultoo
// @description Updated on 28-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        Rahul kumar
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options=fiction="kunal chopra;chashme baddoor;friend;paa;it;ayush;lucknow;bharata;tn;pooh;doctor;14 nov;agra;shimla;shimla;eastern;sis ganj;mp;Zoya;Bheja Fry;up;lol;jul 4;taksal;rose;odometer;dolphin;webber;ash;haryana;orissa;imran khan;punjab;cage;oswald;may 15;india;asrani;kalka;ishan;robot;canada;preity;England;dicky bird;break;army;pakistan;Pandavas;Venice";
 cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"
