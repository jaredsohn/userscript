(function ()
{
	var fileMETA=new Array(); 
// ==UserScript==
// @name           Universal Links Checker v7 
// @namespace      https://userscripts.org/scripts/show/66656
// @description    Universal Links Checker v7 automatically checks links from the page that you are visiting. This script works only with HTML code
// @version        7.3.20140415
fileMETA["version"]= '7.3.20140415';
// @updateURL      http://userscripts.org/scripts/source/66656.meta.js
// @downloadURL    http://userscripts.org/scripts/source/66656.user.js
// @include        http://*
// @include        https://*
// @grant	         GM_getValue
// @grant   	     GM_setValue
// @grant		       GM_addStyle
// @grant		       GM_log
// @grant  		     GM_xmlhttpRequest
// @grant  		     GM_registerMenuCommand                  
// ==/UserScript==

//<--Aktualizacia
	function getdays(date){
		Year = ((date.getYear() + 1900)*365); var daday = (date.getMonth() + 1); if(daday<10) {daday = "0" + daday;} 	daday = (daday*30); daret = Year+daday+date.getDate(); return daret; 
		}	
	function check_update(version){
		var today = new Date( );
		day = parseInt( getdays (today) );		
		if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 1)){ 
			check_version(version);	 
			GM_setValue("day",day);	
			} 
		}
			
	var version = fileMETA["version"];	 
	if (navigator.appName == 'Netscape'){
	check_update(version);
	}
	function check_version(version) { var script_url = "http://userscripts.org/scripts/source/66656.meta.js";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) { 	var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];
			if (null == newversion){ alert('There was an error in the update function of the "'+fileMETA["name"]+'" userscript.\nGo to '+script_url+' to download the latest version.\nThis message will appear again in 10 days'); }
			if(newversion==version){ return; }else{ var answer = confirm('A different version of the "'+fileMETA["name"]+'" userscript for Greasemonkey is available.\nYour version: '+version+'\nNew version: '+newversion+'\nUpdate: '+fileMETA["update"]+'\nDo you want to update now? Check for update will be done again in 10 days');
					 if (answer){	GM_openInTab("http://userscripts.org/scripts/show/66656"); } 
				}
			 }
			});
	}
//koniec Aktualizacia-->

linkify();

var netload_in= new Array(6)
 netload_in[0]="netload.in\/";
 netload_in[1]='dl_first_tacho\.gif|File download';
 netload_in[2]='Possible reasons for that:|Error|Code:';
 netload_in[3]='dsdlhkhsgdsgdhskjhgd';
 netload_in[4]="//a[contains(@href,'netload.in') and contains(@href,'date')]";
 netload_in[5]='dsdlhkhsgdsgdhskjhgd';

var easy_share_com= new Array(6)
 easy_share_com[0]="easy-share.com";
 easy_share_com[1]='Download time';
 easy_share_com[2]='(Requested file is deleted.|Sorry,the page you\'re looking forisn\'t here.)';
 easy_share_com[3]='dsdlhkhsgdsgdhskjhgd';
 easy_share_com[4]="//a[contains(@href,'easy-share.com/')]";
 easy_share_com[5]='dsdlhkhsgdsgdhskjhgd';

var mediafire_com= new Array(6)
 mediafire_com[0]="mediafire.com/\\?";
 mediafire_com[1]='Share this file:';
 mediafire_com[2]='Invalid or Deleted File|File Removed for Violation|Blocked for Violation';
 mediafire_com[3]='dsdlhkhsgdsgdhskjhgd';
 mediafire_com[4]="//a[contains(@href,'www.mediafire.com/?')]";
 mediafire_com[5]='tos_aup_violation';

var megashares_com= new Array(6)
 megashares_com[0]="megashares.com/\\?d";
 megashares_com[1]='Filesize';
 megashares_com[2]='Link Information:';
 megashares_com[3]='All download slots for this link are currently filled';
 megashares_com[4]="//a[contains(@href,'megashares.com/?d')]";
 megashares_com[5]='dsdlhkhsgdsgdhskjhgd';

