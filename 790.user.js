// Copyright 2005 Jesse Andrews under GPL v2 or later
// anotherjesse@gmail.com
//
// Like my work?
// Be a micropatron 
// Contribute using paypal

// ==UserScript==
// @name          Times of India
// @namespace     http://overstimulate.com/userscripts/
// @description   Replaces the print button with a READ link for easier reading
// @include       http://timesofindia.indiatimes.com*
// ==/UserScript==

function page_grabber( pgurl ) {       
    var objDOMParser = new DOMParser();
    var objDoc = '';
    GM_xmlhttpRequest({ method:"GET", url:pgurl, data:"",
      onload:function(result) {
        document.getElementsByTagName('body')[0].innerHTML = result.responseText;
      }
    });
}

(function() {


  imgs = document.getElementsByTagName('img');
  for (i in imgs) {
    if (imgs[i].src.match('/images/prtpage.gif')) {
      imgs[i].parentNode.parentNode.innerHTML = '<a href="javascript:page_grabber(\'' + imgs[i].parentNode.href + '\');">READ</a>';
    }
  }

})(); 
