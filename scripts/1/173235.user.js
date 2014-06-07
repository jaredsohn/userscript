// ==UserScript==
// @name           Hide Channel Button
// @include        http://zattoo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var li = $('<li></li>');
var btn = $('<a href="#">Hide</a>');
li.append(btn)
var channelVisible = true;
btn.click(function () {
    if (channelVisible) {
        $('#controlpane').hide();
        $('#mainpane').css('left', 0);
	btn.html("Show");
    } else {
        $('#controlpane').show();
        $('#mainpane').css('left', '317px');
	btn.html("Hide");
    }
    channelVisible = !channelVisible;
});
$('#list_tabs').append(li);
