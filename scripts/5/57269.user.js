// ==UserScript==
// @name           What.cd Filelist AutoOpen
// @namespace      rattvisGM
// @description    Make the torrent filelist be open by default
// @author         rattvis
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        http://what.cd/torrents.php?id=*
// @version        0.1
// @date           2009-09-07
// ==/UserScript==

var torrentTable = document.getElementsByClassName("torrent_table")[0];
var torrentRows =  torrentTable.getElementsByClassName("pad");

for(var i=0; i<torrentRows.length; i++)
	unsafeWindow.show_files(torrentRows[i].id.replace("torrent_", ""));