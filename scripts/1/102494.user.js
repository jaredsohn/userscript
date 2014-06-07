/*==============================================================================================================

GC-PersonalMap 
by JR849 - http://jr849.de/greasemonkey-skripte/

//==============================================================================================================
This is a Greasemonkey user script.

Description:
Hides all the found and hidden caches on the map on gc.com.

If you have any questions, contact me via contactform (Kontakt) at www.jr849.de ;-)
//==============================================================================================================
*/
scr_meta=<><![CDATA[
// ==UserScript==
// @name             GC-PersonalMap
// @description      Enables the personalization every time you open the map on gc.com.
// @version       	 1.03
// @copyright        JR849 - http://jr849.de/greasemonkey-skripte/
// @license       	 Attribution-Noncommercial-Share Alike (http://creativecommons.org/licenses/by-nc-sa/3.0/)
// @include			 http://www.geocaching.com/map/default.aspx*
// ==/UserScript==
]]></>.toString();
//==============================================================================================================

(function() {
var chkBoxFinds;
var chkBoxHides;
chkBoxFinds = document.getElementsByClassName('ct_mf ct_displayed pt_toggle');
chkBoxHides = document.getElementsByClassName('ct_mo ct_displayed pt_toggle');
window.addEventListener("load", function(e) {
	click(chkBoxFinds[0]);
	click(chkBoxHides[0]);
}, false);	

//==========================================================================================
//  function click(elm)
//		Simulate Click
//==========================================================================================
function click(elm){
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

//==========================================================================================
// Another Auto Update Script
// by sizzlemctwizzle (Thanks!)
//==========================================================================================

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '102494', // Script id on Userscripts.org
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
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();
})();