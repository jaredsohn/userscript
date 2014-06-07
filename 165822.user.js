// ==UserScript==
// @name        Amulyam Hack by bhupi
// @namespace   Amulyam auto Play Trivia and Vocabulary to earn a Rupee
// @description Amulyam, Check daily for Updates for Vocabulary
// @grant       none
// @include     *amulyam.in*
// @version     26.04.2013
// @author      bhupi
// ==/UserScript==

var p=window.location.href;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
window.location.href="http://www.amulyam.in/playTrivia.do";
else if(p==("http://www.amulyam.in/playTrivia.do"))
document.getElementsByTagName("input")[1].click();
else if(p==("http://www.amulyam.in/triviaClaim50Paise.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/showTriviaAnswer.do"))
window.location.href="http://www.amulyam.in/playTrivia.do";
else if(window.location.host=="adf.ly")
alert("Click Skip Ad Button");
else if(p==("http://www.amulyam.in/vocabulary.do"))
document.getElementsByClassName("playgame")[0].click();
else if(p==("http://www.amulyam.in/enterLWord.do"))
{var options="circuitous;vague;imprecise;evasive;selfrevealing;indefinite;unstated;diaphanous;severalty;consolidate;coherent;distort;profanity;obscene;repugnant";
var cont1=document.getElementsByTagName('p')[1].innerHTML;
var cont2=cont1.replace("Word ","Question number:-");
var cont=cont2.replace(" of 15","")
var qno=parseInt(cont.substr(17));
document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
document.getElementsByTagName('input')[2].click();}
else if(p==("http://www.amulyam.in/showLWord.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/vocabularyClaim50Paise.do"))
window.location.href="http://www.amulyam.in/displayMyWallet.do";