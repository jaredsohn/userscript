// ==UserScript==
// @name        Embedded videos to html5
// @description Force embedded videos to use html5 player
// @namespace   
// @include     http://*
// @include     https://*
// @version     1.2
// @grant       GM_registerMenuCommand
// @author   SkyghiS
// ==/UserScript==

function setHtml5() {
    var sites = [
        { "matcher": "//www.dailymotion.com", "suffix": "html=1"},
        { "matcher": "//www.youtube.com", "suffix": "html5=1"}
    ]
    var iframes = document.getElementsByTagName("iframe");
    for (var i in iframes) {
        var iframe = iframes[i];
        if (iframe && iframe.src) {
            for (var j in sites) {
                var site = sites[j];
                if (iframe.src.contains(site.matcher) && iframe.src.indexOf(site.suffix, iframe.src.length - site.suffix.length) === -1) {
                    var separator = iframe.src.contains('?') ? '&' : '?';
                    iframe.src += separator + site.suffix;
                }
            }
        }
    }
}

function createShortcut(key) {
    document.onkeydown = function(e) {
        if(e.which == key) {
            //Don't enable shortcut keys in Input, Textarea fields
    		var element = e.target ? element = e.target : e.srcElement;
    		if (element.nodeType == 3) {
    		  element = element.parentNode; // TEXT_NODE
    		}
    		if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
    		  return true;
    		}
            setHtml5();
            return false;
        }
    }
}

function autoStart() {
    var sites = [
        "//www.spi0n.com/"
    ];
    for (var i in sites) {
        if (document.URL.contains(sites[i])) {
            setHtml5();
        }
    }
}

function registerShortcut() {
    var sites = [
        "//feedly.com/"
    ];
    for (var i in sites) {
        if (document.URL.contains(sites[i])) {
            createShortcut(72); // 72 = 'h'
        }
    }
}

GM_registerMenuCommand("use HTML5", setHtml5, "h");
registerShortcut();
autoStart();
