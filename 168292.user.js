// ==UserScript==
// @name        POE Forum Quick Reference
// @description Adds a button to generate wiki reference code
// @namespace   http://userscripts.org/users/AnnanFay
// @version     4
// @updateUrl   https://userscripts.org/scripts/source/168292.meta.js
// @downloadUrl https://userscripts.org/scripts/source/168292.user.js
// @match       http://www.pathofexile.com/forum/*
// @include     /^https?://www\.pathofexile\.com/forum/.*$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

/*jshint multistr:true */
/*global $,  GM_addStyle*/

(function () {
    "use strict";

    GM_addStyle("\
    .poe_gm_ui_button { \
        color: #F7C990; \
        font-family: 'FontinSmallCaps', Verdana, Arial, Helvetica, sans-serif; \
        text-decoration: none; \
        font-size: 20px; \
        display: inline-block; \
        overflow: hidden; \
        width: 29px; \
        height: 29px; \
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAxJJREFUSEu9Vk1PE1EUHSilnQ7TD0xbwVQjloUopUGUlhQTCKhFTRtBF2gUF6TGjdHEuDKu/AdqXBkTl/4GYzTRv3Wd82bu9HZ4b8YF2uTk3jnvvvv1XmeuZXm/tGWRJ/4XhgHdnEM1J0dniv8G9XJBFmVRPpui5xs1+vLyDr3YWaNXvQj21o9ysAFvWhPrr+9vU/9ihcqlHAe2qDyZph+fDmlqbIymMimy7BJNFE8qHFfbD3ubVC+6o0G/vx8oopgep8dNm7rtBbqxPE/XVufoVus8bbXqIW62zhEAHoAt1qGzPXT4mc6nld+tdpNEi/1Kf33wgw4uu7R/b4Medtv0qLcaStYP+q2Qhw47QOn9K3QAPdgLP087fnXd1pI+KG5xHLjV0dv+N/u0QdFebEZ7ca6QRZbQdTzWGYFNuE/4UJVe1bT327vhRRrZGDgdSUQE0iUYtTW2F0FVpYHDaTuogiuI44OuIJgKKKrEfTFWiosUBo0EOtLCuJbKI/H02KB8phV7glAlgA2s63gkAx6S7SAlBz22UizCSAKBASPv+MlVPCnBXM1JaC+C1rw/MzDr+nLGTSnoeCRSdf0kISWYO+2OJ1fKzjkgfwB0PJJBciyhM5jDvtiXAxZhHM0azzpeJmLS50uTybeXnfP5cAI6Hu9V8JCArJI57E+8SHM4U+/wIaPQ8cxBSrCfC3nvq2V6I/FXZqGUIbQEgM6BdTxssM72MknpI7HS5ZJNjWJWBZQw8YvloS0Hkhx8JV6klVMOYRNwqWKHuolnW5Nsz9jm9uLdi4zaFUcFi8LE62wlt1lzkitFG7mVrEuJdkkbPDPHuuTa1Yw56O+PT8LJ4XazQAqNvIeqknuL8YDN3aVCCH9vPn5ywO3FdxQtRktwFgpeppBrs45C52xOSfA4ZzzzurRjW542tDPSz88DqgbjynFNgNLPs93raqYOuGDu7dTo65t9woz6YHtFAQMX61KGw1hkHQNZ1H53vUFvD/tq7j2R9f8+FhGkH5gnfIyKCt6cGurMMY+16LrBHhXyoI14fwDK7RkvLb11iwAAAABJRU5ErkJggg==) no-repeat 0 0; \
    } \
    .poe_gm_ui_button span { \
        display: inline-block; \
        padding-top: 2px; \
    } \
    ");

    function add_button (text, handler) {
        $('.post_info_content .buttons')
            .prepend(
                $('<a class="poe_gm_ui_button" href=""><span>'+text+'</span></a>')
                .click(handler));
    }

    // add the button
    add_button('R', function() {
        var tr = $(this).parents('tr');

        var user = tr.find('.posted-by .profile-link')[0].text;
        var thread_title = $('.topBar.layoutBoxTitle')[0].textContent;
        var post_url = tr.find('.posted-by-link')[0].href;
        var post_date = tr.find('.post_date')[0].textContent;
        var today = new Date().toLocaleDateString();

        //var ref = "<ref>Posted by "+user+" in ["+post_url+" "+thread_title+"] on "+post_date+"</ref>";
        var ref = "<ref>{{cite web|author="+user+"|date="+post_date+"|title="+thread_title+"|url="+post_url+"|publisher=Path of Exile Forum|accessdate="+today+"}}</ref>";
        
        alert(ref);

        return false;
    });
})();