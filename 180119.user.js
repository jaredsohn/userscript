/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

// ==UserScript==
// @name        Amulyam 3 in 1 by jaibir yadav
// @namespace   Amulyam auto Play Trivia and Vocabulary and dailyhumour script
// @description Amulyam auto Play Trivia and Vocabulary and dailyhumour script
// @include     *amulyam.in*
// @include     http://top5star.tk
// @version      v3.0
// @author        Sumanth
// @icon        
// ==/UserScript==

var p=window.location.href;
var path = window.location.pathname;
var x = document.getElementsByTagName('a');
var pattern;

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
window.location.href="http://www.amulyam.in/amulyamCo.do?cafp=dailyHumour";
document.getElementsByClassName("link-button")[0].click();
 for (var z = 0; z < x.length; z++)
 {
       if(x[z].textContent=="Claim 1paise for checking this pic")
        {  x[z].click();
        }
        if(x[z].textContent=="Go to next pic")
         x[z].click();
if(x[z].textContent=="25 paise has already added for checking daily humor pics")  
{
window.location.href="http://www.amulyam.in/logout.do";
}
     }
     for (var v = 0; v < x.length; v++)
     {
  var pattern='/^http:\/\/amulyam.in\/login.do/g';
     if(p.search(pattern)==0)
{
    window.location.href="http://top5star.tk";
}
  }
  