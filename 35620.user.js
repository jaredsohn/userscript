// ==UserScript==
// @name          iGoogle Search Toggle
// @namespace     http://broofa.com/userscripts
// @description	  Collapse the search area portion of the iGoogle home page, and add a small button to allow you to open it on the extremely rare occasion you need it. For info & screenshots, see http://www.broofa.com/blog/?p=154
// @include       http://www.google.tld/ig*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 

(function() {
  var gbar = document.getElementById('gbar');

  // Function to toggle banner visibility
  var toggleBanner = function() {
    var banner = document.getElementById('nhdrwrap');
    var flip = document.getElementById('banner_flip');

    if (flip) {
      var visible = flip.getAttribute('vizible');
      visible = visible != 'true';
      flip.setAttribute('vizible', visible ? 'true' : 'false');
      banner.style.display = visible ? '' : 'none';
      flip.innerHTML = (visible ? '\u25bc' : '\u25b6');
      flip.href='#';
    }
  }

  // Insert a control to hide/show the banner
  if (gbar) {
    var el = document.createElement('div');
    el.addEventListener('click', toggleBanner, false);
    el.id='banner_flip'
    el.title = 'Expand and collapse the Google search banner';
    var s = el.style;
    s.position = 'absolute';
    s.left = '0px';
    s.top = '17px';
    s.width = '12px';
    s.height = '12px';
    s.textAlign = 'center';
    s.textDecoration = 'none';
    s.backgroundColor = '#fff';
    s.border = 'solid 1px';
    s.borderWidth = '1px 1px 1px 0px';
    s.color = s.borderColor = '#c9d7f1';
    s.padding = '2px';
    s.MozBorderRadius = '0px 10px 10px 0px';
    s.fontSize = '13px';
    s.lineHeight = '.75';
    s.zIndex = '99';
    gbar.appendChild(el);

    // Hide the banner
    toggleBanner();
  }

  toggleBanner();
})();
