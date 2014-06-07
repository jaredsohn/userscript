// ==UserScript==
// @name           Remove Google Plus Related Pages Sidebar in Google Mail
// @author         Tryn Mirell
// @namespace      https://mirell.org
// @version        0.2
// @description    This removes the Google Plus Related Pages Sidebar in Google Mail that sometimes appears when you view certain e-mails
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/176260.user.js
// ==/UserScript==

/*global GM_addStyle, PRO_addStyle, addStyle, XPathResult*/
/*jslint newcap: true, browser: true*/

(function () {
    "use strict";

    var target, config, observer;

    function getElementByXPath(xpath) {
        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        return element;
    }

    target = document.body;
    config = { attributes: true, childList: true, characterData: true };

    observer = new window.MutationObserver(function () {
        var xpath, message, sidebar, row;

        // xpath = '//*[@id=":2"]/div/div[1]/div/table/tr/td[3]';
        xpath = '//*[@id=":2"]/div/div[2]/div/table/tr/td[3]';

        // sidebar = document.getElementsByClassName('y3')[0];
        sidebar = getElementByXPath(xpath);

        message = document.getElementById(':4');

        if (sidebar) {
            row = sidebar.parentNode;
            row.removeChild(sidebar);
        } else if (message) {
            message.style.paddingRight = '0px';
        }
    });

    observer.observe(target, config);
}());