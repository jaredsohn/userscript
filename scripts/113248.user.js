// ==UserScript==
// @id             himawari Tweak
// @name           himawari Tweak
// @namespace      http://userscripts.org/users/ppppq
// @include        http://himado.in/*
// @author         ppppq
// @version        3.0.20120331
// ==/UserScript==



(function(d) {
    var l = d.location.href,
        accessStatus = {
            cue       : [],
            isWorking : false
        };
    
    
    
    //filter
    const videoPageURIFilter = /^http:\/\/himado\.in\/(?:\?id=)?\d+?/;
    const searchPageURIFilter = /^http:\/\/himado\.in\/.*?[\?&](?:cat|keyword|sort)=/;
    
    
    
    //all pages
    var styleText = '.GM_DLLinks {' +
                    'display: inline !important;' +
                    'color: -moz-hyperlinktext !important;' +
                    'font-size: 9px !important;' +
                    '}' +
                    '.GM_DLLinks:visited {' +
                    'color: -moz-visitedhyperlinktext !important;' +
                    '}' +
                    '.GM_DLLinks:hover {' +
                    'text-decoration: underline !important;' +
                    '}' +
                    '.GM_DLLinks:active {' +
                    'color: -moz-activehyperlinktext !important;' +
                    '}';
    GM_addStyle(styleText);
    
    
    
    //top page
    if (l === 'http://himado.in/') {
        //big thumbnail
        var bigVideoTitle = gtf('a', gcf('thumbimage_mega').nextSibling);
        getVideoInfo(bigVideoTitle.href, function(videoInfoArray) {
            writeDLLinks(videoInfoArray, bigVideoTitle.parentNode);
        });
        
        //the other thumbnails
        var videoTitleContainers = gc('home_title');
        for (var i = 0, ilen = videoTitleContainers.length; i < ilen; i++) {
            var videoTitleContainer = videoTitleContainers[i];
            
            let videoTitle = gtf('a', videoTitleContainer);
            getVideoInfo(videoTitle.href, function(videoInfoArray) {
                writeDLLinks(videoInfoArray, videoTitle.parentNode);
            });
        }
    }
    //search page
    else if (searchPageURIFilter.test(l)) {
        searchPageTweaker(d);
        d.addEventListener('AutoPagerize_DOMNodeInserted', function(event) {
            var node = event.target;
            searchPageTweaker(node);
        }, false);
    }
    //video page
    else if (videoPageURIFilter.test(l)) {
        getVideoInfo(l, function(videoInfoArray) {
            var appendElement = gi('topmovie_right_box') || gi('topmovie');
            writeDLLinks(videoInfoArray, appendElement);
        });
    }
    
    
    
    function getVideoInfo(aVideoPageURI, aCallback) {
        var cue = accessStatus.cue;
        
        if (!videoPageURIFilter.test(aVideoPageURI)) return;
        
        cue[cue.length] = {
            videoPageURI: aVideoPageURI,
            callback    : aCallback
        }
        
        if (!accessStatus.isWorking) processCue();
    }
    function processCue() {
        var cue = accessStatus.cue,
            processTimer = setInterval(function() {
                var {
                        videoPageURI: videoPageURI,
                        callback    : callback
                    } = cue[0],
                    videoId = /^http:\/\/himado\.in\/(?:.*?[\?&]id=)?(\d+)/.exec(videoPageURI)[1],
                    videoInfoURI;
                
                if (!/^\d+?$/.test(videoId)) {
                    log('Error getVideoInfo: invalid videoId; uri = ' + videoPageURI);
                    return;
                }
                videoInfoURI = 'http://himado.in/?id=' + videoId + '&mode=movie';
                
                xhr(videoInfoURI, function(aReq) {
                    var doc = ce('div'),
                        videoInfoArray = [],
                        mainSouceInfoArray,
                        sourceArray;
                    
                    doc.innerHTML = aReq.responseText;
                    mainSouceInfoArray = doc.firstChild.childNodes;
                    sourceArray = gt('add_source', doc);
                    
                    videoInfoArray[videoInfoArray.length] = createVideoInfo(mainSouceInfoArray);
                    for (var i = 0, ilen = sourceArray.length; i < ilen; i++) {
                        var source = sourceArray[i],
                            sourceInfoArray = source.childNodes;
                        
                        videoInfoArray[videoInfoArray.length] = createVideoInfo(sourceInfoArray);
                    }
                    
                    callback(videoInfoArray);
                });
                
                cue.shift();
                if (!cue[0]) {
                    clearInterval(processTimer);
                    accessStatus.isWorking = false;
                }
            }, 1000);
        
        accessStatus.isWorking = true;
    }
    function createVideoInfo(aArray) {
        var info = {};
        
        aArrayLoop:
        for (var i = 0, ilen = aArray.length; i < ilen; i++) {
            var element = aArray[i];
            
            var textContent = element.textContent;
            switch (element.tagName) {
                case 'ISDELETE'     : info.isDelete = parseInt(textContent); break;
                case 'MOVIE_URL'    : info.uri      = textContent; break;
                case 'MOVIE_WIDTH'  : info.width    = textContent; break;
                case 'MOVIE_HEIGHT' : info.height   = textContent; break;
                case 'MOVIE_TIME'   : info.time     = textContent; break;
                case 'MOVIE_BITRATE': info.bitrate  = textContent; break;
                case 'MEMO'         : info.memo     = textContent; break;
                    
                default: continue aArrayLoop;
            }
        }
        return info;
    }
    
    function writeDLLinks(aVideoInfoArray, aAppendElement) {
        var dlLinkHTML = '';
        for (var i = 0, ilen = aVideoInfoArray.length; i < ilen; i++) {
            var videoInfo = aVideoInfoArray[i];
            
            if (videoInfo.isDelete === 1) {
                dlLinkHTML += '<span style="color: red;font-size: 9px;">Deleted</span><br>';
                continue;
            }
            
            dlLinkHTML += '<a class="GM_DLLinks" href="' + encodeURI(videoInfo.uri) + '">' + createVideoLabel(videoInfo) + '</a><br>';
        }
        aAppendElement.insertAdjacentHTML('beforeend', dlLinkHTML);
    }
    
    function createVideoLabel(aObject) {
        var {width: w, height: h, time: t, bitrate: b, memo: m} = aObject;
        var f = /^\d+?$/;
        
        var resolution = (f.test(w) && f.test(h)) ? w + ' x ' + h : '? x ?';
        var fileSize   = (f.test(t) && f.test(b)) ? Math.round(t * b / ( 1024 * 1024 * 8 )) + 'MB' : '? MB';
        var label      = resolution + ' / ' + fileSize;
        if (m) label  += '(' + m + ')';
        
        return label;
    }
    
    function searchPageTweaker(aDoc) {
        //edit thumbContainer
        var thumbContainers = gc('thumbblock_3colum', aDoc);
        for (var i = 0, ilen = thumbContainers.length; i < ilen; i++) {
            let thumbContainer = thumbContainers[i];
            
            var videoTitle = qs('.thumbtitle > a', thumbContainer);
            if (videoPageURIFilter.test(videoTitle.href)) {
                //add dl links
                getVideoInfo(videoTitle.href, function(videoInfoArray) {
                    writeDLLinks(videoInfoArray, thumbContainer);
                });
            } else {
                //hide ads
                var host = videoTitle.hostname;
                switch (host) {
                    case 'www.amazon.co.jp':
                        thumbContainer.style.display = 'none';
                        break;
                    
                    default:
                        break;
                }
            }
        }
    }
    
    
    
    //66
    function log(aString) {
        GM_log(aString);
    }
    
    function gt(aTagName, aDoc) {
        var doc = aDoc || d;
        
        return doc.getElementsByTagName(aTagName);
    }
    
    function gtf(aTagName, aDoc) {
        var doc = aDoc || d;
        
        return doc.getElementsByTagName(aTagName).item(0);
    }
    
    function gtl(aTagName, aDoc) {
        var doc = aDoc || d,
            nodes = doc.getElementsByTagName(aTagName);
        
        return nodes.item(nodes.length - 1);
    }
    
    function gc(aClassName, aDoc) {
        var doc = aDoc || d;
        
        return doc.getElementsByClassName(aClassName);
    }
    
    function gcf(aClassName, aDoc) {
        var doc = aDoc || d;
        
        return doc.getElementsByClassName(aClassName).item(0);
    }
    
    function gcl(aClassName, aDoc) {
        var doc = aDoc || d,
            nodes = doc.getElementsByClassName(aClassName);
        
        return nodes.item(nodes.length - 1);
    }
    
    function gi(aId) {
        return d.getElementById(aId);
    }
    
    function qs(aSelector, aDoc) {
        var doc = aDoc || d;
        
        return doc.querySelector(aSelector);
    }
    
    function qsa(aSelector, aDoc) {
        var doc = aDoc || d;
        
        return doc.querySelectorAll(aSelector);
    }
    
    function ga(aAttributeName, aAttributeValue, aTagName, aDoc) {
        var doc = aDoc || d,
            elements = gt(aTagName, doc),
            returnValue = [];
        
        for (var i = 0, ilen = elements.length; i < ilen; i++) {
            var element = elements.item(i);
            
            if (element.hasAttribute(aAttributeName)) {
                var attributes = ' ' + element.getAttribute(aAttributeName) + ' ';
                
                if (attributes.indexOf(' ' + aAttributeValue + ' ') !== -1) {
                    returnValue[returnValue.length] = element;
                }
            }
        }
        
        return returnValue;
    }
    
    function ce(aTagName) {
        return d.createElement(aTagName);
    }
    
    function cb(aButtonValue, aCallback) {
        var button = ce('input');
        
        button.type = 'button';
        button.value = aButtonValue;
        button.addEventListener('click', function() {
            aCallback();
        }, false);
        
        return button;
    }
    
    function aboutURI(aURI, aInstruction) {
        var anchor = ce('a');
        
        anchor.href = aURI;
        switch(aInstruction) {
            case 'create'   : return anchor;
            
            case 'protocol' : return anchor.protocol;
            case 'host'     : return anchor.host;
            case 'hostname' : return anchor.hostname;
            case 'port'     : return anchor.port;
            case 'pathname' : return anchor.pathname;
            case 'search'   : return anchor.search;
            case 'hash'     : return anchor.hash;
            
            default: throw 'invalid instruction: instruction = ' + aInstruction;
        }
    }
    
    function xhr(aURI, aOnLoad, aOnError) {
        var onError = aOnError || log,
            req = new XMLHttpRequest();
        
        req.open('GET', aURI);
        req.onreadystatechange = function() {
            if (req.readyState === 4 && req.status === 200) {
                aOnLoad(req);
                
                req.onreadystatechange = null;
                req = null;
            } else if (req.readyState === 4) {
                if (!aOnError) log('xhr: cannot load' + aURI + ' | status = ' + req.status);
                else aOnError(req);
                
                req.onreadystatechange = null;
                req = null;
            }
        }
        req.send(null);
    }
    
    function gmxhr(aURI, aOnLoad, aOnError) {
        var onError = aOnError || log;
        
        GM_xmlhttpRequest({
            method : 'GET',
            url    : aURI,
            onload : aOnLoad,
            onerror: onError
        });
    }
})(document);
