// ==UserScript==
// @id             142
// @name           Imgur - Force Blog Layout
// @version        1.0
// @namespace      
// @author         protospork
// @description    
// @include        http://imgur.com/a/*
// @exclude        http://imgur.com/a/*/noscript
// @exclude        http://imgur.com/a/*/all
// @exclude        http://imgur.com/a/*/layout/*
// @run-at         document-idle
// ==/UserScript==


var album = location.href.match(/a\/(\S{5})/)[1];
var cont = document.getElementById('content');

if (cont.classList.contains('grid') 
 || cont.classList.contains('horizontal')
 || cont.classList.contains('vertical')){
  
    location.href='http://imgur.com/a/'+album+'/layout/blog/';
    
}