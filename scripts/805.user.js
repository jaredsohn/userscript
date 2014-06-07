/*
    Add accesskeys for navigating through Google search results pages
    (c) Phil Wilson, greasemonkey@philwilson.org

    GPL.
*/

// ==UserScript==
// @name            Google Accesskeys
// @namespace       http://philwilson.org/
// @description     Enables navigation through Google search results using "," and "."
// @include         http://www.google.*
// ==/UserScript==

(function() {

  // find the current position
  var a = document.evaluate("//img[contains(@src,'/nav_current.gif')]", document, null, 0, null).iterateNext();

  // create a holder for our new links
  newdiv = document.createElement("p");
  newdiv.setAttribute("align", "centre");

  // if we're not the first node, set the URL to the previous page of results
  var prevNode = a.parentNode.previousSibling.firstChild;
  if (prevNode.hasAttribute("href"))
  {
    prevlink = document.createElement("a");
    prevlink.setAttribute("href", prevNode.attributes.href.value);
    prevlink.setAttribute("accesskey", ",");
    prevlink.setAttribute("title", "Go to the previous page of results");
    //prevlink.appendChild(document.createTextNode("Previous = ,"));
    newdiv.appendChild(prevlink);

  }

  // if we're not the last node, set the URL to the next page of results
  var nextNode = a.parentNode.nextSibling.firstChild;
  if (nextNode.hasAttribute("href"))
  {
    nextlink = document.createElement("a");    
    nextlink.setAttribute("href", nextNode.attributes.href.value);
    nextlink.setAttribute("accesskey", ".");
    nextlink.setAttribute("title", "Go to the next page of results");
    //nextlink.appendChild(document.createTextNode("Next = ."));   
    newdiv.appendChild(nextlink);

  } 

  // the accesskeys have been set, let's show them to the user

  // get the Google "Previous" and "Next" span nodes
  var googleNavs = document.evaluate("//span[@class='b']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);  

  // welcome to the most inefficient if..else in the world
  if (prevNode.hasAttribute("href") && nextNode.hasAttribute("href"))
  {
      var googlePrevious = googleNavs.iterateNext();
      var googleNext = googleNavs.iterateNext();

      addPreviousText(googlePrevious);
      addNextText(googleNext);
  }
  else if (prevNode.hasAttribute("href"))
  {
      var googlePrevious = googleNavs.iterateNext();
      addPreviousText(googlePrevious);
  }
  else if (nextNode.hasAttribute("href"))
  {
      var googleNext = googleNavs.iterateNext();
      addNextText(googleNext);
  }
   

  var navbox = document.evaluate("//div[@class='n']", document, null, 0, null).iterateNext();
  document.body.insertBefore(newdiv, navbox);

    function addPreviousText(_googlePrevious)
    {
      _googlePrevious.parentNode.parentNode.style.whiteSpace = "nowrap";
      _googlePrevious.appendChild(document.createTextNode(" (,)"));
    }

    function addNextText(_googleNext)
    {
      _googleNext.parentNode.parentNode.style.whiteSpace = "nowrap";
      _googleNext.appendChild(document.createTextNode(" (.)"));          
    }

})();



