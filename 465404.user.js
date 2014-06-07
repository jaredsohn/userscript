// ==UserScript==
// @name       RES AutoExpand Images
// @version    0.1
// @match      http://www.reddit.com/*
// @copyright  2014, Dark_Cs
// ==/UserScript==

$(document).ready(function(){
    var checkExist = setInterval(function() {
        if ($('#viewImagesButton').length && $('#viewImagesButton').html() != "scanning for images...") {
            $('#viewImagesButton')[0].click();
            clearInterval(checkExist);
        }
    }, 100);
})