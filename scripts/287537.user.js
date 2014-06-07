// ==UserScript==
// @name           Hide suggested Poke
// @version        1.3
// @author         Hugo Zilliox
// @namespace      http://blog.hzilliox.fr
// @description    Hide suggested Poke in the Facebook webpage
// @include        *facebook.*
// @grant          none
// ==/UserScript==

// elem take the value of the title box "Suggested Poke";
var elem = document.getElementsByClassName('_57d8');
elem = elem[elem.length - 1];

function isthereapokehere()
{
   if(document.title == "Pokes" || /poke/i.test(document.URL))
   {  
    do {
        // we hide it
        elem.style.display = 'none';
        // we move to the next one
        elem = elem.nextElementSibling;
    } while(elem != null); 
   }
   window.setTimeout(isthereapokehere,100);
}

//setInterval(function(){isthereapokehere()},100);
isthereapokehere();


document.querySelector('html').addEventListener('DOMNodeInserted', function(ev){
  var new_url = document.location.toString();
  if (url == new_url) return; // already checked or processed
  url = new_url;

  isthereapokehere();
});