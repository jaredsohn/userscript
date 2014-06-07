// ==UserScript==
// @name        Amulyam Hacked by Bhupi
// @namespace   Amulyam auto Play Vocabulary & Trivia
// @description Amulyam, Check daily for Updates
// @grant       none
// @include     *amulyam.in*
// @version     1.0.1
// @author      Bhupi
// @icon         http://i1361.photobucket.com/albums/r679/bhupie007/eecf8b18-53af-4440-b773-a30b2db2dea1_zps8e894ef9.jpg
// ==/UserScript==

var p=window.location.href;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
window.location.href="http://adf.ly/LE8u0";
else if(p==("http://www.amulyam.in/playTrivia.do"))
document.getElementsByTagName("input")[1].click();
else if(p==("http://www.amulyam.in/triviaClaim50Paise.do"))
window.location.href="http://adf.ly/LEceR";
else if(p==("http://www.amulyam.in/showTriviaAnswer.do"))
window.location.href="http://www.amulyam.in/playTrivia.do";
else if(window.location.host=="adf.ly")
alert("Click Skip Ad Button");
else if(p==("http://www.amulyam.in/vocabulary.do"))
document.getElementsByClassName("playgame")[0].click();
else if(p==("http://www.amulyam.in/enterLWord.do"))
{var options="anoint;sweepstake;hustings;shortcoming;trample;enmesh;entangle;expansionism;macho;pliant;linchpin;foray;garrison;forbidden;chastity";
var cont1=document.getElementsByTagName('p')[1].innerHTML;
var cont2=cont1.replace("Word ","Question number:-");
var cont=cont2.replace(" of 15","")
var qno=parseInt(cont.substr(17));
document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
document.getElementsByTagName('input')[2].click();}
else if(p==("http://www.amulyam.in/showLWord.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/vocabularyClaim50Paise.do"))
window.location.href="http://adf.ly/LElP0";