// ==UserScript==
// @name          ncore szinezo
// @namespace     akarmi
// @description   kiemeli a nepszeru torrenteket
// @include       http://ncore.cc/torrents.php*
// @include      https://ncore.cc/torrents.php*
// @exclude       http://ncore.cc/torrents.php?action*
// @exclude       https://ncore.cc/torrents.php?action*
// ==/UserScript==

for(i=0;i<document.getElementsByClassName("box_torrent").length;i++)
	document.getElementsByClassName("box_torrent")[i].getElementsByTagName("a")[1].title.match(/amateur.allure|mwt|alsscan.com|mysexykittens.com|pure18.com|naughty.office|teenbff.com|inthecrack.com|cumshotsuprise.com|hornyofficebabes.com|newsensations.com|blowjobfridays.com|realexgirlfriends.com|assholefever.com|killergram.com|emily18.com|lucyvanangel.com|pier999.com|teenlikeitbig.com|tryteens.com|massage.girls|siterip|tvday|reloaded|skidrow|mwt|sadu|bd25/i) ? document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = "#FF6000": parseInt(document.getElementsByClassName("box_d2")[i].innerHTML) + parseInt(document.getElementsByClassName("torrent")[i*2].innerHTML) + parseInt(document.getElementsByClassName("torrent")[i*2+1].innerHTML) > 200? document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = "#A31E39":"";