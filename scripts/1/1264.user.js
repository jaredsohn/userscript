// ==UserScript==
// @name          RMO Form Action Fixer
// @namespace     http://mozilla.wikicities.com/
// @include       http://reporter.mozilla.org/*
// @description	  Fixes query form action from reporter-test.mozilla.org to reporter.mozilla.org
// ==/UserScript==
// Changelog:
// - 20050804:
//   - Added privacy policy to header menu
//   - Fixed the LABEL issue (RMO11187097627386)

(function() {
  var header = document.getElementById('header');
  var menu = {
    injectList:function(list, menuId) {
      li = document.createElement('li');
      li.innerHTML = list;
      header.getElementsByTagName('ul')[0].insertBefore(li, menuId);
    }
  }

  function insertMenu() {
    var query = document.getElementById('query');
    var top_25 = document.getElementById('top_25');
    var login = document.getElementById('login');
    var privacy = '<a href="/privacy" title="Privacy Policy">Privacy</a>';
    menu.injectList(privacy, top_25);
  }

  function fixForm() {
    var searchForm = document.getElementById('search');
        searchForm.setAttribute('action', 'http://reporter.mozilla.org/app/report/');
        searchForm.getElementsByTagName('label')[0].setAttribute('for', 'report_id1');
        searchForm.getElementsByTagName('input')[0].setAttribute('id', 'report_id1');
  }

  fixForm();
  insertMenu();

})();

