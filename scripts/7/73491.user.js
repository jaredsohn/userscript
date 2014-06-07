// ==UserScript==
// @name        Facebook Without Ads
// @namespace   http://underpantsgnome.com
// @description Facebook without the ads
// @include     http://www.facebook.com/*
// @author      UnderpantsGnome
// ==/UserScript==

var UPGhead = document.getElementsByTagName('head')[0]
var UPGcss = document.createElement('style')
UPGcss.rel = 'stylesheet'
UPGcss.type = 'text/css'
UPGcss.media = 'all'
UPGcss.innerText = "#ego,#pagelet_ads,#pagelet_adbox,#pagelet_connectbox,#sidebar_ads,#home_sponsor_nile,.hp_connect_box{height:0;visibility:hidden;}#right_column{padding-right:180px;}"
UPGhead.appendChild(UPGcss)
