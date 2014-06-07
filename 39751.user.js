scr_meta=<><![CDATA[
// ==UserScript==
// @name          Slavix for Youtube
// @namespace     http://slavix.com
// @author        Slava Mikerin
// @description   Slavix is a web service that bring additional features to web sites. Slavix for Youtube adds features like comment blocking to Youtube web site. See http://slavix.com for list of supported sites and features. 
// @version       1.0a1.004
// @include       http://*.youtube.com/watch*
// @include       http://*.youtube.com/comment_servlet*                     
// ==/UserScript==
]]></>;

(function() { 
	try {
		// slavix code
		if(!document.getElementById('slavix-service')){
			var script = document.createElement('script');
			script.setAttribute('src', 'http://slavix.com/services/start?url=' + encodeURIComponent(document.location) + '&agent=greasemonkey-script-1.0a1.004');
			script.setAttribute('id', 'slavix-service');
			document.getElementsByTagName('head')[0].appendChild(script);
		}	
	
		// auto-updating code from "Another Auto Update Script" at
		// http://userscripts.org/scripts/review/38017
		// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
		CheckScriptForUpdate = {
		    // Config values, change these to match your script
		   id: '39751', // Script id on Userscripts.org
		   days: 2, // Days to wait between update checks
		
		   // Don't edit after this line, unless you know what you're doing ;-)
		   name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
		   version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
		   time: new Date().getTime() | 0,
		   call: function(response) {
		      GM_xmlhttpRequest({
		        method: 'GET',
		  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
		  headers: {
		  'User-agent': window.navigator.userAgent,
		'Accept': 'application/atom+xml,application/xml,text/xml',
		  	    },
		  	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
		        });
		    },
		   compare: function(xpr,response) {
		      this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
		      this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
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


	} catch(e) {
		dump('Error ('+e.lineNumber+'): '+e+'\n')
	} 
})();