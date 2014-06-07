// ==UserScript==
// @name           Clean Sidebar for Facebook
// @author         Juan
// @version        1.7
// @description    Removes facebook ads and highlights for a cleaner look.
// @include        http://www.facebook.com*
// ==/UserScript==

//cleans up sidebar on feed page (home page)
function cleanFeedSidebar() {
		// get all divs and store in an array
		var divs = document.getElementsByTagName("div");
		
		// loop through divs
		for (i = 0; i < divs.length; i++) {
		   
		   // Hide feed sidebar ads
		   if (
				// hide ads
			   (divs[i].className  == 'UIHomeBox_Sponsored UIHomeBox UITitledBox')
				//hide highlights
				|| (divs[i].className  == 'UIHotStream UIStream')
				//hide connect box
				|| (divs[i].className  == 'hp_connect_box UIHomeBox UITitledBox')
			) {
				divs[i].style.display = 'none';
		   }		   
		   //remove grey underlines from sidebar titles
		   if (divs[i].className  == 'UITitledBox_Top clearfix') {
				divs[i].style.border = 'none';
		   }		   
		   // styling for sidebar titles
		   if (divs[i].className  == 'UITitle UITitle_h5') {
				// increase font size
				divs[i].style.fontSize = '15px';
				// change colour
				divs[i].style.color = '#CCC'
		   }
		}
	
	// hide suggestions box
	document.getElementById('pymk_hp_box').style.display = 'none';

	divs = null;

}

//no ads for Profile pages and wall-to-walls
function cleanProfileSidebar() {
	// get all divs and store in an array
	var divs = document.getElementsByTagName("div");
	
	// loop through divs
	for (i = 0; i < divs.length; i++) {
		//hide ads on profile or wall-to-walls
		 if (divs[i].className  == 'adcolumn_wrapper') {
				divs[i].style.display = 'none';
		   }		
	}	
}

//checks which page you're on and uses the right function...
function listeners() {
	// if on feed page (home page)...
	if (document.getElementById('home_sidebar')) {
		document.getElementById('home_sidebar').addEventListener("DOMNodeInserted", 
	
	cleanFeedSidebar, true);
	}
	// if on profile page or wall-to-wall...
	if(document.getElementById('sidebar_ads')) {
		document.addEventListener("DOMNodeInserted", cleanProfileSidebar, true);
	}
}

//add function to page !!important!!
document.addEventListener("DOMNodeInserted", listeners, true);