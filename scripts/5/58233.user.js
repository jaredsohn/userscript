// ==UserScript==
// @name          Flicker Embed HTML on the Photo Page
// @author        Paul Russell- http://russelldad.blogspot.com
// @namespace     flickr.com
// @description   Adds embed html to the flickr photo or video page (just above the image tags) giving you instant access to the html you need to embed the medium size image on a blog or web page.
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*
// ==/UserScript==
// flickrimagelink.user.js - v1.2-2009.09.29 paul russell
//
// WHAT THIS SCRIPT DOES
// This script will embed a textbox containing the code to embed a medium sizr image
// or full size video
// just above the tags links on the right side of a photo's flickr page.
// It will make your flickr page look like this
// http://www.flickr.com/photos/russelldad/3944017715/
//
// ---------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hide Personalized Google Search Box", and click Uninstall.
// ---------------------------------------------------------------------



if ( document.getElementsByClassName('photo_gne_video_wrapper_div').length > 0 )
{
	insertVideoEmbed();
}
else
{
	insertPhotoEmbed();
}


function insertPhotoEmbed()
{
	//  this is the image element in the existing flickr page where all the image info comes from.
	var imageElement = document.getElementsByClassName('photoImgDiv')[0].getElementsByTagName('img')[0];	

	/*************************************************************************
	   this is where the text box containing the image link will be placed
	*************************************************************************/
	// this will put it jsut under the picture
	// var destination = document.getElementById('DiscussPhoto');
	// var textBoxWidth = '520';

	// this will put it just above the tags
	var destination = document.getElementsByClassName('TagList')[0];
	var textBoxWidth = '300';
	
	// Remove "by you." if it appears in the title of the image
	var imageTitle = imageElement.alt.replace(' by you.','');

	// this is the html that gets added to make the text box
	var linkText = '<h4>Embeddable Image HTML<p><textarea name="textfield" onFocus="this.select();" rows="5" style="width: ' + textBoxWidth + 'px;" wrap="virtual"><center><a href="' 
	               + location.href + '" title="' + imageTitle + '"><img src="' + imageElement.src + '" width="' + imageElement.width + '" height="' + imageElement.height + '" alt="' + imageTitle + '" border="0"/></a></center></textarea></p>';		
	
	// add the text box to the screen
	destination.innerHTML = linkText + destination.innerHTML;		
}

function insertVideoEmbed()
{
	
	
	/*************************************************************************
	   this is where the text box containing the image link will be placed
	*************************************************************************/
	// this will put it just above the tags
	var destination = document.getElementsByClassName('TagList')[0];
	var textBoxWidth = '300';
	
	//get the actual width and height of the video
	var realWidth = 'width="' + unsafeWindow.page_p.o_w + '"';
	var realHeight = 'height="' + unsafeWindow.page_p.o_h + '"';
	
	//var embedText = 'foo';
	//var embedText = document.getElementsByClassName('photo_gne_video_wrapper_div')[0].innerHTML;
	//var embedText = document.getElementById('SharingEmbedMarkup').innerHTML;
	
	var embedText = '<object type="application/x-shockwave-flash" width="400" height="300" data="http://www.flickr.com/apps/video/stewart.swf?v=71377" '
	              + 'classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"> <param name="flashvars" value="intl_lang=en-us&photo_secret=' + unsafeWindow.page_p.secret
				  + '&photo_id=' + unsafeWindow.page_photo_id + '"></param> <param name="movie" value="http://www.flickr.com/apps/video/stewart.swf?v=71377"></param> '
				  + '<param name="bgcolor" value="#000000"></param> <param name="allowFullScreen" value="true"></param><embed type="application/x-shockwave-flash" '
				  + 'src="http://www.flickr.com/apps/video/stewart.swf?v=71377" bgcolor="#000000" allowfullscreen="true" '
				  + 'flashvars="intl_lang=en-us&photo_secret=' + unsafeWindow.page_p.secret + '&photo_id=' + unsafeWindow.page_photo_id + '" height="300" width="400"></embed></object>';
	
	
	// replace the width and height with the real thing.
	embedText = embedText.replace(/width="\d+"/g, realWidth);
	embedText = embedText.replace(/height="\d+"/g, realHeight);
	
	// link to put below the video
	var linkText = '<br /><a href="http://www.flickr.com/' + unsafeWindow.page_p.url + '">Video of ' + unsafeWindow.page_p.title + '</a>';
	
	
	// this is the html that gets added to make the text box
	var videoEmbedText = '<h4>Embeddable Video HTML<p><textarea name="textfield" onFocus="this.select();" rows="5" style="width: ' + textBoxWidth + 'px;" wrap="virtual">' 
	+ '<center>' + embedText + linkText + '</center></textarea>';




	// add the text box to the screen
	//destination.innerHTML = linkText + destination.innerHTML;
	destination.innerHTML = videoEmbedText + destination.innerHTML;


	
}
