// ==UserScript==

// @name        expand chan images (by default)
// @include     http*//*/*/res/*
// @include     http*//*/*/thread/*
// @include     http*//*/topic/*
// @include     http*//*/brchive/*
// @namespace   somefox
// @description this script works on sites that uses 4chan-like boardsoftware and even alot of non chan sites - add more sites to test if it works
// @updateURL   https://userscripts.org/scripts/source/136114.user.js
// @grant       none
// @version     0.14

// ==/UserScript==

//var rxImages = new RegExp('[\.](jpg|jpeg|png|svg|gif)', 'gi');  //breaks sometimes, currently disabled
var knownimgids = 0;
var knownimgs = [];
var managedimgs = [];
var brokenimgs = [];
function isScaledImg(img) {
    var src = img.src;
    var ret;
    var parent = getParent(img);
    if (parent) {
        if (parent.nodeName == 'A') {
            if (parent.hasAttribute('href')) {
                var href = parent.href;
                var sEnding = src.substring(src.lastIndexOf('.'), src.length).toLowerCase();
                var hEnding = href.substring(href.lastIndexOf('.'), href.length).toLowerCase();
                if (sEnding == hEnding || hEnding == '.jpg' || hEnding == '.jpeg' || hEnding == '.png' || hEnding == '.gif' || hEnding == '.svg' || hEnding == '.webm') {
                    ret = true;
                }
            }
        }
    }
    return ret;
}
function addEvents(img){
    img.addEventListener('error', function () {
        handleImgError(img.id)
    });
    img.addEventListener('load', function () {
        handleImgLoad(img.id)
    });
}
function getParent(img) {
    var parent = img.parentNode;
    if (parent.nodeName == 'SPAN') {
        parent = parent.parentNode;
    }
    if(parent.nodeName == 'A') {
        return parent;
    }
}
function checkImg(img) {
    if (isScaledImg(img)) {
        if(!img.id) {
            img.id = 'replacedimg' + knownimgids;
        }
        knownimgids++;
        knownimgs.push(img.id);
    }
}
function resizeImg(img) {
    var rect = img.getBoundingClientRect();
    var maxwidth = window.innerWidth - rect.left - 50;
    var maxheight = window.innerHeight - 50;
    img.setAttribute('style', 'max-width:' + maxwidth + 'px;max-height:' + maxheight + 'px;');
}
function remanageImgWidth(imgid) {
    var img = document.getElementById(imgid);
    if(img) {
        if (img.hasAttribute('style')) {
            img.removeAttribute('style');
            var indexofimg = managedimgs.indexOf(img);
            if (indexofimg >= 0) {
                managedimgs.splice(indexofimg, indexofimg)
            }
        } else {
            resizeImg(img);
            managedimgs.push(img)
        }
    }
}
function replaceImg(img, href) {
    img.removeAttribute('height');
    img.removeAttribute('width');
    img.removeAttribute('style');

    img.removeAttribute('thumburl');
    img.removeAttribute('data-original');

    img.src = href;
}
function handleImgError(imgId) {
    brokenimgs.push(imgId);
    nextImageTimeout();
}
function handleImgLoad(imgId) {
    var img = document.getElementById(imgId);
    if(img) {
        resizeImg(img);
    }
    nextImageTimeout();
}

function nextImageTimeout(){
    setTimeout(function () {
        replaceNextImg()
    }, 100);
}

function replaceNextImg() {
    var imgId;
    var img;
    if (brokenimgs.length > 0) {
        imgId = arrayPop(brokenimgs);
        img = document.getElementById(imgId);
        if(img) {
            var oldSrc = img.src;
            img.removeAttribute("src");
            img.src = oldSrc;
        } else {
            nextImageTimeout();
        }
    } else if (knownimgs.length > 0) {
        imgId = arrayPop(knownimgs);

        img = document.getElementById(imgId);
        if(img) {
            var parent = getParent(img);
            if(parent){
                var href = parent.href;
                manageImg(img);
                replaceImg(img, href);
                removeLink(parent, img);
            } else {
                nextImageTimeout();
            }
        } else {
            nextImageTimeout();
        }
    }
}
function manageImg(img) {
    addEvents(img);
    managedimgs.push(img);
}
function removeLink(alink, img) {
    alink.removeAttribute('href');
    alink.addEventListener('click', function () {
        remanageImgWidth(img.id)
    })
}
function arrayPop(array) {
    var ele = array[0];
    array.splice(0, 1);
    return ele;
}
function runEci() {
    if (knownimgs.length == 0 && brokenimgs.length == 0) {
        var imgs = document.getElementsByTagName('img');
        var i;
        for (i = 0; i < imgs.length; i++){
            checkImg(imgs[i]);
        }
        for (i = 0; i < 3; i++){
            replaceNextImg()
        }
    }
}
window.addEventListener('resize', function () {
    for (var i = 0; i < managedimgs.length; i++) {
        resizeImg(managedimgs[i])
    }
}, false);

setTimeout(function(){
        runEci()
    }, 500
);
setInterval(function () {
    runEci()
}, 5000, 'JavaScript');
