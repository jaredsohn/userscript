// ==UserScript==
// @name           Hashtags Everywhere 0.2
// @namespace      http://www.avramovic.info/
// @description    Add Twitter #hashtags everywhere
// @include        *
// @exclude        http://twitter.com/*
// @exclude        https://twitter.com/*
// ==/UserScript==

function hashify()
{

  var allElements, thisElement;
  allElements = document.getElementsByTagName('*');
  
  for (var i = 0; i < allElements.length; i++) 
  {
    thisElement = allElements[i];
    
    var tagname = thisElement.tagName.toLowerCase();

    if ((tagname=='p') || (tagname=='div') || (tagname=='blockquote') || (tagname=='li') || (tagname=='h1') || (tagname=='h2') || (tagname=='h3') || (tagname=='h4') || (tagname=='h5') || (tagname=='h6') || (tagname=='td'))
    {
      var html = thisElement.innerHTML;
      html = html.replace(/(\s)\#([a-zA-Z0-9_]+)/g, '$1<a href="http://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
      thisElement.innerHTML = html;
    }
  }

}

window.addEventListener(
    'load', 
    hashify,
    true);