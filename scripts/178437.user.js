// ==UserScript==
// @name            YouTube sticky toolbar
// @author          TNT
// @description     Add sticky toolbar when scroll down Watch History and Watch Later pages.
// @icon            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config_icon_large.png
// @include         http://www.youtube.com/
// @include         https://www.youtube.com/
// @include         http://www.youtube.com/feed/history
// @include         https://www.youtube.com/feed/history
// @include         http://www.youtube.com/feed/watch_later
// @include         https://www.youtube.com/feed/watch_later
// @require         http://tnt-soft.net/GreaseMonkey/js/jquery-1.8.3.min.js
// @resource        stripes http://tnt-soft.net/GreaseMonkey/img/Youtube_toolbar/blue_art-header-inner.jpg
// @grant           GM_getResourceURL
// @version         1.1
// @run-at          document-end
// ==/UserScript==

tool_bar = $('#content').find('.branded-page-v2-subnav-container.branded-page-gutter-padding');
history_list = $('#gh-activityfeed');
toolbar_width = 578;

if(tool_bar.length == 1){
    tool_bar.css({
        'background-image': 'url("'+GM_getResourceURL('stripes')+'")'
    });
    toolbar_width = tool_bar.width();
    $(window).on('scroll', function(e){
        scroll_top = $(this).scrollTop();
        if(scroll_top >= 90){
            // add sticky toolbar
            tool_bar.css({
                position: 'fixed',
                top: '0px',
                width: toolbar_width+'px',
                zIndex: '100',
                backgroundColor: 'white'
            });
            history_list.css({
                marginTop: '48px'
            });
        }
        else if(scroll_top < 90){
            // remove sticky toolbar
            tool_bar.css({
                position: 'static',
                backgroundColor: 'transparent'
            });
            history_list.css({
                marginTop: '0px'
            });
        }
    });
}