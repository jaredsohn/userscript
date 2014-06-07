// ==UserScript==
// @name           Geocaching.com - Log Image Thumbnails v1.0
// @namespace      raverave.imgthumbs
// @description    Display Img Thumbnails in logs
// @include        http://www.geocaching.com/*
// ==/UserScript==

var ThumbHeight = "150"			// Height and width of the thumbnails in pixels.
var ThumbWidth = "180"		
var ThumbSpacing = "5"				// Number of pixels to space out images by.
var ThumbBrColor = "#AAAAAA" 	// Hex code for color of thumb nail borders








//------< Nothing editable below here >-----


MakeThumbs()

function MakeThumbs()
{

	var AllImgs = document.getElementsByClassName("tb_images lnk")
	if (AllImgs.length != 0) {
		for(var i in AllImgs)
		{
			var x = AllImgs.item(i);
			var TheTableNode = x.parentNode
			var BrsToDel = TheTableNode.getElementsByTagName('br')
			var Brs = BrsToDel[0]
	
			var BrParent = Brs.parentNode
			BrParent.removeChild(Brs)
	
	
			var imgSrcUrl = x.href;
			var imgSpan = x.getElementsByTagName('span')
			var imgTitle = imgSpan.item(0).innerHTML
			x.title='';
			x.setAttribute("rel", "none");
			x.innerHTML='<img src="' + imgSrcUrl +'" title="' + imgTitle + '" style="padding:' + ThumbSpacing + 'px; border: 1px ' + ThumbBrColor + ' solid;" width="' + ThumbWidth + '" height="' + ThumbHeight + '">';
		}

		var AllImgs = document.getElementsByClassName("tb_images lnk")

		while (AllImgs.length) {
  	AllImgs[0].setAttribute("class", "rd_images lnk")   
		}
	}
}