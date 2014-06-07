// ==UserScript==
// @name           Shop Wizard Addon
// @description	   Adds the lowest shop price found to every refresh.
// @namespace      http://userscripts.org/users/83296
// @include        http://www.neopets.com/market.phtml*
// @include        http://www.neopets.com/browseshop.phtml*
// ==/UserScript==

if(document.body.innerHTML.indexOf('Search Items') != -1){
	var lists = document.getElementsByTagName("select");for(var i = 0; i < lists.length; i++){if(lists[i].name == "criteria"){lists[i].options[1].selected = true;}}
	GM_setValue("shopwizard",0)
	}
if(document.body.innerHTML.indexOf('Price') != -1){
	var button = document.evaluate('//table[@width=600]//tr[2]/td[4]/b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){button = button.snapshotItem(0);
					var lowest = button.innerHTML.replace(",","");
	var button = document.evaluate('//table[@width=600]//tr[2]/td[3]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){button = button.snapshotItem(0);
					var amount = (button.innerHTML);}
	var button = document.evaluate('//table[@width=600]//tr[2]/td[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){button = button.snapshotItem(0);
					var item = (button.innerHTML);}
	var button = document.evaluate('//table[@width=600]//tr[2]/td[1]//b',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){button = button.snapshotItem(0);
					var seller = (button.innerHTML);}
	var button = document.evaluate('//table[@width=600]//tr[2]//a[@href]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength > 0){button = button.snapshotItem(0);
					var link = button}	
	var summary = [seller,item,amount,lowest,link].join(",");

	if(GM_getValue("shopwizard")==0){GM_setValue("shopwizard",summary);summary = GM_getValue("shopwizard").split(",");}
	else {x = GM_getValue("shopwizard").split(",");
		item2=[item]; 
		if(x[1]!=item2[0]){GM_setValue("shopwizard",summary);summary = GM_getValue("shopwizard").split(",");} //if different item!
		else{
///////////////		same item x = stored, lowest = new info
			if(x[3].length > lowest.length){GM_setValue("shopwizard",summary);summary = GM_getValue("shopwizard").split(",");}
			else if(x[3].length < lowest.length){summary = GM_getValue("shopwizard").split(",");}
			else if(x[3] > lowest){GM_setValue("shopwizard",summary);summary = GM_getValue("shopwizard").split(",");}
			else{summary = GM_getValue("shopwizard").split(",");}
		}
	}
	
	if(summary[3].length>=4){x1=summary[3];}
	
	var rgx = /(\d+)(\d{3})/;
	rgx.test(x1);
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
	summary[3]= x1;

/////////////////////

	var location = document.evaluate('//table[@width="600"]//tr[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (location) {
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		td1.setAttribute('bgcolor','##f616f6');
		td1.setAttribute('align','left');
		var td2 = document.createElement('td');
		td2.setAttribute('bgcolor','##f6f6f6');
		td2.setAttribute('align','left');
		td2.appendChild(document.createTextNode(summary[1]));
		var td3 = document.createElement('td');
		td3.setAttribute('bgcolor','##f616f6');
		td3.setAttribute('align','center');
		td3.appendChild(document.createTextNode(summary[2]));
		var td4 = document.createElement('td');
		td4.setAttribute('bgcolor','##f616f6');
		td4.setAttribute('align','right');
		td4.setAttribute('style','font-weight: bold');
		td4.appendChild(document.createTextNode(summary[3]));
		var a = document.createElement('a');
		a.href = summary[4];
		a.setAttribute('style','font-weight: bold');
		a.appendChild(document.createTextNode(summary[0]));
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		td1.appendChild(a);
		location.parentNode.insertBefore(tr, location);
	}
	}
}
if(document.body.innerHTML.indexOf('I did not find anything.') != -1){
	if(GM_getValue("shopwizard")==0){summary =["n/a","n/a","n/a","n/a"];}
	else {summary = GM_getValue("shopwizard").split(",");	
}
	if(summary[3].length>=4){x1=summary[3];}
	var rgx = /(\d+)(\d{3})/;
	rgx.test(x1);
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
	summary[3]= x1;

	var nosearch = document.evaluate('//td[@class="content"]//div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (nosearch) {
		var table = document.createElement('table')
		table.setAttribute('cellpadding','3');
		table.setAttribute('width','600');
		table.setAttribute('align','center');
		var tra = document.createElement('tr');
		var tda = document.createElement('td');
		tda.setAttribute('style','font-weight: bold');
		tda.appendChild(document.createTextNode("Shop Owner"));
		var tdb = document.createElement('td');
		tdb.setAttribute('style','font-weight: bold');
		tdb.appendChild(document.createTextNode("Item"));
		var tdc = document.createElement('td');
		tdc.setAttribute('width','40');
		tdc.setAttribute('style','font-weight: bold');
		tdc.appendChild(document.createTextNode("Stock"));
		var tdd = document.createElement('td');
		tdd.setAttribute('align','right');
		tdd.setAttribute('width','80');
		tdd.setAttribute('style','font-weight: bold');
		tdd.appendChild(document.createTextNode("Price"));
		table.appendChild(tra);
		tra.appendChild(tda);
		tra.appendChild(tdb);
		tra.appendChild(tdc);
		tra.appendChild(tdd);
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		td1.setAttribute('bgcolor','##f616f6');
		td1.setAttribute('align','left');
		var td2 = document.createElement('td');
		td2.setAttribute('bgcolor','##f616f6');
		td2.setAttribute('align','left');
		td2.appendChild(document.createTextNode(summary[1]));
		var td3 = document.createElement('td');
		td3.setAttribute('bgcolor','##f616f6');
		td3.setAttribute('align','center');
		td3.appendChild(document.createTextNode(summary[2]));
		var td4 = document.createElement('td');
		td4.setAttribute('bgcolor','##f616f6');
		td4.setAttribute('align','right');
		td4.setAttribute('style','font-weight: bold');	
		td4.appendChild(document.createTextNode(summary[3]));
		var a = document.createElement('a');
		if(GM_getValue("shopwizard")==0){summary[4]="http://www.neopets.com/market.phtml?type=wizard;"}
		a.href = summary[4];
		a.setAttribute('style','font-weight: bold');
		a.appendChild(document.createTextNode(summary[0]));
		table.appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		td1.appendChild(a);
		nosearch.parentNode.insertBefore(table, nosearch);
	}

}
if(document.body.innerHTML.indexOf('The item you are trying to buy does not exist in this shop!') != -1){
	GM_setValue("shopwizard",0)
}
if(document.body.innerHTML.indexOf('Item not found!') != -1){
	GM_setValue("shopwizard",0)
}

       