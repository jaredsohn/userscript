// ==UserScript==
// @name		Google Images AutoPager + enlarger 2.0
// @namespace	http://invisghost.com/
// @author		Fabrizio & InvisGhost
// @include		*.google.*/images*
// @description		Autoloads for next page of Google Images search results & Enables the images to be embeded in a preview tooltip.
// @date	  	27-11-2008
// @version	  	0.04
// ==/UserScript==


// based on Google Auto Pager script by ma.la <timpo@ma.la> and contributors + Google enlarger By: wagstaff
// link conversion code borrowed from CustomizeGoogle extension <http://www.customizegoogle.com/>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html


//:::::::CHANGELOG:::::::
// ver 0.01 - 2007.04.11
// - initial release
//
// ver 0.02 - 2007.04.12
// - changed loading parameters definition: startNr and itemsQuantity
// - few minor code optimizations
//
// ver 0.04 - 2008.11.27
// - fixed orginal page change where it wouldnt get rid of the "usg=blahblahblahblah" at the end


// Utility function to get the left position of an object
function getLeftPosn(object) {
   var leftPos = object.offsetLeft;

   while (object.offsetParent !== null) {
      object = object.offsetParent;
      leftPos += object.offsetLeft;
   }

   return leftPos;
}

// Function to tidy up in the event that we fail to load a big image.
function removeBigImage(event) {
   var bigImage, parentSpan;

   // Get objects.
   bigImage = event.currentTarget;
   parentSpan = bigImage.parentNode;

   // Remove the event listener.
   bigImage.removeEventListener('error', removeBigImage, false);

   // Remove big image and its parent span.
   parentSpan.removeChild(bigImage);
   parentSpan.parentNode.removeChild(parentSpan);
}

// Now we begin
const LEFT_RIGHT_MARGIN = 8;
const TOP_BOTTOM_MARGIN = 3;
const THUMBNAIL_BORDER = 1;
const SPAN_GAP = 10;
const SPAN_BORDER = 5;

var allLinks, thisLink;
var ii;
var regExpMatches, imageURI;
var newSpan, bigImage;
var href;
var windowWidth, maxWidth, maxHeight;
var newWidth, newHeight, ratio;
var littleImage, littleImageWidth;
var spaceLeft, spaceRight, neededSpace;

// add a style that we'll use for the spans that contain our big images.
// Initially they're hidden, but if you hover over the link they become visible.
GM_addStyle('a.thumbnail span {visibility:hidden; position:fixed; border:black; padding:3px 3px 3px 3px;background:#971010 url(data:image/png;base64,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%3D%3D) bottom left repeat-x;};');
GM_addStyle('a.thumbnail:hover span {visibility:visible;};');
GM_addStyle('a.thumbnail img {border:2px solid white;};');

