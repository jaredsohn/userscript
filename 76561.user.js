/**
 * @authors: Axel Wilczek, Mewes Kochheim
 *
 * ":), have more than one reason :D, give up!", "lol=0" quotes by S1l3nt Fr34k
 *
 * lol=1, beste Gruesse aus Deutschland!
 */

// ==UserScript==
// @name           DivX Saver
// @namespace      AxMeScripts
// @description    Pops up the download dialog for different "DivX Web Player" streaming sites.
// @include        http://filebase.to/files/*
// @include        http://www.mystream.to/*
// @include        http://www.tubeload.to/*
// @include        http://duckload.com/divx/*
// @include        http://www.xtream.to/*
// @include        http://loaded.it/show/*

// @include        http://fullshare.net/show/*
// ==/UserScript==

// Working: FileBase, MyStream, Tubeload, DuckLoad, Xtream, Loaded
// TODO:    FullShare, TubeLoad

// ----------------------------------------------------------------------------
// Skip portal
// ----------------------------------------------------------------------------

// FullShare (not working)
if (locationContains('http://fullshare.net/show/')) {
    if ($('submit')) {
        $('submit').form.submit();
    }
}

// Loaded
if (locationContains('http://loaded.it/show/')) {
    if ($('submit')) {
        $('submit').form.submit();
    }
}

// FileBase
if (locationContains('http://filebase.to/files/')) {
    if ($('dl_free')) {
        $('dl_free').form.submit();
    }
}

// DuckLoad
if (locationContains('http://duckload.com/divx/')) {
    if ($('bb')) {
        $('bb').click();
    }
}

// ----------------------------------------------------------------------------
// Redirect to video
// ----------------------------------------------------------------------------

// Loaded
if (locationContains('http://loaded.it/show/')) {
    if ($('myform')) {
        unsafeWindow.alertContents = function() {
            if (unsafeWindow.http_request.readyState == 4) {
                if (unsafeWindow.http_request.status == 200) {
                    var reg = /<param name="src" value="(\S+)" \/>/.exec(unsafeWindow.http_request.responseText);
                    var url = RegExp.$1;
                    if (url && isUrl(url)) {
                        window.location = url;
                    }
                } else {
                    alert('AJAX request error.');
                }
            }
        }
        $('myform').submit();
    }
}

// FileBase, DuckLoad & Xtream
if (locationContains('http://filebase.to/files/') || 
    locationContains('http://duckload.com/divx/') || 
    locationContains('http://www.xtream.to/')) {
    var obj = $$("//object[@classid='clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616']/param[@name='src']");
    if (obj[0] && isUrl(obj[0].value)) {
        window.location = obj[0].value;
    }
}

// MyStream & TubeLoad
if (locationContains('http://www.mystream.to/') || 
    locationContains('http://www.tubeload.to/')) {
    if (unsafeWindow.url != "undefined" && isUrl(unsafeWindow.url)) {
        window.location =  unsafeWindow.url;
    }
}

// ----------------------------------------------------------------------------
// Global
// ----------------------------------------------------------------------------

function locationContains(s) {
    var i = window.location.href.indexOf(s);
    if (i >= 0) {
        return true;
    }
    return false;
}

function isUrl(s) {
    return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);
}

function $(_id) { 
    return document.getElementById(_id); 
}

function $$(_query, _element) { 
    var result = [];
    var element, elements = document.evaluate(_query, _element || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    while (element = elements.iterateNext()) {
        result.push(element);
    }
    return result;
}