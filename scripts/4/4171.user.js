// ==UserScript==
// @name          Show NZB ID
// @namespace     http://mroach.com
// @description	  Prepends the nzb id to posts on newzbin when searching.
// @include       http://newzbin.com/*
// @include       http://v3.newzbin.com/*
// ==/UserScript==

var anchors = document.getElementsByTagName('a');

var nzb_ids = new Array();

for ( var i = 0; i < anchors.length; i++ )
{
	var anchor = anchors[i];
	var url = anchor.href;

	var re = /\/browse\/post\/(\d+)\/$/;
	var m = re.exec(url);
	
	if ( m && m.length )
	{
		var s = document.createElement("span");
		s.innerHTML = ' ' + m[1] + '&nbsp;';
		s.style.color = 'rgb(255,0,0)';
		
		anchor.parentNode.insertBefore(s, anchor);
		
		nzb_ids.push(m[1]);
	}
}

// Create the footer listing of NZB IDs
if ( nzb_ids.length )
{
    var d = document.createElement("div");

    d.innerHTML = "<p style='font-weight: bold; text-align: center; word-wrap: break-word;'>Here are all of the IDs in order. Might be useful to copy and paste into something like grabnzb.py</p>";

    d.style.fontSize = '8pt';
    d.style.color = 'rgb(144,0,0)';
    d.style.marginLeft = '160px';
    d.style.marginRight = '10px';
    d.style.marginBottom = '1em';
    d.style.marginTop = '1em';
    d.style.clear = 'both';
    d.style.border = '1px solid #900';
    d.style.padding = '.3em';
    	
    for ( var i = 0; i < nzb_ids.length; i++ )
    {
	    d.innerHTML += nzb_ids[i] + '&nbsp;';
    }
    	
    var footer = document.getElementById('footer');
	
	// For the old newzbin. This can be deleted once everyone is on v3
	if ( !footer )
	{
		var footer = document.getElementById('Footer');
	}
	
    footer.parentNode.insertBefore(d, footer);
}