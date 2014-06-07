// ==UserScript==
// @name        Cracked Fix
// @namespace   Teh JoE™
// @description Darkens Cracked's lightbulb layout, fixes comment sorting and vote button colors
// @include     http://www.cracked.com/*
// @include     https://www.cracked.com/*
// @version     1.1
// @grant        none
// ==/UserScript==

$(function() {
    console.info("[CrackedFix] Loaded");

    $('body').css('background-color', '#2D373D');

    var CrackedFix = {
        timeout : 2000,
        loopTimeout : 5000,
        
        voteSort: function() {
            var comments = $('.Comment-Parent').sort(function(a, b) {
                var aVal = parseInt($(a).find('.Total_Votes').text());
                var bVal = parseInt($(b).find('.Total_Votes').text());
                
                return (aVal == bVal ? 0 :
                    (aVal > bVal ? -1 : 1));
            });
            
            comments.detach();

            comments.appendTo($('ol.Comments'));
            console.info("[CrackedFix] Sorted Comments");
        },
        
        colorThumbs: function(thumbs) {
            thumbs = thumbs || $('ul.Vote button.rate');
            
            $(thumbs).filter('.thumbsUp[data-voted="true"]').attr('style', 'cursor: default; background-position: 11px 0 !important;');
            $(thumbs).filter('.thumbsDown[data-voted="true"]').attr('style', 'cursor: default; background-position: -73px 0 !important;');
        },
        
        applyHooks: function() {
            
            var thumbs = $('button.rate').not('[CrackedFix="hooked"]');
            
            $(thumbs).click(function(element) {
                console.info("[CrackedFix] Got thumb click");
                
                setTimeout(function() {
                    CrackedFix.colorThumbs(element);
                }, CrackedFix.timeout);
                return true;
            });

            $(thumbs).mouseleave(function(element) {
                console.info("[CrackedFix] Got thumb mouseleave");
                
                setTimeout(function() {
                    CrackedFix.colorThumbs(element);
                }, CrackedFix.timeout);
            });
            
            $(thumbs).attr('CrackedFix', 'hooked');
            
            var seeAll = $('a.seeAll').not('[CrackedFix="hooked"]');
            
            $(seeAll).click(function(element) {
                console.info("[CrackedFix] Got reply view click");
                
                setTimeout(function() {
                    CrackedFix.colorThumbs($(element).parents('li.Comment-Parent').find('button.rate'));
                }, CrackedFix.timeout);
                return true;
            });
            
            $(seeAll).attr('CrackedFix', 'hooked');
        },
    };

    $('a[order_by="votes"]').click(function() {
        console.info("[CrackedFix] Got vote order click");
        
        setTimeout(function() {
            CrackedFix.voteSort();
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
        return true;
    });

    $('a[order_by="date"]').click(function() {
        console.info("[CrackedFix] Got date order click");
        setTimeout(function() {
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
        return true;
    });

    $('a[order_by="user"]').click(function() {
        console.info("[CrackedFix] Got user order click");
        setTimeout(function() {
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
        return true;
    });

    $('a.Profanity').click(function() {
        console.info("[CrackedFix] Got profanity filter click");
        setTimeout(function() {
            if ($("#Comments").attr("order_by") == "votes")
                CrackedFix.voteSort();
                
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
        return true;
    });

    $('#Comments').load(function() {
        console.info("[CrackedFix] Comments loaded");
        setTimeout(function() {
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
    });

    $('#LoadMore').click(function() {
        console.info("[CrackedFix] Got load more click");
        setTimeout(function() {
            CrackedFix.colorThumbs();
            CrackedFix.applyHooks();
        }, CrackedFix.timeout);
        return true;
    });
    
    setTimeout(function() {
        CrackedFix.colorThumbs();
        CrackedFix.applyHooks();
    }, CrackedFix.timeout);
    
    setInterval(function() {
        CrackedFix.colorThumbs();
        CrackedFix.applyHooks();
    }, CrackedFix.loopTimeout);
});