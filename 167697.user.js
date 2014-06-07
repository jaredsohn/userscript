// ==UserScript==
// @name       Ikariam send data to server
// @namespace  http://github.com/sullerandras
// @version    0.1
// @description  Sends all information about the Ikariam game to the server, which provides a nice overview of the collected data.
// @match      http://*.ikariam.com/*
// @exclude    http://board*.ikariam.com/*
// @match      http://ikariam-overview.appspot.com/public/index.html
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js
// @copyright  2013+, Andras Suller
// history:
//  2013-05-26: display building names
//  2013-05-26: better refreshing methodology
// ==/UserScript==

var domain = window.location.host;

//var url = 'http://ika.appspot.com:8080/';
var url = 'http://ikariam-overview.appspot.com/';

GM_addStyle('.building-name{position:relative;z-index:999;background:white;border:1px solid black;white-space: pre;padding: 1px;}');
GM_addStyle('.buildingGround .building-name{background:yellow;}');

function showCityNames($){
    $('#locations .building a').each(function(idx, elem){
        elem = $(elem);
        var name = elem.attr('title');
        var existing = $('.building-name', elem.parent());
        if (existing.length > 0) {
            existing.html(name);
        } else {
            $('<span class="building-name">'+name+'</span>').insertAfter(elem);
        }
    })
}
function send(data){
    return $.ajax({
        type: 'POST',
        url: url,
        xhrFields: {
          withCredentials: true
        },
        data: data,
        dataType: 'json',
        contentType: "application/json; charset=utf-8"
    })
    .done(function() { console.log(new Date(), "data sent to the server"); showCityNames(unsafeWindow.jQuery); })
    .fail(function() { console.log("error sending data to server"); })
}

if (domain.indexOf('appspot.com') >= 0) {
    setInterval(function(){
        var r = GM_getValue('refresh', '0');
        if (r) {
            GM_setValue('refresh', null);
            unsafeWindow.needRefresh = true;
        }
    }, 1000);
} else {
    send(JSON.stringify({domain: domain, dataSetForView: unsafeWindow.dataSetForView}));
    if (unsafeWindow.$) {
        unsafeWindow.$(unsafeWindow.document).ajaxSuccess(function(event, xhr, settings) {
            if (settings.url != url){
                send(JSON.stringify({domain: domain, updateData: JSON.parse(xhr.responseText)}))
                .done(function(){
                    if (settings.url.indexOf('view=updateGlobalData') < 0) {
                        GM_setValue('refresh', '1');
                    }
                });
            }
        });
    }
}