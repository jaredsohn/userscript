// ==UserScript==
// @name        LinuxLiteOS Forums Dark Theme
// @namespace   http://userscripts.org/scripts/show/138020
// @description Display the LinuxLiteOS forums using a dark theme
// @include     https://www.linuxliteos.com/forums/*
// @version     1.2.4
// @grant	none
// ==/UserScript==
/* 
    Originally written by riser

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'body, td, th, tr {\
  color: #999999;\
}\
\
a:link, a:visited {\
  color: #3399DD;\
}\
\
#content_section {\
  background: #333333;\
  padding: 12px;\
}\
\
.bgmenu {\
  height: 30px;\
}\
\
div#headerwrapper {\
  height: 30px;\
}\
\
#menupr {\
  padding-top: 5px;\
  height: 30px;\
}\
\
#menupr .menusub li ul {\
  top: 25px;\
}\
\
.search_input {\
  color: #CCCCCCC;\
}\
\
div.cat_bar {\
  border: 1px solid #555555;\
}\
\
.buttonlist ul li a {\
  background: #EEEEEE;\
  border: 1px solid #555555;\
  border-radius: 5px;\
}\
\
.buttonlist ul li a:hover {\
  background: #333333;\
  border: 1px solid #CCCCCC;\
}\
\
.buttonlist ul li a span {\
  background: none;\
}\
\
.buttonlist ul li a:hover span {\
  background: none;\
}\
\
div#footerwrapper {\
  padding: 10px;\
}\
\
#copyrightf ul {\
  padding: 20px;\
}');

var replaceColorAttributes = function (element, searchValue, replaceValue) {
    searchValue = searchValue.toUpperCase();
    var nodes = element.getElementsByTagName('font');

    for (var i = 0, length = nodes.length; i < length; i++) {
        var node = nodes[i];
  var color = node.getAttribute("color", 2);
        if (color == undefined) { continue; }
  if (color.toUpperCase() == searchValue) { node.setAttribute("color", replaceValue); }
    }
}

replaceColorAttributes(document.body, "#0000FF", "#33DD33");