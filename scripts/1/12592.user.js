// ==UserScript==
// @name		Google Images AutoPager and enlarger
// @namespace		http://www.domoticpoint.com
// @author		Fabrizio with many many contributors: Enlarger by wagstaff, Updater  By Jarett, also this wouldn't have been possible without Pawel Kubisz, ma.la, InvisGhost(from version 1.3)  and probably many others!
// @include		*.google.*images*
// @include		*images.google.*
// @description		Autoloads for next page of Google Images search results - starts whenever the mouse is over the webpage
// @date	  	27-09-2007 (1.0) - 15-10-2009 (1.2) - 10-04-2010 (1.3) - 14-05-2010 (1.4)
// @version	  	1.4
// ==/UserScript==


// Credits: ma.la <timpo@ma.la> and contributors
// link conversion code borrowed from CustomizeGoogle extension <http://www.customizegoogle.com/>
// Released under CC license, please mention the authors (@author)... it's a long trail of authors but they all did a good collaborative job and deserve it :)

// *******************************************************************************
// Begin Script Update Checker code By Jarett 
// *******************************************************************************
var SUC_script_num = 12592;
try{	function updateCheck(forced){
				if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){
					try{GM_xmlhttpRequest({
						method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){
								var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
								local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
								if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);
								if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}
								else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});
					}	catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}
				}
		}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});
		updateCheck(false);
}catch(err){}
// *******************************************************************************
// End Script Update Checker code
// *******************************************************************************

//
//

// *******************************************************************************
//			Enlarger By: wagstaff
// *******************************************************************************

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

var ENLARGER_ENABLED = GM_getValue('ENLARGER_TOGGLE', 'true'); 
var LEFT_RIGHT_MARGIN = 8;
var TOP_BOTTOM_MARGIN = 3;
var LITTLE_IMG_BORDER = 1;
var BIG_IMG_BORDER = 2;
var SPAN_BORDER = 3;

var allLinks, thisLink;
var ii;
var regExpMatches, imageURI;
var newSpan, bigImage;
var href;
var maxWidth, maxHeight;
var newWidth, newHeight, ratio;
var littleImage;
var spaceLeft, spaceRight, rightPosn, spanWidth;


// add a style that we'll use for the spans that contain our big images.
// Initially they're hidden, but if you hover over the link they become visible.
GM_addStyle('a.thumbnail span {visibility:hidden; position:fixed; z-index:10000; border:'+SPAN_BORDER+'px solid #3B5998};');
GM_addStyle('a.thumbnail:hover span {visibility:visible;};');
GM_addStyle('a.thumbnail img {border:'+BIG_IMG_BORDER+'px solid white; vertical-align:bottom};');

//	FB register a new command menu for enlarger enabler
//GM_registerMenuCommand( 'Enable Google Enlarger', function(){updateCheck(true);});

if	(ENLARGER_ENABLED=="true") {
	GM_registerMenuCommand( 'Disable Google Enlarger', function(){GM_setValue('ENLARGER_TOGGLE', 'false') ; 
																					alert("Please refresh the page and google enlarger will be disabled (except for the first page)"); });
	}	else { GM_registerMenuCommand( 'Enable Google Enlarger', function(){GM_setValue('ENLARGER_TOGGLE', 'true');
																					alert("Please refresh the page and google enlarger will be enabled");});
}


