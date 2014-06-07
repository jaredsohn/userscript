// ==UserScript==
// @name           fixin' teh hawtness
// @namespace      fixin' teh hawtness
// @description    Makes service record things better... I think.
// @include        http://*bungie.net/Account/Profile.aspx*
// ==/UserScript==

var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat').textContent;

// links yayz

document.getElementById('ctl00_mainContent_header_overviewh3_hypODSTGamesList').setAttribute('href','/stats/halo3/careerstatsodst.aspx?player='+gt);
document.getElementById('ctl00_mainContent_header_overviewh3_hypGamesList').setAttribute('href','/stats/halo3/careerstats.aspx?player='+gt);
document.getElementById('ctl00_mainContent_header_overviewh2_hypGamesList').setAttribute('href','/stats/playerstatshalo2.aspx?player='+gt);

// DeathBringer669 liekz mudkipz
// Kinsler iz a thug