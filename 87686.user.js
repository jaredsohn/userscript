// ==UserScript==
// @name           Brein 'Torrent' knop
// @namespace      FTD, original by patrick
// @include        *anti-piracy.nl/home/home.asp
// ==/UserScript==

function replaceContent(data)
{
    content =  document.getElementById("content");
    content.innerHTML = data;
}

function getContent(data)
{
    data = data.split('<p class="postreply">New torrents on isoHunt</p>')[1];
    return data.split('<td style="padding-left:5px">')[0];
}

replaceContent("Bezig met laden" );

GM_xmlhttpRequest({
method: "GET",
url: 'http://isohunt.com/latest.php?mode=bt' ,
headers:{'Content-type':'application/x-www-form-urlencoded'},
onload: function(xhr) {
            header = "<div style=\"size:30; padding: 10px;\"'><b>Belangrijk nieuws</b> : Stichting brein adviseert de volgende content te downloaden:</div><div style=\"width:300px; padding: 0px; font-size: 11px;\">"
            replaceContent(header + getContent(xhr.responseText));
        }
});