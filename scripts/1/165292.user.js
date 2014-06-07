// ==UserScript==
// @name        Amulyam Hack by Bhupie
// @namespace   Amulyam auto Play Trivia and Vocabulary
// @description Amulyam, Check daily for Updates for Vocabulary
// @grant       none
// @include     *amulyam.in*
// @include      *adf.ly*
// @version     1.0.0
// @author      Bhupie
// @icon         http://img13.imageshack.us/img13/4417/piwallpaperbyoytiselie.jpg
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
{var options="interlude;divisive;animosity;muddle;inflict;conversant;incarnation;percolate;debunk;perturb;liturgical;diocese;inseminate;abate;disband";
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