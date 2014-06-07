// ==UserScript==
// @name           Script Auto-Updater
// @namespace      
// @author         
// ==/UserScript==

// Updater
function Updater(meta, lang) {
	// split up the lines, omitting those not containing "// @"
	var lines = meta.split(/[\r\n]+/).filter(/\/\/ @/);
	// initialize the result object with empty arrays for the enumerated properties
	this.data = { include: [], exclude: [], require: [], resource: {} };
	for each (var line in lines) {
		[l, n, v] = line.match(/\/\/ @(\S+)\s*(.*)/);
		if (this.data[n] instanceof Array)
		    this.data[n].push(v);
		else if (this.data[n] instanceof Object) {
		    [rName, rValue] = v.split(/\s+/); // each resource is named
		    this.data[n][rName] = rValue;
		}
		else
		    this.data[n] = v;
	}

	this.name= this.data["name"];
	this.script = this.data["updater:script"];
	this.meta = this.data["updater:meta"]?this.data["updater:meta"]:this.data["updater:script"];
	this.lang = lang;
	this.interval=this.data["updater:delay"]?parseFloat(this.data["updater:delay"]):24*60*60*1000;

	this.oldVersion = this.data["version"];
	this.nextUpdate = parseFloat(GM_getValue("nextUpdate","0"));

	this.now = ((new Date()).getTime());

	this.languages = {
		ro: {
			"install": "O noua versiune a "+this.name+" a aparut.\nInstalati acum?",
			"ok": "Da",
			"cancel": "Renunt",
			"noupdate": "Noua versiune a fost instalata.",
			"gm_command": "Verific versiune pentru "+this.name+"."
		},	
		de: {
			"install": "Eine neue Version von "+this.name+" ist verfügbar.\nJetzt installieren?",
			"ok": "Ok",
			"cancel": "Abbrechen",
			"noupdate": "Die aktuellste Version ist schon installiert.",
			"gm_command": "Nach Updates für "+this.name+" suchen."
		},
		en: {
			"install": "A new version of "+this.name+" is available.\nInstall now?",
			"ok": "Ok",
			"cancel": "Cancel",
			"noupdate": "The newest version is already installed.",
			"gm_command": "Check updates for"+this.name+"."
		},
		es: {
			"install": "Una nueva versión de "+this.name+" está disponible.\nInstalar ahora?",
			"ok": "Ok",
			"cancel": "Cancelar",
			"noupdate": "La nueva versión ya está instalada.",
			"gm_command": "Comprobar actualizaciones para"+this.name+"."
		},
	};
	
	if(this.languages[this.lang] == null)
		this.lang = "en";

	this.update = function() {
		if(update.now>update.nextUpdate || update.nextUpdate=="NaN") {
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: update.meta,
			    headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
				GM_setValue("nextUpdate",(update.now+update.interval).toString());

				var version="";
				var lines = responseDetails.responseText.split("\n");
				var i = 0;
				while(version=="" && lines[i].indexOf("==/UserScript==")==-1 && i<lines.length) {
					if(lines[i].indexOf("version")>=0) {
						version = lines[i].substring(lines[i].lastIndexOf(" ")+1);
						i=lines.length;
					}
					i++;
				}
				var v = version.split(".");
				var o = update.oldVersion.split(".");
				for(var s=0;s<Math.max(v.length,o.length);s++) {
					if(!v[s])
						v[s] = "";
					if(!o[s])
						o[s] = "";

					while(v[s].length<o[s].length)
						v[s] += "0";
					while(o[s].length<v[s].length)
						o[s] += "0";
				}
	
				version = v.join(".");
				update.oldVersion = o.join(".");
				
				version = v.join(".");
				update.oldVersion = o.join(".");

				if(version>update.oldVersion) {
					// Update-Code hier
					var install = confirm(update.languages[update.lang]["install"]);
					if(install) {
						window.location.href = update.script;
					}
				}
			    }
			});
		}
	};

	GM_registerMenuCommand(this.languages[this.lang]["gm_command"], function(){
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: update.meta,
		    headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		    onload: function(responseDetails) {
			GM_setValue("nextUpdate",(update.now+update.interval).toString());

			var version="";
			var lines = responseDetails.responseText.split("\n");
			var i = 0;
			while(version=="" && lines[i].indexOf("==/UserScript==")==-1 && i<lines.length) {
				if(lines[i].indexOf("@version")>=0)
					version = lines[i].substring(lines[i].lastIndexOf(" ")+1);
				i++;
			}

			var v = version.split(".");
			var o = update.oldVersion.split(".");
			for(var s=0;s<Math.max(v.length,o.length);s++) {
				if(!v[s])
					v[s] = "";
				if(!o[s])
					o[s] = "";

				while(v[s].length<o[s].length)
					v[s] += "0";
				while(o[s].length<v[s].length)
					o[s] += "0";
			}

			version = v.join(".");
			update.oldVersion = o.join(".");

			if(version>update.oldVersion) {
				// Update-Code hier
				var install = confirm(update.languages[update.lang]["install"]);
				if(install) {
					window.location.href = update.script;
				}
			}
			else
				alert(update.languages[update.lang]["noupdate"]);

		    }
		});
	});
}