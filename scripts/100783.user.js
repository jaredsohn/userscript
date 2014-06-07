// ==UserScript==
// @name        Google Chrome Full Size Image
// @namespace   http://userscripts.org/scripts/show/100783
// @version     1
// @description Set the default image size to large.
// @include     *
// ==/UserScript==

/*jshint
  curly:false
  forin:false
 */
/*global
  document:false
 */
(function()
{
	"use strict";

	var styles;

	styles =
	{
		"body":
		{
			"background": "#262626"
		},
		"img":
		{
			"position": "absolute",
			"top": "0",
			"right": "0",
			"bottom": "0",
			"left": "0",
			"margin": "auto"
		},
		"img.tall":
		{
			"bottom": "auto"
		}
	};

	if ( !isImage() )
		return;

	getImage().addEventListener("click", resize, false);
	click( getImage() );
	getHead().appendChild( createStyle(styles) );

	function resize()
	{
		this.className = hasScrollbar(document.body) ? "tall" : "";
	}

	function isImage()
	{
		var length,
			nodeName,
			body = document.body;

		if (body === null)
			return false;

		length = body.childNodes.length;
		if (length !== 1)
			return false;

		nodeName = body.firstChild.nodeName;
		if (nodeName !== "IMG")
			return false;

		return true;
	}

	function createStyle(styles)
	{
		var style,
			selector,
			property,
			rules,
			styleText;

		style = document.createElement("style");
		styleText = "";
		for (selector in styles)
		{
			rules = "";
			for (property in styles[selector])
			{
				if (rules)
					rules += "\n";
				rules += "\t";
				rules += property
					.concat(": ")
					.concat(styles[selector][property])
					.concat(";")
				;
			}
			styleText += selector
				.concat("{")
				.concat("\n")
				.concat(rules)
				.concat("\n")
				.concat("}")
				.concat("\n")
			;
		}
		style.innerHTML = styleText;

		return style;
	}

	function getHead()
	{
		var head;

		head = document.getElementsByTagName("head")[0];
		if (head)
			return head;

		head = document.createElement("head");
		document.body.parentNode.insertBefore(head, document.body);

		return head;
	}

	function click(image)
	{
		var clickEvent;

		clickEvent = document.createEvent("MouseEvent");
		clickEvent.initEvent("click", true, false);
		image.dispatchEvent(clickEvent);
	}

	function getImage()
	{
		return document.body.firstChild;
	}

	function hasScrollbar(node)
	{
		return node.scrollHeight > node.clientHeight;
	}
})();