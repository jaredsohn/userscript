// ==UserScript==
// @name			MATLAB Web Documentation Improved
// @namespace	                http://www.buffalo.edu/~dpeng2/
// @description	                Improve the MATLAB web documentation by removing the headers, making the table of contents collapsible, and including the Google custom search engine.
// @include			http://www.mathworks.com/help/techdoc/*
// @exclude			http://www.mathworks.com/help/techdoc/infotool/hgprop/*
// @version			0.1b
// ==/UserScript==

//  This script was created out of frustation with the MATLAB web help.
//  I'm a novice in Greasemonkey and Javascript, so please let me know 
//  there are anything that I could do to make it function better, likewise,
//  I also welcome any tips on beautifying the code, thanks!
//                                                                              - Dan

//  Created by Dan Peng
//	Last edited 9/6/2010 with Notepad++
//	References: http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks
//		    http://diveintogreasemonkey.org
//	            http://www.javascriptkit.com/javatutors/re2.shtml 
//	            and the helpful crowd over at http://stackoverflow.com/

// Since this project serves as a learning tool for Javascript as well as Greasemoneky,
//  I will comment as much as possible, even though some may seem trivial.

/* As a convention when it comes to string literals,  I will use single quotation marks
   for Javascript, and HTML will use double quotation marks, even though they 
   can be used interchangably */
   
//  Retrieve the XPCNativeWrapper objects
	var elmBody = document.getElementsByTagName('body')[0];											// <body> tag
	var elmFramelessTop = document.getElementById('frameless_top');									// Mathworks log and header
	var elmFramelessTocHeader = document.getElementById('frameless_toc_header');		// Table of contents header
	var elmFramelessContents = document.getElementById('frameless_contents');		    	// Table of contents
	var elmDocWrapper = document.getElementById('doc_wrapper');										// Help document
	var elmNavItemIndex = document.getElementById('navitemindex');										// <td> tag for 'Index' in TOC header
	var elmNavItemContents = document.getElementById('navitemcontents');							// <td> tag for 'Contents' in TOC header
	var elmNavLinks = document.getElementById('navlinks');										   			// <table> containing 'Index' and 'Contents'
	
/* The resizeHeight(); function found in docscripts_webdoc5b.js  is responsible
    for resizing the frameless layout, to remove the call to resizeHeight() function.
    Notice that we're setting the attribute to a zero length string rather than using
    the removeAttribute method. Since it seems that even if the attribute is removed
    after all DOM objects are loaded(As Greasemonkey does it), the original value
    for that attribute persists(Perhaps due to the nature of XPCNativeWrapper?). */
	elmBody.setAttribute('onResize','');

// Remove the header
	elmFramelessTop.parentNode.removeChild(elmFramelessTop);

// Edit the styles from loaded from /access/helpdesk/help/docset2.css
// Such that the main content and T.O.C. fills the entire screen
	elmFramelessTocHeader.style.top = '0px';
	elmFramelessTocHeader.style.height = '100%';
	elmFramelessTocHeader.style.width ='30%';
	elmFramelessTocHeader.style.left = '0px';

	elmFramelessContents.style.top = '24px';
	elmFramelessContents.style.height = '100%';
	elmFramelessContents.style.border = '1px solid';
	elmFramelessContents.style.borderTop = 'none';

	elmDocWrapper.style.top = '0px';
	elmDocWrapper.style.height = '100%';

	elmNavItemIndex.width = '45%';
	elmNavItemContents.width = '45%';
	elmNavLinks.width = '100%';
	elmNavLinks.style.marginLeft= '0%';
	

// Collapsing table of contents
	var collapseToc = document.createElement('td');
	
	// Setup default styles
		collapseToc.innerHTML = '&#171;';			  // Symbol for left-pointing guillemet
		collapseToc.align = 'center';
		collapseToc.id = 'navmenucollapse';
		collapseToc.width = '10%';
		
	// Insert the close menu button
		elmNavItemIndex.parentNode.insertBefore(collapseToc,elmNavItemIndex.nextSibling);
		
	// Add event handlers for collapsing menu and color changes
	   collapseToc.addEventListener('click', collapseTocHandler, false);
	   collapseToc.addEventListener('mouseover', divColorActive, false);
	   collapseToc.addEventListener('mouseout',divColorInactive,false);
	   
// Opening table of contents
	var openToc = document.createElement('div');
	
	// Setup default styles
		openToc.setAttribute('id','navmenu_open');
		openToc.innerHTML = '&#187;'; 				  // Symbol for right-pointing guillemet
		openToc.style.position = 'fixed';
		openToc.style.width = '2%';
		openToc.style.visibility = 'hidden';
		openToc.style.left = '0px'
		openToc.style.cursor = 'pointer';
		openToc.style.backgroundColor = '#F4F5F9';
		openToc.style.color = '#00246F';
		openToc.style.fontSize = '12px';
		openToc.style.height = '18px';
		openToc.style.verticalAlign = 'middle';
		openToc.align = 'center';
		openToc.style.border = 'solid';
		openToc.style.borderWidth ='1px';
		openToc.style.borderColor = '#00246F';
		openToc.style.borderLeft = 'none';
		
	// Insert the open menu
		elmBody.insertBefore(openToc,elmDocWrapper.nextSibling);
	
	// Add event handler for opening menu
	   openToc.addEventListener('click', openTocHandler, false);
	   openToc.addEventListener('mouseover', divColorActive, false);
	   openToc.addEventListener('mouseout',divColorInactive,false);

