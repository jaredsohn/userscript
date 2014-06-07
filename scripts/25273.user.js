// ==UserScript==
// @name           Last.fm - Get lyrics from lyricsplugin.com
// @namespace      http://devidens.hu/userscript/
// @description    Does exactly what the name says... :)
// @include        http://www.last.fm/music/*
// @include        http://www.last.fm/listen/*
// @include        http://*.lastfm.*/music/*
// @include        http://*.lastfm.*/listen/*
// ==/UserScript==

(function() {
	if (window.opera) {
		var w = window;
		init();
	} else {
		var w = unsafeWindow;
		var $ = unsafeWindow.$;
		var $$ = unsafeWindow.$$;
		var console = unsafeWindow.console;
		var Element = unsafeWindow.Element;
		window.addEventListener('load', init, false);
	}

	function init(event) {
		if (document.location.pathname.substr(0, 8) == "/listen/") {
			var prev = [];
			if (document.getElementById("LastAd_TopRight")) {
				var ad = document.getElementById("LastAd_TopRight");
				ad.parentNode.removeChild(ad);
			}
			w.Ajax.Responders.register({
				onCreate: function(request, transport) {
					if (request.url.indexOf("listeningNow")) {
						var a = request.parameters.artist;
						var t = request.parameters.track;
						// http://wiki.greasespot.net/0.7.20080121.0_compatibility
						setTimeout(function() {
							var c = w.$$("#content .rightCol")[0];
							var title = a + " - " + t + " (lyrics)";
							getLyrics(a, t, c, function() {
								if (w.$("fm_track_title")) {
									w.$("fm_track_title").update(title);
								} else {									
									c.insert({ top: addH2(title) });
								}
							});
						}, 0);
					}
				}
			});
		}

		if (document.location.pathname.match(/music\/.+\/_\/.+/)) {
			var div = document.createElement("div");
			var h2 = addH2("Lyrics");

			w.$("catalogueHead").insert({ after: h2 });
			w.Element.insert(h2, { after: div });

			getLyrics(
				w.$$(".pagehead a")[0].innerHTML.match(/span>(.+)/i)[1],
				document.getElementsByTagName("h1")[1].innerHTML.match(/(.+)\(\d+:\d+\)/)[1].replace(/^\s*|\s*$/g,""),
				div
			);
		}
	}

	function getLyrics(artist, title, container, callback) {
		var lyricsUrl = "http://www.lyricsplugin.com/winamp03/plugin/?artist=" + escape(artist) + "&title=" + escape(title);
		if (!document.getElementById("fm_lyrics")) {
			w.Element.insert(container, {
				top: "<p id='fm_lyrics' style='-moz-column-count:2'>Please wait...</p>"
			});
			w.Element.insert(container, {
				top: "<h3 style='margin-bottom: 1em'><a title='God bless lyricsplugin.com' href='" + lyricsUrl + "'>Lyrics <span>(from lyricsplugin.com)</span></a></h3>" 
			});
		}
		var fml = document.getElementById("fm_lyrics");
		GM_xmlhttpRequest({
			method: 'GET',
			url: lyricsUrl,
			onload: function(responseDetails) {
				lyrics = responseDetails.responseText.match(/<div id="lyrics">(([\S\s]*?))<\/div>/ig)[0]
				if (lyrics.length == 25) {
					lyrics = "<strong>Lyrics not found...</strong>";
				}
				fml.innerHTML = lyrics;
				if (callback) {
					callback();
				}
			}
		});
	}

	function addH2(text) {
		var h2 = document.createElement("h2");
		h2.setAttribute("class", "heading");
			
		var span = document.createElement("span");
		span.setAttribute("class", "h2Wrapper");
		span.id = "fm_track_title";
		span.innerHTML = text;
		h2.appendChild(span);
		return h2;
	}

	function trim(s) {
		return s.replace(/^\s*|\s*$/g,"");
	}

	// OPERA

	// http://my.opera.com/community/forums/topic.dml?id=155224&t=1228596663&page=1#comment1799368
	if (typeof(GM_xmlhttpRequest) == "undefined") {
function GM_xmlhttpRequest(options) {
  var request = new opera.XMLHttpRequest(), validEvents = { onload: null, onerror: null, onreadystatechange: null };
  
  function addXMLHttpRequestListener(request, eventName, callback) {
    request[eventName] = function(event) {
      var responseDetails = {
        responseText: request.responseText
        ,readyState: request.readyState
        ,responseHeaders: (request.readyState == 4 ? request.getAllResponseHeaders() : '')
        ,status: request.readyState == 4 ? request.status : 0
        ,statusText: request.readyState == 4 ? request.statusText : ''
      };
      callback.call(null, responseDetails);
    }
  }

  // add event listeners
  for (var eventName in validEvents) {
    if (options[eventName])
      addXMLHttpRequestListener(request, eventName, options[eventName]);
  }

  // open the connection
  request.open(options.method, options.url, true);

  // set the headers
  for (var header in options.headers) {
    request.setRequestHeader(header, options.headers[header]);
  }
  
  // send the data
  request.send(options.data);
  return request;
}

	}
})();
 
