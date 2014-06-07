// ==UserScript==
// @name           URL Fixer
// @namespace      http://userscripts.org/users/23652
// @description    Fixes broken urls
// @include        http://* *
// @include        https://* *
// @include        http://*//*
// @include        https://*//*
// @include        http:// http//*
// @include        https:// https//*
// @include        http://*.cmo*
// @include        http://*.omc*
// @include        http://*.mco*
// @include        http://*.moc*
// @include        http://*.ocm*
// @exclude        http://*?*=http*
// @copyright      JoeSimmons
// ==/UserScript==

setTimeout(function(){

var tl=window.location.href;

if(/https?:\/\/ https?\/\//.test(tl)) {
top.location.replace(tl.replace(/https?:\/\/ https?\/\//, function(m){return m=="http:// http//"?"http://":"https://"}));
}
else if(/.* .*\/.*/.test(tl)) {
top.location.replace(tl.split("/")[0] + "//" + tl.split("/")[2].replace(/ /g, "") + "/" + tl.split("/")[3]);
}
else if(/^.+\.(cmo|omc|mco|moc|ocm)\//.test(tl)) {
top.location.replace(tl.replace(/\.(cmo|omc|mco|moc|ocm)\//, ".com/"));
}
else if(/http:\/\/.+\/{2,}.+/.test(tl)) {
//top.location.replace(tl.replace(/http:\/\/.+\/{2,}.+/g, RegExp.$1));
var pre;
pre = tl.match(/https?:\/\//);
alert(pre + tl.split(pre)[1].replace(/\/{2,}/g, "/"));
//top.location.replace(pre + tl.split(pre)[1].replace(/\/{2,}/g, "/"));
}

}, 0);