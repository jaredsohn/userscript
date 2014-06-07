// ==UserScript==
// @name            Keshet-tv -> Media Player URL Redirector
// @namespace       Keshet-tv
// @include         http://www.keshet-tv.com/VideoPage*

ReadXmlUrl = function(url)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, false);
    xmlhttp.send(null);
    
    return xmlhttp.responseText;
}

function FindVideoInAspx(aspx)
{
    return aspx.match(/href=\"(http\:\/\/www\.keshet\-tv\.com\/Common\/Castup\.aspx.+?)\"/)[1];
}

mediaid = window.location.search.match(/\MediaID=(.+?)\&/)[1];
video1  = 'http://www.keshet-tv.com/Common/ClickPlay.aspx?MediaID=' + mediaid; // Video with commercials
video2  = FindVideoInAspx(ReadXmlUrl(video1));

window.location.href = video2;
