scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           GMail Chat Hide Offline Buddies
// @namespace      http://vaseeharan.net
// @description    Hides offline buddies from the chat list
// @version        1.0
// @include        https://mail.google.com/*
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below metadata

gTable = null;
function getContactsTable() {
    var tables = document.getElementsByTagName('table');
    for(var i = 0; i < tables.length; i++) {
        if(tables[i].getAttribute('class') == 'vH' &&
           tables[i].getAttribute('role') == 'listbox') {
            var rows = tables[i].getElementsByTagName('tr');
            if(rows.length > 0) {
                return tables[i];
            }
        }
    }

    return null;
}

function modified(node) {
    gTable.removeEventListener("DOMSubtreeModified", modified, false);

    GM_log('modified')
    var crows = gTable.getElementsByTagName('tr');
    for(var i = 0; i < crows.length; i++) {
        var img = crows[i].getElementsByTagName('img');
        if(img.length < 1)
            continue;
        img = img[0];
        if(img.alt == "Offline" || img.alt == "") {
            crows[i].style.display = 'none';
            GM_log('hiding row ' + i);
        } else {
            crows[i].style.display = '';
            GM_log('unhiding row ' + i);
        }
    }
    GM_log('end modified')

    gTable.addEventListener("DOMSubtreeModified", modified, false);
}

function load() {
    if(getContactsTable() == gTable)
        return;
    
    if(gTable != null) {
        gTable.removeEventListener("DOMSubtreeModified", modified, false);
    }

    if((gTable = getContactsTable()) != null) {
        gTable.addEventListener("DOMSubtreeModified", modified, false);
        modified();
    }
}

window.addEventListener("DOMSubtreeModified", load, false);

var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '58573', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

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
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();