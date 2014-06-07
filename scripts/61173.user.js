// ==UserScript==
// @name           clubic_ForceVideo
// @namespace      <p>theslider.free.fr</p>
// @description    crée des liens pour accéder directement à la vidéo bloquée par les pubs
// @include        http://*.clubic.com/api/tv/*
// @include        http://*.jeuxvideo.tv/api/tv/*
// @include        http://*.clubic.com/*
// @include        http://*.jeuxvideo.tv/*
// ==/UserScript==

// vous êtes libres de modifier ce code et de le redistribuer pour en améliorer le fonctionnement.

var idvideo = document.getElementById('id_fiche_video');
var idvideo =  idvideo.getAttribute('value');
if(idvideo){ // jv.fr
    
	var crappyPlayer = document.getElementById('player'); // vire l'ancien player plein de pub
	if (crappyPlayer) {
		crappyPlayer.parentNode.removeChild(crappyPlayer);
	}
	
    var newVid = document.getElementById('id_fiche_video'); // génère un nouveau player
    if (newVid) {
        var newElement = document.createElement('div');
        newElement.innerHTML = 
		'<div id="ha" style="width:650px; height:400px;" >' + 
			'<div>  &nbsp; <hr /> &nbsp; ' +
				'<object width="640px" height="390px">' +
					'<param name="movie" value="http://www.jeuxvideo.tv/api/tv/embed.swf?file=http://www.jeuxvideo.tv/api/tv/xml.php?id=' + idvideo + '" />' +
					'<param name="quality" value="high" />' +
					'<embed src="http://www.jeuxvideo.tv/api/tv/embed.swf?file=http://www.jeuxvideo.tv/api/tv/xml.php?id=' + idvideo + '" width="640px" height="390px" "quality="high"" />' +
				'</object><hr />' +
			'</div>';
		
        newVid.parentNode.insertBefore(newElement, newVid);
    }
	
	GM_xmlhttpRequest({	//affiche un lien pour dl le flv via le flux xml
		method: 'GET',
		url: 'http://www.jeuxvideo.tv/api/tv/xml.php?id=' + idvideo,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var entries = dom.getElementsByTagName('location');
			var urlXml = entries[0].textContent;
			document.getElementById('ha').innerHTML += '<a href="' + urlXml + '" style="padding-left:190px;" > télécharger la vidéo au format flv </a> <hr />' +
			'</div>';
		}
	});
}
else{ // clubic

// clubic play['file'] variable

}