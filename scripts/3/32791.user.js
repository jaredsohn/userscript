// ==UserScript==
// @name		Replace Logo
// @author		SHUBHAM AGRAWAL
http://www.orkut.com/Profile.aspx?uid=12265867973911448164
// @community		http://www.orkut.com/Community.aspx?cmm=47523044
// @description		It modifies the initial image of the ORKUT for which you to choose. (Altera a imagem inicial do ORKUT pela qual voc� escolher.)
// @include		http://www.orkut.com/GLogin.aspx?done=http%3A%2F%2Fwww.orkut.com%2F
// @include        	http://www.orkut.com/GLogin.aspx
// @include        	http://www.orkut.com/
// @LAST UPDATE	  	17/08/2008
// ==/UserScript==

fotos = [
       "http://www.google.com/intl/en/logos/tanja_gompf.jpg",
       "http://www.google.com/intl/en/logos/stpatricks_06.gif",
       "http://www.google.com/intl/en/logos/braille.gif",
       "http://news.k.co.il/images/logos/yahoo-logo.jpg",
       "http://sps.nus.edu.sg/~andreasd/pictures/logo_msn.jpg",
       "http://osflash.org/_media/osflash-tux.jpg",
       "http://www.cs.scranton.edu/~ostermayerd2/apple_mirror.jpg"
       ];

document.images[3].src=fotos[Math.floor(Math.random()*fotos.length)];
 