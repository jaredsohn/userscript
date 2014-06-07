// ==UserScript==
// @name          Scripting Class for Amazon Books
// @include       http://www.amazon.com/*
// @require       http://userscripts.org/scripts/source/60315.user.js
// @require       http://userscripts.org/scripts/source/60318.user.js
// @copyright      2009, Cristobal Arellano (http://www.onekin.org/)
// @contributor          Oscar Diaz         (http://www.onekin.org/)
// @contributor          Jon Iturrioz       (http://www.onekin.org/)
// ==/UserScript==
var bookAmazonClass={
  "baseWebsite":"http://www.amazon.com/*",
  "implements":"http://userscripts.org/scripts/source/60315.user.js",
  "scrapers":[
    {"scrapedConcept":"Book","XPath":"//body[@class='dp']",
     "attributeScrapers":[
       {"scrapedAttribute":"title","XPath":"//span[@id='btAsinTitle']"},
       {"scrapedAttribute":"author","XPath":"//div[@class='buying']/span/a"},
       {"scrapedAttribute":"isbn",
        "function":function(book){
          var isbnNode=document.evaluate(
            ".//td[@class='bucket']/div[@class='content']/ul/li[4]",book,
            null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);						
	    return isbnNode.innerHTML.match(/[0-9]{10}/)[0];}},
       {"scrapedAttribute":"price",
        "function":function(book){
	  var price=document.evaluate(".//b[@class='priceLarge']",book,
	    null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);		
	    return price.innerHTML.match(/[0-9]+(\.[0-9]+)?/)[0];}}]}]
} 
window.registerScriptingClass(bookAmazonClass);