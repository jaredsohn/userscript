// ==UserScript==
// @name           Plain Addic7ed
// @namespace      72989f04b4b14355f0b0aa80414f09dc
// @description    Simpler tv show pages for easier downloading of subtitles.
// @include        http://www.addic7ed.com/show/*
// ==/UserScript==
function SubFile(title, language, version, hearingImpaired, corrected, hdIcon, completed, url)
{
	this.title = title;
	this.language = language;
	this.version = version;
	this.hearingImpaired = hearingImpaired;
	this.corrected = corrected;
	this.hdIcon = hdIcon;
	this.completed = completed;
	this.url = url;

	this.extractMore();
}
SubFile.prototype.clone = function()
{
	return new SubFile(
		this.title,
		this.language,
		this.version,
		this.hearingImpaired,
		this.corrected,
		this.hdIcon,
		this.completed,
		this.url);
}
SubFile.prototype.extractMore = function()
{
	if (this.title)
	{
		var a = this.title.split(" - ");
		this.show = a[0];
		this.episodeNumberFull = a[1];
		this.episodeTitle = a[2];

		a = this.episodeNumberFull.split("x");
		this.seasonNumber = parseInt(a[0], 10);
		this.episodeNumber = parseInt(a[1], 10);
	}
}

function Parse(root)
{
	var subs = [];
	var sub = new SubFile();

	function innerParse(node)
	{
		// Episode
		if (node.tagName == "TD" && node.getAttribute("colspan") == "4" && node.className == "MultiDldS")
		{
			sub.title = node.querySelectorAll("a")[0].textContent.trim();
		}
		// Version
		else if (node.tagName == "TD" && node.getAttribute("colspan") == "3" && node.className == "newsClaro")
		{
			sub.version = node.textContent.trim();
			if (sub.version.indexOf("Version ") == 0)
				sub.version = sub.version.substr("Version ".length);

			sub.hdIcon = false;
			if (node.querySelectorAll('img[title="720/1080"]').length > 0)
				sub.hdIcon = true;
		}
		// Language
		else if (node.tagName == "TD" && node.className == "language")
		{
			sub.language = node.textContent.trim();

			sub.corrected = false;
			if (node.querySelectorAll('img[title="Corrected"]').length > 0)
				sub.corrected = true;

			sub.hearingImpaired = false;
			if (node.querySelectorAll('img[title="Hearing Impaired"]').length > 0)
				sub.hearingImpaired = true;

			sub.completed = false;
			var nn = node.nextElementSibling;
			if (nn != null && nn.textContent.trim() == "Completed")
				sub.completed = true;
		}
		// Download
		else if (node.tagName == "A" && node.textContent.trim() == "Download")
		{
			sub.url = node.getAttribute("href");

			subs.push(sub.clone());
		}

		for(var i=0; i<node.childNodes.length; i++)
			innerParse(node.childNodes[i]);
	}
	innerParse(root);

	return subs;
}

