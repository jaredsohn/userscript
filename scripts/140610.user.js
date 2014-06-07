// ==UserScript==
// @name          Facepunch - Animated avatars on profiles
// @description	  Fixes transparent and animated avatars on profiles and conversations
// @version       1.0
// @namespace     http://horsedrowner.net/
// @include       http://facepunch.com/members/*
// @include       http://facepunch.com/member.php*
// @include       http://facepunch.com/converse.php*
// @include       http://www.facepunch.com/members/*
// @include       http://www.facepunch.com/member.php*
// @include       http://www.facepunch.com/converse.php*
// ==/UserScript==

function unthumbAvatars() {
    var avatarElements = document.getElementsByClassName("avatarlink");
    for (var i = 0; i < avatarElements.length; i++) {
        var img = avatarElements[i].children[0];
        if (img) {
            img.src = img.src.replace('&type=thumb', '');
        }
    }
}

unthumbAvatars();