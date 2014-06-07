// ==UserScript==
// @name        Amulyam New script by Sumanth(hackercracker007.tk)
// @namespace   Amulyam auto Play Dailyhumour script
// @description Amulyam auto Play Dailyhumour script
// @include     *amulyam.in*
// @include     http://hackercracker007.blogspot.com
// @version      v3.1
// @author        Sumanth
// @icon        
// ==/UserScript==

var p=window.location.href;
var path = window.location.pathname;
var x = document.getElementsByTagName('a');
var pattern;

if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
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
    window.location.href="http://www.facebook.com/hackingcracking007";
}
  }
  