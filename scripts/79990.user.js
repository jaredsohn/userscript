// ==UserScript==
// @name           BGS Forums Image Enabler
// @namespace      http://userscripts.org/users/161086
// @description    Displays links to images as actual images on the forums, bypassing the restruictions on images in posts.
// @include        http://forums.bethsoft.com/*
// @include        http://www.forums.bethsoft.com/*
// ==/UserScript==
// By Argomirr

function getIMGWidth(imgSrc){
	var newImg = new Image();
	newImg.src = imgSrc;
	var width = newImg.width;
	return width;
}

function importImages(){
	var maxWidth = 768;		// RResizes images wider than the specified value. Change to something more to your likings if you find the images too small/large.
	
	var idCount = 0;	// Currently not used, but will be implemented later
	var links = document.getElementsByTagName("a");
	if(links != null){
		for(i=0;i<links.length;i++){
			var link = links[i];
			var temp = link.href;
			var text = link.innerHTML;
			temp = temp.toLowerCase();
			temp = temp.slice(-4);
			if(temp == '.jpg' || temp == '.png' || temp == '.gif'|| temp == '.bmp' || temp == '.svg'){
				if(getIMGWidth(link) > maxWidth){
					link.innerHTML = '<img src="' + link.href + '" width="' + maxWidth + '" id="img' + idCount + '" title="' + text + '">';
					idCount = idCount + 1;
				}
				else{
					link.innerHTML = '<img src="' + link.href + '" id="img' + idCount + '" title="' + text + '">';
					idCount = idCount + 1;
				}					
			}
		}
	}
}

function insertCredits(){
	footer = document.getElementById("copyright");
	footer.innerHTML = footer.innerHTML + "<br>BGS Forum Image Enabler script for Greasemonky by <a href=http://forums.bethsoft.com/index.php?/user/541071-argomirr/'>Argomirr</a><br>Thanks for using!";
}

importImages();
insertCredits();