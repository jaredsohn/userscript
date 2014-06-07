// ==UserScript==
// @name           google-enhanced-search
// @namespace      http://ksleher@gmail.com
// @description    Google extented with enhancements
// @include        http://www.google.tld/webhp?*
// @include        http://www.google.tld/search?*
// ==/UserScript==

//Get the search query
var queryElement = document.evaluate('//div[@id="cnt"]/form[@id="tsf"]//td[@id="sff"]//input[@class="lst"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		
var query = queryElement.snapshotItem(0).getAttribute('value');
var bookmarkSearchUrl = "http://www.google.com/bookmarks/find?output=rss&q="+query;

/* preparing */
var sidebar = document.createElement('div');
sidebar.id = 'sidebar';

/* specialItems */
// code snippet
var snippet = document.evaluate('//div[@id="res"]/div/ol/li[@class="g rbt"]',
		document, null, 7, null).snapshotItem(0);
if (snippet) {
	var div = document.createElement('div');
	div.setAttribute('class', 'specialItems');
	var ol = document.createElement('ol');
	ol.appendChild(snippet);
	div.appendChild(ol);
	sidebar.appendChild(div);
}

// check whether "Did you mean" exists or not
var didyoumean = document.evaluate('//div[@id="res"]/div/ol/li', document, null, 7, null).snapshotItem(0);
if (didyoumean.getAttribute('class') != null) {
	var specialItemsLists = document
			.evaluate(
					'//div[@id="res"]/div/ol/li[@class="g"][not(./div[contains(concat(" ",@class," "), " s ")])]',
					document, null, 7, null);
	if (specialItemsLists.snapshotItem(0)) {
		var ol = document.createElement('ol');
		for ( var i = 0, maxi = specialItemsLists.snapshotLength; i < maxi; i++) {
			var li = specialItemsLists.snapshotItem(i);
			ol.appendChild(li);
		}

		var div = document.createElement('div');
		div.setAttribute('class', 'specialItems');
		div.appendChild(ol);
		sidebar.appendChild(div);
	}
}

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {	
	if (xhr.readyState == 4) {
		var div = document.createElement('div');
		div.setAttribute('class','specialItems');
		div.setAttribute('class','box');
		// Add a header to the sidebar
		var headerDiv = document.createElement('div');
		headerDiv.innerHTML = '<a href="https://www.google.com/bookmarks/find?q='+query+'">Bookmark Results for <b><i>'+query+'</b></i></a>';
		div.appendChild(headerDiv);
		
		// convert string to XML object
    	var xmlobject = (new DOMParser()).parseFromString(xhr.responseText, "text/xml");
    	// get a reference to the root-element "rss"
    	var root = xmlobject.getElementsByTagName('rss')[0];    	
    	// get reference to "channel" element
    	var channels = root.getElementsByTagName("channel");
    	var items = channels[0].getElementsByTagName("item");
    	var olElem = document.createElement("ol");
    	olElem.setAttribute("class", "g");
    	for (var i=0;i < items.length; i++) {
    		var title = items[i].getElementsByTagName("title")[0].firstChild.nodeValue;
    		var link = items[i].getElementsByTagName("link")[0].firstChild.nodeValue;
    		var pubDate = items[i].getElementsByTagName("pubDate")[0].firstChild.nodeValue;
    		var desc = items[i].getElementsByTagName("description")[0].firstChild;
    		var labels = items[i].getElementsByTagName("smh:bkmk_label");
    		var annotation = items[i].getElementsByTagName("smh:bkmk_annotation")[0];
    		
    		var linkElem = document.createElement("a");
    		linkElem.setAttribute('href', link);
    		linkElem.appendChild(document.createTextNode(title));
    		
    		var liElem = document.createElement("li");
    		liElem.setAttribute('class', 'g');
    		liElem.appendChild(linkElem);
    		
    		var spanElem = document.createElement("span");
    		spanElem.setAttribute("class", "tags");
    		var spanText = "";
    		for (var l=0;l<labels.length;l++) {
    			if (l > 0) {
    				spanText += ",";
    			}
    			spanText += labels[l].firstChild.nodeValue;
    		}
    		spanElem.innerHTML = " ["+spanText+"] ";    		
    		liElem.appendChild(spanElem);    		
    		liElem.appendChild (document.createTextNode("  : "+pubDate));
    		liElem.appendChild(document.createElement("br"));
    		if (desc != null)
    			liElem.appendChild (document.createTextNode(desc.nodeValue));
    		if (annotation != null)
    			liElem.appendChild(document.createTextNode(annotation.firstChild.nodeValue));
    		
    		olElem.appendChild(liElem);        		
    	}
    	div.appendChild(olElem);
    	sidebar.insertBefore(div, sidebar.firstChild);
	}	
};

xhr.open("GET", bookmarkSearchUrl, true);
xhr.send(null);


/* complete */
// TODO: Show the sidebar only if there are something to show, else just expand the search page
var ol = document.evaluate('//div[@id="res"]', document, null, 7, null)
		.snapshotItem(0);
ol.appendChild(sidebar);


GM_addStyle(<><![CDATA[
	   		/* set width to 100% */
	   #cnt {
	    	max-width:100%!important;
	   }
	   
	   div.s {
		   max-width:98%;
	   }
	   
	   .tags {
		   color:green;
		   font-style: italic;
	   }
	   
	   /* remove ads */
	   table[id="mbEnd"], div[id="tads"], div[id="tadsb"] {
	    display: none !important;
	   }
	   
	   #sidebar {
	     margin-top:-13px!important;	     
	   }
	
	   #res {
	    margin:0 5px;
	    padding:0;
	   }
	   
	   #res>div:not(#sidebar) {
	    float:left;
	    width:60%;	    
	   }
	   
	   #res>div._autopagerize {
	     max-width:98%!important;
	     width:98%!important;
	   } 
	  
	   /* sidebar box */
	   #sidebar .box {
	     border-bottom: 2px solid #eee;
	     padding:10px 0;
	     overflow:hidden; 
	   }
	   
	   /* sidebar */
	   
	   #sidebar #searchesRelated {
	     padding: 5px 0;
	   }
	   #sidebar #searchesRelated a {
	     padding:2px 8px;
	     font-size:12px;
	     float:left;
	     white-space:nowrap;
	   }
	   
	   #sidebar .specialItems{
	     overflow:hidden;
	   }
	    
	   #sidebar .specialItems>ol>li{
	     border-bottom: 2px solid #eee;
	     margin:0!important;
	     padding:5px 0 15px !important;
	   }
	   
	   #sidebar #topItem{
	     padding:0 0 5px;
	     // overflow:hidden;
	     border-bottom: 2px solid #eee;
	   }
	   
	   #sidebar #gbar{
	     height:auto;
	   }
	
	   #sidebar .toggleLink span
	   {
	     padding:0;
	     margin:0;
	     font-size:80%;
	   }
	   	   
	   #res>table.std{
	     margin:20px 0 10px;
	   }
  ]]></>);

