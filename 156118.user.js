// ==UserScript==
// @name        cuenation SCPlayer
// @namespace   http://cuenation.com
// @downloadURL http://userscripts.org/scripts/source/156118.user.js
// @updateURL   http://userscripts.org/scripts/source/156118.meta.js
// @include     http://cuenation.com/?page=tracklist*.cue
// @version     0.6.2
// @grant       none
// ==/UserScript==

/**
 * Changelog
 * v0.1         Initial version
 * v0.2         switched to SC Widget API
 * v0.3         Added some style
 * v0.4         'Now playing...' caption
 * v0.4.1       Cursor changed to pointer
 * v0.5         Added cursor, play/pause fix 
 * v0.6         Hidden/visible player
 * v0.6.1       Support for private tracks with secret_token 
 * v0.6.2       LOAD_PROGRESS is not supported any more         
 *  
 *
 * Todo list, known issues:
 * - Chrome support
 * - volume control
 * - Remove jquery dependency
 * - document and optimize code 
 *          
 */

var doc = document;
var forEach = Array.prototype.forEach;

var $ = null;
var SC = null;
var widget = null;

var loadedPercent = 0.0;
var loadedMs = 0;
var duration = 0;
var lastLoadedTrack = 0;
var tracks = new Array();
var currentIdx = -1;
var paused = true;

/* General class for the Tracks */
function Track(_o, _l, _e, _clickCallback) {
    this.offset = _o;
    this.element = _e;
    this.length = _l
    var self = this;
    this._addEvent('click', function(e){
        _clickCallback(self.offset);
        e.stopPropagation();
    });
}

Track.prototype.Length = function() {
    return this.length;
}

Track.prototype.Offset = function() {
    return this.offset;
}

Track.prototype.Element = function() {
    return this.element;
}

Track.prototype._addEvent = function(eventName, callback) {
    if (this.element.addEventListener) {
        this.element.addEventListener(eventName, callback, false);
    } else {
        this.element.attachEvent(eventName, callback, false);
    }
} 

/***************************/
/******** Functions */

// Init Soundcloud player widget API
function initSC1() {
    var sc = doc.createElement('script');
    sc.src = 'https://w.soundcloud.com/player/api.js';
    sc.type = 'text/javascript';
    sc.id = 'api1';
    sc.onload = function () {
        initSC2();
    }
    doc.getElementsByTagName('head')[0].appendChild(sc);
}

// Init Soundcloud general API 
function initSC2() {
    var sc = doc.createElement('script');
    sc.src = 'https://connect.soundcloud.com/sdk.js';
    sc.type = 'text/javascript';
    sc.onload = function () {
        initJQ();
    }
    doc.getElementsByTagName('head')[0].appendChild(sc);
}

// Init JQuery 
function initJQ() {
    var jq = doc.createElement('script');
    jq.src = 'http://code.jquery.com/jquery.min.js';
    jq.type = 'text/javascript';
    jq.onload = function() {
        initWidget();
    }
    doc.getElementsByTagName('head')[0].appendChild(jq);
}


// Function to retrieve the SC url from the links divs 
function getSCUrl() {
    var anchors = times = doc.querySelectorAll('a.clear');
    var firstUrl = '';
    var found = false;
    forEach.call(anchors, function(anchor){
        if (anchor.href.indexOf('soundcloud.com') > 0 && !found) {
            firstUrl = anchor.href;
            found = true;
        }
    });
    if (firstUrl != ''){
        var re = new RegExp('.*url=(.*soundcloud\.com.*)', 'g');
        var arr = re.exec(firstUrl);
        var url = unescape(arr[1]);
        if (url.indexOf('/download') > 0) {
            url = url.replace('download', '');
        }
        return url;
    }else {
        return '';
    }
}

