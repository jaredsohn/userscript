// ==UserScript==
// @name           Websim: Battle Profitability Indicator
// @description    Indicates the battle profitability in WebSim
// @namespace      Vess
// @author	   Vesselin Bontchev
// @date           2012-07-16
// @version        1.01
// @include        http://websim.speedsim.net/*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("http://websim.speedsim.net/") < 0)
		return;
	var strFunc = (function ()
	{
		var parse_ajax_answer_old = parse_ajax_answer;
		parse_ajax_answer = function (txt)
		{
			// Resource exchange ratio; default 3:2:1
			const metalCrystalRatio   = 1.5;
			const metalDeuteriumRatio = 3;
			function setIndicator (result, indicatorNumber, profit, loss)
			{
				function addDots (n)
				{
					n += '';
					while (/\d{4}/.test (n))
						n = n.replace (/(\d+)(\d{3})/, "$1.$2");
					return n;
				}
				var indicatorColor;
				var indicatorText = "";
				var mySpan = document.getElementById ("id" + indicatorNumber);
				if (mySpan == null)
				{
					mySpan = document.createElement ("span");
					mySpan.id = "id" + indicatorNumber;
					result.appendChild (document.createTextNode ((indicatorNumber == "1") ? " " : " ("));
					result.appendChild (mySpan);
					if (indicatorNumber == "2")
						result.appendChild (document.createTextNode (")"));
				}
				if (profit > loss)
				{
					indicatorText += "+";
					indicatorColor = "lime";
				}
				else if (profit < loss)
				{
					indicatorText += "-";
					indicatorColor = "red";
				}
				else
				{
					indicatorText += "=";
					indicatorColor = "orange";
				}
				indicatorText += addDots (Math.abs (profit - loss));
				mySpan.style.color = indicatorColor;
				mySpan.textContent = indicatorText;
			}
			parse_ajax_answer_old (txt);
			var resultTable = document.getElementById ("result_table");
			var result = resultTable.previousElementSibling;
			var rows = resultTable.firstElementChild.firstElementChild.children;
			var debris  = rows [2].cells [1].textContent;
			var losses  = rows [4].cells [1].textContent;
			var plunder = rows [7].cells [1].textContent;
			var fuel    = rows [8].cells [1].textContent;
			/([\d\.]+)\D+\d+\D+([\d\.]+)/.exec (debris);
			var debrisMetal   = RegExp.$1;
			var debrisCrystal = RegExp.$2;
			var debrisProfit = parseInt (debrisMetal.replace (/\D/g, "")) + Math.round (metalCrystalRatio * parseInt (debrisCrystal.replace (/\D/g, "")));
			/([\d\.]+)\D+([\d\.]+)\D+([\d\.]+)/.exec (plunder);
			var plunderMetal     = RegExp.$1;
			var plunderCrystal   = RegExp.$2;
			var plunderDeuterium = RegExp.$3;
			var plunderProfit = parseInt (plunderMetal.replace (/\D/g, "")) +
				Math.round (metalCrystalRatio   * parseInt (plunderCrystal.replace   (/\D/g, ""))) +
				Math.round (metalDeuteriumRatio * parseInt (plunderDeuterium.replace (/\D/g, "")));
			/([\d\.]+)\D+([\d\.]+)\D+([\d\.]+)/.exec (losses);
			var lossesMetal     = RegExp.$1;
			var lossesCrystal   = RegExp.$2;
			var lossesDeuterium = RegExp.$3;
			var equivLosses = parseInt (lossesMetal.replace (/\D/g, "")) +
				Math.round (metalCrystalRatio   * parseInt (lossesCrystal.replace   (/\D/g, ""))) +
				Math.round (metalDeuteriumRatio * parseInt (lossesDeuterium.replace (/\D/g, ""))) +
				Math.round (metalDeuteriumRatio * parseInt (fuel.replace (/\D/g, "")));
			var totalProfit = plunderProfit + debrisProfit;
			setIndicator (result, "1", plunderProfit, equivLosses);
			setIndicator (result, "2", totalProfit, equivLosses);
		}
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "text/javascript");
	script.text = "(" + strFunc + ") ();";
	document.body.appendChild (script);
})();
