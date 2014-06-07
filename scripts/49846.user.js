// ==UserScript==
// @name           BDSMzaken - Custom
// @namespace      bdsmzaken
// @description    BDSMzaken - Custom
// @include        *bdsmzaken.nl*
// @include        *bdsmzaken.be*
// ==/UserScript==

//style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#sddm{margin:0; padding: 0; z-index: 30;}'+
'#sddm li{margin:0;padding: 0;list-style: none;float: left;background:white;font: bold 12px;}'+
'#sddm li a{display: block;margin: 0 1px 0 0;padding: 4px 10px;background: #51544D;color: #FFF;text-align: center;text-decoration: none;}'+
'#sddm li a:hover{background: #7A7E74;}'+
'#sddm div{position: absolute;visibility: hidden;margin: 0;padding: 0;background: #FFFFFF;border: 1px solid #51544D;}'+
'#sddm div a{position: relative;display: block;margin: 0;padding-top: 3px; padding-bottom:7px;width: auto;height:10px;white-space: nowrap;text-align: left;text-decoration: none;background: #D0D3AF;color: #565656;font: 12px;}'+
'#sddm div hr{margin: 0;width:auto;}'+
'#sddm div a:hover{background: #7A7E74;color: #FFFFFF;}'+
'#custspacer{width:100%; height:23px; background:#51544D; border-bottom:1px solid white; border-top:1px solid white; margin-bottom:25px;}'+
'#custmenubar{width:99%; background:#51544D; height:23px;}'+
'body{color:#788283; background:#C6C8B9; position:relative;font-family:arial;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAIMCAYAAAA0FMZ%2BAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADA1LzI5LzA5MvFsiQAAAJ9JREFUeJzV1lEOgCAIgGHosN2irZvXm1o6%2BEUf9MXNYMYHbSnXfT6HiMh%2FUdXqWbVoSo5Hy1fGo7RwzVsf6B2VogP8sqCB5kAWmOqqrDhfv1unQyYfN8csfDprdKrTWQP89imhqZYpcb42JpPz7ChlUTRgcXT3Kd38ZpTySUovfwEWQDuFNz4u%2Bw8L%2Bc4fFvLJxQFOdSMWmSrt0Ca3qhfazQddAspUpgAAAABJRU5ErkJggg%3D%3D); background-repeat:repeat-x;}'+
'.tabelkop-center { background-color: #51544D; border:1px solid #BCB9BD; color:white;}'+
'.tabelregelkop, #ent5b-td-dotted, #ent5b-td-dotted.a { background-color:#D0D3AF; font-weight:bold; font-family:arial;}'+
'.tabelregel, .tabelregelkop-rechts, .tabelregelkop-center, .tabelregel-center { background-color:#D0D3AF;}'+
'.tabelkop-links, .tabelkop-rechts { background-color: #676468; border:1px solid #BCB9BD; color:white;}'+
'.tabelregel-rechts { background-color:#D9DCBF;}'+
' a:link {color:#990000;text-decoration: none} a:visited {color:#990000;text-decoration: none} a:active {color:#990000;text-decoration: none}a:hover {color:#990000;text-decoration: underline; color: #990000;}'+
'.kader {background-color:#F7F5E6; border:2px solid #51544D;}'+
'.paginatitel, .paginaondertitel{color:white;}'+
'td{color:#3C3F38;}'+
'#ent5d-td,#ent5c-td{color:#788283;font-family:arial;background-color:#F7F5E6;}'+
'.tabeltitel{color:#565656};');


//menu
var timeout = 500; var closetimer = 0; var ddmenuitem = 0; function mopenm2() { mcancelclosetime(); if(ddmenuitem) ddmenuitem.style.visibility = 'hidden'; ddmenuitem = document.getElementById('m2'); ddmenuitem.style.visibility = 'visible'; } function mopenm5() { mcancelclosetime(); if(ddmenuitem) ddmenuitem.style.visibility = 'hidden'; ddmenuitem = document.getElementById('m5'); ddmenuitem.style.visibility = 'visible'; } function mclose() { if(ddmenuitem) ddmenuitem.style.visibility = 'hidden'; } function mclosetime() { closetimer = window.setTimeout(mclose, timeout); } function mcancelclosetime() { if(closetimer) { window.clearTimeout(closetimer); closetimer = null; } }

