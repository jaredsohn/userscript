// ==UserScript==
// @name           Trolltext Fixerator
// @namespace      TROLLIAN
// @description    Makes Trollian logs more readable.
// @include        http://mspaintadventures.com/*
// @include        http://www.mspaintadventures.com/*
// @exclude        http://mspaintadventures.com/phpBB3/*
// @exclude        http://www.mspaintadventures.com/phpBB3/*
// ==/UserScript==

function fixText()
{
	var spans = document.getElementsByTagName('span');
	var i = spans.length - 7;
	while( i-- )
	{
		var str = spans[i].innerHTML;
		regex = /(..):\s(.*)/;
		match = regex.exec(str);
		if (match)
		{
			if (match[1] == "GC")
			{
				match[2] = gcFixer(match[2]);
			}
			match[2] = genFixer(match[2]);
			str = match[1] + ": " + match[2];
			spans[i].innerHTML = str;
		}
	}
}

function genFixer(text)
{
	text = text.toLowerCase();
	text = text.replace(/... &lt; /g, "");
	text = text.replace(/. ..&gt; /g, "");
	text = text.replace(/ii/g, "i");
	text = text.replace(/ii/g, "i");
	text = text.replace(/100/g, "loo");
	text = text.replace(/0/g, "o");
	text = text.replace(/2/g, "s");
	text = text.replace(/3/g, "e");
	text = text.replace(/8/g, "b");
	text = text.replace(/two/g, "to");
	text = text.replace(/purr/g, "pur"); 
	text = text.replace(/polloot/g, "polute");
	text = text.replace(/transloocent/g, "translucent");
	text = text.replace(/instru%ion/g, "intrusion");
	text = text.replace(/di%ussion/g, "discussion");
	text = text.replace(/%/g, "x");
	text = text.replace(/(ca|do)nt/i, "$1n't");
	text = text.replace(/youre/i, "you're");
	text = text.replace(/(^|\s)ok(\s|$)/g, "$1OK$2");
	text = text.replace(/(^|\s)kk(\s|$)/g, "$1KK$2");
	text = text.replace(/(^|\s)im\s/g, "$1I'm ");
	text = text.replace(/(^|\s)i\s/g, "$1I ");
	text = text.replace(/^\w/, function($0) { return $0.toUpperCase(); })
	return text;
}

function gcFixer(text)
{
	text = text.replace(/1/g, "i");
	text = text.replace(/4/g, "a");
	return text;
}

window.addEventListener('load', fixText(), true);