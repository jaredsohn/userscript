// ==UserScript==
// @name           Jira 3.12 Team issue tab autoselect
// @namespace      http://userscripts.org/users/398700
// @include        http://jira/jira/secure/EditIssue!default.jspa?id=*
// ==/UserScript==

(function(){
  if(document.title.match("PL-")){
    location.assign( "javascript:showTab(2);void(0)" );
  }
})();


