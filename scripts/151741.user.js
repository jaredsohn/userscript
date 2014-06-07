// ==UserScript==
// @name        Yahoo Fantastic Football
// @namespace   https://bitbucket.org/rizenb/
// @author      doyougl0w@gmail.com
// @include     *football.fantasysports.yahoo.com*
// @icon	https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/Ficon.png
// @require 	http://code.jquery.com/jquery.min.js
// @require 	https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/jorder-1.2.js
// @require	https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/jquery.sidecontent.js
// @resource	FantasticStyle		https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/fantasticstyle.css
// @resource	RefreshIcon		https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/refresh.png
// @version     .8 Beta
// ==/UserScript==
//#///////////////////////////////////// Notes: ////////////////////////////////////#//
//	 Started preparing the code for some major revisions.
//   When in doubt, Hover over the item in question.
//
//	 Now exists on bitbucket, email me if you'd like to help with this scripts design.
//   Please do give feedback.   doyougl0w@gmail.com
//
//#/////////////////////////////////////////////////////////////////////////////////#//
jQuery.fn.extend({
  live: function( types, data, fn ) {
          if( window.console && console.warn ) {
           //console.warn( "jQuery.live is deprecated. Use jQuery.on instead." );
          }

          jQuery( this.context ).on( types, this.selector, data, fn );
          return this;
        }
});
var hasRun = false;
//# Don't run in frames. #//
if (window.top !== window.self) { return };
//# Get the saved preferences or use Default #//
var prefs = JSON.parse(localStorage.getItem('FantasticPreferences'));
if (!prefs) { 
var prefs = ({
		layout: {
			title: 'These are options that affect menus and page layout. Hover for more info.',
			loadWait: { enabled: false, title: 'Delay the display of the Fantastic Menu until after the link is clicked on each page load.' },
			slimStats: { enabled: true, title: 'This will try to slim down table widths to try and prevent horizontal scrollbars.' },
			superNotes: { enabled: true, title: 'This will resize players notes, append the player\'s game log, and add any enabled feature columns to the note popup.' },
			hideAds: { enabled: true, title: 'Removes the Ad bar and expands the width of the the main viewport.' },
			muBench: { enabled: true, title: 'Displays the bench by default on matchup pages.' },
			rightMenu: { enabled: false, title: 'Alter the Fantasy Flyout Menu on the top right.', stat1: 'GDD', stat2: 'M', ssort: 'W' },
			menuLinks: { enabled: false, title: 'Alter the Fantastic Menu links.', stat1: 'GDD', stat2: 'M', ssort: 'W' },
			weekLinks: { enabled: false, title: 'This will add the custom Tab Links to your team week menus.', stat1: 'GDD', stat2: 'M', ssort: 'W' },
			myTab: { enabled: false, title: 'This will add the custom Tab the My Team link in the header menu.', stat1: 'GDD', stat2: 'M', ssort: 'W' },
			matchupLinks: { enabled: false, title: 'This will change league links in rightMenu and menuLinks to that league\'s current matchup.'}
		},
		fpa: {
			title: 'These will display Fantasy Points Against Ranks when the url contains the value.',
			team: false,
			matchup: false,
			players: false,
			playerswatch: false,
			addplayer: false,
			dropplayer: false,
			proposetrade: false,
			playerSearch: false,
			note: false
		},
		ratings: {
			title: 'These will display Matchup Ratings when the url contains the value.',
			team: false,
			matchup: false,
			players: false,
			playerswatch: false,
			addplayer: false,
			dropplayer: false,
			proposetrade: false,
			playerSearch: false,
			note: false
		},
		targets: {
			title: 'This will display player Target Info when the url contains the value, with extra info on hover.',
			team: false,
			matchup: false,
			players: false,
			playerswatch: false,
			addplayer: false,
			dropplayer: false,
			proposetrade: false,
			playerSearch: false,
			note: false
		},
		display: {
			expanded: false,
			fpa: true,
			ratings: true,
			targets: true,
			layout: true,
			prefs: true,
			teams: false,
			cache: true,
			width: '400px',
			height: '90%'
		},
		updated: {
			fpa: 'unknown',
			ratings: 'unknown',
			targets: 'unknown',
			meta: 'unknown'
		}
	});
};
//# Get the current URL #//
var loc = window.location.toString().split('?');
//# Stash Query String and Set URL to String #//
if (loc.length>1) { 
	var loq = loc[1], loc = loc[0];
} else {
	var loq = '', loc = loc[0];
}
//# Handle Query String and Save Values #//
if (loq) {
	if (loq.search('&') !== -1) {
		var w = loq.split('&');
		var muTeam = [];
		for (var we in w) {
			if (w[we].search('week=') !== -1) {
				muTeam[0] = w[we].split('=')[1];
				var week = muTeam[0];
			}
			if (w[we].search('mid1=') !== -1) {
				muTeam[1] = w[we].split('=')[1];
			}
			if (w[we].search('mid2=') !== -1) {
				muTeam[2] = w[we].split('=')[1];
			}
			if (w[we].search('lid=') !== -1) {
				var currentLeague = w[we].split('=')[1];
				var currentPage = 'front';
			}
			if (w[we].search('stat1=') !== -1) {
				var currentTeamTab = w[we].split('=')[1];
			}
			if (w[we].search('stat2=') !== -1) {
				var currentTeamSubTab = w[we].split('=')[1];
			}
			if (w[we].search('ssort=') !== -1) {
				var currentsSort = w[we].split('=')[1];
			}
			if (w[we].search('tab=') !== -1) {
				var currentMuTab = w[we].split('=')[1];
			}
			if (w[we].search('pos=') !== -1) {
				var playersPos = w[we].split('=')[1];
			}
			if (w[we].search('status=') !== -1) {
				var status = w[we].split('=')[1];
			}

			
		}
		//
		//unsafeWindow.console.log(muTeam);
	} else {
		// var w = loq.split('=');
		// var xoo = eval('var '+w[0]+' = "'+w[1]+'"');
		// unsafeWindow.console.log(tab);
	}
}
if (loc.search('/f1/') !== -1) {
	var current = loc.split('/f1/')[1].split('/');
	//unsafeWindow.console.log(current);
	var currentLeague = current[0].toString();
	if (current[1] && current[1].match(/\d+/)) {
		var currentTeam = current[1].toString();
		if (current[2]) {
			var currentPage = current[2].match(/[A-Za-z]+/).toString().toLowerCase();
		} else {
			var currentPage = 'team';
			//loc = loc+'/team';
		}
	} else {
		if (current[1] && current[1].match(/[A-Za-z]+/)) {
			var currentPage = current[1].toString().toLowerCase();
		} else {
			var currentPage = 'league';
			//loc = loc+'/league';
		}
	}
	// unsafeWindow.console.log(currentLeague);
	// unsafeWindow.console.log(currentTeam);
	// unsafeWindow.console.log(currentPage);
	// unsafeWindow.console.log(loc);
}
//#// Assign Fantastic function to run after page has finished loading completely //#//
window.addEventListener ("load", fantastic, false);
//#//////////////////////////////# Begin File Load #/////////////////////////////////#//
//# Load JQ into the page. (This allows us to use jQuery Deferreds directly. Will likely be improved at some point.)
var head = document.getElementsByTagName('head')[0];
var inline_JQ = document.createElement('script');
inline_JQ.src = 'http://code.jquery.com/jquery.min.js', inline_JQ.type = 'text/javascript';
head.appendChild(inline_JQ);
//# Append CSS #//
var inline_CSS = document.createElement('style');
inline_CSS.type = 'text/css', inline_CSS.innerHTML = GM_getResourceText('FantasticStyle');
head.appendChild(inline_CSS);
// $('head').append('<link rel="stylesheet" href="https://bitbucket.org/rizenb/yahoo-fantastic-football-user-script/raw/0fa0d76c219969f2b99bfc3dc936573d1bb6f98f/fantasticstyle.css" type="text/css" />');
//#   http://code.jquery.com/ui/1.9.2/themes/blitzer/jquery-ui.css   /themes/base
//#   http://code.jquery.com/jquery-1.8.3.js
//#   http://code.jquery.com/ui/1.9.2/jquery-ui.js
//#//////////////////////////////# Begin Functions #////////////////////////////////#//
function fantastic() {
//# Perform Modifications to page after load event has fired #//
	$('li#newstab div.more a:eq(0) ').attr('href', "http://sports.yahoo.com/nfl/morenews/");
	if (prefs.layout.loadWait.enabled == true) {
		startMenu();
		modPage();
	}
}
function getPos(l, lid) {
	return $.Deferred(function( dfd ){
		$.post(l, function(re){
			var pos = {};
			var trs = $(re).find('#matchuptable tr:not(:has(th))');
			if(trs.size()>1) {
				var x = $(re).find('#midselect>option').size()-1;
			} else {
				var x = 0;
			}
			var te = $(re).find('#playermatchupssubnav ul li a:not(:eq(0))');
			var tat = $(te).size()-1;
                        //unsafeWindow.console.log(te);
			te.each(function(){
				if ($(this).text().search('/') !== -1) {
				
				} else {
					if (localStorage.getItem('pointsAgainst-'+lid+'-'+$(this).text())) {
						pos[$(this).text()] = true;
					} else {
						pos[$(this).text()] = false;
					}
				}
				if ($(this).parent().hasClass('last')) {
					dfd.resolve(pos, x);
				}
			});
                        //unsafeWindow.console.log(JSON.stringify(pos) +' || '+x);
		});
	}).promise();
}
function buildCache(force=false) {
	return $.Deferred(function( dfd ){
		var linx = [], pros = []
		var els = $('.Nav-fantasy').first().find('dt');
                //unsafeWindow.console.log(els.size());
		els.each(function() {
			var fi = $(this).find('a').eq(0);
			var se = $(this).next().find('a').eq(0);
			var both = fi.attr('href').replace('http://football.fantasysports.yahoo.com/f1/', '').split('/');
                        if (se.text().length > 0 ) {
                                var leagueName = se.text();
                        } else {
                                var leagueName = 'Unknown';
                        }
                        
			var leagueId = both[0], teamName  = fi.text(), teamId = both[1];
			var ratUrl = 'http://football.fantasysports.yahoo.com/f1/'+leagueId+'/playermatchups';
                        if (leagueName !== 'Unknown') {
                                pros.push($.when(getPos(ratUrl, leagueId)).done(function(pos, x) {
                                       //unsafeWindow.console.log(JSON.stringify({ leagueId: leagueId, teamId: teamId, leagueName: leagueName, teamName: teamName, positions: pos, leagueSize: x}));
                                       linx.push({ leagueId: leagueId, teamId: teamId, leagueName: leagueName, teamName: teamName, positions: pos, leagueSize: x});
                                }));
                        }
			;
		});
		$.when.apply(null, pros).done(function() {
			var lnTxt = JSON.stringify(linx);
			unsafeWindow.console.log(linx);
			dfd.resolve(lnTxt);
		});
	}).promise();
}
function cacheStatus(force=false) {
	return $.Deferred(function( dfd ){
//# Check if Cache Data Exists #//
		if (!localStorage.getItem('cacheMeta') || force==true) {
			$.when(buildCache(true)).done(function(t) {
				localStorage.setItem('cacheMeta', t);
				var cash = JSON.parse(localStorage.getItem('cacheMeta'));
				var d = new Date(), udTime = d.toLocaleString();
				prefs.updated.meta = udTime;
				localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
				// unsafeWindow.console.log('Meta Cache Rebuilt');
				cacheStatusUpdate(cash);
				dfd.resolve(cash);
				//unsafeWindow.console.log(cash);
			});
		} else {
			var cash = JSON.parse(localStorage.getItem('cacheMeta'));
			$('#cacheFpa').attr('title', 'Last Updated: '+prefs.updated.fpa);
			$('#cacheRatings').attr('title', 'Last Updated: '+prefs.updated.ratings);
			$('#cacheTargets').attr('title', 'Last Updated: '+prefs.updated.targets);
			cacheStatusUpdate(cash);
			//unsafeWindow.console.log(cash);
		}
		//unsafeWindow.console.log(cash);
	}).promise();
}
function cacheStatusUpdate(cash) {
	if (localStorage.getItem('playerTargets')) {
		$('#cacheTargets>.cacheStatus').removeClass('some none').addClass('all');
	} else {
		$('#cacheTargets>.cacheStatus').removeClass('some all').addClass('none');
	}
	var fpaCnt = 0, ratingCnt = 0;
	for(var i=0; i<cash.length; i++) {
		if (typeof cash[i].positions !== 'undefined') {
			$.each(cash[i].positions, function(k,v) {
				if (localStorage.getItem('pointsAgainst-'+cash[i].leagueId+'-'+k)) {
					fpaCnt++;
				} else {
					
				}
			});
		}
		if (cash[i].leagueSize !== 0) {
			var j = localStorage.getItem('ratings-'+cash[i].leagueId+'-'+cash[i].teamId);
			if (j && j.length>2) {
				ratingCnt++;
			} else {
				
			}
		} else {
			var si = 0;
		}
	}
	if (fpaCnt==0) {
		$('#cacheFpa>.cacheStatus').removeClass('some all').addClass('none');
	} else {
		$('#cacheFpa>.cacheStatus').removeClass('some none').addClass('all');
	}
	if (ratingCnt==0) {
		if (si == 0) {
			$('#cacheRatings>.cacheStatus').removeClass('none all').addClass('some');
		} else {
			$('#cacheRatings>.cacheStatus').removeClass('some all').addClass('none');
		}
	} else {
		$('#cacheRatings>.cacheStatus').removeClass('some none').addClass('all');
	}
}
function startMenu() {
	$('body').append('<div title="Fantastic" class="fantasticMenu"><fieldset id="cache"><legend title="Refreshing these major caches can be resource intensive, do it only when necessary. Hover for last updated date.">Data Cache</legend><fieldset id="cacheBox"><legend title="These will show you the status of the various data caches and allow you to update them easily.">Cache Status &nbsp;&nbsp;<img src="'+GM_getResourceURL("RefreshIcon")+'" id="cacheRefresh" title="Last Updated: '+prefs.updated.meta+'\n\nThis does NOT refresh each cache, it rebuilds the meta information about your leagues. It should be totally unecessary unless you cleared localStorage, even then it should do this automatically." /></legend><span id="cacheRatings" class="cache" title="Last Updated: '+prefs.updated.ratings+'"><span class="cacheLabel">Ratings</span><span class="cacheStatus some"></span></span><span id="cacheTargets" class="cache" title="Last Updated: '+prefs.updated.targets+'"><span class="cacheLabel">Targets</span><span class="cacheStatus some"></span></span><span id="cacheFpa" class="cache" title="Last Updated: '+prefs.updated.fpa+'"><span class="cacheLabel">FPA</span><span class="cacheStatus some"></span></span></fieldset><div id="cacheBtns" title="This is only necessary if you want to preserve preferences beyond clearing localStorage."><span id="savePrefsAsFile">savePrefsAsFile</span> | <span id="importPrefsFromFile">importPrefsFromFile</span></div></fieldset><fieldset id="prefMenu"><legend title="Settings are saved immediately but will not take effect until the next page load.">Preferences</legend><div id="prefBox"></div></fieldset><br /><div id="infoBox"><a style="float:left;" href="mailto:doyougl0w@gmail.com">Chat & Email Support</a><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="32G8Y8ZXFLZ4E"><input  style="float:right;" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></div></div>');
	
	cacheStatus();
	var prefMenu = '';
	for (var di in prefs) {
		if (di !== 'display' && di !== 'updated') {
			prefMenu = prefMenu+'<fieldset id="'+di+'"><legend title="'+prefs[di].title+'">'+di+'</legend>';
			for (var id in prefs[di]) {
				if (id !== 'title') {
					if (typeof prefs[di][id] == 'object') {
						if (prefs[di][id].enabled == true) {
							prefMenu = prefMenu+'<span class="pref" title="'+prefs[di][id].title+'" id="'+id+'"><span class="prefLabel">'+id+'</span><span class="prefStatus all"></span></span>';
						} else {
							prefMenu = prefMenu+'<span class="pref" title="'+prefs[di][id].title+'" id="'+id+'"><span class="prefLabel">'+id+'</span><span class="prefStatus none"></span></span>';
						}
					} else {
						if (prefs[di][id] == true) {
							prefMenu = prefMenu+'<span class="pref" title="'+prefs[di].title+'" id="'+id+'"><span class="prefLabel">'+id+'</span><span class="prefStatus all"></span></span>';
						} else {
							prefMenu = prefMenu+'<span class="pref" title="'+prefs[di].title+'" id="'+id+'"><span class="prefLabel">'+id+'</span><span class="prefStatus none"></span></span>';
						}
					}
				} else {
					prefMenu = prefMenu+'<span class="pref allToggle" title="Toggle All at Once." id="'+di+'-AllToggle"><span class="prefLabel">All / None</span><span class="prefStatus some"></span></span>';
				}
			}
			prefMenu = prefMenu+'</fieldset>';
		} else {
			for (var id in prefs[di]) {
				var k = prefs[di][id];
				if (k == false) {
					$('#'+di).children(':not(legend)').hide();
				}
			}
		}
	}
	$('#prefBox').html(prefMenu);
	$('.fantasticMenu fieldset').each(function() {
		var it = prefs['display'][$(this).attr('id')];
		if (it == false) {
			$(this).children(':not(legend)').hide();
		} else if (it == true) {
			$(this).children(':not(legend)').show();
		}
	});

	//# STYLE CUSTOMIZATIONS   %config% #//
	$(".fantasticMenu").sidecontent({
		attachto: "leftside",
		width: prefs.display.width,
		opacity: "0.92",
		pulloutpadding: "0"
	}).attr('title', '').fadeIn('fast');
	$(".sidecontent, .sidecontentpullout").css({
		"z-index": "155555",
		"position": "fixed",
		"top": "32px"
	});
	$('.sidecontent').css({'display': 'block', 'height': prefs.display.height});
	//# STYLE CUSTOMIZATIONS   %config-END% #//
}
function modPage() { //# Insert Magick Here #//
	if (hasRun == true) {
		if (window.location.toString().search('playersearch') !== -1) {
			playersPos = '';
		} else {
			var joo = window.location.toString().split('?');
			if (typeof joo[1] !== 'undefined') {
				if (joo[1].search('&') !== -1) {
					var w = joo[1].split('&');
					for (var we in w) {
						if (w[we].search('pos=') !== -1) {
							playersPos = w[we].split('=')[1];
						}
					}
					//playersPos = joo[1].match(/pos=(.*?)&/i)[1];
				}
			}
		}
	}
	switch(currentPage) {
		case '':
			unsafeWindow.console.log('No Current Page.');
		break;
		case 'matchup':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace  #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			if (prefs.layout.muBench.enabled == true) {
				$('#bench-toggle').text('Hide Bench [-]'); //# Show Bench automatically on matchup pages #//
				$('#bench').removeClass('hidden'); //# Show Bench automatically on matchup pages #//
			}
			var where = 'gametime';
		break;
		case 'proposetrade':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			var where = 'opp';
		break;
		case 'pointsagainst':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			//var where = 'opp';
		break;
		case 'team':
			var where = 'gametime';
			unsafeWindow.console.log(currentPage);
		break;
		case 'players':
			var where = 'owner';
		break;
		case 'addplayer':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace  #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			var where = 'gametime';
		break;
		case 'dropplayer':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace  #//
				$('#yspmain,#doc4').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			var where = 'gametime';
		break;
		case 'playerswatch':
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace  #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			var where = 'owner';
		break;
		default:
			if (prefs.layout.hideAds.enabled == true) {
				$('#yspsub').hide(); //# Hide whitespace  #//
				$('#yspmain').css('width', '98%'); //# Stretch to fill whitespace on matchup #//
			}
			//unsafeWindow.console.log(currentPage);
			//unsafeWindow.console.log(prefs);
			var where = 'opp';
		break;
	}
		var currentTables = $('.teamtable'), colspan = 0, errrs = 0, tableHead1 = currentTables.find('.headerRow1');
		var goFpa = $('#cacheFpa>.cacheStatus:eq(0)').hasClass('all'), goRatings = $('#cacheRatings>.cacheStatus:eq(0)').hasClass('all'), goTargets = $('#cacheTargets>.cacheStatus:eq(0)').hasClass('all');
		
		if (prefs.fpa[currentPage] == true && goFpa == true ) {
			colspan++;
			if ($('.fpaHead:eq(0)').size()!==1) {
				tableHead1.find('th.'+where).after('<th class="fpaHead desc stat">FPA</th>');
			}
			var ptsAgainst = {};
		} else {
			if ($('.fpaHead:eq(0)').size() >0) {
				$('.fpaHead:eq(0)').remove();
			}
		}
		if (prefs.ratings[currentPage] == true && goRatings == true ) {
			colspan++;
			if (typeof muTeam === 'undefined') {
				if (typeof currentTeam !== 'undefined')	{
					var muTeam = [];
					muTeam[1] = currentTeam;
					//unsafeWindow.console.log(currentTeam);
				} else {
					if (typeof currentPage !== 'undefined') {
						if (currentPage == 'matchup') {
							var muTeam = [];
							muTeam[0] = $('#matchup-h1>h1').text().split(':')[0].replace('Week ', '');
							var as = $('.matchupheader h2 a');
							var teamInf1 = as.eq(0).attr('href').split('/');
							muTeam[1] = teamInf1[3];
							var league = teamInf1[2];
							var teamInf2 = as.eq(1).attr('href').split('/');
							muTeam[2] = teamInf2[3];	
							//unsafeWindow.console.log(mid1+' | '+mid2+' | '+week);
						} else if (currentPage == 'players') {
							var muTeam = [];
							if (status && status !== 'ALL' && status !== 'A') {
								muTeam[1] = status;
							} else {
								muTeam[1] = 'FA';
							}
						} else {
							var muTeam = [];
							muTeam[1] = 'FA';
							//unsafeWindow.console.log(muTeam);
						}
					}
				}
			} else {
				unsafeWindow.console.log(muTeam);
				var muTeam = [];
				muTeam[1] = 'FA';
			}
			var ratings = {};
			if ($('.ratingsHead:eq(0)').size()!==1) {
				tableHead1.find('th.'+where).after('<th class="ratingsHead desc stat">Ratings</th>');
			}
			
	//$('#matchupheader2').append('<span class="infoMatchup" style="float:right;padding:5px;">'+loc+'</span>');
		} else {
			if ($('.ratingsHead:eq(0)').size() >0) {
				$('.ratingsHead:eq(0)').remove();
			}
		}
		if (prefs.targets[currentPage] == true && goTargets == true ) {
			if (playersPos !== 'QB') {
				colspan++;
				if ($('.targetsHead:eq(0)').size()!==1) {
					tableHead1.find('th.'+where).after('<th class="targetsHead desc stat" title="Hover to see detailed stats">Targets</th>');
				}
				if (localStorage.getItem('playerTargets')) {
					var targetData = JSON.parse(localStorage.getItem('playerTargets'));
					var currentTargetData = jOrder.table(targetData).index('player', ['player'], { grouped: true});
				}
			} else {
				var hideTargets = true;
			}
		} else {
			if ($('.targetsHead:eq(0)').size() >0) {
				$('.targetsHead:eq(0)').remove();
				var hideTargets = true;
			}
		}
		if (colspan>0) {
			if ($('.fanTableHeader:eq(0)').size()!==1) {
				var tableHead0 = currentTables.find('.headerRow0').find('th.'+where).after('<th class="fanTableHeader">Fantastic</th>').next();
			} else {
				var tableHead0 = $('.fanTableHeader:eq(0)');
			}
			$('.fanTableHeader').attr('colspan', colspan);
			currentTables.find('.fanTableHeader, .stat').css({'text-align': 'center'});
			//unsafeWindow.console.log(colspan);
			currentTables.each(function() {
				$(this).find('tr:not(:has(th))').each(function() {
					var op = $(this).find('td.opp:eq(0)');
					var posd = $(this).find('td.pos:eq(0)');
					var nam = $(this).find('a.name').eq(0).attr('href');
					var pl = $(this).find('td.player div.emptyplayer');
					if (op.text() !== ''  && posd.text() !== 'Total' && pl.size() == 0 && op.text() !== 'Bye') {
						var po = $(this).find('td.player div.ysf-player-detail span:eq(0)');
						if (po) {
							po = po.text().split(' - ');
							if (po[1].search(',') !== -1) {
								pos = po[1].split(',')[0]; 	
							} else {
								pos = po[1].replace(')', '');
							}
						}
						//unsafeWindow.console.log(currPts);
						if (prefs.fpa[currentPage] == true && goFpa == true ) {
							if ( typeof ptsAgainst[pos] == 'undefined' ) {
								var currPts = localStorage.getItem('pointsAgainst-'+currentLeague+'-'+pos);
								if (currPts) {
									currPts = JSON.parse(currPts);
									ptsAgainst[pos] = currPts;
								} else {
									//alert('Data Update Needed. '+currPts);
								}
							}
							var currentFpaData = jOrder.table(ptsAgainst[pos]).index('abbr', ['abbr'], { grouped: true});
							var teamAbbr = op.text().replace('@', '').toLowerCase();
							var myPtsAgainstQ = currentFpaData.where([{abbr: teamAbbr}]).filter(function(next) { return next !== undefined; });
							if (myPtsAgainstQ.length !== 0) {
								if ($(this).find('td.ptsAgainst:eq(0)').size()!==1) {
									$(this).find('td.'+where).after('<td class="ptsAgainst stat"> '+myPtsAgainstQ[0].rankImg+'</td>');
								} else {
									$(this).find('td.ptsAgainst:eq(0)').html(myPtsAgainstQ[0].rankImg);
								}
							}
						} else {
							if ($(this).find('td.ptsAgainst:eq(0)').size() >0) {
								$(this).find('td.ptsAgainst:eq(0)').remove();
							}
						}
						
						if (prefs.ratings[currentPage] == true && goRatings == true ) {
							if (muTeam[1] == 'FA' || $(this).parents('.teamtable').attr('id') == 'statTable0') {
							//if ($(this).parents('.teamtable').attr('id') == 'statTable0') {
								//muTeam[1] = FA;
								var currTbl = 1;
							} else {
								if (currentPage == 'matchup') {
									if ($(this).parents('.teamtable').attr('id') == 'statTable1') {
										var currTbl = 1;
									} else if ($(this).parents('.teamtable').attr('id') == 'statTable2') {
										var currTbl = 2;
									}
								} else {
									var currTbl = 1;
								}
							}
							//unsafeWindow.console.log(muTeam);
							if ( typeof ratings[currTbl] === 'undefined' ) {
								//unsafeWindow.console.log(muTeam[currTbl]);
								var currRat = localStorage.getItem('ratings-'+currentLeague+'-'+muTeam[currTbl]);
								if (currRat) {
									//unsafeWindow.console.log(currRat);
									currRat = JSON.parse(currRat);
									ratings[currTbl] = currRat;
									//unsafeWindow.console.log(ratings[currTbl]);
								} else {
									errrs++;
									unsafeWindow.console.log(muTeam[currTbl]);
								}
							}
							var currentRatings = jOrder.table(ratings[currTbl] ).index('yid', ['yid'], { grouped: true});
							var yyid = nam.split('/').pop();
							var ratingsQ = currentRatings.where([{yid: yyid}]).filter(function(next) { return next !== undefined; });
							if (ratingsQ.length !== 0) {
								if ($(this).find('td.ratings:eq(0)').size()!==1) {
									$(this).find('td.'+where).after('<td class="ratings stat"> '+ratingsQ[0].rating+'</td>');
								} else {
									$(this).find('td.ratings:eq(0)').html(ratingsQ[0].rating);
								}
							} else {
								if ($(this).find('td.ratings:eq(0)').size()!==1) {
									$(this).find('td.'+where).after('<td class="ratings stat">&nbsp;</td>');
								} else {
									$(this).find('td.ratings:eq(0)').html('&nbsp;');
								}
							}
							if (errrs !== 0) {
								unsafeWindow.console.log('Ratings Data Update Needed.' +errrs);
							}
						} else {
							if ($(this).find('td.ratings:eq(0)').size() >0) {
								$(this).find('td.ratings:eq(0)').remove();
							}
						}
						if (prefs.targets[currentPage] == true && goTargets == true ) {
							if (playersPos !== 'QB') {
								if (pos == 'WR' || pos == 'RB' || pos == 'TE') {
									var name = $(this).find('a.name:eq(0)').text();
									var b = currentTargetData.where([{player: name}]).filter(function(next) { return next !== undefined; });
									if (b[0] !== undefined) {
										var tip = '';
										for (var x in b[0]) {
											if (x == 'link'||x == 'pos' ||x == 'team' ||x == 'id' ||x == 'kid' ||x == 'player') {
											} else {
												tip += x+': '+b[0][x]+'\n';
											}
										}
										if ($(this).find('td.targets:eq(0)').size()!==1) {
											$(this).find('td.'+where).after('<td class="targets stat" title="'+tip+'">'+b[0]['utilized']+'</td>');
										} else {
											$(this).find('td.targets:eq(0)').html(b[0]['utilized']).attr('title', tip);
										}
									} else {
										if ($(this).find('td.targets:eq(0)').size()!==1) {
											$(this).find('td.'+where).after('<td class="targets skip stat">&nbsp;</td>');
										} else {
											$(this).find('td.targets:eq(0)').html('&nbsp;')
										}
									}
								} else {
									if ($(this).find('td.skip:eq(0)').size()!==1) {
										$(this).find('td.'+where).after('<td class="skip">&nbsp;</td>');
									} else {
										$(this).find('td.skip:eq(0)').html('&nbsp;');
									}
								}
								$('.targets').css('text-align', 'center');
							}
						} else {
							if ($(this).find('td.targets:eq(0), td.skip:eq(0)').size() >0) {
								$(this).find('td.targets:eq(0), td.skip:eq(0)').remove();
							}
						}
					} else {
						for (i=1;i<=colspan;i++) {
							// if ($(this).find('td.skip:eq(0)').size()!==1) {
								$(this).find('td.'+where).after('<td class="skip">&nbsp;</td>');
							// } else {
								// $(this).find('td.skip:eq(0)').html('&nbsp;');
							// }
						}
					}
				});
			});
		} else {
			if ($('.fanTableHeader:eq(0)').size()>0) {
				$('td.targets, td.skip, td.ptsAgainst, td.ratings').remove();
				$('.fanTableHeader:eq(0)').remove();
			}
		}
		if (prefs.layout.slimStats.enabled == true) {
			$('.gametime, .owner, .o-rank, .player').css({'width': '25px', 'overflow': 'hidden'});
			$('td.owner').each(function(){
				var t = $(this), o = t.text(), v = t.find('a:eq(0)');
				t.css({'text-align':'center'});
				if (v.size() ==1) {
					var h = v.attr('href').split('/'), te = v.text();
					v.text(h[h.length-1]).attr('title', te);
				} else {
					if (o.search(' ') !== -1) {
						var it = o.replace('(','').replace(')','').split(' ');
						if (it[0] == 'W' || it[0] == 'FA') {
							$(this).text(it[0]+'*');
							$(this).attr('title', it[1]+it[2]);
						} else {
							
						}
					}
				}
			});
			$('.wide').removeClass('wide');
		}
		
		
	//#  Make sure the tables align correctly  #//
	if (hideTargets == true) {
		$('.skip').remove();
	}
	if($('td.ratings:not(:has(img))').size()==25) {
		$('.ratings').remove();
		$('.ratingsHead').remove();
		var tHe = $('.fanTableHeader:eq(0)');
		tHe.attr('colspan', tHe.attr('colspan')-1);
	}
	$('.ptsAgainst').css('text-align', 'center');
	$('.ratings').css('text-align', 'center');
	$('.targets').css('text-align', 'center');
	hasRun = true;
}


