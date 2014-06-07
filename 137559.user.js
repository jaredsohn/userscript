// ==UserScript==
// @name       Sockshare/Putlocker FLV Downloader + Ad Remover
// @namespace  http://forgottencoders.co.uk
// @version    0.3
// @description  Allows you to download from Sockshare and Putlocker for FREE! without Ads!
// @include    http://www.sockshare.com/file/*
// @include    http://www.putlocker.com/file/*
// @copyright  2012 ForgottenCoders
// ==/UserScript==
 
if(document.getElementById("submitButton")){
    document.getElementById("submitButton").disabled = false;
    document.getElementById("submitButton").click();
}
document.getElementsByClassName("player_hover_ad")[0].innerHTML = "";
document.getElementsByClassName("ad_728x90_top")[0].innerHTML = "";
document.getElementsByClassName("player_hover_ad")[0].style.display = 'none';
document.getElementsByClassName("ad_728x90_top")[0].style.display = 'none';
document.getElementsByClassName("mobile_badge")[0].style.display = 'none';
document.getElementsByClassName("download_file_link")[0].innerHTML = "";
document.getElementsByClassName("download_file_link")[0].style.display = 'none';
var html = document.getElementsByTagName('html')[0].innerHTML;
var m = /\/get_file\.php\?stream=[a-zA-Z0-9]*=/.exec(html);
if (m.length == 1) {
    var url = location.origin + "/" + m[0];
    var  xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var m = /url="(http:\/\/[^"]+)"/.exec(xmlHttp.responseText);
            if (m.length == 2) {
                video_url = m[1];
                var h1_tag = document.getElementsByTagName("h2")[0];
                h1_tag.innerHTML = '<div style="text-align: center; float: right;"><a href="' +
                    video_url + '">Download Video</a></div>' + h1_tag.innerHTML;
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}