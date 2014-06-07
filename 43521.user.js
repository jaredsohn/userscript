// ==UserScript==
// @name           700m.bz Animated GIF Killer
// @namespace      http://userscripts.org/users/82552
// @author         sanguinepenguinx (Modified by htrd)
// @version        1.0 (Modified)
// @description    Removes animated GIFs and replaces them with a static image
// @include        http://700m.bz/forums.php*
// @include        http://www.700m.bz/forums.php*
// @include        https://ssl.700m.bz/forums.php*
// ==/UserScript==

var avatarover = GM_getValue("avatarover", true);
SUB = "http://i44.tinypic.com/ac4rjm.jpg"; // static avatar

// end config

function kill_avatars() {
    var avatars=document.getElementsByClassName("avatar");
    for(var i=0;i<avatars.length;i++){
        avatar = avatars[i].getElementsByTagName("img")[0];
        if (avatar.src.match(/gif/)) {
            if (avatarover == true) {
                avatar.title = avatar.src;
                avatar.addEventListener('mouseover', restore, true);
                avatar.addEventListener('mouseout', change, true);
            }
            avatar.src = SUB;
        }
    }
};

function restore() {
    this.src = this.title;
};

function change() {
    this.src = SUB;
};

kill_avatars();

GM_registerMenuCommand("Avatar Mouseovers ON", function() {GM_setValue("avatarover", true)});
GM_registerMenuCommand("Avatar Mouseovers OFF", function() {GM_setValue("avatarover", false)});