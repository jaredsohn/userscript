// ==UserScript==
// @name        PrincessJab shipping script
// @namespace   http://userscripts.org/users/broken-pen/113977
// @description places the avatar of tumblr user princesscadenza next to the one of some-dude-called-jab
// @include     http://www.tumblr.com/dashboard*
// @include     http://www.tumblr.com/blog/*
// @version     1.0
// ==/UserScript==

(function(){
    // Here some nifty variables
    // If the blogs change in any way, these variables must be changed accordingly
    cadenzaAvatarBig = "http://25.media.tumblr.com/avatar_012377771d6c_64.png";
    cadenzaAvatarSmall = "http://25.media.tumblr.com/avatar_012377771d6c_40.png";
    cadenzaURL = "http://princesscadenza.tumblr.com/";
    jabAvatarBig = "http://24.media.tumblr.com/avatar_02ec88bf02b8_64.png";
    jabAvatarSmall = "http://24.media.tumblr.com/avatar_02ec88bf02b8_40.png";
    jabURL = "http://some-dude-called-jab.tumblr.com/";
    // Build the objects
    var cadBig = document.createElement("A");
    cadBig.setAttribute("href", cadenzaURL);
    cadBig.setAttribute("title", "princessjab is canon");
    cadBig.setAttribute("class", "post_avatar");
    cadBig.setAttribute("style", "position:absolute; right:69px; background-image:url('" +
                        cadenzaAvatarBig + "');");
    var cadSmall = document.createElement("A");
    cadSmall.setAttribute("class", "avatar_frame");
    cadSmall.setAttribute("href", cadenzaURL);
    cadSmall.setAttribute("style", "position:absolute; left:-25px;");
    var cadImg = document.createElement("IMG");
    cadImg.setAttribute("class", "avatar");
    cadImg.setAttribute("alt", "");
    cadImg.setAttribute("src", cadenzaAvatarSmall);
    cadImg.setAttribute("data-src", cadenzaAvatarSmall);
    var jabBig = document.createElement("A");
    jabBig.setAttribute("href", jabURL);
    jabBig.setAttribute("title", "puprl hornse");
    jabBig.setAttribute("class", "post_avatar");
    jabBig.setAttribute("style", "position:absolute; left:69px; background-image:url('" +
                        jabAvatarBig + "');");
    var jabSmall = document.createElement("A");
    jabSmall.setAttribute("class", "avatar_frame");
    jabSmall.setAttribute("href", jabURL);
    jabSmall.setAttribute("style", "position:absolute; left:35px; z-index:99;");
    var jabImg = document.createElement("IMG");
    jabImg.setAttribute("class", "avatar");
    jabImg.setAttribute("alt", "");
    jabImg.setAttribute("src", jabAvatarSmall);
    jabImg.setAttribute("data-src", jabAvatarSmall);
    
    // loop over all big avatars
    var avas = document.getElementsByClassName("post_avatar");
    var avaClone = null;
    var parent = "";
    for(var i = 0; i < avas.length; ++i) {
        // test the URLs
        if (avas[i].href == jabURL) {
            // place a clone of the fake avatar before the actual one
            avas[i].parentNode.insertBefore(cadBig.cloneNode(false), avas[i]);
            ++i; // I have no idea why I have to add this line.
        } else if (avas[i].href == cadenzaURL) {
            // place a clone of the fake avatar before the actual one
            avas[i].parentNode.insertBefore(jabBig.cloneNode(false), avas[i]);
            ++i; // I have no idea why I have to add this line.
        }
    }
    
    // loop over the notifications
    avas = document.getElementsByClassName("avatar_frame");
    var avaClone = null;
    for(var i = 0; i < avas.length; ++i) {
        // test the URLs 
        if (avas[i].href == jabURL) {
            // place a clone of the fake avatar before the actual one
            avaClone = cadSmall.clone();
            avas[i].parentNode.insertBefore(avaClone, avas[i]);
            avaClone.appendChild(cadImg.cloneNode(false));
            ++i;
        } else if (avas[i].href == cadenzaURL) {
            // place a clone of the fake avatar before the actual one
            avaClone = jabSmall.clone();
            avas[i].parentNode.insertBefore(avaClone, avas[i]);
            avaClone.appendChild(jabImg.cloneNode(false));
            ++i;
        }
    }
})();
