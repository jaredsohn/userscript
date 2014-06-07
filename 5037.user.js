// ==UserScript==
// @name          Bloglines - Save to NewsCloud.com
// @description	  Adds "Save to NewsCloud" link under each item in Bloglines. Allows you to save Bloglines stories to NewsCloud. 

// Bloglines Items page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*

// ==/UserScript==

(function() {
    
  function addNewsCloudLinkToItems() {
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

      //create new <a> for newscloud.com link
      var NewsCloudLink = document.createElement("a");
      NewsCloudLink.innerHTML = "Save to NewsCloud";

      //get newscloud.com Post URL
      var NewsCloudPostURL = "http://www.newscloud.com/submit/story/?qweburl=" + 
			      encodeURIComponent(linkHREF) + "&qtitle=" +
			      encodeURIComponent(linkTitle);

      NewsCloudLink.href = NewsCloudPostURL;
      NewsCloudLink.target = "cts";


      //create a new <li> for this link
      var NewsCloudListItem = document.createElement("li");
      NewsCloudListItem.appendChild(NewsCloudLink);
    

      //add this link after the other Item links
      itemLinksNode.appendChild(NewsCloudListItem);
    }//end for

  }//end addNewsCloudLinkToItems()
  
  
  addNewsCloudLinkToItems();

})();

