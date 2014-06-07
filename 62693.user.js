// ==UserScript==
// @name          HelpSpot Tooltip Removal
// @namespace     http://files.jnewland.com/
// @description   Removes tooltips from HelpSpot request number links on the workspace. Un-breaks Cmd+click to open in new tab.
// @author        Jesse Newland
// @homepage      http://twitter.com/jnewland
// @include       */admin.php?pg=workspace*
// ==/UserScript==

$('ws_datatable').observe('mouseover', function() {
  $$('td.tableborders a').each(function(link){
    if (link.onmouseover) link.onmouseover = null;
  });
});