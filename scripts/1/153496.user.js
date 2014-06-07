// ==UserScript==
// @name           Netflix Watch Now Download Links
// @namespace      *
// @description    Adds download links next to every Play button in Netflix Watch Now.
// @include        http://www.netflix.com/WatchNow*
// ==/UserScript==
// v0.05
// by shitburger, rorta forums
(function(){
var IAmRunningWindows = true;  // change this to false if you're using Linux, BSD, OS X
var minBR = 1000; //change this to your mininum desired bitrate: movies won't show up for download if they're not available in at least this bitrate









// don't change anything below here!









var cURL = (IAmRunningWindows) ? 'put the <a href="http://curl.haxx.se/latest.cgi?curl=win32-nossl" target="x">cURL</a> executable somewhere in your path (like %SYSTEMROOT%)!' : 'install <a href="http://curl.haxx.se/download.html" target="x">cURL</a>!';
var UA = "WmpHostInternetConnection";

addGlobalStyle = function(css)
{
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#DDL{font-family:trebuchet ms,verdana;padding:10px;background-color:#fff;text-align:left;color:#000} #DDL li{list-style:none;margin-bottom:10px;} #DDL li textarea.curlLink{border:1px inset #ccc;width:420px;padding:3px;height:70px;overflow: hidden;font-size:0.8em;color:#999;display:block} #DDL p.movieTitle{font-size:1.3em; font-weight:bold;font-style:italic}');

addGlobalStyle('.dLinkSmall, .dLinkBig { ' +
'display: block; width: 100%; padding: 0; overflow: hidden; background-repeat: no-repeat; background-position: top center; } ' +
'.dlinkSmall { height: 18px; margin: -3px 0 5px -1px; ' +
'background-image: url(data:image/gif;base64,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); ' +
'} ' +
'.dLinkBig { margin: -2px 0 5px 32px; width: 110px; height: 22px; ' +
'background-image: url(data:image/gif;base64,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); ' +
'}');

var theAs = document.getElementsByTagName("A");
var playLinks = new Array();
var dl = "";
var i = 0;

for(i=0; i < theAs.length; i++)
{
	if (theAs[i].className.match("watchlk")) playLinks.push(theAs[i].id);
}

createCurl = function(title, url, bitrate)
{
	var makeZero = (IAmRunningWindows) ? 'cmd /c set /a 0' : 'echo 0';
	var filename = title + '-' +bitrate + '.wmv'
	filename = '"' + filename.replace(/[\/\\:*?"<>|]/g,"") + '"';
	return makeZero + ' > ' + filename + ' && curl -L -A "' + UA + '" -r 1-3999999999 ' + url + ' >> ' + filename;
}

curlit = function(m)
{
	if (m.length == 0)
	{
		return;
	} else {
		var s = (m.length > 1) ? "s" : "";
		var outHTML = '<form>Click in the box below "Bitrate xxxx:" to select, then copy and paste at a command prompt in the folder where you want to save the movie.<br />Don\'t forget to ' + cURL + '<br />';
		for(var i = 0; i < m.length; i++)
		{
			outHTML += '<p class="movieTitle">' +  m[i].title + "</p><form><ul>";
			for(var ii = m[i].streams.length - 1; ii < m[i].streams.length; ii++)
			{
				var found = false;
				var count = 0;
				if (m[i].streams[ii].bitrate > minBR)
				{
					count++;
					found = true;
					outHTML += '<li>Bitrate ' + m[i].streams[ii].bitrate + ':<br />' +
					'<textarea onclick="this.focus();this.select()" class="curlLink">' + createCurl(m[i].title, m[i].streams[ii].url, m[i].streams[ii].bitrate) + '</textarea></li>';
				}
			}
			outHTML += '</ul>';
		}
		outHTML += '</form><a href="#" onclick="document.getElementById(\'DDL\').style.display=\'none\'">close this panel</a>';
		if (!found) outHTML += "No movies found at or above your desired bitrate (" + minBR + "). Edit this userscript to change your desired bitrate.";
		if (undefined == document.getElementById('DDL'))
		{
			var DDLlist = document.createElement("div");
			DDLlist.id = 'DDL';
			DDLlist.innerHTML = outHTML;
			document.body.insertBefore(DDLlist, document.body.firstChild);
		} else {
			document.getElementById('DDL').innerHTML = outHTML;
			document.getElementById('DDL').style.display = "block";
		}
		window.scrollTo(0,0);
	}
}

grabWatchNowPage = function(event)
{
	var theUrl = event.currentTarget.toString();
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: theUrl,
	    headers: { 'User-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1'},
	    onload: function(responseDetails)
		{
			pg = responseDetails.responseText;
			pg = pg.replace(/[\r\n]/g,"");
			pg = pg.replace(/.+(var WNPlaylistMovies.+)/,"$1");
			pg = pg.replace(/(\]\}\]\}).+/,"$1");
			eval(pg);
			curlit(WNPlaylistMovies.movies);
	    }
	});
	event.preventDefault();
}

for(i=0; i < playLinks.length; i++)
{
	thisLink = document.getElementById(playLinks[i]);
	dl = document.createElement('a');
	if (thisLink.parentNode.className.match("btn-watchlk-40")) dl.className = "dLinkBig";
	else dl.className = "dLinkSmall";
	dl.href = thisLink.href;
	dl.innerHTML = "&nbsp;";
	dl.addEventListener('click',grabWatchNowPage,true);
	thisLink.parentNode.parentNode.insertBefore(dl,thisLink.parentNode.nextSibling);
}


})();