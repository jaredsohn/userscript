// ==UserScript==
// @name        YouTube - New video checker
// @namespace   http://userscripts.org/scripts/show/432975
// @include     https://www.youtube.com/feed/subscriptions
// @version     1.0.3
// @grant       none
// ==/UserScript==

// Helpers
Element.prototype.closestByClassName = function(className) {

    return this.className && this.className.split(' ').indexOf(className) > -1
       ? this
       : (this.parentNode.closestByClassName && this.parentNode.closestByClassName(className));
};

function YouTube() {
    
    this.config = {
        LOAD_PAGES: 2,
        INTERVAL: 10000 // 10 seconds
    };
    
    this.newVideos = 0;
    this.newVideosSinceCheck = 0;
    
    this.feedList = document.querySelector('.feed-list');
   
    this.title = document.querySelector('title');
    this.defaultTitle = this.title.innerHTML;
    
    this.setContent();
}

YouTube.prototype.setConfig = function(key, value) {
    
    this.config[key] = value;  
};

YouTube.prototype.getConfig = function(key) {
    
    return this.config[key];  
};

YouTube.prototype.checkForVideos = function() {
    
    var i = 0,
        url = 'https://www.youtube.com/feed_ajax?action_load_system_feed=1&feed_name=subscriptions&paging=',
        promise = [],
        currentPageCount = document.querySelector('.feed-container').dataset.paging / 16;
    
    // Keep track of the page count
    if(currentPageCount > this.getConfig('LOAD_PAGES')) {
        
        this.setConfig('LOAD_PAGES', currentPageCount);
    }
    
    for(i; i < this.getConfig('LOAD_PAGES'); i++) {

        promise[i] = new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + (i * 16), true);
            xhr.responseType = 'jsonp';  
            xhr.onload = function(e) {

                resolve(JSON.parse(this.responseText).content_html);
            };
            xhr.send();
        }.bind(this));
    }
    
    Promise.all(promise).then(function(content) {

        this.setContent(content.join(''));
    }.bind(this));
};

YouTube.prototype.setContent = function(doc) {

    if(typeof doc !== 'undefined') {
        
        this.feedList.innerHTML = doc;
        document.querySelector('.feed-container').dataset.paging = this.getConfig('LOAD_PAGES') * 16;
    }
    
    var videos = this.feedList.querySelectorAll('.yt-lockup-thumbnail'),
        watchedVideos = this.feedList.querySelectorAll('.watched');
    
    this.newVideos = videos.length - watchedVideos.length;
    this.title.innerHTML = '(' + this.newVideos + ') ' + this.defaultTitle;
    
    // Load the thumbnails
    [].forEach.call(this.feedList.querySelectorAll('.yt-thumb-clip img'), function(element) {

        element.src = element.dataset.thumb;
    });
    
    // Better distinction between new and watched videos
    if(this.newVideos > 0) {
        
        [].forEach.call(videos, function(video) {

            if(video.childNodes[1].className.indexOf('watched') === -1) {

                video.closestByClassName('feed-item-container').style.boxShadow = '-2px 0 0 #CC181E';
            }
        });
    }

    if(this.newVideos > this.newVideosSinceCheck) {

        this.newVideosSinceCheck = this.newVideos;
    
        if(Notification.permission === 'granted' && !document.hasFocus()) {

            new Notification('YouTube', {
                body: this.newVideos + ' new video' + (this.newVideos > 1 ? 's' : '') + ' available'
            });
        }
    }
};

// Ask for permission to show notifications
if(Notification.permission !== 'denied') {

    Notification.requestPermission(function(permission) {

        if(!('permission' in Notification)) {

            Notification.permission = permission;
        }
    });
}

var yt = new YouTube();

setInterval(function() {

    yt.checkForVideos();
}, yt.getConfig('INTERVAL'));