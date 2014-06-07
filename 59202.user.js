// ==UserScript==
// @name           RE-AVATAR
// @namespace      ra@kwierso.com
// @description    asdf
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://strangerhood.com/*
// @include        http://captaindynamic.com/*
// @include        http://achievementhunter.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    // Get the username so we can exclude the user's own avatar from being changed.
    var username = document.getElementById("userInfo").getElementsByTagName("b")[0].innerHTML;

    // Get all images.
    var images = document.getElementsByTagName("img");
    var avatars = new Array();

    // For all avatar images that aren't the user's own (or the user's tagged images), push the image into the array
    for(i in images) {
        if((images[i].className == "avatar av1" || images[i].className == "avatar av0" ||
            images[i].className == "icon" || images[i].className == "avatar") &&
            !images[i].src.match(username) && !images[i].parentNode.href.match("user.php")) {
            avatars.push(images[i]);
        }
    }

    // For all items in the array, change the source to gusboner, and resize to fit.
    if(avatars.length > 0) {
        for(i in avatars) {
            var uid = avatars[i].src.split("?")[1];
            avatars[i].src = "http://images.roosterteeth.com/images/group9c3b1830513cc3b8fc4b76635d32e692.jpg?" + uid;
            avatars[i].width = "59";
            avatars[i].height = "59";
            if(avatars[i].className == "avatar") {
                avatars[i].width = "50";
                avatars[i].height = "50";
            }
        }
    }
})();