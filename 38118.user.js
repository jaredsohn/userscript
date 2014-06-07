// ==UserScript==
// @name           Create Mafia invites.
// @namespace      Mafia friends.
// @description    Automatically invites people to your mafia that you find on the fight page. Dill altered the  the original code  from Andy Calderbanks  "Create mobwars invites" http://userscripts.org/scripts/show/30725
// @include        http://apps.facebook.com/inthemafia/fight.php
// @include        http://apps.new.facebook.com/inthemafia/fight.php
// @include        http://apps.facebook.com/inthemafia/recruit.php
// @include        http://apps.new.facebook.com/inthemafia/recruit.php
// ==/UserScript==

document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, ((arguments.length > 1) ? arguments[1] : this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};

//Check if we're using the new or old layout
var newlayout = false
if (document.location.href.indexOf('apps.new.facebook.com') != -1) 
	newlayout = true;

//Grab the last known request form ID
var reqID = GM_getValue('reqformID',false);

//Get unix epoch time
var now = Math.floor(new Date().getTime() / 1000);

//Set how long its been since we've grabbed an ID last time.
var since = now - GM_getValue('getID',0);

//If we don't have a reqID or its older than a day, grab a fresh one.
if ((!reqID || since > 86400) && document.location.href.indexOf('fight') != -1) {
	document.location.href = 'http://apps.'+((newlayout)?'new.':'')+'facebook.com/inthemafia/recruit.php';
	return;
}

if (document.location.href.indexOf('fight') == -1) {
	Array.forEach(document.getElementsByTagName("input"),
		function(obj){
			if (obj.id.indexOf('mfs_typeahead_req_form_') != -1) {
				GM_setValue('reqformID',obj.id.replace('mfs_typeahead_req_form_',''));
				GM_setValue('getID',now);
			}
		}
	);
}
else {
	var vars = false;
	var members = document.getElementsByXPath("//a[contains(@href,'/inthemafia/stats.php?user_id=')]");
	//First link is always yourself from the 'my stats' link at the top
	members.shift();
	Array.forEach(members,
		function(member){
			var mobid = member.href.match(/\d+$/);
			vars = vars + '&ids%5B%5D=' + mobid;
		}
	);
	if (vars) {
		vars = reqID + '=Start+Typing+a+Friend%27s+Name' + vars;
		GM_xmlhttpRequest({
			method: "POST",
			url: 'http://apps.'+((newlayout)?'new.':'')+'facebook.com/inthemafia/recruit.php?action=create',
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:vars,
			onload: function(xhr) { }
	  });
	}
}
