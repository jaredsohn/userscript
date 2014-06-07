// ==UserScript==
// @name           hide posts by id for cnsw
// @namespace      cnsw
// @include        https://www.cnsw.org/bbs/*
// ==/UserScript==

var us = /^(12705|8937)$/; // 请自行修改该变量
var ms = /id="(post_[0-9]+)"|[?]uid=([0-9]+)/g;
var dv = null;
while(m=ms.exec(document.body.innerHTML)){
  if(m[1])dv = m[1];
  if(dv && m[2] && m[2].match(us)){
    if(e=document.getElementById(dv))e.style.display = 'none';
    dv = null;
  }
}