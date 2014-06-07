// ==UserScript==
// @name        weibo share collect
// @namespace   robaggio.net
// @include     http://huati.weibo.com/k/*
// @version     1
// ==/UserScript==
(function (window) {
    "use strict";
    function $(id) { return document.getElementById(id); }
    function submit_links(){
        var links = document.querySelectorAll('li.list_feed_li');
        var len = links.length;
        var mids=[];var usernames=[];var userids=[];var pics=[];
        for (var i = 0; i < len; i++) {
            var text = links[i].getElementsByTagName('em')[0].textContent;
            if(text.substring(0,4)!='#回家#')continue;
            console.log(text);
            mids.push(links[i].getAttribute("list-data").split('=')[1]);
            usernames.push(links[i].getElementsByClassName('con_txt')[0].firstElementChild.title);
            userids.push(links[i].getElementsByClassName('con_txt')[0].firstElementChild.getAttribute('action-data').split('=')[1]);
            pics.push(links[i].getElementsByClassName('bigcursor')[0].src.split('/')[4]);
            links[i].style.backgroundColor = "red";
        }
        if(mids.length){
            var data = 'mid='+mids.join(',')+"&uid="+userids.join(',')+"&pic="+pics.join(',')+"&u="+usernames.join(',');
            GM_xmlhttpRequest({
              method: "POST",
              url: "http://k4push.appspot.com/weibo/in",
              data: data,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              onload: function(response) {
                alert(mids.length+' done');
              }
            });
        }
    }
    $('pl_content_hotTopic').addEventListener('click', function(event) {
            submit_links();
        }, false);
})(window);