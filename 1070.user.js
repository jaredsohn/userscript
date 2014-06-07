// Mailto Envelope v0.2
// Made By Jason (aka GamingFox)
// Last updated: 6/5/05
//
// This script is made according to a request:
// Make mailtos obvious: I hate clicking on some hyperlinked text only
// to find out that it was a mailto link. How about a script to change
// all mailto text links into unlinked text with a linked U+2709 (envelope)
// after it?
//
// The image of envelope came from http://timriley.net/hmenu/icons/envelope.gif
// I use it instead of U+2709 because there are different codes for envelope
// dues to multiple versions of UTF encoding. Image of envelope is a lot easier
// and more clear than unicode character.
//
// ==UserScript==
// @name	  Mailto Envelope
// @namespace	  http://gamingfox.blogspot.com/
// @description	  v0.2: Unlink mailtos (toggleable) and add linked envelope with title showing exact mailto address.
// @include	  http://*
// @include	  https://*
// @include	  file://*
// ==/UserScript==

(function () {

  var unlink = 1;
  // unlink = 1 will unlink the mailto links
  // unlink = 0 will NOT unlink the mailto links

  var links = document.links;
  var envelope = 'data:image/gif;base64,R0lGODlhEgASAMZDABUcJRkgKRohKh0kLCEoMCMqMiQrMyUsNCYsNSowOC81PTI4QDU7QjY8Qz1DSj5ES0FHTkNJUEVLUkZMU0hNVExSWVdcYlhdZFpfZVxhZ11iaF5jaWBka2pudGxwdm5yd3B1enF1e3R4fXZ6f3l9gnp%2Bg3t%2FhH%2BDiIOGi4WJjoaKj4mNkYyPlJKVmp6hpaOlqaWnq7y%2BwMvNz9LT1dbX2dna29rb3N7f4eTl5ufn6PDw8fHx8vLy8%2FT19ff3%2BPr6%2Bvv7%2B%2Fz8%2FP39%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH%2BFUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh%2BQQBCgB%2FACwAAAAAEgASAAAHm4B%2FgoOEhYaHiH8Ai4yNjgCKAh8rlJWWlBgCix0ILEOfoKEnCiWLKzcOIEKhn0AZFT0rpkM%2FGhQ7oTkRHquyACugIQUznzQHJqC%2BwEM8DCoGIiIEHBarQ8qfGyNDNS4uM0ESLZ%2FYMA8%2BrEM4CTLXpjYFNemfMQs6vikNL%2FOgJRy%2BEzbwAxUEwoVFA1BcWriCRABIjyIySkSx4qFAADs%3D';
  for(var i=0; i<links.length; i++) {
    if(links[i].href.substring(0, 7).toLowerCase() == "mailto:" && links[i].text) {

      if(unlink == 1)
      {
    	var a = document.createElement("a");
      	a.setAttribute("href", links[i].href);
     	links[i].parentNode.insertBefore(a, links[i].nextSibling);
      }

      else {
	var a = links[i];
      } 

      var img = document.createElement("img");
      img.setAttribute("src", envelope);
      img.setAttribute("title", links[i].href);
      img.setAttribute("style", "display: inline !important; border: 0px none !important; padding: 0px; margin: 0px; vertical-align: middle; margin-left: 5px;"); 
      a.appendChild(img);

      if(unlink == 1)
      {
     	var text = document.createTextNode(links[i].text);
     	a.parentNode.insertBefore(text, a);
     	links[i].parentNode.removeChild(links[i]);
      }
    }
  }
})();
