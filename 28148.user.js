// ==UserScript==
// @name           Teste
// @description    Replace your default sponsor banners with new ones, designed by Jonny Laris.
// @version        0.1
// @include        http://www*.cs-manager.com/*
// ==/UserScript==
for(var $=0;(K=document.getElementsByTagName("img")[$]);$++)switch(String(K.src).substr(34)){case"http://www1.cs-manager.com/images/status_mail.gif":K.src="http://mail.google.com/mail/images/2/5/logo.png"}