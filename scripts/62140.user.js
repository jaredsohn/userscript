// ==UserScript==
// @name           ANGEL LinkFix
// @namespace      ANGEL
// @description    Replace Crappy Links in ANGEL's Lessons area to real links
// @include        https://cms.psu.edu/section/*
// ==/UserScript==

var newlink;
var allLinks, thisLink;

//Yes, this is very ugly
function addNewLink(theDest, where)
{
	
    GM_xmlhttpRequest({
    method: 'GET',
    url: theDest,

    onload: function(responseDetails) {
    
    	//Need to Find Next Request Item (ANGEL Is Annoying!)
    	var linkPos = responseDetails.responseText.search('Current resource');
    	var link = responseDetails.responseText.substring(linkPos, responseDetails.responseText.length);
    	linkPos = link.search('</iframe>');
    	link = link.substring(0, linkPos);
    	
    	linkPos = link.search('src="') + 5;
    	link = link.substring(linkPos, link.length);
    	
    	linkPos = link.search('"');
    	link = link.substring(0, linkPos);
    	
    	//Now we have the Next Item, lets get the real link!
    	
			GM_xmlhttpRequest({
			method: 'GET',
			url: link,

			onload: function(responseDetails) {
	
				//Need to Find Real Link
				var linkPos = responseDetails.responseText.search('onmouseover');
				var link = responseDetails.responseText.substring(linkPos, responseDetails.responseText.length);
				linkPos = link.search('href="') + 6 ;
				link = link.substring(linkPos, link.length);
		
				linkPos = link.search('">');
				link = link.substring(0, linkPos);
				
				file = link.substring(link.lastIndexOf('/') + 1, link.length);
							
				//And then add it to the page
			   	newlink = document.createElement('a');
				newlink.setAttribute('class', 'Direct');
				newlink.setAttribute('href', link);
				newlink.innerHTML='Direct Link : ' + file;
				where.parentNode.insertBefore(newlink, where);

			}
		});  	
    	
    }
});
};

allLinks = document.evaluate(
    "//li[@class='diritem cmTypeFILE']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    
    // do something with thisLink
    
    //get link's link
    var theLink = thisLink.getElementsByTagName('a')[0];
    
    var theDest = theLink.getAttribute('href');
    
    //do all the magic
    addNewLink(theDest, thisLink);
    
  
}


