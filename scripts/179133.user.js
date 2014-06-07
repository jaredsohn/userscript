// ==UserScript==
// @name        unlinked API plugin
// @description Receive information about deleted YouTube videos and allow user to mark video for caching using unlinked API
// @version     1.0.1
// @include     https://www.youtube.com/*
// @include     http://www.youtube.com/*
// ==/UserScript==

(function() {
	if ( window.location.host == "www.youtube.com" && window.location.pathname == "/watch" ) {
		window.addEventListener("load",load,false);
	}
})();

function load(){
	console.log(">>>unlinked loaded!");
	var anchor = "watch7-subscription-container";
	var anchor_feather = "usu";
	if ( document.getElementById(anchor) == undefined ) {
		if ( document.getElementById(anchor_feather) == undefined ) {
			return false; 
		}
		anchor = anchor_feather;
	}
	var parentTitle = document.getElementById(anchor).parentNode;
	var btn = document.createElement("button");
	btn.id = "unlinked"
	btn.className = "yt-uix-button yt-uix-button-subscribe-branded yt-uix-button-size-default yt-uix-tooltip";
	btn.style = "margin-left: 8px;";
	btn.innerHTML = "beacon";
	btn.setAttribute("data-tooltip-text","unlinked beacon");
	btn.addEventListener('click', mySuperFunc, false);
	parentTitle.insertBefore(btn, document.getElementById(anchor));
}
var mySuperFunc = function() {
	// stolen from http://stackoverflow.com/posts/979995/revisions
	var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
			// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
		  query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		  var arr = [ query_string[pair[0]], pair[1] ];
		  query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
		  query_string[pair[0]].push(pair[1]);
		}
	  } 
		return query_string;
	}();
	if ( QueryString.v != undefined && QueryString.v != "" ) {
		var b=document.getElementById("unlinked");
		b.innerHTML = "Request Sent";
		callAjax("http://yutsuku.net/unlinked/api/?action=beacon&video=" + QueryString.v, function(state) {
			b.innerHTML = "Done";
			b.removeEventListener("click", mySuperFunc);
		});
	}
	function callAjax(url, callback){
		var xmlhttp;
		// compatible with IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
				callback(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
}