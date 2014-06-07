// ==UserScript==
// @name           Ikariam Circular Reply
// @version        0.1
// @namespace      HomerOfXi
// @description    This script will add a Circular Reply button to all Alliance Circulars in your inbox. 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://s*.ikariam.*/index.php?view=diplomacyAdvisor*
// @history        0.1 Initial Release
// ==/UserScript==


ScriptUpdater.check(57976, '0.1');

CircularReply = {
	init : function() {
		var view = unsafeWindow.IKARIAM.phpSet.currentView;
		if (typeof(this.views[view]) == 'function') {
			this.views[view]();
		}
	},
	getCirculars : function() {
		return $(".subject:contains('Circular Message')");
	},
	getMessageId : function(circular) {
		var messageId = $(circular).parent().attr("id");
		return messageId.slice(7); //slice off the word message in front of the number
	},
	insertReplyButtons : function(allyId) {
		var circulars = CircularReply.getCirculars();
		for(var x=0; x < circulars.length; x++) {
			var messageId = CircularReply.getMessageId(circulars[x]);
			//button rows have an id of tbl_reply99999 where 99999 is the messageid
			var buttonSpan = $("#tbl_reply" + messageId + " .reply span:first");
			//create new button html and insert
			buttonHtml = "<a class='button' href='?view=sendIKMessage&msgType=51&allyId="+allyId+"&replyTo="+messageId+"'>Circular Reply</a>";
			buttonSpan.append(buttonHtml);
		}
			
	},
	views : {
		diplomacyAdvisorAlly : function() {
			//get ally id and store as GM var
			var href = $("#alliance a:not([target])").attr('href');
			var index = href.indexOf("allyId");
			var allyId = href.slice(index + 7);
			GM_setValue("allyId", allyId);
		},
		diplomacyAdvisor : function() {
			//check if ally id is set and only run if it is
			var allyId = GM_getValue("allyId",0);
			if( allyId != 0) {
			  CircularReply.insertReplyButtons(allyId);
			}
		}
	}
	
}

CircularReply.init();