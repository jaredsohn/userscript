// ==UserScript==
// @name          AbeBooks Covers
// @namespace     http://whytheluckystiff.net/greasy/
// @description   While I love AbeBooks for buying used books, their covers are spotty.  Let's match covers from LibraryThing, using the ISBN.

// Add pages which are informative and helpful.
// @include       http://www.abebooks.com/*

// @version       1.0
// ==/UserScript==
(function() {
  var key = 'afd12c1ac1ff64a59f75d7c0558a0da8';
  var books = document.evaluate("//a[@class='isbn']", 
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < books.snapshotLength; i++) {
    var bookLink = books.snapshotItem(i);
    var isbn = bookLink.innerHTML.match(/\d+/)[0];
    var image = document.evaluate("../../td[@class='image']",
      bookLink, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (image)
    {
      var hasImage = document.evaluate("a/img",
        image, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (!hasImage)
      {
        image.innerHTML = '<a href="' + bookLink.href + '" class="thumbnail"><img src="' + 
          'http://covers.librarything.com/devkey/' + key + '/medium/isbn/' + isbn +
          '" /></a>';
      }
      else
      {
        image.innerHTML = '<a href="' + bookLink.href + '" class="thumbnail"><img src="' + 
          hasImage.src.replace(/\/tn/g, "/") +
          '" width="95" /></a>';
      }
    }
    else
    {
      var image = document.evaluate("//td[@id='bookPic']/img[@id='no-image']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (image)
      {
        image.parentNode.innerHTML = '<img border="0" src="' + 
          'http://covers.librarything.com/devkey/' + key + '/large/isbn/' + isbn +
          '" />';
      }
    }
  }
})();
