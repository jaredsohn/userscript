// Google Tab Saver
// version 0.3 beta
// 2007-04-10 (last updated: 2007-08-01)
// Author: Aaron McBride (http://www.apejet.org/aaron/)
// License: public domain (attribution appreciated)
// Description: Remembers (per computer) which tab you last selected
// on the Google personalized home page.  This can be useful if you want 
// to create a tab for home and one for work.  No more switching back and forth
// manually.
//
// Changes:
// 0.2 - 2007-07-30
//       I finally got around to making this work again,
//       fixed another bug, and cleaned it up a bit.
// 0.3 - 2007-08-01
//       fixed a bug where the click event wasn't being added
//       to tabs following the current tab (silly me)
// ==UserScript==
// @name           Google Tab Saver
// @namespace      http://www.apejet.org/aaron/
// @description    Remembers (per computer) which tab you last selected on the Google personalized home page.
// @include        http://www.google.com/ig*
// ==/UserScript==


(function() {

    //get saved tab id
    var savedTabIndex = GM_getValue("savedTabIndex");
    if(savedTabIndex != null)
    {
        var savedTab = document.getElementById("tab" + savedTabIndex + "_view");
        if(savedTab)
        {
            //if the saved tab isn't selected
            if(savedTab.className.indexOf("unselectedtab") != -1)
            {
                //call google's function to change tabs after a short delay
                setTimeout("_dlsetp('ct=' + " + savedTabIndex + ")", 100);
            }
        }
    }
    
    //add saveTabId event to all (unselected) tabs
    for(var i = 0; i < 16; i++)
    {
        var tab = document.getElementById("tab" + i + "_view");
        if(tab)//if the tab exists
        {
            //if the tab is unselected
            if(tab.className.indexOf("unselectedtab") != -1)
            {            
                tab.tabIndex = i;
                tab.addEventListener('click', function (){GM_setValue("savedTabIndex", this.tabIndex);}, false);
            }
        }
    }
})();
