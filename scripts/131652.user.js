var scr_meta=<><![CDATA[
// ==UserScript==
// @name           Link Checker by Kraken.snv
// @namespace      http://userscripts.org/scripts/show/131507
// @description    Link Checker by Kraken.snv automatically checks links from the page that you are visiting...
// @version        2.2.9
// @include        http://*

// @require http://warezlinkchecker.com/updater.php?id=131507
// ==/UserScript==
]]></>.toString();

var v = "2.2.9";
var scriptNum = "131507";
var scriptName = "Link Checker by Kraken.snv";

//<--Update

GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { vertical-align:middle;left:40px;top:15px;border:3px solid #000;text-align:center;background-color:#fff;color:#000;font-family:arial,verdana;z-Index:9999;position:fixed;width:18%;height:50%;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { color:#000;font: 90% 'arial','trebuchet ms',helvetica,sans-serif;background-color:#B2CCFF;border:2px solid;border-color: #E0EBFF #000 #000 #E0EBFF;vertical-align: top;}");
GM_addStyle(".smgm_table { margin-bottom:10px;border:0px;border-collapse:collapse;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) { remindLaterV = 0; GM_setValue('remindLaterV',remindLaterV); }

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum ;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked,span)
{
	if (clicked) 
		remindLaterV = span;
	else
		remindLaterV--;
	GM_setValue('remindLaterV',remindLaterV);
}

function hideUpdate()
{
	document.getElementById('smgm_bgdiv').style.display='none';
	document.getElementById('smgm_dialogbox').style.display='none';
}

function checkNew(version)
{
	var upgrade = 0;
	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		onload:function(content){
			var USversion = content.responseText.match(/@version.*?(\d[^<]+?)\n/);
			content.responseText = content.responseText.replace(/ \/>/g,'>');
			content.responseText = content.responseText.replace(/\n/g,'');
			var changeDate = content.responseText.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = content.responseText.match(/\[u:(.*?)\]/i)[1];
			vSplit = version.split(".");
				vmain = Number(vSplit[0]);
				vvsub = Number(vSplit[1]);
				vrsub = Number(vSplit[2]);
			USsplit = USversion[1].split(".");
				USvmain = Number(USsplit[0]);
				USvsub = Number(USsplit[1]);
				USrsub = Number(USsplit[2]);
			verstring = "<div style='padding:5px;border-bottom:1px dotted #000;'>Latest Version on Userscripts: <a href='" + homepageURL + "' target='_new' title='Click to visit script's page'><b>" + USvmain + "." + USvsub + "." + USrsub + "</b></a><br>Your Installed Version: <b>" + vmain + "." + vvsub + "." + vrsub + "</b></div>";
			if (USvmain > vmain) upgrade = 1;
			if ( (USvsub > vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if ( (USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if (upgrade == 1) 
			{
				theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>New version of " + scriptName + " available.</div>";
				theHTML += verstring + "<p>";
				theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='Install'></td>";
				theHTML += "<td style='width:25px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='Remind Me Later'></td>";
				theHTML += "</tr></table><div style='background-color:white;overflow:auto;height:50%;text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Changes (" + changeDate.replace(/\./g,"/") + "):<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
				div1 = document.createElement('div');
				div1.id = 'smgm_dialogbox';
				div1.style.display = "none";
				div1.innerHTML = theHTML;
				document.body.appendChild(div1);
				div2 = document.createElement('div');
				div2.id = 'smgm_bgdiv';
				div2.style.display = "none";
				div2.addEventListener("click",function(){doremindLater(true,15);hideUpdate();},false);
				document.body.appendChild(div2);
				document.getElementById('smgm_bgdiv').style.display='block';
				document.getElementById('smgm_dialogbox').style.display='block';
				document.getElementById('smgm_remindButton').addEventListener("click", function(){doremindLater(true,60);hideUpdate();},false);
				document.getElementById('smgm_installButton').addEventListener("click", function(){hideUpdate();},false);
			}
		}
	})
}

doremindLater(false);
if (remindLaterV < 1)
	checkNew(v);
//End of Update-->

(function ()
{
linkify();

var depositfiles_com= new Array(6)
 depositfiles_com[0]='depositfiles\.com\/';
 depositfiles_com[1]='<b>File Download</b>|File name';
 depositfiles_com[2]='This file does not exist, the access to the following file is limited or it has been removed due to infringement of copyright.';
 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 depositfiles_com[4]="//a[contains(@href,'depositfiles')]";
 depositfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var uloz_to= new Array(6)
 uloz_to[0]='uloz\.to';
 uloz_to[1]='Stáhnout|Stiahnuť|Download';
 uloz_to[2]='(Požadovaný soubor nebyl nalezen|Požadovaný súbor|Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned)';
 uloz_to[3]='dsdlhkhsgdsgdhskjhgd';
 uloz_to[4]="//a[contains(@href,'uloz.to/')]";
 uloz_to[5]='dsdlhkhsgdsgdhskjhgd';

var ulozto_cz= new Array(6)
 ulozto_cz[0]='ulozto\.(cz|sk|net)\/\\d+\/';
 ulozto_cz[1]='Stáhnout|Stiahnuť|Download';
 ulozto_cz[2]='(Požadovaný soubor nebyl nalezen|Požadovaný súbor|Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned)';
 ulozto_cz[3]='dsdlhkhsgdsgdhskjhgd';
 ulozto_cz[4]="//a[contains(@href,'ulozto.cz/') or contains(@href,'ulozto.sk/') or contains(@href,'ulozto.net/')]";
 ulozto_cz[5]='dsdlhkhsgdsgdhskjhgd';
 
var edisk_cz= new Array(6)
 edisk_cz[0]='edisk\.(cz|sk|eu)';
 edisk_cz[1]='Stáhnout soubor:|Stiahnuť súbor:|Download file:';
 edisk_cz[2]='Tento soubor již neexistuje z následujích důvodů:|Tento súbor už neexistuje z nasledujúcich dôvodov:|This file does not exist due to one of the following:';
 edisk_cz[3]='dsdlhkhsgdsgdhskjhgd';
 edisk_cz[4]="//a[contains(@href,'edisk.cz') or contains(@href,'edisk.sk') or contains(@href,'edisk.eu')]";
 edisk_cz[5]='dsdlhkhsgdsgdhskjhgd';

var quickshare_cz= new Array(6)
 quickshare_cz[0]='quickshare\.cz';
 quickshare_cz[1]='Stáhnout soubor:';
 quickshare_cz[2]='';
 quickshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
 quickshare_cz[4]="//a[contains(@href,'quickshare.cz')]";
 quickshare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var hellshare_cz= new Array(6)
  hellshare_cz[0]='hellshare\.cz';
  hellshare_cz[1]='FileDownload';
  hellshare_cz[2]='Soubor nenalezen.|Možné příčiny|Soubor byl smazán uživatelem, který jej vlastnil.';
  hellshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
  hellshare_cz[4]="//a[contains(@href,'hellshare.cz')]";
  hellshare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var euroshare_eu= new Array(6)
 euroshare_eu[0]='euroshare\.eu\/file';
 euroshare_eu[1]='Stáhnout|free';
 euroshare_eu[2]='Súbor bol odstránený užívateľom alebo v súlade s pravidlami služby Euroshare.';
 euroshare_eu[3]='dsdlhkhsgdsgdhskjhgd';
 euroshare_eu[4]="//a[contains(@href,'euroshare.eu') and contains(@href,'file')]";
 euroshare_eu[5]='dsdlhkhsgdsgdhskjhgd';

var bitshare_com= new Array(6)
 bitshare_com[0]='bitshare\.com\/files';
 bitshare_com[1]='Please select your download type to start';
 bitshare_com[2]='We are sorry, but the requested file was not found in our database!';
 bitshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 bitshare_com[4]="//a[contains(@href,'bitshare.com') and contains(@href,'files')]";
 bitshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var bezvadata_cz= new Array(6)
 bezvadata_cz[0]='bezvadata\.cz\/stahnout';
 bezvadata_cz[1]='name=\"stahnoutSoubor\"';
 bezvadata_cz[2]='button-download-disable';
 bezvadata_cz[3]='dsdlhkhsgdsgdhskjhgd';
 bezvadata_cz[4]="//a[contains(@href,'bezvadata.cz') and contains(@href,'stahnout')]";
 bezvadata_cz[5]='dsdlhkhsgdsgdhskjhgd';

var filefactory_com = new Array(6) 
 filefactory_com[0]='filefactory\.com';
 filefactory_com[1]='file uploaded|<td class=\"filesize\">';
 filefactory_com[2]='no longer available|This file has been deleted.|The requested folder is private.|Could not find a folder matching your request|No Files found in this folder.';
 filefactory_com[3]='dsdlhkhsgdsgdhskjhgd';
 filefactory_com[4]="//a[contains(@href,'filefactory')]";
 filefactory_com[5]='dsdlhkhsgdsgdhskjhgd';

var uploadstation_com= new Array(6)
 uploadstation_com[0]='uploadstation\.com\/(file|list)';
 uploadstation_com[1]='File size:|uploadstation\.com\/file';
 uploadstation_com[2]='File is not available|Total 0 file';
 uploadstation_com[3]='dsdlhkhsgdsgdhskjhgd';
 uploadstation_com[4]="//a[contains(@href,'uploadstation.com') and contains(@href,'file') or contains(@href,'list')]";
 uploadstation_com[5]='dsdlhkhsgdsgdhskjhgd';

var czshare_com= new Array(6)
 czshare_com[0]='czshare\.com';
 czshare_com[1]='Celý název:';
 czshare_com[2]='Soubor nenalezen|Soubor expiroval, nebo v něm byl identifikován warez a došlo k smazání.|Došlo k chybě při uploadu, soubor je poškozen. Proveďte prosím reupload.|Tento soubor byl na upozornění identifikován jako warez.|Soubor byl smazán jeho odesilatelem';
 czshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 czshare_com[4]="//a[contains(@href,'czshare.com')]";
 czshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var fastshare_cz= new Array(6)
  fastshare_cz[0]='fastshare\.cz';
  fastshare_cz[1]='Velikost';
  fastshare_cz[2]='';
  fastshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
  fastshare_cz[4]="//a[contains(@href,'fastshare.cz')]";
  fastshare_cz[5]='dsdlhkhsgdsgdhskjhgd';
  
var shragle_com= new Array(6)
  shragle_com[0]='shragle\.com';
  shragle_com[1]='Download';
  shragle_com[2]='An unknown error occured|The selected file was not found.';
  shragle_com[3]='dsdlhkhsgdsgdhskjhgd';
  shragle_com[4]="//a[contains(@href,'shragle.com')]";
  shragle_com[5]='dsdlhkhsgdsgdhskjhgd';
  
var turbobit_net= new Array(6)
 turbobit_net[0]='turbobit\.net\/';
 turbobit_net[1]='Regular Download|( Free downloading )|(Download file)'; 
 turbobit_net[2]='File was not found.';
 turbobit_net[3]='dsdlhkhsgdsgdhskjhgd';
 turbobit_net[4]="//a[contains(@href,'turbobit.net')]"; 
 turbobit_net[5]='dsdlhkhsgdsgdhskjhgd';
 
var stahnu_to= new Array(6)
 stahnu_to[0]='stahnu\.to\/';
 stahnu_to[1]='MB'; 
 stahnu_to[2]='File Link Error';
 stahnu_to[3]='dsdlhkhsgdsgdhskjhgd';
 stahnu_to[4]="//a[contains(@href,'stahnu.to')]"; 
 stahnu_to[5]='dsdlhkhsgdsgdhskjhgd';
 
var webshare_cz= new Array(6)
  webshare_cz[0]='webshare\.cz\/';
  webshare_cz[1]='stáhnout soubor';
  webshare_cz[2]='404 - nenalezeno';
  webshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
  webshare_cz[4]="//a[contains(@href,'webshare.cz')]";
  webshare_cz[5]='dsdlhkhsgdsgdhskjhgd';
  
var dataport_cz= new Array(6)
 dataport_cz[0]='dataport\.cz\/file';
 dataport_cz[1]='Stažení ZDARMA';
 dataport_cz[2]='Soubor nebyl nalezen';
 dataport_cz[3]='dsdlhkhsgdsgdhskjhgd';
 dataport_cz[4]="//a[contains(@href,'dataport.cz') and contains(@href,'file')]";
 dataport_cz[5]='dsdlhkhsgdsgdhskjhgd';
 
var smaz_to= new Array(6)
 smaz_to[0]='smaz\.to';
 smaz_to[1]='Stáhnout soubor';
 smaz_to[2]='Požadovaný soubor neexistuje, skončila mu platnost, nebo byl smazán.';
 smaz_to[3]='dsdlhkhsgdsgdhskjhgd';
 smaz_to[4]="//a[contains(@href,'smaz.to')]";
 smaz_to[5]='dsdlhkhsgdsgdhskjhgd';

var lumfile_com= new Array(6)
 lumfile_com[0]='lumfile\.com';
 lumfile_com[1]='File:';
 lumfile_com[2]='File Not Found';
 lumfile_com[3]='dsdlhkhsgdsgdhskjhgd';
 lumfile_com[4]="//a[contains(@href,'lumfile.com')]";
 lumfile_com[5]='dsdlhkhsgdsgdhskjhgd';

  
var http_file_hosts=[depositfiles_com,uloz_to,ulozto_cz,edisk_cz,quickshare_cz,hellshare_cz,euroshare_eu,bitshare_com,bezvadata_cz,filefactory_com,uploadstation_com,czshare_com,fastshare_cz,shragle_com,turbobit_net,stahnu_to,webshare_cz,dataport_cz,smaz_to,lumfile_com];

var lianks = document.evaluate(depositfiles_com[4]+'|'+uloz_to[4]+'|'+ulozto_cz[4]+'|'+edisk_cz[4]+'|'+quickshare_cz[4]+'|'+hellshare_cz[4]+'|'+euroshare_eu[4]+'|'+bitshare_com[4]+'|'+bezvadata_cz[4]+'|'+filefactory_com[4]+'|'+uploadstation_com[4]+'|'+czshare_com[4]+'|'+fastshare_cz[4]+'|'+shragle_com[4]+'|'+turbobit_net[4]+'|'+stahnu_to[4]+'|'+webshare_cz[4]+'|'+dataport_cz[4]+'|'+smaz_to[4]+'|'+lumfile_com[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 800 ){ checktill = "800";}else{checktill = lianks.snapshotLength;}
for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);

	for (var i=0; i<http_file_hosts.length; i++) {
		if (link.href.match(http_file_hosts[i][0])) {
			var URL                                          = link.href;
			var name                                         = http_file_hosts[i][0];
			var file_is_alive                                = http_file_hosts[i][1];
			var file_is_dead                                 = http_file_hosts[i][2];
			var no_dd_slots_temp_unavail_servererror         = http_file_hosts[i][3];
			var whattoreplace                                = http_file_hosts[i][4];
			var tos_violation                                = http_file_hosts[i][5];

			geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation);
		}
	}
}
}
function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation){
GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {
	if (responseDetails.status == 403 || responseDetails.status == 404 ){
		DiplayTheNDSTUSERROR(URL);
	}
	var alivelink = responseDetails.responseText.match(file_is_alive);
	var deadylink = responseDetails.responseText.match(file_is_dead);
	var tosviolat = responseDetails.responseText.match(tos_violation);
	var noddslotstempunavailservererror = responseDetails.responseText.match(no_dd_slots_temp_unavail_servererror);
	if (deadylink && (deadylink != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (alivelink && (alivelink != null)){
		DiplayTheLiveLinks(URL);
	}
	if (tosviolat && (tosviolat != null)){
		DiplayTheDeletedLinks(URL);
	}
	if (noddslotstempunavailservererror && (noddslotstempunavailservererror != null)){
		DiplayTheNDSTUSERROR(URL);
	}
}
});
}

function DiplayTheLiveLinks(URL){
var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";

var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allliveLinks.snapshotLength; i++) {
    var thisLink = allliveLinks.snapshotItem(i);
    thisLink.id = 'alive_link';
 }
}

