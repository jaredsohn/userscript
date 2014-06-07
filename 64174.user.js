// ==UserScript==
// @name           Roumen pics collector
// @namespace      Amoondre (c) 2009
// @include        http://mail.google.com/mail/?shva=1#label/Roumen
// ==/UserScript==

var vymen = '';
var j = 0;
var links = document.getElementsByTagName('a');

 for (var i=0; i < links.length; i++){
	//if((links[i].getAttribute('href').substr(0,4)) == 'http'){
	if(links[i].getAttribute('href') != null){
		if(((links[i].getAttribute('href').substr(7,4)=='kecy')||(links[i].getAttribute('href').substr(7,4)=='maso'))&&
		(links[i].getAttribute('href').substr(29,6)!='Submit')){
			//if(j == 0){ j++;} else {
				
			//}
			vymen += links[i].getAttribute('href').replace('/kecy','/archiv').replace('roumingShow.php?file=','archive/').replace('masoShow.php?file=','archived/');
			vymen += '\n';
		}
	}
	//links[i].setAttribute('href',vymen);
	}

text = document.evaluate("//textarea[@name='body']", document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
text.snapshotItem(0).value = vymen;