// ==UserScript==
// @name		58 visited link
// @description	58 list visited link add color
// @include		http://*.58.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @author		Van De Ripper
// ==/UserScript==

$(document).ready(function(){$("<style type='text/css'>#infolist .tblist tr a.t:visited{color:#C09!important;}</style>").appendTo("head");});