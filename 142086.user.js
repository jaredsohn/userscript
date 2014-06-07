// ==UserScript==
// @name        The Daily WTF Cornify highlighter
// @namespace   niet.us
// @description Highlights words in DWTF articles that add Cornyness to the page when you click them, and makes HTML comments visible
// @include     *thedailywtf.com/*
// @grant       none
// @author      Daan <daan@niet.us>
// @version     0.3
// ==/UserScript==

// Highlight cornification spans
var spans = document.getElementById('MainContent').getElementsByTagName('span');
if (spans.length  > 0)
{
  for (var i = 0; i < spans.length; i++)
  {
    if (spans[i].title == 'click me!')
    {
      spans[i].style.color = '#FFFFFF';
      spans[i].style.backgroundColor = '#E01B6A';
      spans[i].style.outline = '1px dotted #E01B6A';
    }
  }
}

// Show hidden comments
document.getElementById('MainContent').innerHTML = document.getElementById('MainContent').innerHTML.replace(/<!--\s*/g,'<span style="display: block; color: red">').replace(/-->/g,'</span>');