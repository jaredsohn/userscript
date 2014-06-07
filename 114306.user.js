// ==UserScript==
// @name           Facebook Blue bar always on top
// @namespace      Facebook
// @include        http://www.facebook.com/*
// @Author        Credit: Arjun Abrol
//@Description   Always keeps the bar of faceook on top so no need to scroll all the way up.
// ==/UserScript==
var x = document.getElementById('blueBar');
var y = document.getElementById('pageHead');
x.setAttribute('style', 'top:0px;position:fixed;-moz-box-shadow: 0px 0px 5px 3px #797979;z-index:100;');
y.setAttribute('style', 'width:980px;');

if (document.getElementById('blueBarHolder') != null) document.getElementById('blueBarHolder').setAttribute('style', 'display:scroll;position:fixed;top:0px;z-index:100;');

var pd = document.createElement('div');
pd.style.display = 'block';
pd.style.height = '41px';
pd.style.background = '#FFFFFF';
document.body.insertBefore(pd, document.body.childNodes[1]);