scr_meta=<><![CDATA[
// ==UserScript==
// @name            Quakelive Player Status
// @version          0.4
// @description    Extends QuakeLive chat area
// @author          rahzei
// @include          http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum*
// ==/UserScript==
]]></>.toString();

// Wait for IM_OnConnected event to load

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($)
  {
  	unsafeWindow.quakelive.AddHook("IM_OnConnected", init);
  }
})();



var quakelive,
	$;

var GameTypes = {
	0: "FFA",
	1: "DUEL",
	2: "FFA",
	3: "TDM",
	4: "CA",
	5: "CTF"
};

var Locations = {
	40: 'ARG',
	14: 'AUS',
	33: 'AUS',
	35: 'AUS',
	51: 'AUS',
	26: 'CAN',
	38: 'CHL',
	18: 'DE',
	28: 'ES',
	20: 'FR',
	19: 'UK',
	41: 'ISL',
	42: 'JPN',
	49: 'KOR',
	17: 'NL',
	32: 'PL',
	37: 'RO', 
	39:	'RO',
	44: 'RU',
	47: 'SRB',
	29: 'SE',
	58: 'UKR',
	6: 'TX',
	10: 'CA',
	11: 'VA',
	16: 'CA',
	21: 'IL',
	22: 'GA',
	23: 'WA',
	24: 'NY',
	25: 'CA',
	46: 'ZAF'
};

var Players = {};


/*
	Copy from ql source, out of scope 
*/
function JID(a) {
    this.bare = a;
    var d = a.indexOf("@");
    if (d != -1) this.username = a.substring(0, d);
    else {
        this.username = a;
        this.bare = a + "@" + quakelive.siteConfig.xmppDomain
    }
}

JID.prototype.Clone = function () {
    return new JID(this.bare)
};

/*
	Wait for playerlist to make it into the DOM
*/
function init() {
	var t;
	// setup our globals
	$ = unsafeWindow.jQuery;
	quakelive = unsafeWindow.quakelive;
	// Loop timer till playerlist is complete
	if( $(".player_name").length == 0 ) {
		t = window.setTimeout(init,1000);
		//console.log("Waiting on quakelive object init...");
		return;
	}

	// clear timeout loop
    window.clearTimeout( t );
	
	// Override OnPresence()
	QuakeLiveChatExtender();
	
	// Run initial update on player_name nodes
	initRoster();
}

function QuakeLiveChatExtender() {
	
	// Override
	quakelive.xmppClient.roster.OnPresence = function (a) {
	    if (a = quakelive.Eval(a)) {
	        var d = new JID(a.who);
	        if (typeof this.items[d.username] != "undefined") {
	            d = this.items[d.username];
	            this.ChangeItemPresence(d, a.presence);
	            d.status = a.status;
	            var nick = a.who.substring(0,a.who.indexOf("@"));
	            
	            // update status message
	            updateNode( nick, a.status );
	            
	        }
	    }
	};
}

