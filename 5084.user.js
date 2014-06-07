// Mp3Tunes script, Copyright 2006, tk, under GPL license.
//
// ==UserScript==
// @name          Mp3Tunes script
// @namespace     http://tkhere.blogspot.com
// @description   Adds sideload icons beside supported media file links on websites. Adapted from Mp3Tunes Firefox plugin.
// @include       *
// @exclude       http://sideload.com
// ==/UserScript==

(
function()
{
    modify_music_links();

    function dom_setStyle( elt, str )
    {
        elt.setAttribute( "style", str );
    }

    function dom_getElements( node, elt )
    {
        var list = node.getElementsByTagName( elt );
        return (list.length) ? list : node.getElementsByTagNameNS( "*", elt );
    }

    function modify_music_links()
    {
        if( window.location.href.match(/sideload\.com/i) )
            return;

        page_links = document.links;

        for( var i = 0; i < page_links.length; i++ )
        {
            var page_link = page_links[ i ];
            var url = page_link.href;

            var re = new RegExp("javascript:.*?((\'|\")(http.*?).*(\'|\"))");
            if( url.match( re ) )
            {
                var m = re.exec( url );
                if( m.length == 5 )
                    url = m[1].substring( 1, m[1].length - 1 );
            }

            var x;
            var slignore = false;
            var classes = page_link.className.split(" ");
            for( x = 0; x < classes.length; x++ )
                if( classes[ x ] == "slignore" )
                    slignore = true;

            if( !slignore &&
                (url.match(/^http:/) || 
                 url.match(/^https:/)) &&
                ( url.match(/\.mp3$/i) ||
                  url.match(/\.mp4$/i) ||
                  url.match(/\.m4a$/i) ||
                  url.match(/\.aac$/i) ||
                  url.match(/\.wma$/i) ||
                  url.match(/\.ogg$/i) ||
                  url.match(/\.midi$/i) ) )
            {
                var surl = "http://www.mp3tunes.com/locker/cb/sideload/?partner=5001282001&url=" + escape(url);

                box = document.createElement( "span" );
                slink = document.createElement( "a" );
                slink.href = surl;
                slink.className = "slignore";
                slink.setAttribute("onClick", "window.open('" + surl + "','sideload','width=300,height=300,status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0'); return false;");

                img = document.createElement("img");
                img.src = "data:image/gif;base64,R0lGODlhDAAMALMAAENLWJWpM5aaof///4OUPEtUVV1pTKzEKU9WYnB/RFReUGd0SHmJQIqcOZ60LwAAACH5BAAHAP8ALAAAAAAMAAwAAAQ3cAgEqkVC2m0n5xTQOA1QEFwSKIShOJxxEAXwfkpzMPfGLACDo2cpHI6u4xEQ+lQwzo6keclEAAA7";
                img.setAttribute("title","Click to sideload file into your MP3tunes locker.");
                dom_setStyle(img,"border:0px solid;font:8pt sans-serif;overflow:hidden;width:12px;height:12px;padding:0px;margin-left:4px;margin-right:4px;");
                slink.appendChild(img);
                box.appendChild(slink);

                page_link.parentNode.insertBefore(box, page_link);
                box.parentNode.removeChild(page_link);

                olink = document.createElement( "a" );
                olink.innerHTML = page_link.innerHTML;
                olink.href = page_link.href;
                olink.className = "slignore";
                box.parentNode.insertBefore(olink, box);

                page_links = document.links;
                i = 0;
            }
        }
    }
})();