var depositfiles_com= new Array(6)
 depositfiles_com[0]='depositfiles\.com\/';
 depositfiles_com[1]='<b>File Download</b>|File name|Nom du fichier|Nome do arquivo';
 depositfiles_com[2]='Such file does not exist';
 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd';
 depositfiles_com[4]="//a[contains(@href,'depositfiles')]";
 depositfiles_com[5]='dsdlhkhsgdsgdhskjhgd';

var vip_file_com= new Array(6)
 vip_file_com[0]='vip-file\.com\/download\/(?:.*?)/(?:.*?)\.html';
 vip_file_com[1]='Size of file:';
 vip_file_com[2]='File not found';
 vip_file_com[3]='dsdlhkhsgdsgdhskjhgd';
 vip_file_com[4]="//a[contains(@href,'vip-file.com') and contains(@href,'download')]";
 vip_file_com[5]='dsdlhkhsgdsgdhskjhgd';

var sendspace_com= new Array(6)
 sendspace_com[0]='sendspace\.com\/file\/(?:\w*)';
 sendspace_com[1]='You are about to download:';
 sendspace_com[2]='the file you requested is not available.';
 sendspace_com[3]='dsdlhkhsgdsgdhskjhgd';
 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]";
 sendspace_com[5]='dsdlhkhsgdsgdhskjhgd';

var uloz_to= new Array(6)
 uloz_to[0]='uloz\.to';
 uloz_to[1]='fileDownload';
 uloz_to[2]='Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned|deleted';
 uloz_to[3]='dsdlhkhsgdsgdhskjhgd';
 uloz_to[4]="//a[contains(@href,'uloz.to/')]";
 uloz_to[5]='dsdlhkhsgdsgdhskjhgd';

var ulozto_cz= new Array(6)
 ulozto_cz[0]='ulozto\.(cz|sk|net)';
 ulozto_cz[1]='fileDownload';
 ulozto_cz[2]='Soubor nebyl nalezen|Soubor byl smazán|Súbor bol zmazaný|Stránka nenalezena|Soubor byl zakázán|File was banned|deleted';
 ulozto_cz[3]='dsdlhkhsgdsgdhskjhgd';
 ulozto_cz[4]="//a[contains(@href,'ulozto.cz') or contains(@href,'ulozto.sk') or contains(@href,'ulozto.net')]";
 ulozto_cz[5]='dsdlhkhsgdsgdhskjhgd';

var czshare_com= new Array(6)
 czshare_com[0]='czshare\.com';
 czshare_com[1]='Celý název:';
 czshare_com[2]='Soubor nenalezen|Soubor expiroval|Proveďte prosím reupload.|identifikován jako warez|Soubor byl smazán';
 czshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 czshare_com[4]="//a[contains(@href,'czshare.com')]";
 czshare_com[5]='optional--';

var hellshare_com= new Array(6)
 hellshare_com[0]='(hellshare\.(cz|sk|com)|download\.(com|sk|cz|en)\.hellshare\.(cz|sk|com))';
 hellshare_com[1]='tab\\-details';
 hellshare_com[2]='list-purp-2|not found on this server';
 hellshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 hellshare_com[4]="//a[contains(@href,'hellshare.')]";
 hellshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var sharerapid_cz= new Array(6)
 sharerapid_cz[0]='(?:share-?rapid|sharerapid)\.(?:com|cz|sk|biz|net|info|eu)';
 sharerapid_cz[1]='Poslední stažení|Velikost:';
 sharerapid_cz[2]='error_div|je dočasně odpojen';
 sharerapid_cz[3]='dsdlhkhsgdsgdhskjhgd';
 sharerapid_cz[4]="//a[(contains(@href,'share-rapid')or contains(@href,'sharerapid')) and contains(@href,'stahuj')]";
 sharerapid_cz[5]='dsdlhkhsgdsgdhskjhgd';

var uploaded_to= new Array(6)
 uploaded_to[0]='uploaded\.(to|net)';
 uploaded_to[1]='Choose your download method';
 uploaded_to[2]='Page not found|The requested file isn\'t available anymore!';
 uploaded_to[3]='Wartungsarbeiten';
 uploaded_to[4]="//a[contains(@href,'uploaded.to') or contains(@href,'uploaded.net')]";
 uploaded_to[5]='dsdlhkhsgdsgdhskjhgd';

