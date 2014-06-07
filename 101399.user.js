// ==UserScript==
// @name           latest javadoc redirect
// @namespace      smalltalk.cn 
// @description    redirect to latest javadoc
// @include        http://docs.oracle.com/javase/*/api/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

$(document).ready(function() {
    var oldVersions = ['1.3', '1.4.2', '1.5.0', '1,5.0', '6'];
    var newVersion = '7';
    var url = window.location.toString();
    for (var i = 0; i < oldVersions.length; ++ i) {
        if (url.indexOf('/' + oldVersions[i] + '/') != -1) {
            var newUrl = url.replace(oldVersions[i], newVersion);
            window.location.replace(newUrl);
            break;
        }
    }
});
