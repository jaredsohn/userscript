// ==UserScript==
// @name           Clear input field
// @description    Button for clear text in current input field
// @namespace      http://userscripts.org/scripts/show/101848
// @version        1.2
// @author         Alexey Murz Korepov
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/** Changelog:
version 1.2 - 2011-04-27
 - Fixed positioning on textarea with display=block
version 1.1 - 2011-04-27
 - Fixed right position of x image in some cases
version 1.0 - 2011-04-26
 - Initial version
*/

(function(){
  
  var button, target;
  
  function blur(e) {
    button.style.display = 'none';
    e.target.removeEventListener('blur', blur, false);
//    e.target.removeEventListener('paste', focus, false);
//    e.target.removeEventListener('keyup', focus, false);
  }
  
  function focus(e) {
    target = e.target;
    
    if(target.value == "") return;

    if ( !button ) {
      button = document.createElement('img');
      button.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACSSURBVDjLrZPNCcAgDIW9O1PXci6P6gJOIJ48Ooa0PlBJtRVaDTwSJF9M/GFst2mtuTFGZC+zj1CJscansFLqyIkh63xRQM4MThO4Kg1FStttZ2vtAHZr4TYO5qOJMO99AxDDuiKCdiDpbhWApzHNAUM7iH3LFXyCi+K+Av0IzrnPIywf4to1Lj+kLU95y2f6Yxe9Ghv54yQyLAAAAABJRU5ErkJggg==';
      button.style.cssText = 'position: absolute !important; cursor: pointer !important; margin: 0 !important; padding: 0 !important; border: 0 !important; display: none;';
      button.title = 'Click to clear this field';
      button.addEventListener('mouseover', function(){ target.removeEventListener('blur', blur, false); }, false);
      button.addEventListener('mouseout', function(){ target.addEventListener('blur', blur, false); }, false);
      button.addEventListener('click', function(){ target.value = ''; target.focus() }, false);
    } 
    
    if( target.parentNode ) {
      target.parentNode.insertBefore(button,target);
//       target.parentNode.style.position='relative';
//       alert(target.position);
//       button.style.top = 0;
//       button.style.left = 0;
//       button.style.top = target.offsetTop + 'px';
      button.style.marginTop = target.clientTop + 'px';
//       button.style.marginTop = target.offsetTop - target.clientHeight + 'px';
//       button.style.left = target.offsetLeft + 'px';
      button.style.marginLeft = target.clientLeft + target.clientWidth + 'px';
//       button.style.marginLeft = target.offsetLeft + target.clientWidth + 'px';
//       button.style.marginLeft = target.clientWidth + 'px';
//       button.style.display = 'block';
//       alert(target.style.display);
      if(target.style.display=='') {
	if(target.type=='textarea') {
	  button.style.display = 'block';
// 	  button.style.border = '1px solid red';
	} else {
	  button.style.display = 'inline';
// 	  button.style.border = '1px solid blue';
	}
      } else {
	button.style.display = target.style.display;
// 	  button.style.border = '1px solid green';
      }
      target.addEventListener('blur', blur, false);
    }
    
  }; 

  inputs = document.getElementsByTagName("input");
  for (i=0; i<inputs.length; i++) {
      if(inputs[i].type=='text' || inputs[i].type=='password' ) {
      inputs[i].addEventListener('focus', focus, false);
    }
  }
  inputs = document.getElementsByTagName("textarea");
  for (i=0; i<inputs.length; i++) {
    inputs[i].addEventListener('focus', focus, false);
  }

})();