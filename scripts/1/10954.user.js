// ==UserScript==
// @name         liveleak.com video download link
// @namespace     http://www.digivill.net/~joykillr
// @description   Adds a download link to liveleak.com so videos can be downloaded.  Works both with and without javascript enabled.
// @include       http://liveleak.com/view*
// @include       http://*.liveleak.com/view*
// ==/UserScript==
//
//v 4.0 - updated for latest server-side changes

var tID, dat, v1;
function getURL(tokenURL) {
    GM_xmlhttpRequest({
        method:"GET",
        url:tokenURL,
        headers:{
            "User-Agent":"Mozilla/5.0 Firefox/2.0.0.3",
            "Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
        },
        onload:function(details) {
            var URLstring = new String(details.responseText);
            URLstring = URLstring.split("file_location=")[1];
            var splitidx = URLstring.indexOf("placeholder_");
            splitidx = splitidx - 1;
            URLstring = URLstring.substring(0, splitidx);
            URLstring = unescape(URLstring);
            if (URLstring) {
                addBox(URLstring);
            }
        }
    });
}
    
function addBox(strR) {
    var URLDLbox = document.createElement("div");
    URLDLbox.setAttribute("style", "display: block !important;");
    URLDLbox.innerHTML = '<table style="width:auto; margin-left: auto; margin-right:auto;"><tbody style="background-color:inherit!important;">' +
        '<tr style="background-color:inherit!important;">' +
        '<td style="text-align:center;background-color:inherit!important;">' +
        '<a href="' + strR + '" style="font-size:108%; line-height:108%; color: #ffffff; background-color: #000000; border: 2px solid red; margin-left: auto; margin-right:auto; text-align:center; font-weight:bold;">Click Here To Download Video</a>' + 
        '<br /></td></tr></tbody></table>';
    var nElem = document.getElementsByTagName("div");
    for (var nn = 0; nn < nElem.length; nn++) {
        if ((nElem[nn].title.search("player.swf"))||(nElem[nn].getAttribute("dataattribute").search("player.swf"))) {
            if (document.getElementById("navMain")) {
                document.getElementById("navMain").appendChild(URLDLbox);
            } else {
                nElem[nn].appendChild(URLDLbox);
            }
        }
    }
}
    
function processVars(tID) {
    tID = tID.getAttribute("value");
    tID = tID.split('token\=')[1].split('\"'||'\&quot')[0];
    var token = "http\:\/\/www\.liveleak\.com\/mi\?token\=" + tID;
    return token;
    }

function run(){
    dat, v1 = "";
    if (document.body.getElementsByTagName("param")[0]) {
        v1 = document.body.getElementsByTagName("param")[0];
        dat = processVars(v1);
    } else {
        var tID = document.body.getElementsByTagName("input");
        for (var yy=0;yy<tID.length;yy++){
            if (tID[yy].name.match(/media_embed_code/i)) {
                v1 = tID[yy];
                dat = processVars(v1);
            }
        }
    }
    
    if (dat!=""&&dat!=null) {
        getURL(dat);
    }
}
run();
