//
// dingar@gmail.com
//
// ==UserScript==
// @name          sohu.com printer friendly
// @namespace     sohu.comPrinterFriendly
// @description   Make article pages of sohu.com printer friendly.
// @include       http://*.sohu.com/*
// ==/UserScript==

  if (document.location.href.match('.shtml')) {
    var othercontent=document.evaluate("//div[@class='mutualityNEW']", document, null, 0, null).iterateNext();
    othercontent.innerHTML="";
    
    othercontent=document.evaluate("//div[@class='bgline']", document, null, 0, null).iterateNext();
    othercontent.innerHTML="";
    
    othercontent=document.evaluate("//div[@class='review']", document, null, 0, null).iterateNext();
    othercontent.innerHTML="";
    
    othercontent=document.evaluate("//div[@id='sohu_content']/table[1]", document, null, 0, null).iterateNext();
    othercontent.innerHTML="";
    
    var content = document.evaluate("//div[@class='article_area']", document, null, 0, null).iterateNext();
    document.body.innerHTML="<div class='cbody'><div class='lc'>"+"<div class='article_area'>"+content.innerHTML+"</div>"+"</div></div>";

    var allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
       allElements[i].style.width="98%";
    }
  }
