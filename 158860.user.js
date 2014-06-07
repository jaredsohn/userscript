/*
    Following code belongs to Embedded Player Support for Google+.
    Copyright (C) 2013 Jackson Tan
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id		EmbeddedPlayerSupport
// @name		Embedded Player Support for Google+
// @version	0.6.0
// @namespace	gplus.embeddedPlayerSupport
// @author	Jackson Tan
// @description	Add embedded player support for your Google+. Once enabled, you can play videos from many popular video sites directly in the embedded video player on your G+.
// @match	https://plus.google.com/*
// @run-at	document-end
// ==/UserScript==

GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

function insertPlayers(content){
	for(var i = 0; i < content.snapshotLength; i++) {
		var insertContent = content.snapshotItem(i);
		if(insertContent.hasAttribute("Player")) return;
		var nicoReg = /http\:\/\/[www|live]*?.nicovideo.jp\/watch\/[a-z]+?[a-z]+?[0-9]+/gi;
		var youkuReg = /http\:\/\/v.youku.com\/v_show\/id_.+?\./gi;
		var biliReg = /http\:\/\/[www]*?.bilibili.tv\/video\/av[0-9]+/gi;
		var acReg = /http:\/\/[www]*?.acfun.[tv|com]+?\/v\/ac[0-9]+/gi;
	    if(insertContent.innerHTML.match(nicoReg)){
	        var videoURL = insertContent.innerHTML.match(nicoReg)[0].toString();
			var videoIdReg = /watch\/([^\"]+)/gi;
			var videoID = videoIdReg.exec(videoURL);
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
			    if (ajax.readyState == 4 && ajax.status == 200) {
			        insertContent.innerHTML = ("<iframe src='http://res.nimg.jp/swf/player/nicoplayer.swf?ts=1366880783&v=" + videoID[1] + "&w=440&h=400' width='440' height='400' scrolling='none' marginwidth='0' marginheight='0' frameborder='0'></iframe>");
			        if (insertContent.parentNode.parentNode.parentNode.className.match("Ry JDeJO")) {
			            insertContent.parentNode.parentNode.parentNode.style.margin = "0px -18px";
			            insertContent.parentNode.parentNode.style.height = "420px";
			        }
			        else if (insertContent.parentNode.parentNode.parentNode.className.match("JDeJO")) {
			            insertContent.parentNode.parentNode.style.margin = "-20px 0px 0px -10px;";
			            insertContent.parentNode.parentNode.style.height = "420px";
			        }
			    };
			};
			ajax.open('GET', videoURL + '?t=' + Math.random(), true);
			ajax.send();
			if (insertContent.previousSibling != null)
			    insertContent.previousSibling.style.display = "none";
	    }
	    /*if (insertContent.innerHTML.match(nicoReg)) {
	        var videoURL = insertContent.innerHTML.match(nicoReg).toString();
	        var videoIdReg = /watch\/([^\"]+)/gi;
	        var videoID = videoIdReg.exec(videoURL);
	        insertContent.innerHTML = ("<iframe src='http://nicosound.anyap.info/nicothumb.aspx?v=" + videoID[1] + "' width='554' height='502' scrolling='none' marginwidth='0' marginheight='0' frameborder='0'></iframe>");
	        if (insertContent.previousSibling != null)
	            insertContent.previousSibling.style.display = "none";
	    }*/
		if (insertContent.innerHTML.match(youkuReg)){
		    var videoURL = insertContent.innerHTML.match(youkuReg)[0].toString();
			var videoIdReg = /\/id_([^\.]+)/gi;
			var videoID = videoIdReg.exec(videoURL);
			insertContent.innerHTML = ("<iframe src='http://player.youku.com/player.php/sid/" + videoID[1] + "/v.swf' width='440' height='400' scrolling='none' marginwidth='0' marginheight='0' frameborder='0'></iframe>");
			if (insertContent.parentNode.parentNode.parentNode.className.match("Ry JDeJO")) {
			    insertContent.parentNode.parentNode.parentNode.style.margin = "0px -18px";
			    insertContent.parentNode.parentNode.style.height = "420px";
			}
			else if (insertContent.parentNode.parentNode.parentNode.className.match("JDeJO")) {
			    insertContent.parentNode.parentNode.style.margin = "-20px 0px 0px -10px;";
			    insertContent.parentNode.parentNode.style.height = "420px";
			}
			if (insertContent.previousSibling != null)
			    insertContent.previousSibling.style.display = "none";
		}
		else if (insertContent.innerHTML.match(biliReg)){
			var videoURL = insertContent.innerHTML.match(biliReg)[0].toString();
			var videoIdReg = /video\/av([^\"]+)/gi;
			var videoID = videoIdReg.exec(videoURL);
			insertContent.innerHTML = ("<iframe src='http://static.loli.my/miniloader.swf?aid=" + videoID[1] + "' width='440' height='400' scrolling='none' marginwidth='0' marginheight='0' frameborder='0'></iframe>");
			if (insertContent.parentNode.parentNode.parentNode.className.match("Ry JDeJO")) {
			    insertContent.parentNode.parentNode.parentNode.style.margin = "0px -18px";
			    insertContent.parentNode.parentNode.style.height = "420px";
			}
			else if (insertContent.parentNode.parentNode.parentNode.className.match("JDeJO")) {
			    insertContent.parentNode.parentNode.style.margin = "-20px 0px 0px -10px;";
			    insertContent.parentNode.parentNode.style.height = "420px";
			}
			if (insertContent.previousSibling != null)
			    insertContent.previousSibling.style.display = "none";
		}
		else if (insertContent.innerHTML.match(acReg)){
		    var videoURL = insertContent.innerHTML.match(acReg)[0].toString();
			var ajax = new XMLHttpRequest();
    		ajax.onreadystatechange = function () {
        		if (ajax.readyState == 4 && ajax.status == 200) {
            		var acXML = ajax.response;
            		//var videoIdReg = /"flashvars" value="vid=([0-9]{6})&amp;system=([^\.]+)&amp;type/;
            		var videoIdReg = /\[video\]([0-9]{6})\[\/video\]/i;
					var videoID = videoIdReg.exec(acXML)[1];
					//var videoSystem = videoIdReg.exec(acXML)[2];
					var videoSystem = "Artemis";
					console.log(videoID);
					console.log(videoSystem);
					insertContent.innerHTML = ("<iframe src='http://static.acfun.tv/player/ACFlashPlayer.out.swf?type=video&vid=" + videoID + "&system=" + videoSystem + "' width='440' height='400' scrolling='none' marginwidth='0' marginheight='0' frameborder='0'></iframe>");
					if (insertContent.parentNode.parentNode.parentNode.className.match("Ry JDeJO")) {
					    insertContent.parentNode.parentNode.parentNode.style.margin = "0px -18px";
					    insertContent.parentNode.parentNode.style.height = "420px";
					}
					else if (insertContent.parentNode.parentNode.parentNode.className.match("JDeJO")) {
					    insertContent.parentNode.parentNode.style.margin = "-20px 0px 0px -10px;";
					    insertContent.parentNode.parentNode.style.height = "420px";
					}
        		};
			};
			ajax.open('GET', videoURL + '?t=' + Math.random(), true);
			ajax.send();
			if (insertContent.previousSibling != null)
			    insertContent.previousSibling.style.display = "none";
		};
		insertContent.setAttribute("Player", "playerInserted");
	}
	delete content;
}

//Match links in all posts and appened player iframe to corresponding posts.
function processPosts(node) {
	if(!node || !node.querySelector) return;
	var post = document.evaluate('descendant-or-self::div[@class="yF"]', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	insertPlayers(post);
}
		
//First process of the toolbars
processPosts(document.body);

//Handle newly added posts
document.body.addEventListener('DOMNodeInserted', function(e) {
	if(!e) e = event;
	processPosts(e.target);
}, false);