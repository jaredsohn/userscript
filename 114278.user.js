// ==UserScript== The following code is released under public domain.

// @name           Rice-o-matic
// @include        http://*freerice.com/*

var AutoUpdater_89869 = {
    id: 89869,
    days: 2,
    @name: "Rice-o-matic",
    @description: winning
    version: "1.5",
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
	    url: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
	    onload: function(xpr) {AutoUpdater_89869.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_89869.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_89869', new Date().getTime()+'');
            AutoUpdater_89869.call(true, true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split('.'),
            l_parts = l_version.split('.'),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	    GM_setValue('updated_89869', 'off');
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        if ( updated && confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?') ) {
            try { 
                location.href = 'http://userscripts.org/scripts/source/' + this.id + '.user.js'; 
            } catch(e) {}
        } else if ( this.xversion && updated ) {
            if(confirm('Do you want to turn off auto updating for this script?')) {
	        GM_setValue('updated_89869', 'off');
	        this.enable();
	        alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
            }
        } else if (response)
            alert('No updates available for '+this.name);
    },
    check: function() {
        if (GM_getValue('updated_89869', 0) == "off")
            this.enable();
        else {
            if (+this.time > (+GM_getValue('updated_89869', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_89869', this.time+'');
                this.call(false, true);
            }
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_89869', new Date().getTime()+'');
                AutoUpdater_89869.call(true, true)
            });
        }
    }
};
if (typeof GM_xmlhttpRequest !== 'undefined' &&
    typeof GM_updatingEnabled === 'undefined') // has an updater?
    try {
        if (unsafeWindow.frameElement === null) 
            AutoUpdater_89869.check();
    } catch(e) {
        AutoUpdater_89869.check();
    }

// ==/UserScript==