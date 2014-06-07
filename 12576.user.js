// ==UserScript==
// @name           LDR with Podcast Player
// @namespace      http://shinten.info/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
var _onload = w.onload;
var onload  = function () { with (w) {

    Keybind.add('3', function () {
        var item = get_active_item(true);
        if (!item.enclosure || item.enclosure_type != 'audio/mpeg') return message('Podcast NOT FOUND');

        var feedTitle = get_active_feed(true).channel.title;
        var castTitle = item.title;

        marquee(['NOW LISTENING', feedTitle, castTitle].join(' - '));

        removeClass('ads_top', 'ads')
        setStyle('ads_top', { display: 'block' });
        $('ads_top').innerHTML = [
            '<span style="vertical-align: middle;">',
            '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" id="mp3_3" style="vertical-align: bottom;" align="middle" height="25" width="220">',
            '<param name="flashVars" value="mp3Url=', item.enclosure, '">',
            '<param name="allowScriptAccess" value="sameDomain">',
            '<param name="movie" value="http://g.hatena.ne.jp/tools/mp3_3.swf">',
            '<param name="quality" value="high">',
            '<param name="bgcolor" value="#ffffff">',
            '<param name="wmode" value="transparent">',
            '<embed src="http://g.hatena.ne.jp/tools/mp3_3.swf" flashvars="mp3Url=', item.enclosure, '" quality="high" wmode="transparent" bgcolor="#ffffff" name="mp3_3" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" style="vertical-align: bottom;" align="middle" height="25" width="220">',
            '</object>',
            '</span>'
        ].join('');
    });

    function marquee (str) {
        var cut = 13;
        var i   = 0;

        var pid = setInterval(function () {
            if (str.length < i) clearInterval(pid);
            message(str.substr(i, cut));
            i += 2;
        }, 1000);
    }

}};

w.onload = function() {
    _onload();
    onload();
};