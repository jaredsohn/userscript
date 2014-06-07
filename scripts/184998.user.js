// ==UserScript==
// @name        computerra_deleted_messages
// @namespace   ct_disqus
// @description Show deleted messaged at www.computerra.ru
// @include     http://www.computerra.ru/* 
// @include     http://computerra.ru/*
// @version     1
// @grant       none
// ==/UserScript==
// 

if (self==top){
   var req = $.get(document.URL);
   req.done(function(str) {
            var start = str.indexOf('<div id="disqus_thread">');
            if (start == -1)
               return;
            var end = str.indexOf('<script', start);
            var thread_html = str.substring(start, end-1).replace('disqus_thread', 'disqus_super_thread');
            thread_html = '<style>#disqus_super_thread{font-size:15px; font-family: "Helvetica Neue",​arial,​sans-serif; font-style:normal}' +
                                 '#disqus_super_thread span{font-size:15px; font-family: "Helvetica Neue",​arial,​sans-serif; font-style:normal; font-weight:600; color:#288CE4;}' + 
                                 '#disqus_super_thread .comment {margin-left:10px;margin-top:10px}' +
                                 '#disqus_super_thread .depth-1 {margin-left:10px}' +
                                 '#disqus_super_thread .depth-2 {margin-left:20px}' +
                                 '#disqus_super_thread .depth-3 {margin-left:30px}' +
                                 '#disqus_super_thread .depth-4{margin-left:40px}' +
                                 '#disqus_super_thread .depth-5{margin-left:50px}' +
                          '</style>' + 
                          thread_html;
            $('#disqus_thread').first().before(thread_html);
         });
}