// ==UserScript==
// @name YNewsOpenAll
// @namespace YNewsOpenAll
// @include http://news.yandex.ru/yandsearch?text=*
// ==/UserScript==



//=================================================================================================


var loadVidInfo = function ()
{
var allAs, thisA;

allAs = document.getElementsByTagName("a");

for (var i = 0; i <allAs.length; i++)
   {
    
     thisA = allAs[i];
     var articleToGet = thisA.getAttribute("href");
    
     if ((thisA.getAttribute("onClick"))&&(thisA.getAttribute("onClick").indexOf("news/aid=")!=-1))
     {
	 window.open(articleToGet);
     }
   } 
}


//=================================================================================================


function createLoadButton()
{
button = document.createElement('input');
//button.id = 'morebutton'+link;
button.value='Open all articles';
button.setAttribute('TYPE', 'BUTTON');
button.addEventListener("click", function(){loadVidInfo()}, false);


return button;
}

//=================================================================================================


var whereToInsert = document.getElementById('advanced');

whereToInsert.parentNode.appendChild(createLoadButton())