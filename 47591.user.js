// Time-stamp: <2010-04-25 13:41:36 ferk>
//
// ==UserScript==
// @name           Apt-linker
// @namespace      http://userscripts.org/users/53838
// @description    Turns "apt-get install" lines into "apt://" apturl links
// @include        *
// ==/UserScript==


// I would like to thank James Padolsey (http://james.padolsey.com/)
// for the findAndReplace function

// Copyright (C) 2009 Fernando Carmona Varo
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA



/* == findAndReplace ==
 * (By James Padolsey  http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/)
 *
 * No library or framework is required to use this function, it's entirely stand-alone. The function requires
 * two parameters, the third one is optional:
 *
 * * searchText - This can either be a string or a regular expression. Either way, it will eventually become a
 *   RegExp object. So, if you wanted to search for the word "and" then that alone would not be appropriate - all
 * words that contain "and" would be matched so you need to use either the string, \\band\\b or the regular
 * expression, /\band\b/g to test for word boundaries. (remember the global flag)
 *
 * * replacement - This parameter will be directly passed to the String.replace function, so you can either have
 *  a string replacement (using $1, $2, $3 etc. for backreferences) or a function.
 *
 * * searchNode - This parameter is mainly for internal usage but you can, if you so desire, specify the node
 * under which the search will take place. By default it's set to document.body.
 */
function findAndReplace(searchText, replacement, searchNode) {
  if (!searchText || typeof replacement === 'undefined') {
    // Throw error here if you want...
    return;
  }
  var regex = typeof searchText === 'string' ?
    new RegExp(searchText, 'g') : searchText,
  childNodes = (searchNode || document.body).childNodes,
  cnLength = childNodes.length,
  excludes = 'html,head,style,title,link,meta,script,object,iframe,textarea';
  while (cnLength--) {
    var currentNode = childNodes[cnLength];
    if (currentNode.nodeType === 1 &&
        (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
      arguments.callee(searchText, replacement, currentNode);
    }
    if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
      continue;
    }
    var parent = currentNode.parentNode,
    frag = (function(){
              var html = currentNode.data.replace(regex, replacement),
              wrap = document.createElement('div'),
              frag = document.createDocumentFragment();
              wrap.innerHTML = html;
              while (wrap.firstChild) {
                frag.appendChild(wrap.firstChild);
              }
              return frag;
            })();
    parent.insertBefore(frag, currentNode);
    parent.removeChild(currentNode);
  }
}



findAndReplace('\\b(sudo )?(apt-get|aptitude) install (\\w|-| |(\\.\\d))*\\b',
               // '<a href=\"apt://'+'$2'.replace(/\s+/g,',')+'\">$1 install $2</a>';
               function(aptline) {
                 pkgs= aptline.replace(/^.*install /,'').replace(/\s+/g,',');
                 return '<a href=\"apt://'+pkgs+'\">'+aptline+'</a>';
               });

findAndReplace('\\bapt:(//)?[\\w,-]+',
               function(apturl) {
                 return '<a href='+apturl+'>'+apturl+'</a>';
               });