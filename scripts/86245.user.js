// ==UserScript==
// @name           Paragon Org
// @namespace      global
// @description    re-ordering of forums
// @include        http://paragon.failsafedesign.com/*
// ==/UserScript==

function HideByClass(classname) {
    var hides = document.getElementsByClassName(classname); 
    for (var i = 0; i < hides.length; i++) {
        hides[i].style.display = "none";
    }
}

(function() {

    GM_addStyle(".headerbar {background-color: gray; background-image: none !important; height : 128px !important; ; background-position:left center;}");
    GM_addStyle("#logo {background: url(http://img541.imageshack.us/img541/2716/30454387.jpg) no-repeat scroll 0 0; width : 391px; height :128px;}");

    GM_addStyle("li.row.bg2{ background-color: #D7D7D7 !important; } ");
    GM_addStyle("li.row.bg1{ background-color: #e7e7e7 !important; } ");
    GM_addStyle("li.row.unread{  color: #FF9900 !important; } ");

    //remove logo
    var logo = document.getElementById("logo");
    if (logo != null) {
        logo.setAttribute("background", "url(http://img541.imageshack.us/img541/2716/30454387.jpg)");
    }
    //retitle
    document.title = "Veridian Dynamics";

    //copy search box
    var adv_search = null;
    var body_paras = document.getElementsByClassName("body_paragraph");

    for (var i = 0; i < body_paras.length; i++) {
        adv_search = body_paras[i];
        body_paras[i].style.display = "none";
        var kid = body_paras[i].firstChild;

        while (kid != null) {
            // alert(kid);
            if (kid.pathname == "/search.php") {
                adv_search = kid;
                // adv_search.textContent = adv_search.textContent + "&nbsp;"
                break;
            }
            kid = kid.nextSibling;
        }
    }

    //insert search box
    var pathway = document.getElementById("pathway");
    if (pathway != null) {
        pathway.appendChild(adv_search);

        adv_search.textContent = adv_search.textContent + " |"
    }

    //getElementsByClassName is broken for multiple class names.
    HideByClass("linklist");
    HideByClass("posts_container");
    HideByClass("post_desc");
    HideByClass("views");
    HideByClass("lastpost");

    //topics topiclist seems to match this, mabye it's derived
    var topic_elements = document.getElementsByClassName("topics");
    for (var i = 0; i < topic_elements.length; i++) {

        if (topic_elements[i].className == "topics") {
            topic_elements[i].style.display = "none";
        }
    }

    //remove forum avatars
    var post_profiles = document.getElementsByClassName("postprofile");
    for (var i = 0; i < post_profiles.length; i++) {
        var avatars = post_profiles[i].getElementsByTagName("img");

        for (var k = 0; k < avatars.length; k++) {
            avatars[k].style.display = "none";
        }

    }

    //remove forum signatures
    var sigs = document.getElementsByClassName("signature");
    for (var i = 0; i < sigs.length; i++) {
        var avatars = sigs[i].getElementsByTagName("img");

        for (var k = 0; k < avatars.length; k++) {
            avatars[k].style.display = "none";
        }

    }

    //enlarge jump to unread icon
    var unread_elements = document.getElementsByClassName("unread");
    for (var i = 0; i < unread_elements.length; i++) {
        var nposts = unread_elements[i].getElementsByTagName("img");
        for (var k = 0; k < nposts.length; k++) {
            nposts[k].setAttribute("width", 22);
            nposts[k].setAttribute("height", 18);
        }
    }



}
)()

