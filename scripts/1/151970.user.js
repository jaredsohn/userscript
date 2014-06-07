// ==UserScript==
// @name           Elisa Viihde: Add download links to recordings
// @namespace      ElisaViihdeAddDownloadLinksToRecordings
// @description    Adds download links to the main page on recordings. This one works (2012).
// @include        http://elisaviihde.fi/etvrecorder/*
// ==/UserScript==

function processProgs() {
	var x = 0;
	var progs = document.getElementsByClassName('programview');
        if(progs.length == 0){progs = document.getElementsByClassName('recordings_table');}
	for (var p=0; p < progs.length; p++) {
		x++;
		var watch = progs[p].getElementsByClassName('play_btn')[0];
		var progurl = watch.getAttribute('href');
		
		watch.parentNode.innerHTML+='<a id="downloadLink' + x + '" class="downloadLink" href="#">Download</a>';
		watchParent = progs[p].getElementsByClassName('play_btn')[0].parentNode;
		download = watchParent.parentNode.getElementsByClassName('downloadLink')[0]

		download.setAttribute('onclick','var req=new XMLHttpRequest();req.onreadystatechange=function(){if(req.readyState==4&&req.status==200){ var url=req.responseText.match(/(http\\\:\\\/\\\/tvmedia.+?)\\\"/i); if(url){ document.getElementById("downloadLink' + x + '").setAttribute("href",url[1]);window.location=url[1];} } else {}};req.open("GET","http://elisaviihde.fi/etvrecorder/' + progurl + '",true);req.send(null);');

	}
}

processProgs();