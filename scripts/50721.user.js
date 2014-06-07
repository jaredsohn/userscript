// ==UserScript==
// @name            Cleaner Qaiku theme
// @namespace       http://www.milkfarmsoft.com
// @description     Cleaner Qaiku theme (experiments)
// @author          Alexey Zakhlestin
// @homepage        http://www.milkfarmsoft.com/qaiku-theme/
// @include         http://qaiku.com/*
// @include         https://qaiku.com/*
// @include         http://www.qaiku.com/*
// @include         https://www.qaiku.com/*
// @exclude         http://www.qaiku.com/channels/show/Qaiku/view/*
// @require         http://static.qaiku.com/js/jquery-1.2.6.pack.js
// ==/UserScript==

var clnr_qk_local_type;

function clnr_qk_setCSS(css)
{
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
}

function clnr_qk_set_type(type)
{
    clnr_qk_local_type = type;

    if ('all' == type) {
        $('.qaiku:has(.qaiku_message_top), .qaiku:has(.qaiku_comment_top), .qaiku:has(.qaiku_feed_top)').css('display', 'block');
    } else {
        $('.qaiku:has(.qaiku_message_top), .qaiku:has(.qaiku_comment_top), .qaiku:has(.qaiku_feed_top)').css('display', 'none');
        $('.qaiku:has(.qaiku_' + type + '_top)').css('display', 'block');
    }

    $('#clnr_switcher span').addClass('clnr_ajax');
    $('#clnr_ajax_' + type).removeClass('clnr_ajax');

    clnr_qk_clean_faces();

    try {
        var varname = 'clnr_qk_default_type';
        if (!clnr_qk_isUserfeed())
            varname += '_channels';

        unsafeWindow.localStorage.setItem(varname, type);
    } catch (e) {
    }

    clnr_qk_local_type = type;
}

function clnr_qk_clean_faces()
{
    var faces_root = 'jquery_helper_qaikus';
    var prev = '';

    if (!clnr_qk_isUserfeed())
        faces_root = 'qaiku_left';

    $('#' + faces_root).children().each(function(){
        if ($(this).css('display') == 'none')
            return;

        var victim = $('.qaiku_sender_picture', $(this));
        var username = $('.username', victim).text();

        if (username == prev) {
            victim.css('visibility', 'hidden');
        } else {
            victim.css('visibility', 'visible');
            prev = username;
        }
    })
}

function clnr_qk_set_default_type()
{
    var varname = 'clnr_qk_default_type';
    if (!clnr_qk_isUserfeed())
        varname += '_channels';

    var deflt;

    if (typeof unsafeWindow.localStorage == undefined) {
        deflt = 'all';
    } else {
        try {
            deflt = unsafeWindow.localStorage.getItem(varname);

            if (!deflt || deflt == '')
                deflt = 'all';
        } catch (e) {
            deflt = 'all';
        }
    }

    clnr_qk_set_type(deflt);
    clnr_qk_local_type = deflt;
}

function clnr_qk_duplicate_pager()
{
    if (clnr_qk_isUserfeed())
        $('#jquery_helper_qaikus').prepend($('.qaiku_pager').clone());
    else
        $('#qaiku_left').prepend($('.qaiku_pager').clone());
}

function clnr_qk_current_page()
{
    return $('.qaiku_pager:first span.selected a').text() - 0;
}

function clnr_qk_ajax_feed_url(page)
{
    var url = window.location.href;
    var user = url.replace(/http:\/\/www\.qaiku\.com\/home\/([a-zA-Z0-9]+).*/, '$1');
    return 'http://www.qaiku.com/home/' + user + '/post/ajax/?stream_page=' + page;
}

function clnr_load_feed_page(page)
{
    $('#jquery_helper_qaikus').load(clnr_qk_ajax_feed_url(page), function(){
        clnr_qk_clean_faces();
        clnr_qk_duplicate_pager();
        clnr_qk_pager_to_ajax();
        clnr_qk_set_type(clnr_qk_local_type);
    });
}

function clnr_qk_reload_data()
{
    clnr_load_feed_page(clnr_qk_current_page());
}

function clnr_qk_pager_to_ajax()
{
    $('.qaiku_pager a').each(function(){
        var value = $(this).text();

        if ('Older' == value) {
            $(this).click(function(){
                clnr_load_feed_page(clnr_qk_current_page() + 1);
                return false;
            })
        } else if ('Newer' == value) {
            $(this).click(function(){
                clnr_load_feed_page(clnr_qk_current_page() - 1);
                return false;
            })
        } else if (value.match(/^\d+$/) == null) {
            ;
        } else {
            $(this).click(function(){
                clnr_load_feed_page(value);
                return false;
            })
        }
    })
}

