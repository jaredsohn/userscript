// ==UserScript==
// @name           UserScripts -> Auto-Favorite Scripts You Install
// @namespace      #aVg
// @include        http://userscripts.org/scripts/show/*
// @version        0.1
// ==/UserScript==
var sid = location.pathname.match(/show\/(\d+)/)[1];
function $(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
$("//a[@class='userjs']").addEventListener("click", function(E) {
	E.preventDefault();
	unsafeWindow.$.ajax({
		data : "authenticity_token=" + encodeURIComponent(unsafeWindow.auth_token),
		dataType : "script",
		type : "post",
		url : "/scripts/favorite/" + sid,
		success : function() {
			location.href = "http://userscripts.org/scripts/source/"+sid+".user.js";
		}
	});
}, false);