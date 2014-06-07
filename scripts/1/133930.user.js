// ==UserScript==
// @name       otter3-admin
// @namespace  http://www.zavakid.com/
// @version    0.1
// @description  让 otter3管理页面能在chrome中运行
// @match     http://172.22.3.143/admin/*
// @match     http://172.29.7.105/admin/*
// @match     http://172.20.130.73/admin/*
// @match     http://172.20.144.65/admin/*
// @match     http://172.20.130.77/admin/*
// @match     http://172.30.80.46/admin/*
// @match     http://172.30.96.34/admin/*
// @match     http://172.30.38.15/admin/*
// @match     http://172.30.80.16/admin/*
// @match     http://172.30.38.16/admin/*
// @match     http://172.30.38.14/admin/*
// @match     http://172.16.135.31/admin/*
// @match     http://172.16.197.196/admin/*
// @match     http://172.20.236.27/admin/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  zava
// ==/UserScript==

jQuery(document).ready(function($){
  var statFrame = $("frame[name=statFrame]");
  if(statFrame){
    statFrame.attr("id","statFrame");
  }
  var confFrame = $("frame[name=confFrame]");
  if(confFrame){
    confFrame.attr("id","confFrame");
  }
});