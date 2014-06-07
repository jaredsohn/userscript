// ==UserScript== 
// @author 	   PRUEBA
// @name           Prueba Grooveshark
// @version 	   1.462.2
// @description    Adds lyrics, hidden advertisements and adds tab titles to grooveshark
// @namespace      Prueba Grooveshark
// @include        http://*grooveshark.com*
// ==/UserScript==

var BetterGSInsert = function($, window, undefined) {
			BetterGS = {};
			BetterGS.version = '1.462.2';
			BetterGS.init = function() {
			//BetterGS.hideAds.init();
			BetterGS.lyrics.init();
			
				// $.subscribe("gs.player.nowplaying", function(){
					// if(store.get('BetterGS').tabtitle) {
						// BetterGS.tabtitle.init();
					// }
					// if(store.get('BetterGS').lyrics) {
						// BetterGS.lyrics.fillInputs();	
					// }
					// if(store.get('BetterGS').autosearch) {
						// BetterGS.lyrics.searchForResults();
					// }
				// });
			};
			
			
			/**
			 * Only hides the ads
			 */
			BetterGS.hideAds = {};
			BetterGS.hideAds.version = '1.0';
			BetterGS.hideAds.init = function() {
				var styles = '<style> #capital { display: none !important; } #application { margin-right: 0px !important; } </style>';
				$('head').append($(styles));
			};
			
			
			/**
			 * Shows aggregated lyrics
			 */
			BetterGS.lyrics = {};
			BetterGS.lyrics.version = '1.1';
			
			BetterGS.lyrics.init = function() {
				BetterGS.lyrics.setTemplate();
				BetterGS.lyrics.handleClicks();
				$(window).bind('resize', function() {
					BetterGS.lyrics.setContainerPos();
				});
			};
			BetterGS.lyrics.styles = 
				'<style>' +
				'#BetterGS-wrap { float: right; width: 300px; background-color: #2b2b2b; position: relative; }' +
				'#BetterGS-content { padding: 9px 9px 9px 20px; }' +
				'#BetterGS-head { width: 115px; padding: 4px; font-size: 13px; font-weight: bold; line-height: 1.3; }' +
				'#BetterGS-head a { color: #fff; }' +
				'.BetterGS-head.BetterGS-row { -moz-border-radius: 3px; -webkit-border-radius: 3px; background: -moz-linear-gradient(#111,#333); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #111),color-stop(1, #333)); margin-top: 0px; }' +
				'.BetterGS-row { margin: 10px 0px; position: relative; }' +
				'.BetterGS-row:after { content: "."; display: block; height: 0px; clear: both; visibility: hidden; }' +
				'.BetterGS-row label, .BetterGS-row input, .BetterGS-row strong { width: 100%; display: block; }' +
				'.BetterGS-row strong, .BetterGS-row label { margin-bottom: 3px; font-weight: bold; font-size: 11px; }' +
				'.BetterGS-row input { width: 93%; padding: 3px; background: -moz-linear-gradient(#fff, #ddd); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #fff),color-stop(1, #ddd)); border: 1px solid #d1d2d3; }' +
				'.BetterGS-50p { width: 49%; }' +
				'.BetterGS-drop { border: 1px solid #d1d2d3; position: relative; }' +
				'.BetterGS-drop li a { display: block; padding: 6px; background: -moz-linear-gradient(#fff, #efefef); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #fff),color-stop(1, #efefef)); font-size: 11px; font-weight: bold; color: #333; }' +
				'.BetterGS-drop li a:active { background: -moz-linear-gradient(#fff, #ddd); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #fff),color-stop(1, #ddd)); }' +
				'.BetterGS-drop ul { position: absolute; top: 24px; left: -1px; z-index: 10; width: 100%; border: 1px solid #d1d2d3; border-top: 0px; }' +
				'.BetterGS-toggler, .BetterGS-toggler:active { width: 28px; height: 20px; position: absolute; right: 1px; top: 2px; color: #444; font-size: 10px; font-weight: bold; border-left: 1px solid #dedede; }' +
				'#BetterGS-lyrics { padding: 10px; background-color: #f4f4f4; color: #444; overflow-y: auto; }' +
				'#BetterGS-lyrics p { line-height: 1.2; }' +
				'#BetterGS-startsearch { position: absolute; right: 0px; top: 0px; border: 1px solid #777; background: -moz-linear-gradient(#fff, #ccc); -moz-border-radius: 2px; background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #fff),color-stop(1, #ccc)); -webkit-border-radius: 2px; color: #000; padding: 6px 10px; font-size: 10px; font-weight: bold; }' +
				'#BetterGS-startsearch:active { background: -moz-linear-gradient(#fff, #aaa); background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #fff),color-stop(1, #aaa)); }' +
				'#BetterGS-resizer { position: absolute; left: 0px; top: 0px; z-index: 99; width: 15px; height: 100%; padding-left: 4px; cursor: pointer; display: table; }' +
				'#BetterGS-resizer span { display: table-cell; vertical-align: middle; font-size: 10px; }' +
				'</style>';
				
			BetterGS.lyrics.template = 
				'<div id="BetterGS-wrap">' +
					'<div id="BetterGS-resizer"><span id="BetterGS-resizer-target">&#9654;</span></div>' +
					'<div id="BetterGS-content">' +
						'<div id="BetterGS-interact">' +
							'<div class="BetterGS-row BetterGS-head">' +
								'<a id="BetterGS-startsearch" href="#">Search ...</a>' +
								'<h3 id="BetterGS-head"><a target="_blank" href="http://userscripts.org/scripts/show/115930">BetterGS Lyrics</a></h3>' +
							'</div>' +
							'<div class="BetterGS-row">' +
								'<strong id="BetterGS-sites-label">Listas de reproducción ...</strong>' +
							'</div>' +
							'<div class="BetterGS-row">' +
								'<strong id="BetterGS-results-label">No Results</strong>' +
							'</div>' +
						'</div>' +
						'<div id="BetterGS-lyrics">' +
							'No lyrics found.' +
						'</div>' +
					'</div>' +
				'</div>';
				
			BetterGS.lyrics.results = [];
			BetterGS.lyrics.curLyricSite = 0;
			BetterGS.lyrics.curLyrics = 0;
			BetterGS.lyrics.lyricSites = [
				{'id': 0, 'title': 'Lyric Wiki', 'url' : 'http://lyrics.wikia.com/', 'xpath' : '//div[@class=\'lyricbox\']//p', 'exclude' : false, 'charset' : 'utf-8' },
				{'id': 1, 'title': 'golyr', 'url' : 'http://golyr.de/', 'xpath' : '//div[1]/div[3]//div[2]//table//div[2]//p', 'exclude' : 'a', 'charset' : 'iso-8859-1' },
				{'id': 2, 'title': 'Astraweb Lyrics', 'url' : 'http://lyrics.astraweb.com/display/', 'xpath' : '//table[3]//td[3]//font', 'exclude' : false, 'charset' : 'iso-8859-1' }
			];
			
			BetterGS.lyrics.setTemplate = function() {
				$('head').append($(BetterGS.lyrics.styles));
				$('#mainContainer').parent().prepend($(BetterGS.lyrics.template));
				BetterGS.lyrics.buildSitesMenu();
			};
			BetterGS.lyrics.setContainerPos = function() {
				$('#BetterGS-wrap').height($(window).height());
				$('#BetterGS-lyrics').height( ($('#BetterGS-wrap').height() - $('#BetterGS-interact').height() - 60) )
				$('#mainContainer').css({
					'margin-right' : $('#BetterGS-wrap').outerWidth() + 'px',
					'width' : ( $(window).width() - $('#BetterGS-wrap').outerWidth()) + 'px'
				});
			};
			BetterGS.lyrics.toggleButton = function() {
				return '<button href="#" class="BetterGS-toggler">&#9660;</button>';
			};
			
			BetterGS.lyrics.buildSitesMenu = function(current){
				var cur = current || 0,
					sites = BetterGS.lyrics.lyricSites, 
					html = '',
					curHtml = '',
					othersHtml = '';
				
				BetterGS.lyrics.curLyricSite = cur;
				for(var data in sites) {
					if(sites[data].id === cur) {
						curHtml += '<li><a id="BetterGS-curr-site" data-bgs-siteid="'+ sites[data].id +'" href="'+ sites[data].url +'">'+ sites[data].title +'</a>';
					} 
					else {
						othersHtml += '<li><a data-bgs-siteid="'+ sites[data].id +'" href="'+ sites[data].url +'">'+ sites[data].title +'</a></li>';		
					}
				}

				html += '<ul id="BetterGS-sites" class="BetterGS-drop">' + curHtml + BetterGS.lyrics.toggleButton() + '<ul style="display: none;">' + othersHtml + '</ul></li></ul>';
				$('#BetterGS-sites').remove();
				$('#BetterGS-sites-label').parent().append(html);
				if($.trim( $('#BetterGS-artist').val() ) || $.trim( $('#BetterGS-song').val() )) {
					BetterGS.lyrics.searchForResults();	
				}
			};
			BetterGS.lyrics.getCurrentSiteDefs = function() {
				var id = BetterGS.lyrics.curLyricSite,
					sites = BetterGS.lyrics.lyricSites;
				for(var prop in sites) {
					if(sites[prop].id == id) {
						return sites[prop];
						break;
					}
				}
				// default
				return sites[0];
			};
			
			
			BetterGS.lyrics.resultsQuery = function() {
				var song = $.trim( $('#BetterGS-song').val() ) || 'Never Gonna Give You Up',
					artist = $.trim( $('#BetterGS-artist').val() ) || 'Rick Astley',
					site = BetterGS.lyrics.getCurrentSiteDefs();

					return 'USE \'http://www.datatables.org/google/google.search.xml\' AS google.search; ' + 
							'SELECT unescapedUrl, titleNoFormatting FROM google.search ' +
							'WHERE q="'+ artist +' '+ song +' site:'+ site.url +'";';			
			};
			BetterGS.lyrics.searchForResults = function() {
				BetterGS.lyrics.AJAXindicator();
				$.ajax({
					'url' : 'http://liboicl.netai.net/bettergs/?format=json',
					'data' : {'q': BetterGS.lyrics.resultsQuery() },
					'dataType' : 'jsonp',
					'jsonp' : 'callback',
					'jsonpCallback' : 'BetterGS.lyrics.processResults'
				});
			};
			BetterGS.lyrics.processResults = function(res) {
				var query = res.query,
					results = query.results;
					
				clearTimeout(BetterGS.lyrics.AJAXindicatorHandle);
				$('#BetterGS-lyrics').html('');
				$('#BetterGS-results-label').text(query.count  + ' results.');
				
				if(query.count < 1) {
					$('#BetterGS-results').remove();
					return;
				}
				
				BetterGS.lyrics.results = results.results.length ? results.results : [results.results];
				
				for(var i = 0; i < query.count; i++) {
					BetterGS.lyrics.results[i].id = i;
				}
								
				BetterGS.lyrics.buildResultsMenu();
			};		
			BetterGS.lyrics.buildResultsMenu = function(current) {
				var cur = current || 0,
					results = BetterGS.lyrics.results,
					html = '',
					curHtml = '',
					othersHtml = '';	
				for(var i = 0; i < results.length; i++) {
					if(i == cur) {
						curHtml += '<li><a data-bgs-resultid="'+ results[i].id +'" title="'+ results[i].titleNoFormatting +'" id="BetterGS-curr-result" href="'+ results[i].unescapedUrl +'">'+ results[i].titleNoFormatting.substr(0, 30) +' ...</a>'
					}
					else {
						othersHtml += '<li><a data-bgs-resultid="'+ results[i].id +'" title="'+ results[i].titleNoFormatting +'" href="'+ results[i].unescapedUrl +'">'+ results[i].titleNoFormatting.substr(0, 30) +' ...</a></li>'
					}
				}
				html += '<ul class="BetterGS-drop" id="BetterGS-results">' + curHtml + BetterGS.lyrics.toggleButton() + '<ul style="display: none;">' + othersHtml + '</ul></li></ul>';
				$('#BetterGS-results').remove();
				$('#BetterGS-results-label').parent().append($(html));
				BetterGS.lyrics.getLyricsContent(results[cur].unescapedUrl);
			};
			
			BetterGS.lyrics.getLyricsQuery = function(href) {
				return 'SELECT * FROM html WHERE url="' + href + '" AND xpath="'+ BetterGS.lyrics.getCurrentSiteDefs().xpath +'" AND charset="'+ BetterGS.lyrics.getCurrentSiteDefs().charset +'"';
			};		
			BetterGS.lyrics.getLyricsContent = function(href) {
				BetterGS.lyrics.AJAXindicator();
				$.ajax({
					'url' : 'http://query.yahooapis.com/v1/public/yql?format=xml',
					'data' : {'q': BetterGS.lyrics.getLyricsQuery(href) },
					'dataType' : 'jsonp',
					'jsonp' : 'callback',
					'jsonpCallback' : 'BetterGS.lyrics.processLyrics'
				});
			};
			BetterGS.lyrics.processLyrics = function(res) {
				var results = res.results[0];
					BetterGS.curLyrics = results;
					
					clearTimeout(BetterGS.lyrics.AJAXindicatorHandle);

					$('#BetterGS-lyrics').html(results || 'No lyrics found.');
					BetterGS.lyrics.getCurrentSiteDefs().exclude && $('#BetterGS-lyrics').find( BetterGS.lyrics.getCurrentSiteDefs().exclude ).remove();
				
					BetterGS.lyrics.setContainerPos();
			};
			BetterGS.lyrics.AJAXindicator = function() {	
				var i = 0,
					indicator = '';
				
				try { clearTimeout(BetterGS.lyrics.AJAXindicatorHandle); } catch(er) {};
				(function timer() {
					BetterGS.lyrics.AJAXindicatorHandle = window.setTimeout(function(){  
						i = i + 1;
						if(i < 4) {
							indicator += '.';
						}
						else {
							i = 0;
							indicator = '';
						}
						$('#BetterGS-lyrics').html(indicator);
						timer();
					}, 500)
				})();
			};
			BetterGS.lyrics.toggleLyrics = function(that, ev) {
				if($('#BetterGS-wrap').data('oldwidth') == undefined) {
					$('#BetterGS-wrap').data('oldwidth', $(that).width());
				}
				$('#BetterGS-resizer-target').html(function() {
					return $(this).text() == String.fromCharCode('9664') ? '&#9654;' : '&#9664;';
				});
				$('#BetterGS-content').toggle();
				$('#BetterGS-wrap').width(function() {
					return ($(that).width() < $(that).data('oldwidth') ? $(that).data('oldwidth') : $(ev.target).closest('#BetterGS-resizer').outerWidth());
				});
				$(window).resize();
				$(window).resize();
				$(window).resize();
			};
			BetterGS.lyrics.handleClicks = function() {
				$('#BetterGS-wrap').bind('click', function(ev) {
					
					if($(ev.target).attr('href') == 'http://userscripts.org/scripts/show/115930') {
						return true;
					}
								
					if($(ev.target).is('#BetterGS-startsearch')) {
						BetterGS.lyrics.searchForResults();
						return false;
					}
					if($(ev.target).is('.BetterGS-toggler')) {
						$(ev.target).next().toggle();
						return false;
					}
					if($(ev.target).parents('#BetterGS-sites').length && $(ev.target).is('a')) {
						BetterGS.lyrics.buildSitesMenu($(ev.target).data('bgs-siteid'));
						return false;
					}
					if($(ev.target).parents('#BetterGS-results').length && $(ev.target).is('a')) {
						BetterGS.lyrics.buildResultsMenu($(ev.target).data('bgs-resultid'));
						return false;
					}
					if($(ev.target).is('#BetterGS-resizer-target')) {
						BetterGS.lyrics.toggleLyrics(this, ev);
						return false;
					}
				});
			};
			BetterGS.lyrics.fillInputs = function() {
				$('#BetterGS-song').val( GS.player.currentSong.SongName );
				$('#BetterGS-artist').val( GS.player.currentSong.ArtistName );
			};
				BetterGS.init();
		};
		
var script = document.createElement('script');
script.textContent = '(' + BetterGSInsert + ')(jQuery, window);';
document.body.appendChild(script);