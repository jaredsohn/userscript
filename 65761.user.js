// ==UserScript==
// @name           MP3 links for TopTracks
// @namespace      http://localhost
// @include        http://93.185.189.233/lastfm/artist*
// @include        http://localhost/lastfm/artist*
// ==/UserScript==

/* (jQuery is already avaliable on page) */
$ = unsafeWindow.$;
var alertBox = unsafeWindow.alertBox;

var artist = $("a.artist-name span")[0].innerHTML;


/* check version */
var scriptVersion = "2010030705";

var scriptLink = $("#gm_mp3");
var lastVersion = scriptLink.attr('href').replace(/.*lastversion=(.*)/,'$1');

if(lastVersion > scriptVersion)
{
  scriptLink.addClass('updateme');
}
/* /check version */


var links = document.getElementById("toptracks").getElementsByTagName("a");
for each(link in links)
{
	link.addEventListener("click",play,false);
	link.className += " play";
}


function play() {
	var track = this.getElementsByTagName('span')[0].innerHTML;
	var playerContainerId = "playerContainer";
	var pageURL = getSearchURL(artist, track);

 	var _mp3 = this.getAttribute('mp3');
	if(_mp3 != null)
	{
		createPlayer(track, _mp3, playerContainerId);
	}
	else
	{
		var self = this;

		GM_xmlhttpRequest({
			method: 'GET',
			url: pageURL,
			headers: {
							'User-agent': '	Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6',
							'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					},
			onload: function(responseDetails) {
				if(responseDetails.responseText.indexOf('noResultsWhite') == -1)
				{
					var string = responseDetails.responseText.replace(/\s/g,'').replace(/.*id="results"[^\(]*(operate[^\)]*\)).*/,'$1');
					if(string.indexOf('operate') != -1)
					{
						var mp3href = getMP3link(string);
						createPlayer(track, mp3href, playerContainerId);
						self.setAttribute('mp3',mp3href);
						var directlink = document.createElement('a');
						$(directlink).addClass('mp3').attr('href',mp3href).html(artist+' - '+track);
						self.parentNode.appendChild(directlink);
						$('title').html(artist+' - '+track);
					}
				}
				else
				{
					alertBox.show('Sorry, but track "' +track + '" by "' + artist + '" was not found.');
				}
			}
		});

	}

}


function createPlayer(track, mp3href, playerContainerId)
{
	var mp3player = document.createElement('span');
	mp3player.setAttribute('id','player');
	mp3player.innerHTML = mp3href;

	var songData = document.createElement('p');
	songData.setAttribute('id','songData');
	songData.innerHTML = artist + " : " + track;

	var playerContainer = document.getElementById(playerContainerId);
	playerContainer.innerHTML = "";
	playerContainer.appendChild(songData);
	playerContainer.appendChild(mp3player);
	$(playerContainer).show();
	drawPlayer();
}

function drawPlayer()
{
	$("#player").jmp3({width: 400, forecolor: "4dbfff", showfilename: "false", autoplay: "true", repeat: "true"});
}




function getSearchURL(artist, track) {
  var vkSearchString = "http://vkontakte.ru/gsearch.php?section=audio&q=";
  return vkSearchString + encodeURI(artist + ' ' +track);
};

function getMP3link(string) {
  var arr=/operate.*?\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/ (string);
  return "http://cs"+arr[2]+".vkontakte.ru/u"+arr[3]+"/audio/"+arr[4]+".mp3";
}

