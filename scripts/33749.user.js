// Firefox user script for easily viewing EXIF info from vBulletin postings
// version 0.9
// 09/12/08
// ==UserScript==
// @name vBulletin EXIF linker
// @namespace http://jfriend.smugmug.com
// @description Enhance EXIF viewing in vBulletin forums
// @include http://www.dgrin.com/showthread*
//  @include http://www.nikoncafe.com/vforums/showthread*
// ==/UserScript==
// 



// This is the form of images within the message content
// <div id="post_message_917608">
// <img src="http://lazzaram.smugmug.com/photos/365823088_Y6VEs-M.jpg" border="0" alt="" />
// </div>

// Smugmug URL: http://peot.smugmug.com/photos/362240734_oiZiK-X3-1.jpg
//    EXIF: http://jfriend.smugmug.com/photos/newexif.mg?ImageID=344290837&ImageKey=ypsKL

// pBase
// http://i.pbase.com/o6/90/198190/1/102287050.b2jgugQv.D24_6030.jpg
// http://i.pbase.com/g3/60/573760/2/102436083.ymLN8w9e.jpg
// http://www.pbase.com/duncanc/image/61499136/small.jpg
// http://www.pbase.com/photorebel/image/102977980.jpg

//Photobucket
// http://i126.photobucket.com/albums/p111/peteunicom/MountainBikingSession-17thAugust200.jpg
// http://i145.photobucket.com/albums/r225/bluesmangraham/nik2008-08-06184646_01.jpg

// Zenfolio
// http://diablonf.zenfolio.com/img/v2/p836245442-4.jpg


function MakeSmug(matches)
{
	var retVal = "";
	if (matches.length >= 3)
	{
		retVal = matches[1] + "newexif.mg?ImageID=" + matches[2];
	}
	if (matches.length >= 4)
	{
		retVal = retVal + "&ImageKey=" + matches[3];
	}
	return(retVal);
}

function MakePBASE(matches)
{
	var retVal = "";
	if (matches.length == 2)
	{
		retVal = "http://www.pbase.com/coffee/image/" + matches[1] + "&exif=Y";
	}
	return(retVal);
}

// Flickr
// http://farm2.static.flickr.com/1137/1049643433_567aaa4bfd.jpg
// http://www.flickr.com/photos/risemeagain/1049643433/meta/

function MakeFlickr(matches)
{
	var retVal = "";
	if (matches.length == 2)
	{
		retVal = "http://www.flickr.com/photos/aa/" + matches[1] + "/meta/";
	}
	return(retVal);
}

function MakeGeneric(matches)
{
	if (matches.length == 0) return "";
	return("http://regex.info/exif.cgi?url=" + encodeURIComponent(matches[0]));
}

// array of regular expressions and URL making functions
var linkInfo =
[
	["(^http.*smugmug.com/photos/)([0-9]+)_([a-zA-Z0-9]+)\-", MakeSmug],
	["^http.*pbase.com/[a-z0-9]+/[a-z0-9]+/[a-z0-9]+/[a-z0-9]+/([0-9]+)\.[0-9A-Za-z]+", MakePBASE],
	["^http.*pbase.com/[^/]+/image/([0-9]+)\.", MakePBASE],
	["^http.*pbase.com/[^/]+/image/([0-9]+)/", MakePBASE],
	["^http.*flickr.com/[0-9]+/([0-9]+)_", MakeFlickr],
	["(^http://[^/]+/photos/)([0-9]+)_([a-zA-Z0-9]+)\-(?:S|M|L|XL|X2|X3|O|Th|Ti)[\-0-9]*.jpg", MakeSmug],
	["http://[^/\.]+\.photobucket.com/.*\.jpg$", MakeGeneric],
	["http://[^/\.]+\.zenfolio.com/.*\.jpg$", MakeGeneric],
	["http://[^/\.]+\.imageevent.com/.*\.jpg$", MakeGeneric],
	["http://[^/\.]+\.imageshack.us/.*\.jpg$", MakeGeneric]
];

// http://i145.photobucket.com/albums/r225/bluesmangraham/nik2008-08-06184646_01.jpg
// http://lazzaram.smugmug.com/photos/365823088_Y6VEs-M.jpg
// http://www.smugmug.com/photos/227185626-XL.jpg
// http://photos.imageevent.com/tsx_wiz/sports/baseball/romebraves/romebraves72608/072608rome_br000.jpg

