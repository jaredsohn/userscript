// ==UserScript==
// @name       Fuck Ilustrum
// @version    1.3
// @author     Petiso
// @description  Remove the buy lives with luxus button when lives are 0
// @include	   http://www.ilustrum.com/*
// @run-at document-body
// @copyright  2014+, Petiso
// ==/UserScript==

function fixIlu() {
	try {
            var element = document.getElementsByClassName('amount balance-of-lives');
            if (element.length>0)
            {
              if (parseInt(element[0].innerHTML) == 0)
              {
                element = document.getElementsByClassName('popup-buttons2 clearfix');
                if (element.length>0)
                {
                   for(var i = 0; i < element.length; i++)
                   {  
                     if (element[i].id != "card-stack-buttons")
                     {
                       if (element[i].innerHTML.search("keep-playing")!=-1)
                       {
                         element[i].style.visibility="hidden";
                       }
                     }
                   }
                }
              }
            }
		}
	 catch (e) {}
}

function checkNew(e)
{
   fixIlu();
}

document.addEventListener('DOMNodeInserted', checkNew);
