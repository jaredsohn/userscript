scr_meta=<><![CDATA[
// ==UserScript==
// @name           Friendstock Helper (X)
// @description	   Friendstock Xtreme Helper running on Facebook it do Autosplits and take the free Tokens
// @version        1.0.6
// @creator        by BrAiNee
// @include        http://apps.facebook.com/xfstock/*
// ==/UserScript==
]]></>.toString();

//Einstellungen, Settings

var app_uid     = XXXXXXXXXX;  //Hier unbedingt deine user id eingeben, Input your USER-ID here
var app_fid     = XXXXXXXXXX;  //Hier die ID von einem FREUND eingeben, Input a USER-ID from a friend here

//Einstellungen ENDE, Settings end

//Autoupdate-Function
CheckScriptForUpdate = {
 id: '47565', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
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
//Autoupdate-Function END

// SCRIPT STARTS HERE
var minutes      = 1;
var emerreload   = 60;
var app_root     = 'http://apps.facebook.com/xfstock/i/';
var home_url     = app_root + "profile?uid=" + app_uid;
var app_fid_fix  = "u=" + app_fid;
function main(){
  	var hec = document.createElement("span");
	hec.setAttribute("style", "background:yellow; color:red; border:2px solid black;padding:0em; position:fixed; top:30px;left:1px;");
	hec.setAttribute("id", "hec");
	hec.appendChild(document.createTextNode("Friendstock Helper 1.06 (X) loaded"));
	document.body.appendChild(hec);
	do_split();
	get_token();
	get_token_now();
}
Utils = new Object();
Utils.getElementsByXPath = function(expression, node){
  if (!node) node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var node;
  while (node = xpathResult.iterateNext()){
  result.push(node);
} 
  return result;
}
  var do_split = function do_split(){
  var split_url = Utils.getElementsByXPath('//div/a[contains(@href, "i/split")]');
  if(split_url.length == 1){
  var load = window.open(split_url[0], "FSXH-Window");
}}
  var get_token = function get_token(){
  var token_url = Utils.getElementsByXPath('//div/a[contains(@href, "i/bonustokenz")]');
  if(token_url.length == 1){
  var load = window.open(token_url[0], "FSXH-Window");
}}
  var get_token_now = function get_token_now(){
  var friend_url = Utils.getElementsByXPath('//div/a[contains(@href, \"' + app_fid_fix + '\")]');
  if(friend_url.length == 1){
  var load = window.open(friend_url[0], "FSXH-Window");
}}
setTimeout('window.open(\"' + home_url + '\", "FSXH-Window")', minutes*60000);
setTimeout('document.location.reload(true)', emerreload*60000);
if (document.addEventListener) 
{
window.addEventListener("load", main, false);
}
else 
{
window.document.onLoad = main();
}