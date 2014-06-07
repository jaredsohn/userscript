// ==UserScript==
// @name          Flickr Embiggenr
// @description	  For when your screen is big and your Flickr isn't
// @author		  Michael Hewett
// @namespace     http://bludger.org/
// @include       http://flickr.com/*
// @include       http://*.flickr.com/*
// @version       0.1 20-Jun-2009
// ==/UserScript==

// If the flickrEmbiggenr flag is true, don't run
// otherwise we'll resize twice!
if (!flickrEmbiggenr) {
	
	var flickrEmbiggenr = true;
	
	// Set resize parameters
	var resizeWidth = 2.048048048048048048048048048048;
	var resizeHeight = 2.048;
	
	// Change title depending on which view is being used
	document.title = document.title.replace('Your ', 'Your Embiggened ');
	document.title = document.title.replace('\'s Photostream', '\'s Embiggened Photostream');
	document.title = document.title.replace('From your ', 'From your Embiggened ');
	
	// Change header width
	theHeader = getElementsByClassName('Header');
	if (theHeader[0]) {
		theHeader[0].style.minWidth = '1600px';
		theHeader[0].style.width = '1600px';
	} // if (theHeader[0])
	
	//Change Top Bar width
	navBar = getElementsByClassName('NavBar');
	if (navBar[0]) {
		navBar[0].style.minWidth = '1600px';
		navBar[0].style.width = '1600px';
	} // if (navBar[0])
	
	// Change main column width
	if (document.getElementById('Main')) {
		document.getElementById('Main').style.minWidth = '1540px';
		document.getElementById('Main').style.width = '1540px';
	} // if (document.getElementById('Main'))
	
	if (document.getElementById('SubNav')) {
		document.getElementById('SubNav').style.minWidth = '1540px';
		document.getElementById('SubNav').style.width = '1540px';
	} // if (document.getElementById('SubNav'))
	
	// Change feeds width
	if (document.getElementById('Feeds'))
		document.getElementById('Feeds').style.width = '1600px';
	
	if (document.getElementById('AtomRSS'))
		document.getElementById('AtomRSS').style.width = '1490px';
	
	// Change "Reload" on Interestingness random page
	if (document.getElementById('int-rand-txt'))
		document.getElementById('int-rand-txt').style.width = '1540px';
	
	// Change footer width
	theFooter = getElementsByClassName('Footer');
	if (theFooter[0]) {
		theFooter[0].style.minWidth = '1600px';
		theFooter[0].style.width = '1600px';
	} // if (theFooter[0])
	
	// Change "Recent Activity" left column width
	theLeftColumn = getElementsByClassName('tt-col1');
	if (theLeftColumn[0]) {
		theLeftColumn[0].style.minWidth = '1170px';
		theLeftColumn[0].style.width = '1170px';
	} // if (theLeftColumn[0])
	
	// Change "Recent Activity" right column width
	theRightColumn = getElementsByClassName('tt-col2');
	if (theRightColumn[0]) {
		theRightColumn[0].style.minWidth = '350px';
		theRightColumn[0].style.width = '350px';
	} // if (theRightColumn[0])
	
	var imageResult_L = false;
	var imageResult_O = false;
	var theImageSource = '';
	
	// Resize a single photo in the "Medium" layout
	theImages = getElementsByClassName('reflect');
	
	if (theImages[0]) {
	
		imageSource = theImages[0].src;
		theImages[0].src = imageSource.replace('.jpg', '_b.jpg');
		theImages[0].width = theImages[0].width * resizeWidth;
		theImages[0].height = theImages[0].height * resizeHeight;
	
		if (!theImages[0].id) {
			theImages[0].id = 'flickr_photo';
		} // if (!theImages[0].id)
	
		// Show the failsafe button if the image loads the wrong one
		document.getElementById('button_bar').innerHTML += ' <span onclick="javascript:void(document.getElementById(\'' + theImages[0].id + '\').src = \'' + imageSource + '\'); this.style.display = \'none\';" class="Plain" style="cursor: pointer; position: relative; top: 7px; left: 35px;">Can\'t see the image?</span>';
	
		if (document.getElementById('photoswftd')) {
			document.getElementById('photoswftd').style.width = '1240px';
		} // if (document.getElementById('photoswftd'))
		
		// Resize container where photo is located
		theContainer = getElementsByClassName('photoImgDiv');
		theContainer[0].style.width = '1240px';
		
		// Move and resize notes
		theNotes = getElementsByClassName('photo_note');
		for (j = 0; j < theNotes.length; j++) {
	
			// Note position
			theNotes[j].style.left = theNotes[j].style.left.replace('px', '') * resizeWidth + 'px';
			theNotes[j].style.top = theNotes[j].style.top.replace('px', '') * resizeHeight + 'px';
			
			// Note size
			theNoteBox = theNotes[j].getElementsByClassName('photo_note_box_inner_inner_div');
			if (theNoteBox[0]) {
				
				theNoteBoxInner = theNoteBox[0].getElementsByTagName('div');
				theNoteBoxInner[0].style.width = theNoteBoxInner[0].style.width.replace('px', '') * resizeWidth + 'px';
				theNoteBoxInner[0].style.height = theNoteBoxInner[0].style.height.replace('px', '') * resizeHeight + 'px';
				
			} // if (theNoteBox[0])
			
		} // for (j = 0; j < theNotes.length; j++)
	
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize photos in the "Medium" layout
	theImages = getElementsByClassName('pc_l');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImage[0].src = theImage[0].src.replace('.jpg', '_b.jpg');
		theImage[0].width = theImage[0].width * resizeWidth;
		theImage[0].height = theImage[0].height * resizeHeight;
		
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize photos in the "Small" layout
	theImages = getElementsByClassName('pc_m');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImage[0].src = theImage[0].src.replace('_m.jpg', '.jpg');
		theImage[0].width = theImage[0].width * resizeWidth;
		theImage[0].height = theImage[0].height * resizeHeight;
		
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize photos in the "Thumbnail" layout
	theImages = getElementsByClassName('pc_t');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImage[0].src = theImage[0].src.replace('_t.jpg', '_m.jpg');
		theImage[0].width = theImage[0].width * resizeWidth;
		theImage[0].height = theImage[0].height * resizeHeight;
		
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize square photos in the "Recent Acvitity" layout only
	if (document.getElementById('recent-activity')) {
		theImages = document.getElementById('recent-activity').getElementsByClassName('pc_s');
		
		for (i = 0; i < theImages.length; i++) {
		
			theImage = theImages[i].getElementsByTagName('img');
			theImage[0].src = theImage[0].src.replace('_s.jpg', '_m.jpg');
			theImage[0].width = theImage[0].naturalWidth;
			theImage[0].height = theImage[0].naturalHeight;
			
		} // for (i = 0; i < theImages.length; i++)
	} // if (document.getElementById('recent-activity'))
	
	// Resize photo containers in the "Recent Photos" layout
	theImages = getElementsByClassName('RecentPhotos');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImages[i].style.width = '220px';
		theImages[i].style.height = '270px';
		
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize photo containers in the "Group Pool Home" layout
	theImages = getElementsByClassName('PoolList_no_height');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImages[i].style.width = '220px';
		theImages[i].style.height = '270px';
		
	} // for (i = 0; i < theImages.length; i++)
	
	// Resize photo containers in the "Group Pool List" layout
	theImages = getElementsByClassName('PoolList');
	
	for (i = 0; i < theImages.length; i++) {
		
		theImage = theImages[i].getElementsByTagName('img');
		theImages[i].style.width = '220px';
		theImages[i].style.height = '270px';
		
	} // for (i = 0; i < theImages.length; i++)
	
} // if (!flickrEmbiggenr)
	
// Function to select all DOM elements by class name
// http://snipplr.com/view.php?codeview&id=1696
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
} // function getElementsByClassName(classname, node)

// Check if an images exists. Used when loading a single
// image as sometimes the "l" version is not there
function checkImageExists(theImage) {
	xmlHttp=new XMLHttpRequest();
	xmlHttp.open("HEAD", theImage, true);
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.status != 404) {
			return true;
		} else {
			return false;
		} // if (xmlHttp.status != 404)
	} // xmlHttp.onreadystatechange = function()
	xmlHttp.send(null);
} // function checkImageExists(theImage)