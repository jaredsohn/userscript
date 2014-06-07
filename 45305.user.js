// ==UserScript==
// @name           ĐọcBáo
// @namespace      quanganhdo.docbao.download
// @version        0.1
// @description    Download newspaper from docbao.com.vn
// @include        http://docbao.com.vn/view/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

GM_registerMenuCommand('Download', function() {
$('body').html('Please wait...');
var links = '';
$.each(unsafeWindow.PageIndexes.Pool, function(i, item) {
    $.ajax({
        url: 'http://docbao.com.vn/detail/' + item.Link + '/default.dec',
        async: false,
        success: function(html) {
            links += 'http://docbao.com.vn' + html.match(/class="DetailImage" src="(.*?)"/)[1] + '\n';
        }
    })
});
$('body').html('<textarea readonly="true" onclick="javascript:this.select()" cols="100" rows="10">' + links + '</textarea><br />Save each link as a JPG image and you are done');
});