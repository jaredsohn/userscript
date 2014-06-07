// ==UserScript==
// @name          TNABoard Ads image previewer (v2011.04.09)
// @namespace     http://tnaboard.com/
// @description   Retrieves images from ads/threads on TNAboard.com
// @include       http://*tnaboard.com/viewforum.php?id=3*
// @include       http://*tnaboard.com/viewforum.php?id=6*
// @include       http://*tnaboard.com/viewforum.php?id=37*
// @include       http://*tnaboard.com/viewforum.php?id=14*
// @include       http://*tnaboard.com/viewforum.php?id=31*
// @include       http://*tnaboard.com/viewforum.php?id=28*
// @include       http://*tnaboard.com/viewforum.php?id=33*
// @include       http://*tnaboard.com/viewforum.php?id=17*
// @include       http://*tnaboard.com/viewforum.php?id=12*
// @include       http://*tnaboard.com/viewforum.php?id=25*
// @include       http://*tnaboard.com/viewforum.php?id=9*
// @include       http://*tnaxxhobby.com/viewforum.php?id=9*
// @include       http://*tnaxxhobby.com/viewforum.php?id=14*
// @include       http://*tnaxxhobby.com/viewforum.php?id=19*
// @include       http://*tnaxxhobby.com/viewforum.php?id=22*
// @include       http://*tnaxxhobby.com/viewforum.php?id=27*
// @include       http://*tnaxxhobby.com/viewforum.php?id=32*
// @include       http://*tnaxxhobby.com/viewforum.php?id=45*
// @include       http://*tnaxxhobby.com/viewforum.php?id=46*
// ==/UserScript==


/*
* code is by RicksFan of TNABoard.com
*  Functionality:
*	- Maintains a list of UsersToIgnore and UserToHighlight across sessions, using greasemonkey get/set values
*	- Hardcoded to support the ad forums only; this can be adjusted by editing the script settings in GreaseMonkey to adjust the include list:
*		3: Seattle
*		6: Portland
* 		37: Denver
*		14: Las Vegas
*		31: Inland Empire
*		28: Los Angeles
*		33: Orange County
*		17: Phoenix
*		12: Sacramento
*		25: San Diego
*		9: Vancouver
*
*	- For each thread entry in the forum, the following process is followed:
*		- if the posting user- the "by UserName" is in the UsersToIgnore, the thread is hidden and a small message left noting this
*		   - the thread is now skipped and we move to the next one
*		- the link URL is followed, and the first N images in that thread (as denoted by <span class="posting"> to distinguish it from other images) 
*			are loaded as thumbnails into an imagesDiv below the ad thread
*		- if the posting user is in the UsersToHighlight we highlight the thread in color HILITER (a bright green) to stand out
*
*	- We also support the following actions
*
*		- if a thread is double-clicked in the empty space, the thread is hidden immediately, and that user marked as someone to ignore
*		- if the username in the "by UserName" is single clicked, the thread is highlighted, and the user is added to the favorite users list
*		- if we hover over the thumbnail images, the full size version is shown on the right-hand size of the page
*   
*/





// --------------------------------------------------------------------------------
// MISC GLOBAL VARIABLES

  // var myIgnore;
  // var myFaves;

  var PREFIX = "*tnaImg*.";	// PREFIX lets us store key values under a quasi-unique name
  var IGNORELIST	= 'UsersToIgnore';
  var FAVELIST		= 'UsersToHighlight';
  var HILITER		= '#33FF00';	// Color of highlighted ads

  var CLASS = "showFullSize";
  var size = 150;
  var mouseMoves = 0;
  var maxImages = 3;
  var fullSizeDiv;
  var fullSizeWidth = 500;
// --------------------------------------------------------------------------------





  //main();
  try {main();} catch (e) {}





