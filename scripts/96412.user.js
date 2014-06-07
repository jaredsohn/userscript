// ==UserScript==
// @name           Direct Watch FMV
// @namespace      thantthetkz.freemyanmarvcd
// @description    Skip advertisment pages on FreeMyanmarVCD.org
// @include        http://www.freemyanmarvcd.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var links = $('a');
var re = new RegExp('PlayMovie/[0-9]+');
for (var i = 0; i < links.length; i++){
    if (links[i].href.match(re)) {
        links[i].href += "/1/Mq4x9QlF6uHdjuYReMlpk2So2qL5cX";
    }
}