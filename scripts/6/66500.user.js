// ==UserScript==
// @name           Add Torrent links to Deluge new WebUI
// @namespace      Flo
// @include        *
// ==/UserScript==

// modifications by aidos for the new WebUI

//original author: Martijn Voncken ; mvoncken@gmail.com.
//url-based submit and parsing based on : "Add Torrents To utorrent" by Julien Couvreur

// these parameters need to be edited before using the script

var host = "192.168.1.10";
var port = "8112";
var password = 'deluge';
//========================


if (host == "") { alert('You need to configure the "Add Torrents To Deluge" user script with your Deluge parameters before using it.'); }

/* Image number: 
		0=deluge(blue)
		1=downloading(green)
		2 = active(blue+green)
		3 = seeding(blue)
		4 = loading
		5 = error
*/

images = {
	0:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1wkPFjUNUreV2QAAAnRJREFUOI19k0toE1EUhv/Mncykd5pMMtNkTDQKGrEWC5ZqXVQ36sJSqAvJztdKUItu3HTXhYggWLBFdyIiihQ3XYgLRUVKfUCpVFrow7TW2k7StGmSmUxmJhk3FmyT9Czv+c7HOefeC2wT3T397dd7Bo5tx7hqJS7cuie0Hdw/zbndZGxivvHR3Wtr1TimlqDBJz3RbSaslUkosjs6VIurKujqfhjn/cq5JY1A1Vkw9f7jN/pe367Gkq0HJ670hWU59PbbeIJX1VW44MAkdZAksT3Scnb4x4cXidqC3l4mVpDH56YTIT91QxQIbNMAjCxyBhhlh9xB955+mvjyStsoYf+vP5qQBspY33O4MYKQ7AMXUACWwjLyWF1cgJokweiu0HMAp6ruwM+7LvMsQbhBRNOhJuyMRqGEAggEFQSiMZTzabCEOXnm5rPzFYJ9Xb2xfC5f5xV4iKKAcESBInkh+Si8lAetF+ARZazkDMiScLVCIFLaCgCGZQOOg6DkheynEOo4uFkChnGBpSJMqwzbto5UjuAq6wAwv7iGpVQGVkGH4OFAGAaO48AulWHaJZiWDccqkng8TjYJkqo6CgCrWQ2zCyt4934E6XQaRdOCXrRg2yUwcEDZEpyiPjU4OFjadI3ZxGfuQFvnxYJh1v9WM8hkNaRTKeTWM7BtC2WHgW5YEEkRk18/3v8zOzq89R3QvFb8tTvW3Onh3WRBzWBqTsVycg3LS0msp5NgS0XMTHx/MzL0oB9ACqj8TEEx1NjS2nHpDu8RmnOawVGPGx6ecwpWKfdzcuzl7KfHfQBmAFjVBBvBAfABoP+6NADkAeS2gn8Blu/uY7RdIbMAAAAASUVORK5CYII=',
	1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAITSURBVCiRfZLLaxNRFMa/O3PnkaST1zjURixY66IQH+DCgksXLnTXdiOIQSmoy0G3/gmpiDsRI6Ib3bhw40IQXAk1C9NGCoEWS2JNmqSZZJJ5HhexoYngdzmLe8/5cc/5OIyIcFT5Uk5RxOhrJ7BvmdlCDxPikw8xnlyLy/qS5TUJwMpkXjh6ebxx52qUa3drdgWyoC4/3bx3fxJghy3lSzldVzLltls3AvLAwKCrJ9zGYHfRzBaK//wwJaVeOoFtBOQBAAiEA7cup5WZ9/lSLjEGPNlYXZUF9VrHacFq9EfRs3twgv5JTUq/OQTE+PK2nlSmP7bdPWlnvYm55HloMKDBwPZmFZFMiJiUOPNl793uJeN6UYjy+JIXOpGQQjDGMDs/MwpZGZp44NYRl9KP8qUcF6Z4cqXrtyfNGFNIAQIKZiVBuSn45F0gCv8LAEDHa0CT0qYAsA4RUHxbheqnxoriio6fnwf4XbFAw8O4yMQWY8Dc5TRi/eQYML8why7bh3Fag8RkBKG/L4hM2mFMQCKjwlJr+L5eHg7aslAsf4WxoAIAIjwOJ+xtsWc/zHNckL81nZoIAO1qH/iVwEBq4/jZ6N9iDZxJFctrXmREhOdbD29wJr/o+i3ZCWw4tg8lyqGIUcR4Aj55nY7bWDSzhfJol9ZKt0+llOkHAhOvhBQeA6AG5H/quPVXBPpgZgs2APwB/4Li9aLgn7EAAAAASUVORK5CYII=',
	2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJCSURBVCiRZZJfSFNxFMc/v7u7ee/+ubk7M53TEqPhi4KU9pAPURFKEeogCHxKorfovXqqp+ipHkZBQSYNoiKIiqDA0kJDLKjAQkSb26xN3a7747y3B9Fsfd/OOZ8v53zhCNM02a5whAqHjSG9yEB0EJ0yyeUNr53rmpPelI4J9JfPpe3FqVscdSucnU6CYqVv4A7nyg1i86RwBF/Ay9fECv61dRACAh6Kc2k6ooNM/rehysFdvbABA5gmJDPYaj08CUeo/Mdw+jZnVCvd6VUorsTgR5R8fIpCCfQC9T4H9zcNli+1l301lbxcWMaaX/6J3/jO/q5ubMYS8ViMdWUHHjvNw+PMn2xjUqpU6c2XUHPpOfzGNK37ugCo37WXUJ2VXPwTyQxoTi6GI8iy107/TCLH0tQ9fC3tmKaBEBvR8rksRuINkj+Fp0oNSs7VS+J81FycT6NJ0hr5hWf0HGrC4dKpsKUYHXtEbXtxI6ywYDda8nJ98KFNaxzn8+OPhJrqqAt0IiQBgM+tMD+SwXBlaWyrxhSmkJyOmKyocUJHNGRZ3oIBdjc3sm4pEGz1IQsbhZKUl4ySPymEhNNXgRzMMvp6HIDldJaxD29pOOAGQJVdZHJyXJqNtQx4bDsBcGkKlkCGV09HeD/xjmDHXziXd60t/g4etowM3Zx98S1b6XfrnQYlLKqJUmPiDSooFgdum4ZpqOZMLHTi2rG+ia1fuvD8wcEGLXfDoab2CItuhZLI5KrjibRr2Fz1XLnac/wXwB8VGdb/8OWcaQAAAABJRU5ErkJggg==',
	3:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHhSURBVCiRjZK9TxNxGMc/v+vd9dpiX2wbCFoSjCS6GIwJsnVwcGAySKNGw2SjxomwuBj+A/eqUaNg0s3BxRj/AY0EB0kEBhFKWywtvV6vvfbu52CoWE30uz0vnzzP880jpJQcViaHP6SzaDnM5rNY9EntT8SCPEgMML1nIYGZ/rpyOLj6iIthg1trZTA0Ls8+5U4/IA5WyuSIH4+xWqqT7LggBKRiOJt7TOazLP8x4WiIZ1b7ZzOAlFCqow9HeZXJEfkNuP6YmwGNqWoTnHoBNvK0iiu0u2A7pOIhlg4A3+fhhfhQhDc7+2it/W2S3jrn01PoXo1ioUDXP0gsyNjSe7YunWVZiQSYbnUJ2NVvJL01xifSAKRGT3H6mIZd/ETJhMQA9zM5VCUWZOZ7zaa28gLP7SCl13OkZTdwNt9iltZxPUYMjRtKx2VcqAEG0/coWEfodpwesLNrEZmYI5g8SdmEeIg5RQjq/V7/TVKCBKH4BNX/AfwqdFwqiqbyVRH/BsIBsNp8EbcX5Rm/ysftGj633cDc+tBrMqIjGPEThA3QVDYqDc4JKSV3X3LNr/KkYqE3f91MSIdoEByX+q7JZD7Lau+XrjxkdCjCvKpwwfVIAEbX413Z5LmUvM5naQL8AFjEu4EoxfZeAAAAAElFTkSuQmCC',
	4:'data:image/gif;base64,R0lGODlhEAAQAPMAAP///wAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=',
	5:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACp0lEQVR42n2Tz2vUVxTFP++9mQwZDTHqIEQqNYuCXWtxE2NW7twF2l3Joj+Stg6FMlD/gk6hJTJNd0MXLgV/oFa6EAQ3dVtNFokFM9IZkpnvzCSTmXy/3/fu7SKJhIjezV3cc849F+4xqsrhmrW2ABhAAN3vVZHOYaw5LHC9UFg4curUl0dHRxHvVUJAvKfX7TLodv/4KYq+fqfA9ZMnb3w0NTX3WankQq3G8sOHhMGADycniYH7N2+Gf1+8+L3c6Xz7lsCPJ05Uzl2+/NWnxaLj6VP+fvCA8ZkZVJX1W7c4d+ECzZER/rx3L6ytrlZ+7vWKAJk98uLH09NfzMzPO330CEkSGBtj4soVADrPnhG6XUaaTabOn3d/RdHcd87FN0Io2Vlrjw0fP/75zPy8M3fuEFotQqdD0mgQ4hg/GBAtLZE0m+wsLZG7fZuLExPZ4VxubtbaQgYw+Xxew8oK1Gr4Vgvf7zO0tkavXkdCQJaX2V5dJajiRbD1OjlrAUwGsIiQvnqFPHlCUCWocjRJaL98SUgSxozBqxJECKokcYyEoIBkACNxLMn6OkZ1F6jKiLVs1mpIknDEWoLIm5lPEkQEQHcdhEC6s4M9sMUA3ZUVMmlKZo+4f0K664B9B7q1uUl8+jRZY94Am97TjyKMcwy8Z/SAi573xCIGUFsV2dhqtxfv372bbl29ijcGL0JUKDBdLjNdLjM4c4YgQqrKf/k8z3u9NFWtVkU6GYBfvS8VnbMhSa5NXrqUHX78GNdus/n6NdY50kaDVJVGPs8/29tpS6RSUf3+rVcuOvfLB+Pj33xy9myWep2NKEK8Z9gYtkPgeb+ftkQWflP94Z1huubcQm5oaDZrjKoIiKAiJhYhUV2sqJbem8a9OB/bi7M90LUqsnEY+z8wyrjddZe8zwAAAABJRU5ErkJggg=='
};

