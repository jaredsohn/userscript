// ==UserScript==
// @name        Ultoo  Auto Answer by RAHUL KUMAR.
// @namespace   Ultoo
// @description Updated on 26-03-2013, this script answers all AnswerIt questions automatically in fast Way as you want.
// @include     http://sms.ultoo.com/*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @author        RAHUL
// ==/UserScript==

var path=window.location.pathname; if("/AnswereIt.php"==path){var options=fiction="sobhita;ashwin;azim premji;polo;dmk;rakhi;larry page;brazil;hayden;akram;lara;2;white;wajid khan;mard;europe;amol palekar;20;goa;friday;dravid;generator;drama;ooty;zend avesta;cricket;5;dilip parekh;west bengal;chicago;drama;kerala;bheema;madikeri;sambhaal;kelvin;suduko;chanderi;nirmala;mango;priyadarshan;blaze;bern;1986;nayak;spooker;dharmendra;hp;dances;china";cont=document.getElementsByTagName("p")[0].innerHTML,qno=parseInt(cont.substr(17));document.getElementsByTagName("input")[0].value=options.split(";")[qno-1];document.getElementsByTagName("input")[2].click()}else"/AnswereItGraph.php"== path?window.location.href="http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=":"/AICompletion.php"==path&&(window.location.href="http://facebook.com/rahulkumar.verma69");