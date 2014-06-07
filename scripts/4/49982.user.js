scr_meta=<><![CDATA[
// ==UserScript==
// @name            SU Display Reviews of Reviews as Threads
// @version	    	0.4
// @namespace       http://www.foresthippy.com
// @description     ForestHippy
// @include         http://*.stumbleupon.com/*
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

function processPage (url, pdiv, div, threadid) {
	GM_xmlhttpRequest ({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var dlmatch = responseDetails.responseText.match(/<dl[\s\S]*?\/dl>/i);
				if (dlmatch != null) {
					dl = dlmatch[0];
					div.innerHTML = dl;
					var urlregexp = /(http%.*?)"/i;
					var urlexec = urlregexp.exec(dl);
					if (urlexec != null) {
						var url = unescape(urlexec[1]);
						if (url.search(/stumbleupon.com\/review/i) > -1) {
							var ndiv = document.createElement ('div');
							ndiv.className = 'thread' + threadid;
							ndiv.style.display = 'none';
							pdiv.appendChild (ndiv);
							processPage (url, pdiv, ndiv, threadid);
						}
					}
				}
			}
		}
	});
}

function toggleThread (thread) {
	var posts = document.getElementsByTagName ('div');
	var i;
	var teststr = 'thread' + thread.id;
	for (i=0; i<posts.length; i++) {
		if (posts[i].className == teststr) {
			if (posts[i].style.display == 'none') {
				posts[i].style.display = 'block';
			} else posts[i].style.display = 'none';
		}
	}
}

var dls = document.getElementsByTagName ('dl');
var i;

for (i=0; i<dls.length; i++) {
	if (dls[i].className == 'dlSite dlBlog') {
		var urlregexp = /(http%.*?)"/i;
		var urlexec = urlregexp.exec(dls[i].innerHTML);
		if (urlexec != null) {
			var url = unescape(urlexec[1]);
			if (url.search(/stumbleupon.com\/review/i) > -1) {
				var pdiv = document.createElement ('div');
				var dparent = dls[i].parentNode;
				var toggle = document.createElement ('a');
				var up = document.createTextNode ('^');
				var tn = document.createTextNode ('Show/Hide Thread');
				toggle.href = 'javascript:void(0)';
				toggle.appendChild (tn);
				toggle.addEventListener('click', function () { toggleThread (this); }, true);
				toggle.id = i;
				pdiv.style.marginLeft = '20px';
				pdiv.appendChild (up);
				pdiv.appendChild (toggle);
				dparent.insertBefore (pdiv, dls[i].nextSibling);
				var div = document.createElement ('div');
				div.className = 'thread' + i;
				div.style.display = 'none';
				pdiv.appendChild (div);
				processPage (url, pdiv, div, i);
			}
		}
	}
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '49982', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
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
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();				
		
			

			
		

