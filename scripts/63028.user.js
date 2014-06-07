// ==UserScript==
// @name           Remove cover on nikkeibp.com.cn
// @namespace      http://people.debian.org.tw/~chihchun/
// @description    Remove cover of registration on nikkeibp.com.cn
// @include        http://*.nikkeibp.com.cn/*
// ==/UserScript==

if(document.getElementById('coverDiv')){
    document.getElementById('coverDiv').style.display = 'none';
}
