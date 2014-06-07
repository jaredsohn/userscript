// ==UserScript==
// @name          MKs MZ Script
// @description   Vereinfachungen f�r Managerzone
// @include       http://managerzone.com/*
// ==/UserScript==

//Beobachtung entfernen
a = document.evaluate('//ul[@id=\'top_item_clubhouse_sub\']/li[7]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
a.snapshotItem(0).parentNode.removeChild(a.snapshotItem(0));

// Weiteres entfernen (Spieleseite)
for (i = 0; i < 6; i++){ 
	a = document.evaluate('//ul[@id=\'top_item_matches_sub\']/li[6]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	a.snapshotItem(0).parentNode.removeChild(a.snapshotItem(0)); 

}
// (Büroseite)
for (i = 0; i < 4; i++){
	a = document.evaluate('//ul[@id=\'top_item_office_sub\']/li[5]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	a.snapshotItem(0).parentNode.removeChild(a.snapshotItem(0)); 
}

// Trainingslinks
a = document.evaluate('//ul[@id=\'top_item_clubhouse_sub\']/li[5]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	a.snapshotItem(0).innerHTML = '<a href="/?p=training_report">Trainingsbericht</a>';
else
	a.snapshotItem(0).innerHTML = '<a href="/?p=training_report">Training Reports</a>';
d = document.createElement('li');
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	d.innerHTML = '<a href="/?p=training">Trainingsplatz</a>';
else
	d.innerHTML = '<a href="/?p=training">Training Field</a>';
a.snapshotItem(0).parentNode.insertBefore(d, a.snapshotItem(0).nextSibling);

// Spielergebnisse
a = document.evaluate('//ul[@id=\'top_item_matches_sub\']/li[4]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
b = document.evaluate('//ul[@id=\'top_item_matches_sub\']/li[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	a.snapshotItem(0).innerHTML = '<a href="/?p=match&amp;sub=played">Ergebnisse</a>';
else
	a.snapshotItem(0).innerHTML = '<a href="/?p=match&amp;sub=played">Results</a>';	
a.snapshotItem(0).parentNode.insertBefore(a.snapshotItem(0), b.snapshotItem(0));
a = document.evaluate('//ul[@id=\'top_item_matches_sub\']/li[4]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
b = document.evaluate('//ul[@id=\'top_item_matches_sub\']/li[3]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
a.snapshotItem(0).parentNode.insertBefore(a.snapshotItem(0), b.snapshotItem(0));

// Kader
a = document.evaluate('//ul[@id=\'top_item_clubhouse_sub\']/li[3]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	a.snapshotItem(0).innerHTML = '<a href="/?p=players&amp;sub=alt">Kaderübersicht</a>';
else
	a.snapshotItem(0).innerHTML = '<a href="/?p=players&amp;sub=alt">Squad Summary</a>';
// Transfermarkt
a = document.evaluate('//ul[@id=\'top_item_clubhouse_sub\']/li[7]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
e = document.createElement('li');
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	e.innerHTML = '<a href="/?p=transfer&amp;sub=yourplayers">Eigene Transfers</a>';
else
	e.innerHTML = '<a href="/?p=transfer&amp;sub=yourplayers">Active Transfers</a>';
a.snapshotItem(0).parentNode.insertBefore(e, a.snapshotItem(0).nextSibling);

//Finanzen
a = document.evaluate('//ul[@id=\'top_item_office_sub\']/li[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	a.snapshotItem(0).innerHTML = '<a href="/?p=economy&sub=report">Wochenübersicht</a>';
else
	a.snapshotItem(0).innerHTML = '<a href="/?p=economy&sub=report">Weekly Reports</a>';
c = document.createElement('li');
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	c.innerHTML = '<a href="/?p=economy">Transaktionen</a>';
else
	c.innerHTML = '<a href="/?p=economy">Transactions</a>';
a.snapshotItem(0).parentNode.insertBefore(c, a.snapshotItem(0).nextSibling);


// Trainer
a = document.evaluate('//div[@id=\'contentDiv\']//ul/li[3]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (a.innerHTML.match('freeagents')!=null){
f = document.createElement('li');
if(document.getElementsByName('language')[0].getAttribute('content')=='de')
	f.innerHTML = '<a href="/?p=trainers&sub=freeagents&o=0&class=5">Freie Trainer</a>';
else
	f.innerHTML = '<a href="/?p=trainers&sub=freeagents&o=0&class=5">Available Coaches</a>';
a.parentNode.replaceChild(f, a);
}

//Trainer bieten
if (document.URL.search('offer') > -1){
//Vertragsbonus
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[1]/td[2]/nobr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
h = g.substring(1,g.length-4).replace(/\s/g, "").split('-');
i = parseInt(h[0])+(parseInt(h[1])-parseInt(h[0])) * 2 / 3;
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[1]/td[3]/input', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
g.value = Math.round(i);

//Bezahlung
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[2]/td[2]/nobr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
h = g.substring(1,g.length-4).replace(/\s/g, "").split('-');
i = parseInt(h[0])+(parseInt(h[1])-parseInt(h[0])) * 2 / 3;
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[2]/td[3]/input', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
g.value = Math.round(i);

//Wochen
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[3]/td[2]/nobr', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
h = g.substring(1,g.length-4).replace(/\s/g, "").split('-');
i = parseInt(h[0])+(parseInt(h[1])-parseInt(h[0])) * 2 / 3;
g = document.evaluate('//form[@id=\'trainerofferform\']/table/tbody/tr[3]/td[3]/input', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
g.value = Math.round(i);
}