function clnr_qk_isUserfeed()
{
    var url = window.location.href;

    if (url.match(/http:\/\/www\.qaiku\.com\/home\/([a-zA-Z0-9]+).*/))
        return true;

    return false;
}

function letsJQuery()
{
    var css = '@namespace url(http://www.w3.org/1999/xhtml); #wrap {width:100%;} #wrap_content {width: 95% !important; margin-left: 2.5%;} #qaiku_content { width: auto !important;} #qaiku_left {width: auto !important; margin-right: 250px;} #qaiku_right {margin-left: -250px; padding-right: 10px; margin-right: 8px;} #navi {width:100%}';
    // css += ' .qaiku_sender_picture {margin-left: 10px;}';
    css += ' #clnr_switcher span {margin-left: 1em} .clnr_ajax {border-bottom: 1px dashed black; cursor:pointer;} .clnr_ajax:hover {color: blue; border-color: blue;}';
    css += ' .qaiku_message_content, .qaiku_comment_content, .qaiku_feed_content {background-image: none !important}';
    css += ' .qaiku_message_top, .qaiku_comment_top, .qaiku_feed_top {background-image: none !important}';
    css += ' .qaiku {width: 100%;}';
    css += ' .qaiku_message {width: 100%;} .qaiku_message_top {width: 90%;} .qaiku_message_content {width:100%; background: #F2F9FD;}';
    css += ' .qaiku_comment {width: 100%;} .qaiku_comment_top {width: 90%;} .qaiku_comment_content {width:100%; background: #F6F6F6;}';
    css += ' .qaiku_feed {width: 100%;} .qaiku_feed_top {width: 90%;} .qaiku_feed_content {width:100%; background: #FFF2EF;}';

    clnr_qk_setCSS(css);

    // toolbar for filtering by type
    if (clnr_qk_isUserfeed()) {
        $('#navi').append('<br clear="all"/>')
        var container = $('<span id="clnr_switcher">show:</span>')
                            .append($('<span class="clnr_ajax" id="clnr_ajax_all">everything</span>').click(function(){clnr_qk_set_type('all')}))
                            .append($('<span class="clnr_ajax" id="clnr_ajax_message">messages</span>').click(function(){clnr_qk_set_type('message')}))
                            .append($('<span class="clnr_ajax" id="clnr_ajax_comment">comments</span>').click(function(){clnr_qk_set_type('comment')}))
                            .append($('<span class="clnr_ajax" id="clnr_ajax_feed">feeds</span>').click(function(){clnr_qk_set_type('feed')}))
        $('#navi').append(container);

        clnr_qk_set_default_type();
        clnr_qk_duplicate_pager();
    } else {
        clnr_qk_duplicate_pager();

        var container = $('<span id="clnr_switcher">show:</span>')
                            .append($('<span class="clnr_ajax" id="clnr_ajax_all">everything</span>').click(function(){clnr_qk_set_type('all')}))
                            .append($('<span class="clnr_ajax" id="clnr_ajax_message">messages</span>').click(function(){clnr_qk_set_type('message')}))
                            .append($('<span class="clnr_ajax" id="clnr_ajax_comment">comments</span>').click(function(){clnr_qk_set_type('comment')}))
        $('#qaiku_left').prepend(container);
        clnr_qk_set_default_type();
    }

    if (clnr_qk_isUserfeed()) {
        // reloader
        $('#navi').append('<br clear="all"/>')
        $('#navi').append($('<div class="clnr_ajax" style="vertical-align: middle; line-height:16px; padding-top: 7px;">REFRESH <img src="http://www.qaiku.com/images/arrow_refresh_small.png" width="14" height="14"/></div>').click(function(){
            clnr_qk_reload_data();
        }))

        clnr_qk_pager_to_ajax();

        window.original_qaiku_post_ready = window.qaiku_post_ready;
        window.qaiku_post_ready = function(data){window.original_qaiku_post_ready(data); clnr_qk_clean_faces();}
    }
}

if (typeof unsafeWindow != "undefined") {
    var checker = setInterval(
        function(){
            if (typeof ($ = unsafeWindow.jQuery) != "undefined") {
                clearInterval(checker);
                letsJQuery();
            }
        },
        100
    );
} else {
    unsafeWindow = window;
    letsJQuery();
}
