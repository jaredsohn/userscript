// ==UserScript==
// @name           MTBR Forums Cleanup
// @namespace      myuziweighsaton
// @description    Removes ads from MTBR forums
// @include        http://forums.mtbr.com/*
// ==/UserScript==


(function() {

    var remove = null;


    // Remove the header
    wipeItOut("/html/body/table[1]");


    // Condense some whitespace at the top
    wipeItOut("/html/body/br[1]");



    // Kill the top center ad
    remove = document.getElementById('ad_468');
    if (remove) destroy(remove);


    // Kill the right column of ads
    wipeItOut("/html/body/table[2]/tbody/tr/td[4]");


    // Kill the new ad that they are sticking in the first post
    wipeItOut("/html/body/table/tbody/tr/td/div/div/div/div/div/table/tbody/tr/td/table/tbody/tr/td[2]");
    
    



    function wipeItOut(query)
    {
        var allDivs = xpath(query);
    
        for (var i = 0; i < allDivs.snapshotLength; i++) {
            destroy(allDivs.snapshotItem(i));
        }
    }
    

    function wipeItOutParent(query)
    {
        var allDivs = xpath(query);
    
        for (var i = 0; i < allDivs.snapshotLength; i++) {
            destroyParent(allDivs.snapshotItem(i));
        }
    }
    

    function xpath(query) {
        return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }


    // destroy the parent node
     function destroyParent(node) {
         var p = node.parentNode;
         if (p&& p.id != "content" && // exclusions JIC
                 p.id != "contentWrap" &&
                 p.id != "SplashContentWrap" &&
                 p.id != "header" &&
                 p.id != "main" &&
                 p.id != "body" &&
                 p.id != "nav" &&
                 p.id != "srch" &&
                 p.id != "searchmain" &&
                 p.id != "blog_content" &&
                 p.id != "groupsnarrowleft" &&
                 p.id != "books_skinny" &&
                 p.id != "headControls" &&
                 !(isPage("home") && (p.id == "col1" || p.id == "col2" || p.id == "col3")) &&
                 p.id != "aspnetForm" && // form for picture comments
                 p.nodeName != "BODY" && // don't destroy the BODY tag
                 p.parentNode && // or any child of the BODY
                 p.parentNode.nodeName != "BODY" &&
                 p.parentNode.nodeName.id != "body" &&
                 !containsTdText(p))
             destroy(p);
     }
    
     // destroy the node and all its children
     function destroy(node) {
         for (var y = 0; y < node.childNodes.length; y++) {
             var p = node.childNodes[y];
             if (p.style)
                 p.style.setProperty('display', 'none', 'important');
         }
         
         if (node.style)
             node.style.setProperty('display', 'none', 'important');
     }
     
})();