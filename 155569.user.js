// ==UserScript==
// @name          Play2xbmc
// @namespace     brantje
// @description   Adds a link to play videos from YouTube in XBMC. 
// @date          2013-01-03
// @creator       Sander B.
// @version       1.3.2
// @include       *youtube.*/*
// @include	https://rapidshare.com/#!download*
// @include	https://*.rapidshare.com/#!download*
// @include 	  *
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==


// Based on the script from Erik T. http://userscripts.org/users/278527/scripts
// 29-03-2013
// Hide menu a little, show it on mouse over.

// 16-01-2013
// Big Update:
// - Play 2shared, mediafire, speedyshare, 180upload, sharebees, movreel to xbmc
// - Better youtube integration
// - Better status message
// - Renamed script to Play2XBMC

// Changes 12-01-2013
// Youtube: Abillity to send the suggested video's to xbmc


// Changes 09-01-2013
// Iframe fix
// Added custom urls
//					-> Custom urls must be playable on xbmc, so it needs an direct link to the file.
//					-> If people are interested i can make an script that combines this YT script, with other download sites (movreel for example...)
//					-> Leave a post :)


// Changes 05-01-2013
// Pause video when sending to xbmc
// Fix adding xbmc
// Send youtube playlist to xbmc
// Play playlist on xbmc
// Note: video's from playlists appear in random order

// Changes 04-01-2013
// Send video's to playlist
// Volume down/up
// Clear playlist Button

// Changes 03-01-2013 @ 20.00
// Added multiple XBMC support 
// Play video's straight from the results page

// Changes 03-01-2013 @ 15.00:
// Changes:
// Added Jquery
// Added Frodo compatibility


//don't run on frames or iframes
if (window.top != window.self)  
    return;
// End run on frame or iframes	

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}
if(!GM_getValue('XBMC_ADDRESS')){
	modify_xbmc_address();
}
else
{
var xbmc_hosts = GM_getValue('XBMC_ADDRESS').split(';');
GM_log('Known XBMC Hosts:');
GM_log(xbmc_hosts);
var xbmc_address = xbmc_hosts[0];
if (xbmc_address == null){
	modify_xbmc_address();
}
}


function modify_xbmc_address() {
	addxbmc = true
	hoststr = '';
	firstrun = 1;
	while(addxbmc){
		delimiter = (firstrun==1)? '': ';';
		ip = prompt('What is your xbmc ip?','')
		port = prompt('What is the port?\nDefault 8080',8080)
		if(ip != null){
			hoststr += delimiter+ip+':'+port
		}
		firstrun = 0
		addxbmc = confirm('Add another host?')

	}
	
	if (hoststr != null){
		GM_setValue("XBMC_ADDRESS", hoststr);
	}
	var xbmc_hosts = GM_getValue('XBMC_ADDRESS').split(';');
	GM_log('Known XBMC Hosts:');
	GM_log(xbmc_hosts);
	var xbmc_address = xbmc_hosts[0];
	alert('Done!\nMake sure you have the xbmc webserver running');
}
function setstatus(msg,timeou){
    timeou = (timeou) ? timeou : 7000;
	clearTimeout($.data(document.body,'timerid'));
	$('#xbmcstatus').hide();
	$('#xbmcstatus').html(msg);
	$('#xbmcstatus').fadeIn(600);
	
	timer = setTimeout(function(){
		$('#xbmcstatus').hide();
	}, timeou)
	$.data(document.body,'timerid',timer);
}
function serror(msg){
	$('#xbmcstatus').html(msg);
}
function xbmc_req(datasend,status){
	var result;
    var timeou;
	jQuery.ajax({
		type: 'POST',
		url : 'http://' + xbmc_address + '/jsonrpc',
		success: function(datag) {
			if(!datag.error){
				result = datag;
				GM_log(datag)
        		if(status.match(/add/i)){
        			timeou = 15000;
    			}
                else
                {
                	timeou = 4000;
                }
				setstatus(status,timeou)
			}
			else
			{
				GM_log(datag);
				serror('Error: '+ datag.error.code +' ('+datag.error.data.method +': '+ datag.error.data.stack.message +')')
			}
		},
		contentType: "application/json",
		data : datasend,
		timeout: 40000,
		dataType: 'json',
		error: function(xhr,textstatus,errthrown){
			
			serror('Can\'t connect to XBMC:<br />'+errthrown);
		}
	});
	return result;
}

function changevol(type){
	datasend = '{"jsonrpc": "2.0", "method": "Application.GetProperties", "params":{"properties":["volume"]}, "id" : 1}';
	jQuery.ajax({
		type: 'POST',
		url : 'http://' + xbmc_address + '/jsonrpc',
		success: function(data) {
			volume = data.result.volume;
			newvol = (type=='down')? volume-10 : volume+10;
			newvol = (newvol > 100) ? 100 : newvol;
			newvol = (newvol < 0) ? 0 : newvol;
			xbmc_req('{"jsonrpc": "2.0", "method": "Application.SetVolume", "params": {"volume":'+ newvol +'} , "id" : 1}','Volume '+type);
		},
		contentType: "application/json",
		data : datasend,
		dataType: 'json'
	});
}

function change_host(){
	xbmc_address = $('#xbinstance').val();
	GM_log('Host changed to '+ xbmc_address);
}

function play_playlist(){
	setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Player.Open", "params":{"item":{"playlistid":1, "position" : 0}}, "id": 1}',"Playing playlist");
				}, 200);
}
function add_to_playlist(id){
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : "plugin://plugin.video.youtube/?action=play_video&videoid='+ id +'" }}, "id" : 1}',"Video added to playlist");
}

function playlisttoxbmc(){
GM_log('Adding playlist to xbmc')
$('#pltoxbmc').html('<span class="yt-uix-button-content" style="color: red">Adding items please wait...</span>')
counter = 0;
timeout=0;
	$.each($('.video-title-container'),function(){	
			
						url = 'http://www.youtube.com'+$(this).find('a').attr('href')
						var match = url.match(regExp);
				
						if (match&&match[7].length==11){
						clip = match[7];
						}
						setTimeout(function() {	add_to_playlist(clip,"Adding items to playlist")}, timeout);
						counter++
						timeout = timeout+500
						
		})
	GM_log(timeout)
	GM_log("Adding "+ counter + " movies")
	setTimeout(function() {	$('#pltoxbmc').html('<span class="yt-uix-button-content" style="color: green">Done!</span>')}, timeout);
}

function play_playlist_on_xbmc(){
clear_playlist()
$('#playtoxbmcb').html('<span style="color: red">Adding items please wait...</span>')
counter = 0;
timeout=0;
$.each($('.video-title-container'),function(){	
		
					url = 'http://www.youtube.com'+$(this).find('a').attr('href')
					var match = url.match(regExp);
			
					if (match&&match[7].length==11){
					clip = match[7];
					}
					setTimeout(function() {	add_to_playlist(clip,"Adding items to playlist")}, timeout);
					counter++
					timeout = timeout+500
					
	})
GM_log(timeout)
GM_log("Adding "+ counter + " movies")
setTimeout(function() {	$('#playtoxbmcb').html('<span style="color: green">Done!</span>')}, timeout);
setTimeout(function() {	play_playlist(); }, timeout+500);

}



function clear_playlist(){
	xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":1}, "id": 1}',"Playlist Cleared");
}

function next_movie(){
	xbmc_req('{"jsonrpc": "2.0", "method": "Player.GoTo", "params":{"playerid":1, "to": "next"}, "id" : 1}',"Done!");
}
function prev_movie(){
	xbmc_req('{"jsonrpc": "2.0", "method": "Player.GoTo", "params":{"playerid":1, "to": "previous"}, "id" : 1}',"Done!");
}


function play_movie(id) {
	if(document.URL.match(/watch/)){
		var myPlayer = document.getElementById('movie_player');
		myPlayer.pauseVideo();
	}
	if(id == '[object MouseEvent]'){
	//GM_log('Trying to play movie');
	var video_url;
	var video_id = document.URL;    
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	// big thx to Lasnv.net
	var match = video_id.match(regExp);
	if (match&&match[7].length==11){
		video_url = match[7];
		console.debug('Video url:'+ video_url);
	}
		
	}
	else
	{
	video_url = id;
	}
	if (video_url != undefined) {
		//GM_log('Playing video');
	/*	setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Player.Stop", "params":{"playerid":1}, "id" : 1}');
				}, 250)	*/
		setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":1}, "id": 1}','Clearing playlist');
				}, 10)		
		setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : "plugin://plugin.video.youtube/?action=play_video&videoid='+ video_url +'" }}, "id" : 1}','Adding items');
				}, 550);		
		setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Player.Open", "params":{"item":{"playlistid":1, "position" : 0}}, "id": 1}','Playing video');
				}, 1000);
	}
}
function cusurl_play(){
	url = prompt("What is the address you want to play?")
	if(url!=null){
		play_custom_url(url,'Trying to play url');
	}
}
function cus_add(){
	url = prompt("What is the address you want to add?")
	if(url!=null){
		add_to_playlist_url(url);
	}
}
function add_to_playlist_url(url){
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : "'+ url +'" }}, "id" : 1}','URL Added');
}

