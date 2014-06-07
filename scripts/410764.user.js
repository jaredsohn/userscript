// ==UserScript==
// @name        Router Reconnect
// @namespace   c1b1.de
// @description Reconnect for routers with a SOAP interface via http://fritz.box:49000
// @include     *
// @version     1
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==
"use strict";
/*
The SOAP codes can be found here: http://www.openshots.de/2011/03/steuerung-der-fritzbox-uber-upnp/
*/
var url = "http://fritz.box:49000/upnp/control/WANIPConn1";
var action = "urn:schemas-upnp-org:service:WANIPConnection:1";
var reconnect_code = 'ForceTermination';
var reconnect_body = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\
<s:Body><u:ForceTermination xmlns:u="urn:schemas-upnp-org:service:WANIPConnection:1" /></s:Body></s:Envelope>';
var getip_code = 'GetExternalIPAddress';
var getip_body = '<?xml version="1.0" encoding="utf-8"?><s:Envelope s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:s=" http://schemas.xmlsoap.org/soap/envelope/">\
<s:Body><u:GetExternalIPAddress xmlns:u="urn:schemas-upnp-org:service:WANIPConnection:1" /></s:Body></s:Envelope>';
function reconnect(cb) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    data: reconnect_body ,
    headers: {
      "Content-Type": "text/xml",
      "SOAPACTION" : action+"#"+reconnect_code
    },
    onload: cb?cb:function(){}
  });
}
function getip(cb) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    data: getip_body,
    headers: {
      "Content-Type": "text/xml",
      "SOAPACTION" : action+"#"+getip_code
    },
    onload: function(response) {
      try {
        var responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
        var ip = responseXML.documentElement.getElementsByTagName("NewExternalIPAddress")[0].textContent;
        cb(ip);
      } catch(e) {
        cb("");
      }
    }
  });
}

GM_registerMenuCommand("Reconnect", function() {
  var oldip;
  getip(function(ip) {
    if(!ip) 
      return alert("An error occured.");
    oldip = ip;
    reconnect(function() { 
      var iv = setInterval(function() {getip(function(newip) {
        if(newip && newip != "0.0.0.0" && newip != oldip) {
          clearInterval(iv);
          alert("New IP:\n"+newip);
        }
      })},2000);
    });
  });
});
GM_registerMenuCommand("Show External IP", function() {getip(function(ip) { if(ip) alert("Current IP:\n"+ip); else alert("An error occured."); }  )});