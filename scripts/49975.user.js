scr_meta=<><![CDATA[
// ==UserScript==
// @name			SU Status Indicator
// @version			1.4
// @namespace		http://www.foresthippy.com
// @description		ForestHippy
// @include			http://*.stumbleupon.com/
// @include			http://*.stumbleupon.com/blog/
// @include			http://*.stumbleupon.com/prefs/settings/
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var currenturl = window.location.toString();
var baseurl = currenturl.match (/http:\/\/[^.]*.stumbleupon.com\//);

var statusData = new Array ();
statusData[0] = new Array ('(None)', '');
statusData[1] = new Array ('(Custom)', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/cpwqac" /> ');
statusData[2] = new Array ('Online', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/cptmxt" /> Online</ul>');
statusData[3] = new Array ('At work', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/deee5p" /> At work</ul>');
statusData[4] = new Array ('Busy', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/deee5p" /> Busy</ul>');
statusData[5] = new Array ('Be right back', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/cyyg2l" /> Be right back</ul>');
statusData[6] = new Array ('Away', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/cyyg2l" /> Away</ul>');
statusData[7] = new Array ('Offline', '<ul title="Status" class="dividerBottom textEm mgnBottomSm"><img src="http://tinyurl.com/clswuq" /> Offline</ul>');

var gmEnabled = GM_getValue (baseurl + '.enabled', false);
var ftoken = document.getElementsByName ('ftoken')[0]; 

if (currenturl.search(/\/prefs\/settings\//) > -1) {
	if (gmEnabled) {
		getPrefs ();
	}
	addScriptControl ();
} else {
	if (ftoken) { // ftoken only available if logged in, and your own page, so will be false when visiting another stumbler
		if (gmEnabled) {
			addStatusControl ();
		}			
	}
}

function getElementsByClassName (cn, tn) {
	var el = new Array ();
	var i;
	var alltn = document.getElementsByTagName (tn);
	for (i=0; i<alltn.length; i++) {
		if (alltn[i].className == cn) {
			el.push (alltn[i]);
		}
	}
	return el;
}

function setStatus (status) {
	var postdata = '';
	var xmlhttp=null;
	var url = baseurl + 'prefs/settings/';
	var i, num;
	
	// Get gm variables
	var default_profile_view = GM_getValue (baseurl + '.default_profile_view', 0);
	var thumbnail_prefs_favorites = GM_getValue (baseurl + '.thumbnail_prefs_favorites', 1);
	var view_blog_videos = GM_getValue (baseurl + '.view_blog_videos', 0);
	var herefor = new Array (5);
	var description = GM_getValue (baseurl + '.description', '');
	
	for (i=0; i<5; i++) {
		herefor[i] = GM_getValue (baseurl + '.herefor' + i, 0);
	}	

	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			} else if (xmlhttp.readyState == 4) {
				//alert ('Success');
			} // Er, yippee!
		};
		xmlhttp.open('POST',url,true);
		postdata += 'prefs=1&';
		postdata += 'ftoken='+ftoken.value+'&';
		postdata += 'action=SavePrefs&';
		postdata += 'default_profile_view='+default_profile_view+'&';
		if (thumbnail_prefs_favorites == 1) {
			postdata += 'thumbnail_prefs_favorites=1&';
		}
		if (view_blog_videos == 1) {
			postdata += 'view_blog_videos=1&';
		}
		for (i=0; i<5; i++) {
			if (herefor[i] == 1) {
				postdata += 'herefor[]='+i+'&';
			}
		}
		postdata += 'description='+status+encodeURIComponent(description);
		
		xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlhttp.setRequestHeader('Content-Length', postdata.length);
		xmlhttp.setRequestHeader('Connection', 'close');
		xmlhttp.send(postdata); // multipart/form-data
	}
}

function setCustomStatus () {
	var ctext = document.getElementById ('jdmcustomtext');
	GM_setValue (baseurl + '.custom', ctext.value);
	setStatus (statusData[1][1]+ctext.value+'</ul>');
}

function addStatusControl () {
	var gmcurrstatus = GM_getValue (baseurl + '.status', 0);
	var gmcustomstatus = GM_getValue (baseurl + '.custom', '');
	var sidebar = getElementsByClassName ('sidebar', 'td')[0];
	var statusdiv = document.createElement ('div');
	var statusselect = document.createElement ('select');
	var label = document.createElement ('h3');
	var customdiv = document.createElement ('div');
	var customlabel = document.createElement ('h3');
	var customtext = document.createElement ('input');
	var customlink = document.createElement ('a');
	var toption;
	var i;
	
	label.textContent = 'Set status:';
	
	statusdiv.className = 'section clearfix';
	
	for (i=0; i<statusData.length; i++) {
		toption = document.createElement ('option');
		toption.text = statusData[i][0];
		if (i == gmcurrstatus) {
			toption.selected = true;
		}
		statusselect.appendChild (toption);
	}
	
	statusselect.addEventListener ('change', function () { 
		var cdiv = document.getElementById ('jdmcustomdiv');
		if (this.selectedIndex == 1) {
			cdiv.style.display = 'block';
		} else {
			if (cdiv.style.display == 'block') {
				cdiv.style.display = 'none';
			}
			setStatus (statusData[this.selectedIndex][1]); 
		}
		GM_setValue (baseurl + '.status', this.selectedIndex);
	}, true);
	
	statusdiv.appendChild (label);
	statusdiv.appendChild (statusselect);
	
	//customdiv.className = 'section clearfix';
	customdiv.id = 'jdmcustomdiv';
	customdiv.style.marginTop = '10px';
	
	customlabel.textContent = 'Custom status:';
	
	customtext.style.marginRight = '10px';
	customtext.id = 'jdmcustomtext';
	customtext.value = gmcustomstatus;
	
	customlink.textContent = 'Set';
	customlink.href = 'javascript:void(0)';
	customlink.className = 'btnGreenSm';
	customlink.addEventListener ('click', setCustomStatus, true);
	
	customdiv.appendChild (customlabel);
	customdiv.appendChild (customtext);
	customdiv.appendChild (customlink);
	
	if (gmcurrstatus == 1) {
		customdiv.style.display = 'block';
	} else {
		customdiv.style.display = 'none';
	}	
	
	sidebar.insertBefore (statusdiv, sidebar.firstChild);
	statusdiv.appendChild (customdiv);
}

function encodeUni (instr) {
	var i, outstr = '';
	for (i=0; i<instr.length; i++) {
		if (instr.charCodeAt (i) > 127) {
			outstr += '&#' + instr.charCodeAt(i) + ';';
		} else {
			outstr += instr.charAt(i);
		}
	}
	return outstr;
}

function getPrefs () {
	var default_profile_view = document.getElementsByName ('default_profile_view')[0];
	var thumbnail_prefs_favorites = document.getElementsByName ('thumbnail_prefs_favorites')[0];
	var view_blog_videos = document.getElementsByName ('view_blog_videos')[0];
	var herefor = document.getElementsByName ('herefor[]');
	var description = getElementsByClassName ('form left half','div')[0].childNodes[3]; // Couldn't access dom of TA directly, so used this parentnode.childnode bodge
	var i, tdesc;
	
	if (default_profile_view.checked) { // If first radio button is checked, value = 1
		GM_setValue (baseurl + '.default_profile_view', 1);
	} else {
		GM_setValue (baseurl + '.default_profile_view', 0);
	}
	
	if (thumbnail_prefs_favorites.checked) {
		GM_setValue (baseurl + '.thumbnail_prefs_favorites', 1);
	} else {
		GM_setValue (baseurl + '.thumbnail_prefs_favorites', 0);
	}
	
	if (view_blog_videos.checked) {
		GM_setValue (baseurl + '.view_blog_videos', 1);
	} else {
		GM_setValue (baseurl + '.view_blog_videos', 0);
	}
	
	for (i=0; i < herefor.length; i++) {
		if (herefor[i].checked) {
			GM_setValue (baseurl + '.herefor' + i, 1);
		} else {
			GM_setValue (baseurl + '.herefor' + i, 0);
		}
	}
	
	tdesc = description.value;
	description.value = tdesc.replace (/<ul title="Status"[\s\S]*?\/ul>/gi, '');
	GM_setValue (baseurl + '.description', encodeUni (description.value));
	var gmcurrstatus = GM_getValue (baseurl + '.status', 0);
	
	if (gmcurrstatus == 1) {
		setStatus (statusData[1][1]+GM_getValue(baseurl + '.custom', '')+'</ul>');
	} else {
		setStatus (statusData[gmcurrstatus][1]);
	}
}

function addScriptControl () {
	var formdiv = getElementsByClassName ('form clearfix', 'div')[0];
	var p = document.createElement ('p');
	var input = document.createElement ('input');
	var label = document.createElement ('label');
	var gmenabled = GM_getValue (baseurl + '.enabled', false);
	
	p.className = 'fieldLabel';
	p.textContent = 'Status indicator script';
	
	input.type = 'checkbox';
	if (gmenabled) {
		input.checked = true;
	}
	input.id = 'jdmstatusenabled';
	input.addEventListener ('click', function () {
		if (this.checked) {
			GM_setValue (baseurl + '.enabled', true);
		} else {			
			GM_setValue (baseurl + '.enabled', false);
		}
	}, true);
	
	label.textContent = 'Enabled';
	
	formdiv.appendChild (p);
	formdiv.appendChild (input);
	formdiv.appendChild (label);
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '49975', // Script id on Userscripts.org
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
	
	
	