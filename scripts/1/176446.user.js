// ==UserScript==
// @name       Arte TV Get RTMP Stream
// @version    0.4
// @match      http://www.arte.tv/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @resource   CSS http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// ==/UserScript==

var FAVOURITE_LANG = ["VOF", "VO-STF", "VOF-STF"];
var div, url, dialog;
if (location.href.match(/autoplay=1/)) (location.href = location.href.split("?")[0]); // disable autoplay
div = document.querySelector("div.video-container");
if (div && (url = div.getAttribute("arte_vp_url"))) {
    GM_addStyle(GM_getResourceText("CSS"));
    $("section#details-focus div.container").append("<button style='margin-top: 10px'>Get RTMP urls</button>")
    .click(function(){
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(r) {
                if (!dialog) {
                    var data = JSON.parse(r.responseText).videoJsonPlayer.VSR;
                    dialog = $("div#fb-root").append("<div style='display: none;'></div>");
                    dialog.append("<table style='text-align: center; width: 500px;'><tbody></tbody></table>");
                    var table = dialog.find("tbody");
                    $.each(data, function(index, value) {
                        if (value.streamer) {
                            var redStyle = ( (value.quality == "HD - 720p") && (FAVOURITE_LANG.indexOf(value.versionCode) >= 0) ) ? " style='color: red' " : "";
                            table.append("<tr" + redStyle + ">"
                                         + "<td>" + value.quality + "</td>"
                                         + "<td>" + value.versionCode + "</td>"
                                         + "<td><button" + redStyle + " url='" + value.streamer + "mp4:" + value.url + "'>Copy RTMP URL</button></td>"
                                         + "</tr>");
                        }
                    });
                    dialog.click(function(e){
                        var rtmp = e.target.getAttribute("url");
                        if (rtmp) {
                            GM_setClipboard(rtmp, "text");
                            dialog.dialog("close");
                        }
                    });
                }
                dialog.dialog({minWidth: 500, title: "Choose RTMP stream"});
            }      
        })
    });
}