function MainMenu(){

var menu = document.createElement("div");
menu.innerHTML = '<div id="custspacer"><div id="custmenubar">'+
	'<ul id="sddm">'+
	'<li><a href="/content/bezoeker-nws.asp">Home</a></li>'+
	'<li><a href="/content/dnm-mng.asp" id="m2link">Persoonlijke Pagina</a>'+
		'<div id="m2"> <a href="/content/dnm-dnm-frm01.asp">Mijn Instellingen</a>'+
		'<a href="/content/dnm-code-chg.asp">Mijn Toegangscode wijzigen</a><hr>'+
		'<a href="/content/dnm-prf-frm.asp">Mijn Profiel</a>'+
		'<a href="/content/dnm-adv-frm.asp">Mijn Advertenties</a>'+
		'<a href="/content/dnm-mbe-sel.asp">Mijn Mailbox</a>'+
		'<a href="/content/dnm-chk-sel.asp">Mijn Checklists</a>'+
		'<a href="/content/dnm-dmw-frm.asp">Mijn Matchwensen</a>'+
		'<a href="/content/dnm-mrt-sel.asp">Mijn Matchresultaten</a>'+
		'<a href="/content/dnm-fav-sel.asp">Mijn Favorieten</a>'+
		'<a href="/content/dnm-dgb-sel.asp">Mijn Dagboeken</a>'+
		'<a href="/content/dnm-sms-prv.asp">Privé SMS-jes</a><hr>'+
		'<a href="/content/dnm-boe-sel.asp">Mijn Boeken</a>'+
		'<a href="/content/dnm-bbs-sel.asp">Mijn Boekbesprekingen</a>'+
		'<a href="/content/dnm-flm-sel.asp">Mijn Films</a>'+
		'<a href="/content/dnm-fbs-sel.asp">Mijn Filmbesprekingen</a>'+
		'<a href="/content/dnm-uit-sel.asp">Mijn Uitgaansgelegenheden</a>'+
		'<a href="/content/dnm-uod-sel.asp">Mijn Uitgaansbeoordelingen</a>'+
		'<a href="/content/dnm-wnk-sel.asp">Mijn Winkels</a>'+
		'<a href="/content/dnm-wod-sel.asp">Mijn Winkelbeoordelingen</a>'+
	'</div></li>'+
	'<li><a href="/content/bzk-adv-sel.asp">Advertenties</a></li>'+
	'<li><a href="/content/bzk-chk-sel.asp">Checklists</a></li>'+
	'<li><a href="/content/bzk-dnm-sel.asp">Deelnemer zoeken</a></li>'+
	'<li><a href="/content/bzk-dgb-sel.asp">Dagboeken</a></li>'+
	'<li><a href="/content/bezoeker-frm.asp">Fora</a></li>'+
	'<li><a href="/content/bzk-prf-sel.asp">Profielen</a></li>'+
	'<li><a href="/content/bzk-vhl-sel.asp">Verhalen</a></li>'+
	'<li><a href="#" id="m5link">Bijdragen</a>'+
		'<div id="m5">'+
		'<a href="/content/bzk-uit-sel.asp">Uitgaan en beoordelingen</a>'+
		'<a href="/content/bzk-wnk-sel.asp">Winkels en beoordelingen</a>'+
		'<a href="/content/bzk-boe-sel.asp">Boeken en beoordelingen</a>'+
		'<a href="/content/bzk-flm-sel.asp">Films en beoordelingen</a>'+
		'</div></li>'+
	'<li><a href="/content/dnm-log-end.asp?status=logoff">Uitloggen</a></li></ul>'+
	'</div></div>';
document.body.insertBefore(menu, document.body.firstChild);

}

// Remove General stuff
	var general_remove = [
		"//img[contains(attribute::src,'info.gif')]", //images
		"//img[contains(attribute::src,'matchverzoek.gif')]", 
		"//img[contains(attribute::src,'favoriet.gif')]",
		"//img[contains(attribute::src,'zendsms.gif')]", 
		"//img[contains(attribute::src,'zendmail.gif')]", 
		"//img[contains(attribute::src,'btn-terug.gif')]",
		"//img[contains(attribute::src,'tip.gif')]",
		"//img[contains(attribute::src,'cmd-geefsmscredits.gif')]",
		"//img[contains(attribute::src,'cmd-negeren.gif')]",
		"//img[contains(attribute::src,'leesverder.gif')]",
		
		
	];
	 

// Get Location
var loc = location.href;	 