// Fix FPA to either return failure or automatically get last years //

function getFpa(ll) {  // Fix this to either return failure or automatically get last years //

	return $.Deferred(function( dfd ){
		var legs = [];
		for (var i=0; i<ll.length; i++) {
			var l = ll[i].leagueId;
			var po = ll[i].positions;
			$.each(po,function(k,v) {
				legs.push(getFpaByPos(l, k));
			})
		}
		$.when.apply(null, legs).done(function () {
			dfd.resolve()
		});
	}).promise();
}
function getFpaByPos(id, pos) {
	return $.Deferred(function( def ){
		var d = new Date();
		var season = d.getFullYear()-1; 
		var earl = 'http://football.fantasysports.yahoo.com/f1/'+id+'/pointsagainst?season='+season+'&pos='+pos+'&mode=average';
		var abbrs = { 22: 'ari', 1: 'atl', 33: 'bal', 2: 'buf', 29: 'car', 3: 'chi', 4: 'cin', 5: 'cle', 6: 'dal', 7: 'den', 8: 'det', 9: 'gb', 34: 'hou', 11: 'ind', 30: 'jac', 12: 'kc', 15: 'mia', 16: 'min', 17: 'ne', 18: 'no', 19: 'nyg', 20: 'nyj', 13: 'oak', 21: 'phi', 23: 'pit', 24: 'sd', 26: 'sea', 25: 'sf', 14: 'stl', 27: 'tb', 10: 'ten', 28: 'was' };
		var ranks = [];
		$.when($.post(earl, function(f) {
			$(f).find('#statTable0').find('tr:not([class^=headerRow])').each(function() {
				var to = {};
				$(this).find('td:not(.stat)').removeClass('first').removeClass('last').removeClass('sorted').each(function() {
					var ba = $(this).attr('class');
					if (ba == 'team') {
						var bb = $(this).children('a').first().attr('href').split('&');
						var bc = bb.slice(-1)[0].split('=')[1];
						to['ntid'] = bc;
						to['abbr'] = abbrs[bc];
						to['team'] = $(this).text().split(' vs ')[0];
					} else if (ba == 'rank') {
						to['rank'] = $(this).text();
						to['rankImg']  = $(this).html();
					} else {
						to[ba] = $(this).text();
					}
				});
				ranks.push(to);
			});

		})).done(function() {
			localStorage.setItem('pointsAgainst-'+id+'-'+pos, JSON.stringify(ranks));
			def.resolve();
		});
	}).promise();
}
function getRatings(ll) {
	return $.Deferred(function( dfd ){
		var legs = [];
		for (var i=0; i<ll.length; i++) {
			var l = ll[i].leagueId;
			var t = ll[i].leagueSize;
			if (t==0) {
				dfd.reject();
				return false;
			} else {
				for (var o=0; o<=t; o++) {
					if (o==0) {
						legs.push(getRatingsByTeam(l, 'FA'));
					} else {
						legs.push(getRatingsByTeam(l, o));
					}
				}
			}
		}
		$.when.apply(null, legs).fail(function() {
			dfd.reject();
		}).done(function () {
			dfd.resolve()
		});
	}).promise();
}
function getRatingsByTeam(league, teamNum) {
	return $.Deferred(function( deff ){
		var start = "http://football.fantasysports.yahoo.com/f1/"
		if (teamNum == 'FA') {
			var end = "/playermatchups?pos=ALL&tab=";
		} else {
			var end = "/playermatchups?pos=ALL&status=";
		}
		var mUrl = start+league+end+teamNum;
		var rates = [];
		$.when($.post(mUrl, function(f) {
			var trs = $(f).find('#matchuptable tr:not(:has(th))');
			if(trs.size()>1) {
				trs.each(function(){
					var player = $(this).find('a.name:eq(0)');
					var ra = $(this).find('td.rating:eq(0)');
					var com = ra.next().text();
					var yid = player.attr('href').split('/');
					yid = yid[yid.length-1];
					ra.find('img:first').attr('title', com);
					rates.push({"player": player.text(), "yid": yid, "link": player.attr('href'), "rating": ra.html()});
				});
			} else {
				//unsafeWindow.console.log('No Matchup Ratings Yet');
				deff.reject();
			}
		})).fail(function() {
			unsafeWindow.console.log('No Matchup Ratings Yet. '+league+' | '+teamNum);
			//return false;
		}).done(function(aft) {
			localStorage.setItem('ratings-'+league+'-'+teamNum,  JSON.stringify(rates));
			//unsafeWindow.console.log(aft);
			deff.resolve();
		});
	});
}
function getTargets() { //# Modify for Season start and selection #//
	return $.Deferred(function( dfd ){
		var d = new Date();
		var season = d.getFullYear();
		GM_xmlhttpRequest({
		  method: "POST",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  data: "position[1]=RB&position[2]=WR&position[3]=TE&week_end=21&week_start=1&year_end=2012&year_start=2012",
		  url: "http://www.kffl.com/fantasy-football/targets/index.php",
		  onload: function(response) {
			var oy = [];
			var o = 1;
			var poo = ["id","kid","pos","team","thrownto","receptions","rec%","utilized","carries"];
			var stat = $($.parseHTML(response.responseText)).find('table.stats').first();
                        unsafeWindow.console.log(stat);
			stat.find('tr.stats').each(function(a){
				var tds = $(this).find('td');
				var af = {};
				for (var i=0;i<=tds.length;i++) {
					if (typeof poo[i] === 'undefined') {
					} else if (poo[i] == 'id') {
						af[poo[i]] = o.toString();
					} else if (poo[i] == 'kid') {
						var as = tds.eq(i).find('a').first();
						var ln = as.attr('href');
						var kid = ln.match(/[0-9]+/);
						var playername = as.text();
						af[poo[i]] = kid.toString();
						af['player'] = playername;
						af['link'] = ln;
					} else if (poo[i] == 'x') {
					} else {
						af[poo[i]] = tds.eq(i).html();
					}
				}
				var y = o.toString();
				oy.push(af);
				o++;
			});
			localStorage.setItem('playerTargets', JSON.stringify(oy));
			dfd.resolve(oy);
		  }, onerror: function(response) {
				unsafeWindow.console.log(response.responseText);
		  }
		});
	}).promise();
}
function getTargetsWeek(pkid) {  //# TODO: Get player Name, Search Targets, Get KFFL id, XHR-> http://www.kffl.com/player/'+kid+'/nfl/utilization/ return table data in object
	return $.Deferred(function( dfd ){
		var d = new Date();
		var season = d.getFullYear();
		GM_xmlhttpRequest({
		  method: "POST",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  data: "position[1]=RB&position[2]=WR&position[3]=TE&week_end=21&week_start=1&year_end="+season+"&year_start="+season+"&display_mode=week_by_week",
		  url: "http://www.kffl.com/fantasy-football/targets/index.php",
		  onload: function(response) {
			var oy = [];
			var o = 1;
			var poo = ["id","kid","pos","team","thrownto","receptions","rec%","utilized","carries"];
			var stat = $(response.responseText).find('table.stats').first();
			stat.find('tr.stats').each(function(a){
				var tds = $(this).find('td');
				var af = {};
				for (var i=0;i<=tds.length;i++) {
					if (typeof poo[i] === 'undefined') {
					} else if (poo[i] == 'id') {
						af[poo[i]] = o.toString();
					} else if (poo[i] == 'kid') {
						var as = tds.eq(i).find('a').first();
						var ln = as.attr('href');
						var kid = ln.match(/[0-9]+/);
						var playername = as.text();
						af[poo[i]] = kid.toString();
						af['player'] = playername;
						af['link'] = ln;
					} else if (poo[i] == 'x') {
					} else {
						af[poo[i]] = tds.eq(i).html();
					}
				}
				var y = o.toString();
				oy.push(af);
				o++;
			});
			localStorage.setItem('playerTargets', JSON.stringify(oy));
			dfd.resolve(oy);
		  }, onerror: function(response) {
				unsafeWindow.console.log(response.responseText);
		  }
		});
	}).promise();
}
function checkNote(t, doAct, pos) {  //# TODO: Refactor, Add Targets By Week Data
	var pdiv = $('div.playerinfo a.name[href*="'+t+'"]');
	if (pdiv.size()>0) {
		window.clearInterval(doAct);
		if (prefs.fpa.note == true) {
			if (pos !== 'DEF') {
				var league = loc.split('/')[4];
				//unsafeWindow.console.log(league);
				var pa = pdiv.parents('.yui3-widget:eq(0)');
				var p = pa.find('.teamtable:eq(1)');
				var topp = pa.find('.teamsched:eq(0)');
				var currPos = 'pointsAgainst-'+league+'-'+pos;
				var currPts = localStorage.getItem(currPos);
				if (currPts) {
					pa.find('.yui3-widget-hd:eq(0)').css({'background-color': '#282828', 'height': '23px'}).parent().css({'width': '660px'}).find('h5').css({'vertical-align': 'middle'});
					pa.find('.yui3-ysplayernote-indicator:eq(0)').hide();
					var pep = pa.find('.yui3-widget-ft:eq(0)');
					if (pep.data('gamelog')) {
						pep.html(pep.data('gamelog'));
						$('.teamsched:eq(0)').html('').addClass('notebox').removeClass('teamsched');
					} else {
							var pUrl = pdiv.attr('href')+'/gamelog';
						GM_xmlhttpRequest({
							method: "GET",
							url: pUrl,
							onload: function(r) {
								var tab = $(r.responseText).find('div.bd > table');
                                                                unsafeWindow.console.log(tab);
								if (tab.size() >1) {
                                                                      var tib = $(tab[1]);
                                                                } else {
                                                                      var tib = $(tab[0]);
                                                                }
                                                                
								pep.html(topp.find('.teamtable:eq(0)').parent().html());
								var dat = JSON.parse(currPts);
								var myPtsAgainstData = jOrder.table(dat).index('abbr', ['abbr'], { grouped: true});
								var ths = tib.find('tr:eq(1)').find('th:gt(3)');
								pep.find('tr:eq(0) th:eq(1)').addClass('ptsHd').removeClass('date').html('Pts #');
								pep.find('tr:eq(0) th:eq(3)').after(ths);

								// pep.find('thead>tr').css({ 'position': 'relative'});
								// var poo = pep.find('table:eq(0)');
								// var tb = poo.clone();
								// pep.append(tb);
								// tb.find('thead').remove();
								// poo.find('tbody').remove();
								// //pep.parent().pref().find('div:eq(0)').after(poo);
								// pep.css({'overflow': 'hidden'});
								// pep.find('table:eq(0)').css({'position': 'relative', 'top': 0});
								// pep.find('table:eq(1)').css({'overflow': 'auto'});
								pep.find('tr:not(:has(th))').each(function(){
									var opp = $(this).find('td:eq(2)');
									var into = $(this).find('td:eq(1)');
									var eeque = $(this).index();
									var toes = tib.find('tr:not(:has(th))').css({'display':'block'}).filter(':not(:contains(bye))').eq(eeque);
									var tds = toes.find('td:gt(3)');
									$(this).find('td.status').after(tds);
									var teamAbbr = opp.text().replace('@', '').toLowerCase();
									if (teamAbbr !== '' || teamAbbr !== 'Bye') {
										var myPtsAgainstQ = myPtsAgainstData.where([{abbr: teamAbbr}]).filter(function(next) { return next !== undefined; });
										if (myPtsAgainstQ.length !== 0) {
											into.html(myPtsAgainstQ[0].rankImg);
										} else {
											unsafeWindow.console.log(teamAbbr);
											//unsafeWindow.console.log(dat);
										}
									}
								});
								pep.find('th, td').css({'text-align': 'center'});
								pep.css({'overflow': 'auto', 'height': '150px'}).find('table').addClass('teamtable').css('width', '630px');
								pep.data('gamelog', pep.html());
								//pa.find('.playernote:eq(0)').
								$('.teamsched:eq(0)').html('').removeClass('teamsched').addClass('noteBox');
								var toL = pa.find('.noteBox:eq(0)').append(pa.find('div.playernotes-bd').children('p:eq(0), p:eq(1), div:eq(0)')).css({'overflow': 'auto'});
								pa.find('.noteBox>p:eq(0)>strong').css({'display': 'inline'});
								pa.find('.yui3-widget-hd').css({'border-top-right-radius':'10px'}).parent().css({'border-top-right-radius':'10px'}).find('.second').css({'padding':'3px'});
							}
						});
					}
				} else {
					unsafeWindow.console.log('Data Update Needed. '+currPos);
				}
				//$('div.teamsched:eq(0)').prependTo('.yui3-widget-ft:eq(0)');
			}
		}
	}
}
function checkRef(act, pid) {
	var pido = $('div.players:eq(0)').attr('id');
	//unsafeWindow.console.log(pid +' | '+pido);
	if (pid !== pido) {
		// unsafeWindow.console.log(pido);
		window.clearInterval(act);
		$( "table > thead > tr" ).delegate('th a',"click", function(e){
			var pid = $('div.players:eq(0)').attr('id');
			// unsafeWindow.console.log(pid);
			var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
		});
		$( ".pagingnavlist" ).delegate('li a',"click", function(e){
			var pid = $('div.players:eq(0)').attr('id');
			// unsafeWindow.console.log(pid);
			var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
		});

		$('#playerfilter a, .playersearchbox a.ysf-cta, div.yui3-ysfplayersearch-content li').live('click', function(e) {
			var pid = $('div.players:eq(0)').attr('id');
			// unsafeWindow.console.log(pid);
			var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
		});
		
		modPage();
	}
}
//#/////////////////////////////# Begin Page Mods #////////////////////////////////#//
$('#yspteammh span:first()').before('<span id="fantasticBtn" title="Thanks for using Fantastic.  Click here to Toggle Fantastic Menu.">Fantastic</span>&nbsp;-&nbsp;').after('&nbsp;-&nbsp;<span id="modRefresh"><img src="'+GM_getResourceURL("RefreshIcon")+'" /></span>').next().attr('title', 'This will do a soft refresh of all page modifications. Useful after yahoo modifies the tables dynamically, like in player searches. It tries to do this automatically, but if it fails, hit this and it should fix.');
$('img[src*="RefreshIcon"]').css({'vertical-align': 'middle', 'cursor': 'pointer'});

