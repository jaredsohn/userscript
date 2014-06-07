// ==UserScript==
// @name           LeakForums - Smiley Collection
// @namespace      MikE/Smileys
// @description    Gives you access to a wider collection of smilies to use on LeakForums.org
// @author         Mike
// @copyright      Mike 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see http://www.gnu.org/licenses/. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leakforums.org/showthread.php*
// @match          *://leakforums.org/showthread.php*
//
// @match          *://*.leakforums.org/newreply.php*
// @match          *://leakforums.org/newreply.php*
//
// @match          *://*.leakforums.org/newthread.php*
// @match          *://leakforums.org/newthread.php*
//
// @match          *://*.leakforums.org/editpost.php*
// @match          *://leakforums.org/editpost.php*
//
// @match          *://*.leakforums.org/smile.php*
// @match          *://leakforums.org/smile.php*
//
// @version        1.0.1
// @downloadURL    https://userscripts.org/scripts/source/176408.user.js
// @updateURL      https://userscripts.org/scripts/source/176408.meta.js
//
// @icon           http://www.leakforums.org/images/pro_star2.png
// @icon64         http://www.leakforums.org/images/pro_star2.png
//
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed A LOT of bugs
// ==/UserScript==

(function() {
    var smileys = Array();
    var smileyPage = atob("PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPiANCjxodG1sIHhtbDpsYW5nPSJlbiIgbGFuZz0iZW4iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIj4NCgk8aGVhZD4NCgkJPHRpdGxlPkxlYWsgRm9ydW1zIC0gU21pbGV5IExpc3Rpbmc8L3RpdGxlPg0KCQk8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vbmV0ZG5hLmxlYWtmb3J1bXMub3JnL2Nzcy5waHA/c3R5bGVzaGVldD0xMjkiLz4NCgkJPGxpbmsgdHlwZT0idGV4dC9jc3MiIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cDovL25ldGRuYS5sZWFrZm9ydW1zLm9yZy9jYWNoZS90aGVtZXMvdGhlbWUyMS9nZW5lcmFsLmNzcyIvPg0KCQk8bGluayB0eXBlPSJ0ZXh0L2NzcyIgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwOi8vbmV0ZG5hLmxlYWtmb3J1bXMub3JnL2Nzcy5waHA/c3R5bGVzaGVldD0xNDEiLz4NCgkJPGxpbmsgcmVsPSJpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9Imh0dHA6Ly9uZXRkbmEubGVha2ZvcnVtcy5vcmcvaW1hZ2VzL0xlYWtGb3J1bXNGb3VyL2Zhdmljb24ucG5nIj4gDQoJPC9oZWFkPg0KCTxib2R5Pg0KCQk8dGFibGUgYm9yZGVyPSIwIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjQiIGNsYXNzPSJ0Ym9yZGVyIiBpZD0ibGlzdGluZyI+DQoJCQk8dHI+DQoJCQkJPHRkIGNsYXNzPSJ0aGVhZCIgY29sc3Bhbj0iMiI+U21pbGV5IExpc3Rpbmc8L3RkPg0KCQkJPC90cj4NCgkJPC90YWJsZT4NCgk8L2JvZHk+DQo8L2h0bWw+");
    
    function getSmileys() {
        var smileysAll,i;

        GM_xmlhttpRequest({
            method: "GET",
            url: "http://pastebin.com/raw.php?i=6tEDf65q",
            onload: function(response) {
                smileysAll = response.responseText.split(/\r\n/gim);
                for(i = 0;i < smileysAll.length;++i) {
                    smileys[i] = Array();
                    smileys[i][0] = smileysAll[i].split(/\|\|/gim)[0];
                    smileys[i][1] = smileysAll[i].split(/\|\|/gim)[1];
                }
                
                main();
            }
        });
    }
    
    function main() {
	    if(window.location.toString().indexOf('smile.php') != -1) {
	        document.head.innerHTML = "";
	        document.body.innerHTML = smileyPage;
	        
	        var table = document.getElementById("listing");
            for(var i = 0;i < smileys.length;++i) {
            	var newChild = document.createElement('tr');
                newChild.innerHTML = '<td class="trow1" align="center"><img src="'+smileys[i][1]+'" alt="'+smileys[i][0]+'" class="tooltip" title="'+smileys[i][0]+'"></td><td class="trow1">:'+smileys[i][0]+':</td>';
		        table.appendChild(newChild);
            }
        } else if(window.location.toString().indexOf("showthread.php?tid=") != -1) {
            document.getElementById("quick_reply_submit").addEventListener("mousedown",function (event) {
                for(var i = 0;i < smileys.length;++i) {
                    var pattern = RegExp(":"+smileys[i][0]+":","gim")
                    var link = smileys[i][1];
                    document.getElementById("message").value = document.getElementById("message").value.toString().replace(pattern,"[img]"+link+"[/img]");
                }
            }, false);
                
            var posts = document.getElementById("posts").getElementsByClassName("post_body");
            for(j = 0;j < posts.length;++j)
                posts[j].innerHTML = posts[j].innerHTML.replace(pattern,'<img src="'+link+'" border="0" alt="'+pattern+'" />');
        } else if(window.location.toString().indexOf("newreply.php?tid=") != -1) {
            document.getElementsByName("submit")[0].addEventListener("mousedown", function (event) {
                for(var i = 0;i < smileys.length;++i) {
                    var pattern = RegExp(":"+smileys[i][0]+":","gim");
                    var link = smileys[i][1];
                    document.getElementById("message_new").value = document.getElementById("message_new").value.toString().replace(pattern,"[img]"+link+"[/img]");
                }
            }, false);
        } else if(window.location.toString().indexOf("editpost.php?pid=") != -1) {
            for(var i = 0;i < document.getElementsByName("input")[0].getElementsByClassName("button").length;++i) {
                if(document.getElementsByName("input")[0].getElementsByClassName("button")[i].value=="Update Post") {
                    document.getElementsByName("input")[0].getElementsByClassName("button")[i].addEventListener("mousedown", function (event) {
               			for(var i = 0;i < smileys.length;++i) {
                    		var pattern = RegExp(":"+smileys[i][0]+":","gim");
                    		var link = smileys[i][1];
                    		document.getElementById("message_new").value = document.getElementById("message_new").value.toString().replace(pattern,"[img]"+link+"[/img]");
                		}
                    }, false);
            	}
        	}
    	}
    }
    
    getSmileys();
})();