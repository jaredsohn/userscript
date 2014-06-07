// ==UserScript==
// @name           New York Times Purified
// @author         Philipp Weis <pweis@pweis.com>
// @namespace      http://userscripts.org/users/121943
// @description    Removes all non-essentials parts from New York Times articles.
// @include        http://nytimes.com/*
// @include        http://*.nytimes.com/*
// @include        https://nytimes.com/*
// @include        https://*.nytimes.com/*
// @version        0.2
// @license        Public Domain
// ==/UserScript==

function removeElement(element) {
  if (element) {
    element.parentNode.removeChild(element);
  }
};

function removeElementById(id) {
  removeElement(document.getElementById(id));
};

function removeElementsByClass(className) {
  while (true) {
    var elements = document.getElementsByClassName(className);
    if (!elements.length) {
      break;
    }
    removeElement(elements[0]);
  }
};

var article = document.getElementById('article');
if (!article) {  
  throw Error('Article element not found');
}

var firstColumnGroup = article.getElementsByClassName('first')[0];
article = firstColumnGroup || article;

var shell = document.getElementById('shell');
if (shell) {
  var parent = shell.parentNode;
  parent.replaceChild(article, shell);
}

removeElementById('readerscomment');
removeElementById('articleToolsTop');
removeElementsByClass('shareTools');

var keepRemoving = true;
outer: while (keepRemoving) {
  keepRemoving = false;
  // Removing nodes affects the result of getElementsByClassName, so always
  // re-compute.
  var elements = document.getElementsByClassName('articleInline');
  var i = 0;
  while (true) {
    var element = elements[i];
    if (!element) {
      // No more elements to remove.
      break outer;
    }
    if (!element.classList.contains('firstArticleInline')) {
      // Found an element to remove.
      break;
    }
    // Keep this element, move on to next one.
    i++;
  }
  var elementParent = element.parentNode;
  if (elementParent) {
    elementParent.removeChild(element);
    keepRemoving = true;
  }
}

document.body.style.margin = '10px';
