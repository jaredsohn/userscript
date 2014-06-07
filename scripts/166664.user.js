// ==UserScript==
// @name           qwdqwd
// @description    leaving the page.
// @namespace      http://deluge-torrent.info/
// @include             https://tracker.beathau5.com/*
// @include             https://www.waffles.fm/*
// @include             https://what.cd/*
// ==/UserScript==

// Version : 1.6.5

// Author :
// First version by Martijn Voncken ; mvoncken@gmail.com.
// Re-write and Deluge 1.2+ support : aidos

// Contributors : 
// Url-based submit and parsing based on : "Add Torrents To utorrent" by Julien Couvreuro
// Cookie support by Aqtrans


// ******************************************************************
// /!\ These parameters need to be edited before using the script /!\
// ******************************************************************

// URL format : http(s)://HOST:
var deluge_url = "http://thanatos.ferumb/deluge"; // for example : "https://example.net:8081"
N
//*******************************************************************


if (deluge_url == "") { alert('You need to edit this user script with your Deluge parameters before using it.'); }

/* Image number: 
		0 = deluge (blue)
		1 = downloading (green)
		2 = active (blue+green)s
		3 = seeding (blue)
		4 = loading
		5 = error
*/

var images = {
	0:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1wkPFjUNUreV2QAAAnRJREFUOI19k0toE1EUhv/Mncykd5pMMtNkTDQKGrEWC5ZqXVQ36sJSqAvJztdKUItu3HTXhYggWLBFdyIiihQ3XYgLRUVKfUCpVFrow7TW2k7StGmSmUxmJhk3FmyT9Czv+c7HOefeC2wT3T397dd7Bo5tx7hqJS7cuie0Hdw/zbndZGxivvHR3Wtr1TimlqDBJz3RbSaslUkosjs6VIurKujqfhjn/cq5JY1A1Vkw9f7jN/pe367Gkq0HJ670hWU59PbbeIJX1VW44MAkdZAksT3Scnb4x4cXidqC3l4mVpDH56YTIT91QxQIbNMAjCxyBhhlh9xB955+mvjyStsoYf+vP5qQBspY33O4MYKQ7AMXUACWwjLyWF1cgJokweiu0HMAp6ruwM+7LvMsQbhBRNOhJuyMRqGEAggEFQSiMZTzabCEOXnm5rPzFYJ9Xb2xfC5f5xV4iKKAcESBInkh+Si8lAetF+ARZazkDMiScLVCIFLaCgCGZQOOg6DkheynEOo4uFkChnGBpSJMqwzbto5UjuAq6wAwv7iGpVQGVkGH4OFAGAaO48AulWHaJZiWDccqkng8TjYJkqo6CgCrWQ2zCyt4934E6XQaRdOCXrRg2yUwcEDZEpyiPjU4OFjadI3ZxGfuQFvnxYJh1v9WM8hkNaRTKeTWM7BtC2WHgW5YEEkRk18/3v8zOzq89R3QvFb8tTvW3Onh3WRBzWBqTsVycg3LS0msp5NgS0XMTHx/MzL0oB9ACqj8TEEx1NjS2nHpDu8RmnOawVGPGx6ecwpWKfdzcuzl7KfHfQBmAFjVBBvBAfABoP+6NADkAeS2gn8Blu/uY7RdIbMAAAAASUVORK5CYII=',
	1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAITSURBVCiRfZLLaxNRFMa/O3PnkaST1zjURixY66IQH+DCgksXLnTXdiOIQSmoy0G3/gmpiDsRI6Ib3bhw40IQXAk1C9NGCoEWS2JNmqSZZJJ5HhexoYngdzmLe8/5cc/5OIyIcFT5Uk5RxOhrJ7BvmdlCDxPikw8xnlyLy/qS5TUJwMpkXjh6ebxx52qUa3drdgWyoC4/3bx3fxJghy3lSzldVzLltls3AvLAwKCrJ9zGYHfRzBaK//wwJaVeOoFtBOQBAAiEA7cup5WZ9/lSLjEGPNlYXZUF9VrHacFq9EfRs3twgv5JTUq/OQTE+PK2nlSmP7bdPWlnvYm55HloMKDBwPZmFZFMiJiUOPNl793uJeNlUYjy+JIXOpGQQjDGMDs/MwpZGZp44NYRl9KP8qUcF6Z4cqXrtyfNGFNIAQIKZiVBuSn45F0gCv8LAEDHa0CT0qYAsA4RUHxbheqnxoriio6fnwf4XbFAw8O4yMQWY8Dc5TRi/eQYML8why7bh3Fag8RkBKG/L4hM2mFMQCKjwlJr+L5eHg7aslAsf4WxoAIAIjwOJ+xtsWc/zHNckL81nZoIAO1qH/iVwEBq4/jZ6N9iDZxJFctrXmREhOdbD29wJr/o+i3ZCWw4tg8lyqGIUcR4Aj55nY7bWDSzhfJol9ZKt0+llOkHAhOvhBQeA6AG5H/quPVXBPpgZgs2APwB/4Li9aLgn7EAAAAASUVORK5CYII=',
	2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJCSURBVCiRZZJfSFNxFMc/v7u7ee/+ubk7M53TEqPhi4KU9pAPURFKEeogCHxKorfovXqqp+ipHkZBQSYNoiKIiqDA0kJDLKjAQkSb26xN3a7747y3B9Fsfd/OOZ8v53zhCNM02a5whAqHjSG9yEB0EJ0yyeUNr53rmpPelI4J9JfPpe3FqVscdSucnU6CYqVv4A7nyg1i86RwBF/Ay9fECv61dRACAh6Kc2k6ooNM/rehysFdvbABA5gmJDPYaj08CUeo/Mdw+jZnVCvd6VUorsTgR5R8fIpCCfQC9T4H9zcNli+1l301lbxcWMaaX/6J3/jO/q5ubMYS8ViMdWUHHjvNw+PMn2xjUqpU6c2XUHPpOfzGNK37ugCo37WXUJ2VXPwTyQxoTi6GI8iy107/TCLH0tQ9fC3tmKaBEBvR8rksRuINkj+Fp0oNSs7VS+J81FycT6NJ0hr5hWf0HGrC4dKpsKUYHXtEbXtxI6ywYDda8nJ98KFNaxzn8+OPhJrqqAt0IiQBgM+tMD+SwXBlaWyrxhSmkJyOmKyocUJHNGRZ3oIBdjc3sm4pEGz1IQsbhZKUl4ySPymEhNNXgRzMMvp6HIDldJaxD29pOOAGQJVdZHJyXJqNtQx4bDsBcGkKlkCGV09HeD/xjmDHXziXd60t/g4etowM3Zx98S1b6XfrnQYlLKqJUmPiDSooFgdum4ZpqOZMLHTi2rG+ia1fuvD8wcEGLXfDoab2CItuhZLI5KrjibRr2Fz1XLnac/wXwB8VGdb/8OWcaQAAAABJRU5ErkJggg==',
	3:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHhSURBVCiRjZK9TxNxGMc/v+vd9dpiX2wbCFoSjCS6GIwJsnVwcGAySKNGw2SjxomwuBj+A/eqUaNg0s3BxRj/AY0EB0kEBhFKWywtvV6vvfbu52CoWE30uz0vnzzP880jpJQcViaHP6SzaDnM5rNY9EntT8SCPEgMML1nIYGZ/rpyOLj6iIthg1trZTA0Ls8+5U4/IA5WyuSIH4+xWqqT7LggBKRiOJt7TOazLP8x4WiIZ1b7ZzOAlFCqow9HeZXJEfkNuP6YmwGNqWoTnHoBNvK0iiu0u2A7pOIhlg4A3+fhhfhQhDc7+2it/W2S3jrn01PoXo1ioUDXP0gsyNjSe7YunWVZiQSYbnUJ2NVvJL01xifSAKRGT3H6mIZd/ETJhMQA9zM5VCUWZOZ7zaa28gLP7SCl13OkZTdwNt9iltZxPUYMjRtKx2VcqAEG0/coWEfodpwesLNrEZmYI5g8SdmEeIg5RQjq/V7/TVKCBKH4BNX/AfwqdFwqiqbyVRH/BsIBsNp8EbcX5Rm/ysftGj633cDc+tBrMqIjGPEThA3QVDYqDc4JKSV3X3LNr/KkYqE3f91MSIdoEByX+q7JZD7Lau+XrjxkdCjCvKpwwfVIAEbX413Z5LmUvM5naQL8AFjEu4EoxfZeAAAAAElFTkSuQmCC',
	4:'data:image/gif;base64,R0lGODlhEAAQAPMAAP///wAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=',
	5:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACp0lEQVR42n2Tz2vUVxTFP++9mQwZDTHqIEQqNYuCXWtxE2NW7twF2l3Joj+Stg6FMlD/gk6hJTJNd0MXLgV/oFa6EAQ3dVtNFokFM9IZkpnvzCSTmXy/3/fu7SKJhIjezV3cc849F+4xqsrhmrW2ABhAAN3vVZHOYaw5LHC9UFg4curUl0dHRxHvVUJAvKfX7TLodv/4KYq+fqfA9ZMnb3w0NTX3WankQq3G8sOHhMGADycniYH7N2+Gf1+8+L3c6Xz7lsCPJ05Uzl2+/NWnxaLj6VP+fvCA8ZkZVJX1W7c4d+ECzZER/rx3L6ytrlZ+7vWKAJk98uLH09NfzMzPO330CEkSGBtj4soVADrPnhG6XUaaTabOn3d/RdHcd87FN0Io2Vlrjw0fP/75zPy8M3fuEFotQqdD0mgQ4hg/GBAtLZE0m+wsLZG7fZuLExPZ4VxubtbaQgYw+Xxew8oK1Gr4Vgvf7zO0tkavXkdCQJaX2V5dJajiRbD1OjlrAUwGsIiQvnqFPHlCUCWocjRJaL98SUgSxozBqxJECKokcYyEoIBkACNxLMn6OkZ1F6jKiLVs1mpIknDEWoLIm5lPEkQEQHcdhEC6s4M9sMUA3ZUVMmlKZo+4f0K664B9B7q1uUl8+jRZY94Am97TjyKMcwy8Z/SAi573xCIGUFsV2dhqtxfv372bbl29ijcGL0JUKDBdLjNdLjM4c4YgQqrKf/k8z3u9NFWtVkU6GYBfvS8VnbMhSa5NXrqUHX78GNdus/n6NdY50kaDVJVGPs8/29tpS6RSUf3+rVcuOvfLB+Pj33xy9myWep2NKEK8Z9gYtkPgeb+ftkQWflP94Z1huubcQm5oaDZrjKoIiKAiJhYhUV2sqJbem8a9OB/bi7M90LUqsnEY+z8wyrjddZe8zwAAAABJRU5ErkJggg=='
};
var counter = 0;


