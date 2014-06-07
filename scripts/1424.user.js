// ==UserScript==
// @name          RMO Find Hostname
// @namespace     http://mozilla.wikicities.com/
// @include       http://reporter.mozilla.org/*
// @description	  Change find report id to find hostname in RMO (reporter.mozilla.org)
// ==/UserScript==
// Changelog:
// 20050723: Added privacy policy to header menu
// 20050804: Fixed the LABEL issue (RMO11187097627386)

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

  function queryForm() {
    var searchForm = document.getElementById('search');
        searchForm.setAttribute('action', 'http://reporter.mozilla.org/app/query/');

    var qLabel = searchForm.getElementsByTagName('label')[0];
        qLabel.setAttribute('for', 'host_hostname1');
        qLabel.firstChild.nodeValue = 'find hostname';

    var qInput = document.getElementById('report_id');
        qInput.setAttribute('id', 'host_hostname1');
        qInput.setAttribute('name', 'host_hostname');

    var qSubmit = document.getElementById('submit');
        qSubmit.setAttribute('name', 'submit_query');
  }

  queryForm();
  insertMenu();

})();

