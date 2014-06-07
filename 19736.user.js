// ==UserScript==
// @name			goear.com - MP3 Downloader
// @description		Create a toolbar button to download the MP3 from the song that you are listening.
// @version			0.42
// @date			10/17/2008
// @author			Andre Gil
// @include			http*://*goear.com/listen*
// ==/UserScript==

(function () {

	var alreadyDownloaded = false;

	function getMP3Path() {

		var songCode = "";

		if( location.href.indexOf("?v=") > -1 ) {
			// Old version
			songCode = location.href.split("?v=")[1].split("&")[0].split("#")[0];
		}else{
			// New version
			songCode = location.href.split("/")[4];
		}

		if( songCode != "" )
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.goear.com/files/xmlfiles/' + songCode.substr(0,1) + '/secm' + songCode + '.xml',
				onload: parseXml
			});
		}

	}

	function parseXml(request) {

		if(request.readyState == 4 && request.status == 200) {

			var mp3Path = request.responseText;
			var startIndex = mp3Path.indexOf('path="') + 6;

			mp3Path = mp3Path.substr(startIndex);
			mp3Path = mp3Path.substr(0, mp3Path.indexOf('"'));

			createDownloadLink(mp3Path);

		}

	}

	function createDownloadLink( path ) {
		
		if( alreadyDownloaded )
			return;
		
		var fontSize = document.createElement("font");
		fontSize.size = "2";
		fontSize.face = "Arial";
		fontSize.appendChild( document.createTextNode("Download MP3") );

		var downloadLink = document.createElement("a");
		downloadLink.href = "javascript:void(0);";
		downloadLink.appendChild( fontSize );
		downloadLink.addEventListener( 'click', function(){ downloadLink.href = "javascript:void(0);"; alert('Right click here and select "Save Link As..." to download the MP3.'); } , true );
		downloadLink.addEventListener( 'mouseover', function(){ downloadLink.href = path; } , true );

		var linksBar = document.getElementsByTagName("DIV")[1];
		var firstBR = linksBar.getElementsByTagName("BR")[1];
		linksBar.insertBefore( document.createTextNode("- "), firstBR )
		linksBar.insertBefore( downloadLink, firstBR ); // Inser before first BR
		
		alreadyDownloaded = true;

	}

	window.addEventListener( 'load', getMP3Path, true );

})()