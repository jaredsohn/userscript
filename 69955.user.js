// ==UserScript==
// @name           emusic
// @namespace      td
// @include        http://www.emusic.com/*
// ==/UserScript==

var queryPlaceholder = "_QUERY_";
var zeroInchUrl = "http://www.zero-inch.com/search?searchText=_QUERY_&fuzzy=true";
var junoUrl = "http://www.junodownload.com/search/?quick_search_download=all&q=_QUERY_&x=8&y=9&qs=1&s_search_precision=any&s_genre_id=0000"
var djDownloadUrl = "http://www.djdownload.com/searchmatic.php?st=_QUERY_&f=searchBox&sf=all&x=0&y=0";

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    /*jQuery.expr[':'].Contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };*/
    var href = window.location.href;
    if(/\/artist\//.test(href)) {
        setupArtistPage();
    } else if(/\/album\//.test(href)) {
        setupAlbumPage();
    }
}

function setupArtistPage() {
    var nodes = $('div.albumTitle a.titleAnchor');
    for(var i=0; i<nodes.length; i++) {
        var node = nodes[i];
        var query = $(node).html() + ' ' + $('div.contentHead.left h1').html(); 
        query = query.replace('’', '\'');

        /*
        var rExps=[ /[\xC0-\xC2]/g, /[\xE0-\xE2]/g, /[\xC8-\xCA]/g, /[\xE8-\xEB]/g, /[\xCC-\xCE]/g, /[\xEC-\xEE]/g, /[\xD2-\xD4]/g, /[\xF2-\xF4]/g,/[\xD9-\xDB]/g, /[\xF9-\xFB]/g ];

        var repChar=['A','a','E','e','I','i','O','o','U','u'];

        for(var i=0; i<rExps.length; i++) {
            query = query.replace(rExps[i],repChar[i]);
        }

        console.log(query);
        */
        var appendNode = $(node).parent().parent().parent();
        searchJuno(query, appendNode, 'artist')
    }
}

function setupAlbumPage() {
    var artist = $('div.contentHead.left h2 a:first').html();
    setupAlbum();
    $('p.songName').each(function() { setupSong(this) });
}

function setupAlbum() {
    var node = $('div.contentHead.left');
    var query = node.find('h2 a').html() + ' ' + node.find('h1').html();
    query = query.replace(/[^a-zA-Z 0-9]+/g,'');    
    searchJuno(query, node, 'album');
}

function setupSong(s) {
    var node = $(s);
    var query = node.html();// + ' ' + $('h2 a').html();
    var queryWithArtist = node.html() + ' ' + $('div.contentHead.left h2 a').html();
    //searchZeroInch(node.html());
    //searchJuno(query, s, false);
    //searchDJDownload(queryWithArtist, s);
}

function makeAjaxRequest(url, callback) {
    window.setTimeout(function() { 
        GM_xmlhttpRequest({
            method: 'GET',
            url: url, 
            onload: function(responseDetails) { callback(responseDetails.responseText) }
        });
    }, 0);
}

function searchJuno(q, s, mode) {
    var url = junoUrl.replace(queryPlaceholder, escape(q));
    makeAjaxRequest(url, function(response) {
        var node = $(response).find('span.search_highlight').filter(':Contains("'+q+'")')[0];
        if(!node) return false;
        if(!$(node).find('a.ultraplayer_play img')) return false;

        $(node).find('a.ultraplayer_play img').attr('src', 'http://www.junodownload.com/images/digital/headphones_unvisited.gif');
        $(node).find('img').each(function() {
            if($(this).attr('src') != 'http://www.junodownload.com/images/digital/headphones_unvisited.gif') {
                $(this).remove();
            }
        });
        $(node).find('a.ultraplayer_play').each(function() {
            var href = $(this).attr('href');
            $(this).attr('href','javascript:void(0)');
            $(this).click(function() {
                var mp3Filename = href.split('/').pop();
                window.open('http://www.junodownload.com/miniflashplayer/'+mp3Filename, 'junoplayer', 'height=145,width=235,toolbar=0,scrollbars=0,resizable=0,location=0');
            });
        });

        var junoDiv = $('<div class="junoResult"/>');
        $(junoDiv).append(node);
        node = junoDiv;

        if(mode == 'artist') {
            setupJunoAlbum(node, s);
            return true;
        }

        $(node).addClass('floating').css('display','none').css('position','absolute').css('background','white').css('border','1px solid #666').css('padding', '5px').css('z-index','1000');
        
        $(s).prepend(node);
        var link = $('<a href="javascript:void(0)" style="margin-right:5px">Juno</a>');
        $(link).hover(function() { $('.floating').hide(); $(node).css('display', 'block') });
        $(node).hover(null, function() { $(node).css('display', 'none'); });
        if(mode == 'album') {
            $(node).css('font-size', '12px');
            $(link).css('font-weight', 'bold').css('color', 'black');
            $(s).append(link);
        } else { 
            $(s).prepend(link);
        }
    });
}

function setupJunoAlbum(junoNode, albumNode) {
    $(albumNode).removeClass('accAlbum');
    $(albumNode).css('height', 'auto').css('font-weight','bold').css('position','relative');

    $(junoNode).css('font-size', '12px').css('padding', '0 5px 5px 5px').css('font-weight', 'normal');
    $(junoNode).hide();

    $(junoNode).hover(null, function() { $(junoNode).css('display', 'none'); });
    setTimeout(function() { 
            $(albumNode).unbind('mouseenter', 'mouseleave', 'mouseout', 'mouseover');
            $(albumNode).hover(function() { $('.junoResult').hide(); $(junoNode).css('display', 'block') }, function() { $(junoNode).css('display','none'); });
        }, 500); 

    $(albumNode).append(junoNode);
}

function searchDJDownload(q, s) {
    var url = djDownloadUrl.replace(queryPlaceholder, q);
    //$('body').append("<p>asd</p>");
    //$('body').append("<script type=\"text/javascript\" src=\"http://www.djdownload.com/fplayer/js/player-util.js"\"></script>"); 
    makeAjaxRequest(url, function(response) {
        var node = ($(response).find('div.speaker'));
        if(!node || !node.length) return false;

        var link = $('<a href="javascript:void(0)" style="margin-right:5px">DJD</a>');
        link.click(function() { 
        }); 
        $(s).prepend(link);
    });
}

function searchZeroInch(q) {
    var url = zeroInchUrl.replace(queryPlaceholder, escape(q));
}