function makeTorrentLink(link, url, i)
{
	var torrentLink = document.createElement('a');
	var id = 'deluge_link' + i;
	torrentLink.setAttribute("href", url);
	torrentLink.setAttribute("id", id);
	torrentLink.style.paddingLeft = "2px";
	torrentLink.innerHTML = "<img src=\"" + images[0] + "\" style='border: 0px' id='image_" + id + "' />";
	link.parentNode.insertBefore(torrentLink, link.nextSibling);
	
	var domLink = document.getElementById(id);
	domLink.addEventListener("click", evt_callback_factory(url, id),false);
}


function changeImageSrc(linkId, status, msg)
{
  msg = typeof(msg) != 'undefined' ? msg : "Blah";
	var imgIdx = 2;
	if( status == "ready" ) {imgIdx = 0;}
	if( status == "loading" ) {imgIdx = 4;}
	if( status == "done" ) {imgIdx = 1;}
	if( status == "error" ) {imgIdx = 5;}
	img = document.getElementById("image_"+linkId);
	img.src = images[imgIdx];
	img.title = msg;
}


function evt_callback_factory(url, linkId)
{
	function send_request(method, params, onsuccess) // extra args get passed to onsuccess
	{
		var extra_args = new Array();
		for(var i=3; i < arguments.length; i++) extra_args.push(arguments[i]);

		GM_xmlhttpRequest(
		{
			method: "POST",
			url: deluge_url + "/json",
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			data: '{"method":"' + method + '","params":' + JSON.stringify(params) + ',"id":' + counter++ + '}',
			onload: function(xhr)
			{
				res = JSON.parse(xhr.responseText);
				if (res.error == null)
				{
					extra_args.unshift( res );
					onsuccess.apply(null, extra_args);
				}
				else
				{
					changeImageSrc(linkId, "error", "Error in response to " + method + ":\n" + xhr.responseText);
				}
			},
			onerror:function(xhr)
			{
				changeImageSrc(linkId, "error", "Error while calling " + method);
			}
		});		
	}


	function evt_torrent_submit(evt)
	{
		changeImageSrc(linkId, "loading", "Authenticating...");
		var params = [ deluge_password ];
		send_request("auth.login", params, get_download_path);
		if (evt.preventDefault)
		{
			evt.preventDefault();
		}
	}
	
	
	function get_download_path(res)
	{
		changeImageSrc(linkId, "loading", "Get download dir...");
		var params = [];
		if(url.match(/^magnet:/i) )
			send_request("core.get_config", params, add_magnet);
		else
			send_request("core.get_config", params, get_torrent);
	}


	function get_torrent(res)
	{
		var remote_download_dir = res.result.download_location;
		changeImageSrc(linkId, "loading", "Downloading torrent...");
		var params = [url, document.cookie];
		send_request("web.download_torrent_from_url", params, add_torrent, remote_download_dir);
	}


	function add_magnet(res)
	{
		var remote_download_dir = res.result.download_location;
		changeImageSrc(linkId, "loading", "Adding magnet...");
		var remote_download_dir = res.result.download_location;
		var params = [url, {download_location: remote_download_dir}];
		send_request("core.add_torrent_magnet", params, after_add);
	}


	function add_torrent(res, remote_download_dir)
	{
		var path = res.result;
		changeImageSrc(linkId, "loading", "Adding torrent...");
		var params = [[{path : path, options : {download_location: remote_download_dir}}]];
		send_request("web.add_torrents", params, after_add);
	}
	
	
	function after_add(res)
	{
		changeImageSrc(linkId, "done", "Adding successful : \n" + url + "\n");
	}
	
	
	function debug_request(res)
	{
		alert(res.result);
	}
	
	return evt_torrent_submit;
}


