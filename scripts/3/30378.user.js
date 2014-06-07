// ==UserScript==
// @name            Add Torrents To WebUI
// @namespace       http://forums.theccz.net
// @description     Let's you add torrents to the deluge WebUi
// @include         http://isohunt.com/torrent_details/*
// @include         http://thepiratebay.org/details.php?*
// @include         http://torrentreactor.net/view.php?*
// @include         http://www.mininova.org/*
// @include         http://www.torrentspy.com/*
// @include         http://ts.searching.com/*
// @include         *
// ==/UserScript==

//url-based submit and parsing based on : "Add Torrents To utorrent" by Julien Couvreur
//binary magic,contains from http://mgran.blogspot.com/2006/08/downloading-binary-streams-with.html

//these parameters need to be edited before using the script

// Server address
var host = "deluge.theccz.net:8112";
// Server port
var port = "80";
//open_page: "_blank" for a new window or "deluge_webui" for window re-use
//(not for private=1)
var open_page = "_blank"
//Private-trackers 0/1
//different behavior, gets torrent-data from (private) site and pops up a message.
var private_submit  = 0;
//deluge_password, only needed if private_submit = 1.
var deluge_password = 'deluge';
//========================


if (host == "") { alert('You need to configure the "Add Torrents To Deluge" user script with your uTorrent WebUI parameters before using it.'); }



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

var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAODSURBVHjaYvz//z8DAwMDAxMDAwMDs87W/wAAAAD//2KEibAwml37z/F0PwMAAAD//wAiAN3/Af///wBDcPL/0dTgAO3e1wAB////AL24jf8TFBcA5+fmAAAAAP//guuBAZaEsjX/r76xZLhw8RbD8SmPDrCcv/mN4dLjBwxc314wfP32XYClMeYRg5zcH4a/f/8yvHrzlxUAAAD//wTBQQqCUBRA0Stav4EEUYNmJTSMxm2gNbWBZraaWkIrCBo0EiowlUTx/ZLg5+scT1XZxbFmdk7Xwad1iAjvpmK/XRwCgNN1xsOuca0w8IVnWlJlPnX9mgYAUt5I7gH6tfScYH6WoatwLjKeqlIUKUWeR5fzMTHGdH0TNsvVZjSehPzJnnuVhqE4DONPepJgIsZObRFnh4o34iBelOLi7FUUxcsQBIcKgt37QW1jzDkJ539yEods+s4/Xnj+dfxdOH+bPT/M5EqpCGk6yrLGmB/Oxhvu726CsJE6+6yusdayXn+z2nzh9J7dya5/EKmy+UJzHGpiDKdHwqqoacX1oO1It0vNdqDB5URSkPqSwEsPvO84cO/4gUVJSdyUxN6QRroHumrV4+2C4fCQJMnwbYDWCXmuAAiKYo8xhteXp2XjqpG1Vk0vLqeTSfIxGp/zyzO96zYNBQAY/s+xEyd13JamqRjoAAgBkUCMMDDBxsYDwIBYeAk2RkaExMLKwDMwssFApA5IBVGqJFwaJ3Z8Lj4XBqq+wDf9v4gx8v3w4zOjjh/2u51tIZN+J9vIZNLthpgJgUAmLshonWuVDjEopdulSEfvL1668yoFWC2+PXj5Tt47dvfJOpK2tVhjUdpQ14aqVlS1R60l+u+S29cOePPiqoFToLV2uGpyZrUnEY5FqTg5ach7BoLm15+GTtRIbxDRILyjaZptgBQgBp//nLdMDiv6A08mNXnXQmtIgmHUN9SrBukU0TfE1qGN654BxtrUaAFtjWocyisIGuE0adAkwZB6TeJbnF0jgkYImZ4BjU3i80e/STsfSNIeQmZIKZEiQQAheEKE6APep7j2POvmtASAGzfvPi7L6YVisFUYYweTL5+earW4NSgKBJGqqtnIdyfXx+PXvay/WlXLenNz7wj4/+l0OgNgPpty9OPrOITySVlWsxC6c4hCSjfaHW7ti3TvbdbLP1+5POTczg5Fsc+/AQC+Gc84Uc0cNAAAAABJRU5ErkJggg%3D%3D"

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