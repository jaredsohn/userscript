// ==UserScript==
// @name           LibraryThing Amazon Image Highlighter
// @namespace      http://userscripts.org/users/126691
// @description    Highlights any images (book covers, in theory) that have come from Amazon so they can easily be identified and replaced.
// @include        http://*.librarything.tld/*
// @license        Public Domain
// ==/UserScript==

var key_amazon_images_css = 'ltaih_amazon_images_css';
var default_amazon_images_css = 'border: 1px dashed red;';
var amazon_images_css = GM_getValue(key_amazon_images_css, default_amazon_images_css);


function nodeInserted(e) {
  scanForImgs(e.relatedNode);
}

function scanForImgs(root) {
  var elems = document.evaluate('//img[starts-with(@src, "http://ecx.images-amazon.com/") = 1 and contains(@style, "' + amazon_images_css + '") != 1]',
      root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < elems.snapshotLength; i++)
  {
    var elem = elems.snapshotItem(i);

    var oldStyle = elem.getAttribute('style');
    oldStyle = (oldStyle === null ? '' : oldStyle + ';');

    elem.setAttribute('style', oldStyle + amazon_images_css);
  }
}

scanForImgs(document.body);
document.addEventListener("DOMNodeInserted", nodeInserted, false);




createEnterCSSMenu('Set Amazon Images CSS', 'amazon images', key_amazon_images_css, default_amazon_images_css);

function createEnterCSSMenu(menu, label, key, def) {
  GM_registerMenuCommand(menu,
    function() {
      var value = prompt('Enter the ' + label + ' CSS style to use.  ' +
          'Refer to the help on CSS styles for more information on the format.',
          GM_getValue(key, def));

      if (value != null && value != GM_getValue(key, def)) {
        if (value != def)
          GM_setValue(key, value);
        else
          GM_deleteValue(key);  // keep it tidy
      }
    }
  );
}
