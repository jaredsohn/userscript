// ==UserScript==
// @name           TradeMe Photos
// @namespace      http://userscripts.org/users/91488
// @description    Display thumbnail photos on TradeMe
// @include        http://www.trademe.co.nz/*
// ==/UserScript==

/*

This script was originally called "TradeMe PhotoView"

Most credit goes to the original author and other people, I've just fixed up a few things and made it so the images are bigger.

Thanks to everyone who came before. Make sure you pass it forward.

*/

//This allows you to turn off unnecessary features
var showThumbs=true;
var showSnippets=true;
var showZoom=false;

//This variable points to a web directory that TradeMe (TM) has shifted around before
//If this TradeMe PhotoView script breaks, check the location of the TM image store by right mouse clicking
// on the image you want shown in the thumbnail view
var targetstring="http://images.trademe.co.nz/photoserver/";

//The prototype for the callback function that allows me to remember what link I was loading!
Function.prototype.bind = function( thisObject ) {
	var method = this;
	var oldargs = [].slice.call( arguments, 1 );
	return function () {
		var newargs = [].slice.call( arguments );
		return method.apply( thisObject, oldargs.concat( newargs ));
	};
}

var allImgs, thisImg;
var globalTimer;

//First we load all the images of that little camera
allImgs = document.evaluate(
	"//img[@src='/images/NewSearchCards/LVIcons/hasPhoto.png']", //the name of the little camera icon
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

//Then we go through them one-by-one
for (var i = 0; i < allImgs.snapshotLength; i++) {
	thisImg = allImgs.snapshotItem(i); //the photos exist but no thumbnail
	thisImg.setAttribute('thumbnailnumber', i);
	
	//We need to request the page that the icon links to, to get it's thumbnail
	if (thisImg.parentNode.href) {
		//console.log(thisImg.parentNode.href);
		GM_xmlhttpRequest({
			method: 'GET',
			url: thisImg.parentNode.href,
			headers:	{'User-agent': navigator.userAgent, 'Accept':'text/html,text/xml,text/plain'},
			//once the page with the thumbnail is loaded, run this function
			onload: cbReplaceWithPhoto.bind({specificIcon:thisImg})
		});
	}
}

//Set the style up in the <HEAD> tag
var head=document.getElementsByTagName('head')[0];

style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.enlargement {visibility:hidden;position:absolute;z-index:100;top:20px;left:90px;}\r\n.enlargement img {border:6px solid #fff000;}';
head.appendChild(style);

//This is the callback function that gets run when the itemDetailsPage has loaded
//It grabs the filename of the thumbnail, and replaces the icon with it.
function cbReplaceWithPhoto(rD) {
	//turn the text into a dom object
	var itemDetailsPage = document.createElement('div');
	itemDetailsPage.innerHTML = rD.responseText;

	var itemDetailsImgs = itemDetailsPage.getElementsByTagName('img');
	//console.log(itemDetailsImgs);

	//Go through all images on the item page, and find the one that looks like a thumbnail
	for (var e = 0; e < itemDetailsImgs.length; e++) {
		isthumbImg = itemDetailsImgs[e];
		
		//Debugging - suggest using Console^2 (Console squared) through firefox extenions.
		GM_log(isthumbImg.src.substring(0,targetstring.length));

		if (isthumbImg.src.substring(0,targetstring.length)==targetstring) {
			//console.log(['0', isthumbImg, this.specificIcon]);
			replacementImg = document.createElement("img"); //replace it with this
			replacementImg.src = isthumbImg.src;
			replacementImg.style.maxHeight = "100px";
			replacementImg.style.maxWidth = "100px";
			replacementImg.style.margin = "5px";
			replacementImg.setAttribute('thumbnailnumber', this.specificIcon.getAttribute('thumbnailnumber'));
			//Show the snippets
			if (showSnippets) {
			  listingTitle=this.specificIcon.parentNode.parentNode.parentNode.getElementsByClassName("listingTitle")[0]
			  GM_log(listingTitle.innerHTML);
				
				informationText = itemDetailsPage.getElementsByClassName('ListingDescription')[0].textContent;
				
				//console.log(['2', informationText]);
				if (informationText.length>3) {
					if (informationText.length>230) {
						informationText=informationText.substring(0,230)+"...";
					}
					
					listingTitle.innerHTML=listingTitle.innerHTML+"<span style='color:#888888;font-size:0.8em'> &mdash; "+informationText.replace("<","&lt;")+"</span>";
				}
			}

			//replace the icon with the thumbnail
			if (showThumbs) {
				this.specificIcon.parentNode.replaceChild(replacementImg, this.specificIcon);
			}

			//This handles the tooltip-like zoom function
			if (showZoom) {
				//create DIVs that contain slightly larger versions of the image on hover
				var zoomDiv = document.createElement('div');
				zoomDiv.setAttribute('id', "enlargement" + replacementImg.getAttribute('thumbnailnumber'));
				zoomDiv.setAttribute('class', 'enlargement');
				zoomDiv.innerHTML="<img src='" + replacementImg.src + "' width='250'>";
				document.body.appendChild(zoomDiv);

				//When mouse goes over it starts a timer.
				replacementImg.addEventListener(
					'mouseover',
					function(event) {
						var x=event.pageX;
						var y=event.pageY;
						var divId='enlargement' + this.getAttribute('thumbnailnumber');
						showPopupDiv(x, y, divId);
					},
					true);
					//Hide image and reset timer once mouse moves out
					replacementImg.addEventListener('mouseout',
					function(event) { document.getElementById('enlargement' + this.getAttribute('thumbnailnumber')).style.visibility = "hidden";},
					true);
			}

			e = itemDetailsImgs.length; //to stop checking once we've found first thumb (exits the loop)
		}
	}
}

/* Function to popup the hidden div */
function showPopupDiv(triggerX, triggerY, divId) {
	obj = document.getElementById(divId);

	var top = triggerY - obj.offsetHeight/2;
	var left = triggerX - obj.offsetWidth - 275;
	var right=left+obj.offsetWidth;

	if (top < window.pageYOffset) top = window.pageYOffset;
	if (triggerX > window.innerWidth / 2)
	left = triggerX - obj.offsetWidth - 50;
	if (right > window.innerWidth - 15)
	left = window.innerWidth - obj.offsetWidth - 15;
	if (left < window.pageXOffset)
	left = window.pageXOffset;

	obj.style.left = left + 'px'; //style coords need units
	obj.style.top = top + 'px';
	obj.style.visibility = "visible"; //make it visible
}
