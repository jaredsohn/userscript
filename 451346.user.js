// ==UserScript==
// @name           PublicHD - Remove News
// @description    Removes the news section and other clutter from the publichd.se homepage
// @include        http://*.publichd.se/*
// @include        http://publichd.se/*
// @include        https://*.publichd.se/*
// @include        https://publichd.se/*
// @include        http://phd.re/*
// @include        http://*.phd.re/*
// ==/UserScript==

(function() {
  var newss = document.getElementById("newss");
  if (newss) {
    // try to remove the entire block
    var blockRemoved;
    try { 
      var block = newss.parentNode.parentNode.parentNode.parentNode.parentNode;
      if (block.className == 'block') {
        block.parentNode.removeChild(block);
        blockRemoved = true;
      }
    } catch(e) { }

    // if we can't remove the whole block, at least remove the news
    if (!blockRemoved) newss.parentNode.removeChild(newss);

    // remove first br
    var brs = document.querySelectorAll('#mcol br:first-child');
    for (var i = 0;i<brs.length;i++) {
      var br = brs[i];
      br.parentNode.removeChild(br);
    }
  }

  // remove spacing overkill
  var spacer = document.querySelectorAll('td[background]');
  if (spacer 
      && (spacer = spacer[0])
      && spacer.getAttribute('background').indexOf('spacer.gif') > -1) {
    var table = spacer.parentNode.parentNode.parentNode;
    if (table) {
      // publichd has some code that attempts to insert an iframe banner
      // after the DOM is ready, so we can't remove this entire table
      // so we'll hide it instead
      //table.parentNode.removeChild(table);
      table.style.display = 'none';
    }
  }
})();