// ==UserScript==
// @name        Ultoo  Auto Answer.. by RAHUL KUMAR
// @namespace   Ultoo
// @description Updated on 6-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @icon        http://img341.imageshack.us/img341/3755/14060001.png
// @author        Rahul
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options=fiction=""Vinay Kumar;Chennai;Sehwag;Mumbai;Chennai;Tom Moody;Sagar Ratna;6;Ankara;Orange;SP;Boucher;Joel osment;Maple Leaf;Priyanka;Bhutan;11;Vadodara;Peace;Aamir;Limca;HOCKEY;C2o;Cow;Mewa;Petrol;Kailsah;Expert;Sonakshi;Badmash Sala;UP;RCB;Drift;Khiladi 786;Fashion;Rene;China;Radio City;Blackberry;Srinagar;madhuri;Legs Up;Haridas;Silver;Harbajan Mann;sri lanka;tintin;Googly;Farha Khan;Sajan;"
cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"if ( url . search ( pattern )== 0 ) pattern = /^http:\/\/sms.ultoo.com\/relogin.php/g ; if ( url . search ( pattern )== 0 ) { window . location . href = "http://sms.ultoo.com/login" ; } } );