// ==UserScript==
// @name       osu! osz
// @namespace  http://rixtox.com/
// @version    0.1
// @description  Change the download link in osu! forum to osz server
// @include      *://osu.ppy.sh/forum/t/*
// @include      *://osu.ppy.sh/s/*
// @include      *://osu.ppy.sh/p/beatmaplist*
// @include      *://osu.ppy.sh/forum/viewtopic.php*
// @copyright  2013, RixTox
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('a').filter(function() {return /^https?:\/\/osu.ppy.sh\/d\/\d*n?$/.test(toAbs(this.href, document.location.href));}).attr('href', function(i, val) {return 'http://osz.so/' + val.match(/\d*n?$/)});

function toAbs(link, host) {
    
    var lparts = link.split('/');
    if (/http:|https:|ftp:/.test(lparts[0])) {
        // already abs, return
        return link;
    }
    
    var i, hparts = host.split('/');
    if (hparts.length > 3) {
        hparts.pop(); // strip trailing thingie, either scriptname or blank 
    }
    
    if (lparts[0] === '') { // like "/here/dude.png"
        host = hparts[0] + '//' + hparts[2];
        hparts = host.split('/'); // re-split host parts from scheme and domain only
        delete lparts[0];
    }
    
    for(i = 0; i < lparts.length; i++) {
        if (lparts[i] === '..') {
            // remove the previous dir level, if exists
            if (typeof lparts[i - 1] !== 'undefined') { 
                delete lparts[i - 1];
            } else if (hparts.length > 3) { // at least leave scheme and domain
                hparts.pop(); // stip one dir off the host for each /../
            }
            delete lparts[i];
        }
        if(lparts[i] === '.') {
            delete lparts[i];
        }
    }
    
    // remove deleted
    var newlinkparts = [];
    for (i = 0; i < lparts.length; i++) {
        if (typeof lparts[i] !== 'undefined') {
            newlinkparts[newlinkparts.length] = lparts[i];
        }
    }
    
    return hparts.join('/') + '/' + newlinkparts.join('/');
    
}