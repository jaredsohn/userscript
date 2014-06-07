// ==UserScript==
// @name           The West_-_Tools
// @description    Calcul des points pour l'Agrandissement,ajoute un onglet WestCalc et WestSats 
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows

//var weststats_exportID //
if ( typeof (weststats_exportID) != "undefined" ) 
{
var weststats_script = document.createElement("li");
	weststats_script.id = "weststats_script";
	weststats_script.innerHTML = "<a href=\"javascript:var wsp_auth = '"+ weststats_exportID +"';var wsp_url = 'www.weststats.com';var remoteScript=new Element('script', {'type': 'text/javascript', 'src': 'http://www.weststats.com/js/import_all.js?1247793097'});document.body.appendChild(remoteScript);void(0);\"></a>";
}

var actual_world = window.location.host.substr(0,4);
var actual_region = window.location.host.substr(0,2);

switch(actual_region)
{
case "fr": actual_region="fr";
break;
}	

var weststats_link = document.createElement("li");
	weststats_link.id="weststats_link";
if	(actual_region=="fr")
{
	weststats_link.innerHTML = '<a style="background:url(http://the.live.free.fr/thewest/WestStats.png) no-repeat" href="http://'+ actual_region + '.weststats.com/Jobs/?type=personal&skill=none&bonus=best&best=equip&itemsetcalc=on&change_world='+ actual_world +'" target="_blank"></a>';
}
else
{
	weststats_link.innerHTML = '<a style="background:url(http://the.live.free.fr/thewest/WestStats.png) no-repeat" href="http://'+ actual_region + '.weststats.com/Jobs/?type=personal&skill=none&bonus=best&best=equip&itemsetcalc=on&change_world='+ actual_world +'" target="_blank"></a>';
}


var construction = document.createElement("li");
construction.id="construction";
construction.innerHTML='<a href="#" onclick="javascript: var remoteScript=new Element(\'script\', {\'type\': \'text/javascript\', \'src\': \'http://the.live.free.fr/thewest/build.js\'});document.body.appendChild(remoteScript);void(0);"><img src="http://s2.noelshack.com/uploads/images/12335351801454_construction.png" alt="Construction"></a>';

var menu_reports = document.getElementById('menu_reports');
if (menu_reports) {	
	menu_reports.parentNode.insertBefore(construction, menu_reports.nextSibling);	
};

var westcalc = document.createElement("li");
westcalc.id="westcalc";
westcalc.innerHTML ='<a href="#" onclick="javascript: var remoteScript=new Element(\'script\', {\'type\': \'text/javascript\', \'src\': \'http://the.live.free.fr/thewest/westcalc.js\'});document.body.appendChild(remoteScript);void(0);"><img src="http://the.live.free.fr/thewest/westcalc.png" alt="WestCalc"></a>';
var menu_inventory = document.getElementById('menu_inventory');
if (menu_inventory) {	
	menu_inventory.parentNode.insertBefore(westcalc, menu_inventory.nextSibling);	
};


var menu_settings = document.getElementById('menu_settings');
if (menu_settings) {
	menu_settings.parentNode.insertBefore(construction, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(westcalc, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(weststats_link, menu_settings.nextSibling);
}
