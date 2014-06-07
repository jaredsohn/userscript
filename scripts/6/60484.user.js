// ==UserScript==
// @name           iXBT Forum Video Embedder
// @namespace      http://teleum.ru
// @description    Заменяет в сообщениях ссылки на youtube, gametrailers и google video на встроенный видеоплеер
// @include        http://forum.ixbt.com/*
// ==/UserScript==

// basesd on Shawn Parker's code

function embed_yt_gv()
{
	// run it all
	//
	// @return bool
	this.embed_videos = function()
	{
		// get page links
		var links = this.get_yt_gv_links();

		if(links != null)
		{
			// _this fixes variable scoping - not sure how, but it does
			var _this = this;

			// loop through and manipulate the links
			for(var i = 0; i < links.length; i++) { _this.link_router(links[i]); }
		}
		else
		{
			return false;
		}
	}

	// get all the links in a page
	//
	// @return obj - HTML link objects
	this.get_yt_gv_links = function()
	{		
		var page_links = document.evaluate("/html/body/center/table[3]/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr[2]//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);		
		var embed_links = new Array();
		var type;
		
		for(var i = 0; i < page_links.snapshotLength; i++)
		{
			// look for:
			//		youtube.com/watch
			//		video.google.com/videoplay
			// 		gametrailers.com/video
			if( page_links.snapshotItem(i).href.match(/youtube\.com\/watch|video\.google\.com\/videoplay|gametrailers\.com\/(video|user-movie)\/[\w-]+\/\d+/gi) )
			{
				// assign a type to this object
				if(page_links.snapshotItem(i).href.match(/google/gi)) { page_links.snapshotItem(i).type = 'google'; }
				else if(page_links.snapshotItem(i).href.match(/youtube/gi)) { page_links.snapshotItem(i).type = 'youtube'; }
				else { page_links.snapshotItem(i).type = 'gametrailers'; }
				
				// add it to the array
				embed_links.push(page_links.snapshotItem(i));
			}
		}

		if(embed_links.length > 0) { return embed_links; }
		else { return null; }

	}

	// route links to proper processor
	//
	// @param obj - html link
	this.link_router = function(link)
	{
		if(link.type == 'google') { this.replace_google_link(link); }
		else if(link.type == 'youtube') { this.replace_youtube_link(link); }
		else { this.replace_gametrailers_link(link); }
	}

	// replace individual google link
	//
	// @param object link
	this.replace_google_link = function(link)
	{
		// get link
		var googleVars = this.get_key_value_pairs(this.get_query_string(link.href));
		// write to page
		google_object = document.createElement("p");
		google_object.innerHTML = '<embed src="http://video.google.com/googleplayer.swf?docId=' + googleVars['docid'] +
									'" type="application/x-shockwave-flash" id="VideoPlayback" height="326" width="400">';
		link.parentNode.insertBefore(google_object, link.nextSibling);
	}

	// replace individual youtube link
	//
	// @param object link
	this.replace_youtube_link = function(link)
	{
		// get link
		var strippedLink = link.href.split(/&/gm);
		var processedLink = strippedLink[0].replace(/(\/watch\?)|(=)/gm, "/") + '&hl=ru&fs=1&hd=1';

		// write to page
		youtube_object = document.createElement("p");
		youtube_object.innerHTML = '<object width="640" height="505"><param name="movie" value="' + processedLink +
									'"></param><param name="allowFullScreen" value="true"></param>' +
									'<param name="allowscriptaccess" value="always"></param>' +									
									'<embed src="' + processedLink +
									'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="505"></embed></object>';
		link.parentNode.insertBefore(youtube_object, link.nextSibling);
	}


	// replace individual gametrailers link
	//
	// @param object link
	this.replace_gametrailers_link = function(link)
	{
		// get link
		var gametrailers_id = link.href.match(/(gametrailers\.com\/)(video|user-movie)\/([\w-]+\/)(\d+)/m)[4];
		if(link.href.match(/gametrailers\.com\/user-movie\//m))
		{
			var processedLink = 'http://www.gametrailers.com/remote_wrap.php?umid=' + gametrailers_id;
		} else
		{
			var processedLink = 'http://www.gametrailers.com/remote_wrap.php?mid=' + gametrailers_id;
		}

		// write to page
		gametrailers_object = document.createElement("p");
		gametrailers_object.innerHTML = '<object width="480" height="392">' +
									'<param name="movie" value="' + processedLink +
									'"></param><param name="allowFullScreen" value="true"></param>' +
									'<param name="quality" value="high"></param>' +	
									'<embed src="' + processedLink +
									'" swLiveConnect="true" name="gtembed" allowScriptAccess="sameDomain" allowFullScreen="true" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="480" height="392"></embed></object>';
		link.parentNode.insertBefore(gametrailers_object, link.nextSibling);
	}	
	
	// Get the query string of a url
	//
	// @param string - url
	// @return string - get vars
	this.get_query_string = function(uri)
	{
		return uri.substr(uri.indexOf('?')+1);
	}


	// get the key/value pairs of a GET string
	//
	// @param string - GET string
	// @return array - key/value pairs
	this.get_key_value_pairs = function(get_string)
	{
		// break string into pair strings
		var parts = get_string.split(/&/);

		if(parts.length > 0)
		{
			// array for our key/value pairs
			var get_vars = new Array();
			var temp;
			// get key/value pairs
			for(var i = 0; i < parts.length; i++)
			{
				temp = parts[i].split(/=/);
				get_vars[temp[0]] = temp[1];
			}

			return get_vars;
		}
		else
		{
			return false
		}

	}

	// run it automatically
	this.embed_videos();
}

embed_yt_gv();