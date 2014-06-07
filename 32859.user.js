// ==UserScript==
// @name           lowercase internet
// @namespace      http://localhost
// @description    make the internet lowercase!
// @include        *google.com*
// ==/UserScript==

var lowercase = {
	init: function()
	{
		GM_registerMenuCommand("lowercase/uppercase!", function() { lowercase.flip(); });
		a = new Array();
		t = document.evaluate("//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		lowercase.l();
	},

	l : function()
	{
		lower = true;
		for(i=0; i<t.snapshotLength; i++)
		{
			n = t.snapshotItem(i);
			a.push(n.data);
			n.data = (n.data.toLowerCase());
		}
	},

	flip : function()
	{
		switch(lower)
		{
			case true: lowercase.u(); break;
			case false: lowercase.l(); break;
			default:;
		}
	},

	u : function()
	{
		lower = false;
		for(j=0; j<t.snapshotLength; j++)
		{
			n = t.snapshotItem(j);
			n.data = a[j];
		}
	},
}

lowercase.init();