var ul_to= new Array(6)
 ul_to[0]='ul\.to\/';
 ul_to[1]='Choose your download method|Downloadart';
 ul_to[2]='Page not found|The requested file isn\'t available anymore!';
 ul_to[3]='Wartungsarbeiten';
 ul_to[4]="//a[contains(@href,'ul.to/')]";
 ul_to[5]='dsdlhkhsgdsgdhskjhgd';

var edisk_cz= new Array(6)
 edisk_cz[0]='edisk\.(cz|sk)';
 edisk_cz[1]='Stáhnout soubor:|Stiahnuť súbor:';
 edisk_cz[2]='Tento soubor již neexistuje z následujích důvodů:|Tento súbor už neexistuje z nasledujúcich dôvodov:';
 edisk_cz[3]='dsdlhkhsgdsgdhskjhgd';
 edisk_cz[4]="//a[contains(@href,'edisk.cz') or contains(@href,'edisk.sk')]";
 edisk_cz[5]='dsdlhkhsgdsgdhskjhgd';

var quickshare_cz= new Array(6)
 quickshare_cz[0]='quickshare\.cz';
 quickshare_cz[1]='Stáhnout soubor:';
 quickshare_cz[2]='';
 quickshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
 quickshare_cz[4]="//a[contains(@href,'quickshare.cz')]";
 quickshare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var letitbit_net= new Array(6)
 letitbit_net[0]='(www\.)?letitbit\.net\/download';
 letitbit_net[1]='img_sigmal_free';
 letitbit_net[2]='Request file|File not found';
 letitbit_net[3]='dsdlhkhsgdsgdhskjhgd';
 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]";
 letitbit_net[5]='dsdlhkhsgdsgdhskjhgd';
 
var hotfile_com= new Array(6)  
 hotfile_com[0]='hotfile\.com\/dl';
 hotfile_com[1]='Downloading|Stahování|Am Downloaden|arrow_down';
 hotfile_com[2]='This file is either removed due to copyright claim or is deleted by the uploader.|Soubor byl odstraněn kvůli porušení autorských práv nebo byl smazán uploaderem.|Diese Datei ist entweder aufgrund des Copyright-Rechtes|Ce dossier est enlevé|Empty Directory';
 hotfile_com[3]='dsdlhkhsgdsgdhskjhgd';
 hotfile_com[4]="//a[contains(@href,'hotfile.com') and contains(@href,'dl')]";
 hotfile_com[5]='dsdlhkhsgdsgdhskjhgd';

var uploading_com= new Array(6)
 uploading_com[0]='uploading\.com\/files';
 uploading_com[1]='Stiahnuť súbor|Stažení souboru|Download File|Datei-Download';
 uploading_com[2]='not found|The requested file is not found|Požadovaný soubor|Hľadaný súbor|gefunden';
 uploading_com[3]='dsdlhkhsgdsgdhskjhgd';
 uploading_com[4]="//a[contains(@href,'uploading.com') and contains(@href,'files')]";
 uploading_com[5]='dsdlhkhsgdsgdhskjhgd';

var multishare_cz= new Array(6)
 multishare_cz[0]='multishare\.cz\/stahnout';
 multishare_cz[1]='Název:';
 multishare_cz[2]='Požadovaný soubor neexistuje.';
 multishare_cz[3]='dsdlhkhsgdsgdhskjhgd';
 multishare_cz[4]="//a[contains(@href,'multishare.cz') and contains(@href,'stahnout')]";
 multishare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var dataport_cz= new Array(6)
 dataport_cz[0]='dataport\.cz\/file';
 dataport_cz[1]='premium_download';
 dataport_cz[2]='alert';
 dataport_cz[3]='dsdlhkhsgdsgdhskjhgd';
 dataport_cz[4]="//a[contains(@href,'dataport.cz') and contains(@href,'file')]";
 dataport_cz[5]='dsdlhkhsgdsgdhskjhgd';
 
var fileserve_com= new Array(6)
 fileserve_com[0]='fileserve\.com';
 fileserve_com[1]='Uploaded on|sheet_icon wbold';
 fileserve_com[2]='<h1>File not available</h1>|404 - Page not found|0 bytes';
 fileserve_com[3]='dsdlhkhsgdsgdhskjhgd';
 fileserve_com[4]="//a[contains(@href,'fileserve.com')]";
 fileserve_com[5]='dsdlhkhsgdsgdhskjhgd';

