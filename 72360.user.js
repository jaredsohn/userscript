// ==UserScript==
// @name		prohardver.hu : forum : private messages band
// @namespace	http://www.prohardver.hu
// @version 1.1
// @include	 http://prohardver.hu/*
// @include	 http://www.prohardver.hu/*
// @include	 http://mobilarena.hu/*
// @include	 http://www.mobilarena.hu/*
// @include	 http://itcafe.hu/*
// @include	 http://www.itcafe.hu/*
// @include	 http://gamepod.hu/*
// @include	 http://www.gamepod.hu/*
// @include	 http://logout.hu/*
// @include	 http://www.logout.hu/*
// @include	 http://hardverapro.hu/*
// @include	 http://www.hardverapro.hu/*
// @include	 http://bitmarket.hu/*
// @include	 http://www.bitmarket.hu/*
// ==/UserScript==

// information band animation based on UJS Manager code
var band = null;
var update_interval = 600; // in seconds
var update_minimum = 15; // in seconds

var showband = function(force_async)
{
	if (document == null)
		return;
	
	var update = function(unread)
	{
		if (band == null)
		{
			var padding = 6;
			var width = document.body.clientWidth - 2 * padding;
			band = document.createElement("div");
			band.setAttribute(
				"style", 
				"position: fixed; z-index: 10; width: " + width + "px; background: #ffffe1; color: #000000; border-bottom: 1px solid #c0c0c0; padding: " + padding + "px; font-family: Verdana, sans-serif; font-size: 12px; ");

			band.show = function()
			{
				this.hidden = false;
				this.style.marginTop = (parseInt(this.style.marginTop) + 2) + "px";

				if (parseInt(this.style.marginTop) < 0)
					setTimeout(function(){ band.show(); }, 10);
				else
					this.style.marginTop = 0;
			}

			band.hide = function()
			{
				if (!this.cachedHeight)
					this.cachedHeight = -this.scrollHeight;

			  	if (parseInt(this.style.marginTop) > this.cachedHeight )
				{
					var t = parseInt(this.style.marginTop) - 4;
					if (t < this.cachedHeight)
						t = this.cachedHeight;
					this.style.marginTop = t + "px";
					band.timer = setTimeout(function(){ band.hide(); }, 10);
					this.hidden = false;
				}
				else
				{
					this.parentNode.removeChild(this);
					this.hidden = true;
					band.timer = null;
			  	}
			}

			band.innerHTML = "<a style=\"color: #b42224; font-weight: bold;\" href=\"/privatok/listaz.php\"><span></span> \u00FAj priv\u00E1t \u00FCzeneted \u00E9rkezett.</a><a style=\"float: right; color: black; font-weight: bold; text-decoration: none; cursor: pointer; \">\u00D7</a>";
			band.children.item(1).addEventListener("click", function() { band.hide(); }, true);
			band.unread = band.children.item(0).children.item(0);
			band.hidden = true;
		}
		else
		{
			if (unread <= 0)
				band.hide();
			else
				clearTimeout(band.timer);
		}
		
		band.unread.textContent = unread;
		
		if (band.hidden)
		{
			document.documentElement.insertBefore(band, document.body);
			band.style.marginTop = -band.scrollHeight + "px";
		}
		
		if (unread > 0)
			band.show();
		
		if (update_interval > 0)
		{
			setTimeout(query, update_interval * 1000);
			band.timestamp = new Date();
		}
	}
	
	var query = function()
	{
		var req = new XMLHttpRequest();
		req.onreadystatechange = function()
		{
			if (req.readyState == 4 && req.status == 200)
			{
				var s = "priv\u00E1t \u00FCzeneteim</a> <b>(";
				var s1 = req.responseText;
				var n = s1.indexOf(s);
				var unread = 0;
				if (n != -1)
					unread = parseInt(s1.substr(n + s.length, 10));
				s = "priv\u00E1t \u00FCzeneteim</a> <span class=\"kiem\">(";
				n = s1.indexOf(s);
				if (n != -1)
					unread = parseInt(s1.substr(n + s.length, 10));
				
				update(unread);
			}
		}
		
		try
		{
			req.open("GET", "http://" + document.location.host + "/tema/hp_laptopok_javitasa_alkatresz_csereje/hsz_1-1.html");
		}
		catch (e)
		{
		}
		
		req.send();
	}

	var host = document.location.hostname;
	var path = document.location.pathname;
	var s1 = ".html";
	var s2 = "/listaz.php";
	var is_hw_or_bm = 
		host == "hardverapro.hu" || host == "www.hardverapro.hu" ||
		host == "bitmarket.hu" || host == "www.bitmarket.hu";
	if (path.substr(path.length - s1.length, s1.length) != s1 &&
		path.substr(path.length - s2.length, s2.length) != s2)
		return;
	if ((is_hw_or_bm && path == "/index.html") || path.match(/\/(forum|temak|tema|apro|aprok|termek|termekek)\//))
	{
		if (force_async)
		{
			query();
		}
		else
		{
			var unread = document.evaluate("//li[@class = 'act']/p/b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (unread == null)
				unread = document.evaluate("//div/ul/li/p/span[@class = 'kiem']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			update(unread ? parseInt(unread.innerHTML.substr(1)) : 0);
		}
	}
	else if (path == "/index.html" || path.match(/\/(cikk|cikkek|hir|hirek|teszt|tesztek)\//))
	{
		query();
	}
}

window.addEventListener(
	"load",
	function()
	{
		showband(false);
	},
	false
);
	
window.addEventListener(
	"focus", 
	function()
	{
		if (update_minimum > 0 && (band.timestamp == null || (new Date() - band.timestamp) > update_minimum * 1000))
			showband(true);
	}, 
	false
);
