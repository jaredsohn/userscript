// ==UserScript==
// @name          </a><span style="text-decoration: line-through; color: #aaa;">MozillaZine Forums Search</span> <a style="color:#f00; text-decoration: none;">deprecated
// @namespace     http://mozilla.wikicities.com/
// @include       http://forums.mozillazine.org/*
// @description	  Replaces Google search on MozillaZine Forums to forums search
// ==/UserScript==

(function() {

  var sidebar = document.getElementById('sidebar');

  var searchForm = sidebar.getElementsByTagName('form')[0];
      searchForm.action = 'search.php?mode=results';
      searchForm.method = 'post';

  var input = searchForm.getElementsByTagName('input');
  for(i = 0; i < input.length; i++) {
    switch(i) {
      case 0:
        input[i].name = 'search_keywords';
        break;
      case 1:
        input[i].removeAttribute('name');
        break;
      case 2:
        input[i].name = 'search_terms';
        input[i].value = 'any';
        break;
      case 3:
        input[i].name = 'show_results';
        input[i].value = 'posts';
        break;
      case 4:
        input[i].name = 'search_fields';
        input[i].value = 'all';
        break;
    }
  }

  searchForm.getElementsByTagName('img')[0].src = (
    'data:image/gif;base64,R0lGODlhqgAJALMAAAAAADkAQwBm' +
    'ZkU2NmoASGdeagAA%2FWQA5axTJsdTCqIA5N0A99WNbd%2Byrf' +
    '79%2FgAAACwAAAAAqgAJAAAE3dDJSau9OOvNu%2F8akiQIaJ5o' +
    'qq5sxjQMArceYDs2IN043%2B%2FAiUAoEQwdxqGSKDwmkdAi0k' +
    'h5TovU6FI6Pe54Ot0kwXA0JIwEbSMO4oDiMNx9pTqJ26gWf4V6' +
    'mXt3gkp5FHFvbQ4kDQMDMWprGmA3OWFghjlVfnuBgEl3m0tWWF' +
    'yEoKJafz1tiWYJDbANCGWRbG9BcoeIdF5beb9MwE6FXJ2bx3rJ' +
    'uq1lZ2YOtLUWmau3ctbLmqXDonZ2Uk%2FCWcV9p6B%2B41%2Bs' +
    'FgwF7gWw0vLz9PUYDWRpzvb8%2Ff7%2FLCIAADs%3D'
  );

})();




