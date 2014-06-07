/*
Blingo and PCH Link on Google Search
version 2.0
Simple script that puts a link at the top of Google search
pages to do the same search on Blingo and PCH.  Basically it's just
a reminder to go back to the site to try and win stuff.

If you haven't joined up yet, here's my invite link:
http://www.blingo.com/friends?ref=Y8PCYdrYUZkXWMuR4JQ1%2F9idgpo

*/
// ==UserScript==
// @name          Blingo and PCH link on Google Search
// @namespace     http://userscripts.org/users/674;scripts
// @description	  Adds a Blingo link to Google's Search page
// @include       http://google.com/search*
// @include       http://www.google.com/search*
// @include       http://www.google.co.uk/search* 
// ==/UserScript==

if (document.forms.length > 0)
{
	var res = document.location.search.match(/(\?|&)q=([^&]+)/);
	if (res.length == 3)
	{
		var bl = document.createElement('a');
		bl.href = 'http://www.blingo.com/search?q=' + res[2];
		bl.innerHTML = 'Blingo';

		var d = document.createElement('span');
		d.setAttribute('class', 'gb1');
		d.appendChild(bl);

		var pch = document.createElement('a');
		pch.href = 'http://search.pch.com/search?q=' + res[2];
		pch.innerHTML = 'PCH';

		var d2 = document.createElement('span');
		d2.setAttribute('class', 'gb1');
		d2.appendChild(pch);
		
		var x = $x("//div[@id='gbar']/nobr/a[6]");
		if (x.length > 0){
			x[0].parentNode.insertBefore(d, x[0]);
			x[0].parentNode.insertBefore(d2, x[0]);
		}
	}
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
