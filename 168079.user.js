// ==UserScript==
// @name       More audio controls
// @namespace  http://gbl.ro
// @version    0.1
// @description  Add skip buttons to play large audio files. Remember play position 
// @match      http://*/*.mp3
// @match      file://*.mp3
// @copyright  2012+, dragulceo@gmail.com
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require    http://cdnjs.cloudflare.com/ajax/libs/mousetrap/1.2.2/mousetrap.min.js
// ==/UserScript==
jQuery(function ($) {
    //Add bootstrap styles
    $('html').append('<head><link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/css/bootstrap-combined.min.css" rel="stylesheet">' +
        + '<script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min.js"></script></head>');
    
    var video, videos = $('video'), i, n, $extra_controls, keyName = 'GBLEnhancedVideoControls', 
        saveTime, loadTime, runSaveTime, getVideoSrc, setInitTime, setVideoElInited, isVideoElInited;
    //for all video elements add buttons     
    for(i = 0, n = videos.length; i  < n; i++) {
        $(videos[i]).after('<div class="extra_controls" style="margin: 100px auto; text-align: center;">' +
                                   '  <a href="#skip_-120" class="btn">2m rwd</a>' +
                                   '  <a href="#skip_-60" class="btn">1m rwd</a>' +
        '  <a href="#skip_-15" class="btn">15s rwd</a>' +
                                   '  <a href="#skip_15" class="btn">15s fwd</a>' +
        '  <a href="#skip_60" class="btn">1m fwd</a>' +
        '  <a href="#skip_120" class="btn">2m fwd</a>' +
        '  <a href="#rate_1" class="btn">1x speed</a>' +
         '  <a href="#rate_1.5" class="btn">1.5x speed</a>' +
        '  <a href="#rate_2" class="btn">2x speed</a>' +
        '</div> ').css({width: '90%'});
    }
    $extra_controls = $(".extra_controls");
    //add handler for the new buttons
    $extra_controls.bind("click", function (e) {
        var $target = $(e.target), href = $target.attr("href"), elems = href.split("_");
        if(elems.length > 1 && elems[0] === "#skip") {
            $target.parent().prev()[0].currentTime += parseInt(elems[1], 10);
        }
        if(elems.length > 1 && elems[0] === "#rate") {
            $target.parent().prev()[0].playbackRate = parseFloat(elems[1]);
        }
        return false;
    });
    
    setVideoElInited = function (el) {
    	el.setAttribute('inited', true);
    };
    
    isVideoElInited = function () {
        return el.getAttribute('inited');
    };
    
    getVideoSrc = function (el) {
        return $(el).find("source")[0].getAttribute('src');
    };

    saveTime = function () {
        var i, n,  el, obj = GM_getValue(keyName) || {}, src;
        for(i = 0, n = videos.length; i  < n; i++) {
            el = videos[i];
            if(isVideoElInited(el)) {
            	src = getVideoSrc(el);
	           	obj[src] = el.currentTime;
            }
        }
        GM_setValue(keyName, obj);
    };
    
    setInitTime = function (el, currentTime) {
        el.addEventListener("loadedmetadata", function() {
            this.currentTime = currentTime;
            setVideoElInited(this);
        }, false);
    };
    
    loadTime = function () {
        var obj = GM_getValue(keyName), i, n, currentTime, src;
        if(obj) {
	        for(i = 0, n = videos.length; i  < n; i++) {
    	        el = videos[i];
                src = getVideoSrc(el);
                currentTime = obj[src];
                if(currentTime) {
					setInitTime(el, currentTime);
                } else {
					setVideoElInited(el);
                }
    	    }
        }
		setTimeout(runSaveTime, 5000);
    };
       
    runSaveTime = function () {
        saveTime();
        setTimeout(runSaveTime, 5000);
    };
    loadTime();
    
    
    Mousetrap.bind(['{','[',']','}'], function(e) {
        var seconds = 0;
        switch(e.keyCode) {
            case 123: seconds = -60;break;
            case 91: seconds = -15;break;
        	case 93: seconds = 15;break;
        	case 125: seconds = 60;break;
        }
        for(i = 0, n = videos.length; i  < n; i++) {
            if(Math.abs(videos[i].playbackRate) > 0.002) {
                videos.eq(i).next().find('a[href=#skip_' + seconds +']').trigger('click');
            }
        }
    	return false;
	});
    
    

});
