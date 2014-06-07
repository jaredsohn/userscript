// ==UserScript==
// @id             shortnewsoptimize@chilln
// @name           ShortNews Werbung entfernen
// @version        1.1
// @namespace      chilln
// @author         chilln
// @description    
// @include        http://www.shortnews.de/id/*
// @run-at         document-end
// ==/UserScript==

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval("var a=$('div[style=\"border:1px solid #E5E5E5; margin:0px; display:block;\"]');a.empty();a.removeAttr(\"style\");$('.newscommentlink').removeClass('newscommentlink');$('.newslink,.newscommentlink').each(function(){$(this).attr(\"href\",function(i,val){return unescape(val.replace(/(http:\\/\\/www.shortnews.de)?\\/goto\\.cfm.*link=/,\"\"));})});");
