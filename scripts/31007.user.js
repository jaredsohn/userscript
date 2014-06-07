// ==UserScript==
// @name			Tube Downloader
// @description		Adds a button to download any tube on Youtube, Google! Video, Dailymotion, Veoh, Yahoo! Video and much more	
// @namespace		http://userscripts.org/users/49758
// @include			*
// @version			0.5
// Homepage : http://grabber.huhiho.com

// ==/UserScript==

const currentVersion = '0.5';

const currentURL = window.location;

var WHERE;

var debug = false;

var download_icon = 'data:image/gif;base64,R0lGODlhEAAQAMQAAIWOl8rKyoibetPT02hoarm6usPDw/Pz89ra2uTk5Hl6e6mrpmGNRH2vWunp'+
					'6e3t7ZPNX47LVbW1tZPIa5nXWvv7+1hZXfT2+HFxcfNXV2FhYZ6ens7OzvDw8GOPRf///yH5BAAA'+
					'AAAALAAAAAAQABAAAAWf4CeOX9SQJGIYi+CZniBsQCEa5Nt44nUBIlvCQ6RMiB7ORRH8JCoeCAUS'+
					'YVQ4H+ZH8kEgDp5Gg9HhYDGiRRcRODDIBvMH/VEPBgVJpyORyOl2d2aDcgQiGwd7D4sPDo6Ohh8b'+
					'HSoFlpYSBRwOkZN3AxwBHxMGGQYJGocXn6EBKwYFHakfAAgXHY2PDgkdARYiAArCGBgExhrIFpEo'+
					'zCQhADs=';

var sitesRegExp = {
	youtube	:	[
					new RegExp("^http:\/\/([^/]+\.)?youtube\.com"),
					new RegExp("\/watch\\?v=[A-Za-z0-9\\-\\_]+"),
					new RegExp("\/v\/[A-Za-z0-9\\-\\_]+"),
				],
	google	:	[
					new RegExp("^http:\/\/video\.google\.(?:com|com\\.au|ca|de|es|fr|it|nl|pl|co\\.uk|cn)"),
					new RegExp("docid=[0-9\\-]+","i"),
					new RegExp("docid=[0-9\\-]+","i"),
				],
	dailymotion	:	[
						new RegExp("^http:\/\/(www\.)?dailymotion\.com"),
						new RegExp("\/video\/[0-9A-Za-z\\_\\-]+","i"),
						new RegExp("\/swf\/[0-9A-Za-z\\_\\-]+","i"),
					],
	yahoo	:	[
					new RegExp("^http:\/\/video\.yahoo\.com"),
					new RegExp("\/watch\/[0-9]+"),
				],
	metacafe:	[
					new RegExp("^http:\/\/(www\.)?metacafe\.com"),
					new RegExp("\/watch/[A-Za-z0-9\\-]+\/?([A-Za-z0-9\\-\\_]+)?"),
					new RegExp("\/fplayer/[A-Za-z0-9\\-]+\/[A-Za-z0-9\\-\\_]+\.swf"),
				],
	veoh	:	[
					new RegExp("^http://(www\.)?veoh\.com"),
					new RegExp("\/videos\/[A-Za-z0-9]+"),
					new RegExp("permalinkId=[A-Za-z0-9]+"),
				],
	spike	:	[
				 	new RegExp("^http://(www\.)?spike\.com"),
					new RegExp("\/video\/[a-zA-Z0-9\\-\\_]+\/[0-9]+"),
				],
	break	:	[
					new RegExp("^http://(embed\.|www\.)?break\.com"),
					new RegExp("\/index\/[a-zA-Z0-9\\-\\_]+\.html"),
					new RegExp("\/[a-zA-Z0-9\\-\\_]+"),
				],
	yourfilehost	:	[
							new RegExp("^http://(www\.)?yourfilehost\.com"),
							new RegExp("file=[^&]+"),
						],
	myspace	:	[
					new RegExp("^http://(vids|mediaservices)\.myspace\.com"),
					new RegExp("videoid=[0-9]+"),
					new RegExp("embed\.aspx\/m=[0-9]+"),
				],
	livevideo:	[
					new RegExp("^http://(www\.)?livevideo\.com"),
					new RegExp("\/[a-fA-F0-9]+\/[^\.]*\.aspx"),
					new RegExp("\/embed\/[a-fA-F0-9]+"),
				],
	
	'5min':	[
					new RegExp("^http://(www\.)?5min\.com"),
					new RegExp("\/Video\/[a-zA-Z0-9\-]+","i"),
					new RegExp("\/Embed\/0-9]+","i"),
				],
	tinypic:	[
					new RegExp("^http://(www\.)?tinypic\.com"),
					new RegExp("v=[a-z0-9]+&s=[0-9]+"),
					new RegExp("v=[a-z0-9]+&s=[0-9]+"),
				],
	putfile:	[
					new RegExp("^http://media\.putfile\.com"),
					new RegExp("\/([a-zA-Z0-9\-\_]+)"),
					new RegExp("videoFile=([a-zA-Z0-9\-\_]+)"),
				],
	crunchyroll:	[
					new RegExp("^http://(www\.)?crunchyroll\.com"),
					new RegExp("\/media\-([0-9]+)"),
				],
	
	clip	:	[
					new RegExp("^http://(www\.)?clip\.vn"),
					new RegExp("\/watch\/[^\/]+\/[a-zA-Z0-9\\-\\_]+"),
					new RegExp("\/w\/[a-zA-Z0-9\\-\\_]+"),
				],
	tamtay	:	[
					new RegExp("^http://video\.tamtay\.vn"),
					new RegExp("\/play\/[0-9]+"),
					new RegExp("config%2F[0-9]+"),
				],
}

