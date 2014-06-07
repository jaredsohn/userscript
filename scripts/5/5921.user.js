// ImageFAP Clean Image Page
// Created: 16 Oct 2006
// Version : 0.4
// Copyright (c) 2006, nickp

// ==UserScript==
// @name          ImageFAP Clean Image Page
// @namespace     http://
// @description   Clean up the ImageFap image page so only navigation and image show
// @include       http://www.imagefap.com/image.php?*
// ==/UserScript==

//Changelog:
//*version 0.4 (16/10/06): 
//		* Floated the navigation on the right, so it's still
//			available after scrolling and doesn't overlap image to much
//*version 0.3 (11/10/06): 
//		* Removed size attributes from <img> tagas image was sometimes
//			showing incorrectly sized
//*version 0.2 (10/10/06): 
//		* Tidied code
//		* Added galery link
//*version 0.1 (09/10/06): first release


    
(function() {
	
	var cleanImage = function() {
		var links = new Array();
		links[0] = '';
		links[1] = '';
		links[2] = '';
		var newDoc = '';
		var img = '';
	
		var hrefs = document.getElementsByTagName("a");
		var imgs = document.getElementsByTagName("img");

		for (j=0; j < hrefs.length; j++) {
			if (hrefs[j].href.indexOf('image.php?id=')!=-1){
				if (hrefs[j].parentNode.innerHTML.indexOf('Previous')!=-1){
					links[0] = '<a href="'+hrefs[j].href+'">Previous Image</a>';
				}else if (hrefs[j].parentNode.innerHTML.indexOf('Next')!=-1){
					links[1] = '<a href="'+hrefs[j].href+'">Next Image</a>';
				}
			}else if (hrefs[j].href.indexOf('gallery.php?gid=')!=-1){
				links[2] = 'Gallery: <a href="'+hrefs[j].href+'">'+hrefs[j].innerHTML.substr(20,hrefs[j].innerHTML.length - 7)+'</a>';
			}
		}
		for (j=0; j < imgs.length; j++) {
			if (imgs[j].src.indexOf('http://images.imagefap.com/images/full/')!=-1){
				img = '<img src="'+imgs[j].src+'">';
				break;
			}
		}	

		var catWid = Math.round(((links[2].length*2.5)+20));
		newDoc += '<div id="nav" style="position:absolute; top:0px; left:0px;"><table><tr>';
		if (links[0].length > 0) newDoc += '<td align="center" bgcolor="#dddddd" height="20" width="150"><strong>'+links[0]+'</strong></td>';
		if (links[1].length > 0) newDoc += '<td align="center" bgcolor="#dddddd" height="20" width="150"><strong>'+links[1]+'</strong></td>';
		if (links[2].length > 0) newDoc += '<td align="center" bgcolor="#dddddd" height="20" width="'+catWid+'"><strong>'+links[2]+'</strong></td>';
		newDoc += '</tr></table></div>';
		newDoc += img;

		document.body.innerHTML = newDoc;
		function floatNav(){
			var objNav = document.getElementById('nav').style;
			var objY = parseInt(objNav.top);
			var objX= parseInt(objNav.left);
			var pY = document.body.scrollTop;
			var pR = (document.body.scrollLeft + window.innerWidth - document.getElementById('nav').offsetWidth)-20;
			objNav.top = objY + (pY - objY)/8;
			objNav.left = objX + (pR - objX)/8;
			setTimeout(floatNav,10);
		}
		document.getElementById('nav').style.left = parseInt(document.getElementById('nav').style.left) + ((document.body.scrollLeft + window.innerWidth - document.getElementById('nav').offsetWidth) - parseInt(document.getElementById('nav').style.left) - 20);
		floatNav();
	}

	cleanImage();
  
})();