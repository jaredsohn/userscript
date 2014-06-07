// ==UserScript==
// @name           Tapuz - Open photo in a new window
// @author         Shlomi Cohen
// @date           October 20th, 2011
// @namespace      http://shlomki
// @include        http://www.tapuz.co.il/*orums2008/*
// ==/UserScript==

//Includes:
// name: jQuery For Chrome
// namespace: jQueryForChromeExample
// author: Erik Vergobbi Vold
// description: This userscript is meant to be an example on how to use jQuery in a userscript on Google Chrome.

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
var exifResource='http://www.findexif.com/';
var targetCount = 0;

  $('span[class*="attachmentIndicator"]').each(function(){
    try{
	var attachmentSpan = $(this);
	var link = attachmentSpan.children('a[class*="attachment_image cboxElement"]');
	
	//var imgUrl = link.attr('onClick').match(/http:\/\/[^']*/)[0];
	var imgUrl = link.attr('href');
	var thumb = imgUrl.replace(/(http:\/\/[^\/]+)/,"$1/resimg.aspx?corner=0&pencolor=ffffff&pw=70&ph=19&image=")
	var previewUrl = thumb.replace(/pw=\d+&ph=\d+/,"pw=230&ph=1000")
	
	//Jeffry's EXIF Viewer
	//--------------------
	//var exifResource='http://regex.info/exif.cgi?imgurl=';	
	//var exifLink = document.createElement("a");
	//exifLink.href = exifResource + imgUrl;
	//exifLink.target = "_exif" + targetCount;
	
	//img = document.createElement('img');
	//img.src = "http://www.tapuz.co.il/tapuzForum/images/eng.gif";
	//exifLink.appendChild(img);
	
	//findexif.com
	//------------
	var exifForm = document.createElement("form");
	exifForm.action = exifResource;
	exifForm.method = "POST";
	exifForm.name = "frmPhoto" + targetCount;
	exifForm.target = "_blank";
	exifForm.style.display = "inline";
	
	var cAction = document.createElement("input");
	cAction.type = "hidden";
	cAction.name = "cAction";
	cAction.value = "GET_EXIF";
	
	var img_url = document.createElement("input");
	img_url.type = "hidden";
	img_url.name = "image_url";
	img_url.id = "image_url";
	img_url.value = imgUrl;
	
	var img = document.createElement("input");
	img.type = "image";
	img.src = "http://www.tapuz.co.il/tapuzForum/images/eng.gif";	
	img.alt = "";
	img.style.marginRight = "3px";
	
	exifForm.appendChild(cAction);
	exifForm.appendChild(img_url);
	exifForm.appendChild(img);

	//Visual alignments
	link.children('img[id*="link"]').css('vertical-align', 'baseline');
	attachmentSpan.css('width' , 'auto');
	attachmentSpan.css('height' , '20px');
	attachmentSpan.css('margin-top' , '2px');
	attachmentSpan.css('float' , 'none');

	//Add preview image
	link.append($('<img />').attr('src', thumb).attr('border',"").css('margin-right', '3px'));
	link.attr("href" , imgUrl);
	link.attr('target', '_blank');	
	
	//Add exif button
	attachmentSpan.append(exifForm);
		
	targetCount++;
    }
    catch(e){
    }
  });
}

var $ = unsafeWindow.jQuery;

// load jQuery and execute the main function
addJQuery(main);
