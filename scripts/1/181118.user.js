// ==UserScript==
// @name       FastFilm Familysearch
// @version    0.4
// @description  Download images faster from FamilySearch. Now you can use the left and right arrow keys to navigate.
// @match      https://familysearch.org/pal:/*

// ==/UserScript==


/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.5.3
 * Released:
 * Home:   http://github.com/appendto/jquery-mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 *
 * Copyright (c) 2011 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function(e){function o(t){if(window.DOMParser==undefined&&window.ActiveXObject){DOMParser=function(){};DOMParser.prototype.parseFromString=function(e){var t=new ActiveXObject("Microsoft.XMLDOM");t.async="false";t.loadXML(e);return t}}try{var n=(new DOMParser).parseFromString(t,"text/xml");if(e.isXMLDoc(n)){var r=e("parsererror",n);if(r.length==1){throw"Error: "+e(n).text()}}else{throw"Unable to parse XML"}return n}catch(i){var s=i.name==undefined?i:i.name+": "+i.message;e(document).trigger("xmlParseError",[s]);return undefined}}function u(t,n,r){(t.context?e(t.context):e.event).trigger(n,r)}function a(t,n){var r=true;if(typeof n==="string"){return e.isFunction(t.test)?t.test(n):t==n}e.each(t,function(i){if(n[i]===undefined){r=false;return r}else{if(typeof n[i]==="object"&&n[i]!==null){r=r&&a(t[i],n[i])}else{if(t[i]&&e.isFunction(t[i].test)){r=r&&t[i].test(n[i])}else{r=r&&t[i]==n[i]}}}});return r}function f(t,n){return t[n]===e.mockjaxSettings[n]}function l(t,n){if(e.isFunction(t)){return t(n)}if(e.isFunction(t.url.test)){if(!t.url.test(n.url)){return null}}else{var r=t.url.indexOf("*");if(t.url!==n.url&&r===-1||!(new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g,"\\$&").replace(/\*/g,".+"))).test(n.url)){return null}}if(t.data&&n.data){if(!a(t.data,n.data)){return null}}if(t&&t.type&&t.type.toLowerCase()!=n.type.toLowerCase()){return null}return t}function c(n,r,i){var s=function(t){return function(){return function(){var t;this.status=n.status;this.statusText=n.statusText;this.readyState=4;if(e.isFunction(n.response)){n.response(i)}if(r.dataType=="json"&&typeof n.responseText=="object"){this.responseText=JSON.stringify(n.responseText)}else if(r.dataType=="xml"){if(typeof n.responseXML=="string"){this.responseXML=o(n.responseXML);this.responseText=n.responseXML}else{this.responseXML=n.responseXML}}else{this.responseText=n.responseText}if(typeof n.status=="number"||typeof n.status=="string"){this.status=n.status}if(typeof n.statusText==="string"){this.statusText=n.statusText}t=this.onreadystatechange||this.onload;if(e.isFunction(t)){if(n.isTimeout){this.status=-1}t.call(this,n.isTimeout?"timeout":undefined)}else if(n.isTimeout){this.status=-1}}.apply(t)}}(this);if(n.proxy){t({global:false,url:n.proxy,type:n.proxyType,data:n.data,dataType:r.dataType==="script"?"text/plain":r.dataType,complete:function(e){n.responseXML=e.responseXML;n.responseText=e.responseText;if(f(n,"status")){n.status=e.status}if(f(n,"statusText")){n.statusText=e.statusText}this.responseTimer=setTimeout(s,n.responseTime||0)}})}else{if(r.async===false){s()}else{this.responseTimer=setTimeout(s,n.responseTime||50)}}}function h(t,n,r,i){t=e.extend(true,{},e.mockjaxSettings,t);if(typeof t.headers==="undefined"){t.headers={}}if(t.contentType){t.headers["content-type"]=t.contentType}return{status:t.status,statusText:t.statusText,readyState:1,open:function(){},send:function(){i.fired=true;c.call(this,t,n,r)},abort:function(){clearTimeout(this.responseTimer)},setRequestHeader:function(e,n){t.headers[e]=n},getResponseHeader:function(e){if(t.headers&&t.headers[e]){return t.headers[e]}else if(e.toLowerCase()=="last-modified"){return t.lastModified||(new Date).toString()}else if(e.toLowerCase()=="etag"){return t.etag||""}else if(e.toLowerCase()=="content-type"){return t.contentType||"text/plain"}},getAllResponseHeaders:function(){var n="";e.each(t.headers,function(e,t){n+=e+": "+t+"\n"});return n}}}function p(e,t,n){d(e);e.dataType="json";if(e.data&&i.test(e.data)||i.test(e.url)){m(e,t,n);var r=/^(\w+:)?\/\/([^\/?#]+)/,s=r.exec(e.url),o=s&&(s[1]&&s[1]!==location.protocol||s[2]!==location.host);e.dataType="script";if(e.type.toUpperCase()==="GET"&&o){var u=v(e,t,n);if(u){return u}else{return true}}}return null}function d(e){if(e.type.toUpperCase()==="GET"){if(!i.test(e.url)){e.url+=(/\?/.test(e.url)?"&":"?")+(e.jsonp||"callback")+"=?"}}else if(!e.data||!i.test(e.data)){e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?"}}function v(t,n,r){var i=r&&r.context||t,s=null;if(n.response&&e.isFunction(n.response)){n.response(r)}else{if(typeof n.responseText==="object"){e.globalEval("("+JSON.stringify(n.responseText)+")")}else{e.globalEval("("+n.responseText+")")}}g(t,i,n);y(t,i,n);if(e.Deferred){s=new e.Deferred;if(typeof n.responseText=="object"){s.resolveWith(i,[n.responseText])}else{s.resolveWith(i,[e.parseJSON(n.responseText)])}}return s}function m(e,t,n){var r=n&&n.context||e;var o=e.jsonpCallback||"jsonp"+s++;if(e.data){e.data=(e.data+"").replace(i,"="+o+"$1")}e.url=e.url.replace(i,"="+o+"$1");window[o]=window[o]||function(n){data=n;g(e,r,t);y(e,r,t);window[o]=undefined;try{delete window[o]}catch(i){}if(head){head.removeChild(script)}}}function g(e,t,n){if(e.success){e.success.call(t,n.responseText||"",status,{})}if(e.global){u(e,"ajaxSuccess",[{},e])}}function y(t,n){if(t.complete){t.complete.call(n,{},status)}if(t.global){u("ajaxComplete",[{},t])}if(t.global&&!--e.active){e.event.trigger("ajaxStop")}}function b(i,s){var o,u,a;if(typeof i==="object"){s=i;i=undefined}else{s.url=i}u=e.extend(true,{},e.ajaxSettings,s);for(var f=0;f<n.length;f++){if(!n[f]){continue}a=l(n[f],u);if(!a){continue}r.push(u);e.mockjaxSettings.log(a,u);if(u.dataType==="jsonp"){if(o=p(u,a,s)){return o}}a.cache=u.cache;a.timeout=u.timeout;a.global=u.global;w(a,s);(function(n,r,i,s){o=t.call(e,e.extend(true,{},i,{xhr:function(){return h(n,r,i,s)}}))})(a,u,s,n[f]);return o}if(e.mockjaxSettings.throwUnmocked===true){throw"AJAX not mocked: "+s.url}else{return t.apply(e,[s])}}function w(e,t){if(!(e.url instanceof RegExp)){return}if(!e.hasOwnProperty("urlParams")){return}var n=e.url.exec(t.url);if(n.length===1){return}n.shift();var r=0,i=n.length,s=e.urlParams.length,o=Math.min(i,s),u={};for(r;r<o;r++){var a=e.urlParams[r];u[a]=n[r]}t.urlParams=u}var t=e.ajax,n=[],r=[],i=/=\?(&|$)/,s=(new Date).getTime();e.extend({ajax:b});e.mockjaxSettings={log:function(t,n){if(t.logging===false||typeof t.logging==="undefined"&&e.mockjaxSettings.logging===false){return}if(window.console&&console.log){var r="MOCK "+n.type.toUpperCase()+": "+n.url;var i=e.extend({},n);if(typeof console.log==="function"){console.log(r,i)}else{try{console.log(r+" "+JSON.stringify(i))}catch(s){console.log(r)}}}},logging:true,status:200,statusText:"OK",responseTime:500,isTimeout:false,throwUnmocked:false,contentType:"text/plain",response:"",responseText:"",responseXML:"",proxy:"",proxyType:"GET",lastModified:null,etag:"",headers:{etag:"IJF@H#@923uf8023hFO@I#H#","content-type":"text/plain"}};e.mockjax=function(e){var t=n.length;n[t]=e;return t};e.mockjaxClear=function(e){if(arguments.length==1){n[e]=null}else{n=[]}r=[]};e.mockjax.handler=function(e){if(arguments.length==1){return n[e]}};e.mockjax.mockedAjaxCalls=function(){return r}})(jQuery)
$.mockjax(function(settings) {

  var url = settings.url,
      service = url.match(/getredirectval\?uri=https:\/\/familysearch.org\/pal:\/MM9.3.1\/(.*)\.jp.*$/);
  if ( service ) {

    return {
      responseText: 'https://familysearch.org/das/v2/' + service[1] + '/$dist?ctx=CrxCtxPublicAccess'
    };
  } else if(url.indexOf("MMMM") >= 0) {
      return {
          response: null
      }
  }
});
$(document).ready(function() {
    if(window!=window.top) {
        FS.Cookie.setCookie = function(){};//turn of image saving state
        return;
    }
    setTimeout(function() {
 var prevUrl = $.grep(imageMeta.properties, function(item) {
     return item.type.indexOf("prev") > 0
   })[0],
 nextUrl = $.grep(imageMeta.properties, function(item) {
     return item.type.indexOf("next") > 0
   })[0],
     backwards = nextUrl ? document.referrer == nextUrl.value : false,
     url = ( backwards ? prevUrl || nextUrl : nextUrl || prevUrl).value;
     $('<iframe src="'+ url +'" width="100%" height="1600px"/>').appendTo('body');
 
    },500);
});
var fastfilmKeys = {
    37: "#prev",//left
    38: "span.zoomin",//up
    39: "#next",//right
    40: "span.zoomout",//down
    73: "a.invert",//i
    80: "a.print",//p
//    82: "a.rotate", //r
    83: "a.download"//s

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
$("body").keydown(function(e) {
    		  var sel = fastfilmKeys[e.keyCode];
              if(sel) {
                 $(sel).click();
              }
});
