// ==UserScript==
// @name           OGame Redesign: Dimed Returning Fleets
// @namespace      qdscripter
// @version        1.4
// @description    This script dims returning fleets in the event list
// @include        http://*.ogame.*/game/index.php*
// ==/UserScript==

(function()
{
	var GameData =
	{
		eventboxContent: document.getElementById("eventboxContent"),

		session:
		(
			function(e)
			{
				var array = document.location.search.match(/&session=([0-9a-f]*)/i);
				return array ? array[1] : null;
			}
		)(),

		imageSources:
		{
			"icon-halten.gif":
				"http://gf1.geo.gfsrv.net/cdn89/b20ddc3fdb2486567ce20d24d3889d.gif",
			"icon-expedition.gif":
				"http://gf1.geo.gfsrv.net/cdnf7/892b08269e0e0bbde60b090099f547.gif",
			"refresh.gif":
				"/cdn/img/icons/refresh.gif"
		}
	};

	if (!GameData.eventboxContent) return;

	var Utils =
	{
		ArrayContains: function(array, element)
		{
			if (!array) return null;
			for (var i = 0; i < array.length; i++)
			{
				if (array[i] == element) return element;
			}
			return null;
		},

		IsElement: function(element, tag, id, className)
		{
			return element && (!tag || element.tagName == tag) && (!id || element.id == id) &&
				(!className || Utils.ArrayContains(element.getAttribute("class").split(" "), className));
		},

		SameText: function(s1, s2)
		{
			return (s1 == null) ? (s2 == null) : ((s2 != null) && (s1.toUpperCase() == s2.toUpperCase()));
		},

		SelectChildNode: function(parent, nodeTag, attrName, attrValue, nodeNum)
		{
			if (!parent) return null;
			for (var node = parent.firstChild; node; node = node.nextSibling)
			{
				if (nodeTag && !Utils.SameText(node.tagName, nodeTag)) continue;
				if (attrName && !Utils.SameText(node.getAttribute(attrName), attrValue)) continue;
				if (nodeNum && --nodeNum > 0) continue;
				return node;
			}
			return null;
		},

		CreateElement: function(tagName, attributes, children)
		{
			var result = document.createElement(tagName);
			if (attributes)
			{
				for (var attribute in attributes)
				{
					result.setAttribute(attribute, attributes[attribute]);
				}
			}
			if (children)
			{
				for (var child = 0; child < children.length; child++)
				{
					result.appendChild(children[child]);
				}
			}
			return result;
		},

		AddClass: function(element, className)
		{
			if (!element) return;
			var array = element.className ? element.className.split(" ") : new Array();
			if (Utils.ArrayContains(array, className)) return;
			array.push(className);
			element.className = array.join(" ");
		},

		AddCSSRule: function(ruleText)
		{
			Utils.GetStyleSheet().insertRule(ruleText, 0);
		},

		GetStyleSheet: function()
		{
			if (!("styleSheet" in Utils))
			{
				var array = document.getElementsByTagName("BODY");
				Utils.styleSheet = array ? array[0].appendChild(document.createElement("STYLE")).sheet : null;
			}
			return Utils.styleSheet;
		}
	}

	var EventList =
	{
		DOMNodeInserted: function(e)
		{
			if (!e || !e.target || !e.target.id == "eventListWrap") return;
			EventList.CatchEventList(e.target);
		},

		CatchEventList: function(eventListWrap)
		{
			try 
			{
				EventList.DimReturningFleets(eventListWrap);
				EventList.AddRefreshDetailsButton(eventListWrap);
			}
			catch(error)
			{
				alert("Unexpected error: " + error);
			}
		},

		Run: function()
		{
			EventList.AddStyles();
			var eventListWrap = document.getElementById("eventListWrap");
			if (eventListWrap)
			{
				EventList.CatchEventList(eventListWrap);
			}
			GameData.eventboxContent.addEventListener("DOMNodeInserted", EventList.DOMNodeInserted, false);
		},

		DimReturningFleets: function(eventListWrap)
		{
			var eventContent = Utils.SelectChildNode(eventListWrap, "TABLE", "id", "eventContent");
			if (!eventContent) return;
			var tbody = Utils.SelectChildNode(eventContent, "TBODY");
			if (!tbody) return;
			for (var eventRow = tbody.firstChild; eventRow; eventRow = eventRow.nextSibling)
			{
				if (!Utils.IsElement(eventRow, "TR", null, "eventFleet")) continue;
				var direction = EventList.GetFleetDirection(eventRow);
				if (!direction) continue;
				if (direction < 0)
				{
					Utils.AddClass(eventRow, "reverse");
					continue;
				}
				var mission = EventList.GetFleetMission(eventRow);
				if (mission != GameData.imageSources["icon-halten.gif"] && mission != GameData.imageSources["icon-expedition.gif"])
				{
					continue;
				}
				var number = EventList.GetEventRowNumber(eventRow);
				if (!number) continue;
				var nextEventRow = Utils.SelectChildNode(tbody, "TR", "id", EventList.GetEventRowId(number + 1));
				if (nextEventRow && EventList.GetFleetDirection(nextEventRow) < 0)
				{
					Utils.AddClass(eventRow, "on_hold");
				}
			}
		},

		AddRefreshDetailsButton: function(eventListWrap)
		{
			var eventHeader = Utils.SelectChildNode(eventListWrap, "DIV", "id", "eventHeader");
			if (!eventHeader) return;
			var headerText = Utils.SelectChildNode(eventHeader, "H4");
			if (!headerText) return;
			var refreshDetails = Utils.SelectChildNode(headerText, "A", "class", "refresh_details");
			if (refreshDetails) return;
			refreshDetails = Utils.CreateElement("A", {href: "javascript:void(0)", class: "refresh_details"},
				[Utils.CreateElement("IMG", {src: GameData.imageSources["refresh.gif"]})]);
			headerText.insertBefore(document.createTextNode(" "), headerText.firstChild);
			headerText.insertBefore(refreshDetails, headerText.firstChild);
			refreshDetails.addEventListener("click", EventList.RefreshDetailsClick, true);
		},

		GetFleetDirection: function(eventRow)
		{
			if (Utils.SelectChildNode(eventRow, "TD", "class", "icon_movement")) return +1;
			if (Utils.SelectChildNode(eventRow, "TD", "class", "icon_movement_reserve")) return -1;
			return 0;
		},

		GetFleetMission: function(eventRow)
		{
			var missionFleet = Utils.SelectChildNode(eventRow, "TD", "class", "missionFleet");
			if (!missionFleet) return null;
			var missionImage = Utils.SelectChildNode(missionFleet, "IMG");
			if (!missionImage) return null;
			return missionImage.getAttribute("src");
		},

		GetEventRowNumber: function(eventRow)
		{
			var prefix = EventList.GetEventRowId("");
			if (!eventRow.id || eventRow.id.substr(0, prefix.length) != prefix) return null;
			var result = parseInt(eventRow.id.substr(prefix.length), 10);
			return result ? result : null;
		},

		GetEventRowId: function(number)
		{
			return "eventRow-" + number;
		},

		RefreshDetailsClick: function(event)
		{
			var session = GameData.session ? "&session=" + GameData.session  : "";
			document.location.href = "javascript:(function(){" +
				"$.get('/game/index.php?page=eventList" + session + "&ajax=1', function(response) {" +
					"window.DOM_GET_ELEMENT_BY_ID_CACHE = new Array();" +
					"$('#eventboxContent').html(response);" +
					"$('#eventHeader .close_details').click(toggleEvents);" +
				"})" +
			"})()";
		},

		AddStyles: function()
		{
			Utils.AddCSSRule('tr.eventFleet.reverse td {opacity: 0.3}');
			Utils.AddCSSRule('tr.eventFleet.on_hold td.icon_movement {background: url("data:image/gif;base64,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") no-repeat scroll 0 0 transparent; width: 16px;}');
		}
	};

	EventList.Run();
}
)();