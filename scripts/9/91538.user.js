// ==UserScript==
// @name           TorrentLeech.org New Window
// @namespace      Opens torrents on the torrentleech.org page in new windows.
// @include        *torrentleech.org*
// ==/UserScript==

/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



var linki = document.getElementsByTagName('a');
var x;

for (x in linki)
{
   if (linki[x].href.match('/torrent/'))
   {
      linki[x].target = '_blank';
   }
}