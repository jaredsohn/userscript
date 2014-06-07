// ==UserScript==
// @name          Add Spotify to YouTube
// @fullname      Adds a link to Spotify on music videos on YouTube
// @include       *://youtube.*/*watch?v=*
// @include       *://*.youtube.*/*watch?v=*
// ==/UserScript==

var userscript = function()
{

// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main()
{

var videoinfo = {url: top.location.href, complete: 0, text: "", timer: null, running: 0}

function IsMusic()
{
	if(jQ('#eow-title #watch-headline-show-title').length != 0) return 1;
	if(jQ('#eow-category').text() == "Music") return 1;
	
	var metadata = jQ('.metadata-info-title');
	for(var i = 0; i < metadata.length; i++)
	{
		if(metadata[i].innerText.match(/Buy ".*?" on|Artist/) != null) return 1;
	}
	return 0;
}

function GetVideoTitle()
{
	var artistname;
	var trackname;
	var fullname;
	
	var artist = jQ('#eow-title #watch-headline-show-title');
	if(artist.length != 0 && !artistname)
	{
		artistname = artist.text();
	}
	
	var artist = jQ('.metadata-info');
	if(artist.length != 0 && !artistname)
	{
		for(var i = 0; i < artist.length; i++)
		{
			var tname = artist[i].innerText.match(/(Artist)[ \n\r]*(.*)/);
			if(tname)
			{
				artistname = tname[2];
				break;
			}
		}
	}
	
	if(!artistname)
	{
		var tname = jQ('#eow-title').text().split('-', 2);
		if(tname.length == 2)
		{
			artistname = tname[0].trim();
		}
	}
	
	var track = jQ('.metadata-info-title').text().match(/Buy "(.*?)" on/);
	if(track != null && !trackname)
	{
		trackname = track[1];
	}
	
	if(!trackname)
	{
		//trackname = jQ('#eow-title').text().replace(artistname, "").replace(/-/, '').trim();
		var tname = jQ('#eow-title').text().split('-', 2);
		if(tname.length == 2)
		{
			trackname = tname[1].trim();
		}
		else
		{
			trackname = trackname = jQ('#eow-title').text().replace(/-/, '').trim();
			if(artistname) trackname = trackname.replace(artistname, "");
		}
	}
	
	if(artistname && trackname)
	{
		trackname = trackname.replace(/\((.*?)\)|\[(.*?)\]| (Re)?mastered| f(ea)?t(uring)?(.)? .*|\"|\'/gi, "").trim();
		artistname = artistname.replace(/f(ea)?t(uring)?(.)? .*/gi, "").trim(); //  & .*
		return {artist: artistname, track: trackname};
	}
	else
	{
		if(!artistname) console.log("failed to get artistname");
		if(!trackname) console.log("failed to get trackname");
	}
	return 0;
}

// http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function FindOriginal(title, data)
{
	for(var i = 0; i < Math.min(data.info.num_results, 5); i++)
	{
		track = data.tracks[i];
		if(!track.name.match(new RegExp(escapeRegExp(title.track) + ' .*(radio|clean|remastered)', 'gi')))
		{
			artists = track.artists;
			for(var x = 0; x < artists.length; x++)
			{
				/*if(artists[x].name.match(new RegExp(escapeRegExp(title.artist), 'gi')))
				{
					return i;
				}*/
				return i;
			}
		}
	}
	return 0;
}

function AddSpotify()
{
	videoinfo.complete = 0;
	if(IsMusic())
	{
		var title = GetVideoTitle();
		console.log("title", title);
		if(title != 0)
		{
			jQ.getJSON('//ws.spotify.com/search/1/track.json?q=' + encodeURIComponent(title.artist + " " + title.track), function(data)
			{
				console.log("data", data);
				console.log("fullname:", title.artist, title.track);
				if(data.info.num_results > 0)
				{
					var artists = [];
					var index = FindOriginal(title, data);
					console.log("Index", index, "selected");
					var track = data.tracks[index];
					jQ.each(track.artists, function(key, val) { artists.push('<a href="' + val.href + '">' + val.name + '</a>'); });
					var artistsname = artists.join(", ");
					var trackname = track.name;
					
					var htmloutput =  '<div class="youtubespotify" style="font-size: 70%"><a href="' + track.href + '">';
					htmloutput += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAQhSURBVDhPhZVtSJ11GMZ/zznHoz56XHbsbFmtpgj5khuZWCO3hDnG+tLqy+hDRRBsxPoSFX4IIigZsQjWgogFoygI5iAsSpdrMqHhXEKzCUujhWe+TI969OiZL6frfp4jKS12w9/n5fz/131d133fj05GwW1iLn2D38eOE5/tYCZ9lZXVFMGAy6a8SkqL9lIVO0Jh7r3Z3RvjP6BLKwucvlJPfGaASC7khiAnAAEHVrVzeRXSy5C8hcCrebaml5xgfva0HxtAryfO8nV/s9hAfo7Agj5gSNdgFnRJoMsrlhwWBD6zCAe3d7K1eE8WRQSyV/5KdPJFXzPFAswTu5BAbBlwWCuknXYNWxItS5anZ9v/5eVm7/xaeExN8tEul6irQ2KYFxZTk677sMnX4VUxzJh0yV5Mw60sW1t2P5mCN5tSnhUe6KneGqZSA0TvgoICGP0TRq7B9LgAtNmkF0SgZAtsrZCX5ahw8nVOBZ0XqGxIKdndbjUv1F/BSS7GM8fOlXJ/DL7/HNpOZDXcIcoqoek52HNQKvQ8nYAJJXm9KU5w30vhd0aTF4iIyTcfQkLs8mTDw49C7ePwSIPud8ADYle4CeaTYib5iZvwazec/kRqxHbHLv99KBDGOXWxLjM+1+cVJ1KkrEsC2OZLtoIEtRzdo8pbn1gHTAmwux3OnIThAY8477WpDlGI5tfhHPvJ1TYzWC9VyckR6NGBod/k7XV5NiNwFS66GR6Un1WPwZNPw5aH/Nbq74HBfmh8xveYjIvT+iMZrx+1jOnLdX5mC0csTfKyirAgiesjdh+82AIN++TnlGzR7zYYVjTng05XqlKeVFeDMdirKqpotU8okSyxSTL5ASWdHIW+8/DzGbh0zgff3givfQSz0/5gOIjpyZ66zFiyj1wdMv+K7/F9HZb88az8gL1XovIa2FblK5iehI/f0rtaST8gA9V6xnJzkTztGmzJdP/RiivfCtUBX7XChW99Fv8XO/fD828okXw2hgsCtL61Xm2saMGZXYhn3v2ulJJCydUEJSRx4m+oVEGMdUjvzAIbgpFh+OUHaFfVLQ4dVeFkU1rzb6CT8vXt/XF/oj7trmF0dsBrKwO2tarKWhvZMk9tBe13G195365BqdkpdcX+qKZlWUxfrUO7NFEGarPf0uZSrBG1/jRmawXyelRhF8uxFiGBW7NbWxnLaSl5/4A/+7Jc2XVz+KkOJjQta5usPby17tm76tmYpSR1Sezs+abOHd7d4eFYeEy9O8XQxFlOdDUT0RDY18ljqvdrbC1st+eK/li15+Tnq02dlMX+/Z5uALUwKz47X8+1sQEKJNH7QEuPJ187V7SM3bwqXRGr5pXdd/jyr4/k4g0uDh9naLxD8q6SXkmpl11KIpWUx/bSUHZEim73Pwr+AWfotNJ4G681AAAAAElFTkSuQmCC">';
					htmloutput += ' ' + trackname + '</a> - ' + artistsname + '</div>';
					jQ('.youtubespotify').remove();
					jQ('#watch-headline-title').append(htmloutput);
				}
				else
				{
					jQ('.youtubespotify').remove();
					console.log("No song found");
				}
			});
		} else
		{
			jQ('.youtubespotify').remove();
			console.log("failed to get title");
		}
	}
	else
	{
		console.log("not music!!");
	}
	
	videoinfo.complete = 1;
	videoinfo.url = top.location.href;
	videoinfo.text = jQ('#eow-title').text().trim();
}

AddSpotify();

function timerfunction()
{
	videoinfo.running = 1;
	if(videoinfo.complete && videoinfo.url != top.location.href)
	{
		if(videoinfo.text != jQ('#eow-title').text().trim())
		{
			AddSpotify();
		}
	}
}

window.addEventListener('focus', function()
{
	clearInterval(videoinfo.timer);
	if(!videoinfo.running) videoinfo.timer = setInterval(timerfunction, 1000);
});

window.addEventListener('blur', function()
{
	clearInterval(videoinfo.timer);
	videoinfo.running = 0;
});

}

addJQuery(main);

};

// http://stackoverflow.com/questions/7971930/how-to-call-youtube-flash-api-of-existing-videos-using-greasemonkey
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node(null, null, userscript);