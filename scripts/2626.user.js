// ==UserScript==
// @name           Lugnet Restore Dots Display
// @namespace      http://www.pobursky.com/files/lugnetrestoredotsdisplay.user.js
// @description    On Lugnet, add suppressed dots display back into main message
// @include        http://news.lugnet.com/*
// ==/UserScript==

// Search page for the suppress dots message
var findlocation = document.evaluate("//FONT[@color='#000000']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = findlocation.snapshotLength - 1; i >=0; i--) {
  if (findlocation.snapshotItem(i).innerHTML.indexOf('Inline display suppressed due to large size') >= 0) {
    var suppresseddots = findlocation.snapshotItem(i);
    
    //Reset the suppressed dot text to indicate loading
    suppresseddots.innerHTML = "Loading dots display";
    
    //Find the URL for the dots page
    var finddotsurl = document.evaluate("//A[contains(@href,'&t=i&v=d')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var dotspageurl = finddotsurl.snapshotItem(0).href;
    
    //Call the dots page for the dots HTML
    GM_xmlhttpRequest({
      method:'GET',
      url: dotspageurl,
      onload:function(details) {
        var dotspagetext = details.responseText
    
        //Extract the dots HTML from the dots page
        var start = dotspagetext.indexOf('<CENTER>');
        var end = dotspagetext.indexOf('</CENTER>');
   
        var dotsHTML = dotspagetext.substr(start, end-start);
        
        //Set the suppressed dot text to the dots HTML
        suppresseddots.innerHTML = dotsHTML;
        
        //Since the dot page does make the current location in the tree
        //like the normal dots view does, we need to find and replace the
        //current position with the appropriate image
        var currentlocation = document.evaluate("//A[@href='" + window.location.pathname + window.location.search + "']",suppresseddots,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        var currentlocationlink = currentlocation.snapshotItem(0);
        var newimg = document.createElement("img");
        newimg.src = '/news/here.gif';
        newimg.width = '9';
        newimg.height = '11';
        newimg.vspace = '2';
        newimg.title = 'You are here';
        currentlocationlink.parentNode.insertBefore(newimg,currentlocationlink);
        currentlocationlink.parentNode.removeChild(currentlocationlink);
      }
    });
    
    break;
  }
}  