var extabit_com= new Array(6)
 extabit_com[0]='extabit\.com\/file\/[A-Za-z0-9]';
 extabit_com[1]='File to download';
 extabit_com[2]='File not found';
 extabit_com[3]='dsdlhkhsgdsgdhskjhgd';
 extabit_com[4]="//a[contains(@href,'extabit.com') and contains(@href,'file')]";
 extabit_com[5]='dsdlhkhsgdsgdhskjhgd';

var shareflare_net= new Array(6)
 shareflare_net[0]='shareflare\.net\/download';
 shareflare_net[1]='Size:';
 shareflare_net[2]='File not found';
 shareflare_net[3]='dsdlhkhsgdsgdhskjhgd';
 shareflare_net[4]="//a[contains(@href,'shareflare.net') and contains(@href,'download')]";
 shareflare_net[5]='dsdlhkhsgdsgdhskjhgd';

var freakshare_com= new Array(6)
 freakshare_com[0]='freakshare\.(com|net)\/files';
 freakshare_com[1]='Feature';
 freakshare_com[2]='This file does not exist!';
 freakshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 freakshare_com[4]="//a[contains(@href,'freakshare.com') and contains(@href,'files')]";
 freakshare_com[5]='dsdlhkhsgdsgdhskjhgd';

var bitshare_com= new Array(6)
 bitshare_com[0]='bitshare\.com\/files';
 bitshare_com[1]='Please select your download type to start';
 bitshare_com[2]='We are sorry, but the requested file was not found in our database!';
 bitshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 bitshare_com[4]="//a[contains(@href,'bitshare.com') and contains(@href,'files')]";
 bitshare_com[5]='dsdlhkhsgdsgdhskjhgd';
  
var cramit_in= new Array(6)
 cramit_in[0]='cramit\.in\/[a-z0-9A-Z]';
 cramit_in[1]='DOWNLOAD FILE';
 cramit_in[2]='File Not Found';
 cramit_in[3]='dsdlhkhsgdsgdhskjhgd';
 cramit_in[4]="//a[contains(@href,'cramit.in')]";
 cramit_in[5]='dsdlhkhsgdsgdhskjhgd';

var euroshare_eu= new Array(6)
 euroshare_eu[0]='euroshare\.eu\/file';
 euroshare_eu[1]='Rýchlosť sťahovania|Stiahnuť súbor';
 euroshare_eu[2]='neexistuje|nenalezen|nenájdeny';
 euroshare_eu[3]='dsdlhkhsgdsgdhskjhgd';
 euroshare_eu[4]="//a[contains(@href,'euroshare.eu') and contains(@href,'file')]";
 euroshare_eu[5]='dsdlhkhsgdsgdhskjhgd';

var turbobit_net= new Array(6)
 turbobit_net[0]='(turbobit|zharabit)\.net\/';
 turbobit_net[1]='Скачать файл|(Размер файла)|( Free downloading )|(Download file)'; 
 turbobit_net[2]='Файл не найден|File was not found.';
 turbobit_net[3]='dsdlhkhsgdsgdhskjhgd';
 turbobit_net[4]="//a[contains(@href,'turbobit') or contains(@href,'zharabit')]"; 
 turbobit_net[5]='dsdlhkhsgdsgdhskjhgd';
 
var usershare_net= new Array(6)
 usershare_net[0]='usershare\.net\/';
 usershare_net[1]='Usershare Features';
 usershare_net[2]='This file is either removed due to Copyright';
 usershare_net[3]='dsdlhkhsgdsgdhskjhgd';
 usershare_net[4]="//a[contains(@href,'usershare.net')]";
 usershare_net[5]='dsdlhkhsgdsgdhskjhgd';

var uploadstation_com= new Array(6)
 uploadstation_com[0]='uploadstation\.com\/(file|list)';
 uploadstation_com[1]='File size:|uploadstation\.com\/file';
 uploadstation_com[2]='File is not available|Total 0 file';
 uploadstation_com[3]='dsdlhkhsgdsgdhskjhgd';
 uploadstation_com[4]="//a[contains(@href,'uploadstation.com') and contains(@href,'file') or contains(@href,'list')]";
 uploadstation_com[5]='dsdlhkhsgdsgdhskjhgd';

