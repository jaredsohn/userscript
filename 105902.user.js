// ==UserScript==
// @name				iTube
// @description			Youtube Downloader !
// @version			2.5
// @include			http://*.youtube.com/watch?*
// @include			https://*.youtube.com/watch?*
// ==/UserScript==

var version = "2.5";
var host = document.location.host;

function inject(func)
{
	var script = document.createElement("script");
	script.setAttribute("type", "application/javascript");
	script.appendChild(document.createTextNode("_ytd_localVersion=\"" + version + "\";(" + func + ")();"));
	document.body.appendChild(script);
}

if (host.substr(host.length - 11) == "youtube.com" && host != "m.youtube.com") inject(function() {
	var language = document.documentElement.getAttribute("lang");
	var watchFlag = document.getElementById("watch-flag");
	var currDate = new Date().getTime();
	var formats;
	var orderedFormats;
	var title;
	var channel;
	var button;
	var menu;
	var dlheader;
	var options;
	var updateMsg;
	var showUpdate;
	var sar = 16/9;
	var videoId;
	
	var translation = {
		"en": {
			errormsg: "Error: YouTube has been updated and YouTube Video Download is no longer compatible. ",
			errorlink: "Please click here to check for updates.",
			
			button: "iTube",
			tip: "iTube Options",

			low: "240p - ",
			high: "360p - ",
			
			lowdef: "360p - ",
			stddef: "480p - ",
			highdef: "720p - ",
			fhighdef: "1080p - ",
			
			origdef: "Original Definition",
			
			unknown: "Unknown Format",
			
			dlheader: "iTube Download",
			nofmts: "Error: No download formats available.",
			update1: "Uma nova versão do iTube está disponível.",
			update2: "Clique aqui para atualizar agora.",
			
			options: "Ferramentas",
			updatetoggle: " Procurar por Atualizações",
			replacetoggle: " Substituir nome do vídeo",
			vinfotoggle: " Habilitar Cookies",
			tformat: "Nome: ",
			apply: "OK",
			tformatinfo: "%t - video title\n%c - uploader\n%f - format number\n%v - video id\n%% - literal percent",
		},
	};
	
	function getTrans(str)
	{
		var ret;
		if (translation[language] && (ret = translation[language][str]))
			return ret;
		else if (ret = translation["en"][str])
			return ret;
		else
			return "";
	}
	
	function createElem(tagName, template)
	{
		var ret = document.createElement(tagName);
		for (var attribute in template)
			if (attribute == "style")
				for (var property in template["style"])
					ret.style[property] = template["style"][property];
			else if (attribute == "className")
				ret.className = template["className"];
			else if (attribute == "checked")
				ret.checked = template["checked"];
			else if (attribute == "disabled")
				ret.disabled = template["disabled"];
			else if (attribute == "children")
				for (var i = 0; i < template["children"].length; i ++)
					ret.appendChild(template["children"][i]);
			else if (attribute == "actions")
				for (var action in template["actions"])
					ret.addEventListener(action, template["actions"][action], false);
			else
				ret.setAttribute(attribute, template[attribute]);
		return ret;
	}
	
	function createCookie(name, value, days)
	{
		if (days)
		{
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else
			var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/; domain=.youtube.com";
	}

	function readCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function eraseCookie(name)
	{
		createCookie(name, "", -1);
	}
	
	function checkForUpdates()
	{
		window.addEventListener("message", function(event) {
			remoteVersion = /^\/\/ @version\s+(.+)$/m.exec(event.data)[1];
			
			if (remoteVersion)
			{
				localStorage["_ytd_lastUpdateCheck"] = currDate;
				localStorage["_ytd_remoteVersion"] = remoteVersion;
				
				if (remoteVersion != _ytd_localVersion)
					showUpdate();
			}
		}, false);
		
		document.body.appendChild(createElem("iframe", {
			src: "http://userscripts.org/scripts/source/62634.meta.js",
			style: {
				position: "absolute",
				width: "1px",
				height: "1px",
				left: "-1px",
				top: "-1px",
			},
		}));
	}
	
	function initFormats()
	{
		formats = {
			5:  { itag: 5 , quality:  1, description: getTrans("low")     , format: "FLV" , mres: { width:  400, height:  240 }, acodec: "MP3"   , vcodec: "SVQ"                          , arate: 22050, abr:  64000, vbr:  250000 },
			18: { itag: 18, quality:  4, description: getTrans("high")    , format: "MP4" , mres: { width:  480, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Baseline@L3.0", arate: 44100, abr:  96000, vbr:  500000 },
			22: { itag: 22, quality:  7, description: getTrans("highdef") , format: "MP4" , mres: { width: 1280, height:  720 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L3.1"    , arate: 44100, abr: 152000, vbr: 2000000 },
			34: { itag: 34, quality:  3, description: getTrans("lowdef")  , format: "FLV" , mres: { width:  640, height:  360 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  500000 },
			35: { itag: 35, quality:  5, description: getTrans("stddef")  , format: "FLV" , mres: { width:  854, height:  480 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "Main@L3.0"    , arate: 44100, abr: 128000, vbr:  800000 },
			37: { itag: 37, quality:  8, description: getTrans("fhighdef"), format: "MP4" , mres: { width: 1920, height: 1080 }, acodec: "AAC"   , vcodec: "H.264" , vpro: "High@L4.0"    , arate: 44100, abr: 152000, vbr: 3500000 },
			38: { itag: 38, quality:  9, description: getTrans("origdef") , format: "MP4" , mres: { width: 4096, height: 3072 }, acodec: "AAC"   , vcodec: "H.264" },
			43: { itag: 43, quality:  2, description: getTrans("lowdef")  , format: "WebM", mres: { width:  640, height:  360 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 128000, vbr:  500000 },
			45: { itag: 45, quality:  6, description: getTrans("highdef") , format: "WebM", mres: { width: 1280, height:  720 }, acodec: "Vorbis", vcodec: "VP8"                          , arate: 44100, abr: 192000, vbr: 2000000 },
		};
		orderedFormats = new Array();
	}
	
	var createMenu = function() {
		var ret;
		button = createElem("button", {
			className: "yt-uix-button" + (watchFlag.disabled ? "" : " yt-uix-tooltip") + " yt-uix-tooltip-reverse",
			title: (watchFlag.disabled ? "" : getTrans("tip")),
			type: "button",
			role: "button",
			"aria-pressed": "false",
			onclick: "; return false;",
			disabled: watchFlag.disabled,
			children: [
				createElem("span", {
					className: "yt-uix-button-content",
					children: [
						document.createTextNode(getTrans("button")),
					],
				}),
				document.createTextNode(" "),
				createElem("img", {
					className: "yt-uix-button-arrow",
					src: "//s.ytimg.com/yt/img/pixel-vfl73.gif",
					alt: "",
				}),
				ret = createElem("div", {
					className: "yt-uix-button-menu",
					style: {
						display: "none",
						backgroundColor: "#eaeaea",
					},
					children: [
						dlheader = createElem("div", {
							className: "yt-uix-button-menu-item",
							style: {
								fontSize: "smaller",
								fontWeight: "bold",
								backgroundColor: "#eaeaea",
								cursor: "default",
							},
							children: [
								document.createTextNode(getTrans("nofmts")),
							],
						}),
						updateMsg = createElem("a", {}),
					],
				}),
			],
		});
		return ret;
	};
	
	var appendedMenu = false;
	var appendMenu = function() {
		watchFlag.parentNode.insertBefore(button, watchFlag);
		watchFlag.parentNode.insertBefore(document.createTextNode(" "), watchFlag);
		appendedMenu = true;
	};
	
	function createHeader()
	{
		dlheader.style.borderBottom = "1px solid #999999";
		dlheader.removeChild(dlheader.firstChild);
		dlheader.appendChild(createElem("a", {
			style: {
				cssFloat: "right",
				color: "#4272db",
				fontWeight: "normal",
				cursor: "pointer",
			},
			children: [
				document.createTextNode(getTrans("options")),
			],
			actions: {
				click: function() {
					options.style.display = options.style.display == "none" ? "" : "none";
				},
			},
		}));
		dlheader.appendChild(document.createTextNode(getTrans("dlheader")));
		var tformat;
		dlheader.appendChild(options = createElem("div", {
			style: {
				display: "none",
				fontWeight: "normal",
				fontSize: "12px",
				paddingTop: "6px",
			},
			children: [
				createElem("input", {
					type: "checkbox",
					id: "-ytd-update",
					checked: localStorage["_ytd_checkForUpdates"] == "yes",
					actions: {
						change: function() {
							localStorage["_ytd_checkForUpdates"] = this.checked ? "yes" : "no";
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-update",
					children: [
						document.createTextNode(getTrans("updatetoggle")),
					],
				}),
				createElem("br", {}),
				createElem("input", {
					type: "checkbox",
					id: "-ytd-setvinfo",
					checked: readCookie("VISITOR_INFO1_LIVE") == "AAAAAAAAAAA",
					actions: {
						change: function() {
							if (this.checked)
								createCookie("VISITOR_INFO1_LIVE", "AAAAAAAAAAA", 9999);
							else
								eraseCookie("VISITOR_INFO1_LIVE");
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-setvinfo",
					children: [
						document.createTextNode(getTrans("vinfotoggle")),
					],
				}),
				createElem("br", {}),
				createElem("input", {
					type: "checkbox",
					id: "-ytd-replace",
					checked: localStorage["_ytd_replaceTitle"] == "yes",
					actions: {
						change: function() {
							if (this.checked)
							{
								localStorage["_ytd_replaceTitle"] = "yes";
								tformat.disabled = false;
							}
							else
							{
								localStorage["_ytd_replaceTitle"] = "no";
								localStorage["_ytd_titleFormat"] = "video";
								tformat.value = "video";
								tformat.disabled = true;
							}
							getStreamMap();
							getHTML5Map();
						},
					},
				}),
				createElem("label", {
					"for": "-ytd-replace",
					children: [
						document.createTextNode(getTrans("replacetoggle")),
					],
				}),
				createElem("br", {}),
				document.createTextNode(getTrans("tformat")),
				tformat = createElem("input", {
					type: "text",
					disabled: localStorage["_ytd_replaceTitle"] != "yes",
					value: localStorage["_ytd_titleFormat"],
					actions: {
						input: function() {
							localStorage["_ytd_titleFormat"] = this.value;
						},
					},
				}),
				document.createTextNode(" "),
				createElem("a", {
					style: {
						color: "#4272db",
						cursor: "pointer",
					},
					children: [
						document.createTextNode(getTrans("apply")),
					],
					actions: {
						click: function() {
							getStreamMap();
							getHTML5Map();
						},
					},
				}),
				createElem("br", {}),
				createElem("span", {
					style: {
						fontSize: "smaller",
						whiteSpace: "pre",
					},
					children: [
						document.createTextNode(getTrans("tformatinfo")),
					],
				}),
			],
		}));
	}
	
	var addMenu = function(format) {
		var width;
		var height;
		
		if (format.fres)
		{
			width = format.fres.width;
			height = format.fres.height;
		}
		else if (format.mres)
			if (Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 && Math.abs(sar - 1.7) < 0.1)
			{
				width = format.mres.width;
				height = format.mres.height;
			}
			else if (format.mres.height * sar > format.mres.width)
			{
				width = format.mres.width;
				height = format.mres.width / sar;
			}
			else
			{
				width = format.mres.height * sar;
				height = format.mres.height;
			}
		
		var elem = createElem("a", {
			href: format.url,
			className: "yt-uix-button-menu-item",
			style: {
				position: "relative",
				paddingRight: "7em",
			},
			children: [
				document.createTextNode(format.description ? format.description + (format.mres && Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 ? ", " + format.mres.height + "p" : "") + " " + format.format + " " : getTrans("unknown") + " " + format.itag),
				createElem("span", {
					style: {
						position: "absolute",
						right: "0.6666em",
						opacity: 0.6,
						cssFloat: "right",
					},
					children: [
						document.createTextNode(format.vcodec ? format.vcodec + (format.acodec ? "/" + format.acodec: "") : format.html5hint ? format.html5hint.type.substring(0, format.html5hint.type.indexOf(";")) : "itag=" + format.itag),
					],
				}),
			],
		});
		if (!orderedFormats.length)
			createHeader();
		
		var i;
		for (i = 0; i < orderedFormats.length; i ++)
			if (orderedFormats[i].quality < format.quality)
				break;
		
		if (orderedFormats[i])
			menu.insertBefore(elem, orderedFormats[i].elem);
		else
			menu.insertBefore(elem, updateMsg);
		orderedFormats.splice(i, 0, format);
		
		if (format.elem)
			menu.removeChild(format.elem);
		format.elem = elem;
	}
	
	var updateShown = false;
	showUpdate = function() {
		var link;
		
		if (updateShown)
			return;
		else
			updateShown = true;
		
		updateMsg.setAttribute("href", "http://userscripts.org/scripts/source/62634.user.js");
		
		updateMsg.className = "yt-uix-button-menu-item";
		updateMsg.style.fontSize = "smaller";
		updateMsg.style.fontWeight = "bold";
		updateMsg.style.backgroundColor = "#eaeaea";
		updateMsg.style.borderTop = "1px solid #999999";
		
		updateMsg.appendChild(document.createTextNode(getTrans("update1")));
		updateMsg.appendChild(createElem("br", {}));
		updateMsg.appendChild(link = createElem("span", {
			style: {
				fontWeight: "normal",
				color: "#4272db",
			},
			children: [
				document.createTextNode(getTrans("update2")),
			],
		}));
		
		updateMsg.addEventListener("mouseover", function() {
			link.style.textDecoration = "underline";
		}, false);
		updateMsg.addEventListener("mouseout", function() {
			link.style.textDecoration = "";
		}, false);
	};
	
	function addUrl(itag, url)
	{
		if (localStorage["_ytd_replaceTitle"])
		{
			var titleChangable = true;
			var tformatted = localStorage["_ytd_titleFormat"].replace(/%./g, function(str, offset, s) {
				if (str == "%t")
					return title;
				else if (str == "%c")
					return channel;
				else if (str == "%f")
					return itag;
				else if (str == "%v")
					return videoId;
				else if (str == "%%")
					return "%";
				return str;
			});
			var escapedTitle = tformatted.replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
			var queryLoc = url.indexOf("?");
			var location = url.substr(0, queryLoc);
			var query = url.substr(queryLoc + 1).split("&");
			var name;
			var splitLoc;
			for (var i = 0; i < query.length; i ++)
			{
				name = query[i].substr(0, splitLoc = query[i].indexOf("="));
				if (name == "sparams")
				{
					var sparams = unescape(query[i].substr(splitLoc + 1)).split(",");
					for (var j = 0; j < sparams.length; j ++)
						if (sparams[j] == "title")
							titleChangable = false;
				}
				else if (name == "title" && titleChangable)
				{
					query[i] = "title=" + escapedTitle;
					titleChangable = false;
					url = location + "?" + query.join("&");
				}
			}
			if (titleChangable)
				url = url + "&title=" + escapedTitle;
		}
		
		if (formats[itag])
			formats[itag].url = url;
		else
			formats[itag] = { itag: itag, url: url };
		
		addMenu(formats[itag]);
	}
	
	function getStreamMap()
	{
		var streamMap;
		try
		{
			if (!(streamMap = yt.getConfig("PLAYER_CONFIG").args["url_encoded_fmt_stream_map"]))
				throw "";
		}
		catch (e)
		{
			try
			{
				var flashVars = document.getElementById("movie_player").getAttribute("flashvars").split("&");
				var splitLoc;
				var name;
				for (var i = 0; i < flashVars.length; i ++)
				{
					name = flashVars[i].substr(0, splitLoc = flashVars[i].indexOf("="));
					if (name == "url_encoded_fmt_stream_map")
						streamMap = unescape(flashVars[i].substr(splitLoc + 1));
				}
				if (!streamMap)
					throw "";
			}
			catch (e)
			{
				try
				{
					var swfConfigTxt = document.getElementById("postpage").getElementsByTagName("script")[3].textContent;
					if (swfConfigTxt.substring(0, 18) == "\n    (function() {")
					{
						eval(swfConfigTxt.substring(18, swfConfigTxt.length - 8))
						streamMap = swfConfig.args.url_encoded_fmt_stream_map;
					}
				}
				catch (e)
				{
					return false;
				}
			}
		}
		
		if (streamMap)
		{
			streamMap = streamMap.split(",");
			var split;
			var url;
			var itag;
			var name;
			for (var i = 0; i < streamMap.length; i ++)
			{
				split = streamMap[i].split("&");
				for (var j = 0; j < split.length; j ++)
				{
					name = split[j].substring(0, split[j].indexOf("="));
					if (name == "url")
						url = unescape(split[j].substring(split[j].indexOf("=") + 1));
					else if (name == "itag")
						itag = parseInt(split[j].substring(split[j].indexOf("=") + 1));
				}
				addUrl(itag, url);
			}
			return true;
		}
		else
			return false;
	}
	
	function getHTML5Map()
	{
		try
		{
			var hFormatMap = yt.getConfig("PLAYER_CONFIG").args["html5_fmt_map"];
			if (hFormatMap)
				for (var i = 0; i < hFormatMap.length; i ++)
				{
					if (formats[hFormatMap[i].itag])
						formats[hFormatMap[i].itag].html5hint = hFormatMap[i];
					else
						formats[hFormatMap[i].itag] = { itag: hFormatMap[i].itag, html5hint: hFormatMap[i] };
					addUrl(hFormatMap[i].itag, hFormatMap[i].url);
				}
			else
				return false;
		}
		catch (e)
		{
			return false;
		}
		return true;
	}
	
	function getTitle()
	{
		var title = document.getElementById("watch-headline-title");
		if (title)
			return title.textContent.replace(/^\s+/, "").replace(/\s+$/, "");
		else
			return document.title.substr(10);
	}
	
	function getChannel()
	{
		try
		{
			return yt.getConfig("VIDEO_USERNAME");
		}
		catch (e)
		{
			try
			{
				return document.getElementById("watch-uploader-info").getElementsByClassName("author")[0].textContent;
			}
			catch (e)
			{
				return "unknown";
			}
		}
	}
	
	function getSAR()
	{
		try
		{
			return yt.getConfig("IS_WIDESCREEN") ? 16/9 : 4/3;
		}
		catch (e)
		{
			return 16/9;
		}
	}
	
	function getVideoId()
	{
		try
		{
			return yt.getConfig("VIDEO_ID");
		}
		catch (e)
		{
			return "";
		}
	}
	
	var vo;
	if (vo = document.getElementById("vo"))
	{
		var ret;
		
		createMenu = function() {
			vo.insertBefore(createElem("button", {
				className: "b",
				children: [
					document.createTextNode("Download"),
				],
				actions: {
					click: function() {
						featherMenu.style.display = featherMenu.style.display == "none" ? "" : "none";
					},
				},
			}), vo.lastChild);
			
			vo.parentNode.insertBefore(ret = createElem("div", {
				style: {
					marginTop: "10px",
					lineHeight: "14px",
					padding: "5px",
					border: "1px solid #eaeaea",
					borderRadius: "5px",
					display: "none",
				},
			}), vo.nextSibling);
			
			return ret;
		};
		
		addMenu = function(format) {
			var elem = createElem("a", {
				href: format.url,
				children: [
					document.createTextNode(format.description ? format.description + (format.mres && Math.abs(format.mres.width / format.mres.height - 1.7) < 0.1 ? ", " + format.mres.height + "p" : "") + " " + format.format + " " : getTrans("unknown")),
				],
				style: {
					display: "block",
				},
			});
			var i;
			
			for (i = 0; i < orderedFormats.length; i ++)
				if (orderedFormats[i].quality < format.quality)
					break;
			
			if (orderedFormats[i])
				menu.insertBefore(elem, orderedFormats[i].elem);
			else
				menu.appendChild(elem);
			orderedFormats.splice(i, 0, format);
			
			if (format.elem)
				menu.removeChild(format.elem);
			format.elem = elem;
		};
		
		showUpdate = function() {};
		appendMenu = function() {};
	}
	
	try
	{
		if (!localStorage["_ytd_checkForUpdates"])
			localStorage["_ytd_checkForUpdates"] = (window.chrome || window.globalStorage ? "yes" : "no");
		if (!localStorage["_ytd_replaceTitle"])
			localStorage["_ytd_replaceTitle"] = "yes";
		if (!localStorage["_ytd_titleFormat"])
			localStorage["_ytd_titleFormat"] = "%t";
		
		title = getTitle();
		channel = getChannel();
		sar = getSAR();
		videoId = getVideoId();
		
		menu = createMenu();
		if (watchFlag.disabled)
		{
			appendMenu();
			return;
		}
		initFormats();
		getStreamMap();
		getHTML5Map();
		appendMenu();
		
		if (localStorage["_ytd_localVersion"] != _ytd_localVersion)
		{
			localStorage["_ytd_remoteVersion"] = _ytd_localVersion;
			localStorage["_ytd_localVersion"] = _ytd_localVersion;
		}
		
		if (localStorage["_ytd_checkForUpdates"] == "yes")
		{
			if (!localStorage["_ytd_remoteVersion"] || !localStorage["_ytd_lastUpdateCheck"] || currDate - parseInt(localStorage["_ytd_lastUpdateCheck"]) > 1000 * 60 * 60 * 24 * 2)
				checkForUpdates();
			
			if (localStorage["_ytd_remoteVersion"] && localStorage["_ytd_remoteVersion"] != _ytd_localVersion)
				showUpdate();
		}
	}
	catch (e)
	{
		var firstChild = document.body.firstChild;
		document.body.insertBefore(document.createTextNode(getTrans("errormsg")), firstChild);
		document.body.insertBefore(createElem("a", {
			href: "http://userscripts.org/scripts/show/62634",
			target: "_blank",
			children: [
				document.createTextNode(getTrans("errorlink")),
			],
		}), firstChild);
		
		if (button && !appendedMenu)
			appendMenu();
		
		throw e;
	}
});
else if (document.location.href == "http://userscripts.org/scripts/source/62634.meta.js") inject(function() {
	window.parent.postMessage(document.documentElement.textContent, "*");
});