//	Search for the "Learn More About MATLAB" span on the top right of help pages
//  and replace with a div element for the google search.
	var gSearch = document.createElement('div')
	var aryClassElements = getElementsByClassName( 'learnmore', elmDocWrapper );
	var elmDocWrapperContent = elmDocWrapper.getElementsByTagName('table');
	if(aryClassElements[0]){
		elmDocWrapper.insertBefore(gSearch,elmDocWrapperContent[0]); 
		elmDocWrapper.removeChild(elmDocWrapperContent[0]);
	}
	// Main Page http://www.mathworks.com/access/helpdesk/help/techdoc/
	// requires special treatment
	else{
		divAltBgClr = document.createElement('div');
		divAltBgClr.style.backgroundColor = 'white';
		elmDocWrapper.insertBefore(divAltBgClr,elmDocWrapperContent[0]); 
		divAltBgClr.appendChild(gSearch); 
		elmDocWrapper.removeChild(elmDocWrapperContent[0]);
		elmDocWrapper.removeChild(elmDocWrapperContent[0]);
	}

	// Assign additional properties to the google search block
	gSearch.innerHTML = 'Loading search component...';
	gSearch.id = 'g_search';
	gSearch.style.position = 'relative'
	gSearch.style.left = '10%';
	gSearch.style.width = '90%'
	gSearch.style.textAlign = 'left';

// Searches for objects within the element 'obj' , and return an
// array of objects whose class attribute matches strClassName.
	function getElementsByClassName( strClassName, obj ) {
		 // If third argument does not exist, create new array
			var ar = arguments[2] || new Array(); 
		// Regular expressions: '\b' matches boundaries(With another \ to exit the string)
		//                                     'g' executes a global search(Return all matches)    
			var re = new RegExp('\\b'+ strClassName + '\\b', 'g');
		// Test if obj.className matches the regular expression
			if ( re.test(obj.className) ) {
				ar.push( obj );	// Add the current object to the array 'ar' 
			}
		// Run through the child nodes of the current object recursively
		// passing the third argument as the array to be apended with matching
		// objects.
			for ( var i = 0; i < obj.childNodes.length; i++ )
				getElementsByClassName( strClassName, obj.childNodes[i], ar );
		// Return array of objects that matches strClassName
		return ar;
	}


/* == Inject the Google API loader script == */
// The injection is done through the innerHTML of a script element rather
// than directly in Greasemonkey since the method CustomSearchControl()
// calls for variables from the window scope.
	var script = document.createElement('script'); 
	script.type = "text/javascript"; 
	script.innerHTML = (<><![CDATA[

		var gscript = document.createElement('script'); 
		gscript.src = 'http://www.google.com/jsapi?callback=gLoaded';  // Call gLoaded() when google api loader is ready.
		gscript.type = "text/javascript"; 
		document.getElementsByTagName('head')[0].appendChild(gscript); 

		// Load the search api using the Google API loader
		gLoaded= function()
			{ google.load('search','1', {"callback" : searchLoaded}); } ; // Run searchLoaded() when search API is ready

		// Setup the custom search API and draw the search box
		searchLoaded = function(){ 
			var mySearch= new google.search.CustomSearchControl('012907575288767046387:tuvzi3yqdkq');
			mySearch.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
			mySearch.draw('g_search');  // Draw the search box to the <div id='g_search'>
		} 
	]]></>).toString();
// Attach the script to DOM
	document.getElementsByTagName('head')[0].appendChild(script); 

	
/*    === Event Handlers ===   */
// Event handler for collapsing menu
	function collapseTocHandler(){
		elmDocWrapper.style.left = '1%';
		elmDocWrapper.style.width = '99%';
		elmFramelessContents.style.visibility = 'hidden';
		elmFramelessTocHeader.style.visibility = 'hidden';
		openToc.style.visibility = 'visible';
	}

// Event handler for opening menu
	function openTocHandler(){
		elmDocWrapper.style.left = '30%';
		elmDocWrapper.style.width = '70%';
		elmFramelessContents.style.visibility = 'visible';
		elmFramelessTocHeader.style.visibility = 'visible';
		openToc.style.visibility = 'hidden';
	}

// Event handlers for color changes
	function divColorActive(e){
		this.style.backgroundColor = '#C3D1EC'; 
	}
	function divColorInactive(e){
		this.style.backgroundColor = '#F4F5F9'; 
	}
