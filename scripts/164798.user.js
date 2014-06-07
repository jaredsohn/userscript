// ==UserScript==
// @name           Spotify links for Last.fm
// @description    Get links to Spotify for artists, albums and tracks
// @version        1.0
// @namespace      last.fm/user/arekolek/
// @include        http://www.last.fm/music/*
// @include        http://www.lastfm.de/music/*
// @include        http://www.lastfm.es/music/*
// @include        http://www.lastfm.fr/music/*
// @include        http://www.lastfm.it/music/*
// @include        http://www.lastfm.jp/music/*
// @include        http://www.lastfm.pl/music/*
// @include        http://www.lastfm.com.br/music/*
// @include        http://www.lastfm.ru/music/*
// @include        http://www.lastfm.se/music/*
// @include        http://www.lastfm.com.tr/music/*
// @include        http://cn.last.fm/music/*
// ==/UserScript==

//************* Util.js

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
    var a = typeof params[param] == "object" ? "[]" : "";
    array.push(encodeURIComponent(param) + a + '=' + encodeURIComponent(params[param]));
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
        GM_log([
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
 **/
Api.prototype.artistGetPlayLinks = function(params, callback){
  this.call('artist.getPlayLinks', params, callback);
}

/**
 * artist (Required) : List of artist names
 * album (Required) : List of album names
 **/
Api.prototype.albumGetPlayLinks = function(params, callback){
  this.call('album.getPlayLinks', params, callback);
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
    if(re.test(els[i].className)){
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
  return e;
};

Page.prototype.createMediaLink = function(options) {
  options = options || {};
  var name = options.name;
  var uri = options.uri;
  var image = options.image;
  
  var li = this.createElement({tag: "li", css: "media-link"});
  var a = this.createElement({tag: "a", href: uri, css: "media-link-provider media media--icon"});
  var span = this.createElement({tag: "span", css: "media-pull-left"});
  var img = this.createElement({tag: "img", css: "favicon transparent_png", src: image});
  var div = this.createElement({tag: "div", css: "media-body", text: "Play on "});
  var strong = this.createElement({tag: "strong", text: name});
  li.appendChild(a);
  a.appendChild(span);
  span.appendChild(img);
  a.appendChild(div);
  div.appendChild(strong);
  return li;
};

Page.prototype.setApi = function(api) {
  this.api = api;
};

//************* ArtistPage.js

var ArtistPage = makeClass();
ArtistPage.prototype = new Page();
ArtistPage.prototype.init = function(dom) {
  this.dom = dom;
  
  this.artist = this.getTitle();

  GM_log("new artist " + this.artist);
}

ArtistPage.prototype.getPlayLinks = function(callback) {
  this.api.artistGetPlayLinks({
    artist: [this.artist],
  }, function(json){GM_log(json);callback(json.spotify.artist.externalids.spotify)});
};

ArtistPage.prototype.getSpotifyUri = function(id){
  return "http://open.spotify.com/artist/" + id;
}

//************* AlbumPage.js

var AlbumPage = makeClass();
AlbumPage.prototype = new Page();
AlbumPage.prototype.init = function(dom) {
  this.dom = dom;
  
  var title = this.getTitleFragments();
  this.artist = title[0];
  this.album = title[1];

  GM_log("new album " + this.album + " by " + this.artist);
}

AlbumPage.prototype.getPlayLinks = function(callback) {
  this.api.albumGetPlayLinks({
    artist: [this.artist],
    album: [this.album],
  }, function(json){callback(json.spotify.album.externalids.spotify)});
};

AlbumPage.prototype.getSpotifyUri = function(id){
  return "http://open.spotify.com/album/" + id;
}

//************* TrackPage.js

var TrackPage = makeClass();
TrackPage.prototype = new Page();
TrackPage.prototype.init = function(dom) {
  this.dom = dom;

  var title = this.getTitleFragments();
  this.artist = title[0];
  this.track = title[1];
  
  GM_log("new track " + this.track + " by " + this.artist);
};

TrackPage.prototype.getPlayLinks = function(callback) {
/*  this.api.trackGetPlayLinks({
    artist: [this.artist],
    track: [this.track],
  }, function(json){callback(json.spotify.track.externalids.spotify)});*/
};

TrackPage.prototype.onSpotifyLinkReady = function(uri) {
  var e = this.findElements({tag: "ul", css: "media-links"})[0];
  e.appendChild(this.createMediaLink({name: "Spotify", uri: uri, image: "http://cdn.last.fm/flatness/medialinks/spotify.png"}));
}

TrackPage.prototype.getSpotifyUri = function(id){
  return "http://open.spotify.com/track/" + id;
}

//************* PageFactory.js

var PageFactory = makeClass();

PageFactory.prototype.createPage = function(url, dom) {
  // filter out pages without listeners section
  if(/\/\+/.exec(url.pathname)) {
    throw {
      name: "UnsupportedUrl",
      message: "This is nor artist, album or track page"
    };
  }

  // number of slashes in the url determines type
  var slashes = url.pathname.match(/\//g).length;

  if(slashes == 2) {
    return new ArtistPage(dom);
  } else if(slashes == 3) {
    return new AlbumPage(dom);
  } else if(slashes == 4) {
    return new TrackPage(dom);
  } else {
    throw {
      name: "UnsupportedUrl",
      message: "Slashes don't match, should it work on this page, really?"
    };
  }
}

//*************************** Main.js

try {

var page = new PageFactory().createPage(window.location, document);
page.setApi(Api.getInstance());
page.addSpotifyLinks();

} catch(e) {
GM_log("error: " + e);
}