// Init the Soundcloud widget
function initWidget() {
    $ = unsafeWindow.jQuery;
    SC = unsafeWindow.SC;

    var placeholder = $('h2.title');
    var track_url = getSCUrl();
    if (track_url != '') {
        SC.initialize({
            client_id: 'YOUR_CLIENT_ID'
        });
        SC.get('/resolve', {url: track_url},  function(track){
            if (track.id == null || track.id == undefined) {
                addNoSC(placeholder, 'Track is removed. Player is disabled.');
            } else {
                var minimized = false;
                var soundurl = track.uri;
                var woptions = '&auto_play=false&auto_advance=false&buying=true&liking=true';
                woptions += '&download=true&sharing=true&show_artwork=false&show_comments=false';
                woptions += '&show_playcount=true&show_user=false';
        
                placeholder.after('<div id="box"><table id="boxCaption"><tr><td id="showhide"></td><td id="current"></td></tr></table><iframe class="ifr" width="100%" height="160" scrolling="no" frameborder="no"></iframe></div>');
                
                var ifr = doc.querySelector('.ifr');
                ifr.style.transition = 'height 0.5s linear 0s';
                ifr.style.height = '160px';
                ifr.src = 'https://w.soundcloud.com/player/?url=' + soundurl + woptions;
                widget = SC.Widget(ifr);
            
                initEvents();
                var boxCaption = doc.querySelector('#boxCaption');
                boxCaption.style.color = '#aaa';
                boxCaption.style.margin = '0px';
                boxCaption.style.cursor = 'pointer';
                boxCaption.style.backgroundColor = '#f5f5f5';
                boxCaption.style.border = '1px solid #e5e5e5';
                boxCaption.style.width = '100%';
                boxCaption.style.height = '10px';
                boxCaption.style.tableLayout = 'fixed';
                
                var sh = doc.querySelector('#showhide');
                sh.style.paddingRight = '4px';
                sh.style.width = '90px';
                sh.innerHTML = '<< Hide Player';
                
                var box = doc.querySelector('#box');
                box.style.height = '170px';
                box.style.transition = 'height 0.5s linear 0s';
                
                boxCaption.addEventListener('click', function(e) {
                    if (!minimized){
                        box.style.height = '10px';
                        ifr.style.height = '0px';
                        minimized = true;
                        sh.innerHTML = '>> Show Player';
                    } else {
                        box.style.height = '170px';
                        ifr.style.height = '160px';
                        minimized = false;             
                        sh.innerHTML = '<< Hide Player';       
                    }
                });                
            }    
        });
    } else {
        addNoSC(placeholder, 'No soundcloud link is found. Player is disabled.');        
    }    
}

function addNoSC(placeholder, msg) {
    placeholder.after('<div class="noSC">'+msg+'</div>');
    var noSC = doc.querySelector('.noSC');
    noSC.style.color = '#999';
    noSC.style.paddingLeft = '0px';
    noSC.style.paddingBottom = '0px';
    noSC.style.fontStyle = 'italic';
}

// bind to SC events
function initEvents(){
    if (widget == null) {
        return;
    }
    
    widget.bind(SC.Widget.Events['READY'], function(){
        widget.setVolume(20);
        widget.getDuration(function(val){
            duration = val;
        }); 
    });
    
    widget.bind(SC.Widget.Events['PLAY_PROGRESS'], function(eData){
        var idx = getCurrentTrack(eData);
        if (idx != currentIdx) {
            removeCursor(currentIdx);
            addCursor(idx);
            currentIdx = idx;
        }
        
        loadedPercent = eData.loadedProgress;
        loadedMs = duration * loadedPercent;
        for (var i = lastLoadedTrack; i < tracks.length; i++) {
            if (tracks[i].Offset() <= loadedMs) {
                tracks[i].Element().style.textDecoration = 'underline';
                tracks[i].Element().style.color = 'rgba(255,102,0,1.0)';
                tracks[i].Element().style.fontWeight = 'bold';
                tracks[i].Element().style.cursor = 'pointer';
                lastLoadedTrack = i;
            }     
        }
    });
    
    widget.bind(SC.Widget.Events['PAUSE'], function(eData){
        var idx = getCurrentTrack(eData);
        paused = true; 
        var p = doc.querySelector('.pauseBtn');
        if (p != null){
            p.innerHTML = 'play';
        }
    });
    
    widget.bind(SC.Widget.Events['PLAY'], function(eData){
        var idx = getCurrentTrack(eData);
        paused = false; 
        var p = doc.querySelector('.pauseBtn');
        if (p != null){
            p.innerHTML = 'pause';
        }
    });
    
    widget.bind(SC.Widget.Events['FINISH'], function(eData){
        seekTo(0)
        widget.pause(); 
    });
}

