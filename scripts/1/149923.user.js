// ==UserScript==
// @name        AVS Forum "Retro" Theme
// @namespace   http://userscripts.org/mkanet
// @include     http://www.avsforum.com/*
// @version     1
// ==/UserScript==


GM_addStyle((<><![CDATA[

@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain("avsforum.com")
{

#sidebar {
  display: None;
}

#main-container {
  min-width: 400px !important;
}

table.forum-list-tbl.navigation.vertical tr,
table.forum-list-tbl.navigation.vertical tr td,
table.forum-list-tbl.navigation.vertical tr.viewer-has-replied td,
table.forum-list-tbl.navigation.vertical tr td.last-post-col,
table.forum-list-tbl.navigation.vertical tr td.last-post-thread-col {
  background: #010080 !important
}

table.forum-list-tbl.navigation.vertical tr.alternate td,
table.forum-list-tbl.navigation.vertical tr.alternate.viewer-has-replied td,
table.forum-list-tbl.navigation.vertical tr.alternate td.last-post-col,
table.forum-list-tbl.navigation.vertical tr.alternate td.last-post-thread-col {
  background: #010079 !important
}

table.forum-list-tbl.navigation.vertical tr th {
  background: #982A67 !important;
  color: #FFFFFF;
}

div.forum-list-tbl-wrapper,
table.forum-list-tbl,
table.forum-list-tbl tr td,
table.forum-list-tbl tr th {
  border: 1px solid #982A67 !important;
  border-collapse: collapse;
}

span.forum-list-sub-txt {
  display: none
}

div.forum-announcement ul li {
  display: block;
  width: 45%;
  float: left;
  font-size: 8pt;
}
div.forum-announcement ul li:nth-child(2n) {
  float: right;
}

tr.mod-select-parent.viewer-has-replied td.thread-col {
  border-left: 3px solid #FFFF00 !important;
}

div.post-header {
  background: #982A67 !important;
  color: #FFFFFF;
}

div.postbit-underlay {
  background: #2F304F !important
}

div.post-container-inner,
div.post-container-inner2 {
  background: #010080 !important
}

.wiki_markup .quote-container div.quote-block {
  background: #2F304F !important;
  color: #FFFF00;
  border: 1px solid white !important;
}

.wiki_markup .quote-container div.quote-block {
  color: #FFDF63;
  background: rgba(47, 48, 79, 1) !important;
  border: 1px solid white !important;
}

}

]]></>).toString());
