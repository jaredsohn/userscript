// ==UserScript==
// @name          GamingClerks - Kommentarumbrueche
// @namespace     gccommentlinebreak
// @description	  Sollte die Kommentare auf GamingClerks.de fixen. Funktioniert sowohl in der News- als auch im Videoansicht. - Deaktiviert im Forum um mögliche Kompatibilitaetsprobleme zu verhindern.
// @include       http://www.gamingclerks.de/*
// @match         http://www.gamingclerks.de/*
// @exclude_match http://www.gamingclerks.de/forum/*
// @exclude       http://www.gamingclerks.de/forum/*
// ==/UserScript==

document.getElementById("comments").style.whiteSpace = "pre-wrap";