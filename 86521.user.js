// ==UserScript==
// @name           Tou.tv Downloader
// @namespace      TOUTVDOWN
// @description    Downloader les vidéos de tou.tv
// @include        http://www.tou.tv/*
// @copyright     2010, Procule the Guizou
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        0.5
// ==/UserScript==


var scriptversion = 0.5;

if (unsafeWindow.episodeId)
{

var url;
var rtmpurl;

var TheEpisode = unsafeWindow.episodeId;
url = 'http://release.theplatform.com/content.select?pid=' + TheEpisode;

GM_xmlhttpRequest({
    method: 'GET',
    url: url, 
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        rtmpurl = dom.getElementsByTagName('url')[0].textContent;
        var logo, newElement;
        logo = document.getElementById('divPartner');
        if (logo) {
            newElement = document.createElement('a');
            newElement.setAttribute('href', rtmpurl);
            newElement.innerHTML = 'Downloader le vidéo';
            logo.appendChild(newElement, logo);
        }

    }
});

}
