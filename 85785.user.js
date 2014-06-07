// ==UserScript==
// @name           UpUp.us Bargain Hunter
// @namespace      http://kol.upup.us/scripts/
// @description    Displays 5 lowest mall prices for an item in a player's mall store
// @include        *kingdomofloathing.com/manageprices.php*
// @include        *kingdomofloathing.com/mallstore.php*
// @include        *127.0.0.1*/manageprices.php*
// @include        *127.0.0.1*/mallstore.php*
// ==/UserScript==

var css = ".boxTitle {padding:2px 4px 2px 4px; color:white; font-weight:bold; background-color:blue; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; border-left:2px solid silver; border-top:2px solid silver; border-right:2px solid silver;}\
	.contentBlock {padding:4px; background-color:white; -moz-border-radius-bottomleft: 10px; -moz-border-radius-bottomright: 10px; border-left:2px solid silver; border-bottom:2px solid silver; border-right:2px solid silver;}\
	.popupBlock {font-size:10pt; left:5px; top:-1em; width:150px; position:absolute; z-index:100;}\
	.cheapestSpan {color:blue; cursor:pointer; text-decoration:underline;}\
	.cheapestSpan:hover {color:lightblue;}\
	.closeButton {cursor:pointer; float:right;}\
	div.closeButton:hover {color:silver;}\
	table.popupTable {font-size: 10pt;}"
GM_addStyle(css);
openEventListeners = new Array();
addEventListener(window, 'unload', destroyEventListeners, false);
if (window.location.pathname == '/mallstore.php')
	var xp = './/form[@name="mallbuy"]//td/input[@name="whichitem"]/ancestor::tr/td[3]/b';
else if (window.location.pathname == '/manageprices.php')
	var xp = './/form[@name="updateprices"]//td/input[contains(@name,"limit")]/ancestor::tr/td[1]/b';
var bolds = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=0 ; i < bolds.snapshotLength; i++ ) {
		
	boldTag = bolds.snapshotItem(i);
	boldTag.style.cursor="pointer";
	var popupHolder = document.createElement('span');
	popupHolder.style.position="relative";
	popupHolder.style.left="-6em";
	popupHolder.style.top="-4em";
	boldTag.parentNode.nextSibling.appendChild(popupHolder);
	addEventListener(boldTag,'click',doMallSearch,false);
}

searched=new Object();
popupBoxes = new Array();

function doMallSearch(e) {
	if (location.pathname == '/manageprices.php')
		itemName = e.target.textContent.match(/(.+)\s{3}/)[1]
	else if (location.pathname == '/mallstore.php')
		itemName=e.target.textContent.match(/[^\(]+/)[0]
	if (!searched[itemName]) 
	{
		searched[itemName] = true;
		if (itemName != 'colored-light "necklace"')
			item = '"'+itemName.replace(/\u00f1/g,'%26ntilde;').replace(/\u2122/g,'%26trade;').replace(/\u00e9/g,'%26eacute;')+'"'; 
		else 
			item = 'colored-light ';
		GM_post('/searchmall.php','pudnuggler='+item+'&didadv=1&x_cheapest=5&justitems=0',genBox)
	} 
	else 
	{
		if (v=document.getElementById(itemName+"_search")) 
		{
			closeAllBoxes();
			v.style.display="block";
		}
	}

	function genBox(data) {
		if(typeof dataHolder == 'undefined') {
			dataHolder = document.createElement('div');
		} 
		dataHolder.innerHTML = data;
		
		var popupTable = document.createElement('table');
		popupTable.cellPadding = "2px";
		popupTable.cellSpacing = 0;
		popupTable.width = "100%";
		popupTable.className = "popupTable";
		var row=document.createElement('tr');
			
			var qCell = document.createElement('td');
			qCell.appendChild(document.createTextNode("Q"));
			var limitCell = document.createElement('td');
			limitCell.appendChild(document.createTextNode("Lim"));
			var priceCell = document.createElement('td');
			priceCell.appendChild(document.createTextNode("Meat"));
			
			row.appendChild(qCell);
			row.appendChild(limitCell);
			row.appendChild(priceCell);
			
			popupTable.appendChild(row);

			var rowsXPath = document.evaluate("//table[@class='itemtable']//tr", dataHolder, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var rowIterator = rowsXPath.iterateNext();
			rowIterator = rowsXPath.iterateNext();
			rowIterator = rowsXPath.iterateNext();

			
			while(rowIterator) {
				var row=document.createElement('tr');
				if(i%2)row.style.backgroundColor = '#efefef';
				var source = rowIterator.childNodes[1].firstChild.href;
				var storeName = rowIterator.childNodes[1].textContent;
				var limit = rowIterator.childNodes[3].textContent;
				var quantity = rowIterator.childNodes[2].textContent;
				var price = rowIterator.childNodes[4].textContent.substr(0,parseInt(rowIterator.childNodes[4].textContent.length)-5);
				
				qCell = document.createElement('td');
				var link = document.createElement('a');
				link.appendChild(document.createTextNode(quantity));
				link.href=source;
				link.title = storeName;
				qCell.appendChild(link);
				
				limitCell = document.createElement('td');
				link = document.createElement('a');
				link.appendChild(document.createTextNode(limit));
				link.href=source;
				link.title = storeName;
				limitCell.appendChild(link);
				
				priceCell = document.createElement('td');
				var link = document.createElement('a');
				link.appendChild(document.createTextNode(price));
				link.href=source;
				link.title = storeName;
				priceCell.appendChild(link);
				
				row.appendChild(qCell);
				row.appendChild(limitCell);
				row.appendChild(priceCell);
				
				popupTable.appendChild(row);
				rowIterator = rowsXPath.iterateNext();
			}
			holder=document.createElement('div');
			holder.id=itemName+"_search";
			holder.className="popupBlock";
			
			titleBlock = document.createElement('div');
			titleBlock.className='boxTitle';
			
			var closeButton = document.createElement('div');
			closeButton.appendChild(document.createTextNode('[x]'));
			closeButton.className="closeButton";
			addEventListener(closeButton,'click',closeBox,false);
			
			titleBlock.appendChild(closeButton);
			titleBlock.appendChild(document.createTextNode(itemName));
			
			var contentBlock = document.createElement('div');
			contentBlock.appendChild(popupTable);
			contentBlock.className="contentBlock";
			
			holder.appendChild(titleBlock);
			holder.appendChild(contentBlock);
			
			closeAllBoxes();
			e.target.parentNode.nextSibling.lastChild.appendChild(holder);
			popupBoxes.push(holder);
	}
}

function closeBox(e) {
	e.target.parentNode.parentNode.style.display="none";
}
function closeAllBoxes() {
	for(var i=0,l=popupBoxes.length;i<l;i++) {
		popupBoxes[i].style.display="none";
	}
}
function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
}

function addEventListener(target, event, listener, capture) {
	openEventListeners.push( [target, event, listener, capture] );
	target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
	for (var i = 0, l=openEventListeners.length; i<l; i++)     {
		var rel = openEventListeners[i];
		rel[0].removeEventListener(rel[1], rel[2], rel[3]);
	}
	window.removeEventListener('unload', destroyEventListeners, false);
}
