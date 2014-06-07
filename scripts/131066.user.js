// ==UserScript==
// @name       Sockshare/Putlocker video link
// @namespace  http://fillips.l4m1.de/
// @version    0.1
// @description  Creates FLV video link and skips waiting
// @include    http://www.sockshare.com/file/*
// @include    http://www.putlocker.com/file/*
// @copyright  2011+, buzz
// ==/UserScript==
 
if(document.getElementById("submitButton")){
    document.getElementById("submitButton").disabled = false;
    document.getElementById("submitButton").click();
}

var html = document.getElementsByTagName('html')[0].innerHTML;
var m = /\/get_file\.php\?stream=[a-zA-Z0-9]{44}/.exec(html);
if (m.length == 1) {
    var url = location.origin + "/" + m[0];
    var  xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var m = /url="(http:\/\/[^"]+)"/.exec(xmlHttp.responseText);
            if (m.length == 2) {
                video_url = m[1];
                var h1_tag = document.getElementsByTagName("h1")[0];
                h1_tag.innerHTML = '<div style="text-align: center; float: right;"><a href="' +
                    video_url + '">Download Video</a></div>' + h1_tag.innerHTML;
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}
