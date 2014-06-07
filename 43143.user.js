// ==UserScript==
// @name UPDATED Manage Prices
// @namespace      http://kol.upup.us/scripts/
// @description Displays multiple mall prices per item from the Manage Prices store screen. This has been hacked to work with the new mall search, and I mean hacked. HACKED
// @include        http://*kingdomofloathing.com/manageprices.php*
// ==/UserScript==

function addGlobalStyle(css,styleid) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    if(typeof styleid == "string")style.id=styleid;
    head.appendChild(style);
}
var css = (<r><![CDATA[
	.boxTitle {
			padding:2px 4px 2px 4px;
			color:white;
			font-weight:bold;
			background-color:blue;
			-moz-border-radius-topleft: 10px;
			-moz-border-radius-topright: 10px;
			border-left:2px solid silver;
			border-top:2px solid silver;
			border-right:2px solid silver;
			
	}
	.contentBlock {
		padding:4px;
		background-color:white;
		-moz-border-radius-bottomleft: 10px;
		-moz-border-radius-bottomright: 10px;
		border-left:2px solid silver;
		border-bottom:2px solid silver;
		border-right:2px solid silver;
	}
	.popupBlock {
		right:10px;
		font-size:10pt;
		width:150px;
		position:absolute;
	}
	.cheapestSpan {
		color:blue;
		cursor:pointer;
		text-decoration:underline;
	}
	.cheapestSpan:hover {
		color:lightblue;
	}
	.closeButton {
		cursor:pointer;
		float:right;
	}
	div.closeButton:hover {
		color:silver;
	}
	table.popupTable {
		font-size: 10pt;
	}
		
]]></r>).toString();
addGlobalStyle(css);
var firstInput = find('.//input[@type="text"]');
if(firstInput) {
	var theTable = getParent(firstInput,'table');
	var rows=theTable.getElementsByTagName('tr');
	
	for(var i=1,j=rows.length;i<j;i++) {
		var cells = rows[i].getElementsByTagName('td');
		var cheapestSpan = document.createElement('span');
		cheapestSpan.className="cheapestSpan";
		cells[6].appendChild(cheapestSpan);
		cheapestSpan.appendChild(cells[6].firstChild);
		var itemName = cells[0].textContent;
		cheapestSpan.addEventListener('click',doMallSearch,false);
	}
}
searched=new Object();
popupBoxes = new Array();

function find(xp,location) {
	if(!location)location=document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}

function doMallSearch(e) {
	var itemName = getParent(e.target,'tr').getElementsByTagName('td')[0].textContent.replace(/\s{3}/,'');
	if(!searched[itemName]) {
		searched[itemName]=true;
		if(itemName != 'colored-light "necklace"')item = '"'+itemName.replace(/\u00f1/g,'%26ntilde;').replace(/\u2122/g,'%26trade;').replace(/\u00e9/g,'%26eacute;')+'"'; else item = 'colored-light ';
//		GM_post('/searchmall.php','whichitem='+item+'&cheaponly=on&shownum=15',genBox)
		GM_post('/searchmall.php','didadv=0&pudnuggler='+item+'&category=allitems&nolimits=0&justitems=0',genBox)
	} else {
		if(v=document.getElementById(itemName+"_search")) {
			closeAllBoxes();
			v.style.display="block";
		}
	}

	function genBox(data) {
		if(typeof dataHolder == 'undefined') {
			dataHolder = document.createElement('div');
		} 
		dataHolder.innerHTML = data;
		var tabl=dataHolder.getElementsByTagName('table');
            var tabes=tabl[0].getElementsByTagName('table');
            var tables=tabes[0].getElementsByTagName('table');

		if(tables && tables[1]) {
			var popupTable = document.createElement('table');
			popupTable.cellPadding = "2px";
			popupTable.cellSpacing = 0;
			popupTable.width = "100%";
			popupTable.className = "popupTable";
			var rows = tables[1].getElementsByTagName('tr');
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
			
			for(var i=2,j=10;i<j;i++) {
				var row=document.createElement('tr');
				if(i%2)row.style.backgroundColor = '#efefef';
				var cells = rows[i].getElementsByTagName('td');
				var source = cells[1].firstChild.href;

				var storeNodes = cells[1].firstChild.childNodes;
				var str = new Array();

				for(var x=0,y=storeNodes.length;x<y;x++) {
					GM_log(storeNodes[x].nodeType);
					if(storeNodes[x].nodeType==3) {
						str.push(storeNodes[x].nodeValue);
					}
				}
				var storeName = /<b>([^>]+)<\/b>/.exec(cells[1].innerHTML)[1];
				var limit = /\d+/.exec(cells[3].innerHTML);
				if(!limit)limit= '-';
				var quantity = /[0-9,]+/.exec(cells[2].innerHTML);
				var price = /([0-9,]+)&nbsp;Meat/.exec(cells[4].innerHTML)[1];
				
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
			}
			
			holder=document.createElement('div');
			holder.id=itemName+"_search";
			holder.className="popupBlock";
			
			titleBlock = document.createElement('div');
			titleBlock.className='boxTitle';
			
			var closeButton = document.createElement('div');
			closeButton.appendChild(document.createTextNode('[x]'));
			closeButton.className="closeButton";
			closeButton.addEventListener('click',closeBox,false);
			
			titleBlock.appendChild(closeButton);
			titleBlock.appendChild(document.createTextNode(itemName));
			
			var contentBlock = document.createElement('div');
			contentBlock.appendChild(popupTable);
			contentBlock.className="contentBlock";
			
			holder.appendChild(titleBlock);
			holder.appendChild(contentBlock);
			
			closeAllBoxes();
			e.target.parentNode.appendChild(holder);
			popupBoxes.push(holder);
		}
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

function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {	// Gecko bug, supposed to be uppercase
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}