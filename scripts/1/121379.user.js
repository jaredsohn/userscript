// ==UserScript==
// @name           A personal appeal from THE IDOLM@STER
// @namespace      http://khlizard.vanu.jp/
// @description    Replaces personal appeal on Wikipedia. (forked from nokkii http://userscripts.org/scripts/show/118746)
// @include        http://*wikipedia.org/*
// @include        https://*wikipedia.org/*
// @version        1.4.1
// ==/UserScript==

var html = '<iframe scrolling="no" src="http://appeal.vanu.jp/anime" name="a-personal-appeal-from-any-characters" width="100%" height="172px" border="0" frameborder="0" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-color: rgb(187, 187, 170); border-right-color: rgb(187, 187, 170); border-bottom-color: rgb(187, 187, 170); border-left-color: rgb(187, 187, 170); border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; "></iframe>';

(function(){
  var div = document.getElementById('siteNotice');
  div.setAttribute('id', 'siteNoticeIM');
  div.innerHTML = html;
})();
