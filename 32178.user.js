// ==UserScript==
// @name           GunBroker.com Modifications
// @namespace      http://jobson.us
// @description    Several scripts to make dealing with the GunBroker.com site a bit more convenient.
// @include        http://v2.gunbroker.com/*
// ==/UserScript==

var console;
var wlh = window.location.href;
var flags;
var baseURL = 'http://'+ document.domain +'/';
var itemRows = [];
var d;
var defaultHeaders;

// Global Settings
var CP = { 
	// First Load
	firstLoad:		GM_getValue('firstLoad'),
	// Auto Login
	autoLogin:		GM_getValue('autoLogin'),
	// Add pictures
	addPictures:	GM_getValue('addPictures'),
	// Hide reserves
	hideReserves:	GM_getValue('hideReserves'),
	// Cleaner My Auctions
	myAuctionsClean:GM_getValue('myAuctionsClean'),
	// Display Buy It Now Price Column
	displayBIN:		GM_getValue('displayBIN'),
	// Better Search
	betterSearch:	GM_getValue('betterSearch'),
	// Show All Pagination
	showPagination:	GM_getValue('showPagination'),
	// Full Category List on Home Page
	fullCatList:	GM_getValue('fullCatList'),
	// Item View Clean-Up
	cleanItemView:	GM_getValue('cleanItemView')
};

