// ==UserScript==
// @name           Highlight BYOND Code
// @namespace      http://www.byond.com/members/kuraudo
// @description    Highlights code in BYOND forum posts
// @include        http://www.byond.com/*/forum/?*
// @include        http://www.byond.com/*/forum?*
// @include        http://www.byond.com/*/forum*
// @include        http://www.byond.com/members/*
// ==/UserScript==

var dm_color, dm_background, dm_comment, dm_preprocessor, dm_string, dm_embed, dm_keyword;

if(!GM_getValue)	// before GM version 0.3
{
	dm_color = 'black';
	dm_background = 'white';
	dm_comment = '#808080';
	dm_preprocessor = '#008000';
	dm_keyword = '#0000ff';
	dm_string = '#0096b4';
	dm_embed = '#005064';
} else
{
	dm_color = GM_getValue('color', 'black');
	dm_background = GM_getValue('background', 'white');
	dm_comment = GM_getValue('comment', '#808080');
	dm_preprocessor = GM_getValue('preprocessor', '#008000');
	dm_keyword = GM_getValue('keyword', '#0000ff');
	dm_string = GM_getValue('string', '#0096b4');
	dm_embed = GM_getValue('embed', '#005064');
	
	GM_registerMenuCommand('Set DM Foreground Color...', function(e)
	{
		var val = prompt('What would you like to set the code foreground color to? Default: black', dm_color);
		if(val != null)
		{
			dm_color = val;
			GM_setValue('color', dm_color);
			
			var elem;
			var elements = document.evaluate(
				"//pre[@class='dmcode']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_color;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM Background Color...', function(e)
	{
		var val = prompt('What would you like to set the code background color to? Default: white', dm_background);
		if(val != null)
		{
			dm_background = val;
			GM_setValue('background', dm_background);
			
			var elem;
			var elements = document.evaluate(
				"//div[@class='dmcode'] | //pre[@class='dmcode'] | //span[@class='dmkeyword' or @class='dmcomment' or @class='dmpreprocessor' or @class='dmstring' or @class='dmbrace']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.background = dm_background;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM Keyword Color...', function(e)
	{
		var val = prompt('What would you like to set the code keyword color to? Default: #0000ff', dm_keyword);
		if(val != null)
		{
			dm_keyword = val;
			GM_setValue('keyword', dm_keyword);
			
			var elem;
			var elements = document.evaluate(
				"//span[@class='dmkeyword']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_keyword;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM Comment Color...', function(e)
	{
		var val = prompt('What would you like to set the code comment color to? Default: #808080', dm_comment);
		if(val != null)
		{
			dm_comment = val;
			GM_setValue('comment', dm_comment);
			
			var elem;
			var elements = document.evaluate(
				"//span[@class='dmcomment']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_comment;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM Preprocessor Color...', function(e)
	{
		var val = prompt('What would you like to set the code preprocessor color to? Default: #008000', dm_preprocessor);
		if(val != null)
		{
			dm_preprocessor = val;
			GM_setValue('preprocessor', dm_preprocessor);
			
			var elem;
			var elements = document.evaluate(
				"//span[@class='dmpreprocessor']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_preprocessor;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM String Color...', function(e)
	{
		var val = prompt('What would you like to set the code string color to? Default: #0096b4', dm_string);
		if(val != null)
		{
			dm_string = val;
			GM_setValue('string', dm_string);
			
			var elem;
			var elements = document.evaluate(
				"//span[@class='dmstring']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_string;
			}
		}
	});
	
	GM_registerMenuCommand('Set DM String Embedding Color...', function(e)
	{
		var val = prompt('What would you like to set the string embedding color to? Default: #005064', dm_embed);
		if(val != null)
		{
			dm_embed = val;
			GM_setValue('embed', dm_embed);
			
			var elem;
			var elements = document.evaluate(
				"//span[@class='dmbrace']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(var i=0; i<elements.snapshotLength; ++i)
			{
				elem = elements.snapshotItem(i);
				elem.style.color = dm_embed;
			}
		}
	});
}

var elem;

var elements = document.evaluate(
	"//div[@class='dmcode'] | //pre[@class='dmcode']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_color;
}

elements = document.evaluate(
	"//span[@class='dmcomment']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_comment;
}

elements = document.evaluate(
	"//span[@class='dmpreprocessor']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_preprocessor;
}

elements = document.evaluate(
	"//span[@class='dmkeyword']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_keyword;
}

elements = document.evaluate(
	"//span[@class='dmstring']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_string;
}

elements = document.evaluate(
	"//span[@class='dmbrace']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for(var i=0; i<elements.snapshotLength; ++i)
{
	elem = elements.snapshotItem(i);
	elem.style.background = dm_background;
	elem.style.color = dm_embed;
}