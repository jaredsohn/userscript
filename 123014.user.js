// ==UserScript==
// @name          nCore Színező - Vitaio
// @namespace     Vitaio
// @description   Kiemeli a népszerű torrenteket
// @include       http://ncore.cc/torrents.php*
// @include       https://ncore.cc/torrents.php*
// @exclude       http://ncore.cc/torrents.php?action*
// @exclude       https://ncore.cc/torrents.php?action*
// ==/UserScript==

for(i=0;i<document.getElementsByClassName("box_torrent").length;i++)
	document.getElementsByClassName("box_torrent")[i].getElementsByTagName("a")[1].title.match(/mwt|1080p.bluray|dexter|misfits|alcatraz|south.park|banshee|homeland|the.cleveland.show|family.guy|boardawalk.empire|sherlock|game.of.thrones|amerikai.fater|ppb|helix|intelligence|modern.family|true.detective|fargo|hannibal|silicon.valley|believe/i) ? document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = "#78e1ff": parseInt(document.getElementsByClassName("box_d2")[i].innerHTML) + parseInt(document.getElementsByClassName("torrent")[i*2].innerHTML) + parseInt(document.getElementsByClassName("torrent")[i*2+1].innerHTML) > 200? document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = "#cccccc":"";