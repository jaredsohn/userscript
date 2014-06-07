// ==UserScript==
// @name            Add Torrents To Deluge
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Let's you add torrents to the deluge WebUi
// @include         http://isohunt.com/torrent_details/*
// @include         http://thepiratebay.org/details.php?*
// @include         http://torrentreactor.net/view.php?*
// @include         http://www.mininova.org/*
// @include         http://www.torrentspy.com/*
// @include         http://ts.searching.com/*
// @include         *
// ==/UserScript==

//author: Martijn Voncken ; mvoncken@gmail.com.
//url-based submit and parsing based on : "Add Torrents To utorrent" by Julien Couvreur
//binary magic,contains code taken from http://mgran.blogspot.com/2006/08/downloading-binary-streams-with.html

//these parameters need to be edited before using the script

// Server address
var host = "localhost";
// Server port
var port = "8112";
//open_page: "_blank" for a new window or "deluge_webui" for window re-use
//(not for private=1)
var open_page = "_blank"
//Private-trackers 0/1
//different behavior, gets torrent-data from (private) site and pops up a message.
var private_submit  = 0;
//deluge_password, only needed if private_submit = 1.
var deluge_password = 'deluge';
//Image number: 0=deluge(blue) ;1=downloading(green) ;2 = active(blue+green) ; 3 = seeding(blue)
//default = 2 because it will work on any background-color
var image_num = 2
//========================


if (host == "") { alert('You need to configure the "Add Torrents To Deluge" user script with your Delu parameters before using it.'); }

