// ==UserScript==
// @name       CSGOLounge Match CEST to PDT
// @version    1.0
// @description  Change the CSGO matches on CSGOLounge to display time in PST instead of CEST
// @match      http://csgolounge.com/match?m=*
// ==/UserScript==

jQuery(".half:contains('CEST')").text((parseInt(jQuery(".half:contains('CEST')").text().substr(0, 2)) + 15) %24 + jQuery(".half:contains('CEST')").text().substr(2, 4) + "PDT");
