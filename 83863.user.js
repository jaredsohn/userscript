// ==UserScript==
// @name           Backpack It Message
// @namespace      com.backpackit.message
// @description    Parse URL params to pre-populate message
// @include        https://*.backpackit.com/messages/new*
// ==/UserScript==
//
// Copyright (c) 2010, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================
//
// USAGE:
//
// 1. Add the following javascript bookmarklet to your browser, changing COMPANY to your own:
//
//javascript:if(navigator.userAgent.indexOf('Safari')%20>=%200){Q=getSelection();}else{Q=document.selection?document.selection.createRange().text:document.getSelection();}location.href='https://COMPANY.backpackit.com/messages/new?message_body='+encodeURIComponent(location.href + '\n\n' + Q)+'&message_title='+encodeURIComponent(document.title);
//
// 2. Click the bookmarklet from the page and the page title, url, and selected text will be used to pre-populate a Backpack Message.
// ================

document.getElementById("message_title").value = decodeURIComponent(getURLParam("message_title"));
document.getElementById("message_body").value = decodeURIComponent(getURLParam("message_body"));

// from http://snipplr.com/view.php?codeview&id=463
function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?"));
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}