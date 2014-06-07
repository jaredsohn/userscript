scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Calendar - Today's Color
// @namespace      Chris4
// @description    Simple script to change the color of 'today' in month view of Google Calendar.
// @version        1.1.4
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==
]]></>.toString()

ss = document.styleSheets[0];

/*****************************************************
INSTRUCTIONS

Simply replace the background color code with 
one of your choice, below these instructions.

Color suggestions:
#E3E4FA = Light blue
#D1E6B3 = Light green
#EED5D2 = Light pink

For more hex color codes, check out this website: 
http://cloford.com/resources/colours/500col.htm
*****************************************************/

ss.insertRule('.st-bg-today {background: #E3E4FA none repeat scroll 0%;}', ss.cssRules.length);

/*************************
Auto Updater begins here.
**************************/
CheckScriptForUpdate = {
 id: '46418', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
 GM_xmlhttpRequest({
 method: 'GET',
	url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	headers: {
	'User-agent': window.navigator.userAgent,
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
 });
 },
 compare: function(xpr,response) {
 this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
 this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
 if ( (this.xversion) && (this.xname[1] == this.name) ) {
 this.xversion = this.xversion[1];
 this.xname = this.xname[1];
 } else {
 if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
 return false;
 }
 if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
 GM_setValue('updated', this.time);
 GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
 } else if ( (this.xversion) && (this.xversion != this.version) ) {
 if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
 } else {
	GM_setValue('updated', this.time);
 }
 } else {
 if(response) alert('No updates available for '+this.name);
 GM_setValue('updated', this.time);
 }
 },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
 this.call();
 } else if (GM_getValue('updated', 0) == 'off') {
 GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
 } else {
 GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
 }
 }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();
