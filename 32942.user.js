// ==UserScript==
// @name           Ikairam - Utilitaires - Magyar!
// @namespace      Neuromancien
// @description    Utilitaires Ikariam
// @include        http://*.ikariam.*/index.php*
// @exclude        http://boards.ikariam.*/index.php*
// ==/UserScript==

// Configurations
var _show_ressource = true;
var _show_military = true;

var lang=window.location.href.match(/ikariam\d*(\.[a-zA-Z\.]+)/).pop();
switch(lang) {
case '.de':
        var _utilities = "Werkzeuge";
        var _towns = "Städte";
        var _gross = "+";
        var _cost = "-";
        var _net = "=";
        break;

case '.hu':
        var _utilities = "Eszközök";
        var _towns = "Városok";
        var _gross = "+";
        var _cost = "-";
        var _net = "=";
        var _cityarmy = "Csapatok a városban";
        break;

	case '.fr':
		var _utilities = "Utilitaires";
		var _towns = "Ville";		
		var _gross = "-";
		var _cost = "+";		
		var _net = "=";
		var _cityarmy = "Troupes";
				
		break;
	
	case '.com':
		var _utilities = "Utilities";
		var _towns = "Towns";		
		var _gross = "Gross";
		var _cost = "Cost";		
		var _net = "Net";
		var _cityarmy = "Army";
		break;
	
	default:
		var _utilities = "Utilities";
		var _towns = "Towns";		
		var _gross = "Gross";
		var _cost = "Cost";		
		var _net = "Net";
		var _cityarmy = "Army";
}

//
// Variables
//
var ScriptName=_utilities;
var ScriptAutor='Neuromancien';
var ScriptVersion='0.4.1';
var ScriptUrl = 'http://userscripts.org/scripts/show/23778';
var GameServer = top.location.host;
	
var _city = new Array();
var _myId = 0;
var _myUrl = "";	
var _infoBar;
	
var eventSource= (navigator.appName.indexOf("Opera") == -1) ? window : document; 
eventSource.addEventListener( 'load', function( e ) {  onLoad();  } ,false); 

function getFinance(code) {	
	var ex = ".//tr/td[@class='city']";	
	city = document.evaluate(ex, code, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);    			
	
	var ex = ".//tr/td[@class='value res']";	
	finance = document.evaluate(ex, code, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);    		
		
	for(i=0; i<city.snapshotLength; i++) {		
		var _sub = new Array();
		_sub['revenu'] = finance.snapshotItem(3*i).innerHTML;
		_sub['entretien'] = finance.snapshotItem(3*i+1).innerHTML;
		_sub['resultat'] = finance.snapshotItem(3*i+2).innerHTML;
		_city[city.snapshotItem(i).innerHTML] = _sub;				
	}		
		
	getCity();
	makePanelInfo();	
}

function getCity() {
	var select = document.getElementById("citySelect");
	for(i=0; i<select.length; i++) {		
		_city[select[i].innerHTML].id = select[i].value;		
	}	
	
}

function HideReportInbox() {	
	var b = document.getElementById("reportInboxLeft");
	b.innerHTML="";
}

function makeCSS() {
	var myCSS = '';
	myCSS += '#res table {border: medium solid #6495ed;border-collapse: collapse;width: 50%;}';
	myCSS += '#res th {font-family: monospace;border: thin solid #7C6240;width: 50%;padding: 5px;background-color: #7C6240;';		
	myCSS += 'background-color: transparent;};';		
	myCSS += '#res tr {font-family: sans-serif;border: thin solid #7C6240;width: 50%;padding: 5px;';
	myCSS += '#res td {font-family: sans-serif;border: thin solid #7C6240;width: 50%;padding: 5px;';
	myCSS += 'text-align: center;background-color: #ffffff;}';
	myCSS += '#res caption {font-family: sans-serif;}';
	GM_addStyle(myCSS);
}	

function onLoad() {
	_myId = window.location.href.match(/id=([0-9]{1,})/)[1];	
	_myUrl = window.location.href.match(/http:\/\/[a-z]{1,}\//);			
}
	
function makePanelInfo() {			
	var panel= document.createElement('div');
	panel.setAttribute('class', 'dynamic');
	
	var titre=document.createElement('h3');
	titre.setAttribute('class', 'header');
	titre.appendChild(document.createTextNode(ScriptName+" "+ScriptVersion));
	
	var corps=document.createElement('div');
	corps.setAttribute('class','content');
	corps.setAttribute('id','Neuromancien');	
	
	var footer=document.createElement('div');
	footer.setAttribute('class','footer');
				
	var table = document.createElement("Table");		
	table.setAttribute("id", "res");		
	table.setAttribute("width", "100%");		
	
	// En tete
	var htr = document.createElement("TR");		
	var htd1 = document.createElement("TD");			
	htd1.appendChild(document.createTextNode(_towns));
	
	var htd2 = document.createElement("TD");
	htd2.setAttribute("align", "right");
	htd2.appendChild(document.createTextNode(_gross));
	
	var htd3 = document.createElement("TD");
	htd3.setAttribute("align", "right");
	htd3.appendChild(document.createTextNode(_cost));
	
	var htd4 = document.createElement("TD");						
	htd4.setAttribute("align", "right");
	htd4.appendChild(document.createTextNode(_net));
	
	htr.appendChild(htd1);
	htr.appendChild(htd4);
	htr.appendChild(htd2);
	htr.appendChild(htd3);
	table.appendChild(htr);		

	for(_title in _city) {
		var tr = document.createElement("TR");		
		var td1 = document.createElement("TD");
		
		var a = document.createElement("a");
		a.setAttribute("href", "http://" + GameServer + "/index.php?view=city&id=" + _city[_title].id);		
		a.appendChild(document.createTextNode(_title));
		//td1.appendChild(document.createTextNode(_title));						
		td1.appendChild(a);
		
		var td2 = document.createElement("TD");
		td2.setAttribute("align", "right");
		td2.appendChild(document.createTextNode(_city[_title]['revenu']));
		
		var td3 = document.createElement("TD");
		td3.setAttribute("align", "right");
		td3.appendChild(document.createTextNode(_city[_title]['entretien']));
		
		var td4 = document.createElement("TD");						
		td4.setAttribute("align", "right");
		td4.appendChild(document.createTextNode(_city[_title]['resultat']));
		
		tr.appendChild(td1);
		tr.appendChild(td4);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);		
	}	
	
	panel.appendChild(titre);		
	corps.appendChild(table);	
	
	if(_myId > 0) {
		corps.appendChild(document.createElement("br"));
		var a = document.createElement("A");
		a.setAttribute("href", "http://"+GameServer+"/index.php?view=cityMilitary-army&id="+_myId);
		//a.appendChild(document.createTextNode("Troupes"));
		a.appendChild(document.createTextNode(_cityarmy));
		corps.appendChild(a);
	}
	
	panel.appendChild(corps);		
	panel.appendChild(footer);
		
	var _main = document.getElementById("mainview");
	var _container2 = document.getElementById("container2");	
	
	_container2.insertBefore(panel, _main);
}

makeCSS();
HideReportInbox();

GM_xmlhttpRequest( {
	method: 'GET',
	url : 'http://'+GameServer+'/index.php?view=finances',
	onload: function(response) {			
		pulled = document.createElement('div');
		pulled.innerHTML = response.responseText; 					
		getFinance(pulled);
	}
});	