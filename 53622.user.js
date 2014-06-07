/*
    Its a mashup of the original script at

    	http://patcavit.com/2005/03/06/more-monkey-business/

    and a CSS library at

    	http://www.dynamicdrive.com/style/csslibrary/item/css-popup-image-viewer/

    Instead of opening images in separate tabs, you can view it in a CSS Popup on Mouseover.

    Credits:

	Patrick Cavit, pcavit@gmail.com
	http://patcavit.com

	Eric Hamiter
	http://roachfiend.com/

	Dynamic Drive CSS Library
	http://www.dynamicdrive.com/style/


    Copy, use, modify, spread as you see fit.

    Author:

	Bhabishya Kumar
	http://bhabishyakumar.com


    Modded:
	errata
	errata87@gmail.com

*/

// ==UserScript==
// @name          Google Image Relinker with Mouseover
// @namespace     http://bhabishyakumar.com/scripts
// @description	  View Google Image Search links in CSS Popup on Mouseover
// @include       http://images.google.*/*
// ==/UserScript==

GM_addStyle(".thumbnail{position: relative;}.thumbnail:hover{background-color: transparent;z-index: 500;}.thumbnail span{position: absolute; background-color: #fff; z-index: 900; border-width: 0;padding: 0px;left: -1000px;visibility: hidden;color: black;text-decoration: none;}.thumbnail span img{ border-width: 0;padding: 0px;}.thumbnailMenu{position: absolute;z-index: 1000; display: inline; top: 0px; left: 0px;}.thumbnailMenu a img{width: 32px;}");

window.addEventListener("load", alterLinks, false);

function selectNodes(doc, context, xpath)
{
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++)
   {
	  result[x] = nodes.snapshotItem(x);
   }

   return result;
}

function cropImage(heightScope, widthScope, img, imgHeight, imgWidth){
	var heightPercent = heightScope / imgHeight.value;
	var widthPercent = widthScope / imgWidth.value;
	if(heightPercent < 1 || widthPercent < 1){
		var percent = heightPercent < widthPercent ? heightPercent : widthPercent;
		img.height = Math.floor(imgHeight.value * percent) - 5;
		img.width = Math.floor(imgWidth.value * percent) - 5;
	} else {
		img.height = imgHeight.value;
		img.width = imgWidth.value;
	}
}

function handleMouseOver(event){

	var span = event.currentTarget.getElementsByTagName("span")[0];
	var img = span.getElementsByTagName("img")[0];
	var imgWidth = span.getElementsByTagName("input")[0];
	imgWidth.value = imgWidth.value == "" ? img.width : imgWidth.value;
	var imgHeight = span.getElementsByTagName("input")[1];
	imgHeight.value = imgHeight.value == "" ? img.height : imgHeight.value;

	var ex = event.clientX;
	var ey = event.clientY;
	var wx = window.innerWidth/2;
	var wy = window.innerHeight/2;

	if(ex < wx && ey < wy){ // top left quarter
		var heightScope = 15 + (window.innerHeight - (event.currentTarget.offsetTop - window.pageYOffset));
		var widthScope = (window.innerWidth - (event.currentTarget.offsetLeft - window.pageXOffset)) - 15;
		cropImage(heightScope, widthScope, img, imgHeight, imgWidth);
		span.style.left =  15;
		span.style.top =  -15;
	}
	if(ex > wx && ey < wy){ // top right quarter
		var heightScope = 15 + (window.innerHeight - (event.currentTarget.offsetTop - window.pageYOffset));
		var widthScope = (event.currentTarget.offsetLeft - window.pageXOffset) + 60;
		cropImage(heightScope, widthScope, img, imgHeight, imgWidth);
		span.style.left =  -(img.width - 60);
		span.style.top =  -15;
	}
	if(ex < wx && ey > wy){ // bottom left quarter
		var heightScope = (event.currentTarget.offsetTop - window.pageYOffset) - 15;
		var widthScope = (window.innerWidth - (event.currentTarget.offsetLeft - window.pageXOffset)) - 15;
		cropImage(heightScope, widthScope, img, imgHeight, imgWidth);
		span.style.left =  15;
		//unsafeWindow.console.log(event.currentTarget.offsetHeight)
		span.style.top =  -(img.height + 15);
	}
	if(ex > wx && ey > wy){ // bottom right quarter
		var heightScope = (event.currentTarget.offsetTop - window.pageYOffset) - 15;
		var widthScope = (event.currentTarget.offsetLeft - window.pageXOffset) + 60;
		cropImage(heightScope, widthScope, img, imgHeight, imgWidth);
		span.style.left =  -(img.width - 60);
		span.style.top =  -(img.height + 15);
	}

	span.style.visibility = "visible";

}

