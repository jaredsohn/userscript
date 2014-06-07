// ==UserScript==
// @name           What Would Tyler Durden Lightbox?
// @namespace      http://www.lmnopc.com/greasemonkey/
// @description    Gives images at wwtdd.com the lightbox treatment
// @include        http://wwtdd.com/*
// @include			http://*.wwtdd.com/*
// @exclude			http://cdn.wwtdd.com/*
// @exclude			*.yieldmanager.com/*
// ==/UserScript==

/*

	Greasemonkey Script (C)2008 Thom Wetzel
	LightWeightBox courtesy of Thom Shannon

	2008-11-29 : Initial release
	2008-11-30 : Quick and dirty resize fix for images that are too tall/wide to be displayed
					 Roughted in some code that discovers all the images in a photoset and stores them into an array but ran out of time to do the next/prev buttons
	2008-12-02 : Clicking on the background closes the lightbox
					 Got next/previous buttons working
	2008-12-03 : updatePostPhotos was improved so it just shows photos in the current set instead of all of them on the front page
					 Updated next/prev buttons so they appear/disappear when at the beginning and end of a photo set
	2008-12-04 : Fixed the spelling of "Durden"
	2008-12-04 : Figures.  Today's shots are using a tricksy new naming scheme. Added support for TT but the Kate Winslet post would need an httprequest to work.  :(

	TODO: Clean up code and make sure it's not going to leak memory like a sieve.  I'm threw together some pretty shitty code here, but it works.  :)

*/


	// grab start time of script
	var benchmarkTimer = null;
	var scriptStartTime = getTime();

	// UTILITY FUNCTIONS
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }


/*
LightWeightBox - Thom Shannon
http://www.ts0.com
V 1.0 2006
BSD License
*/

