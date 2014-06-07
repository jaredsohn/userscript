// ==UserScript==
// @name            Hack Forums Hover URL get name
// @namespace       Snorlax
// @description     Hover over a Hack Forums member URL and it will give you the name
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://craigsworks.com/projects/qtip/packages/1.0.0-rc3/jquery.qtip-1.0.0-rc3.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==


$('a[href*="hackforums.net/member.php?action=profile&uid="][target]').each(function(){
    var el = $(this);
    $.get(this, function(data){
        var username = $(data).find(".largetext").text();
        el.qtip({
            api: {
                onShow: function() {
                    shortcut.add("Alt+C",function() {
                        window.prompt ("Copy to clipboard: Ctrl+C, Enter", username);
                        return false;
                    });
                }
            },
            content: username,
            show: 'mouseover',
            hide: 'mouseout'
        });
    });
});