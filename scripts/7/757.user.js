// Livejournal OPML generator
// version 0.1
// 2005-05-06
// Public Domain
// Martin Davidsson <martin.davidsson at gmail.com>
// 
// data: URI generation code copied from http://simon.incutio.com/archive/2003/08/11/selfContained
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Livejournal OPML", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Livejournal OPML
// @namespace     http://martin.davidssons.com/greasemonkey
// @description   Generates OPML links on livejournal user info pages
// @include       http://www.livejournal.com/userinfo.bml*
// ==/UserScript==

(function() {

    function findPosition( el ) {
        point = new Array();
        top = 0;
        left = 0;
        try {
            var obj = el;
            if (obj.offsetParent) {
                while (obj.offsetParent) {
                    top += obj.offsetTop;
                    left += obj.offsetLeft;
                    obj = obj.offsetParent;
                }
            }
            } catch (e) {
        }
        point.push( top );
        point.push( left );
        return point;
    }

    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function base64encode(str) {
        var out; var i; var len;
        var c1; var c2; var c3;
        var len = str.length;
        var i = 0;
        out = "";
        while(i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if(i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if(i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    links = document.getElementsByTagName('a');
    friends = new Array();
    LJregex = /userinfo.bml\?user=[^&]*$/;
    friendsRegex = /http:\/\/www\.livejournal\.com\/users\/.*\/friends/;
    var anchor;
    for (i = 0; i < links.length; i++) {
        if( friendsRegex.test( links[i].href ) ) {
            anchor = links[i];
        }
        else if (LJregex.test(links[i].href) ) {
                friends[links[i].textContent] = links[i].href;
        }
    }

    var OPML = '<?xml version="1.0" encoding="ISO-8859-1"?>';
    OPML    += '<opml version="1.1"><head><title>Livejournal Friends</title></head><body>';

    for( name in friends ) {
        var link = friends[name];
        OPML += '<outline text="'+name+'" description="'+name+'" title="'+name+'" type="rss" version="RSS" htmlUrl="'+link+'" xmlUrl="http://www.livejournal.com/users/'+name+'/data/rss" />';
    }

    OPML += '</body></opml>';

    var uri = 'data:text/xml;charset=utf-8';
    OPML = base64encode(OPML);
    uri += ';base64';
    uri += ',' + escape(OPML);


    point = findPosition( anchor );

    var div = document.createElement('div');
    div.style.position='absolute';
    div.style.top = point[0]+17 + 'px';
    div.style.left = point[1] + 'px';

    var opmlIconImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd%2FtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGeYUxB9wAAACBjSFJNAABtnAAAc5QAAM%2BpAACCNAAAbs4AAMMUAAA0wQAAKUuo4i7nAAAAbUlEQVR42mK8efPmfwYqAoAAYgERampqVDHs1q1bDAABxATjMDKehWNcfGS16GIwABBATMic%2F%2F%2BNGfDxkS3ABQACiAmfJEgzuqGEAEAAMaEbQMjFhFwNEEAsxHoXmQ9jY3M9QACxwGKHWgAgwAAG6y1q9gcHNgAAAABJRU5ErkJggg%3D%3D";
    var opmlLink = document.createElement('a');
    opmlLink.setAttribute('href', uri);

    var opmlIcon = document.createElement('img');
    opmlIcon.setAttribute('src', opmlIconImg);
    opmlIcon.setAttribute('style', 'border: none');

    opmlLink.appendChild( opmlIcon );
    div.appendChild(opmlLink);
    document.getElementsByTagName('body')[0].appendChild(div);

    
})();



