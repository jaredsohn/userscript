// ==UserScript==
// @name          LazyBrowser v1.2
// @description	  Opens links without clicking. Hovering the mouse over a link displays a button. Moving mouse over the button will open the link.
// @namespace     http://teejee2008.wordpress.com/tools/
// @include       *

// Inspired by NoClick and NoClick2 (http://www.bin-co.com/)
// ==/UserScript==

(function() {

	var ancs = document.getElementsByTagName('a');
	var hoverTimer = -1;
	var imageTimer = -1;
	var imageAdded = 0;
	var anchorTitle = "";
	var urlNext = "";
	var mouseX, mouseY;
	var stop = 0;

	// loop through links
	for(var i=0; i<ancs.length; i++) {
		var elem = ancs[i];
		elem.addEventListener("mouseover", link_mouseover, true);
	}

	function link_mouseover(event)
	{
		if (stop == 1) { return; }

		var elem = this;
		urlNext = elem.href;//.substring(elem.href.indexOf('#')+1);
		mouseX = event.pageX;
		mouseY = event.pageY;

		elem.title = ""; // suppress anchor tooltip

		clearTimeout(hoverTimer);
		hoverTimer = setTimeout(link_hover_timeout, 500);
	}

	function link_hover_timeout() 
	{
		show_image();
	}

	function show_image() 
	{
		var imgNext;
		var imgPrev;

		if (imageAdded == 0) 
		{
			imgNext = document.createElement("img");
			imgNext.setAttribute("id", "hoverImageNext");
			imgNext.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Go-next.svg/48px-Go-next.svg.png';
			imgNext.width = 48;
			imgNext.height = 48;
			imgNext.alt = 'Next';
		    imgNext.style.position='absolute';
			imgNext.style.visibility = 'hidden';
			imgNext.style.opacity = 0.7; 
			document.body.appendChild(imgNext);

			imgPrev = document.createElement("img");
			imgPrev.setAttribute("id", "hoverImagePrev");
			imgPrev.src = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Go-previous.svg/48px-Go-previous.svg.png';
			imgPrev.width = 48;
			imgPrev.height = 48;
			imgPrev.alt = 'Next';
		    imgPrev.style.position='absolute';
			imgPrev.style.visibility = 'hidden';
			imgPrev.style.opacity = 0.7; 
			document.body.appendChild(imgPrev);

			imageAdded = 1;
		}
		else
		{
			imgNext = document.getElementById("hoverImageNext");
			imgPrev = document.getElementById("hoverImagePrev");
		}

		// hide images for javascript anchors
		if (urlNext.indexOf("javascript:") == -1)
		{
			imgNext.style.left = (mouseX+10) + 'px';
			imgNext.style.top = (mouseY-48-20) + 'px';
			imgNext.style.zIndex = 1000;
			imgNext.style.visibility = 'visible'; //show image	
	
			if (window.history.length > 0)
			{
				imgPrev.style.left = (mouseX-10-48) + 'px';
				imgPrev.style.top = (mouseY-48-20) + 'px';
				imgPrev.style.zIndex = 1000;
				imgPrev.style.visibility = 'visible'; //show image
			}

			// hide after 1 sec
			imageTimer = setTimeout(image_timeout, 1000);

			// open link on mouseover
			imgNext.addEventListener("mouseover", go_next, true);
			imgPrev.addEventListener("mouseover", go_prev, true);
		}
	}

	function image_timeout() 
	{
		document.getElementById("hoverImageNext").style.visibility = 'hidden'; // hide the image
		document.getElementById("hoverImagePrev").style.visibility = 'hidden'; // hide the image
	}

	function go_next() 
	{
		clearTimeout(imageTimer); // clear timeout
		document.getElementById("hoverImageNext").style.visibility = 'hidden'; // hide the image
		document.getElementById("hoverImagePrev").style.visibility = 'hidden'; // hide the image
		document.location = urlNext; // go to next page
	}

	function go_prev() 
	{
		clearTimeout(imageTimer); // clear timeout
		document.getElementById("hoverImageNext").style.visibility = 'hidden'; // hide the image
		document.getElementById("hoverImagePrev").style.visibility = 'hidden'; // hide the image
		window.history.back(); // go to prev page
	}
})();