var filekeen_com= new Array(6)
 filekeen_com[0]='filekeen\.com\/';
 filekeen_com[1]='Download File:';
 filekeen_com[2]='File Not Found|The file was removed by administrator|File has been removed';
 filekeen_com[3]='dsdlhkhsgdsgdhskjhgd';
 filekeen_com[4]="//a[contains(@href,'filekeen.com')]";
 filekeen_com[5]='dsdlhkhsgdsgdhskjhgd';

var bezvadata_cz= new Array(6)
 bezvadata_cz[0]='bezvadata\.cz\/stahnout';
 bezvadata_cz[1]='name=\"stahnoutSoubor\"';
 bezvadata_cz[2]='button-download-disable';
 bezvadata_cz[3]='dsdlhkhsgdsgdhskjhgd';
 bezvadata_cz[4]="//a[contains(@href,'bezvadata.cz') and contains(@href,'stahnout')]";
 bezvadata_cz[5]='dsdlhkhsgdsgdhskjhgd';
 
var upnito_sk= new Array(6)
 upnito_sk[0]='upnito\.sk';
 upnito_sk[1]='download.php';
 upnito_sk[2]='notfound|Not Found';
 upnito_sk[3]='dsdlhkhsgdsgdhskjhgd';
 upnito_sk[4]="//a[contains(@href,'upnito.sk')]";
 upnito_sk[5]='dsdlhkhsgdsgdhskjhgd';

var filefactory_com = new Array(6) 
 filefactory_com[0]='filefactory\.com';
 filefactory_com[1]='file uploaded|<td class=\"filesize\">';
 filefactory_com[2]='no longer available|This file has been deleted.|The requested folder is private.|Could not find a folder matching your request|No Files found in this folder.';
 filefactory_com[3]='dsdlhkhsgdsgdhskjhgd';
 filefactory_com[4]="//a[contains(@href,'filefactory')]";
 filefactory_com[5]='dsdlhkhsgdsgdhskjhgd';

var filejungle_com= new Array(6)
 filejungle_com[0]='filejungle\.com';
 filejungle_com[1]='fastest_dl rounded2';
 filejungle_com[2]='This file is no longer available';
 filejungle_com[3]='optional--';
 filejungle_com[4]="//a[contains(@href,'filejungle.com')]";
 filejungle_com[5]='optional--';

var filepost_com= new Array(6)
 filepost_com[0]='filepost\.com';
 filepost_com[1]='Size';
 filepost_com[2]='File not found';
 filepost_com[3]='optional--';
 filepost_com[4]="//a[contains(@href,'filepost.com')]";
 filepost_com[5]='optional--';


var webshare_cz= new Array(6)
 webshare_cz[0]='webshare\.cz';
 webshare_cz[1]='Stahujete soubor';
 webshare_cz[2]='Soubor nenalezen|File not found';
 webshare_cz[3]='dsdlhkhsgdsgdhskjhgd';
 webshare_cz[4]="//a[contains(@href,'webshare.cz')]";
 webshare_cz[5]='dsdlhkhsgdsgdhskjhgd';

var rapidgator_net= new Array(6)
 rapidgator_net[0]='rapidgator\.net';
 rapidgator_net[1]='Downloading';
 rapidgator_net[2]='File not found';
 rapidgator_net[3]='dsdlhkhsgdsgdhskjhgd';
 rapidgator_net[4]="//a[contains(@href,'rapidgator.net')]";
 rapidgator_net[5]='dsdlhkhsgdsgdhskjhgd';

var stahovadlo_cz= new Array(6)
 stahovadlo_cz[0]='stahovadlo\.cz'; 
 stahovadlo_cz[1]='Název'; 
 stahovadlo_cz[2]='Soubor již není dostupný'; 
 stahovadlo_cz[3]='dsdlhkhsgdsgdhskjhgd'; 
 stahovadlo_cz[4]="//a[contains(@href,'stahovadlo.cz')]"; 
 stahovadlo_cz[5]='dsdlhkhsgdsgdhskjhgd';

