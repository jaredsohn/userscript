// ==UserScript==
// @name           NYTimes Extra Fixer
// @namespace      http://phiffer.org/
// @description    Adds a click interaction to initiate NYTimes Extra and switches JavaScript-based scrolling to standard browser chrome
// @include        http://*nytimes.com/*
// ==/UserScript==

// Some CSS overrides
GM_addStyle(
  '.carousel { border-color: #ccc !important; } ' +
  '.carousel .scrollWindow { height: 129px !important; overflow: auto; display: none; } ' +
  '.carousel .scrollBorder { display: none; } ' +
  '.carousel .verticalScroll { height: auto !important; } ' +
  '.extraButton { margin-bottom: -5px; cursor: pointer; } ' +
  '.extraCloseLink { display: none; font: 11px arial, sans-serif !important; margin-left: 8px; color: #6CBC31 !important; } ' +
  '.extraCloseLink:hover { color: #333 !important; }'
);

// Find all the Times Extra widgets and iterate over them
xpath("//div[@class='carousel']").forEach(function(div) {
  
  // The content div
  var scroller = div.getElementsByTagName('div')[0];
  
  // Add a button that, when clicked, shows the hidden content
  var button = document.createElement('img');
  button.setAttribute('src', 'http://www.nytimes.com/marketing/timesextra/images/button_extra.gif');
  button.className = 'extraButton';
  button.setAttribute('width', 60); // Shrink the button slightly
  div.parentNode.insertBefore(button, div);
  
  // Add a link that hides the content again
  var link = document.createElement('a');
  link.setAttribute('href', '#');
  link.innerHTML = 'close';
  link.className = 'extraCloseLink';
  div.parentNode.insertBefore(link, div);
  
  // Show button click handler
  button.addEventListener('click', function() {
    button.style.display = 'none';     // Hide button
    scroller.style.display = 'block';  // Show content
    link.style.display = 'inline';     // Show link
  }, false);
  
  // Hide link click handler
  link.addEventListener('click', function(e) {
    e.preventDefault();
    button.style.display = 'block';   // Hide button
    scroller.style.display = 'none';  // Show content
    link.style.display = 'none';      // Show link
  }, false);
  
});


// XPath helper function
function xpath(path) {
  var iterator = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
  var result = [];
  var node = iterator.iterateNext();
  while (node) {
    result.push(node)
    node = iterator.iterateNext();
  }	
  return result;
}
