// ==UserScript==
// @name           Github Sort By Time
// @namespace      GSBT
// @description    Sorts Github file listings by newest-oldest time automatically.
// @include 	   https://github.com/*
// @include 	   http://github.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require        http://tinysort.googlecode.com/svn/trunk/web/scripts/jquery.tinysort.js
// @author         drhouse
// @version        1.0.1
// ==/UserScript==

$(document).ready(function () {
    
    function timeformat(){
        'use strict';
        function format(timeElem){
            var time=timeElem.title||timeElem.datetime;
            if(time){
                timeElem.innerHTML=time;
            }
        }
        function onDOMSubtreeModifiedHandler(e){
            var target = e.target;
            // console.log(target);
            if(target.nodeType === 1 && /TIME/ig.test(target.nodeName)&&/ago/.test(target.innerHTML)) {
                format(target);
            }
        }
        (function(){
            var matches = document.querySelectorAll('time');
            for(var i = 0; i < matches.length; ++i) {
                format(matches[i]);
            }
        })();
        //document.addEventListener('DOMSubtreeModified', onDOMSubtreeModifiedHandler, false);
    }
    
    $('#js-repo-pjax-container > div.bubble.files-bubble').prepend(' <a id="content">Content</a> | <a id="message">Message</a></center> | <a id="age">Age</a><br><hr>');
    
    var table = $('#js-repo-pjax-container > div.bubble.files-bubble > table > tbody');
    
    if (table.length > 0){
        
        var reviews = $('#js-repo-pjax-container > div.bubble.files-bubble > table > tbody > tr');
        
        $('#content').click(function(){
            reviews.tsort('.content',{order:'asc'},{place:'start'});
        });
        
        $('#message').click(function(){
            reviews.tsort('.message',{order:'asc'});
        });
        
        $('#age').click(function(){
            timeformat();
            reviews.tsort('.age',{order:'desc'});
            $('.age').css('text-overflow','initial');
        });
        
        timeformat();
        reviews.tsort('.age',{order:'desc'});
        
    }
    
});