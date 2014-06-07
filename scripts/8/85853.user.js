// ==UserScript==
// @name           vBulletin Mark thread as read
// @description    Mark thread as read by clicking on it in thread list (vBulletin 3.x)
// @namespace      tag:Manko10@php.de,2010-09-10:MankoMarkRead
// @license        GPLv3
// @version        1.0.0
// ==/UserScript==

var threadslistTable = document.getElementById('threadslist');

if (null !== threadslistTable) {
    var images = threadslistTable.getElementsByTagName('img');
    
    for (var k = 0; k < images.length; ++k) {
        if (/_new\.gif$/.test(images[k].src) && images[k].id) {
            var threadID    = images[k].id.split('_')[2];
            var hasNewPosts = document.getElementById('thread_gotonew_' + threadID) ? true : false;
            var iconCursor  = document.getElementById('thread_statusicon_' + threadID).parentNode.style.cursor;
            
            if (hasNewPosts) {
                with (images[k]) {
                    parentNode.style.cursor = 'pointer';
                    title                   = 'Mark thread as read';
                };
                
                images[k].addEventListener('click', function() {
                    if (!/_new\.gif$/.test(this.src)) {
                        return;
                    };
                    
                    // re-initialize threadID with thread ID of clicked thread
                    var threadID      = this.id.split('_')[2];
                    var linkElement   = document.getElementById('thread_title_' + threadID);
                    var threadNewLink = document.getElementById('thread_gotonew_' + threadID);
                    
                    // save img element reference and src value for closure, then change icon
                    var iconReference = this;
                    var iconSrc       = this.src;
                    this.src          = iconSrc.replace(/statusicon\/[^\/]+_new\.gif$/, 'misc/progress.gif');
                    
                    // request last page, in order to mark it read
                    var xmlHttpObject = new XMLHttpRequest();
                    xmlHttpObject.onreadystatechange = function() {
                        if (4 == this.readyState && 200 == this.status) {
                            // change icon back, reset title and cursor
                            iconReference.src                     = iconSrc.replace(/_new\.gif$/, '.gif');
                            iconReference.title                   = null;
                            iconReference.parentNode.style.cursor = iconCursor;
                            
                            threadNewLink = null;
                        };
                    };
                    xmlHttpObject.open('GET', linkElement.href.replace(/\.html$/, '-new-post.html'));
                    xmlHttpObject.send(null);
                    
                    // remove font-weight: bold and arrow image
                    linkElement.style.fontWeight = null;
                    linkElement.parentNode.removeChild(threadNewLink);
                }, false);
            };
        };
    };
};