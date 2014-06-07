// ==UserScript==
// @name        Amulyam Hack by TRICK4EARNING.BLOGSPOT.COM
// @namespace   Amulyam auto Play Trivia and Vocabulary
// @description Amulyam hack, no daily Updates for Vocabulary needed[lifetime hack of amulyam,just login to your account the script will do the rest and logout automatically
// @grant       none
// @include     *amulyam.in*
// @version     2.0.0
// @author      TRICK4EARNING.BLOGSPOT.COM
// @icon         https://lh6.googleusercontent.com/-7ECd92BoiyI/UXzcHYFUGvI/AAAAAAAAAGI/P8Iy4OVNuQ8/h120/amulyam.jpg
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
else if(p==("http://www.amulyam.in/vocabulary.do"))
{var b=document.getElementsByTagName("h3")[1].innerHTML;
localStorage.setItem('c',b);
document.getElementsByClassName("playgame")[0].click();}
else if(p==("http://www.amulyam.in/enterLWord.do"))
{var a= localStorage.getItem('c');
document.getElementsByTagName('input')[0].value=a;	
document.getElementsByTagName('input')[2].click();}
else if(p==("http://www.amulyam.in/showLWord.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/vocabularyClaim50Paise.do"))
window.location.href="http://www.amulyam.in/.do";