function DiplayTheDeletedLinks(URL){
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    thisLink.id = 'adead_link';
}
}

function DiplayTheNDSTUSERROR(URL){
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    thisLink.id = 'NDSTUSERROR';
}
	}

function addstyle(){
alive_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAB1UlEQVR4nJ2Sy2sTcQCEv/1tHjVuLGmbqs3DSrQpohSqVQSLBz15ET2oGBGLlGpEhJ6sJ++CgkJExYP/glo8SClq0WIEkQYfESWGJCQmjU0f2d1kHx5ErGApONeZucw3km3b/J8EdB1XEPLKkdi1w6cHr/YQuOhBAGCBbYFt/rvQdyIS92/yPDAlYwwJZFe7wKEINuz13NR1c65RtHLLCztPhs8dPLMt8Sn7FZ35A/qCnJfDccUX2OdJtHW6R6L7fcfKGW1cK5klgN2ngucPXdp6+10mTWmpiF3t4H2qkBF6reVypxIY+r5YpSl0b+x6z5Rvh6t3Tyw8dPTK9sTr7AwLriqeehfJV2nMijHhKGTKuvbDoG+wm1nzG6260xu/N/Cmo3Xjmhf5aQylgfwhwPPJNPasdZYUD2VqvFVlzacZ7IpGg5RFAfdalyvfKEiLzhqObIhnT9IYOWOYFPexQUZFo8JjdZ263pCkgUgkQFHKICkW7mKIqacfUXPNC3aSO7/H+UXGBDvPuN5WD0oton/L5jBSzUvy5WfmZhqjjWlusQzHH5wWNL/wqOlXgw4v/aVyhdxkfXRpwr6Bsdo7ZAiOOO+2H3GMrRb9S85e0S1Ckn8l/yfRlbhLUKB5egAAAABJRU5ErkJggg==';

adead_link_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAACGElEQVR4nE2RTUgUcRyGn9/8Z3Z2XN11U0jFDqV3b9HFUxQU5CGSBC99nbJDXYOOQl2kDtYpxBLrEh0CD5opfYBhq1FKhoEkq0a67q47M/s1zb+DtvTeH96X5xWtNSt3biMhdaU997jey87ibkN2m4pXxsu4FLNut+Hm5w0zKJ32NAaAMpUlwmPLYEZE+jmI1hpDjH7bkrdK9IihsYB96PfWr0EravWVgyqWGY4aIhd0GGLakV47Zo4Wq2WsmNVXaIgP1qBXY+Nd6+ktbKWolqvKUvpJpDE+5DQ3Pq36JRUFdprb+OgGXTUo5fnTb8bGyeVz1ImBLlacaNy59SeTt2NBQNDaytf1TRZ9fwpA9neLeQoedEfs6+fOniRZ9qh6BdjdJSMmk9/TvKuUhifhptY6MAE6IgRppQZiHW1HW1TlDLqEym+j/TyH/QJmnX6RNrjReSBItNZkuoXQqT9vtrSPBCuZuBSKhO3HkB9LaCvEaCNrGFwtV3jZ+v5AuTj0OIb7TD6vxGPuDtmmFmZ/Fskf6aTeVlguSdvheWjQUxPxYYEB2SOSiAnZ+CHmFjeZX139MrewQa4hSSIqUCCSWmagBk1nWFv+Bptlk9RCjgnfH3oIJyY87/6nVJaNosnyEszsslZ7PQHxu8jrKWXpyzCsQAAskGvwaFJMfQ+mEtCgtd6HAJoheRG5EgHFf4mC2QuXmiDxr+QvDvDvKMbrOscAAAAASUVORK5CYII=';

NDSTUSERROR_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAACJElEQVR4nAXBS0tUYQCA4fec75wzZ0YtLzNjanewewrBhEkgRFSLFtGmhf2BdlHbisAfECRtgxa2DVpFGyEwiMaNUCsRNC8zXsZxLufyne/S8zhn+IKhQ8yysER3Q8ZmPWf4prX5AYibGbXfisMFw9H3iBVtkXgOIZZWr0/f28Hw9ou+/ouO6fVxXUW055SzKLkg083ZNj/egX5jkR0RcD4QZHNjfTMvSxNXHO+sz/QDj+evy8h+xdq+g5uUCNLRW4a4YLGLIuDUnXJher58/ap7bNyjUPS4MSl4dL/Eei3h76ZB5w36KMSXxYqm8VMM8njuRHlmsv9ajoGRgKGSR7trWKo2WN2w4AlSa0hiBYeBq9j2PZ+RSiZ9nMAh3yPIiYRzo5rBoQLeekInc8m1PEQIypX4ulRxBfnjMjUcNSRRR2GFy8nRgCcPS0xcDjHWYKIU9tugM1yCXs8QH2ltyp1Dxc5GhIxd6qd9AKJ2RmOtSbqToGUGuBhkx5PUqyqKx5OtkFYPxB1D4xIANA8y9v/FyLbFxBYwKA6WXUntU2rXVVaH1mrK7qai2zUASA2tHUOynWEjgaGmFfWPrkEudqnOK7lLum6xW13KYw71RkJxWBDqDNV0gQ4xKx806aIoMKUN8ZKiVnDwp3K6l/2tjK+f9/iz1KW5nZEkW8T8ei9pvAIROUM8AxwcXA/sPY/yU02xYgmOOaQtwUHVsLdgUN8MKID/irUe8zmfSKwAAAAASUVORK5CYII=';

GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#NDSTUSERROR {background:transparent url("+NDSTUSERROR_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

}

