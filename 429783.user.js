/*

TradeMe ThumbViewer


//Shows thumbnails for all listings in TradeMe

 Version 0.10 (26 March 2014 21:00 NZST)
 Lastest version available from: http://userscripts.org/scripts/show/429756
 Author: bwatson
 Contact: bruce.corporatecare@gmail.com
 Licence: Free, as in beer
 Gui: {333eb056-63c4-4e4b-9589-85a0d46d22b0}


// Risks
Risks of using this software:
	- Your incoming traffic may slightly increase because more pictures are loaded.
	- This software may slow down the loading of TradeMe listings pages.
	- You might forget that other people don't have this script, so may under-promote your auction.
	- TradeMe may change its site without notice, rendering this script useless.

Changes:
	- v0.10 Script updated to work with changes to TradeMe as of 26/03/2014
        - v0.09 Fixed again November 2012. Only structure of the listing pages changed, and slight change in item name. Also shortened mouseover time.
	- v0.08 Sorry about the vary slow update!!! Should work with new trademe. I'm not sure what I was doing wrong.
	- v0.07 Fixed snippets.
	- v0.06 Updated image folder. Prior versions will not work.
	- v0.05 Displays an enlarged image when the mouse hovers over a thumbnail
	- v0.04 Now adds snippets of information about items.
	- v0.04 Uses maxHeight and maxWidth styles to confine picture to 85x64px
	- v0.03 Remove an unneeded loop!
	- v0.02 Made the User-agent the same as the browser.
	- v0.02 Exits search for images once first thumbnail has been found	.
	- v0.02 Exits search for images once matching icon is found.
	- v0.02 Changed some variable names to make more sense.
*/

// ==UserScript==
// @name           TradeMe ThumbViewer
// @include        http://www.trademe.co.nz/*
// @description    Show thumbnails for all listings in TradeMe
// @grant	       GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant		   GM_log
// ==/UserScript==

//This allows you to turn off unnecessary features
var showThumbs=true;
var showSnippets=true;
var showZoom=true;

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
	"//img[@src='/images/NewSearchCards/LVIcons/hasPhoto_160x120.png']", //the name of the little camera icon
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
		GM_xmlhttpRequest({
			method: 'GET',
			url: thisImg.parentNode.href,
			headers:	{'User-agent': navigator.userAgent,
						'Accept':'text/html,text/xml,text/plain'},
			//once the page with the thumbnail is loaded, run this function
			onload: cbReplaceWithPhoto.bind( {specificIcon:thisImg})
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
	var targetstring="https://trademe.tmcdn.co.nz/photoserver/tq/";
	//turn the text into a dom object
	var itemDetailsPage = document.createElement('div');
	itemDetailsPage.innerHTML = rD.responseText;

	var itemDetailsImgs = itemDetailsPage.getElementsByTagName('img');

	//Go through all images on the item page, and find the one that looks like a thumbnail
	for (var e = 0; e < itemDetailsImgs.length; e++) {
		isthumbImg = itemDetailsImgs[e];

		if (isthumbImg.src.substring(0,targetstring.length)==targetstring) {
			replacementImg = document.createElement("img"); //replace it with this
	    	replacementImg.src = isthumbImg.src;
	    	replacementImg.style.maxHeight = "86px";
	    	replacementImg.style.maxWidth = "115px";
	    	replacementImg.setAttribute('thumbnailnumber', this.specificIcon.getAttribute('thumbnailnumber'));
	    	
	    	//Show the snippets
	    	
	    	if (showSnippets) {
	    		//listingTitle=this.specificIcon.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]; //previous
				listingTitle=this.specificIcon.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1];
				//what the above ugly bit of code does, is go from the IMG, to the A, to the DIV, to the DIV, to the LI, to the UL
				allDivs=itemDetailsPage.getElementsByTagName('div');
				informationText="This is a test";
  				
				for (var tablecount = 0; tablecount < allDivs.length; tablecount++) {
					if (allDivs[tablecount].id=='DetailsContentColumn') {
						informationText=allDivs[tablecount].textContent;
						tablecount=allDivs.length;
					}
				}
				
				
				if (informationText.length>3) {
					if (informationText.length>160) {informationText=informationText.substring(0,160)+"...";}
	    			listingTitle.innerHTML=listingTitle.innerHTML+"<span style=\"color: #888888;\"> &mdash; "+informationText.replace("<","&lt;")+"</span>";
				}
			}
			

			//replace the icon with the thumbnail
	    	if (showThumbs) {
				GM_log("Replace "+replacementImg.src+" into  "+this.specificIcon.src);
		    	this.specificIcon.parentNode.replaceChild(replacementImg, this.specificIcon);
		    	//this.specificIcon.parentNode.insertBefore(replacementImg, this.specificIcon);
		    	//GM_log("Removed: "+this.specificIcon.parentNode.removeChild(this.specificIcon));
				//GM_log("Replace2"+ this.specificIcon.parentNode.href);
				//this.specificIcon.width = replacementImg.width;
			}

			//This handles the tooltip-like zoom function
			if (showZoom) {
				//create DIVs that contain slightly larger versions of the image on hover
				var zoomDiv = document.createElement('div');
				zoomDiv.setAttribute('id', "enlargement" + replacementImg.getAttribute('thumbnailnumber'));
				zoomDiv.setAttribute('class', 'enlargement');
				zoomDiv.innerHTML="<img src='" + replacementImg.src + "'>";
				document.body.appendChild(zoomDiv);
	
				//When mouse goes over it starts a timer.
				replacementImg.addEventListener(
					'mouseover',
					function(event) {
						var x=event.pageX;
						var y=event.pageY
						var divId='enlargement' + this.getAttribute('thumbnailnumber');
						globalTimer = window.setTimeout( //after 600msec the pic will become visible
			   				function() { showPopupDiv(x, y, divId); },
							600);
					},
					true);
				//Hide image and reset timer once mouse moves out
				replacementImg.addEventListener('mouseout',
					function(event) {window.clearTimeout(globalTimer); document.getElementById('enlargement' + this.getAttribute('thumbnailnumber')).style.visibility = "hidden";},
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
	var left = triggerX - obj.offsetWidth -85;
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