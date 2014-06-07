// ==UserScript==
// @name           Add to Gamisfaction from Google Reader
// @namespace      http://gamisfaction.com
// @description    Allow gamisfaction users to program tweets directly from Google Reader
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.es/reader/*
// @include        https://www.google.es/reader/*
// ==/UserScript==

// Program tweets from Google Reader to Gamisfaction
// Adapted from Google reader digg news (http://userscripts.org/scripts/show/10311)

var entries=document.getElementById("entries");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

	function mydump(arr,level) {
	    var dumped_text = "";
	    if(!level) level = 0;

	    var level_padding = "";
	    for(var j=0;j<level+1;j++) level_padding += "    ";

	    if(typeof(arr) == 'object') {  
	        for(var item in arr) {
	            var value = arr[item];

	            if(typeof(value) == 'object') { 
	                dumped_text += level_padding + "'" + item + "' ...\n";
	                dumped_text += mydump(value,level+1);
	            } else {
	                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
	            }
	        }
	    } else { 
	        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	    }
	    return dumped_text;
	}



function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
			if (event.target.className === "entry-actions"){
				// List mode
				var linkbar= event.target;
				var parent= event.target.parentNode;
			} else if (event.target.firstChild.className ==="card card-common"
			    ||  event.target.firstChild.className === "ccard-container card-common"){ 
				// Expanded mode
				var linkbar= event.target.getElementsByClassName("entry-actions")[0];
				var parent= event.target;
			} else
				return;

			var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
			
			var title = parent.getElementsByClassName("entry-title-link")[0].firstChild.nodeValue;
			
			window.setTimeout(function() {
				GM_xmlhttpRequest({
					method: 'HEAD',
					url: link,
					onload: function (responseDetails) {

						var btn= document.createElement("span");
						var tweet = title;
            var url_bit = 'http://www.gamisfaction.com/schedule/tweet?url=' + encodeURIComponent( link ) + '&msg='+encodeURIComponent(tweet);                                               
						btn.innerHTML = '<a href="'+url_bit+'" title="Schedule tweet in Gamisfaction" target="_blank"><img src="http://www.gamisfaction.com/favicon.ico" alt="Schedule tweet at Gamisfaction" style="vertical-align:middle;border:0" /> - Schedule tweet</a>'
						linkbar.appendChild(btn);
					}
				});
			}, 0);


	}
}

