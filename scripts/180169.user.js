// ==UserScript==
// @name        fixbib
// @namespace   https://github.com/alick9188
// @description Fix common bib errors.
// @include     http://scholar.google.com/scholar.bib*
// @include     http://ieeexplore.ieee.org/xpl/downloadCitations
// @include     http://dl.acm.org/citation.cfm*
// @include     http://dl.acm.org/exportformats.cfm*
// @version     1.0
// @grant       none
// ==/UserScript==

(function () {
  // Title case function via https://raw.github.com/gouch/to-title-case/master/to-title-case.js
  /* 
    * To Title Case 2.1 – http://individed.com/code/to-title-case/
    * Copyright © 2008–2013 David Gouch. Licensed under the MIT License.
   */

  String.prototype.toTitleCase = function(){
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
      if (index > 0 && index + match.length !== title.length &&
        match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
        (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
        title.charAt(index - 1).search(/[^\s-]/) < 0) {
        return match.toLowerCase();
      }

      if (match.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  };
  // Title case function ended.

  var sites = {
    UNKNOWN         : -1,
    GOOGLE_SCHOLAR  : 0,
    IEEE_XPLORE     : 1,
    ACM_DL          : 2,
    ACM_DL_WEB      : 3
  };

  var site = sites.UNKNOWN;
  if (location.hostname === 'scholar.google.com') {
    site = sites.GOOGLE_SCHOLAR;
  } else if (location.hostname === 'dl.acm.org') {
    if (location.pathname === '/citation.cfm') {
      site = sites.ACM_DL_WEB;
    } else if (location.pathname === '/exportformats.cfm') {
      site = sites.ACM_DL;
    }
  } else if (location.hostname === 'ieeexplore.ieee.org') {
    site = sites.IEEE_XPLORE;
  }

  // For ACM DL webpage, modify the BibTeX link to open in a new tab.
  if (site === sites.ACM_DL_WEB) {
    var ret = /id=(\d+\.)?(\d+)/.exec(location.search);
    if (ret !== null) {
      var id = ret[2];
      var newurl = 'http://dl.acm.org/exportformats.cfm?id=' + id + '&expformat=bibtex';
      var s = Ext.select('#divtools a:contains(BibTeX)');
      s.elements[0].href = newurl;
    }
    return;
  }

  var orig, fixed;
  if (site === sites.GOOGLE_SCHOLAR || site === sites.ACM_DL) {
    var pres = document.getElementsByTagName('pre');
    var pre = pres[0];
    orig = pre.innerHTML;
  } else if (site === sites.IEEE_XPLORE) {
    orig = document.body.innerHTML.replace(/<br>\s+/g, '');
  }

  var colored = true;
  var cb, ce;
  if (colored == true) {
    cb = '<span style="color: blue;">';
    ce = '</span>';
  } else {
    cb = ce = '';
  }

  fixed = orig.replace(/([^k])title\s*=\s*{([^}]+)},/, function (match, p1, p2, offset, string) {
    var p = p2.toTitleCase();
    if (p === p2) {
      return match;
    } else {
      return p1 + 'title={' + cb + p + ce + '},';
    }
  }).replace(/journal\s*=\s*{([^,}]+), ([^}]*)},/, function (match, p1, p2, offset, string) {
    // Fix journal name.
    return 'journal={' + cb + p2 + ' ' + p1 + ce + '},';
  }).replace(/booktitle\s*=\s*{([^}]+)},/, function (match, p1, offset, string) {
    // Fix booktitle field.
    // Check for a period.
    var res = p1.replace('Proc.', 'Proceedings').replace(/(.*)\.\s*(.*)/, '$2 $1');
    if (res === p1) {
      // Check for a comma.
      res = p1.replace(/(.*),\s*(.*)/, '$2 $1');
    }
    if (/^Proceedings/.test(res) === false) {
      res = 'Proceedings of the ' + res.replace(/\s*Proceedings\s*/i, ' ').replace(/^the\s*/i, '');
    }
    res = res.toTitleCase();
    if (res === p1) {
      return match;
    } else {
      return 'booktitle={' + cb + res + ce + '},';
    }
  }).replace(/month\s*=\s*{\s*(\w+)\s*},/, function (match, p1, offset, string) {
    // Use three-letter month macro.
    return 'month=' + cb + p1.substr(0, 3).toLowerCase() + ce + ',';
  }).replace(/pages\s*=\s*{\s*(\d+)\s*-\s*(\d+)([^}]*)},/, function (match, p1, p2, p3, offset, string) {
    // Use en-dash to separate page numbers.
    return 'pages={' + cb + p1 + '--' + p2 + p3 + ce + '},';
  }).replace(/([A-Z]\.)([A-Z]\.)/g, cb + '$1 $2' + ce);
  // Separate first name intial and middle name initial in author names.

  if (site === sites.ACM_DL) {
    fixed = fixed.replace(/url\s*=\s*{http:\/\/doi\.acm\.org[^}]*},\s*/, '');
  }

  // Quit if nothing is changed.
  if (fixed === orig) {
    return;
  }

  // Create new elements on page.
  if (site === sites.GOOGLE_SCHOLAR || site === sites.IEEE_XPLORE || site === sites.ACM_DL) {
    var newp = document.createElement('p');
    var newpcon = document.createTextNode('Fixed:');
    newp.appendChild(newpcon);
    var newpre = document.createElement('pre');
    //var newprecon = document.createTextNode(fixed);
    //newpre.appendChild(newprecon);
    newpre.innerHTML = fixed;

    document.body.appendChild(newp);
    document.body.appendChild(newpre);
  }
})();

// vim: set et sw=2 sts=2:
