// ==UserScript==
// @name           Automatic Max Bonus
// @namespace      lukin013
// @description    Reloads centsports bonus page until the maximum bonus is offered.
// @include        http://www.centsports.com/choose_bonus/*
// ==/UserScript==

var things, thing;

things = document.evaluate( '//strong', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thing = things.snapshotItem(0);

if( !/TAKE/.test(thing.innerHTML) ) {
  location.reload(true);
} else {
  location.replace(location.href.replace("choose","accept"));
}
