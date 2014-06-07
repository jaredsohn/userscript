// ==UserScript==
// @name        Google Reader Scroll Control
// @namespace   http://basyura.org
// @include     http://www.google.*/reader/*
// @include     https://www.google.*/reader/*
// @version     0.8
// ==/UserScript==

(function () {
 var SCROLL_HEIGHT = 150;
 window.addEventListener('keypress',
   function(e) {
     if (e.charCode == 32) {
	   // folder control
	   var subtree = document.getElementById("sub-tree");
	   var result  = document.evaluate(
                        ".//a[contains(@class, 'tree-link-selected')]",
		                subtree ,
					    null ,
						XPathResult.FIRST_ORDERED_NODE_TYPE ,
						null);
	   var href = result.singleNodeValue;
	   if(href.firstChild.getAttribute("class").indexOf("folder-icon") > 0) {
			e.preventDefault();
			e.stopPropagation();
			setTimeout(function(){
				var feed  = document.evaluate(
                              ".//li[@class='sub unselectable expanded unread']/a",
						      href.parentNode ,
						      null ,
							  XPathResult.FIRST_ORDERED_NODE_TYPE ,
							  null);
				var event = document.createEvent('MouseEvents');
				event.initMouseEvent ('click', true, true, window,
					 1, 0, 0, 0, 0, false, false, false, false, 0, null); 
				feed.singleNodeValue.dispatchEvent(event);
			} , 30);
		   return;
	   }
	   // scroll control
	   var h = SCROLL_HEIGHT;
	   if(e.shiftKey) {
	     h = h * -1;
	   }
       var div       = document.getElementById("entries");
	   var current   = document.getElementById("current-entry");
	   if(current == null) {
		   return;
	   }
	   var scrollTop = div.scrollTop;
	  
	   if(current.offsetTop + current.clientHeight > div.scrollTop + SCROLL_HEIGHT) {
           div.scrollTop += h;
	   }

	   if(div.scrollTop != scrollTop) {
           e.preventDefault();
           e.stopPropagation();
	   }
     }
   }, true);
})();
