// ==UserScript==
// @name           Chairish Modal Remover
// @namespace      http://thedeanda.com
// @description    Removes annoying modal diaload that's impossible to remove via normal means
// @include        *.chairish.com*
// @version        2.0
// @copyright      2014+, Miguel De Anda
// @unwrap
// ==/UserScript==

$(document).ready(function() {
    setTimeout(function() {
        $("#email-collector-modal").hide();
        $(".modal-backdrop").hide();
    }, 500);
});