// now prebuild all the regular expressions to save some time
var regExLinkInfo = new Array;
for (var i in linkInfo)
{
	regExLinkInfo[i] = new RegExp(linkInfo[i][0], "i");
}


function ConvertImageLinkToExifLink(imageLink)
{
	var retVal = "";
	for (var i in linkInfo)
	{
		var re = regExLinkInfo[i];
		var matches = re.exec(imageLink);
		if (matches)
		{
			retVal = linkInfo[i][1](matches);
			if (retVal != "")
			{
				break;
			}
		}
	}
	return(retVal);
}

function CheckParentTree(obj, tag)
{
	try
	{
		var parentObj = obj.parentNode;
		while (parentObj != document)
		{
			if (parentObj.tagName == tag)
				return(parentObj);
			parentObj = parentObj.parentNode;
		}
	} catch (e) {console.log(e)}
	return(null);
}

function InsertCorner(parent, objToReplace, imageExifLink)
{
	// here we want to add the overlaid corner on top of the image
	// <div style="position: relative;"> <img src="original image URL" > <a href="photo info link"> <img src="transparent corner"  style="position: absolute; left:0px; top:0px;" /> </a> </div>
	var cloneImage = objToReplace.cloneNode(true);			// generate a clone of this object
	
	// create the span object
	var newDiv = document.createElement("div");
	newDiv.style.position = "relative";						// make it so that absolute position inside me is actually relative to the start of the span
	newDiv.innerHTML = '<a href="' + imageExifLink + '" target="_blank"><img src="http://jfriend.smugmug.com/photos/372341113_W6X2m-O.png" border="0" style="position:absolute; left:0px; top:0px;" /> </a>';
	
	// now find the img in our span so we can insert the cloneImage before it
	var linkNode = newDiv.childNodes[0];					// first node in the div is our link
	newDiv.insertBefore(cloneImage, linkNode);				// insert our clone object before our link node
	
	// now put this in the DOM in place of the original image
	parent.replaceChild(newDiv, objToReplace);
}

function AddExifLinks()
{
	try
	{
		var liveDivs = document.getElementsByTagName("div");
		
		// make a static divs array that won't change when we add/remove things from the DOM
		var divs = new Array;
		for (var a in liveDivs)
		{
			divs.push(liveDivs[a]);
		}
		
		// look for a div with an id of "post_message_xxxxxxxx"
		for (var i in divs)
		{
			try
			{
				var id = divs[i].id;
				if (id.substr(0, 13) == "post_message_")
				{
					// get all images in the actual post
					var liveImgs = divs[i].getElementsByTagName("img");
					
					// make a static imgs array that won't change when we add/remove things from the DOM
					var imgs = new Array;
					for (var a in liveImgs)
					{
						imgs.push(liveImgs[a]);
					}
					for (var j in imgs)
					{
						try
						{
							var imageLink = imgs[j].src;
							if (!imageLink) continue;
							var imageExifLink = ConvertImageLinkToExifLink(imageLink);	// make an exif link from it
							if (imageExifLink && (imageExifLink != ""))
							{
								// first find out if we are currently inside a link.  If so, we can't put another link here so we have to go in the parent tree
								var aLinkObject = CheckParentTree(imgs[j], "A");
								var objToReplace = imgs[j];
								var parent = objToReplace.parentNode;
								if (aLinkObject)
								{
									// we were in a link, insert this HTML before the start of the link, find out if the link is immediately before the img
									if ((parent.tagName == "A") && (parent.childNodes[0] == objToReplace))
									{
										// the obj immediately in front us is an A tag.  We want to replace it instead of the image so we get it's parent as the new parent
										InsertCorner(parent.parentNode, parent, imageExifLink);
									}
									else		// more complicated link, we'll just have to put text in
									{
										var newDiv = document.createElement("div");
										newDiv.innerHTML = '<a href="' + imageExifLink + '" target="_blank">Show EXIF</a><br />'
										
										// insert our link before the existing link rather than before the image
										// we get the parent node of the link object
										// and call insertBefore on it
										// and pass it the newDiv and the link object we want to go before
										aLinkObject.parentNode.insertBefore(newDiv, aLinkObject);	// insert it before the image
									}
								}
								else
								{
									InsertCorner(parent, objToReplace, imageExifLink);
								}
							}
						}
						catch (eee) {}
					}
				}
			} catch(ee) {}
		}
	} catch (e) {}
}

AddExifLinks();

// End of the code