images = {
	0:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1wkPFjUNUreV2QAAAnRJREFUOI19k0toE1EUhv/Mncykd5pMMtNkTDQKGrEWC5ZqXVQ36sJSqAvJztdKUItu3HTXhYggWLBFdyIiihQ3XYgLRUVKfUCpVFrow7TW2k7StGmSmUxmJhk3FmyT9Czv+c7HOefeC2wT3T397dd7Bo5tx7hqJS7cuie0Hdw/zbndZGxivvHR3Wtr1TimlqDBJz3RbSaslUkosjs6VIurKujqfhjn/cq5JY1A1Vkw9f7jN/pe367Gkq0HJ670hWU59PbbeIJX1VW44MAkdZAksT3Scnb4x4cXidqC3l4mVpDH56YTIT91QxQIbNMAjCxyBhhlh9xB955+mvjyStsoYf+vP5qQBspY33O4MYKQ7AMXUACWwjLyWF1cgJokweiu0HMAp6ruwM+7LvMsQbhBRNOhJuyMRqGEAggEFQSiMZTzabCEOXnm5rPzFYJ9Xb2xfC5f5xV4iKKAcESBInkh+Si8lAetF+ARZazkDMiScLVCIFLaCgCGZQOOg6DkheynEOo4uFkChnGBpSJMqwzbto5UjuAq6wAwv7iGpVQGVkGH4OFAGAaO48AulWHaJZiWDccqkng8TjYJkqo6CgCrWQ2zCyt4934E6XQaRdOCXrRg2yUwcEDZEpyiPjU4OFjadI3ZxGfuQFvnxYJh1v9WM8hkNaRTKeTWM7BtC2WHgW5YEEkRk18/3v8zOzq89R3QvFb8tTvW3Onh3WRBzWBqTsVycg3LS0msp5NgS0XMTHx/MzL0oB9ACqj8TEEx1NjS2nHpDu8RmnOawVGPGx6ecwpWKfdzcuzl7KfHfQBmAFjVBBvBAfABoP+6NADkAeS2gn8Blu/uY7RdIbMAAAAASUVORK5CYII=',
	1:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAITSURBVCiRfZLLaxNRFMa/O3PnkaST1zjURixY66IQH+DCgksXLnTXdiOIQSmoy0G3/gmpiDsRI6Ib3bhw40IQXAk1C9NGCoEWS2JNmqSZZJJ5HhexoYngdzmLe8/5cc/5OIyIcFT5Uk5RxOhrJ7BvmdlCDxPikw8xnlyLy/qS5TUJwMpkXjh6ebxx52qUa3drdgWyoC4/3bx3fxJghy3lSzldVzLltls3AvLAwKCrJ9zGYHfRzBaK//wwJaVeOoFtBOQBAAiEA7cup5WZ9/lSLjEGPNlYXZUF9VrHacFq9EfRs3twgv5JTUq/OQTE+PK2nlSmP7bdPWlnvYm55HloMKDBwPZmFZFMiJiUOPNl793uJeN6UYjy+JIXOpGQQjDGMDs/MwpZGZp44NYRl9KP8qUcF6Z4cqXrtyfNGFNIAQIKZiVBuSn45F0gCv8LAEDHa0CT0qYAsA4RUHxbheqnxoriio6fnwf4XbFAw8O4yMQWY8Dc5TRi/eQYML8why7bh3Fag8RkBKG/L4hM2mFMQCKjwlJr+L5eHg7aslAsf4WxoAIAIjwOJ+xtsWc/zHNckL81nZoIAO1qH/iVwEBq4/jZ6N9iDZxJFctrXmREhOdbD29wJr/o+i3ZCWw4tg8lyqGIUcR4Aj55nY7bWDSzhfJol9ZKt0+llOkHAhOvhBQeA6AG5H/quPVXBPpgZgs2APwB/4Li9aLgn7EAAAAASUVORK5CYII=',
	2:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJCSURBVCiRZZJfSFNxFMc/v7u7ee/+ubk7M53TEqPhi4KU9pAPURFKEeogCHxKorfovXqqp+ipHkZBQSYNoiKIiqDA0kJDLKjAQkSb26xN3a7747y3B9Fsfd/OOZ8v53zhCNM02a5whAqHjSG9yEB0EJ0yyeUNr53rmpPelI4J9JfPpe3FqVscdSucnU6CYqVv4A7nyg1i86RwBF/Ay9fECv61dRACAh6Kc2k6ooNM/rehysFdvbABA5gmJDPYaj08CUeo/Mdw+jZnVCvd6VUorsTgR5R8fIpCCfQC9T4H9zcNli+1l301lbxcWMaaX/6J3/jO/q5ubMYS8ViMdWUHHjvNw+PMn2xjUqpU6c2XUHPpOfzGNK37ugCo37WXUJ2VXPwTyQxoTi6GI8iy107/TCLH0tQ9fC3tmKaBEBvR8rksRuINkj+Fp0oNSs7VS+J81FycT6NJ0hr5hWf0HGrC4dKpsKUYHXtEbXtxI6ywYDda8nJ98KFNaxzn8+OPhJrqqAt0IiQBgM+tMD+SwXBlaWyrxhSmkJyOmKyocUJHNGRZ3oIBdjc3sm4pEGz1IQsbhZKUl4ySPymEhNNXgRzMMvp6HIDldJaxD29pOOAGQJVdZHJyXJqNtQx4bDsBcGkKlkCGV09HeD/xjmDHXziXd60t/g4etowM3Zx98S1b6XfrnQYlLKqJUmPiDSooFgdum4ZpqOZMLHTi2rG+ia1fuvD8wcEGLXfDoab2CItuhZLI5KrjibRr2Fz1XLnac/wXwB8VGdb/8OWcaQAAAABJRU5ErkJggg==',
	3:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAFBAAABQQBQWt8+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHhSURBVCiRjZK9TxNxGMc/v+vd9dpiX2wbCFoSjCS6GIwJsnVwcGAySKNGw2SjxomwuBj+A/eqUaNg0s3BxRj/AY0EB0kEBhFKWywtvV6vvfbu52CoWE30uz0vnzzP880jpJQcViaHP6SzaDnM5rNY9EntT8SCPEgMML1nIYGZ/rpyOLj6iIthg1trZTA0Ls8+5U4/IA5WyuSIH4+xWqqT7LggBKRiOJt7TOazLP8x4WiIZ1b7ZzOAlFCqow9HeZXJEfkNuP6YmwGNqWoTnHoBNvK0iiu0u2A7pOIhlg4A3+fhhfhQhDc7+2it/W2S3jrn01PoXo1ioUDXP0gsyNjSe7YunWVZiQSYbnUJ2NVvJL01xifSAKRGT3H6mIZd/ETJhMQA9zM5VCUWZOZ7zaa28gLP7SCl13OkZTdwNt9iltZxPUYMjRtKx2VcqAEG0/coWEfodpwesLNrEZmYI5g8SdmEeIg5RQjq/V7/TVKCBKH4BNX/AfwqdFwqiqbyVRH/BsIBsNp8EbcX5Rm/ysftGj633cDc+tBrMqIjGPEThA3QVDYqDc4JKSV3X3LNr/KkYqE3f91MSIdoEByX+q7JZD7Lau+XrjxkdCjCvKpwwfVIAEbX413Z5LmUvM5naQL8AFjEu4EoxfZeAAAAAElFTkSuQmCC'
};