var strText = loc;
 
  var rePattern = new RegExp("(dnm-fma-con2|dnm-fma-frm|dnm-code-chg|dnm-dmw-frm|dnm-bmw-frm|dnm-smw-frm|dnm-umw-frm|dnm-pmw-frm|dnm-mrt-sel|dnm-mbe-con|dnm-mbe-sel|dnm-dnm-frm|dnm-fav-sel|dnm-adv-frm|dnm-tad-frm|dnm-chk-sel|dnm-chk-frm|dnm-vhl-sel|dnm-vhl-frm|bzk-dnm-sel|dnm-fma-se|dnm-dgb-sel|dnm-dgb-frm|dnm-sms-prv|dnm-boe-se|dnm-boe-frm|dnm-bbs-sel|dnm-bbs-frm|dnm-flm-sel|dnm-flm-frm|dnm-uit-sel|dnm-uit-frm|dnm-uod-sel|dnm-uod-frm|dnm-wnk-sel|dnm-wnk-frm|dnm-wod-sel|dnm-wod-frm|dnm-fbs-sel|dnm-fbs-frm|bzk-chk-sel|bzk-dgb-sel|bzk-fbr-frm|bzk-fbr-all|bzk-prf-sel|bzk-uit-sel|bzk-wnk-sel|bzk-boe-sel|bzk-boe-frm|bzk-flm-sel)","gi");
		while (arrMatch = rePattern.exec( strText ))
			{
    			var curloc = 'pers_generic';   
 			}
			
  var rePattern = new RegExp("(dnm-prf-frm|dnm-spf-frm|dnm-upf-frm|dnm-ppf-frm|dnm-tpf-frm)","gi");
		while (arrMatch = rePattern.exec( strText ))
			{
    			var curloc = 'usr_profiel';   
 			}			

  var rePattern = new RegExp("(bzk-adv-frm|bzk-dnm-frm|bzk-prf-frm|bzk-spf-frm|bzk-upf-frm|bzk-ppf-frm|bzk-tpf-frm|bzk-vhl-frm|bzk-uit-frm|bzk-uod-frm|bzk-wnk-frm|bzk-flm-frm|bzk-fbs-frm|bzk-bbs-frm)","gi");
		while (arrMatch = rePattern.exec( strText ))
			{
    			var curloc = 'user_profiel';   
 			}				
			
if (new RegExp("bezoeker-nws").test(loc))
  		{var curloc = 'home';}

else if (new RegExp("dnm-mng").test(loc))
			{var curloc = 'personalpage';}
		
	
else if (new RegExp("bzk-adv-sel").test(loc))
			{var curloc = 'addpage';}	

else if (new RegExp("bezoeker-frm").test(loc))
			{var curloc = 'main_forum';}	
			
else if (new RegExp("bzk-vhl-sel").test(loc))
			{var curloc = 'verhalen';}	
			
// elems aanpassen			
function AlterElements(path, size){
var ElementXpath = path;
		var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		alltags.snapshotItem(ElementXpath).width = size;		
} 


function AddTD(path, size){
var link = document.evaluate(path,document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (link != null) {
var newLink = document.createElement('td');
newLink.width = size
newLink.appendChild(document.createTextNode(' '));
link.parentNode.insertBefore(newLink, link.nextSibling);
}
	
}

/////////////////////////////////////////////////////////////////	
// Home Page
if (curloc == 'home'){

var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table/tbody/tr[2]", // header fluff
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[9]", //BDSM-Films
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[8]", //Nieuwste BDSM begrippen 
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[7]", //BDSM Boeken
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[6]", //Nieuwste BDSM-checklists
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[5]", //BDSM Dagboeken
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]/table[2]", //Gesproken Advertenties
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[6]", //BDSM Uitgaansgelegenheden
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[5]", //BDSM Winkels
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[2]", //Gesproken Profielen
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/table[4]",//alleen laatste nieuwsbericht laten zien
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/table[3]",
		"/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[1]/table[1]/tbody/tr[2]/td/table[1]/tbody/tr[2]/td/table[2]",		
	];
	
		AlterElements('/html/body/table/tbody/tr/td/table[2]', '85%');

	
}		
		
/////////////////////////////////////////////////////////////////	
// Persoonlijke pagina
else if (curloc == 'personalpage'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]/table[1]", // gedeelte linker menu	
		"/html/body/table/tbody/tr/td[2]/table[2]", // header fluff
		"/html/body/table/tbody/tr/td[2]/table[1]/tbody/tr[2]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[2]/td[1]", // laatst door mij bekeken cleanup
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[3]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[4]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[5]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[6]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[7]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[8]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[9]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[10]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[11]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[12]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[13]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[14]/td[1]",			
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[15]/td[1]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]/td/table/tbody/tr[16]/td[1]",
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[9]", // Mijn Filmbesprekingen
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[8]", // Mijn Boekbesprekingen
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[7]", // Mijn Winkelbeoordelingen
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[4]", // Mijn Beoordelingen uitgaansgelegenheden
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[3]", // Mijn forumberichten
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/table[2]", // Fora
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/br[4]",
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/br[3]",
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td[2]/br[2]",
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td/table[7]", // Mijn Dagboeken
		"/html/body/table/tbody/tr/td[2]/table[6]/tbody/tr/td/table[6]", // Mijn Verhalen
		"/html/body/table/tbody/tr/td[2]/table[4]", // Mijn Prive SMS-jes
		"/html/body/table/tbody/tr/td[2]/table[2]", // Groene info blok
		"/html/body/table/tbody/tr/td[2]/br[2]",
		"/html/body/table/tbody/tr/td[2]/br[1]",
		"/html/body/table/tbody/tr/td[2]/br[4]",
		"/html/body/table/tbody/tr/td[2]/br[3]",
		"/html/body/table/tbody/tr/td[2]/br[2]",
		"/html/body/table/tbody/tr/td[2]/br[4]",						
		"/html/body/table/tbody/tr/td[2]/br[3]",


	];	
	