if (prefs.layout.loadWait.enabled == false) {
	startMenu();
	modPage();
} else {
	//modPage();
}


var tabs = {};
tabs.menuLinks = prefs.layout.menuLinks, tabs.rightMenu = prefs.layout.rightMenu, tabs.myTab = prefs.layout.myTab, tabs.weekLinks = prefs.layout.weekLinks;
if (tabs.menuLinks.enabled == true ||  tabs.rightMenu.enabled == true || tabs.weekLinks.enabled == true || tabs.myTab.enabled == true || prefs.layout.matchupLinks.enabled == true) {
	$('#layout').append('<fieldset id="tabSelects"><legend title="This allows you to change the tab info appended to the various links. Currently works but is NOT fool proof. No Validation Is Done on text input. Disable(rightMenu, menuLinks, weekLinks, and myTab), Leave as Default, or Use at Own risk.">Tab Selection</legend><select id="tabSlxLeague"></select>&nbsp;&nbsp;<input type="text" id="allTab" width="15" placeholder="stat1" />&nbsp;&nbsp;<input type="text" id="subTab" width="15" placeholder="stat2" />&nbsp;&nbsp;<input type="text" id="ssort" width="15" placeholder="ssort" />&nbsp;&nbsp;<span id="tabApply">Apply</span></fieldset>');
	$('#prefBox input').css({'width': '45px'});
	var opts = '<option value="All">All</option>';
		for (var n in tabs) {
			opts = opts+'<option value="'+n+'" title="'+tabs[n].title+'">'+n+'</option>';
		}
	$('#tabSlxLeague').html(opts).find('option').live('click', function(e) {
		var tStat1 = $(this).parent().next(), tStat2 = tStat1.next(), tsSort = tStat2.next();
		if ($(this).val() !== 'All') {
			tStat1.val(tabs[$(this).val()].stat1);
			tStat2.val(tabs[$(this).val()].stat2);
			tsSort.val(tabs[$(this).val()].ssort);
		} else {
			tStat1.val('stat1');
			tStat2.val('stat2');
			tsSort.val('ssort');
		}
	});
		$('#tabApply').live('click', function(e) {
			// TODO:  Validate Text Inputs OR change to Select
			$(this).text('Applying');
			var ss = $(this).prev(),  s = ss.prev(), f = s.prev(), t = f.prev();
			//alert(t.val()+' | '+f.val()+' | '+s.val()+' | '+ss.val());
			if (t.val() !== 'All') {
				t = t.val();
				if (f.val() !== tabs[t].stat1) {
					prefs.layout[t].stat1 = f.val();
				}
				if (s.val() !== tabs[t].stat2) {
					prefs.layout[t].stat2 = s.val();
				}
				if (ss.val() !== tabs[t].ssort) {
					prefs.layout[t].ssort = ss.val();
				}
				
			} else {
				// if (f.val() == 'stat1' || s.val() == 'stat2' || ss.val() == 'ssort') {
						// f.val(f.val().replace('stat1', '-'));
						// s.val(s.val().replace('stat2', '-'));
						// ss.val(ss.val().replace('ssort', '-'));
				// } 
				for (var o in tabs) {
					prefs.layout[o].stat1 = f.val();
					prefs.layout[o].stat2 = s.val();
					prefs.layout[o].ssort = ss.val();
				}
				
			}
			$(this).text('Apply');
			e.stopPropagation();
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
		});
	// }
	if (tabs.menuLinks.enabled == true) {
		$('.fantasticMenu:eq(0)').prepend('<fieldset id="teams"><legend>Teams and Matchups</legend><div id="teamBox"><ul id="linkMenu"><li class="hasMenu"><h4>Teams</h4><ul id="teamList"></ul></li><li class="hasMenu"><h4>Match-Ups</h4><ul id="muList"></ul></li></ul></div></fieldset>');
	}
	if (tabs.myTab.enabled == true) {
		var mLink = $('.bd:eq(0)>ul>li:eq(2)>a:eq(0)');
		// unsafeWindow.console.log(mlink.find('a:eq(0)').attr('href'));
		var mHref = mLink.attr('href'), mAlt = '';
		if (tabs.myTab.stat1 !== 'stat1' && tabs.myTab.stat1 !== '') {
			mAlt = 'stat1='+tabs.myTab.stat1;
		}
		if (tabs.myTab.stat2 !== 'stat2' && tabs.myTab.stat2 !== '') {
			mAlt = mAlt+'&stat2='+tabs.myTab.stat2;
		}
		if (tabs.myTab.ssort !== 'ssort' && tabs.myTab.ssort !== '') {
			mAlt = mAlt+'&ssort='+tabs.myTab.ssort;
		}
		mLink.attr('href', mHref+'/team?'+mAlt);
	}
	if (prefs.layout.matchupLinks.enabled == true) {
		var m = '/matchup';
	} else {
		var m = '';
	}
	$('.ysf-teamlist').first().children('li').each(function(){
		var fi = $(this).find('a').eq(0);
		var se = $(this).find('a').eq(1);
		if (tabs.menuLinks.enabled == true) {
			var arrmL = '/team?stat1='+tabs.menuLinks.stat1+'&stat2='+tabs.menuLinks.stat2;
			var f = fi.clone(), s = se.clone();
			f.attr('id', '').removeClass('yuimenuitemlabel name').attr('href', f.attr('href')+arrmL);
			s.attr('id', '').removeClass('yuimenuitemlabel').attr('href', s.attr('href')+m);
			f.appendTo('#teamList').wrap('<li />');
			s.appendTo('#muList').wrap('<li />');
		}
		if (tabs.rightMenu.enabled == true) {
			var arrrM = '/team?stat1='+tabs.rightMenu.stat1+'&stat2='+tabs.rightMenu.stat2;
			fi.attr('href', fi.attr('href')+arrrM);
			se.attr('href', se.attr('href')+m);
		}
	});
	if (tabs.weekLinks.enabled == true) {
		if (currentPage == 'team') {
			$('#weeknav li a').each(function() {
				$(this).attr('href', $(this).attr('href')+'&stat1='+tabs.weekLinks.stat1+'&stat2='+tabs.weekLinks.stat2);
			});
		}
	}

	if (prefs.display.teams == false) {
		$('#teams').children(':not(legend)').hide();
	}
}