var image = images[image_num];


function scanLinks() {
  var links = getLinks();

  for (var i=0; i < links.length; i++){
      var link = links[i];
      if (match(link.href)) {
	if (private_submit) {
		makeUTorrentLink_private(link,i);
	}
	else {
		makeUTorrentLink(link);
	}
      }
  }
}

function makeUTorrentLink(link) {
    var uTorrentLink = document.createElement('a');
    uTorrentLink.setAttribute("href", makeUTorrentUrl(link.href));
    uTorrentLink.setAttribute("target", open_page);
    uTorrentLink.style.paddingLeft = "5px";
    uTorrentLink.innerHTML = "<img src=\"" + image + "\" style='border: 0px' />";
    link.parentNode.insertBefore(uTorrentLink, link.nextSibling);
    return uTorrentLink
}

function makeUTorrentUrl(url) {
   var uTorrentUrl = "http://"+host+":"+port+"/torrent/add?redir_after_login=1";
   return uTorrentUrl + "&url=" + escape(url);
}

function makeUTorrentLink_private(link,i) {
    var id = 'deluge_link' + i;
    var uTorrentLink = document.createElement('a');
    uTorrentLink.setAttribute("href", '#');
    uTorrentLink.setAttribute("id", id);
    uTorrentLink.style.paddingLeft = "5px";
    uTorrentLink.innerHTML = "<img src=\"" + image + "\" style='border: 0px' />";
    link.parentNode.insertBefore(uTorrentLink, link.nextSibling);

    ulink = document.getElementById(id)
    ulink.addEventListener("click", evt_private_submit_factory(link.href),false);

    return uTorrentLink
}

function evt_private_submit_factory(url) {
	//can this be done without magic?
	function evt_private_submit(evt) {
		GM_xmlhttpRequest({ method: 'GET', url: url,
			overrideMimeType: 'text/plain; charset=x-user-defined',
			onload: function(xhr)  {
				var stream = translateToBinaryString(xhr.responseText);
				var data_b64 = window.btoa(stream);
				post_to_webui(url, data_b64);
			},
			onerror:function(xhr) {
				alert('error fetching torrent file');
			}
		});
		return false;
	}
	return evt_private_submit;
}


function post_to_webui(url,data_b64){
	//alert('here1');
	//data contains the content of the .torrent-file.
	var POST_data = ('pwd=' + encodeURIComponent(deluge_password) +
		'&torrent_name=' + encodeURIComponent(url) +  '.torrent' +  //+.torrent is a clutch!
		'&data_b64=' + encodeURIComponent(data_b64) );
	//alert(POST_data);

	GM_xmlhttpRequest({ method: 'POST',
			url: "http://"+host+":"+port+"/remote/torrent/add",
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data: POST_data,
			onload: function(xhr)  {
				if (xhr.responseText == 'ok\n') {
					alert('Added torrent to webui : \n' + url);
				}
				else {
					alert('Error adding torrent to webui:\n"' + xhr.responseText + '"');
				}

			},
			onerror:function(xhr) {
				alert('error submitting torrent file');
			}

		});
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

scanLinks();

/*
binary magic,contains code taken from
http://mgran.blogspot.com/2006/08/downloading-binary-streams-with.html
*/
function translateToBinaryString(text){
	var out;
	out='';
	for(i=0;i<text.length;i++){
		//*bugfix* by Marcus Granado 2006 [http://mgran.blogspot.com] adapted by Thomas Belot
		out+=String.fromCharCode(text.charCodeAt(i) & 0xff);
	}
	return out;
}