// ==UserScript==
// @name          Remove CNN Ads
// @include       http://www.cnn.com/*
// @include       www.cnn.com/*
// @include       http://sportsillustrated.cnn.com/*

// @description   Removes ad space from CNN.com
// @exclude       

// ==/UserScript==


GM_log("Running script...");

//  ====================================================    
//  Make an xpath query easy to run--see Dive Into Greasemonkey
//  ====================================================    

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
    
(function() {

    var allItems, thisItem;

    //thisItem = document.getElementById("cnnRRad");    //sponsored link, bottom right
    //thisItem.parentNode.removeChild(thisItem);
    
    //allItems = xpath("//div[@class='AdEShopHead']")    //remove this item first so the page will look right
    //for (var i = 0; i < allItems.snapshotLength; i++)
    //{
    //  thisItem = allItems.snapshotItem(i);
    //  thisItem.parentNode.removeChild(thisItem)
    //}
    
    var text;
    var badclasses = new Array(); 
    var tables = new Array();

//  ====================================================    
//  Add however many classes here to get rid of them
//  ====================================================    
    var j = 0;
    badclasses[j++] = "cnnContextualLinksBoxHeader"    // context links on the side
    badclasses[j++] = "cnnContextualLinksBox"          // context links on the side
    badclasses[j++] = "storyCLSponsoredLinks"          // 
    badclasses[j++] = "cnnCL"                          // 
    badclasses[j++] = "cnnCLurl"                       // 
    badclasses[j++] = "cnnCLbox"                       // bottom of main page
    badclasses[j++] = "cnnRRadContent"                 // Featured Sponsors, bottom right
    badclasses[j++] = "CNN_homeAdBox"                  // subdiv of cnn321 (ad on right)
    //badclasses[j++] = ""                    //
    
//  ====================================================    
//  For each bad class, find all references using xpath,
//  then delete them all.
//  ====================================================    
    for (j = 0; j < badclasses.length; j++)
    {
        text = "//*[@class='" + badclasses[j] + "']" 
        allItems = xpath(text)
        for (var i = 0; i < allItems.snapshotLength; i++)
        {
          thisItem = allItems.snapshotItem(i);
          GM_log("thisItem: " + thisItem);

          // this IF statement removes the ad box on the right without 
          // also removing the Latest News Items by selectively blocking 
          // the cnn321pxBlock div if it's the parent of the AdBox
          if (thisItem.className == "CNN_homeAdBox" && thisItem.parentNode.className == "cnn321pxBlock")
            {
            thisItem = thisItem.parentNode     
            }
          
          thisItem.parentNode.removeChild(thisItem)
          
        }
    }

    j = 0;
    tables[j++] = "width=160"                  //table on bottom, main page
    tables[j++] = "width=58"                  //table on the side, articles
    tables[j++] = 'id="cnnContextualLinks"'   //bottom, main page
    
    for (j = 0; j < tables.length; j++)
    {
      text = "//table[@" + tables[j] + "]"                   
      allItems = xpath(text)
      for (var i = 0; i < allItems.snapshotLength; i++)
        {
          thisItem = allItems.snapshotItem(i);
          GM_log("thisItem: " + thisItem);
          thisItem.parentNode.removeChild(thisItem)
        }
    }
    
    
})();

