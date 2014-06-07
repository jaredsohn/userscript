// ==UserScript==
// @name           GToad
// @version        0.1
// @description    Replace the profile picture on Google's login page with Toad.
// @updateURL      http://userscripts.org/scripts/source/182949.meta.js
// @installURL     http://userscripts.org/scripts/source/182949.user.js
// @match          https://accounts.google.com/*
// @copyright      2013+, pettenstein
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @run-at         document-start
// ==/UserScript==

$("img.profile-img:first").attr({src: "https://i.imgur.com/czKsYVO.png"});
$("span#errormsg_0_Passwd").html('The password is in another castle! <a href="http://support.google.com/accounts/bin/answer.py?answer=27444&amp;hl=en&amp;ctx=ch_ServiceLoginAuth" target="_blank" class="help-link">?</a>');