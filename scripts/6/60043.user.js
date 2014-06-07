// ==UserScript==
// @name           Photographers Guild
// @author         Stephen Walker
// @description    Provide a downloadable link of pictures hosted on the photographers guild website.
// @include        http://www.photoguildclients.com/pickpic/gallery/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js
// ==/UserScript==


		imageWidth = 500;
		imageHeight = 900;
		
function protectOff() {
  if (byId("loupeDiv") && byId("loupeDiv").style.visibility == "visible") return;
  if (byId("scrollDiv") && byId("scrollDiv").style.visibility == "visible") return;
	var protectDiv = byId("protect");
  var cPic = byId("cPic");
	var pic = byId("pic");
  if (cPic) {
    if (pic) {
      protectDiv.style.width = pic.width+"px";
      protectDiv.style.height = pic.height+"px";
    }
    else {
      pic = byId("picDiv");
      protectDiv.style.width = pic.style.width;
      protectDiv.style.height = pic.style.height;
    }
  }
  if (protectDiv) {
    protectDiv.style.visibility = "visible";
  }
}

function protectOn() {
	var pDiv = byId("protect");
	if (pDiv) pDiv.style.visibility = "hidden";
}
