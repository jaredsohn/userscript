// ==UserScript==
// @name          300mbUnited New Comments
// @namespace     erosman
// @description   Notifies of New Comments
// @updateURL     https://userscripts.org/scripts/source/293155.meta.js
// @downloadURL   https://userscripts.org/scripts/source/293155.user.js
// @include       http://www.300mbunited.me/
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.5
// ==/UserScript==

/* --------- Note ---------
  This script checks the number of comments on the first page 
  and adds a notification if there are new comments



  --------- History ---------

  1.5 Style Changes for the new Blog layout
  1.4 Code improvement
  1.3 Style Changes
  1.2 Added overall Notification
  1.1 Code improvement
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var elem = document.getElementsByClassName('p-com');
if (!elem[0]) { return; }  // end execution if not found

var cache = '';
var num = 0;
var oldpost = GM_getValue('oldpost');

var span = document.createElement('span');
span.setAttribute('style', 'color: #ff4500; margin-left: 10px;');


for (var i = 0, len = elem.length; i < len; i++) {
  var lnk = elem[i].children[0];
  var n = (lnk.children[0] ? lnk.children[0].textContent.trim() : 0);

  if (lnk && n) {
    notify(lnk, lnk.href, n);                  // check for new comments
    cache += lnk.href + '|' + n + '|';         // cache to be saved for the next time
  }
}

// Add overall notice
notice(num);

// update the data for the next time
GM_setValue('oldpost', cache);


function notify(node, lnk, n) {

  if (!oldpost) { return; }  // end execution if not found

  var pat = new RegExp(lnk + '\\|(\\d+)\\|');
  var idx = oldpost.match(pat);

  // if not found, it is a new Post
  var c = !idx ? +n : n-idx[1];

  if (c > 0) {
    var elem = span.cloneNode(true);
//    elem.textContent = '(' + c + ' New Comment' + (c > 1 ? 's' : '') + ')';
    elem.textContent = '(' + c + ' New)';
    node.appendChild(elem);
    num += c; // global variable for the notice
  }
}


function notice(n) {

  var elem = (document.getElementsByClassName('page_item') || [0])[0];
  if (!elem) { return; }  // end execution if not found
  
  var li = document.createElement('li');
//  li.setAttribute('style', 'color: #fd822f; padding: 3px 7px 3px 5px;');
  li.setAttribute('style', 'color: #fd822f;');
  li.textContent = 'Comments';
  
  var span = document.createElement('span');
  span.setAttribute('style', 
  'color: #fff; background-color: #ff4500; font-weight: bold; padding: 1px 4px; font-size: 0.8em;' + 
  'border-radius: 2px; box-shadow: 1px 1px 1px #888; margin-left: 1px; position: relative; bottom: 10px;' +
  'text-shadow: 0px 1px #000;');
  span.textContent = n;
  li.appendChild(span);
  
  elem.parentNode.appendChild(li);
}

})(); // end of anonymous function
