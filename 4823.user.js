// ==UserScript==
// @name          2-in-1
// @namespace     Copyright Cody R. Persinger 2006
// @description   Ajax module for pulling up and implimenting homepage content automatically and XSPF player
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @exclude       http://*myspace.com/*comment*
// ==/UserScript==

function getupdate() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://home.myspace.com/index.cfm?fuseaction=user',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/xml',
		},
		onload: function(responseDetails) {

			// Update Message/Friend Request/etc indicators
			var html = responseDetails.responseText.replace(/\r/g,'');
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="show/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "block";
				}
			}
			RegExp.lastIndex=0;
			var r=/id="(\w+)" class="hide/g;
			while((a=r.exec(html))!=null) {
				for(var i=1;i<a.length;i++){
					document.getElementById(a[i]).style.display = "none";
				}
			}
		}
	});
	setTimeout(getupdate, 15000);
}

getupdate();


s+= document.getElementById('splash_coolNewPeople').innerHTML = '<embed allowScriptAccess="never" src="http://www.fileden.com/files/2006/7/8/116430/xspf_bwhite.swf?playlist_url=http://www.fileden.com/files/2006/5/28/39678/mp3playlist.xml&autoload=true" quality="high" name="xpsf_player" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="center" height="160" width="225"></embed>';"a[id*='ns1_HyperLink2']{display:block;margin:0!important;margin-top:10px!important;text-align:center;font-size:12px!important;}\n";