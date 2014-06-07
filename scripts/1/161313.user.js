// ==UserScript==
// @name           AfterDawn download wrapper remover
// @version        0.5.1
// @author         Bruno Barbieri
// @description    Rewrites the download link to remove the download wrapper in AfterDawn (i.e. "Safe Download" button)
// @include        http://afterdawn.*/*
// @include        http://*.afterdawn.*/*
// @include        http://www.*.afterdawn.*/*
// @include        http://download.fi/*
// @include        http://*.download.fi/*
// @include        http://www.*.download.fi/*
// @namespace      http://userscripts.org/scripts/show/161313
// @updateURL      http://userscripts.org/scripts/source/161313.meta.js
// @downloadURL    http://userscripts.org/scripts/source/161313.user.js
// ==/UserScript==

/*
 * ===== Changelog =====
 *
 * v0.1: Initial version
 * v0.2: Switch code to jQuery and only keep one regex search, just in case
 * v0.3: Use alternate method for loading jQuery, now works with Chrome as well. Credits to Erik Vold (http://r.evold.ca/jquery4us).
 *       Use domain wildcards that work in Chrome as well, and add the Finnish domain.
 * v0.4: Added update URL and updated JQuery version
 * v0.5: Pure JavaScript implementation (http://youmightnotneedjquery.com)
 *
 */


function main() {
    // Remove extra text from button (e.g. "Safe Download")
    downBtn = document.getElementById('download-main-button');
    safeDownHtml = document.querySelectorAll('#download-main-button > b')[0].innerHTML;
    downBtnHtml = downBtn.innerHTML.replace('<b>' + safeDownHtml + '</b>', '');
    downBtn.innerHTML = downBtnHtml;

    // Remove extra style from button
    className = 'extra-label';
    if (downBtn.classList) {
        downBtn.classList.remove(className)
    } else {
        downBtn.className = downBtn.className.replace(new RegExp('(^| )' + className.split(' ').join('|') + '( |$)', 'gi'), ' ');
    }

    // Remove hidden input
    hiddenInput = document.querySelectorAll('input[name="installer"]')[0];
    hiddenInput.parentNode.removeChild(hiddenInput);

    // Replace installer option in button URL
    downBtnUrl = downBtn.getAttribute('href').replace(/installer=[\d]+/, 'installer=0');
    downBtn.setAttribute('href', downBtnUrl)
}

main();
