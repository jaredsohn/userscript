// ==UserScript==
// @name        exhentai_torrentlinks
// @namespace   exhentai
// @description download your exhentai torrents from gallery page in one click 
// @include     http://exhentai.org/g/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.0
// ==/UserScript==

String.prototype.indexOfAll = function(substr) {
    var i = 0;
    var indexes = [];
    while(i>-1) {
        i = this.indexOf(substr,i);
        if (i>-1) {
            indexes.push(i);
            i++;
        }
    }
    return indexes;
}

function onTorrents(data) {
    //cut all tables from ajax responce and append them to tags div (1 table - one torrent link)
    var i = 0, tb = data.indexOfAll('<table'), te = data.indexOfAll('</table'); // table_begin, table_end
    for (var i in tb) { 
        var t = data.substr(tb[i],te[i]-tb[i]+8).replace('width:99%','border: 1px solid #34353B;'); // '</table>'.length == 8
        $('#taglist').append(t); // place to put links, chang it if you want
    }
}

window.onload = function() {
    //get torrents page using ajax
    var url = $("#gd5 a")[2].getAttribute('onclick').match(/http:\/\/[0-9a-z.?=\/&]*/);
    // @todo make more intelligent search than $("#gd5 a")[2]
    $.ajax({url: url, success: onTorrents, method: 'GET'});
}
