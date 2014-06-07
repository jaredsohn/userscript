// ==UserScript==
// @name       Falabella Product Image Downloader
// @namespace  http://www.solotodo.net/
// @version    0.2.1
// @description  Allows you to easily download high resolution images of the products in Falabella's online catalog.
// @match      http://www.falabella.com/*
// @match      http://www.falabella.com.co/*
// @copyright  2012+, SoloNotebooks EIRL
// ==/UserScript==

jQuery(document).ready(function() {
    var download_button = jQuery('<input type="button" value="Descargar imagen" style="height: 42px; width: 150px;" />');
    var image_tags = jQuery('img#i1, img#i2');
    
	jQuery('div#contenedorScene7').prepend(download_button);
    
    download_button.on('click', function() {        
        image_tags.each(function(idx, image_tag) {
            var jq_image_tag = jQuery(image_tag);
            
            var parent_tag = jq_image_tag.parent();
                        
            if (parent_tag.css('opacity') == '1' && parent_tag.css('visibility') == 'visible') {
                var original_img_src = jq_image_tag.attr('src');
                var image_location = original_img_src.split('?')[0];
                image_location += '?wid=1000&hei=1000';
                document.location = image_location;
            }
        });
    });
});