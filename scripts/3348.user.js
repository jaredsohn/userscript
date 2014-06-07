// ==UserScript==
// @name	mail.com.premium
// @description	Skip Mail.Com ad pages and ads (updated version for Firefox 1.5). The checkbox of all unread messages is now checked, as default. This makes it easy to delete all new messages (good if your mailbox gets a lot of spam, as mine does)
// @include	http://*.mail.com/*
// ==/UserScript==
//      
(function() {
        
        function xpath(query) {
		return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
        
        
      var script_var = "var adShown  = 'true';  seenAd();";
      var skip_ad = document.createElement("script");
      skip_ad.setAttribute('type', 'text/javascript');
      skip_ad.innerHTML = script_var;
      document.body.appendChild(skip_ad);
   
      var ads = xpath("//div[script]")
      for (var i = 0; i < ads.snapshotLength; i++) {
      ad = ads.snapshotItem(i); 
      divname = ad.getAttribute("class");
      if(!(divname == "bdviolet"))   {         
      ad.parentNode.removeChild(ad);}
      }
        
        var boxes = xpath("//tr[@class='ir' and td/b]/th/input")
        for (var i = 0; i < boxes.snapshotLength; i++) {
        box = boxes.snapshotItem(i);
        box.setAttribute('checked', '');
        }
      
})();
