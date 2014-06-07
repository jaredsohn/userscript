// ==UserScript==
// @name           Hide Channel Button
// @namespace      http://tempuri.org/sonix
// @include        http://zattoo.com/view*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var btn = $('<button style="position:fixed;top:15px;left:15px;z-index:99999">Channels</button>');
var channelVisible = true;
btn.click(function () {
    if (channelVisible) {
        $('#controlpane').hide();
        $('#mainpane').css('left', 0);
    } else {
        $('#controlpane').show();
        $('#mainpane').css('left', '317px');
    }
    channelVisible = !channelVisible;
});
$('body').append(btn);
