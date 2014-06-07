//
// dingar@gmail.com
//
// ==UserScript==
// @name          xinhuanet.com printer friendly
// @namespace     xinhuanet.comPrinterFriendly
// @description   Make article pages of xinhuanet.com printer friendly.
// @include       http://*.xinhuanet.com/*
// ==/UserScript==

  if (document.location.href.match('.htm')) {    
    var content = document.evaluate("//div[@class='css_txt']", document, null, 0, null).iterateNext();
    
    if(content){
        document.body.innerHTML="<div class='mail'><div class='mail_left'>"+"<div class='css_txt'>"+content.innerHTML+"</div>"+"</div></div>";
    }
    
    else{
        var title=document.getElementById('Title');
        document.body.innerHTML="<div id='Title' style='font-size:22px;font-weight:bold;background-color:#fff'>"+title.innerHTML+"</div>"+"<div class='Content' style='background-color:#fff'>"+document.getElementById('Content').innerHTML+"</div>"
    }

    var allElements = document.getElementsByTagName('table');
    for (var i = 0; i < allElements.length; i++) {
       allElements[i].width="98%";
    }
    
    var allElements = document.getElementsByTagName('div');
    for (var i = 0; i < allElements.length; i++) {
       allElements[i].style.width="98%";
    }

  }
