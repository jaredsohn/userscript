// ==UserScript==
// @name        UpdateSteamRep
// @namespace   steamrep
// @include     http://steamrep.com/profiles/*
// @version     3
// ==/UserScript==

$ = unsafeWindow.$;
function updateAll() {
  $('img.needupdate').parent().each(function(){this.click()});
}
unsafeWindow.updateAll = updateAll;
$('#profileinfo').append('<a href=# onClick="updateAll();return false;">Update friends ('+ $('img.needupdate').length + ')</a>')