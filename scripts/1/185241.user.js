// ==UserScript==
// @name        Playlastifmy
// @namespace   last.fm/user/arekolek/
// @include     http://www.last.fm/*
// @version     1.0
// ==/UserScript==

var AJAX_Debug = false;
var GM_Debug = false;

if(GM_Debug){
  // emulate unsafeWindow in browsers that don't support it
  if (unsafeWindow == window)
  {
    unsafeWindow = (function() {
      var el = document.createElement("p");
      el.setAttribute("onclick", "return window;");
      return el.onclick();
    }())
  }

  // make greasemonkey to log to (Firebug) console
  if(unsafeWindow.console){
    var GM_log = unsafeWindow.console.log;
  }
}
else {
  var GM_log = function(){};
}

// makeClass - By John Resig (MIT Licensed)
function makeClass(){
  return function(args){
    if ( this instanceof arguments.callee ) {
      if ( typeof this.init == "function" )
        this.init.apply( this, args.callee ? args : arguments );
    } else
      return new arguments.callee( arguments );
  };
}

// binding scope - By Robert Sosinski
Function.prototype.bind = function(scope) {
  var _function = this;
  
  return function() {
    return _function.apply(scope, arguments);
  }
}

//************* Api.js

var Api = makeClass();

Api.instance = null;

Api.prototype.apiKey = "65c113696e09771ad21032bcf4247eb0";
Api.prototype.apiUrl = "http://ws.audioscrobbler.com/2.0/";

Api.getInstance = function() {
  if(!Api.instance) {
    Api.instance = new Api();
  }
  return Api.instance;
};

Api.prototype.internalCall = function(params, callback){
  
  params.format = 'json';
  
  var array = [];
  for(var param in params){
    if(typeof params[param] == "object"){
      for(var i in params[param]){
        array.push(encodeURIComponent(param) + "[]=" + encodeURIComponent(params[param][i]));
      }
    } else {
      array.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
    }
  }
  
  var url = this.apiUrl + '?' + array.join('&').replace(/%20/g, '+');
  
  try{
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function(response) {
        if(callback){
          callback(JSON.parse(response.responseText));
        }
        if(AJAX_Debug) GM_log([
        "GET " + url,
        response.status + " " + response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        response.responseXML
        ].join("\n"));
      }
    });
  } catch (error){
    chrome.extension.sendRequest({url : url}, callback);
  }
}

Api.prototype.call = function(method, params, callback){
  /* Set defaults */
  params = params || {};
  
  /* Add parameters */
  params.method = method;
  params.api_key = this.apiKey;
  
  /* Call method */
  this.internalCall(params, callback);
}

/**
 * artist (Required) : List of artist names
 * track (Required) : List of track names
 **/
Api.prototype.trackGetPlayLinks = function(params, callback){
  this.call('track.getPlayLinks', params, callback);
}

//************* Page.js

var Page = makeClass();

Page.prototype.dom;
Page.prototype.api;

Page.prototype.getTitle = function() {
  var meta = this.dom.getElementsByTagName("meta");
  for(var i in meta) {
    if(meta[i].getAttribute("property") == "og:title") {
      return meta[i].getAttribute("content");
    }
  }
}

Page.prototype.getTitleFragments = function() {
  // btw '–' is an 'en dash'
  return this.getTitle().split(' – ');
}

Page.prototype.findElements = function(options) {
  options = options || {};
  var node = options.node;
  var tag = options.tag;
  var css = options.css;
  
  if(!node){
    node = this.dom.getElementsByTagName("body")[0];
  }
  if(!tag){
    tag = "*";
  }
  var a = [];
  var re = new RegExp('\\b' + css + '\\b');
  var els = node.getElementsByTagName(tag);
  for(var i=0,j=els.length; i<j; i++){
    if(!css || re.test(els[i].className)){
      a.push(els[i]);
    }
  }
  return a;
}

Page.prototype.addSpotifyLinks = function() {
  var callback = function(uri) {
    GM_log(uri);
    this.onSpotifyLinkReady(this.getSpotifyUri(uri.split(":")[2]));
  };
  this.getPlayLinks(callback.bind(this));
};

