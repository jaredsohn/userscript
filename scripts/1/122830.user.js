// ==UserScript==
// @name           Zvyraznovac sprav
// @namespace      pokec
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @version        0.2
// ==/UserScript==
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.charset = "utf-8";
newScript.id = "zvyraznovac";
newScript.src = "data:application/x-javascript;base64,alF1ZXJ5LmV4cHJbJzonXS5jb250YWluc2k9ZnVuY3Rpb24oYSxpLG0pe3JldHVybiBqUXVlcnkoYSkudGV4dCgpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpPj0wO307DQokKCI8c3R5bGUgdHlwZT0ndGV4dC9jc3MnPiAudHZvak5pY2t7YmFja2dyb3VuZC1jb2xvcjp0ZWFsIWltcG9ydGFudDsgY29sb3I6ICNmZmYhaW1wb3J0YW50OyBmb250LXdlaWdodDpib2xkIWltcG9ydGFudH0gPC9zdHlsZT4iKS5hcHBlbmRUbygiaGVhZCIpOw0KJCgnI3NrbG8nKS5iaW5kKCdET01Ob2RlSW5zZXJ0ZWQgRE9NTm9kZVJlbW92ZWQnLCBmdW5jdGlvbihldmVudCl7DQp2YXIgcGlza290YT0kKCIucHJpc3Bldm9rOmNvbnRhaW5zaSgiK25pY2srIikgPiBzcGFuID4gc3BhbiIpOw0KcGlza290YS5hZGRDbGFzcygidHZvak5pY2siKTsNCn0pOw==";
headID.appendChild(newScript);

/*
jQuery.expr[':'].containsi=function(a,i,m){return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;};
$("<style type='text/css'> .tvojNick{background-color:teal!important; color: #fff!important; font-weight:bold!important} </style>").appendTo("head");
$('#sklo').bind('DOMNodeInserted DOMNodeRemoved', function(event){
var piskota=$(".prispevok:containsi("+nick+") > span > span");
piskota.addClass("tvojNick");
});
*/

// pridat RunOnceAfterPageLoad funkciu