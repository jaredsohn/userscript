// ==UserScript==
// @name           Transformice.exe
// @description    Permet de simuler la version exécutable en navigateur (vue sur les bords)
// @include        http://www.transformice.com/*
// @include        http://en.transformice.com/*
// @include        http://en2.transformice.com/*
// @include        http://br.transformice.com/*
// @include        http://br2.transformice.com/*
// @include        http://br3.transformice.com/*
// @include        http://ru.transformice.com/*
// @include        http://tr.transformice.com/*
// @include        http://cn.transformice.com/*
// @author         Thiht
// ==/UserScript==
var ebd=document.getElementsByTagName('embed')[0];ebd.width='100%';ebd.height='100%';ebd.style.position='absolute';ebd.style.top='0';ebd.style.left='0';ebd.setAttribute('scale','noscale');
document.getElementById('google_ads_frame1').style.display='none';var iframe=document.getElementsByTagName('iframe')[0];iframe.style.position='absolute';iframe.style.zIndex='-5000';iframe.style.display='none';