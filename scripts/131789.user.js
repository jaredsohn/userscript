// ==UserScript==
// @name           OGame Redesign: Fold equipment in overview
// @namespace      qdscripter
// @version        1.0
// @include        http://*.ogame.*/game/index.php*
// ==/UserScript==

(function()
{
	var overviewBottom = document.getElementById("overviewBottom");
	if (!overviewBottom) return;

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

	var FoldEquipment =
	{
		Run: function()
		{
			var breaker = Utils.SelectChildNode(overviewBottom, "DIV", "class", "clearfloat");
			if (!breaker) return;
			var box = breaker.nextElementSibling;
			while (box && Utils.IsElement(box, "DIV", null, null) && !Utils.IsElement(box, null, null, "clearfloat"))
			{
				var header = Utils.SelectChildNode(box, "DIV", "class", "header");
				header.addEventListener("click", FoldEquipment.Toggle, true);
				box = box.nextElementSibling;
			}
		},

		Toggle: function() {
			var equipmentDivider = document.getElementById("equipmentDivider");
			if (!equipmentDivider)
			{
				var breaker = Utils.SelectChildNode(overviewBottom, "DIV", "class", "clearfloat");
				if (!breaker || !breaker.parentNode) return;
				equipmentDivider = Utils.CreateElement("DIV", {"id": "equipmentDivider", "display": "none"});
				breaker.parentNode.insertBefore(equipmentDivider, breaker.nextSibling);
			}
			else if (equipmentDivider.parentNode)
			{
				equipmentDivider.parentNode.removeChild(equipmentDivider);
			}
		}
	};

	FoldEquipment.Run();
}
)();