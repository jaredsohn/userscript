// ==UserScript==
// @name          Bloglines - Post to Del.icio.us
// @description	  Adds "Post to Del.icio.us" link under each item in Bloglines

// Bloglines Items page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*

// ==/UserScript==

(function() {
    
  function addDeliciousLinkToItems() {
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

      //create new <a> for del.icio.us link
      var deliciousLink = document.createElement("a");
      deliciousLink.innerHTML = "Post to del.icio.us";

      //get del.icio.us Post URL
      var deliciousPostURL = "http://del.icio.us/post?v=4;url=" + 
			      encodeURIComponent(linkHREF) + ";title=" +
			      encodeURIComponent(linkTitle);

      deliciousLink.href = deliciousPostURL;
      deliciousLink.target = "_blank";


      //create a new <li> for this link
      var deliciousListItem = document.createElement("li");
      deliciousListItem.appendChild(deliciousLink);
    

      //add this link after the other Item links
      itemLinksNode.appendChild(deliciousListItem);
    }//end for

  }//end addDeliciousLinkToItems()
  
  
  addDeliciousLinkToItems();

})();
