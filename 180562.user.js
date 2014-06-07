// ==UserScript==
// @name       Dumpert video and audio without Flash, search Haadee video if available
// @namespace  http://userscripts.org/users/536306
// @version    1.1
// @description  Lookup Video or Audio and make it work with html5, also add some nice css3
// @match      *://www.dumpert.nl/*
// @copyright  2014+, Jeroen Boersma
// ==/UserScript==

(function(window, document, undefined) {
    
    function $(id) {
        return document.getElementById(id);
    }
    
    var width = 815, height = 480;
    
    function addStyles()
    {
        var s = GM_addStyle;
        
        s('#dumplogo {-webkit-transform: scale(0.5); background-position: 0 -138px; height: 93px; left: -74px; top: -10px;}');
        s('#header {background-position: 0 -13px; height: 97px;}');
        s('#dumphole {background-position-y: -149px; height: 260px;}');
        s('#dumphole h1 {top: 110px;}');
        s('#dumphole h2 {top: 147px;}');
        
        s('#subheader {overflow: inherit;}');
        s('#dumpsearch {top: -40px;left: 300px;width: 410px;height: 26px;}');
        s('#dumpsearch #searchquery {width: 260px;font-size: 16px;height: 25px;line-height: 25px;}');
        s('#dumpsearch select {font-size: 16px;height: 25px;line-height: 25px;}');
        s('#dumpsearch #searchsubmit {left: auto;right: 0;height: 25px;}');        
        s('p#contentfilter + ol.pagination {display: none;}');
        
        s('a.dumpthumb {width: 416px; margin: 0 10px 10px 0px;}');
        s('a.dumpthumb:hover {margin: -1px 10px 11px 0px;}');
        s('a.dumpthumb .details {width: auto;}');
        
        s('#bekijkook .dumpthumb {width: auto;}');
        
        
        s('#playerarea #item {margin-top: 29px; width: 815px;}');
        s('#item1, #item2 {width: 815px; text-align: center;}');
        s('.foto {text-align: center;}');
        s('#share {text-align: right; padding-right: 15px; margin-top: -33px;}');
        
        s('#iteminfo h1 {position: absolute; top: 10px; left: 10px; width: 815px;}');
        s('#comments {margin-top: -180px; z-index: 1000; position: relative;}');        
        s('.geldbakje, #glamorama {height: 155px; margin-bottom: 20px;}');
        
        s('#gzoomoverlay {position: fixed; top: 0; left: 0; bottom: 0; z-index: 1100;}');
        s('#gzoomlbox {z-index: 1200;}');
        
    }
    
    function bigPlayer(item)
    {
        item.parentNode.style['width'] = 'auto';
        item.parentNode.style['height'] = 'auto';
        
        item.style['width'] = width + 'px';
        item.style['height'] = height + 'px';
    }

    function replaceWithAudio(item) {
        var src = ((item.getAttribute('data-audurl') || item.href) + '');
        
        if (!src) {
            return;
        }
        
        var audio = document.createElement('audio');
        
        audio.width = item.clientWidth;
        audio.height = item.clientHeight;
        audio.controls = true;
        
        audio.src = src;
        
        item.parentNode.insertBefore(audio, item);
        item.parentNode.removeChild(item);
        
        audio.play();
    }    
    
    function replaceWithVideo(item) {
        var src;
        
        if (item.tagName.toLowerCase() == 'object') {
            src = unescape(item.children[item.children.length-1].value.match(/file=([^&]+)&/)[1]);
        } else {
            src = ((item.getAttribute('data-vidurl') || item.href) + '');
        }
        
        if (!src) {
            return;
        }
                
        bigPlayer(item);
        
        if (src.match(/\.flv/)) {
            src = src.replace('/flv/', '/').replace(/\.flv$/, '.mp4').replace('//media.', '//m.');
        }
        
        var video = document.createElement('video');
        var source = document.createElement('source');
        
        video.appendChild(source);
        
        video.width = item.clientWidth;
        video.height = item.clientHeight;
        video.controls = true;
        video.preload = true;
        
        source.type = 'video/mp4';
        source.src = src;
        
        item.parentNode.insertBefore(video, item);
        item.parentNode.removeChild(item);
        
        // autoplay
        video.play();
        
        // find if hd is available
        findHaadeeInComments(video);
    }
    
    function findHaadeeInComments(video)
    {
        if (!comments || !comments.length) {
            setTimeout((function(){return function(){
            	findHaadeeInComments(video);
            };})(), 100);
            return;
        }
        
        var comment, youtube;
        for (var a = 1; a < comments.length; a+=3) {
            comment = comments[a];
            
            if (comment) {
                comment = comment.replace(/<\/?(p)>/g, '');
                
                if (comment.match(/(\s|^)(d+h+|h+d+|h+a+d+e+)(\s|:|\.|,|$)/i) && comment.match(/youtu/i)) {
                    youtube = comment.match(/href="([^"]+)"/)[1];
                    break;
                }
            }
        } 
        
        if (youtube) {

            var iframe = document.createElement('iframe');
            iframe.width = width + 'px';;
            iframe.height = height + 'px';;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.src = '//www.youtube.com/embed/' + youtube.match(/[\/=]([^\/=]+)$/)[1] + '?autohide=1&autoplay=1&controls=1&rel=0&showinfo=1&vq=hd1080&hd=1&iv_load_policy=3';
            
            video.parentNode.appendChild(iframe);
            video.parentNode.removeChild(video);
        }
    }
    
    function load() {
        addStyles();
        
        var item = $('item1') || $('item2');
                
        if(item && item.className.indexOf('audio') !== -1) {
            replaceWithAudio(item);
        } else if(item && (item.className.indexOf('video') !== -1 || item.href || item.type === 'application/x-shockwave-flash')) {
            replaceWithVideo(item);
        }
    }
    
    load();

})(unsafeWindow, unsafeWindow.document);