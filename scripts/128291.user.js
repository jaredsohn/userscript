// ==UserScript==
// @id             4chan_youtube_titles@4chan
// @name           4chan Youtube URL Titles
// @version        0.4
// @namespace      4chan
// @author         cc
// @description    Replaces Youtube URLs on 4chan boards with a title text & thumbnail link (no flash object embedding)
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @priority       4
// @run-at         document-end
// ==/UserScript==


var OPEN_IN_NEW_WINDOW   = true;
var ALLOW_MULTIPLE       = false;







//var feedurl = 'https://gdata.youtube.com/feeds/api/videos?alt=json&q=';
var feedurl = 'https://gdata.youtube.com/feeds/api/videos/$yid?v=2&alt=json';
var feeds_per_req = 1; //10;


var namespace = "4chan_youtube_titles.";
var youtubeCache = loadObject("youtubeCache", { entries:{} });
if (!youtubeCache.entries) { youtubeCache.entries = {} };
//console.log("YT CACHE: ", youtubeCache);

function loadObject(name, defaultObj) {
	var value = GM_getValue(namespace+name);
	if (value) {
		return JSON.parse(value);
	}
	return defaultObj;
}
function saveObject(name, obj) {
	return GM_setValue(namespace+name, JSON.stringify(obj));
}
function removeObject(name) {
	return GM_deleteValue(namespace+name);
}

//var blocks = document.getElementsByTagName("blockquote");
var docblocks = document.querySelectorAll("blockquote.postMessage");

