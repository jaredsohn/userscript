// ==UserScript==
// @name           Tagesschau.de - video-tag
// @namespace      http://userscripts.org/users/313158
// @description    Replace Flash-Player with video-tag on Tagesschau.de
// @include        http://www.tagesschau.de/*
// @include        http://tagesschau.de/*
// ==/UserScript==

function getTime(sec) {
	var length = sec;
	var min = Math.floor(length/60);
	var sec = length%60;
	if(sec < 10) sec = "0" + sec.toString();
	return min + ":" + sec;
}

function tag() {
		
	var href = new Array();
	var ele = document.getElementsByTagName("a");
	for(var i = 0; i < ele.length; ++i) {
		var tag = ele[i];
		if(tag.href.indexOf("http://tagesschau.vo.llnwd.net/d3/video/") != -1 && tag.href.substr(-3) == "ogv") {
			href.push(tag.href);
		}
	}
		
	for(var i = 0; i < href.length; ++i) {
		
		if(document.body.innerHTML.indexOf("').addClass('tshtmlplayer');") == -1 && document.body.innerHTML.indexOf("projekktor('.tshtmlplayer', {") == -1) {
			var title = document.getElementById("video_caption").innerHTML;
			document.getElementById("media").innerHTML = "<div class=\"fPlayer\"><h2 id=\"video_caption\">" + title + "</h2><video tabindex=\"0\" width=\"514\" src=\"" + href[0] + "\" controls=\"controls\" preload=\"auto\"></video><br><br><div style=\"text-align: center\"><a style=\"text-decoration: none\" href=\"" + href[0] + "\">&rarr; Video herunterladen [*.ogv]<br><span style=\"font-size: 75%\">(Rechtsklick &gt; Speichern unter)</span></a></div><br></div>";
			
			var title = document.getElementById("sendungen").getElementsByClassName("cap")[0];
			title.removeAttribute("href");
			title.style.cursor = "text";
			title.style.textDecoration = "none";
			
			var cap = document.getElementById("listing").getElementsByClassName("cap")[0];
			cap.removeAttribute("href");
			cap.style.cursor = "text";
			cap.style.textDecoration = "none";
			cap.style.fontSize = "90%";
			cap.className = "customcap";
			cap.innerHTML = "<i>(Gesamtl&auml;nge: " + getTime(cap.getAttribute("stop")) + ")</i>"
			cap.style.paddingLeft = "5px";
			
			var list = document.getElementById("listing").getElementsByTagName("a");
			for(var i = 0; i < list.length; ++i) {
				if(list[i].getAttribute("class") != "customcap") {
					list[i].setAttribute("title",list[i].getAttribute("caption"));
					list[i].removeAttribute("href");
					list[i].style.cursor = "text";
					list[i].style.textDecoration = "none";
					list[i].style.paddingLeft = "10px";
					list[i].innerHTML = list[i].innerHTML + "<br><i>Startzeit: " + getTime(list[i].getAttribute("start")) + "</i>";
				}
			}
		
		} else if(document.body.innerHTML.indexOf('class="fPlayer"') != -1) {
			var all = document.getElementsByClassName("fPlayer");
			var sub = document.getElementsByClassName("videoSubline");
			for(var ele = 0; ele < all.length; ++ele) {
				if(ele == i) {
					all[ele].innerHTML = '<video tabindex="0" width="510" src="' + href[i] + '" controls="controls" preload="auto" style="padding: 3px"></video><div style="text-align: center"><span style="font-size: 80%">' + sub[0].innerHTML.split("<br>")[1] + '</span><div style="position: relative; margin-bottom: 5px; font-weight: bold">' + sub[0].getElementsByTagName("strong")[0].innerHTML + '</div><a href="' + href[i] + '" style="text-decoration: none; font-size: 90%">&rarr; Video herunterladen [*.ogv] <span style="font-size: 90%">(Rechtsklick &gt; Speichern unter)</span></a></div>';
				}
			}
		} else {
			var date = document.getElementById("videoOnDemandVideo").getElementsByClassName("videoOnDemandSubline")[0].getElementsByClassName("topline")[0].innerHTML;
			var title = document.getElementById("videoOnDemandVideo").getElementsByClassName("videoOnDemandSubline")[0].getElementsByTagName("h1")[0].innerHTML
			document.getElementById("videoOnDemandVideo").innerHTML = '<div style="text-align: center"><video style="margin-top: 20px" tabindex="0" width="700" src="' + href[i] + '" controls="controls" preload="auto" style="padding: 3px"></video></div><br><div style="font-size: 125%; text-align: center"><span style="font-size: 80%">' + date + '</span><br><span style="font-weight: bold">' + title + '</span><br><br><a style="font-size: 80%; text-decoration: none" href="' + href[0] + '">&rarr; Video herunterladen [*.ogv]<br><span style="font-size: 75%">(Rechtsklick &gt; Speichern unter)</span></a></div><br>';
		}
		
		
	}

	
}

if(document.body) tag()