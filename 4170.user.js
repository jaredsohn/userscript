//
// ==UserScript==
// @name			MySpace Hover Enlarge
// @author			MrEricSir
// @description			Enlarges those tiny thumbnails on MySpace when you hover; saves you money on glasses
// @include			http://*.myspace.com/*
// @include			http://myspace.com/*
// ==/UserScript==
//

//
// based on Charlie Cheever's script "FacebookSpyGlass" that can be found here:
// http://www.ccheever.com/userscripts/facebookspyglass.user.js
//

//
// based on Brian Pilnick's script "TheFacebook Image Linker" that can be found here: 
// http://www.andrew.cmu.edu/user/bpilnick/greasemonkey/TheFacebookImageLinker.user.js
//


// declare variables
var smallPhotos, originalImage, newOrigImg, bigImage, linkToImage, newLink, imageName ;


// get list of small photos
smallPhotos = document.evaluate("//img[contains(@src, '_s.' )]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// iterate through list
for (var i = 0; i < smallPhotos .snapshotLength ; ++i ) {

	// get big and small photo
	originalImage = smallPhotos.snapshotItem(i);
	bigImage = originalImage.src; //.replace("_s.jpg", "_m.jpg");
	bigImage = bigImage.replace("_s.jpg", "_m.jpg");
	bigImage = bigImage.replace("_s.gif", "_m.gif");

	// give it a symbolic name
	imageName = "avatarImage" + i;	

	// create new image
	newOrigImg = document.createElement( "img" );	
	newOrigImg.setAttribute( "name", imageName );
	newOrigImg.setAttribute( "src", originalImage.src );
	
        // setup new link w/ hover properties
	newLink = document.createElement( "a" );	
	newLink.setAttribute( "href", originalImage.parentNode.href );
	newLink.setAttribute( "onmouseover", imageName +".src='" + bigImage  + "';" );
	newLink.setAttribute( "onmouseout", imageName +".src='" + originalImage.src  + "';" );

	// add the new link to the page
	originalImage.parentNode.parentNode.replaceChild( newLink, originalImage.parentNode );

	// add the image as a child object
	newLink.appendChild( newOrigImg );

}




//
// Add global CSS styles
//
// from http://diveintogreasemonkey.org/patterns/add-css.html
//
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('#wrap { width: 100% }');



