// ==UserScript==
// @name        nowait
// @namespace   Test
// @include     http://streamcloud.eu/*
// @version     1
// @grant       none
// ==/UserScript==
$("#countdown").remove();
							$("#btn_download").removeClass("grey");
							$("#btn_download").addClass("blue");
							$('#btn_download').removeAttr("disabled");