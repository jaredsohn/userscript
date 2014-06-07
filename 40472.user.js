// ==UserScript==
// @name           OdnoklassnikiLite
// @namespace      odnoklassniki
// @include        http://*odnoklassniki.ru/*
// @include        http://*odnoklassniki.ua/*
// ==/UserScript==


function remove(id) {
  var node = document.getElementById(id);
  node.parentNode.removeChild(node);
}

remove('friendsFeedPanel');
remove('ctl00_cphMain_ucInfoCard_Table1')
remove('ctl00_cphMain_pnlFriends')
remove('photoCommentsPanel')
remove('ctl00_cphMain_pnlCommunities')
remove('forumPanel')