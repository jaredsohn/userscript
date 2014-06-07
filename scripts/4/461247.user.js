// ==UserScript==
// @name            Hack-free link enhancer
// @namespace       TemariRCE
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require			http://craigsworks.com/projects/qtip/packages/1.0.0-rc3/jquery.qtip-1.0.0-rc3.js
// @require			http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @include         *hack-free.net*
// @version         1.0
// ==/UserScript==


$('a[href*="hack-free.net/forum/showthread.php?tid="][target]').each(function(){
    var el = $(this);
    $.get(this, function(data){
        var subject = $(data).find(".active").text();
        el.qtip({
            api: {
                onShow: function() {
                    shortcut.add("Alt+C",function() {
                        window.prompt ("Copier dans le presser-papier: Ctrl+C, Entrer", subject);
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