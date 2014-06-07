// ==UserScript==
// @name           What.cd Whatauto link creator
// @namespace      test.com
// @author         blubbablubb
// @description    later to do
// @include        http*://*what.cd/*
// @include        http*://*broadcasthe.net/*
// @include        http*://*fux0r.eu/*
// @include        http*://*passthepopcorn.me/*
// @include        http*://*tehconnection.eu/*
// @include		   https://www.waffles.fm/*
// @include        http*://*bitgamer.su/*
// @include        http*://*hdbits.org/*
// @include        http*://*bitmetv.org/*
// @include        http*://*bitme.org/*
// @include        http*://*sceneaccess.eu/*
// @include        http*://*awesome-hd.net/*
// @include        http*://*bit-hdtv.com/*
// @include        http*://*x264.me/*
// @include        http*://*scenehd.org/*
// @include        http*://*pwnnetwork.net/*
// @include        http*://*karagarga.net/*
// @include        http*://*lztr.us/*
// @include        http*://*digitalhive.org/*
// @include        http*://*iptorrents.me/*
// @include        http*://*iptorrents.ru/*
// @include        http*://*iptorrents.com/*
// @include        http*://*deli.sh/*
// @include        http*://*thebox.bz/*
// @include        http*://*brokenstones.me/*
// @include        http*://*shellife.eu/*
// @include        http*://*piratethe.net/*
// @include        http*://*pianosheets.org/*
// @include        http*://*gazellegames.net/*
// @include        http*://*bibliotik.org/*
// @include        http*://*bd25.org/*
// @include        http*://*baconbits.org/*
// @include        http*://*underground-gamer.com/*
// @include        http*://*torrentbytes.net/*
// @include        http*://*theswarm.me/*
// @include        http*://*quorks.net/*
// @include        http*://*stopthepress.es/*
// @version        0.0.36
// @date           2013-01-15
// ==/UserScript==

// var weblink = GM_getValue('saveweblink','http://blubba.test.com:8080/dl.pywa?pass=fun');

// EDIT THE FOLLOWING LINE WITH YOUR HOST (OR IP) + PORT WHICH YOU HAVE SELECTED IN setup.conf IN pyWHATAUTO
var weblink = "http://linkto.server.com:1337/dl.pywa?pass=youwouldliketoknowthisone";