/*
	Updates the rosteritem with the correct nick
*/
function updateNode( nick, status ) {
	
	var status = quakelive.Eval(status);
	$(".player_name").each( function(i,item) {
		var that = this;
		var prehtml = $(this).html();
    	var nodeNick = $(this).html().indexOf("<small>") >= 0 ? $(this).html().substring( prehtml.indexOf("</small>") + "</small>".length).toLowerCase() : $(this).html().toLowerCase();
    	
    	// FIXED: I'm an idiot & id changes stuff all the time :(
    	nodeNick = nodeNick.substring( nodeNick.indexOf("<span>")+"<span>".length, nodeNick.indexOf("</span>") );
    	nodeNick = nodeNick.indexOf("<br>") >= 0 ? nodeNick.substring( 0, nodeNick.indexOf("<br>") ) : nodeNick;
    	
    	if( nodeNick != nick )
			return; 

		// Idle
		if( !status ) {
			// cut off status 
			$( that ).html( prehtml.substring( prehtml.indexOf("<br />") ) );
			
			var rosteritem = $( that ).parent().parent();
			
			$( rosteritem ).children(".rosteritem-name").css({'margin-bottom':'0px'}); 
			
			if( $( rosteritem ).hasClass('rosteritem-selected') )
    			$( rosteritem ).css({'height':'26px'});
    		else
    			$( rosteritem ).css({'height':'20px'});
		}
		
		
		// Online game
		if( status.ADDRESS.length > 8 ) {
			$.ajax({
                url: "/browser/details",
                data: {
                    ids: status.SERVER_ID
                },
                dataType: "json",
                port: "joinserver",
                cache: false,
				success: function (x) {
                	if ($.isArray(x) || x.length > 0) {
                		var gametype = (typeof GameTypes[ x[0].game_type ] != 'undefined') ? GameTypes[ x[0].game_type ] : x[0].game_type_title;
                		
                		if( prehtml.indexOf("<br") > 0 )
                			prehtml = prehtml.substring( 0, prehtml.indexOf("<br>") );
                		
                		var str  = prehtml + "<br /><p style=\"height: 15px;margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">";
                		
                		// teamgame
                		if( x[0].teamsize ) {
                			str += "<span style=\"font-weight: bold;font-size: 9px\">" + gametype + "</span> on ";
                			
                			if( x[0].g_gamestate === "PRE_GAME" && x[0].num_players < (x[0].teamsize*2) )
                				str += x[0].map_title + " - " + Locations[x[0].location_id] + "<span style=\"font-size: 9px; color: #000;\"> (" +x[0].num_players + "/" + (x[0].teamsize*2) + ") </span></p>";
                			else
                				str += x[0].map_title + " - " + Locations[x[0].location_id] + " (" +x[0].num_players + "/" + (x[0].teamsize*2) + ") </p>";
                		}
                		
                		// duel
                		else
                			str += "<span style=\"font-weight: bold;font-size: 9px\">" + gametype + "</span> on " + x[0].map_title + " - " + Locations[x[0].location_id] + " (" +x[0].num_players + "/" + x[0].max_clients + ")</p>";
                		
            			$( that ).html( str );
            			
            			$( that ).parent().parent().css({'height':'35px'});
                	}
                }
            });
            
        // Prac game
        } else if( status.ADDRESS === "loopback" ) {
        	if( prehtml.indexOf("<br") > 0 )
                prehtml = prehtml.substring( 0, prehtml.indexOf("<br>") );
        	
        	$( that ).html( prehtml + "<br /><p style=\"margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">Playing Practice Game</p>" );
            			
			$( that ).parent().parent().css({'height':'35px'});
			
			
		// Demo
        } else if( status.ADDRESS === "bot" ) {
        	if( prehtml.indexOf("<br") > 0 )
                prehtml = prehtml.substring( 0, prehtml.indexOf("<br>") );
        	
        	$( that ).html( prehtml + "<br /><p style=\"margin-top: -4px; margin-bottom: 0px; padding-top: 0px; font-size: 9px; color: rgb(102, 102, 102);\">Watching demo</p>" );
            			
			$( that ).parent().parent().css({'height':'35px'});
		}
    });	
}

function hideFuckingAds() {
	$("#qlv_topFadeAds").hide();
	$(".spon_media").hide();
}

function updateRoster() {
	
	if(unsafeWindow.fullScreen)
		return;
	
	var items = unsafeWindow.quakelive.xmppClient.roster.items;
	
	for(var i in items )  {
		if( items[i].status && typeof items[i].status != "undefined" ) {
			updateNode( items[i].jid.username, items[i].status );
		}	
	}
}

/*
	Iterates over roster.items from the xmppClient object and updates status where due
*/
function initRoster() {
	$ = unsafeWindow.jQuery;
	
	// Update roster, so status is the correct info regarding players/maxplayers etc
	window.setInterval(updateRoster, 120*1000);
	
	// hide ads
	hideFuckingAds();
	
	GM_addStyle(".rosteritem-selected { text-align:left;font-weight:bold;font-size:12px;height:26px;line-height:20px;border-bottom:1px solid #a1a0a3;background:url() repeat-y #fff !important }");
	
	// resize chat area
	window.setTimeout(function() {
		updateRoster();
		//$("#im-body").css({'height':'500px'});
		GM_addStyle(".rosteritem-selected { text-align:left;font-size:12px;height:26px;line-height:20px;border-bottom:1px solid #a1a0a3;background:url() repeat-y #fff !important }");
		GM_addStyle(".rosteritem-selected .rosteritem-name { font-weight:bold;line-height:20px; !important }");
		
	}, 10*1000);
}

/* Auto updating */
AnotherAutoUpdater = {
  // Config values, change these to match your script
 id: '96328', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();