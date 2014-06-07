// ==UserScript==
// @name       Elimina notizie flash forum Ubuntu-IT 
// @namespace  http://forum.ubuntu-it.org/
// @description Elimina le notizie flash nel forum Ubuntu-IT in cima alla pagina
// @version    0.1.0
// @include    http://forum.ubuntu-it.org/*
// ==/UserScript==

/*
Project: Elimina notizie flash forum Ubuntu-IT 
Author: Riccardo Padovani <ricki.padovani@gmail.com>
Copyright: 2011-2012 Riccardo Padovani
License: GPL-2+
This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation; either version 2 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
more details.

On Debian GNU/Linux systems, the full text of the GNU General Public License
can be found in the file /usr/share/common-licenses/GPL-2.
*/
var div_notizie = document.getElementById("forum-news");
try {
    div_notizie.parentNode.removeChild(div_notizie);
}
catch(e){
}