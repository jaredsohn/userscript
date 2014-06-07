// ==UserScript==
// @name           Facebook Çevrimiçi Arkadaşlar
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama
// @include        http://*.facebook.com*
// @desription     Uygulamalar'ın hemen altında bulunan reklamı kaldırarak yerine o an çevrimiçi olan arkadaş listenizi ekler
// ==/UserScript==
var xmlHttp;

window.addEventListener("load", function(e) {
  var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (elements.snapshotLength > 0) {
    for (var i = 0; i < elements.snapshotLength; i++) {
      var thisElement = elements.snapshotItem(i);
      thisElement.parentNode.removeChild(thisElement);
    }
  }	
}, false);

sendPetTypes();

function createXMLHttpRequest() {

	if (window.ActiveXObject) 
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

	else if (window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	
}

function sendPetTypes() {

	createXMLHttpRequest();
        var url = "http://"+window.location.hostname+"/friends/?online";

	xmlHttp.open("GET", url, true);

	xmlHttp.onreadystatechange = handleStateChange;
	xmlHttp.send(null);
}

function handleStateChange() {

	if(xmlHttp.readyState == 4) 
		if(xmlHttp.status == 200) 
			parseResults();
}

function parseResults() {

	var finalText="<h2><u>Çevrimiçi Arkadaşlar</u></h2><br><br>";
	var i;
	var navbar, element;
	var cell,temp,i;
	
	var rt = process(xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("Friends.initialize"),xmlHttp.responseText.length));
	
	for(i=0;i<rt.length;i+=2)
		finalText=finalText+"<a href=\"http://www.facebook.com/profile.php?id="+getUID(rt[i])+"\">"+getUName(rt[i])+"</a><br>";
		
	navbar = document.getElementById('sidebar_content');
	
	if (navbar) {	
		element = document.createElement("DIV");
		element.setAttribute("class", "link_title ");
		element.setAttribute("id", "onlineDIV");
		navbar.appendChild(element);
		document.getElementById('onlineDIV').innerHTML=finalText;

	}

}

function getUID(rawt) {

	return rawt.substring(0,rawt.indexOf(","));

}

function getUName(rawt) {
	return rawt.substring(rawt.indexOf(", '")+3,rawt.length-1);
}

function process(response) {
	var result = new Array();
	var res=response;
	var i=0;
	
	while(res.indexOf("Friends.dnd(event, this, ")>0)
	{
		res=res.substring(res.indexOf("Friends.dnd(event, this, ")+25,res.length);
		result[i]=res.substring(0,res.indexOf(");"));
		
		result[i]=result[i].replace(/\\u00e7/g,"ç");
		result[i]=result[i].replace(/\\u0131/g,"ı");
		result[i]=result[i].replace(/\\u011f/g,"ğ");
		result[i]=result[i].replace(/\\u00f6/g,"ö");
		result[i]=result[i].replace(/\\u00fc/g,"ü");
		result[i]=result[i].replace(/\\u015f/g,"ş");
		
		result[i]=result[i].replace(/\\u0130/g,"İ");
		result[i]=result[i].replace(/\\u00d6/g,"Ö");
		result[i]=result[i].replace(/\\u00dc/g,"Ü");
		result[i]=result[i].replace(/\\u00c7/g,"Ç");
		result[i]=result[i].replace(/\\u011e/g,"Ğ");
		result[i]=result[i].replace(/\\u015e/g,"Ş");
		i++;
	}
	
	
	return result;
}