// ==UserScript==
// @name           Hello from stupid
// @namespace      CHSdawg@gmail.com
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==
subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","Hello from stupidville");

textarea = document.getElementsByTagName("textarea")[1];
recruit_message = "What a stupid message"
textarea.innerHTML = recruit_message;