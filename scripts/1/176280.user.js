// ==UserScript==
// @name       Amulyam
// @namespace  Amulyam reloaded
// @version    0.1
// @description  Amulyam auto Play Trivia and Vocabulary
// @include      *amulyam.in*
// @match     
// @copyright  
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
window.location.href="http://www.amulyam.in/logout.do";
if(p==("http://www.amulyam.in/logout.do"))
window.location.href="http://itsourtech.blogspot.com";