function removeCursor(idx) {
    if (idx < 0) {
        return;
    }
    var idxElement = tracks[idx].Element().nextSibling;
    var titleElement = tracks[idx].Element().nextSibling.nextSibling;
    if (titleElement != null && idxElement != null) {
        idxElement.style.backgroundColor = 'rgba(255,255,255,0.0)';
        titleElement.style.backgroundColor = 'rgba(255,255,255,0.0)';
    }
    var toRemove = doc.querySelector('.pauseBtn');
    if (null != toRemove) {
        toRemove.parentNode.removeChild(toRemove);
    }
}

function addCursor(idx) {
    var idxElement = tracks[idx].Element().nextSibling;
    var titleElement = tracks[idx].Element().nextSibling.nextSibling;
    if (titleElement != null && idxElement != null) {
        idxElement.style.backgroundColor = 'rgba(255,102,0,0.3)';
        titleElement.style.backgroundColor = 'rgba(255,102,0,0.3)';
    }
    var span = document.createElement('span');
    span.setAttribute('class', 'pauseBtn');
    span.innerHTML = paused ? 'play' : 'pause';
    span.style.paddingLeft = '7px';
    span.style.color = 'rgba(255,102,0,1.0)';
    span.style.fontWeight = 'bold';
    span.style.cursor = 'pointer';
    
    var cp = doc.querySelector('#current');
    cp.style.color = 'rgba(255,102,0,1.0)';
    cp.style.paddingLeft = '4px';
    cp.style.paddingRight = '4px';
    cp.style.borderLeft = '1px solid #e5e5e5';
    cp.innerHTML = '<marquee behavior="alternate" scrollamount=1 scrolldelay=5>Now playing: ' + titleElement.innerHTML + '</marquee>';
    
    span.addEventListener('click', function(e){
        if (!paused) {
            widget.pause();
        } else {
            widget.play();
        }
    });
    
    titleElement.appendChild(span);
}

function getCurrentTrack(eData) {
    var currPos = eData.currentPosition;
    var currIdx = 0;
    var found = false;
    
    if (currPos >= tracks[tracks.length-1].Offset()) {
        currIdx = tracks.length-1;
        found = true;
    }
    for (var i = 0; i < tracks.length - 1 && !found; i++) {
        if (tracks[i].Offset() <= currPos && tracks[i+1].Offset() > currPos) {
            currIdx = i;
            found = true;
        }
    }
    return currIdx;
}

// seek to a certain position in milliseconds
function seekTo(ms) {
    if (null != widget) {
        if (ms <= loadedMs){
            widget.seekTo(ms);
            widget.play();
        } else {
            //???
        }                    
    }
}

// init the 'buttons': time offsets on the page
function initButtons() {
    var times = doc.querySelectorAll('.timeindex');
    
    for (var i = 0; i < times.length; i++) {
        var tracktimeParts = times[i].innerHTML.replace(/^.(\s+)?/, '').replace(/(\s+)?.$/, '').split(':');
        var ms = tracktimeParts[0]*60000 + tracktimeParts[1]*1000;
        var trackLengthElement = times[i].nextSibling.nextSibling.nextSibling;
        if (trackLengthElement != null) {
            var l = trackLengthElement.innerHTML.replace(/^.(\s+)?/, '').replace(/(\s+)?.$/, '').split(':');
            var newTrack = new Track(ms, l, times[i], seekTo);        
            tracks[i] = newTrack;
        }
    }
}


// MAIN
initButtons();
initSC1();


