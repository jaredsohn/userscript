// ==UserScript==
// @name           desproteger link
// @namespace      saviski
// @description    recupera o link (megaupload) sem ter que cadastrar nada, nem celular
// @include        http://*=d?/moc.daolpuagem.www//:ptth*
// ==/UserScript==

unsafeWindow.location.href = unsafeWindow.location.href.match(/\w+=d\?\/moc\.daolpuagem\.www\/\/:ptth/)[0].split('').reverse().join('');