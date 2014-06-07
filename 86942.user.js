// ==UserScript==
// @name          Green Facebook Theme
// @description	  Makes the Facebook titlebar green. Not yet fit for public consumption.
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "#blueBar {
background-color: #79df49;
height: 41px;
left: 0px;
position: absolute;
width: 100%;
}
#pageLogo a {
background: #79df49 url(http://static.ak.fbcdn.net/rsrc.php/z7VU4/hash/66ad7upf.png) no-repeat -21px 0px;
display: block;
height: 31px;
left: -6px;
position: absolute;
top: 10px;
width: 103px;
}
#headNavOut {
background-color: #7aad62;
border: solid #1d8840;
font-size: 11px;
height: 30px;
margin-left: 180px;
padding-left: 10px;
padding-right: 6px;
position: relative;
top: 10px;
}";

})();