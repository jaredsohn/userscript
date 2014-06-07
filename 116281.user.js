// ==UserScript==
// @name           Castle Age - Construction Logger1
// @namespace      Castle Age
// @description    This script will automatically post the results of your assistance to a Call To Arms for Construction of a weapon with Hydras in the Allie Chat. Includes an Options menu to add Guild/Group Initials at the beginning of the text to submit.
// @include        http://*/castle_*/battle_monster.php?*action=doObjective*
// @include        http://*/castle_*/raid.php?*action=doObjective*
// @include        http://*/castle_*/festival_battle_monster.php?*action=doObjective*
// @include        https://*/castle_*/battle_monster.php?*action=doObjective*
// @include        https://*/castle_*/raid.php?*action=doObjective*
// @include        https://*/castle_*/festival_battle_monster.php?*action=doObjective*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=63216
// @version       1.0.6
// ==/UserScript==

GM_config.init("Castle Age - Construction Logger Options", {
	guild : {
		section : [
		"Logger Options"
		],
		label : "Guild Name",
		type : "text",
	        default : ""
	},
	rtf : {
		label : "RTF Link",
		type : "text",
		default : ""
	},
	enabled : {
		section : [
		"Other Options"
		],
		label : "Enabled",
		type : "checkbox",
		default : true
	}
});

function CheckConstruction() {
	if(GM_config.get("enabled")===false)
	{
		return;
	}

	var results = document.evaluate("//div[@class='result']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	results = document.evaluate("//span[@class='result_body']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var htmlResult = results.snapshotItem(0).textContent; 
	var myResult = htmlResult.replace(/(<([^>]+)>)/ig,"");

	var mpos = myResult.indexOf('to help summon');
	var npos = myResult.indexOf('You were the') + 13;
	var tpos = myResult.indexOf('needed to summon the') + 21;

	if (mpos == -1)
	{
		mpos = myResult.indexOf('required to summon');
		npos = -1;
		tpos = mpos + 23;
	}

	if (mpos != -1)
	{
		var myNumber;
		if (npos != -1)
		{
			myNumber = myResult.substring(npos, mpos-1);
		} else {
			myNumber = 'Last';
		}
		var theType;
		if (myNumber != 'Last')
		{
			theType = myResult.substring(tpos);
		} else {
			theType = myResult.substring(tpos, (myResult.indexOf('. The')+1));
		}
		
		var chatValue = '';
		if(GM_config.get("guild").length != 0)
		{
			chatValue += '[' + GM_config.get("guild") + '] ';
		}
		chatValue += myNumber + ' for ' + theType;
		if(GM_config.get("rtf").length != 0)
		{
			chatValue += ' Please RTF! ' + GM_config.get("rtf");
		}
	
		var textAreas = document.evaluate("//textarea[@id='comment_text_area']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatBox = textAreas.snapshotItem(0);

		chatBox.value = chatValue;

		var inputs = document.evaluate("//input[@id='text_submit_button']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatSubmit = inputs.snapshotItem(0);
		chatSubmit.click();
	}
};

GM_registerMenuCommand("Castle Age - Construction Logger Options", GM_config.open);

window.addEventListener("load", function(e) {
	CheckConstruction();
},false);