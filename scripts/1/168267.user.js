// ==UserScript==
// @name       Resize Google&Tumblr Image
// @version    0.4.7
// @description  自动转向 Google&Tumblr&新浪微博&腾讯微博 图片最高质量
// @match      http://*.googleusercontent.com/*
// @match      https://*.googleusercontent.com/*
// @match      http://*.media.tumblr.com/*
// @match      https://*.media.tumblr.com/*
// @match      http://*.bp.blogspot.com/*
// @match      https://*.bp.blogspot.com/*
// @match      http://*.sinaimg.cn/*
// @match      https://*.sinaimg.cn/*
// @match      http://*.qpic.cn/*
// @match      http://*.twimg.com/*
// @match      https://*.twimg.com/*
// @namespace http://userscripts.org/users/clso
// @updateURL https://userscripts.org/scripts/source/168267.meta.js
// @downloadURL https://userscripts.org/scripts/source/168267.user.js
// @copyright  2014+, CLE
// ==/UserScript==

var url = document.location.toString();
var m = null;

m = url.match(/^(https?:\/\/\w+\.googleusercontent\.com\/.+\/)([^\/]+)(\/[^\/]+(\.(jpg|jpeg|gif|png|bmp))?)$/i);
if(m) {
    if(m[2] != "s0") {
        document.location = m[1] + "s0" + m[3];
    }
}

m = url.match(/^(https?:\/\/\w+\.googleusercontent\.com\/.+=)(.+)$/i);
if(m) {
    if(m[2] != "s0") {
        document.location = m[1] + "s0";
    }
}

m = url.match(/^(https?:\/\/\w+\.bp\.blogspot\.com\/.+\/)([^\/]+)(\/[^\/]+(\.(jpg|jpeg|gif|png|bmp))?)$/i);
if(m) {
    if(m[2] != "s0") {
        document.location = m[1] + "s0" + m[3];
    }
}

var ma = url.match(/^(https?:\/\/\d+\.media\.tumblr\.com\/.*tumblr_\w+_)(\d+)(\.(jpg|jpeg|gif|png|bmp))$/i);
if(ma) {
    if(ma[2]<1280) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function() {
            if (ajax.readyState==4 && ajax.status==200) {
                document.location = ma[1] + "1280" + ma[3];
            }
        }
        ajax.open("HEAD", ma[1]+"1280"+ma[3], true);
        ajax.send();
    }
}

m = url.match(/^(https?:\/\/ww[\d]+\.sinaimg\.cn\/)([^\/]+)(\/.+)$/i);
if(m) {
    if(m[2] != "large") {
        document.location = m[1] + "large" + m[3];
    }
}

m = url.match(/^(http:\/\/[\w\d]+\.qpic\.cn\/.+\/)(\d+)$/i);
if(m) {
    if(m[2]<2000) {
        document.location = m[1] + "2000";
    }
}

m = url.match(/^https?:\/\/\w+\.twimg\.com\/media\/[^\/]+\.(jpg|jpeg|gif|png|bmp)$/i)
if(m) {
    document.location = m[0] + ":large";
}