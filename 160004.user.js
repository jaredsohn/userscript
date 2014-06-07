// ==UserScript==
// @name        TVMuse.eu Beet Script - Less Clicks, More Control
// @namespace   http://bitbucket.org/rizenb
// @author      doyougl0w@gmail.com
// @description Some page modifications for tvlinks.eu designed to require less clicking. Features: A hover box to display info about the show and recent links page, Convenience functions to remove garbage links from listing and show links from the episode page. The 'Beet' part is just a random word because just saying 'Mods' is boring and just as nondescriptive. =P
// @include     *.tvmuse.eu/*
// @require 	http://code.jquery.com/jquery.min.js
// @resource	beetStyle		https://bitbucket.org/rizenb/tvmuse.eu-beet-mods/raw/e7571d91d3570db96b77f659f84922480ab67087/beetStyle.css
// @version     .81 Alpha
// ==/UserScript==

applyStyle();
$('body').append('<div id="beetPrefDialog"><div id="prefDialogHeader"><span class="X">X</span></div><div id="prefDialogBody"></div></div><div id="beetHoverDialog"><div id="hoverDialogHeader"><span class="hoverLabel"></span><span class="X">X</span></div><div id="hoverDialogBody"></div></div><div id="beetMyTabs"><div id="myTabsHeader"><span class="myTabsLabel">My SubMenu&nbsp;&nbsp;</span><span class="X">x</span></div></div>');
$('#hd').append('<span class="prefDialogBtn beetBtn">Beet Prefs</span>');
$(window).load(function() {window.loaded=true});
//GM_log("Hello, World!");
//# START !Vars! #//
var ts = $('#table_search'), prefDialog = $('#beetPrefDialog'), hoverDialog = $('#beetHoverDialog'), sched = $('ul.table_schedule'), myTabsA = $('.tabs .outer .cfix');
var tvUrl = 'http://www.tvmuse.eu/';
//var localStorage = unsafeWindow.localStorage;

//# Get the current URL and split it appropriately. #//
var loca = window.location.toString().replace(tvUrl, '').split('?'), loc=loca[0], loq=loca[1], locs = loc.split('/');
//# END !Vars! #//


//# Get the saved preferences or use Default #//
var prefs = localStorage.getItem('BeetPrefs');
if (!prefs) {
	var prefs = ({
		hoverLinks: {
			infoLinks: {on: true, title:"This will display recent links inside the popup."},
			infoShow: {on: true, title:"This will display the show\'s summary inside the popup."},
			infoEpisode: {on: true, title:"This will display the episode\'s summary inside the popup."},
			forShows: {on: true, title:"This will display hover info on links that go to TV series."},
			forEpisodes: {on: false, title:"Incomplete: This will display hover info on links that go to Episodes."},
			forMovies: {on: false, title:"Incomplete: This will display hover info on links that go to Movies"},
			forDocumentaries: {on: false, title:"Incomplete: This will display hover info on links that go to Documentaries."},
			forAnime: {on: false, title:"Incomplete: This will display hover info on links that go to Anime."},
		},
		videoLinks: {
			directLinks: {on: true, title:"This will disable the gateway page and take you straight to the website hosting the video."},
			showAllLinks: {on: true, title:"This load the real links into the episode page, saving you from clicking the tab to see links."}
			
		},
		watchList: {
			autoWatch: {on: true, title:"Will mark the video as watched as soon as you open one of its links."},
			hideWatched: {on: false, title:"Incomplete:  Adds extra filtering of watched list."},
			
		},
		miscOpts: {
			hideAds: {on: true, title:"This hides some Ads whose element id begins with ad_."},
			hideCrawler: {on: true,	title: "This Removes All search results that were added by the crawler."},
			mySubMenu: {on: true, title:"This will append the tabs from your My TVLinks page to a hover popup stemming from the My TVLinks button in the left nav."},
			showNextPrev: {on: false, title:"This attaches some generic next and previous buttons to video-results pages. Does not change seasons yet, so first episode and last episode in a season will be broken."}
		}
	});
} else {
	prefs = JSON.parse(prefs);
}

