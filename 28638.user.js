// ==UserScript==
// @name           	Newegg Quick Viewer
// @version			1.0
// @description    	Displays the full-size version of product thumbnails when you hover over them on newegg.com
// @include       	http://*.newegg.com/*
// @exclude			http://*.newegg.com/Info/*
// @exclude			http://*.newegg.com/HelpInfo/*
// @exclude			http://*.newegg.com/GiftCertificate/*
// @exclude			http://*.newegg.com/Careers/*
// @exclude			http://*.newegg.com/NewMyAccount/*
// ==/UserScript==

/* 	The idea and implementation of this script is based on the excellent 'inyof4cebook' script by znerp:
 *	http://userscripts.org/scripts/show/8712 
 *	
 *	Please send any feedback, suggestions, or bug reports to 
 *	jbboney                                                                                           *
 *  at gmail dot com 
 *
 * To use: Simply hover over any product thumbnail image with your cursor. A "quick viewer" will appear with the
 * full-size version of the thumbnail. If the quick viewer overlaps with your cursor, click to close it. There
 * is a short delay between hovering over an image and the quick viewer appearing. To adjust this delay, modify
 * HOVER_DELAY in the settings below. */
 
/********************
 *	USER SETTINGS	*
 ********************/

//HOVER_DELAY
//The number of milliseconds from when you hover your cursor over an image to when the preview pops up. 1000 = 1 sec
//Must be an integer greater than or equal to 0 (no decimals or commas)
//Default: 500

const	HOVER_DELAY	= 	/* Edit here: */ 500 /* End edit */;

//BAD_IMG
//The URL to an image to show when the full-sized images are trapped in a flash file
//Default: "http://c1.neweggimages.com/WebResource/Themes/2005/Nest/cancel.gif"
const	BAD_IMG		=	/*Edit here: */ "http://c1.neweggimages.com/WebResource/Themes/2005/Nest/cancel.gif" /* End edit */;

/********************
 *	BEGIN SCRIPT	*
 ********************/

var quickView		=	document.createElement("div");
quickView.setAttribute("id","quick_viewer");
quickView.setAttribute("style", "display: none; background: transparent url(http://c1.neweggimages.com/WebResource/Themes/2005/Nest/warmBG.gif) repeat scroll 0%; min-height:32px; min-width:32px; position:fixed; z-index:1000; top:20px; right:20px; border:3px solid #33425A;");
quickView.addEventListener("click",closeViewer,true);

var	fullImage		=	document.createElement("img");
fullImage.setAttribute("id","fullsize_img");
fullImage.addEventListener("mouseout",closeViewer,true);
quickView.appendChild(fullImage);
document.body.appendChild(quickView);


function	thumbnailMouseover(e,thisImage){
	function	update_()	{
		if(validThumbnail(thisImage)){
			var src			=	thisImage.getAttribute("src");
			var filename	=	src.slice(src.lastIndexOf("/")+1);
			fullImage.setAttribute("src", "http://c1.neweggimages.com/NeweggImage/productimage/" + filename);
		}
		else fullImage.setAttribute("src", BAD_IMG);
		
		quickView.style.display	=	"inline";
	}
	globalTimer		=	window.setTimeout(update_,HOVER_DELAY);	
}

function	thumbnailMouseout(e){
	window.clearTimeout(globalTimer);
	if(!e.relatedTarget || !(e.relatedTarget.hasAttribute("id") && (e.relatedTarget.getAttribute("id")=="quick_viewer" || e.relatedTarget.getAttribute("id")=="fullsize_img")))
		closeViewer();
}

function	closeViewer(){
	quickView.style.display	=	"none";
	fullImage.setAttribute("src","");
}

function	validThumbnail(thisImage){
	return	/ProductImageCompress/.test(thisImage.getAttribute("src"));
}

var	thumbnailImages	=	document.evaluate("//img[contains(@src,'ProductImageCompress')] | //img[contains(@src,'images17.newegg')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for( var i=0;	i<thumbnailImages.snapshotLength; i++){
	var thisImage	=	thumbnailImages.snapshotItem(i);
	thisImage.addEventListener("mouseover",	function(event){thumbnailMouseover(event,this);},true);	
	thisImage.addEventListener("mouseout",	function(event){thumbnailMouseout(event);}, true);
}

// http://c1.neweggimages.com/ProductImageCompressAll**/		small
// http://c1.neweggimages.com/NeweggImage/productimage/		large
// http://c1.neweggimages.com/WebResource/Themes/2005/Nest/warmBG.gif	warm bg
// http://c1.neweggimages.com/WebResource/Themes/2005/Nest/cancel.gif	cancel bg