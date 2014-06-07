// ==UserScript==
// @name			eBay style addon
// @src				http://52g.de/
// @description		(V 1.3) this script will grey out all ended ebay auctions and colorize all auctions you are currently bidding on in the my ebay lists and ebay search lists
// @include			http://my.ebay.*/ws/eBayISAPI.dll*
// @include			http://*search.ebay.*/*
// @include			http://*.listings.ebay.*/*
// ==/UserScript==
// (c) Lars Formella (root@52grad.de)

(function()
{
	var EventManager =
	{
		_registry: null,
		Initialise: function()
		{
			if (this._registry == null)
			{
				this._registry = [];
				EventManager.Add(window, "_unload", this.CleanUp);
			}
		},
		Add: function(obj, type, fn, useCapture)
		{
			this.Initialise();
			var realType=(type=="_unload"?"unload":type);
			if (typeof obj == "string")
				obj = document.getElementById(obj);
			if (obj == null || fn == null)
				return false;
			obj.addEventListener(realType, fn, useCapture);
			this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
			return true;
		},
		CleanUp: function()
		{
			for (var i = 0; i < EventManager._registry.length; i++)
			{
				with(EventManager._registry[i])
				{
					if(type=="unload") fn();
					obj.removeEventListener(type,fn,useCapture);
				}
			}
			EventManager._registry = null;
		}
	};

	function xpath(query)
	{
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function trim(str)
	{
		// no str?!
		if(!str)
			return "";
		return str.replace( /^\s*/, '').replace( /\s*$/, '' );
	}

	function setColor(obj, type, loop)
	{
		if(obj.nodeName == "TR" || obj.nodeName == "TD" || obj.nodeName == "A" || obj.nodeName == "SPAN" || obj.nodeName == "DIV")
		{
			if(type == 0)
				obj.style.color = "#B4B4B4";
			if(type == 1)
				obj.style.backgroundColor = (loop == 0 ? "#E5FFE5" : "#CCFFCC");
			if(type == 2)
				obj.style.backgroundColor = (loop == 0 ? "#FFE5E5" : "#FFD9D9");
		}
		else if(obj.nodeName == "FONT")
		{
			if(type == 1)
			{
				obj.color = "green";
				obj.parentNode.style.color = "green";
			}
			if(type == 2)
			{
				obj.color = "red";
				obj.parentNode.style.color = "red";
			}
		}
		else if(obj.nodeName == "IMG" && type == 0)
			obj.style.MozOpacity = 0.3;

		if(obj.hasChildNodes)
			for(var a=0; a < obj.childNodes.length; a++)
				setColor(obj.childNodes[a], type, loop);
	}

	var location = document.location.href;
	var objects;
	var object_search;

	if(document.location.href.indexOf('http://my.ebay.') >- 1)
	{
		object_search = [
			'//TD[@class="c_CurrentPrice"]',
			'//TD[@class="c_TimeLeft"]'
		].join('|');
		var regexp = /.*?[0-9]+\d+/;

		objects = xpath(object_search);
		for(var i=0; i < objects.snapshotLength; i++)
		{
			var object = objects.snapshotItem(i);
			var loop = (object.parentNode.bgColor == "#f4f4f4" ? 1 : 0);
			var class = trim(object.firstChild.nextSibling.className);
			var text = trim(object.firstChild.nextSibling.innerHTML);

			if(class == "success")
			{
				// 1. tr
				setColor(object.parentNode.previousSibling.previousSibling, 1, loop);
				// 2. tr
				setColor(object.parentNode, 1, loop);
			}
			else if(class == "failed")
			{
				// 1. tr
				setColor(object.parentNode.previousSibling.previousSibling, 2, loop);
				// 2. tr
				setColor(object.parentNode, 2, loop);
			}
			else if(!regexp.exec(text))
			{
				// 1. tr
				setColor(object.parentNode.previousSibling.previousSibling, 0, loop);
				// 2. tr
				setColor(object.parentNode, 0, loop);
				// 3. tr (note)
				if(object.parentNode.nextSibling.nextSibling && object.parentNode.nextSibling.nextSibling.className == "Note1")
					setColor(object.parentNode.nextSibling.nextSibling, 0, loop);
			}
		}
	}
	else
	{
		var status_txt = '<td width="32"><img src="http://pics.ebaystatic.com/aw/pics/viewitem/status';
		object_search = [
			'//TR[@class="ebB1 ebHlOdd single"]',
			'//TR[@class="ebHlOdd single"]',
			'//TR[@class="single"]'
		].join('|');
		var regexp = /[0-9]+/;

		objects = xpath(object_search);
		for(var i=0; i < objects.snapshotLength; i++)
		{
			var object = objects.snapshotItem(i);
			if(object.childNodes[1].firstChild.firstChild)
			{
				var object_bids = object.childNodes[4].innerHTML;
				if(regexp.exec(object_bids))
				{
					var object_url = object.childNodes[1].firstChild.firstChild.href;
					GM_xmlhttpRequest(
					{
						target: object,
						method:"GET",
						url: object_url,
						headers:
						{
							"User-Agent":"Mozilla/5.0 Gecko",
							"Accept":"text/html,text/xml,text/plain"
						},
						onload: function(resp)
						{
							if(resp.status=="200")
							{
								var txt=resp.responseText;
								var lnk=txt.indexOf(status_txt);				
								//GM_log(this.url);
								if(lnk>0)
								{
									var status_pos = lnk + status_txt.length;
									var status_char = txt.substring(status_pos, status_pos + 1);				
									//GM_log(status_char);
									setColor(this.target, status_char == 'C' ? 1 : 2, 1);
								}
							}
						}
					});
				}
			}
		}
	}
})();
