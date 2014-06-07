// ==UserScript==
// @name        LiveLeak Enhancements
// @description Hides annoying page sections (e.g. social media, advertising) and other enhancements.
// @namespace   http://userscripts.org/users/543210
// @include     *://www.liveleak.com/*
// @grant       none
// ==/UserScript==

function onFirstDocumentReady() {
    var $topUserMenuLink = $(".top_user_menu_link");
    if ($topUserMenuLink.length) {
        var linkOffset = $topUserMenuLink.offset();
        $('#top_user_menu').offset({
            top: linkOffset.top + $topUserMenuLink.height(),
            left: linkOffset.left
        });
    }
    
    $('#top_user_menu > a[href^="comment?"]')
       .each(function() { this.href += '&sort_by=newest'; });
    
    var $likeTable = $('a[href="http://www.facebook.com/liveleak.official"]').first().closest('table');
    if ($likeTable.length) {
        $likeTable.hide();
        $likeTable.next().hide();
    }
    
    var $shareDiv = $('div[class~="pw-counter-vertical"]');
    if ($shareDiv.length) {
        $shareDiv.hide();
        $shareDiv.next().hide();
    }
    
    var $itemShareDiv = $('div[class~="pw-counter-horizontal"]');
    if ($itemShareDiv.length) {
        $itemShareDiv.parent().hide();
    }
    
    var $adSpan = $('#rightcol > span').filter(function() { return $(this).text() == 'Advertisement below'; });
    if ($adSpan.length) {
        $adSpan.hide();
        $adSpan.next().hide();
    }
    
    var $adverDiv = $('div[class~="section_title"]').filter(function() { return $(this).text() == 'Advertisers'; });
    if ($adverDiv.length) {
        $adverDiv.hide();
        $adverDiv.next().hide();
    }
    
    var $itemAd = $('div.tab_nav_large').prevAll('div.clear').first().next('center');
    if ($itemAd.length) {
        $itemAd.hide();
        $itemAd.next().hide();
    }
}

function onEveryDocumentReady() {
    var animationDuration = 250;
    
    $(".top_user_menu_link")
        .unbind('click')
        .wrap('<a href="' + $(".top_user_menu a").first().attr('href') + '" style="text-decoration: none;"></a>')
        .click(function(e) {
            if (e.which == 2) return;
            var $menu = $("#top_user_menu");
            if (!$menu.is(':visible')) e.stopPropagation();
            $menu.fadeIn(animationDuration);
            e.preventDefault();
        });
    
    $(".user_popup_menu_link")
        .unbind('click')
        .click(function(e) {
            if (e.which == 2) return;
            $menu = $(this).parent().find(".user_popup_menu");
            if (!$menu.is(':visible')) e.stopPropagation();
            $menu.fadeIn(animationDuration);
            e.preventDefault();
        });
    
    $('#top_user_menu').prop('onclick', null);
    
    $(document)
        .unbind('click')
        .click(function(e) {
            $('#top_user_menu').fadeOut(animationDuration);
            $(".user_popup_menu").fadeOut(animationDuration);
        });
    
    $('.user_popup_menu_shell')
        .each(function() {
            var $menuLink = $(this).find('.user_popup_menu_link');
            var $channelLink = $(this).find('.user_popup_menu a').first();
            if ($menuLink.length && $channelLink.length) {
                $menuLink[0].href = $channelLink[0].href;
            }
        });
}

setTimeout(function() { onFirstDocumentReady(); onEveryDocumentReady(); }, 0);

$(document).ajaxSuccess(function() { setTimeout(onEveryDocumentReady, 0); });