var link = document.evaluate('/html/body/table/tbody/tr/td/br',document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (link != null) {
var newLink = document.createElement('br');
link.parentNode.insertBefore(newLink, link.nextSibling);
}


}			 
	 
//  Standaard wijzigingen (personal pages)
else if (curloc == 'pers_generic'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]", //header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]",
	];	
		
		AlterElements('/html/body/table[1]', '70%');
}		 

/////////////////////////////////////////////////////////////////	
//  Eigen profiel
else if (curloc == 'usr_profiel'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]", //header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]",
	];
	
		AlterElements('/html/body/table[1]', '70%');
		
		var link = document.evaluate('//*[@id="animatedtabs"]',document.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		if (link != null) {
		var newLink = document.createElement('br');
		link.parentNode.insertBefore(newLink, link.nextSibling);
		}

		
}

/////////////////////////////////////////////////////////////////	
//  Advertentie pagina
else if (curloc == 'addpage'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]", //header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]",
		"/html/body/table/tbody/tr/td/form[2]", // onderste zoekform
		"/html/body/table/tbody/tr/td/form/table/tbody/tr[3]/td/table/tbody/tr[8]", // fluff bovenste zoekform
		"/html/body/table/tbody/tr/td/form/table/tbody/tr[3]/td/table/tbody/tr/td/div[1]",
		"/html/body/table/tbody/tr/td/form/table/tbody/tr[2]/td/table[1]",
		"/html/body/table/tbody/tr/td/form/table/tbody/tr[1]",
	];
			
			AlterElements('/html/body/table[1]', '70%');
}

/////////////////////////////////////////////////////////////////	
//  profiel pagina van andere gebruiker
else if (curloc == 'user_profiel'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[4]", // header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[1]",
		];
	
		AlterElements('/html/body/table[1]', '70%');	
}
	
/////////////////////////////////////////////////////////////////	
//  forum overzicht
else if (curloc == 'main_forum'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[4]", // header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]",
		"/html/body/table/tbody/tr/td/br[2]",
	];
			
		AlterElements('/html/body/table/tbody/tr/td/table[2]', '90%');
		AlterElements('/html/body/table/tbody/tr/td/table[2]/tbody/tr/td', '45%');
		AlterElements('/html/body/table/tbody/tr/td/table[2]/tbody/tr/td[2]', '45%');
		AddTD('/html/body/table/tbody/tr/td/table[2]/tbody/tr/td','5%')
		
	
		
}		


/////////////////////////////////////////////////////////////////	
//  forum overzicht
else if (curloc == 'verhalen'){
	
	var custom_remove = [
		"/html/body/table/tbody/tr/td[1]", // linker menu
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[4]", // header fluff
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[3]",
		"/html/body/table/tbody/tr/td/table[1]/tbody/tr[2]",
		"/html/body/table/tbody/tr/td/br[2]",
	];
			
	AlterElements('/html/body/table[1]', '90%');
	
		
}	


// Remove The Elements
    function $x(p, context) {
        if (!context) context = document;
        var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
        return arr;
    }


    general_remove.forEach(
        function(xpath) {
            $x(xpath).forEach(
                function(item) {
                    item.parentNode.removeChild(item);
                }
            );
        }
    );
	
    custom_remove.forEach(
        function(xpath) {
            $x(xpath).forEach(
                function(item) {
                    item.parentNode.removeChild(item);
                }
            );
        }
    );	
	


// show main menu	
if (new RegExp("content").test(loc))
			{MainMenu();}		
	
	
// register menu mouse moves	
var m2linky = document.getElementById('m2link');
m2linky.addEventListener('mouseover', mopenm2, true);
m2linky.addEventListener('mouseout', mclosetime, true);

var m2div = document.getElementById('m2');
m2div.addEventListener('mouseover', mcancelclosetime, true);
m2div.addEventListener('mouseout', mclosetime, true);

var m5linky = document.getElementById('m5link');
m5linky.addEventListener('mouseover', mopenm5, true);
m5linky.addEventListener('mouseout', mclosetime, true);

var m5div = document.getElementById('m5');
m5div.addEventListener('mouseover', mcancelclosetime, true);
m5div.addEventListener('mouseout', mclosetime, true);

document.addEventListener('click', mclose, true);