//#/////////////////////////////# Begin Menu Click Binds #////////////////////////////////#//
var btn = $('#fantasticBtn');
btn.live('click', function(e) {
	if ($('#sidecontent_0_pullout').size()==0) {
		startMenu();
	} else {
		if ($('#sidecontent_0_pullout').is(':visible')) {
			$('.sidecontentpullout').fadeOut('fast');
			$('.sidecontent').fadeOut('fast');
		} else {
			$('.sidecontentpullout').fadeIn('fast');
			$('.sidecontent').fadeIn('fast');
		}
	}
	e.preventDefault();
	if (hasRun !== true) {
		modPage();
	} else {
		//alert(hasRun.toString());
	}
});
if (prefs.layout.superNotes.enabled == true) {
	$('a.playernote').live('click', function(e){
		e.stopPropagation();
		var t = $(this).attr('id').split('-')[1];
		if (currentPage !== 'transactions') {
			var po = $(this).parents('.ysf-player-detail:eq(0)').find('span:eq(0)').text().split(' - ')[1].replace(')', '');
			// //unsafeWindow.console.log(t +' | '+po);
		} else {
			var po = $(this).parent().text().split(' - ')[1].replace(')', '');
			// // var po = $(this).parent().find('span:eq(0)').text().split(' - ')[1].replace(')', '');
			// var po = $(this).prev().text().split(' - ')[1].replace(')', '');
			// //alert($(this).prev().text().split(' - ')[1].replace(')', ''));
		}
		if (po.search(',') !== -1) { po = po.split(',')[0] };
		var doAct = window.setInterval(function(){checkNote(t, doAct, po)}, 500);

	});
}
$('span.pref:not(.allToggle)').live('click', function(e) {
	var tid = $(this).attr('id');
	var p = $(this).parents('fieldset:eq(0)').attr('id');
	if (typeof prefs[p][tid] == 'object') {
		if (prefs[p][tid].enabled == true) {
			prefs[p][tid].enabled = false;
			$(this).find('.prefStatus:eq(0)').removeClass('all').addClass('none');
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
		} else {
			prefs[p][tid].enabled = true;
			$(this).find('.prefStatus:eq(0)').removeClass('none').addClass('all');
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
		}
	} else {
		if (prefs[p][tid] == true) {
			prefs[p][tid] = false;
			$(this).find('.prefStatus:eq(0)').removeClass('all').addClass('none');
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
		} else {
			prefs[p][tid] = true;
			$(this).find('.prefStatus:eq(0)').removeClass('none').addClass('all');
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
		}
	}
	//unsafeWindow.console.log(localStorage.getItem('FantasticPreferences'));
	e.preventDefault();
	e.stopPropagation();
});
$('.fantasticMenu fieldset legend').live('click', function(e) {
	if ($(this).next().is(':visible')) {
		$(this).siblings().slideUp(150);
		prefs['display'][$(this).parent().attr('id')] = false;
		localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
	} else {
		$(this).siblings().slideDown(150);
		prefs['display'][$(this).parent().attr('id')] = true;
		localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
	}
	e.preventDefault();
	e.stopPropagation();
});
$('.allToggle').live('click', function(e){
	if ($(this).find('.prefStatus:eq(0)').hasClass('all')) {
		var tet = $(this).siblings('.pref').find('.prefStatus').removeClass('all').addClass('none').each(function(){
			var a = $(this).parent().parent().attr('id');
			var b = $(this).parent().attr('id');
			if (typeof prefs[a][b] == 'object') {
				prefs[a][b].enabled = false;
			} else {
				prefs[a][b] = false;
			}
		}).promise().done(function(){
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
			//unsafeWindow.console.log(JSON.parse(localStorage.getItem('FantasticPreferences')));
		});
			
		$(this).find('.prefStatus:eq(0)').removeClass('all').addClass('none');
	} else {
		var tet = $(this).siblings('.pref').find('.prefStatus').removeClass('none').addClass('all').each(function(){
			var a = $(this).parent().parent().attr('id');
			var b = $(this).parent().attr('id');
			if (typeof prefs[a][b] == 'object') {
				prefs[a][b].enabled = true;
			} else {
				prefs[a][b] = true;
			}
		}).promise().done(function(){
			localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
			//unsafeWindow.console.log(JSON.parse(localStorage.getItem('FantasticPreferences')));
		});
		$(this).find('.prefStatus:eq(0)').removeClass('some').removeClass('none').addClass('all');
	}
	e.preventDefault();
});

