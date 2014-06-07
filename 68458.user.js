// Flickr - On Black/White
// version 0.1 BETA!
// 2010-02-03
// Copyright (c) 2010, Sriram R
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr - On Black/White", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flickr - On Black/White
// @description   Script to hide all info and show only the photo either on black or white background.
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// ==/UserScript==


( function() {

	function hide_all() {
		var bdy = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		var noc = bdy.childNodes.length;
		
		var dwld = document.evaluate("//div[contains(@class, 'DownloadThis')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		for(var i = 0; i < noc; i++)
		{
			if((bdy.childNodes[i].id != 'Main') &&
			   (bdy.childNodes[i].id != 'onblack_span') &&
			   (bdy.childNodes[i]    != dwld))
			{
				if(bdy.childNodes[i].className)
					bdy.childNodes[i].className = bdy.childNodes[i].className.replace(/ blnone/, '');
				bdy.childNodes[i].className += ' blnone';
			}
		}
		
		if(dwld)
		{
			var table = document.evaluate("//div[contains(@class, 'DownloadThis')]/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			
			if(table)
			{
				if(table.className)
					table.className = table.className.replace(/ blhidden/, '');
				table.className += ' blhidden';
			}
			
			var p = document.evaluate("//div[contains(@class, 'DownloadThis')]/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for(var i = 0; i < p.snapshotLength; i++)
			{
				if(i != 1)
				{
					if(p.snapshotItem(i).className)
						p.snapshotItem(i).className = p.snapshotItem(i).className.replace(/ blnone/, '');
					p.snapshotItem(i).className += ' blnone';
				}
			}
			
			if(dwld.className)
				dwld.className = dwld.className.replace(/ bldwld/, '');
			dwld.className += ' bldwld';
		}
		
		var rhs = document.evaluate("//td[contains(@class,'RHS')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		if(rhs)
		{
			if(rhs.className)
				rhs.className = rhs.className.replace(/ blnone/, '');
			rhs.className += ' blnone';
		}
			
		var bbar = document.getElementById('button_bar');
		
		if(bbar)
		{
			if(bbar.className)
				bbar.className = bbar.className.replace(/ blnone/, '');
			bbar.className += ' blnone';
		}
			
		var about = document.getElementById('About');
		
		if(about)
		{
			if(about.className)
				about.className = about.className.replace(/ blnone/, '');
			about.className += ' blnone';
		}
			
		var subnav = document.getElementById('SubNav');
		
		if(subnav)
		{
			if(subnav.className)
				subnav.className = subnav.className.replace(/ blnone/, '');
			subnav.className += ' blnone';
		}
			
		var feeds = document.getElementById('Feeds');
		
		if(feeds)
		{
			if(feeds.className)
				feeds.className = feeds.className.replace(/ blnone/, '');
			feeds.className += ' blnone';
		}
			
		var pages = document.evaluate("//div[contains(@class,'Pages')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		if(pages)
		{
			if(pages.className)
				pages.className = pages.className.replace(/ blnone/, '');
			pages.className += ' blnone';
		}
			
		var pcnewfeat = document.evaluate("//div[contains(@class,'pcNewFeature')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(pcnewfeat)
		{
			if(pcnewfeat.className)
				pcnewfeat.className = pcnewfeat.className.replace(/ blnone/, '');
			pcnewfeat.className += ' blnone';
		}
			
		var desc = document.evaluate("//div[contains(@class, 'Desc')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < desc.snapshotLength; j++)
		{
			if(desc.snapshotItem(j).className)
				desc.snapshotItem(j).className = desc.snapshotItem(j).className.replace(/ blnone/, '');
			desc.snapshotItem(j).className += ' blnone';
		}
			
		var desc = document.evaluate("//p[contains(@class, 'Desc')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < desc.snapshotLength; j++)
		{
			if(desc.snapshotItem(j).className)
				desc.snapshotItem(j).className = desc.snapshotItem(j).className.replace(/ blnone/, '');
			desc.snapshotItem(j).className += ' blnone';
		}
		
		var privacy = document.evaluate("//p[contains(@class, 'Privacy')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < privacy.snapshotLength; j++)
		{
			if(privacy.snapshotItem(j).className)
				privacy.snapshotItem(j).className = privacy.snapshotItem(j).className.replace(/ blnone/, '');
			privacy.snapshotItem(j).className += ' blnone';
		}
			
		var upl = document.evaluate("//p[contains(@class, 'Do')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < upl.snapshotLength; j++)
		{
			if(upl.snapshotItem(j).className)
				upl.snapshotItem(j).className = upl.snapshotItem(j).className.replace(/ blnone/, '');
			upl.snapshotItem(j).className += ' blnone';
		}
			
		var activity = document.evaluate("//p[contains(@class, 'Activity')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < activity.snapshotLength; j++)
		{
			if(activity.snapshotItem(j).className)
			activity.snapshotItem(j).className = activity.snapshotItem(j).className.replace(/ blhidden/, '');
			activity.snapshotItem(j).className += ' blhidden';
		}
			
		var mn = document.getElementById('Main');
		
		if(mn)
		{
			if(mn.className)
				mn.className = mn.className.replace(/ blmain/, '');
			mn.className += ' blmain';
		}
	}

	function blacken() {
		document.getElementById('onblack').style.display = 'none';	
		document.getElementById('onwhite').style.display = '';	
		document.getElementById('backtoflickr').style.display = '';	
		
		hide_all();
			
		var bdy = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		bdy.className = bdy.className.replace(/ blacken/, '');
		bdy.className += ' blacken';
		
		var h4 = document.evaluate("//div[contains(@class, 'StreamView')]/h4", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
		for(var j = 0; j < h4.snapshotLength; j++)
		{
			h4.snapshotItem(j).className = h4.snapshotItem(j).className.replace(/ blacken/, '');
			h4.snapshotItem(j).className += ' blacken';
		}
				
		var h1 = document.evaluate("//h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
		for(var j = 0; j < h1.snapshotLength; j++)
		{
			h1.snapshotItem(j).className = h1.snapshotItem(j).className.replace(/ blhl/, '');
			h1.snapshotItem(j).className += ' blhl';
		}
			
		return false;
	}
		
	function whiten() {
		document.getElementById('onblack').style.display = '';	
		document.getElementById('onwhite').style.display = 'none';	
		document.getElementById('backtoflickr').style.display = '';	
		
		hide_all();
		
		var bdy = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		bdy.className = bdy.className.replace(/ blacken/, '');
		
		var h4 = document.evaluate("//div[contains(@class, 'StreamView')]/h4", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
		for(var j = 0; j < h4.snapshotLength; j++)
			h4.snapshotItem(j).className = h4.snapshotItem(j).className.replace(/ blacken/, '');
				
		var h1 = document.evaluate("//h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
		for(var j = 0; j < h1.snapshotLength; j++)
		{
			h1.snapshotItem(j).className = h1.snapshotItem(j).className.replace(/ blhl/, '');
			h1.snapshotItem(j).className += ' blhl';
		}
			
		return false;
	}
		
	function back_to_flickr() {
		document.getElementById('onblack').style.display = '';
		document.getElementById('onwhite').style.display = '';
		document.getElementById('backtoflickr').style.display = 'none';
		
		var bdy = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		bdy.className = bdy.className.replace(/ blacken/, '');
		
		var noc = bdy.childNodes.length;
		
		var dwld = document.evaluate("//div[contains(@class, 'DownloadThis')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		for(var i = 0; i < noc; i++)
		{
			if((bdy.childNodes[i].id != 'Main') &&
			   (bdy.childNodes[i].id != 'onblack_span') &&
			   (bdy.childNodes[i]    != dwld))
			{
				bdy.childNodes[i].className = bdy.childNodes[i].className.replace(/ blnone/, '');
			}
		}
		
			
		if(dwld)
		{	
			var table = document.evaluate("//div[contains(@class, 'DownloadThis')]/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			
			if(table)
			{
				if(table.className)
					table.className = table.className.replace(/ blhidden/, '');
			}
			
			var p = document.evaluate("//div[contains(@class, 'DownloadThis')]/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for(var i = 0; i < p.snapshotLength; i++)
			{
				if(i != 1)
				{
					if(p.snapshotItem(i).className)
						p.snapshotItem(i).className = p.snapshotItem(i).className.replace(/ blnone/, '');
				}
			}
			
			if(dwld.className)
				dwld.className = dwld.className.replace(/ bldwld/, '');
		}
		
		var rhs = document.evaluate("//td[contains(@class,'RHS')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		if(rhs)
			rhs.className = rhs.className.replace(/ blnone/, '');
			
		var bbar = document.getElementById('button_bar');
		
		if(bbar)
			bbar.className = bbar.className.replace(/ blnone/, '');
			
		var about = document.getElementById('About');
		
		if(about)
			about.className = about.className.replace(/ blnone/, '');
			
		var subnav = document.getElementById('SubNav');
		
		if(subnav)
			subnav.className = subnav.className.replace(/ blnone/, '');
			
		var feeds = document.getElementById('Feeds');
		
		if(feeds)
			feeds.className = feeds.className.replace(/ blnone/, '');
			
		var pages = document.evaluate("//div[contains(@class,'Pages')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		if(pages)
			pages.className = pages.className.replace(/ blnone/, '');
			
		var pcnewfeat = document.evaluate("//div[contains(@class,'pcNewFeature')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(pcnewfeat)
			pcnewfeat.className = pcnewfeat.className.replace(/ blnone/, '');
			
		var desc = document.evaluate("//div[contains(@class, 'Desc')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < desc.snapshotLength; j++)
			desc.snapshotItem(j).className = desc.snapshotItem(j).className.replace(/ blnone/, '');
			
		var desc = document.evaluate("//p[contains(@class, 'Desc')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < desc.snapshotLength; j++)
			desc.snapshotItem(j).className = desc.snapshotItem(j).className.replace(/ blnone/, '');
			
		var privacy = document.evaluate("//p[contains(@class, 'Privacy')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < privacy.snapshotLength; j++)
			privacy.snapshotItem(j).className = privacy.snapshotItem(j).className.replace(/ blnone/, '');
			
		var upl = document.evaluate("//p[contains(@class, 'Do')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < upl.snapshotLength; j++)
			upl.snapshotItem(j).className = upl.snapshotItem(j).className.replace(/ blnone/, '');
			
		var activity = document.evaluate("//p[contains(@class, 'Activity')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < activity.snapshotLength; j++)
			activity.snapshotItem(j).className = activity.snapshotItem(j).className.replace(/ blhidden/, '');
			
		var h4 = document.evaluate("//div[contains(@class, 'StreamView')]/h4", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < h4.snapshotLength; j++)
			h4.snapshotItem(j).className = h4.snapshotItem(j).className.replace(/ blacken/, '');
			
		var h1 = document.evaluate("//h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var j = 0; j < h1.snapshotLength; j++)
			h1.snapshotItem(j).className = h1.snapshotItem(j).className.replace(/ blhl/, '');
			
		var mn = document.getElementById('Main');
		
		if(mn)
			mn.className = mn.className.replace(/ blmain/, '');
			
		return false;
	}

	var css_style = '.blacken { background-color: #000000; color: #ffffff;} \
					 .blmain { text-align: center; } \
					 .blmain table, .blmain table div { margin-left: auto; margin-right: auto; } \
					 .blhidden { visibility: hidden; } \
					 .blnone { display: none; } \
					 .blhl { text-align: center;} \
					 .blacken .blhl { background-color: #000000; color: #ffffff; } \
					 .blacken .blhl:hover { color: #000000; } \
					 .blbutton_span { position: fixed; top: 2px; right: 5px; z-index: 1; } \
	                 .blbutton { padding: 2px; float: right; font-size: 11px; line-height: 11px; font-weight: bold; color: #0063DC; text-decoration: none; } \
	                 .blbutton:visited { color: #0063DC; text-decoration: none; } \
	                 .blbutton:hover { background: #0054BD none repeat scroll 0 0; color: #FFFFFF} \
					 .blacken .blbutton { color: #ffffff; text-decoration: none; } \
	                 .blacken .blbutton:visited { color: #ffffff; text-decoration: none; } \
	                 .blacken .blbutton:hover { background: #ffffff none repeat scroll 0 0; color: #000000} \
					 .bldwld { border: 0px; text-align: center; }';

	var scri = document.createElement('script');
	scri.type = 'text/javascript';
	scri.textContent = hide_all + '\n' + blacken + '\n' + whiten + '\n' + back_to_flickr;
	document.getElementsByTagName('head')[0].appendChild(scri);

	var style = document.createElement('style');
	style.type = 'text/css';
	style.textContent = css_style;
	document.getElementsByTagName('head')[0].appendChild(style);
		
	var bdy = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	var on_black_sp = document.createElement('span');
	on_black_sp.id = 'onblack_span';
	on_black_sp.className = 'blbutton_span';
	on_black_sp.innerHTML = '<a href="" class="blbutton" id="backtoflickr" onclick="return back_to_flickr();">Back to Flickr</a><a href="" class="blbutton" id="onblack" onclick="return blacken();">On Black</a><a href="" class="blbutton" id="onwhite" onclick="return whiten();">On White</a>';

	bdy.appendChild(on_black_sp);

	document.getElementById('backtoflickr').style.display = 'none';

})();