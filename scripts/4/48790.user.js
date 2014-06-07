// ==UserScript==
// @name           Google Bookmarks Screenshots
// @description    This script will automatically inject screenshots of every bookmark.
// @namespace      http://taccsupport.com/GB
// @include        http://*google.com/notebook/*
// @version        0.4.3
// ==/UserScript==
  
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", "http://www.taccsupport.com/gb/includes.js")
  document.getElementsByTagName("head")[0].appendChild(fileref)