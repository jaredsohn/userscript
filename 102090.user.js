// ==UserScript==
// @name           BitMeTV Highlight Torrent Types
// @namespace      BitMeTV
// @author         mikembm
// @description    Highlights the torrent type on the browse page (i.e. HDTV, 720p, etc...)
// @include        *www.bitmetv.org/browse.php*
// ==/UserScript==


var p = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    p = div.onclick();
};

var $ = p.jQuery;
var jQuery = $;


jQuery.fn.highlight = function (words, options) {
    var settings = { color: 'red' };
    jQuery.extend(settings, options);
    
    words = jQuery.map(words, function(word, i) {
        return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    
    var pattern = "(" + words.join("|") + ")";    
    var regex = new RegExp(pattern, 'i');
    
    return this.each(function () {
        $(this).html($(this).html().replace(regex, '<span style="color:'+settings.color+'">$1</span>'));
    });
};


var torrents = $("td.latest").parent();

$('td:eq(1) a b', torrents).highlight(
    ['HR.HDTV', 'HDTV', 'WS.PDTV', 'PDTV', 'TVRip', 'WS.DSR', 'DSR', '480p', '720p', '1080p', '1080i', 'WEB-DL', 'WEBRIP', 'ipod', 'DVDRip', 'BDRip'],
    {color: 'green'}
);