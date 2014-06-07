// ==UserScript==

// @name           GIF Avatar Killer

// @author         sanguinepenguinx

// @version        1.1

// @namespace      http://what.cd

// @description    Replaces all GIF avatars

// @include        http://what.cd/forums.php*

// @include        https://ssl.what.cd/forums.php*

// @include        http://cinemageddon.net/forums.php*
// @include        http://cinemageddon.net/details.php*

// ==/UserScript==



var avatarover = GM_getValue("avatarover", true);

SUB = "http://img80.imageshack.us/img80/18/defaultma5.png"; // static avatar



// end config


function kill_avatars(classname) {

    var avatars=document.getElementsByClassName(classname);

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



kill_avatars("avatar");
kill_avatars("comment");



GM_registerMenuCommand("Avatar Mouseovers ON", function() {GM_setValue("avatarover", true)});

GM_registerMenuCommand("Avatar Mouseovers OFF", function() {GM_setValue("avatarover", false)});