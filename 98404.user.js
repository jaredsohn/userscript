// ==UserScript==
// @name           Vimperator vs Transmission Web Interface
// @namespace      se.antte
// @description    Makes them work better together.
// @include        http://*/transmission/web
// ==/UserScript==

var openlink_li = document.getElementById("open");

// wrap the openlink menu item with an ankor
var ankor = document.createElement("a");
ankor.setAttribute("id", "open_link_link");
ankor.setAttribute("href", "#");
ankor.appendChild(openlink_li.cloneNode(true));
openlink_li.parentNode.replaceChild(ankor, openlink_li);

function openLinkClickHandler() {
    var upload_container = document.getElementById("upload_container");
    upload_container.setAttribute("style","display:block");

    var torrent_url = document.getElementById("torrent_upload_url");
    torrent_url.focus();
}

ankor = document.getElementById("open_link_link");
ankor.addEventListener("click", openLinkClickHandler, false);
