// ==UserScript==
// @name        tubeplus
// @namespace   me.tubeplus.www
// @include     http://www.tubeplus.me/player/*
// @version     1
// @grant       none
// ==/UserScript==


function sendRequestToServer(url) {
    var response;
    var request = new XMLHttpRequest();
    //request.responseType = 'document';
    request.open('GET', url, false);
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                response = request.responseText;
            }
        }
    }
    request.send();
    return response;
}

var allEpisodeLinks = [];
var uri;
var responsehtml;
var htmlDoc;

allEpisodeLinks[0] = document.URL;
uri = document.getElementsByClassName('next')[0];
allEpisodeLinks[1]=uri;
htmlDoc=document.createElement('div'); 
responsehtml = sendRequestToServer(uri);
htmlDoc.innerHTML = responsehtml;

var i=2;
while(htmlDoc.getElementsByClassName('next')!=null && htmlDoc.getElementsByClassName('next')[0]!=undefined){
   uri=htmlDoc.getElementsByClassName('next')[0];
   allEpisodeLinks[i]=uri;
   i+=1;
   //alert(uri);
   responsehtml = sendRequestToServer(uri);
   htmlDoc.innerHTML = responsehtml;
}
alert(i);

var html="<body>";
var rootDownloadUri="http://www.tubeoffline.com/download.php?host=Tubeplus&video=";
var downloadUri;
for (var i = 0; i < allEpisodeLinks.length; i++) {
    downloadUri=rootDownloadUri+allEpisodeLinks[i];
    //<a href="url">Link text</a>
    html+="<a href=\""+downloadUri+"\">"+downloadUri+"</a><br>";
    //window.open(downloadUri,"_blank");
}
html+="</body>";
alert(html);