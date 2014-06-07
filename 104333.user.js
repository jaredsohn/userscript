/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name           Google Buzz HW Smileys
// @version        1.6
// @namespace      com.taberbuhl
// @description    A rebound based on the Holy Worlds smileys. 
// @author         Andrew Joyce (code from Taber Buhl)
// @include        http*://mail.google.com/mail/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var smilies = [
  { regex: /([:=]\?)/gi, offset: '0px', alt: 'Confused', text: ":?" },
  { regex: /([:=]D)/gi, offset: '-15px', alt: 'Smile', text: ":D" },
  { regex: /(:cool:)/gi, offset: '-30px', alt: 'Cool', text: ":cool:" },
  { regex: /(:shock:)/gi, offset: '-45px', alt: 'Shock', text: ":shock:" },
  { regex: /(:evil:)/gi, offset: '-60px', alt: 'Evil', text: ":evil:" },
  { regex: /(:twisted:)/gi, offset: '-75px', alt: 'Twisted', text: ":twisted:" },
];

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
        $('#canvas_frame').contents().find('style:first').append('img.gb_emoticon{ background: url(https://lh5.googleusercontent.com/-La2etF3QcU4/Te4wP-1ntBI/AAAAAAAAEMg/WAPFhXylnYA/smileys.gif) repeat scroll 0 0; }');
      }

      // swap out the smilies for the image equivalent
      var html = '';
      $ze.each(function(i, d) {
        html = $(d).html();

        for(var j = 0; j < smilies.length; j++) {
          html = html.replace(smilies[j].regex, '<img src="images/cleardot.gif" class="gb_emoticon" style="background-position: 0 ' + smilies[j].offset + '; width: 15px; height: 15px; overflow: hidden;" align="absmiddle" alt="' + smilies[j].alt + '" />');
        }
        $(d).html(html);

      });

    },
    1500
  );
});