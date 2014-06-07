// ==UserScript==
// @name             Private Chat helper
// @namespace        profusiongames.com
// @author           UnknownGuardian
// @version          1.65
// @date             07/24/2013
// @include          http://www.kongregate.com/games/*/*
// @description      Easy Private Rooms functionality
// ==/UserScript==

// Written by UnknownGuardian (http://www.kongregate.com/accounts/UnknownGuardian) 12/08/2012
// Licensed under MIT/X11 license
// Copyright (c) 2012 UnknownGuardian
// http://www.opensource.org/licenses/mit-license.php






function main()
{
	//console.log("Private Chat helper 1");
	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

	dom.privateScriptVersion = "1.65";
	dom.updateURL = "";
	dom.r = Math.floor(Math.random()*99999);



	dom.pmholodeckCheckCounter = 0
	dom.pmholodeckInterval = dom.setInterval(checkIfHolodeckLoaded, 100)
	dom.pmoneScriptsInitialize = [];



	function checkIfHolodeckLoaded()
	{
		dom.pmholodeckCheckCounter++;
		console.log("[PM Helper Script] Checking if holodeck loaded");
		if(typeof holodeck === 'undefined')
		{

		}
		else if(holodeck.ready)
		{
			dom.clearInterval(dom.pmholodeckInterval);
			console.log("[PM Helper Script] Holodeck loaded");
			startPMHelperScript();
		}

		if(dom.pmholodeckCheckCounter > 40)
		{
			dom.clearInterval(dom.pmholodeckInterval);
			console.log("[PM Helper Script] Holodeck failed to load");
		}
	}
	

	function startPMHelperScript()
	{
		if($("chat_tab_pane") != null)
			putOnPage();
		else
		{
			var force = new Element("a",{"style":"color:#CCCCCC;float:left;clear:both;"}).update("Force Load PM Script");
			force.onclick = tryPutOnPage;
			$$(".gamepage_header_outer")[0].down().insert({after:force});
		}
	}

	function tryPutOnPage()
	{
		if($("chat_tab_pane") != null)
			putOnPage();
	}

	function putOnPage() {
		dom.head = $$("head")[0];//console.log("Private Chat helper 21");
		dom.paneHeight = "height:" + $("chat_tab_pane").getStyle("height");//console.log("Private Chat helper 22");
		dom.tabElementGroup = $("main_tab_set");//console.log("Private Chat helper 23");
		dom.paneElementGroup = $("kong_game_ui");//console.log("Private Chat helper 24");
		dom.privateTab = new Element("li", {"class":"tab", "id":"private_tab"});//console.log("Private Chat helper 25");
		dom.privateTabTitle = new Element("a", {"href":"#private_tab_pane"}).update("Private");//console.log("Private Chat helper 26");
		dom.privatePaneElement = new Element("div", {"id":"private_tab_pane", "class":"tabpane", "style":dom.paneHeight})
		dom.disabledButtonStyle = new Element("style").update(".panel_body .btn:disabled {background: none repeat scroll 0 0 #CCCCCC; border: 1px solid #AAAAAA !important; color: #888888 !important; cursor: default; text-shadow: 0 0 0 black !important;}");

		//console.log("Private Chat helper 3");

		dom.CDa = dom.ChatDialogue;
		CDa.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

		//console.log("Private Chat helper 4");


		dom.tabContent = '<div id="script_credits_panel" class="collapsible_panel">' + 
							'<p class="ug_handle panel_handle mvs spritegame opened_link"><a>Info</a></p>' + 
		  					'<div id="script_credits" class="panel_body cntrToggle splittext smltxt-reset" style="">' + 
		    					'<p>Private Chat rooms Expander Script v' + privateScriptVersion + '</p>' + 
		    					'<p>Developed by <a href="http://www.kongregate.com/accounts/UnknownGuardian" target="_blank">UnknownGuardian</a></p>' + 
		    					'<input id="pr-update-button" type="button" value="Check For Updates" class="btn btn_wide btn_action">' +
		  					'</div>' + 
		  				'</div>' +
		  				'<div id="room_options_panel" class="collapsible_panel">' + 
		  					'<p class="ug_handle panel_handle mvs spritegame opened_link"><a>Password Settings</a></p>' + 
		  					'<div id="room_options" class="panel_body cntrToggle splittext smltxt-reset" style="">' + 
		  						'<p><label>Room Password: </label>' +
		  						'<input id="pr-password" class="pr-listener" type="text"><br>' + 
		    					'<em>People that PM you this password will be automatically invited.</em></p>' + 

		    					'<p><label>Password Enabled: </label>' +
		  						'<input id="pr-password-enabled" class="pr-listener" type="checkbox"><br>' + 
		    					'<em>Invites will only be sent automatically if this box is checked.</em></p>' + 
		    					'<input id="pr-save-pass-enabled" type="button" value="Save" class="btn btn_wide btn_action" disabled>' + 
		  					'</div>' + 
						'</div>' +
						'<div id="adv_options_panel" class="collapsible_panel">' + 
		  					'<p class="ug_handle panel_handle mvs spritegame opened_link"><a>Access Settings</a></p>' + 
		  					'<div id="adv_options" class="panel_body cntrToggle splittext smltxt-reset" style="">' + 
								'<p><label>Blacklist Enabled: </label>' +
		  						'<input id="pr-blacklist-enabled" class="pr-listener" type="checkbox"><br>' + 
		    					'<em>Enable blacklist.</em></p>' + 

		  						'<p><label>Username Blacklist: </label><br>' +
		  						'<textarea id="pr-blacklist" class="pr-listener" style="width:248px;" rows="3"></textarea><br>' + 
		    					'<em>Comma delimited list of users to deny automatic invitation.</em></p>' + 

		    					'<p><label>Whitelist Enabled: </label>' +
		  						'<input id="pr-whitelist-enabled" class="pr-listener" type="checkbox"><br>' + 
		    					'<em>Enable whitelist automatic invitation only.</em></p>' + 

		    					'<p><label>Username Whitelist: </label><br>' +
		  						'<textarea id="pr-whitelist" class="pr-listener" style="width:248px;" rows="3"></textarea><br>' + 
		    					'<em>Comma delimited list of users to only send automatic invitation to.</em></p>' + 
		    					'<input id="pr-save-list-enabled" type="button" value="Save" class="btn btn_wide btn_action" disabled>' + 
		  					'</div>' + 
						'</div>' + 
						'<div id="adv_misc_panel" class="collapsible_panel">' + 
		  					'<p class="ug_handle panel_handle mvs spritegame opened_link"><a>Miscellaneous</a></p>' + 
		  					'<div id="adv_misc" class="panel_body cntrToggle splittext smltxt-reset" style="">' + 

		    					'<p><label>Show Whitelist Adding Prompt: </label>' +
		  						'<input id="pr-whitelist-add-prompt" type="checkbox"><br>' + 
		    					'<em>Asks if you want to add a user who PMed you the correct password but is not on the enabled whitelist.</em></p>' + 
		  					'</div>' + 
						'</div>';
		privateRoomScript();
	}



	/*
	 * Scripts for UI on tab
	 */

	 //start update------------>
	function buttonScriptUpdate() {
	 	var updateElement = new Element('script', {'type':'text/javascript', 'src':'http://www.profusiongames.com/kong/public-userscripts/update.js?r=' + r });
	 	var updateCallback = new Element('script', {'type':'text/javascript'}).update(hasUpdate);
	 	head.insert(updateCallback);
		head.insert(updateElement);
		return false;
	}

	function hasUpdate(newVersion, url){
		dom.updateURL = url;
	 	if(newVersion != privateScriptVersion) {
	 		$('pr-update-button').value = "Click to update to v." + privateScriptVersion;
			$('pr-update-button').onclick =   function() { window.open(updateURL); } ;			 																				    
	 	}
	 	else {
	 		$('pr-update-button').value = "No Update Found";+
			$('pr-update-button').setAttribute('onclick', ""); 
	 	}
	}
	//end update------------>


	//start enabled------------>
	function buttonScriptSavePass() {
		var password = $('pr-password').getValue();
		Cookie.set('pr-password', password, 1000000,'/');
		var enabled = $('pr-password-enabled').checked;
		Cookie.set('pr-password-enabled', enabled, 1000000, '/');
		$('pr-save-pass-enabled').writeAttribute({'disabled':''});
	}
	//end enabled------------>


	//start list------------>
	function buttonScriptSaveList() {
		var blacklistEnabled = $('pr-blacklist-enabled').checked;
		Cookie.set('pr-blacklist-enabled', blacklistEnabled, 1000000, '/');
		var blacklist = $('pr-blacklist').getValue();
		Cookie.set('pr-blacklist', blacklist, 1000000,'/');
		var whitelistEnabled = $('pr-whitelist-enabled').checked;
		Cookie.set('pr-whitelist-enabled', whitelistEnabled, 1000000, '/'); 
		var whitelist = $('pr-whitelist').getValue();
		Cookie.set('pr-whitelist', whitelist, 1000000,'/');
		$('pr-save-list-enabled').writeAttribute({'disabled':''});
	}
	//end list------------>




	/*
	 * Util functions for everyting else
	 */
	function setFieldsToDefault()
	{
		var password = getPassword();
	    var passwordElement = $("pr-password");
	    passwordElement.setValue(password);

	    var enabled = getEnabled();
	    var enabledElement = $("pr-password-enabled");
	    //enabledElement.setValue(enabled);
	    enabledElement.checked = enabled;

	    var blacklistEnabled = getBlacklistEnabled();
	    var blacklistEnabledElement = $("pr-blacklist-enabled");
	    //blacklistEnabledElement.setValue(blacklistEnabled);
	    blacklistEnabledElement.checked = blacklistEnabled;

	    var blacklist = getBlacklist();
	    var blacklistElement = $("pr-blacklist");
	    blacklistElement.setValue(blacklist);

	    var whitelistEnabled = getWhitelistEnabled();
	    var whitelistEnabledElement = $("pr-whitelist-enabled");
	    //whitelistEnabledElement.setValue(whitelistEnabled);
	    whitelistEnabledElement.checked = whitelistEnabled;

	    var whitelist = getWhitelist();
	    var whitelistElement = $("pr-whitelist");
	    whitelistElement.setValue(whitelist);

	    var whiteListAddPromptEnabled = getWhiteListAddPromptEnabled();
	    var whiteListAddPromptElement = $("pr-whitelist-add-prompt");
	    whiteListAddPromptElement.checked = whiteListAddPromptEnabled;
	}
	function hideActiveTab(event)
	{
		event.stop();
		$$(".tabpane").each(function(item) {
			if(item.id != 'private_tab_pane') item.setStyle({display:'none'});
		});

		$$(".main_tabs")[0].childElements().each(function(item) {
			if(item.id == 'private_tab')
			{
				item.down("a").addClassName("active");
				$("private_tab_pane").setStyle({display:"block"});
			} 
			else
				item.down("a").removeClassName("active");
		});
	}

	function addActiveListenersToTabs()
	{
		$("main_tab_set").childElements().each(function(item) {
			if(item.id == 'private_tab')
			{
				//do nothing
			} 
			else
				item.down("a").observe("click", deactivatePrivateTab);
		});
		dom.setInterval(function() {checkForActiveWindowsConflict() }, 3000);
	}

	function checkForActiveWindowsConflict()
	{
		//visible tab
		var tab = $('private_tab_pane');
		if(tab.getStyle("display") == "block")
		{
			$$(".tabpane").each(function(item) {
				if(item.id == 'private_tab_pane'){}
				else if(item.getStyle("display") != "none")
					deactivatePrivateTab();
			});
		}
	}

	function deactivatePrivateTab(event)
	{
		if(event != null) event.stop();
		$("private_tab").down("a").removeClassName("active");
		$("private_tab_pane").setStyle({display:"none"});
	}

	function addActiveListenersToCollapsibles()
	{
		//new Effect.BlindDown(s,{duration:1})
		$$(".ug_handle").each(function(item) {
			item.observe("click", toggleCollapsiblePanel);
		});
	}

	function toggleCollapsiblePanel(event)
	{
		event.stop();
		var item = this;
		var body = item.up().down(".panel_body");
		//Fix bugs with not showing
		if(item.hasClassName("open_link") && body.getStyle('display') == 'none')
		{
			item.removeClassName("opened_link");
			item.addClassName("closed_link");
		}
		else if(item.hasClassName("closed_link") && body.getStyle('display') != 'none')
		{
			item.removeClassName("closed_link");
			item.addClassName("opened_link");
		}
		if(item.hasClassName("opened_link"))
		{
			item.removeClassName("opened_link");
			item.addClassName("closed_link");
			new Effect.Fade(body,{duration:0.35})
		} 
		else
		{
			item.removeClassName("closed_link");
			item.addClassName("opened_link");
			new Effect.Appear(body,{duration:0.35})
		}
	}

	function addListenerToMiscGroup()
	{
		$("pr-whitelist-add-prompt").observe("click", toggleWhiteListAddingPrompt);
	}

	function toggleWhiteListAddingPrompt()
	{
		var enabled = $("pr-whitelist-add-prompt").checked;
		Cookie.set("pr-whitelist-add-prompt", enabled, 10000, '/');
	}

	function generateWhiteListAddLinkFor(user)
	{
		return "var newList = '" + user + "' + ', ';"+
		"var whitelist = Cookie.get('pr-whitelist');" +
		"if(whitelist == null) 	whitelist = '';" +
		"newList += whitelist;" + 
		"var whitelistElement = $('pr-whitelist');"+
	    "whitelistElement.setValue(newList);"+
	    "Cookie.set('pr-whitelist', newList, 10000,'/');"+
	    "this.parentNode.innerHTML = 'Added " + user + " to the whitelist!';" + 
	    "holodeck.sendPrivateRoomInvitation('" + user + "');" + 
	    "return false";
	}

	function shouldInviteAutomatically(enabled, password, blacklistEnabled, blacklist, whitelistEnabled, whitelist, user, message)
	{
		var splitBlacklist = blacklist.split(/ ?, ?/);
		var splitWhitelist = whitelist.split(/ ?, ?/);
		if(whitelistEnabled)
			return enabled && password != "" && splitWhitelist.indexOf(user) != -1 && message.toLowerCase() == password.toLowerCase();
		else if(blacklistEnabled)
			return enabled && password != "" && splitBlacklist.indexOf(user) == -1 && message.toLowerCase() == password.toLowerCase();
		else
			return enabled && password != "" && message.toLowerCase() == password.toLowerCase();
	}

	function usingWhiteListAndUserIsNotOnWhiteList(enabled, password, blacklistEnabled, blacklist, whitelistEnabled, whitelist, user, message)
	{
		var splitWhitelist = whitelist.split(/ ?, ?/);
		return whitelistEnabled && getWhiteListAddPromptEnabled() && splitWhitelist.indexOf(user) == -1 && message.toLowerCase() == password.toLowerCase();
	}

	function addListenersToFieldsForSaving()
	{
		$$(".pr-listener").each(function(item) {
			if(item.type == "textarea"||item.type == "text")
				item.observe("input", enableSectionSaveButton);
			else if(item.type == "checkbox")
				item.observe("click", enableSectionSaveButton);
		});
	}

	function enableSectionSaveButton(event)
	{
		this.up(".panel_body").down("input[type=button]").removeAttribute("disabled");
	}



	 /*
	  * Settings getters/setters
	  */

	function getPassword() {
		var password = Cookie.get("pr-password");
		if(password == null) 
			password = "";
		return password;
	}

	function getEnabled() {
		var enabled = Cookie.get("pr-password-enabled");
		if(enabled == null) enabled = false;
   		return enabled;
	}

	function getBlacklistEnabled() {
		var enabled = Cookie.get("pr-blacklist-enabled");
		if(enabled == null) enabled = false;
   		return enabled;
	}

	function getBlacklist() {
		var blacklist = Cookie.get("pr-blacklist");
		if(blacklist == null) 
			blacklist = "";
		return blacklist;
	}

	function getWhitelistEnabled() {
		var enabled = Cookie.get("pr-whitelist-enabled");
		if(enabled == null) enabled = false;
   		return enabled;
	}

	function getWhitelist() {
		var blacklist = Cookie.get("pr-whitelist");
		if(blacklist == null) 
			blacklist = "";
		return blacklist;
	}

	function getWhiteListAddPromptEnabled() {
		var enabled = Cookie.get("pr-whitelist-add-prompt");
		if(enabled == null) enabled = false;
   		return enabled;
	}


	function privateRoomScript()
	{
		console.log("Private Room Helper Script is starting up!")
		//var paneHeight = "height:" + $("chat_tab_pane").getStyle("height");

	    ///var tabElement = new Element("li", {"class":"tab", "id":"private_tab"});
	    ///var aElement = new Element("a", {"href":"#private_tab_pane"}).update("Private");
	    ///var paneElement = new Element("div", {"id":"private_tab_pane", "class":"tabpane", "style":paneHeight}).update(tabContent);
	    privatePaneElement.update(dom.tabContent);
	    console.log("Private Room Helper Script injected the tab")

	    ///var disabledButtonStyle = new Element("style").update(".panel_body .btn:disabled {background: none repeat scroll 0 0 #CCCCCC; border: 1px solid #AAAAAA !important; color: #888888 !important; cursor: default; text-shadow: 0 0 0 black !important;}");
	    ///var head = $$("head")[0];
	    ///var tabElementGroup = $("main_tab_set");
	    ///var paneElementGroup = $("kong_game_ui");
	    //var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
		//var CDa = dom.ChatDialogue;
		//CDa.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

		head.insert(disabledButtonStyle);
		privateTab.insert(privateTabTitle)
		tabElementGroup.insert({bottom:privateTab});
		paneElementGroup.insert({bottom:privatePaneElement});
		privateTabTitle.observe("click", hideActiveTab);
		///head.insert(disabledButtonStyle);
		///tabElement.insert(aElement);
		///tabElementGroup.insert({bottom:tabElement});
		///paneElementGroup.insert({bottom:paneElement});
		//aElement.observe("click", hideActiveTab);

		//inject scripts into interactable elements
		$('pr-update-button').onclick = buttonScriptUpdate;
		$('pr-save-pass-enabled').onclick = buttonScriptSavePass;
		$('pr-save-list-enabled').onclick = buttonScriptSaveList;

		setFieldsToDefault();
		addActiveListenersToTabs();
		addActiveListenersToCollapsibles();
		addListenerToMiscGroup();
		addListenersToFieldsForSaving();


		//actual chat interception and automation here.
		if(!CDa.prototype.showReceivedPMHelper)
		{
			CDa.prototype.showReceivedPMHelper = CDa.prototype.receivedPrivateMessage;
		}
		CDa.prototype.receivedPrivateMessage = function (a){
			console.log("[Recieved PM Private Chat Helper] " + a.data.from + ": " + a.data.message);
			console.log(a);
			if (a.data.success){
				var enabled = getEnabled();
				var password = getPassword()
				var blacklistEnabled = getBlacklistEnabled();
				var blacklist = getBlacklist();
				var whitelistEnabled = getWhitelistEnabled();
				var whitelist = getWhitelist();
				
				//if(enabled && password != "" && splitBlacklist.indexOf(a.data.from) == -1 && a.data.message.toLowerCase() == password.toLowerCase())
				if(shouldInviteAutomatically(enabled, password, blacklistEnabled, blacklist, whitelistEnabled, whitelist, a.data.from, a.data.message))
					holodeck.sendPrivateRoomInvitation(a.data.from);

				this.showReceivedPMHelper(a);

				if(usingWhiteListAndUserIsNotOnWhiteList(enabled, password, blacklistEnabled, blacklist, whitelistEnabled, whitelist, a.data.from, a.data.message))
				{
					//a.data.message += " <br><br>Private Room Helper - A WhiteList is enabled and this user is not on the whitelist but has the password. <a href='#''>Add this user to the WhiteList and Invite</a>";


					//$$(".whisper")[0].down(".message").innerHTML += 
					var helper = a.data.from + ' is not on the enabled whitelist. Would you like to <a href="#" onclick="' + generateWhiteListAddLinkFor(a.data.from) + '" >add ' + a.data.from + ' to whitelist and invite</a> right now?';
					this.displayUnsanitizedMessage("Private Helper",helper,{"class":"whisper received_whisper"},{non_user:true})
					//this.showReceivedPMHelper(container);
				}

			}
			else
			{
				this.showReceivedPMHelper(a);
			}
		}
	}
}




// This injects our script onto the page.
// Kinda borrowed from http://userscripts.org/scripts/review/125666
// Borrowed from: http://stackoverflow.com/a/2303228
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);