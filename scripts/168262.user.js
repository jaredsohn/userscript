// ==UserScript==
// @name        Youtube download links
// @namespace   sothiscanbeanythingright
// @description Adds a tab for downloading youtube videos
// @include     http://www.youtube.com/watch*
// @include     https://www.youtube.com/watch*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var buttonElem = document.createElement('span')
    buttonElem.innerHTML = ''+
'    <button type="button"'+
'            class="action-panel-trigger yt-uix-button yt-uix-button-text"'+
'            title="" onclick=";return false;"'+
'            data-trigger-for="action-panel-download"'+
'            data-button-toggle="true" role="button">'+
'        <span class="yt-uix-button-content">Download </span>'+
'    </button>';

    var tabContent = document.createElement('p');
    var tabElem = document.createElement('div')
    tabElem.className = "action-panel-content";
    tabElem.id = 'action-panel-download';
    tabElem.setAttribute("data-panel-loaded", "true");
    tabElem.style.display = "none";
    tabElem.appendChild(tabContent);
    

//'<div class="action-panel-content" id="action-panel-download" data-panel-loaded="true" style="display: none;">'+

    function forEach(arr, callback) {
        for(var x = 0; x < arr.length; x++)
            callback(x, arr[x]);
    }

    function parseStreamMap(map, value) {
        var fmtUrlList = [];

        forEach(value.split(","), function (idx, elm) {
            var elms = elm.replace(/(\\\/)/g, "/").replace(/(\\u0026)/g, "&").split("&");
            var obj = {};

            forEach(elms, function (idx, elm) {
                var kv = elm.split("=");
                obj[kv[0]] = decodeURIComponent(kv[1]);
            });

            obj.itag = +obj.itag;

            fmtUrlList.push(obj);
        });

        map.fmtUrlList = fmtUrlList;
    }

    function parseFmtList(map, value) {
        var resMap = {
            "2048x1536": "1.5k",
            "1920x1080": "1080p",
            "1280x720": "720p",
            "854x480": "480p",
            "640x480": "480f",
            "640x360": "360p",
            "320x240": "240f",
            "176x144": "144g"
        };

        function cnvResName(res) {
            return resMap[res] || res;
        }

        var list = value.split(",");
        var fmtMap = {};

        forEach(list, function (idx, elm) {
            var elms = elm.replace(/(\\\/)/g, "/").split("/");

            var fmtId = elms[0];
            var res = elms[1];
            elms.splice( /*idx*/ 0, /*rm*/ 2);

            fmtMap[fmtId] = {
                res: cnvResName(res),
                vars: elms
            };
        });

        map.fmtMap = fmtMap;
    }

    function getVideoInfo() {
        var map = {};

        if (document.body.innerHTML.match(/"url_encoded_fmt_stream_map":\s?"(.+?)"/))
            parseStreamMap(map, RegExp.$1);

        if (document.body.innerHTML.match(/"fmt_list":\s?"(.+?)"/))
            parseFmtList(map, RegExp.$1);

        if (document.body.innerHTML.match(/"t":\s?"(.+?)"/))
            map.t = RegExp.$1;

        if (document.body.innerHTML.match(/"video_id":\s?"(.+?)"/))
            map.videoId = RegExp.$1;

        if (document.body.innerHTML.match(/<meta\s+itemprop="name"\s*content="(.+)"\s*>\s*\n/))
            map.title = RegExp.$1;

        return map;
    }
    
    var div = document.getElementById("watch7-action-panels");
    div.appendChild(tabElem);
    
    //hopefully this never changes >_>
    var button = document.getElementById("watch7-secondary-actions").
                           getElementsByTagName("span")[6];
    button.parentNode.insertBefore(buttonElem, button);
    
    var content = '';
    var info = getVideoInfo();
    forEach(info["fmtUrlList"], function(key, value) {
        content += '<p><a href="'+value.url+'&title='+encodeURIComponent(info.title)+'&signature='+value.sig+'">'+value.quality + ": " + value.type +'</a></p><br/>'
    })
    
    tabContent.innerHTML = content;
    
})()
