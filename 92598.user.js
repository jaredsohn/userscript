// ==UserScript==
// @name           Last.fm friends library
// @version        1.3.2
// @description    Lists your friends that listen to particular artist, album or track along with playcount and loved indicator.
// @namespace      http://arkadiusz.olek.student.tcs.uj.edu.pl/greasemonkey/
// @icon           http://arkadiusz.olek.student.tcs.uj.edu.pl/greasemonkey/last/icon48.png
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



function Last(){
  /* Set defaults */
  var apiKey = "65c113696e09771ad21032bcf4247eb0";
  var apiUrl = "http://ws.audioscrobbler.com/2.0/";
  
  var internalCall = function(params, callback){
    
    /* Set callback name and response format. */
    params.format = 'json';
    
    var array = [];
    for(var param in params){
      array.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
    }
    
    var url = apiUrl + '?' + array.join('&').replace(/%20/g, '+');
    
    try{
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
          if(callback){
            callback(JSON.parse(response.responseText));
          }

          //GM_log([
            //response.status,
            //response.statusText,
            //response.readyState,
            //response.responseHeaders,
            //response.responseText,
            //response.finalUrl,
            //response.responseXML
          //].join("\n"));
        }
      });
    } catch (error){
      chrome.extension.sendRequest({url : url}, callback);
    }
  }
  
  var call = function(method, params, callback){
    /* Set defaults */
    params = params || {};
    
    /* Add parameters */
    params.method = method;
    params.api_key = apiKey;
    
    /* Call method */
    internalCall(params, callback);
  }
  
  this.artist = {
    /**
     * artist (Required) : The artist name
     * lang (Optional) : The language to return the biography in,
     *    expressed as an ISO 639 alpha-2 code
     * username (Optional) : The username for the context of the request.
     *    If supplied, the user's playcount for this artist is included
     *    in the response.
     **/
    getInfo : function(params, callback){
      call('artist.getInfo', params, callback);
    }
  }
  
  this.album = {
    /**
     * album (Required] : The album name
     * artist (Required] : The artist name
     * lang (Optional) : The language to return the biography in,
     *    expressed as an ISO 639 alpha-2 code.
     * username (Optional) : The username for the context of the request.
     *    If supplied, the user's playcount for this album is included
     *    in the response.
     **/
    getInfo : function(params, callback){
      call('album.getInfo', params, callback);
    }
  }
  
  this.track = {
    /**
     * artist (Required] : The artist name
     * track (Required] : The track name
     * username (Optional) : The username for the context of the request.
     *    If supplied, the user's playcount for this track and whether
     *    they have loved the track is included in the response.
     **/
    getInfo : function(params, callback){
      call('track.getInfo', params, callback);
    }
  }
  
  this.user = {
    /**
     * user (Required) : The last.fm username to fetch the friends of.
     * limit (Optional) : An integer used to limit the number of friends
     *    returned per page. The default is 50.
     * page (Optional) : The page number to fetch.
     **/
    getFriends : function(params, callback){
      call('user.getFriends', params, callback);
    } 
  }
}

function getInfo(){
  var trackPage = /^\/music(?:\/[^/]*){3}/.exec(window.location.pathname) != null;
  var meta = document.getElementsByTagName("meta");
  for(var i in meta){
    if(meta[i].getAttribute("property") == "og:title"){
      var matches = /^(.+?)(?:(?: – )(.+))?$/.exec(meta[i].getAttribute("content"));
      var artist = matches[1];
      var album = matches[2] || undefined;
      var track = undefined;
      if(trackPage){
        track = album;
        album = undefined;
      }
      return [artist, album, track];
    }
  }
}

function Page(){
  // Filter out pages without listeners section
  if(/\/\+[^/]*$/.exec(window.location.pathname)){
    throw "This is nor artist, album or track page";
  }
  
  var info = getInfo();
  
  this.artist = info[0];
  this.album = info[1];
  this.track = info[2];
  
  //GM_log("['{0}', '{1}', '{2}']".format(this.artist, this.album, this.track));
  
  this.listeners = this.getListeners();
  this.friends = this.createFriends(this.listeners);
}

/**
 * Creates a new section that can hold friends information and adds it to DOM tree
 **/
