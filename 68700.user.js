// ==UserScript==
// @name          Add Torrents to Transmission
// @description	  Allows you to add torrents directly to Transmission Bittorrent web client
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)


//===========USER CONFIG AREA=============//

//CHANGE HOST TO YOUR URL OR IP ADDRESS//
var host = "http://example.com";

//CHANGE PORT TO PORT TRANSMISSION RUNS ON//
var port = "9091";

//CHANGE TO LOCATION OF TRANSMISSION SUBDIRECTORY//
//INCLUDE LEADING AND TRAILING SLASH//
var subDir = "/transmission/"

//========================================//


//========Configuring variables==========//

host = host+":"+port+subDir;

//=======================================//

//=============Functions=================//

//Checks if the site is a site containing torrent files
function isTorSite(){
	var links = document.links;
	for ( var i in links )
	{
		if(isTorrent(links[i].href)){
			return true;
		}
	}
	return false
}


//Checks if the link provided is a valid torrent
//TODO: check against popular torrent sites
function isTorrent(str){
	if(str.match(/torrentdownloads\.net|btmon\.com\/|torrage\.com\/torrent\/\S+\.torrent$|zoink\.it\/torrent\/\S+.torrent$/i)){
		return false;
	}if(str.match(/\.torrent$|mininova\.org\/tor\/\d+|thepiratebay\.org\/torrent\/\d+|fenopy\.com\/torrent\/|newtorrents\.info\/torrent\/\d+\/|vertor\.com\/torrents\/\d+\/|btjunkie\.org\/torrent\/|torrentreactor\.net\/torrents\/\d+\/|extratorrent\.com\/torrent\/\d+\/|torrentzap\.com\/torrent\/\d+\/|torrentdownloads\.net|magnet:\?xt=urn:btih:/i)){
		return true;
	}
	return false;
}


//Returns link to torrent given a page containing a torrent
function getTorrentURL(str){
	if(str.match(/\.torrent$/i)){
		return str;
	}if(str.match(/mininova\.org\/tor\/\d+/i)){
		return str.replace(/tor/i,'get');
	}if(str.match(/thepiratebay\.org\/torrent\/\d+/i)){
		var out = "http://torrents.thepiratebay.org"+str.match(/\/\d+\//)+str.split('\/').pop()+"\.TPB\.torrent";
		return out;
	}if(str.match(/fenopy\.com\/torrent\//i)){
		return str+"==/download.torrent";
	}if(str.match(/newtorrents\.info\/torrent\/\d+\//i)){
		return "http://www.newtorrents.info/down.php?id="+str.match(/\d+/)+"&location=";
	}if(str.match(/vertor\.com\/torrents\/\d+\//i)){
		return "http://www.vertor.com/index.php?mod=download&id="+str.match(/\d+/);
	}if(str.match(/btjunkie\.org\/torrent\//i)){
		return "http://dl."+str.split('\/\/')[1]+"/download.torrent";
	}if(str.match(/torrentreactor\.net\/torrents\/\d+\//i)){
		return "http://torrentreactor.net/download.php?id=" +str.match(/\d+/)+ "&name=" +str.split(/\/\d+\//)[1];
	}if(str.match(/extratorrent\.com\/torrent\/\d+\/\S+\.html$/i)){
		return str.replace('/torrent/','/download/').replace(/\.html$/i,'.torrent');
	}if(str.match(/torrentzap\.com\/torrent\/\d+\//i)){
		return "http://dl.torrentzap.com/download/"+str.match(/\d+/)+"/"+str.match(/\d+/);
	}if(str.match(/magnet:\?xt=urn:btih:/i)){
		return str;
	}
}


//handles click events on the document
function torrentHandler(e){
	var href = findHrefs(e.target).href;
	if(href == undefined || e.ctrlKey == 1){return;} //if it isn't a link, or the control key is pressed we don't want to register the click
	if(isTorrent(href)){
		postTorrentByURI(getTorrentURL(href));
		e.stopPropagation();
		e.preventDefault();

	}else{
		var lView = confirm("Not a valid torrent file, view locally?");
		if(lView){
			window.location = href;
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.stopPropagation();
			e.preventDefault();
		}
	}		
}


//Handles Posting of Torrent to Transmission at the host provided above
function postTorrentByURI(uri){
GM_xmlhttpRequest({
  method:"HEAD",
  url:host+"rpc",
  onload: function(response){
	var res = (response.responseHeaders).split("\n")[1].split(": ");
	var req =
"{\"method\": \"torrent-add\",\"arguments\":{\
\"filename\":\""+uri+"\"\}\}";
	//GM_log(req);
	GM_xmlhttpRequest({
		method:"POST",
  		url:host+"rpc",
		headers: { 
			"User-Agent": "Mozilla/5.0",
			"Accept": "text/xml",
			"X-Transmission-Session-Id": res[1]
		},
		data: req,
		onload: function(response){
			//alert(response.responseText);
			if(response.responseText.match(/success/)){
				alert("Torrent successfully added!");
			}else if(response.responseText.match(/duplicate torrent/)){
				alert("Torrent already exists");
			}else{
				alert("Invalid torrent file, try another");
			}
		}
	});
  }
});
}


function findHrefs(o){
	//alert (o.nodeName);
	if (o.nodeName == "A"){
		return (o);
	} else if (o.nodeName == "BODY") {
		return false;
	} else {
		return o.parentNode;
	}
}

//=========================================//

//==============Run========================//


if(isTorSite()){
	if(host.match(/http:\/\/example\.com/)){
		alert("Please Update Host in script file!");
		return;
	}
	var links = document.links;
	for(var i in links){
		//GM_log(links[i].href);
		if(!isTorrent(links[i].href)){
			links[i].style.opacity=0.4;
		}
	}
	document.addEventListener("click",torrentHandler,true);
	
}

//=========================================//