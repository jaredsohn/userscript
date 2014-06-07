// ==UserScript==
// @name           Highlight BYOND Quotes
// @namespace      http://www.byond.com/members/kuraudo
// @description    Highlights quoted text in byond.com forum posts
// @include        http://www.byond.com/*/forum/?*
// @include        http://www.byond.com/*/forum?*
// @include        http://www.byond.com/*/forum*
// ==/UserScript==

var prefix, suffix;

if(!GM_getValue)	// before GM version 0.3
{
	prefix = '<font color=\'yellow\'>';
	suffix = '</font>';
} else
{
	prefix = GM_getValue('prefix', '<font class=\'style1\'>');
	suffix = GM_getValue('suffix', '</font>');
	
	GM_registerMenuCommand('Set BYOND Quote Prefix...', function(e)
	{
		var val = prompt('What would you like to set the highlight prefix to? Example: <font color="yellow">', prefix);
		if(val != null)
		{
			prefix = val;
			GM_setValue('prefix', prefix);
		}
	});
	
	GM_registerMenuCommand('Set BYOND Quote Suffix...', function(e)
	{
		var val = prompt('What would you like to set the highlight suffix to? Example: </font>', suffix);
		if(val != null)
		{
			suffix = val;
			GM_setValue('suffix', suffix);
		}
	});
}

var tds = document.evaluate(
	"//td[@class='style3']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

var td_elem;
for(var i=0; i<tds.snapshotLength; ++i)
{
	td_elem = tds.snapshotItem(i);

	// <br> to \n
	var body_text = td_elem.innerHTML.replace(/<br\s*\/?>/gi, "\n");
	
	body_text = body_text.replace(/^(&gt; +.*)$/gmi, prefix+'$1'+suffix);
	
	// \n to <br />
	td_elem.innerHTML = body_text.replace(/\n/g, '<br />');
}