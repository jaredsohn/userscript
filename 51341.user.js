scr_meta=<><![CDATA[
// ==UserScript==
// @name            SU Monitor Reviews
// @version	    	0.4
// @namespace       http://www.foresthippy.com
// @description     ForestHippy
// @include         http://www.stumbleupon.com/url/*
// @license         http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var textUpdate, cmdMonitor, reviewDiv;
var baseurl = window.location.toString().toLowerCase();
var urlHashList = GM_getValue (baseurl + 'hashlist', '');
var newHashList = '';
var newCount = 0;

addControl ();

function addControl () {
	var sidebar = $xpath("//td[@class='sidebar']").snapshotItem(0);
	var mdiv = document.createElement ('div');
	var udiv = document.createElement ('div');
	var cdiv = document.createElement ('div');
	var th3 = document.createElement ('h3');
	textUpdate = document.createElement ('span');
	cmdMonitor = document.createElement ('a');
	
	if (urlHashList == '') {
		cmdMonitor.textContent = 'Start monitoring this page';
	} else {
		cmdMonitor.textContent = 'Find new/updated reviews';
	}
	cmdMonitor.href = 'javascript: void(0);';
	cmdMonitor.addEventListener ('click', updateReviews, false);
	
	th3.textContent = 'Monitor Reviews';
	
	//udiv.style.height = '2.5em';
	udiv.style.maxWidth = '190px';
	udiv.appendChild (textUpdate);
	
	//cdiv.style.height = '1.5em';
	cdiv.appendChild (cmdMonitor);
	
	mdiv.className = 'section';
	mdiv.appendChild (th3);
	mdiv.appendChild (cdiv);
	mdiv.appendChild (udiv);
	
	sidebar.insertBefore (mdiv, sidebar.firstChild);
}

function updateReviews () {
	var th1 = document.createElement ('h1');
	reviewDiv = $xpath("/html/body/div[4]/div/table/tbody/tr[2]/td/div").snapshotItem(0);
	reviewDiv.innerHTML = '';
	reviewDiv.parentNode.removeChild (reviewDiv.nextSibling.nextSibling); // Remove pagination
	newCount = 0;
	th1.innerHTML = 'New/updated review(s):';
	reviewDiv.appendChild (th1);
	cmdMonitor.textContent = '';
	procPage (baseurl);
}	

function procPage (url) {	
	var xmlhttp=null;
	
	textUpdate.innerHTML = 'Please wait!<br /><br />Opening ' + url;

	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
				textUpdate.innerHTML = 'Please wait!<br /><br />Reading ' + url;
			} else if (xmlhttp.readyState == 4) {
				textUpdate.innerHTML = 'Please wait!<br /><br />Processing ' + url;
				var page = xmlhttp.responseText;
				if (page != null) {
					var i;
					var dlmatch = page.match (/<dl class="dlReview">[\s\S]*?<\/dl>/gi);
					if (dlmatch) {
						for (i=0; i<dlmatch.length; i++) {
							var dlcontent = /<dd class="abs pdgTopSm">([\s\S]*?)<\/dd>/i.exec (dlmatch[i])[1];
							var thash = '<' + djb2str (dlcontent) + '>';
							GM_log ('Checking ' + thash);
							newHashList += thash;
							if (urlHashList.search (thash) == -1) {
								var tdiv = document.createElement ('div');
								tdiv.innerHTML = dlmatch[i];
								reviewDiv.appendChild (tdiv);
								urlHashList += thash;
								newCount ++;
							}
						}
					}
					
					var pnextmatch = /href="([^"]*?)" class="nextprev" id="paginationNext"/.exec (page);
					if (pnextmatch != null) {
						var newurl = pnextmatch[1];
						procPage (newurl);
					} else {
						textUpdate.innerHTML = 'Update Completed!<br /><br />Found ' + newCount + ' new or updated review(s)';
						GM_setValue (baseurl + 'hashlist', newHashList);
					}
				}		
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

	
function djb2str (inpstr) {
	var hash = 5381;
	var c, i;
	
	for (i=0; i<inpstr.length; i++) {
		c = inpstr.charCodeAt (i) & 255;
		hash = ((hash << 5) + hash) + c;
	}
	
	return hash.toString();
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }
		
//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '51341', // Script id on Userscripts.org
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
		
			

			


