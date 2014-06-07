// ==UserScript==
// @name           show weapons at z8games.com
// @namespace      onuris
// @description    Behebt den Fehler, dass Waffen der Spieler auf z8games nicht angezeigt werden./ Solves a bug at z8games wich makes weapons of players invisible.
// @include        http://clan.z8games.com/charstat_cf.aspx?usn=*
// @exclude        http://clan.z8games.com/charstat_cf.aspx?usn=*&tb=w
// @exclude        http://clan.z8games.com/charstat_cf.aspx?usn=*&tb=s
// @exclude        http://clan.z8games.com/charstat_cf.aspx?usn=*&tb=l
// ==/UserScript==
window.location.replace(document.URL + "&tb=w");