Page.prototype.createFriends = function(listeners){
  
  var div = document.createElement("div");
  div.className = "module listenersModule";
  var ul = document.createElement("ul");
  ul.className = "usersSmall clearit";
  div.appendChild(ul);
  
  var p = document.createElement("p");
  p.id = "friendsThrobber";
  p.style.padding = "8px 20px";
  p.style.backgroundPosition = "left center";
  p.style.backgroundRepeat = "no-repeat";
  p.style.backgroundImage = "url("+throbber+")";
  p.appendChild(document.createTextNode("Loading friends..."));
  div.appendChild(p);
  this.throbber = p;
  
  listeners.parentNode.insertBefore(div, listeners.nextSibling);
  
  return ul;
}

/**
 * Returns the element under which the new section should be inserted
 **/
Page.prototype.getListeners = function(){
  var headings = getElementsByClassName("heading");
  
  for(var i in headings){
    try{
      var href = headings[i].getElementsByTagName("span")[0].getElementsByTagName("a")[0].getAttribute("href");
    } catch(error) {
      continue;
    }
    if(/\+listeners$/.exec(href)){
      return headings[i];
    }
  }
}

Page.prototype.update = function(friends){
  
  recursiveUpdate(friends, [], this);
  
  //GM_log(friends.length);
}

function recursiveUpdate(todo, done, page){
  if(todo.length > 0 ){
    page.updateProgress(done.length, todo.length+done.length);
    todo[0].getPlaycount({artist : page.artist, album : page.album, track : page.track}, function(){
      done.push(todo.shift());
      recursiveUpdate(todo, done, page);
    });
  } else {
    //GM_log("KONIEC");
    page.insert(done);
  }
}

Page.prototype.updateProgress = function(done, total){
  var text = " ({0}/{1})".format(done,total)
  if(done == 0){
    this.progressText = document.createTextNode(text);
    this.throbber.appendChild(this.progressText);
  } else {
    this.progressText.nodeValue = text;
  }
}

Page.prototype.insert = function(friends){
  
  friends.sort(comparePlaycount);
  
  var throbber = this.throbber;//document.getElementById("friendsThrobber");
  
  if(friends[0].playcount && friends[0].playcount > 0){
    this.friends.parentNode.removeChild(throbber);
  } else {
    throbber.style.paddingLeft = "0";
    throbber.style.background = "none";
    throbber.innerHTML = "None of your friends have scrobbled this";
  }
  
  for(var i in friends){
    if(friends[i].playcount){
      if(i < 6){
        this.addFriend(friends[i]);
      } else {
        if(i == 6) {
          this.createHiddenFriends();
        }
        this.addFriend(friends[i], true);
      }
    } else {
      break;
    }
  }
  
  this.friends.firstChild.className = "first user";
  this.friends.lastChild.className = "last user";
}

Page.prototype.createHiddenFriends = function(){
  
  this.hiddenFriends = document.createElement("ul");
  this.hiddenFriends.className = "usersSmall clearit";
  this.hiddenFriends.style.display = "none";
  this.friends.parentNode.insertBefore(this.hiddenFriends, this.friends.nextSibling);
    
  var span = document.createElement("span");
  span.className = "moduleOptions";
  var a = document.createElement("a");
  a.href = "#";
  a.appendChild(document.createTextNode("More friends"));
  span.appendChild(a);
  this.friends.parentNode.insertBefore(span, this.hiddenFriends.nextSibling);
  
  a.addEventListener("click", bind(this, this.showHide), false);
  
  this.showHideLink = a;
}

Page.prototype.showHide = function(e){
  if(this.hiddenFriends.style.display == "none"){
    this.hiddenFriends.style.display = "block";
    this.showHideLink.innerHTML = "Less friends";
  } else {
    this.hiddenFriends.style.display = "none";
    this.showHideLink.innerHTML = "More friends";
  }
  e.stopPropagation();
  e.preventDefault();
}

