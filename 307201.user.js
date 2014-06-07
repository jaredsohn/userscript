// ==UserScript==
// @name       KIO - KingsAge Italian Overhaul
// @namespace  N.A.
// @version    0.1
// @description  Kingsage Italian Overhaul
// @include     http://*.it.kingsage.gameforge.com/game.php?village=*&s=messages&m=in&id=*
// @include     http://*.it.kingsage.gameforge.com/game.php?village=*&s=info_ally&m=conquers&id=*
// @include     http://*.it.kingsage.gameforge.com/game.php?village=*&s=info_player&m=conquers&id=*
// @include     http://*.it.kingsage.gameforge.com/game.php?village=*&s=build_barracks*
// @copyright  2014, The warD0gz
// ==/UserScript==
  
// STREPFIX /////////////////// - Completo

document.body.innerHTML = document.body.innerHTML.replace(/Glücksrad nella Thronsaal/g, 'Sala del Trono');
document.body.innerHTML = document.body.innerHTML.replace(/<span class="notice">lascia/g, '<span class="notice">Abbandonato');

//// SPIE ////

document.body.innerHTML = document.body.innerHTML.replace(/<input type="submit" name="espy" value="Spia" style="background:#FF9999;">/g, '<input type="submit" name="espy" value="Spia" style="background:#FFFFFF;">');

// FINE