var zippyshare_com= new Array(6)
 zippyshare_com[0]='zippyshare\.com';            //http://www45.zippyshare.com/v/499080/file.html
 zippyshare_com[1]='download_small\.png|Download Now|download\.png';
 zippyshare_com[2]='not exist';
 zippyshare_com[3]='dsdlhkhsgdsgdhskjhgd';
 zippyshare_com[4]="//a[contains(@href,'zippyshare.com')]";
 zippyshare_com[5]='dsdlhkhsgdsgdhskjhgd';
 
var hulkshare_com= new Array(6)
 hulkshare_com[0]='hulkshare\.com|hu\.lk';
 hulkshare_com[1]='vidBitrate|tsSize';
 hulkshare_com[2]='File does not exist|Page not found';
 hulkshare_com[3]='disabled for public access';
 hulkshare_com[4]="//a[contains(@href,'hulkshare.com') or contains(@href,'hu.lk')]";
 hulkshare_com[5]='dsdlhkhsgdsgdhskjhgd';          

var stiahni_si= new Array(6)
 stiahni_si[0]='stiahni\.si';   
 stiahni_si[1]='Stiahnuť súbor|Stáhnout soubor|Datei herunterladen|Download the file';
 stiahni_si[2]='none\.png';
 stiahni_si[3]='dsdlhkhsgdsgdhskjhgd';
 stiahni_si[4]="//a[contains(@href,'stiahni.si')]";
 stiahni_si[5]='dsdlhkhsgdsgdhskjhgd';   
 
var shareprofi_com= new Array(6)
 shareprofi_com[0]='shareprofi\.com';
 shareprofi_com[1]='table-premium';
 shareprofi_com[2]='deleted';
 shareprofi_com[3]='dsdlhkhsgdsgdhskjhgd';
 shareprofi_com[4]="//a[contains(@href,'shareprofi.com')]";
 shareprofi_com[5]='dsdlhkhsgdsgdhskjhgd';
 
//var http_file_hosts=[megaupload_com];
var http_file_hosts=[netload_in,easy_share_com,mediafire_com,megashares_com,depositfiles_com,vip_file_com,sendspace_com,uloz_to,ulozto_cz,czshare_com,hellshare_com,uploaded_to,ul_to,edisk_cz,quickshare_cz,sharerapid_cz,letitbit_net,
hotfile_com,uploading_com,multishare_cz,dataport_cz,fileserve_com,extabit_com,shareflare_net,freakshare_com,bitshare_com,cramit_in,euroshare_eu,turbobit_net,usershare_net,uploadstation_com,
filekeen_com,bezvadata_cz,upnito_sk,filefactory_com,filejungle_com,filepost_com,webshare_cz,rapidgator_net,stahovadlo_cz,zippyshare_com,hulkshare_com,stiahni_si,shareprofi_com];
/*is this faster ?
//var lianks = document.getElementsByTagName('a');
//for (var i = links.length - 1; i >= 0; i--) {
//}
var lianks = document.getElementsByTagName('a');*/
//var lianks = document.evaluate( "//a",  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
//var lianks = document.evaluate( "//a[contains(@href,'depositfiles') and contains(@href,'files')]" ,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

