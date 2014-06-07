// ==UserScript==
// @name          Android Developer Console
// @description   Adds some links helpful to developers in the Android Market
// @include       https://play.google.com/*
// @match         https://play.google.com/*
// @version       5.0
// @author        Afzal Najam
// @changelog  Modified for new Play Store
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @downloadURL   https://www.userscripts.org/scripts/source/103390.user.js
// @grant       none
// ==/UserScript==

myOrders = $('jsl[jsinstance ^="0"]');
if (myOrders) {
    listitem = document.createElement('div');
    listitem.className = 'leaf-submenu-link-wrapper';
    devlink = document.createElement('a');
    devlink.className = 'leaf-submenu-link';
    devlink.setAttribute('href', 'https://play.google.com/apps/publish/');
    devlink.setAttribute('target', '_blank');
    devlink.innerHTML = 'My developer console';

    listitem.appendChild(devlink);
    myOrders.after(listitem);
}

function locationHashChanged() {
    locationHash = window.location.hash;
    if (window.location.hash.indexOf(":p=") > 0) {
        pubButton = $("button>*:contains('Published')");
        if (pubButton.length > 0) {
            appName = window.location.hash.split("=")[1];
            element = pubButton.parent().parent().parent().next().next();
            link = "https://play.google.com/store/apps/details?id=" + appName;
            element.html("- ");
            $('<a>', {
                text: appName,
                href: link,
            }).appendTo(element);
        }
    }
}

window.addEventListener("hashchange", locationHashChanged);