// Find links to images.
allLinks = document.evaluate('//A[contains(@href,"/imgres?imgurl=")][contains(@href,"&imgrefurl=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Max height is the same for all of our new images.
maxHeight = window.innerHeight - 2*(TOP_BOTTOM_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

enlarger_gim (allLinks);


// *******************************************************************************
//			Actual Enlarger function  
// *******************************************************************************
// Walk through them.
function enlarger_gim(enl_allLinks) {
	for (ii = 0; ii < enl_allLinks.snapshotLength; ii++) {
	   // Get link, and put it in the thumbnail class.
	   thisLink = enl_allLinks.snapshotItem(ii);
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
	   spaceLeft = getLeftPosn(littleImage);
	   rightPosn = spaceLeft + littleImage.width + (2*LITTLE_IMG_BORDER);
	   spaceRight = document.body.clientWidth - rightPosn;
	   maxWidth = Math.max(spaceLeft, spaceRight);
	   maxWidth = maxWidth - 2*(LEFT_RIGHT_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

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

	   // Position our span to the right or the left, wherever there's more room.
	   spanWidth = newWidth + 2*(BIG_IMG_BORDER + SPAN_BORDER);
	   if (spaceRight >= spaceLeft) {
		 newSpan.style.right = (spaceRight - spanWidth + LEFT_RIGHT_MARGIN) + 'px';
	   }
	   else {
		 newSpan.style.left = (spaceLeft - spanWidth - LEFT_RIGHT_MARGIN) + 'px';
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
	}

}

// *******************************************************************************
//			End of Enlarger 
// *******************************************************************************




(function(){
	var base = "http://"+location.host+"/images";
	var query;
	var startNr;
	var itemsQuantity;
	var loadingElemID = 'navcnt';
	var Enabled = false;
	var storageContainer;
	var thisLink; 
	var storageContainerCopy;
	var px_to_load_new_page = 1500;	// this is the number of pixels before the next page will be loaded: 
	// EXAMPLE:	your screen resoultion is 1024*768, with 1500 (height) you will load about 2 pages in advance when scrolling down.
	
	var Remain = {
		valueOf : function() {
			var sc = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
			var total = window.scrollMaxY;
			//var remain = total - sc;
			var remain =  total - sc;
			return total - sc;
					

		}
	};

	var watch_scroll = function() {
		var self = arguments.callee;
		// alert (Remain );
		if ( Remain < px_to_load_new_page && Enabled) {

					do_request();

		}
		setTimeout(self,1000);
	};

	

// *******************************************************************************
//			add origin page/origin image links
// *******************************************************************************

	var createLinks = function() {
   		var googLinks = document.evaluate("//A[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]", storageContainer, null, 6, null);
		var gmatch = null;
		
		if (ENLARGER_ENABLED=="true") {
				enlarger_gim (googLinks);
		}
		for (var x=0; x<googLinks.snapshotLength; x++) {


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

// *******************************************************************************
//			end of  origin page/origin image links
// *******************************************************************************

//
//

// *******************************************************************************
//			add autopager
// *******************************************************************************

	var appendSearchResult = function() {

		var isNextExist = document.getElementById('resultStats').innerHTML.replace(/ results.*<\/nobr>|about|[,. ]/gi, "");
		/* FB replace: in google image tipically you have something like
				<div id=resultStats>About 15,400 results<nobr>  (0.05 seconds)&nbsp;</nobr></div>
			the above replace strips the innerhtml to leave only the number 15400
		*/

		// alert("line217");
		//.evaluate("//div[@id='googleResult']//div[@id='nn']", document, null, 9, null).singleNodeValue;
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
		//	alert (Remain);
		//	alert (document.body.clientHeight);
		//	alert (document.body.scrollTop);
		// alert (startNr + " \n " + parseFloat(isNextExist.replace(/\./g, "")) );
		
		if ( startNr <= parseFloat(isNextExist.replace(/[,.]/g, "")) ) {
		//	alert (parseFloat(isNextExist.replace(/[,.]/g, "")));
			startNr += itemsQuantity;
		} else {
		//	alert("else");
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
		var wait = document.getElementById(loadingElemID);
	
		if(wait){
			wait.innerHTML = '<div style="margin: 0 auto; width: 176px; height: 63px; background-image: url(http://www.google.com/reader/ui/1368647008-loading.gif)"><p style="margin: 0; padding: 20px 0 0 15px; font-weight: bold; font-size: 130%; color: rgb(34, 34, 34);">Loading</p></div>';
		}
	}

	var do_request = function(){
		if (this.requested == startNr) return;	//undefined!!! risolto
		this.requested = startNr;
		document.getElementById(loadingElemID).style.display = 'block';
		var get_new_url;
		if (query.search(/start=\d*/i) != -1) {
				get_new_url = query.replace(/start=\d*/,"start=" + startNr);
			//	alert("if " + get_new_url);
		}
		else	{	
				get_new_url = query + "&start=" + startNr;
			//					alert("else " + get_new_url);
		}
			
		GM_xmlhttpRequest({
			method:"GET",
			url:get_new_url,
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
	
	//	if(document.getElementById('nn'))
		{
			query = location.href;
			
			// alert (query);
		}				// undefined!! (risolto?)
			itemsQuantity = document.evaluate("count(//div[@id='ImgContent']//td)", document, null, 1, null).numberValue/2;
			startNr = /start=\d+/.test(location.href) ? location.href.match(/start=(\d+)/)[1] - 0 + itemsQuantity : itemsQuantity;
			storageContainer = document.getElementById('ImgContent');
			storageContainerCopy = storageContainer.firstChild.firstChild.cloneNode(true);
			storageContainer.id = 'storageContainer';
		
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

// *******************************************************************************
//			end of autopager
// *******************************************************************************