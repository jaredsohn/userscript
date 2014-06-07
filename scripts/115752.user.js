// ==UserScript==
// @name          YouTube Unblocker
// @author        TheGreshProject
// @description	  Use unblock Youtube with HTTPS safe connection
// @include       http://youtube.com*
// @include       http://www.youtube.com*
// ==/UserScript==

function
    {
        location.href = location.href.replace(/http\:/, 'https:');
    }
function runScript() {



// Opera doesn't have unsafeWindow, GM_getValue and GM_setValue. We test

// whether we're in Opera and provide workarounds for that case.

if(/Opera|Safari|Epiphany|Chrome/.test(navigator.userAgent)) {

    unsafeWindow = window;

    GM_getValue = function ( cookieName, oDefault ) {

        var cookieJar = document.cookie.split( "; " );

        for( var x = 0; x < cookieJar.length; x++ ) {

            var oneCookie = cookieJar[x].split( "=" );

            if( oneCookie[0] == escape( cookieName ) ) {

                try {

                    var footm = unescape( oneCookie[1] );

                } catch(e) { return oDefault; }

                return footm;

            }

        }

        return oDefault;

    };

    GM_setValue = function ( cookieName, cookieValue, lifeTime ) {

        if( !cookieName ) { return; }

        if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }

        document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";

    }

}


var youtube_regex = RegExp("http://www.youtube.com/v/(.+?)(\&.*|$)");

var video_objects = new Array();
var object_data = new Array();

var formats = ['flash', 5, 6, 34, 18, 35, 22];
var format_names = {'flash': 'Flash', 5: 'Low 5', 6: "Low 6", 34: "High 34", 18: "High 18", 35: "High 35", 22: "HD 22"}

var preferred_format_selector = '';
for (var format in format_names) {
    preferred_format_selector += '<option value="' + format + '">' + format_names[format] + '</option>';
}

function onWritePlayer(object, quality) {
    function writePlayer(event) {
        while (video_objects[object].urls[quality] == null) {
            quality = formats[formats.indexOf(quality) - 1];
        }
        if (quality != video_objects[object].current) {
            if (quality == 'flash') {
                object.setAttribute('type', 'application/x-shockwave-flash');
            } else {
                object.setAttribute('type', 'application/x-mplayer2');
            }
            object.setAttribute('data', video_objects[object].urls[quality]);
            video_objects[object].current = quality;
        }
    }
    return writePlayer
}

function getVidUrls(object) {
    function youtubeResponse(response) {
        if (object.hasAttribute('classid')) {
            object.removeAttribute('classid');
        }
        var test;
        for (var i = 1; i < formats.length; i++) { //i = 1 to miss 'flash'
            video_objects[object].urls[formats[i]] = null;
        }
        var urlmap = decodeURIComponent(response.responseText.match(RegExp('fmt_url_map=(.*?)(\&|$)'))[1]).split(",");
        for (var i = 1; i < urlmap.length; i++) {
            test = urlmap[i].split('|', 2);

            if (test[0] in format_names) {
                video_objects[object].urls[test[0]] = test[1];
            }
        }
        object.innerHTML = object.innerHTML.replace(RegExp('<embed .*?>'), '');
        object.innerHTML += '<param name="autostart" value="false">';
        onWritePlayer(object, GM_getValue('default-format', 22))()
        var menu = document.createElement('div');
        var down_links = new Array();
        var watch_links = new Array();
        for (var i = 1; i < formats.length; i++) {
            if (video_objects[object].urls[formats[i]]) {
                down_links.push('<a href="' + video_objects[object].urls[formats[i]] + '">' + format_names[formats[i]] + '</a>');
                watch_links.push('<a href="javascript:" id="' + formats[i] + video_objects[object].video_id + '">' + format_names[formats[i]] + '</a>');
            }
        }
        watch_links.push('<a href="javascript:" id="flash' + video_objects[object].video_id + '">Flash</a>');
        menu.innerHTML = '<span style="float:left">Download: ' + down_links.join(' | ') + '</span><span style="float:right"> View: ' + watch_links.join(' | ') + '</span><br>'
                       + '<span style="float:left">Preferred format: <select id="select' + video_objects[object].video_id + '">' + preferred_format_selector + '</select></span>'
                       + '<span style="float:right"><a href="http://youtube.com/watch?v=' + video_objects[object].video_id + '">Youtube</a></span><br>';
        object.parentNode.insertBefore(menu, object.nextSibling);
        //Make sure the text fits
        var object_height = parseInt(object.getAttribute('height') || object.style.height);
        if (object_height) {
            var parent_height = parseInt(object.parentNode.getAttribute('height') || object.parentNode.style.height);
            if (parent_height && parent_height == object_height) {
                if (object.parentNode.getAttribute('height')) {
                    object.parentNode.setAttribute('height', parent_height + 16 + 'px');
                } else {
                    object.parentNode.style.height = parent_height + 32 + 'px';
                }
            }
        }
        for (var i = 0; i < formats.length; i++) {
            if (video_objects[object].urls[formats[i]]) {
                document.getElementById(formats[i] + video_objects[object].video_id).addEventListener('click', onWritePlayer(object, formats[i]), false);
            }
        }
        document.getElementById('select' + video_objects[object].video_id).addEventListener('change', onPreferredFormatChange, false);
        document.getElementById('select' + video_objects[object].video_id).value = GM_getValue('default-format', 22);
    }
    return youtubeResponse
}

