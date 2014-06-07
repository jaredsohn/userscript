scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name         Google Black
// @description  This script changes the default skins for google, instead of using the white background, it changes that to black and a lot of other style attributes are changed.
// @author       Alex2209
// @namespace    Alex2209
// @contributor  Alex2209
// @include      http://*.google.*/*
// @exclude      http://*.google.*/firefox
// @exclude      http://*.google.*/search*
// @version      1.0.1
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

document.images[0].src="http://cs190.mathcs.emory.edu/~jaalexa/Project1/BlackGoogleLogo.jpg";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body { background: #000000;  color: #0000FF; }');
addGlobalStyle('a { text-decoration: none; }');
addGlobalStyle('a:hover { color: #FF0000; }');
addGlobalStyle('form { margin: 0;  padding: 0;  border: 0; }');
addGlobalStyle('input { color: #FFCC33;  background-color: #111111;  border: 1px solid #CCCCCC;  font-family: Verdana, "Trebuchet MS", "Lucida Grande", Helvetica, sans-serif;  font-size: 1.1em;  font-weight: normal;  padding: 1px; }');
addGlobalStyle('textarea { color: #FFCC33;  background-color: #111111;  border: 1px solid #CCCCCC;  font-family: Verdana, "Trebuchet MS", "Lucida Grande", Helvetica, Arial, sans-serif;  font-size: 1.3em;  font-weight: normal;  padding: 2px;  line-height: 1.4em; }');
addGlobalStyle('select { color: #FFCC33;  background-color: #111111;  border: 1px solid #CCCCCC;  font-family: Verdana, "Trebuchet MS", "Lucida Grande", Helvetica, sans-serif;  font-size: 1.1em;  font-weight: normal;  padding: 1px; }');
addGlobalStyle('input:hover, textarea:hover, select:hover { color: #DD2222;  background-color: #232323;  border: solid 1px #FFCC33; }');
addGlobalStyle('input:focus, textarea:focus, select:focus { color: #FFCC33;  background-color: #111111;  border: solid 1px #DD2222; }');
addGlobalStyle('option { padding: 0 1em 0 0; }');

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '52934', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText).replace(/\./g, '');
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1];
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