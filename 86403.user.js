// ==UserScript==
// @name           OGame Redesign: Colored Moon Sizes in Galaxy View
// @namespace      qdscripter
// @version        1.2
// @description    This script adds colored border around moons based on its size
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

(function ()
{
	if (document.location.href.indexOf("/game/index.php?page=galaxy") == -1)
		return;

	var ColorHelper =
	{
		getMiddleColor: function(factor, colors)
		{
			var scaled = factor * (colors.length - 1);
			var index = Math.ceil(scaled);
			if (index == 0)
			{
				index = 1;
			}
			var part1 = index - scaled;
			var part2 = 1 - part1;
			var color1 = colors[index - 1];
			var color2 = colors[index];
			var result =
			{
				r: Math.round(part1 * color1.r + part2 * color2.r),
				g: Math.round(part1 * color1.g + part2 * color2.g),
				b: Math.round(part1 * color1.b + part2 * color2.b)
			};
			return result;
		},

		getColorCode: function(color)
		{
			return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
		}
	};

	var MoonSizesColorer =
	{
		show: function()
		{
			var minSize = 3605;
			var maxSize = 8944;
			var colors =
			[
				{r: 0, g: 255, b: 255},
				{r: 0, g: 255, b: 0},
				{r: 255, g: 127, b: 0},
				{r: 255, g: 0, b: 0}
			];

			var images = document.evaluate('//td[@class="moon"]/a/img[@width="30" and @height="30"]',
				document, null, 6, null);
			for (var i = 0; i < images.snapshotLength; i++)
			{
				var image = images.snapshotItem(i);
				if (!image)
				{
					continue;
				}

				var moon = document.evaluate('../@rel', image, null, 2, null);
				if (!moon || !moon.stringValue || moon.stringValue.charAt(0) != "#")
				{
					continue;
				}

				var span = document.evaluate('../../div[@id="' + moon.stringValue.substr(1) + '"]' +
					'/div[@id="TTWrapper"]/div[@class="body"]/ul[@class="ListImage"]' +
					'/li/span[@id="moonsize"]', image, null, 2, null);
				if (!span || !span.stringValue)
				{
					continue;
				}

				var array = span.stringValue.match(/\d+/);
				if (!array)
				{
					continue;
				}

				var size = Math.max(Math.min(array[0], maxSize), minSize);
				var factor = (size - minSize) / (maxSize - minSize);
				var color = ColorHelper.getMiddleColor(factor, colors);
				image.style.borderStyle = "solid";
				image.style.borderWidth = "1px";
				image.style.borderColor = ColorHelper.getColorCode(color);
				image.style.padding = "0px";
				var textNode = image.nextSibling;
				if (textNode && textNode.nodeType == 3 && textNode.nodeValue &&
					textNode.nodeValue.match(/^\s*$/))
				{
					textNode.parentNode.removeChild(textNode);
				}
			}
		},

		onDOMNodeInserted: function(e)
		{
			if (!e || !e.target || e.target.id != "galaxytable") return;
			var self = MoonSizesColorer;
			document.body.removeEventListener("DOMNodeInserted", self.onDOMNodeInserted, false);
			self.show();
			document.body.addEventListener("DOMNodeInserted", self.onDOMNodeInserted, false);
		},

		run: function()
		{
			document.body.addEventListener("DOMNodeInserted", this.onDOMNodeInserted, false);
		}
	};

	MoonSizesColorer.run();
}
) ();