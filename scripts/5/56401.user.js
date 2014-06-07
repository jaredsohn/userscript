// ==UserScript==
// @name           GameFAQs linkage
// @author         Awesumness (GFAQS:Poo Poo Butter)
// @Notes          Enjoy.
// @include        http://www.gamefaqs.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$('a[href^="/boards/myposts.php"]').attr("href","/boards/myposts.php");
$('#platformlist .nav a[href="/portable/ds/"]').attr("href","/boards/gentopic.php?board=925329");
$('#platformlist [href="/portable/gbadvance/"]').attr("href","/boards/gentopic.php?board=916598");
$('#platformlist [href="/console/gamecube/"]').attr("href","/boards/gentopic.php?board=915781");
$('#platformlist [href="/computer/doswin/"]').attr("href","/boards/gentopic.php?board=916373");
$('#platformlist [href="/console/ps2/"]').attr("href","/boards/gentopic.php?board=915821");
$('#platformlist [href="/console/ps3/"]').attr("href","/boards/gentopic.php?board=927750");
$('#platformlist [href="/portable/psp/"]').attr("href","/boards/gentopic.php?board=918340");
$('#platformlist [href="/console/wii/"]').attr("href","/boards/gentopic.php?board=930752");
$('#platformlist [href="/console/xbox/"]').attr("href","/boards/gentopic.php?board=915780");
$('#platformlist [href="/console/xbox360/"]').attr("href","/boards/gentopic.php?board=927749");