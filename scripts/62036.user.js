// ==UserScript==
// @name           updateTest
// @namespace      hirak99
// @include        http://userscripts.org/home
// @version        5
// ==/UserScript==

AutoUpdater = {
	// Config values, change these to match your script
	id: '62036', // Script id on Userscripts.org
	minutes: 2*24*60, // Minutes to wait between update checks

// Don't edit after this line, unless you know what you're doing ;-)
	time: new Date().getTime(),
	statsVar: 'AutoUpdate_',
	call: function() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {AutoUpdater.compare(xpr);}
		});
	},
	compare: function(xpr) {
			alert('entered compare');
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		GM_setValue(this.statsVar+"last", this.time.toString());
		if ((this.xname) && this.name=="*") {
			this.name=this.xname[1];
			this.version=this.xversion[1];
			GM_setValue(this.statsVar+"name",this.name);
			GM_setValue(this.statsVar+"version",this.version);
			alert('values set');
		}
		else {
			alert('Here');
			if ((this.xversion) && (this.xname[1] == this.name)) {
				this.xversion = this.xversion[1];
				this.xname = this.xname[1];
			} else {
				//if (xpr.responseText.match("the page you requested doesn't exist") || this.xname[1] != this.name) GM_setValue(this.statsVar+"last", '-1');
				alert('Script '+this.name+' (id:'+this.id+') could not autoupdate from userscripts.org!');
				return;
			}
			if (this.xversion!=this.version) {
				if (this.xversion.replace(/\./g,'') > this.version.replace(/\./g,'')) {
					if (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) {
						GM_setValue(this.statsVar+"version", this.xversion);
						top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
					}
					else if (confirm('Do you want to turn off auto updating for this script?')) {
						GM_setValue(this.statsVar+"last", '-1');
						AutoUpdater.addMenu("Enable "+this.name+" auto update");
						alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
					}
				}
				//else alert("You are running a higher version of "+this.name+" ("+this.version+") than the server ("+this.xversion+").");
			}
		}
	},
	addMenu: function(menu) {
		GM_registerMenuCommand(menu,
			function(){GM_setValue(this.statsVar+"last", new Date().getTime().toString());AutoUpdater.call();}
		);
	},
	check: function() {
		this.last = parseInt(GM_getValue(this.statsVar+"last",'0'));
		this.version = GM_getValue(this.statsVar+"version","*");
		this.name = GM_getValue(this.statsVar+"name","*");

		if (this.last == -1)
			AutoUpdater.addMenu("Enable "+this.name+" auto update");
		else if (this.time <= this.last + 1000*60*this.minutes)
			AutoUpdater.addMenu("Check '"+this.name+"' for updates now!");
		else AutoUpdater.call();
	}
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AutoUpdater.check();
