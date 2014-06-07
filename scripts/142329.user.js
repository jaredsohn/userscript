// ==UserScript==
// @name        Lyrics
// @author 	mallo
// @namespace   http://userscripts.org/users/mallo
// @include     http*://www.youtube.com/watch*
// @include     http*://*last.fm/listen*
// @include     http*://*lastfm.*/listen*
// @include 	http*://*grooveshark.com/*
// @version     1.2
// @description Adds lyrics to YouTube and Last.fm
// @grant none
// ==/UserScript==

var LyricsInsert = function(window, undefined) {
	
	if(self !== top) return;
	
	var HTML_TEMPLATE = '<div id="lyrics-container" class="status-1">\
			<form id="lyrics-form">\
				<label><span>Searchterm</span><input id="lyrics-searchterm" autocomplete="off" accesskey="l"></label>\
				<button type="submit" id="lyrics-submit"><span>&#x266b;</span></button>\
			</form>\
			<div id="lyrics-content-wrapper">\
				<h2 id="lyrics-title"></h2>\
				<div id="lyrics-content">\
				</div>\
			</div>\
			<div id="lyrics-meta">\
				<a target="_blank" id="lyrics-page-current" href="#">no lyrics found ...</a>\
				<nav id="lyrics-results-switch">\
					<button title="previous result" id="lyrics-results-prev"><span>&lt;</span></button>\
					<em id="lyrics-results-counter"><span id="lyrics-results-current">0</span>/<span id="lyrics-results-all">0</span></em>\
					<button title="next result" id="lyrics-results-next"><span>&gt;</span></button>\
				</nav>\
			</div>\
				<div id="lyrics-loading">\
					<span id="lyrics-loading-1">.</span><span id="lyrics-loading-2">.</span><span id="lyrics-loading-3">.</span> \
				</div>\
				<div id="lyrics-status">\
				</div>\
		</div>';
		
	var STYLES_TEMPLATE = '<style>\
			* { margin: 0px; padding: 0px; }\
			body, input { font-family: Arial, Verdana, sans-serif; font-size: 12px; color: #333; }\
			#lyrics-container { height: 95%; position: relative; padding: 5px 5px 10px 5px; border-bottom: 1px solid #ccc; border-radius: 2px; text-shadow: 1px 1px #f6f6f6; }\
			#lyrics-form label { float: left; width: 260px; border: 1px solid #ccc; border-right: none; box-shadow: 3px 3px 6px -5px #bbb inset; background-color: #fff; }\
			#lyrics-form { opacity: 0.4; }\
			#lyrics-container:hover #lyrics-form { opacity: 1; -moz-transition: opacity 0.4s ease; -webkit-transition: opacity 0.4s ease; -o-transition: opacity 0.4s ease; }\
			.status-1 #lyrics-content-wrapper, .status-1 #lyrics-meta, .status-2 #lyrics-content-wrapper, .status-2 #lyrics-meta { display: none; }\
			#lyrics-form label > span { display: none; } \
			#lyrics-searchterm { width: 100%; padding: 5px 6px; border: none; background: none; } \
			#lyrics-submit { height: 27px; width: 27px; border: 1px solid #ccc; border-radius: 0px 2px 2px 0px; cursor: pointer; background-image: -moz-linear-gradient(top , #fff, #dcdcdc); background-image: -webkit-linear-gradient(top, #fff, #dcdcdc); background-image: -o-linear-gradient(top, #fff, #dcdcdc); color: #555; }\
			#lyrics-submit:hover { box-shadow: 0 1px 2px #bbb, 0 0 3px #fff inset; }\
			#lyrics-submit:active { background-image: -moz-linear-gradient(bottom, #fff, #dcdcdc); background-image: -webkit-linear-gradient(bottom, #fff, #dcdcdc); background-image: -o-linear-gradient(bottom, #fff, #dcdcdc); }\
			#lyrics-submit span { display: inline-block; margin-bottom: 3px; }\
			#lyrics-content-wrapper { position: relative; margin: 8px 2px; height: 334px; overflow: hidden; -moz-transition: opacity 2.0s ease-in; -webkit-transition: opacity 2.0s ease-in; -o-transition: opacity 2.0s ease-in;  }\
			.status-5 #lyrics-content-wrapper, .status-1 #lyrics-content-wrapper, .status-2 #lyrics-content-wrapper ,.status-3 #lyrics-content-wrapper { display: none; }\
			#lyrics-content-wrapper:hover { overflow-y: auto; }\
			#lyrics-loading { display: none; margin-left: -50px; margin-top: -100px; position: absolute; left: 50%; top: 50%; z-index: 99; font-size: 130px; font-family: times new roman, georgia; color: #bbb; cursor: default; -moz-user-select: none; -moz-animation-play-state: stopped; -webkit-user-select: none; -webkit-animation-play-state: stopped; -o-animation-play-state: stopped; }\
			.status-2 #lyrics-loading, .status-3 #lyrics-loading { display: block; -moz-animation-play-state: running; -webkit-animation-play-state: running; -o-animation-play-state: running; } \
			#lyrics-loading span { -moz-animation-name: loading; -moz-animation-duration: 2.2s; -moz-animation-iteration-count: infinite; -moz-animation-direction: normal; -webkit-animation-name: loading; -webkit-animation-duration: 2.2s; -webkit-animation-iteration-count: infinite; -webkit-animation-direction: normal; -o-animation-name: loading; -o-animation-duration: 2.2s; -o-animation-iteration-count: infinite; -o-animation-direction: normal;opacity:1; }\
			#lyrics-loading-1 { -moz-animation-delay: .33s; -webkit-animation-delay: .33s; -o-animation-delay: .33s; } \
			#lyrics-loading-2 { -moz-animation-delay: .77s; -webkit-animation-delay: .77s; -o-animation-delay: .77s; } \
			#lyrics-loading-3 { -moz-animation-delay: .99s; -webkit-animation-delay: .99s; -o-animation-delay: .99s; } \
			@-moz-keyframes loading { 0% {opacity: 0;} 50% {opacity: 1; } 100% {opacity: 0;}}\
			@-webkit-keyframes loading { 0% {opacity: 0;} 50% {opacity: 1; } 100% {opacity: 0;}}\
			@-o-keyframes loading { 0% {opacity: 0;} 50% {opacity: 1; } 100% {opacity: 0;}}\
			#lyrics-status { display: none; font-size: 30px; }\
			.status-5 #lyrics-status { display: block; margin-top: 20px; font-size: 15px; text-align: center; color: #555; } \
			.status-5 #lyrics-status a { font-size: 17px; font-weight: bold; text-decoration: none; color: #555; } \
			#lyrics-title { width: 250px; margin-bottom: 5px; font-size: 12px; color: #555; } \
			#lyrics-content { width: 250px; }\
			#lyrics-content p, #lyrics-content pre { margin-bottom: 8px; font-family: arial, sans-serif; } \
			#lyrics-content img, #lyrics-content a { display: none !important; } \
			#lyrics-meta { opacity: 0; position: absolute; right: 7px; bottom: 3px; left: 7px; -moz-transition: opacity .5s ease; -webkit-transition: opacity .5s ease; -o-transition: opacity .5s ease; }\
			.status-5 #lyrics-meta, .status-1 #lyrics-meta { display: none; }\
			#lyrics-container:hover #lyrics-meta, #lyrics-meta.active { opacity: 1; }\
			#lyrics-page-current { text-decoration: none; color: #333; font-size: 11px; }\
			#lyrics-results-switch { position: absolute; bottom: -2px; right: 5px; }\
			#lyrics-results-prev, #lyrics-results-next { width: 15px; border: none; cursor: pointer; background: none; font-size: 15px; font-family: cursive, sans-serif; color: #555; }\
			#lyrics-results-counter { font-style: normal; font-size: 11px; }\
		</style>\
		<style id="lyrics-site-css"></style>';

	var MUSIC_SITES = [
			{ name: 'YouTube', urls: 'www.youtube.com', init: function() {
				$$('#watch7-sidebar').insertBefore(iframe, $$('#watch7-sidebar').firstChild);
				iframe.addEventListener('load', function() {
					$$.call(root, '#lyrics-searchterm').value = document.querySelector('#eow-title').title;
				}, false);
			}},
			{ name: 'Last.fm', urls: 'www.last.fm|www.lastfm.com', init: function() {
				$$('#rightColumn').insertBefore(iframe, $$('#rightColumn').firstChild);

				RSM.player.onNexttrack_original = RSM.player.onNexttrack;
				RSM.player.onNexttrack = function(ev) {
					$$.call(root, '#lyrics-searchterm').value = ev.creator + ' - ' + ev.name;
					RSM.player.onNexttrack_original(ev);
				}
			}},
			{ name: 'Grooveshark', urls: 'grooveshark.com', init: function() {				
				var toggle_button = makeElement('<button style="float: right; padding: 0 13px; line-height: 30px; font-size: 11px; font-weight: bold; color: #999; text-shadow: 1px 1px #000;">Lyrics &#x266b;</button>');
				
				iframe.setAttribute('style', iframe.getAttribute('style') + 
				'display: none; position: absolute; z-index: 9999; bottom: 0px; left: 0px; background-color: #f2f2f2; border: 1px solid #ddd; border-width: 1px 1px 0px 0px; box-shadow: 0px 0px 10px #ddd; ');
				
				toggle_button.addEventListener('click', function() {
					iframe.style.display = iframe.style.display == 'none' ? 'block' : 'none';
				}, false);
				
				$.subscribe("gs.player.nowplaying", function(ev){
					$$.call(root, '#lyrics-searchterm').value = ev.ArtistName + ' - ' + ev.SongName;
				});
				
				$$('#page_wrapper').appendChild(iframe);
				$$('#playerDetails').insertBefore(toggle_button, $$('#player_queue_resize'));
			}},
	];
	
	var LYRICS_SITES = [
		{id: 0, title: 'Lyric Wiki', url: 'http://lyrics.wikia.com/', xpath: '//div[@class=\'lyricbox\']//p', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/^(.*)Lyrics - Lyric Wiki.*/, function() {
					if(arguments[1].match(/[:]/g).length == 1) {
						return arguments[1].replace(/[:]/, ' - '); 
					} else {
						return arguments[1];
					}
				});
				
				return obj;
			}	
		},
		{id: 1, title: 'SongMeanings', url: 'http://www.songmeanings.net/songs/view', xpath: '//div[@id=\'lyricsblock2\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/^(.*) Lyric Meaning - (.*) Meanings$/, function() {
					return arguments[2] + ' - ' + arguments[1];
				});
				
				return obj;
			}	
		},
		{id: 2, title: 'magistrix', url: 'http://www.magistrix.de', xpath: '//div[@id=\'songtext\']//p', charset: 'iso-8859-1', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/Songtext:\s|\sLyrics$/g, '');
				
				return obj;
			}
		},
		{id: 3, title: 'metrolyrics', url: 'http://www.metrolyrics.com', xpath: '//div[@id=\'lyrics-body\']//*[self::span or self::br]', charset: 'iso-8859-1', 
			postProcess: function(obj) {
				this.css = '#lyrics-content span { display: block; line-height: 1.3; }';
				obj.title = obj.title.replace(/LYRICS$/, '');
				obj.lyrics = obj.lyrics.replace(/\[ From: http:.*\]/, '');
								
				return obj;
			} 
		},
		{id: 4, title: 'AZLyrics', url: 'http://www.azlyrics.com/lyrics/', xpath: '//div[@style=\'margin-left:10px;margin-right:10px;\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				this.css = '#lyrics-content em { display: block; }';
				obj.title = obj.title.replace(/LYRICS -/, '-');
												
				return obj;
			} 
		},
		{id: 5, title: 'LyricsBox', url: 'http://www.lyricsbox.com/', xpath: '//div[@style=\'font:12px arial\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/(Songtexte|Lyrics|Sangtekst|Letras|Paroles|Lirica|Songteksten|Texter) -/, '-');
												
				return obj;
			} 
		},
		{id: 6, title: 'eLyrics', url: 'http://www.elyrics.net/read/', xpath: '//div[@class=\'ly\']/p', charset: 'iso-8859-1', 
			postProcess: function(obj) {
				obj.lyrics = obj.lyrics.replace(/(\[|\{|\().*From.*(\]|\}|\))/, '');	

				obj.title = obj.title.replace(/^(.*) Lyrics - (.*)$/, function() {
					return arguments[2] + ' - ' + arguments[1];
				});

				return obj;
			} 
		},
		{id: 7, title: 'LyricsMania', url: 'http://www.lyricsmania.com/', xpath: '//div[@id=\'songlyrics_h\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/Lyrics$/, '');
				return obj;
			} 
		},
		{id: 8, title: 'LyricsFreak', url: 'http://www.lyricsfreak.com/', xpath: '//div[@id=\'content_h\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				var div_temp = makeElement(obj.lyrics);
				div_temp.removeChild(div_temp.querySelector('.b-lyrics-from-signature'));
				obj.lyrics = div_temp.innerHTML;
				
				obj.title = obj.title.replace(/^(.*) Lyrics - (.*)$/, function() {
					return arguments[2] + ' - ' + arguments[1];
				});
				return obj;
			} 
		},
		{id: 9, title: 'LetsSingIt', url: 'http://artists.letssingit.com/', xpath: '//div[@id=\'lyrics\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/Lyrics$/, '');
				return obj;
			} 
		},
		{id: 10, title: 'Lyrics.com', url: 'http://www.lyrics.com/', xpath: '//div[@id=\'lyric_space\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/Lyrics$/, '');
				return obj;
			} 
		},
		{id: 11, title: 'Lyricsmode', url: 'http://www.lyricsmode.com/', xpath: '//div[@id=\'songlyrics_h\']/*', charset: 'iso-8859-1', 
			postProcess: function(obj) {
				var div_temp = makeElement(obj.lyrics);
				div_temp.removeChild(div_temp.querySelector('.b-lyrics-from-signature'));
				obj.lyrics = div_temp.innerHTML;
				
				obj.title = obj.title.replace(/Lyrics$/, '');
				return obj;
			} 
		},
		{id: 12, title: 'Songlyrics.com', url: 'http://www.songlyrics.com/', xpath: '//p[@id=\'songLyricsDiv\']/node()', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/LYRICS$/, '');
				return obj;
			} 
		},
		{id: 13, title: 'InstaLyrics', url: 'http://instalyrics.com/', xpath: '//div[@id=\'lyrics-body\']/pre', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/lyrics$/, '');
				return obj;
			} 
		},
		{id: 14, title: 'Songtexte.com', url: 'http://www.songtexte.com/songtexte', xpath: '//div[@id=\'lyrics\']/*', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/^Songtext von /, '').replace(/ Lyrics$/, '');
				return obj;
			} 
		},
		{id: 15, title: 'sing365', url: 'http://www.sing365.com/music/lyric.nsf', xpath: '//div[@class=\'content_1\']/p[1]', charset: 'utf-8', 
			postProcess: function(obj) {
				obj.title = obj.title.replace(/^(.*) LYRICS - (.*)/, function() {
					return arguments[2] + ' - ' + arguments[1];
				});
				
				return obj;
			} 
		},
		{id: 16, title: 'golyr', url: 'http://www.golyr.de/', xpath: '//div[@id=\'lyrics\']/p', charset: 'utf-8',
			postProcess: function(obj) {		
				obj.title = obj.title.replace(/\sSongtext und Lyrics.*/, '');
				
				return obj;
			}
		}
	];

	var SEARCH_PROVIDER = [
		{id: 0, table: 'http://www.datatables.org/google/google.search.xml', alias: 'google.search', urldesc: 'url', querydesc: 'q', resultdesc: 'results' }
	];
		
	var iframe = document.createElement('iframe'),
	root,
	iframe_head,
	iframe_body;

	iframe.id = 'lyrics-frame';
	
	iframe.scrolling = 'no';
	iframe.setAttribute('style', 'height: 35px; border: 0px; overflow: hidden; -moz-transition: height .8s ease-in; -webkit-transition: height .8s ease-in; -o-transition: height .8s ease-in;');

	var lyrics_URLS = [],
	    lyrics = [],
	    lyrics_CURRENT = undefined,
	    timer = undefined,
	    requests = [];

	var setHandler = function() {
		root.document.querySelector('#lyrics-form').addEventListener('submit', function(ev) {
			var searchTerm = root.document.querySelector('#lyrics-searchterm').value;
			
			ev.preventDefault();
			
			if(searchTerm) {
				var app_status = getApplicationStatus();
				if(app_status != 4) {
					setApplicationStatus(2);
				} else {
					setApplicationStatus(3);
				}
				
				$$.call(root, '#lyrics-searchterm').blur();
				iframe.focus();
				
				root.send_getLyricsUrls(searchTerm);
			} 
		}, false);
		
		root.document.querySelector('#lyrics-container').addEventListener('mouseover', function(ev) {
			iframe.focus();
		}, false);
		
		root.document.querySelector('#lyrics-results-switch').addEventListener('click', function(ev) {
			var target = ev.target;
			if(target.id == 'lyrics-results-next') {
				root.getNextLyrics();
			} else if(target.id == 'lyrics-results-prev') {
				root.getPreviousLyrics();
			}
		}, false);
		root.document.addEventListener('keyup', function(ev) {
			if(ev.target.id == 'lyrics-searchterm') return;
			
			if(ev.keyCode == 37) {
				ev.preventDefault();
				$$.call(root, '#lyrics-meta').className = 'active';
				root.getPreviousLyrics();
				root.hideMetaNav();
			} else if(ev.keyCode == 39) {
				ev.preventDefault();
				$$.call(root, '#lyrics-meta').className = 'active';
				root.getNextLyrics();
				root.hideMetaNav();
			}
		}, false);
		root.document.addEventListener('keypress', function(ev) {
			if(ev.target.id == 'lyrics-searchterm') return;
			if(ev.keyCode == 38) {
				ev.preventDefault();
				$$.call(root, '#lyrics-meta').className = 'active';
				$$.call(root, '#lyrics-content-wrapper').scrollTop -= 10;
				root.hideMetaNav();
			} else if(ev.keyCode == 40) {
				ev.preventDefault();
				$$.call(root, '#lyrics-meta').className = 'active';
				$$.call(root, '#lyrics-content-wrapper').scrollTop += 10;
				root.hideMetaNav();
			}
		}, false);
	}
	var applyTemplate = function() {
		iframe_head.insertAdjacentHTML('afterbegin', STYLES_TEMPLATE);
		iframe_body.insertAdjacentHTML('afterbegin', HTML_TEMPLATE);
	}
	
	var setApplicationStatus = function(status) {
		switch(status) {
			case 1:
				iframe.style.height = '35px';
				break;
			case 2:
				iframe.style.height = '100px';
				break;
			case 3:
				iframe.style.height = '400px';
				break;
			case 4:
				iframe.style.height = '400px';
				break;
			case 5:
				iframe.style.height = '100px';
				var link_google = '<a target="_blank" href="http://www.google.com/search?q=' + root.document.querySelector('#lyrics-searchterm').value + ' lyrics">Google</a>';
				$$.call(root, '#lyrics-status').innerHTML = 'Oops ... nothing found. Maybe try <br>' + link_google + ' ...';
				break;
		}
		$$.call(root, '#lyrics-container').className = 'status-' + status;
	}
		
	var getApplicationStatus = function() {
		return $$.call(root, '#lyrics-container').className.match(/status-([0-9])/)[1];
	}
	
	var registerFunctions = function() {
		root.send_getLyricsUrls = function(search_term) {
			lyrics = [];
			lyrics_URLS = [];
			SEARCH_PROVIDER.forEach(function(provider, i) {
				var query = root.querybuilder_getLyricsUrls(provider, search_term);
				root.sendYQLQuery(query, {cbfunc: 'save_getLyricsUrls'});
			});
		}
		
		root.save_getLyricsUrls = function(data) {
			requests.pop();
			var results = data.query.results,
				result_list;

			if(results) {
				var provider = root.guessProvider(results),
					provider_results = [].concat(results[provider.resultdesc]);
				provider_results.forEach(function(result, i) {
					var url = decodeURIComponent(result[provider.urldesc]);
					if(lyrics_URLS.indexOf(url) == -1) {
						lyrics_URLS.push(url);
						root.send_getLyricsText(url, root.guessLyricsSite(url));
					}

				});
				
			} else if(!requests.length && !lyrics.length) {
				setApplicationStatus(5);
			}
		}
		
		root.send_getLyricsText = function(url, site_conf) {

			var xpath = '//title|' + site_conf.xpath,
			    query = 'SELECT * FROM html WHERE url="'+ url +'" AND xpath="'+ xpath +'"';
			root.sendYQLQuery(query, {format: 'xml', diag: 'true', cbfunc: 'process_getLyricsText'});
		}

		root.process_getLyricsText = function(data) {
			requests.pop();
			var lyrics_url = data.query.diagnostics.url.content || data.query.diagnostics.url[1].content,
				results = data.results;
				if(results.length > 1) {
					var title = results.shift(0),
						title_clean = makeElement.call(root, title).firstChild.nodeValue.trim();
					root.save_getLyricsText({
						site: root.guessLyricsSite(lyrics_url), 
						url: lyrics_url, 
						title: title_clean,
						lyrics: results.join('')
					});
				} else if(!requests.length && !lyrics.length) {
					setApplicationStatus(5);
				}
		}
		
		root.save_getLyricsText = function(lyrics_obj) {
			if('postProcess' in lyrics_obj.site && typeof lyrics_obj.site.postProcess == 'function') {
				lyrics_obj = lyrics_obj.site.postProcess(lyrics_obj);
			}
				
			lyrics.push(lyrics_obj);

			if(lyrics.length == 1) {
				root.hideLoadingScreen();
				setApplicationStatus(4);
				root.updateLyricsView(lyrics[0]);
			} 
			root.updateResultsCount();
		}
		
		root.hideLoadingScreen = function() {
			$$.call(root, '#lyrics-loading').className = '';
		}
		
		root.hideMetaNav = function() {
			root.clearTimeout(timer);
			timer = root.setTimeout(function() {
				$$.call(root, '#lyrics-meta').className = '';
			}, 2000);
		}
		
		root.updateLyricsView = function(lyrics_obj) {
			lyrics_CURRENT = lyrics_obj;
			root.applyProviderCSS(lyrics_obj.site.css || '');
			$$.call(root, '#lyrics-title').innerHTML = lyrics_obj.title;
			$$.call(root, '#lyrics-content').innerHTML = lyrics_obj.lyrics;
			root.updateCurrentProviderView(lyrics_obj.site.title, lyrics_obj.url);
			root.updateResultsCurrentPos(lyrics_obj);
		}
		
		root.getNextLyrics = function() {
			var current_pos = lyrics.indexOf(lyrics_CURRENT) + 1,
				max_pos = lyrics.length;

			if(current_pos < max_pos) {
				$$.call(root, '#lyrics-content-wrapper').scrollTop = 0;
				root.updateLyricsView(lyrics[current_pos]);
			} 
		}
		
		root.getPreviousLyrics = function() {
			var current_pos = lyrics.indexOf(lyrics_CURRENT) + 1;
			if(current_pos > 1) {
				$$.call(root, '#lyrics-content-wrapper').scrollTop = 0;
				root.updateLyricsView(lyrics[current_pos - 2]);
			}	
		}
		
		root.updateCurrentProviderView = function(title, url) {
			var link = $$.call(root, '#lyrics-page-current');
			link.innerHTML = title;
			link.href = url;
		}
		
		root.updateResultsCurrentPos = function(lyrics_obj) {
			var current_pos = lyrics.indexOf(lyrics_obj) + 1;
			$$.call(root, '#lyrics-results-current').innerHTML = current_pos;
		}
		
		root.updateResultsCount = function() {
			if(lyrics.length > 1 && requests.length <= 1) {
				var search_term = $$.call(root, '#lyrics-searchterm').value.toLowerCase().trim();
				lyrics.sort(function(a, b) {
					var title_dist_a = search_term.levenshtein(makeElement(a.title.toLowerCase()).nodeValue.trim()),
						title_dist_b = search_term.levenshtein(makeElement(b.title.toLowerCase()).nodeValue.trim());
					if(title_dist_a > title_dist_b || a.lyrics.length < 300) {
						return 1;
					} else {
						return 0;
					}
				});
			}
			$$.call(root, '#lyrics-results-all').innerHTML = lyrics.length;
		}
		
		root.applyProviderCSS = function(css) {
			$$.call(root, '#lyrics-site-css').innerHTML = css;
		}
		
		root.guessProvider = function(results) {
			for(result in results) {
				for(var i = 0; i < SEARCH_PROVIDER.length; i++) {
					if(result === SEARCH_PROVIDER[i].resultdesc) {
						return SEARCH_PROVIDER[i];
					}
				}
			}
		}
		root.guessLyricsSite = function(url) {
			for(var i = 0; i < LYRICS_SITES.length; i++) {
				if(url.indexOf(LYRICS_SITES[i].url) != -1) {
					return LYRICS_SITES[i];
				}
			}
		}
		
		root.querybuilder_getLyricsUrls = function(provider, search_term) {
			var query = 'USE "'+ provider.table +'" AS '+ provider.alias +'; SELECT '+ provider.urldesc +' FROM '+ provider.alias +'(1) WHERE';
				
			LYRICS_SITES.forEach(function(lyrics_site, i) {
				query += ' '+ provider.querydesc +'="'+ search_term +' lyrics site:'+ lyrics_site.url +'"';
				query += i < LYRICS_SITES.length - 1 ? ' OR' : '';
			});
			
			return query;
		}
		
		root.sendYQLQuery = function(query, conf) {
			var format = conf.format || 'json',
				diag = conf.diag || 'false',
				cbfunc = conf.cbfunc || 'console.log',
				script = root.document.createElement('script'),
				source = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + '&format='+ format +'&diagnostics='+ diag +'&callback=' + cbfunc;
					
			script.src = source;
			requests.push(true);
			
			iframe_head.appendChild(script);
		}
		
	}
	
	function $$(sel) {
		return this.document.querySelector(sel);
	}
	
	function makeElement(html) {
		var elem = document.createElement('div');
			elem.innerHTML = html;
			
		return elem.firstChild;
	}
	
	String.prototype.levenshtein = function(s2) {
		var i, j, c1, c2, cost, v0, v1, v_tmp, b, c, min, split, 
			s1 = this + '',
			L1 = s1.length,
			L2 = s2.length;

		if (L1 === 0) {
		  return L2;
		} else if (L2 === 0) {
		  return L1;
		} else if (s1 === s2) {
		  return 0;
		}

		s1 = s1.split('');
		s2 = s2.split('');

		v0 = new Array(L1 + 1);
		v1 = new Array(L1 + 1);

		for (i = 0; i < L1 + 1; i++) {
		  v0[i] = i;
		}

		for (j = 1; j <= L2; j++) {
		  v1[0] = j;
		  c2 = s2[j - 1];
		  for (i = 0; i < L1; i++) {
			c1 = s1[i];
			if(c1 === c2) {
				cost = 0;
			} else {
				cost = 1
			}
			min = v0[i + 1] + 1;
			b = v1[i] + 1;
			c = v0[i] + cost;
			if (b < min) {
			  min = b;
			}
			if (c < min) {
			  min = c;
			}
			v1[i + 1] = min;
		  }
		  v_tmp = v0;
		  v0 = v1;
		  v1 = v_tmp;

		}
		return v0[L1];
	};
	
	iframe.addEventListener('load', function() {
		root = this.contentWindow;
		iframe_head = this.contentDocument.head;
		iframe_body = this.contentDocument.body;
		
		applyTemplate();
		setHandler();
		registerFunctions();
		
	}, false);
	
	window.addEventListener('load', function() {
		MUSIC_SITES.forEach(function(site) {
			if(location.host.match(site.urls)) {
				site.init();
			}
		});
	}, false);
}

// insert and execute
var lyrics_script = document.createElement('script');
lyrics_script.textContent = '(' + LyricsInsert + ')(window);';
document.body.appendChild(lyrics_script);