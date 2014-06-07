// ==UserScript==
// @name           ImdbPhoto
// @description    Make Imdb Photos and their links copyable.
// @namespace      http://userscripts.org/users/ocanal
// @version        0.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.imdb.com/media/*
// ==/UserScript==


function fixGallery() {
    var Image = document.getElementById("primary-img")
    Image.setAttribute("oncontextmenu","");
}

fixGallery();