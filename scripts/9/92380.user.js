// ==UserScript==
// @name                Faster MoodScope
// @namespace           http://leon.barrettnexus.com/
// @description         A tweak to make moodscope.com work faster.
// @include             http://moodscope.com/moodscope_test.php?*
// @include             http://www.moodscope.com/moodscope_test.php?*
// ==/UserScript==

/**
 * Copyright 2010 by Leon Barrett (leon@barrettnexus.com).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @fileoverview A tweak to make moodscope.com work faster.
 * @author leon@barrettnexus.com (Leon Barrett)
 */

function getMatchingElt(type, attr, val) {
  var elements = document.getElementsByTagName(type);
  for (var i=0; i<elements.length; i++) {
    if (elements[i].getAttribute(attr) == val) {
      return elements[i];
    }
  }
  return null;
}

function setImagesAndLinks(img, map, oldNum, num) {
  img.src = img.src.replace(''+oldNum+'.jpg', ''+num+'.jpg');
  var mapRectangle = map.firstChild.nextSibling;
  mapRectangle.href = mapRectangle.href.replace(/(string=\d*)\d/, '$1'+num);
}

function makeChangeCallback(type, img, map) {
  return function(e) {
    // don't let the link work normally
    e.stopPropagation();
    e.preventDefault();

    var regex = /(\d)\.jpg/
    var curNum = parseInt(regex.exec(img.src)[1]);
    var nextNumMap = {'flip': [3, 2, 1, 0], 'rotate': [1, 0, 3, 2]};
    var nextNum = nextNumMap[type][curNum];
    setImagesAndLinks(img, map, curNum, nextNum);
  }
}

function makeHoverCallback(img, newEnding) {
  return function(e) {
    // don't let the event work normally
    e.stopPropagation();
    e.preventDefault();

    img.src = img.src.replace(/(_HILITE)?\.jpg$/, newEnding);
  } 
}

function main() {
  var flip_img_url = 'images/turn_back_to_front_button.jpg';
  var rotate_img_url = 'images/spin_head_to_toe_button.jpg';

  var flip_img = getMatchingElt('img', 'src', flip_img_url);
  var rotate_img = getMatchingElt('img', 'src', rotate_img_url);

  var flip_link = flip_img.parentNode;
  var rotate_link = rotate_img.parentNode;

  var card_img = getMatchingElt('img', 'name', 'mypic');
  var img_map = getMatchingElt('map', 'name', 'mymap');

  flip_link.addEventListener('click', makeChangeCallback('flip', card_img, img_map), false);
  rotate_link.addEventListener('click', makeChangeCallback('rotate', card_img, img_map), false);

  // I can't seem to manipulate the elements of mapRectangle, so I duplicate it
  // and manipulate the copy.
  var mapRectangle = img_map.firstChild.nextSibling;
  var newMapRectangle = document.createElement('area');
  newMapRectangle.coords = mapRectangle.coords;
  newMapRectangle.shape = mapRectangle.shape;
  newMapRectangle.href = mapRectangle.href;
  img_map.replaceChild(newMapRectangle, mapRectangle);
  mapRectangle = newMapRectangle;

  mapRectangle.addEventListener('mouseover', makeHoverCallback(card_img, '_HILITE.jpg'), false);
  mapRectangle.addEventListener('mouseout', makeHoverCallback(card_img, '.jpg'), false);
}

main();