var lianks = document.evaluate(netload_in[4]+'|'+easy_share_com[4]+'|'+mediafire_com[4]+'|'+megashares_com[4]+'|'+depositfiles_com[4]+'|'+vip_file_com[4]+'|'+sendspace_com[4]+'|'+uloz_to[4]+'|'+ulozto_cz[4]+'|'+czshare_com[4]+'|'
+hellshare_com[4]+'|'+uploaded_to[4]+'|'+ul_to[4]+'|'+edisk_cz[4]+'|'+quickshare_cz[4]+'|'+letitbit_net[4]+'|'+hotfile_com[4]+'|'+uploading_com[4]+'|'+multishare_cz[4]+'|'+dataport_cz[4]+'|'+fileserve_com[4]+'|'
+sharerapid_cz[4]+'|'+extabit_com[4]+'|'+shareflare_net[4]+'|'+freakshare_com[4]+'|'+bitshare_com[4]+'|'+cramit_in[4]+'|'+euroshare_eu[4]+'|'+turbobit_net[4]+'|'
+usershare_net[4]+'|'+uploadstation_com[4]+'|'+filekeen_com[4]+'|'+bezvadata_cz[4]+'|'+upnito_sk[4]+'|'+filefactory_com[4]+'|'+filejungle_com[4]+'|'+filepost_com[4]+'|'
+webshare_cz[4]+'|'+rapidgator_net[4]+'|'+stahovadlo_cz[4]+'|'+zippyshare_com[4]+'|'+hulkshare_com[4]+'|'+stiahni_si[4]+'|'+shareprofi_com[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// var lianks = document.evaluate(share_rapid_com[4], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// GM_log(lianks.snapshotLength);
if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 1000 ){ checktill = "1000";}else{checktill = lianks.snapshotLength;}
	//}
for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);

	for (var i=0; i<http_file_hosts.length; i++) {
//		GM_log(http_file_hosts[i][0]+' +++ '+link.href);
		if (link.href.match(http_file_hosts[i][0])) {
// 			GM_log(http_file_hosts[i][0]+' +++ '+link.href);
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

//headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },

GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {
//	GM_log(URL);
//	GM_log(responseDetails.responseText);
//	alert(OK);
	if (responseDetails.status == 403 || responseDetails.status == 404 ){
		DiplayTheNDSTUSERROR(URL);
	}
// 	GM_log(responseDetails.status);
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
//var xpathoflivelinklinks = "//a[starts-with(@href,\'" + livelinklinks.join('\') or starts-with(@href,\'') +"\')]";
//var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";
//GM_log (xpathoflivelinklinks);

var allliveLinks, thisLink;

allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allliveLinks.snapshotLength; i++) {
//	GM_log('i ='+i);
    var thisLink = allliveLinks.snapshotItem(i);
    thisLink.id = 'alive_link';
 }
}

function DiplayTheDeletedLinks(URL){

//GM_log ("//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]");
//var xpathoffotfoundlinks = "//a[starts-with(@href,\'" + fotfoundlinks.join('\') or starts-with(@href,\'') +"\')]";
//var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') +"\')]";
var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
var allLinks, thisLink;

allLinks = document.evaluate( xpathoffotfoundlinks,
document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
//    GM_log(allLinks.snapshotItem(i).id);
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
alive_link_png = 'data:image/png;base64,'+       // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY'+
'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy'+
'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs'+
'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp'+
'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY'+
'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ'+
'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1'+
'46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH'+
'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc'+
'04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';

adead_link_png = 'data:image/png;base64,'+       //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC'+
'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk'+
'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE'+
'+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29'+
'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM'+
'8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N'+
'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR'+
'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';

NDSTUSERROR_png = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy'+
'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP'+
'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N'+
'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h'+
'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG'+
'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5'+
'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';

GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#NDSTUSERROR {background:transparent url("+NDSTUSERROR_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

}

function linkify(){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{
//dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info

var regex = /\b(http:\/\/|shttp:\/\/)(\w(\w|-)+\.)+(dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info|cz|sk|pl|in|to|eu|lk|co|nz|si)[\w\-.+$!*\/(),~%?:@#&=\\—ěščřžýáíéúů]*/gi;
var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;

	if(regex.test(muligtLink)){

		//til at holde det nye link, og teksten omkring det
		var span = document.createElement('span');
		//tekst.parentNode.replaceChild(span, tekst);
		//alert("parent:" + span.parentNode);

		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			//vores match gemmes
			var link = myArray[0];

			//alert("har fundet dette link: " + link);

			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit

			var href = link;

			//s?tter http:// foran href, hvis der ikke er det
			var prefix = '';
			if(href.length > 7){
				prefix = href.substring(0,7);
			}
			if(prefix.toLowerCase() != 'http://'){
				href = 'http://' + href;
			}
			//skab vores link:
			var a = document.createElement('a');
			a.setAttribute('href', href); //giv det en href
			a.appendChild(document.createTextNode(link)); //linkteksten
			span.appendChild(a); //s?tter ind i span

			lastLastIndex = regex.lastIndex;
		}
		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
		tekst.parentNode.replaceChild(span, tekst);
	}
}
} catch(e){alert(e);}
}    
})();
