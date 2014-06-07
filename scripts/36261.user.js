// ==UserScript==
// @name			Add Torrents To wTorrent (v2.6)
// @namespace		http://www.brooksworks.com
// @description		Let's you download torrents using wTorrent, an rTorrent interface, remotely from your browser.
// @include			*
// @include			http://isohunt.com/torrent_details/*
// @include			http://thepiratebay.org/details.php?*
// @include			http://torrentreactor.net/view.php?*
// @include			http://www.mininova.org/*
// @include			http://www.torrentspy.com/*
// @include			http://ts.searching.com/*
// ==/UserScript==

/*
	Add Torrents to wTorrent (v2.5)
	Created			2008-10-30
	Copyright		Shannon Brooks (c) 2008
	License			GPL License (http://www.gnu.org/copyleft/gpl.html)

	Let's you download torrents using wTorrent, an rTorrent interface, remotely
	from your browser. Visit wTorrent Homepage (http://www.wtorrent-project.org/)
	to learn more about rTorrent and wTorrent.The idea for this script and some
	of its functions taken from "Add Torrents To uTorrent" by Julien Couvreur.
	The original uTorrent script by Julien can be found on userscripts.org.
	
	This script includes the ability to auto-login, though you don't need to use
	that functionality. If you wish to log in manually (just open a tab with
	wTorrent) you just need to set the wTorrent_OverRideCheck option in
	about:config to true.

	Preferences are saved in firefox. Open about:config and type wtorrent into
	filter box. Variables are pretty self explanitory, but you can see what	each
	corresponds to below.
	
	Configuration Notes:
	-	For private trackers (what.cd, passthepopcorn.org, etc...) you will need
		to add your session key to the wtorrent cookie page.
		
		To do this:
		In Firefox, login to the private tracker (make sure you select to keep
		you logged in). Right click the page and select "View Page Info". Go to
		the Security tab and click view cookies. Enter the cookie into wtorrent
		with the cookie host being the value from the site column and the cookie
		value being the cookie name (ie: session) followed by an = then the
		value of the cookie.
		
		You should end up with something like:
		private.com session=SUPERLONGSTRINGOFCHARACTERSANDNUMBERS012918391121
		
		This will allow wtorrent to download the torrents from the private
		tracker.
	-	For some reason if you do not accept third party cookies GreaseMonkey
		will ignore any cookies set when you are submitting a GM_xmlhttpRequest.
		Unfortunately, this breaks the functioning of this script... so you will
		have to turn them on to use this script. Sorry :(

	Change Log:
	v1.0	Released 2008-10-30
		Initial Release
	v1.1	Released 2008-10-31
		- Fix bug with matching any link with "undefined" somewhere in the body.
		- Fix bug causing you to have to click twice on a link to add a torrent
		  if you are not logged in.
	v1.2	Released 2008-12-14
		- Fix bug with URLs containing ampersands not being interpreted properly
		  (thanks Constantine P.)
	v1.5	Released 2009-05-16
		- Add options for auto-start and private download links, now clicking on
		  lock icon (if enabled) starts download in "private" tab
		  (thanks devinw)
	v1.6	Released 2009-05-16
		- Add options for alternate download directory, just change from
		  "default" to the absolute path for the download
		  (thanks ssmy)
	v2.0	Released 2009-05-16
		- Add confguration "page" to simplify the setup, based on the settings
		  (or should I say, shamelessly "borrowed") portion of the script "IE
		  Media Mimic" by Vectorspace
	v2.1	Released 2009-05-17
		- Fixed a little display bug on some sites where a background image was
		  inherited (specifically on torrent pages for TPB)
	v2.2	Released 2009-05-17
		- My bad... fixed bug with configuration menu not being available to new
		  installs AND with not being able to add torrents when port is not
		  configured... it seems to be actually working now, sorry about that!
	v2.3	Released 2009-05-25
		- Auto login now works when visiting the wTorrent page through right-click
		  GreaseMonkey menu
		- Made an option available to only add in private mode which over-rides
		  the option to show private mode links
		- Added regex to make work with what.cd, however it only works with some
		  links for now as the main page links don't containt auth information
		  (thanks to fleebailey33 for the invite and suggestions)
	v2.4	Released 2009-06-26
		- Changed code to use one connect string
		- Added option for SSL (https) connection to wTorrent
		- Changed setting save code to refresh page instead of reloading settings
		  manually
		  (thanks to Keystroke for suggesting the SSL option as well as the
		   connect string update)
	v2.5	Released 2009-07-17
		- Changed code to further support what.cd and passthepopcorn.org, added
		  instructions to clarify how wtorrent should be configured to support
		  those sites.
	v2.6    Released 2010-05-24
	    - Added variable wtorrent_language to handle wTorrent in other Languages here: german (de)
		- Added a few custom regex (BF+BTF and TH)
		
	To Do:
		- Make custom download icons/locations available.
		- Custom regex to add new sites?
		- language localization
		
*/