function play_custom_url(url){
stop_movie();
setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Clear", "params":{"playlistid":1}, "id": 1}','Clearing playlist');
				}, 200)		
		setTimeout(
				function() {
					xbmc_req('{"jsonrpc": "2.0", "method": "Playlist.Add", "params":{"playlistid":1, "item" :{ "file" : "'+ url +'" }}, "id" : 1}','Adding item');
					setTimeout( function() { play_playlist() }, 3000);
				}, 750);		
		
}

function pause_movie() {
	setTimeout(
			function() {
				xbmc_req('{"jsonrpc": "2.0", "method": "Player.PlayPause", "params":{"playerid":1}, "id" : 1}','Paused')
				
			}, 250);
}

function stop_movie() {
	setTimeout(function() {
		xbmc_req('{"jsonrpc": "2.0", "method": "Player.Stop", "params":{"playerid":1}, "id" : 1}','Stop')
	}, 250);
}
function make_buttons(type,func,url,text,clas){
	var button = document.createElement(type);
	
		button.setAttribute('class',clas);
	
	funccall = func+"('"+url+"')"
	button.onclick = (function(url) {
						return function() {
						   eval(funccall)
						};
					})(url);

	button.innerHTML = '<span class="xbmclink"><a href="#" onclick="return false; ">'+text+'</a></span>'
	return button;
	
}
function show_xbmc() {
    document.getElementById('xbmc').style.right='-1px';
}
function hide_xbmc() {
    document.getElementById('xbmc').style.right='-120px';
}

function scrapeURL(src){
		var match = src.match(RegExp("[\'\">](https?://[0-9a-z\:\.]{5,30}/[0-9a-z]{1,2}/[0-9a-z]{14,56}/(?!video).+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]","i"));
		if (!match) {
			match = src.match(RegExp("[\'\">](https?://[0-9a-z\:\.]{5,30}/[0-9a-z]{1,2}/[0-9a-z]{14,56}/.+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]","i"));
		}
		if (match) {
			return match[1];
		}
	}

