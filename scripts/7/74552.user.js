// ==UserScript==
// @name           ustream.tv resizer
// @version        0.1
// @author         Simon Franz (http://snaky.org) & Sebastian Sebald (http://www.distractedbysquirrels.com)
// @namespace      http://snaky.org
// @description    Resize ustream videos.
// @include        http://www.ustream.tv/recorded/*
// ==/UserScript==

function addFlvUrl1(videoId, channelId) {
    var url = "http://vod-storage1.ustream.tv/ustreamstorage/content/0/1/"+videoId.substr(0,1)+"/" + videoId.substr(0, 4) + "/" + videoId + "/1_" + channelId + "_" + videoId + ".flv";
    return addDownloadLink(url);
}

function addFlvUrl2(videoId, channelId) {
    for (i=1; i<=3; i++) {
        var url = "http://ustream.vo.llnwd.net/pd"+i+"/0/1/"+videoId.substr(0,1)+"/" + videoId.substr(0, 4) + "/" + videoId + "/1_" + channelId + "_" + videoId + ".flv";
        tryandadd(url);
    }
}

function tryandadd(url) {
    GM_xmlhttpRequest({
        method: 'HEAD',
        url: url,
        onload: function(response) {
            if (response.status == 200) {
                addDownloadLink(url);
            }
        }
    });
}

function addDownloadLink(url) {
    // create and display link
    var link = document.createElement('a');
    link.setAttribute("href", url);
    t = 'download video';
    link.appendChild(document.createTextNode(t));
    document.getElementById('VideoStatistics').appendChild(link);
}

function addFullSizeLink(url) {
    
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.style.padding = '0px 10px 0px 0px';
    var text = 'fullsize';
    link.appendChild(document.createTextNode(text));
    document.getElementById('VideoStatistics').appendChild(link);
    
}

window.addEventListener(
    'load',
    function() {
        // get Channel-Id
        s = document.getElementById('ChannelFeed');
        var channelId = s.getAttribute("rel").split("/")[4];
        
        // get Video-Id
        x = document.location.pathname.split("/");
        var videoId = x[x.length - 1];
        
        // generate url
        var url;
        if (parseInt(videoId) < 4123827) {
            addFlvUrl1(videoId, channelId);
        } else {
            addFlvUrl2(videoId, channelId);
        }
        var fullscreenurl = "http://cdn1.ustream.tv/swf/4/viewer.259.swf?autoplay=true&share=false&sessionid=&vid="+videoId+"&vrsl=c.4.315&infobar=false";
        addFullSizeLink(fullscreenurl);
    },
    false
);

