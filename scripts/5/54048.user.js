// ==UserScript==
// @name           Twitter 1-Click Block/Report Spam
// @namespace      cyranix
// @description    Block Twitter spammers and report them to @spam with a single click.
// @include        http://*.twitter.com/blocks/confirm/*
// @include        http://twitter.com/blocks/confirm/*
// @include        https://*.twitter.com/blocks/confirm/*
// @include        https://twitter.com/blocks/confirm/*
// ==/UserScript==

var myUsername = "";
var myPassword = "";

var username = document.getElementsByTagName("h1")[0].children[0].innerHTML;
var params = "user=spam&text=%40" + username;
var notesText = "<br />You must be able to send DMs to <a href='http://twitter.com/spam' style='font-size: 11px; padding: 0px; float: none;'>Spam Watch</a> (follow them and they'll follow you back) in order to send spam reports.</span>";

var link = document.createElement("a");
link.id = "report-spam";
link.innerHTML = "Report Spam";
link.href="#";
link.addEventListener("click", confirmSpam, false);

var notes = document.getElementsByTagName("fieldset")[0].children[3];
notes.innerHTML = notes.innerHTML.replace(/<\/span>/i, notesText);
notes.parentNode.insertBefore(link, notes);

function confirmSpam() {
  if (myUsername.length > 0 && myPassword.length > 0) {
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://twitter.com/direct_messages/new.xml",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(myUsername + ":" + myPassword)
      },
      data: params
    });
  }
  else {
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://twitter.com/direct_messages/new.xml",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: params
    });
  }

  document.getElementsByTagName("form")[1].submit();
}