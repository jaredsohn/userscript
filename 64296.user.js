// ==UserScript==
// @name Delicious Google
// @namespace http://markm.cd/
// @description Marks search results if they appear in delicious
// @include http://*.google.tld/search*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
 
var username = 'username';
 
window.addEventListener('load', function(e) {
    $('a.l').each(function (i) {
        if (i == 0) {
            deliciousgoogle_addLink(this, true);
        }
    });
}, false);

// rebuild is a bool that defines whether to force an API call on the rest
// of the links, this gets around the problem where firefox asks for the
// users password on every single result in parallel by letting the first
// result return before doing the other calls
function deliciousgoogle_addLink(link, rebuild) {
    var u = encodeURIComponent(link.href);
    var srcLink = $(link);
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://'+username+'@api.del.icio.us/v1/posts/'+
            'get?url='+u,
        onload: function(response) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(response.responseText,
                'text/xml');
            var posts = doc.getElementsByTagName("post");
            // go down so the first result is first after srcLink
            for (var j = posts.length - 1; j >= 0; j--) {
                var hash = posts[j].attributes.getNamedItem('hash').value;
                srcLink.after("<a href='http://delicious.com/url/"+hash+
                    "'><img src='http://delicious.com/favicon.ico' "+
                    'style="padding: 3px; margin-bottom: -5px;" border="0"'+
                    '/></a>');
            }

            if (rebuild) {
                $('a.l').each(function (i) {
                    if (i > 0) {
                        deliciousgoogle_addLink(this, false);
                    }
                });
            }
        }
    });
}
 
// vim: ts=4 sw=4 ai si et
