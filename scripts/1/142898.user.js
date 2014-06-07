// ==UserScript==
// @name           Deleted YouTube Videos +
// @version        8.0
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @include        http://youtomb.mit.edu/*
// ==/UserScript==

	if(document.getElementById('watch7-player-unavailable') || document.getElementById('verify'))
	{
	if (document.querySelector('meta[property="og:url"]') == null)
	{
	var video_id = window.location.search.split("v=")[1].substring(0, 11);
	}
	else
	{
	var video_url = document.querySelector('meta[property="og:url"]').getAttribute("content");
    var video_id = video_url.split("v=")[1].substring(0, 11);
	}	
	if(document.getElementById('watch7-player-unavailable'))
	{
		var htitle = document.getElementById('unavailable-message').innerHTML.match("\"[^\"]*\"");
		var ftitle = document.title.slice(0, - 10);
		var vtitle = '';	
		if (htitle == null || htitle == '') {vtitle=ftitle;} else {vtitle=htitle;}
		if (vtitle == 'YouTube - Broadcast' || vtitle == 'YouTube' || vtitle == '')	{vtitle = 'unable to get video title';}
	}
	var deldiv = document.createElement('div');
        deldiv.setAttribute('id', 'deldiv');
        deldiv.setAttribute('style', 'font-weight:bold; background-color:#B01C05; color:white; width:640px; text-align:left;');
		
    if(document.getElementById('watch7-player-age-gate-content'))
	{
		document.getElementById('player').insertBefore(deldiv, document.getElementById('player-api'));	
		deldiv.innerHTML = "This video is age restricted.<br /><a style='color:yellow;' href='http://youtube.googleapis.com/v/"+video_id+"'>Click here</a> to skip the warning and watch the video.";
	}
	else if(document.getElementById('verify'))
	{
        document.getElementById('verify').insertBefore(deldiv, document.getElementById('verify-thumb'));
		deldiv.innerHTML = "This video is age restricted.<br /><a style='color:yellow;' href='http://youtube.googleapis.com/v/"+video_id+"'>Click here</a> to skip the warning and watch the video.";
	}
	else
	{
		document.getElementById('player').insertBefore(deldiv, document.getElementById('player-api'));
		deldiv.innerHTML = "This video has been deleted (or is currently unavailable).<br /><a style='color:yellow;' href='http://youtomb.mit.edu/youtube/"+video_id+"'>Click here</a> to search this video on MIT YouTomb.<br />Search video id ("+video_id+") on <a style='color:yellow;' href='http://www.google.com/search?q="+video_id+"'>Google</a>/<a style='color:yellow;' href='http://www.bing.com/search?q="+video_id+"'>Bing</a>.<br />Search video url on <a style='color:yellow;' href='http://www.google.com/search?q=youtube.com/watch?v="+video_id+"'>Google</a>/<a style='color:yellow;' href='http://www.bing.com/search?q=youtube.com/watch?v="+video_id+"'>Bing</a>.<br />Search video title ("+vtitle+") on <a style='color:yellow;' href='http://www.google.com/search?q="+vtitle+"'>Google</a>/<a style='color:yellow;' href='http://www.bing.com/search?q="+vtitle+"'>Bing</a>.";
	}
	}

	if (document.location.hostname == 'youtomb.mit.edu' && document.title == '500 Internal Server Error' )
	{
        var newpa = document.createElement("p");
            newpa.setAttribute('style', 'font-weight:bold; background-color:#B01C05; color:white; width:auto;');
            newpa.innerHTML = "The error you see now (500 Internal Server Error) means that this video isn't avaiable on MIT YouTomb.";
            document.body.insertBefore(newpa,document.body.firstChild);
	}