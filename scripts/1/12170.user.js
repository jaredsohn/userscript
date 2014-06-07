// ==UserScript==
// @name           No one.lv custom styles
// @namespace      http://mainframe.lv/
// @description    Disables custom one.lv user page styles
// @include        http://c*.one.lv/viewPhoto.do*
// @include        http://c*.one.lv/navigate.do?*st.id=community.friend*
// @include        http://c*.one.lv/navigate.do?*st.friend*
// ==/UserScript==

var link,links;
links = document.evaluate(
  "//link[@type='text/css']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i = 0; i < links.snapshotLength; i++) {
  link = links.snapshotItem(i);
  if (link.href.match("getTheme")){
    link.href = link.href.replace(/id=\d+&v=\d+/,"id=0&v=53");
  }
}
