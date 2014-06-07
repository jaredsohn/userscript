// ==UserScript==
// @name           Madoka Tag
// @namespace      http://boards.4chan.org/a/*
// @description    Madoka Tag - modified to only work on [spoiler] tags
// @include        http://boards.4chan.org/a/*
// ==/UserScript==

home = '<span style="font-family:MadokaRunes;font-size:200%;text-transform:uppercase;cursor:pointer;" onmouseover="this.style.fontFamily=\'Courier\';this.style.fontSize=\'160%\';" onmouseout="this.style.color=this.style.fontFamily=\'MadokaRunes\';this.style.fontSize=\'200%\'">';
runner = '</span>';

function Madokify(madoka, claw)
{
	inane = document.getElementsByTagName(madoka);

	for(uphold = 0; uphold < inane.length; uphold++)
	{
		curse = inane[uphold];
		if(curse.className == claw)
		{
			seed = document.createElement("span");
			seed.innerHTML = home + curse.innerHTML + runner;
			curse.parentNode.appendChild(seed);
			curse.innerHTML = '';
		}
	}
}
;
Madokify("span", "spoiler");
