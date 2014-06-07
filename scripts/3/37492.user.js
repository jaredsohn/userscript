// ==UserScript==
// @name           NCore-kep
// @namespace      torrent
// @description    NCore kep include
// @include        http://ncore.nu/letoltes.php*
// @include        http://ncore.cc/letoltes.php*
// ==/UserScript==


function logDiv(msg,x) {
	GM_log("element"+msg+":id="+x.getAttribute("id")+",class="+x.getAttribute("class")+",style="+x.getAttribute("style"));
}


	var rewrite = 0;
	var links = document.getElementsByTagName("a");
	for (var i = 0;i<links.length; i++) {
		var link = links[i];
		var x = link.href.indexOf("kep.php?kep=");
		if (x!=-1) {
			// kep.php?kep=... -> ncorekep.php?kep=...
			var id = link.href.substring(x+12);

			var td = link.parentNode;
			var tr = td.parentNode;
			var table = tr.parentNode;

			var divCenter = table.parentNode.parentNode;
			var divForUsers = divCenter.parentNode;
			var mainDiv = divForUsers.parentNode;

			var newtd = document.createElement("tr");
			newtd.innerHTML = '<td><a href="javascript:torrent('+mainDiv.getAttribute("id")+')"<img src="/ncorekep.php?kep='+id+'"></td>';
			table.appendChild(newtd);


			rewrite++;
		} else {
//			GM_log("a.href : "+link.href);
		}
	}

	for (var i = 0;i<links.length; i++) {
		var link = links[i];
		var x = link.href.indexOf("kep.php?kep=");
		if (x!=-1) {
			var tr = link.parentNode.parentNode;
			tr.parentNode.removeChild(tr);
		}
	}

document.getElementById("kereso_nyitas").style.display ="none";
document.getElementById("kereso_resz").style.display ="block";



