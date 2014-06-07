// ==UserScript==
// @name        jQuery cross domain ajax library
// @namespace   gm.arekolek.com
// ==/UserScript==

// library for use in other greasemonkey scripts
// this is a copy of https://gist.github.com/Acorn/1060206 to allow use with @require

// allows using all Jquery AJAX methods in Greasemonkey
// inspired from http://ryangreenberg.com/archives/2010/03/greasemonkey_jquery.php
// works with JQuery 1.5
// (c) 2011 Martin Monperrus
// (c) 2010 Ryan Greenberg
//
// Usage:
// $.ajax({
// url: '/p/',
// xhr: function(){return new GM_XHR();},
// type: 'POST',
// success: function(val){
// ....
// }
// });
function GM_XHR() {
  this.type = null;
  this.url = null;
  this.async = null;
  this.username = null;
  this.password = null;
  this.status = null;
  this.headers = {};
  this.readyState = null;
  this.abort = function () {
    this.readyState = 0;
  };
  this.getAllResponseHeaders = function (name) {
    if (this.readyState != 4) return "";
    return this.responseHeaders;
  };
  this.getResponseHeader = function (name) {
    var regexp = new RegExp('^' + name + ': (.*)$', 'im');
    var match = regexp.exec(this.responseHeaders);
    if (match) {
      return match[1];
    }
    return '';
  };
  this.open = function (type, url, async, username, password) {
    this.type = type ? type : null;
    this.url = url ? url : null;
    this.async = async ? async : null;
    this.username = username ? username : null;
    this.password = password ? password : null;
    this.readyState = 1;
  };
  this.setRequestHeader = function (name, value) {
    this.headers[name] = value;
  };
  this.send = function (data) {
    this.data = data;
    var that = this;
    // http://wiki.greasespot.net/GM_xmlhttpRequest
    GM_xmlhttpRequest({
      method: this.type,
      url: this.url,
      headers: this.headers,
      data: this.data,
      onload: function (rsp) {
        // Populate wrapper object with returned data
        // including the Greasemonkey specific "responseHeaders"
        for (k in rsp) {
          that[k] = rsp[k];
        }
        // now we call onreadystatechange
        that.onreadystatechange();
      },
      onerror: function (rsp) {
        for (k in rsp) {
          that[k] = rsp[k];
        }
      }
    });
  };
};