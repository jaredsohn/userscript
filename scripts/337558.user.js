// ==UserScript==
// @name        Amulyam by Yogesh
// @namespace   Amulyam Auto Play Trivia and Vocabulary
// @description Amulyam Auto Play Trivia and Vocabulary
// @grant       none
// @include     *amulyam.in*
// @version     2.6.2014
// @author      Yogam Yogesh
// @icon        
// ==/UserScript==

var p=window.location.href;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
{window.open("http://www.amulyam.in/vocabulary.do");
window.location.href="http://www.amulyam.in/playTrivia.do";}
else if(p==("http://www.amulyam.in/checkTrivia.do"))
window.scroll(0,5000);
else if(!!~window.location.href.indexOf('checkTrivia'))
document.getElementsByTagName("input")[1].click();
else if(p==("http://www.amulyam.in/playTrivia.do"))
document.getElementsByTagName("input")[1].click();
else if(p==("http://www.amulyam.in/amulyamCo.do?cafp=claimTrivia"))
window.location.href="http://www.amulyam.in/displayMyWallet.do";

else if(!!~window.location.href.indexOf('checkVocabulary'))
{var b=document.getElementsByTagName("h3")[1].innerHTML;
localStorage.setItem('c',b);
document.getElementsByClassName("playgame")[0].click();}
else if(p==("http://www.amulyam.in/vocabulary.do"))
{var b=document.getElementsByTagName("h3")[1].innerHTML;
localStorage.setItem('c',b);
document.getElementsByClassName("playgame")[0].click();}
else if(p==("http://www.amulyam.in/enterLWord.do"))
{var a= localStorage.getItem('c');
document.getElementsByTagName('input')[0].value=a;	
document.getElementsByTagName('input')[2].click();}
else if(p==("http://www.amulyam.in/showLWord.do"))
window.scroll(0,40000);
else if(p==("http://www.amulyam.in/amulyamCo.do?cafp=claimVocabulary"))
window.location.href="http://www.amulyam.in/displayMyWallet.do";