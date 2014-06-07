// ==UserScript==
// @name           Elisa Viihde: Add download links to recordings
// @namespace      ElisaViihdeAddDownloadLinksToRecordings
// @include        http://elisaviihde.fi/etvrecorder/ready.sl?*
// ==/UserScript==

function processProgs() {
	var x = 0;
	var progs = document.getElementsByClassName('programview');
	for (var p=0; p < progs.length; p++) {
		x++;
		var watch = progs[p].getElementsByClassName('watch')[0];
		var progurl = watch.getAttribute('href');
		
		watch.parentNode.innerHTML+='<a id="downloadLink' + x + '" class="downloadLink" href="#">Download</a>';
		watchParent = progs[p].getElementsByClassName('watch')[0].parentNode;
		download = watchParent.parentNode.getElementsByClassName('downloadLink')[0]
		//xmlHttp = new XMLHttpRequest(); 
		//xmlHttp.onreadystatechange = ProcessRequest;
		//xmlHttp.open( "GET", Url, true );
		//xmlHttp.send( null );
		download.setAttribute('onclick','var req=new XMLHttpRequest();req.onreadystatechange=function(){if(req.readyState==4&&req.status==200){ var url = /doGo\\(\\\'(.+?)\\\'\\)/(req.responseText);if(url){document.getElementById("downloadLink' + x + '").setAttribute("href",url[1]);window.location=url[1];} }};req.open("GET","http://elisaviihde.fi/etvrecorder/' + progurl + '",true);req.send(null);');
/*
		GM_xmlhttpRequest ({
				method: 'GET',
				url: 'http://elisaviihde.fi/etvrecorder/' + progurl,
				onload: function (responseDetails) {
					var url = /doGo\(\'(.+?)\'\)/(responseDetails.responseText);
					if (url) {
						download.setAttribute('href',url[1]);
					}
				}
			});
*/
	}
}

processProgs();