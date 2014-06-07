scr_meta=<><![CDATA[
// ==UserScript==
// @name			Phil's Facebook Fixer
// @namespace		http://userscripts.org/users/philiprwhitaker
// @description		Fixes Facebook to Phil's requirements
// @version			1.7
// @include			http*://*.facebook.tld/*
// ==/UserScript==
]]></>;

(function ()
{
	/**************SET ALL THINGS YOU WANT HIDDEN IN THE SIDEBAR TO TRUE*********/
	removeRequests		= false;	//default: false
	removeSuggestions	= true;		//default: true
	removeAds			= true;		//default: true
	removeHighlights	= false;	//default: false
	removeEventsBox		= false;	//default: false
	removeConnect		= true;		//default: true - removes the Connect With Friends box

	/**********SET ALL THINGs YOU WANT HIDDEN IN THE HIGHLIGHTS BOX TO TRUE******/
	removeApplications 	= true;		//default: true
	removeEvents 		= true;		//default: true
	removeGifts			= true;		//default: true
	removeGroups 		= true;		//default: true
	removeLinks 		= true;		//default: true
	removeNotes 		= true;		//default: true
	removePages 		= true;		//default: true
	removePhotos 		= false;	//default: false
	removeRelations 	= false;	//default: false
	removeVideos 		= true;		//default: true

	/***********DON'T EDIT BELOW HERE UNLESS YOU KNOW WHAT YOU'RE DOING**********/

	debug = false; //set to true to display debug messages - REMEMBER TO SWITCH OFF!!

	/**Import the latest jQuery library**/
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://code.jquery.com/jquery-latest.pack.js',
		onload: runScript
	});
	// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
	CheckScriptForUpdate =
	{
		// Config values, change these to match your script
		id: '49346', // Script id on Userscripts.org
		days: 1, // Days to wait between update checks
		name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
		version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
		time: new Date().getTime() | 0,

		call: function (response)
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/' + this.id + '.meta.js',
				headers:
				{
					'User-agent': window.navigator.userAgent,
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function (xpr)
				{
					CheckScriptForUpdate.compare(xpr,response);
				}
			});
		},

		compare: function (xpr,response)
		{
			this.xversion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
			this.xname = /\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
			if ((this.xversion != this.version) &&
					(confirm('A new version of the ' + this.xname +	' user script is available. Do you want to update?')))
			{
				GM_setValue('updated', this.time);
				GM_openInTab('http://userscripts.org/scripts/source/' + this.id + '.user.js');
			}
			else if ((this.xversion) && (this.xversion != this.version))
			{
				if (confirm('Do you want to turn off auto updating for this script?'))
				{
					GM_setValue('updated', 'off');
					GM_registerMenuCommand("Auto Update " + this.name, function()
					{
						GM_setValue('updated', new Date().getTime() | 0);
						CheckScriptForUpdate.call('return');
					});
					alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
				}
				else
				{
					GM_setValue('updated', this.time);
				}
			}
			else
			{
				if (response) alert('No updates available for ' + this.name);
				GM_setValue('updated', this.time);
			}
		},

		check: function()
		{
			if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
			if ((GM_getValue('updated', 0) != 'off') &&
					(+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))))
			{
				this.call();
			}
			else if (GM_getValue('updated', 0) == 'off')
			{
				GM_registerMenuCommand("Enable " + this.name + " updates", function()
				{
					GM_setValue('updated', new Date().getTime() | 0);
					CheckScriptForUpdate.call(true);
				});
			}
			else
			{
				GM_registerMenuCommand("Check " + this.name + " for updates", function()
				{
					GM_setValue('updated', new Date().getTime() | 0);
					CheckScriptForUpdate.call(true);
				});
			}
		}
	};

	//All the GM code must be inside this function
    function runScript(details)
	{
		if (details.status != 200)
		{
			GM_log('no jQuery found!');
			alert('no jQuery found!');
			return;
		}

		eval(details.responseText);


		jQuery.noConflict();

		if (debug) alert('Script running');

		/**Force use of a secure connection, apart from for applications**/
		/**Disabled in 1.6 until full investigation can be done into how Facebook handles links**/
		/*if (/^http:\/\//.test(location.href) && !(/^http:\/\/apps\./i.test(location.href)))
		{
			location.replace(location.href.replace(/^http:/, 'https:'));
			if (debug) alert('Connection secured');
		}

		jQuery('a').each(function (i)
		{
			var a = jQuery(this);
			var href = a.attr('href')

			if (/^http:\/\//.test(href) && !(/^http:\/\/apps\./i.test(href)))
			{
				href = href.replace(/^http:/, 'https:');
			}

			if (debug)
			{
				if (/^http:\/\//.test(href))
				{
					a.css(
					{
						background: '#FF0000'
					});
				}
				else if (/^https:\/\//.test(href))
				{
					a.css(
					{
						background: '#00FF00'
					});
				}
			}
		});*/

		/**Homepage manipulation**/
		if (/^https?:\/\/.*\.facebook\..*\/(home\.php.*|.*ref=home.*)/i.test(location.href))
		{
			if (debug) alert('Homepage manipulation started');

			if (removeRequests)		jQuery('.UIRequestBox').remove();
			if (removeSuggestions)	jQuery('#pymk_hp_box').remove();
			if (removeAds)			jQuery('#home_sponsor_nile').remove();
			if (removeConnect)		jQuery('.UIConnectWithFriends').remove();

			if (removeHighlights)
			{
				jQuery('.UIHotStream').parent().parent().remove();
			}
			else
			{
				if (removeEvents)	jQuery('.sx_icons_event').parent().parent().parent('.UIHotStory').remove();
				if (removeGifts)	jQuery('.sx_icons_gift').parent().parent().parent('.UIHotStory').remove();
				if (removeGroups)	jQuery('.sx_icons_group').parent().parent().parent('.UIHotStory').remove();
				if (removeLinks)	jQuery('.sx_icons_post').parent().parent().parent('.UIHotStory').remove();
				if (removeNotes)	jQuery('.sx_icons_note').parent().parent().parent('.UIHotStory').remove();
				if (removePages)	jQuery('.sx_icons_fbpage').parent().parent().parent('.UIHotStory').remove();
				if (removePhotos)	jQuery('.sx_icons_photo').parent().parent().parent('.UIHotStory').remove();
				if (removeVideos)	jQuery('.sx_icons_motion').parent().parent().parent('.UIHotStory').remove();

				if (removeRelations)
				{
					//got into a relationship
					jQuery('sx_icons_relationship').parent().parent().parent('.UIHotStory').remove();
					//broke up
					jQuery('sx_icons_relationship_remove').parent().parent().parent('.UIHotStory').remove();
				}

				if (removeApplications == true)
				{
					jQuery('.UIHotStory_Body:contains("this application.")').parent().remove();
				}
			}

			if (removeEventsBox)
			{
				jQuery('.UIUpcoming').parent().parent().remove();
			}
			else
			{
				//Move the homepage Events to the top of the sidebar (the Filter will go above it later)
				if ((sidebar = jQuery('#home_sidebar')) &&
						(events = jQuery('.UIUpcoming').parent().parent()))
				{
					events.prependTo(sidebar);
				}

				jQuery('.UIUpcoming_Item:contains("\'s birthday"):contains("Today")').css(
				{
					fontWeight: 'bold',
					background: '#FFFE88'
				});
			}

			//Moves the homepage Filter list to the top of the right-hand sidebar
			if ((sidebar = jQuery('#home_sidebar')) && (filter = jQuery('.UIFilterList')))
			{
				filter.prependTo(sidebar);
				//Make main panel wider to fill the space left by moving the Filter list
				jQuery('#home_stream').css({width: 'auto'});
			}
		}
		else
		{
			if (debug) alert(location.href + ' does not match the regex');
		}

		/**All page manipulation**/
		if (debug) alert('All page manipulation started');

		//Make the menu bar float down the screen as you scroll, except on login & public pages
		var exclusions = [new RegExp('^https?:\/\/.*\.facebook\.*\/$', 'i'),
							new RegExp('^https?:\/\/.*\.facebook\.*\/login*', 'i'),
							new RegExp('^https?:\/\/.*\.facebook\.*\/index*', 'i'),
							new RegExp('^https?:\/\/.*\.facebook\.*\/people*', 'i')]

		var fixedMenuBar = false;

		for (var y = 0; y < exclusions.length; y++)
		{
			if (exclusions[y].test(location.href))
			{
				if (debug) alert(exclusions[y]);
				if (debug) alert('Menu bar fixed position');
				fixedMenuBar = true;
				break;
			}
		}

		if (!fixedMenuBar)
		{
			if (debug) alert('Menu bar floated position');

			jQuery('#menubar_container').css(
			{
				background: 'none',
				position: 'fixed',
				width: '100%',
				zIndex: '1000'
			});

			jQuery('#fb_menubar').css(
			{
				margin: '0 auto',
				position: 'relative'
			});
		}

		//Remove the sidebar ads and expand the tab canvas to fill in the gap
		if (sidebarAds = jQuery('#sidebar_ads'))
		{
			if (debug) alert('removing sidebar ads');
			sidebarAds.remove();
			jQuery('#tab_canvas').css({marginLeft: '0px', marginRight: '0px', width: 'auto'});
		}
		else
		{
			if (debug) alert('no sidebar ads found');
		}

		if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
	}
})()
