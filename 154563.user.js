// ==UserScript==
// @name       Google webfonts download link
// @namespace  http://jesus.perezpaz.es
// @version    0.1
// @description  Add a download link to fonts in google webfonts page
// @match      http://www.google.com/webfonts
// @match      http://www.google.com/webfonts/*
// @copyright  2012+, tx2z
// @require    http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==
GM_addStyle(".fontLinks {position:absolute;top:10px;right:10px;}");
GM_addStyle(".fontLinks ul {display:none;position:absolute;background:white;padding:5px;border-radius:5px;border:1px solid #BBB;z-index:99;right:0;}");
GM_addStyle(".fontLinks:hover ul {display:block;}");
GM_addStyle(".fontLinks ul li {min-width:127px;}");
GM_addStyle(".fontLinks ul li a {display:block;width:100%}");
GM_addStyle(".fontLinks ul li a:hover {background:#DDDDDD}");
// https://github.com/tx2z/multiDownload
(function( $ ){
    var methods = {
        version: "1.3.0",
        add: function ( group ) {
            return this.each(function() {
                $(this).addClass('multi-download-item-' + group );
            });
        },
        remove: function ( group ) {
            var links = this.length ? this : $('.multi-download-item-' + group);
            links.removeClass('multi-download-item-' + group);
            return $('.multi-download-item-' + group);
        },
        bind: function( e, group, options ) {
            var delay = (options && options.delay) || 100;
            return this.each(function () {
                $(this).addClass('multi-download-trigger-' + group);
                $(this).bind(e, function (event) {
                    event.preventDefault();
                    var index = 0;
                    $('.multi-download-item-' + group).each(function () {
                        var that = this;
                        setTimeout(function () {
                            var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                            frame.attr('src', $(that).attr('href'));
                            $(that).after(frame);
                        }, index * delay);
                        index++;
                    });
                });
            });
        }
    };
    $.fn.multiDownload = function( bindEvent, options, group ) {
        if( bindEvent ) {
            return methods.bind.apply( this, arguments );
        } else {
            console.log('multiDownload() is obsolete. Please use multiDownloadAdd for adding new link.');
            return methods.add.apply( this, arguments );
        }
    };
    $.fn.multiDownloadAdd = function ( group ) {
        return methods.add.apply( this, arguments );
    };
    $.fn.multiDownloadRemove = function ( group ) {
        return methods.remove.apply( this, arguments );
    };
})( jQuery );
function addButton() {
    if ( !$(".fontlist div:first").hasClass("oops") ) {
        $(".fontlist").children().each(function(index){
            var fontName = $(this).find(".fontname strong:first-child span").html().toLowerCase().replace(/ /g,'');
            if ( $(this).find(".fontLinks").length == 0 ) {
                var linkPlace = $(this);
                var rawUrl = "http://googlefontdirectory.googlecode.com/hg/ofl/" + fontName + "/";
                var metadataUrl = rawUrl + "METADATA.json";
                $.getJSON(metadataUrl, function(data) {
                    var count = data.fonts.length;
                    if ( count == 1 ) {
                        var allLinks = "";
                    } else {
                        var allLinks = '<li><a class="downloadALL' + fontName + '" href="javascript:void(0)">Download All</a></li>';
                    }
                    $.each(data.fonts, function(key, val) {
                        var fontUrl = rawUrl + val.filename;
                        var fontNameVar = val.fullName;
                        allLinks += '<li><a class="linkDL' + fontName + '" href="' + fontUrl + '">' + fontNameVar + '</a></li>';
                        if (!--count) {
                            linkPlace.append('<div class="fontLinks"><div class="goog-button-base-pos" style="font-size:11px;"><div class="goog-button-base-top-shadow" style="border:1px solid #3558DF;border-radius:2px;">&nbsp;</div><div class="goog-button-base-content">Download font</div></div><ul>' + allLinks + '</ul></div>');
                            $(".linkDL" + fontName).multiDownloadAdd(fontName);
                            $(".downloadALL" + fontName).multiDownload('click',fontName);
                            console.log('Links added to ' + fontName);
                        }
                    });
                }); 
            }
        });
    }
}
setInterval(function() {
    addButton();
}, 5000);