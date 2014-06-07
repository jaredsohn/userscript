// ==UserScript==
// @name		douban visited link
// @description	douban group visited link add color
// @include		http://www.douban.com/group/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author		Van De Ripper
// ==/UserScript==

$(document).ready(function(){$("<style type='text/css'>#content .article .indent tr td a:visited{color:#C09!important;}</style>").appendTo("head");});