// ==UserScript==
// @name           eRepublic addons
// @namespace      www.erepublik.com
// @description    Skrypt pokazuje na każdej stronie rozkazy MON'u oraz 10 ostatnich subskryptowanych artykułów. Wersja 1.0
// @include        http://www.erepublik.com/*
// ==/UserScript==

var lista;

function xpath(query, doc) {
	return doc.evaluate(query, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
};

function handler() {
	if(this.readyState == 4 && this.status == 200) 
	{
		var dom = this.responseText;
	
		if(dom != null){fill_subs(dom);}
		else{fill_subs(null);}
	};
};
function request(url) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = handler;
	req.open('GET', url, true);
	req.send();
};

function fill_subs(data){
	if (data==null) {return};
	testarea.innerHTML=data;	
	
	lista = '*** Subskrypcje: ';
	
			
		var subtimes = xpath("//span[@class='fakeheight']",document);
		var sublinks = xpath('//form[@id=\'subscriptions_form\']/table/tbody/tr/td/p/a',document);
		var subtxts = xpath('//form[@id=\'subscriptions_form\']/table/tbody/tr/td/p/a/strong',document);
				
		for(var o=0; o < subtimes.snapshotLength; o++)
		{
			var subtime = subtimes.snapshotItem(o).innerHTML;
			var sublink = sublinks.snapshotItem(o).getAttribute('href');
			var subname = subtxts.snapshotItem(o).innerHTML;
			
			lista += ' '+subtime+' <a href="'+sublink+'">'+subname+'</a> ***';
		}
		testarea.innerHTML='';
		document.getElementById('subbanner').innerHTML+=lista;	
};

function update_subscriptions(){
	request('http://www.erepublik.com/en/messages/subscribes/1');

};


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://ereptools.net:8080/orders.txt',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var link = tags[1]
			var ido = tags[2]
			var text = '*** '+ido+' <a href="'+link+'">'+comanda+'</a>';

			latest=document.getElementById('menu');
			mydiv=document.getElementById('container');
	
			testarea=document.createElement("div");
			testarea.setAttribute('style', 'visibility: hidden;');
			
			banner_scroll=document.createElement("div");
			banner_scroll.innerHTML='<marquee id="subbanner" style="font-size: large;" align="middle" bgcolor="#00FFFF" direction="left" behavior="scroll" loop="infinite" onmouseover="this.scrollAmount=0;" onmouseout="this.scrollAmount=5;">'+text+'</marquee><br>'
			

			latest.parentNode.insertBefore(banner_scroll, latest);
			mydiv.parentNode.insertBefore(testarea, mydiv);
			
			update_subscriptions();
			
			}
		}
	);