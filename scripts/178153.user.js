// ==UserScript==
// @name monstrochan salsa
// @description MONSTROCHAN FTW!
// @include       *monstrochan.org*
// ==/UserScript==

function monstro() {
	var spans=document.getElementsByTagName("span");
	for (i=0; i<spans.length; i++) {
		if(spans[i].className == "filesize") {
			var check = spans[i].getElementsByClassName("salsa");
			if(check.length == 0) {
				var links = spans[i].getElementsByTagName("a");
				var google = "http://Google.com/searchbyimage?hl=en&site=search&image_url="+escape(links[0].href);
				spans[i].innerHTML += " <a class= \"salsa\" href=\""+google+"\" target=\"_blank\" title=\"Google Reverse Image Search\" style='cursor:help;'><img src=\"http://icons.iconarchive.com/icons/yootheme/social-bookmark/16/social-google-box-icon.png\" alt=\"buscar imagen en google\"></a>";
				
			}
		}
	}
}

setInterval(monstro,500);
