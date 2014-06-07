// ==UserScript==
// @name        Change BG color of the new entries
// @author      Dither
// @namespace    http://userscripts.org/scripts/show/101217
// @include      http://*site
// @run-at      document-start
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function () {
var BLOCK_SELECTORS = '.group_cont';
var TORRENT_SELECTORS = 'tr.torrent';
var BG_STYLE = 'background-image: -o-linear-gradient( right top, #E0ECF8 0%, #FFF 70% );'+
'background-image: -webkit-linear-gradient(right top, #E0ECF8, #FFF); /* Chrome 10+, Saf5.1+, iOS 5+ */'+
'background-image:    -moz-linear-gradient(right top, #E0ECF8, #FFF); /* FF3.6 */'+
'background-image:     -ms-linear-gradient(right top, #E0ECF8, #FFF); /* IE10 */'+
'background-image:         linear-gradient(to bottom, #E0ECF8, #FFF);';
var ERROR_SELECTOR = '#torrents .box.pad[align=center]';

var boxError = document.querySelector(ERROR_SELECTOR);
if (boxError && ~boxError.innerHTML.indexOf('No search results')) return;

var isEqual = function(iObj) {
  if (this.constructor !== iObj.constructor) return false;
  var aMemberCount = 0;
  for (var a in this) {
    if (!this.hasOwnProperty(a)) continue;
    if (typeof this[a] === 'object' && typeof iObj[a] === 'object' ? !this[a].isEqual(iObj[a]) : this[a] !== iObj[a]) return false;
    ++aMemberCount;
  }
  for (var a in iObj) if (iObj.hasOwnProperty(a)) --aMemberCount;
  return aMemberCount ? false : true;
}

var inArray = function(needle) {
	for(var i = 0, l = this.length; i < l; i++) if(this[i] && isEqual.call(this[i],needle)) return true;
	return false;
}

var containers = document.querySelectorAll(BLOCK_SELECTORS);
var storage = window.localStorage;
if (!containers) {
    console.log('[Ext01]: CSS selector ' + BLOCK_SELECTORS + ' not found');
    return;
}
if (!storage) {
    console.log('[Ext01]: your browser doesn\'t support HTML5\'s localStorage method');
    return;
}

var blocks = [], temp = (storage['last_blocks'] ? JSON.parse(storage['last_blocks']) : []);
for (var i = 0, torrents, ntor, bid; i < containers.length; i++) {
    torrents = containers[i].querySelectorAll(TORRENT_SELECTORS);
    if (!torrents) continue;
    ntor = torrents.length;
    bid = containers[i].getAttribute('id');
    blocks.push({ bid: bid, ntor: ntor });
    if (!inArray.call(temp,{ bid: bid, ntor: ntor })) containers[i].setAttribute('style', BG_STYLE);
}
    storage.clear();
    storage['last_blocks'] = JSON.stringify(blocks);
}, false);