function match(url)
{
	var ret = { isValid : false, torrentUrl : url};
	
	// magnet link
	if (url.match(/^magnet:\?.*xt=urn:btih:[a-f0-9]{40}.*/i)) {
	   ret.isValid = true;
	}
	
	if (url.match(/\.torrent$/)) {
	   ret.isValid = true;
	}
	
	// isohunt format
	if (url.match(/^http(s?):\/\/.*isohunt\.com\/download\//i)) {
	   ret.isValid = true;
	}

	// bt-chat format	
	if (url.match(/^http(s?):\/\/www\.bt-chat\.com\/download[0-9]?\.php\?id=([0-9]+)/i)) {
	   ret.isValid = true;
	   ret.torrentUrl = url+"&type=torrent";
	}
	
	// TorrentReactor
	if (url.match(/^http(s?):\/\/dl\.torrentreactor\.net\/download.php\?/i)) {
	   ret.isValid = true;
	}
	
	// Mininova
	if (url.match(/^http(s?):\/\/www\.mininova\.org\/get\//i)) {
	   ret.isValid = true;
	}
	
	// TorrentSpy
	if (url.match(/^http(s?):\/\/ts\.searching\.com\/download\.asp\?/i)) {
	   ret.isValid = true;
	}
	if (url.match(/^http(s?):\/\/www\.torrentspy\.com\/download.asp\?/i)) {
	   ret.isValid = true;
	}
	
	// Seedler
	if (url.match(/^http(s?):\/\/.*seedler\.org\/download\.x\?/i)) {
	   ret.isValid = true;
	}
	
	//Gazelle : (what.cd etc..)
	if (url.match(/^http(s?):\/\/.*\/torrents\.php\?action\=download/i)) {
	   ret.isValid = true;
	}
	
	//Legal torrents.
	if (url.match(/^http(s?):\/\/.*legaltorrents\.com\/get\//i)) {
	   ret.isValid = true;
	}
	
	// Demonoid format (from  userscripts comments)
	if (url.match(/^http(s?):\/\/www\.demonoid\.com\/files\/download\/HTTP\//i)) {
	   ret.isValid = true;
	}
	
	// Demonoid format II (from  userscripts comments)
	if (url.match(/^http(s?):\/\/www\.demonoid\.com\/files\/download\//i)) {
	   ret.isValid = true;
	}
	
	// BitSnoop
	if (url.match(/^http(s?):\/\/bitsnoop\.com\/get\//i)) {
	   ret.isValid = true;
	}
	
	// TorCache
	if (url.match(/^http(s?):\/\/torcache\.net\/torrent\//i)) {
	   ret.isValid = true;
	}
	
	// Twitter eztv.it
	if (url.match(/^http(s?):\/\/re\.zoink\.it\/.+/i)) {
	   ret.isValid = true;
	}

	return ret;
}


function getLinks()
{
	var doc_links = document.links;
	var links = new Array();
	for (var i=0; i < doc_links.length; i++){
	   links.push(doc_links[i]);
	}
	return links;
}


function scanLinks()
{
	// duplicate link list, so we don't forever loop when we will be adding our owns
	var links = getLinks();
	
	for (var i=0; i < links.length; i++)
	{
		var link = links[i];
		var matchObj = match(link.href);
		if (matchObj.isValid)
		{
			makeTorrentLink(link, matchObj.torrentUrl, i);
		}
	}
}


scanLinks();