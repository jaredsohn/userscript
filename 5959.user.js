// ==UserScript==
// @name           Bugzilla Enhancements
// @namespace      http://pile0nades.wordpress.com/
// @description    Adds links to bugzilla attachments table, letting you go directly to the attachment's comment instead of having to scroll to it. Changes "RESO FIXE" on bug listing into "RESOLVED FIXED," etc..; Small logical change on advanced search page
// @include        https://bugzilla.mozilla.org/*
// @include        http://bugzilla.mozdev.org/*
// ==/UserScript==

var l = location.pathname;

// show_bug.cgi - Add links from the attachments to their posts
if(/(post|show|process)_bug\.cgi/.test(l)){
  var links = get("//table[@id='attachment_table']/tbody/tr/td[1]/a[contains(@href, 'attachment.cgi?id=')]");
  var posts = get("//div[@id='comments']/div/pre/span/a[contains(.,'Created an attachment')]/../../../div[@class='bz_comment_head']/span[@class='bz_comment_number']/a[1]");
  var attachlinks = get("//table[@id='attachment_table']/tbody/tr/td[1]/span/a[starts-with(@href, '#attach_')]");

  // mozdev.org hasn't upgraded their bugzilla yet
  if(location.hostname == "bugzilla.mozdev.org") {
    links = get("//div[@id='content']/form/table[2]/tbody/tr[2]/td[1]/a[contains(@href, 'attachment.cgi?id=')]");
    posts = get("//form[@action='process_bug.cgi']/div/pre/span/a[contains(.,'Created an attachment')]/../../../span[@class='bz_comment']/i/a[1]");
  }

  for(var i=0; i<posts.length; i++) {
    var a = links[i];

    if(!/\S+/.test(a.firstChild.nodeValue)) a.removeChild(a.firstChild);
    
    var postlink = document.createElement("a");
    postlink.href = posts[i].href;
    postlink.innerHTML = "<b>" + postlink.href.slice(postlink.href.indexOf("#")) + "</b>";
    
    a.parentNode.insertBefore(postlink, a);
    a.parentNode.insertBefore(document.createTextNode("|"), a);
    
    // remove the native attachment link, I like mine better
    var att = attachlinks[i];
    if(att) att.parentNode.replaceChild(document.createTextNode(att.innerHTML), att);
  }
}


// buglist.cgi - replace RESO FIXE with RESOLVED FIXED, blo with blocker, etc..
else if(/buglist\.cgi/.test(l)) {

  // show your search terms on the top of the page
  
  // returns the value for the specified name from the query string 
  function parseURL() {
    var search = location.search.slice(1);
    var pairs = search.split("&");
    var values = [];
    var junk = /\+/g;

    for(var i = 0; i < pairs.length; i++) {
      for(var j = 0; j < arguments.length; j++) {
        var pair = pairs[i].split("=");
        if(pair[0] == arguments[j]) {
          values.push(pair[1].replace(junk, " "));
        }
      }
    }
    return (values.length == 1 ? values[0] : (values.length == 0 ? "" : values));
  }

  var str = " – Search: " + parseURL("short_desc");
  var mark = get("/html/body/div[2]/table/tbody/tr/td/p")[0];
  if (mark) mark.innerHTML += str;



  // expand abbreviations
  var severity   = get("//table[@class='bz_buglist']/tbody/tr/td[2]");
  var status     = get("//table[@class='bz_buglist']/tbody/tr/td[6]");
  var resolution = get("//table[@class='bz_buglist']/tbody/tr/td[7]");

  for(var i = 0; i < severity.length; i++) {
    severity[i].innerHTML = severity[i].innerHTML
    .replace(/blo/, "blocker")
    .replace(/cri/, "critical")
    .replace(/maj/, "major")
    .replace(/nor/, "normal")
    .replace(/min/, "minor")
    .replace(/tri/, "trivial")
    .replace(/enh/, "enhancement");
  }

  for(var i = 0; i < status.length; i++) {
    status[i].innerHTML = status[i].innerHTML
    .replace(/UNCO/, "UNCONFIRMED")
    .replace(/ASSI/, "ASSIGNED")
    .replace(/REOP/, "REOPENED")
    .replace(/RESO/, "RESOLVED")
    .replace(/VERI/, "VERIFIED")
    .replace(/CLOS/, "CLOSED");
  }

  for(var i = 0; i < resolution.length; i++) {
    resolution[i].innerHTML = resolution[i].innerHTML
    .replace(/FIXE/, "FIXED")
    .replace(/INVA/, "INVALID")
    .replace(/WONT/, "WONTFIX")
    .replace(/LATE/, "LATER")
    .replace(/REMI/, "REMIND")
    .replace(/DUPL/, "DUPLICATE")
    .replace(/WORK/, "WORKSFORME")
    .replace(/EXPI/, "EXPIRED")
    .replace(/MOVE/, "MOVED");
  }
}


// query.cgi - rearrangements on the advanced search form
else if(/query\.cgi/.test(l) && get("//input[@name='query_format'][@value='advanced']").length == 1) {
  var product = get("//form[@action='buglist.cgi']/table[1]/tbody/tr[2]")[0];
  var hr = get("//form[@action='buglist.cgi']/hr[1]")[0];

  hr.parentNode.insertBefore(product, hr);
}






function get(query) {
  var array = [];
  var result = document.evaluate(query, document, null, 7, null);
  for(var i = 0; i < result.snapshotLength; i++) {
    array.push(result.snapshotItem(i));
  }
  return array;
}