function linkify(){ 
try{

var regex = /http:\/\/(depositfiles\.com|(www\.|)uloz\.to|(www\.|)ulozto\.(cz|sk|net)|(www\.|)edisk\.(cz|sk)\/|(www\.|)quickshare\.cz|(www\.|)hellshare\.cz|(www\.|)euroshare\.eu|bitshare\.com|(www\.|)bezvadata\.cz|(www\.|)filefactory\.com|(www\.|)uploadstation\.com|czshare\.com|(www\.|)fastshare\.cz|(www\.|)shragle\.com|(www\.|)turbobit\.net|(www\.|)stahnu.to|(www\.|)webshare.cz|(www\.|)dataport.cz|(www\.|)smaz\.to|(www\.|)lumfile.com)[\w\-.+$!*\/(),~%?:@#&=\\—ěščřžýáíéúů]*/gi;

var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option'];

var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;

	if(regex.test(muligtLink)){
		var span = document.createElement('span');


		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			var link = myArray[0];

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));

			var href = link;
			var prefix = '';
			if(href.length > 7){
				prefix = href.substring(0,7);
			}
			if(prefix.toLowerCase() != 'http://'){
				href = 'http://' + href;
			}
			var a = document.createElement('a');
			a.setAttribute('href', href); 
			a.appendChild(document.createTextNode(link)); 
			span.appendChild(a);

			lastLastIndex = regex.lastIndex;
		}
		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
		tekst.parentNode.replaceChild(span, tekst);
	}
}
} catch(e){alert(e);}
}
})();