// ==UserScript==
// @name        Amulyam 2in 1 by Harsha 
// @namespace   Amulyam auto Play Daily humor and Vocabulary
// @description Amulyam auto Play Daily humor and Vocabulary
// @grant       none
// @include     *amulyam.in*
// @version      2.0
// @author        Harsha
// @updateURL		http://userscripts.org/scripts/source/167600.meta.js
// @downloadURL		http://userscripts.org/scripts/source/167600.user.js
// @icon        http://t2.gstatic.com/images?q=tbn:ANd9GcQ2BYrq5RRPcbW_X2jC4PVwNHFoYT64C0o6XjaBn7um9wPZLgljow
// ==/UserScript==

var p=window.location.href;
var path = window.location.pathname;
var x = document.getElementsByTagName('a');
var pattern;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
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
else if(p==("http://www.amulyam.in/logout.do"))
window.location.href="http://010175f7.linkbucks.com";
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
    }
    for (var z =0; z < x.length; z++)
    {
 if(x[z].textContent=="25 paise has already added for checking daily humor pics")  
   {
window.location.href="http://www.amulyam.in/logout.do";
    }
    }