Page.prototype.addFriend = function(user, hidden){
  var li = document.createElement("li");
  li.className = "user";
  var div = document.createElement("div");
  li.appendChild(div);
  var strong = document.createElement("strong");
  div.appendChild(strong);
  
  // avatar and user name link to profile
  var a = document.createElement("a");
  a.href = "/user/{0}".format(uriEncode(user.name));
  a.title = user.realname;
  strong.appendChild(a);
  var span = document.createElement("span");
  span.className = "userImage";
  
  // avatar
  var img = document.createElement("img");
  img.width = "34";
  img.height = "34";
  img.alt = user.name;
  img.src = user.image;
  span.appendChild(img);
  a.appendChild(span);
  
  // user name
  span = document.createElement("span");
  span.className = "name";
  span.appendChild(document.createTextNode(user.name));
  a.appendChild(span);
  
  // second row
  var p = document.createElement("p");
  
  // link to loved tracks
  if(user.loved == 1){
    a = document.createElement("a");
    a.href = "/user/{0}/library/loved".format(user.name);
    a.title = "{0}'s loved tracks".format(user.name);
    img = document.createElement("img");
    img.width = "11";
    img.height = "9";
    img.src = "http://cdn.last.fm/flatness/clear.gif";
    img.className = "icon loved_indicator_icon";
    a.appendChild(img);
    p.appendChild(a);
  }
  
  // link to library
  a = document.createElement("a");
  if(this.track && this.artist){
    a.href = "/user/{0}/library/music/{1}/_/{2}".format(uriEncode(user.name), uriEncode(this.artist), uriEncode(this.track));
  } else if(this.album && this.artist) {
    a.href = "/user/{0}/library/music/{1}/{2}".format(uriEncode(user.name), uriEncode(this.artist), uriEncode(this.album));
  } else if(this.artist){
    a.href = "/user/{0}/library/music/{1}".format(uriEncode(user.name), uriEncode(this.artist));
  }
  a.title = "{0}'s library".format(user.name);
  a.appendChild(document.createTextNode("{0} {1}".format(user.playcount, user.playcount == 1 ? "play" : "plays")));
  p.appendChild(a);
  
  div.appendChild(p);
  
  if(hidden){
    this.hiddenFriends.appendChild(li);
  } else {
    this.friends.appendChild(li);
  }
}

function User(name, image, realname){
  
  this.friends = [];
  
  if(name){
    // constructor for friends
    this.name = name;
    this.image = image ? image.replace(/\/([^/]*)$/, "s/$1") : DEFAULT_IMAGE;
    this.realname = realname;
  }else{
    // constructor for the user
    try{
      this.name = document.getElementById("idBadgerUser").lastChild.nodeValue;
    } catch (error) {
    }
    
    if(!this.name){
      throw "Not logged in";
    }
  }
}

User.prototype.getFriends = function(callback, page){
  
  this.onFriendsReady = callback;
  
  last.user.getFriends({
    user : this.name,
    //limit : 10,
    page : page || 1
  }, bind(this, this.getFriendsCallback));
}

User.prototype.getFriendsCallback = function(response) {

  var friends = response.friends.user;
  var attrs = response.friends["@attr"];
  
  var a = [];
  for(var i in friends){
    var f = friends[i]
    var image;
    for(var j in f.image){
      if(f.image[j].size = "small"){
        image = f.image[j]["#text"];
        break;
      }
    }
    a.push(new User(f.name, image, f.realname));
  }
  
  this.friends = this.friends.concat(a);
    
  if(attrs["page"] < attrs["totalPages"]){
    this.getFriends(this.onFriendsReady, parseInt(attrs["page"]) + 1);
  }else{
    this.onFriendsReady(this.friends);
  }
};

User.prototype.getPlaycount = function(info, callback){
  
  this.playcountCallback = callback;
  
  if(info.track && info.artist){
    last.track.getInfo({
      artist: info.artist,
      track: info.track,
      username: this.name
    }, bind(this, this.getPlaycountCallback));
  } else if(info.album && info.artist) {
    last.album.getInfo({
      artist: info.artist,
      album: info.album,
      lang: 'ak', // some exotic language
      username: this.name
    }, bind(this, this.getPlaycountCallback));
  } else if(info.artist){
    last.artist.getInfo({
      artist: info.artist,
      lang: 'ak', // some exotic language
      username: this.name
    }, bind(this, this.getPlaycountCallback));
  }
}

