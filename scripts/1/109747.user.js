// ==UserScript==
// @name          mod_rewrite
// @description   Rewrite filehost links 
// @author        Steel
// @include       http://*
// @version        0.1
// ==/UserScript==

function gp_replace_links() {
  var obj = document.getElementsByTagName('body')[0];
  var body = obj.innerHTML;


  body = body.replace(/http:\/\/fileserve.com\/file\//g, 'http://thesyndicate@fileserve.com/file/');
  body = body.replace(/http:\/\/www.fileserve.com\/file\//g, 'http://thesyndicate@fileserve.com/file/');
  
    if (obj.innerHTML != body) {
      obj.innerHTML = body;
  }
}

gp_replace_links();