// ==UserScript==
// @name        streamcloud
// @description streamcloud countdown bypass
// @include     http://streamcloud.eu/*
// @include     http://www.streamcloud.eu/*
// @version     1
// @copyright   roxx789
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$("#countdown").remove();

$("#btn_download").removeClass("grey");

$("#btn_download").addClass("blue");

$('#btn_download').removeAttr("disabled")