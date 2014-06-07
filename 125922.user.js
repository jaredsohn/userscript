// ==UserScript==
// @name          Static Share for Google+
// @namespace     https://plus.google.com
// @description   A Greasemonkey script that fixes the sharebox.
// @include       https://plus.google.com/* 
// ==/UserScript==
var INJECTED_CLASSNAME = 'crx-lazy-box';

// Listen on sharebox creations.
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations) {
  if (mutations.length === 4) {
    var addedNodes = mutations[0].addedNodes;
    if (addedNodes.length === 1) {
      var currentNode = addedNodes[0];
      console.log(currentNode);
      var shareButtonDOM = currentNode.querySelector('div[guidedhelpid="sharebutton"]');
      if (shareButtonDOM) {
        var max_height = window.innerHeight;
        currentNode.classList.add(INJECTED_CLASSNAME);
        currentNode.style.top = '20px';
        currentNode.style.left = '20px';
        currentNode.style.bottom = '20px';
        currentNode.style.width = (window.innerWidth - 140) + 'px';
        currentNode.style.overflow = 'scroll';
        currentNode.style.position = 'fixed';
        
        // Add me!
        var a = document.createElement('a');
        a.href = 'https://plus.google.com/116805285176805120365/about';
        a.innerText = 'Static Share by Mohamed Mansour'
        a.style.float = 'right';
        a.target = '_blank';
        currentNode.appendChild(a);
      }
    }
  }
});
observer.observe(document.body, { childList: true });
