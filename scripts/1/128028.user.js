// ==UserScript==
// @name			nCore Színező
// @include			http://ncore.cc/torrents.php*
// @include			http://ncore.nu/torrents.php*
// @include			https://ncore.cc/torrents.php*
// @include			https://ncore.nu/torrents.php*
// @exclude			http://ncore.cc/torrents.php?action*
// @exclude			http://ncore.nu/torrents.php?action*
// @exclude			https://ncore.cc/torrents.php?action*
// @exclude			https://ncore.nu/torrents.php?action*
// ==/UserScript==

for	(
		i=0 ;
		i < document.getElementsByClassName("box_torrent").length ;
		i++
	)

//Figyelt 720p torrentek - Zöld színű
	document.getElementsByClassName("box_torrent")[i].getElementsByTagName("a")[1].title.match
		(/The.Big.Bang.Theory|Agymenok|South.Park|Family.Guy|2.Broke.Girls|Revenge|Dexter|Grimm|Misfits|Suburgatory|A.kondom.el.van.vetve|Switched.at.Birth|Elcserélt.lányok|Desperate.Housewives|Született.Feleségek|Cougar.Town|Született.Szinglik|My.Little.Pony.Friendship.Is.Magic|Varázslatos.Barátság|Spartacus|Modern.Family/i)

 &&
	document.getElementsByClassName("box_torrent")[i].getElementsByTagName("a")[1].title.match
		(/720p|Dimension|Immerse/i)
 ?
	document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = (i%2?"#3aa03a":"#328e32"):


//Egyéb Torrentek - Kék színű
	document.getElementsByClassName("box_torrent")[i].getElementsByTagName("a")[1].title.match
		(/eden|éden|windows.7|windows.8|windows.xp/i)
 ?
	document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = (i%2?"#3b6f70":"#3a8081"):



//Sok letöltés - Bordó színű
	parseInt(document.getElementsByClassName("box_d2")[i].innerHTML) +
	parseInt(document.getElementsByClassName("torrent")[i*2].innerHTML) +
	parseInt(document.getElementsByClassName("torrent")[i*2+1].innerHTML) > 200

 ?

	document.getElementsByClassName("box_nagy" + (i%2?"":"2"))[parseInt(i/2)].style.backgroundColor = (i%2?"#814e4e":"#764343"):"";