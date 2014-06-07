scr_meta=<><![CDATA[
// ==UserScript==
// @name            SU Hide Group Posters
// @version	    	0.4
// @namespace       http://www.foresthippy.com
// @description     ForestHippy
// @include         http://*.group.stumbleupon.com/forum/*
// @exclude         http://*.group.stumbleupon.com/forum/
// @license         http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var allPosts = $xpath("/html/body/table[3]/tbody/tr[3]/td/table/tbody/tr[count(td)=2]");
var baseurl = window.location.toString().match (/http:\/\/[^.]*.group.stumbleupon.com\//);

addControls ();
hidePosters ();

function addControls () {
	var i;
	for (i=0; i<allPosts.snapshotLength; i++) {
		var post = allPosts.snapshotItem(i);
		var a = document.createElement('a');
		a.href = 'javascript:void(0);';
		a.textContent = 'Hide poster';
		a.style.marginLeft = '10px';
		a.className = 'mini';
		a.addEventListener ('click', function () {
			var eloffset = 0;
			var noffset = 0;
			if (this.parentNode.childNodes.length > 2) {
				eloffset = this.parentNode.childNodes.length - 2;
			}
			if (this.parentNode.childNodes[0].name == 'end') {
				noffset = 1;
			}
			if (this.textContent == 'Hide poster') {
				GM_setValue (baseurl + 'hidelist', GM_getValue (baseurl + 'hidelist', '') + 
				'<' + this.parentNode.childNodes[noffset].textContent.substr(1) + '>');
			} else {
				GM_setValue (baseurl + 'hidelist', GM_getValue (baseurl + 'hidelist', '').replace ('<' + this.parentNode.childNodes[noffset].textContent.substr(1) + '>', ''));
			}
			hidePosters ();
		}, false);
		post.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].appendChild (a);
	}
}

function hidePosters () {
	var i;
	for (i=0; i<allPosts.snapshotLength; i++) {
		var post = allPosts.snapshotItem(i);
		var nametd = post.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		var eloffset = 0;
		var noffset = 0;
		if (nametd.childNodes.length > 2) {
			eloffset = nametd.childNodes.length - 2;
		}
		if (nametd.childNodes[0].name == 'end') {
			noffset = 1;
		}
		var name = '<' + nametd.childNodes[noffset].textContent.substr(1) + '>';
		if (GM_getValue (baseurl + 'hidelist', '').search (name) > -1) {
			nametd.childNodes[1+eloffset].textContent = 'Unhide poster';
			if (post.childNodes[0].childNodes.length == 3) {
				post.childNodes[0].childNodes[2].style.display = 'none';
			}
			post.childNodes[0].childNodes[0].childNodes[0].style.display = 'none';
			post.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].style.display = 'none';
		} else {
			nametd.childNodes[1+eloffset].textContent = 'Hide poster';
			if (post.childNodes[0].childNodes.length == 3) {
				post.childNodes[0].childNodes[2].style.display = '';
			}
			post.childNodes[0].childNodes[0].childNodes[0].style.display = '';
			post.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].style.display = '';
		}
	}
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '50347', // Script id on Userscripts.org
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
		
			

			
		

