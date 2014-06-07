// ==UserScript==
// @name          Bloglines - Digg this
// @description	  Adds "Digg this! link to each item in bloglines - makes for easier digging !

// Bloglines Items page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*

// this is basically a copy of the bloglines del.icio.us script posted on userscripts.org

// ==/UserScript==

(function() {
    
  function adddiggLinkToItems() {
    //all item links are in <h3><a> tags
    var links = document.evaluate("//h3/a", 
                                  document, 
                                  null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                  null);

    //loop through all the item links on the page
    for (var link = null, i = 0; link = links.snapshotItem(i); i++) { 

      //get actual HREF link
      var linkHREF = link.href;

      //get title of link
      var linkTitle = link.innerHTML;

      //go back up to the parent of the <h3> tag, and find the "Clip/Blog This" link
	// "../..//ul[li/@class='item_date']"
      var itemLinks = document.evaluate("../..//ul[li/a/text()='Clip/Blog This']",
					   link,
					   null,
					   XPathResult.FIRST_ORDERED_NODE_TYPE,
					   null);
       
      var itemLinksNode = itemLinks.singleNodeValue;

      //create new <a> for digg link
      var diggLink = document.createElement("a");
      diggLink.innerHTML = "digg thi";

      //get digg Post URL



	var diggPostURL = "http://digg.com/submit?phase=2&url="   + encodeURIComponent(linkHREF) + 
													"&title=" + encodeURIComponent(linkTitle);


      diggLink.href = diggPostURL;
      diggLink.target = "_blank";


      //create a new <li> for this link
      var diggListItem = document.createElement("li");
      diggListItem.appendChild(diggLink);
    

      //add this link after the other Item links
      itemLinksNode.appendChild(diggListItem);
    }//end for

  }//end adddiggLinkToItems()
  
  
  adddiggLinkToItems();

})();

