// ==UserScript==
// @name           Gmail - Hide Multiple Inboxes While Off Duty
// @namespace      http://mathiasbaert.be/userscripts/gmail-hide-multiple-inboxes-between-certain-hours
// @description    This is for people who use GMail with the Labs feature "Multiple Inboxes". It adds the posibility to hide these extra inboxes for parts of the day. For instance, one could hide work related inboxes from 18:00 to 8:00 and during the weekend. Or do the opposite with entertainment related inboxes.
// @include        https://mail.google.com/mail/?ui=2&view=bsp&*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// var console = unsafeWindow.console;


var GMail = new (function(){
	initialize = function() {
		waitUntilDocumentLoaded();
	};

	var that = this;

// modules

	// A list of pages withing GMail
	// and the functions which should be ran once when that page is loaded
	this.Adaptors = {
		'inbox' : [
			function() {
				GUI.Inbox.multipleInboxes().each(function(i, el) {
					var now = new Date();
					var isWeekend = now.getDay()==0 || now.getDay()==6;
					var hour = now.getHours();
					var from = GM_getValue('mb_hmibch_'+i+'_'+(isWeekend ? 'weekend' : 'weekday')+'_from');
					var to   = GM_getValue('mb_hmibch_'+i+'_'+(isWeekend ? 'weekend' : 'weekday')+'_to');
					
					var $el = $(el);
					
					// from and to make sense
					if (from && to && (from!=to)) {
						// hide during part of day
						if (from<to) {
							if (from<=hour && hour<to) {
								$el.hide();
							} else {
								$el.show();
							}
						}
						// hide during part of night
						if (from>to) {
							if (to<=hour && hour<from) {
								$el.show();
							} else {
								$el.hide();
							}
						}
					}
					
				});
			}
		],
		'settings/lighttlist' : [
			function() {
				var table = GUI.Settings.MultipleInboxes.currentSearches();
				
				// add titles
				table.find('tr:eq(0)').append('<td>Hide on weekdays</td><td>Hide on weekends</td>');
				// add input fields
				var options = ['<option></option>'];
				for (var i=0; i<24;i++) {
					options.push('<option value="'+i+'">'+i+':00</option>')
				}
				var optionsFrom = options.join();
				options.push('<option value="24">24:00</option>')
				var optionsTo = options.join();
				table.find('tr:gt(0)').each(function(i, el) {
					$(el).append('<td><select name="mb_hmibch_'+i+'_weekday_from">'+optionsFrom+'</select> to '+
					                 '<select name="mb_hmibch_'+i+'_weekday_to">'  +optionsTo+  '</select></td>'+
					             '<td><select name="mb_hmibch_'+i+'_weekend_from">'+optionsFrom+'</select> to '+
					                 '<select name="mb_hmibch_'+i+'_weekend_to">'  +optionsTo+  '</select></td>');
				});

				// set values on inputfields from stored settings
				table.find('select').each(function(i, el) {
					var $el = $(el);
					var name = $el.attr('name');
					var value = GM_getValue(name);
					$el.val(value);
				});
				
				// add event listeners to save changes to stored settings
				table.find('select').change(function(ev) {
					$el = $(ev.currentTarget);
					var value = $el.find(':selected').attr('value');
					var name = $el.attr('name');
					GM_setValue(name, value);
				});
			}
		]
	};
	var Adaptors = this.Adaptors;

	// A collection of methods to get to specific parts of the document
	// keeping all the ugly selectors here should help with maintainability
	this.GUI = {
		'Inbox' : {
			'multipleInboxes' : function() {
				return $('.diLZtc .nH.nn > .nH:nth-child(1) > .nH');
			}
		},
		'Settings' : {
			'MultipleInboxes' : {
				'currentSearches' : function() {
					return $('.nH.r4 .r7:nth-child(1) table.cf');
				}
			}
		},
		'footer' : function() {
			var result = $('.ma');
			return result.size() ? $(result[0]) : false;
		}
	};
	var GUI = this.GUI;

// private

	var getPageName = function() {
		// the hash-part of the top url - sans hash
		return (unsafeWindow.top.document.location.href.match(/#([^#]+)$/)||{1:''})[1];
	};

	var isPageLoaded = function(page) {
		if (!GUI.footer()) {
			return false;
		}
		switch (page) {
			case 'settings/lighttlist':
				return !!GUI.Settings.MultipleInboxes.currentSearches().size();
			default :
				return true;
		}
	};

	var currentPage = '';
	
	// Idealy I'd listen to GMail events, but I couldn't find any information in the time available
	// so instead we're polling
	var controlLoop = function() {
		var page = getPageName();
		if (page && isPageLoaded(page)) {
			if (page != currentPage) {
				currentPage = page;
				if (Adaptors[page]) {
					for (var i=0; i<Adaptors[page].length; i++) {
						Adaptors[page][i]();
					}
				}
			}
		}
		setTimeout(controlLoop, 1000);
	};

	var waitUntilDocumentLoaded = function() {
		if (document.readyState != "complete") {
			setTimeout(waitUntilDocumentLoaded, 1000);
		} else {
			// GMail uses several iframes with the exact same url
			// this script shouldn't be running in the hidden iframes
			// luckily, these don't have styleSheets, so we can check for that
			if (document.styleSheets.length) {
				controlLoop();
			}
		}
	};
	
	initialize();
})();
