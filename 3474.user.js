// ==UserScript==
// @name 		Vbulletin "Link to Image" in post script
// @namespace 	http://www.katapultstolpiller.com/greasemonkey/
// @description 	The script creates a img tag after links that point to an image inside a post. It also lets you choose which images to show with a simple press of a button. Created mape@pirate.se and oneman
// @include 		http://www.flashback.info/showthread.php*
// @include 		http://www.flashback.info/showpost.php*
// ==/UserScript==

// This is where you enter the forum sections you want to filter out.
var fileformats= new Array()
	fileformats[0] = ".jpg";
	fileformats[1] = ".jpeg";
	fileformats[2] = ".png";
	fileformats[3] = ".gif";
	fileformats[4] = ".svg";
	fileformats[5] = ".bmp";

var showImages =		false;
var showButtons = 		true;
var max_imagewidth = 	700;
var max_imageheight = 	500;
var backgroundColor = 	'#000000';
var textColor = 		'#333333';
var imgIdPrefix = 		'insertedImage';
var allElements, thisElement;

allAnchorElements = document.getElementsByTagName('a');
var imageDisplayState = showImages ? 'block' : 'none';
var i;

for (i = 0; i < allAnchorElements.length; i++) {
	thisElement = allAnchorElements[i];
	for (var n = 0; n < fileformats.length; n++) {
		if(thisElement.href.toLowerCase().indexOf(fileformats[n])!=-1 
		&& thisElement.innerHTML.indexOf('src=')==-1)
		{
			if(thisElement.parentNode.id.indexOf("post")!=-1)
			{
				thisElement.style.color = textColor;
				thisElement.style.display = 'block';
				thisElement.style.textDecoration = 	'none';
				thisElement.style.maxWidth = max_imagewidth + 'px';

				var logo = 	document.createElement('img');
				var imageUrl = thisElement.href;
				if (thisElement.href.indexOf("leave.php") != -1)
				{
					imageUrl = thisElement.href.substring(36);
					thisElement.href = thisElement.href.substring(36);
				}
				
				// Must be before calling fixImageshackUrl
				logo.id = imgIdPrefix + i;
				
				// Find the real image-url in imageshack-pages
				if (imageUrl.indexOf("imageshack.us/my.php?") != -1 ||
					imageUrl.indexOf("exs.cx/my.php?") != -1)
				{
					fixImageshackUrl(imageUrl, logo.id);
				}
				
				if (showImages)
					logo.src = imageUrl;
				else
					logo.src = '#';

				logo.id = imgIdPrefix + i;
				logo.alt = imageUrl;
				logo.style.maxWidth = 	max_imagewidth + 'px';
				logo.style.maxHeight = 	max_imageheight + 'px';
				logo.style.border = 	'0';
				logo.style.display = 	imageDisplayState;
				//logo.style.background = backgroundColor;
				logo.style.padding = 	'1px';
				
				thisElement.insertBefore(logo, thisElement.firstChild);

				if (showButtons)
				{
					var linkButton = document.createElement('input');
					linkButton.type = 'button';
					linkButton.value = showImages ? 'Hide' : 'Show';
					linkButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
					linkButton.setAttribute('id', 'button' + i);
					linkButton.setAttribute('onClick', "layer = document.getElementById('" + imgIdPrefix + i + "'); if (layer.style.display == 'block') {layer.style.display = 'none'; this.value='Show'; } else { layer.src = layer.alt; layer.style.display = 'block'; this.value='Hide'}");
	
					thisElement.parentNode.insertBefore(linkButton, thisElement);
				}
			}
		}
	}
}

if (showButtons)
{
	var postTd;
	var j;
	for (i = 0; i < allAnchorElements.length; i++)
	{
		if (allAnchorElements[i].id.indexOf('postcount') == -1) // Wrong anchor
		{
			continue;
		}
		else
		{
			postTd = 	allAnchorElements[i].parentNode;
			postTd.id = 'TD_' + allAnchorElements[i].id;
		}
		var postImages = postTd.parentNode.parentNode.parentNode.getElementsByTagName('img');
		var hasInsertedImages = false;
		for (j=0; j < postImages.length; j++)
		{
			if (postImages[j].id.indexOf(imgIdPrefix) != -1)
			{
				hasInsertedImages = true;
				break;
			}
		}
		
		if (!hasInsertedImages)
			continue;
		
		var postButton = 	document.createElement('input');				
		postButton.type = 	'button';
		//postButton.value = 	'Show/Hide all images in this post';
		postButton.value = 	'Show/Hide all';
		postButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
	
		var onClickCode;
		onClickCode  = "var postImgElements=document.getElementById('post_message_";
		onClickCode +=  postTd.id.substring(12) + "').";
		onClickCode += "getElementsByTagName('img'); ";
		onClickCode += "for (i=0;i<postImgElements.length;i++) { ";
		onClickCode += " if(postImgElements[i].id.indexOf('";
		onClickCode += imgIdPrefix;
		onClickCode += "')!=-1) { ";
		onClickCode += " if(postImgElements[i].style.display=='block') { postImgElements[i].style.display='none'; }";
		onClickCode += " else { postImgElements[i].src = postImgElements[i].alt ;postImgElements[i].style.display='block';}}}";	
		
		postButton.setAttribute('onClick',onClickCode);		
		postTd.insertBefore(postButton, postTd.firstChild);
	}
}

// Finds the real image URL and assigns it to the image alt-attribute and optionally to the src-attribute
function fixImageshackUrl(address, imageId)
{
	var newImageUrl = address;
	GM_xmlhttpRequest
	(
	{
		method:  'GET',
		url:     address,
		onload:  function(results)
		{
			page = results.responseText;
			newImageUrl = page.slice(page.indexOf("onclick=\"scaleImg()\" src=\"") + 26, 
				page.indexOf("title=\"Click to visit ImageShack for Image Hosting!\""));
			newImageUrl = newImageUrl.slice(0, newImageUrl.lastIndexOf('"'));
				
			// If the URL doesn't start with http:// use the address to the mainpage
			// (In case the newImageUrl is not the correct URL to the image)
			if (newImageUrl.indexOf("http://") != 0)
			{
				newImageUrl = address;	
			}
			
			document.getElementById(imageId).alt = newImageUrl;			
			if (showImages)
			{
				document.getElementById(imageId).src = newImageUrl;
			}
		}
	}
	);
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	