// --------------------------------------------------------------------------------
// ADDUSERTOLIST
// Adds the user to the specified list
  
  function addUserToList(listName, userName) {
	var curList	= getValue(listName,'');

	// We add a leading;, so that when searching for ;username; we will find even the ones at the beginning or end of the string
	curList		= ';' + curList;

	// escape the userName and then search for it; the string we store/search on is an escaped version of the userName string
	userName	= urlencode( userName );

	// See if user is already in this list; if not, add them
	var iUser	= curList.search( ';' + userName );
	if ( iUser == -1 ) {
		curList		= getValue(listName,'');
		setValue(listName, curList + ';' + userName );
	}

  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// REMOVEUSERFROMLIST
// Removes the user from the specified list
  
  function removeUserFromList(listName, userName) {
	var curList	= getValue(listName,'');

	// We add a leading and trailing ;, so that when searching for ;username; to replace will find even the ones at the beginning or end of the string
	curList		= ';' + curList

	// escape the userName and then search for it; the string we have is an escaped version of the string
	userName	= ';' + urlencode( userName );

	// Remove the user from the list
	var iUser	= curList.search( userName );
	if ( iUser > -1 ) {
		curList		= getValue( listName, '');
		curList		= curList.replace( userName, "");
		setValue( listName, curList );
	   } else {
	}

  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// URLENCODE

  function urlencode (clearString) {
	var output = '';
	var x = 0;
	clearString = clearString.toString();
	var regex = /(^[a-zA-Z0-9_.]*)/;
	while (x < clearString.length) {
		var match = regex.exec(clearString.substr(x));

		if (match != null && match.length > 1 && match[1] != '') {
			output += match[1];
			x += match[1].length;
	  	   } else {

			if (clearString[x] == ' ') {
				output += '+';
		   	   } else {
				var charCode = clearString.charCodeAt(x);
				var hexVal = charCode.toString(16);
				output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
			}

			x++;
		}
	} //end while

	// Remove space character
	output	= output.replace(/\+/g, "%20");
	return output;
  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// URLDECODE

  function urldecode (encodedString) {
	var output = encodedString;
	var binVal, thisString;
	var myregexp = /(%[^%]{2})/;


	while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {

		binVal = parseInt(match[1].substr(1),16);
		thisString = String.fromCharCode(binVal);
		output = output.replace(match[1], thisString);
	}

	return output;
}
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// GET AND SET VALUES
// These functions abstract the values to be stored/retrieved, to seamlessly append a prefix 
//  to key names, and to allow getValue to return a specified value as a default.  

  function setValue(key,val) {
	GM_setValue(PREFIX + key,val);
	return val;
  }

  function getValue(key,defaultValue) {
	var res = GM_getValue(PREFIX + key);
	if (!res) res = defaultValue;
	return res;
  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// UPDATEFULLSIZEIMAGE
// This will update the full size image div to be of the image we're hovering over,
// and will otherwise hide the div if we aren't hovering

  function updateFullSizeImage(url) {
	var image = document.getElementById("FullSizeImage");
 	var toggleDiv = document.getElementById("FullSizeimageDiv");

	image.src=url;
	
	if (url == '')
	{
		toggleDiv.style.visibility="hidden";
 	}
 	else
 	{
		toggleDiv.style.visibility="visible";
 	}
 	
  }
// --------------------------------------------------------------------------------




// --------------------------------------------------------------------------------
// TOGGLEHIGHLIGHT
// As the name implies, will turn the highlight for an ad on or off
// We presume the object to be the item-subject div, as it's invoked either at start or when clicking on the cite part of that dive
// We then use this node to find the item-subject node (ourselves) and the item-images node of the parent node of ourselves


  function toggleHighLight (obj ) {

	var parentDiv;
	var mainNode, imageNode, curColor;

	// Get the three divs we deal with for this particular ad row
	mainNode	= document.evaluate( ".//div[@class='item-subject']", obj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	imageNode	= document.evaluate( ".//div[@class='item-images']", obj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	if (mainNode.singleNodeValue != null ) {

		// See if the main ad row is highlighted; if so, unhighlight it
		curColor	= rgb2hex( document.defaultView.getComputedStyle(mainNode.singleNodeValue, null).backgroundColor );

		if ( curColor == HILITER ) {
			// main node is highlighted; unhighlight and the imageNode
			mainNode.singleNodeValue.style.background = 'inherit';
			//if (imageNode.singleNodeValue != null ) { imageNode.singleNodeValue.style.background = 'inherit'; }
			
		   } else {
			// highlight the main and images nodes
			mainNode.singleNodeValue.style.background = HILITER;
			//if (imageNode.singleNodeValue != null ) { imageNode.singleNodeValue.style.background = HILITER; }
		}	

	   } else {
		GM_log('ERROR: toggleHighLight could not find main node');
	}

  }

// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// RGB2HEX
// Takes an rgb value and turns it to hex; this is necessary because getComputeStyle returns an RGB

  function rgb2hex(color) {
	
	if (color != null ) {
	   if (color.substr(0,3) == 'rgb') {
		if (color.substr(0, 1) === '#') {
        		return color;
    		}

		var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
		var red = parseInt(digits[2]);
		var green = parseInt(digits[3]);
		var blue = parseInt(digits[4]);
    
		var rgb = blue | (green << 8) | (red << 16);

		return digits[1] + '#' + rgb.toString(16).toUpperCase();
	   }
	}

	return;
  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// TOGGLEAD
// As the name implies, we hide the ad and display the hideBanner, or vice versa, on double click events
// The starting obj is expected to be one of the item-subject or item-hider divs

  function toggleAd (obj) {

	var userNode, userName;
	var hiderNode, imageNode, mainNode;

	// Get userName
	userNode	= document.evaluate( ".//p//span[@class='item-starter']//cite", 
		obj.parentNode, 
		null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, 
		null);

	if (userNode.singleNodeValue != null ) {
		userName	= userNode.singleNodeValue.textContent;
	  } else {
		// This exits this code, as no username was found
		GM_log('ERROR: Could not find userName on current object');
		return;}

	// Get the three divs we deal with for this particular ad row
	mainNode	= document.evaluate( ".//div[@class='item-subject']", obj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	hiderNode	= document.evaluate( ".//div[@class='item-hider']", obj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	imageNode	= document.evaluate( ".//div[@class='item-images']", obj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	if (mainNode.singleNodeValue != null ) {

			// See if the main ad row is hidden; if so, unhide it
		if ( mainNode.singleNodeValue.style.display == 'none' ) {

			// main node is hidden; show it and hide the hider div
			mainNode.singleNodeValue.style.display = 'inline';
			if (hiderNode.singleNodeValue != null ) { hiderNode.singleNodeValue.style.display = 'none'; } 
			if (imageNode.singleNodeValue != null ) { imageNode.singleNodeValue.style.display = 'inline'; }

			// Remove user from the IGNORELIST, as we're unhiding their ad
			removeUserFromList( IGNORELIST, userName );
			
		   } else {

			// hide the main and images node, show the hider node
			mainNode.singleNodeValue.style.display = 'none';
			if (hiderNode.singleNodeValue != null ) { hiderNode.singleNodeValue.style.display = 'inline'; } 
			if (imageNode.singleNodeValue != null ) { imageNode.singleNodeValue.style.display = 'none'; }

			// Add user to the IGNORELIST, since we've double-clicked their ad
			addUserToList( IGNORELIST, userName );
		}	

	}

  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// TOGGLEFAVORITE
// As the name implies, this will add/remove the user from the favorites list

  function toggleFavorite (obj) {

	// obj is assumed (unsafely, perhaps) to be the span upon which we did the click of the username
	var curList, userName;
	var parentDiv;

	// Get userName; we're already on the cite object
	if ( obj.textContent != null ) {
		userName	= obj.textContent;
	   } else {
		GM_log('ERROR: toggleFavorite could not find any userName in context');
		return;
	}


	// First, add/remove this user to/from the favorites list
	var curList	= getValue(FAVELIST, '');
	curList	= ';' + curList;

	userName	= urlencode( userName );
	var iUser	= curList.search( ';' + urlencode( userName ) );
	if ( iUser == -1 ) {
		// User not in favorites list; let's add them, then set boolHighlight = true
		addUserToList(FAVELIST, userName );
	  } else {
		removeUserFromList(FAVELIST, userName );
	}

	// Find the parent div, which should be item-subject above this cite
	parentDiv	= obj.parentNode.parentNode.parentNode;

	// Toggle the highlight for main and image nodes
	toggleHighLight( parentDiv )


  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// FETCHIMAGES
// Grabs the responseText of the ad URl, and passes it- along with the imagesDiv- to the showImages function
// imagesDiv is the imageBanner created specifically to host the picture/thumbnails

  function fetchImages (linkUrl, imagesDiv) {
	// arrIndex and arrImages ensures we don't exceed the number of maxImages
	var arrImages = [];
	var arrIndex	= 0;

	GM_xmlhttpRequest({
		method: "GET",
		url: linkUrl,
		onload: function(details) {

			// ------------------------------------------------
			var myHTML		= details.responseText;
			var tempDiv		= document.createElement('div');
			tempDiv.innerHTML	= myHTML.replace(/<script(.|\s)*?\/script>/g, '');
			var myList 		= tempDiv.getElementsByClassName("postimg");
				
			var myInnerHTML;

			// Create placeholder div for images
			var newDiv	= document.createElement('div');

			// For each item that is of classname postimg, add the image to the newDiv up to maxImages
			for (var i=0; i<myList.length;i++) {
				// For each img underneath this class, if any
				var c	= myList[i].getElementsByTagName("img");
				for (var l=0;l<c.length;l++) {

					// We add this image to the array so long as we don't have more than maxImages
					if ( arrIndex < maxImages ) {
						arrImages[arrIndex] = c[l].src
						arrIndex++;	// Increment the array by one

						var newImg	= document.createElement('img');
						newImg.src	= c[l].src;

						// Change the size of the image for the thumbnails
						// Don't change the height if we're keeping the aspect ratio
						//if (!keepAspectRatio) { img.style.maxWidth = size + "px"; }
						newImg.style.maxHeight = size + 'px';
						newImg.style.zIndex	= '1000';

						// Set the large image to the one being moused over
						newImg.addEventListener("mouseover", function() { 
							updateFullSizeImage(this.wrappedJSObject.src) },true);
						// When mouse out of an image set it back to original size
						newImg.addEventListener("mouseout", function() { 
							updateFullSizeImage('') },true);
						
						imagesDiv.appendChild(newImg);
					

					}
				}
               		}
		

			// ------------------------------------------------
	
		}
	});


  }
// --------------------------------------------------------------------------------





// --------------------------------------------------------------------------------
// MAIN
// Loops through the list of topics on the page and for each one will hide or highlight
// those belonging to either our ignore or favorited posters.
// For those not hidden, it will then fetch the 

  function main () {

	GM_log('INFO: Starting TNA Ads image previewer script...');

	// Create image placeholder for large size images
	var largeImage = document.createElement("div");
	largeImage.innerHTML = '<div id="FullSizeimageDiv"  style="position: fixed; top: 0em; right: 0em; visibility: hidden; z-index: 1000">' +
		'<img id="FullSizeImage" style="border-style: solid; border-color: black; border-width: 2 " name="FullSizeImage" src="" width="' +
		fullSizeWidth + '"></div>'
	document.body.insertBefore(largeImage,document.body.firstChild);


	// Div variables for looping page entries and either ignoring or highlighting
	var div, allDivs;
        var myIgnore, myFaves
	var strSplitIgnore, strSplitFaves;	

	// Retrieve the values for ignore list and favorite list
	myIgnore	= getValue(IGNORELIST,'');
	myFaves		= getValue(FAVELIST, '');

	// Split the ignore list and favorites list into arrays
	strSplitIgnore = myIgnore.split(";");
	strSplitFaves = myFaves.split(";");


	GM_log('INFO: Current favorites list: ' + myFaves );
	GM_log('INFO: Current ignore list: ' + myIgnore );

	// Get the list of all divs that are of type 'item-subject'
	allDivs	= document.evaluate("//div[@class='item-subject']", 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);


	// For each thread Div, process for hiding or highlighting, as well as inserting images
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		div	= allDivs.snapshotItem( i );
		
		var userNode;
		var userName;
		var linkNode;
		var linkURL;
		var imageBanner;
		var hideBanner;
		var boolFetchImages = true;


		// -----------------------------------------------------------------
		// FIND USERNAME AND LINK URL

		// Look for the userNode and find the userName, else skip this div if we can't find it
		userNode	= document.evaluate( ".//p//span[@class='item-starter']//cite", 
			div, 
			null, 
			XPathResult.FIRST_ORDERED_NODE_TYPE, 
			null);

		if (userNode.singleNodeValue != null ) {
			userName	= userNode.singleNodeValue.textContent;
		  } else {
			continue;	// This exits this iteration of the loop because we're not dealing with a user-posted thread
		}

		// Add the onClick event notification for toggling favorites
		userNode.singleNodeValue.addEventListener("click", function(){toggleFavorite(this)},false);


		// Look for the linkURL
		linkURL	= 'NO_LINK'
		linkNode		= document.evaluate( ".//h3//a/@href", div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (linkURL != null ) {	
			linkURL	= linkNode.singleNodeValue.textContent;
		}
		// -----------------------------------------------------------------




		// -----------------------------------------------------------------
		// ADD DIVS FOR HIDE MESSAGE AND FOR IMAGES
		// We create these divs after the previous div of
		var parent	= div.parentNode;

		// Adding eventlistener to displayed add to allow it to be hidden
		div.addEventListener("dblclick", function(){toggleAd(this,userName)}, false);

		// Create hideBanner, default it to hidden
		hideBanner	= document.createElement("div");
		hideBanner.className		= 'item-hider'
		hideBanner.innerHTML	 = '<span style="float: right"><i>You are hiding ads from <b>' + userName + 
			'</b>; double-click <b>HERE</b> to unhide this user.</i></span>'
		hideBanner.style.display	= 'none';
		hideBanner.addEventListener("dblclick", function(){toggleAd(this,userName)},false);
		parent.appendChild(hideBanner);


		// Create imageBanner, default it to visible
		imageBanner	= document.createElement("div");
		imageBanner.className		= 'item-images';
		imageBanner.style.display	= 'inline';
		imageBanner.textAlign		= 'center';
		imageBanner.style.position	= 'relative';
		imageBanner.style.top		= '0px';
		imageBanner.style.left		= '0px';
		imageBanner.style.zIndex	= '1000';
		parent.appendChild(imageBanner);
		// -----------------------------------------------------------------
				



		// -----------------------------------------------------------------
		// HIDE IGNORED AD POSTERS

		var j = 0;
		for (j = 0; j < strSplitIgnore.length; j++) {
			// We store these as urlencoded forms; 
			var userToIgnore	= urldecode( strSplitIgnore[j] );

			if (userName == userToIgnore ) {
				// hideShowAd will see that the main and image nodes are visible and hide them, while showing the message node
				toggleAd(div);  //, userName);

				boolFetchImages = false
				continue;

			}
		}
		// -----------------------------------------------------------------



		// We exit this loop if boolFetchImages is false- i.e., if we're skipping this ad poster
		if ( boolFetchImages != true ) { continue;};

		

		// -----------------------------------------------------------------
		// FETCH IMAGES FOR NON-IGNORED ADS
		// Since we exited above we won't fetch images for ignored users

		//GM_log('DEBUG: Fetching content for ad of user ' + userName + ' at link ' + linkURL );
		fetchImages( linkURL, imageBanner);
		// -----------------------------------------------------------------




		// -----------------------------------------------------------------
		// HIGHLIGHT FAVORITED AD POSTERS
		// Make a poster this user has in their favorites be highlighted

		var j = 0;
		for (j = 0; j < strSplitFaves.length; j++) {
			var userToHiLite	= urldecode( strSplitFaves[j] );
		
			if ( userName == userToHiLite ) {
				// Set the div background to the highlighter color
				toggleHighLight(div);
			}
		}
		// -----------------------------------------------------------------



	}

  }
// --------------------------------------------------------------------------------

