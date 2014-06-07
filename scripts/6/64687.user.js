// ==UserScript==
// @name          ML
// @include        http://www.neopets.com/*
// @license        GNU (PUBLIC)
// ==/UserScript==


newDiv = document.createElement('div');
  newDiv.setAttribute('style', 'margin-bottom: 7px;');
  newDiv.setAttribute('class', 'sidebarModule');
  newDiv.innerHTML = '<table class="sidebarTable" border="0" cellpadding="2" cellspacing="0" width="158"><tbody><tr><td class="sidebarHeader medText" valign="middle">Yum Links</td></tr><tr><td class="neofriend" align="center">
<br>
(function() {


var mylinks = new Array(['http://www.neopets.com/portal/supershopwiz.phtml','Super Shop Wiz']);




}







</td></tr></tbody></table>';

  sidebar = document.evaluate('//td[@width="178"][@align="center"][@class="sidebar"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  if (sidebar){
    sidebar.insertBefore(newDiv, sidebar.firstChild.nextSibling);
  }