function RecreatePage(showId, seasons, showTitle, loadFunc, prefs)
{
	document.body.innerHTML = "";
	//var tmp = document.querySelectorAll('link[type="text/css"]');
	//tmp[0].parentNode.removeChild(tmp[0]);
	
	var css = 
	"html{color:#000;background:#FFF;}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0;}table{border-collapse:collapse;border-spacing:0;}fieldset,img{border:0;}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal;}li{list-style:none;}caption,th{text-align:left;}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}q:before,q:after{content:'';}abbr,acronym{border:0;font-variant:normal;}sup{vertical-align:text-top;}sub{vertical-align:text-bottom;}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit;}input,textarea,select{*font-size:100%;}legend{color:#000;}"
+	"html { margin: 8px; }"
+	"body { background-color: #fff; color: #000; font-size: 12px; }"
+	"#header { background-color: #009BCB; color: #000; -moz-border-radius: 9px 9px 0 0; }"
+	"table { background-color: transparent; }"
+	"h1 { font-size: 2em; color: gold; margin: 0px 32px 8px 8px; text-shadow: 2px 2px 4px #000; }"
+	'#loader { width: 32px; height: 32px; background: url("/images/loader.gif") no-repeat scroll 0 0 transparent; vertical-align: middle; display: inline-block; }'
+	"#sl { height: 32px; padding: 0px 8px; }"
+	"#sl button.selected { color: blue; font-weight: bold; }"
+	"#season { float: left; }"
+	"#season thead tr, #langs thead tr { background-color: #444; color: #fff; text-shadow: 1px 1px 2px #000; }"
+	"#season table td, #season table th, #langs table td, #langs table th { padding: 2px 8px; }"
+	"#season table tbody tr.epodd:nth-child(even) { background-color: #d0d0ff; }"
+	"#season table tbody tr.epodd:nth-child(odd) { background-color: #c0c0ff; }"
+	"#season table tbody tr.epeven:nth-child(even) { background-color: #c0ffc0; }"
+	"#season table tbody tr.epeven:nth-child(odd) { background-color: #b0ffb0; }"
+	"#langs table tbody tr:nth-child(odd) { background-color: #e8e8e8; }"
+	"#season table tr.incomplete { color: #888; font-style: italic; }"
+	".c { text-align: center; }"
+	"#langs { float: right; }"
+	"#allshows { position: absolute; top: 16px; right: 16px; font-size: 1.4em; }"
	;
	GM_addStyle(css);

	function sclick(e) { loadFunc(e.target.textContent); }
	function dce(tag) { return document.createElement(tag); }
	var db = document.body;
	function dba(el) { return db.appendChild(el); }
	var e;

	e = dce("div"); e.id = "header"; dba(e);
	{
		s = dce("h1"); s.textContent = showTitle; e.appendChild(s);
		s = dce("div"); s.id = "sl"; e.appendChild(s);
	}
	e = s;
	{
		s = dce("span"); s.textContent = "Season: "; e.appendChild(s);
		for(var i=1; i<=seasons; i++)
		{
			var b = dce("button");
			b.textContent = i;
			b.setAttribute("s", i);
			b.addEventListener("click", sclick, false);
			e.appendChild(b);
		}
		s = dce("div"); s.id = "loader"; e.appendChild(s);
	}
	e = dce("div"); e.id = "season"; dba(e);
	e = dce("div"); e.id = "langs"; dba(e);
	e = dce("a"); e.id = "allshows"; e.href = "/shows.php"; e.textContent = "All shows"; dba(e);
}

function LoadPrefs()
{
	var d = {
		l: {}
	};
	var p = { 
		data: JSON.parse(GM_getValue("prefs", JSON.stringify(d))),
		getLang: function(lang)
		{
			if (lang in this.data.l)
				if (this.data.l[lang] == false)
					return (false);
			return (true);
		},
		setLang: function(lang, show)
		{
			this.data.l[lang] = !!show;
		}
	};
	return p;
}

function SavePrefs(prefs)
{
	GM_setValue("prefs", JSON.stringify(prefs.data));
}

function Initialize()
{
	unsafeWindow["loadShow"] = function(){};

	var aa = document.querySelectorAll('a[href*="javascript:loadShow("]');
	var a = aa[0].getAttribute("href");
	var m = a.match(/javascript:loadShow\((\d+)\s*,\s*(\d+)\)/);
	var showId = m[1];
	var seasons = aa.length;
	var showTitle = document.title.substr(0, document.title.indexOf(" -"));

	var prefs = LoadPrefs();
	RecreatePage(showId, seasons, showTitle, LoadSeason, prefs);

	var lastSubs = null;

	function LoadSeason(season)
	{
		function gotIt(e)
		{
			var html = e.target ? e.target.responseText : e.responseText;

			var el = document.createElement("div");
			el.style.display = "none";
			document.body.appendChild(el);
			el.innerHTML = html;
			
			var subs = Parse(el);
			WriteLangs(subs, prefs);
			lastSubs = subs;

			el.parentNode.removeChild(el);
			el.innerHTML = "";

			DisplaySubs(subs, prefs);
			document.getElementById("loader").style.display = "none";
			var a = document.querySelectorAll("#sl button.selected");
			if (a.length > 0) a[0].className = "";
			document.querySelectorAll('#sl button[s="' + season + '"]')[0].className = "selected";
		}

		// For some strange reason, XMLHttpRequest does not exist
		// (on Firefox 14 with GM 0.9.18).
		var url = "/ajax_loadShow.php?show=" + showId + "&season=" + season;
		if ("XMLHttpRequest" in window)
		{
			GM_log("Using XMLHttpRequest");
			var req = new XMLHttpRequest();
			req.open("GET", url, true);
			req.onload = gotIt;
			req.send(null);
		}
		else
		{
			GM_log("Using GM_xmlhttpRequest");
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: gotIt
			});
		}

		document.getElementById("loader").style.display = "";
	}

	LoadSeason(seasons);
}

