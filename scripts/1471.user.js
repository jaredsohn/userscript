/*
Reset Flickr Comments:
- Adds a "reset" button for comments when you mouseover the "new" comments notification
- This code also puts another [buggy] reset button directly in the comments page
version: 0.2
Copyright (c) 2005, Mark Husson
*/

// ==UserScript==
// @name      Reset Flickr Comments
// @description   Add a reset button to the Flickr comments page.
// @include     http://www.flickr.com/
// @include     http://flickr.com/
// @include     http://www.flickr.com/recent_activity.gne*
// @include     http://flickr.com/recent_activity.gne*
// ==/UserScript=

(function() {
    // See if we are in the comments page
    if(document.title.indexOf("Flickr: Recent activity on your photos") != -1){
    	// Here is the button to be added
		var clearButton = '<a href="http://flickr.com/?clear=1" class="SmallButt" style="font-size:12px;margin: 2px 2px 2px 2px;color:white;text-decoration:none;">&nbsp;RESET&nbsp;</a>'; 
		var selectElement = document.getElementsByTagName("select"); selectElement[0].parentNode.innerHTML += clearButton;
	}

	// See if we are on the main page
	if(document.title.indexOf("Welcome to Flickr!") != -1){
    	var spanArray = document.getElementsByTagName("span");
    	var resetTitle = "Click to Reset New Group Posts & Comments";
    	var clearValue = "2";
		for(var i=0;i<spanArray.length;i++){
			if(spanArray[i].className == "New" && spanArray[i].innerHTML == "NEW"){
				spanArray[i].className = "Gone";
				spanArray[i].innerHTML = "<span class=\"New\" title=\""+resetTitle+"\" onclick=\"window.location.href='http://flickr.com/?clear="+clearValue+"'\" onMouseOver=\"this.className='SmallButt';this.innerHTML='&nbsp;RESET&nbsp;';this.style.fontSize='8';this.style.cursor='pointer';\" onMouseOut=\"this.className='New';this.innerHTML='&nbsp;&nbsp;NEW&nbsp;&nbsp;</b>';this.style.fontSize='8';this.style.cursor='default'\">&nbsp;&nbsp;NEW&nbsp;&nbsp;</span>";
				resetTitle = "Click to Reset Comments";
				clearValue = "1";
			}
		}
	}

})();
