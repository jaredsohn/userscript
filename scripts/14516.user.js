// ==UserScript==
// @name           Download mncast Videos
// @namespace      sanxiyn@gmail.com
// @include        *
// ==/UserScript==

// 2007-11-24

function insert_download(element, url) {
    var download = document.createElement('a');
    download.innerHTML = 'Download<br>';
    download.setAttribute('href', url);
    element.parentNode.insertBefore(download, element);
}

var xmlbase =
    'http://www.mncast.com/_MovieInfo_/' +
    '_MovieInfoXML_Tag_.asp?movieID=';
var xpath = 'url/text()';

function process(element, id) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: xmlbase + id,
        onload: function(response) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(response.responseText,
                'application/xml');
            var url = dom.evaluate(xpath, dom.documentElement, null,
                XPathResult.STRING_TYPE, null).stringValue;
            if (url) {
                url = 'http://' + url + '.flv';
                insert_download(element, url);
            }
        }
    });
}

var regex = /dory.mncast.com\/mncHMovie.swf\?movieID=(\d+)/;

var embeds = document.getElementsByTagName('embed');
for (var i = 0; i < embeds.length; i++) {
    var embed = embeds[i];
    if (!embed.src)
        continue;
    var match = regex.exec(embed.src);
    if (!match)
        continue;
    var id = match[1];
    process(embed, id);
}
