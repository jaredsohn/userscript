// ==UserScript==
// @name           YouTube Blocklist
// @namespace      http://gamecentralnetwork.net
// @description    Block annoying YouTube users from your search results and sidebar.
// @include        http://*.youtube.*/*
// @include        https://*.youtube.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=101471
// ==/UserScript==
//Thanks to vbrtrmn for Google Domain Blocker from which this is based!

var g = {
	url: 'http://userscripts.org/scripts/show/101471', 
	prefs: {
		blEnable: true,
		blDisplay: true,
		blRegex: false
	},
	blacklist: [],
	tempDisabled: false,
	runcnt:0,
	myTimeouta: '',	
	myTimeoutb: '',	
	myTimeoutc: '',	
	myTimeoutd: '',	
	myTimeoute: '',	
	myTimeoutf: '',	
	myTimeoutg: '',
	numHidden: 0,
	defaultsfrombrent: ["Fred","NerdDawsonTV","RayWilliamJohnson","ShaneDawsonTV","ShaneDawsonTV2","sxephil","SolidifyReviews","GNNMAGNA","ERICandChrisTV","Crashdance22","13mordeth","HouseholdHacker","Nextraker","TedCrusty","TheFakeVideoDJ","TungstenoProductions","clevverTV","kt088","markeedragon","penguinz0","sollmark","thesquish100","tysiphonehelp","wucrew12"],
	askedAlready: false,
	hiddenText: '<li class="hidtxt"><span class="domain">xxx</span> blacklisted</li>',
	init: function() {
		
		// Possibly addresses a bug where the blacklist was duping
		if($('ul.video-list').length==0&&$('#search-results').length==0) return;
        if($('#showHideBlacklist').length>0) return;
				
		
		g.loadPrefs();
		g.eventListeners();
		g.addStyles();
		g.blacklist = g.getBlacklist();
		g.makeBlacklistControls();
		
		// Debug: always show the list
//		$('div#blTop').show();
		
		if (g.prefs.blEnable===true) {
			g.setTimeouts;
			$(window).bind('load click scroll',g.setTimeouts);
			$('input#masthead-search-term').bind('keypress',g.setTimeouts);
		}
		
		if (g.prefs.blDisplay===false) {
			GM_addStyle('ul.video-list li.hidtxt { display: none; }');
		}
	},
	clearTimeouts: function () {
			//clearTimeout(g.myTimeouta);
			clearTimeout(g.myTimeoutb);
			clearTimeout(g.myTimeoutc);
			clearTimeout(g.myTimeoutd);
			clearTimeout(g.myTimeoute);
			clearTimeout(g.myTimeoutf);
	}
	,
	setTimeouts: function() {
			
			g.clearTimeouts;
			//g.myTimeouta = setTimeout(g.pollBodyHeight,250);
			g.myTimeoutb = setTimeout(g.pollBodyHeight,500);
			g.myTimeoutc = setTimeout(g.pollBodyHeight,750);			
			g.myTimeoutd = setTimeout(g.pollBodyHeight,1250);
			g.myTimeoute = setTimeout(g.pollBodyHeight,2500);
			g.myTimeoutf = setTimeout(g.pollBodyHeight,5000);
	},
	
	loadPrefs: function() {
		// Debug: unset all prefs.
//		GM_deleteValue('blEnable');
//		GM_deleteValue('blRegex');
//		GM_deleteValue('blDisplay');
//      GM_setValue('blacklist','');

		// If pref is undefined, set it as default otherwise use the set value
		g.prefs.blEnable 	= (GM_getValue('blEnable')  == undefined) ? g.prefs.blEnable  : GM_getValue('blEnable');
		g.prefs.blDisplay 	= (GM_getValue('blDisplay') == undefined) ? g.prefs.blDisplay : GM_getValue('blDisplay');
		g.prefs.blRegex 	= (GM_getValue('blRegex')   == undefined) ? g.prefs.blRegex   : GM_getValue('blRegex');
		
	},
	
	togglePref: function(ev) {
		var pref = $(this).parent().attr('id');
		if ($(this).hasClass('blOn')) {
			$(this).removeClass('blOn');
			$(this).addClass('blOff');
			g.prefs[pref] = false;
		} else {
			$(this).removeClass('blOff');
			$(this).addClass('blOn');
			g.prefs[pref] = true;
		}
		GM_setValue(pref,g.prefs[pref]);
		
		g.doPref(pref);
	},
	
	doPref: function(pref) {
		switch (pref) {
			case 'blEnable':
				window.location.reload()
				break;
			case 'blDisplay':
				if (g.prefs[pref]===false) {
					GM_addStyle('ul.video-list li.hidtxt { display: none; }');
				} else {
					GM_addStyle('ul.video-list li.hidtxt { display: block; }');
				}
				break;
			case 'blRegex':
				// Regex only happens when user clicks Blacklist Domain
				break;
			default: break;
		}
	},
	
	pollBodyHeight: function() {
		// If the blacklist toggle has been kicked out, add it back in and hide the blacklist
		// Edge case, not sure why it gets kicked out sometimes.
		if ($('#showHideBlacklist').length==0) {
			g.addBlacklistToggle();
			$('div#blTop').hide();
		}
		if(!g.tempDisabled && $('ul.video-list:not(.blacklistProcessed), div#search-results:not(.blacklistProcessed)').length > 0) {	
			g.addBlackListLinks();
			g.hideResults();
		}
	},
	toggleHidden:function() {
		g.tempDisabled = g.tempDisabled ? false : true;
		$(".blUnblockListings").text(g.tempDisabled ? '(hide)' : '(show)');
		$('li.video-list-item.blocked, div.result-item.blocked').toggle(g.tempDisabled);
		
	},
	eventListeners: function() {
		// Event listeners for this script
		$('span#showHideBlacklist').live('click',g.showHideBlacklist);
		$('span#showHideBlacklist').live('mouseover',g.showHideBlacklistHover);
		$('span#showHideBlacklist').live('mouseout',g.showHideBlacklistHover);
		$('span.blLink').live('click',g.confirmation);//blacklistThisDomain
		$('span.blyes,span.blno').live('click',g.confirmation);
		$('span.blUnblockListings').live('click',g.toggleHidden);
		$('input#blAddBox').live('keyup',g.manualAdd);
		$('input#blAddBtn').live('click',g.manualAdd);
		$('span.ex').live('click',g.removeFromBlackList);
		
		$('input#addBrentsList').live('click',g.addBrentsList);
		
		$('span.blPref').live('click',g.togglePref);		
	},
	addStyles: function() {
		// Adds styles to the DOM
		GM_addStyle("div#blTop { background-color: white; z-index: 999; position: absolute; top: 31px; right: 5px; border: 1px solid black; width: 240px; padding: 0;  }");

		GM_addStyle("li.hidtxt { color: gray; font-size: 0.60em; margin: 2px 0; }");
		GM_addStyle("ul#blacklist li { list-style: none; margin: 0; padding: 1px 0 1px 0; }");
		GM_addStyle("span.ex { color: #DF0101; cursor: pointer; } ");
		GM_addStyle("span.blLink { color: #800517; cursor: pointer; display:inline !important; } ");
		GM_addStyle("span.blConfirm { color: black; display:none !important; }");
		
        GM_addStyle("span.blConfirm span.blyes { color: #D13B3B; cursor: pointer; display:inline !important;}");
        GM_addStyle("span.blConfirm span.blno { color: #0E774A; cursor: pointer; display:inline !important;}");
		
		GM_addStyle("div#blULContainer { cursor: default; height: 300px; overflow: auto; margin: 5px; position: relative;z-index: 2; background-color: #fff; }");
		GM_addStyle("div#blForm { margin-top: 5px; padding: 5px; }");

		GM_addStyle("li.hidtxt span.domain { text-decoration: line-through; }");

		GM_addStyle("div.blText { background-color: white; background-color: #C9D7F1; color: black; padding: 3px; text-align: center; font-weight: bold; }");

		GM_addStyle("span#showHideBlacklist { padding: 0 16px 0 6px; color: #3366CC !important; font-weight: bold; font-size: 13px; }");

		GM_addStyle("input#blAddBox { width: 180px; }");
		GM_addStyle("input#blAddBtn { width: 40px; }");
		GM_addStyle("div#blPrefContainer { cursor: default; background-color: white; margin: 5px; z-index: 2; }");
		GM_addStyle("ul#blPrefList li { list-style: none; margin: 0; padding: 1px 0 10px 0; }");

		GM_addStyle("span.blOn { float: right; width: 68px; height: 28px; overflow: hidden; cursor: pointer; background: transparent url("+ g.onoffData +") 0 0 no-repeat; }");
		GM_addStyle("span.blOff { float: right; width: 68px; height: 28px; overflow: hidden; cursor: pointer; background: transparent url("+ g.onoffData +") -68px 0 no-repeat; }");
		GM_addStyle("span.blDesc { font-size: 0.75em; }");
		
		GM_addStyle("div#blUpdated { margin: 3px; text-align: center; }");
	},
	saveBlacklist: function() {
		// Saves g.blacklist to greasemonkey blacklist
		GM_setValue('blacklist',g.blacklist.join(','));
	},
	addToBlackList: function(domain) {
		// Adds an entry to the blacklist
		g.blacklist.push(domain);
		g.blacklist = g.blacklist.uniq().sort();
		g.saveBlacklist();
		// Show the results first, stop duplication errors.
		$('ul.video-list, div#search-results').removeClass('blacklistProcessed');
		g.showResults();
		g.hideResults();
		g.buildList();
	},
	removeFromBlackList: function() {
		// Removes an entry from the blacklist
		var domain = $(this).parent().find('span.domain').text();
		g.blacklist = g.blacklist.remove(domain);
		g.saveBlacklist();
		// Show the results first, stop duplication errors.
		$('ul.video-list, div#search-results').removeClass('blacklistProcessed');
		$('ul.video-list .blocked, div#search-results .blocked').removeClass('blocked');
		g.showResults();
		g.hideResults();
		g.buildList();
	},
	manualAdd: function(ev) {
		// manually add a domain to the blacklist
		if ($('input#blAddBox').attr('value') == '') return;
		
		// I'm lazy, so I'm using the same function for keypress and a click
		if(ev.keyCode != 13 && $(this).attr('id')== 'blAddBox') return;

		g.addToBlackList($('input#blAddBox').attr('value'));
		$('input#blAddBox').attr('value','');
	},
	addBlackListLinks: function() {
		// Adds block links to watch-sidebar
		var tempResults = $('ul.video-list:not(.blacklistProcessed)');
		if(tempResults.length > 0) {
			$(tempResults).find('li.video-list-item:not(.blocked) a').each(function() {
				nametag = $(this).find('span.stat:first');
				if(!nametag.hasClass('username'))
				nametag.addClass('username').attr('rel',nametag.text().split(' ',2)[1]).append(' <span class="stat blLink">(Block)</span><span class="blConfirm stat">Confirm: <span class="blyes">yes</span> / <span class="blno">no</span></span>');
			});
		}
	
	    // Adds block links to search results
		var tempResults = $('div#search-results:not(.blacklistProcessed)');
		if(tempResults.length > 0) {
			$(tempResults).find('div.result-item:not(.blocked)').each(function() {
				nametag = $(this).find('div.result-item-main-content p.facets a');
				if(!nametag.hasClass('username'))
				nametag.addClass('username').attr('rel',nametag.text()).append(' <span class="stat blLink">(Block)</span><span class="blConfirm stat">Confirm: <span class="blyes">yes</span> / <span class="blno">no</span></span>');
			});
		}
		
	},
	blacklistThisDomain: function(e) {
		// Blacklist this domain, show the confirmation
		$(this).css('display','none !imporant');
		$(this).parent().find('span.blConfirm').css('display','inline !important');
		 return false;
	},
	confirmation: function() {
		// Shows confirmation for adding a domain to the list
		var domain = $(this).parents('li.video-list-item:not(.blocked)').find('span.username').attr('rel');
		
		if(domain===undefined || domain.length == 0)
			domain = $(this).parents('div.result-item:not(.blocked)').find('div.result-item-main-content p.facets a').attr('rel');
		
		if (confirm('Block '+domain+'?')) {
			domain = $.trim(domain);
			g.addToBlackList(domain);
			$(this).parents('li').text('Blocked video from '+domain);
			$(this).parents('div.result-item').text('Blocked video from '+domain);
		}

		 return false;
	},
	addBrentsList: function () {   
		 
		  $.each(g.defaultsfrombrent,function(i,key) {
			g.blacklist.push(key);
			g.blacklist = g.blacklist.uniq().sort();
		  });
		  g.saveBlacklist();
		$('ul.video-list, div#search-results').removeClass('blacklistProcessed');
		g.showResults();
		g.hideResults();
		g.buildList();
	},
	getBlacklist: function() {
		// Gets the blacklist from greasemonkey
		// Debug: for clearing out the blacklist
		// GM_setValue('blacklist','');
		// End debug
		
		
		return (GM_getValue('blacklist') ? GM_getValue('blacklist').split(',') : [] );
	},
	hideResults: function() {
		if(g.tempDisabled || $('ul.video-list:not(.blacklistProcessed), div#search-results:not(.blacklistProcessed)').length == 0)
			return;
		//Hide previously hidden results
		$('li.video-list-item.blocked, div.result-item.blocked').hide();
		// Hide the results using the blacklist.
		var tempResults = $('ul.video-list:not(.blacklistProcessed)');
		if(tempResults.length > 0) {
		$(tempResults).addClass("blacklistProcessed");
		$(tempResults).children('li.video-list-item:not(.blocked)').each(function() {
			var domain = $(this).find('span.username').attr('rel');
			var h = false;
			$.each(g.blacklist,function(i,key) {
				if (key.toLowerCase() === $.trim(domain.toLowerCase()))
					h = true;
				
			});
			if (h===true) {
			    //alert('attempting block of '+domain);
				//$(this).html('Blocked Video From: '+domain);
		            g.numHidden++;
					$(this).addClass('blocked');
                            $(this).hide();
			}
		});
		
		}
		
		
		var tempResults = $('div#search-results:not(.blacklistProcessed)');
		if(tempResults.length > 0) {
		$(tempResults).addClass("blacklistProcessed");
		$(tempResults).children('div.result-item:not(.blocked)').each(function() {
			var domain = $(this).find('div.result-item-main-content p.facets a').attr('rel');
			var h = false;
			$.each(g.blacklist,function(i,key) {
				if (key.toLowerCase() === $.trim(domain.toLowerCase()))
					h = true;
				
			});
			if (h===true) {
			    //alert('attempting block of '+domain);
				//$(this).html('Blocked Video From: '+domain);
		            g.numHidden++;
					$(this).addClass('blocked');
                            $(this).hide();
			}
		});
		
		}
		

			if(g.numHidden>0 && $('#blnum-hidden').length == 0) {
				
				$("p.num-results").append("<div id='blnum-hidden'>w/ "+g.numHidden+" blocked</div>");
				$("#watch-sidebar").find("h4").after("<div id='blnum-hidden'>w/ "+g.numHidden+" blocked</div>");
				$("#blnum-hidden").append("<span class='blUnblockListings'>(show)</span>");
			} else if(g.numHidden>0) {
				$("#blnum-hidden").html("/ "+g.numHidden+" blocked <span class='blUnblockListings'>(show)</span>");
			}
		
		
	},
	showResults: function() {
		// Shows all results
		$('li.video-list-item.blocked, div.result-item.blocked').show();
	},
	addBlacklistToggle: function() {
        $('div#masthead-utility').append(' | <span class="showBL" id="showHideBlacklist">Show Blacklist</span>');

	},
	makeBlacklistControls: function() {
		// Makes the controls for this script

		// This is moved to its own function, due to issues with google instant search.
		g.addBlacklistToggle();

		$('body').append('<div id="blTop"><div class="blText">Your Blacklist</div><div id="blULContainer"><ul id="blacklist"></ul></div><div id="blForm"></div></div>');
		
		$('div#blForm').append('<input type="text" id="blAddBox" /><input type="button" value="add" id="blAddBtn" />');
		$('div#blForm').append('<br/><input type="button" id="addBrentsList" value="Load Brent\'s Blocklist"><br/><span class="blDesc">Regular expressions are supported, do not use i or g flags.');
		
		// Preferences
		
		var prefTxt = '<span class="blPref blOn"></span>';
		$('#blTop').append('<div class="blText">Preferences</div>');
		$('#blTop').append('<div id="blPrefContainer"><ul id="blPrefList"></ul></div>');

		$('#blPrefList').append('<li id="blEnable">Blacklist Enabled'+ prefTxt +'<br/><span class="blDesc">Toggles this userscript. This will reload the page..</span></li>');		
		$('#blPrefList').append('<li id="blDisplay">Display Messages'+ prefTxt +'<br/><span class="blDesc">Shows "<span class="domain">domain</span> blacklisted" in SERP.</span></li>');
		$('#blPrefList').append('<li id="blRegex">RegEx Blocker'+ prefTxt +'<br/><span class="blDesc">Use regex to block full domain name.</span></li>');
		
		$.each(g.prefs, function(id) {
			if (this==false) {
				$('li#'+ id +' span.blPref').removeClass('blOn');
				$('li#'+ id +' span.blPref').addClass('blOff');
			}
		});
		
		$('div#blTop').hide();
				
		g.buildList();
		
	        
			if(GM_getValue('blEnable')==undefined && g.askedAlready == false) {
			g.askedAlready = true;
			if(confirm("Hello Newcomer!\nWould you like to load my suggested blocklist?\n(It blocks fred, sxephil, shanedawsontv, RayWilliamJohnson, and other annoyances)")) {
				g.addBrentsList();
			}
                        if(GM_getValue('blEnable') == undefined)
				GM_setValue('blEnable',true);

			}
			
				
	},
	buildList: function() {
		$('li.domainEntry').remove();
		
		if (g.blacklist.length==0) {
			$('ul#blacklist').append('<li class="domainEntry"><i>No entries in your list.</i></li>');
			$('ul#blacklist').append('<li class="domainEntry"><i>Click "Blacklist Domain" in the SERP or add a domain below.</i></li>');
		} else {		
			$.each(g.blacklist,function(i,key) {
				$('ul#blacklist').append('<li class="domainEntry"><span class="ex">\u2297</span> <span class="domain">'+ key +'</span></li>');
			});
		}
	},
	showHideBlacklist: function() {
		// Shows or hides the blacklist drop menu
		if (/Show/.test($('span#showHideBlacklist').text())) {
			// show the blacklist
			$('span#showHideBlacklist').html('Hide Blacklist');
			$('div#blTop').show();
		} else {
			// hide the blacklist
			$('span#showHideBlacklist').html('Show Blacklist');
			$('div#blTop').hide();
		}
	},
	showHideBlacklistHover: function(evnt) {
		if (evnt.type=='mouseover') {
			$('span#showHideBlacklist').addClass('gbgt-hvr');
		} else {
			$('span#showHideBlacklist').removeClass('gbgt-hvr');
		}
	},
	// Image from: http://www.webstuffshare.com/2010/03/stylize-your-own-checkboxes/
	onoffData: 'data:image/png;base64,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'
};

setTimeout(g.init,100);
setTimeout(g.init,250);
setTimeout(g.init,500);
setTimeout(g.init,1000);


Array.prototype.uniq = function() {
	var old = this;
	var uniq = [];
	$.each(old,function(i,key) {
		if (uniq.indexOf(key) === -1) uniq.push(key);
	});
	return uniq;
};

Array.prototype.remove = function(word) {
	var old = this;
	var out = [];
	$.each(old,function(i,key) {
		if (key===word) return;
		out.push(key);
	});
	return out;
};