function checkObject(object) {
    var url_match;
    if (object.getAttribute('data')) {
        url_match = object.getAttribute('data').match(youtube_regex);
        if (url_match) {
            video_objects[object] = {video_id: url_match[1], current: 'flash', urls: {'flash': url_match[0]}}
            object.removeAttribute('type');
            object.removeAttribute('data');
            GM_xmlhttpRequest({method: 'GET', url: 'http://www.youtube.com/get_video_info?video_id=' + url_match[1], onload: getVidUrls(object)});
            return;
        }
    }
    var params = object.getElementsByTagName('param');
    for (var i = 0; i < params.length; i++) {
        url_match = params[i].getAttribute('value').match(youtube_regex);
        if (url_match) {
            video_objects[object] = {video_id: url_match[1], current: 'flash', urls: {'flash': url_match[0]}}
            GM_xmlhttpRequest({method: 'GET', url: 'http://www.youtube.com/get_video_info?video_id=' + url_match[1], onload: getVidUrls(object)});
            return;
        }
    }
    var embeds = object.getElementsByTagName('embed');
    for (var i = 0; i < embeds.length; i++) {
        url_match = embeds[i].getAttribute('src').match(youtube_regex);
        if (url_match) {
            video_objects[object] = {video_id: url_match[1], current: 'flash', urls: {'flash': url_match[0]}}
            GM_xmlhttpRequest({method: 'GET', url: 'http://www.youtube.com/get_video_info?video_id=' + url_match[1], onload: getVidUrls(object)});
            return;
        }
    }
}
function onDomNodeInserted(event) {
    if (event.target.tagName.toLowerCase() == 'object') {
        //Needs to be in setTimeout to work with flashblock
        setTimeout(function () { checkObject(event.target) }, 0);
    }
}
function onPreferredFormatChange(event) {
    GM_setValue('default-format', (parseInt(event.target.value) || event.target.value));
    for (object in video_objects) {
        document.getElementById('select' + video_objects[object].video_id).value = event.target.value;
    }
}

var objects = document.getElementsByTagName('object');
for (var i = 0; i < objects.length; i++) {
    checkObject(objects[i]);
}

document.body.addEventListener('DOMNodeInserted', onDomNodeInserted, false);

}

if(/Chrome/.test(navigator.userAgent)) {

    var script = document.createElement("script");

    script.type = "application/javascript";

    script.textContent = "(" + runScript + ")();";

    document.body.appendChild(script);

} else {

    runScript();

}