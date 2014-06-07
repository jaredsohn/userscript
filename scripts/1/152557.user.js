// ==UserScript==
// @name        SoundCloud denoiser
// @namespace   https://flavors.me/noromanba
// @description no buzz, want music; hide comments on SoundCloud
// @include     http://soundcloud.com/*
// @version     2012.11.18.2
// @homepage    https://userscripts.org/scripts/show/152557
// @downloadURL https://userscripts.org/scripts/source/152557.user.js
// @installURL  https://userscripts.org/scripts/source/152557.user.js
// @updateURL   https://userscripts.org/scripts/source/152557.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://flavors.me/noromanba)
// @author      noromanba
// @icon        https://raw.github.com/gist/4088002/dontdisturb-32px.png
// @icon64      https://raw.github.com/gist/4088002/dontdisturb-64px.png
// ==/UserScript==

// Orig. Icon (Public Domain by McSush and ikaxer)
// https://commons.wikimedia.org/wiki/File:Blocked_rabbit.svg

// stfu enjoy music e.g. http://soundcloud.com/skrillex/
(function () {
    // TBD shrink to '#main-wrapper' or players, allow comments-toggle
    var container = document.querySelector('#main-content-inner');
    if (!container) return;

    // TBD omit closure and immediately function
    var quiet = (function () {
        //var selector = ['.small', '.medium', '.large'].map(function (a) { return (a + '.mode.player'); }).join(', ');
        var selector = '.small.mode.player, .medium.mode.player, .large.mode.player',
            silence = 'no-comments';
        return function (node) {
            // c.f. https://developer.mozilla.org/en-US/docs/DOM/Node.nodeType
            //      http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1950641247
            //if (node.nodeType !== Node.ELEMENT_NODE) return;
            //if (node.nodeType === Node.TEXT_NODE) return;

            Array.prototype.slice.call(container.querySelectorAll(selector)).forEach(function (player) {
                if (player.className.indexOf(silence) > -1) return;
                player.className += ' ' + silence;
            });
        };
    })();
    quiet(container);

    // XXX too many invocation. use with debouncing / throttling function calls
    // TBD replace to MutationObserver
    //     c.f. https://developer.mozilla.org/en-US/docs/DOM/MutationObserver
    //          https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
    container.addEventListener('DOMNodeInserted', function (evt) {
        //console.info('*' + event.type);
        quiet(evt.target);
    }, false);

    // XXX emulation layor in Chrome
//    container.addEventListener('DOMAttrModified', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);

    // FIXME events not fire. also add strange prefix 'on'
    // SoundCloud CustomEvents c.f. http://developers.soundcloud.com/docs/custom-player#events
//    container.addEventListener('PlayerInit.scPlayer', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('PlayerPlay.scPlayer', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaTimeUpdate.scPlayer', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('PlayerPause.scPlayer', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('PlayerTrackSwitch.scPlayer', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);

    // FIXME events not fire. also add strange prefix 'on'
    // c.f. https://github.com/soundcloud/soundcloud-custom-player/blob/master/js/soundcloud.player.api.js#L98
//    container.addEventListener('PlayerReady', function (evt) {
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaStart', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaEnd', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaPlay', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaPause', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaBuffering', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaSeek', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('MediaDoneBuffering', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
//    container.addEventListener('PlayerError', function (evt) {
//        console.info('*' + event.type);
//        quiet(evt.target);
//    }, false);
})(); // /anon wrap