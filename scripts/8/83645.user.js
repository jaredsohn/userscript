// ==UserScript==
// @name           Rising-Gods ohne Vote
// @version        1.0a
// @description    Entfernt den nervigen Vote-Button von der Rising-Gods Homepage.
// @include        http://*rising-gods.de/*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/83645.meta.js?interval=1&show
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////////
/***************************************************************************************/
/*                                                                                     */
/* Upload (GMT + 1) Version  Neuigkeit                                                 */
/* YYYY-MM-DD HH:MM                                                                    */
/* 2010-08-14 10:15 1.0      Skript erstellt                                           */
/* 2010-08-14 10:15 1.1      Autoupdater hinzugefügt.                                  */
/*                                                                                     */
/***************************************************************************************/
/////////////////////////////////////////////////////////////////////////////////////////

function dotask()
{
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("votepopup"));
}

function main()
{
  dotask();
}

main();
