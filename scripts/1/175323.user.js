// ==UserScript==
// @name        Alt names on images in Eloqua image browser
// @namespace   images.eloqua.com
// @include     https://secure.eloqua.com/Main.aspx#landing_pages&id=*
// @include     https://secure.eloqua.com/Main.aspx#emails&id=*
// @version     1
// ==/UserScript==
// @grant       GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a major design change introduced in GM 1.0,
    It restores the sandbox.
*/

setTimeout(checkForImageBrowser, 500);

function checkForImageBrowser() {
    $.each($('.thumbnail'), function (index, value) {
        var name = value.next().text();
        value.find('img').attr('alt', name);
    });
}