// ==UserScript==
// @name       Dropbox Direct Image Button
// @namespace  http://www.benbristow.co.uk/
// @version    0.1
// @description Add button to direct image!
// @match      *.dropbox.com/s/*.jpg 
// @match      *.dropbox.com/s/*.jpeg 
// @match      *.dropbox.com/s/*.gif 
// @match      *.dropbox.com/s/*.png 
// @match      *.dropbox.com/s/*.bmp
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013 Ben Bristow
// ==/UserScript==

$(window).load(function() {
    //Get download URL
	var url = $(".download-button").attr("href");
    
   	//Strip out the bit we need.
    url = url.split('?')[0];
    
    //Create a button!
    $(".buttons").prepend('<a href="' + url + '" class="freshbutton-blue">View Original Image</a>');
});

