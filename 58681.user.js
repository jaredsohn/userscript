// ==UserScript==
// @name           pet feeder for baidu space
// @namespace      http://hi.baidu.com/buggylife
// @description    feed your pet or even everybody's pet automatically
// @include        http://hi.baidu.com/*
// ==/UserScript==

/** 
 * how many times to feed the pet. 
 * keep it small to avoid blocking.
 */
const FEED_COUNT = 20;

/**
 * the interval between each feeding.
 * keep it large to avoid blocking.
 */
const FEED_INTERVAL = 100;

// get user id from the portrait image address
var portraitSrc = document.getElementById('m_pro').getElementsByTagName('img')[0].src;
var userId = portraitSrc.match(/http:\/\/himg.baidu.com\/sys\/portrait\/item\/(\w+)\.jpg/)[1];

var intervalId = 0,
    cnt = 0;

function feed() {
    if (cnt++ < FEED_COUNT - 1) {
        (new Image()).src = 'http://act.hi.baidu.com/pet/' + userId + '/eat?t=' + Math.random();
    } else {
        clearInterval(intervalId);
    }
}

intervalId = setInterval(feed, FEED_INTERVAL);