var remote_download_dir = "";

function makeTorrentLink(link, i)
{
	var torrentLink = document.createElement('a');
	var id = 'deluge_link' + i;
	torrentLink.setAttribute("href", 'javascript:;');
	torrentLink.setAttribute("id", id);
	torrentLink.style.paddingLeft = "2px";
	torrentLink.innerHTML = "<img src=\"" + images[0] + "\" style='border: 0px' id='image_" + id + "' />";
	link.parentNode.insertBefore(torrentLink, link.nextSibling);
	
	domLink = document.getElementById(id);
	domLink.addEventListener("click", evt_callback_factory(link.href, id),false);
	
	return torrentLink;
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
	function evt_torrent_submit(evt)
	{
		changeImageSrc(linkId, "loading");		
		GM_xmlhttpRequest( // first, login
		{
			method: "POST",
			url: "http://" + host + ":" + port + '/json',
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			data: '{"method":"auth.login","params":["' + password + '"],"id":0}',
			onload: function(xhr)
			{
				res = JSON.parse(xhr.responseText);
				if (res.result == true && res.error == null)
				{
					GM_xmlhttpRequest( // second, download
					{
						method: "POST",
						url: "http://" + host + ":" + port + '/json',
						headers: {'Content-type':'application/x-www-form-urlencoded'},
						data: '{"method":"web.download_torrent_from_url","params":["' + url + '",""],"id":1}',
						onload: function(xhr)
						{
							res = JSON.parse(xhr.responseText);
							path = res.result;
							if (res.error == null)
							{
								GM_xmlhttpRequest( // third, get download path
								{
									method: "POST",
									url: "http://" + host + ":" + port + '/json',
									headers: {'Content-type':'application/x-www-form-urlencoded'},
									data: '{"method":"core.get_config","params":[],"id":2}',
									onload: function(xhr)
									{
										res = JSON.parse(xhr.responseText);
										if (res.error == null)
										{
											remote_download_dir = res.result.download_location;
											GM_xmlhttpRequest( // finally, add to deluge
											{
												method: "POST",
												url: "http://" + host + ":" + port + '/json',
												headers: {'Content-type':'application/x-www-form-urlencoded'},
												data: '{"method":"web.add_torrents","params":[[{"path":"'+ path + '","options":{"add_paused":false,"max_download_speed_per_torrent":-1,"prioritize_first_last_pieces":false,"max_upload_speed_per_torrent":-1,"max_connections_per_torrent":-1,"download_location":"' + remote_download_dir + '","compact_allocation":true,"max_upload_slots_per_torrent":-1,"file_priorities":[1,1]}}]],"id":126}',
												onload: function(xhr)
												{
													res = JSON.parse(xhr.responseText);
													if (res.error == null)
													{
														changeImageSrc(linkId, "done", "Adding successful : \n" + url + "\n");
													}
													else
													{
														changeImageSrc(linkId, "error", "Error adding torrent to webui:\n" + xhr.responseText);
													}
												},
												onerror:function(xhr)
												{
													changeImageSrc(linkId, "error", 'error submitting torrent URL');
												}
											});											
										}
										else
										{
											changeImageSrc(linkId, "error", "Error getting Deluge config:\n" + xhr.responseText);
										}
									},
									onerror:function(xhr)
									{
										changeImageSrc(linkId, "error", 'Error getting Deluge config (Request error)');
									}
								});
							}
							else
							{
								changeImageSrc(linkId, "error", 'Error downloading torrent:\n' + xhr.responseText);
							}
						},
						onerror:function(xhr)
						{
							changeImageSrc(linkId, "error", 'error downloading torrent');
						}
					});
				}
				else
				{
					changeImageSrc(linkId, "error", 'Error login into webui:\n' + xhr.responseText);
				}
			},
			onerror:function(xhr)
			{
				changeImageSrc(linkId, "error", 'error login in');
			}
		});
		return false;
	}
	return evt_torrent_submit;
}



