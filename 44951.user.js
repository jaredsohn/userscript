// ==UserScript==
// @name           Automatically add hashtag to twitter
// @author         Stormy Peters http://stormyscorner.com
// @namespace     
// @description    Allows you to set a hashtag that is automatically appended to each tweet when you twitter from twitter.com. 
// @description  From Twitter.com, Set hashtag in Tools/GreaseMonkey/User Script Commands/Set hashtag
// @description  Code to handle GM functions comes from endless_tweets script by Mislav Marohni.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


if (typeof GM_getValue == "function") {
  var getValue = GM_getValue
  var setValue = GM_setValue
} else {
  var Cookie = {
    PREFIX: '_greasekit_',
    prefixedName: function(name){
      return Cookie.PREFIX + name;
    },
    
    get: function(name) {
      var name = escape(Cookie.prefixedName(name)) + '='
      if (document.cookie.indexOf(name) >= 0) {
        var cookies = document.cookie.split(/\s*;\s*/)
        for (var i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf(name) == 0)
            return unescape(cookies[i].substring(name.length, cookies[i].length))
        }
      }
      return null
    },
    set: function(name, value, options) {
      newcookie = [escape(Cookie.prefixedName(name)) + "=" + escape(value)]
      if (options) {
        if (options.expires) newcookie.push("expires=" + options.expires.toGMTString())
        if (options.path)    newcookie.push("path=" + options.path)
        if (options.domain)  newcookie.push("domain=" + options.domain)
        if (options.secure)  newcookie.push("secure")
      }
      document.cookie = newcookie.join('; ')
    }
  }

  var getValue = function(name, defaultValue) {
    var value = Cookie.get(name)
    if (value) {
      if (value == 'true')  return true
      if (value == 'false') return false
      return value
    }
    else return defaultValue
  }
  var setValue = function(name, value) {
    var expiration = new Date()
    expiration.setFullYear(expiration.getFullYear() + 1)
    
    Cookie.set(name, value, { expires: expiration })
  }
}


if (typeof GM_registerMenuCommand == "function") {
  GM_registerMenuCommand('Set hashtag', function() {
   var newhash = prompt("What hashtag would you like to use?");
    setValue('hashtag', newhash)
  })
}

function addHashtag() {
    var maxtweet = 140;
    var hash = getValue('hashtag');
    if (hash == undefined) hash = "";
    var tweet = document.getElementById('status').value
    var newtweet = tweet + " " + hash;
    if (newtweet.length > maxtweet) {
    alert("Tweet is too long to append hashtag.");
    }
    else{
    document.getElementById('status').value = newtweet;
    }
}

document.getElementById('update-submit').addEventListener("click", addHashtag, true);


