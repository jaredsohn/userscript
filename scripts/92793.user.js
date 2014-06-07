// ==UserScript==
// @name           XatiyaNoAds
// @description    Elimina el anuncio principal del foro en xatiyaro.net/foro
// @author         alazar
// @include        http://xatiyaro.net/foro/*
// @include        http://www.xatiyaro.net/foro/*
// @version        0.1
// ==/UserScript==

  var el = document.body.getElementsByTagName("iframe")[0];
  el.style.display = "none";