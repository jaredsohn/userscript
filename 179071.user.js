// ==UserScript==
// @name        Old Google Logo (4W)
// @namespace   http://userscripts.org/scripts/source/179071.user.js
// @description Old Google Logo (4W) descr
// @include     https://*.google.com/*
// @include     http://*.google.com/*
// @version     1
// ==/UserScript==

if (document.location.toString().indexOf("q=") == -1) {
    if (document.getElementById('hplogo')) {
        if (document.getElementById('hplogo').src == 'https://www.google.com/images/srpr/logo11w.png') { //google.com homepage
            document.getElementById('hplogo').src = '/images/srpr/logo4w.png';
            document.getElementById('lga').style['margin-top'] = '20px';
        } else if (document.getElementById('hplogo').style.backgroundImage.indexOf("logo11w") != -1) { //images.google.com page
            document.getElementById('hplogo').style = 'background:url(/intl/en_ALL/images/srpr/logo4w.png) no-repeat;background-size:269px 95px;height:95px;width:269px';
        }
    }
}
var gbc_arr = document.getElementsByClassName('gb_c');
var numl = gbc_arr.length - 2;
gbc_arr[numl].style['background'] = 'url("images/nav_logo157.png") no-repeat scroll -1px -45px transparent';