var GB = {
	init: function() {
		// Always On
		
		// Setup Global Vars
		GB.setGlobals();
		
		// Setup custom styles
		GB.addStyleSheets();
		
		// Sets up the preferences
		GB.setupControls();
		
		// Cleans search results
		GB.cleanRes();
		
		// Setup Defaults on First Load
		GB.setupDefaults();

		// Setup with Preferences
		
		// Auto Login
		GB.autoLogin();
		
		// Adds Pics to search results
		GB.pictureAdder();
		
		// Hide Reserve Listings
		GB.hideReserves();
		
		// Better Search
		GB.betterSearch();
		
		// Show All Pages
		GB.showAllPages();
		
		// Cleaner My Auctions
		GB.cleanMyAuctions();
		
		// Display Buy It Now Column
		GB.displayBIN();
		
		// Show Full Category List on Home Page
		GB.showFullCatList();
		
		// Item View Clean-Up
		GB.itemViewCleanUp();
		GB.sendToFriend();
	},
	
	// Custom Style Sheets
	addStyleSheets: function() {
		GM_addStyle(".bBot { border-bottom: 1px solid #999999 }");
		GM_addStyle(".pad { padding: 2px; }");

		GM_addStyle("div#controlPanel { background-color: #eeeeee; border: 1px dashed black;                   color: maroon; position: absolute; top: 0;    right: 0; padding: 2px; font-family: arial; font-size: 12px; cursor: pointer; width: auto;  text-align: right; font-weight: bold; }");
		GM_addStyle("div#controlHover { background-color: #eeeeee; border: 1px dashed black; border-top: 0;    color: black;  position: absolute; top: 19px; right: 0; padding: 2px; font-family: arial; font-size: 12px; cursor: default; width: 200px; height: auto; }");
		GM_addStyle("#controlHover ul { margin: 0; padding: 0; }");
		GM_addStyle("#controlHover li { margin: 0; padding: 0; list-style: none; }");
		
		GM_addStyle(".ooSection { cursor: default; }");
		GM_addStyle(".onOff		{ cursor: pointer; }");
		GM_addStyle(".ooOff		{ color: #ff0000; }");
		GM_addStyle(".ooOn		{ color: #008800; }");
		GM_addStyle(".ooActive	{ text-transform: uppercase; }");
		
		GM_addStyle(".hidden { display: none; }");
		
		GM_addStyle("option.b { font-weight: bold; }");
		
		GM_addStyle("td#searchTD     { border: 1px dashed black; }");
		GM_addStyle("div.searcher    { padding: 5px; }");
		GM_addStyle("div#searchLeft  { float: left; width: auto; background-color: white; }");
		GM_addStyle("div#searchRight { float: left; width: 600px; background-color: white; border-left: 1px dashed silver; min-height: 110px; }");
		
		GM_addStyle("span.expandCollapse  { cursor: pointer; color: #008000; text-decoration: underline; }");
		
		GM_addStyle("td#pagination div { background-color: none; margin: 0 auto; width: 600px; font-size: 12px; font-family: Courier New; }");
		GM_addStyle("td#pagination div a { text-decoration: none; }");
		GM_addStyle("td#pagination div hr { border: 0; height: 1px; }");
		
		GM_addStyle("div#allCategories { background-color: white; margin-bottom: 10px; font-size: 1em; }");
		GM_addStyle("div#allCategories a { text-decoration: none; color: darkgreen; }");
		GM_addStyle("div#allCategories a:hover { text-decoration: underline; color: green; }");
		GM_addStyle("div#allCategories ul { list-style: none; margin: 0; padding: 0;");
		GM_addStyle("div#allCategories li.pri a { font-weight: bold; }");
		GM_addStyle("div#allCategories li.sec { margin-left: 5px; font-size: 0.9em; }");
		GM_addStyle("div#allCategories li.sec a { font-weight: normal; }");
		
		GM_addStyle("td.binHead { padding: 0 3px; }");
		GM_addStyle("td.right { text-align: right; }");
		
		GM_addStyle("div#tabsCont { border-bottom: 6px solid #008000; font-size: 1em; }");
		GM_addStyle("ul#tabs { list-style: none; font-family: arial; margin: 0 0 3px 0; padding: 0; font-size: 0.9em; }");
		GM_addStyle("ul#tabs li { display: inline; padding: 6px 6px 4px 6px; margin: 3px; background-color: #113311; }");
		GM_addStyle("ul#tabs li a { text-decoration: none; color: white; }");
		GM_addStyle("ul#tabs li.thistab { font-weight: bold; padding-bottom: 9px; }");
		GM_addStyle("ul#tabs li.thistab a { color: #FFA816; }");
		
		GM_addStyle("td.wlHeader { vertical-align: top; font-weight: bold; padding: 2px; }");
		
		GM_addStyle("tr.removeme { background-color: #FF8080; }");
		
		GM_addStyle("td.watchListCurrency { padding-right: 5px; text-align: right; }");
		GM_addStyle("img.watchListImg { border: 0; max-height: 96px; max-width: 96px; }");
		GM_addStyle("td.wlLastRow { padding-top: 10px; background-color: silver; }");
		GM_addStyle("tr.ended   { color: grey; }");
		GM_addStyle("tr.ended td a { color: grey !important; }");
		
		GM_addStyle("td.viewHeader { font-size: 0.8em; font-weight: bold; font-style: italic; text-align: right; }");
		GM_addStyle("span.fauxLink { color: blue; text-decoration: underline; cursor: pointer; }");
		GM_addStyle("span.wlAdded  { color: red; text-decoration: none; cursor: default; }");
		
		GM_addStyle("tr.grey { background-color: #f0f0f0; }");
		GM_addStyle("tr.white { background-color: #ffffff; }");
	},
	isListingPage: function() {
		return (/(SearchResults|Browse|SellerAuctions)\.asp/.test(wlh));
	},
	
	// Setup Defaults on First Load
	setupDefaults: function() {
		if (CP.firstLoad == 1) return;
		CP = {
			// First Load
			firstLoad:		1,
			// Auto Login
			autoLogin:		1,
			// Add pictures
			addPictures:	1,
			// Hide reserves
			hideReserves:	1,
			// Cleaner My Auctions
			myAuctionsClean:1,
			// Display Buy It Now Price Column
			displayBIN:		1,
			// Better Search
			betterSearch:	1,
			// Show All Pagination
			showPagination:	1,
			// Full Category List on Home Page
			fullCatList:	1,
			// Item View Clean-Up
			cleanItemView:	1
		};
		
		for (var k in CP) {
			GM_setValue(k,CP[k]);
		}
	},
	
	// Send to friend clean-up, part of Item View Clean-up
	sendToFriend: function() {
		if (CP.cleanItemView != 1) return;
		if (/SendMailToFriend\.asp/.test(wlh)) window.location.href = baseURL+'Auction/MyAuctions.asp?Tab=0';
		if (!/SendMailToFriendForm/.test(wlh)) return;
		var query = {};
			query = GB.getQuery();
		
		var area = $x('//textarea')[0];
		
		var txt = area.textContent;
			txt = txt.replace(/item/,"'"+ unescape(query.title) +"'");
			txt = txt.replace(/, the.+?\. C/,'. C');
				
		removeElement(area.childNodes[0]);
		area.appendChild(d.createTextNode(txt));
		
	},
	
	// Item View Clean-Up
	itemViewCleanUp: function() {
		if(CP.cleanItemView != 1) return;
		if(!/ViewItem/.test(wlh)) return;
		var query = {};
			query = GB.getQuery();
		if (!query.Item) return;

		var t = $('Table5').getElementsByTagName('tbody')[0];
		
		var rows = t.getElementsByTagName('tr');
		
		// Remove Blank Rows
		for (var i=3;i<rows.length;i++) {
			if (rows[i].getElementsByTagName('td').length>1) continue;
			removeElement(rows[i]);
			i--;
		}
		
		// Table Clean-Up
		var tROW = d.createElement('tr');
			tROW.appendChild(d.createElement('td'));
			tROW.appendChild(d.createElement('td'));
			tROW.getElementsByTagName('td')[1].appendChild(d.createElement('span'));
			tROW.getElementsByTagName('td')[0].setAttribute('class','viewHeader');
			tROW.getElementsByTagName('td')[1].setAttribute('colspan','4');
			tROW.getElementsByTagName('span')[0].setAttribute('class','fauxLink');

		var brc = 0;
		var ended = ($x('//td[@bgcolor="#808080"]').length==3) ? true : false;
		for (var i=0;i<rows.length;i++) {
			var col = rows[i].getElementsByTagName('td');

			if (brc>0 && col[1]) {
				var txt = col[1].textContent.replace(/[\r\n\t]/g,'');
				var rr = 0;
				rr += (/Add this listing/.test(txt)) ? 1 : 0;
				rr += (/Mail this listing/.test(txt)) ? 1 : 0;
				if (rr>0) {
					removeElement(rows[i]);
					i--;
				}
			}
			brc++;

			if (i==10 && !ended) {
				// Email to Friend
				var myRow = t.insertBefore(tROW.cloneNode(true),rows[i]);
					myRow.getElementsByTagName('td')[0].appendChild(d.createTextNode('Email\u00a0'));
					myRow.getElementsByTagName('span')[0].appendChild(d.createElement('a'));
					myRow.getElementsByTagName('a')[0].appendChild(d.createTextNode('Email '+ query.Item +' to a friend'));
					myRow.getElementsByTagName('a')[0].setAttribute('href',baseURL+'Auction/SendMailToFriendForm.asp?Item='+ query.Item +'&title='+ escape($$('h1VI')[0].textContent.replace(/[\r\n\t]/g,'').replace(/^\s+/g,'').replace(/\s+$/g,'')));

				// Add to watch list
				var myRow = t.insertBefore(tROW.cloneNode(true),rows[i]);
					myRow.getElementsByTagName('td')[0].appendChild(d.createTextNode('Watch\u00a0List\u00a0'));
					myRow.getElementsByTagName('span')[0].appendChild(d.createTextNode('Add '+ query.Item +' to your watch list'));
					myRow.getElementsByTagName('span')[0].addEventListener('click',GB.addToWatchList,false);
					myRow.getElementsByTagName('span')[0].setAttribute('id','wlSPAN');
					myRow.getElementsByTagName('td')[1].appendChild(d.createTextNode('\u00a0|\u00a0'))
					myRow.getElementsByTagName('td')[1].appendChild(d.createElement('a'));
					myRow.getElementsByTagName('a')[0].appendChild(d.createTextNode('View Watch List'));
					myRow.getElementsByTagName('a')[0].setAttribute('href',baseURL+'Auction/MyAuctions.asp?Tab=0');
					
				// Bid Now
				var myRow = t.insertBefore(tROW.cloneNode(true),rows[i]);
					myRow.getElementsByTagName('td')[0].appendChild(d.createTextNode('Bid\u00a0'));
					myRow.getElementsByTagName('span')[0].appendChild(d.createElement('a'));
					myRow.getElementsByTagName('a')[0].appendChild(d.createTextNode('Bid on '+ query.Item +' Now'));
					myRow.getElementsByTagName('a')[0].setAttribute('href','#BID');
			}
			
			for (var j=0;j<col.length;j++) {
				if (col[j].getAttribute('align') != 'right') continue;
				var txt = col[j].textContent.replace(/[\r\n\t]/g,'');
				while(col[j].childNodes.length>0) removeElement(col[j].childNodes[0]);
				col[j].appendChild(d.createTextNode(txt));
				col[j].setAttribute('class','viewHeader');
			}
		}
		
		// Recolor table
		rows = t.getElementsByTagName('tr');
		var bc = ['white','grey'];
		for (var i=0,j=0;i<rows.length;i++,j++) {
			if (rows[i].parentNode != t) {
				j--;
				continue;
			}
			rows[i].setAttribute('class',bc[j%2]);
		}
		
		// Decolor View Counter
		// Does this really NEED to be giant and blue?
		if (/View Counter/.test(rows[rows.length-1].getElementsByTagName('td')[0].textContent)) {
			var txt = rows[rows.length-1].getElementsByTagName('td')[1].textContent.replace(/[\r\n\t]/g,'');
			while (rows[rows.length-1].getElementsByTagName('td')[1].childNodes.length>0) removeElement(rows[rows.length-1].getElementsByTagName('td')[1].childNodes[0]);
			rows[rows.length-1].getElementsByTagName('td')[1].appendChild(d.createTextNode(txt));
		} 
	},
	// Add to Watchlist event
	addToWatchList: function() {
		var query = GB.getQuery();
		var URL = baseURL +'Auction/AddToWatchList.asp?Item='+ query.Item;
		GM_xmlhttpRequest({
			method: 'GET',
			url: URL,
			headers: defaultHeaders,
			onload: function(rD) {
				if (/Addition Complete/.test(rD.responseText)) {
					while($('wlSPAN').childNodes.length>0) removeElement($('wlSPAN').childNodes[0]);
					$('wlSPAN').setAttribute('class','wlAdded');
					$('wlSPAN').removeEventListener('click',GB.addToWatchList,false);
					$('wlSPAN').appendChild(d.createTextNode('Added to your watch list.'));
				} else {
					alert('An error occured, try logging in and trying again.');
				}
			}
		});
	},
	
	// Cleaner My Auctions
	cleanMyAuctions: function() {
		if (CP.myAuctionsClean != 1) return;
		
		GB.setMyAuctionsLink();
		
		// Forward back from the Watch List Transition page to the Watch List
		if (/RemoveFromWatchList/.test(wlh)) window.location.href = baseURL+'Auction/MyAuctions.asp?Tab=0';
		
		if (!/MyAuctions/.test(wlh)) return;
		var query = {};
			query = GB.getQuery();
			query.Tab = (query.Tab) ? query.Tab : 0;
		
		GB.removeCookieMessage();
		GB.setMyAuctionsLink();
		GB.cleanTabs(query);
		GB.cleanWatchList(query);
		GB.watchlistPictureAdder(query);
		GB.watchlistGetRelistLink(query);
	},
	// Gets the relisted link if available
	watchlistGetRelistLink: function(query) {
		if (query.Tab != 0) return;
		
		var rows = $('watchList').getElementsByTagName('tr');
		
		for (var i=2;i<rows.length-1;i=i+2) {
			var end = rows[i].getElementsByTagName('td')[7];
			if (!/Auction has Ended/.test(end.textContent)) continue;
			var td = rows[i].getElementsByTagName('td')[1];
			
			// Grey-Out ended items
			GB.greyOutEnded(td.parentNode);
			var URL = baseURL + 'Auction/ViewItem.asp?Item=' + rows[i].getElementsByTagName('td')[0].textContent.replace(/\D/g,'');
			var node = rows[i].getElementsByTagName('td')[1];
			GB.getURL(URL,node,'recheck');
		}
	},
	
	// Grey-Out Ended Auctions
	greyOutEnded: function(row) {
		row.setAttribute('class','ended');
		row.previousSibling.previousSibling.setAttribute('class','sold');
	},
	
	// Adds thumbnails to the watchlist items
	watchlistPictureAdder: function(query) {
		if (query.Tab != 0) return;
		var rows = $('watchList').getElementsByTagName('tr');
		for (var i=1;i<rows.length-1;i=i+2) {
			var td = rows[i].getElementsByTagName('td')[1];
			if (td.getElementsByTagName('img').length>0) continue;
			var auctionID = rows[i].getElementsByTagName('input')[0].getAttribute('value');
			var URL = baseURL+'Auction/ViewItem.asp?Item='+ auctionID;
			GB.getURL(URL,td,'picWL');
		}
	},
	
	// Sets the My Auctions Link to always start at the Watch List
	setMyAuctionsLink: function() {
		var ma = $x('//a[@href="/Auction/MyAuctions.asp"]');
		for (var i=0;i<ma.length;i++) {
			ma[i].setAttribute('href',baseURL+'Auction/MyAuctions.asp?Tab=0');
		}
	},
	// Removes the Cookie message which seems to plague the My Auctions section
	removeCookieMessage: function() {
		var t = $x('//table[@bordercolor="#c0c0c0"]')[0];
		if (t.getAttribute('border') != 1) return;
		removeElement(t);
	},
	cleanWatchList: function(query) {
		if (query.Tab != 0) return;

		var t = d.getElementsByClassName('smallfont2')[1];
			t.setAttribute('id','watchList');
		var div = t.parentNode.parentNode.parentNode;
		
		while (div.childNodes.length>0) removeElement(div.childNodes[0]);
		removeElement(d.getElementsByClassName('smallfont2')[0]);
		
		
		// Stuff the form back in
		var f = div.appendChild(d.createElement('form'));
			f.setAttribute('method','post');
			f.setAttribute('action',baseURL+'Auction/RemoveFromWatchList.asp');
		
		// Stuff the hidden input back in.
		var inp = f.appendChild(d.createElement('input'));
			inp.setAttribute('type','hidden');
			inp.setAttribute('value','15');
			inp.setAttribute('name','MaxItems');
		
		// Stuff the table back in.
		f.appendChild(t);
		
		var td = t.getElementsByTagName('td');

		// Clean-Up Table
		for (var i=0;i<td.length;i++) {
			if (/s\.gif/.test(td[i].innerHTML)) {
				removeElement(td[i].parentNode);
				i--;
			}
		}
		// Clean up the header
		for (var i=0;i<9;i++) {
			td[i].setAttribute('class','wlHeader ');
			var txt = td[i].getElementsByTagName('b')[0].textContent;
			
			while(td[i].childNodes.length>0) removeElement(td[i].childNodes[0]);
			
			td[i].appendChild(d.createTextNode(txt));
		}
		
		// Add the remove button in.
		var lstRow = t.getElementsByTagName('tr')[t.getElementsByTagName('tr').length-1].getElementsByTagName('td')[0];
			lstRow.setAttribute('class','wlLastRow');
		while(lstRow.childNodes.length>0) removeElement(lstRow.childNodes[0]);
		var button = lstRow.appendChild(d.createElement('button'));
			button.appendChild(d.createTextNode('Remove Selected'));
		
		
		// Remove Stupid View buttons .. Really I can view an auction by clicking on it? No shit, right!?
		var btn = d.getElementsByClassName('ButtonLike');
		while (btn.length>0) {
			if (btn[0].parentNode.getElementsByTagName('br').length>0) removeElement(btn[0].parentNode.getElementsByTagName('br')[0]);
			removeElement(btn[0]);
		}
		
		// Add Check All
		var rem = td[0];
		rem.appendChild(d.createElement('br'));
		var cb = rem.appendChild(d.createElement('input'));
			cb.setAttribute('type','checkbox');
			cb.setAttribute('id','ac');
			cb.addEventListener('change',GB.checkAll,false);
		
		// Add row coloring
		var cb = t.getElementsByTagName('input');
		for (var i=0;i<cb.length;i++) {
			if (cb[i].getAttribute('type') != 'checkbox') continue;
			cb[i].addEventListener('change',GB.recolorRow,false);
		}
		
		
		var rows = $x('//table[@id="watchList"]/tbody/tr');
		// Remove Action Column
		for (var i=0;i<rows.length-1;i=i+2) {
			var td = rows[i].getElementsByTagName('td');
			removeElement(td[td.length-1]);
			if (i==0) i++;
		}

		// Add BIN Column
		for (var i=0;i<rows.length-1;i++) {
			var td = d.createElement('td');

			if (i==0) {
				rows[i].insertBefore(td,rows[i].getElementsByTagName('td')[3]);
				td.setAttribute('class','wlHeader');
				td.appendChild(d.createTextNode('Buy\u00a0It\u00a0Now'));
			} else if (i%2==1) {
				rows[i].getElementsByTagName('td')[2].setAttribute('colspan','6');
			} else if (i%2==0) {
				var bin = '\u2014';
				var t = rows[i].getElementsByTagName('td')[1];
				if (t.getElementsByTagName('table').length>0) {
					bin = t.getElementsByTagName('b')[0].textContent;
					removeElement(t.getElementsByTagName('table')[0]);
				}
				rows[i].insertBefore(td,rows[i].getElementsByTagName('td')[2]);
				td.appendChild(d.createTextNode(bin));
				td.setAttribute('class','watchListCurrency');
				
				rows[i].getElementsByTagName('td')[3].setAttribute('align','');
				rows[i].getElementsByTagName('td')[3].setAttribute('class','watchListCurrency');
				rows[i].getElementsByTagName('td')[4].setAttribute('align','');
				rows[i].getElementsByTagName('td')[4].setAttribute('class','watchListCurrency');
			}
		}
		
		// Remove Font Tags
		var fnt = $('watchList').getElementsByTagName('font');
		for (var i=0;i<fnt.length;i++) {
			var txt = fnt[i].textContent;
			fnt[i].parentNode.insertBefore(d.createTextNode(txt),fnt[i]);
			removeElement(fnt[i]);
			i--;
		}
		
	},
	recolorRow: function() {
		if (this.id == 'ac') return;
		
		var row = this.parentNode.parentNode;
		row.setAttribute('class', (this.checked ? 'removeme' : '') );
		row.nextSibling.nextSibling.setAttribute('class', (this.checked ? 'removeme' : '') );
	},
	checkAll: function() {
		var cb = $('watchList').getElementsByTagName('input');
		for (var i=0;i<cb.length;i++) {
			if (cb[i].getAttribute('type')!='checkbox') continue;
			if (cb[i].getAttribute('id') == 'ac') continue;
			cb[i].checked = this.checked;

			var row = cb[i].parentNode.parentNode;
			row.setAttribute('class', (this.checked ? 'removeme' : '') );
			row.nextSibling.nextSibling.setAttribute('class', (this.checked ? 'removeme' : '') );

		}
	},
	cleanTabs: function(query) {
		var url = baseURL + 'Auction/MyAuctions.asp?';
		var tabs = {
			'Watch List':			'Tab=0',
			'Saved Searches':		'Tab=5',
			'Items Won':			'Tab=2&Timeframe=12',
			'Items Bid On':			'Tab=1&Timeframe=0',
			'Items Sold':			'Tab=4&Timeframe=12',
			'Items Listed':			'Tab=3&Timeframe=0',
			'Non-Paying Bidders':	'Tab=6'
		};
		
		
		var ul = d.createElement('ul');
			ul.setAttribute('id','tabs');
			
		var t = $x('//center/table[@width="100%"]')[0].parentNode;
		t.parentNode.insertBefore(ul,t);
		t.parentNode.setAttribute('align','');
		t.parentNode.setAttribute('id','tabsCont');
		removeElement(t);
		
		for (var k in tabs) {
			var li = ul.appendChild(d.createElement('li'));
				li.setAttribute('class', (query.Tab == tabs[k].match(/Tab=(\d+)/)[1] ? 'thistab' : '') );
			var a = li.appendChild(d.createElement('a'));
			
			a.appendChild(d.createTextNode(k));
			a.setAttribute('href',url+tabs[k]);
		}
	},
	
	// Display Buy It Now Colunn
	displayBIN: function() {
		if (CP.displayBIN != 1) return;
		if (! GB.isListingPage()) return;
		
		// Modify the headers
		var hdr = $x('//tr[@class="smallwhitefont2"]');
		for (var i=0;i<hdr.length;i++) {
			var td = d.createElement('td');
				td.setAttribute('class','binHead');
			hdr[i].insertBefore(td,hdr[i].getElementsByTagName('td')[4]);

			td = td.appendChild(d.createElement('b'));
			td.appendChild(d.createTextNode('Buy\u00a0It\u00a0Now'));
		}
				
		
		for (var i=0;i<itemRows.length;i++) {
			var td = d.createElement('td');
				td.setAttribute('class','right bBot pad');
				td.appendChild(d.createTextNode('\u2014'));
			
			// Force the standard price to align right.
			var price = itemRows[i].getElementsByTagName('td')[4];
				price.removeAttribute('align');
				price.setAttribute('class',price.getAttribute('class')+' right');
			
			itemRows[i].insertBefore(td,itemRows[i].getElementsByTagName('td')[4]);
			if (! /b\.gif/.test(itemRows[i].innerHTML)) continue;
			var url = baseURL + 'Auction/ViewItem.asp?Item='+ itemRows[i].getElementsByTagName('a')[0].getAttribute('href').match(/Item=(\d+)/)[1];
			GB.getURL(url,td,'bin');
		}
	},
	
	// Show Full Category List on Home Page
	showFullCatList: function() {
		if (CP.fullCatList != 1) return;
		var td = $x('//center/table[@width="790"]/tbody/tr/td[@width="210"]');
		if (td.length != 2) return;
		td = td[0];
		
		var url = 'http://gunbroker.com/Auction/Browse.asp?Cat=';
		
		// Clear out current cat list.
		for (var i=0;i<td.childNodes.length;i++) {
			if (td.childNodes[i].tagName == 'IMG' && td.childNodes[i].getAttribute('src') == '/image/homepage/complete-list.gif') break;
			removeElement(td.childNodes[i]);
			i--;
		}
		
		var div = d.createElement('div');
			div.setAttribute('id','allCategories');
		td.insertBefore(div,td.childNodes[0]);
		
		var topUL = div.appendChild(d.createElement('ul'));
		var a,ul,li;
		
		var i=0;
		for (var k in cats) {
			if (cats[k][1] != -1) continue;
			li = topUL.appendChild(d.createElement('li'));
			li.setAttribute('class','pri');
			a = li.appendChild(d.createElement('a'));
			a.setAttribute('href', (cats[k][0]==-1 ? 'http://gunbroker.com/Auction/Categories.asp' : url+cats[k][0]) );
			a.appendChild(d.createTextNode(k));
			
			if(cats[k][0]==-1) continue;
			ul = li.appendChild(d.createElement('ul'));
			ul.setAttribute('id','cat'+ cats[k][0]);
		}
		for (var k in cats) {
			if (cats[k][1] == -1) continue;
			li = $('cat'+ cats[k][1]).appendChild(d.createElement('li'));
			li.setAttribute('class','sec');
			a = li.appendChild(d.createElement('a'));
			a.setAttribute('href', url+cats[k][0] );
			a.appendChild(d.createTextNode(k));
		}
	},
	
	// Better Searching
	betterSearch: function() {
		if (CP.betterSearch != 1) return;
		
		var frm = d.getElementsByTagName('form');
		var frmCnt = 0;
		for (var i=0;i<frm.length;i++) {
			if (!/SearchResults/.test(frm[i].getAttribute('action'))) continue;
			frmCnt++;
			// Convert the search method to GET, they use GET for everything except your initial search, which is kind of retarded.
			frm[i].setAttribute('method','GET');
			
			if (GB.isListingPage() && frmCnt==2) {
				GB.searchResUpdate(frm[i]);
			}
			
			if (frmCnt > 1) {
				if (/SearchForm/.test(wlh)) {
					GB.smartSearch();
					continue;
				}
			}
			
		}
	},
	searchResUpdate: function(frm) {
		var query = GB.getQuery();
		var t,o;
		
		// Remove Show Only & Sort By
		removeElement($x('//table[@bgcolor="#ccddcc"]')[0]);
			
		// GB DOM Busted, get the td
		var tr = frm.parentNode.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
		
		// Kill the original form.
		frm.parentNode.removeChild(frm);

		// Clear out the TR
		while (tr.childNodes.length>0) tr.removeChild(tr.childNodes[0]);
		
		var td = d.createElement('td');
			td.setAttribute('id','searchTD');
		tr.appendChild(td);
		
		// Add a new form
		var frm = d.createElement('form');
			frm.setAttribute('method','get');
			frm.setAttribute('action','/Auction/SearchResults.asp?SearchResults.asp');
		td.appendChild(frm)
		
		var sL = d.createElement('div');
			sL.setAttribute('id','searchLeft');
			sL.setAttribute('class','searcher');
		
		var sR = d.createElement('div');
			sR.setAttribute('id','searchRight');
			sR.setAttribute('class','searcher');

		frm.appendChild(sL);
		frm.appendChild(sR);
		
		// Search Left Section
		// Item Count
		sL.appendChild(d.createTextNode('Item Count: '));
		t = d.createElement('select');
		t.setAttribute('name','Items');
		sL.appendChild(t);
		var c = [50,100,250,500];
		for (var i=0;i<c.length;i++) {
			o = d.createElement('option');
			o.setAttribute('value',c[i]);
			if (query.Items == c[i]) o.setAttribute('selected','selected');
			o.appendChild(d.createTextNode(c[i]));
			t.appendChild(o);
		}
		sL.appendChild(d.createElement('br'));
		
		// Matching
		sL.appendChild(d.createTextNode('Matching: '));
		t = d.createElement('select');
		t.setAttribute('name','kwop');
		t.setAttribute('size','1');
		sL.appendChild(t);
		o = d.createElement('option');
		o.setAttribute('value','0');
		o.appendChild(d.createTextNode('All of these words'));
		t.appendChild(o);
		o = o.cloneNode(false);
		o.setAttribute('value','1');
		o.appendChild(d.createTextNode('Any of these words'));
		t.appendChild(o);
		o = o.cloneNode(false);
		o.setAttribute('value','2');
		o.appendChild(d.createTextNode('Exact Phrase'));
		t.appendChild(o);
		t.selectedIndex = (query.kwop) ? query.kwop : 0;
		sL.appendChild(d.createElement('br'));
		
		// Timeframe
		sL.appendChild(d.createTextNode('Timeframe: '));
		t = d.createElement('select');
		t.setAttribute('name','Timeframe');
		sL.appendChild(t);
		for (var k in Timeframe) {
			o = d.createElement('option');
			o.setAttribute('value',Timeframe[k])
			o.appendChild(d.createTextNode(k));
			if (query.Timeframe==Timeframe[k]) o.setAttribute('selected','selected');
			t.appendChild(o);
		}
		sL.appendChild(d.createElement('br'));
		
		// Sort
		sL.appendChild(d.createTextNode('Sort\u00a0By: '));
		t = d.createElement('select');
		t.setAttribute('name','Sort');
		sL.appendChild(t);
		for (var k in Sort) {
			o = d.createElement('option');
			o.setAttribute('value',Sort[k])
			o.appendChild(d.createTextNode(k));
			if (query.Sort==Sort[k]) o.setAttribute('selected','selected');
			t.appendChild(o);
		}
		sL.appendChild(d.createElement('br'));
		
		
		// Titles & Descriptions
		sL.appendChild(d.createTextNode('Search Titles & Descriptions: '));
		t = d.createElement('input');
		t.setAttribute('type','checkbox');
		t.setAttribute('value','1');
		t.setAttribute('name','SearchType');
		if (query.SearchType == 1) t.setAttribute('checked','checked');
		sL.appendChild(t);
		sL.appendChild(d.createElement('br'));
		
		// Buy Now Only
		sL.appendChild(d.createTextNode('Buy Now Only: '));
		t = d.createElement('input');
		t.setAttribute('type','checkbox');
		t.setAttribute('value','1');
		t.setAttribute('name','BuyNowOnly');
		if (query.BuyNowOnly == 1) t.setAttribute('checked','checked');
		sL.appendChild(t);
		
		// Search Right Section
		// Search
		sR.appendChild(d.createTextNode('Search: '));
		t = d.createElement('input');
		t.setAttribute('name','Keywords');
		if (query.Keywords) t.setAttribute('value',unescape(query.Keywords.replace(/\+/g,' ')));
		sR.appendChild(t);
		t = d.createElement('input');
		t.setAttribute('name','pbSearch');
		t.setAttribute('value','Search');
		t.setAttribute('type','submit');
		sR.appendChild(t);
		sR.appendChild(d.createElement('br'));
		
		// Exclude
		sR.appendChild(d.createTextNode('Exclude: '));
		t = d.createElement('input');
		t.setAttribute('name','Exclude');
		if (query.Exclude) t.setAttribute('value',unescape(query.Exclude.replace(/\+/g,' ')));
		sR.appendChild(t);
		sR.appendChild(d.createElement('br'));
		
		// Category
		sR.appendChild(d.createTextNode('Categories: '));
		t = d.createElement('select');
		t.setAttribute('name','Cats');
		t.setAttribute('id','Cats');
		if (query.Cats && query.Cats.length>1) {
			t.setAttribute('multiple','multiple');
			t.setAttribute('size','10');
		}


		for (var k in cats) {
			o = d.createElement('option');
			o.setAttribute('class',(cats[k][1]==-1 ? 'b' : ''));
			o.setAttribute('value',(cats[k][0]>-1 ? cats[k][0] : ''));
			o.style.paddingLeft = (cats[k][1] == -1 ? '2px' : '20px');
			o.appendChild(d.createTextNode(k));
			t.appendChild(o);
			var sel = (cats[k][0] == parseInt(query.cat,10)) ? true : (query.Cats && query.Cats.indexOf(cats[k][0])>-1) ? true : false;
			if (sel) o.setAttribute('selected','selected');
			
		}
		sR.appendChild(t);
		
		sR.appendChild(d.createTextNode(' '));
		
		t = d.createElement('span');
		t.setAttribute('id','sExpand')
		t.setAttribute('class','expandCollapse' + ($('Cats').getAttribute('multiple') ? ' hidden' : '') );
		t.appendChild(d.createTextNode('Expand'));
		t.addEventListener('click',GB.catExpander,false);
		sR.appendChild(t);
		
		t = d.createElement('span');
		t.setAttribute('id','sCollapse')
		t.setAttribute('class','expandCollapse' + ($('Cats').getAttribute('multiple') ? '' : ' hidden') );
		t.appendChild(d.createTextNode('Collapse'));
		t.addEventListener('click',GB.catExpander,false);
		sR.appendChild(t);

			
	},
	smartSearch: function() {
		// Change Category Select to show all categories.
		var sCats = $x('//select[@name="Cats"]')[0];
		sCats.setAttribute('size','10');
		
		while(sCats.childNodes.length>0) sCats.removeChild(sCats.childNodes[0]);
		
		for (var k in cats) {
			var option = d.createElement('option');
				option.setAttribute('class',(cats[k][1] == -1 ? 'b' : ''))
				option.setAttribute('value',cats[k][0]);
				option.style.paddingLeft = (cats[k][1] == -1 ? '2px' : '20px');
				option.appendChild(d.createTextNode(k));
			sCats.appendChild(option);
		}
		
		// Add 500 to items
		var itms = $x('//select[@name="Items"]')[0];
			itms.setAttribute('size','4');
		var opt = d.createElement('option');
			opt.setAttribute('value','500');
			opt.appendChild(d.createTextNode('500'));
		itms.appendChild(opt);
	},
	catExpander: function() {
		if (this.getAttribute('id') == 'sExpand') {
			d.getElementById('Cats').setAttribute('multiple','multiple');
			d.getElementById('Cats').setAttribute('size','10');
			$('sExpand').setAttribute('class','expandCollapse hidden');
			$('sCollapse').setAttribute('class','expandCollapse');
		} else if (this.getAttribute('id') == 'sCollapse') {
			d.getElementById('Cats').removeAttribute('multiple');
			d.getElementById('Cats').removeAttribute('size');
			$('sExpand').setAttribute('class','expandCollapse');
			$('sCollapse').setAttribute('class','expandCollapse hidden');
		}
	},
	
	// Get Query
	getQuery: function() {
		var out = {};
		var q = wlh.split('?');
		// No Query terms
		if (q.length==1) return {};
			q = q[1].split('&');
		for (var i=0;i<q.length;i++) {
			var x = q[i].split('=');
			if (x[1] == '') continue;
			if (x[0] == 'pbSearch') continue;
			if (x[0] == 'Cats') {
				if (!out['Cats']) out['Cats'] = [];
				out['Cats'].push(parseInt(x[1],10));
			} else {
				out[x[0]] = x[1];
			}
		}
		
		return out;
	},
	
	// Show All Pages
	showAllPages: function() {
		if (CP.showPagination != 1) return;
		if (! GB.isListingPage()) return;
		var t = $x('//center/table[@width="100%"]');
		if (t.length<2) return;
		t = t[1];
		t.getElementsByTagName('form')[0].parentNode.removeChild(t.getElementsByTagName('form')[0]);
		var pages = t.getElementsByTagName('option')[t.getElementsByTagName('option').length-1].getAttribute('value');
		while (t.getElementsByTagName('td').length>0) removeElement(t.getElementsByTagName('td')[0]);
		
		var td = t.getElementsByTagName('tr')[0].appendChild(d.createElement('td'));
			td.setAttribute('id','pagination');
			
		var div = td.appendChild(d.createElement('div'));
				
		var cpage = wlh.match(/Page=(\d+)/);
			cpage = (cpage) ? cpage[1] : 1;
		var url = wlh.replace(/&Page=\d+/,'') + '&Page=';
		for (var i=0,j=1;i<pages;i++,j++) {
			if (j>999) {
				div.appendChild(d.createTextNode('\u00a0'));
			} else if (j>99) {
				div.appendChild(d.createTextNode('\u00a0\u00a0'));
			} else if (j>9) {
				div.appendChild(d.createTextNode('\u00a0\u00a0\u00a0'));
			} else {
				div.appendChild(d.createTextNode('\u00a0\u00a0\u00a0\u00a0'));
			}
			if (cpage == j) {
				var b = div.appendChild(d.createElement('b'));
				b.appendChild(d.createTextNode(j))
			} else {
				var a = div.appendChild(d.createElement('a'));
					a.setAttribute('href',url+j);
					a.appendChild(d.createTextNode(j));
			}
			if (j%20==0) div.appendChild(d.createElement('hr'));
		}
	},
	
	// Hide Reserve Listings
	hideReserves: function() {
		if (CP.hideReserves != 1) return;
		if (! GB.isListingPage()) return;
		var itm = [];
		for (var i=0;i<itemRows.length;i++) {
			if (/r\.gif/.test(itemRows[i].getElementsByTagName('td')[2].innerHTML)) {
				itemRows[i].parentNode.removeChild(itemRows[i]);
			} else {
				itm.push(itemRows[i]);
			}
		}
		itemRows = itm;
		GB.recolorTable();
	},
	
	// Recolor The Table
	recolorTable: function() {
		var bc = ['grey','white'];
		for (var i=0;i<itemRows.length;i++) {
			itemRows[i].removeAttribute('bgcolor');
			itemRows[i].setAttribute('class',bc[i%2]);
		}
	},


	
	// Add Pictures to all results
	pictureAdder: function(wl) {
		if (CP.addPictures != 1) return;
		if (! GB.isListingPage()) return;

		if (wl == 'watchList') {
			for (var i=0;i<watchRow.length;i++) {
				if (i%2==1) continue;
				if (watchRow[i].getElementsByTagName('td')[2].getElementsByTagName('img').length>0) continue;
				var url = 'http://gunbroker.com/Auction/ViewItem.asp?Item='+ watchRow[i].getElementsByTagName('input')[0].getAttribute('value');
				GB.getURL(url,watchRow[i].getElementsByTagName('td')[2],'picWL');
			}
		} else {
			var td = document.getElementsByTagName('td');
			for (var i=0;i<td.length;i++) {
				if (td[i].innerHTML=='&nbsp;' && td[i].getAttribute('height')==25) {
					var url = td[i].parentNode.getElementsByTagName('td')[2].getElementsByTagName('a')[0].getAttribute('href');
					GB.getURL(url,td[i],'pic');
				}
			}
		}
	},
	
	// Clean up search results
	cleanRes: function() {
		if (! GB.isListingPage()) return;
		var t = document.getElementsByTagName('table');
		var tables = [];
		for (var i=0;i<t.length;i++) {
			if (!t[i].getElementsByTagName('td')[10]) continue;
			if (!/Time Left/.test(t[i].getElementsByTagName('td')[10].textContent)) continue;
			tables.push(t[i]);
		}
	
		for (var i=0;i<tables.length;i++) {
			GB.cleanTable(tables[i]);
		}

	},
	cleanTable: function(table) {
		var tr = table.getElementsByTagName('tr');
		for (var i=0;i<tr.length;i++) {
			if (tr[i].getAttribute('bgcolor') == '#cccccc') {
				// Empty Row
				tr[i].parentNode.removeChild(tr[i]);
				i--;
			} else {
				var td = tr[i].getElementsByTagName('td');
				td[9].parentNode.removeChild(td[9]);
				td[7].parentNode.removeChild(td[7]);
				td[5].parentNode.removeChild(td[5]);
				td[3].parentNode.removeChild(td[3]);
				td[1].parentNode.removeChild(td[1]);
				if (i==0) continue;
				for (var j=0;j<td.length;j++) {
					td[j].setAttribute('class','bBot pad');
				}
				itemRows.push(tr[i]);
			}
		}
	},

	
	
	// Automatically logs you in, at any login prompt, if your username & password are saved by the browser
	autoLogin: function() {
		// Check Setting
		if (CP.autoLogin != 1) return;
		// Don't auto-login for bid confirm
		if (/ConfirmBid/.test(wlh)) return;
		// Don't auto-login for buy now confirm
		if (/ConfirmBuyNow/.test(wlh)) return;

		var f = document.getElementsByTagName('form');
		for (var i=0;i<f.length;i++) {
			if (f[i].getAttribute('name') != 'frmlogin') continue;
			// GB's DOM is broken
			var p = f[i].parentNode;
			var inp = p.getElementsByTagName('input');
			// If username & password are not saved continue.
			if (inp[1].value == '' || inp[2].value == '') continue;
			inp[3].checked = 'checked';
			f[i].submit();
		}
	},
	
	// Sets global variables
	setGlobals: function() {
		console = (unsafeWindow.console) ? unsafeWindow.console : null;
		d = document;
//		flags = GB.getFlags();
		defaultHeaders = {
			'Host': 'gunbroker.com',
			'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.0.8) Gecko/2009032609 Firefox/3.0.8',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'en-us,en;q=0.5',
			'Accept-Encoding': 'gzip,deflate',
			'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
			'Keep-Alive': '300',
			'Connection': 'keep-alive',
			'Cookie': document.cookie,
			'Pragma': 'no-cache',
			'Cache-Control': 'no-cache'
		}

	},
//	// Get Flags
//	// Gets flagged items.
//	getFlags: function() {
//		return GM_getValue('flags') ? GM_getValue('flags').split(',') : [];
//	},

	// Sets up a basic "control panel"
	setupControls: function() {
		var item;
		
		var cp = d.createElement('div');
			cp.setAttribute('id','controlPanel');
			cp.appendChild(d.createTextNode('Preferences'))
			cp.addEventListener('click',GB.toggleCP,true);
		d.body.appendChild(cp);
		
		var cpHover = d.createElement('div');
			cpHover.setAttribute('id','controlHover');
			cpHover.setAttribute('class','hidden');
		d.body.appendChild(cpHover);
		
		
		var ul = d.createElement('ul');

		cpHover.appendChild(ul);
				
		// Always Auto Login
		GB.createOnOff('Auto Login','autoLogin',ul);
		
		// Add Pictures
		GB.createOnOff('Add Pictures','addPictures',ul);
		
		// Hide Reserves
		GB.createOnOff('Hide Reserves','hideReserves',ul);
		
		// Better Search
		GB.createOnOff('Better Search','betterSearch',ul);
		
		// Display BIN Price
		GB.createOnOff('Display Buy It Now Price','displayBIN',ul);
		
		// Show All Pagination
		GB.createOnOff('Show All Pagination','showPagination',ul);
		
		// Show All Categories on Home Page
		GB.createOnOff('Show All Categories','fullCatList',ul);
		
		// Cleaner My Auctions
		GB.createOnOff('My Auctions Clean-Up','myAuctionsClean',ul);
		
		// Item View Clean-Up
		GB.createOnOff('Clean-Up Item View','cleanItemView',ul);
		
	},
	// Creates and returns an on/off node
	createOnOff: function(settingText,id,parent) {
		var li = d.createElement('li');
			li.setAttribute('id',id);

		var on = d.createElement('span');
			on.appendChild(d.createTextNode('on'));
			on.setAttribute('class','onOff ooOn '+ ((CP[id]==1) ? 'ooActive' : '' ) );
			on.addEventListener('click',GB.toggleSetting,true);
			
		var off = d.createElement('span');
			off.setAttribute('class','onOff ooOff '+ ((CP[id]==1) ? '' : 'ooActive' ) );
			off.appendChild(d.createTextNode('off'));
			off.addEventListener('click',GB.toggleSetting,true);
		
		var sp = d.createElement('span');
			sp.setAttribute('class','ooSection');
			sp.appendChild(d.createTextNode('[ '));
			
			sp.appendChild(on);
			
			sp.appendChild(d.createTextNode(' | '));
			
			sp.appendChild(off);
			
			sp.appendChild(d.createTextNode(' ] '));
		
		
		li.appendChild(sp);
		li.appendChild(d.createTextNode(settingText));
			
		parent.appendChild(li);
	},
	toggleSetting: function() {
		var isOn = /ooOn/.test(this.getAttribute('class'));
		var id = this.parentNode.parentNode.id;
		CP[id] = (isOn ? 1 : 0);
		GM_setValue(id,CP[id]);
		
		this.parentNode.getElementsByClassName('onOff')[0].setAttribute('class','onOff ooOn'+  (isOn ? ' ooActive' : ''));
		this.parentNode.getElementsByClassName('onOff')[1].setAttribute('class','onOff ooOff'+ (isOn ? '' : ' ooActive'));
		
		window.location.reload();
	},
	toggleCP: function() {
		isHidden = $('controlHover').getAttribute('class')=='hidden';
		$('controlPanel').style.width = (isHidden ? '200px' : 'auto');
		$('controlHover').setAttribute('class',(isHidden ? '' : 'hidden'));
	},
	getURL: function(uri,node,getType) {
		uri = (/^http/.test(uri)) ? uri : baseURL +'Auction/'+uri;


		GM_xmlhttpRequest({
			getType: getType,
			node: node,
			method: 'GET',
			url: uri,
			headers: defaultHeaders,
			onload: function(responseDetails) {
				switch(this.getType) {
					case 'pic':
						if (!responseDetails.responseText.match(/Pictures for Item #/)) return;
						var img = (responseDetails.responseText).replace(/[\r\n]/g,'').match(/<td align="center">1:<img src="(.+?)" align="top".+?>/);
						if (!img) return;
						GB.show(img[1],this.node,this.url);
						break;
					case 'bin':
						var binPrice = responseDetails.responseText;
							binPrice = binPrice.match(/<b>for (.+?)<\/b>/);
						this.node.innerHTML = (binPrice) ? binPrice[1] : '&mdash;';
						break;
					case 'picWL':
						if (!responseDetails.responseText.match(/Pictures for Item #/)) return;
						var img = (responseDetails.responseText).replace(/[\r\n]/g,'').match(/<td align="center">1:<img src="(.+?)" align="top".+?>/);
						if (!img) return;
						GB.showWL(img[1],this.node,this.url);
						break;
					case 'recheck':
						var re = /Click here to view the new listing: Item # (\d+)/;
						if (!re.test(responseDetails.responseText)) return;
						var newID = responseDetails.responseText.match(re)[1];
						GB.showRelist(newID,this.node);
	
						break;
					default: break;
				}
			}
		});
	},
	showWL: function(img,node,url) {
		var a = node.insertBefore(document.createElement('a'),node.childNodes[0]);
			a.href = url;
		var i = a.appendChild(document.createElement('img'));
		    i.style.width = '64px';
			i.setAttribute('border','0');
			i.setAttribute('src',img);
	},
	show: function(img,node,url) {
		node.innerHTML = '';
		var a = node.appendChild(document.createElement('a'));
			a.href = url;
		var i = a.appendChild(document.createElement('img'));
		    i.style.width = '64px';
			i.setAttribute('border','0');
			i.setAttribute('src',img);
			i.addEventListener('error',badImage,false);
	},
	showRelist: function(id,node) {
		var a = node.appendChild(document.createElement('a'))
			a.href = baseURL+'Auction/ViewItem.asp?Item='+ id;
			a.innerHTML = 'Item relisted to #'+ id;
	}



};

window.setTimeout(GB.init,5);

function $(el) {
	return document.getElementById(el);
}

function $$(cls) {
	return document.getElementsByClassName(cls);
}

function badImage() {
	this.parentNode.removeChild(this);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function removeElement(el) {
	el.parentNode.removeChild(el);
}




var cats = {
	'All Categories': [-1,-1],

	'Air Guns': [1013,-1],
	'Airsoft': [3048,1013],
	'Paintball': [3051,1013],
	'Pistols': [3049,1013],
	'Rifles': [3050,1013],
	'Supplies / Accessories / Other': [3052,1013],
	
	'Ammunition': [1012,-1],
	'Collectible Ammo': [3030,1012],
	'Large Bore / Cannon / Inert': [3110,1012],
	'Other': [3020,1012],
	'Pistol Ammo': [3018,1012],
	'Rifle Ammo': [3017,1012],
	'Shotgun Shells': [3019,1012],
	'Storage Containers': [3053,1012],
	
	'Archery & Bow Hunting': [984,-1],
	'Bows': [3054,984],
	'Crossbows': [3055,984],
	'Other': [3056,984],
	
	'Books / Videos / Literature': [2329,-1],
	'Books': [3057,2329],
	'CD-ROMS': [3060,2329],
	'Magazines': [3059,2329],
	'Videos / DVDs': [3058,2329],
	
	'Charity Auctions': [2332,-1],
	
	'Clothing / Bags / Wearables': [3000,-1],
	'Backpacks / Bags / Totes / Luggage': [3067,3000],
	'Belts / Belt Buckles': [3071,3000],
	'Coats / Jackets': [3062,3000],
	'Eyewear': [3069,3000],
	'Gloves': [3065,3000],
	'Hats / Headwear': [3070,3000],
	'Other': [3072,3000],
	'Pants / One-piece': [3064,3000],
	'Shirts / Sweatshirts / Vests': [3063,3000],
	'Shoes / Boots / Footwear': [3068,3000],
	'Watches / Jewelry': [3066,3000],
	
	'Collectibles': [3001,-1],
	'Badges & Insignia': [3021,3001],
	'Catalogs / Posters / Paper Goods': [3008,3001],
	'Civil War': [3006,3001],
	'Coins / Currency': [3109,3001],
	'Flags': [3073,3001],
	'Logo Merchandise': [3028,3001],
	'Old West': [3005,3001],
	'Other': [3010,3001],
	'Other Military': [1015,3001],
	'Souvenirs': [3009,3001],
	'World War I / II': [3007,3001],
	
	'Domain Names': [2334,-1],
	
	'Everything Else': [3004,-1],
	
	'Firearm Parts & Accessories': [982,-1],
	'Benches / Rests / Vises': [4028,982],
	'Black Powder / Muzzle loading': [4030,982],
	'Cases / Gun Storage': [3014,982],
	'Cleaning Kits & Supplies': [3031,982],
	'Eye / Hearing Protection': [4011,982],
	'for 1911': [3040,982],
	'for AK-47': [3043,982],
	'for AR-15': [3044,982],
	'for Glock': [3045,982],
	'for Heckler & Koch': [3046,982],
	'for SKS': [3042,982],
	'for Thompson Contender': [3041,982],
	'Gunsmithing Tools & Supplies': [3097,982],
	'Holsters / Gun Leather': [3013,982],
	'Other': [983,982],
	'Parts Kits': [3035,982],
	'Pistol Parts': [3038,982],
	'Pistol Parts : Barrels': [4012,982],
	'Pistol Parts : Grips': [3033,982],
	'Pistol Parts : Magazines / Clips': [4014,982],
	'Pistol Parts : Other': [4017,982],
	'Pistol Parts : Slides': [4015,982],
	'Pistol Parts : Small Parts': [4016,982],
	'Rifle Parts': [3039,982],
	'Rifle Parts : Barrels': [3034,982],
	'Rifle Parts : Bolts': [4019,982],
	'Rifle Parts : Magazines / Clips': [981,982],
	'Rifle Parts : Other': [4022,982],
	'Rifle Parts : Small Parts': [4021,982],
	'Rifle Parts : Stocks': [3032,982],
	'Scopes / Optics': [1017,982],
	'Scopes / Optics : Binoculars': [4033,982],
	'Scopes / Optics : Parts & Accessories': [4037,982],
	'Scopes / Optics : Range Finders': [4034,982],
	'Scopes / Optics : Scopes': [4035,982],
	'Scopes / Optics : Spotting Scopes': [4036,982],
	'Shotgun Parts': [3037,982],
	'Shotgun Parts : Barrels': [4024,982],
	'Shotgun Parts : Chokes': [4025,982],
	'Shotgun Parts : Other': [4027,982],
	'Shotgun Parts : Stocks': [4026,982],
	'Sights': [3036,982],
	'Targets': [4013,982],
	'Trigger Locks / Security Devices': [3074,982],
	
	'Firearms (Collectible)': [1014,-1],
	'Antiques / pre-1899': [2322,1014],
	'Black Powder / Muzzle loading': [2324,1014],
	'Collectible Parts & Accessories': [3061,1014],
	'Commemoratives': [3047,1014],
	'Curios and Relics': [2323,1014],
	'Other': [3012,1014],
	
	'Firearms (Modern)': [851,-1],
	'Class III / NFA / Destructive Devices': [2338,851],
	'Class III / NFA / Destructive Devices : Any Other Weapon': [4032,851],
	'Class III / NFA / Destructive Devices : Destructive Devices': [3100,851],
	'Class III / NFA / Destructive Devices : Machine Guns': [2326,851],
	'Class III / NFA / Destructive Devices : Parts / Accessories': [3098,851],
	'Class III / NFA / Destructive Devices : Short Barreled Rifles': [4031,851],
	'Class III / NFA / Destructive Devices : Suppressed Firearms / Silencers': [3099,851],
	'Cowboy Action Shooting': [2330,851],
	'Pistols': [978,851],
	'Pistols : Black Powder / Muzzle loading': [3095,851],
	'Pistols : Other': [3027,851],
	'Pistols : Revolvers': [2325,851],
	'Pistols : Semi-auto': [3026,851],
	'Pistols : Single Shot': [3101,851],
	'Rifles': [979,851],
	'Rifles : Black Powder / Muzzle loading': [3096,851],
	'Rifles : Bolt Action': [3022,851],
	'Rifles : Lever Action': [3023,851],
	'Rifles : Other': [3025,851],
	'Rifles : Pump': [3102,851],
	'Rifles : Semi-auto': [3024,851],
	'Rifles : Single Shot': [3011,851],
	'Shotguns': [980,851],
	'Shotguns : Double Barrel': [2339,851],
	'Shotguns : Double Barrel : Over Under': [3103,851],
	'Shotguns : Double Barrel : Side by Side': [3104,851],
	'Shotguns : Other': [3108,851],
	'Shotguns : Pump': [3106,851],
	'Shotguns : Semi-auto': [3105,851],
	'Shotguns : Single Shot': [3107,851],
	
	'Fishing': [4040,-1],
	'Fishing Collectibles': [4041,4040],
	'Fish Finders': [4042,4040],
	'Fly Fishing': [4043,4040],
	'Fly Fishing : Flies': [4050,4040],
	'Fly Fishing : Other Fly Fishing': [4054,4040],
	'Fly Fishing : Reels': [4051,4040],
	'Fly Fishing : Rod & Reel Combos': [4053,4040],
	'Fly Fishing : Rods': [4052,4040],
	'Freshwater Fishing': [4044,4040],
	'Freshwater Fishing : Baits & Lures': [4055,4040],
	'Freshwater Fishing : Other Freshwater Fishing': [4059,4040],
	'Freshwater Fishing : Reels': [4056,4040],
	'Freshwater Fishing : Rod & Reel Combos': [4058,4040],
	'Freshwater Fishing : Rods': [4057,4040],
	'Other General Fishing': [4048,4040],
	'Saltwater Fishing': [4045,4040],
	'Saltwater Fishing : Baits & Lures': [4060,4040],
	'Saltwater Fishing : Other Saltwater Fishing': [4064,4040],
	'Saltwater Fishing : Reels': [4061,4040],
	'Saltwater Fishing : Rod & Reel Combos': [4063,4040],
	'Saltwater Fishing : Rods': [4062,4040],
	'Tackle Storage': [4047,4040],
	'Terminal Tackle': [4046,4040],
	
	'Furniture / Cabinets': [901,-1],
	
	'Hunting Gear': [3002,-1],
	'Bags / Packs / Backpacks': [4001,3002],
	'Camouflage': [4002,3002],
	'Decoys': [4009,3002],
	'Feeders': [4003,3002],
	'Game Calls': [4010,3002],
	'Game Cameras': [4004,3002],
	'Hunting Dog Supplies': [4005,3002],
	'Other': [4008,3002],
	'Scents / Scent Eliminators': [4006,3002],
	'Traps': [4000,3002],
	'Tree Stands / Seats': [4007,3002],
	
	'Knives & Edged Items': [2328,-1],
	'Automatic': [3078,2328],
	'Bayonets': [3081,2328],
	'Commemorative': [3075,2328],
	'Daggers': [3076,2328],
	'Hunting': [3077,2328],
	'Other': [3082,2328],
	'Pocket': [3079,2328],
	'Swords / Axes': [3080,2328],
	
	'Land / Leases': [3003,-1],
	
	'Non-Firing Replicas': [900,-1],
	
	'Non-Lethal Defense': [902,-1],
	
	'Reloading': [1016,-1],
	'Equipment': [3015,1016],
	'Supplies': [3016,1016],
	
	'Services': [2335,-1],
	'Gunsmithing': [3093,2335],
	'Taxidermy': [3092,2335],
	
	'Staff Picks': [9001,-1],
	
	'Survival Gear': [2331,-1],
	
	'Tactical Gear': [4038,-1],
	
	'Taxidermy / Antlers / Mounts': [2336,-1],
	'Fish': [3088,2336],
	'Large Animals': [3089,2336],
	'Pelts / Rugs / Blankets': [3091,2336],
	'Small Animals': [3090,2336],
	'Supplies': [3087,2336],
	
	'Trips / Hunts /Safaris': [3029,-1],
	
	'Vehicles': [2333,-1],
	'ATVs / Off-road': [3085,2333],
	'Cars': [3083,2333],
	'Motorcycles': [3086,2333],
	'Trucks': [3084,2333]
};

var Timeframe = {
	'Current Auctions': 0,
	'New within the previous 24 hours': 6,
	'New within the previous 48 hours': 7,
	'New Since Last Visit': 15,
	'Ending within the next 24 hours': 16,
	'Ending before midnight tonight': 5,
	'Ended within last 24 hours': 8,
	'Ended within last 48 hours': 9,
	'Ended within last week': 10,
	'Ended within last 2 weeks': 11,
	'Ended within last 30 days': 12,
	'Ended within last 60 days': 13,
	'Ended within last 90 days': 14,
	'Going Going Gone': 3,
	'Completed Auctions': 1
};

var Sort = {
	'Shortest Time Left': 0,
	'Longest Time Left': 1,
	'Highest Price First': 5,
	'Lowest Price First': 4,
	'Highest Number of Bids First': 9,
	'Lowest Number of Bids First': 8,
	'Highest Item Number First': 3,
	'Lowest Item Number First': 2
};
