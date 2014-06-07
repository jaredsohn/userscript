// ==UserScript==
// @name          Remove Foxnews Ads
// @include       http://www.foxnews.com/*


// @description   Removes ad space from Foxnews.com
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

//  ====================================================    
//  Make a function to override CSS settings
//  ====================================================    


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    }
    
        
(function() {

//    thisElement = document.getElementById("DCol");    //remove shopping on msn, right hand column
//    thisElement.parentNode.removeChild(thisElement);

//==========================================
// Increases the height of the [More U.S & World Headlines] box
//==========================================

addGlobalStyle(
'#secHeads {' +
'  height: 500px ! important;' +
'}');

    
//==========================================

    var allItems, thisItem;

    allItems = xpath("//div[@id='hide1']")    //remove whitespace from deleted ad, right column
    for (var i = 0; i < allItems.snapshotLength; i++)
    {
      thisItem = allItems.snapshotItem(i);
      thisItem.parentNode.removeChild(thisItem)
      //GM_log('DELETED: thisItem.id = ' + thisItem.id);
    }

//==========================================
    
    var allElements, thisElement, elements2delete
    var j=0;
    //var TagName = "'*'"
    
    allElements = document.getElementsByTagName('p');
    //elements2delete = allElements;
    for (var i = 0; i < allElements.length; i++)
    {
        
        thisElement = allElements[i];
        if (
            thisElement.innerHTML.indexOf("Story continues below") != -1
            )
        {
        //     GM_log('thisElement.className = ' + thisElement.className);
             thisElement.parentNode.removeChild(thisElement)
             
        }
        
    }
    
//==========================================
    
    allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++)
    {
        
        thisElement = allElements[i];
        
        //rightPromoBox removes the promo (usually video) off on the right side
        
        //GM_log('thisElement.className = ' + thisElement.className);
        //GM_log('thisElement.id = ' + thisElement.id);
        if (thisElement.className == "adHead" || 
            thisElement.id == "rightPromoBox"          ||
            thisElement.id == "topAd"         
            )
        {
             thisElement.parentNode.removeChild(thisElement)
             //GM_log('DELETED: thisElement.className = ' + thisElement.className);
        }
        
    }

//==========================================
// Increases the height of the [Latest News Headlines] on the main page
//==========================================

// haven't figured out how to make this not have an error yet and exit the script, so do it last

    var URL = window.location;
    if (URL = "http://www.foxnews.com")       // If we're working on the main page...
    {
      var theDiv = document.getElementById('rootLateHeads');
      theDiv.style.height = "320px";
    }

//==========================================
    
//GM_log("Script finished");    
})();

