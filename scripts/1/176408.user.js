// ==UserScript==
// @name           LeakForums - Smiley Collection
// @namespace      MikE/Smileys
// @description    Gives you access to a wider collection of smilies to use on LeakForums.org
// @author         Mike
// @copyright      Mike 2013 (http://userscripts.org/users/429026)
// @licence        GNU General Public License
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. For a copy, see http://www.gnu.org/licenses/. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.use
//
// @match          *://*.leak.sx/showthread.php*
// @match          *://leak.sx/showthread.php*
//
// @match          *://*.leak.sx/newreply.php*
// @match          *://leak.sx/newreply.php*
//
// @match          *://*.leak.sx/newthread.php*
// @match          *://leak.sx/newthread.php*
//
// @match          *://*.leak.sx/editpost.php*
// @match          *://leak.sx/editpost.php*
//
// @match          *://*.leak.sx/smile.php*
// @match          *://leak.sx/smile.php*
//
// @version        1.1
// @downloadURL    https://userscripts.org/scripts/source/176408.user.js
// @updateURL      https://userscripts.org/scripts/source/176408.meta.js
//
// @icon           http://www.leak.sx/images/pro_star2.png
// @icon64         http://www.leak.sx/images/pro_star2.png
//
// @history        1.0.0 - Script created
// @history        1.0.1 - Fixed A LOT of bugs
// @history        1.0.2 - Fixed match patterns to work on new leak.sx domain
// @history        1.1   - Updated css and other things to match leak.sx's style
// ==/UserScript==

(function() {
    var smileys = Array();

    function getSmileys() {
        var smileysAll,i;

        GM_xmlhttpRequest({
            method: "GET",
            url: "http://pastebin.com/raw.php?i=c2Ye6SXw",
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
	        document.head.innerHTML = '<title>Leak.sx - Smilies Listing</title><link type="text/css" rel="stylesheet" href="http://leak.sx/cache/themes/theme995/global.css"/><link type="text/css" rel="stylesheet" href="http://leak.sx/theme_x.css?189,192,193"/>';
	        document.body.innerHTML = '<table id="listing" class="tborder" cellspacing="0" cellpadding="4" border="0"><tbody><tr><td colspan="2">Simley Listing</td></tr></tbody></table>';
	        
	        var table = document.getElementById("listing").getElementsByTagName("tbody")[0];
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