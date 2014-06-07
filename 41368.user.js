// ==UserScript==
// @name           Blognomic: Track New Comments
// @namespace      blognomic
// @description    http://blognomic.com/member/395/track_new_comments/1233106301
// @include        http://*blognomic.com/
// @include        http://*blognomic.com/archive/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.3.pack.js
// ==/UserScript==

function getComments(text) {
  return parseInt(text.replace(/[^0-9]/g, ''))
}

function set(k,v) { // hack
  window.setTimeout(function() {
    GM_setValue(k,v)
  }, 0)
}

function get(k,v, callback) { // hack
  window.setTimeout(function() {
    callback(GM_getValue(k,v))
  }, 0)
}

function mainPage() {
  $("a[title='Comments']").each(function(i) {
    var link = this
    
    get(this.href, false, function(old_comments) {
      var num_comments = getComments(link.text)
      var num_new_comments = num_comments - (old_comments || 0)
      
      if ((!old_comments && num_comments > 0) || num_comments > old_comments) {
        $(link).append(' <span style="color: #FF0000;">(' + num_new_comments + ' new)</span>')
      }
      
      $(link).click(function() {
        set(link.href, num_comments)
      })
      
      if (num_new_comments > 0) {
        $('#header').append('<a href="' + link.href + '" style="color: #FF0000;">' + (num_comments - old_comments) + '</a> ')
      } else {
        $('#header').append('0 ')
      }
    })
  })
}

function archivePage() {
  $("a[title='Comments']").each(function(i) {
    set(this.href, getComments(this.text))
  })
}

$(document).ready(function() {
  if (/^http:\/\/(www\.)?blognomic.com\/archive\/.*$/.test(location.href)) {
    archivePage()
  } else if (/^http:\/\/(www\.)?blognomic.com\/$/.test(location.href)) {
    mainPage()
  }
})