// ==UserScript==
// @name        Aptoide Download APK
// @namespace   http://localhost
// @include     http://*.store.aptoide.com/*
// @exclude     http://apps.store.aptoide.com/
// @version     2.0
// @grant       none
// ==/UserScript==

if(!window.location.toString().match(/http:\/\/m\./)){
    
mobile_site_add = "http://m."+window.location.toString().slice(7);

var mobile_site = function() {
        var b = document.getElementsByTagName('body')[0];
        var t = document.createElement('div');
    t.innerHTML = '<font color=green size=2><a href="'+mobile_site_add+'" style=text-decoration:none><div>Get Download Link<br>From Mobile Site</div></a>';
        t.style.position = 'absolute';
        t.style.left = '10px';
        t.style.top = '10px';
        b.appendChild(t);

}

mobile_site();
    
}//END NOTIFICATION


var src = document.documentElement.innerHTML;



var md5 = "-"+src.match(/md5sum = "[A-Za-z0-9]*/).toString().slice(10);

var code = src.match(/app_install_button" href="http:\/\/imgs[A-Za-z0-9.\-\/]*/i);
var array = code.toString().split('/');
var file = "/"+array[array.length-1];

var folder = "/"+array[array.length-2];

var domain = "http://pool.apk.aptoide.com";

var download = domain+folder+file+md5+".apk";

var dl_button = function() {
        var b = document.getElementsByClassName('app_install_area')[0];
        var t = document.createElement('div');
        t.innerHTML = '<a href="'+download+'"><font size=2>&nbsp;DOWNLOAD APK</a>' ;
        //t.style.position = 'absolute';
        //t.style.left = '70px' ;
        //t.style.top = '-20px' ;
        b.insertBefore(t,b.childNodes[1]);

}

dl_button();



