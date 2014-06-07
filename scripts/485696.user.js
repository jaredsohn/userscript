// ==UserScript==
// @name        C2 Wiki – Fill In Code Word When Editing
// @namespace   roryokane.com
// @description Automatically fills in the code word (CAPTCHA) “567” on the edit page of the C2 wiki, WikiWikiWeb.
// @include     http://c2.com/cgi/wiki?edit=*
// @version     1
// @grant       none
// ==/UserScript==

// "Type the code word, 567, here [...]"
var textField = document.getElementsByName("code")[0];
var codeWord = "567"; // hard-coded; I’ve never personally seen it be anything else.
textField.value = codeWord;
