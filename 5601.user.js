// ==UserScript==
// @name          Jotapeges
// @description   Bypass ads from jotapeges
// @include       http://jotapeges.greenshines.com/show.php?img=*
// ==/UserScript==

// Jotapeges URL: http://jotapeges.greenshines.com/show.php?img=[pic_id].html
// Jotapeges IMG: http://jotapeges.greenshines.com/out.php?i=[pic_id]

document.location = "http://jotapeges.greenshines.com/out.php?i" + document.location.search.substring(document.location.search.indexOf("="), document.location.search.indexOf(".html"))