// ==UserScript==
// @name          prohardver.hu : forum : too long text
// @namespace     http://www.prohardver.hu/
// @include       http://prohardver.hu/muvelet/*
// @include       http://mobilarena.hu/muvelet/*
// @include       http://logout.hu/muvelet/*
// @include       http://itcafe.hu/muvelet/*
// @include       http://gamepod.hu/muvelet/*
// ==/UserScript==

window.addEventListener(
	"load", 
	function() 
	{
		var doc = document;
		var editor = doc.evaluate("//textarea[@name=\"content\"]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (editor == null)
			return;
		
		var max = 1024;
		max = Math.floor(Math.log(max) / Math.log(2));
		
		var ontextchanged = function (e)
		{
			var color = ((Math.min(1 << max, editor.value.length)) >> (max - 8)).toString(16) + "";
			while (color.length < 2)
				color = "0" + color;
			if (color.length > 2)
				color = "ff";
			editor.style.color = "#" + color + color + color;
		};
		
		editor.onchange = ontextchanged;
		document.onkeydown = ontextchanged;
		document.onkeypress = ontextchanged;
		document.onkeyup = ontextchanged;
	},
	false);
