// ==UserScript==
// @id             URL_Redirect_Sumotorrent
// @name           Redirect the malformed qbittorrent description request URL to the correct sumotorrent URL
// @version        1.0
// @namespace      redirect_qbittorrent_to_sumotorrent
// @author         Someone who thinks the author of the qbittorrent sumotorrent search engine plug-in should have fixed this so I wouldn't have to.
// @description    This script redirects the malformed sumotorrent URL given by the "Go to description page" button in qbittorrent
// @include        http*://torrents.sumotorrent.comwww.sumotorrent.com*
// @run-at         document-start
// ==/UserScript==

window.location = window.location.toString().replace("torrents.sumotorrent.comwww.sumotorrent.com","torrents.sumotorrent.com")
