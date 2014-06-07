// ==UserScript==
// @name       RockMongo Auto Login
// @namespace  http://nonespecified/
// @version    0.1
// @description  Logs into rockmongo automatically
// @match      http://*/*
// @copyright  2013+, escape
// ==/UserScript==

window.addEventListener("load", function(e) {

  var url = window.location.href;
  var host = window.location.host;

  if(url.indexOf('qa1.zephyr-intranet.com/rockmongo') != -1) {
    if(url.indexOf('action=login') != -1) {
      //match
      $("input:text[name='username']").val('admin');
      $("input:password[name='password']").val('mybigsecret');
    }
    document.evaluate("//input[@value='Login and Rock' and @type='submit']", document, null, 9, null).singleNodeValue.click();
  }

  if(url.indexOf('localhost:8090/rockmongo') != -1) {
    if(url.indexOf('action=login') != -1) {
      //match
      $("input:text[name='username']").val('admin');
      $("input:password[name='password']").val('asdfasdf');
    }
    document.evaluate("//input[@value='Login and Rock' and @type='submit']", document, null, 9, null).singleNodeValue.click();
  }

}, false);
