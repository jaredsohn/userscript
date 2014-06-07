// ==UserScript==
// @name		Google Images AutoPager + enlarger
// @namespace		http://www.domoticpoint.com/
// @author		Fabrizio (49%based on Pawel Kubisz <kubisz AT dziennikarstwo.uni.wroc.pl>, 49% based on GoogleImagesEnlarger)
// @include		*.google.*/images*
// @description		Autoloads for next page of Google Images search results - starts when the page is loaded. New large images are loaded together with small ones, quite band demanding.
// @date	  	27-11-2007
// @version	  	1.0
// ==/UserScript==


// based on Google Auto Pager script by ma.la <timpo@ma.la> and contributors + Google enlarger By: wagstaff
// link conversion code borrowed from CustomizeGoogle extension <http://www.customizegoogle.com/>
// Released under the CC license (by-nc-sa)


//:::::::CHANGELOG:::::::
// ver 0.01 - 2007.04.11
// - initial release
//
// ver 0.02 - 2007.04.12
// - changed loading parameters definition: startNr and itemsQuantity
// - few minor code optimizations
//
// ver 0.03 - 2007.04.27
// - added script autoupdate feature


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
GM_addStyle('a.thumbnail span {visibility:hidden; position:fixed; border:black; padding:3px 3px 3px 3px;background-color:#3B5998;};');
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
			    // Google helpfully store the image width and height for us - get them.
			    href = thisLink.href;
			    regExpMatches = href.match(/\&w\=(.*?)\&sz\=/);
			    newWidth = parseInt(regExpMatches[1]);
			    regExpMatches = href.match(/\&h=(.*?)\&w\=/);
			    newHeight = parseInt(regExpMatches[1]);

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
			gmatch = googLinks.snapshotItem(x).href.match(/\&imgrefurl\=(.*?)\&h=/);
			if (gmatch) {
				originPage = unescape(gmatch[1]);
			}

			var originImage = null;
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
		elem.innerHTML = "end of the search results";
		with (elem.style) {
			padding = "0.3em";
			marginBottom = "5em";
			background = "#00E";
			color = "#FF0";
			fontWeight = "bold";
			textDecoration = "blink";
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
			autoUpdateFromUserscriptsDotOrg({
				name: 'Google Images Auto Pager',
				url: 'http://userscripts.org/scripts/source/8433.user.js',
				version: "0.03",
			});
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
			} else document.getElementById(loadingElemID).style.display = 'none';
		}
	};

	var autoUpdateFromUserscriptsDotOrg = function (SCRIPT){
		try {
			if (!GM_getValue) return;
			var DoS_PREVENTION_TIME = 2 * 60 * 1000;
			var isSomeoneChecking = GM_getValue('CHECKING', null);
			var now = new Date().getTime();
			GM_setValue('CHECKING', now.toString());
			if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
			
			// check daily
			var ONE_DAY = 24 * 60 * 60 * 1000;
			var lastChecked = GM_getValue('LAST_CHECKED', null);
			if (lastChecked && (now - lastChecked) < ONE_DAY) return;
			
			GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
			onload: function(result) {
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site
				if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
					GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
				}
			}
			});
			GM_setValue('LAST_CHECKED', now.toString());
		} catch (ex) { }
	};


// init
	dblClickEvents();
})();