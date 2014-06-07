// ==UserScript==
// @name           glblibForumPages
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// @include			http://goallineblitz.com/game/forum_thread.pl?*

// ==/UserScript==

var forumPages = {
	
	firstPage:1, //duh, but check if getCurrentPage returns anything other than false before bothering with it, even though it'll work setting href&page=this.firstPage. 
	
	//none of these will be persistent, unless someone builds an ajax loader for them
	getCurrentPage:function()
	{
		if (document.getElementsByClassName("page_selector_selected")[0] == undefined)
		{
			//there are no pages to navigate. Could pass a 1, because it still works in the URL, but it's probably better hard-coded.
			return false;
		}
		else
		{
			var currentPage = document.getElementsByClassName("page_selector_selected")[0].firstChild.innerHTML;
			return parseInt(currentPage); 
		}
	},
	
	getNextPage:function()
	{
		var crtPage=this.getCurrentPage();
                var lastPage=this.getLastPage();
		//could also go nextsibling on the currentpage element, if you put it into a variable
		var nextPage = new Number();
		if (!crtPage)
		{
			//there are no pages
			return false;
		}
		else if (crtPage<lastPage)
		{
			nextPage=crtPage+1;
			return nextPage;
		}
		else
		{
			return false; //prevent returning undefined.
		}
	}
	,
	
	getPreviousPage:function()
	{
		var crtPage=this.getCurrentPage();
		var previousPage = new Number();
		//could also go nextsibling on the crtPage element, if you put it into a variable
		if (!crtPage)
		{
			//no pages to navigate
			return false; 
		}
		else if (crtPage==1)
		{
			return false;
		}
		else
		{
			var previousPage=crtPage-1;
			return previousPage;
		}
	},
	
	getLastPage:function()
	{
		var crtPage = this.getCurrentPage();
		var lastPageNumber = new Number(); //return value
		var parentElem = document.getElementsByClassName("page_selectors");
		var d=0; //to build new array
		var childrenCount = new Array();
		
		if (!crtPage)
		{
			//no pages to navigate
			return false;
		}
		else if (parentElem[0].parentNode.nodeName.toLowerCase()=="form")
		{
			//if there are pages set: on forum_thread.pl, the first instance of "page_selectors" is a form to enter desired page. The second one contains the pages. Use 1. 
			parentElem = parentElem[1]; 
		}
		else
		{
			//if there are pages set: on forum_thread_list.pl, the first instance of "page_selectors" contains the pages. Use 0.
			parentElem = parentElem[0]; 
		}
		
		
		//build array to get relevant elements (divs containing links)
		for (c=0; c<parentElem.childNodes.length; c++)
		{
			if (parentElem.childNodes[c].nodeType === 1)
			{
				childrenCount[d] = parentElem.childNodes[c];
				d++;
			}
		}
		var arrayEnd = childrenCount.length-1; //tired of typing. This is the last div element used to navigate page numbers. Could also just decrement d. Should decrement d. 
		if (childrenCount[arrayEnd].className=="page_selector_selected")
		{
			lastPageNumber=crtPage;
		}
		else if (childrenCount[arrayEnd].className=="page_selector")
		{
			//current page is not the last page
			//this is where you check if innerHTML of the firstChild is a number, and if it isn't a number, split firstChild.href to get the number
			
			if (!isNaN(childrenCount[arrayEnd].firstChild.innerHTML))
			{
				//mostly for short threads/forums
				lastPageNumber = childrenCount[arrayEnd].firstChild.innerHTML;
			}
			else
			{
				if (childrenCount[arrayEnd].firstChild.innerHTML.toString()=="&gt;&gt;")
				{
					lastPageNumber = childrenCount[arrayEnd].firstChild.href.toString().split("="); 
					lastPageNumber = lastPageNumber[lastPageNumber.length-1];
				}
				else // I can't remember what made me do this else statement lol. Short forums pages last element won't always be &gt;&gt;, and the last element won't be to go to the end but to increment the page, hence go to -1
				{
					lastPageNumber = childrenCount[arrayEnd-1].firstChild.href.toString().split("=");
					lastPageNumber = lastPageNumber[lastPageNumber.length-1];
				}
				
			}
		}
		return parseInt(lastPageNumber);
	},
}