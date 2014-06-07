// ==UserScript==
// @name Naruto-Boards Greasescript
// @namespace http://userscripts.org/users/142878
// @description This script alters the layout of Naruto-Boards.com and adds some nice features
// @include http://www.naruto-boards.com*
// ==/UserScript==
GM_addStyle(" \
body { \
	width: auto; \
	color: #ffffff; \
	background-color: #1d1d1d; \
	margin: 0px 0px; \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/nb-background.png\"); \
} \
#innerBody { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/nb-background-extra.png\"); \
	background-repeat: repeat-x; !important \
} \
#layout { \
	width: 775px; \
	color: #000000; \
	background-color: #1d1d1d; \
	margin: 10px auto; !important \
} \
#top { \
	height: 178px; \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topbanner.png\"); !important \
} \
#controlpanel_top { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topbox_controlpanel.jpg\"); !important \
} \
#forumactivity_top { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topbox_forumactivity.jpg\"); !important \
} \
#newtopics_top { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topbox_newtopics.jpg\"); !important \
} \
div.boxleft { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topbox_left.jpg\"); !important \
} \
div.boxright { \
	width: 0px; \
	background-image: none; \
	display: none; !important \
} \
ul.quickbox li { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/topinfo_list.gif\"); \
} \
div.contenttop { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/content_top.jpg\"); !important \
} \
div.inlineheader { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/backgroundpattern_3.gif\"); !important \
} \
div.header { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/backgroundpattern_3.gif\"); !important \
} \
input.border { \
	background-color: #c69628; \
} \
textarea.border { \
	background-color: #c69628; \
} \
#help { \
	color: #ffffff; \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/bottom.jpg\"); !important \
} \
#footer { \
	background-image: url(\"http://i224.photobucket.com/albums/dd68/Sierra_Leon/footer.jpg\"); !important \
} \
");

// Add a div for the gradient in the background
var newDiv = document.createElement('div'); 
newDiv.setAttribute('id','innerBody'); 
var bodyChildren = document.body.childNodes;
for (var i = bodyChildren.length - 1; i >= 0; i--) {
	var bodyChild = bodyChildren[i]; 
	//alert('test '+bodyChildren.length); 
	newDiv.appendChild(bodyChild); 
	//document.body.removeChild(bodyChild); 	
}
document.body.appendChild(newDiv);

// Replace the navigation buttons
var topnav = document.getElementById('topnav'); 
var navlinks = topnav.getElementsByTagName('a'); 
for (var i = navlinks.length - 1; i >= 0; i--) {
	var navbuttons = navlinks[i].getElementsByTagName('img'); 
	if(navbuttons.length > 0) {
		var linktitle = navlinks[i].getAttribute('title'); 
		if(linktitle == 'Homepage') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation_002.gif'; 
		}
		else if(linktitle == 'Register') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation.gif'; 
		}
		else if(linktitle == 'Forum rules') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation_003.gif'; 
		}
		else if(linktitle == 'Lost Password') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation_005.gif'; 
		}
		else if(linktitle == 'Forum FAQ') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation_004.gif'; 
		}
		else if(linktitle == 'Sitemap') {
			navbuttons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/navigation_006.gif'; 
		}
	}
}

// Replace the 'View Todays Replies/Topics' icons
var boxrightArray = document.getElementsByClassName('bottomlink');
for (var i = boxrightArray.length - 1; i >= 0; i--) {
	var topinfoicons = boxrightArray[i].getElementsByTagName('img'); 
	if(topinfoicons.length > 0) {
		topinfoicons[0].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/topinfo_icon.gif'; 
	}
}

// Replace the breadcrumb icons
var breadcrumbs = document.getElementsByClassName('breadcrumb');
for (var i = breadcrumbs.length - 1; i >= 0; i--) {
	var breadcrumbicons = breadcrumbs[i].getElementsByTagName('img'); 
	for (var j = breadcrumbicons.length - 1; j >= 0; j--) {
		breadcrumbicons[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/breadcrumb_icon.gif'; 
	}
}

// Replace the 'New Topic' button
var maxTable = document.getElementsByClassName('max'); 
for (var i = maxTable.length - 1; i >= 0; i--) {
	var maxImages = maxTable[i].getElementsByTagName('img'); 
	for (var j = maxImages.length - 1; j >= 0; j--) {
		var imageSrc = maxImages[i].src; 
		imageSrc = imageSrc.substring(imageSrc.length-19); 
		if(imageSrc == 'button_newtopic.gif') {
			maxImages[i].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/button_newtopic.gif'; 
		}
	}
}

// Replace the 'Quote, 'PM', 'Edit', 'Delete' and 'Move' buttons
var replyHeader = document.getElementsByClassName('replyheader'); 
for (var i = replyHeader.length - 1; i >= 0; i--) {
	var replyImages = replyHeader[i].getElementsByTagName('img'); 
	for (var j = replyImages.length - 1; j >= 0; j--) {
		var imageSrc = replyImages[j].src; 
		if(imageSrc.substring(imageSrc.length-14) == 'post_quote.gif') {
			replyImages[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/post_quote.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-11) == 'post_pm.gif') {
			replyImages[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/post_pm.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-13) == 'post_edit.gif') {
			replyImages[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/post_edit.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-15) == 'post_delete.gif') {
			replyImages[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/post_delete.gif'; 
		}
		else if(imageSrc.substring(imageSrc.length-14) == 'topic_move.gif') {
			replyImages[j].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/topic_move.gif'; 
		}
	}
}

// Remove the War of Ninja popup
var wonpopup = document.getElementById('popup');  
if(wonpopup) {
	wonpopup.parentNode.removeChild(wonpopup);
}

// Remove the animemanga banner
var centerads = document.getElementsByTagName('center');  
for (var i = centerads.length - 1; i >= 0; i--) {
	var centerscripts = centerads[i].getElementsByTagName('script'); 
	if(centerscripts.length > 0) {
		centerads[i].parentNode.removeChild(centerads[i]);
	}
}

// Replace the icons in the legend
var helpDiv = document.getElementById('help');
var legendIcons = helpDiv.getElementsByTagName('img'); 
for (var i = legendIcons.length - 1; i >= 0; i--) {
	var linkSrc = legendIcons[i].src; 
	linkSrc = linkSrc.substring(linkSrc.length-14); 
	if(linkSrc == 'legend_new.gif') {
		legendIcons[i].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/legend_new.gif'; 
	}
	else if(linkSrc == 'legend_old.gif') {
		legendIcons[i].src = 'http://i224.photobucket.com/albums/dd68/Sierra_Leon/legend_old.gif'; 
	}
}
