// ==UserScript==
// @name           Second Life Forums: No User-Loaded Images
// @namespace      https://blogs.secondlife.com/
// @description    Prevents user-loaded images from being displayed
// @include        https://blogs.secondlife.com/*
// ==/UserScript==

function btjNoImages() {

   var allElements, thisElement, tempStr;

    allElements = document.evaluate(
	"//div[@class='jive-thread-reply-body-container']/descendant::img",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

    for (var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);
	  if (thisElement.src.search('secondlife.com') == -1) {
	      if (!thisElement.alt || thisElement.alt == '') {
                  tempStr = thisElement.src;
	      } else {
		  tempStr = thisElement.alt;
	      }

	      if (thisElement.parentNode.id == 'a') {
		 thisElement.parentNode.innerHTML = tempStr;	          
		 thisElement.removeNode();
	      } else {
		 var newPara = document.createElement('p');
		 var newLink = document.createElement('a');
		 newLink.href = thisElement.src;
		 newLink.innerHTML = tempStr;
		 newPara.appendChild(newLink);
		 thisElement.parentNode.replaceChild(newPara,thisElement);
	      }

	  }
    }
}

btjNoImages();