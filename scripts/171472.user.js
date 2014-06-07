// ==UserScript==
// @name       Google Drive Quick Publick Link
// @version    1.3
// @description  Press Shift+LMB to copy short link to clipboard
// @match      https://drive.google.com/*
// @copyright  2013+, Technobulka
// @run-at document-body
// @require http://code.jquery.com/jquery.min.js
// ==/UserScript==

jQuery(function(jQuery) {
    var field = jQuery('<input>', {
            type : 'text',
            autocomplete : 'off',
            css : {
                width : '1px',
                height : '1px',
                border : '1px solid #fff',
                position : 'absolute',
                top : '-3px'
            }
        });

    jQuery('#doclist').append(field);
    
    jQuery('#viewmanager').on('click', '.gridview-thumbnail-link, .doclist-content-wrapper', function(e) {
        if (e.shiftKey) {
            var longUrl = this.href.replace(/(\?|\&)usp=\w+/, ''),
                id = this.id.replace(/^.+\./, ''),
                alt = $(this).find('img').prop('alt');
            
            if (/\.jpg$|\.jpeg$|\.gif$|\.png$/.test(alt)) {
            	longUrl = 'https://drive.google.com/uc?id='+id;
            }
            
            jQuery.ajax({
                type: 'POST',
                url: 'https://www.googleapis.com/urlshortener/v1/url',
                data: '{longUrl: "' + longUrl + '"}',
                dataType : 'json',
				contentType: 'application/json',
                success: function(data) {
                	shortUrl = data.id;
                    field.val(shortUrl).focus().select();
                    document.execCommand('Copy');
                    field.blur();
                }
            });
        }
    });
});