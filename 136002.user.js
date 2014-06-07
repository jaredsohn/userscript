// ==UserScript==
// @name           openmylist for ZeroWatch
// @include        http://www.nicovideo.jp/watch/*
// @version        1.0.0
// ==/UserScript==

(function(){
	var url = createSoundUrl( location.pathname );
	
	var widthLeft = document.getElementById('siteHeaderLeftMenu');
	if (widthLeft) {
		var link = document.createElement('li');
		link.innerHTML = '<a href="' + url + '" style="border-left:#383838 solid 1px; border-right:none;"><span style="border-left:#666 solid 1px; border-right:none;">公開マイリスト</span></a>';
		
		widthLeft.parentNode.appendChild(link);
	}

})();

function createSoundUrl( sourcePathname ){
	var url = 'http://www.nicovideo.jp/';
	var openlist = 'openlist/';
	var videoId;
	var m = sourcePathname.match( /^\/watch\/([a-z]{2}[0-9]+)/i );
	if(m)
	{
		videoId = m[1];
	}
	else
	{	// thread check
		if('Video' in window)
		{
			videoId = Video.id;
		}
		else
		{
			var head = document.getElementsByTagName('head')[0];
			if(head)
			{
				m = head.innerHTML.match( /http:\/\/m\.nicovideo\.jp\/watch\/([a-z]{2}[0-9]{3,})/i );
				if(m && m.length > 1)
				{
					videoId = m[1];
				}
			}
		}
	}
	if(videoId)
	{
		return url + openlist + videoId;
	}
	
	
	return url;
}