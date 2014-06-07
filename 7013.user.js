// ==UserScript==
// @name          Finance Change
// @description   Convert charts from finance.google.com, money.cnn.com, marketwatch.com to finance.yahoo.com
// @include       *
// ==/UserScript==


(function() {
  links = document.getElementsByTagName('A');
  for (i=0; i<links.length; i++) {
    link = links[i];
  
      link.href = link.href.replace('money.cnn.com/quote/chart/chart.html?symb=','finance.yahoo.com/q?s=');
      link.href = link.href.replace('money.cnn.com/quote/quote.html?symb=','finance.yahoo.com/q?s=');
      link.href = link.href.replace('www.marketwatch.com/tools/quotes/quotes.asp?symb=','finance.yahoo.com/q?s=');
      link.href = link.href.replace('http://finance.google.com/finance?q=','finance.yahoo.com/q?s=');      
    
  }
})();

