// ==UserScript==
// @name          Select
// @namespace     http://jeffpalm.com/select
// @description   Selects all or none of the check boxes on a page
// @include       http://*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */

function selectAll() {
  select(true);
}

function selectNone() {
  select(false);
}

function toggleAll() {
  select(-1);
}

/**
 * @param newValue  true select
 *                 false unselect
 *                    -1 toggle
 */
function select(newValue) {
  var cs = document.getElementsByTagName('INPUT');
  for (var i=0; i<cs.length; i++) {
    if (!cs[i].type || !cs[i].type.match(/checkbox/i)) {
      continue;
    }
    cs[i].checked = newValue == -1 ? !cs[i].checked : newValue;
  }
}

function main() {
  GM_registerMenuCommand("Select all",  selectAll);
  GM_registerMenuCommand("Select none", selectNone);
  GM_registerMenuCommand("Toggle all",  toggleAll);
}

main();
