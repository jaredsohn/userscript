// ==UserScript==
// @name         URL Space Replacer
// @namespace
// @description  Removes spaces in URL for WebSense blocked pages
// @include      */block_message.cgi?ws-session=*
// ==/UserScript==

function remove_spaces()
{
    var link = document.getElementById('UrlText').innerHTML;
    link = link.replace(new RegExp(/\s/), '');
    document.getElementById('UrlText').innerHTML = '<a href="'+link+'">'+link+'</a>';
}

remove_spaces();
