scr_meta=<><![CDATA[
// ==UserScript==
// @name           Question Tracker UserScript
// @namespace      http://mohawkcollege.ca.libanalytics.com/tw.php?i=779&d=614&w=405&ml=0
// @description    Types in Timestamp and selects Co-Op Student
//				   by Bryan Rolfe
// @include        *
// @version        2.0
// ==/UserScript==
]]></>.toString();
var theURL = document.URL;
if(theURL.indexOf("http://mohawkcollege.ca.libanalytics.com/tw.php?i=779&d=614&w=405") != -1){
document.forms[0][12].value = "10523";
document.forms[0][23].checked = true;
document.forms[0][34].value = "1";
var url = document.URL;
if(url.indexOf("#techbar") != -1){
document.forms[0][20].checked = true;	
}
if(url.indexOf("#collab") != -1){
document.forms[0][16].checked = true;
}
if(url.indexOf("#express") != -1){
document.forms[0][30].checked = true;
} else {
document.forms[0][29].checked = true;
}
if(url.indexOf("#wifisubmit") != -1){
document.forms.rform.lab1.value = "Wifi/Wireless Instruction";
document.forms.rform.subbtn.click();
} else {
document.forms.rform.elements.lab1.focus();	
}
if(url.indexOf("#wifi") != -1){
document.forms.rform.lab1.value = "Wifi/Wireless Instruction";
} else {
document.forms.rform.elements.lab1.focus();	
}
CheckScriptForUpdate = {  // Config values, change these to match your script
 id: '157329', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
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
}