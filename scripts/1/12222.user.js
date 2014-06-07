// ==UserScript==
// @name Metafilter Annotate Links
// @author Kirk Job Sluder
// @version 20071022
// @description Add short annotations to links on the front page or comments. "Ambiguous link" to youtube becomes "Ambiguous link [yt]".  Tested with both Firefox and Opera
// @include http://*.metafilter.com/*
// @include http://metafilter.com/*
// ==/UserScript==




(function () {
		
		//create a fake associative array to store our links.
		//The key is a text search string that will match the url 
		//of the link.  The value is the annotation that will be appended
		//to the link text.
		var myArray = new Object();
		myArray['youtube.com'] = 'yt';
		myArray['wikipedia'] = 'wp';
		myArray['nytimes.com'] = 'nyt';
		myArray['metafilter.com'] = 'mefi';
		myArray['.pdf'] = '.pdf';
		myArray['bbc.co.uk'] = 'bbc';
		
		//minimize screen redraws by cloning our document body
		var original = document.body;
		//var cloned = original.cloneNode(true);
		var cloned = original;

		//pull all links that are in the context of a "copy" div.
		var myLinks=document.evaluate('.//div[@class="copy"]/a[@href]|.//div[@class="comments"]/a[@href]', cloned,
		    null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		
		//DEBUG 
		//alert(myLinks.snapshotLength);
		for (var i=0,myLink; myLink = myLinks.snapshotItem(i); i++) {
			
			
			
			
			//DEBUG
			//alert(myLink.text);
			//break;
			
			//search for our target string in the href of
			//every link
			for (annotateItem in myArray) {
				if ((myLink.href.indexOf(annotateItem) > -1) &&
					(myLink.childNodes.length > 0)){
					
					//create our annotation
					annotation = document.createElement('span');
					annotext=document.createTextNode(' [' + myArray[annotateItem] + ']');
					annotation.appendChild(annotext);
					annotation.style.fontSize='75%';
					
					//attach our newly minted annotation to 
					//the link.
					myLink.appendChild(annotation);
					
					//bail out of the inner loop
					break;
				}
			}
		}
		
		//swap our cloned copy back onto the page.
		//original.parentNode.replaceChild(cloned,original);
		

	}
)();

