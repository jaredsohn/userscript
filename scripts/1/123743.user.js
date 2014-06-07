// ==UserScript==
// @name    night
// @version 01
// @description set a dark theme
// @include *
// @include http://*/*
// @include https://*/*
// @exclude http://maps.yandex.ru/*
// @exclude https://mail.google.com/*
// @exclude http://vk.com/*
// @exclude http://vkontakte.ru/*
// @exclude http://vseobritvah.ru/*
// ==/UserScript==

var night=function(w){(function(d){var css='html{background:#333 !important}html *{background:none !important;color:#bbb !important;border-color:#333 !important;border-width:0 !important}html a,html a *{color:#5c8599 !important;text-decoration:underline !important}html a:visited,html a:visited *,html a:active,html a:active *{color:#525f66 !important}html a:hover,html a:hover *{color:#cef !important;background:#023 !important}html input,html select,html button,html textarea{background:#4d4c40 !important;border:1px solid #5c5a46 !important;border-top-color:#474531 !important;border-bottom-color:#7a7967 !important}html input[type=button],html input[type=submit],html input[type=reset],html input[type=image],html button{border-top-color:#7a7967 !important;border-bottom-color:#474531 !important}html input:focus,html select:focus,html option:focus,html button:focus,html textarea:focus{background:#5c5b3e !important;color:#fff !important;border-color:#474100 #665d00 #7a7849 !important;outline:2px solid #041d29 !important}html input[type=button]:focus,html input[type=submit]:focus,html input[type=reset]:focus,html input[type=image]:focus,html button:focus{border-color:#7a7849 #665d00 #474100 !important}html input[type=radio]{background:none !important;border-color:#333 !important;border-width:0 !important}html img[src],html input[type=image]{opacity:.5}html img[src]:hover,html input[type=image]:hover{opacity:1}html,html body{scrollbar-base-color:#4d4c40 !important;scrollbar-face-color:#5c5b3e !important;scrollbar-shadow-color:#5c5b3e !important;scrollbar-darkshadow-color:#474531 !important;scrollbar-track-color:#4d4c40 !important;scrollbar-arrow-color:#000 !important;scrollbar-3dlight-color:#7a7967 !important}';var s=d.getElementsByTagName('style');for(var i=0,si;si=s[i];i++){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var heads=d.getElementsByTagName('head');if(heads.length){var node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document); for(var i=0,f;f=w.frames[i];i++){try{arguments.callee(f)}catch(e){}}};night(window);