var LightWeightBoxOn=false;
var LightWeightBox = function(ele){
	this.ele = ele;
	this.backgroundColor = '#CCC';
	this.opacity = 0.5;

	this.nextButton = null;
	this.prevButton = null;

	this.currentImageIndex = -1;
}
with (LightWeightBox){
	prototype.Render = function()
	{
		if (!LightWeightBoxOn)
		{
			bgDiv = document.createElement('div');
			bgDiv.innerHTML = ''
			bgDiv.style.backgroundColor = this.backgroundColor;
			bgDiv.style.position='fixed';
			bgDiv.style.height='100%';
			bgDiv.style.width='100%';
			bgDiv.style.top=0;
			bgDiv.style.left='0';
			bgDiv.style.opacity=this.opacity;
			bgDiv.id = 'lightbox-background';
			this.ele.style.position='fixed';
			this.bgDiv=bgDiv;

			lbNext = document.createElement('div');
			lbNext.id = 'wwtdl-next';
			lbNext.innerHTML = '&nbsp;';
			lbNext.style.position = 'fixed';
			lbNext.style.zIndex = '9999';
			lbNext.style.top = '0';
			lbNext.style.right = '0';
			lbNext.style.height = window.innerHeight + 'px';
			lbNext.style.width = '50px';
			lbNext.style.cursor = 'pointer';
			lbNext.style.background = 'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAQAAABlTHGBAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfYAhQOFBKVis8tAAAAB3RJTUUH2AIUDiIewCHxAwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAoRJREFUeNq1V01PE1EUPZ3SaWntDMZiLWkxSmygatAgIUESEj8SRYhuUEmwmK6tCxfu3biw%2FAB3GtMKagIbMdqgbkyMaxMXLkjUSBd%2BgR%2BpTNO5vjcztXwMTWlfzyzaeZ2c03vunfvuA2qB1H5bWfJSCyl%2FlWf9oZo4Noe6x%2F8DVL48WvuIQPqk4v3JaWN0gybplCEh64cmhAmEH3PKa6QRh05pamL3blESD%2BVmDXSMilTGtCHh0Q9cEiAw1O9gZPdpLabJaUj01i9xZpQb9JLWI2NFUbdEspMTpWgjHlm5OFyvRPN3UJA%2B2khMkUuERDjJ%2Fe6kzzYSD8REEcryPHTZSmSsKGIXSk87Sl96AttOv1dyv6uR2JH61gp0YR5tG36bwRg0uCkaf5v%2Bv9g90PLBRdjyZR%2FFDMlGFAfHLfpgQta3Tl6SWNxUQtZ3jzGLBqOv32lOF67iHNQaMrITQZvVWVxkRjUVjkYQfAWSaI5EI21EqDyFugIaYU1LNHSj0%2FrzUlEGBsvFJAwOnOQfHkk89WrokCQNeMHsEg1ClgvkEWJJdtCs8BzcM5IcyDqGo1lWpjKuYKimMt2FsM1qGpdRhFw4G2E3%2BxLuml%2B0%2FZSzLVGn8aKZeWboG1AWZMH0Hr1v3KwmC8OBT8cXlF9aNbaoqWXW7GJ4zgxajwwmmDke6o6%2FSVfDZYPtc%2BbYsljh39exdYaTUiPpAS%2FbMkMVva%2BL3tz0J23oM2JGl%2FPG2DLfKHog3sOJ7jSKnnUYycvaey8V1tALGrpMtE1xkxKUt7r%2BXYv%2BiKj5elT2feUSHXSdbtIJ84Qgjt6QiPhzqxuGa0XoAcTE3lvqF58eIN%2Bf1ieJikeofx4J29e4%2FTJHAAAAAElFTkSuQmCC) 0 50% no-repeat';
			this.nextButton = lbNext;

			lbPrev = document.createElement('div');
			lbPrev.id = 'wwtdl-prev';
			lbPrev.innerHTML = '&nbsp;';
			lbPrev.style.position = 'fixed';
			lbPrev.style.zIndex = '9999';
			lbPrev.style.top = '0';
			lbPrev.style.left = '0';
			lbPrev.style.height = window.innerHeight + 'px';
			lbPrev.style.width = '50px';
			lbPrev.style.cursor = 'pointer';
			lbPrev.style.background = 'transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAQAAABlTHGBAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfYAhQOFBKVis8tAAAAB3RJTUUH2AIUDiEzrtP%2BtQAAAAlwSFlzAAAK8AAACvABQqw0mAAAAotJREFUeNqtl01oE0EUx99uutPYmE3FyrLSRqwoNVpUtBRLoaCtiJKDQhQxtZB7LoLevXjQnsSDN2toTVXwA9qqxY9LPXrwouBB0GpSTfxIUNJszT5nZlPSNGva7s5%2FYIdswu%2F%2Fdt7svBeAOurR1afqfDM2oforeANkEKtg2GsAVob%2FZ2CrQPzeIWIy7FEcxksY4hZN%2BbgqDN9I8Q04iiYyGXieW7ROCMHvHvRy%2FDhWVMJD1GCdcZe4xndxvKcKz3SbGkh4rEcIvgHHcLle8kU6HnGF3zdorf09rNVVZN%2FEO1zjFUza4D%2BhxnLwQ0D0d2zwX7ADWV5a447xodNW9GO2%2BJ18%2FfXptXMla%2BqMvk8UJQJJOFnzkxT0wzs6b8x8v7AapL5%2BR%2F7349fZJbc6oyx6gvfrRL%2B2oWDzxz29ZfyWM%2BS%2F%2BJQjvDWIqcXoEvVpr2b%2FKgTG4YTN436Fbw7ymYOHcA0WgJQOhkB9wtxGUbQmUaZcbQb8BXZimsINTAxTg0BRBi%2FAwOJmEigJ%2Bui1RGRTOLraRjYLANM0DaKF8IJeZQNaGB0TwnPwgB7t9N2fkSLao1lD8cAIRG3i%2BAxzDqLPwRRcB4Nu0yMh9nmA8AJjt1XTuMvxi9Zobo%2BVHbujXsEWBNUP3b1WmssWbxLzkgduwdmaB56Dw%2FCWzoFMblWHnZ%2B059ueT2SX3V6sxHZPkSq3LRsmXW2slS1kNwVnJYs06qz1clMyl1rY1bVh90W%2FvsUznodT7tqWehY3edk%2Ft9%2B1gX3ztYBdLAdFFNPEHxiyLEbKlaKAMb5Am5NC8BULwH68jBdxG8f7shH3rW9FwbBSrPoDko60CcQzxfRNU74%2FLegzA5n2K84Y%2FwCVh%2BPsRzrSLQAAAABJRU5ErkJggg%3D%3D) 0 50% no-repeat';
			this.prevButton = lbPrev;

			document.body.appendChild(this.nextButton);
			document.body.appendChild(this.prevButton);

			document.body.appendChild(this.bgDiv);
			document.body.appendChild(this.ele);

			this.CheckSize();
			LightWeightBoxOn = true;
			var oSelf=this;
			this.sizeCheck = setInterval(function(){oSelf.CheckSize();}, 50);

			this.updateButtonVisibility();
		}
	}
	prototype.CheckSize = function()
	{
		// Make sure the image fits inside the client area of the browser
		if ((this.ele.offsetHeight > window.innerHeight) || (this.ele.offsetWidth > window.innerWidth))
		{
			var targetRatio = window.innerWidth / window.innerHeight;
			var currentRatio = this.ele.offsetWidth / this.ele.offsetHeight;

			if (currentRatio > targetRatio)
			{
				this.ele.getElementsByTagName('img')[0].width = window.innerWidth;
				this.ele.style.width = window.innerWidth;
			}
			else
			{
				this.ele.getElementsByTagName('img')[0].height = window.innerHeight;
				this.ele.style.height = window.innerHeight;
			}
		}

		if (this.ele.offsetHeight != this.currentHeight)
		{
			this.offsetTop = (self.innerHeight/2)-(this.ele.offsetHeight/2);
			this.ele.style.top = this.offsetTop+'px';
			this.currentHeight=this.ele.offsetHeight;
		}
		if (this.ele.offsetWidth != this.currentWidth)
		{
			this.offsetLeft = (self.innerWidth/2)-(this.ele.offsetWidth/2);
			this.ele.style.left = this.offsetLeft+'px';
			this.currentWidth=this.ele.offsetWidth;
		}
	}

	prototype.updateButtonVisibility = function()
	{
		// Hide/show next button
		this.prevButton.style.visibility = (this.currentImageIndex <= 0) ? 'hidden' : '';
		this.nextButton.style.visibility = (this.currentImageIndex >= postPhotos.length - 1) ? 'hidden' : '';
	}


	prototype.ShowNext = function(oSelf)
	{
		if (oSelf.currentImageIndex >= postPhotos.length - 1)
		{
			return;
		}

		oSelf.ele.innerHTML = '<img src="' + postPhotos[++oSelf.currentImageIndex] + '" border="0" id="lightbox-image" title="Click image to close" />';

		oSelf.updateButtonVisibility();

	}

	prototype.ShowPrev = function(oSelf)
	{
		if (oSelf.currentImageIndex <= 0)
		{
			return;
		}

		oSelf.ele.innerHTML = '<img src="' + postPhotos[--oSelf.currentImageIndex] + '" border="0" id="lightbox-image" title="Click image to close" />';

		oSelf.updateButtonVisibility();
	}

	prototype.Close=function(oSelf)
	{
		// Kill the interval timer
		clearInterval(oSelf.sizeCheck);

		document.body.removeChild(oSelf.bgDiv);
		document.body.removeChild(oSelf.ele);

		document.body.removeChild(oSelf.nextButton);
		document.body.removeChild(oSelf.prevButton);

		LightWeightBoxOn = false;
	}
}


	var postPhotos = Array();

	function updatePostPhotos(someElement)
	{
		// Clear contents of postPhotos
		postPhotos = Array();

		// Walk up DOM tree until a div with the classname 'post-photos' is found
		var dad = someElement.parentNode;
		while (dad != null)
		{
			if (String(dad.className).indexOf('post-photos') != -1)
			{
				break;
			}
			dad = dad.parentNode;
		}

		if (dad == null)
		{
			return;
		}

		// Populate postPhotos
		var as = dad.getElementsByTagName('a');
		for (var i = 0; i < as.length; i++)
		{
			var imgs = as[i].getElementsByTagName('img');
			if (imgs.length == 1)
			{
				postPhotos.push(getFilenameFromThumbnailName(imgs[0].getAttribute('src')));
			}
		}
	}


	function getFilenameFromThumbnailName(filename)
	{
		// Convert thumbnail filename to real deal
		var str = String(filename).split('.jpg')[0];

		// kills the 't' at the end of the filename
		while ((str.substr(-1) == 't') || (str.substr(-1) == 'T'))
		{
			str = str.substr(0, str.length - 1);
		}

		// for cases where thumbnail suffix had been 'rt'
		while ((str.substr(-1) == 'r') || (str.substr(-1) == 'R'))
		{
			str = str.substr(0, str.length - 1);
		}

		str += '.jpg';

		return str;
	}


	function wwtddPop(e)
	{
		if (!e) { var e = window.event; }

		// stop event from bubbling up
		e.stopPropagation();
		e.preventDefault();

		// Make sure src exists
		if (e.target.getAttribute('src') == null)
		{
			return;
		}

		// Convert thumbnail filename to real deal
		var imgSrc = getFilenameFromThumbnailName(e.target.getAttribute('src'));

		// create a block element of some kind
		boxEle = document.createElement('div');

		// style it up with a class or inline
		boxEle.className = 'popup';
		boxEle.id = 'lightbox-container';

		// fill it with content
		boxEle.innerHTML = '<img src="' + imgSrc + '" border="0" id="lightbox-image" title="Click image to close" />';

		// Update array containing all the photos in this photo set
		updatePostPhotos(e.target);

		// create box with block element
		var lwBox = new LightWeightBox(boxEle);

		lwBox.currentImageIndex = postPhotos.indexOf(imgSrc);

		// optional bg color and opacity
		lwBox.backgroundColor = '#000'
		lwBox.opacity = 0.6

		// render it!
		lwBox.Render();

		// Add event listeners
		document.getElementById('wwtdl-next').addEventListener('click', function() { lwBox.ShowNext(lwBox); return false; }, true);
		document.getElementById('wwtdl-prev').addEventListener('click', function() { lwBox.ShowPrev(lwBox); return false; }, true);
		document.getElementById('lightbox-container').addEventListener('click', function() { lwBox.Close(lwBox); return false; }, true);
		document.getElementById('lightbox-background').addEventListener('click', function() { lwBox.Close(lwBox); return false; }, true);
	}

	// Find all of the thumbnail links on the page
	var items = document.evaluate("//a/img[contains(@src, 'http://cdn.wwtdd.com/ul/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (item = null, i = 0; item = items.snapshotItem(i); i++)
	{
		item.addEventListener('click', wwtddPop, true);
	}

	// log execution time
	if (GM_log)
	{
		GM_log((getTime() - scriptStartTime) + 'ms');
	}
