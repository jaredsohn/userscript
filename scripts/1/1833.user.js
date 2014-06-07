// ==UserScript==
// @name          userscripts.org: Search scripts from every page
// @namespace     http://loucypher.wordpress.com/
// @include       http://userscripts.org/*
// @include       http://www.userscripts.org/*
// @description	  Adds search form on header
// ==/UserScript==

// Changelog:
//
// 20051208:
// - Changed button width and XHTML closing tag />
//
// 20060125:
// - Added Google search site
// - Added 'autocomplete=on' to the input


var scriptSearch = {
  addSearch: function(formName, formAction, formElms) {
    var headTitle = document.getElementById('title');
    if(!headTitle) return;
    var searchForm = document.createElement('form');
    searchForm.setAttribute('name', formName);
    searchForm.setAttribute('action', formAction);
    searchForm.innerHTML = formElms;
    headTitle.parentNode.insertBefore(searchForm, headTitle.nextSibling);
  },

  uso: function() {
    var uName = 'searchUSO';
    var uAction = '/home/boring_search';
    var uElms = (
      '<span style="float: right;">' +
      '<input type="text" name="search" autocomplete="on" />\n' +
      '<input type="submit" value="search" style="width: auto;" />' +
      '</span>'
    );
    this.addSearch(uName, uAction, uElms);
  },

  google: function() {
    var gName = 'searchGoogle';
    var gAction = 'http://www.google.com/search';
    var gElms = (
      '<span style="float: right;">' +
      '<input type="hidden" name="q" value="searchUSO.search.value" />' +
      '<input type="hidden" name="sitesearch" value="userscripts.org" />' +
      '<input type="hidden" name="domains" value="userscripts.org;' +
      'dunck.us;greasemonkey.mozdev.org" />' +
      '<input type="submit" value="" style="width: auto;' +
      ' width: 16px; height: 16px; background-image: url(' +
      'data:image/gif;base64,R0lGODlhEAAQAPfLAAATVikwdA8S' +
      'nxUfgAsWpAAilholjxw4jBc7kwAlvQQ2sRMsoBUqqhMzuhY%2F' +
      'vxw4tSgmiyM1mSUztiQ6sTE3sQ4qyxMxxRoyxiAuxR1CtBxJsB' +
      'xasSJuuTFguBte0Rlf2xVc9h9W9xVjzxVr0gdj6BRh4R1o5yBc' +
      'yiZbyydT1i9b2Ddb1iFY6CJg2Vpor1dzvEJu20Z0yi23QDy1RE' +
      'i2OUy0O1WzOVC4PU%2BtVUe5Sk2xQU2zRUO4UE21Ula2SmKEqW' +
      'WF2HyPx2%2Ba6X6e6Xqk1m%2Bs78sUDs4UGdEQB9YfDdwaANEf' +
      'Hd0YEscjAM4mAM0qANIoD9IkGdslGswuItYgL4aP0ImP2YGZ36' +
      'Opzaq2wq%2FS%2BrzX%2F7%2Fe8MrS1MLO%2FsTb48rT8snX%2' +
      'F83c89PZ%2Bcrq%2BcH1%2F9Dl%2F9Ln%2F93r%2F9fy%2F%2B' +
      'Hf7P%2F42eDm%2FO7u%2F%2BT29uX2%2FeT2%2F%2Bf4%2F%2B' +
      'f5%2F%2Bj%2F9u%2F%2F8%2B3%2F9u7%2F9ur5%2F%2Bj%2F%2' +
      'F%2Bn%2F%2F%2Bv%2F%2Fu3%2F%2F%2B7%2F%2Fe7%2F%2F%2B' +
      '%2F%2F%2F%2Fb66%2FT%2F6vX%2F6%2Ff%2F7f%2F07fj%2F4f' +
      'v%2F4Pj%2F5v%2F45v7%2F4%2Fr%2B7%2F3%2F6fDw%2BPfx%2' +
      'F%2FD%2F9%2FX%2F8fT%2F8%2Ff%2F8ff%2F8%2FD%2F%2F%2F' +
      'H%2F%2F%2FL8%2FfL%2F%2F%2FP%2F%2F%2FX7%2F%2Fb6%2Ff' +
      'f%2F%2B%2FT%2F%2F%2Fb9%2F%2Ff%2F%2F%2Fv19%2F%2Fw9v' +
      '%2F09P%2F29v%2Fx%2Bf%2Fy%2F%2F%2Fz%2F%2F%2F1%2Bv%2' +
      'F1%2F%2F%2F2%2F%2F%2F3%2F%2Fj79P%2F58%2Fz%2F8%2Fz9' +
      '9%2Fz%2F9v7%2F9P7%2F9vn7%2F%2Fv6%2F%2Fj9%2F%2Fn9%2' +
      'F%2Fj%2F%2F%2Fn%2F%2F%2Fv%2F%2Fvv%2F%2F%2F%2F4%2Bv' +
      '%2F5%2B%2F%2F6%2BP%2F4%2F%2F%2F6%2FP%2F6%2Fv%2F6%2' +
      'F%2F%2F7%2F%2F%2F9%2BP%2F8%2Bv%2F9%2Bv7%2F%2BPz%2F' +
      '%2F%2F%2F8%2Ff%2F9%2Ff79%2F%2F%2F8%2F%2F%2F9%2F%2F' +
      '7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAA' +
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMsA' +
      'LAAAAAAQABAAAAj%2FAEn4oIFjBw8bOnrMuJGjhowZM1T8UdYJ' +
      'UZ5ZcNRYWjSrVK5QU0DMmtUnzRAXEy4o6FCEy6NDTkQIq1MmRg' +
      'M0eZTlCXMgQJtRSE4gmgUkwh1EiZTNUiamy6NUUExcuoJgDCdD' +
      'jQg9KgVL2SNFT1hwEvKglLBWuixZ%2BjSrlSBdRlL04bBBkTBd' +
      'pZTpIqWsFaBcTEr0QaEhl6dWlswKW6poDRUPlmAUQKWMkTJLc7' +
      '6QMQNGUZMWgIgkCFJnlq5WXigwkFClVZQQyuRgELAlk7JBymCZ' +
      'GYAF0ZEPrQixgUDAihxVdPpoAZAFUZIRfThxgvPCwAILDipk%2' +
      'BOFG2ZIVoxApERtPfvwlvZ%2BkQFzPvv0MJQEBADs%3D);' +
      ' border: none;" title="Google site search"' +
      ' onclick="searchGoogle.q.value=searchUSO.search.value;" />' +
      '</span>'
    );
    this.addSearch(gName, gAction, gElms);
  }
}

scriptSearch.uso();
scriptSearch.google();

