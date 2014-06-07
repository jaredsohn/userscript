// ==UserScript==
// @name        LibraryThing links to WorldCat on combination/separation pages
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Adds direct links to WorldCat searches for the editions shown in the combine/separate pages
// @include     http*://*librarything.tld/combine.php?*
// @include     http*://*librarything.com/combine.php?*
// @version     1
// ==/UserScript==

var paras = document.getElementsByTagName("table")[0].getElementsByTagName("p");
for ( var i=0; i<paras.length; i++ ) {
  var para = paras[i];
  if (para.childNodes.length) { // There are some empty paragraphs that otherwise break things.
    var wcSpan = document.createElement("span");
    var possibleISBNText;
    var nonEnglish = para.getElementsByClassName("trans").length >= 2 ? true : false; // This is really testing non-English with author, but that's ok.  >=2 because of "by" and "separate".
    if (nonEnglish) {
      possibleISBNText = para.childNodes[2].nodeValue; // The text after the translation of "by"
    } else {
      possibleISBNText = para.childNodes[0].nodeValue; // "Title [by author] [(ISBN #)] ("
    }
    var isbnRegEx = /\(ISBN ([\dX]*)\).\($/; // Not sure how to accurately get what's presenting as &nbsp; (but not accessible as such), so just using . instead.
    // If there's an ISBN, use that.
    if (isbnRegEx.test(possibleISBNText)) {
      var isbn = possibleISBNText.match(isbnRegEx)[1];
      wcSpan.innerHTML = '&nbsp;(<a href="http://worldcat.org/isbn/' + isbn + '">WorldCat</a>)';
    // Otherwise, search by title and author.
    } else {
      var lastPart = possibleISBNText.replace(/(^.*).\($/,"$1"); // Chop off the " (" at the end.
      var query;
      if (nonEnglish) {
        query = "ti:" + para.childNodes[0].nodeValue + "au:" + lastPart.replace(/^\s/,""); // Chop off the initial space.
      } else {
        var by = lastPart.lastIndexOf(" by ");
        if (by > -1) { // If there's no author
          query = "ti:" + lastPart.substr(0, by); // Everything up to the last " by "
          query = query + " au:" + lastPart.substr(by + 4); // Everything after the last " by "
        } else {
          query = "ti:" + lastPart;
        }
      }
      wcSpan.innerHTML = '&nbsp;(<a href="http://worldcat.org/search?q=' + query + '">WorldCat</a>)'
    }
    // Add the newly constructed link to the end of the line.
    para.appendChild(wcSpan);
  }
}