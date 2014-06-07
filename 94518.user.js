// ==UserScript==
// @name                Tumblr-utility
// @namespace		http://userscripts.org/scripts/show/93876	
// @description	        it does a tumblr good
// @include		http://www.tumblr.com/dashboard*
// @include		http://tumblr.com/dashboard*
// @version		0.38
// ==/UserScript==

/* Content Scope Runner */
/* 	The sandbox stuff is only going to run in the sandbox.
/*	it integrates itself into the DOM tree as an external script. 
/*	So basically, Greasemonkey API will not be used, but everything else will.
*/
if ('undefined' == typeof __PAGE_SCOPE_RUN__)
{
	(function page_scope_runner()
	{
		var my_src="("+page_scope_runner.caller.toString()+")();";
		var script=document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.innerHTML="var __PAGE_SCOPE_RUN__ = true;\n" + my_src;
		setTimeout(function()
		{
			document.body.appendChild(script);
			document.body.removeChild(script);
		}, 0);
	})();
return;
}

var tumbasz={
	version: "0.38",
	_firstRun: true,
	_timestampTries: 0,
	_APIQueries: [0,0],
	_APICache: [0,0],
	_config:{
		frequency: 2000,
		needPerma: true,
		needTimestamp: true,
		dateFormat: "%d.%m.%y - %h:%i",
		APIStat: false,
		unreadFavicon: true,
		needAudio: true,
	},
	_postCache: {},
	_settingsPanelConfig:[
		{
			description:"Alternate permalink location?",
			type:"checkbox",
			settingName:"needPerma"
		},
		{
			description:"Unread post count as favicon?",
			type:"checkbox",
			settingName:"unreadFavicon"
		},
		{
			description:"Insert timestamps?",
			type:"checkbox",
			settingName:"needTimestamp"
		},
		{
			description:"How would you like the date formatted? (%y - year, %m - month, %d - day, %h - hour, %i - min, %s - sec)",
			type:"text",
			settingName:"dateFormat"
		},
		{
			description:"Interval (in seconds) to try fetching timestamps again?",
			type:"text",
			settingName:"frequency",
			callbackBefore:function(v){return v/1000+" s"},
			callback:function(v){return parseInt(parseFloat(v)*1000)}
		},
		{
			description:"Link to download audio posts?",
			type:"checkbox",
			settingName:"needAudio",
		},
		{
			description:"API stats on bottom right sidebar?",
			type:"checkbox",
			settingName:"APIStat"
		}
	],
	_configName:"default",
	_getPosts: function(filter)
	{
		var posts_o=document.getElementById("posts").childNodes;
		var posts=Array();
		for(var i=0;i<posts_o.length;i++)
		{
			if(	typeof posts_o[i].className != "undefined" &&
				posts_o[i].className.search("post")!=-1 &&
				posts_o[i].className.search("new_post")==-1 && 
				(!filter || posts_o[i].className.search(filter)!=-1))
			{
				posts.push(posts_o[i]);
			}
		}
		return posts;
	},
	_initConfig: function()
	{
		if(typeof window.localStorage == "undefined")
		{
			console.log("Nincs localStorage!");
			return false;
		}
		
		if(	typeof window.localStorage["tumbaszConfigName"] == "undefined" ||
			typeof window.localStorage["tumbaszVersion"] == "undefined" ||
			window.localStorage["tumbaszVersion"]!=this.version)
		{
			window.localStorage["tumbaszVersion"]=this.version;
			window.localStorage["tumbaszConfigName"]="default";
			window.localStorage["tumbaszConfig_default"]=JSON.stringify(this._config);
			window.localStorage["tumbaszFirstRun"]="1";
		}
		else
		{
			this._configName=window.localStorage["tumbaszConfigName"];
			window.localStorage["tumbaszFirstRun"]="0";
		}
		this.loadConfig(this._configName);
		
		this._firstRun=parseInt(window.localStorage["tumbaszFirstRun"]);
		return true;
	},
	_initCache: function()
	{
		if(typeof window.localStorage == "undefined")
		{
			console.log("Nincs localStorage!");
			return false;
		}
		if(typeof window.localStorage["tumbaszPostCache"] == "undefined")
		{
			window.localStorage["tumbaszPostCache"]="{}";
		}
		else
		{
			this._postCache=JSON.parse(window.localStorage["tumbaszPostCache"]);
			this._cleanCache();
		}
		return true;
	},
	_saveCache: function()
	{
		if(typeof window.localStorage == "undefined")
		{
			console.log("Nincs localStorage!");
			return false;
		}
		window.localStorage["tumbaszPostCache"]=JSON.stringify(this._postCache);
	},
	_cleanCache: function()
	{
		for(var i=0;i<this._postCache.length;i++)
		{
			var c=this._postCache[i];
			var postDate=new Date(parseInt(c.split(",",1)));
			var compare=new Date();
			compare.setTime(compare.getTime()-3600000*24)
			if(postDate < compare)
			{
				this._postCache.splice(i, 1);
			}
		}
		this._saveCache();
	},
	_initGUI: function()
	{
		var settings=document.createElement("a");
		settings.setAttribute("href", "#");
		settings.addEventListener("click", function(e){e.preventDefault(); tumbasz.openSettingsPanel(); return false;});
		settings.appendChild(document.createTextNode("Tumblr Utility"));
		document.getElementById("account_menu").appendChild(settings);
		if(this._firstRun)
		{
			var help=document.createElement("div");
			help.setAttribute("id", "tumbasz-help-container");
			help.appendChild(document.createTextNode("yo. this is a bunch of stuff to make the dashboard friendlier.  i hope it helps! (click to close)"));
			help.addEventListener("click", function(e){this.parentNode.removeChild(this);});
			document.getElementById("account_menu").parentNode.appendChild(help);
		}
		if(this.getSetting("APIStat"))
		{
			var logContainer=document.createElement("div");
			logContainer.setAttribute("class", "dashboard_nav_item");
			logContainer.setAttribute("id", "tumbasz-apistat");
			logContainer.setAttribute("style", "padding-left:0; position:relative;");
			var logTitle=document.createElement("div");
			logTitle.setAttribute("class", "dashboard_nav_title");
			logTitle.appendChild(document.createTextNode("Tumblr-utility"));
			var log=document.createElement("ul");
			log.setAttribute("class", "dashboard_subpages");
			var logDataSum=document.createElement("li");
			logDataSum.appendChild(document.createTextNode("All API queries: "+(this._APIQueries[0]+this._APICache[0])+"/"+(this._APIQueries[1]+this._APICache[1])));
			var logDataCache=document.createElement("li");
			logDataCache.appendChild(document.createTextNode("API Cached: "+this._APICache[0]+"/"+this._APICache[1]));
			var logDataAPI=document.createElement("li");
			logDataAPI.appendChild(document.createTextNode("API Queries: "+this._APIQueries[0]+"/"+this._APIQueries[1]));
			
			log.appendChild(logDataSum);
			log.appendChild(logDataCache);
			log.appendChild(logDataAPI);
			logContainer.appendChild(logTitle);
			logContainer.appendChild(log);
			document.getElementById("right_column").appendChild(logContainer);
		}
	},
	init: function()
	{
		this._initConfig();
		this._initCache();
		this.runTheseSometimes();
		this._clock=window.setInterval(this.runTheseSometimes, this.getSetting("frequency"));
		this.addMyCSS();
		this._initGUI();
	},
	loadConfig: function(configName)
	{
		if(typeof window.localStorage["tumbaszConfig_"+configName] == "undefined")
		{
			console.log("No '"+configName+"' tumblr-settings!");
			return false;
		}
		this._config=JSON.parse(window.localStorage["tumbaszConfig_"+configName]);
		return true;
	},
	saveConfig: function(configName)
	{
		window.localStorage["tumbaszConfig_"+configName]=JSON.stringify(this._config);
		return true;
	},
	getSetting: function(settingName)
	{
		return this._config[settingName];
	},
	setSetting: function(settingName, value)
	{
		this._config[settingName]=value;
	},
	addMyCSS: function()
	{
		var style=document.createElement("style");
		var stylet=document.createTextNode(
		"/*Tumbaszszkript CSS*/ \
		.tumbasz-timestamp{font-size: 12px;font-weight:normal;} \
		#tumbasz-help-container{position:absolute;width:200px;background-color:#1F354C;-webkit-border-radius:5px;padding:5px;white-space:normal;font-size:12px;text-align:left;top:30px}\
		#tumbasz-settings-container{ \
			z-index:9999; \
			width:400px; \
			height:300px; \
			position:fixed; \
			top:50%; \
			left:50%; \
			margin-top:-150px; \
			margin-left:-200px; \
			background-color:white; \
			padding: 20px; \
			-webkit-border-radius:10px} \
		#tumbasz-settings-shadow{z-index:9998;top:0px;left:0px;position:fixed;height:100%;width:100%;background-color:rgba(0,0,0,0.7)} \
		#tumbasz-settings-container h2{margin-top:5px} \
		#tumbasz-settings-container a{display:block;margin: 5px 0px;font-weight:bold;font-size:16px;} \
		#tumbasz-settings-container ul{list-style:none;padding:0;height:140px;overflow:auto;} \
		#tumbasz-settings-container li{border-bottom: 1px dotted #ddd;margin-top: 10px;} \
		#tumbasz-settings-container label{float: left;width:235px;font-size:12px} \
		#tumbasz-settings-container input{float: right;border:none;text-align:right;} \
		#tumbasz-settings-container input[type=text]{background-color:#f0f0f0;}");
		style.appendChild(stylet);
		document.getElementsByTagName("head")[0].appendChild(style);
	},
	runTheseSometimes: function()
	{
		if(tumbasz.getSetting("needPerma"))
		{
			tumbasz.refreshPerma();
		}
		if(tumbasz.getSetting("needTimestamp"))
		{
			tumbasz.refreshTimestamp();
		}
		if(tumbasz.getSetting("APIStat"))
		{
			tumbasz.refreshAPIStat();
		}
		if(tumbasz.getSetting("unreadFavicon"))
		{
			tumbasz.refreshFavicon();
		}
		if(tumbasz.getSetting("needAudio"))
		{
			tumbasz.refreshAudio();
		}
	},
	refreshPerma: function()
	{
		var posts=this._getPosts();
		for(var i=0;i<posts.length;i++)
		{
			if(posts[i].className.search("hasPermalink") == -1)
			{
				var a=document.createElement("a");
				a.appendChild(document.createTextNode("∞link"));
				a.setAttribute("href", document.getElementById("permalink_"+posts[i].id.substr(5)).href);
				posts[i].className+=" hasPermalink";
				posts[i].childNodes[3].insertBefore(a, posts[i].childNodes[3].childNodes[0]);
			}
		}
	},
	refreshTimestamp: function()
	{
		if(this._timestampTries>10)
		{
			return;
		}
		this._timestampTries++;
		var posts=this._getPosts();
		/*if(document.getElementById("tumbasz-timestamp-callback")==null)
		{
			var callback=document.createElement("script");
			callback.setAttribute("id", "tumbasz-timestamp-callback");
			callback.setAttribute("type", "text/javascript");
			callback.innerHTML=
				'function timestamp_callback(json)'+
				'{var postDate=new Date(json.posts[0]["unix-timestamp"]*1000);'+
				'var postDateString='+
				'postDate.getFullYear()+"."+((postDate.getMonth()+1)<10?"0":"")+(postDate.getMonth()+1)+'+
				'"."+(postDate.getDate()<10?"0":"")+postDate.getDate()+'+
				'" "+(postDate.getHours()<10?"0":"")+postDate.getHours()+'+
				'":"+(postDate.getMinutes()<10?"0":"")+postDate.getMinutes();'+
				'var timestamp=document.createElement("span");'+
				'timestamp.setAttribute("class", "tumbasz-timestamp");'+
				'timestamp.appendChild(document.createTextNode(postDateString));'+
				'document.getElementById("post_"+json.posts[0].id).childNodes[7].appendChild(document.createElement("br"));'+
				'document.getElementById("post_"+json.posts[0].id).childNodes[7].appendChild(timestamp);'+
				'document.getElementById("post_"+json.posts[0].id).className+=" hasTimestamp";}';
			document.getElementsByTagName("head")[0].appendChild(callback);
		}*/
		for(var i=0;i<posts.length;i++)
		{
			if(posts[i].className.search("hasTimestamp") == -1)
			{
				if(typeof this._postCache[parseInt(posts[i].id.substr(5))] == "undefined")
				{
					var script=document.createElement("script");
					script.setAttribute("type", "text/javascript");
					script.setAttribute("src", posts[i].childNodes[posts[i].childNodes.length-2].childNodes[1].href+"api/read/json?id="+posts[i].id.substr(5)+"&callback=tumbasz.timestampCallback");
					script.addEventListener("error", function(e){tumbasz.tumblrAPIError(e);});
					document.getElementsByTagName("head")[0].appendChild(script);
					this._APIQueries[0]++;
				}
				else
				{
					this._APICache[0]++;
					this.timestampCallback(this._postCache[parseInt(posts[i].id.substr(5))]);
				}
			}
		}
	},
	timestampCallback: function(json)
	{
		if(typeof json == "object")
		{
			var postDate=this.formatDate(json.posts[0]["unix-timestamp"]*1000);
			var postId=json.posts[0].id;
			this._APIQueries[1]++;
		}
		else
		{
			var postDate=this.formatDate(parseInt(json.split(",",1)));
			var postId=json.split(",")[1];
			this._APICache[1]++;
		}
		var timestamp=document.createElement("span");
		timestamp.setAttribute("class", "tumbasz-timestamp");
		timestamp.appendChild(document.createTextNode(postDate));
		if(document.getElementById("post_"+postId).childNodes[7].nodeType==8)
		{
			var div=document.createElement("div");
			div.setAttribute("class", "post_info");
			document.getElementById("post_"+postId).insertBefore(div, document.getElementById("post_"+postId).childNodes[7]);
		}
		else
		{
			document.getElementById("post_"+postId).childNodes[7].appendChild(document.createElement("br"));
		}
		document.getElementById("post_"+postId).childNodes[7].appendChild(timestamp);
		document.getElementById("post_"+postId).className+=" hasTimestamp";
		if(typeof this._postCache[parseInt(postId)] == "undefined")
		{
			this._postCache[parseInt(postId)]=(json.posts[0]["unix-timestamp"]*1000).toString()+","+postId;
			this._saveCache();
		}
	},
	formatDate: function(timestamp)
	{
		var date=new Date(timestamp);
		return this.getSetting("dateFormat").
			replace(/%y/gi, date.getFullYear()).
			replace(/%m/gi, ((date.getMonth()+1)<10?"0":"")+(date.getMonth()+1)).
			replace(/%d/gi, ((date.getDate())<10?"0":"")+(date.getDate())).
			replace(/%h/gi, ((date.getHours())<10?"0":"")+(date.getHours())).
			replace(/%i/gi, ((date.getMinutes())<10?"0":"")+(date.getMinutes())).
			replace(/%s/gi, ((date.getSeconds())<10?"0":"")+(date.getSeconds()));
	},
	openSettingsPanel: function()
	{
		var shadow=document.createElement("div");
		shadow.setAttribute("id", "tumbasz-settings-shadow");
		var panelContainer=document.createElement("div");
		panelContainer.setAttribute("id", "tumbasz-settings-container");
		var settingsTitle=document.createElement("h2");
		settingsTitle.appendChild(document.createTextNode("extra super secret settings"));
		var version=document.createElement("h3");
		version.appendChild(document.createTextNode("Version: "+this.version));
		var settingsList=document.createElement("ul");
		for(var i=0;i<this._settingsPanelConfig.length;i++)
		{
			var setting=document.createElement("li");
			var label=document.createElement("label");
			var input=document.createElement("input");
			var clear=document.createElement("div");
			clear.setAttribute("class", "clear");
			label.setAttribute("for", "tumbasz-settingsPanel-setting-"+i);
			label.appendChild(document.createTextNode(this._settingsPanelConfig[i].description));
			input.setAttribute("id", "tumbasz-settingsPanel-setting-"+i);
			input.setAttribute("type", this._settingsPanelConfig[i].type);
			var settingValue=
				this._settingsPanelConfig[i].callbackBefore ?
					this._settingsPanelConfig[i].callbackBefore(this.getSetting(this._settingsPanelConfig[i].settingName)) :
					this.getSetting(this._settingsPanelConfig[i].settingName);
			switch(this._settingsPanelConfig[i].type)
			{
				case "text":
					input.value=settingValue;
					break;
				case "checkbox":
					input.checked=settingValue;
					break;
			}
			setting.appendChild(label);
			setting.appendChild(input);
			setting.appendChild(clear);
			settingsList.appendChild(setting);
		}
		var save=document.createElement("a");
		var close=document.createElement("a");
		save.appendChild(document.createTextNode("Save and close! :D "));
		close.appendChild(document.createTextNode("...or not! D:"));
		save.addEventListener("click", function(e){e.preventDefault();tumbasz.closeSettingsPanel(true);});
		close.addEventListener("click", function(e){e.preventDefault();tumbasz.closeSettingsPanel(false);});
		save.setAttribute("href", "#");
		close.setAttribute("href", "#");
		
		panelContainer.appendChild(settingsTitle);
		panelContainer.appendChild(version);
		panelContainer.appendChild(settingsList);
		panelContainer.appendChild(save);
		panelContainer.appendChild(close);
		document.getElementsByTagName("body")[0].appendChild(shadow);
		document.getElementsByTagName("body")[0].appendChild(panelContainer);
	},
	closeSettingsPanel: function(save)
	{
		if(save)
		{
			for(var i=0;i<this._settingsPanelConfig.length;i++)
			{
				var id="tumbasz-settingsPanel-setting-"+i;
				switch(this._settingsPanelConfig[i].type)
				{
					case "text":
						var value=document.getElementById(id).value;
						break;
					case "checkbox":
						var value=document.getElementById(id).checked;
						break;
				}
				value=this._settingsPanelConfig[i].callback?this._settingsPanelConfig[i].callback(value):value;
				
				this.setSetting(this._settingsPanelConfig[i].settingName, value);
			}
			this.saveConfig(this._configName);
		}
		document.getElementById("tumbasz-settings-container").parentNode.removeChild(document.getElementById("tumbasz-settings-container"));
		document.getElementById("tumbasz-settings-shadow").parentNode.removeChild(document.getElementById("tumbasz-settings-shadow"));
	},
	tumblrAPIError: function(e)
	{
		//console.log(e);
	},
	refreshAPIStat: function()
	{
		if(!document.getElementById("tumbasz-apistat"))
		{
			return;
		}
		document.getElementById("tumbasz-apistat").childNodes[1].childNodes[0].childNodes[0].data="All API queries: "+(this._APIQueries[0]+this._APICache[0])+"/"+(this._APIQueries[1]+this._APICache[1]);
		document.getElementById("tumbasz-apistat").childNodes[1].childNodes[1].childNodes[0].data="API Cached: "+this._APICache[0]+"/"+this._APICache[1];
		document.getElementById("tumbasz-apistat").childNodes[1].childNodes[2].childNodes[0].data="API Queries: "+this._APIQueries[0]+"/"+this._APIQueries[1];
	},
	refreshFavicon: function()
	{
		if(!document.getElementById("new_post_notice_container").childNodes[0])
		{
			return false;
		}
		var unread=parseInt(document.getElementById("new_post_notice_container").childNodes[0].title);
		var canvas=document.createElement("canvas");
		canvas.setAttribute("width", 16);
		canvas.setAttribute("height", 16);
		var ctx=canvas.getContext("2d");
		var bg=new Image();
		bg.addEventListener("load", function(e)
		{
			ctx.drawImage(bg,0,0);
			ctx.fillStyle="black";
			ctx.beginPath();
			ctx.arc(12,12,5,0,Math.PI*2,true);
			ctx.fill();
			ctx.fillStyle="white";
			ctx.textAlign="center";
			ctx.font="8px sans-serif";
			ctx.fillText(unread, 12, 15);
			document.getElementsByTagName("link")[0].href=canvas.toDataURL();
		});
		bg.setAttribute("src", "data:image/gif;base64,R0lGODlhEAAQAOZuAD9cdyA3TT5bdkBdeCA3Tj1adTZSbCI6VEFeeUtphDhVb0VjfiM7UjdTbiE4T0dlgEhmgjxYc0lnglZfajRQazlVcENgezpWcbrAxzxZdDtYcyM6UT5adSQ7UkRhfDNPaUhlgUJgezlWcDdUbsDJ1FBpgSI5UCE5UL3EzlZtgz1ZdOHh5UFfepadpt/i6Ofo7cDI0is8TVljbjtXcj9JVi8/UTZSbbS6w3CHnTdTbThUbkVifTpXckdlgUlmgkdkgEpngzZTbSs6Sr/I0TpXcV9wgkZkf2V6j0JfejRJXjNMYzhPZUBbdDtYckFbc46hsuHm7D1YcWZ/lkRifUZkgCI6UUpogzVJXrvEzkhmgThUb4WZrOHl7EVifqu0v72/xba9xipDYENhfEZjf0lngyg0QkpohDRQajVRax82TUtphd/f4+vu8yg/WP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAAQABAAAAfYgG5tg4SFhYIHZooJao2OjWEdbT4SZJZQbE6KZoxqkg8PPSBbbGxllZZAVgxtCwtjT1ylMjhSIFkQEKxiHh6lv2wwTEZUPxttCCxIQy6lGBgtNVM7XccAAANRKKVlSVdLIRYWVW0FBRwCJGwvZdgDAwgIJm1NGhERWCtrZecC/gAn2lQQceECmDVrJmg4UiJDBhUO2jQYoUOLF4QYixDhMSOigY82UtzA+IWGAgUVCLQ5QwGNSyUxJpQpIyRIjgYqD3z4cKZnz5Yu0Rwg4CaN0aNIAygN4CYQADs=");
	},
	refreshAudio: function()
	{
		var posts=this._getPosts("audio");
		for(var i=0;i<posts.length;i++)
		{
			if(posts[i].className.search("hasAudioLink") == -1)
			{
				var a=document.createElement("a");
				var embed=posts[i].childNodes[15].childNodes[1].childNodes[0].childNodes[0];
				a.appendChild(document.createTextNode("Let√∂lt√©s!"));
				a.setAttribute("href", embed.getAttribute("src").
					substring(embed.getAttribute('src').indexOf('audio_file=')+11).
					replace('&color='+embed.getAttribute('src').substring(embed.getAttribute('src').length-6),'?plead=please-dont-download-this-or-our-lawyers-wont-let-us-host-audio'));
				posts[i].className+=" hasAudioLink";
				embed.parentNode.appendChild(document.createElement("br"));
				embed.parentNode.appendChild(a);
			}
		}
	}
	
};
window.tumbasz=tumbasz;
tumbasz.init();