Page.prototype.onSpotifyLinkReady = function(uri) {
  var listener = this.findElements({tag: "div", css: "music-resource-stats"})[0];
  var ul = this.createElement({tag: "ul", css: "media-links"});
  var li = this.createMediaLink({name: "Spotify", uri: uri, image: "http://cdn.last.fm/flatness/medialinks/spotify.png"});
  ul.appendChild(li);
  listener.parentNode.insertBefore(ul, listener.nextSibling);
}

Page.prototype.createElement = function(options){
  options = options || {};
  var tag = options.tag;
  var css = options.css;
  var href = options.href;
  var text = options.text;
  var src = options.src;
  var onclick = options.onclick;
  
  var e = this.dom.createElement(tag);
  if(css){
    e.className = css;
  }
  if(href){
    e.href = href;
  }
  if(text){
    e.appendChild(this.dom.createTextNode(text));
  }
  if(src){
    e.src = src;
  }
  if(onclick){
    e.onclick = onclick;
  }
  return e;
};

Page.prototype.setApi = function(api) {
  this.api = api;
};

//************* PlaylistPage.js

var PlaylistPage = makeClass();
PlaylistPage.prototype = new Page();
PlaylistPage.prototype.init = function(dom) {
  this.dom = dom;
}

PlaylistPage.prototype.getPlayLinks = function(artists, tracks, callback) {
  this.api.trackGetPlayLinks({
    artist: artists,
    track: tracks,
  }, callback);
}

PlaylistPage.prototype.startTheMagic = function() {
  var links = this.findElements({tag: "a"}).filter(isTrackLink).map(toHref).filter(isUnique);
  var artists = links.map(toArtistName);
  var tracks = links.map(toTrackName);
  this.getLinks(artists, tracks, new Array());
}

PlaylistPage.prototype.getLinks = function(artists, tracks, links) {
  var callback = function(json) {
    try{
      links = links.concat(json.spotify.track.map(function(t){return t.externalids.spotify;}));
      links = links.filter(function(l){return l;});
    } catch (e) {
      GM_log(e);
      GM_log(json);   
      GM_log(artists.slice(0, 20));
      GM_log(tracks.slice(0, 20));
    }
    this.getLinks(artists.slice(20), tracks.slice(20), links);
  };
  if(artists.length > 0){
    this.getPlayLinks(artists.slice(0, 20), tracks.slice(0, 20), callback.bind(this));
  } else {
    this.copyToClipboard(links.join(" "));
  }
}

PlaylistPage.prototype.playlastifmy = function() {
  var ul = this.findElements({node:this.findElements({css:"drop-down-menu"})[0],css:"hidden-menu"})[0];
  var callback = function(){
    this.startTheMagic();
    return false;
  };
  var li = this.createElement({tag: "li"});
  var a = this.createElement({tag:"a", href:"#",
            text: "Copy songs to Spotify", onclick: callback.bind(this)});
  li.appendChild(a);
  ul.appendChild(li);
}

PlaylistPage.prototype.copyToClipboard = function(text) {
  GM_log(text);
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function isTrackLink(element, index, array) {
  var url = element.href;
  url = url.substr(url.indexOf("/", 8)); // pathname
  return (! /\/\+/.exec(url) && url.startsWith("/music") && url.match(/\//g).length == 4);
}

function toHref(a) {
  return a.href;
}

function toArtistName(url){
  return decode(url.substr(url.indexOf("/music/") + 7).split("/")[0]);
}

function toTrackName(url){
  return decode(url.substr(url.lastIndexOf("/") + 1));
}

function decode(s){
  return unescape(decodeURIComponent(s.replace(/\+/g, ' ')));
}

function isUnique(element, index, array) {
  return array.indexOf(element) == index;
}

//************* PageFactory.js

var PageFactory = makeClass();

PageFactory.prototype.createPage = function(url, dom) {
  return new PlaylistPage(dom);
}

//*************************** Main.js

try {

GM_log("hello");
var page = new PageFactory().createPage(window.location, document);
page.setApi(Api.getInstance());
page.playlastifmy();

} catch(e) {
GM_log("error: " + e);
}

