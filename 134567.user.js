// ==UserScript== -*- coding: utf-8 -*-
// @name        Uncheck Twitpic Post Options
// @description Uncheck the "Post to Twitter" and "Set Location (if available)" checkboxes, in the Twitpic upload page. 
// @namespace   http://userscripts.org/users/82654
// @include     https://twitpic.com/upload
// @include     http://twitpic.com/upload
// @version     1.0.0
// @author      MORIYAMA Hiroshi <hiroshi@kvd.biglobe.ne.jp>
// @license     Public Domain
// ==/UserScript==

(function(){
  var checkboxes = document.evaluate("descendant::*[@id='upload-options']"
                                     + "/descendant::input[@type='checkbox']",
                                     document.documentElement, null, 6, null);
  for (var i = 0; i < checkboxes.snapshotLength; i++) {
    checkboxes.snapshotItem(i).checked = false;
  }
})();
