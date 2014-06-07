// ==UserScript==
// @name           Facebook PhotoUrl
// @namespace      http://userscripts.org
// @description    Get the static url of a photo in facebook by clicking the right button
// @license        GPL 3
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @author        fox (fox91 at anche dot no)
// @version       0.1
// ==/UserScript==


function createContextMenu() {
    var div = document.createElement('div');
    div.id = "PhotoUrlMenu";
    div.setAttribute('style', 'position: absolute; z-Index: 999;' +
        'width: 230px; background: #FFF; text-align:center;' +
        'border: #666 solid 3px; -moz-opacity: 0.8; margin: 4px;' +
        'font-size: 11px;');
    div.style.display = 'none';
    return div;
}

function getStaticUrl(url) {
    return document.getElementsByClassName("spotlight")[0].src;
}

window.gm_show_menu = function(e, x, y, src) {
    var div, inputUrl, conv, show, desc, viewPhoto;
    if (!document.getElementById('PhotoUrlMenu')) {
        div = createContextMenu()
    }
    else {
        div = document.getElementById('PhotoUrlMenu');
    }
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
    div.style.left = x + "px";
    div.style.top  = y + "px";
    div.style.display = "block";
    div.innerHTML = "<h2 style='-moz-border-bottom-colors: none;-moz-border-image: none;-moz-border-left-colors: none;-moz-border-right-colors: none;-moz-border-top-colors: none;background: none repeat scroll 0 0 #6D84B4;border-color: #3B5998 #3B5998 -moz-use-text-color;border-style: solid solid none;border-width: 1px 1px medium;color: #FFFFFF;font-size: 13px;font-weight: bold;margin: 0;'>Get Photo Link!</h2>";
    inputUrl = document.createElement('input');
    inputUrl.id = "staticLink";
    inputUrl.className = "inputtext";
    inputUrl.style.marginTop = "10px";
    inputUrl.value = getStaticUrl(src);
    div.appendChild(inputUrl);
    viewPhoto = document.createElement('input');
    viewPhoto.type = "button";
    viewPhoto.value = "View photo";
    viewPhoto.setAttribute("class", "uiButton uiButtonLarge uiButtonConfirm");
    viewPhoto.style.color = "#FFF";
    viewPhoto.style.margin = "5px";
    viewPhoto.addEventListener('click', function() {
        GM_openInTab(inputUrl.value);
        document.getElementById("PhotoUrlMenu").style.display = "none";
    }, false);
    div.appendChild(viewPhoto);
    document.body.insertBefore(div, document.body.firstChild);
    inputUrl.focus();
    inputUrl.select();
}

window.gm_clear_menu = function(e) {
    if (e.button != 2) {
        if ((document.getElementById('PhotoUrlMenu')) &&
           (!((e.target.id === "PhotoUrlMenu") ||
           (e.target.parentNode && e.target.parentNode.id === "PhotoUrlMenu")) ||
           (e.target.id === "fbPhotoTheater")))
            document.getElementById("PhotoUrlMenu").style.display = "none";
    }
}

window.gm_menu = function(e) {
    if (e.ctrlKey && document.getElementById('PhotoUrlMenu')) {
        document.getElementById('PhotoUrlMenu').style.display='none';
        return true;
    }

    if ((e.target.className === "tagsWrapper")) {
        gm_show_menu(e, e.clientX+window.scrollX, e.clientY+window.scrollY,
            e.target.src);
    }

    if ((document.getElementById('PhotoUrlMenu')) &&
	    (document.getElementById('PhotoUrlMenu').style.display != "none")) {
            e.preventDefault();
            e.returnValue = false;
            e.stopPropagation();
        }
}

window.addEventListener("contextmenu", gm_menu, true);
window.addEventListener("click", gm_clear_menu, false);
