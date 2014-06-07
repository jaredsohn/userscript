// ==UserScript==
// @name           Youtube Downloader
// @namespace      http://creazy.net/
// @description    Add downloadable links in Youtube Page
// @include        http://*youtube.com/watch*
// ==/UserScript==

//&fmt=22： HD   /MP4/H.264/AAC : 22/2000000/9/0/115
//&fmt=35： HQ   /FLV/H.264/AAC : 35/640000/9/0/115
//&fmt=18： iPod /MP4/H.264/AAC : 18/512000/9/0/115
//Normal ： LQ   /FLV/H.263/MP3

(function() {

    var d = document;
    var h = '';
    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var l = location;
    var s = w.yt.config_.SWF_ARGS;
    var u = 'http://'+l.host+'/get_video' + '?video_id='+s['video_id'] + '&t=' + s['t'];
    
    if( !d.getElementById('DL-YT-video') && (location.href.match(/http:\/\/[a-zA-Z\.]*youtube\.com\/watch/)) ) {
        // Create Links Block
        d.getElementById('watch-embed-div').innerHTML
            += '<div id="DL-YT-video">'
            +  '<div id="check_fmt_22">checking fmt=22</div>'
            +  '<div id="check_fmt_35">checking fmt=35</div>'
            +  '<div><a href="'+makeDownloadURL(18)+'">[OK] DL fmt=18 ( iPod /MP4/H.264/AAC)</a></div>'
            +  '<div><a href="'+u+'">[OK] DL normal ( LQ /FLV/H.263/MP3)</a></div>'
            +  '</div>';
        checkHD();
        checkHQ();
    }

    /**
     * create XmlHttpRequest
     */
    function createXHR() {
        if ( w.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;
                }
            }
        } else if ( w.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    }

    /**
     * check HD(fmt=22)
     */
    function checkHD() {
        var url = 'http://'+location.host+'/watch' + '?v='+s['video_id'];
        var XHR = createXHR();
        XHR.testurl = url;
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                if ( match = XHR.responseText.match(/'SWF_ARGS': ({.*})/) ) {
                    var block = d.getElementById('check_fmt_22');
                    block.innerHTML = '';
                    var json = eval('('+RegExp.$1+')');
                    var map = decodeURIComponent(json['fmt_url_map']);
                    if ( map.indexOf('22|') > -1 ) {
                        block.innerHTML
                            += '<a href="'+makeDownloadURL(22)+'">[OK] DL fmt=22 ( HD /MP4/H.264/AAC)</a>';
                    } else {
                        block.innerHTML
                            += '[NG] DL fmt=22 ( HD /MP4/H.264/AAC)';
                    }
                }
            }
        }
        XHR.send('');
    }

    /**
     * check HQ(fmt=35)
     */
    function checkHQ() {
        var url = 'http://'+location.host+'/watch' + '?fmt=35&v='+s['video_id'];
        var XHR = createXHR();
        XHR.testurl = url;
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                if ( match = XHR.responseText.match(/'SWF_ARGS': ({.*})/) ) {
                    var block = d.getElementById('check_fmt_35');
                    block.innerHTML = '';
                    var json = eval('('+RegExp.$1+')');
                    var map = decodeURIComponent(json['fmt_url_map']);
                    if ( map.indexOf('35|') > -1 ) {
                        block.innerHTML
                            += '<a href="'+makeDownloadURL(35)+'">[OK] DL fmt=35 ( HQ /FLV/H.264/AAC)</a>';
                    } else {
                        block.innerHTML
                            += '[NG] DL fmt=35 ( HQ /FLV/H.264/AAC)';
                    }
                }
            }
        }
        XHR.send('');
    }

    /**
     * Make Download URL
     */
    function makeDownloadURL(num) {
        return u+'&fmt='+num;
    }

})();