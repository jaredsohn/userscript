// ==UserScript==
// @name        NCMall Cookie Alerter
// @namespace   http://userscripts.org/users/46514
// @include     http://*.neopets.com/mall/fortune/*
// @description Will audit the ajax calls from jQuery to alert the user of a NCMall cookie restock.
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
//

var cookies = {};

unsafeWindow.$('body').ajaxSuccess (
  function (event, requestData, settings) {
  var item_id = settings.url.match(/\d+/);
    var obj = $.parseJSON(requestData.responseText);
    if (cookies[item_id] < obj.available) {
      alert("New cookies!");
    }
    cookies[item_id] = obj.available;
  }
);