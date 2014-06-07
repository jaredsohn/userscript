// ==UserScript==
// @name          </a><span style="text-decoration: line-through; color: #aaa;">Search UMO @ TEM</span> <a style="color:#f00; text-decoration: none;">deprecated
// @namespace     http://zoolcar9.lhukie.net/
// @include       http://www.extensionsmirror.nl/index.php?*showforum=*
// @include       http://www.extensionsmirror.nl/index.php?*&f=*
// @include       http://www.extensionsmirror.nl/index.php?*showtopic=*
// @description	  Adds search UMO in TEM Forums. Screenshot: http://img89.imageshack.us/img89/3966/temumo8ed.png
// ==/UserScript==
// Changelog:
// - 20050721: Added search MozillaZine Forums & Knowledge Base
// - 20051024: Updated to TEM's new layout

(function() {
  function searchUMO(section) {
    var searchUMOform = document.createElement('form');
        searchUMOform.setAttribute('name', 'searchUMO');
        searchUMOform.setAttribute('action', 'http://addons.mozilla.org/quicksearch.php');
        searchUMOform.setAttribute('method', 'get');
        searchUMOform.setAttribute('target', '_blank');
        searchUMOform.innerHTML =
          '<input type="hidden" name="q" value=search.keywords.value>' +
          '<input type="hidden" name="section" value="' + section + '">' +
          '<input type="submit" value="Search UMO" class="button"' +
          ' title="Search ' + subForum + ' at Mozilla Update"' +
          ' onclick=searchUMO.q.value=search.keywords.value>';
    form.parentNode.appendChild(searchUMOform);
  }

  function searchMozKB() {
    var searchMKBform = document.createElement('form');
        searchMKBform.setAttribute('name', 'searchKB');
        searchMKBform.setAttribute('action', 'http://kb.mozillazine.org/Special:Search');
        searchMKBform.setAttribute('method', 'get');
        searchMKBform.setAttribute('target', '_blank');
        searchMKBform.innerHTML =
          '<input type="hidden" name="search" value="">' +
          '<input type="hidden" name="limit" value="10">' +
          '<input type="hidden" name="fulltext" value="search">' +
          '<input type="submit" value="Knowledge Base" class="button"' +
          ' title="Search ' + subForum + ' at MozillaZine Knowledge Base"' +
          ' onclick=searchKB.search.value=searchTEM.keywords.value>';
    form.parentNode.appendChild(searchMKBform);
    form.setAttribute('name', 'searchTEM');
  }

  function searchMozillaZine() {
    var searchMFform = document.createElement('form');
        searchMFform.setAttribute('name', 'searchMF');
        searchMFform.setAttribute('action', 'http://forums.mozillazine.org/search.php');
        searchMFform.setAttribute('method', 'get');
        searchMFform.setAttribute('target', '_blank');
        searchMFform.innerHTML =
          '<input type="hidden" name="search_keywords" value="">' +
          '<input type="hidden" name="show_results" value="topics">' +
          '<input type="submit" value="MozillaZine" class="button"' +
          ' title="Search ' + subForum + ' at MozillaZine Forums"' +
          ' onclick=searchMF.search_keywords.value=search.keywords.value>';
    form.parentNode.appendChild(searchMFform);
  }

  var navstrip = document.getElementById('navstrip');
  if(navstrip) {
    forum = navstrip.getElementsByTagName('a');
    if(forum.length > 1) {
      var form = document.getElementsByTagName('form')[1];
      subForum = navstrip.getElementsByTagName('a')[1].firstChild.nodeValue;
      switch(subForum) {
        case 'Extensions': searchUMO('E'); break;
        case 'Information': searchMozKB(); break;
        case 'Discussions': searchMozillaZine(); break;
        case 'Themes': searchUMO('T'); break;
      }
    }
  }
})();