$('#savePrefsAsFile').live('click', function(e) {
	$(this).attr('href', 'data:application/octet-stream,'+ encodeURI(JSON.stringify(localStorage.getItem('FantasticPreferences'))));
	window.location = $(this).attr('href');
	// window.location ='data:application/octet-stream,'+ encodeURI(JSON.stringify(localStorage.getItem('FantasticPreferences')));
});
$('#importPrefsFromFile').live('click', function(e) {
	var cacheData = prompt('Open the exported .part file in notepad then Copy and ', ' Paste it here. ');
	if (cacheData) {
		localStorage.setItem('FantasticPreferences', JSON.parse(cacheData));
		unsafeWindow.console.log(JSON.parse(localStorage.getItem('FantasticPreferences')));
		if (confirm('Preferences Loaded From File.  Refresh required before they will take effect. Refresh?')) {
			window.location.reload();
		}
	}
});

$('#cacheRefresh').live('click', function(e) {
	if (confirm('This could take a few moments, are you sure you want to rebuild the meta cache?')) {
		$.when(cacheStatus(true)).done(function(a) {
			unsafeWindow.console.log('Cache Refreshed.');
		});
	};
	e.preventDefault();
	e.stopPropagation();
});
$('#cacheFpa').live('click', function(e) {
	if (confirm('This could take a few moments. Wait until the light turns green. Are you sure you want to refresh the Fantasy Points Against cache?')) {
		var status = $(this).find('.cacheStatus');
		status.removeClass('all none').addClass('some');
		$.when(getFpa(JSON.parse(localStorage.getItem('cacheMeta')))).done(function(a) {
			status.removeClass('some none').addClass('all');
		}).fail(function() {
			alert('FPA Refresh Failed.');
			status.removeClass('some all').addClass('none');
		});
		var d = new Date(), udTime = d.toLocaleString();
		prefs.updated.fpa = udTime;
		$('#cacheFpa').attr('title', 'Last Updated: '+prefs.updated.fpa);
		localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
	}
});
$('#cacheRatings').live('click', function(e) {
	if (confirm('This could take a few moments. Wait until the light turns green. Are you sure you want to refresh the Ratings cache?')) {
		var status = $(this).find('.cacheStatus');
		status.removeClass('none all').addClass('some');
		$.when(cacheStatus(true)).done(function(a) {
			//unsafeWindow.console.log('Cache Refreshed.');
			$.when(getRatings(JSON.parse(localStorage.getItem('cacheMeta')))).done(function(a) {
				status.removeClass('some none').addClass('all');
			}).fail(function() {
				alert('No Matchup Ratings Yet');
				status.removeClass('some all').addClass('none');
			});
		});
		var d = new Date(), udTime = d.toLocaleString();
		prefs.updated.ratings = udTime;
		$('#cacheRatings').attr('title', 'Last Updated: '+udTime);
		localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
	}
});
$('#cacheTargets').live('click', function(e) {
	if (confirm('This could take a moment, are you sure you want to refresh the Targets cache?')) {
		var status = $(this).find('.cacheStatus');
		status.removeClass('all none').addClass('some');
		$.when(getTargets()).done(function(ab) {
			status.removeClass('none some').addClass('all');
		});
		var d = new Date(), udTime = d.toLocaleString();
		prefs.updated.targets = udTime;
		$('#cacheTargets').attr('title', 'Last Updated: '+prefs.updated.targets);
		localStorage.setItem('FantasticPreferences', JSON.stringify(prefs));
	}
});
$('#modRefresh').live('click', function(e) {
	modPage();
});
$( "table > thead > tr" ).delegate('th a',"click", function(e){
	var pid = $('div.players:eq(0)').attr('id');
	// unsafeWindow.console.log(pid);
	var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
});
$( ".pagingnavlist" ).delegate('li a',"click", function(e){
	var pid = $('div.players:eq(0)').attr('id');
	// unsafeWindow.console.log(pid);
	var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
});

$('#playerfilter a, .playersearchbox a.ysf-cta, div.yui3-ysfplayersearch-content li').live('click', function(e) {
	var pid = $('div.players:eq(0)').attr('id');
	// unsafeWindow.console.log(pid);
	var refAct = window.setInterval(function(){checkRef(refAct, pid)}, 250);
});