// ==UserScript==
// @name         Steam market game-whitelist
// @version      0.1
// @description  Filters the steam-markets new items by game-list.
// @license      CC 1.0 (Public Domain) - http://creativecommons.org/publicdomain/zero/1.0/
// @match        http://steamcommunity.com/market*
// @include      http://steamcommunity.com/market*
// @grant        none
// ==/UserScript==

(function() {
  
  var config = {
    changeToNew: true,
    expandNew: true,
    filter: ['Counter-Strike: Global Offensive']
  };
  
  if (config.changeToNew)
  	document.querySelector('#tabRecentSellListings>.market_tab_well_tab_contents').click();
  if (config.expandNew)
  	document.querySelector('#sellListingsMore').click();
  if (config.filter)
    start();
  
  function eachPost(cb) {
    var entries = document.querySelectorAll('#sellListingRows>.market_recent_listing_row');
    for (var i = 0; i < entries.length; i ++) {
      var entry = entries[i];
      if (!entry.getAttribute('data-checked')) {
        entry.setAttribute('data-checked', 'true');
        cb(entry);
      }
    }
  }
  function addNewPostListener(cb) {
    document.querySelector('#sellListingRows').addEventListener('DOMNodeInserted', cb);
  }
  function useFilter(entry) {
      var game = entry.querySelector('.market_listing_game_name').textContent;
      var hide = true;
      for (var i = 0; i < config.filter.length; i ++) {
        var f = config.filter[i];
        if (f instanceof RegExp && f.test(game) || f == game)
          hide = false;
      }
      if (hide)
        entry.setAttribute('style', 'display: none;');
  }
  function start() {
    addNewPostListener(function() { eachPost(useFilter); });
    eachPost(useFilter);
  }
  
})();