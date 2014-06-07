// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// Then restart Firefox and visit this script again.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          unavaca's united.com Tweaks
// @version       0.02
// @namespace     http://www.flyertalk.com
// @description   Various tweaks for United.com
// @include       http://travel.united.com/ube/*
// @include       https://travel.united.com/ube/*
// @include       http://www.united.com/
// @include       https://www.united.com/
// @include       http://www.united.com/homepage
// @include       https://www.united.com/homepage
// @include       http://www.mileageplus.com/awardbooking/award/*
// @include       https://www.mileageplus.com/awardbooking/award/*
//
// @history 0.02  2011-03-11 Add some more entrypoints.
// @history 0.01  2010-04-01 Initial Release
// ==/UserScript==

window.addEventListener('load',
  function() {
    window.uvGetInput = function(name) {
        var elements = document.evaluate(
            "//input[@id='" + name + "']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

        if(elements.snapshotLength < 1) {
            return null;
        } else {
            return elements.snapshotItem(0);
        }
    }

    // I can't imagine United.com serving up more than 20 segments for a given itin.
    for(var segment = 0; segment < 20; segment++) {
        var realFrom = uvGetInput("shop_from" + segment);
        var realTo = uvGetInput("shop_to" + segment);
        if(realFrom == null || realTo == null) {
            // No additional segments on this page.
            break;
        }

        // nuke the bad ones and copy their styles and tab indexes over
        var evilFrom = uvGetInput("shop_from" + segment + "_temp");
        if(evilFrom != null) {
            evilFrom.type = "hidden";
            realFrom.tabIndex = evilFrom.tabIndex;
            evilFrom.tabIndex = null;
            realFrom.style.padding = evilFrom.style.padding;
            realFrom.style.width = evilFrom.style.width;
            realFrom.style.fontSize = evilFrom.style.fontSize;
        }

        var evilTo = uvGetInput("shop_to" + segment + "_temp");
        if(evilTo != null) {
            evilTo.type = "hidden";
            realTo.tabIndex = evilTo.tabIndex;
            evilTo.tabIndex = null;
            realTo.style.padding = evilTo.style.padding;
            realTo.style.width = evilTo.style.width;
            realTo.style.fontSize = evilTo.style.fontSize;
        }

        // show the real input boxes
        realFrom.type = "text";
        realTo.type = "text";
    }

    if(uvGetInput("shop_from0") != null) {
        uvGetInput("shop_from0").focus();
    }
  },
  true);
