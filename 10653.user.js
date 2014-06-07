// ==UserScript==
// @name           Myspace Video
// @description    Adds a link to download the FLV File or convert it with Zamzar.com to a format of your choice
// @include        http://vids.myspace.com/index.cfm?fuseaction=vids.individual&VideoID=*
// @include        http://vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=*
// @include        http://myspacetv.com/index.cfm?fuseaction=vids.individual&videoid=*
// ==/UserScript==
url = document.getElementById('links_video_url').value;
url = url.split('=')[2];
url = 'http://mediaservices.myspace.com/services/rss.ashx?type=video&videoID=' + url;
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	text = responseDetails.responseText;
        text = text.replace(':content', '')
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, "application/xml");
        flv = xml.getElementsByTagName('item')[0].childNodes[7].getAttribute('url');
	ul = document.getElementById('do_links');
	link = document.createElement('a');
        link.href = flv;
        txt = document.createTextNode("Download Video");
        link.appendChild(txt);
        li = document.createElement('li');
        li.appendChild(link);
        li.style.marginLeft = "22px";
        link = document.createElement('a');
        link.href = "http://www.zamzar.com/url/?u=" + encodeURIComponent(flv);
        txt = document.createTextNode("Convert Video");
        link.appendChild(txt);
        li2 = document.createElement('li');
        li2.appendChild(link);
        li2.style.marginLeft = "188px";
        li2.style.marginTop = "-14px";
	ul.appendChild(li);
        ul.appendChild(li2);
    }
});