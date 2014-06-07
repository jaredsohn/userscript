var scr_meta=<><![CDATA[
// ==UserScript==
// @name           4chan spam filter
// @namespace      Hammocks
// @description    removes spam, this is mostly for personal use but you're welcome to install it 
// @include        *4chan.org*
// @version        0.22356
// ==/UserScript==
]]></>.toString();

const spam = new Array(
	"Place the following in the large text box",
	"H E R SEX MOVIE",
	"http://cxxx.info/",
	"http://wley.info/",
	"http://tvf.me/",
	"http://qurl.co/",
	"http://golink.us/",
	"http://pint.ws/",
	"http://ar.cm/",
	"http://murl.fr/",
	"http://tipni.eu/",
	"lol /b/ro's I was forever alone untill I signed up and got laid the same night!"
);
var tables = document.getElementsByTagName("table");
for (var i = tables.length - 1; i >= 0; --i)
{
	var tCell = tables[i].rows[0].cells;
	for ( var j = tCell.length - 1; j >= 0; --j)
	{
		for(var s = spam.length - 1; s>=0; --s) {
			if(tCell[j].innerHTML.indexOf(spam[s]) >= 0) {
				var spamFaggery = tCell[j].parentNode;
				spamFaggery.parentNode.removeChild(spamFaggery);
				break;
			}
		}
	}
}

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '69068', // Script id on Userscripts.org
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