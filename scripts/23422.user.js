// ==UserScript==
// @name           Fluid's Google Reader Fix
// @namespace      http://filiptepper.com/
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

if (window.fluid)
{
	Array.prototype.hasValue = function(value)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (value == this[i])
			{
				return true;
			}
		}

		return false;
	}

	setTimeout(GRF_FixCount, 500);

	function GRF_FixCount()
	{
		var GRF_selector = document.getElementById('reading-list-selector');
		if (GRF_selector.className.split(" ").hasValue('unread') == false)
		{
			window.fluid.setDockBadge("");
		}
		setTimeout(GRF_FixCount, 500);
	}
}
