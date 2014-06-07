// ==UserScript==
// @name          Remove MSNBC Ads
// @include       http://www.msnbc.msn.com/*
// @include       http://www.msnbc.com/*

// @description   Removes ad space from MSNBC.com
// @exclude       

// ==/UserScript==


//GM_log("Running script...");

//  ====================================================    
//  Make an xpath query easy to run--see Dive Into Greasemonkey
//  ====================================================    

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
    
(function() {

    var allItems, thisItem;

    thisItem = document.getElementById("DCol");    //remove shopping on msn, right hand column
    thisItem.parentNode.removeChild(thisItem);
    
    allItems = xpath("//div[@class='AdEShopHead']")    //remove this item first so the page will look right
    for (var i = 0; i < allItems.snapshotLength; i++)
    {
      thisItem = allItems.snapshotItem(i);
      thisItem.parentNode.removeChild(thisItem)
    }
    
    var text;
    var badclasses = new Array();

//  ====================================================    
//  Add however many classes here to get rid of them
//  ====================================================    
    var j = 0;
    badclasses[j++] = "adbar"                     //adbar at the top
    badclasses[j++] = "textSmallGrey w320"
    badclasses[j++] = "textSmallGrey"             //Story Continues Below
    badclasses[j++] = "textSmallgrey"
    badclasses[j++] = "textSmallBlackBold"
    badclasses[j++] = "textSmallGrey p2"
    badclasses[j++] = "w300 aC textSmallGrey p7"
    badclasses[j++] = "box_3054039"
    badclasses[j++] = "AdEShopMain"               //stupid thing on the side
    badclasses[j++] = "AdOverThePageDiv"
    badclasses[j++] = "nmX"
    badclasses[j++] = "t4 f65 cFFF    "           // "sponsored by" on business pages
    
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
          thisItem.parentNode.removeChild(thisItem)
        }
    }
    
})();