function WriteLangs(subs, prefs)
{
	function langChanged(e)
	{
		prefs.setLang(e.target.getAttribute("lang"), e.target.checked);
		SavePrefs(prefs);
		DisplaySubs(subs, prefs);
	}

	var slangs = [], t = {};
	for(var i=0; i<subs.length; i++)
	{
		var sub = subs[i];
		if (!(sub.language in t))
		{
			t[sub.language] = true;
			slangs.push(sub.language);
		}
	}
	slangs.sort();

	var d = document.getElementById("langs"); d.innerHTML = "";
	var t = document.createElement("table");
	{
		var head = document.createElement("thead");
		{
			var row = document.createElement("tr");
			{
				var cell;
				cell = document.createElement("th");
				{
					cell.textContent = "Language";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					cell.textContent = "Show";
					cell.className = "c";
				}
				row.appendChild(cell);
			}
			head.appendChild(row);
		}
		t.appendChild(head);

		var body = document.createElement("tbody");
		{
			for(var i=0; i<slangs.length; i++)
			{
				var lang = slangs[i];

				var row = document.createElement("tr");
				{
					var cell;
					cell = document.createElement("td");
					{
						cell.textContent = lang;
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						var cb = document.createElement("input");
						{
							cb.setAttribute("type", "checkbox");
							cb.checked = prefs.getLang(lang);
							cb.setAttribute("lang", lang);
							cb.addEventListener("change", langChanged, true);
						}
						cell.appendChild(cb);
						cell.className = "c";
					}
					row.appendChild(cell);
				}
				body.appendChild(row);
			}
		}
		t.appendChild(body);
	}
	d.appendChild(t);
}

function DisplaySubs(subs, prefs)
{
	function checkmark(flag) { return flag ? "✓" : ""; }

	var d = document.getElementById("season");
	d.innerHTML = "";
	
	var t = document.createElement("table");
	{
		var head = document.createElement("thead");
		{
			var row = document.createElement("tr");
			{
				var cell;
				cell = document.createElement("th");
				{
					cell.textContent = "#";
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					cell.textContent = "Title";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					cell.textContent = "Language";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					cell.textContent = "Version";
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					cell.textContent = "Completed";
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					//cell.textContent = "Hearing Impaired";
					cell.innerHTML = '<img title="Hearing Impaired" alt="HI" src="/images/hi.PNG" width="20" height="20">';
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					//cell.textContent = "Corrected";
					cell.innerHTML = '<img title="Corrected" alt="Crctd" src="/images/bullet_go.png" width="20" height="20">';
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					//cell.textContent = "HD";
					cell.innerHTML = '<img title="720/1080" alt="HD" src="/images/hdicon.png" width="20" height="20">';
					cell.className = "c";
				}
				row.appendChild(cell);

				cell = document.createElement("th");
				{
					//cell.textContent = "Download";
					cell.innerHTML = '<img title="Download" alt="DL" src="/images/download.png" width="20" height="20">';
					cell.className = "c";
				}
				row.appendChild(cell);
			}
			head.appendChild(row);
		}
		t.appendChild(head);

		subs.sort(function(a, b) {
				if (a.episodeNumber > b.episodeNumber)
					return -1;
				else if (a.episodeNumber < b.episodeNumber)
					return 1;

				var i = a.language.localeCompare(b.language);
				if (i != 0) return i;

				i = a.version.localeCompare(b.version);
				if (i != 0) return i;

				if (a.hearingImpaired < b.hearingImpaired)
					return -1;
				else if (a.hearingImpaired > b.hearingImpaired)
					return 1;

				return 0;
			});

		var body = document.createElement("tbody");
		{
			for(var i=0; i<subs.length; i++)
			{
				var sub = subs[i];
				sub.extractMore();
				
				if (!prefs.getLang(sub.language))
					continue;

				var row = document.createElement("tr");
				{
					var epg = sub.episodeNumber % 2 ? "epodd" : "epeven";
					row.className = epg + " " + (sub.completed ? "completed" : "incomplete");

					var cell;
					cell = document.createElement("td");
					{
						cell.textContent = sub.episodeNumber;
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = sub.episodeTitle;
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = sub.language;
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = sub.version;
						cell.className = "c";
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = checkmark(sub.completed);
						cell.className = "c";
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = checkmark(sub.hearingImpaired);
						cell.className = "c";
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = checkmark(sub.corrected);
						cell.className = "c";
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						cell.textContent = checkmark(sub.hdIcon);
						cell.className = "c";
					}
					row.appendChild(cell);

					cell = document.createElement("td");
					{
						var a = document.createElement("a");
						{
							a.textContent = "Link";
							a.href = sub.url;
						}
						cell.appendChild(a);
						cell.className = "c";
					}
					row.appendChild(cell);
				}
				body.appendChild(row);
			}
		}
		t.appendChild(body);
	}
	d.appendChild(t);
}

Initialize();

