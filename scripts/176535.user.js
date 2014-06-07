// ==UserScript==
// @name       Flickr Size URLS Thumb page
// @namespace  http://www.femgeek.co.uk/
// @version    0.1
// @description  Quickly copy flickr size URL from thumbnails page.
// @match      *://*.flickr.com/photos/*
// @copyright  2013+, Han
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

setTimeout(function() { 
    showUrls('_c'); // do the first run
    $('body').append($html);  // add gubbins to amend code
    
    /*
    	Click events etc dont work in greasemonkey.
        http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=3
        
        var elmLink = document.getElementById('somelink');
	 	elmLink.addEventListener("click", my_func, true);
            This technique works with all elements, as well as the window and document objects. 
            It works with all DOM events, including click, change, submit, keypress, mousemove, and so on. 
            It works with existing elements on the page that you find by calling document.getElementsByTagName 
            or document.getElementById, and it works with new elements you create dynamically by calling 
            document.createElement. It is the only way to set event handlers that works in the context 
            in which user scripts operate.
    */
    
    var UpdateUrlBtn = document.getElementById('showUrlsSizeSelector');
	UpdateUrlBtn.addEventListener("change", updateUrls, true); 
    
    
}, 5000); // Wait 5 secs for flickr otherwise this script gets wiped out.



function updateUrls() { 
    var $showUrlsSize = $('#showUrlsSizeSelector').val(); //get the value in the drop down box, default is medium.
    showUrls($showUrlsSize);
}

// Html for the select box and button.
var $html = '<div class="blogLinks" style="position: fixed; top: 0px; left: 0px; z-index: 20000"> \
<select id="showUrlsSizeSelector"> \
    <option value="_s">Square (75 x 75)</option> \
    <option value="_q">Large Square (150 x 150)</option> \
    <option value="_t">Thumbnail (100 x 75)</option> \
    <option value="_m">Small (240 x 180)</option> \
    <option value="_n">Small 320 (320 x 240)</option> \
    <option value="">Medium (500 x 375)</option> \
	<option value="_z">Medium 640 (640 x 480)</option> \
    <option value="_c" selected="selected">Medium 800 (800 x 600)</option> \
    <option value="_b">Large (1024 x 768)</option> \
    <option value="_o">Original (2400 x 1800)</option> \
</select> \
</div>';


function showUrls($imageSize) {
    if($imageSize == 'undefined') 
	    $imageSize = ''; //if no size defined, default it.
    
    $('.photo-display-container .row .photo-display-item').each(function() {
    
        var $target = $('.meta', this);
        var $source = $('.photo_container .photo-click img', this).attr('src'); //get image source from thumb
        var $url = $('.photo_container .photo-click', this).attr('href'); //get image source from thumb

        $source = $source.splice( $source.lastIndexOf('.'), 0, $imageSize ); //find the last . in the string and add the prefix for the image size before it.
        
        $('.quickBlogUrl', $target).remove(); // prevent many links if using the buttons 
       
        $target.append('<div class="quickBlogUrl attribution-block"><a href="'+$source+'">'+$source+'</a></div>');  //linky linky 
        $target.append('<div class="quickBlogUrl attribution-block"><textarea style="width: 100%;"><a href="http://www.flickr.com'+$url+'"><img src="'+$source+'" alt="" class="aligncenter" /></a></textarea></div>');  //linky linky 2
		/*
        	Flickr doesn't seem to allow you to make links open in a new window, I'm sure I could fix this but you'll just have to remember to alt click in future.
        */
        
    });
}


String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

});
