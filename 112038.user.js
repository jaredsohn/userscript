scr_meta=<><![CDATA[
// ==UserScript==
// @name         Equestria Daily Banner Rotation
// @shortname    EqDBR
// @namespace    http://danneh.net
// @description  Random Equestria Daily Banners!
// @icon         http://eqdbr.byethost7.com/eqdbanners/eqdbr.png
// @match        http://www.equestriadaily.com/*
// @include      http://www.equestriadaily.com/*
// @run-at       document-end
// @version      8
// ==/UserScript==
]]></>.toString();


/* Options
*/
var mins_for_new_banner = 5;    // if a new banner is set, wait this many minutes
                                //  before resuming the banner randomisation

var include_old         = true; // old-style banners 
var include_old_special = true; // old-style special banners 
var include_new         = true; // new-style banners 
var include_new_special = true; // new-style special banners 


/* Banners
*/

var banner_url = "http://eqdbr.byethost7.com/eqdbanners/";
var banners = [];   // banner image urls
var banners_w = []; // banner px widths
var banners_h = []; // banner px heights

if (include_old) {
	// dash
		banners.push(banner_url + "old/Dash.png");
		banners_w.push("900"); banners_h.push("350");
	// ed1
		banners.push(banner_url + "old/ED1.png");
		banners_w.push("1100"); banners_h.push("350");
	// ed2
		banners.push(banner_url + "old/ED2.png");
		banners_w.push("667"); banners_h.push("367");
	// filly
		banners.push(banner_url + "old/Filly.png");
		banners_w.push("911"); banners_h.push("425");
	// fluttershy
		banners.push(banner_url + "old/Fluttershy.png");
		banners_w.push("1000"); banners_h.push("370");
	// luna
		banners.push(banner_url + "old/Luna.png");
		banners_w.push("682"); banners_h.push("397");
	// octavia
		banners.push(banner_url + "old/Octavia.png");
		banners_w.push("911"); banners_h.push("396");
	// pinkie don't give a
		banners.push(banner_url + "old/Pinkie%20Don%27t%20Give%20a%20Buck.png");
		banners_w.push("1000"); banners_h.push("350");
	// pinkie pie madness
		banners.push(banner_url + "old/Pinkie%20Pie.png");
		banners_w.push("700"); banners_h.push("325");
	// rarity
		banners.push(banner_url + "old/Rarity.png");
		banners_w.push("900"); banners_h.push("350");
	// trixie
		banners.push(banner_url + "old/Trixie.png");
		banners_w.push("700"); banners_h.push("350");
	// trollestia
		banners.push(banner_url + "old/Trollestia.png");
		banners_w.push("908"); banners_h.push("350");
	// twilight
		banners.push(banner_url + "old/Twilight.png");
		banners_w.push("911"); banners_h.push("425");
}

if (include_old_special) {
	// 2'000'000 pageviews
		banners.push(banner_url + "old/special/2%27000%27000%20Pageviews.png");
		banners_w.push("800"); banners_h.push("440");
	// 4th of july
		banners.push(banner_url + "old/special/4th%20of%20July.png");
		banners_w.push("1000"); banners_h.push("300");
	// battle
		banners.push(banner_url + "old/special/Battle.png");
		banners_w.push("700"); banners_h.push("350");
	// finals over
		banners.push(banner_url + "old/special/Finals%20Over.png");
		banners_w.push("900"); banners_h.push("350");
	// gala
		banners.push(banner_url + "old/special/Gala.png");
		banners_w.push("700"); banners_h.push("350");
	// help me
		banners.push(banner_url + "old/special/Help%20Me.png");
		banners_w.push("900"); banners_h.push("350");
	// new
		banners.push(banner_url + "old/special/New.png");
		banners_w.push("936"); banners_h.push("425");
}

if (include_new) {
	// fluttershy
		banners.push(banner_url + "new/Fluttershy.png");
		banners_w.push("1100"); banners_h.push("350");
	// trixie
		banners.push(banner_url + "new/Trixie.png");
		banners_w.push("1100"); banners_h.push("350");
}

if (include_new_special) {
	// brony day
		banners.push(banner_url + "new/special/Brony%20Appreciation%20Day.png");
		banners_w.push("1100"); banners_h.push("350");
	// 30'000'000 pageviews
		banners.push(banner_url + "new/special/30%27000%27000%20Pageviews.png");
		banners_w.push("1100"); banners_h.push("350");
}


/* Replacement Code
*/

/* from http://www.admixweb.com/2010/08/24/javascript-tip-get-a-random-number-between-two-integers/ */
function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var banner = document.getElementById("Header1_headerimg");
var currtime = new Date().getTime();

if (GM_getValue('current_banner_src', 'None') == 'None') {
	GM_setValue('current_banner_src', banner.src);
	GM_setValue('current_banner_time', (currtime - 1000*60*(mins_for_new_banner+1))+'');
}
if (GM_getValue('current_banner_src') != banner.src) {
	GM_setValue('current_banner_src', banner.src);
	GM_setValue('current_banner_time', currtime+'');
}
else {
	if (currtime > (parseInt(GM_getValue('current_banner_time', 0)) + 1000*60*mins_for_new_banner)) {
		
		banner._src = banner.src;       // backup old values for if the random banner fails
		banner._width = banner.width;
		banner._height = banner.height;
		banner._updatecalled = false;
		
		banner.onerror = function(){
			banner.src = banner._src;
			banner.width = banner._width;
			banner.height = banner._height;
			AnotherAutoUpdater.call();
			banner._updatecalled = true;
		}
		
		var banner_num = randomFromTo(0, banners.length-1);
		banner.src = banners[banner_num];
		banner.width = banners_w[banner_num];
		banner.height = banners_h[banner_num];
		
		banner.style.display = "block";      // Google Chrome likes to set
		banner.style.visibility = "visible"; //  these to none, hidden
	}
	else {
		// mins_for_new_banner has no passed, so leave new banner alone
	}
}



/* Autoupdate Script --- from https://www.userscripts.org/scripts/show/38017
*/
var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '112038', // Script id on Userscripts.org
 days: (1/60/24) * 60, // (that last '60' is how many Minutes instead) Days to wait between update checks

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
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined' && banner._updatecalled == false) AnotherAutoUpdater.check();