// ==UserScript==
// @name           belajaran ngedit
// @namespace      http://www.pedox.tk .... dimodif karo buatcintaku
// @description    biar buzz bisa make smiley kaskus
// @include        http://mail.google.com/mail/*
// @version        0.01
// ==/UserScript==
//
//      -KaskuS- Emoticons Relased
//      
//      Copyright 2010 Fadilz <fadilz@null.net>
//      
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//		All rights ReserveD This Script Modiffed By Pedox A.K.A Fadilz On kaskuser 
//		-[PERINGATAN]- JANGAN MENGAKUI KODE INI MILIK ORANG LAIN 
//		JANGAN MODIFIKASI KODE INI SEIZIN OWNER
//		Respect To Owner 
//		Start Begin on code

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://www.kaskus.us/images/icons/icon10.gif\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
var $ze = $([]);
var timer = 0;

/*
var timer_cnt = 0;
function doneProbing(){
  clearInterval(timer);
  timer_cnt = 0;
}
*/

$(window).ready(function() {
  timer = setInterval(
    function(){
      // no more caching - each time the view changes, smilies are reset :(
      $ze = $('#canvas_frame').contents().find('span.ze:visible, span.zo:visible');
      
      if(!$ze.size())
        return;
      
      // due to the addition of "&quot;" to the background: url(...) style attribute in firefox for windows, we have to use canvas_frame's style tag to set the bg image
      if(!$('#canvas_frame').contents().find('style:contains("gb_emoticon")').size()) {
        $('#canvas_frame').contents().find('style:first').append('img.gb_emoticon{ background: url(http://50k.com/images/buzz-comment-emoticons/emoticons.png) repeat scroll 0 0; }');
      }

      // swap out the smilies for the image equivalent
      var html = '';
      $ze.each(function(i, d) {
        html = $(d).html();

        for(var j = 0; j < smilies.length; j++) {
          html = html.replace(smilies[j].regex, '<img src="images/cleardot.gif" class="gb_emoticon" style="background-position: 0 ' + smilies[j].offset + '; width: 19px; height: 19px; overflow: hidden;" align="absmiddle" alt="' + smilies[j].alt + '" />');
        }
        $(d).html(html);

      });

    },
    1500
  );
});