if (!cache) {
	var cache = ({
		getTabs : function (force) {
		  return $.Deferred(function( dfd ){
					 var test = localStorage.getItem('myTabs'), forced = (!test) ? true: false;
					 //alert(test.toString());
					 unsafeWindow.console.log(test);
					 unsafeWindow.console.log(forced);
					 if (force===true || forced===true) {
						  $.get(tvUrl+'myaccount.html', function(r) {
								var s = $(r).find('ul.tabs.outer.cfix li a');
								var ret = s.map(function() {
									var hr = $(this).attr('href');
									var na = $(this).text();
									return na+'|'+hr;
								}).toArray();
								localStorage.setItem('myTabs', JSON.stringify(ret));
								var xo = JSON.parse(localStorage.getItem('myTabs'));
								dfd.resolve(xo);
						  });
					 } else {
								var xo = JSON.parse(localStorage.getItem('myTabs'));
								unsafeWindow.console.log(xo);
								if (xo.length <3) {
										  dfd.reject();
								} else {
										  dfd.resolve(xo);
								}
								
					 }
		  }).promise();
		}
	});
}
if (!Beet) {
	var Beet = ({
		  splitLink : function(ln) {
					 var tvUrl = 'http://www.tvmuse.eu/';
					 ln = (ln) ? ln.replace(tvUrl, '') : window.location.toString().replace(tvUrl, '');
					 var lnB = ln.split('?');
					 if (lnB.length>1) {
								ln = lnB[0];
								Beet.lnQuery = lnB[1].split('=');
								unsafeWindow.console.log(Beet.lnQuery.toString());
					 }
					 var lnArray = ln.split('/');
					 lnArray = lnArray.filter(function(a){return a});
					 Beet.lnData = {};
					 for (var k in lnArray) {
								if (lnArray[k].search('season_') !== -1) {
										  Beet.lnData.seas = 'season_'+lnArray[k].split('_')[1];
								} else if (lnArray[k].search('episode_') !== -1) {
										  Beet.lnData.epis = lnArray[k];
										  Beet.lnData.epNum = parseInt(Beet.lnData.epis.split('_')[1]);
								} else if (lnArray[k].search('_') !== -1 || lnArray[k].search('.html') !== -1) {
										  Beet.lnData.show = lnArray[k];
								} else {
										  Beet.lnData.type = lnArray[k];
										  //var show = lnArray[k];
								}
					 }
					 //unsafeWindow.console.log(Beet.lnData);
					 return Beet.lnData;
		},
		doTrue: function(v) {
			for (var oxen in v) {
				if (typeof v[oxen] == 'object') {
					if (this[oxen] && typeof this[oxen] == 'function') {
							eval("this[oxen]"+"()");
					}
					for (var nexo in v[oxen]) {
						if (v[oxen][nexo].on == true) {
							if (this[nexo] && typeof this[nexo] == 'function') {
								// unsafeWindow.console.log(nexo);
								eval("this[nexo]"+"()");
							}
						}
					}
				}
			}
		},
		hideAds: function() {
			$('div[id^="ad_"]').remove();
		},
		hideCrawler: function(to) {
			if (!to) {
				$('#table_search').find('li:contains("crawler")').remove();
			} else {
				$(to).find('li:contains("crawler")').add($(to).find('li:contains("episoode.com")')).remove();
			}
		},
		mySubMenu: function(force) {
					 var tabBox = $('#beetMyTabs');
					 var myLink = $('#left_nav ul:eq(1) li:first()'), myLinkTop = myLink.offset().top, myLinkLeft = myLink.offset().left;
			$.when(cache.getTabs()).done(function(ox) {
					 //var tabBox = $('#beetMyTabs');
					 cache.myTabs = ox;
					 var tData = cache.myTabs.toString().split(','), tabMenu = '<ul>';
					 for(var x in tData) {
						 var tab = tData[x].split('|');
						 tabMenu+='<li><a href="'+tab[1]+'">'+tab[0]+'</a></li>';
					 }
					 tabBox.append(tabMenu+'</ul>');
					 //var myLink = $('#left_nav ul:eq(1) li:first()'), myLinkTop = myLink.offset().top, myLinkLeft = myLink.offset().left;
					 // unsafeWindow.console.log(myLinkLeft+myLink.width());
					 tabBox.css('left', myLinkLeft+myLink.width()+'px').css('top', myLinkTop-(tabBox.height()/2)+'px');
					 myLink.hover(function(e) {
						 tabBox.fadeIn('fast');
					 });
			}).fail(function(xo) {
					 tabBox.append('<a id="btnCacheClear" href="#">Fix the Cache?</a>');
					 tabBox.css('left', myLinkLeft+myLink.width()+'px').css('top', myLinkTop-(tabBox.height()/2)+'px');
					 myLink.hover(function(e) {
						 tabBox.fadeIn('fast');
					 });
					 $(document).on({'click': function(e) {
								var t = window.confirm('Error with Cache, Clean and reload?');
								if (t) {
										  localStorage.removeItem('myTabs');
										  window.location.reload();
										  e.preventDefault();
								}
					 }}, '#btnCacheClear');
			})
			
		},
		directLinks: function(to) {  //# Edits all link urls to skip directly to gateway.php, which sends you to the video. #//
			if (!to) {
				tsas = $('#table_search').find('a');
			} else {
				tsas = $(to).find('a');
			}
			if(tsas.size()>0) {
					 tsas.each(function() {
						 if ($(this).hasClass('red')||$(this).hasClass('black')) {
						 } else {
							 var xy = $(this).attr('onclick').match(/'.*?'/).toString().replace(/'/g,'');
							 $(this).attr({'onclick': null, 'href': '/gateway.php?data='+xy, 'target': '_blank'});
						 }
					 });
			}
		},
		autoWatch: function() {  //# Adds event to gateway.php links that marks the episode as watched. #//
					 $(document).on({'click': function(e) {
								if ($('#chkw').size()>0 && $('#chkw').prop('checked') !== true) {
										  if (window.loaded == true) {
													 $('#chkw').trigger('click');
										  } else {
													 $(window).load(function() {$('#chkw').trigger('click')});
										  };
								}
					 }}, 'a[href*="gateway.php"]');
					 
			//}
		},
		skipSummary: function() {
			$(document).on('click','a[href*="episode"]:not(a[href*="video-results"])', function(e) {
				$(this).attr('href', $(this).attr('href')+'video-results/');
			});
			
		},
		showAllLinks: function() {
			if (loc.search('episode_') !== -1 && loc.search('video-results') == -1) {
				$.get('/'+loc+'video-results/', function(re) {
					var ls = $(re).find('#table_search');
					if (ls.length>0) {
						if (prefs.miscOpts.hideCrawler.on == true) {
							Beet.hideCrawler(ls);
						}
						if (prefs.videoLinks.directLinks.on == true) {
							Beet.directLinks(ls);
						}
						$('#table_search').html(ls);
						var l = $('ul.tabs.outer.cfix.mb_05');
						l.find('li.on').removeClass('on').next().addClass('on').prev().remove();
						l.find('li.on').find('span').html('Video Results:&nbsp;&nbsp;( '+ls.find('li').size()+' )');
					}
				});
			}
		
		},
		hoverLinks: function(page) {
			if (!page) {
				//unsafeWindow.console.log(loc);
			} else {
				switch(page) {
					case 'schedule':
						var list = $('li.cfix.list:contains(a)').find('a:not(:has(img))');
					break;
					case 'myschedule':
					
					break;
					case 'tvlist':
					
					break;
					case 'movielist':
					
					break;
					case 'doculist':
					
					break;
					case 'animelist':
					
					break;
				}
			}
		},
		showNextPrev: function() {
		  //# Applies to video results and episode pages #//
		  //if (loc.split('/').length>2)
		  //unsafeWindow.console.log(loc.split('/'));
		  if (ts.length>0) {
					 ts.before('<div id="BeetBtnBox"><span class="beetBtn" id="prevBtn"><a class="prev">Previous Episode</a></span><span class="beetBtn" id="nextBtn"><a class="next">Next Episode</a></span></div><div class="hr3 mb_05">&nbsp;</div>');
		  
					 //var lnArray = Beet.splitLink();
					 if (Beet.lnData) {
								//unsafeWindow.console.log(type+' | '+show+' | '+seas+' | '+epis);
								//var se1 = loc.split('season_'), se2 = se1[1].split('/'), se3 = se2[0], ep1 = loc.split('episode_')[1].split('/')[0];
								var nxt = $('#BeetBtnBox').find('.next:eq(0)'), prv = $('#BeetBtnBox').find('.prev:eq(0)');
								prv.attr('href', '/'+Beet.lnData.type+'/'+Beet.lnData.show+'/'+Beet.lnData.seas+'/episode_'+(Beet.lnData.epNum-1)+'/').click(function(e) {e.preventDefault();window.location = $(this).attr('href')});
								nxt.attr('href', '/'+Beet.lnData.type+'/'+Beet.lnData.show+'/'+Beet.lnData.seas+'/episode_'+(Beet.lnData.epNum+1)+'/').click(function(e) {e.preventDefault();});
								
								//prv.attr('href', '/'+Beet.lnData.type+'/'+Beet.lnData.show+'/'+Beet.lnData.seas+'/episode_'+(Beet.lnData.epNum-1)).click(function() {_gaq.push(['_trackEvent', 'Videos', 'EpCarousel'])});
								//nxt.attr('href', '/'+Beet.lnData.type+'/'+Beet.lnData.show+'/'+Beet.lnData.seas+'/episode_'+(Beet.lnData.epNum+1)).click(function() {_gaq.push(['_trackEvent', 'Videos', 'EpCarousel'])});
								//unsafeWindow.console.log(se1[0]+se3+'/'+se1[1]);
								//unsafeWindow.console.log(prv.attr('href'));
					 } else {
							  //unsafeWindow.console.log(Beet);
					 }
		  } else {
					 //unsafeWindow.console.log(Beet);
		  }
		},
		forShows: function() {
			var tOut, sel = 'a[href*="tv-shows"]';
			$(document).on({'mouseenter': function(e) {
				tOut = setTimeout(function() {
					 var p = $(e.target), hrf = p.attr('href');
					 $('body').add(p).css('cursor', 'wait');
					 if (hoverDialog.is(':visible')) {
						 hoverDialog.fadeOut('fast');
					 }
					 var lnDat = Beet.splitLink(hrf);//, dfr = $.Deferred();
					 

					// if (lnDat.epis && lnDat.seas) { //# List episode summary and links #//
					//			 if (tar.data('linkData|'+lnDat.show+'|'+lnDat.seas+'|'+lnDat.epis)) {
					//					  unsafeWindow.console.log('cached: '+tar.data('linkData|'+lnDat.show+'|'+lnDat.seas+'|'+lnDat.epis));
					//			} else {
					//				/*# var ter = getShow(show);
					//				 $('a[href*="'+show+'"]').data('', ter) #*/
					//					  unsafeWindow.console.log(lnDat.type+' | '+lnDat.show+' | '+lnDat.seas+' | '+lnDat.epis);
					//					  tar.data('linkData|'+lnDat.show+'|'+lnDat.seas+'|'+lnDat.epis, lnDat.type+' | '+lnDat.show+' | '+lnDat.seas+' | '+lnDat.epis);
					//			}
					// }
					 //dfr.resolve('t');
					 
					 $.when(getShowData(lnDat)).done(function(res) { //# Layout and Display the Show's info #//
								//unsafeWindow.console.log(res);
								var bd = $('#hoverDialogBody');
								if (res.showData && res.episodeData && res.linkData) {
										  var last = res.showData[5]+res.showData[6]+res.episodeData[3]+'<br /><br />'+res.showData[0]+res.showData[2]+res.showData[4]+'<br />'+res.showData[3]+'<hr />'+res.episodeData[0]+'<br />'+res.showData[1]+res.episodeData[1]+'<br />'+res.episodeData[2]+'<br /><hr />'+res.linkData;
								} else if (res.showData && !res.episodeData && res.linkData) {
										  var last = res.showData[5]+res.showData[6]+'<br />'+res.showData[0]+res.showData[2]+res.showData[4]+'<br />'+res.showData[3]+res.showData[1]+'<hr />'+res.linkData;
								} else if (res.showData && !res.episodeData && !res.linkData)  {
										  var last = res.showData[5]+res.showData[6]+'<br />'+res.showData[0]+res.showData[2]+'<br />'+res.showData[4]+'<br />'+res.showData[3]+'<br />'+res.showData[1];
								} else if (!res.showData && res.episodeData && !res.linkData)  {
										  var last = res.episodeData[3]+'<br />'+res.episodeData[0]+'<br />'+res.episodeData[1]+'<br />'+res.episodeData[2]+'<br /><hr />';
								} else if (!res.showData && res.episodeData && res.linkData)  {
										  var last = res.episodeData[3]+'<br />'+res.episodeData[0]+'<br />'+res.episodeData[1]+'<br />'+res.episodeData[2]+'<br /><hr />'+res.linkData;
								} else if (!res.showData && !res.episodeData && res.linkData)  {
										  var last = res.linkData;
								} else {
										  unsafeWindow.console.log(res);
										  var last = '';
								}
								//for (var kj in res) {
								//		  bd.append(res[kj]);
								//}
								bd.html(last);
								if (res.episodeData) {
										  var epName  = $(res.episodeData[0]).find('span.hoverInfoValue').text();
										  $('#hoverDialogHeader > .hoverLabel').html(lnDat.show.split('_')[0]+':&nbsp;&nbsp;'+epName);
								} else if (lnDat.seas && lnDat.epis) {
										  $('#hoverDialogHeader > .hoverLabel').html(lnDat.show.split('_')[0]+':&nbsp;&nbsp;'+lnDat.seas+' - '+lnDat.epis);
								} else {
										  $('#hoverDialogHeader > .hoverLabel').html(lnDat.show.split('_')[0]);
								}
								
								//unsafeWindow.console.log(p.data());
								if (last.length>0) {
										  var why = (e.pageY-150 <0) ? 10 : e.pageY-150;
										  var eks = (e.pageX-250 <0) ? 10 : e.pageX-250;
										  hoverDialog.css({top:why+'px', left:eks+'px', 'margin-left':'0px', 'margin-top':'0px'}).fadeIn('fast');
										  $('body').add(p).css('cursor', 'auto');
								} else {
										$('body').add(p).css('cursor', 'auto');
								}
								
					 });
					 
					 //$('body').add(tar).css('cursor', 'auto');
					 //unsafeWindow.console.log(tar.data());
					 //$('#hoverDialogHeader span.hoverLabel').text(p.text());
					 
				//# Check for the link data in cache and only proceed getting the necessary bits. #//
					 
				}, 1000)
			}, mouseleave:function() {
				if (tOut) {clearTimeout(tOut)};
				$('body').css('cursor', 'auto');
			}}, sel);
		},
		
		forShowsDix: function() {
			var tOut;
			$(document).on({'mouseenter': function(e) {
				tOut = setTimeout(function() {
					var p = $(e.target);
					$('body').add(p).css('cursor', 'wait');
					$('#hoverDialogHeader span.hoverLabel').text(p.text());
					if (hoverDialog.is(':visible')) {
						hoverDialog.fadeOut('fast');
					}
					if (p.data('linkdata')) {
								var h = p.data('linkdata');
								$('#hoverDialogBody').html(h);
								var why = (e.pageY-150 <0) ? 10 : e.pageY-150;
								var eks = (e.pageX-250 <0) ? 10 : e.pageX-250;
								hoverDialog.css({top:why+'px', left:eks+'px', 'margin-left':'0px', 'margin-top':'0px'}).fadeIn('fast');
								$('body').add(p).css('cursor', 'auto');
					} else {
						var f = p.attr('href'), ff = f.split('/');
						if (ff[3] && ff[4]) {
							var ffox = ff[2]+'/'+ff[3]+'/'+ff[4];
						} else {
							var ffox = ff[2];
						}
						$.when(hoverGet(f)).done(function(res) {
							p.add('a[href*="'+ffox+'"]').data('linkdata', res);
							$('#hoverDialogBody').html(p.data('linkdata'));
							var why = (e.pageY-150 <0) ? 10 : e.pageY-150;
							var eks = (e.pageX-250 <0) ? 10 : e.pageX-250;
							hoverDialog.css({top:why+'px', left:eks+'px', 'margin-left':'0px', 'margin-top':'0px'}).fadeIn('fast');
							$('body').add(p).css('cursor', 'auto');
						});
					}
				}, 750)
			}, mouseleave:function() {
				if (tOut) {clearTimeout(tOut)};
				$('body').css('cursor', 'auto');
			}}, 'a[href*="_"]:not(a[href*="search"], a[href*="/user/"])');
		}
	})
}




//# START !Funcs! #//
function getShowData(lnDat) {
		  return $.Deferred(function( dfd ){
					 var data = {};
					 getShow(lnDat).done(function(rea) {
								data.showData = rea;
								getEpisode(lnDat).done(function(reb) {
										  data.episodeData = reb;
										  getLinks(lnDat).done(function(rec) {
													 data.linkData = rec;
													 dfd.resolve(data);
										  });
								});
					 });
		  }).promise();
}

function getLinks(lnDat) {//# List episode links. #//
		  return $.Deferred(function( dfd ){
					 var linkKey = 'linkData|'+lnDat.show+'|'+lnDat.seas+'|'+lnDat.epis+'|links';
					 if (prefs.hoverLinks.infoLinks.on === true && lnDat.epis && lnDat.seas) {
								var tar = $('a[href*="'+lnDat.show+'"]');
								if (tar.data(linkKey)) {
										  var linkData = tar.data(linkKey);
										  dfd.resolve(linkData);
								} else {
										  $.get('/'+lnDat.type+'/'+lnDat.show+'/'+lnDat.seas+'/'+lnDat.epis+'/video-results/', function(rez) {
													 var ls = $(rez).find('#table_search');
													 if (ls.length>0) {
														 if (prefs.miscOpts.hideCrawler.on == true) {
															 Beet.hideCrawler(ls);
														 }
														 if (prefs.videoLinks.directLinks.on == true) {
															 Beet.directLinks(ls);
														 }
														 var xn = ls.find('a:not(.black)');
														 var ooo = '';
														 xn.each(function(a) {
															 var hr = $(this).attr('href');
															 var b = $(this).find('.bold');
															 if (b.length>1) {b = b.eq(1).text()} else {b=b.eq(0).text()};
															 ooo+='<a class="beetLink" target="_blank" href="'+hr+'">'+b.split(' ')[1]+'</a>';
														 });
														 ooo = '<li class="beetLinks">'+ooo+'</li>';
														 //xli.parent().parent().append(ooo);
														 tar.data(linkKey, ooo);
													    var linkData = tar.data(linkKey);
													    dfd.resolve(linkData);
														 // p.data('linkdata', x);
														 // $('#hoverDialogBody').html(p.data('linkdata'));
														 // hoverDialog.css({top:e.pageY-150+'px', left:e.pageX-250+'px', 'margin-left':'0px', 'margin-top':'0px'}).fadeIn('fast');
														 // $('body').add(p).css('cursor', 'auto');
													 } else {
														 xli.last().after('No Links Yet.');
														 tar.data(linkKey, x.html());
													    var linkData = tar.data(linkKey);
													    dfd.resolve(linkData);
													 }
													 //tar.data(linkKey, x.html());
													 //var linkData = tar.data(linkKey);
													 //dfd.resolve(linkData);
										  });
								}
					 } else {
								dfd.resolve();
					 }
		  });
}
function getEpisode(lnDat) {//# List episode summary. #//
		  return $.Deferred(function( dfd ){
					 var episKey = 'linkData|'+lnDat.show+'|'+lnDat.seas+'|'+lnDat.epis;
					 if (prefs.hoverLinks.infoEpisode.on === true && lnDat.epis && lnDat.seas) {
								var tar = $('a[href*="'+lnDat.show+'"]');
								if (tar.data(episKey)) {
										  var episData = tar.data(episKey);
										  dfd.resolve(episData);
								} else {
										  $.get('/'+lnDat.type+'/'+lnDat.show+'/'+lnDat.seas+'/'+lnDat.epis+'/', function(rez) {
													 var w = $(rez).find('ul#link_favs'), x = w.next();
													 var btn = w.find('li:last').html();
													 //var xli = x.find('li:not(:last) div');
													 x.find('li:last').remove();
													 var toReturn = [];
													 x.find('li').each(function() {
																var l = $(this).find('div.l').removeClass('l').html();
																var r = $(this).find('div.r').removeClass('r').html();
																var lir = '<span class="hoverInfo"><span class="hoverInfoLabel lal">'+l+'</span>&nbsp;&nbsp; <span class="hoverInfoValue ral">'+r+'</span></span>';
																toReturn[$(this).index()] = lir;
																//alert($(this).index());
																//if ($(this).index() !== 0) {
																//		  lir+='<br />';
																//}
																//toReturn+=lir;
													 });
													 //var last = toReturn[0]+
													 //var eps = $(rez).find('ul#link_favs').next().find('li:not(:last)');
													 //x.append(eps);
													 //var y = x.html();
													 toReturn.push(btn);
													 tar.data(episKey, toReturn);
													 var episData = tar.data(episKey);
													 dfd.resolve(episData);
										  });
								}
					 } else {
								dfd.resolve();
					 }
		  });
}
function getShow(lnDat) {
		  return $.Deferred(function( dfd ){
					 var showKey = 'linkData|'+lnDat.show;
					 if (lnDat.show && prefs.hoverLinks.infoShow.on === true) { //# Fill Show title and other show info boxes. #//
								var tar = $('a[href*="'+lnDat.show+'"]');
								if (tar.data(showKey)) {
										  var showData = tar.data(showKey);
										  dfd.resolve(showData);
								} else {
										  $.get('/'+lnDat.type+'/'+lnDat.show+'/', function(rez) {
													 var w = $(rez).find('ul#link_favs'), x = w.next();
													 var butt = w.find('li:not(:last)'), buttons = []; buttons[0] = butt.eq(0).addClass('rft').html(), buttons[1] = butt.eq(2).addClass('rft').html();
													 
													 x.find('li:last').remove();
													 var img = x.find('.img_mov:eq(0)').addClass('lft').parent().html();
													 var toReturn = []; toReturn[0] = img;
													 x.find('li').each(function() {
																var l = $(this).find('div.l').removeClass('l').html();
																var r = $(this).find('div.r').removeClass('r').html();
																var lir = '<span class="hoverInfo"><span class="hoverInfoLabel lal">'+l+'</span>&nbsp;&nbsp; <span class="hoverInfoValue ral">'+r+'</span></span>';
																toReturn[$(this).index()+1] = lir;
													 });
													 toReturn.push(buttons[0], buttons[1]);
													 tar.data(showKey, toReturn);
													 var showData = tar.data(showKey);
													 dfd.resolve(showData);
										  });
								}
					 } else {
								dfd.resolve();
					 }
		  }).promise();
}

function hoverGet(l) {
	return $.Deferred(function( dfd ){
		if (!l) {
			l = $(e.target).attr('href');
		}
		la=l.split('?')[0];
		var lb = la.split('/');
		var f = '/'+lb[1]+'/'+lb[2]+'/';
			$.get(f, function(r) {
				var x = $(r).find('ul#link_favs').next().attr('id', 'tempGet');
				var xli = x.find('li:not(:last) div');
				x.find('li:last').remove();
				if (lb[3] && lb[4]) {
					var latestLinks = lb[3]+'/'+lb[4]+'/';
				} else {
					var lLinks = $(r).find('#last_ep a:first').attr('href').split('/');
					var latestLinks = lLinks[3]+'/'+lLinks[4]+'/';
				}
				//xli.removeClass('l r').css({'display': 'inline', 'float': 'left'});
				if (prefs.hoverLinks.showLinks.on == true) {
					$.get(f+latestLinks+'video-results/', function(re) {
						//x.append($(re).find('ul#link_favs').next());
						var eps = $(re).find('ul#link_favs').next().find('li:not(:last)');
						x.append(eps);
						//unsafeWindow.console.log(eps);
						var ls = $(re).find('#table_search');
						if (ls.length>0) {
							if (prefs.miscOpts.hideCrawler.on == true) {
								Beet.hideCrawler(ls);
							}
							if (prefs.videoLinks.directLinks.on == true) {
								Beet.directLinks(ls);
							}
							var xn = ls.find('a:not(.black)');
							var ooo = '';
							xn.each(function(a) {
								var hr = $(this).attr('href');
								var b = $(this).find('.bold');
								if (b.length>1) {b = b.eq(1).text()} else {b=b.eq(0).text()};
								ooo+='<a class="beetLink" target="_blank" href="'+hr+'">'+b.split(' ')[1]+'</a>';
							});
							ooo = '<li class="beetLinks">'+ooo+'</li>';
							xli.parent().parent().append(ooo);
							dfd.resolve(x);
							// p.data('linkdata', x);
							// $('#hoverDialogBody').html(p.data('linkdata'));
							// hoverDialog.css({top:e.pageY-150+'px', left:e.pageX-250+'px', 'margin-left':'0px', 'margin-top':'0px'}).fadeIn('fast');
							// $('body').add(p).css('cursor', 'auto');
						} else {
							xli.last().after('No Links Yet.');
							dfd.resolve(x);
						}
					});
				} else {
					dfd.resolve(x);
				}
				
			});
	}).promise();
}

function applyStyle() {	//# Append CSS #//
		  //if (a) {
		//			 var sty = "<link rel ='stylesheet' href='http://userscripts.allowed.org/Beet/css/beetStyle.css' type='text/css' />";
		//			 $('head').append(sty);
		  //} else {
	var styles = GM_getResourceText('beetStyle');
	//var styles = ".lft { float:left; } .rft { float: right; } .lal { text-align: left; } .ral { text-align: right; } /*li.on span {font-weight: bolder;}*/  #beetMyTabs{border:1px solid #ccc;background-color:#eee;box-shadow:5px 5px #555;max-width:180px;max-height:240px;position:absolute;left:-9999;top:-9999;text-align:center;z-index: 99999;opacity:.9;display:none;} #beetMyTabs li{padding:2px 24px 2px 24px;} #beetMyTabs li:hover{background-color:#19A5DA;} #beetMyTabs li:hover a{color:#fff;} #myTabsHeader{background-color:#19A5DA;} .myTabsLabel{font-size:1.2em;font-weight:bold; color:#fff;} #beetMyTabs .X{padding:0px;color:#fff;margin-top:0;margin-right:2px;background-color:transparent;}#beetHoverDialog{background-color:#eee;box-shadow:5px 5px #555;position:absolute;top:-999;left:-999;min-width:500px ;max-width: 700px;width:auto;height:auto;overflow:auto;margin-top:0px;margin-left:-250px;text-align:center;z-index:99999;opacity:.9;display:none;} #hoverDialogHeader{border:0px solid #333;text-align:center;background-color:#19A5DA;height:30px;} .hoverLabel{font-size:1.5em;font-weight:bold;} #hoverDialogBody {padding: 10px;height:100%;} .X{float:right;display:block;margin-top:2px;margin-right:3px;font-size:1.2em;cursor:pointer;font-weight:bolder;padding:3px;background-color:#19A5DA;color:#fff;} .hoverInfo {padding: 5px;} .hoverInfoLabel {font-weight: bolder; padding-left: 10px; padding-right: 10px;} .hoverInfoValue {font-size: 1.1em;}  #beetPrefDialog{background-color:#eee;box-shadow:5px 5px #555;position:absolute;margin:auto;text-align:center;z-index:99999;opacity:.9;display:none; max-width: 300px;} .prefDialogBtn{float:right;margin-right:8px;margin-top: 8px;} .prefDialogBtn:not(.X){box-shadow:3px 3px #555;} #prefDialogHeader{border:0px solid #333;text-align:center;background-color:#19A5DA;height:28px;padding: 4px;padding-right: 1px;width: auto;vertical-align: middle;} #prefDialogHeader .X {margin-top: 1px;margin-right: -1px;padding-left: 5px;padding-right: 5px;} #prefDialogBody {padding: 0px; width: auto;margin:0;}  .beetLinks {margin: auto; text-align: center;} .beetLink {float:right;border:1px solid #19A5DA;padding:6px;font-weight:bold;margin:1px;background-color:#19A5DA;color: #fff;margin-left: 5px;margin-top: 5px;margin-bottom: 5px;}  .beetBtn{display:block;cursor:pointer;font-weight:bolder;padding:3px;background-color: #19A5DA;color:#fff;box-shadow:3px 3px #555;max-width:200px;} #prevBtn{float:left;margin-left: 23px;} #nextBtn{float:right;margin-right: 23px;}  .pref {padding: 4px;border: 1px solid #ccc;float: left;font-weight: bold;color: #fff;font-size: smaller;margin-top: 2px;cursor:pointer;} .pref:hover {background-color: #fff;color: #19A5DA;} .prefBox {display: none;} .prefDialogBox { 	display: inline; 	padding: 4px; } .prefToggleBox {   display: block;   height: 32px;   line-height: 32px;   vertical-align: middle;   padding: 4px; } .prefToggleLabel {   display: inline-block;   height: 26px;   line-height: 30px;   vertical-align: middle;   font-size: medium;   float: left; }  .slideThree input[type=checkbox] { 	visibility: hidden; }  .slideThree { 	float: right; 	display: inline-block; 	width: 80px; 	height: 26px; 	background: #333; 	margin: auto; 	-webkit-border-radius: 50px; 	-moz-border-radius: 50px; 	border-radius: 50px; 	position: relative; 	-webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2); 	-moz-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2); 	box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2); }  .slideThree:after { 	content: 'OFF'; 	font: 12px/26px Arial, sans-serif; 	color: #b00; 	position: absolute; 	right: 10px; 	z-index: 0; 	font-weight: bold; 	text-shadow: 1px 1px 0px rgba(255,255,255,.15); }  .slideThree:before { 	content: 'ON'; 	font: 12px/26px Arial, sans-serif; 	color: #00bf00; 	position: absolute; 	left: 10px; 	z-index: 0; 	font-weight: bold; }  .slideThree label { 	display: block; 	width: 34px; 	height: 20px; 	-webkit-border-radius: 50px; 	-moz-border-radius: 50px; 	border-radius: 50px; 	-webkit-transition: all .4s ease; 	-moz-transition: all .4s ease; 	-o-transition: all .4s ease; 	-ms-transition: all .4s ease; 	transition: all .4s ease; 	cursor: pointer; 	position: absolute; 	top: 3px; 	left: 3px; 	z-index: 1; 	-webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3); 	-moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3); 	box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3); 	background: #fcfff4; 	background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); 	background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); 	background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); 	background: -ms-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); 	background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); 	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfff4', endColorstr='#b3bead',GradientType=0 ); }  .slideThree input[type=checkbox]:checked + label { 	left: 43px; }   /*.hoverUp {position:relative;background-position: -250px 0;height: 16px;width: 16px;display: inline-block;font-size: 0;text-decoration: none !important;vertical-align: middle;background-image:url('http://s.tvlim.com/bgs_main4.png');background-repeat: no-repeat;margin-right: 7px;}*/";
					 var hd = document.getElementsByTagName('head')[0];
					 var el = document.createElement('style');
					 el.type = 'text/css', el.innerHTML = styles;
					 hd.appendChild(el);
		  //}
}

var prefDialogObj = {
	init: function() {
		// // $('body').append('<div id="beetPrefDialog"><div id="prefDialogHeader"><span class="prefDialogBtn prefX">X</span></div><div id="prefDialogBody"></div></div>');
		// // $('#hd').append('<span class="prefDialogBtn">Beet Prefs</span>');
		 var prefBox = $('#beetPrefDialog'), prefBody = $('#prefDialogBody'), prefHeader = $('#prefDialogHeader');


		 var prefData = '<div id="prefListing">';
		  var thisPref = '';
		  for (var n in prefs) {
					 if (typeof prefs[n] == 'object') {
								thisPref = thisPref + '<span class="pref" id="'+n+'Btn"><span class="prefBtnLabel">'+n+'</span></span>';
								var thisPrefBox = '<div class="prefBox" id="'+n+'BtnBox">';
								for (var o in prefs[n]) {
										  if (typeof prefs[n][o] == 'object') {
												var these = '<span class="prefToggleBox" id="'+o+'" title="'+prefs[n][o].title+'"><span class="prefToggleLabel">'+o+'</span><div class="slideThree"><input type="checkbox" value="'+prefs[n][o].on+'" id="'+o+'Btn" /><label for="'+o+'Btn"></label></div></span>';
												thisPrefBox = thisPrefBox+these;
										  }
								}
								prefData = prefData+thisPrefBox+'</div>';
					 }
		  }
		  prefHeader.append(thisPref);
		  prefBody.append(prefData+'</div>');
		  $('.slideThree input').each(function() {
				if ($(this).val() == 'true') {
					 $(this).prop('checked', true);
				}else{
					 $(this).prop('checked', false);
				}
		  });
		
// # START !Pref-Events! #//
		  $(document).on({'click': function(e) {
					 if (prefDialog.is(':visible')) {
								prefDialog.fadeOut('fast');
					 } else {
								//var t = e.pageY+$(this).height(), l = $(window).width()-e.pageX;
								var p = $('.prefDialogBtn');
								//unsafeWindow.console.log((p.position().top+p.height()*2) +' | '+(p.position().left-p.width()/2));
								//prefDialog.css({ top:'40px', right:'40px' });
								prefDialog.css({ top:(p.position().top+p.height()*2), left:(p.position().left-prefDialog.width()/3) });
								prefDialog.fadeIn('fast');
					 }
		  }}, '.prefDialogBtn');
		  
		  $(document).on('click', '.pref', function(e) {
					 //e.stopPropagation();
					 //e.preventDefault();
					 var ix = '#'+$(this).attr('id')+'Box';
					 if($(ix).is(':visible')) {
								prefBody.slideUp(500).find(ix).hide();
					 } else {
								prefBody.slideUp(200, function() {
										  prefBody.find('.prefBox:not('+ix+')').hide();
										  prefBody.find(ix).show();
										  prefBody.slideDown(500);
								});
					 }
		  });

		  $(document).on('click', 'div.slideThree', function(e) {
					 e.preventDefault();
					 e.stopPropagation();
					 var idi = $(this).parents('.prefBox').attr('id').replace('BtnBox', '');
					 var di = $(this).parents('.prefToggleBox').attr('id');
					 var it = $(this).find('input');
					 if (it.prop('checked') === true){
								it.prop('checked', false);
								prefs[idi][di].on = it.prop('checked');
					 } else {
								it.prop('checked', true);
								prefs[idi][di].on = it.prop('checked');
								if (typeof eval('Beet.'+di) == 'function') {
										  eval('Beet.'+di+'()');
								}
					 }
					 prefDialogObj.updatePrefs(prefs);
		  });
		  
// # END !Pref-Events! #//
	},
		  updatePrefs: function(pr) {
					 if (localStorage.getItem('BeetPrefs') !== JSON.stringify(pr)) {
								var pr1 = JSON.stringify(pr);
								localStorage.setItem('BeetPrefs', pr1);
								prefs = JSON.parse(localStorage.getItem('BeetPrefs'));
								//Beet.doTrue(prefs);
					 }
		  }
}



////# START !Global! #//
Beet.splitLink();
prefDialogObj.init();
Beet.doTrue(prefs);

$(document).on('click', '.X', function(e) {
	if ($(this).parent().attr('id') == 'beetMyTabs') {
		$(this).parent().toggle();
	} else {
		$(this).parent().parent().toggle();
	}
});

$('body:not("#beetMyTabs")').click(function(e) {
		  //e.stopPropagation();
		 $('#beetMyTabs').fadeOut('fast');
});