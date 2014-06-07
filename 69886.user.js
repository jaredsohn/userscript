// ==UserScript==
// @name Unveil
// @namespace shaldengeki
// @description  Detects images that have been altered by Imbue.
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @include http://links.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://boards.endoftheinter.net/*
// @include https://links.endoftheinter.net/*
// @include http://archives.endoftheinter.net/*

// ==/UserScript==

function gup( name )
{
  //returns request array value indexed with name.
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results === null ) {
    return "";
  } else {
    return results[1];
  }
}

function CheckImbued() {
	//check to see if any images on the page are imbued.
	if (document.getElementsByClassName("img-placeholder").length > 0) {
		//request external site.
		var board = gup('board');
		var topic = gup('topic');
		var page = gup('page');
		if (page == "") {
			page = 1;
		}
		
	  // Open a connection to the server
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://llanimu.ath.cx/unveil.php?board=" + escape(board) + "&topic=" + escape(topic) + "&page=" + escape(page),
			onload: function(responseDetails) {
				updatePage(responseDetails);
			}
		});
	}
}

function updatePage(responseDetails) {
	//prepare response as array.
	var response = responseDetails.responseText;
	var as=document.getElementById("u0_1").getElementsByTagName("a");
	var page_images = response.split(";");
	var image_array = [];
	var this_image = "";
	var imgsrc = "";
	var j = 0;
	var i = 0;
	
	for (i in page_images) {
		this_image = page_images[i].split(",");
		image_array[i] = [this_image[0], this_image[1]];
	}
	
	//this is terrible i know ugh pending better way to do this
	for (i=0; i<as.length; i++) {
		imgsrc = as[i].getAttribute("href");
		for (j=0; j<image_array.length; j++) {
			if (imgsrc == image_array[j][0] && image_array[j][1] == "y" && as[i].innerHTML.slice(as[i].innerHTML.length-3) != "png") {
				var sp=document.createElement("span");
				sp.innerHTML="<a href='http://llanimu.ath.cx/unveil.php?unveil=" + escape(imgsrc) + "'>[Unveil imbued image]</a>";
				as[i].parentNode.insertBefore(sp,as[i].nextSibling);
			}		
		}
	}
}

CheckImbued();
document.addEventListener("DOMNodeInserted", CheckImbued, false);