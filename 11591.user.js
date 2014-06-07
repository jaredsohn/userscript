// ==UserScript==
// @name           TorrentFive_Enhancer
// @namespace      http://www.torrentfive.com/
// @description    Add workable imdb links, add a direct download button to the torrent and remove banners
// @include        http://www.torrentfive.com/*
// ==/UserScript==


while (document.getElementById('banner1')) {
	var ref = document.getElementById('banner1');
	ref.parentNode.removeChild(ref);
}
while (document.getElementById('banner2')) {
	var ref = document.getElementById('banner2');
	ref.parentNode.removeChild(ref);
}

var layref = document.getElementById('Layer1');
if (layref != null) 
	layref.parentNode.removeChild(layref);


var osdivs = document.getElementsByTagName('div');
var total = 0;
for (var i = 0, len = osdivs.length; i < len; i++) {  
	var ref = osdivs[i];
	var aclass = ref.getAttribute("class")
	if (aclass == "titulo") {		
		var url = ref.firstChild; 
		if (typeof(url.href) != 'undefined') { 
			var olink = url.href.split('/'); 
			var downloadlink = "&nbsp;<a href=\"http://www.torrentfive.com/request.php?id=" + olink[4] + "\" target=\"_self\" style=\"color:#FF0000; font-family:'Times New Roman', Times, serif\">Download</a>";
			ref.innerHTML += downloadlink;		
		}		
	}
    else if (aclass == "texto") { 
		var texto = ref.innerHTML;
		var match = /http:\/\/.+/.exec(texto); 
		if (match) != 'undefined') {
			var url = match[0].substring(0,match[0].length - 4);
			texto = texto.replace(/http:\/\/.+/,"<a href=\"" + url + "\" target=\"_blank\">"+ url +"</a><br>");									
			ref.innerHTML = texto;
			
		}
    }
}