function handleMouseOut(event){
	var span = event.currentTarget.getElementsByTagName("span")[0];
	span.style.visibility = "hidden";
}


function addCSSMagic(thumbnailLink, originalGoogLink)
{
	


	// Add a hidden span holding actual image for each link
	var span = document.createElement('span');
	thumbnailLink.appendChild(span);
	var image = document.createElement('img');
	image.src = thumbnailLink.href;
	span.appendChild(image);
	var imgWidth = document.createElement("input");
	imgWidth.setAttribute("type","hidden");
	imgWidth.setAttribute("value","");
	span.appendChild(imgWidth);
	var imgHeight = document.createElement("input");
	imgHeight.setAttribute("type","hidden");
	imgHeight.setAttribute("value","");
	span.appendChild(imgHeight);

var thumbnailMenu = document.createElement('div');
span.appendChild(thumbnailMenu);
thumbnailMenu.className = "thumbnailMenu";


	var DirektLink = document.createElement('a');
	thumbnailMenu.appendChild(DirektLink);
	DirektLink.href = thumbnailLink.href;
	DirektLink.title = "DrektLink to picture";

	var DirektLinkPic = document.createElement('img');
	DirektLinkPic.src = "http://www.iconfinder.net/data/icons/oxygen/128x128/emblems/emblem-symbolic-link.png";
	DirektLink.appendChild(DirektLinkPic);

	var googleLink = document.createElement('a');
	thumbnailMenu.appendChild(googleLink);
	googleLink.href = originalGoogLink;
	googleLink.title = "Original google link";
	
	googleLink.className = "SafeME";	

	var googleLinkPic = document.createElement('img');
	googleLinkPic.src = "http://www.iconfinder.net/data/icons/UltimateGnome/128x128/actions/filefind.png";
	googleLink.appendChild(googleLinkPic);



	

	var span2 = document.createElement('span');

	var savethumbnailLink = thumbnailLink.innerHTML;

	thumbnailLink.parentNode.replaceChild(span2, thumbnailLink);
	span2.innerHTML = savethumbnailLink;

	span2.className = "thumbnail";


	span2.addEventListener("mouseover", handleMouseOver, false);
	span2.addEventListener("mouseout", handleMouseOut, false);

}

function alterLinks(){

	doc = window.document;

	// Get a list of all A tags that have an href attribute containing the start and stop key strings.
	var googLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]");

	if(googLinks.length > 0){

		for (var x=0; x<googLinks.length; x++)
		{
			// Capture the stuff between the start and stop key strings.
			var gmatch = googLinks[x].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );

			// If it matched successfully...
			if (gmatch)
			{
				// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
				
				var originalGoogLink = googLinks[x].href;

				googLinks[x].href = decodeURI(gmatch[1]);

				addCSSMagic(googLinks[x], originalGoogLink);
			}
		}

	} else { //CustomizeGoogle Extension has already changed the hrefs

		// Get a list of all A tags containing IMG tags.
		googLinks = selectNodes(doc, doc.body, "//A[.//IMG]");

		for (var x=0; x<googLinks.length; x++)

		{
			addCSSMagic(googLinks[x]);
		}

	}
}