User.prototype.getPlaycountCallback = function(response){
  
  this.playcount = response.track ? response.track.userplaycount : response.album ? response.album.userplaycount : response.artist.stats.userplaycount;
  
  if(response.track){
    this.loved = response.track.userloved;
  }
  
  if(this.playcountCallback){
    this.playcountCallback();
  }
}

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function getElementsByClassName(classname, node, tagname) {
  if(!node){
    node = document.getElementsByTagName("body")[0];
  }
  if(!tagname){
    tagname = "*";
  }
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName(tagname);
  for(var i=0,j=els.length; i<j; i++){
    if(re.test(els[i].className)){
      a.push(els[i]);
    }
  }
  return a;
}

function bind(scope, fn) {
  return function(){
    fn.apply(scope, arguments);
  };
}

function comparePlaycount(a, b){
  if(!a.playcount){
    return 1;
  } else if (!b.playcount) {
    return -1;
  } else {
    return b.playcount - a.playcount;
  }
}

function uriEncode(a){
  return encodeURIComponent(a).replace(/( |%20)/g, '+');
}

var throbber = "data:image/gif;base64,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";

var DEFAULT_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDktMDlUMTI6MjY6NDBaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDktMDlUMTI6Mzk6MjdaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINiv01cAAAKZSURBVFiF7ZfdTus4FEaX7bROmhqiSiAhLgAJiVeZN543oly0KQWcn9qx52KUSO0czSRQnXM04pN8kzjbS9/e9nZEjPEP4E9+seSvBuj1DXKqb5BTfRkkxkgIgRjjl+Ikn/3Qe09VVXjvh2dSSrIsQ2v9c0CapsFai9YaYwxSSmKMOOf4+PjAOcdyuZwUc3JqnHNYa7m8vCTLMpxz1HVN27YkScJqteJwOFDX9aS4kxyJMfL29oYxhhgj+/0eIcTwvmkasiyjKArKsmQ2m5Ek45aY7IjWmiRJeH9/J8Z4NACstYQQWCwWkwp4EohzjjRN8d7jnBt2zOlommaYd3YQ5xzb7RZrLV3X/RDgFKYsS6qqOi9IXdeDE0KIf4WQUuKcI4SAtXZU/EnFGkLgcDggpURKSdd1R8Xaz0mShLquh9SN0WhH0jQlhEDbtsQYUUrRdd0/hhACKSVt2+KcYzabnRdkPp9zdXU15F9rjff+KCXee5Ikoes6qqpisVhQFMWo+JNSs1wuyfN8cCaEgBCCGCNCiAFEa83Dw8NoNyaDAAghUEqRpilCCJxzR2nK83yooSn6VPdt2xaAm5sb4O8T1XvP9fU1WZZNPt5hoiN1XbPdbnl9fSXPc+7v73l6ejoqyvV6zWazwRjDarXi4uJiVGwx5hYfQmC9XlOWJSEElFKEENBaUxQFaZrinGO/32OtRUo53FGMMdze3v7n1WCUI7vdjpeXF2az2dDyhRA0TcPz8/NQsH1t9O+FEOx2O5RS3N3dfR1EKTUsdtrI+qLsD7YfHWBjOvAokN7WfrtOUYyRNE3PAzKfz4dUTN2WZwVRSvH4+MhmswEY5UqfQmMMeZ6fB6QPaIwZO32y/j//NefSN8ipfhuQvwBeBLVPauGDlQAAAABJRU5ErkJggg==';

try{
  
  var last = new Last();
  
  var user = new User();
  
  var page = new Page();
  
  user.getFriends(bind(page, page.update));
  
} catch (error) {
  GM_log(error);
  return;
}


/***********CHANGELOG**********
 * 
 * Version 1.3.2
 * 13.02.2011
 * Default avatar for users without one
 *
 * Version 1.3.1
 * 7.02.2011
 * Changed "0 play" to "0 plays"
 * 
 * Version 1.3
 * 22.01.2011
 * Progress update while loading friends.
 * Icon and version number for greasemonkey.
 * 
 * Version 1.2
 * 21.12.2010
 * Fix for special characters in artist, album or track names.
 * 
 * Version 1.1
 * 19.12.2010
 * A nicer throbber (spinning wheel)
 * Updated to make it work with the current layout of track pages
 * 
 ******************************/

