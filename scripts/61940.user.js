// ==UserScript==
// @name           ListPod.tv auto-add to list
// @namespace      http://henrik.nyh.se
// @description    ListPod.tv lets you bookmarklet YouTube videos onto a podcast stream. This script makes the bookmarklet one-click: it auto-adds the video to the selected list (podcast) and then returns to YouTube.
// @include        http://listpod.tv/url?url=*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$("select[name=list_id]").ajaxComplete(function(_,_,ajax) {
  if (ajax.url.match(/get_mylists/)) {  // After loading lists, autosubmit.
    $(".add-form").submit();
  } else if (ajax.url.match(/\/add$/)) {  // After adding to list, go back.
    history.back();
  }
});
