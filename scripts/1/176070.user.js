// ==UserScript==
// @name           Bom Negócio - Remove anúncios sem fotos da listagem
// @namespace      Bom Negócio
// @description    Bom Negócio - Rmove anúncios sem fotos da listagem.
// @include        http://www.bomnegocio.com/*
// @grant		   none
// @match          http://www.bomnegocio.com/*
// @match          http://www.bomnegocio.com/*
// @icon           
// @version        0.1
// @encoding       UTF-8
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

jQuery('.no_photo').parents('li').remove()