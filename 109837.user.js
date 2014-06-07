// ==UserScript==
// @name           Facebook Beautifier
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @author         Matthew Leverton 
// ==/UserScript==

 
Object.extend = function(d, s) 
{
  for (var i in s) d[i] = s[i];
  return d;
};

Object.extend(String.prototype, {
	trim: function() { return this.replace(/^\s+|\s+$/g,""); }
});

if (!document.getElementsByClassName)
{
	document.getElementsByClassName = function(className, parent)
	{
		var q = ".//*";
		className.trim().split(/\W+/).forEach(function(c) 
		{
			q += "[contains(concat(' ', @class, ' '), ' " + c + " ')]";
		});
		return fbb.xpath(q, parent);
	};
}

// source: http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

// FBApp Constructor. This is private. Use FBApp.new(id) instead.
function FBApp(id)
{
	this.id = id;
}

// Static Functions
Object.extend(FBApp,
{
	// These are the default applications that are enabled.
	// They can still be deleted by the user (unless they have no icon).
	defaultApps: 
	{
		2341989679: true, /* minifeed */
		2327158227: true, /* information */
		2297529396: true, /* education and work */
		2386512837: true, /* gifts */
		2719290516: true, /* the wall */
		2407511955: true, /* mutual friends */
		2356318349: true, /* friends */
		2503140832: true, /* friends in other networks */
		2305272732: true, /* photos */
		2347471856: true, /* notes */
		2361831622: true, /* groups */
		2309869772: true  /* posted items */				
	},
	
	init: function()
	{
		// create a list of enabled apps from the default list.
		FBApp.enabledApps = {};
		for (var i in FBApp.defaultApps) FBApp.enabledApps[i] = FBApp.defaultApps[i];
		
		// load the saved settings: app0 is the list of applications we want to see, and app1 is the list of 
		// applications that we don't want to. The app1 list is only useful because by default we enable a 
		// few Facebook applications.		
		(GM_getValue(fbb.myId + "_app0")||'').split(',').forEach(function(app_id) { FBApp.enabledApps[app_id] = true; });
		(GM_getValue(fbb.myId + "_app1")||'').split(',').forEach(function(app_id) { FBApp.enabledApps[app_id] = false; });
		
		FBApp.appHash = {};
		FBApp.appArray = [];
	},
	
	'new': function(id)
	{
		if (FBApp.appHash[id]) return FBApp.appHash[id];
		
		var app = new FBApp(id);		
		FBApp.appHash[id] = app;
		FBApp.appArray.push(app);	
		return app;
	},
	
	// adds the given application to the block list
	block: function(app_id)
	{
		var domain = document.location.href.match(/\/\/(.+)\//)[1];
		
		if (!app_id || !domain) return;
		
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://' + domain + '/apps/block.php?id=' + app_id + '&action=block',
			headers: { 'User-Agent': window.navigator.userAgent, 'Accept': 'text/html' },
			onload: function(res)
			{
				var m;
				if(res.status == 200 && (m = /name="post_form_id" value="(\w+)"/.exec(res.responseText)))
				{							
					GM_xmlhttpRequest(
				  {
				    method: 'POST',
				    url: 'http://' + domain + '/apps/block.php?id=' + app_id + '&action=block',
				    headers: { 'User-Agent': window.navigator.userAgent, 'Accept': 'text/xml', 'Content-Type': 'application/x-www-form-urlencoded' },
				    data:'post_form_id=' + m[1] + '&save=1'
				  });
				}
			}
		});
	},
	
	all: function()
	{
		return FBApp.appArray;
	},
	
	find: function(id)
	{
		return FBApp.appHash[id];
	},
	
	isEnabled: function(id)
	{
		if (fbb.settings.defaultHide)
			return FBApp.enabledApps[id] == true;
		else
			return FBApp.enabledApps[id] == undefined || FBApp.enabledApps[id] == true;
	}
});

