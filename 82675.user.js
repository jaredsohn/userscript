// ==UserScript==
// @name           SoundCloud Downloader
// @description	 Allows you to download EVERY song from SoundCloud. It's better than other SC downloaders, because it adds links near EVERY player, since most of other downloaders add them only on Song-page. Sometimes in song-sets (aka. lists) not all download links are available. If then, you must click on that song, and link will show up.
// @author         Informatic
// @email          admin[@]tastycode.pl
// @namespace      userscripts@tastycode.pl
// @include        http://soundcloud.com/*
// @include        http://*.soundcloud.com/*
// ==/UserScript==

// @todo           Add some download links to "main actionbar" of sets.
// @todo           Add download links to lists, where they aren't available (where you must click on song first)



function init_scuserscript() {
	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");

	style.innerHTML = ".mydownload {padding-top: 5px;padding-right: 8px;padding-bottom: 5px;padding-left: 20px;white-space: nowrap;font-size: 10px;line-height: 21px;color: #333333;border-right-color: #cccccc;border-right-width: 1px;border-right-style: solid;background-image: url(\"http://a1.soundcloud.com/images/icons_mini.png?taylor16\");background-repeat: no-repeat;background-position: -76px -236px;} .mydownload:hover {color: #0066cc;background-position: -76px -256px;}";

	head.appendChild(style);
	players = document.getElementsByClassName("player")
	actionbars = document.getElementsByClassName("actions")
	tracks = window.SC.clientDB.getTracks()
	
	function calcsize(duration) {
		return ((((duration/1000)*128)/8)/1000).toFixed(2) // Stupid, but works ^-^
	}
	
	for( var a in actionbars ) {
		if(actionbars[a].className == 'actions') {
			if(actionbars[a].parentNode.nodeName == 'DIV') {
				//normal song
				trackid = actionbars[a].parentNode.parentNode.getAttribute('data-sc-track')
				track = tracks[trackid]

				if(typeof track != 'undefined') {
					if(window.$(actionbars[a]).find('.primary .download').length != 0) {
						if(window.$(actionbars[a]).find('.primary .download.disabled').length != 0) {
							// reached download limit
							window.$(actionbars[a]).find('.primary .download.disabled').remove()
							window.$(actionbars[a]).find('.primary').append('<a title="The file you\'re about to download has a size of '+calcsize(track.duration)+' MB" class="mydownload" href="'+track.streamUrl+'"><span>Download</span></a>')
							window.$('.pl-button').unbind()
							window.$('.download').unbind()
						}
					} else {
						window.$(actionbars[a]).find('.primary').append('<a title="The file you\'re about to download has a size of '+calcsize(track.duration)+' MB" class="mydownload" href="'+track.streamUrl+'"><span>Download</span></a>')
					}
				}
			}
			
			if(actionbars[a].parentNode.nodeName == 'LI') {
				//songlist
				trackid = actionbars[a].parentNode.getAttribute('data-sc-track')
				track = tracks[trackid]
				
				if(typeof track != 'undefined') {
					item = window.$(actionbars[a])
					if(item.find('.download').length == 0)
						item.prepend('<a title="Download '+item.parent().find('.info a').text()+'" class="download pl-button" href="'+track.streamUrl+'">Download '+item.parent().find('.info a').text()+'</a>')
				}
			}
		}
	}
	
	window.$(window.document).bind('clientDbTracksUpdated', function(ev){
		db = window.SC.clientDB.getTracks();
		for( var t in db ) {
			item = window.$('li[data-sc-track='+t+']')
			if(item.find('.download').length == 0)
				item.find('.actions').prepend('<a title="Download '+item.find('.info a').text()+'" class="download pl-button" href="'+db[t].streamUrl+'">Download '+item.find('.info a').text()+'</a>')
		}
	})
}

/* This hack to support Google Chrome is as dirty as
 * http://soundcloud.com/plast-c-youth/plast-c-youth-underground-3 ... ;)
 * It's even working on Firefox 4.0 - it will stay like this.
 */
var script = document.createElement("script");
script.setAttribute('type', 'text/javascript');
script.innerHTML = init_scuserscript.toString()+"\ninit_scuserscript()";
document.getElementsByTagName('head')[0].appendChild(script);