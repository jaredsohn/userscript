// ==UserScript==
// @name           Flickr Keyboard Navigation
// @author         Mark Husson
// @namespace      http://michaelhusson.com/mark/greasemonkey/
// @description    Adds keyboard shortcuts for paging through Flickr (see notes for shortcut keys)
// @include        http://flickr.com*
// @include        http://www.flickr.com*

// How to Use:
// If you are on any page in flickr that has paging at the bottom, 
// use these keyboard shortcuts to navigate: (mac users: use cmd instead of alt)
//
// alt+shift+n - Next Page
// alt+shift+p - Previous Page
// alt+shift+< - First Page
// alt+shift+> - Last Page

// Notes:
// v0.1: Adds accesskeys to the built in paging links on any flickr page.
//       Any ideas for other keyboard shortcuts welcome

// ==/UserScript==

var divArray = document.getElementsByTagName('div');
for(var i=0;i<divArray.length;i++){
	if(divArray[i].className == 'Paginator'){
		var thePaginator = divArray[i];
		var PaginatorInnerElements = thePaginator.getElementsByTagName('*');
		
		if(PaginatorInnerElements[0].tagName != "SPAN"){
			PaginatorInnerElements[0].setAttribute("accesskey",",");
		}
		if(PaginatorInnerElements[PaginatorInnerElements.length-2].tagName != "SPAN"){
			PaginatorInnerElements[PaginatorInnerElements.length-2].setAttribute("accesskey",".");
		}
		
		for(var j=0;j<PaginatorInnerElements.length;j++){
			if(PaginatorInnerElements[j].className == 'this-page'){
				if(j != 0){
					PaginatorInnerElements[j-1].setAttribute("accesskey","p");
				}
				if(j != PaginatorInnerElements.length-1){
					PaginatorInnerElements[j+1].setAttribute("accesskey","n");
				}
			}
		}
	}
}
