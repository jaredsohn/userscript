scr_meta=<><![CDATA[
// ==UserScript==
// @name			SU Blog Search
// @version			0.2
// @namespace		http://www.foresthippy.com
// @description		ForestHippy
// @include			http://*.stumbleupon.com/
// @include			http://*.stumbleupon.com/blog/
// @exclude			http://www.stumbleupon.com/*
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var baseurl = window.location.toString().match (/http:\/\/[^.]*.stumbleupon.com/);
var blogDiv = document.getElementById ('blogEntries');
var textUpdate;
var inputSearch;
var buttonSearch;
var PAUSE = 2000; // Politeness policy
var MAXLEVEL = 30;

var firstSearch = true;
var stop = false;
var started = false;

var searchTerms = new Array ();

var stopWords = ',a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your,';

addControls ();

function addControls () {
	var sidebar = $xpath("//td[@class='sidebar']").snapshotItem(0);
	var tdiv = document.createElement ('div');
	var th3 = document.createElement ('h3');
	var tbr = document.createElement ('br');
	var INPSTR = '<enter search terms>';
	buttonSearch = document.createElement ('button');
	textUpdate = document.createElement ('div');
	inputSearch = document.createElement ('input');
	
	tdiv.className = 'section clearfix';
	
	th3.innerHTML = 'Search blog';
	
	inputSearch.type = 'text';
	inputSearch.value = INPSTR;
	inputSearch.style.clear = 'both';
	inputSearch.style.color = '#a0a0a0';
	inputSearch.style.width = '180px';
	inputSearch.style.marginBottom = '10px';
	inputSearch.addEventListener ('focus', function () {
		if (this.value == INPSTR) {
			this.value = '';
			this.style.color = '#000000';
		}
	}, false);
	inputSearch.addEventListener ('blur', function () {
		if (this.value == '') {
			this.value = INPSTR;
			this.style.color = '#a0a0a0';
		}
	}, false);
	inputSearch.addEventListener ('keydown', function (event) {
		if (event.keyCode == 13) {
			doSearch ();
		}
	}, false);
	
	buttonSearch.innerHTML = 'Search';
	buttonSearch.addEventListener ('click', function () {
		if (started) {
			stop = true;
		} else {
			if (inputSearch.value != INPSTR) {
				doSearch ();
			}
		}
	}, false);
	
	textUpdate.style.clear = 'both';
	textUpdate.style.height = '1.5em';
	textUpdate.style.marginTop = '10px';
	
	tdiv.appendChild (th3);
	tdiv.appendChild (inputSearch);
	tdiv.appendChild (buttonSearch);
	tdiv.appendChild (tbr);
	tdiv.appendChild (textUpdate);
	
	sidebar.appendChild (tdiv);
}

function fadeText (opacity) {
	textUpdate.style.opacity = opacity;
	if (opacity >= 0.0) {
		setTimeout (function () { fadeText (opacity - 0.1); }, 80);
	} else {
		textUpdate.textContent = '';
		textUpdate.style.opacity = 1;		
	}
}

function doSearch () {
	initSearchTerms ();
	if (searchTerms.length > 0) {
		var th1 = document.createElement ('h1');
		var i, u;
		th1.innerHTML = 'Search results:';
		blogDiv.parentNode.removeChild (blogDiv.nextSibling.nextSibling); // Remove pagination
		buttonSearch.innerHTML = 'Stop';
		inputSearch.disabled = true;
		inputSearch.style.backgroundColor = '#d0d0d0';
		inputSearch.style.color = '#808080';
		stop = false;
		started = true;
		blogDiv.innerHTML = '';
		blogDiv.appendChild (th1);
		for (i=0; i<10; i++) {
			u = (i * 10 * MAXLEVEL).toString ();
			searchPage ('/archive/'+u+'/', 0);
		}
	}
}

function initSearchTerms () {
	searchTerms.length = 0;
	var i, tp;
	var inpstr = inputSearch.value;
	var phraserx = /"[\s\S]*?"/g;
	var phrases = inpstr.match (phraserx);
	inpstr = inpstr.replace (phraserx, '');
	inpstr = inpstr.replace (/^[\s]*|[\s]*$/g, '');
	var words = inpstr.split (/[\s]+/);
	if (phrases) {
		GM_log ('Search phrases: ' + phrases.length + ' - ' + phrases);
		for (i=0; i<phrases.length; i++) {
			tp = /"([^"]*)"/.exec (phrases[i]);
			if (stopWords.search (',' + tp[1] + ',') == -1) {
				searchTerms.push (tp[1].toLowerCase());
			}
		}
	}
	if (words) {
		GM_log ('Search words: ' + words.length + ' - ' + words);
		for (i=0; i<words.length; i++) {
			if (stopWords.search (',' + words[i] + ',') == -1 && words[i] != '') {
				searchTerms.push (words[i].toLowerCase());
			}
		}
	}
	if (searchTerms.length == 0 && (phrases || words)) {
		textUpdate.textContent = 'Search terms not unique enough!';
		fadeText (3.0);
	}
}
	
function searchPage (url, level) {
	textUpdate.textContent = 'Searching page ' + url;
	var xmlhttp=null, i;
		
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			} else if (xmlhttp.readyState == 4) {	
				var page = xmlhttp.responseText;
				var blogposts = page.match (/<dl class="dlSite dlBlog"[\s\S]*?<\/dl>/gi);
				var p, s, hitcount, postcontent;
				for (p=0; p<blogposts.length; p++) {
					hitcount = 0;
					postcontent = /<dd id="blog_contents_[0-9]*" class="abs nomargin nothumb">([\s\S]*?)<\/dd>/.exec (blogposts[p]);
					GM_log (postcontent[1])
					for (s=0; s<searchTerms.length; s++) {
						var stermrx = new RegExp ('[^a-z]+' + searchTerms[s] + '[^a-rt-z]+', 'gi');
						GM_log (stermrx);
						var matchterm = postcontent[1].match (stermrx);
						if (matchterm) {
							hitcount += matchterm.length;
						} 
					}
					if (hitcount > 0) {
						var tdiv = document.createElement ('div');
						var th3 = document.createElement ('h3');
						th3.innerHTML = 'Search term matches: ' + hitcount;
						tdiv.appendChild (th3);
						tdiv.innerHTML = tdiv.innerHTML + blogposts[p];
						tdiv.setAttribute ('hitcount', hitcount);
						blogDiv.appendChild (tdiv);
					}
				}
				var next = /<a href="([^"]*)" class="nextprev" id="paginationNext">/.exec (page);
				if (next && !stop && level < MAXLEVEL) {
					window.setTimeout(function () {
						searchPage (next[1], level+1);
					}, PAUSE);
				} else {
					started = false;
					buttonSearch.innerHTML = 'Search';
					inputSearch.disabled = false;
					inputSearch.style.backgroundColor = '#ffffff';
					inputSearch.style.color = '#000000';
					textUpdate.textContent = '';
				}
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

function $xpath(q,doc) { if (!doc || doc == '') {doc = document ; } return doc.evaluate(q, doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); }

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '50805', // Script id on Userscripts.org
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
	
	
	