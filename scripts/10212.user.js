//
// dingar@gmail.com
//
// ==UserScript==
// @name          people.com.cn printer friendly
// @namespace     people.com.cnPrinterFriendly
// @description   Make article pages of people.com.cn printer friendly.
// @include       http://*.people.com.cn/*
// ==/UserScript==

  if (document.location.href.match('.html')) {
    var content = document.evaluate("//div[@class='left_c_c']", document, null, 0, null).iterateNext();
    if(content){
        document.body.innerHTML="<div class='content'><div class='left_content'>"+"<div 

class='left_c_c'>"+content.innerHTML+"</div>"+"</div></div>";
    }
    else{
        var title=document.evaluate("//td[@class='ftitle']", document, null, 0, null).iterateNext();
        content=document.evaluate("//td[@class='fbody']", document, null, 0, null).iterateNext();
        document.body.innerHTML="<div class='ftitle'>"+title.innerHTML+"</div>"+"<div 

id='fbody'>"+content.innerHTML+"</div>";
    }

    var allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
       allElements[i].style.width="98%";
    }
  }