//var url_regex = /(http:\/\/[\w\-\.]+\/[\w\-\.\!\#\%\?\=\&\(\)\~\:\;\,\+\/]+)/g;
//var find_regex = /http:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)[\w\-\.\!\#\%\?\=\&\(\)\~\:\;\,\+\/]+/g;
var find_regex = /https?:\/\/[\w\-\.]+\/[\w\-\.\!\#\%\?\=\&\(\)\~\:\;\,\+\/]+/g;
//var url_regex = /youtube\.com\/watch\?v=([\w\-]+)/;
var url_regex = /(?:youtube\.com\/watch\?.*?v=|youtu\.be\/)([\w\-]+)/;

var blockQueue = {};
var yn = 0;
var lastmID = "m0";

var targwin = OPEN_IN_NEW_WINDOW ? 'target="_blank" ' : '';

parseBlocks(docblocks);

document.addEventListener('DOMNodeInserted', onNodeInsert, false);
function onNodeInsert(e) {
	if (!e || !e.target)
		return;
	if (e.target.nodeName == 'DIV' && e.target.className.match(/\breplyContainer\b/)) {
		//console.log("add", e.target);
		var blocks = e.target.querySelectorAll("blockquote.postMessage");
		if (blocks.length) {
			parseBlocks(blocks);
		}
	}
}


function parseBlocks(blocks) {

	//console.log("start");
	//console.log("blocks:", blocks);
	//blocks.each(function() {
	for (var i = 0; i < blocks.length; i++) {
		var block = blocks[i];

		var mID = this.id;
		if (mID > lastmID || true) {
			lastmID = mID;

			//console.log("block:", this);
			var text = block.innerHTML;
			text = text.replace(/<wbr>/g, "");
			//var text = $(this).html();
			//console.log("TEXT:", text);
			text = text.replace(/\"http/g, '"hXXp');
			//var seen = {};

			var matches = text.match(find_regex);
			for (var j in matches) {
				var match = matches[j];
				//console.log("match:", match);
				//if (!seen[match]) {
					//seen[match] = true;
					var ymatch = match.match(url_regex);
					var zmatch = match.replace(/http/, 'hXXp');
					if (ymatch && ymatch.length > 1) {
						var yid = ymatch[1];
						//var temptitle = zmatch;	//'['+yn+'.'+yid+']';
						zmatch = zmatch.replace('hXXp:', 'hXXps:');
						
						var ytobj = youtubeCache.entries[yid];
						if (ytobj) {
						
							text = text.replace(match, '<a class="yt" id="yt_'+yn+'" '+targwin+'data-ytn="'+yn+'" data-ytid="'+yid+'" href="'+zmatch+'"><img src="'+ytobj.tnurl+'"><label>'+ytobj.title+'</label><div onclick="emb(this,event);return false">&bull;</div></a>');
							yn++;

						} else {

							text = text.replace(match, '<a class="yt" id="yt_'+yn+'" '+targwin+'href="'+zmatch+'">'+zmatch+'</a>');
		//					text = text.replace(match, '{{'+zmatch+'}}');
							//block.innerHTML = text;
							//var ablock = document.getElementById('yt_'+yn);

							if (!blockQueue[yid]) {
								blockQueue[yid] = [];
							}
							blockQueue[yid].push(yn);
							yn++;
						}
					} else {
						text = text.replace(match, '<a '+targwin+'href="'+zmatch+'">'+zmatch+'</a>');
					}
				//}
			}

			//text = text.replace(/\"hXXp/g, '"http');
			text = text.replace(/hXXp/g, 'http');
			block.innerHTML = text;
			//$(this).html(text);
		}
	//});
	}

	var keys = [];
	for (var key in blockQueue) {

		// Google's request query format seems to break if a video id contains a '-' so we try to strip off the smaller segment here for a partial match instead
		//var newkey = key.replace(/[\-_]\w{0,5}$/, '').replace(/^\w{0,5}[\-_]/, '');
		//console.log("key: ", key, newkey);
			var newkey = key;
		keys.push(newkey);

		if (keys.length == feeds_per_req) {
			ytRequest(keys);
			keys = [];
		}
	}
	if (keys.length > 0) {
		ytRequest(keys);
	}
}

function ytResponse(e) {
	var req = this;
	if (req.readyState == 4) {
		var resp = JSON.parse(req.responseText);
		//console.log(resp.feed.entry);
//		if (!resp || !resp.feed || !resp.feed.entry) {
		if (!resp || !resp.entry) {
			//console.log("ERR? "+req.testurl);
			//console.log(req.responseText);
		}
		//console.log(req.testurl);
		//console.log("RESPONSE COUNT: "+resp.feed.entry.length);
		/*if (resp.feed.entry.length > feeds_per_req) {
			//console.log(req.responseText);
		}*/
		var didUpdate = false;

//		for (var i in resp.feed.entry) {
//			var entry = resp.feed.entry[i];
			var entry = resp.entry;
			var yurl = entry.id.$t;
			var ytitle = entry.title.$t;
			var yid = yurl.match(/[\w\-]+$/)[0];
			var tn = entry['media$group']['media$thumbnail'][1];
			var tnurl = tn['url'];
			tnurl = tnurl.replace("http:", "https:");
			var tnw = tn['width'] / 2;
			var tnh = tn['height'] / 2;
			

			//console.log("Y: "+yid+" = "+ytitle);
			if (blockQueue[yid]) {
				for (var j in blockQueue[yid]) {
					var yn = blockQueue[yid][j];
					var ablock = document.getElementById('yt_'+yn);

					var ytobj = {
						yn: yn,
						ytid: yid,
						title: ytitle,
						tnurl: tnurl,
						url: ablock.href,
					};
					console.log("ytobj: ", ytobj);
					youtubeCache.entries[yid] = ytobj;
					didUpdate = true;

					ablock.setAttribute('data-ytn', yn);
					ablock.setAttribute('data-ytid', yid);
					//ablock.innerHTML = '['+ytitle+']';
					//ablock.innerHTML = '<img src="'+tnurl+'"><label>'+ytitle+'</label>';
					ablock.innerHTML = '<img src="'+tnurl+'"><label>'+ytitle+'</label><div onclick="emb(this,event);return false">&bull;</div>';
				}
				delete blockQueue[yid];
			}
//		}
		
		if (didUpdate) {
			saveObject("youtubeCache", youtubeCache);
		}
	}
}

function ytRequest(k) {
	//var url = feedurl + k.join('|');
	
	var url = feedurl.replace("$yid", k[0]);

	//console.log("REQ ["+k.length+"]: ", url, k);
	var req = new XMLHttpRequest();
	req.testurl = url;
	req.open("GET", url, true);
	req.send();
	req.onreadystatechange = ytResponse;
}


//	http://gdata.youtube.com/feeds/api/videos?q=Z5pyMzyb5vc|VNw5x24G0Nw
//	http://gdata.youtube.com/feeds/api/videos/Z5pyMzyb5vc

GM_addStyle('a.yt {  	font-family: Verdana, sans-serif;      font-size: 9px;  	text-decoration: none;      display: inline-block;      background: #bbe;      padding: 0px 6px 2px 4px;      border: 1px solid #eef;      outline: 1px solid #99d;      margin: 4px;  }  a.yt>img {      vertical-align: middle;      width: 60px;      height: 45px;  }  a.yt>label {      max-width: 200px;      display: inline-block;      margin-left: 6px;      vertical-align: middle;  }  a.yt:hover {      color: #45a !important;      outline-color: #aae !important;      background: #ccf;  }  span.spoiler a.yt { background: black; }  span.spoiler a.yt>label { color: black; }  span.spoiler a.yt>img { visibility: hidden; }  span.spoiler a.yt:hover>img { visibility: visible; }  span.quote a.yt>label { color: #789922; }    a.yt>div {  	color: #34345C;  	/*background: #242424;*/  	display: inline-block;  	/*border: 1px solid red;*/  	margin: 0;  	padding: 0;  	width: 20px;  	height: 42px;  	line-height: 42px;  	border-radius: 2px;  	margin-left: 8px;  	text-align: center;  	vertical-align: middle;  }  a.yt:hover div {  	/*opacity: 0;*/  	/*background: #282828;*/  }  a.yt>div:hover {  	color: #56c;  	background: #ddf;  	/*opacity: 1;*/  }    a.ytembed {  	padding: 0px;  }  a.ytembed > img, a.ytembed > label /*, a.ytembed > div*/ {  	display: none;  }  a.ytembed > div {  	height: 280px;  	line-height: 280px;  	margin: 0px;  }  a.ytembed > iframe {  	vertical-align: middle;  }  div#qp iframe { display: none !important; } div#qp a.ytembed > img, div#qp a.ytembed > label { display: inline-block !important; } div#qp a.ytembed > div { height: 42px !important; line-height: 42px !important; } ');

function emb(ref, event) {
	if (event) {
		event.preventDefault();
	}

	var a = ref.parentNode;
	if (!a) return;
	var n = a.getAttribute('data-ytn');
	var iframe = document.getElementById('ytem_'+n);
	if (iframe) {
		a.removeChild(iframe);
		a.className = "yt";
	} else {
	
		if (!ALLOW_MULTIPLE) {
			var ablocks = document.getElementsByClassName('ytembed');
			for (var i = 0; i < ablocks.length; i++) {
				var ablock = ablocks[i];
				var an = ablock.getAttribute('data-ytn');
				var aframe = document.getElementById('ytem_'+an);
				ablock.removeChild(aframe);
				ablock.className = "yt";
			}
		}
	
		var iframe = document.createElement('iframe');
		iframe.id = 'ytem_'+n;
		iframe.className = 'youtube-player';
		iframe.width = 340;
		iframe.height = 280;
		iframe.src = 'https://www.youtube.com/embed/'+a.getAttribute('data-ytid')+'?autoplay=1';
		iframe.frameBorder = '0';
		iframe.setAttribute('data-ytn', n);
		a.insertBefore(iframe, a.firstChild);
		a.className = "yt ytembed";
		//<iframe class="youtube-player" type="text/html" width="340" height="280" src="http://www.youtube.com/embed/ZZZZ" frameborder="0"></iframe>
	}
}
http://www.youtube.com/watch?v=BA-g8YYPKVo
var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = "var ALLOW_MULTIPLE = "+ALLOW_MULTIPLE+";\n";
script.innerHTML += emb;
document.getElementsByTagName('head')[0].appendChild(script);

