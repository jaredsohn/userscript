// ==UserScript==
// @name			XsearchTracker
// @namespace		totoro2
// @description		Cross search torrent sites for requests / snatches on various sites, original idea from jonls

// @include			http*://what.cd/torrents.php*
// @include			http*://what.cd/requests.php*

// @include			http*://*waffles.fm/requests.php*
// @include			http*://*waffles.fm/browse.php*
// @include			http*://*waffles.fm/snatches.php*

// @include			http*://tls.passthepopcorn.me/torrents.php?type=snatched*

// @include			http://bibliotik.org/requests*
// @include			http://bibliotik.org/torrents*

// @require			http://code.jquery.com/jquery-1.8.3.min.js

// @version			0.0.1
// @date			2012-11-22
// ==/UserScript==

(function() {
	var WAFFLES_ICON_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kEGhIYNxbFvDQAAACDSURBVDjLY2RgYGBYUcf/n4EMENH0kZFlRR3/fy/vPwwMDAwM27ayMJDCXsHA/58JZtrlM78YyGEzkut8GGBiYGBg8PL+A3dWRNNHhoimjwzEimP1wtGprAzEilPfC6SyqR8LsIDCBVbU8eP3wqeT3Dg1w+RIigVkzfRJSPSPBUqzMwAxZpuO9+ZbLgAAAABJRU5ErkJggg==';
	var WHATCD_ICON_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABGElEQVQ4y+2SPW7CUBCEv316j9SEC1AEgpAgJ6CgobULjklhaiRc+QRIrqhM7TZG3pWcIrKx83OBKFutZrSjmdHC/0i7JEnSmNmA3O/3AnA4HJo+7r0njmMB8O3x+HnMcrFk9DQC4HQ6DcR2ux0AdV2T5zlJkjRxHIsDMDNmLzPEOVQN1aETADXDTHHOMX+d07r1XRYRVGuyLPsxa3o+A7DZbJBH8oeAqgLCZDJhu91K/7jtIk3TRlWRHtsJmCk0QlmWXWlfSyzLkul02qu+J1C93/HBs1qtALhcLoMI6/UbAqgaZnWHO4AQAsWtoKoqzBS17yV+4sr9XlEUN0IIDwdRFMnxeGyu1+uvD5PnebeHEIiiSPgb8wGmm3+v17vMdQAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0wNS0xNFQyMDo1NDozOCswMjowMM/8r/oAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDUtMTRUMjA6NTQ6MzgrMDI6MDCQTdnOAAAAAElFTkSuQmCC';
	var BIBLIOTIK_ICON_URI = 'data:image/png;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAY2NiAKChoQCSkpIAy8zMAKyopgBlZWUAn5+fAHJycgDKysoAra2pAK2srADGt8YAzMzNAJWVkwDIyMgAiKamAI2KiQCurq8Aubm5ALq5uQDKxcAAioyMAJubmwBiY2QAv6ysANzZ2gBVV10AxsbGAF5fXwDHxsYAZGhvAKioqADIw74As7OyAHt7ewCvqKgAw8TEAM/PzgC0tbUAmpucALW1tQCmpqYA6+bfAJeXlwCGiIgAwrOyAMfGxwDR0dEA0c7JAO3o4gDBv7oAoqSkALOzswDDv7oAqKWhAKSkpAB3d3cAz8/PAGhoaAC/wMAAfX1/AKKiogCSk5MArq2sAMvNzQCur68AioqMAOrk3gCfoKAAoKCgALu6uQCWlZYA6enpAIKCggDEwb4Ay8vLAOzm4QCrra0AVVVVAK2trQCura0AampsAHV1dgBiYmIAqaurALq6ugCrq6sAnJycANjRywCNjY0AxsfHAMfHxwDk39UAwcPCALi4uAC5uLgAqampAJuamgBycXIAXl5eALW2tgC2trYAnJydAKinpwCXmJgAcnN1AN7Y0QDh4eEA0tLSAMLDwwDDw8MAmpqbAMTAuwClpaUAWVhXAMjJywCXlpYA0NDQAL/BwQBpaWkAwMHBANLQ0ABaWloAb29xAHp6ewBdX2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREQAAAAAAAAAREREREQya3EKAAAAAERERCtZFQUOVH5SfAAARERETTZzTwgGBhhTPUpERERdNwEfEFUIOWN9LA9JKyERext4FhomXxQvbG1tZjkdZDsjVkFAVTo/AhxXEg0xagMLIilFKhlvMGcHCU5MAABoLVpYRiBeNWZ2Pm5cDAAAADNDSHBRZW8eWwQ4eW8AAAAAAGJiF0JhdycuJXVHAAAAAAAAAGkoJEI8YHRLcgAAAAAAAAAAPjRQE3oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD/8AAA/gAAAPAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAADgAAAA+AAAAP4AAAD/BwAA//8AAP//AAA=';


	/* Binary size constants */
	var KiB = Math.pow(2,10);
	var MiB = Math.pow(2,20);
	var GiB = Math.pow(2,30);
	var TiB = Math.pow(2,40);
	var PiB = Math.pow(2,50);

	/* Parse binary size string  */
	function parse_binary_size(s) {
		var s = s.match(/([\d\.,]+)\s*(B|KB|MB|GB|TB|PB)/);
		var amount = parseFloat(s[1].replace(/,/, ''));
		var unit = s[2];

		if (unit == 'KB') amount *= KiB;
		else if (unit == "MB" ) amount *= MiB;
		else if (unit == "GB" ) amount *= GiB;
		else if (unit == "TB" ) amount *= TiB;
		else if (unit == "PB" ) amount *= PiB;

		return amount;
	}

	/* Convert byte size to string representation */
	function binary_size_string(amount) {
		var unit = 'B';
		if (Math.abs(amount) >= PiB) {
			amount /= PiB;
			unit = 'PB';
		} else if (Math.abs(amount) >= TiB) {
			amount /= TiB;
			unit = 'TB';
		} else if (Math.abs(amount) >= GiB) {
			amount /= GiB;
			unit = 'GB';
		} else if (Math.abs(amount) >= MiB) {
			amount /= MiB;
			unit = 'MB';
		} else if (Math.abs(amount) >= KiB) {
			amount /= KiB;
			unit = 'KB';
		}
		return amount.toFixed(2)+' '+unit;
	}

	/* Throttled proxy */
	function Proxy(delay) {
		var last_req = new Date(0);
		var queue = [];
		var processing = false;

		return {
			get: function(url, accept, callback) {
				var now = new Date();
				queue.push({ url: url, accept: accept, callback: callback });
				if (!processing) {
					processing = true;
					var diff = last_req.getTime() + delay - now.getTime();
					if (diff > 0) {
						var that = this;
						window.setTimeout(function() { that.process_queue(); }, diff);
					} else {
						this.process_queue();
					}
				}
			},

			process_queue: function() {
				var req = queue.shift();
				this.do_request(req.url, req.accept, req.callback);
				processing = (queue.length > 0);
				if (processing) {
					var that = this;
					window.setTimeout(function() { that.process_queue(); }, delay);
				}
			},

			do_request: function(url, accept, callback) {
				last_req = new Date();
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					headers: { 'User-Agent': navigator.userAgent, 'Accept': accept },
					onload: callback
				});
			}
		};
	}
	
	//function insert_search_link(link,icon,indicateURL,strL) {
	function insert_search_link(link,whichSite, fullData) {
		var search_str='';
		for (var i=0;i<whichSite.length;i++){
			if(whichSite[i]==0) {
				var dFrom=fullData[i].from;
				var dArtist=fullData[i].artist;
				var dRelease=fullData[i].release;
				var dRegexp=fullData[i].regexp;
			}
		}
		//for (var i=0;i<icon.length;i++){
		for (var i=0;i<whichSite.length;i++){
			if(whichSite[i]>0) {
			search_str = '<span> | </span><a href="#'+fullData[i].site+'"><img src='+fullData[i].icon+'></a>';
			var search_link = $(search_str);
			//search_link.click(fullData[i].strToLook, function(event) { requests_search(); event.preventDefault(); return false; });
			search_link.click(requests_search(fullData[i].strToLook, dFrom, dArtist, dRelease, fullData[i].icon, fullData[i].site,dRegexp));
			$(link).eq(0).append(search_link);
			}
		}
	}
	function requests_search(param0, param1, param2, param3, param4,param5,param6) {
		return function(){
			//alert(param6);
			$(param1).each(function(i) {
				var row = $(this);
				var strA= param2[0];
				var spA=param2[1];
				var strR=param3[0];
				var spR=param3[1];
				if (param6 != null) {
					var toRegexp= $(row).find($(strA))[spA].textContent;
					if (toRegexp.match(param6)) {
						var artist=toRegexp.match(param6)[1];
						var release=toRegexp.match(param6)[3];
					}
				} else {
					var artist=$(row).find($(strA))[spA].textContent;
					var release=$(row).find($(strR))[spR].textContent;
				}
				console.log(artist+'/'+release);
				var result_span = $('<span>Loading...</span>');
				var result_div = $('<div><span id="'+param5+'" style="font-weight: bold; padding-left: 18px; height: 16px; background: transparent url('+param4+') no-repeat scroll left center;">'+param5+'</span>: </div>');
				result_div.append(result_span);
				row.children('td').eq(0).append(result_div);
			});
		};
	}
	/*



			request = $.trim(request.replace(/\([^\)]*\)/g, '').replace(/\[[^\]]*\]/g, '').replace(/\bflac\b/gi, '').replace(/\bv[02]\b/gi, ''));
				search_waffles(waffles_uid, waffles_passkey, artist, request, function(search_url, results) {
				if (results.length > 0) {//jondb date
					result_div.find("#waf").text(results[0].date.substr(8,2)+'-'+results[0].date.substr(5,2)+'-'+results[0].date.substr(0,4));
					result_span.html('<a href="'+results[0].url+'">'+results[0].text+' ('+binary_size_string(results[0].size)+')</a> (<i><a href="'+search_url+'">('+(results.length-1)+')Other results</a></i>)');
				} else {
					result_span.html('Nothing found (<i><a href="'+search_url+'">Refine search</a></i>)');
					result_div.slideUp(500);
					row.children('td').eq(0).click(function(event) { result_div.slideToggle(500); });
				}
			});
	*/
	if (/what\.cd\/torrents\.php/.test(document.URL)) {
	} else if (/what\.cd\/requests\.php/.test(document.URL)) {
	} else if (/waffles\.fm\/requests\.php/.test(document.URL)) {
	} else if (/waffles\.fm\/browse\.php/.test(document.URL)) {
	} else if (/waffles\.fm\/snatches\.php/.test(document.URL)) {
		var linkForCommand ='html > body > center > table.mainouter > tbody > tr > td.outer > p';
		var SData=[1,0,1];
	} else if (/bibliotik\.org\/requests/.test(document.URL) || /bibliotik\.org\/torrents/.test(document.URL)) {
		var linkForCommand ='html > body > div#superwrap > div#body div.table_div table > thead > tr > td.pagination';
		var SData=[0,1,1];
	} else if (/tls\.passthepopcorn\.me/.test(document.URL)) {
		var linkForCommand ='html.UserTorrentsHideTagsStyle > body#torrents > div#wrapper > div#content > div.thin div.linkbox';
	}
	
	var dataSearch =[
						{"site":"bibliotik", 
							"icon": BIBLIOTIK_ICON_URI,
							"from": "html > body > div#superwrap > div#body > div.table_div table > tbody > tr",
							"artist": ["td > a",0],
							"release": ["td > span.title",0]
						},
						{"site":"waffles",
							"icon":WAFFLES_ICON_URI,
							"from": "html > body > center > table.mainouter > tbody > tr > td.outer > table > tbody > tr",
							"artist": ["td > a",0],
							"release": ["td > a",0],
							"regexp": RegExp("(.*)?( - ){1}(.*) (\[.*\])?")
						},
						{"site":"what",
							"icon":WHATCD_ICON_URI,
							"strToLook":"look in what"
						}
						];
	insert_search_link(linkForCommand, SData, dataSearch);
	//insert_search_link(linkForCommand, iconForCommand, iURL,strToLook);
})();