if(window.location.hostname.match(/youtube/)){
		var clip;
		var video_id = document.URL;
		
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		// big thx to Lasnv.net
		var match = video_id.match(regExp);
		if (match&&match[7].length==11){
			clip = match[7];
		}
		if (clip != undefined) {
		//alert('Found clip ' + clip);
		var xbmc_play = document.createElement('span');
		xbmc_play.addEventListener('click', play_movie);
		xbmc_play.setAttribute('id', 'btPlay');
		xbmc_play.setAttribute('title', 'Play this movie\bCleaning current playlist');
		
		
		
		
		var play2xbmc = document.createElement('button');
		//<button  <span class="yt-uix-button-content">Share </span>
		play2xbmc.innerHTML = '<span><span class="yt-uix-button-content">Play on xbmc</span></span>';
		play2xbmc.setAttribute('class', 'yt-uix-button yt-uix-button-text yt-uix-tooltip');
		play2xbmc.setAttribute('type', 'button');
		play2xbmc.setAttribute('role', 'button');
		play2xbmc.setAttribute('id', 'play2xbmc');
		play2xbmc.setAttribute('title', 'Play this movie on XBMC');
		play2xbmc.onclick = (function(clip) {
								return function() {
								   play_movie(clip);
								};
							})(clip);
		play2xbmc.setAttribute('data-tooltip-text', 'Play this movie on XBMC');
		
		var enq2xbmc = document.createElement('button');
		//<button  <span class="yt-uix-button-content">Share </span>
		enq2xbmc.innerHTML = '<span><span class="yt-uix-button-content">Enqueue on xbmc</span></span>';
		enq2xbmc.setAttribute('class', 'yt-uix-button yt-uix-button-text yt-uix-tooltip');
		enq2xbmc.setAttribute('type', 'button');
		enq2xbmc.setAttribute('role', 'button');
		enq2xbmc.setAttribute('id', 'play2xbmc');
		enq2xbmc.setAttribute('title', 'Enqueue this movie on XBMC');
		enq2xbmc.onclick = (function(clip) {
								return function() {
								   add_to_playlist(clip);
								};
							})(clip);
		enq2xbmc.setAttribute('data-tooltip-text', 'Enqueue this movie on XBMC');
		
		//playlist2xbmc.setAttribute('onclick', 'Send this playlist to xbmc');
		$('#watch-like-dislike-buttons').append(play2xbmc).after(enq2xbmc);
		
		
		//$('#watch-like-dislike-buttons').prepend(make_buttons('span','add_to_playlist',clip,'Enqueue on xbmc','yt-uix-button-content')).prepend(make_buttons('span','play_movie',clip,'Play on xbmc','yt-uix-button-content'))
		
		
		/*List video's */
		$.each($('.video-list-item'),function(){
			url = 'http://www.youtube.com'+$(this).find('a').attr('href')
			
			var match = url.match(regExp);
			if (match&&match[7].length==11){
				clip = match[7];
			}
			var play2xbmc = document.createElement('span');
			var enq2xbmc = document.createElement('span');

			play2xbmc.onclick = (function(clip) {
								return function() {
								   play_movie(clip);
								};
							})(clip);
			enq2xbmc.onclick = (function(clip) {
								return function() {
								   add_to_playlist(clip);
								};
							})(clip);
			play2xbmc.innerHTML = '<span class="xbmclink"><a href="#" onclick="return false; ">[Play on xbmc]</a></span>'
			enq2xbmc.innerHTML = '<span class="xbmclink"><a href="#" onclick="return false; ">[Enqueue on xbmc]</a></span>'
			$(this).find('.title ').after(enq2xbmc).after(play2xbmc);
		})

	}
	else
	{
		url = document.URL;
		urlm = url.split('/');
		page = urlm[urlm.length-1].split('?')
		page = page;
		//On result page
		switch(page[0]){
			case "":
					GM_log('Home page');
					$.each($('.feed-item-content'),function(){	
							url = 'http://www.youtube.com'+$(this).find('a').attr('href')
							var match = url.match(regExp);
							if (match&&match[7].length==11){
							clip = match[7];
							}
							var play2xbmc = document.createElement('span');
							var enq2xbmc = document.createElement('span');
					
							play2xbmc.onclick = (function(clip) {
												return function() {
												   play_movie(clip);
												};
											})(clip);
							enq2xbmc.onclick = (function(clip) {
												return function() {
												   add_to_playlist(clip);
												};
											})(clip);
							play2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Play on xbmc]</a>'
							enq2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Enqueue on xbmc]</a>'
							$(this).after(enq2xbmc).after(play2xbmc);
						})
			break;
			case "results":
							GM_log("Result page found!")
							$.each($('.yt-lockup2-title'),function(){	
							url = 'http://www.youtube.com'+$(this).find('a').attr('href')
							var match = url.match(regExp);
							if (match&&match[7].length==11){
							clip = match[7];
							}
							var play2xbmc = document.createElement('span');
							var enq2xbmc = document.createElement('span');
							play2xbmc.onclick = (function(clip) {
												return function() {
												   play_movie(clip);
												};
											})(clip);
							enq2xbmc.onclick = (function(clip) {
												return function() {
												   add_to_playlist(clip);
												};
											})(clip);
							play2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Play on xbmc]</a>'
							enq2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Enqueue on xbmc]</a>'
							$(this).after(enq2xbmc).after(play2xbmc);
							
							
							

						})
						if($('.onebox-overview')){
							var url;
							
							var bplay2xbmc = document.createElement('a');
							bplay2xbmc.setAttribute('class', 'yt-uix-button  playall yt-uix-sessionlink yt-uix-button-default yt-uix-button-short');
							bplay2xbmc.onclick = (function(url) {
												return function() {
													clear_playlist()
												   vidids = decodeURIComponent($('.onebox-overview > a').attr('href')).split('video_ids=')[1].split('&')[0]
													vidids = vidids.split(',');
													timeout = 0
													$.each(vidids,function(key,ele){
															
															setTimeout(function() {	add_to_playlist(ele,"Adding items to playlist")}, timeout);
															timeout = timeout+500
													})
													setTimeout(function() {	play_playlist(); }, timeout+500);
												};
											})(url);
							
							bplay2xbmc.innerHTML = '<span class="yt-uix-button-content">Play all on XBMC</span>'
							$('.onebox-overview > a').after(bplay2xbmc);
							
						}
						break;
			case "playlist":
							GM_log("Playlist page found!")
							$.each($('.video-title-container'),function(){	
				
							url = 'http://www.youtube.com'+$(this).find('a').attr('href')
							var match = url.match(regExp);
					
							if (match&&match[7].length==11){
							clip = match[7];
							}
							GM_log(clip);
							var play2xbmc = document.createElement('span');
							var enq2xbmc = document.createElement('span');
							play2xbmc.onclick = (function(clip) {
												return function() {
												   play_movie(clip);
												};
											})(clip);
							enq2xbmc.onclick = (function(clip) {
												return function() {
												   add_to_playlist(clip);
												};
											})(clip);
							play2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Play on xbmc]</a>';
							enq2xbmc.innerHTML = ' <a href="#" onclick="return false; " class="xbmclink">[Enqueue on xbmc]</a>';
							$(this).after(enq2xbmc).after(play2xbmc);
						});
						
						var playlist2xbmc = document.createElement('button');
						//<button  <span class="yt-uix-button-content">Share </span>
						playlist2xbmc.innerHTML = '<span class="yt-uix-button-content">Send playlist to xbmc</span>';
						playlist2xbmc.setAttribute('class', 'playlist-share yt-uix-button yt-uix-button-hh-default yt-uix-tooltip');
						playlist2xbmc.setAttribute('type', 'button');
						playlist2xbmc.setAttribute('role', 'button');
						playlist2xbmc.setAttribute('id', 'pltoxbmc');
						playlist2xbmc.setAttribute('title', 'Send this playlist to xbmc');
						playlist2xbmc.onclick = (function() {
												return function() {
												   playlisttoxbmc();
												};
											})();
						playlist2xbmc.setAttribute('data-tooltip-text', 'Send this playlist to xbmc');
						//playlist2xbmc.setAttribute('onclick', 'Send this playlist to xbmc');
						$('.playlist-hangout-button').after(playlist2xbmc);
						
						//<span id="play-all-button">      
						var playplaylist2xbmc = document.createElement('a');
						playplaylist2xbmc.innerHTML = '<img class="small-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all on xbmc';
						playplaylist2xbmc.setAttribute('id', 'playtoxbmcb');
						playplaylist2xbmc.setAttribute('class', 'yt-playall-link yt-playall-link-dark yt-uix-sessionlink');
						playplaylist2xbmc.onclick = (function() {
										return function() {
										   play_playlist_on_xbmc();
										};
									})();
						$('#play-all-button').after(playplaylist2xbmc);
	 
						
						
			
			break;
		}
		var xbmc_play = document.createElement('span');
		xbmc_play.addEventListener('click', play_playlist);
		xbmc_play.setAttribute('id', 'btPlay');
		xbmc_play.setAttribute('title', 'Start playlist playback');
	}
}
// 2shared **works**
else if (location.host.match('2shared.com') && (location.href.match('/file/') || location.href.match('/video/')) ){
	
	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.getElementById('overall').innerHTML;
	var bad = pagecontent.search("The file link that you requested is not valid") +
	pagecontent.search("file is suspected of illegal or copyrighted content") +
	pagecontent.search(/\.(001|002|003|rar|zip)<\/title>/i);

	// display embed

	function matchLoop(){
		var matched = 0;
		matched = document.getElementsByTagName("head")[0].innerHTML.match(/'http:\/\/dc(.*)'/i);
		if (!matched) matched = document.body.innerHTML.match(/>http:\/\/dc(.*)<\/div>/i);
		if (!matched){
			setTimeout(function(){matchLoop();},200);
		}else{
			downloadlink = "http://dc" + matched[1];
			$('#fileinfo > center > a').after(make_buttons('span','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('span','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
		}
	}
	matchLoop();
	    
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}
// mediafire **works**
else if (location.href.match('www.mediafire.com/\\?.+') || location.href.match('www.mediafire.com/error.php.+')){

	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = location.href.search("error.php\\?errno=") +
	pagecontent.search(/\.(001|002|003|rar|zip)<\/title>/i);

		var match = document.body.innerHTML.match(RegExp("http://\\S+/"+location.search.substring(1)+"/\\S+\"","i"));
		if (match){
			downloadlink = match[0].replace('"','');
			GM_log(downloadlink)//download_link
			$('.promo-dl-box').css('height','423px');
			$('.dl-btn-container').css('height','182px');
			$('.download_link').prepend(make_buttons('span','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).prepend(make_buttons('span','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
		}

	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}


// speedyshare **working**
else if ( location.host.match('speedyshare.com') || location.host.match('speedy.sh') ){
	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">not found<") +
	pagecontent.search("File not found.") +
	pagecontent.search("can only be downloaded with SpeedyShare Premium.") +
	pagecontent.search("Check the download URL for spelling errors") +
	location.href.search(/\.(001|002|003|rar|zip)$/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		//
	}
	
	// display embed
	
	
		downloadlink = location.href.match('(http://.+/.+/)[^/]+$')[1] + 'download' + location.href.match('/[^/]+$');
		GM_log(downloadlink)
		$('.downloadfilename').after(make_buttons('div','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]','downloadfilename')).after(make_buttons('div','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]','downloadfilename'))
	
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');

}


// 180upload **working**
else if (location.host.match('180upload.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

				
	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found[<,]") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("No such file with this filename") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search("Copyright infringement issue") +
	pagecontent.search("file expired or deleted by its owner") +
	pagecontent.search(RegExp("http://180upload.com/"+location.href.match('180upload\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)\.html","i"));
	
	downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			GM_log(downloadlink);
			$('.style1').after(make_buttons('div','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('div','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
		}
	
	
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}


// sharebees **working**
else if (location.host.match('sharebees.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search(RegExp("http://(www\.)?sharebees.com/"+location.href.match('sharebees\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

	
	var src = '';
	if (document.getElementById('flvplayer')){
		eval('src = ' + document.getElementById('player_code').childNodes[4].innerHTML.substring(4) + ';');
	}else{
		src = document.body.innerHTML;
	}

	downloadlink = scrapeURL(src);
	if (downloadlink){
		////Play to buttons
		GM_log(downloadlink);
		$('#btn_download').after(make_buttons('button','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('button','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
	}
	
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}


// uploadorb
else if (location.host.match('uploadorb.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search(RegExp("http://(www\.)?uploadorb.com/"+location.href.match('uploadorb\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

		if (document.forms[0] && document.forms[0].action && document.forms[0].action != location.href){
			downloadlink = document.forms[0].action;
			//Play to buttons
		}
	
}


// jumbofiles
else if (location.host.match('jumbofiles.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search("File Not Found or Deleted") +
	pagecontent.search("due to inactivity or DMCA") +
	pagecontent.search(">No such user exist<") +
	pagecontent.search(">File Not Found<") +
	pagecontent.search(">Deleted or DMCA<") +
	pagecontent.search(RegExp("\.(001|002|003|rar|zip) ?<","i"));
	
	if (document.forms[0] && document.forms[0].action && document.forms[0].action != location.href){
		downloadlink = document.forms[0].action;
		GM_log(downloadlink)
		//.after(make_buttons('span','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('span','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
	}
	
}


// movreel **working**
else if (location.host.match('movreel.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search(">No such file with this filename<") +
	pagecontent.search(RegExp("http://(www\.)?movreel.com/"+location.href.match('movreel\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			GM_log(downloadlink);
			$('#lnk_download').after('<br>').after(make_buttons('button','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('button','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
		}
	}
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}


// billionuploads **working**
else if (location.host.match('billionuploads.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?(#.*)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("File was removed") +
	pagecontent.search(RegExp("\.(001|002|003|rar|zip)<","i"));

	// display embed
	
	downloadlink = scrapeURL(document.body.innerHTML);
	if (downloadlink){
		$('#link').after(make_buttons('span','add_to_playlist_url',encodeURI(downloadlink),'[Enqueue on xbmc]')).after(make_buttons('span','play_custom_url',encodeURI(downloadlink),'[Play on xbmc]'))
	}
	
	var xbmc_play = document.createElement('span');
	xbmc_play.addEventListener('click', play_playlist);
	xbmc_play.setAttribute('id', 'btPlay');
	xbmc_play.setAttribute('title', 'Start playlist playback');
}
else
{
    		var xbmc_play = document.createElement('span');
		xbmc_play.addEventListener('click', play_playlist);
		xbmc_play.setAttribute('id', 'btPlay');
		xbmc_play.setAttribute('title', 'Start playlist playback');
}


	
	
	var xbmc = document.createElement('div');
	xbmc.setAttribute('id', 'xbmc');
	xbmc.addEventListener('mouseover', show_xbmc, false);
    xbmc.addEventListener('mouseout', hide_xbmc, false);


	var xbmc_play_control = document.createElement('div');
	xbmc_play_control.setAttribute('id', 'playControl');
	
	var xbmc_other_control = document.createElement('div');
	xbmc_other_control.setAttribute('id', 'otherControl');

	var xbmc_playback_control = document.createElement('div');
	xbmc_playback_control.setAttribute('id', 'playbackControl');	
	
	var xbmc_playlist_control = document.createElement('div');
	xbmc_playlist_control.setAttribute('id', 'playlistControl');
	
	var xbmc_intanse_control = document.createElement('div');
	xbmc_intanse_control.setAttribute('id', 'instanceControl');

	var xbmc_title = document.createElement('div');
	xbmc_title.setAttribute('class', 'xbmcText');
	xbmc_title.setAttribute('style', 'margin-left: 30px;');
	xbmc_title.innerHTML = 'XBMC';
	var xbmc_pause = document.createElement('span');
	xbmc_pause.addEventListener('click', pause_movie, false);
	xbmc_pause.setAttribute('id', 'btPause');
	xbmc_pause.setAttribute('title', 'Pause Playback');

	var xbmc_stop = document.createElement('span');
	xbmc_stop.addEventListener('click', stop_movie, false);
	xbmc_stop.setAttribute('id', 'btStop');
	xbmc_stop.setAttribute('title', 'Stop playback');	
	
	var xbmc_prev = document.createElement('span');
	xbmc_prev.addEventListener('click', prev_movie, false);
	xbmc_prev.setAttribute('id', 'btprev');
	xbmc_prev.setAttribute('title', 'Previous movie in playlist');	
	
	var xbmc_next = document.createElement('span');
	xbmc_next.addEventListener('click', next_movie, false);
	xbmc_next.setAttribute('id', 'btnext');
	xbmc_next.setAttribute('title', 'Next movie in playlist');	
	
	var xbmc_voldown = document.createElement('span');
	xbmc_voldown.addEventListener('click', function(){ changevol('down'); }, false);
	xbmc_voldown.setAttribute('id', 'btvoldown');
	xbmc_voldown.setAttribute('title', 'Volume Down');
	
	var xbmc_volup = document.createElement('span');
	xbmc_volup.addEventListener('click', function(){ changevol('up'); }, false);
	xbmc_volup.setAttribute('id', 'btvolup');
	xbmc_volup.setAttribute('title', 'Volume Up');
	
	var xbmc_instance = document.createElement('div');
	xbmc_instance.addEventListener('click', change_host, false);
	xbmc_instance.setAttribute('id', 'btinstance');
	xbmc_instance.setAttribute('title', 'Change XBMC instance');
	
	/*Make an dropdown from the hosts */
	choises = '';
	$.each(xbmc_hosts,function(index,val){
		choises += '<option value='+ val + '>'+val+'</option>';
	})
	/*End drop*/
	xbmc_instance.setAttribute('style','color: white; font-family:sans-serif; font-size:10px;');
	xbmc_instance.innerHTML = '<select id="xbinstance">'+ choises + '</select>';
	
	
	var xbmc_clear_playlist = document.createElement('div');
	xbmc_clear_playlist.addEventListener('click', clear_playlist, false);
	xbmc_clear_playlist.setAttribute('class', 'btclear');
	xbmc_clear_playlist.setAttribute('title', 'Clear Playlist');
	xbmc_clear_playlist.setAttribute('style','color: white; font-family:sans-serif; font-size:10px; width: 100px;');
	xbmc_clear_playlist.innerHTML = '<br /><a href="#" onclick="return false">[Clear Playlist]</a>';
	
	var xbmc_playcustom = document.createElement('div');
	xbmc_playcustom.addEventListener('click', cusurl_play, false);
	xbmc_playcustom.setAttribute('class', 'btclear');
xbmc_playcustom.setAttribute('title', 'Play an custom url. (Must end with an media extension eg: mpg,mp3,avi,flac,etc )');
	xbmc_playcustom.setAttribute('style','color: white; font-family:sans-serif; font-size:10px;');
	xbmc_playcustom.innerHTML = '<a href="#" onclick="return false">[Play custom url]</a>';
	
	var xbmc_addcustom = document.createElement('div');
	xbmc_addcustom.addEventListener('click', cus_add, false);
	xbmc_addcustom.setAttribute('class', 'btclear');
	xbmc_addcustom.setAttribute('title', 'Add an custom url to the playlist. (Must end with an media extension eg: mpg,mp3,avi,flac,etc )');
	xbmc_addcustom.setAttribute('style','color: white; font-family:sans-serif; font-size:10px; width: 200px;');
	xbmc_addcustom.innerHTML = '<a href="#" onclick="return false">[Add custom url to playlist]</a>';
	
	
	var xbmc_status = document.createElement('div');
	xbmc_status.setAttribute('style','color: white; font-family:sans-serif; font-size:11px; width: 200px; margin-top: 10px;');
	xbmc_status.setAttribute('id', 'xbmcstatus');
	xbmc_status.setAttribute('class', 'btclear');
	
	
	xbmc_play_control.appendChild(xbmc_play);
	xbmc_other_control.appendChild(xbmc_title);
	xbmc_playback_control.appendChild(xbmc_pause);
	xbmc_playback_control.appendChild(xbmc_stop);
	xbmc_playback_control.appendChild(xbmc_prev);
	xbmc_playback_control.appendChild(xbmc_next);
	xbmc_playback_control.appendChild(xbmc_voldown);
	xbmc_playback_control.appendChild(xbmc_volup);
	xbmc_intanse_control.appendChild(xbmc_instance);
	xbmc_playlist_control.appendChild(xbmc_clear_playlist);
	xbmc_playlist_control.appendChild(xbmc_playcustom);
	xbmc_playlist_control.appendChild(xbmc_addcustom);
	xbmc_playlist_control.appendChild(xbmc_status);
	
	xbmc.appendChild(xbmc_play_control);
	xbmc.appendChild(xbmc_other_control);
	xbmc.appendChild(xbmc_intanse_control);
	xbmc.appendChild(xbmc_playback_control);
	xbmc.appendChild(xbmc_playlist_control);
	document.body.parentNode.insertBefore(xbmc, document.body);


GM_addStyle('#xbmc { opacity:0.6; width: 160px; height: 175px; position:fixed; z-index:100; top:55px; right:-120px; display:block; background:#080808; -moz-border-radius-topleft: 20px; -moz-border-radius-bottomleft:20px; -webkit-border-top-left-radius:20px;  -webkit-border-bottom-left-radius:20px; } ')


GM_addStyle('.xbmcText { font-family:Terminal; font-size:12px; font-weight:bold; color:#a0a0a0; left: 45px } ')

// Play control
GM_addStyle('#playControl span, #playbackPlay span:hover { width:40px; height:45px; float:left; display:block; padding-bottom:0px; -moz-background-size:40px; background-size:40px; -webkit-background-size:40px; -o-background-size:40px; -khtml-background-size:40px; cursor:pointer; padding-right: 5px;} ')

GM_addStyle('#btPlay { background: url("data:image/png;base64,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") no-repeat; } ')
GM_addStyle('#btPlay:hover { background: url("data:image/png;base64,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") no-repeat; } ')

// Other control
GM_addStyle('#playbackControl span, #playbackControl span:hover {left: 25px; width:20px; height:20px; top:0; float:left; display:block; margin-left:3px; -moz-background-size:20px; background-size:20px; -webkit-background-size:20px; -o-background-size:20px; -khtml-background-size:20px; cursor:pointer; } ')
GM_addStyle('#playbackControl {margin-left: 20px; margin-top: 5px; display: block;} ')

GM_addStyle('#btStop { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARtSURBVFiF1Zmxb9tGFMbfvdNJR5FWZMlSwkZGA8FovWTo2AzdSsVAvQTJ4v4BDToUmbJk6dIMnoJ2aQt0zeIiS1rYItCOWTsYCIzCCtDGhmwzkmWHNE868a5DZcNRFVuyrFj9AC7Hd3g/kYfH9z4ROKNKpdKMUuoWpfQGIaSgtb6ilMoCACBijRCypbXeiKLoGSI+KZfL62fJQwYJnpubyyml7gHAAiHkEuf8dSKRaMVisaMLAKDdbscPr2azGRdCTGit9wDgMSI+Wl5e9s4V0HEckxByHwC+Mk2zYVnWPmMsHOTHSSkN3/dTQRCkAeBbrfWi67rB0ICO49wmhHxvGIafTqdrlFI5CFi3oihijUYjG4ahpbW+67ruzyfF0xPuEcdxHlJKv87n85uWZTUQUQ0DBwCAiCqZTPqGYYRhGH5eLBbTlUrl97dC9Fqcn59PSimXGGMfTU1NbSJiNCxYLyml6KtXr65KKf9gjN15+vTpQXcM9thHpJRLnPPr+Xz+5ajgAAAQMcrn8y8559ellEvQ44H95xU7jvMwHo/P5XK5TQDQo4I7rmQy6QshPrx27Vq2Uqn89lZAx3Fud87c34SQoc/bIDIMwz84OPi0WCy+qFQqzw/Xjx5pp5T8dfny5c1BS8h5SUppbG9vX9Vav39Ygo7OICHkvmEY/kXBAQAwxkLDMPxOzf2XC+DoC/Gnbdsvhq1zwyqKIlatVouI+MHy8rIXAwBQSt0zTbPRD5wQIiWESJ0lOed8n3O+f1IMpVSaptkIguAeADyIddYXLMs6ceNxwGq1+l69Xh8ILpPJgG3bcBogAIBlWftBECwAwINYqVSaIYRcYoxt95usXq/D2traQI3G7Oystm27r1jGWEgImS6VSjOolLrFOX89SLJ3Ic75a6XULaSU3kgkEq2LBupWIpFoUUpvICGkcNjHjZNisViLEFJArfWVcQXUWl9BpVR2XAGVUtle3cxYCRGx1m634xcN0q12ux1HxBoSQrbGFZAQsoVa641xBdRab2AURc+azebYATabzXhnpsYnQoiJiwbqlhBiAhGfxMrl8nqpVNqTUhr99oKZTAZmZ2cHGgcymUzfsVJKQ2u9Vy6X1w+7mce+7y9MTk6eCsg537dtG/r98Hfv7SfO9/0UADwGAIgBACDioyAIvkylUvXTesJ+erphFEURC4IgjYiPADpD0/r6+sHMzEwyiqKPk8mkP6rk/Wh3dzffbrd/XFlZ+RXg2EyitV4Mw9CSUhoXBSelNDqWyOLh2hGg67qB1vqu53kFpdRJlshIpJSinucVOn7Nkan0BkilUnleLBbTrVbrE9M0R3bOeoh4nleQUv7kuu53b9zoFXzz5s1fOOfXs9lsFUbvLpBarWYLIVZXVlY+687Xq5vRjLE7QojVnZ2d6VG+bqUU3dnZmRZCrDLG7nTDAZzsDxLHcb6hlH6Ry+U2znugl1IanucVoij6wXXdB73gTgMEgIs3MP//FvBxja2J3kvv6m+IfwAOnmI7UIorLQAAAABJRU5ErkJggg==") no-repeat; } ')
GM_addStyle('#btStop:hover { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAVLSURBVFiF1ZlNbBNHFIDfzNgBh+D1Cm1spGA3baicHw6AS2MkU5REsyCBiBBc4MAFqaiHihMXDlU5cOBUtVIFRy70QEUkOIRdYSSwRFLkOEI4xQpZEUfbyPEKORZgBzsz00PjKE1s54f8mO84b2bn8+5o5s0zgjWiqmoL5/w0IeQwQqhJCOHhnO8CAMAYv0UIpYQQJmPsGcb4nqZpY2uZB62m8/HjxxXO+WUAOCdJkisQCHBFUYAQwjDGDGPMAAA454RzThhjxLIsiEajOJvNTgPAHYzxL/39/da6ClJKdyCErthsth97enpYY2Mjy+fzuUQikclkMoVqY2VZrvP7/bLD4ahPp9Pk0aNHZHZ29lchxA1d1z98siCl9AzG+GYoFBJ79+5lsVgsZVnWzEp+2GIURdl+4MABz+vXr0kkEkGc80u6rv9ZbQypEkOU0utut/va+fPnxdTU1NTQ0FA6l8vNrkUOACCXy80ahjHtdDqLx44dazBN85TH45EMw3hcUaJc48mTJ+uLxeJdv9//bTAYLIbD4QnGmFirWDkIIai7u9s7MDBgTyQSf9nt9rMPHjzILe6Hy0kXi8W7nZ2dhzo6Ot7pup5cbzkAAMaY0HU92dHR8a6zs/NQsVi8C2Ve2JJPTCm93traeqqlpeX9wMDA1HqLLcY0zQ/t7e11nPMvnU6nyzCMcEVBSukZt9t9rbu7u/DkyZN/NlpuoeTRo0d3Tk5OBj0ej2EYxt+l2PwnppTuwBjf7O3tZeFweGKz5EqEw+GJ3t5ehjG+SSndsUQQIXQlFAqJkZGR1EasueVgjImRkZFUKBQSCKEr814A/50QGOPRCxcufNQ0bbzSQyRJsnu93oZPEZmYmHifzWaLleKqqn5x+/btbZzzr/v7+y0bAADn/DKllMVisVS1h3u93obm5uavhoeHK05Qjf3799sBwHj58mWmUp9YLJbq6elpevjw4WUAuGqbaz/X2NjI4vH4sifE8PBwUdf1bZlMxTnKIssyAMBHl8tVtZ9lWTP79u1jAHAOAK7aVFVtkSTJlc/np1c6WSaTgVevXq0q0WhtbV3xus7n8zlJklyqqrZgzvnpQCDAE4nE6l7JBpJIJDKBQIBzzk9jQshhRVFguaxkM8lkMoW5NO4wRgg1EULYVksthhDCEEJNWAjhKSWatQTGmAkhPJhzvqtWBTnnu8plMzUFxhi/5ZxXS1y3BM45wRi/xQihVK0KIoRSeO5qWHOCjDEihDAxY+yZZVkgy3LdVkuVkGW5zrIsmLtT43vRaBT7/X55q8VK+P1+ORqNYozxPZumaWOqqk47HI76lT5AluVVna2lMSvF4XDUZ7PZaU3TxkrZzJ10Ov29oijbl7vzzqVMH1cjt3DsmzdvqvZRFGV7Op0mAHAH4DNIWNGCwM9Hjhz5gTE2lUwm33+KxFrx+XwNhBD306dPf9c07SeABXcSIcSNSCSC2tra3ISQVeV66wEhBLW1tbkjkQgSQtwotc8L6rr+gXN+qa+vz9bV1bVnswW7urr29PX12ebqNfNFpf9t0IZh/L17925pZmbmm4MHD9aZprls9Wk9CAaD7qGhIUcymbyl6/pvC2NLThDDMB7Lsvyd0+lsbm9v33DJYDDoNk2z4cWLF881Tbu4OF4umxF2u/3s4ODg83g8vpNS6tuINUkIQZRSXzwe3zk4OPjcbrefBYAle2vZM3h0dLQ4Njb2h9PpdE1OTgZPnDjhKhQKhWw2uy7XAp/P1xAMBr3379+vGx8fv6Vp2sXR0dGyW0/NFzA//xLwQmq2iF6Ozfob4l+31OWm1j44SgAAAABJRU5ErkJggg==") no-repeat; } ')

GM_addStyle('#btPause { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASJSURBVFiF1Zk9bCNFFMffvPHYO971h+SPxIpPRNYJqhS0KehYJxJpoksTCkpOFOiqayiAgitSRdBAQUGTJihNkBKvBOW1FJGusOKT4GI58drIib3Ztcc7Q3G2lfM5H74k2PylLXb27exvd57evPeWwDsqn88/lFKuUkoXCSFZpdSslDIBAICIdULIsVLqyPf954i4UygUDt/lOWQc4+Xl5ZSU8gkArBNCYpqmNUOhUCcQCAwOAIButxvsH+12O+h5XkQpdQoAW4i4ube3Z98poGmaOiHkKQB8qet6wzCMM8aYO87LCSF4q9WKOo4TB4DvlVIblmU5twY0TfMRIeRHznkrHo/XKaViHLBh+b7PGo1GwnVdQyn12LKsX6+yp1dcI6ZpPqOUfpNOp8uGYTQQUd4GDgAAEWU4HG5xzl3XdT/N5XLxUqn0x6UQowZXVlbCQohtxtiHyWSyjIj+bcFGSUpJa7XanBDiT8bY2u7u7vmwDY64jwghtjVNW0in06/uCw4AABH9dDr9StO0BSHENoz4YG8tsWmaz4LB4HIqlSoDgLovuIsKh8Mtz/M+mJ+fT5RKpd8vBTRN81HP5/4mhNza38YR57x1fn7+cS6Xe1kqlV70xweftBdK/pqZmSmPG0LuSkIIfnJyMqeUeq8fggY+SAh5yjlvTQoOAIAx5nLOW72Y+5oLYLBDFDOZzMubxLmzs7MZ13Uj/XPO+Wk0GrWHbFKu68Yu2DSj0ejJdXP7vs8qlUoOEd/f29uzEQBASvlE1/XGTYOw4zjxcrkcLRaLRqVSiXmeFxm28TwvUqlUYsVi0SiXy/0d5FpRSoWu643eljpY4nXDMM5uMkFfzWbTr9VqwnGcS8OQ4zh+rVYTzWZzrFDVY1kHAMB8Pv+QEBKbpO8NizHmEkJi+Xz+IUopVzVNa04aaliapjWllKtIKV0MhUKdSQMNKxQKdSili0gIyfbzuGlSIBDoEEKyqJSanVZApdQsSikT0woopUyMymamSoiI9W63G5w0yLC63W4QEetICDmeVkBCyDEqpY6mFVApdYS+7z9vt9tTB9hut4O9mhp3Rm32k5bneRFE3MFCoXColDoVQvBJQ/UlhOBKqdNCoXDYDzNbrVYrOs4kkUiEJpNJpuv6paWrrus0mUyySCRyVXn7lnosWwAAAQAARNx0HOeLaDT6z01yQl3XG3Nzc4MUalSyoWlaM5PJYCaTAYDXCetN4HzfZ47jxBFxE+BCTZLP57/lnH+WSCSObzLRfaler8+6rvtLoVD4GuBCTaKU2nBd15ikLwoheK8lstEfGwBaluUopR7btp2VUo7lM3chKSW1bTvb69cMmkpvgJRKpRe5XC7e6XQ+0nV9rBLgliK2bWeFED9blvXDGxdGGS8tLf2madpCIpGowP13F0i9Xs94nnewv7//yfDzRmUzijG25nneQbVafXCfyy2lpNVq9YHneQeMsbVhOICr+4PENM3vKKWfp1Kpo7suqoQQ3LbtrO/7P1mW9dUouOsAAWDyDcz/fwv4oqa2iT5K/9VviH8Bvf+C2hXUc8IAAAAASUVORK5CYII=") no-repeat; } ')
GM_addStyle('#btPause:hover { background: url("data:image/png;base64,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") no-repeat; } ')

GM_addStyle('#btConf { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAl2cEFnAAAAKAAAACgAo3CU+AAACkJJREFUWMPNWVtoHNcZ/mbO3HdndqXRar22lI1j2Y4V5QLCxMRpHBpIDCapDX0JwS0E2gcb+tKXvpVC+1LoYw0ttC9NKX1Kn0wgV5yQB2O7KGJNnLWk3awUIe9qd72a+7UP8TmZkVYpSdrSAwdJc86c853///7v/8+Iw7dsmqY9W6lUnp+cnFxUVfWYJEkHCSE6AMRxvBMEwReu637W7/dvdrvdDxzH+ejb7MN9k8mSJB2p1+s/rdVqr4qiOEsIgSAI4HkeHMeB475cLk1TpGmKJEkQRRHiOEYYhp3Nzc2/tdvtPwZBsPIfBUgImX744Yd/Wa/XL4miCEmScuM8z3+5GMcxcFEUgeM4NgYAQRAgDEO02+0rrVbrV3Ec3/vOAKvV6uvz8/O/E0WxLMtybmxzcxNnzpzBa6+9BlVVkSQJ4jgGIQTLy8u4evUqBoPBnjV930cYhsPbt2//fGtr689ft7/wdYNzc3O/r9frl1RV3XeOruuoVCpQFAVRFCFNU/A8D9M0IYri2HckSYIsy+WFhYU/6bq+ePfu3cv7rc/vN7C4uPjm4cOHL2mahiiK4Pv+eBc8cCvlGu1pmjJO7m7D4RBJkkDTNBw+fPjS4uLim98I4OLi4pumaZ5XVRXFYhEvv/wyLl68CF3X94DjOI65lvYwDBnw3e3QoUO4fPkyqtUqAEBVVZimeX4/kGScWw8ePHhRVVWoqorTp0/j3LlzeOihhyAIAtbX1+H7PniehyRJeOyxx3D06FEAQBzHSJIEaZrCdV18+OGHcF2XBUq9Xscrr7yCqakpzM7OYm1tDZ7nQRRFiKL4KM/z0/1+/+q+AKvV6uvHjh37taqq0DQNp06dwksvvYQkScBxHGZmZiBJEtrtNmq1Gi5cuIBTp05BkqSci6MogqqqOH78OBRFweeff45Dhw7h/PnzKBQKCIIAoihidnYW7XYbnudBEAQUCoWTjuN0bNv+J/MSQ0rI9HPPPXenUCiUFUXB008/jbNnzzLS054kCTzPg6IokGWZAUuShHUqNZSHg8EAsiwzXaQ9TVOMRiO89dZb6Ha74Hketm0Pr127dpxKELPgI4888tupqanvRVGEUqmEc+fOQRRFJrhpmiKOY3AcB0EQkKYpPM+D67pwHAeO48B1Xfi+D9/3GfAoikAIyVmXHohKEiEE169fR7FYBAAlTdPCYDC4ygBKknTkiSee+IuqqhAEAUEQoNfroVqtQlGUHMgkSRCGIQPmeR6iKAIANp4kCYIgQBAEzFK7A4n+3W63ce3aNRSLRXZ4TdNObmxsvBHH8YA8sN4vpqamThPyFSV7vR62t7cxPT0NVVVzGcLzPPi+n3M/jehsz7o06wX6vNls4v333x8rR2maev1+/x0eAGq12qvj0lez2cS7774L3/cRxzGCIGBupDJDf2Z5mt1wHNAkSdDv9/H222/nUiFtkiShVqu9CgCCpmnPiqI4u59QZt0ahiHjYfYgAGDbNoIgQJqmkGWZZZEsNejf9HcKeBxIURRnNU17VqhUKs8TQpAkCRzHyVllenoa8/Pz4DiOWfFBxLOFbdvG6uoqNjY2MBqNQAiBaZqo1+uYmprK8Ze6OI5j6LqOhYUFNJtNhGGYA1coFEAIQaVSeV6YnJxcpFEGAIIgsMg6cOAAarUaXNdlp+Y4jlnRsizcunUL7733Hniep1GI69evo1Kp4MUXX8TMzEzOctkS7MiRI1hfX0cYhrmxQqEAQRAwOTm5yD3zzDONUqk0bxgGXnjhBYae53kIgsAkhYKjfOM4Dh9//DFu3boFGlzZeYPBAJVKBWfPnoVpmsyKwFdlF8dx8DyPyU8URej1emg0GkjTFP1+/7YgSdJBjuNACIEkSbmIpNzLcoRSYDgcYnV1FbZtwzCM3FiappiYmECv18PGxgaKxSJ4nmcAs8UsfY8QAo7jQCsnjuMgSdJBgRCi0+ijRSZ9IRuZu0FS5TcMY0/lQguFcrmM0WgE27aZVFF3784+tGdjgBCis3owmymo9ag1KS+zjUb0fo1ulBVn+jybt7PiTkFnmxDH8U6SJGW6YVbHsi7Jalocx9A0DYQQBEGw5wpALWpZFhRFYYFFZSlrsez69EAZg+0IQRB8oapq2fd99Ho9yLLMrEYLArohz/NsgWKxCF3X0Wq1WNTTeVlwpVKJvUd5SA8JAI7jsKyUpimGwyEDGATBF4Lrup8ZhjEfRRFWVlYY94IggKZpePLJJxmBqf5Rrpw4cQKWZaHdbkNVVWZJ13UBACdOnEC5XGbzaSSHYYg0TWFZFpaWlqBpGgPoeR7jqeu6nxFZlo+apvl9URRZAWDbNnZ2dnD//n1MTEygUCjkFJ/yVZZlmKYJnuchiiJkWYYsyyiVSpifn0e9Xt8TXDRlchyHZrOJlZUVJjfZwiMMQ6yvr/9V6Ha7H8zNze3hkCiKiKIId+/ehWmazHVUF6klFEXB448/DsuyWPWs6zokScpxi0Z2EASI4xi+7+POnTswTXNskMVxjG63+4HgOM5HYRh2AMxmFwOwpxKhG2atQp8VCgUUi8XcpT0rPRQczdc0KPe7XIVh2HEc5yNaDx4wDCNXbiVJAtM0cezYMVYNZyMv6+7dYLOHpIFBwdHD8jyPQqGA4XC4B2AQBOh0On/o9/vvEACwLGttZmbmZ5TkHMehXC5jbm4OhmGwojNrnWzEZkGNqwl3g6MH0XUdgiDg/v37OYCe52F5efnHrGCN43jA8/y0YRgnaTAsLCzAMAwEQZCzULZwzVo0O4c+D8MwV1WP64ZhgOM4rK6uQlVVBEGAtbW1K71e7w0gcycZjUY3ZmdnfyKKokJrOlVVc6KdJXo2U2QvQtlOMxPVOfp+1gOe56HT6cD3fUiSBM/zhktLSz9M09TOAUzT1HZdt2ua5g8kScJwOEQYhiiVSgxMkiTY2NjAJ598gq2tLTzgLxPi3TnVtm20220sLS2h3++jXC5DEARGB8/z0Gg0sLOzA03T4LouGo3G5Z2dHfapLpdgbdv+JyFkWtf1k5QbURRhYmICANDpdLC6uspubbRgKJfLuSDhOA5BEODGjRvY3t5GGIaIogij0QilUolaCsvLy3AcB6qqwvM8tFqtK51O5zdZTHu+LPT7/asTExNPybL8qCiKGI1GCIIAlmWh1WqB53koigJBELC9vQ1VVdlnjGwUu66Le/fugRACWZbZbXE4HEJRFHz66adwXZeB6/f7/2g0Gj/ajWcPQADY3Nz8e7lcfkqSpEdFUUS328XW1hZUVc3lXMuyYBjGWIA0I2WvpIQQhGGIZrPJaj8K7ubNmxfGYRkLkILkeX66UCiclCQJhBB2EaKctCwL5XIZ1Wp1z0XKcRwMBoNcmZXVRU3T4DgOWq3WlXGW+7cAqbsdx+lMTk6eIYQolOC0WZYFWZah6zqiKGJ65/s+hsMhLMvaI0PUmp7nDRuNxuXdnNvdvtMn4DAMQQhhNV+2UfnJtv/KJ+Bs+7/9iD6u/a/+DfEvKNd9SorMneIAAAAielRYdENvbW1lbnQAAHjacy5KTSxJTVEozyzJUHD39A0AADedBeKHffb4AAAAAElFTkSuQmCC") no-repeat;  width: 15px;} ')
GM_addStyle('#btConf:hover { background: url("data:image/png;base64,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%3D") no-repeat; } ')

GM_addStyle('#btprev { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAu9JREFUWEfNmc2KE0EQgDMQcoi5JMRjDoG95AXyACH/JBASIYFAfsg7eN/D+jx78R2MGoI/K4JgVFZBiC4qGBBF69OeYXaccXomm7UXmpntn6qvq7urajqJRMy/RqNxVKvVbjebzdNWq/VQnuf1en1H4V3VndKHvjHVRBsmSm+KshMpG4H42Ov1Xg+Hwxfj8fhsOp2uF4vFksI7dbTRh76MYSwyomnV6C1WuSHCj6Vc9Pv9zWQyeSQg96IUxjAWGchCpobq8C4i6JYI3IolXs1ms1UUKL++yEAWMpEdThDcwxIBd2RJPsSxWNhEkIlsdAiCFQm02+2mZd/clee7+Xz+IExZ3HZko0PpSutCWgyQZXijNn2kvRYDdokudGpZEpMzq2uCsye/RKda7mBDsmnZF4dc1iALo1PtSf+Do1zJ9hAHQnfZ0a1O998uCN/E8dcVdqh+ygUdX1pnFSEursLP7QsOA878UsQhBOHl9xV+VeNVxDlxrEic/J97zzsxtRc3vwHJNAjmUWYvScBKkoFABz4ajVadTuexV6YkEffb7fYTHV0qwThKkA6RcegMoo+c9jOZ189cLvfZO0ZcxbJcLr+0LOuHu536SqXyPJlMfvcb56cbJtgS5HOkRbqA1Wr1mR+gyHmaTqd3tLnbsZhffZg+mGBLkFiSu4UNsNu9gIPBYI1VbDD7mclkdoVCYeut17UgTLBhwXOVbGrFXBswm81+KZVKb70AYf/rAsIEW4IUPUrctQHDQILadQFhgs18wLhLzEmNY0VdCzpLvM8hCTog/wLXBXQfkr3dDD4ulUp9c4MB4nUxQf7Tz4M4biaqow7yg24n7Qax63HSUQAdRx011EkgX4uP+1osFt/7zZwwh//L5/Of3O2EOdyS7hI7oU7FY3OTBQVodrplfMKqrGhuyg+g8R9NCtLcz047/zf6w11Bmn31AaTpl0f2apt7/eZ8j/453cZeYDqcRl8Bu61p7CW6G9J+v66fIX4BEe4bjN2Tr3YAAAAASUVORK5CYII=); no-repeat;  width: 15px;} ')
GM_addStyle('#btprev:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA5RJREFUWEfNmctLG1EUh6OIC3GjhO5E3NWF2/wBik8QRLvILohgcOMDsehKRYyPjTsXIiomkK0b/4e2WLpoC13VtqhF8IG2JWoT7PnKnTAZMzN3ZpoywmXi3Ht/58u5c885cxOJ+Pzr7u7u6OzsfNnT03PQ29t7JNeTrq6uHI3P6t4BYxjr04y3aWL0uRhblnYsEFcDAwNft7a28tvb2/mdnZ2Hvb29exqfuUcfYxjLHOai4c2qxmjxyjMRX5R2PTg4eLy7u/t7c3PzbmRk5JVOYyxzmIsGWmhqmHYfIkIvRPBCPPElk8k86AA5jUEDLTTRdiewH1EtAilZkstsNpsPCmadjyba2BCEak+g/f39UXluDuV6lk6nA3vN7suhjQ1lK6oLWc0EWYZvXp4zvx7GBrawqeVJXM63+h9wxpfCFjbVcts7koeW56KSy+q03OqZLL9xVCi5qMSG0F1+bKvd/TQEEZvY/rpilRqnQtBiyTqrDHH9L+JcUHAYCOYlGYcURJTXER8dHT1KJpOBGhpOtlTGWS56kTxJKnIDnJiY+LixsfFzfX39fmVlxVdjLhpo2dmDBaa/gFQaJHOdsCLiORlXmJubu5ycnDybnp4+KdfGx8e/j42NnVv7pqamTmdmZq7RQMsOEBZVYHREKIeoONy8Rz+i8/Pzhebm5sfGxsZb65zh4eHXsVjsc1VVVcHcz/329vZPNTU1+ba2tl8LCwt5J0B0YYItQj1HWRQUUHQ+1NXV5WRRHmkGYF9f33vzfV1AmGCLUFhSu/kFHBoaegeMAWZc6+vrc01NTRfW+7qAMMGGB08oML0CNjQ0/GhtbT21Arj9rwsIE2wRSnSqYK+AbiB2/bqAMMEWfkC/S8xO9eNFXQ8WlzjIJrHbIE7guoDmTRI4zBDjamtrH8xg7GxriKFfF7AYZgiG4k7fYcbYXOYgbY6Dxn2CtBfAYqD2muokCxQkvNy1tLScl9v58Xj8LfEvGo3emPsTicQbwpKOB0tSncrHWsUC6Um8XVhaWrqdnZ298tOYi4ZTqispFhSgVrlFmbW2tnaDuFx9Neaurq7eoGUXe5+UW6EvWJUXw1vyA2h6aXItXHXSop8x8tJEocqRSPlzG+O1c39/X6t48ANhNwebjq+dRv0f6hd3BRnuow8gw354ZKx2eI/fzG/1YT7ALHKG+gjY7E3rIXoqlSqE4hDdDGl8Vj9DHFb6Z4g/9uu3Wm4N3/0AAAAASUVORK5CYII=); no-repeat; } ')

GM_addStyle('#btnext { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAu9JREFUWEfNmc2KE0EQx2cg5BBzSYjHHAJ7yQvkAUK+SSAkQgKBfJB38L6H9Xn24jsYVxE/VgTB6LIKQnRRwYAoWr/YE2bHzE7P5MMONDPT01X17+rqf9V0LCvir1qtHpXL5bu1Wu20Xq8/kutlpVJZ0rhXfaeMYWxEM+HExOhtMXYibS4gPrfb7Xe9Xu/1YDA4H41GT6bT6YzGPX28YwxjkUEWHeGsaowWr9wS5cfSrjqdznw4HD4VIA/CNGSQRQe60KlhOniIKLojChfiibfj8fhxGFCbxqIDXehEdzAC/xG2KLgnS/IpiseCJoJOdGNDINihgLZarYTEzX25fphMJmdBxqK+Rzc2lK2ELkgbAVmGCxX0oWItAtgZtrCp5UlczqwOBM6Z/Aybarn9HUnQEhf7XFY/D2NTxeTmjaOoZLGPDaG77NhWu/tfCoKb2P66yvY1TlHQ8bV1Vhniahc8ty1wMEDm1zIOKQiW31b5ruRVxjlZe5E8+T9jzzsxFYvzFUAqDZJ5mNk3Go3nUhA89Mo0m81n/X7fNx1KAXEmBYRWulQFxpFFOUTFEQZgOp3+GovFfhaLxVdCD1QwKz6j37btX4VC4Y273/1efPJbGOM8yB6YwGZRz1EWBQm43wMEQ7REIrHEow5Ad7/ofrFJrlQqvQyyByawWRSW1G5BAn4AHUDZbHaRTCaXzrNzZTLdbpdaceVh+nUAgglsePBSFZvaOdftQS8gv+d8Pv8+lUp90wUIJrBZlOhh824UgG7gOh4EE9jMB3ioJcaD7PDQS7yrTXJTLDobJeom2Ypm3FTjjc14PP4DrvTyoE4MrmkmKlEDDLJ2k7ID0I+sw3hwTdRRUh2GoA1vustkMl/gQ790l8vlPgpXfpdiYMWLN7V1qlP52NxiQQE0u9wyvmBVXjS35Aeg8R9NCqS5n51O/W/0h7sCafbRByBNPzxyVtvc47f19+jf3W3sAeYap9FHwG5vGnuI7gbp3B/qb4g/nzcbjL8CH7sAAAAASUVORK5CYII=); no-repeat;  width: 15px;} ')
GM_addStyle('#btnext:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAA5ZJREFUWEfNmUtLHEEQx1cRD+JFWXIT8RYPXv0Aik8QRHPYm4igePGBGPSkIq6PizcPIioqePXid0iCIYckkFNMghoEH2gSVs0upn7SvfSuzmzPTEZmodmdnq5//buqu6q6Nxbz+WlpaWlsamp63drautfW1nYg30fNzc0pGr9V3x5jGOtTjTcxUfpSlM1JOxQSF52dnd9XV1fTa2tr6fX19bvNzc1bGr/p4x1jGIsMsmB402oxWqzyQsBnpF12dXUdbmxs/F1ZWbnp6+t7Y9MYiwyyYIAFpoXqwkME6JUAnoklvu3s7NzZEHIbAwZYYIJdmIHziGIBSIpLznd3d9NBieXLgwk2OoRCsSeiHR0dcVk3+/J9sr29HdhqTpMDGx1KV9yWZDEC4oYfXtaZXwujA13otLIkJmdWz0FOTwpd6FTudjYki5Z1EaZb3dyt1uTTG0eFkrMwNoSt+9GtdvfjEERsYvvbgoU1ToWgmRw/qwxx+T/iXFDicCCY52QcUhBR3g28v7//YGBgIFADw2YCKuPMZa1IniQVOQkPDw9/Xl5e/r20tHQ7Pz/vqyELBliFSMIFTg8EqTRI5m5hRcBT8j4zPj5+OTo6ejw2NnZktsHBwdOhoaGf+f36eWRk5GRycvIcDLAKEYSLKjAaY5RDVBxuQoBOT0+n6+rq/pSUlKQbGhq+9Pb2vtUylZWV10VFRZn6+vqvZr/5vrq6+n5qasqKIHJwgluMeo6yyJagGP2eVlZWlmpvb/+IHATNfsH8ZOLx3itBOMEtRmFJ7eaVoCZUVVV1Vl5entLP+htS3d3dH/QEvBKEE9yw4BEFpl+C+cTyn2tra48rKip+eSUIJ7jFKNGpgsMiqAl7JQgnuEWfYNguxoLscK8WzLo46CZxW4N6o/jZxeYm8RVmzFBjhhn6S0tL74iVQeJgNsx4DdQQIFibQVkTdArWfiwoLk4/BGrbVKczCWGjp6fnnbnr4/H4FfEwkUi8fyoa1NTUnIrcjWBYZZKcVKfysWuxQKqTGWVmZ2evJyYmLvw0ZMGwycU5xYIi6FpuUWYtLCxcAb64uOirKdkrsAoVC4/KrcgXrMqK0S35IWgcmhwL10KuCfpeDk0UqlyJPH1vo4+dW1tbod0mOE0Cna7HTl3/R/rgrkhG++oDklG/PNLeju71m3mqj/IFZpZnpK+ATWv6uURPJpOZ0C/Rcy5y1IOHvyH2g/wN8Q9TTrdajWHMAQAAAABJRU5ErkJggg==); no-repeat; } ')
GM_addStyle('#btvoldown { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAmtJREFUWEfVmTtrIlEUx8fCwqSwMY11Ois7v4AvUBAJWAg+8Dukt0g+T5p8h0h2Cbuw2+yCeZEqD1KEpAgk5xfOhIlR5t5Rw4lwGRnP+Z/fnPs6cw2ChJ9qtbpdLpd3a7XaQb1e/yHXy0ql8kjju947wAbbhGH83CTolgTbkzYViNtWq3XW6XT+dbvdP/1+/2Q0Gk1ofOcev2GDLT74ouEX1cFasrIp4mNpd+12e9rr9X4JyJFPwwdfNNBC0yF0vIkI7YjgtWTidDAY/PSBmmeLBlpooh1PsNgiJQL70iU3STIW9yBook0MQUh5gTabzQ0ZN4dyvRoOh8dxwZL+jjYxNNaGK2QKB+mGcx30XmMtAeyEWMR0yiQp56m+CC58+AkxtbsXJ5JBy7hYZ7cuyjAxdUzOnzi6lFyvY0K4djuxdXZ/XoJYm5j+rmLrstMlaPyhn3WHuFvFOrcsOAws5h92HLYgVvllxVflrzvO3nsW2SdXMfaKxeJpPp+/XRZUx+L0DZBKg818GdFGo/E7l8vdi9wL11CL+6VS6X8SbS0wtgPKISqOJCL4FAqFC8DCFgICl06nn7kvMf766sMEW0A9R1nkK0DQTCbzFIWLZjAKGM2qaxyYYAsoLKndXBxnszULN9vFUXuAXWKENjDBRgYvtdiM3XN9ASXIcfgQ+PoAwgRbQInuuu/6AgKUzWYfgPQFhAk2+4Dmu/g7TBLby4z5hdr8Vqf7sd1iQQFtl1vmC1bNot2SH0DzL00Kafe1M6z/Tb+4K6Ttow8grR8ehb1t9/gt+lZv+QDzndP0EXA0m2YP0ecd2H3V3xCvQJowxOuUj9QAAAAASUVORK5CYII=); no-repeat; } ')
GM_addStyle('#btvolup { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAtxJREFUWEfVmT1rG0EQhk+FCjmFGqVRo8aqVKlTpU5fIIEQAhUCfaD/kN6F83vc5D9EOMEkkEBIQHZiEghOTIqQFIFknrAj1sqt7vawzcaw3N1qdua9dz52bh1FGf86nc5hq9V61O12T3q93jO5Xrbb7R8M7s3cCTLIZjTjt0yMPhRjxzI2AuLrcDi8mEwmb6fT6av5fH62Wq3WDO6Z4zdkkGUNa9HhZzWFtLDyQJQfybgejUab2Wz2QoA89RmsYS060IXOFKaTRUTRWBReCRPni8XiuQ+oOFl0oAud6E5G4JbIiYLH4pIvWRhLehF0ohsbAiHnBXQwGBxI3DyR68flcnmaZCzr7+jGhrF1kBZkjgXihvcm6L1iLQPYNbawmYpJKOet7gmcvvwam8bdbiIJWuLiLtxaqVQ+F4vF7y6GsWliMj5xTCm5uouEaDQa74SW3wyAukBi22T3vyWI2kT6Z4ihVDEKewqy2Wy+cdkxJejohp/NDnF9G3XONgxbsMec7Cyn+Xz+FyALhcJPnl11kmJ+Y8dhC6LK3yZ71Wr1E2AA1e/3X6Ib5pTFWq32wWXP7DjHWxbZJ7PE3ng8PiuVSt+kIXi9awxQCsZODuSVxYRY3PwFSKfBZu7LHgwoABsg8+o+W0ZdbSfMvlg0DcZhRDtEx5EWIGCIIQXHVQESczyXy+XtC6uszaLGImGwJ1kuwBbRz9EWJQGEFY0rG1wcQHuuXq+fqzwhgR1egDnc7bILJrBFNJb0bi7BXTBxz8qgnala7wC1W15s17vsgglsMHhpms3YeuYDEGPqZtyoxncz185mF0AwgS2iRd+37/oCtF2qxjVztbTAuOrdE1prsIUPMHgX/w9JEnaZCb5QB7/Vmf043GbBAAy73Qq+YTUshtvyAzD4jyYDMtzPTu3/g/5wNyDDPvoAZOiHR+rtcI/fFKEmTqgHmFucQR8B22wGe4hug9T7+/o3xB/c1sjb3A8ZEQAAAABJRU5ErkJggg==); no-repeat; } ')

GM_addStyle('#btinstance {width: 150px; margin-left: 20px }')


GM_addStyle('#playlistControl  {display: block; width: 100px;} ')
GM_addStyle('.btclear  {margin-left: 20px;} ')
GM_addStyle('#playlistControl a:link {color: #ffffff; text-decoration: underline; } ')
GM_addStyle('#playlistControl a:active {color: #0000ff; text-decoration: bold; } ')
GM_addStyle('#playlistControl a:visited {color: #ffffff; text-decoration: underline; } ')
GM_addStyle('#playlistControl a:hover {color: -webkit-link; text-decoration: none; } ')

GM_addStyle('.xbmclink:hover {color: -webkit-link; text-decoration: underline; } ');
GM_addStyle('#xbmcstatus {-webkit-transition: text-shadow 0.2s linear; -moz-transition: text-shadow 0.2s linear; -ms-transition: text-shadow 0.2s linear; -o-transition: text-shadow 0.2s linear; transition: text-shadow 0.2s linear; text-shadow: 0 0 10px blue; -webkit-box-shadow:  0px 0px 25px 5px #090909;  box-shadow:  0px 0px 25px 5px #090909;}')
GM_registerMenuCommand("Change xbmc host(s)", modify_xbmc_address);