function $(id) {
	return document.getElementById(id);
}

function $$(element) {
	return document.createElement(element);
}

function insertAfter(parent, newNode, refNode) {
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	}
	else {
		return parent.appendChild(newNode);
	}
}

function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://grabber.huhiho.com/version.txt',
			onload: function(results) {
				var version = results.responseText;
				if (version.length && version != currentVersion) {
					if (confirm('[ Greasemonkey ] Tube Downloader : Version '+ version +' is now available. Update ?')) {
						GM_openInTab('http://userscripts.org/scripts/show/31007');
					}
				}
				else if (a) {
					alert('[ Greasemonkey ] Tube Downloader : No new version found');
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}

function addStyle() {
	var styles = [
		'#tube_downloadBox {position: fixed; right: 5px; bottom: 5px; z-index: 2512;opacity: 0.8;}',
		'#tube_downloadBox a, .tube_downloadBtt a, .tube_downloadBtt a:visited, .tube_downloadBtt a:link {font-size:11px;font-family:Verdana;font-weight:bold;color:#1F85C1 !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#tube_downloadBox a:hover, .tube_downloadBtt a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}',
		'#tube_downloadBox img, .tube_downloadBtt img, #tube_downloadBox a:hover img, .tube_downloadBtt a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}',
		'.tube_downloadBtt {z-index:2512;text-align:right}',
		'.tube_downloadBtt a {display:block;padding-bottom:4px;}'
	];
	
	GM_addStyle(styles.join("\r\n"));
	
}

function showDownloadBox(url) {
	if (WHERE == 'google_video' && $('external_page')) {
		return;
	}
	var downloadBox = document.createElement('div');
	document.body.appendChild(downloadBox);
	downloadBox.id = 'tube_downloadBox';
	downloadBox.innerHTML = '<a title="Download" target="_blank" href="http://grabber.huhiho.com/'+url+'"><img src="'+ download_icon +'" width="16" height="16" /> Download</a>';
}

function getTimeInMilliseconts(date) {
	return date.getHours( )*60*60 + date.getMinutes( )*60 + date.getSeconds( ) + date.getMilliseconds( )/1000;
}

checkForUpdate(false);

if (debug) {
	var startTime = getTimeInMilliseconts(new Date());
}

for (site in sitesRegExp) {
	if (currentURL.href.indexOf(site) != -1) {
		if (sitesRegExp[site][0].test(currentURL)) {
			if (sitesRegExp[site][1].test(currentURL)) {
				WHERE = site + "_video";
				break;
			}
			if (!WHERE) {
				WHERE = site;
			}
		}
	}
}

addStyle();

if (WHERE) {
	if (WHERE.indexOf('_video') != -1) {
		var url = currentURL.href;
		if (WHERE == 'veoh_video') {
			url = url.replace(currentURL.search,'');
		}
		showDownloadBox(url);
	}
	return;
}

var xpath = '//embed[@type="application/x-shockwave-flash"] | //object[not(./embed)]';
var snapshot = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var len = snapshot.snapshotLength;
for (var i=0;i<len;i++) {
	var embed = snapshot.snapshotItem(i);
	var src = null;
	
	if (embed.tagName == 'EMBED') {
		var src = embed.src;
	}
	else {
		var param = embed.getElementsByTagName('param');
		
		for (var x=0;x<param.length;x++) {
			if (param[x].name == 'movie') {
				var src = param[x].value;
			}
		}
	}
	if (!src) continue;
	for (site in sitesRegExp) {
		if (src.indexOf(site) != -1) {
			if (sitesRegExp[site][0].test(src)) {
				if (sitesRegExp[site][2] && sitesRegExp[site][2].test(src)) {

					var newEmbed = embed.cloneNode(true);
					
					var mtable = $$('table');
					var mtr1 = $$('tr');
					var mtd1 = $$('td');
					var mtr2 = $$('tr');
					var mtd2 = $$('td');
					
					var downloadBtt = $$('div');
					downloadBtt.className = 'tube_downloadBtt';
					downloadBtt.innerHTML = '<a target="_blank" href="http://grabber.huhiho.com/'+src+'"><img src="'+ download_icon +'" width="16" height="16" /> Download</a>';
					
					mtd1.appendChild(newEmbed);
					mtd2.appendChild(downloadBtt);
					mtr1.appendChild(mtd1);
					mtr2.appendChild(mtd2);
					mtable.appendChild(mtr1);
					mtable.appendChild(mtr2);
					
					var parent = embed.parentNode;
					if (!parent) {
						parent = document;
					}
					
					parent.replaceChild(mtable,embed);
					break;
				}
			}
		}
	}
}

if (debug) {
	var endTime = getTimeInMilliseconts(new Date());
	var runTime = endTime - startTime;
	runTime = (Math.round(runTime*1000))/1000;
	GM_log(runTime);
}
/* RedPhoenix89@yahoo.com - 2008 */