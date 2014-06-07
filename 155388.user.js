// ==UserScript==
// @name           Large Tumblr Avatars
// @description    Enlarges avatars on the dashboard. 0.1.3 => Adapted to work with endless scrolling disabled. 0.1.4 => Adapted to work with Tumblr's new element configuration.
// @namespace      http://www.tumblr.com
// @match          http://www.tumblr.com/dashboard
// @match          http://www.tumblr.com/dashboard/*
// @match          http://www.tumblr.com/tumblelog/*
// @match          http://www.tumblr.com/tagged/*
// @match          http://www.tumblr.com/likes
// @match          http://www.tumblr.com/inbox
// @match          http://www.tumblr.com/messages
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/tumblelog/*
// @include        http://www.tumblr.com/tagged/*
// @include        http://www.tumblr.com/likes
// @include        http://www.tumblr.com/inbox
// @include        http://www.tumblr.com/messages
// @exclude        http://www.tumblr.com/tumblelog/*/new/*
// @version        0.1.4
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
    found_images = getElementsByClass("post_avatar_link");
    
    for (i=0; i<found_images.length; i++) {
        found_images[i].style.backgroundImage = found_images[i].style.backgroundImage.replace("_64.", "_128.");
    }
}

// Modifies small pictures
function modifySmallPictureSize() {
    found_images = getElementsByClass("post_avatar_image");
    
    for (i=0; i<found_images.length; i++) {
        found_images[i].src = found_images[i].src.replace("_64.", "_128.");
    }
}

// Modify sub avatars
function modifySubPictureSize() {
    found_sub_images = getElementsByClass("post_sub_avatar");
    for (i=0; i<found_sub_images.length; i++) {
        found_sub_images[i].style.backgroundImage = found_sub_images[i].style.backgroundImage.replace("_30.", "_64.");
    }
}

function main() {
    var css = "#left_column {width:689px;} #posts .post .post_avatar_link {width: 128px; height: 128px;} #posts {margin-left: 155px !important;} \
               #container {width: 964px;} ol#posts.posts_v2 li:nth-child(2) {margin-top: 50px;} \
               #posts .post {min-height:120px;} #posts .post .post_sub_avatar {top:80px; height:64px; width: 64px} \\n\
               #posts .notification .avatar_frame {left:-76px;} #posts .notification .avatar {width:64px;height:64px;} #posts .notification {height:50px;} \
               div.post_avatar.show_user_menu {height: 128px; width:128px; margin-left:-76px;} #tumblelog_menu .tumblelog_menu .post_avatar_user_menu {width:128px;height:128px;} \
               div.post_avatar {margin-left:-76px;height:128px;width:128px;} img.post_avatar_image {height:128px;width:128px;}";
    GM_addStyle(css);
    modifyPictureSize();
    modifySmallPictureSize();
    modifySubPictureSize();
    
    setInterval(modifyPictureSize, 500);
    setInterval(modifySmallPictureSize, 500);
    setInterval(modifySubPictureSize, 500);
}

main();