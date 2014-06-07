// ==UserScript==
// @name           OGame Redesign: Fast Messages in Firefox
// @namespace      qdscripter
// @description    Accelerates messages and statistics processing in Firefox
// @include        http://*.ogame.*/game/*
// ==/UserScript==

(function()
{
	var findStyleSheet = function(styleSheets, href)
	{
		if (styleSheets == null)
		{
			return null;
		}
		for (var i = 0; i < styleSheets.length; i++)
		{
			var styleSheet = styleSheets[i];
			if (styleSheet.type == "text/css" && styleSheet.href == href)
			{
				return styleSheet;
			}
		}
		return null;
	};

	var findRuleIndex = function(rules, selector)
	{
		if (rules == null)
		{
			return -1;
		}
		for (var i = 0; i < rules.length; i++)
		{
			var rule = rules[i];
			if (rule.type == 1 && rule.selectorText == selector)
			{
				return i;
			}
		}
		return -1;
	};

	var styleSheet = findStyleSheet(document.styleSheets,
		"http://" + document.domain + "/game/css/01style.css");
	if (styleSheet == null)
	{
		return;
	}

	var rule = findRuleIndex(styleSheet.cssRules, ":active, :focus");
	if (rule < 0)
	{
		return;
	}

	styleSheet.deleteRule(rule);
	styleSheet.insertRule("a:active, a:focus { outline: none; }", rule);
}
)();