function match(url) {

   // isohunt format
   if (url.match(/http:\/\/.*isohunt\.com\/download\//i)) {
       return true;
   }

   if (url.match(/\.torrent$/)) {
       return true;
   }

   if (url.match(/http:\/\/.*bt-chat\.com\/download\.php/)) {
       return true;
   }

   // TorrentReactor
   if (url.match(/http:\/\/dl\.torrentreactor\.net\/download.php\?/i)) {
       return true;
   }

   // Mininova
   if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
       return true;
   }

   // Mininova
   if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
       return true;
   }

   // TorrentSpy
   if (url.match(/http:\/\/ts\.searching\.com\/download\.asp\?/i)) {
       return true;
   }
   if (url.match(/http:\/\/www\.torrentspy\.com\/download.asp\?/i)) {
       return true;
   }

   // Seedler
   if (url.match(/http:\/\/.*seedler\.org\/download\.x\?/i)) {
       return true;
   }

   //Gazelle : (what.cd etc..)
   if (url.match(/http:\/\/.*\/torrents\.php\?action\=download/i)) {
       return true;
   }

   //Legal torrents.
   if (url.match(/http:\/\/.*legaltorrents\.com\/get\//i)) {
       return true;
   }

   // Demonoid format (from  userscripts comments)
   if (url.match(/http:\/\/www\.demonoid\.com\/files\/download\/HTTP\//i)) {
       return true;
   }

   // Demonoid format II (from  userscripts comments)
   if (url.match(/http:\/\/www\.demonoid\.com\/files\/download\//i)) {
       return true;
   }
   
   // BitSnoop
   if (url.match(/http:\/\/bitsnoop\.com\/get\//i)) {
       return true;
   }
   
   // no match
   return false;
}


function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
       links.push(doc_links[i]);
   }
   return links;
}

function scanLinks()
{
  var links = getLinks();

  for (var i=0; i < links.length; i++)
  {
		var link = links[i];
		if (match(link.href))
		{
			makeTorrentLink(link, i);
		}
  }
}

scanLinks();
