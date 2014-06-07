// ==UserScript==
// @name           Remove Daum Ads
// @namespace      sanxiyn@gmail.com
// @include        http://*.daum.net/*
// ==/UserScript==

var count = 1;
var message = 'Daum Ads Removed';

function remove_one(element) {
    var tag = element.tagName;
    var text = message+' '+tag+' #'+count;
    var container = element.parentNode;
    var replacement = document.createElement('div');
    container.insertBefore(replacement, element);
    replacement.innerHTML = text;
    container.removeChild(element);
    count++;
}

function get_src(element) {
    if (element.src)
        return element.src;
    var params = element.getElementsByTagName('param');
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        if (param.getAttribute('name') == 'movie')
            return param.getAttribute('value');
    }
}

function copy_array(nodes) {
    var result = new Array();
    for (var i = 0; i < nodes.length; i++)
        result.push(nodes[i]);
    return result;
}

function remove(tag, filter) {
    var nodes = document.getElementsByTagName(tag);
    nodes = copy_array(nodes);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var src = get_src(node);
        if (!filter.test(src))
            continue;
        remove_one(node);
    }
}

remove('iframe', /amsv2.daum.net/);
remove('img', /amsimg.hanmail.net/);
remove('object', /amsimg.hanmail.net/);
