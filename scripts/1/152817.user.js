// ==UserScript==
// @name          google-url-direct
// @namespace     http://hackwaly.me/user-js/google-url-direct/
// @description   fix link href in google search results to avoid trigger gfw.
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @include        http://www.google.com.hk/*
// @include        https://www.google.com.hk/*
// @include        https://www.google.tld/*
// @include        http://www.google.tld/*
// @author        hackwaly@gmail.com
// @thanks        FlyingSnow
// @thanks        http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/
// ==/UserScript==

(function (){
    function appendStyle(text){
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.appendChild(document.createTextNode(text));
        var seat = document.getElementsByTagName('head')[0] ||
            document.documentElement;
        seat.appendChild(style);
    }

    // appendStyle for NodeInserted event eumulation.
    var NODE_INSERTED = '__NodeInserted_';
    var HACKED = '__hacked_';
    var IRES = 'ires';

    function extractUrl(href){
        var parts = href.slice(href.indexOf('?') + 1).split('&');
        for (var j=parts.length; j--;) {
            var part = parts[j];
            part = part.split('=');
            if (part.length === 2 && part[0].toLowerCase() === 'url') {
                try {
                    href = decodeURIComponent(part[1]);
                } catch (ex){}
                break;
            }
        }
        return href;
    }
    function fixHrefs(ires){
        var ls = ires.querySelectorAll('a[href^="/url?"]');
        for (var j=ls.length; j--;) {
            var l = ls[j];
            l.setAttribute('href', extractUrl(l.getAttribute('href')));
        }
    }
    function fixOnmousedown(ires){
        var ls = ires.querySelectorAll('a[onmousedown^="return rwt("]');
        for (var j=ls.length; j--;) {
            var l = ls[j];
            l.setAttribute('onmousedown', '');
        }
    }
    function handleAnimationStart(evt){
        if (evt.animationName === NODE_INSERTED) {
            var ires = evt.target;
            ires.setAttribute(HACKED, 'true');
            fixHrefs(ires);
            fixOnmousedown(ires);
        }
    }
    document.addEventListener('animationstart', handleAnimationStart, false);
    document.addEventListener('webkitAnimationStart', handleAnimationStart, false);
    document.addEventListener('mozAnimationStart', handleAnimationStart, false);
    document.addEventListener('oAnimationStart', handleAnimationStart, false);

    (function (){
        var keyFramesBody = '' +
            ' __NodeInserted_ {' +
                'from { opacity: 0.99 }' +
                'to { opacity: 1 }' +
            '}';
        var animationDurationText = 'animation-duration: 0.001s;';
        var animationNameText = 'animation-name: ' + NODE_INSERTED + ';';
        var styleText = '@keyframes' + keyFramesBody +
            '@-webkit-keyframes' + keyFramesBody +
            '@-moz-keyframes' + keyFramesBody +
            '@-o-keyframes' + keyFramesBody +
            '#' + IRES + ':not([' + HACKED + ']) {' +
                animationDurationText +
                animationNameText +
                '-webkit-' + animationDurationText +
                '-webkit-' + animationNameText +
                '-moz-' + animationDurationText +
                '-moz-' + animationNameText +
                '-o-' + animationDurationText +
                '-o-' + animationNameText +
            '}';
        appendStyle(styleText);
    })();
})();
