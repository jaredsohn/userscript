scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           VeGGie Delta Database v2.0
// @namespace      http://userscripts.org/scripts/show/47197
// @description    VeGGie database records empty astros, bases, and fleet to make it easily searchable. A must for any guild playing astroempires.
// @include        http://delta.astroempires.com/*
// @exclude        http://*.astroempires.com/login.aspx*
// @exclude        http://*.astroempires.com/home.aspx*
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

var scriptName='VeGGie';
var scriptId='47197';
var scriptVersion=2.0;

	var elmNewContent = document.createElement('jack');
	elmNewContent.innerHTML = '<div style=" position:fixed; top:5; left:0; border: 1px grey solid;"><td><u>VeGGie v2.0</u><br><a href="http://veggie.humanpj.com" target="_blank">Database</a><br><a href="http://veggie.humanpj.com/rec/help.php" target="_blank">Help</a><br><a href="http://userscripts.org/scripts/show/47197" target="_blank">Update</a><br></p></div>';
document.body.appendChild(elmNewContent)

{

GM_xmlhttpRequest({
    method:"POST",
url:"http://veggie.humanpj.com/rec/rec_delta.php",
    headers:{
      "User-Agent":"COCK",
      "Content-Type":"application/x-www-form-urlencoded"
    },
    data:"url=" + encodeURIComponent(window.location.toString()) + "&html=" + encodeURIComponent(document.body.innerHTML)
  });
}

throbber = "http://veggie.humanpj.com/rec/indicator.gif"
var scripts = new Array(); //so there's no errors
makebutton = 0; //don't make the AE analyser button at default.

// for the map pages. Scouting, etc
if ((document.location.href.match(/map.aspx\?loc/))) {
	var scripts = [ 'http://veggie.humanpj.com/rec/ae_scouter.js'];
	makebutton = 0;
}


if (makebutton == 1) {
	ihtml = document.body.innerHTML;
	ihtml = ihtml.replace(/Logout<\/a>/,"Logout</a><div id='aeana'><a style='cursor: pointer'>Analyze</a></div><a href='http://delta.humanpj.com/' target='_new'>Database</a> - <a href='http://delta.humanpj.com/rec/help.php' target='_new'>Script Readme</a>");
	document.body.innerHTML = ihtml;
}

for (i in scripts) {
	var script = document.createElement('script');
	script.src = scripts[i];
	document.getElementsByTagName('head')[0].appendChild(script);
}

CheckScriptForUpdate = {
            // Config values, change these to match your script
           id: '47197', // Script id on Userscripts.org
           days: 2, // Days to wait between update checks

name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
           version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
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
              this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
              this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
              if ( (this.xversion) && (this.xname[1] == this.name) ) {
                this.xversion = this.xversion[1];
                this.xname = this.xname[1];
              } else {
                if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
                return false;
              }
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