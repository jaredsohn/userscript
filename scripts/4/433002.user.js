// ==UserScript==
// @name        imgur - inline images (nin)
// @namespace   http://userscripts.org/users/535024
// @description Auto-loads images in comments.
// @author              ninmonkeys@gmail.com
// @match     http://imgur.com/gallery/*
// @match     https://imgur.com/gallery/*
// @version     1.2
// @date        2014-03-28
// @grant       none
// @run-at              document-end
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

/*
Note:
    It requires a tiny sleep, since imgur modifies the dom after
    `document.ready` , a delay 500ms seems to work good. may vary on phones.

Todo:
    - toggle: hide NSFW, or load-NSFW
    - sub pages, (profile comments, PM, etc)
*/

var css_style =  "'style='width:auto; height:auto; max-width: 400px;'";
// max-width is good if you want to remove horizontal scrolling on big images

function sleep(millis, callback){
    //delay a function
    setTimeout(function(){
        callback();
    }, millis);
}

function inlineImages() {
    // parses DOM, inserts `img` tags into the containing div
    var $imageUrls = $(".image-link");
        $imageUrls.each(function(){
            // $parent is the actual element to append to, (rather than the anchor.)
            var $parent = $(this).parent().parent();
            var url = $(this).attr('href');
            // console.log(url);

            // dont parse same image multiple times, when expanding comments
            if( ! $parent.data("imgLoaded")) {
                // console.log("skip: " +url );
                $parent.data("imgLoaded", true);
                $parent.append("<br/><img src='" + url + css_style + " />");
            }
        });
}

$(document).ready(function(){
    //expander callback
    $("a.expand").on("click", inlineImages);
    $("#expand-comments").on("click", inlineImages);

    sleep(550, inlineImages);
    sleep(1000, inlineImages);
});

/* test links:
    http://imgur.com/gallery/x8HVU
    https://imgur.com/gallery/xBrHq
*/
