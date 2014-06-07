// ==UserScript==
// @name           Digi-Key Dominance
// @namespace      http://userscripts.org/users/67379
// @description    Improves the user interface for part searching on digikey.com
// @match          http://search.digikey.com/scripts/DkSearch/dksus.dll*
// @match          http://search.digikey.com/scripts/dksearch/dksus.dll*
// @match          http://search.digikey.com/*/cat/*
// @icon           http://search.digikey.com/favicon.ico
// ==/UserScript==

/*
Todo:
Save and load selection.
Scrolling history.
*/

///////////////////////////////////////////////////////////////////////////////
// General helpers ////////////////////////////////////////////////////////////

function ZeroPad(n)
{
	var s = n.toString();
	s = ('00000' + s).slice(-5);
	return s;
}

function DecToHex(number)
{
	if (number < 0)
		number = 0xFFFFFFFF + number + 1;
	return number.toString(16).toUpperCase();
}

function Kill(elm)
{
	if (elm)
		if (elm.parentNode)
			elm.parentNode.removeChild(elm);
}

function XPathKill(path)
{
	XPathIterate(path, Kill);
}

function XPathSelect(path)
{
	return document.evaluate(path, document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function XPathIterate(path, func, doc)
{
	if (doc == null)
		doc = document;
	var snapshot = doc.evaluate(path, doc, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < snapshot.snapshotLength; i++)
		func(snapshot.snapshotItem(i), i);
}

function KillTextNodes(rootpath)
{
	XPathIterate(rootpath + '//text()[not(normalize-space())]', Kill);
}

function SortSelect(select)
{
	var tmpAry = new Array();
	for (var i = 0; i < select.options.length; i++)
		tmpAry[i] = select.options[i];
	tmpAry.sort(function(opta, optb)
	{
		if (opta.id > optb.id) return  1;
		if (opta.id < optb.id) return -1;
		return 0;
	});
	select.options.length = 0;
	for (var i in tmpAry)
		select.appendChild(tmpAry[i]);
}

function IterateChildren(parent, func)
{
	for (var i = 0; i < parent.childElementCount; i++)
		func(parent.childNodes[i], i);
}

///////////////////////////////////////////////////////////////////////////////
// Globals ////////////////////////////////////////////////////////////////////

var loc, content, newstyles,
	filterform, filtertable, filtertbody,
	rowheadings, rowknobsallow, rowallow, rowknobsremove, rowremove,
	resultsframe, resultsbutton, 
	fvselectvals, fvinput,
	refreshtimer, sortdiv, sorttbody, radioprice, stock, quantity,
	tbodyres, npages, productTable, dkpnindex;

///////////////////////////////////////////////////////////////////////////////
// Worker functions ///////////////////////////////////////////////////////////

function CommonMods()
{
	XPathKill("//div[@id='content']/p");
	XPathKill("//div[@id='content']/form//br");
	
	XPathIterate('//table', function(table)
	{
		table.removeAttribute('cellspacing');
		table.removeAttribute('cellpadding');
		table.removeAttribute('border');
	});
	
	newstyles = document.createElement('style');
	newstyles.type = 'text/css';
	newstyles.textContent =
		'.searchtable, .searchtable td, .searchtable th { border-collapse: collapse; border: thin solid #C0C0C0 } '
		+'.searchtable { padding: 0; } '
		+'.searchtable th, .searchtable td { padding: 0 2px } '
		+'.searchtable * { font-size: xx-small; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif } '
		+'.searchtable select { border: none } '
		+'input[type=button] { padding: 0 } ';
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(newstyles);
	
	XPathIterate('//table//img', function(img)
	{
		img.removeAttribute('height');
		img.removeAttribute('width');
	});
}

function ResultPagination()
{
	var pagetd = XPathSelect('//td[@align = "left" and contains(., "Page ")]');
	tbodyres = XPathSelect('//table[@id = "productTable"]/tbody');
	if (!pagetd)
	{
		npages = 1;
		return;
	}
	pagetd.style.display = 'none';
	var pagestr = pagetd.firstChild.textContent,
		pageresults = /(\d*)\/(\d*)/.exec(pagestr),
		page = parseInt(pageresults[1]);
	if (page > 1)
		return;
	
	npages = parseInt(pageresults[2]);
	Kill(pagetd.parentNode);
	XPathKill('//table/tbody/tr[last()]/td[@colspan="2"]/..');
	
	var pageiframe = document.createElement('iframe'),
		srform = XPathSelect('//form[@name = "srform"]'),
		pageinput = XPathSelect('//input[@name = "page"]');
	pageiframe.id = 'pageiframe';
	pageiframe.name = pageiframe.id;
	pageiframe.style.display = 'none';
	document.body.appendChild(pageiframe);
	srform.action += '&dkdompage';
	srform.target = pageiframe.id;
	
	var fetchbutton = document.createElement('input');
	fetchbutton.type = 'button';
	fetchbutton.value = 'Add page';
	fetchbutton.addEventListener('click', function()
	{
		pageinput.value++;
		srform.submit();
	}, false);
	srform.parentNode.insertBefore(fetchbutton, srform);
	
	window.addEventListener('scroll', function()
	{
		var html = document.documentElement,
			body = document.body,
			// I hate browser incompatibility
			scrolltop = Math.max(body.scrollTop, html.scrollTop);
		if (scrolltop + html.clientHeight >= body.scrollHeight && pageinput.value < npages)
		{
			pageinput.value++;
			srform.submit();
		}
	}, false);
	
	pageiframe.addEventListener('load', function()
	{
		XPathIterate('//table[@id = "productTable"]/*' , function(tsection)
		{
			productTable.appendChild(tsection);
		}, pageiframe.contentDocument);
	}, false);
	
	ResultCollapsing();
}

function ExtPriceReplace(calclink)
{
	var calctd = calclink.parentNode,
		partrow = calctd.parentNode,
		qty = XPathSelect('//input[@name = "quantity"]').value,
		dkpart = partrow.childNodes[dkpnindex].firstChild.textContent,
		req = 'name=' + dkpart + '&quantity=' + qty,
		ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function()
	{
		if (ajax.readyState != 4)
			return;
		if (ajax.responseText.indexOf("Part not found") != -1)
		{
			console.log("Part not found.");
			return;
		}
		calctd.firstChild.title = 'Digikey-reeled';
		if (ajax.responseText.indexOf("Quantity entered is not a multiple of a price break.") != -1)
		{
			console.log("Bad qty multiple");
			calctd.firstChild.innerHTML = 'bad qty';
			return;
		}
		var firsttag = '<form action="/scripts/dksearch/dksus.dll?Detail" method=post>',
			price = ajax.responseText.substr(ajax.responseText.indexOf(firsttag) + firsttag.length);
		firsttag = '<td align=right>';
		price = price.substr(price.indexOf(firsttag) + firsttag.length);
		price = price.substr(0, price.indexOf('<'));
		calctd.firstChild.innerHTML = price + '@ qty' + qty;
	};
	ajax.open('POST', 'http://search.digikey.com/scripts/dksearch/dksus.dll?Detail', true);
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	ajax.setRequestHeader('Content-length', req.length);
	ajax.setRequestHeader('Connection', 'close');
	ajax.send(encodeURI(req));
}

function ResultCollapsing()
{
	var dochead = document.getElementsByTagName('head')[0],
		thead = productTable.getElementsByTagName('thead')[0],
		collapserow = document.createElement('tr');
	
	var hidecss = '{ background-color: lightgrey; font-size: 0pt; }';
		
	XPathIterate('//table[@id="productTable"]/thead/tr/th', function(thelm, i)
	{
		var collapsestyles = document.createElement('style');
		collapsestyles.type = 'text/css';
		collapsestyles.textContent = '';
		dochead.appendChild(collapsestyles);
		
		var selector = '#productTable tr>*:nth-child(' + (i+1) + ')',
			hidestyle = selector + ', ' + selector + ' a { background-color: lightgrey; font-size: 0pt } ' +
				selector + ' img { display: none }';
		
		var collapsebutton = document.createElement('input');
		collapsebutton.type = 'button';
		collapsebutton.value = '><';
		collapsebutton.title = thelm.innerHTML;
		collapsebutton.addEventListener('click', function()
		{
			var collapsing = collapsebutton.value == '><';
			collapsebutton.value = collapsing ? '<>' : '><';
			collapsestyles.textContent = collapsing ? hidestyle : '{}';
		}, false);
		
		var th = document.createElement('th');
		th.appendChild(collapsebutton);
		collapserow.appendChild(th);
	});
	dochead.appendChild(newstyles);
	thead.appendChild(collapserow);
}

function ResultMods()
{
	// Inner search results
	
	// Initially kill off useless crap ////////////////////////////////////////
	Kill(document.getElementById('header'));
	Kill(document.getElementById('menu_11'));
	Kill(document.getElementById('menu_12'));
	Kill(document.getElementById('noprint'));
	Kill(document.getElementById('noprint'));
	
	XPathKill('//form[not(@name)]');
	XPathKill('//form[@method = "get"]');
	XPathKill('//form[@name != "srform"]');
	XPathKill('//img[contains(@src, "NoPhoto")]');
	XPathKill('//td//br');
	XPathKill('//td[contains(., "All prices are in ")]');
	
	KillTextNodes('//table[@id = "productTable"]');
	
	if (productTable == null)
		return;
	
	document.getElementById('content').appendChild(productTable);
	XPathKill('(//table[@id="productTable"]/thead/tr)[2]');
	XPathKill('(//div[@id="content"]/table)[1]');

	// Extended price calculation /////////////////////////////////////////////	
	dkpnindex = -1;
	XPathIterate('//table[@id = "productTable"]//th/text()', function(elm, i)
	{
		if (elm.textContent == 'Digi-Key Part Number' && dkpnindex == -1)
			dkpnindex = i;
	});
	XPathIterate('//table[@id = "productTable"]//a[text() = "Calculate"]', ExtPriceReplace);
	
	// Pagination mods ////////////////////////////////////////////////////////
	ResultPagination();
	
	// Stylization ////////////////////////////////////////////////////////////
	
	productTable.className = 'searchtable';
		
	newstyles.textContent +=
		'td img { height: 24px } '
		+'.searchtable tr:nth-child(even) { background-color: white }'
		+'.searchtable tr:nth-child(odd)  { background-color: #F8F8F8 }'
		+'img[src*="datasheet.gif"] { height: 16px } ';
	if (npages > 1)
	{
		var mh = Math.min(500, tbodyres.clientHeight * 0.9);
		tbodyres.style.height = mh+'px';
	}
}

function FilterMods()
{
	IdentifyElms();
	
	XPathKill("//form[contains(@action, 'KeywordSearch')]");
	XPathKill("//form[contains(@action, 'Selection')]");
	// XPathKill("//table[@id='productTable']");
	XPathIterate("//div[@id='content']/table", function(elm, i)
	{
		if (elm != filtertable && i)
			Kill(elm);
	});
	
	stock = XPathSelect("//input[@name='stock']");
	quantity     = document.createElement('input');
	var pbfree      = XPathSelect("//input[@name='pbfree']"),
		rohs        = XPathSelect("//input[@name='rohs']"),
		resetbutton = XPathSelect("//input[@type='reset']"),
		qtylabel     = document.createElement('label'),
		keyword      = document.createElement('input'),
		keywordlabel = document.createElement('label');
		
	stock   .addEventListener('click',    ResetTimer, false);
	pbfree  .addEventListener('click',    ResetTimer, false);
	rohs    .addEventListener('click',    ResetTimer, false);
	quantity.addEventListener('keypress', ResetTimer, false);
	keyword .addEventListener('keypress', ResetTimer, false);

	quantity.type = 'input';
	quantity.defaultValue = '1';
	quantity.name = 'quantity';
	quantity.id = 'quantity';
	filterform.insertBefore(quantity, resetbutton);
	qtylabel.htmlFor = 'quantity';
	qtylabel.innerHTML = 'Quantity';
	filterform.insertBefore(qtylabel, quantity);
	keyword.type = 'input';
	keyword.name = 'k';
	keyword.id = 'keyword';
	filterform.insertBefore(keyword, qtylabel);
	keywordlabel.htmlFor = 'keyword';
	keywordlabel.innerHTML = 'Keywords';
	filterform.insertBefore(keywordlabel, keyword);

	stock.defaultChecked = true;

	resultsframe.name = 'resultsframe';
	resultsframe.id = 'resultsframe';
	content.appendChild(resultsframe);
	
	filterform.action = '/scripts/dksearch/dksus.dll?Selection&dkdompage';
	filterform.target = 'resultsframe';
	
	resultsbutton.value = 'Refresh Results';
	resultsbutton.type = 'button';
	resultsbutton.addEventListener('click', RefreshResults, false);
	
	resetbutton.addEventListener('click', OnReset, false);

	filtertable.className = 'searchtable';		
	
	newstyles.textContent +=
		'.searchtable th { min-width: 100px } '
		+'th label, th input, td input { margin: 0 } '
		+'iframe { border: thin solid black } '
		+'.searchtable td { vertical-align: top; background-color: #F8F8F8 } '
		+'#content { padding: 0; margin: 0 } ' // this gets overridden
		+'#sortdiv th { min-width: 0; } '
		+'#sortdiv, #sortdiv * { border-collapse: collapse } '
		+'#sortdiv td { background-color: white } ' 
		+'#resultsframe { height: 500px; width: 100% }';
	content.style.padding = '0';
	content.style.margin = '10px';
}

function IdentifyElms()
{
	var submitpath = '//form[@action="/scripts/dksearch/dksus.dll" and @method="post"]';
	filterform = XPathSelect(submitpath);
	filtertable = XPathSelect(submitpath + '//table');
	
	KillTextNodes(submitpath + '//table');
	
	filtertbody = filtertable.firstChild;
	rowheadings = filtertbody.childNodes[0];
	rowallow = XPathSelect('(' + submitpath + '//tr)[2]');
	resultsbutton = XPathSelect('//input[@value="Apply Filters"]');
	resultsframe = document.createElement('iframe');
	fvinput = document.createElement('input');
}

function RedoFilterUI()
{
	rowremove = document.createElement('tr');
	rowknobsallow = document.createElement('tr');
	rowknobsremove = document.createElement('tr');
	
	ToggleElm(rowknobsallow, rowallow, 'Allowed');
	ToggleElm(rowknobsremove, rowremove, 'Removed');

	filtertbody.insertBefore(rowknobsallow, rowallow);
	filtertbody.appendChild(rowknobsremove);
	filtertbody.appendChild(rowremove);

	var firstth = document.createElement('th'),
		titletable = content.getElementsByTagName('table')[0],
		titlechildren = titletable.firstChild.firstChild.childNodes;
	rowheadings.insertBefore(firstth, rowheadings.firstChild);
	firstth.innerHTML = titlechildren[0].innerHTML + ' /<br/>' +
		titlechildren[1].innerHTML;
	Kill(titletable);
	
	sortdiv = document.createElement('table');
	sortdiv.id = 'sortdiv';
	sortdiv.innerHTML =
		'<thead><tr> <th>Sort</th> <th>▲</th> <th>▼</th> </tr></thead>' +
		'<tbody id="sorttbody"></tbody>';
	rowknobsallow.firstChild.appendChild(sortdiv);
	sorttbody = document.getElementById('sorttbody');
	SpecialSort('DK Part#',  1000001);
	SpecialSort('Mfg Part#', 1000002);
	SpecialSort('Desc',      1000003);
	SpecialSort('Qty Avail', 1000009);
	SpecialSort('Qty Min',   1000010);
	SpecialSort('$/Unit',    1000011);
	sorttbody.innerHTML += '<tr><td>None</td></tr>';
	SpecialSortRadio(0);
	radioprice = document.getElementById('sort_1000011');
	radioprice.defaultChecked = true;
	document.getElementById('sort_0').parentNode.colSpan = 2;
	
	XPathIterate("//table[@id='sortdiv']//input[@type='radio']", function(radio)
	{
		radio.addEventListener('click', ResetTimer, false);
	});
}

function RefreshResults()
{
	var fvstr = '';
	IterateChildren(rowallow, function(td, i)
	{
		var select = td.firstChild,
			fvcat = fvselectvals[i];
		IterateChildren(select, function(option)
		{
			var decval = (fvcat << 18) | option.value;
			fvstr += DecToHex(decval) + ',';
		});
	});
	fvinput.value = fvstr.substr(0, fvstr.length - 1);
	filterform.submit();
}

function OnReset()
{
	IterateChildren(rowallow, function(allowtd, i)
	{
		var source = rowremove.childNodes[i].firstChild,
			dest = allowtd.firstChild;
		MoveAll(source, dest);
	});
}

function GetFVs()
{
	fvselectvals = new Array();
	
	IterateChildren(rowallow, function(td, i)
	{
		var select = td.firstChild;
		fvselectvals[i] = parseInt(select.name.substr(2));
	});
	
	fvinput.type = 'hidden';
	fvinput.name = 'FV';
	filterform.appendChild(fvinput);
	
	// GM_log('fvselectvals: ' + fvselectvals);
	RefreshResults();

	for (var i = 0; i < rowallow.childElementCount; i++)
		SetupColumn(i);
}

function ToggleElm(insertrow, hideelm, descstr)
{
	var	firsttd = document.createElement('td'),
		descdiv = document.createElement('div');
	descdiv.innerHTML = '(-) ' + descstr;
	descdiv.addEventListener('click', function()
	{
		var togstr = descdiv.innerHTML,
			togindex = togstr.indexOf('+'),
			show = togindex != -1;
		if (!show)
			togindex = togstr.indexOf('-');
		descdiv.innerHTML = togstr.substr(0, togindex) +
			(show ? '-' : '+') + togstr.substr(togindex+1);
		hideelm.style.display = show ? '' : 'none';
		if (descstr == 'Allowed')
			sortdiv.style.display = show ? '' : 'none';
		firsttd.rowSpan = show ? 2 : 1;
	}, false);
	firsttd.rowSpan = 2;
	firsttd.appendChild(descdiv);
	insertrow.insertBefore(firsttd, insertrow.firstChild);
}

function ResetTimer()
{
	if (refreshtimer)
		clearTimeout(refreshtimer);
	refreshtimer = setTimeout(RefreshResults, 2000);
}

function WideOption(expand, col, row)
{
	var select = row.childNodes[col].firstChild;
	IterateChildren(select, function(option)
	{
		var opttext = option.firstChild;
		if (expand)
		{
			opttext.nodeValue = option.title;
			option.title = null;
		}
		else
		{
			var unescaped = opttext.nodeValue;
			option.title = unescaped;
			if (unescaped.length > 20)
				opttext.nodeValue = unescaped.substr(0, 17) + '...';
		}
	});
}

function OnWide(col, widebutton)
{
	var expand = widebutton.value == '<>';
	widebutton.value = expand ? '><' : '<>';
	widebutton.title = (expand ? 'Collapse' : 'Expand') + ' this column';
	
	WideOption(expand, col, rowallow);
	WideOption(expand, col, rowremove);
}

function AutoSelectHeight(select)
{
	select.size = Math.max(1, Math.min(10, select.childElementCount));
}

function PostSelect(source, dest)
{
	ResetTimer();
	AutoSelectHeight(source);
	AutoSelectHeight(dest);
	SortSelect(dest);
}

function MoveAll(source, dest)
{
	while (source.childElementCount > 0)
		dest.appendChild(source.childNodes[0]);
	PostSelect(source, dest);
}

function SelectClicked(sourcerow, source, dest)
{
	source.addEventListener('mouseup', function()
	{
		for (var i = 0; i < source.childElementCount;)
		{
			var option = source.childNodes[i];
			if (option.selected)
			{
				option.selected = false;
				dest.appendChild(option);
			}
			else i++;
		}
		PostSelect(source, dest);
	}, false);
	AutoSelectHeight(source);
	
	var knobth = document.createElement('th'),
		allbutton = document.createElement('input');
	allbutton.type = 'button';
	allbutton.value = 'all';
	allbutton.title = 'Select all attributes';
	allbutton.addEventListener('click', function() { MoveAll(source, dest); }, false);

	sourcerow.appendChild(knobth);
	knobth.appendChild(allbutton);
}

function SetupSort(col, label, sortval, tooltip)
{
	var sortradio = document.createElement('input'),
		labelm = document.createElement('label'),
		fveff = fvselectvals[col];
	if (fveff < 0) // Several FVs don't correspond between select and sort
	{
		switch (fveff)
		{
			case -5: fveff = 1000006; break; // series
			case -1: fveff = 1000007; break; // manufacturer
			default: fveff = 1000000 - fveff; // probably won't work
		}
	}

	sortradio.id = 'sort_' + col + label;
	sortradio.name = 'ColumnSort';
	sortradio.type = 'radio';
	sortradio.value = sortval * fveff;
	sortradio.title = tooltip;
	sortradio.addEventListener('click', ResetTimer, false);
	labelm.innerHTML = label;
	labelm.htmlFor = sortradio.id;
	labelm.title = tooltip;
	rowknobsallow.childNodes[col+1].appendChild(labelm);
	rowknobsallow.childNodes[col+1].appendChild(sortradio);
	return sortradio;
}

function SetupColumn(col)
{
	var	tdallow = rowallow.childNodes[col],
		sallow = tdallow.firstChild,
		tdremove = document.createElement('td'),
		sremove = document.createElement('select');
	tdallow.align = 'right';
	tdremove.align = 'right';
	sremove.size = 10;
	sremove.multiple = true;
	rowremove.appendChild(tdremove);
	tdremove.appendChild(sremove);
	SelectClicked(rowknobsallow, sallow, sremove);
	SelectClicked(rowknobsremove, sremove, sallow);
	SetupSort(col, '▲',  1, 'Sort ascending');
	SetupSort(col, '▼', -1, 'Sort descending');
	
	var widebutton = document.createElement('input');
	widebutton.type = 'button';
	widebutton.addEventListener('click', function() { OnWide(col, widebutton); }, false);
	OnWide(col, widebutton);
	rowknobsallow.childNodes[col+1].appendChild(widebutton);
	
	IterateChildren(sallow, function(option, i)
	{
		option.id = sallow.name + '_' + ZeroPad(i);
	});
}

function SpecialSortRadio(id)
{
	var sorttd = document.createElement('td'),
		sortradio = document.createElement('input');
	sortradio.name = 'ColumnSort';
	sortradio.id = 'sort_' + id;
	sortradio.type = 'radio';
	sortradio.value = id;
	
	sorttd.appendChild(sortradio);
	sorttbody.lastChild.appendChild(sorttd);
	return sorttd;
}

function SpecialSort(title, id)
{
	sorttbody.innerHTML += '<tr><td>' + title + '</td></tr>';
	SpecialSortRadio( id);
	SpecialSortRadio(-id);
}

///////////////////////////////////////////////////////////////////////////////
// Entry point ////////////////////////////////////////////////////////////////

// The normal load event works but is way too slow - it waits for some dumb stuff.
function OnLoadContent()
{
	content = document.getElementById('content');
	if (!content)
	{
		console.log('Content not ready yet');
		setTimeout(OnLoadContent, 100);
		return;
	}
	
	try
	{
		loc = window.location.toString();
		if (loc.indexOf('WT.z') != -1 || loc.indexOf('Detail') != -1)
			return; // Ignore index and detail pages
		
		// Ignore category listings
		if (XPathSelect('//span[@class="catfiltertopitem"]') != null)
			return;
		
		productTable = document.getElementById('productTable');
		
		CommonMods();
		
		if (loc.indexOf('dkdompage') != -1)
			ResultMods();
		else
		{
			FilterMods();
			RedoFilterUI();
			GetFVs();
		}
	} catch (e) { console.log(e + '\n' + e.stack); }
}
OnLoadContent();
