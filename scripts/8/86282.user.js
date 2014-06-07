scr_meta=<><![CDATA[
// ==UserScript==
// @name           BattleComm
// @description    IRCKommunication für das Schlachtfeld
// @namespace      http://economy.erepublik.com/de/accounts/1234424
// @include        http://www.erepublik.com/*/battlefield/*      
// @version 1.0.6
// ==/UserScript==
]]></>.toString();
var AnotherAutoUpdater = {
 id: '221773', 
 days: 1, 
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
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
var despuesde = document.getElementById("content");
var iframe = document.createElement("iframe");
iframe.src = 'http://qchat.rizon.net/?channels=BWKRK'
iframe.style.width="100%";
iframe.style.height="100%";
iframe.frameborder=0;
iframe.style.border="0";
var diviframe = document.createElement("div");
diviframe.style.width="690px";
diviframe.style.height="300px";
diviframe.style.border="1";
diviframe.appendChild(iframe);
despuesde.insertBefore(diviframe,despuesde.lastChild);