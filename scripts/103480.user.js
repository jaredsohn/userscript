// ==UserScript==
// @name           Tumblr Larger Dashboard Avatar
// @description    Shows a larger version of users avatars in the tumblr dashboard page.
// @namespace      http://www.tumblr.com
// @match          http://www.tumblr.com/dashboard
// @match          http://www.tumblr.com/tumblelog/*
// @match          http://www.tumblr.com/tagged/*
// @match          http://www.tumblr.com/likes
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/tumblelog/*
// @include        http://www.tumblr.com/tagged/*
// @include        http://www.tumblr.com/likes
// @exclude        http://www.tumblr.com/tumblelog/*/new/*
// @version        0.2.3
// ==/UserScript==

// Finds all tags with given class name and returns as array
function getElementsByClass(class_name) {
    var html_tags = new Array();
    var found_tags = new Array();
    
    html_tags = document.getElementsByTagName("*");
    
    for (i=0; i<html_tags.length; i++) {
        if (html_tags[i].className == class_name) {
            found_tags.push(html_tags[i]);
        }
    }
    
    return found_tags;
}

// Modifies all avatars in the page
function modifyPictureSize() {
    found_images = getElementsByClass("post_avatar");
    
    for (i=0; i<found_images.length; i++) {
        found_images[i].style.backgroundImage = found_images[i].style.backgroundImage.replace("_64.", "_128.");
    }
}

// Modifies small pictures
function modifySmallPictureSize() {
    found_images = getElementsByClass("avatar");
    
    for (i=0; i<found_images.length; i++) {
        found_images[i].src = found_images[i].src.replace("_40.", "_64.");
    }
}

// Modify sub avatars
function modifySubPictureSize() {
    found_sub_images = getElementsByClass("sub_avatar");
    for (i=0; i<found_sub_images.length; i++) {
        found_sub_images[i].style.backgroundImage = found_sub_images[i].style.backgroundImage.replace("_30.", "_64.");
    }
}

function main() {
    var css = "#left_column {width:689px;} #posts .post .post_avatar {width: 128px; height: 128px;} #posts {margin-left: 149px;} \
               #container {width: 964px;} .avatar_and_i {left: -149px;} #posts li:first-child {margin-bottom: 50px;} \
               #posts .post {min-height:120px;} #posts .post .sub_avatar {top:80px; height:64px; width: 64px} #posts .notification .avatar_frame {left:-76px;} #posts .notification .avatar {width:64px;height:64px;} #posts .notification {height:50px;}";
    GM_addStyle(css);
    modifyPictureSize();
    modifySmallPictureSize();
    modifySubPictureSize();
    
    setInterval(modifyPictureSize, 500);
    setInterval(modifySmallPictureSize, 500);
    setInterval(modifySubPictureSize, 500);
}

main();