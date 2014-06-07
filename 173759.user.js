// ==UserScript==
// @name            Hack Forums Hover URL get thread subject
// @namespace       1n9i9c7om
// @description     Hover over a Hack Forums thread URL and it will give you the subject
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://craigsworks.com/projects/qtip/packages/1.0.0-rc3/jquery.qtip-1.0.0-rc3.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hackforums.net*
// @version         1.0
// ==/UserScript==


$('a[href*="hackforums.net/showthread.php?tid="][target]').each(function(){
    var el = $(this);
    $.get(this, function(data){
        var subject = $(data).find(".active").text();
        el.qtip({
            api: {
                onShow: function() {
                    shortcut.add("Alt+C",function() {
                        window.prompt ("Copy to clipboard: Ctrl+C, Enter", subject);
                        return false;
                    });
                }
            },
            content: subject,
            show: 'mouseover',
            hide: 'mouseout'
        });
    });
});