// ==UserScript==
// @name          betterMatlabCentral
// @namespace     http://taher-zadeh.com/blog/adding-image-preview-to-matlab-central-file-exchange
// @include       http://www.mathworks.*/matlabcentral/fileexchange/*
// @author        Danial Taherzadeh
// @description   Includes the image as preview in matlab central
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// When jQuery is loaded
script.addEventListener('load', function(){

    jQuery = unsafeWindow['jQuery'];
    jQuery.noConflict();

    jQuery('span.title a').each(function (){
        var url_ = jQuery(this);

        window.setTimeout(function() {

            GM_xmlhttpRequest({
                method: 'GET',
                url: jQuery(url_).attr('href'),
                headers: {
                    'User-agent': 'Mozilla/5.0',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                },
                onload: function(responseDetails) {                	
                    var previewImg= jQuery(responseDetails.responseText).find('#thumbnail img');
                    var previewImgSrc= jQuery(previewImg).attr('src');
                    var orgImgSrc= jQuery(previewImg).parent().attr('href');

                    var img2 = jQuery(document.createElement('img')).attr('src', previewImgSrc);
                    var imgl = jQuery(document.createElement('a')).attr({
                        'href': orgImgSrc,
                        'target':'_new'
                    }).append(img2);
                    jQuery(url_).before(imgl);
                    jQuery(url_).before('<br/>');                              
                }
            });
        }, 0); 
    }
    );   
}, false);