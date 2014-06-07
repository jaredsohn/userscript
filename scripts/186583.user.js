// ==UserScript==
// @id             qlrostergroup
// @name           Quake Live Roster Group
// @version        1.2
// @namespace      Lam
// @author         Lam
// @description    
// @include        http://www.quakelive.com/*
// @exclude        http://www.quakelive.com/forum/*
// ==/UserScript==


function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'application/javascript');
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}


contentEval(function () {
	if (typeof quakelive != 'object') { return; }

	// TODO: make this actually configurable :)
	var groupname1 = "[FTi]";
	var groupmembers1str = "vldStone, arbe, Tema, gopnick, ncuXO3, 4es, Mors, f0rman, mous3, wi5py, Diman, Lexa, kotk, sp1ky";
	var groupmembers1 = groupmembers1str.toLowerCase().replace(/ /g,',').replace(/,,/g,',').split(',');
	var groupname2 = "high skill";
	var groupmembers2str = "ash, 1fall_frag, Latrommi, tox, Hal";
	var groupmembers2 = groupmembers2str.toLowerCase().replace(/ /g,',').replace(/,,/g,',').split(',');
	var groupname3 = "";
	var groupmembers3str = "";
	var groupmembers3 = groupmembers3str.toLowerCase().replace(/ /g,',').replace(/,,/g,',').split(',');

//	var oldOnRosterUpdated = quakelive.mod_friends.roster.UI_OnRosterUpdated;
//	quakelive.mod_friends.roster.UI_OnRosterUpdated = function () {
//		
//	}

	// this is used by UI_ShowApp to create the roster window
	quakelive.mod_friends.TPL_FRIENDS_LIST = quakelive.mod_friends.TPL_FRIENDS_LIST.replace('</div></div><div','</div></div>'
		+ '<div id="im-group1"><h1><div id="im-group1name" style=" padding-top: 3px; ">' + groupname1 + '</div></h1><div class="itemlist"></div></div>'
		+ '<div id="im-group2"><h1><div id="im-group2name" style=" padding-top: 3px; ">' + groupname2 + '</div></h1><div class="itemlist"></div></div>'
		+ '<div id="im-group3"><h1><div id="im-group3name" style=" padding-top: 3px; ">' + groupname3 + '</div></h1><div class="itemlist"></div></div>'
		+ '<div');

	QLRG_ContactGroup = function(nick) {
		if ( groupmembers1.indexOf( nick.toLowerCase() ) >= 0 )
			return 'group1';
		else if ( groupmembers2.indexOf( nick.toLowerCase() ) >= 0 )
			return 'group2';
		else if ( groupmembers3.indexOf( nick.toLowerCase() ) >= 0 )
			return 'group3';
		return 'online';
	}

	var oldImportRosterData = quakelive.mod_friends.roster.ImportRosterData;
	quakelive.mod_friends.roster.ImportRosterData = function() {
		oldImportRosterData.apply(this, arguments);
		//window.console.log("ImportRosterData fired");
		for (var i = 0; i < quakelive.mod_friends.roster.fullRoster.length; i++ ) {
			var putinto = QLRG_ContactGroup( quakelive.mod_friends.roster.fullRoster[ i ].name );
			if ( quakelive.mod_friends.roster.fullRoster[ i ].CanDisplayOnRoster()
			  && ( putinto != 'online' ) ) {
				//window.console.log("ImportRosterData: " + quakelive.mod_friends.roster.fullRoster[ i ].name + ', group: ' + quakelive.mod_friends.roster.fullRoster[ i ].group + '.' );
				quakelive.mod_friends.roster.fullRoster[ i ].UI_PlaceInGroup(putinto, true);
				/*
				 * contact.StartInactivityTimeout() has hardcoded group to which the contact
				 * returns after 3 minutes (length also hardcoded). Best thing to do would be
				 * to override contact.UI_PlaceInGroup to automatically change 'online' to
				 * my group, but I'm too noob to do that.
				 */
				quakelive.mod_friends.roster.fullRoster[ i ].StartInactivityTimeout = function(){
					if (this.timeoutHandle) {
						clearTimeout(this.timeoutHandle)
					}
					var contact = this;
					this.timeoutHandle = setTimeout(function() {
						if (quakelive.mod_friends.roster.selectedContact != contact) {
							if (contact.group == 'active') {
								if (contact.CanDisplayOnRoster()) {
									contact.UI_PlaceInGroup(QLRG_ContactGroup(contact.name))
								} else {
									contact.UI_RemoveFromGroup()
								}
								contact.timeoutHandle = null
							}
						} else {
							contact.StartInactivityTimeout()
						}
					}, 180 * 1000)
				};
			}
		}
	}

	var OldPresence = IM_OnPresence;
	IM_OnPresence = function(presence_json) {
		OldPresence.apply(this, arguments);
		var pres = quakelive.Eval(presence_json);
		if (pres) {
			var jid = new JID(pres.who);
			//window.console.log("Test 2: " + jid.username);
			if ( QLRG_ContactGroup( jid.username ) != 'online' ) {
				var contact = quakelive.mod_friends.roster.GetContactByJID(jid);
				if (contact) {
					//window.console.log('Test 3');
					if (contact.CanDisplayOnRoster()) {
						//window.console.log('Prev group: ' + contact.group + '.');
						contact.UI_PlaceInGroup(QLRG_ContactGroup(contact.name));
						// same as above
						contact.StartInactivityTimeout = function(){
							if (this.timeoutHandle) {
								clearTimeout(this.timeoutHandle)
							}
							var contact = this;
							this.timeoutHandle = setTimeout(function() {
								if (quakelive.mod_friends.roster.selectedContact != contact) {
									if (contact.group == 'active') {
										if (contact.CanDisplayOnRoster()) {
											contact.UI_PlaceInGroup(QLRG_ContactGroup(contact.name))
										} else {
											contact.UI_RemoveFromGroup()
										}
										contact.timeoutHandle = null
									}
								} else {
									contact.StartInactivityTimeout()
								}
							}, 180 * 1000)
						};
					}
				}
			}
		}
	}
});


GM_addStyle( "#im-group1, #im-group2, #im-group3 { display: none }'" );

GM_addStyle( '#im-group1 .itemlist, #im-group2 .itemlist, #im-group3 .itemlist {\
	color: #000000; display: block; font-family: Arial; font-size: 12px;\
	font-style: normal; list-style: none outside none; margin: 0;\
	padding: 0; text-align: center; top: 0; vertical-align: text-top; }' );

GM_addStyle( '#im-group1 h1, #im-group2 h1, #im-group3 h1 { display: block;\
    height: 21px; margin: 0; padding: 0;\
    text-align: left; width: 300px; padding-left: 30px; color:black;\
    text-shadow: 0.1em 0.1em 0.2em white; font-family: Arial; font-style: italic;\
    font-size:12px;\
    background: url("data:image/jpeg;base64,\
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"\
) no-repeat scroll 0 0 transparent; }' );

