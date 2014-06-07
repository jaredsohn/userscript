// ==UserScript==
// @name        FetLife Lightbox
// @namespace   wjw.fllightbox
// @include     https://fetlife.com/*
// @version     3
// ==/UserScript==

var FLCB = function(){
    this.update = function(){
        $('a[href^="https://fetlife.com/users/"][href*="/pictures/"], a[href^="/users/"][href*="/pictures/"]').hover(function(){
        
            var this_ = this;
        
            if( $(this_).children('img').length < 1 ) return false;
            if( $(this_).children('.avatar').length == 1 ) return false;
            if( $(this_).children('.flcb_popup').length == 1 ) {
                $(this_).children('.flcb_popup').show();        
                $(this_).parents('.kpbox').addClass('flcb_overflowfix');
                return false;
            }
        
            $(this_).prepend('<div class="flcb_popup"></div>');
            
            $(this_).find('.flcb_popup').css({
                width: $(this).children('img').width() + 10,
                height: $(this).children('img').height() + 10               
            });
            
            $(this_).parents('.kpbox').addClass('flcb_overflowfix');
                        
            var likeUrl = $(this).attr('href').split('/');   
                likeUrl = likeUrl[ likeUrl.length-1 ];
                likeUrl = "https://fetlife.com/pictures/" + likeUrl + "/likes"
        
            $.ajax({
                url: $(this).attr('href'),
                dataType: "html",
                success: function(html){   
                    
                    var title = $(html).find('.s.i.caption').text();
    
                    $(html).find('style').each(function(){
                    
                        var html = $(this).html();
                        
                        var url = html.match(/\(\'(.*?)\'\)/);
                            url = url[0];
                            url = url.replace("('", "");
                            url = url.replace("')", "");
                    
                        var titleHtml = ( title.length > 0 ) ? '<span>' + title + '</span>' : '';
                        var imageHtml = '<img src="' + url + '" />';
                        var likeHtml = '<em data-href="' + likeUrl + '/toggle" class="picto quiet" title="love">k</em>';
                    
                        var image = new Image();
                        image.src = url;
                        image.onload = function(){
                
                            $(this_).find('.flcb_popup').html( titleHtml + imageHtml + likeHtml );
                            
                            $(this_).find('.flcb_popup').css({
                                width: $(this_).find('.flcb_popup img').width() + 10,
                                height: $(this_).find('.flcb_popup img').height() + 10
                            });
                            
                            $.ajax({
                                url: likeUrl,
                                dataType: "json",
                                success: function(data) {
                                    if( data.user_can_like ) {
                                        $(this_).find('.flcb_popup em').addClass('visible');
                                        
                                        if( data.is_liked_by_user ) {
                                            $(this_).find('.flcb_popup em').addClass('liked');
                                        }
                                    }
                                }
                            });
                            
                            $(this_).find('.flcb_popup em').click(function(){
                                var this_ = this;
                                $.ajax({
                                    url: $(this_).data('href'),
                                    type: 'post',
                                    success: function(){
                                        $(this_).toggleClass('liked');
                                    }
                                });
                                
                                return false;
                            });
                        };
                    });
                }
            });
            
            return false;
        }, function(){
            $(this).children('.flcb_popup').hide();
            $(this).parents('.kpbox').removeClass('flcb_overflowfix');
        });
        
        // avatar preview
        $('img.avatar').parent().hover(function(){
        
            var this_ = this;
            
            $(this).addClass('flcb_user');
        
            if( $(this_).children('img').length < 1 ) return false;
            if( $(this_).children('.flcb_popup').length >= 1 ) {
                $(this_).children('.flcb_popup').show();        
                return false;
            }
        
            var src = $(this_).children('img').attr('src');
                src = src.replace('_35', '_720');
                src = src.replace('_60', '_720');
                
            $(this).find('.flcb_popup').css({
                width: $(this_).children('img').width() + 6,
                height: $(this_).children('img').height() + 6               
            });
                
            var titleHtml = ( $(this_).children('img').attr('title').length > 0 ) ? '<span>' + $(this_).children('img').attr('title') + '</span>' : '';
            var imageHtml = '<img src="' + src + '" />';
        
            $(this_).prepend('<div class="flcb_popup"></div>');   
        
            var image = new Image();
            image.src = src;
            image.onload = function(){
        
                $(this_).find('.flcb_popup').html(titleHtml + imageHtml);
                
                $(this_).find('.flcb_popup').css({
                    width: $(this_).find('.flcb_popup img').width() + 10,
                    height: $(this_).find('.flcb_popup img').height() + 10               
                });
            };
            
            
        }, function(){
            $(this).children('.flcb_popup').hide();            
        });
    }
}

var css = ".flcb_popup { position: absolute; z-index: 9999; width: 100%; height: 100%; background: rgba(0,0,0,0.75) url(https://flassets.a.ssl.fastly.net/std/spinners/circle_big.gif) center center no-repeat; }";
    css += ".flcb_popup img { border: 5px solid black; max-width: 500px; display: block; width: auto !important; height: auto !important; padding: 0 !important; margin: 0 !important; }";
    css += ".flcb_popup span { position: absolute; left: 5px; right: 5px; top: 5px; padding: 5px; background: rgba(0,0,0,0.5); text-align: center; color: white; line-height: 1em; font-size: 12px; text-shadow: 1px 1px 0 rgba(0,0,0,0.5); }";
    css += ".flcb_popup em { position: absolute; left: 8px; top: 15px; opacity: 0; font-style: normal; -moz-transition: all 0.2s; -webkit-transition: all 0.2s; transition: all 0.2s; -webkit-transform: scale(0); -moz-transform: scale(0); transform: scale(0); text-shadow: 0 0 1px rgba(255,255,255,0.6); }";
    css += ".flcb_popup em.visible { opacity: 1; -moz-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }";
    css += ".flcb_popup em:hover { color: #999999; }";
    css += ".flcb_popup em:active { -moz-transform: scale(0.8); -webkit-transform: scale(0.8); transform: scale(0.8); }";
    css += ".flcb_popup em.liked { color: #DD0000; }";   
    css += ".kpbox.flcb_overflowfix { overflow: visible; }";
    css += ".flcb_user { position: relative; }";
    css += ".flcb_user img { max-width: 400px; }";
    
$(document).ready(function(){
    var flcb = new FLCB();
    setInterval(flcb.update, 1000);
    
    $('head').append('<style type="text/css">' + css + '</style>');
});

