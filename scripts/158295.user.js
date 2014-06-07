// ==UserScript==
// @namespace http://userscripts.org/users/311626
// @name Real World Haskell hide comments
// @version 1.0.2.0
// @description Hides comment buttons at http://book.realworldhaskell.org/read/. A button will reappear when mousing over its respective paragraph.
// @include /^http://book\.realworldhaskell\.org/read/.+\.html.*$/
// ==/UserScript==

var addEventListeners = function () {
  var spans = document.getElementsByTagName('span');
  var comments = 0;
  
  for(var i = 0; i < spans.length; ++i) {
    (function () {
      var span = spans[i];
      
      if(span.className === 'comment') {
        var target;
        
        if(span.parentNode.tagName === 'P') {
          target = span.parentNode;
        } else {
          var div = document.createElement('div');
          
          span.parentNode.insertBefore(div, span.previousElementSibling);
          div.appendChild(span.previousElementSibling);
          div.appendChild(span);
          
          target = div;
        }
        
        span.style.display = 'none';
        
        target.addEventListener('mouseover', function (e) {
          e.stopPropagation();
          e.preventDefault();
          
          span.style.display = '';
        });
        
        target.addEventListener('mouseout', function (e) {
          e.stopPropagation();
          e.preventDefault();
          
          span.style.display = 'none';
        });
        
        ++comments;
      }
    } ());
  }
  
  if(comments === 0) {
    setTimeout(addEventListeners, 1000);
  }
};

addEventListeners();
