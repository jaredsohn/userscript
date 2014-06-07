// ==UserScript==
// @name        Login
// @namespace   vincent.le.quang
// @include     http://*
// @include     https://*
// @version     1
// ==/UserScript==

var lookFor = escape("domain=");
var array = Array.prototype.slice.apply(document.getElementsByTagName('a'));
for(var i=0;i<array.length;i++) {
    var href = array[i].href;
    var found = href.indexOf(lookFor);
    if(found>=0) {
        var str = href.substr(found);
        var amp=str.indexOf('&');
        str = unescape(str.substr(0,amp));
        var domain = str.split("=")[1];
        handleDomain(domain);
    }
}

function handleDomain(domain) {
    switch(domain) {
        case "maple.preview.adobeconnect.com":
            insertCredentialsConnect('vlequang@adobe.com','***');
            break;
        case "my.adobeconnect.com":
            insertCredentialsConnect('vlequang@adobe.com','*');
            break;
        case "connectproqe.adobeconnect.com":
            insertCredentialsConnect('vlequang@adobe.com','*');
            break;
    }
}

function insertCredentialsConnect(user,password) {
    document.getElementById('name').value = user;
    document.getElementById('pwd').value = password;
}