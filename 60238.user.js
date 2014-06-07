// ==UserScript==
// @name          Yandex Highlight Websites
// @namespace     http://kuzmi.ch
// @description   Highlighting websites that are in the array linksPod in Yandex SE   
// @include       http*://yandex.ru/yandsearch*
// @include       http*://yandex.ru/yandpage*
// ==/UserScript==
//
// Notes
// version 1.1


// Change these values for marking some websites in Yandex results:
var linksPod = new Array(
'habrahabr.ru',
'www.techcrunch.com',
'en.wikipedia.org',
);


(function(){

var allDivTags=document.getElementsByTagName("div");

for (i=0; i<allDivTags.length; i++)
	{
         

            if (allDivTags[i].className == 'cr') {
               
               var a=allDivTags[i].getElementsByTagName('a');

               for (var j = 0; j < linksPod.length; j++) {

		       var re = new RegExp('href=".*?'+linksPod[j]+'.*?"\\s', 'i');

				if(allDivTags[i].innerHTML.match(re))
				{
					//Yes, this is on of links under supervision
					a[0].style.background='#FF00FF';
					break;
				}                        
                
              }
           }
       }
	
})();
