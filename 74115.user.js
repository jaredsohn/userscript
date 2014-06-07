// ==UserScript==
// @name           TUS shit remover
// @namespace      http://tus-wa.com
// @description    Removes shitty posts by morons
// @include        http://tus-wa.com/*
// @include        http://www.tus-wa.com/*
// ==/UserScript==


function removeShit()
{     
     //var shitArr=["doubletime", "gay"];
     var shitArr=["doubletime"];
     
     var el = document.getElementsByTagName('td');
     
     for (i = 0; i < el.length; i++)
     {               
          if (el[i].className == 'windowbg' || el[i].className == "windowbg2")
          {                         
               for (j = 0; j < shitArr.length; j++)
               {
                    if (el[i].innerHTML.toLowerCase().indexOf("http://www.tus-wa.com/forums/profile/"+shitArr[j]) > - 1)
                    {
                         el[i].innerHTML = '<b>CENSORED</b>';
                    }
               }               
          }
     }
}

removeShit();