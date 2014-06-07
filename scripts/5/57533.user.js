// ==UserScript==
// @name          Alliance Online
// @version       0.5
// @description   Ikariam script to aid you in knowing who in your alliance is currently online.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://userscripts.org/scripts/source/57377.user.js
// @require       http://userscripts.org/scripts/source/57756.user.js
// @include       http://s*.ikariam.*/index.php?view=diplomacyAdvisor*
// @include       http://s*.ikariam.*/index.php?view=island*
// @exclude       http://s*.ikariam.*/index.php?view=diplomacyAdvisorAlly*
// @history       0.5  Added auto update and heavily refactored code to be much cleaner
// @history       0.4  fixed island view bug for towns with same name as other alliance members
// @history       0.4  made script more efficient by only calling island view portion if viewing an island with alliance members on it
// @history       0.3  fixed island view bug for towns with long names and '-' in the name
// @history       0.3  refactored some code to use jquery
// @history       0.2  added support for island view
// @history       0.1  initial release
// ==/UserScript==

ScriptUpdater.check(57533, '0.5');
IkaTools.init({trackData:false});

AllianceOnline = {
	allyUrl   : "http://" + IkaTools.getDomain() + "/index.php?view=diplomacyAdvisorAlly",
	onlineImg : "skin/layout/bulb-on.gif",
	onlinePlayers : {},
	init : function() {
    if (typeof(this.views[IkaTools.getView()]) == 'function') {
			this.views[IkaTools.getView()]();
		}
	},
	getOnlinePlayers : function(doc) {
		var elements = $(".online", doc);
		for (var i = 0; i < elements.length; i++) {
			var playerTD = elements[i].nextSibling.nextSibling;
			//get the player name and substitute spaces and - for _
			var player = playerTD.innerHTML.replace(/\s/g, "_").replace(/-/g, "_");
			// populate the online players object
			eval('AllianceOnline.onlinePlayers.' + player + '=true');
		}
	},
	views : {
		island : function() {
			//if no alliance members are on the island then no need to execute
			if($("div.allyCityImg").length == 0) {
				return;
			}
			IkaTools.getRemoteDocument(AllianceOnline.allyUrl, function(returnedDoc) {
				//populate player list from returned doc
				AllianceOnline.getOnlinePlayers(returnedDoc);
				// get all player names that have parent with child div allyCityImg
				var cityPlayerList = $("ul.cityinfo li.owner", $('div.allyCityImg').parent());
				// for each one get the player name and check if is part of the onlinePlayers object
				for (var i = 0; i < cityPlayerList.length; i++) {
					var player = jQuery.trim(cityPlayerList[i].firstChild.nextSibling.nodeValue);
					// replace " " and "-" with "_" so that it would match property name in onlinePlayers
					player = player.replace(/\s/g, "_").replace(/-/g, "_");
					if (player != "" && eval('AllianceOnline.onlinePlayers.' + player) != null) {
						// create img string and insert it using jquery
						var imgStr = "<img src='" + AllianceOnline.onlineImg + "' style='padding-top:10px;padding-left:5px;z-index:999;position:absolute;'/>";
						$(cityPlayerList[i]).parent().siblings("a").before(imgStr);
					}
				}
			});
		},
		diplomacyAdvisor : function() {
			IkaTools.getRemoteDocument(AllianceOnline.allyUrl, function(returnedDoc) {
				// for now lets just get all instances of player name and replace
				AllianceOnline.getOnlinePlayers(returnedDoc);
			  for (prop in AllianceOnline.onlinePlayers) {
				  // convert '_' back into spaces
				  player = prop.replace(/_/g, " ");
				  $("a:contains(" + player + ")").html(player + "  <img src='" + AllianceOnline.onlineImg + "'/>");
			  }
			});
		}
	}
}

AllianceOnline.init();