(function(){
	var base = "http://"+location.host+"/images";
	var query;
	var startNr;
	var itemsQuantity;
	var loadingElemID = 'navbar';
	var Enabled = false;
	var storageContainer;
	var thisLink; 
	var storageContainerCopy;

	var Remain = {
		valueOf : function() {
			var sc = document.body.scrollTop;
			var total = (document.body.scrollHeight - document.body.clientHeight);
			var remain = total - sc;
			return total - sc;
		}
	};

	var watch_scroll = function() {
		var self = arguments.callee;
		if (Remain < 500 && Enabled) {
			do_request();
		}
		setTimeout(self,100);
	};

	var createLinks = function() {
   		var googLinks = document.evaluate("//A[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]", storageContainer, null, 6, null);
		var gmatch = null;
		for (var x=0; x<googLinks.snapshotLength; x++) {
			
			    // Get link, and put it in the thumbnail class.
			    thisLink = googLinks.snapshotItem(x);
			    thisLink.className = 'thumbnail ' + thisLink.className;
			    // Google helpfully stores the image width and height for us to get them.
			    href = thisLink.href;
			    regExpMatches = href.match(/\&w\=(.*?)\&sz\=/);
			    newWidth = parseInt(regExpMatches[1]);
			    newHeight = parseInt(href.match(/\&h=(.*?)\&w\=/)[1]);

			    // Create a span to contain our big image.
			    newSpan = document.createElement('SPAN');
			    thisLink.appendChild(newSpan);
			
			    // We will allow the big image to go to either the right or the left of the
			    // little image, wherever there is more space.
			    littleImage = thisLink.getElementsByTagName("IMG")[0];
			    spaceLeft = getLeftPosn(littleImage) - LEFT_RIGHT_MARGIN;
			    littleImageWidth = littleImage.width;
			    windowWidth = document.body.clientWidth - 2*LEFT_RIGHT_MARGIN;
			    spaceRight = windowWidth - (spaceLeft + littleImageWidth +
			                                                           2*THUMBNAIL_BORDER);
			    maxWidth = Math.max(spaceLeft, spaceRight) - (SPAN_GAP + 2*SPAN_BORDER);

			    // And we'll allow almost the entire height of the window.
			    maxHeight = document.body.clientHeight -
			                                         (2*TOP_BOTTOM_MARGIN + 2*SPAN_BORDER);
			    // Calculate the new image size.
			    if (newWidth > maxWidth) {
			        ratio = (maxWidth/newWidth);
			        newWidth *= ratio;
			        newHeight *= ratio;
			    }
			    if (newHeight > maxHeight) {
			        ratio = (maxHeight/newHeight);
			        newWidth *= ratio;
			        newHeight *= ratio;
			    }

			    // Position our span:
			    // - to the right of the little image, if there's room
			    // - else to the left of the little image (where there must be room)
			    neededSpace = newWidth + SPAN_GAP + 2*SPAN_BORDER;
			    if (spaceRight >= neededSpace) {
			       newSpan.style.right = (LEFT_RIGHT_MARGIN + spaceRight - neededSpace) + 'px';
			    }
			    else {
			       newSpan.style.left = (LEFT_RIGHT_MARGIN + spaceLeft - neededSpace) + 'px';
			    }

			    // And position our image in the middle of the screen
			    newSpan.style.bottom = ((maxHeight - newHeight)/2) + TOP_BOTTOM_MARGIN + 'px';

			    // Figure out the source of the image.
			    regExpMatches = href.match(/\/imgres\?imgurl\=(.*?)\&imgrefurl\=/);
			    imageURI = decodeURI(regExpMatches[1]);

			    // Finally insert the image into the document.
			    
			    bigImage = document.createElement('IMG');
			    bigImage.width = newWidth;
			    bigImage.height = newHeight;
			    bigImage.src = imageURI;
			    newSpan.appendChild(bigImage);

			    // If the image fails to load, remove this whole construction.
			    bigImage.addEventListener('error', removeBigImage, false);
						
						
			var target = googLinks.snapshotItem(x).getAttribute("target");
			if (!target) {
				target = "";
			}

			var originPage = null;
			gmatch = googLinks.snapshotItem(x).href.match(/\&imgrefurl\=(.*?)\&usg=/);
			if (gmatch) {
				originPage = unescape(gmatch[1]);
			}

			var originImage = null;
			//http://images.google.com/imgres?imgurl=http://www.dino-productions.net/Dojo/Stages/stg_desert.gif&imgrefurl=http://www.dino-productions.net/Dojo/&usg=__WI3wzXDKIkuSyFmbq7-XGJRIL_w=&h=300&w=400&sz=7&hl=en&start=9&sig2=E9W1ihF37ZIENaP-e-N8_Q&tbnid=15KNDQlSTFQemM:&tbnh=93&tbnw=124&ei=8UIvSYWVI5u0sAO0z7TuCA&prev=/images%3Fq%3Dmario%2Bfireball%2Bsprite%2Bfiletype:gif%26hl%3Den%26safe%3Doff%26sa%3DG
			gmatch = googLinks.snapshotItem(x).href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );

			if (gmatch) {
				originImage = unescape(gmatch[1]);
				googLinks.snapshotItem(x).href = originImage;
				var div = document.createElement('div');
				var s = '<font size="-2">[ ';
				s += '<a class="fl" href="'+originImage+'" target="'+target+'">' + "Origin image" + '</a>';
				if (originPage) {
					s += ' | ';
					s += '<a class="fl" href="'+originPage+'" target="'+target+'">' + "Origin page" + '</a>';
				}
				s  += ' ]</font>';
			    div.innerHTML = s;
				googLinks.snapshotItem(x).parentNode.appendChild(div);
			}
		}
	};

	var appendSearchResult = function() {
		var isNextExist = document.evaluate("//div[@id='googleResult']//div[@id='nn']", document, null, 9, null).singleNodeValue;

		//img
		var foundContent = document.evaluate("//div[@id='googleResult']//div[@id='ImgContent']/table/tbody/tr", document, null, 6, null);
		storageContainer = document.getElementById('storageContainer').firstChild.firstChild;
		if(!foundContent.snapshotItem(0).firstChild.firstChild)
		{
			for(var i = 0; i < foundContent.snapshotLength; i++)
			{
				storageContainer.appendChild(storageContainer.childNodes[i].cloneNode(true));
				storageContainer.replaceChild(storageContainerCopy.childNodes[i].cloneNode(true), storageContainer.childNodes[i]);
			}
		}
		else
		{
			for (var i = 0; i < foundContent.snapshotLength; i++) storageContainer.appendChild(foundContent.snapshotItem(i));
		}

		if (!!isNextExist) {
			startNr += itemsQuantity;
		} else {
			insertEndText();
		}
		document.body.removeChild(document.getElementById('googleResult'));
		document.getElementById(loadingElemID).style.display = 'none';

		//img
		createLinks();
	};

	var insertEndText = function() {
		var elem = document.createElement("div");
		elem.innerHTML = "End of Results";
		with (elem.style) {
			padding = "0.3em";
			marginBottom = "5em";
			background = "#00E";
			color = "#FF0";
			fontWeight = "bold";
			textAlign = "center";
		};
		document.body.appendChild(elem);
	};

	var insertLoadingText = function() {
		var wait = document.getElementById(loadingElemID)
		if(wait){
			wait.innerHTML = '<div style="margin: 0 auto; width: 176px; height: 63px; background-image: url(http://www.google.com/reader/ui/1368647008-loading.gif)"><p style="margin: 0; padding: 20px 0 0 15px; font-weight: bold; font-size: 130%; color: rgb(34, 34, 34);">Loading</p></div>';
		}
	}

	var do_request = function(){
		if (this.requested == startNr) return;

		this.requested = startNr;
		document.getElementById(loadingElemID).style.display = 'block';
		GM_xmlhttpRequest({
			method:"GET",
			url:base + query.replace(/start=\d*/,"start=" + startNr),
			onload:function(details)
			{
				var googleResult = document.createElement('div');
				googleResult.innerHTML = details.responseText;
				googleResult = document.body.appendChild(googleResult);
				googleResult.id = 'googleResult';
				googleResult.style.display = 'none';
				appendSearchResult();
			}
		});
	};

	var init_autopager = function(){
		if(document.getElementById('nn'))
		{
			query = document.getElementById('nn').parentNode.search;
			itemsQuantity = document.evaluate("count(//div[@id='ImgContent']//td)", document, null, 1, null).numberValue/2;
			startNr = /start=\d+/.test(location.href) ? location.href.match(/start=(\d+)/)[1] - 0 + itemsQuantity : itemsQuantity;
			storageContainer = document.getElementById('ImgContent');
			storageContainerCopy = storageContainer.firstChild.firstChild.cloneNode(true);
			storageContainer.id = 'storageContainer';
		}
	};

	var dblClickEvents = function(){
		if (window.location.href.indexOf(base) != -1)
		{
			Enabled = !Enabled;
			if(Enabled)
			{
				init_autopager();
				insertLoadingText();
				watch_scroll();
			} 
			else document.getElementById(loadingElemID).style.display = 'none';
		}
	};


// init
	dblClickEvents();
})();