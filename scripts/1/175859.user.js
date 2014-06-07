// ==UserScript==
// @name         500px Download Link
// @namespace    http://martindilling.com/
// @version      1.0
// @description  Download link on 500px (Chrome, Firefox)
// @match        http://500px.com/photo/*
// ==/UserScript==
function download500px(){ 
    var url = window.location + "";
    
    var rsTest = url.search('(500px.com/photo)');
    
    if (rsTest !== "-1") {
        
        // Get the image element
        // it's src and alt
        // delete data-protect attribute, to allow rightclick on the image
        var get_img = document.getElementsByClassName("the_photo");
        var get_link = get_img[0].src;
        var get_alt = get_img[0].alt;
        get_img[0].removeAttribute('data-protect');
        
        // Get the photo_show element
        var get_photo_wrap = document.getElementsByClassName("photo_show");
        
        // Create our new dom elements
        var div_wrap = document.createElement('div');
        var div_text = document.createElement('div');
        var a = document.createElement('a');
        var div_btn = document.createElement('div');
        
        // Nest the elements right
        div_wrap.appendChild(div_text);
        div_wrap.appendChild(a);
        a.appendChild(div_btn);
        get_photo_wrap[0].insertBefore(div_wrap, get_photo_wrap[0].childNodes[4]);
        
        
        // Set all attributes on the new dom elements
        div_wrap.setAttribute('style', 'margin: 10px auto 0 auto; text-align: center;');
        div_text.appendChild(document.createTextNode(get_alt));
        a.setAttribute('href', get_link);
        a.setAttribute('download', get_alt);
        a.setAttribute('target', '_blank');
        a.setAttribute('style', 'margin: 10px auto 0 auto; display: block; width: 200px;');
        div_btn.setAttribute('class', 'button submit');
        div_btn.setAttribute('style', 'width: 100%;');
        div_btn.appendChild(document.createTextNode("Download"));		
        
        // Reset the temporary vars
        get_img = null;
        get_link = null;
        get_alt = null;
        get_photo_wrap = null;
    }

}


$(function() {
    
    // onload
	download500px();
	
	// hotkey support
	$(document).keydown(function(e){
		if (e.keyCode == 37 || e.keyCode == 39) {  // keyCode: 37 (left arrow), keyCode: 39 (right arrow)
			//download500px();
			window.setTimeout(download500px, 200); // wait a little so next image is loaded, otherwise old 'data' is used
		}
	});
    
});