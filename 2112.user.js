// Greasemonkey user script
//
// Alters title of GROKLAW article page to include the article's title
//
// Written by Neil Greenwood

// ==UserScript==
// @name          GROKLAW title
// @namespace     http://www.gneel.uklinux.net/greasemonkeyscripts/
// @description   Adds the article's title to a GROKLAW article
// @include       http://www.groklaw.net/article.php?story=*
// @exclude
// ==/UserScript==

var currentArticleTitle = document.evaluate("//td[@class='storytitle']",
                                            document,
                                            null,
                                            XPathResult.FIRST_ORDERED_NODE_TYPE,
                                            null).singleNodeValue;

document.title = "GROKLAW | " + currentArticleTitle.textContent;
