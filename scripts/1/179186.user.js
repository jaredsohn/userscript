// ==UserScript==
// @name Search for GitHub Issues
// @description Adding search box at issue page
// @match https://github.com/*
// ==/UserScript==

(function() {

  var path = location.pathname;
  var isIssuePage = /^\/(?:[^\/]+\/){2}issues/.test(location.pathname);
  var searchBox = document.querySelector('#js-command-bar-field');
  var sidebar = document.querySelector('.issues-list-sidebar');

  if ( !isIssuePage || !searchBox || !sidebar ) {
    return;
  }

  var searchForm = document.createElement('form');
  var sidebar = document.querySelector('.issues-list-sidebar');
  var nwo = document.querySelector('input[name="nwo"]');
  var hiddenLabel1 = document.createElement('input');
  var hiddenLabel2 = document.createElement('input');

  searchBox = searchBox.cloneNode();

  hiddenLabel1.setAttribute('type', 'hidden');
  hiddenLabel1.setAttribute('name', 'ref');
  hiddenLabel1.value = 'cmdform';

  hiddenLabel2.setAttribute('type', 'hidden');
  hiddenLabel2.setAttribute('name', 'type');
  hiddenLabel2.value = 'Issues';

  searchForm.style.paddingBottom = '10px';
  searchForm.action = '/' + nwo.value + '/search';

  searchBox.setAttribute('id', '');
  searchBox.style.width = '100%';
  searchBox.setAttribute('placeholder', 'Search Issues');

  searchForm.appendChild(searchBox);
  searchForm.appendChild(hiddenLabel1);
  searchForm.appendChild(hiddenLabel2);

  sidebar.insertBefore(searchForm, sidebar.firstChild);

}());
