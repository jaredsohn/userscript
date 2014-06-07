// ==UserScript==
// @name           reddit - Undeletion
// @namespace      http://userscripts.org/users/69979
// @description    Shows deleted comments and users on reddit. This also enables fun things, like being able to reply and report deleted comments. This version adds support for deleted mailbox messages, and lets you reply to them, which makes them revealable by everyone else. Also, this version was tested and actually works with any reddit language setting (but added links show in english.)
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

function init() {
  // 1: assess presence of deleted comments
  var found = hasDeletedContent();
  if (found) {
    // 2. fetch .rss version of page
    GM_xmlhttpRequest({
      method:'GET',
      url: location.href + "/.rss",
      // 3. insert deleted data back into the page
      onload: function(d){ insertDeletedContent(d, found); }
    });
  }
  // That's it.
}

function insertDeletedContent(data, parsed) {
  function getText(s){ return node.getElementsByTagName(s)[0].childNodes[0].nodeValue; }
  function makeUserLink(){ return '<a id="author_'+id+'" class="author" href="http://www.reddit.com/user/'+escape(user)+'/">'+user+'</a>'; }
  function makeReplyLink(){ return '<li><a id="reply_a_'+id+'" class="" href="javascript:reply(\''+id+'\')">reply</a></li>'; }

  var items = (new DOMParser).parseFromString(data.responseText, "application/xml").getElementsByTagName("item");
  var entries = document.getElementsByClassName("entry");
  for (var i in parsed) {
    var node = items[i];
    if (!node) {
      continue; // abject failure. ignore and hope we recover later on. :(
    }
    var entry = entries[i];
    var id = entry.id.split("_").slice(1).join("_");
    var tag = entry.firstChild.firstChild;
    
    var obj = parsed[i];
    if (obj.name) {
      var user = getText("title").split(" ")[0];
      var userLink = html2dom(makeUserLink());
      function x(tag) {
        tag.parentNode.insertBefore(userLink, tag);
        tag.innerHTML = " "+tag.innerHTML;
      }
      x(tag); // XXX doesn't quite work :(
      x(entry.childNodes[1].firstChild.firstChild);
    }
    if (obj.body) {
      var text = getText("description");
      var link = getText("link");
      document.getElementById("body_"+id).innerHTML='<div class="md"><p>'+text+"</p></div>";
      var buttons = '<li class="first"><a id="permalink_'+id+'" class="" target="_parent" href="'+link+'">permalink</a></li>'+
        '<li><form class="state-button" method="post" action="/post/report"><input type="hidden" value="reported" name="executed"/><input type="hidden" value="'+id+'" name="id"/><input type="hidden" value="yes" name="yes"/><input type="hidden" value="are you sure?" name="question"/><input type="hidden" value="no" name="no"/><span><a id="report_'+id+'" class="" onclick="return deletetoggle(this,Listing.report);" href="/">report</a></span></form></li>'+
        makeReplyLink();
      entry.getElementsByClassName("buttons")[0].innerHTML = buttons;
    }
    if (obj.inbox) {
        var tag2 = tag.getElementsByTagName("B")[0].firstChild;
        var user = getText("title").split(" ")[1];
        var userLink = makeUserLink();
        tag2.parentNode.innerHTML=userLink + ' ' + tag2.parentNode.innerHTML;
        tag.parentNode.getElementsByClassName("buttons")[0].innerHTML += makeReplyLink();
    }
  }
}

function hasDeletedContent() {
  var parsed = {};
  var entries = document.getElementsByClassName("entry");
  var ret = false;
  for (var i=0;i<entries.length;i++) {
    var entry = entries[i];
    var tag = entry.firstChild.firstChild;
    if (!tag) continue;
    switch (tag.tagName) {
      case "EM":   // comment deleted
        parsed[i] = { name:true, body:true, inbox:false};
        ret = true;
        break;
      case "SPAN": // author [deleted]
        parsed[i] = { name:true, body:false, inbox:false};
        ret = true;
        break;
      case "P":    // From [deleted]
        var tag2 = tag.getElementsByTagName("B")[0].firstChild;
        if (!tag2.tagName || tag2.tagName=="SPAN") {
          parsed[i] = { name:false, body:false, inbox:true};
          ret = true;
        }
        break;
    }
  }
  return ret?parsed:null;
}

function html2dom(html) {
  var x = document.createElement("p");
  x.innerHTML=html;
  return x.firstChild;
}

init();