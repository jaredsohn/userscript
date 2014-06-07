// ==UserScript==
// @name       Paris Product Image Downloader
// @namespace  http://www.solotodo.net/
// @version    0.1
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description  Allows you to easily download high resolution images of the products in Paris's online catalog.
// @match      http://www.paris.cl/*
// @copyright  2012+, SoloNotebooks EIRL
// ==/UserScript==

jQuery(document).ready(function() {
    var download_button = jQuery('<input type="button" value="Descargar imagen" style="height: 42px; width: 150px;" />');
    
	jQuery('div.product_images').prepend(download_button);
    
    download_button.on('click', function() {        
        var img_tag = $('div.s7flyoutSwatchActiveBorder').filter(function() {
           return $(this).css('visibility') == 'visible';
        }).parent().find('img');
        
        var image_url = img_tag.attr('src').split('?')[0];
        image_url += '?wid=1000&hei=1000';
        
        console.log(image_url);
        document.location = image_url;
    });
});