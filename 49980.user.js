scr_meta=<><![CDATA[
// ==UserScript==
// @name			SU Extended What's New
// @version			1.4
// @namespace		http://www.foresthippy.com
// @description		ForestHippy
// @include			http://*.stumbleupon.com/home/
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var homeurl = window.location.toString();
var baseurl = homeurl.match (/http:\/\/[^.]*.stumbleupon.com\//);

var wndiv = getElementsByClassName ('listUpdates clearfix', 'div')[0];
var rrdiv = getElementsByClassName ('clear pdgTopLg', 'div')[0];
var textUpdate = document.createElement ('span');
var updateDiv = document.createElement ('div');

var subsDls = new Array ();

var last30subs = GM_getValue (baseurl + 'last30', '').split (',');

var today = new Date ();
var todaysposts = GM_getValue (baseurl + 'todaysposts', '');
if (todaysposts.length > 16384) {
	todaysposts = todaysposts.substr (8192);
}

var count = 0, subscount = 0, visitcount = 0;

var MAXLEVEL = 1;
var SKIPCOUNT = 60;
var MAXVISITS = GM_getValue (baseurl + 'maxvisits', 20);
var TARGETPOSTS = GM_getValue (baseurl + 'targetposts', 10);

var getAllNewPosts = GM_getValue (baseurl + 'getall', false);
var optionsOn = false;

updateDiv.style.height = '1.5em';
updateDiv.style.marginTop = '10px';
updateDiv.style.marginBottom = '10px';

updateDiv.appendChild (textUpdate);
wndiv.parentNode.insertBefore (updateDiv, wndiv);
	
getSubs ('/subscriptions/', 0);

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

function addCmd () {
	var cmds = getElementsByClassName ('cmds', 'ul')[0];
	var li = document.createElement ('li');
	var a = document.createElement ('a');

	// Main link
	li.className = 'textlink';
	a.textContent = 'Extended What\'s New';
	a.href = 'javascript:void(0)';
	a.addEventListener ('click', displayExtWhatsNew, true);
	li.appendChild (a);
	cmds.appendChild (li);
	
	// Options
	li = document.createElement ('li');
	a = document.createElement ('a');
	li.className = 'textlink';
	a.textContent = '<-Options';
	a.href = 'javascript:void(0)';
	a.addEventListener ('click', toggleOptions, true);
	li.appendChild (a);
	cmds.appendChild (li);
}

function addOptions () {
	var tdiv = document.createElement ('div');
	var tn, rad, br, p, b;
	tdiv.style.display = 'none';
	tdiv.id = 'jdmEWNOptions';
	tdiv.style.marginTop = '10px';
	tdiv.style.marginLeft = '400px';
	
	p = document.createElement ('p');
	
	b = document.createElement ('b');
	tn = document.createTextNode ('New posts retrieved per visit:');
	b.appendChild (tn);
	p.appendChild (b);
	br = document.createElement ('br');
	p.appendChild (br);
	
	// One post per visit radio
	rad = document.createElement ('input');
	rad.type = 'radio';
	rad.name = 'JDMgetall';
	rad.addEventListener ('click', function () {
		getAllNewPosts = false;
		GM_setValue (baseurl + 'getall', false);
	}, true);
	if (!getAllNewPosts) { rad.checked = true; }
	p.appendChild (rad);
	tn = document.createTextNode ('One');
	p.appendChild (tn);
	
	// All posts per visit radio
	rad = document.createElement ('input');
	rad.type = 'radio';
	rad.className = 'mgnLeftLg';
	rad.name = 'JDMgetall';
	rad.addEventListener ('click', function () {
		getAllNewPosts = true;
		GM_setValue (baseurl + 'getall', true);
	}, true);
	if (getAllNewPosts) { rad.checked = true; }
	p.appendChild (rad);
	tn = document.createTextNode ('All');
	p.appendChild (tn);
	
	tdiv.appendChild (p);
	
	p = document.createElement ('p');
	
	b = document.createElement ('b');
	tn = document.createTextNode ('Maximum visits / target posts:');
	b.appendChild (tn);
	p.appendChild (b);
	br = document.createElement ('br');
	p.appendChild (br);
	
	// 10/5 option
	rad = document.createElement ('input');
	rad.type = 'radio';
	rad.name = 'JDMmaxmin';
	rad.addEventListener ('click', function () {
		MAXVISITS = 10;
		TARGETPOSTS = 5;
		GM_setValue (baseurl + 'maxvisits', 10);
		GM_setValue (baseurl + 'targetposts', 5);
	}, true);
	if (MAXVISITS == 10) { rad.checked = true; }
	p.appendChild (rad);
	tn = document.createTextNode ('10 / 5');
	p.appendChild (tn);
	tdiv.appendChild (p);
	
	// 20/10 option
	rad = document.createElement ('input');
	rad.type = 'radio';
	rad.name = 'JDMmaxmin';
	rad.className = 'mgnLeftLg';
	rad.addEventListener ('click', function () {
		MAXVISITS = 20;
		TARGETPOSTS = 10;
		GM_setValue (baseurl + 'maxvisits', 20);
		GM_setValue (baseurl + 'targetposts', 10);
	}, true);
	if (MAXVISITS == 20) { rad.checked = true; }
	p.appendChild (rad);
	tn = document.createTextNode ('20 / 10');
	p.appendChild (tn);
	tdiv.appendChild (p);
	
	updateDiv.parentNode.insertBefore (tdiv, updateDiv);
}

function fadeText (opacity) {
	textUpdate.style.opacity = opacity.toString();
	if (opacity >= 0.0) {
		setTimeout (function () { fadeText (opacity - 0.05); }, 80);
	} else {
		textUpdate.textContent = '';
		textUpdate.style.opacity = 1;		
	}
}

function toggleOptions () {
	var optdiv = document.getElementById ('jdmEWNOptions');
	if (optionsOn) {
		optdiv.style.display = 'none';
		optionsOn = false;
	} else {
		optdiv.style.display = 'block';
		optionsOn = true;
	}
}

function displayExtWhatsNew () {
	if (last30subs.length > SKIPCOUNT) {
		var i, l;
		l = last30subs.length - SKIPCOUNT;
			
		for (i=0; i<l; i++) {
			last30subs.shift();
		}
	}
	
	wndiv.innerHTML = '';
	rrdiv.innerHTML = '';
	count = 0;
	subscount = 0;
	visitcount = 0;
	
	tryNextSub ();
}

function tryNextSub () {
	if (count < TARGETPOSTS && subscount < subsDls.length && visitcount < MAXVISITS) {
	
		var hrefregexp = /href="(\S*?)"/i;
		var hrefmatch = hrefregexp.exec(subsDls[subscount])[1];
		var visited = false;
		var i;
		
		for (i=0; i<last30subs.length; i++) {
			if (last30subs[i] == hrefmatch) {
				visited = true;
				break;
			}
		}
		
		if (!visited) {
			last30subs.push (hrefmatch);
			textUpdate.textContent = 'Reading '+hrefmatch;
			GM_log ('Opening ' + hrefmatch);
			visitcount++;
			GM_xmlhttpRequest({
				method:'GET',
				url:hrefmatch,
				headers:{
					"User-Agent":'Mozilla/4.0 (compatible) Greasemonkey',
					"Accept":"text/xml"
				},
				onload:function(response) {
					if (response.readyState == 4) {
						var page = response.responseText;
						var blogposts = page.match (/<dl class="dlSite dlBlog"[\s\S]*?\/dl>/ig);
						if (blogposts != null) {
							for (i=0; i<blogposts.length; i++) {
								var dateexec = /([a-zA-Z]*\s[0-9]{1,2},\s)?([0-9]{4}\s)?([0-9]{1,2}):([0-9]{2})([ap]{1}m)/; // Extract SU date into components
								var dateresult = dateexec.exec (blogposts[i]);	
								if (dateresult[5] == 'pm') { // Convert to 24 hr
									dateresult[3] = Number (dateresult[3]) + 12;
								}
								var postdate;
								if (dateresult[1] != undefined) {
									var datestr;
									if (dateresult[2] == undefined) {
										datestr = dateresult[1] + today.getFullYear() + ' ' + dateresult[3] + ':' + dateresult[4];
									} else {
										datestr = dateresult[1] + dateresult[2] + dateresult[3] + ':' + dateresult[4];
									}
									postdate = Date.parse (datestr);
								} else {
									postdate = today.getTime();
								}
								
								if ((today.getTime () - postdate) < 86400000) { // Posted in last 24 hrs
									var idexec = /id="blog_([0-9]*?)"/i; // Get post ID
									var postid = idexec.exec(blogposts[i])[1];
									if (todaysposts.search (postid) == -1) { // Not seen yet
										todaysposts += postid + ',';
										var newdiv = document.createElement ('div');
										newdiv.innerHTML = subsDls[subscount] + blogposts[i];
										newdiv.className = 'clearfix';
										newdiv.style.padding = '10px 0 10px 0';
										wndiv.appendChild (newdiv);
										count += 1;
										GM_log ('Adding post id:' + postid);
										if (!getAllNewPosts) {
											break;
										}
									} else {
										GM_log ('Already read post id:' + postid);
									}
								} else {
									GM_log ('Post out of date (over 24 hours old)');
								}
							}
						} else {
							GM_log ('Tile view. Page ignored.');
						} // Tile view - too bad
						subscount ++;
						tryNextSub ();
					} 
				}
			});
		} else {
			textUpdate.textContent = 'Skipping ' + hrefmatch;
			subscount ++;
			tryNextSub ();
		}
	} else {
		var last30str = '';
		
		GM_log ('Visited: ' + visitcount);
		GM_log ('Checked: ' + subscount);
		GM_log ('Posts added:' + count);
				
		textUpdate.textContent = visitcount + ' pages visited, ' + count + ' new posts found.';
		fadeText (3.0);
				
		for (i=0; i<last30subs.length; i++) {
			last30str += last30subs[i] + ',';
		}
		
		GM_setValue (baseurl + 'last30', last30str);
		GM_setValue (baseurl + 'todaysposts', todaysposts);
			
	}
}

function getSubs (url,level) {
	var xmlhttp=null;
	var i;
	
	textUpdate.textContent = 'Reading ' + url;
	
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			
			} else if (xmlhttp.readyState == 4) {
				var page = xmlhttp.responseText;
				if (page != null) {
					var tsubs = page.match (/<dl class="vcardLg">[\s\S]*?<\/dt>/ig); // Gets thumbnail and user name
					for (i=0; i<tsubs.length; i++) {
						subsDls.push (tsubs[i] += '</dl>'); // Closes extracted dl tag
					}		
					var pnextexp = /href="([^"]*?)" class="nextprev" id="paginationNext"/gi;
					var pnextmatch = pnextexp.exec (page);
					if (pnextmatch != null && level < MAXLEVEL) {
						getSubs (pnextmatch[1], level+1)
					} else {
						addOptions ();
						addCmd ();
						textUpdate.textContent = 'Finished reading subscriptions';
						/*if (subsDls.length < SKIPCOUNT) {
							SKIPCOUNT = subsDls.length / 2;
						}*/
						fadeText (1.0);
					}
				}
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '49980', // Script id on Userscripts.org
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
	
	
	