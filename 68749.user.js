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
// @name           Google Buzz Comment Emoticons
// @version        1.5
// @namespace      com.taberbuhl
// @description    Give your Google Buzz comments some 3-D yellow emoticon love!
// @author         Taber Buhl
// @include        http*://mail.google.com/mail/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var smilies = [
  { regex: /(O:\)|O:\-\))/gi, offset: '-209px', alt: 'Innocent', text: "O:-)" },
  { regex: /(:\)|:\-\))/g, offset: '0px', alt: 'Smiling', text: ":-)" },
  { regex: /(:\(|:\-\()/g, offset: '-19px', alt: 'Frowning', text: ":-(" },
  { regex: /(;\)|;\-\))/g, offset: '-38px', alt: 'Winking', text: ";-)" },
  { regex: /(:P|:\-P)/gi, offset: '-57px', alt: 'Sticking-out-tongue', text: ':-P' },
  { regex: /(\&gt;*:o|\>:o)/gi, offset: '-114px', alt: 'Yelling', text: '>:o' },
  { regex: /(=\-o|=o|:o|:\-o)/gi, offset: '-76px', alt: 'Surprised', text: '=-O' },
  { regex: /(:\*|:\-\*)/g, offset: '-95px', alt: 'Kissing', text: ':-*' },
  { regex: /(8\)|8\-\))/g, offset: '-133px', alt: 'Cool', text: '8-)' },
  { regex: /(:\$|:\-\$)/g, offset: '-152px', alt: 'Money Mouth', text: ':-$' },
  { regex: /(:\!|:\-\!)/g, offset: '-171px', alt: 'Foot-in-mouth', text: ':-!' },
  { regex: /(:\[|:\-\[)/g, offset: '-190px', alt: 'Embarrassed', text: ':-[' },
  { regex: /(:\\|:\-\\)/g, offset: '-228px', alt: 'Undecided', text: ':-\\' },
  { regex: /(:\'\(|:\~\()/g, offset: '-247px', alt: 'Crying', text: ':&apos;(' },
  { regex: /(:x|:\-x)/gi, offset: '-266px', alt: 'Lipz-r-sealed!', text: ':-X' },
  { regex: /(:D|:\-D)/g, offset: '-285px', alt: 'Laughing', text: ':-D' }
];

/* TODO: maybe add some flickr funk
var others = [
  //http://farm1.static.flickr.com/34/73861762_f12a48759f.jpg
  { regex: /http:\/\/farm[0-9]?\.static\.flickr\.com\/[0-9]+\/[a-z0-9_]+\.jpg/i, html: '<img src="..." />' }
];
*/

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