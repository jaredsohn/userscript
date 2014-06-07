// ==UserScript==
// @name           DeviantArt V7 search bar
// @description    Adds an search bar to the bottom of the page.
// @namespace      http://www.robinhuisman.nl
// @author         Robin Huisman
// @version        1.2
// @include        http://*.deviantart.com/*
// @exclude        http://chat.deviantart.com/chat/*

// ==/UserScript==
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


var $, searchMode;

// "top" for search box in the top header, "bottom" for a seperate search bar
searchMode = "bottom";

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
function letsJQuery() {
	var searchBar, searchBox, searchInput, searchAction, searchQuery, searchFocus;
	if(searchMode == "bottom"){
		// begin bottom mode
		searchFocus = false;
		searchBar = $("<div />", { css: { height: "20px", width: "100%", background: "url('http://st.deviantart.net/minish/browse/bthead.png') 0px 0px repeat-x", borderTop: "1px solid #fff", position: "fixed", left: 0, bottom: -30, zIndex: 1000, padding: "8px 8px 10px 8px", opacity: 0.8 },
			mouseover: function() {
				searchBar.stop();
				searchBar.animate({ opacity: 1.0, bottom: 0 }, 200, "easeOutQuad");
			},
			mouseleave: function() {
				if(!searchFocus){
					searchBar.stop();
					searchBar.animate({ opacity: 0.8, bottom: -30 }, 200, "linear");
				}
			},
			click: function() {
				$("#searchInputv7").focus();
			}
		}).appendTo("body");
		// end bottom mode
	}else {
		// begin top mode
		searchBar = $("<div />", { css: { marginTop: -5 } }).appendTo(".oh-hs");
		// end bottom mode
	};
	
	if($("#searchInput").length == 1) {
		searchAction = $("#search7").attr("action");
		searchQuery = $("#searchInput").attr("value");
	}else {
		searchAction = "http://browse.deviantart.com/";
		searchQuery = "";
	}
	
	searchBox = $('<form id="searchv7" method="get" class="" action="' + searchAction + '"><input id="searchinput-qh" name="qh" value="" type="hidden"><input name="section" value="" id="searchSection" type="hidden"><input id="searchInputv7" class="gmbutton2 gmbutton2f" name="q" accesskey="s" value="' + searchQuery + '" type="text" style="float: left;"><span class="scripted" style="float: left; margin-left: -6px;"><a class="gmbutton2 gmbutton2f" href="" onclick="document.getElementById(\'searchv7\').submit();if (window.event)event.cancelBubble=1;return false" style="color: #4C645E;">Search<b></b></a></span>').appendTo(searchBar);
	if(searchMode == "bottom"){
		$("#searchInputv7").width(300);
		$('#searchInputv7').focus( function() {
			searchFocus = true;
		}).blur( function() {
			searchFocus = false;
			searchBar.animate({ opacity: 0.8, bottom: -30 }, 200, "linear");
		});
	}
};

