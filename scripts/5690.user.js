// ==UserScript==
// @name           Fix wikipedia's lowercase first letter problem
// @namespace      http://pile0nades.wordpress.com/
// @description    Fix the lowercase first letter problem by changing the page title to the correct one and hiding the template.
// @include        http://en.wikipedia.org/wiki/*
// ==/UserScript==


try {
  var ch = get("//div[@id='bodyContent']/dl/dd/span[@class='plainlinks']/i[contains(.,'initial letter is capitalized')]/b").snapshotItem(0);
  var correction = ch.innerHTML;
  var articleTitle = get("//div[@id='content']/h1[@class='firstHeading']").snapshotItem(0);
  var template = ch.parentNode.parentNode.parentNode;

  // check if the original and correct versions match
  // this avoids acting on non-"real" uses of the template
  if(articleTitle.innerHTML.toLowerCase() == correction.toLowerCase()) {
    // Correct the page title
    document.title = document.title.replace(articleTitle.innerHTML, correction);
  
    // Correct the article title
    articleTitle.innerHTML = correction;
  
    // Remove template
    template.style.display = "none";
  }
}
catch(e){}

function get(query, context) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    context
  );
}