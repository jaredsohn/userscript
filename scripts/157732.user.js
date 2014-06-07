// ==UserScript==
// @name           extendInfoQ
// @namespace      http://userscripts.org/users/sipm.neusoft.com:8089
// @include  http://www.infoq.com/cn/*
// @require    http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @updateURL     http://userscripts.org/scripts/source/157732.meta.js
// @downloadURL   http://userscripts.org/scripts/source/157732.user.js
// ==/UserScript==

//alert(document.getElementById("content").style);
//document.getElementById("content-wrapper").style.width = "140%";
// alert($("#content-wrapper"));
$("#content-wrapper").css("width","130%");
$("#rightbar").remove();
$(".vendor-content-box-float").remove();
// alert(document.getElementById("content-wrapper").style);