// Class Methods
Object.extend(FBApp.prototype,
{
	profileInit: function()
	{
		var self = this;
		
		this.icon = document.getElementById("icon_app" + this.id);
		this.div = document.getElementById("box_app_" + this.id);
		
		// add the javascript code needed to reenable apps
		if (this.icon)
		{
			var foo = unsafeWindow.document.getElementById("icon_app" + this.id).getElementsByTagName("A")[0];
			foo.onclick = function() {};
			
			a = this.icon.getElementsByTagName("A")[0];
			a.addEventListener('click', function(event)
			{
				// make sure the box is visible
				if (!fbb.fullMode && !self.isEnabled())
				{
					self.setDefault(true).show();
					fbb.saveSettings();
				}
				else
				{
					if (!self.extendedProfile)
					{
						self.div.className = self.div.className.replace("flex_shut", "flex_open");
						unsafeWindow.make_header_blue(self.id);
						unsafeWindow.animate_scroll_to_id('a_'+self.id, self.id);
						//unsafeWindow.profile_app_switcher_select('a_'+self.id,self.id);
					}
				}
					
				event.preventDefault();
				event.cancelBubble = true;		
				return false;
			}, false); 
		
		
			// Add the close button to every application that has an icon.
			if (!this.div)
			{
				this.extendedProfile = true;
				this.title = "Unknown Application";
			}
			else
			{
				this.extendedProfile = false;
				
				var tr = fbb.xpath(".//table[@class='head_table']/tbody/tr", this.div);
				if (tr)
				{
					var td = document.createElement("TD");
					td.width = "16";
					td.className = "delete_app";
					
					var a = document.createElement("A");
					a.href= "#";
					a.className = "box_remove icon box_action app_id_" + this.id;
					a.title = "Hide this Facebook Application.";
					td.appendChild(a);
					tr[0].appendChild(td);
					a.addEventListener('click', fbb.onDeleteApp, true);
										
					td = document.createElement("TD");
					td.className = "favorite_app";
					
					var img = document.createElement("IMG");
					img.id =  "star_" + this.id;
					img.style.cursor = "pointer";
					img.src = "http://www.matthewleverton.com/fbb/star" + (this.isEnabled() ? "" : "-blank") + ".png";
					img.addEventListener('mouseover', fbb.onStar_MouseOver, true);
					img.addEventListener('mouseout', fbb.onStar_MouseOut, true);
					img.addEventListener('click', fbb.onStar_Click, true);
					td.appendChild(img);
					
					tr[0].appendChild(td);
				}
				
				this.actionLink = document.getElementById('action_app_' + this.id);
				this.icon = document.getElementById("icon_app" + this.id);
				this.title = document.getElementById("title_app_" + this.id).textContent;
			}
			
			if (FBApp.isEnabled(this.id))
				this.show();
			else
				this.hide();
		}
	},
	
	getIcon: function() {	return this.icon;	},
	
	getIconURL: function()
	{
		if (this.iconURL == undefined)
		{
			this.iconURL = !this.icon ? null : /url\((.+)\)/.exec(this.icon.getElementsByTagName("A")[0].style.backgroundImage)[1];
		}
		return this.iconURL;
	},
	
	getTitle: function() { return this.title;	},	
	getActionLink: function() { return this.actionLink;	},
	getContainer: function()	{ return this.div;},	
	getId: function() { return this.id; },	
	isEnabled: function() { return FBApp.isEnabled(this.id); },
	
	setDefault: function(enabled)
	{
		FBApp.enabledApps[this.id] = enabled;
		if (!this.extendedProfile) document.getElementById("star_" + this.id).src = "http://www.matthewleverton.com/fbb/star" + (enabled ? "" : "-blank") + ".png";
		return this;
	},
	
	show: function()
	{
		if (this.extendedProfile)
		{
			var profile_id = /id=(\d+)/.exec(document.location.href)[1];
			var domain = document.location.href.match(/\/\/([^/]+)\//)[1];
			var form_id = document.getElementById('post_form_id').value;
			
			var delayedBoxes = unsafeWindow.ProfileHiddenBoxes.singleton.delayedBoxes;
			var i = 0;
			while (delayedBoxes[i].app_id != this.id && ++i < delayedBoxes.length) {}
			if (i == delayedBoxes.length) return false;
			
			var profile_boxes = encodeURIComponent(unsafeWindow.JSON.encode([delayedBoxes[i]]));
			var self = this;
						
	
			GM_xmlhttpRequest({
				method: "POST",
				headers: { 'User-Agent': window.navigator.userAgent, 'Accept': 'text/xml', 'Content-Type': 'application/x-www-form-urlencoded' },
				url: "http://" + domain + "/ajax/profile_boxes_fetch.php",
				data:	"owner_id=" + profile_id + "&post_form_id=" + form_id + "&profile_boxes=" + profile_boxes,
				onload: function (resp)
				{
					if (resp.responseText.substr(0,9) == "for (;;);")
					{
						var resp = eval("("+resp.responseText.substr(9)+")");
						
						var divContainer = document.createElement("div");
						divContainer.innerHTML = resp.payload.htmls[delayedBoxes[i].app_id];
						document.getElementById(delayedBoxes[i].profile_box_column ? "moveable_narrow" : "moveable_wide").appendChild(divContainer);
						self.profileInit();
					}
				}
			});
			
			/* request.setHandler(bind(this, function (asyncResponse) {var payload = asyncResponse.payload;var style = payload.style;if (style) {var style_container = ge("style_container_for_hidden_boxes");style_container.innerHTML = "<span style=\"display:none\">&nbsp</span><style>" + style + "</style>";}var htmls = payload.htmls;var length = this.delayedBoxes.length;for (var i = 0; i < length; i++) {var delayedBox = this.delayedBoxes[i];var appId = delayedBox.app_id;var section_html = htmls[appId];if (section_html !== undefined) {delayedBox.section_html = section_html;}}this.render(onCompletedCallback);}));*/
		}
		else
		{
			this.div.style.display = "";
		}
		
		var icon = this.getIcon();
		if (icon) icon.getElementsByTagName("A")[0].style.opacity = "1.0";
		
		if (this.actionLink) this.actionLink.style.display = "";
		if (this.wallButton) this.wallButton.style.display = "";
		
		return this;
	},
	
	hide: function()
	{
		// hide the application
		if (!this.extendedProfile) this.div.style.display = "none";
			
		// gray out its icon
		var icon = this.getIcon();
		if (icon) icon.getElementsByTagName("A")[0].style.opacity = "0.15";
		
		if (this.actionLink) this.actionLink.style.display = "none";
		if (this.wallButton) this.wallButton.style.display = "none";
		
		return this;
	}
});
 
var fbb = 
{
	version: 3,
		
	fullMode: false,
	
	settings: {
		defaultHide: true,
		hideMinifeed: true,
		ignoreRequests: true,
		searchLinks: true,
		disableAds: true,
		remoteSettings: false,
		remoteKey: ""
	},
	
	// This xpath function was taken from the GM wiki documentation and modified slightly.
	xpath: function(p, context)
	{
		try
		{
			if (!context) context = document;
			var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
			return arr;
		}
		catch (e)
		{
			// console.log("Bad xpath expression: " + p);
			return [];
		}
	},
	
	// init is called on every page view. 
	init: function(event)
	{
		fbb.myId = 0;

		// figure out what our facebook id is		
		var profileLink = fbb.xpath(".//a[contains(@class, 'profile_link')]", document.getElementById("navigator"));
		if (profileLink)
		{
			var m = /id=(\d+)/.exec(profileLink[0]);
			if (m) fbb.myId = m[1];
		}
		
		FBApp.init();
		
		// if logged in, show the settings link
		if (fbb.myId)
		{
			var liSettings = document.createElement("LI");
			var a = document.createElement("A");
			a.style.cursor = "pointer";
			a.innerHTML = "Facebook Beautifer Settings";
			a.addEventListener('click', fbb.showSettingsDialog, true);
			liSettings.appendChild(a);
			var nav = document.getElementById("nav_unused_3");
			if (nav) nav.appendChild(liSettings);
		}
		
		fbb.loadSettings();
		
		// jump to the appropriate clean-up function
		switch (true)
		{
			case (/facebook.com\/profile.php/.test(document.location)):
				return fbb.xpath("//a[@href='editprofile.php?basic']").length
					? null                          // Let's not touch the user's own profile, but 
					: fbb.cleanProfilePage(); // we DEFINITELY want to scrub up all the other ones.
									
			case (/facebook.com\/home.php/.test(document.location)):
				return fbb.cleanHomePage();
				
			case (/facebook.com\/minifeed.php/.test(document.location)):
				return fbb.cleanMiniFeedPage();			
		}
		
	},
	
	globalCleanup: function()
	{
		if (fbb.settings.searchLinks)
		{
			fbb.xpath("//a[contains(@href, '/s.php')][contains(@href, 'id=')]").forEach(function(a)
			{
				a.style.color = "black";
			});
		}
		
		if (fbb.settings.disableAds)
		{
			var ad = document.getElementById("ssponsor");
			if (ad) ad.parentNode.removeChild(ad);
		}
	},
	
	cleanHomePage: function()
	{
		// Remove trash from the news feed.
		var div = document.getElementById('home_main');
		var r = /app_id=(\d+)/;
		fbb.xpath(".//div[contains(@class, 'feed_icon')]/a", div).forEach(function(a)
		{
			if ((m = r.exec(a.href)) && !FBApp.isEnabled(m[1]))
			{
				while (a.parentNode && (a = a.parentNode).id.substr(0,9) != 'div_story') {}
				if (a) a.parentNode.removeChild(a);
			}
		});
		
		// hide any sponsered ads
		if (fbb.settings.disableAds)
		{
			fbb.xpath(".//div[contains(@class, 'social_ad')]", div).forEach(function(ad)
			{
				ad.parentNode.removeChild(ad);
			});
		}
		
		if (fbb.settings.ignoreRequests)
		{
			// automatically ignore new application invitations
			var divRequestBox = document.getElementsByClassName("sidebar_item requests", document.getElementById("home_sidebar"))[0];
			if (divRequestBox)
			{
				var divBody = document.getElementsByClassName("sidebar_item_body", divRequestBox)[0];
				while (divBody.childNodes.length) divBody.removeChild(divBody.childNodes[0]);
				
				var span = document.createElement("span");
				span.id = "other_requests_sidebar";
				span.innerHTML = '<a class="other_requests_sidebar" href="/reqs.php"><span id="other_requests_sidebar_text">Checking requests...</span></a></span>';
				divBody.appendChild(span);
				
				fbb.ignoreRequests();			
			}		
		}
	},
	
	cleanMiniFeedPage: function()
	{
		if (fbb.settings.hideMinifeed) fbb.cleanMiniFeed();
	},
	
	cleanProfilePage: function()
	{
		var profile_id = /id=(\d+)/.exec(document.location.href)[1];
		
		// figure out which applications might be on this page.
		fbb.xpath("//div[contains(@id,'box_app_')]").forEach(function(div)
		{
			FBApp.new(div.id.replace('box_app_',''));
		});	
		
		fbb.xpath("//div[@id='profilenarrowcolumn']//div[@class='icon_container']").forEach(function(div)
		{
			FBApp.new(div.id.replace('icon_app',''));
		});
		
				// enable the "extended" profile
		// unsafeWindow.toggle_profile_apps_link(true,false);		
		document.getElementById('toggle_profile_apps_link_narrow').style.display = "none";
		document.getElementById('toggle_profile_apps_link_wide').style.display = "none";
				
		GM_addStyle("td.favorite_app { display: none; padding: 1px 0 0 4px; width: 14px; }");
		
		// add link to full profile	
		fbb.addProfileLink("View Full Profile", "toggleDisplayLink", fbb.onToggleViewMode);
		fbb.addSecondaryLink("View Full Profile", "toggleDisplaySecLink", fbb.onToggleViewMode, "#footer");
		fbb.addSecondaryLink("Edit Default Applications", "changeApp", fbb.onChangeApplications);

		// Attachment links require an "expensive" and indirect query so lets just do them all at once:
		var r = /\/(\d+)\/app/;
		fbb.xpath(".//div[@class='attachment_link']/a/span", document.getElementById("attachment_buttons_list")).forEach(function(span)
		{
			var m = r.exec(span.style.backgroundImage);
			if (m && FBApp.appHash[m[1]]) FBApp.appHash[m[1]].wallButton = span.parentNode.parentNode;
		});
		
		FBApp.all().forEach(function(app)
		{		
			app.profileInit();
		});
		
		// delete stories from mini-feed
		if (fbb.settings.hideMinifeed)
		{
			var stories = fbb.cleanMiniFeed();
			try { // there may not be any stories to begin with
				document.getElementById("mf_story_count_string").innerHTML = stories + (stories == 1 ? " story" : " stories");
			} catch (e) {}
		}
	},
	
	// Appends a link on the profile page, under the picture. 
	addProfileLink: function(text, id, proc)
	{
		var a = document.createElement("A");
		a.addEventListener('click', proc, true);
		
		var div = document.createElement("DIV");
		div.id = id;
		div.className = "holder";
		div.innerHTML = text;
		a.appendChild(div); // why is the <div> inside the <a> ?
		document.getElementById('profileActions').appendChild(a);			
		
		return div;
	},
	
	addSecondaryLink: function(text, id, proc, href)
	{
		var ul = document.getElementById('profileActionsSecondary').getElementsByTagName('UL')[0];
		
		var i = ul.childNodes.length;
		while (i > 0 && ul.childNodes[i-1].className != "") --i;
		var beforeNode = ul.childNodes[i];
		
		var li = document.createElement('LI');
		li.innerHTML = "<span class='pipe'>|</span>";
		ul.insertBefore(li, beforeNode);	
		
		li = document.createElement('LI');
		li.id = id;
		var a = document.createElement('A');
		a.innerHTML = text;
		if (href) a.href = href; else a.style.cursor = "pointer";
		a.addEventListener('click', proc, true);		
		li.appendChild(a);
		ul.insertBefore(li, beforeNode);		
	},
	
	checkVersion: function()
	{
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://www.matthewleverton.com/fbb/version",
			onload: function(details)
			{
				if(details.responseText > fbb.version)
				{
					var dialog = new unsafeWindow.pop_dialog("version");
					
					var html = "<div>There is a newer version of Facebook Beautifier available. It is possible that " +
					"you need to update in order to keep it working.<br /><br /><a href='http://www.matthewleverton.com/fbb/'>Visit " +
					"the website</a> for more details.</div>";
					
					dialog.show_choice("Facebook Beautifier", html, "Close", fbb.onCancelDialog);
					
					fbb.dialog = dialog;
				}
			}
		});
		
		createCookie('checkVersion', true, 1);
	},
	
	// Amazingly, Facebook uses the same (close enough) HTML for the mini-feed in both the profile
	// and the separate mini-feed page! This function is shared by the respective clean*Page functions.
	cleanMiniFeed: function()
	{
		var minifeed = document.getElementById('minifeed');
		
		// remove any stupid stories from the feed
		var r = /app_id=(\d+)/;
		fbb.xpath(".//div[contains(@class, 'icon')]/a", minifeed).forEach(function(a)
		{
			if ((m = r.exec(a.href)) && !FBApp.isEnabled(m[1]))
			{
				while (a.parentNode && (a = a.parentNode).id.substr(0,6) != 'story_') {}
				if (a) a.parentNode.removeChild(a);
			}
		});
		
		// clean up the empty date headers, etc		
		var prev = null;
		var stories = 0;
		
		fbb.xpath("./div", minifeed).forEach(function(div) 
		{
			if (div.className == "date_divider" || div.className.indexOf("close_bumper") != -1)
			{
				if (prev) minifeed.removeChild(prev);
				prev = div;
			}
			else if (prev)
			{
				div.className += " no_border";
				prev = null;
			}
			
			if (div.id.indexOf("story_") == 0) stories++;
		});
		
		return stories;
	},
		
	// Ignores all requests from hidden applications
	ignoreRequests: function()
	{
		var domain = document.location.href.match(/\/\/([^/]+)\//)[1];
		
		GM_xmlhttpRequest({
			method:"GET",
			headers: { 'User-Agent': window.navigator.userAgent, 'Accept': 'text/xml' },
			url:"http://" + domain + "/reqs.php",
			onload: function(details)
			{
				var form_id = details.responseText.match(/name="post_form_id" value="([0-9a-f]+)"/)[1];
				var numReq = details.responseText.match(/confirm_boxes/g).length;
				var appReq = details.responseText.match(/click_add_platform_app\(.*?\)/gm);
				
				if (appReq)
				{
					appReq.forEach(function(m)
					{
						var req_id,app_id,from_id,is_invite,url;
						[req_id,app_id,from_id,is_invite,url] = m.match(/\((.*)\)/)[1].split(',');
						if (url == "null" && !FBApp.isEnabled(app_id.trim()))
						{	
							numReq--;
							
							FBApp.block(app_id);
							
							GM_xmlhttpRequest({
								method: "POST",
								headers: { 'User-Agent': window.navigator.userAgent, 'Accept': 'text/xml', 'Content-Type': 'application/x-www-form-urlencoded' },
								url: "http://" + domain + "/ajax/reqs.php",
								data:	"type=platform_request&req_id=" + req_id.trim() + "&ignore=true&from_id=" + from_id.trim() +
								"&status_div_id=&app_id=" + app_id.trim() + "&num_reqs=0&is_invite=" + is_invite.trim() +
								"&post_form_id=" + form_id								
							});
						}
					});
				}
				
				if (numReq < 0) numReq = 0;
				var spanReq = document.getElementById("other_requests_sidebar_text");
				if (spanReq) spanReq.innerHTML = "You have <strong>" + numReq + "</strong> request" + (numReq != 1 ? "s." : ".");
			}
		});
	},
	
	// Loads the settings
	loadSettings: function()
	{
		var foo = {
			default_hide: "defaultHide",
			hide_minifeed: "hideMinifeed",
			ignore_requests: "ignoreRequests",
			search_links: "searchLinks",
			disable_ads: "disableAds",
			remote_settings: "remoteSettings",
			remote_key: "remoteKey"
		}
		
		for (var i in foo)
		{
			if (GM_getValue(fbb.myId + "_" + i) != undefined)
				fbb.settings[foo[i]] = GM_getValue(fbb.myId + "_" + i);
		}
		
		if (fbb.settings.remoteSettings && !readCookie('loadedRemoteApps'))
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://www.matthewleverton.com/fbb/load?user_id=" + fbb.myId + "&key=" + encodeURIComponent(fbb.settings.remoteKey),
				onload: function(details)
				{
					var settings; eval("settings = " + details.responseText);
					if (settings)
					{
						FBApp.enabledApps = settings.apps;
						fbb.saveSettings();
					}
				}
			});			
			createCookie('loadedRemoteApps', true);
		}
	},
	
	// Saves the current settings 
	saveSettings: function()
	{
		// app0: default applications to hide
		// app1: non-default applications to show
		var app0 = [], app1 = [];
		for (var i in FBApp.enabledApps) (FBApp.enabledApps[i] ? app0 : app1).push(i);
		
		// save to a setting for this user
		GM_setValue(fbb.myId + '_app0', app0.toString());
		GM_setValue(fbb.myId + '_app1', app1.toString());		
		
		// save settings remotely
		if (fbb.settings.remoteSettings)
		{
			GM_xmlhttpRequest({
				method:"POST",
				url:"http://www.matthewleverton.com/fbb/save",
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: "user_id=" + encodeURIComponent(fbb.myId) + 
					"&key=" + encodeURIComponent(fbb.settings.remoteKey) +
					"&a0=" + encodeURIComponent(app0.toString()) +
					"&a1=" + encodeURIComponent(app1.toString()),
			});
		}
	},

	showSettingsDialog: function()
	{
		if (fbb.dialog) return;
		
		var dialog = new unsafeWindow.pop_dialog("settings");
		
		var html = "";
		
		if (GM_getValue(fbb.myId + "_installed") == undefined)
			html = "<div>Facebook Beautifier is successfully installed!</div>";
		
		html += "<div>Review the settings and press the &ldquo;Save settings&rdquo; button when finished." +
			"<input type='text' style='width: 1px; border: none;'; />" +		
			
			"<div style='max-height: 300px; overflow: auto; margin: 8px; padding: 8px; border: dashed #ccc 1px;'>" +
			"<table width='100%' id='settingsTable'><tbody>" +
			"<tr><td valign='top' width='16'><input id='hide_apps' type='checkbox' value='1' " + 
			(fbb.settings.defaultHide ? "checked='checked'" : "") + "/></td>" +
			"<td><label for='hide_apps'>Hide unknown 3rd party applictions</label> <b>&mdash; Recommended!</b>" +
			"<p>Any application that you have not explicitly allowed will be hidden by default. You can " +
			"enable applications on a person's &ldquo;Full Profile&rdquo; by clicking on their stars.</p></td></tr>" +
			
			"<tr><td valign='top'><input id='hide_feed' type='checkbox' value='1' " +
			(fbb.settings.hideMinifeed ? "checked='checked'" : "") + "/></td>" +
			"<td><label for='hide_feed'>Hide minifeed items for disabled applications</label>" +
			"<p>Any item that originates from a disabled application will not be displayed.</p></td></tr>" +
			
			"<tr><td valign='top'><input id='ignore_requests' type='checkbox' value='1' " +
			(fbb.settings.ignoreRequests ? "checked='checked'" : "") + "/></td>" +			
			"<td><label for='ignore_requests'>Ignore requests from disabled applications</label>" +
			"<p>All invitations and requests from disabled applications will automatically be ignored. The " +
			"applications will be added to your Facebook block list.</p></td></tr>" +
			
			"<tr><td valign='top'><input id='black_links' type='checkbox' value='1' " +
			(fbb.settings.searchLinks ? "checked='checked'" : "") + "/></td>" +
			"<td><label for='black_links'>Turn profile search links into normal text</label>" +
			"<p>Links to hidden profiles direct you to a search page. This setting will make those links "+
			"look like regular text so you'll know when you can view someone's profile.</p></td></tr>" +
			
			"<tr><td valign='top'><input id='disable_ads' type='checkbox' value='1' " +
			(fbb.settings.disableAds ? "checked='checked'" : "") + "/></td>" +
			"<td><label for='disable_ads'>Hide Advertisements</label>" +
			"<p>Advertisements and sponsored links will be hidden.</p></td></tr>"+
			
			"<tr><td valign='top'><input id='remote_settings' type='checkbox' value='1' " +
			(fbb.settings.remoteSettings ? "checked='checked'" : "") + "/></td>" +
			"<td><label for='remote_settings'>Remember my settings on multiple computers</label>" +
			"<p>Your settings will be stored on a remote website so the allowed applications are the same regardless " +
			"of which computer you use (as long as it has Facebook Beautifier installed). Your Facebook " +
			"ID (a number) and your settings will be sent to the website. Your ID will not be shared with " +
			"anyone.</p>" +
			"<p>Secret word: <input type='text' id='remote_key' value='" + fbb.settings.remoteKey.replace("'", "&#039;") + "' /></p>" +
			"<p>The secret word is optional. It will prevent unauthorized changes your Facebook Beautifier settings. " +
			"<b>Please do not use your Facebook or any other important password!</b></p></td>" +
			"</tbody></table></div>";
		
		dialog.show_choice("Facebook Beautifier Settings", html, "Save Settings", fbb.onSaveSettings, "Cancel", fbb.onCancelDialog);
		
		fbb.dialog = dialog;
	},
	
	// Called when the user clicks the "change allowed applications" link
	onChangeApplications: function(e)
	{
		if (fbb.dialog) return;
		
		var dialog = new unsafeWindow.pop_dialog("change_applications");
		
		var html = '<div>Mark the applications you want displayed on the default, clean profile. ' +
			'Anything that you do not select will be hidden by default.</div>';
		
		html += "<div style='max-height: 300px; overflow: auto; margin: 8px; padding: 8px; border: dashed #ccc 1px;'>";
		html += "<table width='100%' id='defaultApplicationTable'><tbody>";
		
		var i = false;
		FBApp.all().forEach(function(app) 
		{
			var icon = app.getIconURL();
			if (icon)
			{
				if ((i = !i)) html += "<tr>";
				
				html += "<td width='16'>" + (icon ? "<img src='" + icon + "' />" : "") + "</td>";
				html += "<td width='16'><input id='chk_" + app.getId() + "' type='checkbox'";
				if (app.isEnabled()) html += " checked='checked'";
				html += " /></td>";									
				html += "<td><label for='chk_" + app.getId() + "'>" + app.getTitle() + "</label></td>"
				
				if (!i) html += "</tr>\n";
			}
		});
		if (i) html += "</tr>";
		html += "</tbody></table></div>";
		
		dialog.show_choice("Edit Default Applications", html, "Save Settings", fbb.onSaveDefaultApplications, "Cancel", fbb.onCancelDialog);
		
		fbb.dialog = dialog;
	},
	
	// Called when the user clicks the Save Settings button on the Set Default Application dialog
	onSaveDefaultApplications: function(e)
	{
		fbb.xpath('./tbody/tr/td/input', document.getElementById("defaultApplicationTable")).forEach(function(input)
		{
			var app_id = input.id.substr(4);
			var app = FBApp.find(app_id);
			
			if (!input.checked && app.isEnabled()) 
				app.setDefault(false).hide();				
			else if (input.checked && !app.isEnabled())
				app.setDefault(true).show();	
		});
		fbb.saveSettings();
		
		fbb.dialog.hide();
		fbb.dialog = null;
	},
	
	// Called when the user clicks the Save Settings button on the settings dialog
	onSaveSettings: function(e)
	{
		GM_setValue(fbb.myId + "_default_hide", document.getElementById("hide_apps").checked);
		GM_setValue(fbb.myId + "_hide_minifeed", document.getElementById("hide_feed").checked);
		GM_setValue(fbb.myId + "_ignore_requests", document.getElementById("ignore_requests").checked);
		GM_setValue(fbb.myId + "_search_links", document.getElementById("black_links").checked);
		GM_setValue(fbb.myId + "_disable_ads", document.getElementById("disable_ads").checked);
		GM_setValue(fbb.myId + "_remote_settings", document.getElementById("remote_settings").checked);
		GM_setValue(fbb.myId + "_remote_key", document.getElementById("remote_key").value);
		
		GM_setValue(fbb.myId + "_installed", fbb.version);
		
		fbb.loadSettings();
		
		fbb.dialog.hide();
		fbb.dialog = null;
	},
	
	onCancelDialog: function(e)
	{
		fbb.dialog.hide();
		fbb.dialog = null;
	},
	
	// Called when the user clicks the X button. 
	onDeleteApp: function(e)
	{
		var app_id = /(\d+)$/.exec(e.target.className)[1];
		var div = document.getElementById('box_app_'+app_id);
		if (div)
		{
			FBApp.find(app_id).setDefault(false).hide();
			fbb.saveSettings();
		}
				
		e.preventDefault();
		e.cancelBubble = true;		
		return false;
	},
	
	onStar_Click: function(event)
	{
		var app_id = event.target.id.substr(5);
		var app = FBApp.find(app_id);
		app.setDefault(!app.isEnabled());
		fbb.saveSettings();
		event.preventDefault();
		event.cancelBubble = true;
		return false;
	},
	
	onStar_MouseOver: function(event)
	{
		var app_id = event.target.id.substr(5);
		var app = FBApp.find(app_id);
		event.target.title = app.isEnabled() ? "Remove Application from Default View" : "Add Application to Default View";
	},
	
	onStar_MouseOut: function(event)
	{
		var app_id = event.target.id.substr(5);
		var app = FBApp.find(app_id);		
	},
	
	// called when the user clicks on the View Full / Basic Profile link
	onToggleViewMode: function()
	{
		fbb.fullMode = !fbb.fullMode;

		// update the application boxes
		FBApp.all().forEach(function(app) 
		{
			app[fbb.fullMode || app.isEnabled() ? 'show' : 'hide']();
		});
		
		GM_addStyle("td.favorite_app { display: " + (fbb.fullMode ? "table-cell" : "none")  + "; } ");
		GM_addStyle("td.delete_app { display: " + (!fbb.fullMode ? "table-cell" : "none")  + "; } ");
	
		// Since Facebook uses bad HTML for the Display Links, we have to use .textContent instead of .innerHTML
		//   otherwise FireFox changes things up on us.
		document.getElementById("toggleDisplayLink").textContent = fbb.fullMode ? "Back to Clean Profile" : "View Full Profile";
		document.getElementById("toggleDisplaySecLink").firstChild.innerHTML = fbb.fullMode ? "Back to Clean Profile" : "View Full Profile";
				
		return false;
	}	
	
};

// run the script!
try {
	if (!readCookie('checkVersion')) fbb.checkVersion();
	
	fbb.init();
	fbb.globalCleanup();
	if (fbb.myId && (
			GM_getValue(fbb.myId + "_installed") == undefined || 
			GM_getValue(fbb.myId + "_installed") != fbb.version
	)) fbb.showSettingsDialog();	
	document.body.addEventListener('DOMNodeInserted', fbb.globalCleanup, true);	
} catch (e) {
	// console.log(e);
}