if (/https?.*?what\.cd.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+)(?:&[^&]*)?(?:&[^&]*)?$/i;
	var devider = ' | ';
	var site = "whatcd";
} else if (/https?.*?broadcasthe\.net.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=[^=]*$/i;
	var devider = ' | ';
	var site = "broadcasthenet";
} else if (/https?.*?fux0r\.eu.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?/i;
	var devider = ' : ';
	var site = "fux0r";
} else if (/https?.*?passthepopcorn\.me.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=.*/i;
	var devider = ' | ';
	var site = "passthepopcorn";
} else if (/https?.*?tehconnection\.eu.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=.*/i;
	var devider = ' | ';
	var site = "tehconnection";
} else if (/https?.*?waffles\.fm.*/.test(document.URL)) {
	var linkregex = /.*?download.php\/\d+\/(\d+)\/(.*?)\.torrent\?passkey.*/i;
	var devider = ' | ';
	var site = "waffles";
	var includename = 2;
} else if (/https?.*?bitgamer\.su.*/.test(document.URL)) {
	var linkregex = /download.php\?id=(\d+)&name=.*?\.torrent$/i;
	var devider = ' ';
	var site = "bitgamer";
} else if (/https?.*?hdbits\.org.*/.test(document.URL)) {
	var linkregex = /download.php\/(.*)\.torrent\?id=(\d+).*/i;
	var devider = ' | ';
	var site = "hdbits";
	var includename = 1;
} else if (/https?.*?bitme\.org.*/.test(document.URL)) {
	var linkregex = /.*?download.php\/(\d+)\/(.*?)\.torrent$/i;
	var devider = ' | ';
	var site = "bitme";
	var includename = 2;
} else if (/https?.*?bitmetv\.org.*/.test(document.URL)) {
	var linkregex = /.*?download.php\/(\d+)\/(.*?)\.torrent$/i;
	var devider = ' | ';
	var site = "bitmetv";
	var includename = 2;
} else if (/https?.*?sceneaccess\.eu.*/.test(document.URL)) {
	var linkregex = /download\/(\d+)\/.*\/(.*)\.torrent$/i;
	var devider = ' | ';
	var site = "sceneaccess";
	var includename = 2;
} else if (/https?.*?awesome-hd\.net.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?/i;
	var devider = ' | ';
	var site = "awesomehd";
}  else if (/https?.*?bit-hdtv\.com.*/.test(document.URL)) {
	var linkregex = /.*?download.php\/(\d+)\/(.*?)\.torrent.*/i;
	var devider = ' | ';
	var site = "bithdtv";
	var includename = 2;
}  else if (/https?.*?x264\.me.*/.test(document.URL)) {
	var linkregex = /.*?download.php\/(\d+)\/(.*?)\.torrent.*/i;
	var devider = ' | ';
	var site = "x264";
	var includename = 2;
}  else if (/https?.*scenehd\.org.*/.test(document.URL)) {
	var linkregex = /download.php\?id=(\d+).*/i;
	var devider = ' | ';
	var site = "scenehd";
} else if (/https?.*?pwnnetwork\.net.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*/i;
	var devider = ' | ';
	var site = "pwnnetwork";
} else if (/https?.*?karagarga\.net.*/.test(document.URL)) {
	var linkregex = /down.php\/(\d+)\/(.*)\.torrent/i;
	var devider = ' | ';
	var site = "karagarga";
	var includename = 2;
} else if (/https?.*?lztr\.us.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*/i;
	var devider = ' | ';
	var site = "lztr";
} else if (/https?.*?digitalhive\.org.*/.test(document.URL)) {
	var linkregex = /download.php\?id=(\d+).*?name=(.*)\.torrent/i;
	var devider = ' | ';
	var site = "digitalhive";
	var includename = 2;
} else if (/https?.*?iptorrents\.(?:com|me|ru).*/.test(document.URL)) {
	var linkregex = /download.php\/(\d+)\/(.*)\.torrent/i;
	var devider = ' | ';
	var site = "iptorrents";
	var includename = 2;
} else if (/https?.*?deli\.sh.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*/i;
	var devider = ' | ';
	var site = "delish";
} else if (/https?.*?thebox\.bz.*/.test(document.URL)) {
	var linkregex = /download.php\/(\d+)\/(.*)\.torrent/i;
	var devider = ' ';
	var site = "thebox";
	var includename = 2;
} else if (/https?.*?brokenstones\.me.*/.test(document.URL)) {
	var linkregex = /download.php\/(\d+)\/(.*)\.torrent/i;
	var devider = ' ';
	var site = "brokenstones";
	var includename = 2;
} else if (/https?.*?shellife\.eu.*/.test(document.URL)) {
	var linkregex = /\/details.php\?id=(\d+).*/i;
	var devider = ' - ';
	var site = "shellife";
} else if (/https?.*?piratethe\.net.*/.test(document.URL)) {
	var linkregex = /download.php\?torrent=(\d+)/i;
	var devider = ' ';
	var site = "piratethenet";
} else if (/https?.*?pianosheets\.org.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download&id=(\d+).*/i;
	var devider = ' | ';
	var site = "pianosheets";
} else if (/https?.*?gazellegames\.net.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download&id=(\d+).*/i;
	var devider = ' | ';
	var site = "gazellegames";
} else if (/https?.*?bibliotik\.org.*/.test(document.URL)) {
	var linkregex = /torrents\/(\d+)\/download.*/i;
	var devider = ' ';
	var site = "bibliotik";
} else if (/https?.*?bd25\.org.*/.test(document.URL)) {
	var linkregex = /download.php\?id=([^&]*)&f=(.*)\.torrent/i;
	var devider = ' ';
	var includename = 2;
	var site = "bd25";
} else if (/https?.*?baconbits\.org.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download&id=(\d+).*/i;
	var devider = ' | ';
	var site = "baconbits";
} else if (/https?.*?underground-gamer\.com.*/.test(document.URL)) {
	var linkregex = /download.php\?id=(\d+).*/i;
	var devider = ' ';
	var site = "undergroundgamer";
} else if (/https?.*?torrentbytes\.net.*/.test(document.URL)) {
	var linkregex = /download.php\?id=(\d+).*/i;
	var devider = ' ';
	var site = "torrentbytes";
} else if (/https?.*?theswarm\.me.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=.*/i;
	var devider = ' | ';
	var site = "theswarm";
} else if (/https?.*?quorks\.net.*/.test(document.URL)) {
	var linkregex = /download.php\/(\d+)\/(.*)\.torrent/i;
	var devider = ' ';
	var includename = 2;
	var site = "quorks";
} else if (/https?.*?stopthepress\.es.*/.test(document.URL)) {
	var linkregex = /torrents.php\?action=download.*?id=(\d+).*?authkey=.*?torrent_pass=.*/i;
	var devider = ' | ';
	var site = "stopthepresses";
}else {
	alert("You have found a bug. Go and tell blubba!");
}

alltorrents = new Array();
for (var i=0; i < document.links.length; i++) {
		alltorrents.push(document.links[i]);
}

var name = "";
for (var i=0; i < alltorrents.length; i++) {
	if (linkregex.exec(alltorrents[i])) {
		// alert(alltorrents[i]);
		if (includename == 1) {
			id = RegExp.$2;
			name = RegExp.$1;
		} else if (includename == 2) {
			id = RegExp.$1;
			name = RegExp.$2;
		} else {
			id = RegExp.$1;
		}
		createlink(alltorrents[i],id,name);
	}
}

function createlink(linkelement,id,name) {
	var link = document.createElement("pyWA");
	link.appendChild(document.createElement("a"));
	link.firstChild.appendChild(document.createTextNode("pWA"));
	link.appendChild(document.createTextNode(devider));
	if (name) {
		link.firstChild.href=weblink+"&name="+name+"&site="+site+"&id="+id;
	} else {
		link.firstChild.href=weblink+"&site="+site+"&id="+id;
	}
	link.firstChild.target="_blank";
	link.firstChild.title="Direct Download to pyWHATauto";
	linkelement.parentNode.insertBefore(link, linkelement);
}