// ==UserScript==
// @name           imgsrcAllLinks
// @namespace      #avg
// @description    My first attempt at gm scripts
// @include        http://*imgsrc.ru*html*
// ==/UserScript==

GM_addStyle("body > a {clear:both;float:left;}");  // css hack to display links on new lines

var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLinkItems = thisLink.getElementsByTagName("img");
		// if link is thumbnail image
	if(thisLinkItems.length > 0) {
			//if image type is JPG

		if(thisLinkItems[0].src.indexOf('jpg') > 0 ) {
			GM_log(thisLink + " " + thisLinkItems[0].src);
		
			GM_xmlhttpRequest({
				method: 'GET',
				url: thisLink,
			    	headers: {
        				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        				'Accept': 'application/atom+xml,application/xml,text/xml',
			    	},
		    		onload: function(responseDetails) {						
		        			addImageLink(responseDetails.responseText,"PAGE 0");		
			    }
			});
		} 

	} 
}
var galleryCount=0;
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLinkItems = thisLink.getElementsByTagName("img");
		// if link is thumbnail image
	if(thisLinkItems.length > 0) {
	} else {
			
			
			if(thisLink.href.indexOf('html') > 0 && thisLink.href.indexOf('imgsrc.ru') > 0 && thisLink.href.indexOf('#') < 0 && thisLink.href.indexOf('php') < 0) {
				GM_log("NOT: "+thisLink);
			galleryCount++;
			GM_xmlhttpRequest({
				method: 'GET',
				url: thisLink.href,
			    	headers: {
        				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        				'Accept': 'application/atom+xml,application/xml,text/xml',
			    	},
		    		onload: function(responseDetails) {	
					var preText = "PAGE "+galleryCount;
					addImageLink(responseDetails.responseText,preText);		
		        		var imageLinks = responseDetails.responseText.match(/href[:=?/._#<>|a-z|0-9]+\sclass=prv/gi);
					GM_log("NOT imageLinks: "+imageLinks.length);
					for(var j = 0;j < imageLinks.length; j++) {
						imgurl=location.protocol+"//"+location.host+imageLinks[j].substring(imageLinks[j].indexOf('/'),imageLinks[j].indexOf('>'));
						GM_log("NOT: " +j+ imgurl);
						GM_xmlhttpRequest({
							method: 'GET',
							url: imgurl,
			    				headers: {
        							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        							'Accept': 'application/atom+xml,application/xml,text/xml',
			    				},
		    					onload: function(a) {
								addImageLink(a.responseText,preText);
							}
						});
					}
			       }
			});
			}
	}
}
var addImageLink=function(text,prefix) {
var imagexArr,imagex;


					imagexArr=text.match(/http[:/]+o[0-9].imgsrc[a-z|:/_.|0-9]+/gi);
					
					if(imagexArr==null) {
						imagexArr = text.match(/class=big\ssrc=http[a-z|:/._|0-9]+/gi);
					}			

					imagex=imagexArr[0];
					GM_log("ImageURL: " + imagex.substring(imagex.indexOf('http')));
					link=document.createElement("a");
					link.href=imagex.substring(imagex.indexOf('http'));
					link.innerHTML=" Image "+link.href.substring(link.href.lastIndexOf('/')+1);
		
					document.body.appendChild(link);

}
/*
allElements=document.getElementsByTagName("img");
for(var i=0;i<allElements.length;i++) {
	thisElement=allElements[i];
	if(thisElement.parentNode.href) {
		GM_log(thisElement.parentNode.href);
	}

}
*/