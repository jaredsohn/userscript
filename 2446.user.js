// ==UserScript==
// @name          MegaGames.com direct download.
// @description	  No 10 second delay on download (scheper@gmail.com)
// @include       http://www.megagames.com/news/redir.cgi*
// ==/UserScript==
//

window.location = new String(window.location).replace('http://www.megagames.com/news/redir.cgi?', '');

