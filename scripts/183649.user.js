// ==UserScript==
// @name       Change Share Format on SoundCloud
// @namespace  https://twitter.com/trashour
// @version    0.1.2
// @description  SoundCloudのTwitter投稿フォーマットをコンパクトにする
// @include      https://twitter.com/intent/*
// ==/UserScript==
 
var url = document.location.href;
var l = ['Have+you+heard+%E2%80%98', '%E2%80%99', '+on+%23SoundCloud%3F'];
var newurl = url.replace(l[0], '').replace(l[1], '').replace(l[2], '');

if (url != newurl){
    var tf = url.indexOf('tweet?original_referer=https%3A%2F%2Fsoundcloud.com');
 
    if (tf != -1){
    location.replace(newurl);
    }    
}