(function() {

	// wTorrent running on SSL?
	var wtorrent_ssl = getOrInitPref("wTorrent_SSL",false);
	// wTorrent FQDN or IP
	var wtorrent_host = getOrInitPref("wTorrent_FQDN","wtorrent"); 
	// wTorrent Port (if not 80)
	var wtorrent_port = getOrInitPref("wTorrent_Port","80");
	// wTorrent Username
	var wtorrent_username = getOrInitPref("wTorrent_User",""); 
	// wTorrent Password
	var wtorrent_password = getOrInitPref("wTorrent_Pass","");
	// wTorrent Private Mode Links
	var wtorrent_showprivatelinks = getOrInitPref("wTorrent_PrivateLinks",false);
	// wTorrent Always Download in Private Mode (over-rides wtorrent_showprivatelinks)
	var wtorrent_alwaysdownloadprivate = getOrInitPref("wTorrent_AllwaysPrivateLinks",false);
	// wTorrent Auto-Start
	var wtorrent_autostarttorrents = getOrInitPref("wTorrent_AutoStartTorrents",true);
	// wTorrent Download Directory
	var wtorrent_downloaddirectory = getOrInitPref("wTorrent_DownloadDirectory","default");
	// Langauge of wTorrent
	var wtorrent_language = getOrInitPref("wTorrent_Language","de");
	
	// get or init preferences
	function getOrInitPref(name,default_value) {
		value = GM_getValue(name);
		if (value == undefined) {
			GM_setValue(name,default_value);
			return default_value;
		}
		else { return value; }
	}
	
	// sanity checks
	if (GM_getValue("wTorrent_OverRideCheck")===false) { if (wtorrent_host == "" || wtorrent_username == "" || wtorrent_password == "") { alert("You need to configure the \"Add Torrents To wTorrent\" user script with your wTorrent parameters before using it.\n\nRight click the Grease Monkey, choose User Script Commands... and select wTorrent: Configure. Variables are self explanitory."); } }
	if (wtorrent_port == "80" || wtorrent_port == "") { wtorrent_port_string = ""; } else { wtorrent_port_string = ":"+wtorrent_port; }
	if (wtorrent_ssl == true) { wtorrent_connect_string = 'https://'+wtorrent_host+wtorrent_port_string+'/'; } else { wtorrent_connect_string = 'http://'+wtorrent_host+wtorrent_port_string+'/'; }
	
	// register menu item to enable opening and automatically logging into wTorrent page
	function wTorrentMenu() {
		post(wtorrent_connect_string,'userf='+wtorrent_username+'&passwdf='+wtorrent_password+'&user_login=Login', function(l) {
			// if we are still getting a login page there is probably a typo in the config
			var login_needed = /login-username/mi;
			if (login_needed.exec(l) != null) { show_message('Login Failed!<br />Check configuration...'); }
			else { GM_openInTab(wtorrent_connect_string); }
		});
	}
	GM_registerMenuCommand("wTorrent: Visit Page", wTorrentMenu);
	
	
	var wTorrentLinkIdCounter = 0;
	
	// this function makes a wTorrent link using embeded images
	GM_addStyle('.wtorrent_link { background: transparent none !important; border-width: 0px !important; margin: 0 !important; padding: 0 !important; }');
	function makeWTorrentLink(link,isprivatelink) {
		var wTorrentLink = document.createElement('a');
		wTorrentLink.setAttribute("href", link.href);
		wTorrentLink.setAttribute("id","wTorrentLink"+wTorrentLinkIdCounter); wTorrentLinkIdCounter++;
		wTorrentLink.setAttribute("class", "wtorrent_link");
		if (isprivatelink == false) {
			wTorrentLink.setAttribute("title","Add to wTorrent");
			wTorrentLink.addEventListener('click',wTorrentClick,false);
			wTorrentLink.innerHTML = '<img src="' + wTorrentImage + '" style="border: 0px; padding: 0 1px;" alt="Add to wTorrent" title="Add to wTorrent" />';
			}
		else {
			wTorrentLink.setAttribute("title","Add to wTorrent in Private Mode");
			wTorrentLink.addEventListener('click',wTorrentPrivateClick,false);
			wTorrentLink.innerHTML = '<img src="' + wTorrentPrivate + '" style="border: 0px; padding: 0 1px;" alt="Add to wTorrent in Private Mode" title="Add to wTorrent in Private Mode" />';
			}
		wTorrentLink.setAttribute("onclick", "return false;");
		return wTorrentLink; 
		}
	
	// wrapper functions for wTorrentAdd to fix issue with not getting an error
	// when clicking a torrent link the first time after not being logged in
	function wTorrentClick() { wTorrentAdd(this.id,false); }
	function wTorrentPrivateClick() { wTorrentAdd(this.id,true); }
	
	// this function posts the url for the torrent to wTorrent
	function wTorrentAdd(wTorrentLinkId,isPrivateAdd) {
	
		// reference the link
		var wTorrentLink = document.getElementById(wTorrentLinkId);
		
		// wTorrent request link
		var wTorrentRequestURL = 'torrenturl='+encodeURIComponent(wTorrentLink.href);
		
		// check to see if we are always adding in private mode or if current click is private
		if (isPrivateAdd == true || wtorrent_alwaysdownloadprivate == true) {
			wTorrentRequestURL = wTorrentRequestURL+'&private=on';
		}
		
		// check for non-default download directory
		if (wtorrent_downloaddirectory != "default") {
			wTorrentRequestURL = wTorrentRequestURL+'&download_dir='+wtorrent_downloaddirectory;
		}
		
		// check to see if we are autostarting
		if (wtorrent_autostarttorrents == true) {
			wTorrentRequestURL = wTorrentRequestURL+'&start_now=on';
		}
		
		// here we actually send the form data with the torrenturl
		post(wtorrent_connect_string+'index.php?cls=AddT', wTorrentRequestURL, function(s) {
			
			// our regexes to do checks after adding torrents			
			switch(wtorrent_language) {
				case 'en':
				  var match_added = /Torrent added correctly/gmi;
				  var already_exists = /Error: File already exists in torrent directory, can't create .torrent/gmi;
				  break;
				case 'de':
				  var match_added = /Erfolgreich hinzugefügt/gmi;
				  var already_exists = /Fehler: Torrent existiert bereits im Torrent-Verzeichnis/gmi;
				  break;
				default:
				  var match_added = /Torrent added correctly/gmi;
				  var already_exists = /Error: File already exists in torrent directory, can't create .torrent/gmi;
			}
			
			var login_needed = /login-username/gmi;
			
			// check for string 'torrent added correctly' in return HTML
			if (match_added.exec(s)) {
				if (isPrivateAdd != true) {
					show_message('Torrent Successfully Added<br/>to wTorrent');
				}
				else {
					show_message('Torrent Successfully Added<br/>Privately to wTorrent');
				}
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentSuccess;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent Downloading";
			}
			// check for string 'error: file already exists in torrent directory'
			else if (already_exists.exec(s)) {
				show_message('Torrent Already Added<br />to wTorrent');
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentFailed;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent Already Downloaded";
			}
			// check for login page, and if we find the login we attempt to login
			else if (login_needed.exec(s)) {
				post(wtorrent_connect_string,'userf='+wtorrent_username+'&passwdf='+wtorrent_password+'&user_login=Login', function(l) {
					// if we are still getting a login page there is probably a typo in the config
					var login_needed = /login-username/gmi;
					if (login_needed.exec(l)) { show_message('Login Failed!<br />Check configuration...'); }
					else { wTorrentAdd(wTorrentLinkId,isPrivateAdd); }
				});
			}
			// un-handled issue, try adding torrent manually as you may be having an issue with wtorrent
			else {
				show_message('Problem Adding Torrent<br />to wTorrent');
				// debug
				//alert("torrent url: "+wTorrentLink.href+"\n\nDebug Info:\n"+s);
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentFailed;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent Download Failed";
			}
 		})
	}
		
	// generic post function taken from GreaseSpot
	// http://wiki.greasespot.net/Code_snippets#POST_data_to_a_URL_with_callback_function
	function post(url, data, cb) {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data: data,
			onload: function(xhr) { cb(xhr.responseText); }
			});
		}

	// function from Julien's "Add Torrents to uTorrent" script
	// this function inits the script and adds all the wTorrent download links
	function scanLinks() {
		var links = getLinks();

		for (var i=0; i < links.length; i++){
			var link = links[i];
			if (match(link.href)) {
				// do private link first so it appears after normal link
				if (wtorrent_showprivatelinks == true && wtorrent_alwaysdownloadprivate == false) {
					var wTorrentPrivateLink = makeWTorrentLink(link,true);
					link.parentNode.insertBefore(wTorrentPrivateLink, link.nextSibling);
					}
				// normal wTorrent link
				var wTorrentLink = makeWTorrentLink(link,false);
				link.parentNode.insertBefore(wTorrentLink, link.nextSibling);
				}
			}
		}
	
	// function from Julien's "Add Torrents to uTorrent" script
	// this function puts all the links on the page into an array
	function getLinks() {
		var doc_links = document.links;
		var links = new Array();
		for (var i=0; i < doc_links.length; i++){
			links.push(doc_links[i]);
			}
		return links;
		}

	// function from Julien's "Add Torrents to uTorrent" script
	// modified to be a little more efficient.
	function match(url) {

		var matchRegex = new Array(
	
			// isohunt
			/http:\/\/.*isohunt\.com\/download\//i,
			/http:\/\/.*bt-chat\.com\/download\.php/,
		
			// TorrentReactor
			/http:\/\/dl\.torrentreactor\.net\/download.php\?/i,
		
			// Mininova
			/http:\/\/www\.mininova\.org\/get\//i,
		
			// TorrentSpy
			/http:\/\/ts\.searching\.com\/download\.asp\?/i,
			/http:\/\/www\.torrentspy\.com\/download.asp\?/i,
		
			// Seedler
			/http:\/\/.*seedler\.org\/download\.x\?/i,
			
			//demonoid
			/http:\/\/www.demonoid.com\/files\/download\/.*/i,
			
			// BF + BTF
			/http:\/\/.*\/download\.php\?torrent.*/i,

			// Aeonflux Trackingsystem (TH)
			/https:\/\/.*\/index.php\?strWebValue=torrent&strWebAction=download&id=.*/i,
			
			//what.cd
			/https?:\/\/.*\/torrents.php.action=download.*/i,
		
			// all direct torrent links
			/\.torrent$/
			
			);
	
		for (r=0; r<matchRegex.length; r++) {
			if (url.match(matchRegex[r])) {
				//if (r<3) { alert(url.match(matchRegex[r])); }
				return true;
				}
			}
		return false;
		}

	// opacity script from brainerror.net
	// http://brainerror.net/scripts/javascript/blendtrans/
	function opacity(id, opacStart, opacEnd, millisec) {
	    //speed for each frame
	    var speed = Math.round(millisec / 100);
	    var timer = 0;
	    //determine the direction for the blending, if start and end are the same nothing happens
	    if(opacStart > opacEnd) {
	        for(i = opacStart; i >= opacEnd; i--) {
	            setTimeout(opacity_change,(timer * speed),i,id);
	            timer++;
	        }
	    }
		else if(opacStart < opacEnd) {
	        for(i = opacStart; i <= opacEnd; i++) {
	            setTimeout(opacity_change,(timer * speed),i,id);
	            timer++;
	        }
	    }
	}
	function opacity_change(opacity, id) {
	    var object = document.getElementById(id).style;
	    object.opacity = (opacity / 100);
	    object.MozOpacity = (opacity / 100);
	    object.KhtmlOpacity = (opacity / 100);
	    object.filter = "alpha(opacity=" + opacity + ")";
	}
	function opacity_shift(id) {
		//if an element is invisible, make it visible, else make it ivisible
	    if(document.getElementById(id).style.opacity == 0) { opacity(id, 0, 100, 1000); }
		else { opacity(id, 100, 0, 1000); }
	}
	
	// these functions show and hide status messages so that there is no need to click ok when
	// adding torrents
	GM_addStyle('#wtorrent_message { z-index: 9999; position: fixed; bottom: 5px; right: 5px; font-weight: bold; color: #333; background: #FFF url("data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2FwAALCABQAAEBAREA%2F8QAFQABAQAAAAAAAAAAAAAAAAAABAX%2FxAAYEAEBAQEBAAAAAAAAAAAAAAAAE2EBUf%2FaAAgBAQAAPwB0MVIYqRxRhilE%2BWHyw6XPDJFz1%2F%2FZ") repeat; border: 2px solid #333; width: 200px; height: 60px; text-align: center; }');
	function show_message(text,autohide) {
		if (autohide == undefined) { var autohide = true; }
		if (node=document.getElementById('wtorrent_message')) { node.parentNode.removeChild(node); }
		var wTorrentMessage = document.createElement('div');
		wTorrentMessage.setAttribute("id","wtorrent_message");
		wTorrentMessage.innerHTML = "<p>"+text+"</p>";
		wTorrentMessage.addEventListener('click',hide_message,false);
		document.body.insertBefore(wTorrentMessage, document.body.firstChild);
		opacity_shift('wtorrent_message');
		if (autohide) { setTimeout(hide_message,4000); }
	}
	function hide_message() {
		if(document.getElementById('wtorrent_message').style.opacity>0) { opacity_shift('wtorrent_message'); }
	}
	
	// register menu item for configuration pane
	GM_registerMenuCommand("wTorrent: Configure", openSettingsWindow);
	
	//Opens settings window, sets variable values in window
    function openSettingsWindow() {   //Create settings window
	
        //Define html for settings window
        var settingsHTML="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en-gb\" xml:lang=\"en-gb\">\n<head>\n  <meta content=\"text/html; charset=ISO-8859-1\" http-equiv=\"content-type\" />\n  <title>wTorrent Options</title>\n  <style type=\"text/css\">\n    body {\n		background-color: rgb(212, 208, 200);\n    }\n    body,input,select {\n      font-size: 10pt;\n      font-family: Arial;\n    }\n    input.text {\n		width: 100%;\n		margin-bottom: 4px;\n	}\n	input.checkbox {\n		margin-bottom: 4px;\n	}\n	p.small {\n		font-size: 6pt;\n		margin: 0; padding: 0; margin-bottom: 4px;\n	}\n  </style>\n</head>\n\n<body>\n\n	<div style=\"width: 275px;\">\n\n		<div style=\"text-align: center;\">\n			<h1>wTorrent Options</h1>\n		</div>\n\n		<hr />\n	 \n		<label>wTorrent Host Name or IP</label><br />\n		<input class=\"text\" type=\"text\" name=\"wtorrent_host\" id=\"wtorrent_host\" value=\"\" /><br />\n\n		<label>wTorrent Port</label><br />\n		<input class=\"text\" type=\"text\" name=\"wtorrent_port\" id=\"wtorrent_port\" value=\"\" /><br />\n		\n		<input class=\"checkbox\" type=\"checkbox\" value=\"true\" name=\"wtorrent_ssl\" id=\"wtorrent_ssl\" /><label for=\"wtorrent_ssl\">Use SSL to connect to wTorrent?</label>\n		<p class=\"small\">Checking this will cause you to use an SSL (https) connection for wTorrent.</p>\n\n		<label>wTorrent User Name</label><br />\n		<input class=\"text\" type=\"text\" name=\"wtorrent_username\" id=\"wtorrent_username\" value=\"\" /><br />\n		\n		<label>wTorrent Password</label><br />\n		<input class=\"text\" type=\"password\" name=\"wtorrent_password\" id=\"wtorrent_password\" value=\"\" /><br />\n		\n		<label>wTorrent Download Directory</label><br />\n		<input class=\"text\" type=\"text\" name=\"wtorrent_downloaddirectory\" id=\"wtorrent_downloaddirectory\" value=\"\" /><br />\n		<p class=\"small\">Download directory should be set to \"default\" to accept the default setting configured in wTorrent, or changed to an absolute path. You must allow files to be saved to a non-standard source when not using \"default\".</p>\n		\n		<input class=\"checkbox\" type=\"checkbox\" value=\"true\" name=\"wtorrent_alwaysdownloadprivate\" id=\"wtorrent_alwaysdownloadprivate\" /><label for=\"wtorrent_alwaysdownloadprivate\">Allways add in private mode?</label>\n		<p class=\"small\">This takes precedence over \"Show links for private mode add\" preference. If this is checked only the wTorrent icon will show and it will always add in private mode</p>\n\n		<input class=\"checkbox\" type=\"checkbox\" value=\"true\" name=\"wtorrent_showprivatelinks\" id=\"wtorrent_showprivatelinks\" /><label for=\"wtorrent_showprivatelinks\">Show links for private mode add?</label>\n		<p class=\"small\">Checking this will show a \"lock\" icon for adding torrents in private mode.</p>\n\n		<input class=\"checkbox\" type=\"checkbox\" value=\"true\" name=\"wtorrent_autostarttorrents\" id=\"wtorrent_autostarttorrents\" /><label for=\"wtorrent_autostarttorrents\">Auto-Start torrents?</label><br />\n\n		<br />\n		<hr />\n		<input id=\"save\" value=\"Save Changes\" type=\"button\" />\n\n		<input value=\"Cancel\" onclick=\"window.close()\" type=\"button\" />\n	</div>\n</body>\n</html>";

        //Add default variable values to settins window html
        settingsHTML=settingsHTML.replace(/id="wtorrent_host" value=""/,'id="wtorrent_host" value="'+wtorrent_host+'"')
        settingsHTML=settingsHTML.replace(/id="wtorrent_port" value=""/,'id="wtorrent_port" value="'+wtorrent_port+'"')
        settingsHTML=settingsHTML.replace(/id="wtorrent_username" value=""/,'id="wtorrent_username" value="'+wtorrent_username+'"')
        settingsHTML=settingsHTML.replace(/id="wtorrent_password" value=""/,'id="wtorrent_password" value="'+wtorrent_password+'"')
        settingsHTML=settingsHTML.replace(/id="wtorrent_downloaddirectory" value=""/,'id="wtorrent_downloaddirectory" value="'+wtorrent_downloaddirectory+'"')
		
		if (wtorrent_ssl) { settingsHTML=settingsHTML.replace(/id="wtorrent_ssl"/,'id="wtorrent_ssl" checked="checked"'); }
        if (wtorrent_alwaysdownloadprivate) { settingsHTML=settingsHTML.replace(/id="wtorrent_alwaysdownloadprivate"/,'id="wtorrent_alwaysdownloadprivate" checked="checked"'); }
        if (wtorrent_showprivatelinks) { settingsHTML=settingsHTML.replace(/id="wtorrent_showprivatelinks"/,'id="wtorrent_showprivatelinks" checked="checked"'); }
        if (wtorrent_autostarttorrents) { settingsHTML=settingsHTML.replace(/id="wtorrent_autostarttorrents"/,'id="wtorrent_autostarttorrents" checked="checked"'); }
    
        //Open Settings window
        settingsWindow=window.open("","settingsWindow","height=520,width=298,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,status=no")
        settingsWindow.document.write(settingsHTML)     //Write html to window
        settingsWindow.document.close()                 //Close document to writing

        //Add Settings Window Listeners
        settingsWindow.document.getElementById("save").addEventListener("click", saveSettings, false);  //Add click event listener to Save Settings button, calls saveSettings()
        settingsWindow.addEventListener("unload", cleanupSettingsListeners, false);                     //Add unload event listener to window, calls cleanupListeners()
    }
    
    //Gets form values from settings window and stores them.
    // Triggered by event listener on 'Save Settings' button.
    function saveSettings() {
		//Get values from page form elements and save
		GM_setValue("wTorrent_FQDN",settingsWindow.document.getElementById("wtorrent_host").value);
		GM_setValue("wTorrent_Port",settingsWindow.document.getElementById("wtorrent_port").value);
		GM_setValue("wTorrent_User",settingsWindow.document.getElementById("wtorrent_username").value);
		GM_setValue("wTorrent_Pass",settingsWindow.document.getElementById("wtorrent_password").value);
		GM_setValue("wTorrent_SSL",settingsWindow.document.getElementById("wtorrent_ssl").checked);
		GM_setValue("wTorrent_PrivateLinks",settingsWindow.document.getElementById("wtorrent_showprivatelinks").checked);
		GM_setValue("wTorrent_AllwaysPrivateLinks",settingsWindow.document.getElementById("wtorrent_alwaysdownloadprivate").checked);
		GM_setValue("wTorrent_AutoStartTorrents",settingsWindow.document.getElementById("wtorrent_autostarttorrents").checked);
		GM_setValue("wTorrent_DownloadDirectory",settingsWindow.document.getElementById("wtorrent_downloaddirectory").value);
    
        alert("Settings Updated")           //Alert user
        
        settingsWindow.close()              //Close Settings Window
        
        // refresh values from configuration
		location.reload(true);
		// wtorrent_host = GM_getValue("wTorrent_FQDN","wtorrent") ; 
		// wtorrent_port = GM_getValue("wTorrent_Port","80");
		// wtorrent_username = GM_getValue("wTorrent_User",""); 
		// wtorrent_password = GM_getValue("wTorrent_Pass","");
		// wtorrent_ssl = GM_getValue("wTorrent_SSL",false);
		// wtorrent_showprivatelinks = GM_getValue("wTorrent_PrivateLinks",false);
		// wtorrent_alwaysdownloadprivate = GM_getValue("wTorrent_AllwaysPrivateLinks",false);
		// wtorrent_autostarttorrents = GM_getValue("wTorrent_AutoStartTorrents",true);
		// wtorrent_downloaddirectory = GM_getValue("wTorrent_DownloadDirectory","default");
    }
    
    //Remove event listeners from settings window, triggered by settings window unoad event
    function cleanupSettingsListeners() {
		//Remove Save Settings button listener
        settingsWindow.document.getElementById("save").removeEventListener("click", saveSettings, false);
		//Remove window unload listener
        settingsWindow.removeEventListener("unload", cleanupSettingsListeners, false);
    }

	
	
	
	
    // wTorrent Icons
    var wTorrentImage = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP38%2FAPy7egu7ebdRPv6%2BQri1shw3c%2B%2Fhe3m3UT%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPby7h%2FApYX%2Fu6mJ%2F7Kwkf%2FApYX%2Fq7aX%2F6DAof%2B5q4v%2F3M69if%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAOng1VTApYX%2Fprqb%2F3bhxf9y5cn%2FrbWW%2F23pzf9r68%2F%2FdOPG%2F7upiv%2FZyreU%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDPu6O%2Fkcyu%2F2fu0%2F9s6s7%2FbOrO%2F3Dmyv9t6c3%2FbenN%2F2vqzv9s6s7%2FvaeH%2F%2FDr5DX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDn3dFes7CR%2F2jt0f9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FaezR%2F57Aov%2FXxrKf%2F%2F%2F%2FAP%2F%2F%2FwD28%2B8evqeH%2F5bIqv9q7ND%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2Fv6aG%2F%2Fby7h%2F%2F%2F%2F8A7ebdRLesjf%2BC2Lr%2FbOrO%2F23pzf9s6s7%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FaO3S%2F621lv%2Fg08R4%2F%2F%2F%2FAOzk20i6qor%2Fg9e5%2F2ns0P9w5sr%2Fd%2BHF%2F2zqzv9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F2rrz%2F%2BWyKr%2F1MOtqP%2F%2F%2FwD%2F%2F%2F8A49fJbr6mhv944MP%2Fgdq8%2F7aujv9q7ND%2FbenN%2F23pzf9s6s7%2FduHF%2F23pzf9s6s7%2FhNa5%2F865oMX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDe0cGBv6aG%2F6q4mP%2FPuqLBkM2v%2F2fu0v9m79P%2FqbiZ%2F621lv9o7dH%2FbOnO%2F4PYu%2F%2FNt57J%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPj28xXg08R46d%2FVVr6nh%2F%2BRzK7%2FsbGS%2F8y2nM2H1Lf%2FZu%2FT%2F2ns0P%2BB2bz%2Fzbifx%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDp39VWz7ujv%2BTZzGfApYX%2Fp7qb%2F6S8nf%2Bmu5v%2Fu6mJ%2F%2Bfd0V7%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A9vLuH9zNvIvZybaX4NPDefHr5TP%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F8AAP%2B%2FAADwDwAA4AcAAMAHAADAAwAAgAMAAIADAACAAQAAwAEAAMABAAD8AQAA%2FoMAAP%2FPAAD%2F%2FwAA%2F%2F8AAA%3D%3D";
	var wTorrentFailed = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%5DIDAT8%CB%A5%93%FBKSa%18%C7%FD%5B%B6%1F%A2%04%89n%84%84QP%98%F32w%D6%DA%DC%A6%CE%B3L%8F%5B%2Cbi%8E%9Da%9AA%8D%C5%5C%F8C%A8%A5v%D5%CA_2Ml%94ZFj%D7%A1%E5%B1%F2%D2NMjm%9E%B3k%CA%B7%B9%60%26.%23z%E1%FB%CB%CB%FB%F9%BC%3C%0F%CF%93%02%20%E5%7F%B2%E6bV%AF%17%CEP%15%E6%F7T%193%A5%25%B9I%AD%86%7BG%AA%99qRiv%95%C8%85%EB%0A%E6tz%E2%23E%B1%DF%1C6%84%07%9D%88%BC%19Edd%08%FC%DD%0E%CC%1AJ%F1%AA%90%60%9F%AB%C5DR%C12%3C%5DN%F1%0B%B7%3B%B04%F5%16%D1%BE%3B%88%B6%DB%11m%3E%87%1F7%9B%B08%DC%07%8F%C9%80Qe6%FFL%9EI%AC%12%CC%E8t%82%18%EC%E6%AE%B7c%89q!z%F1%0C%7Cv%0B%FC%B6j%84%2FX%10i%A0%11%B6%9E%40%F8%DE%0D%CC%1D%251%7Ch%9F%FB%B1l%8F%20!%88%C1%F4%7C%AD%19%8B%AE%B1%F8%8F!%07%0D%EFY%23%82u%BAU%E1N%92%08w%5D%C1%CB%BC%0C%0CH3%E8%84%E0%03u%84%09t%5DE%B4%B3%19%3Ek%25%BE%16I%93f%A1%92%04o%AB%81%C7R%85%87D%3A%93%100%E5%DA%60%E4~%17%A2%0E%0B%7C%A7%0D%F8%D3%F1(r%E0%A5%0A%E1on%843oG0!%98%24%8B%82%A1%CEV%84%EB%0D%08%9E*%5BW0_%AA%82%BF%A9%11%FD%E2-%2B%82%89%12%15%E3%B5%D6%20d%A7%C1%1DW%C7%1F%26%8D2%0F%BEZ%13fMF%F4%89%D2VJp%15%CBiF%26B%B0%B3%0D%3E%AD%0C%DER%C9%1A%98%95g%83-%90%20%D0~%09C%E2m%E8%CD%DA%B4%D2%C4%D7ER%C1%0B%0D%E1%9E%AB%D0%20p%AB5%DE%B0y%95%F8%17%A8%C8%05%2B%8B%C121%F8%B6%16%8C%17K%97aw%B7h%A3%60%D5%20%8D%15%E4%10%23%8A%03%FC%F4a%15%02%D7Z%F1%BD%9E%86%87T%E2%B3Z%01o%9D%19%FC%E5%16L%A8%F3%D1%93%95%CA%C7%60%22%E9(%3F%95%EF'%9E%1C%DC%CB%8EJv%E1K%B5%11%DE%86%F3%F1%7C%AA%3A%86G9%5B%97a%F6w8%E92%0DJw%0B%07%C4%E9f'%B1%93y%90%BF%9D%EB%17m%E6zs%D3%98%9E%ECTsw%E6%06%E1_%B7%F1_%F3%13%1D%D2%CE%B9Ir%1B%FE%00%00%00%00IEND%AEB%60%82";
	var wTorrentSuccess = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%0A%1D%16%177%7F%EF%5DZ%00%00%01yIDAT8%CB%A5%93%CD%2BDQ%18%C6%9Fs%EF%99%D3qgJ%B84%F9%18%9A%C9wI(%0B%A3d%C3%DAJ%B2%B4%B2%B1%B1%90dmia%C1%8E%FF%40%F64Q%12%93PL%94h%CCD%9Ad%CAm%A63%E7%9Ckc%A1i%AE%8F%EE%BB%7C%17%BF~o%CF%FB%10%D7u%E1g%0C%F8%1C%DF%00Zi9%B5%19%85E98%E5%E0%94%81%1A%0C%EB3%87%7F%07%14%85%C0%F4%E0%02%A8Ia%12%03%FB%D7%3B%FF3%E0%8C%E9%BD%CB-%F2%DD%00%00%F1c%A0%FFd%10%5D%25%B0%18A8dCj%85%EC%FB%03Z%EB%DA!%B4%C4%DC%F6%008e%D8%98%3D%A9%9C%82%BDD%A0%B4%89%A1%C88%8AR%40j%85%92%96PZAH%89%88%DD%0D!%85w%8C%B95%17%A6%A1%9Cd%FA%C0%89%D9%BDD%B9%1AR%97%A0%E1%A2%A9%B6%C3H%E7R%0E%A3%CC%F1%3C%C1%5E%22UAjZC%911%0C%B7%8D%E29%9FFI%95%F0%92%CF%A0%AF9%8E%00%0DX%99%5C%EAG%83BA%ABh%E2n%3F%9BL%1F%A36%14%86a0%D4%04%1Bp%FAx%80%9B%EC9%84%96V9%80%94w%A1q%99t2%8A%C4D%D7dx%A0e%04%17OG%B8%7F%BD%D4%16%E3%A1%DD%F9%C7%C2%AF%80%2FH%0F%A7H%8C%C4%E2%F5%B7%CFg%9AS%AB%FAp%F1%ED%A3R%8C%C4%AB%8D%CD%CB%A4%DFbHrJ%EA%AEVt%DE%EB%0F%88%DF%3A%7F%02_%1F%95%FF%E8%EA%EB%2C%00%00%00%00IEND%AEB%60%82";
	var wTorrentPrivate = "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAMVvAsZzAMt2AMt5ANeKH9uMGdKKKOeSFuiTFfGeBvGgC/GjD/yuBP68Cv/QPP/OQv7RRf7YXfzSbvzYaf7gdI6NjZSUlJ6cnKKhoaysrL29veO6hfnYlvnZoPzrpMzMzPvyyP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiBAP8JHEiwoMGDCEFoWLgQREINIiJG1ODQYAYRGzBo3CACw8ELIi4MBCnSoAURFgaeTFnQw4EGBhrInNCgQIeCCSpUCCExYgUGOCtEGBoBgogHP4M6WLr0g4MKCwoiqCCzqswKCqRSkMCV6wcRErIS5BAgwICzAgQMIMABodu3CAMCADs%3D";
	
	// check to see if we have the wtorrent page loaded, if not start the script
	if (window.location.host != wtorrent_host) { scanLinks(); }
		
	})();