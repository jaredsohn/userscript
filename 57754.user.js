// ==UserScript==
// @name           Universal Links Checker
// @namespace      http://userscripts.org/scripts/show/24953
// @description    Universal Links Checker supports many file hosting sites. Warning !! this script is a bandwidth killer and it doesn't check more than 200 links per page. If you own an account in any of those files hosts then you have to turn automatic downloads off because this script will download the files in the background.
// @version        20090623b
// @exclude        http://*mediafire.com/*
// @exclude        http://*megashares.com/*
// @exclude        http://*rapidshare.de/*
// @exclude        http://*depositfiles.com/*
// @exclude        http://*netload.in/*
// @exclude        http://*easy-share.com/*
// @exclude        http://*vip-file.com/*
// @exclude        http://*yourfilehost.com*
// @exclude        http://*sendspace.com*
// @exclude        http://*letitbit.net*
// @exclude        http://*zshare.net*
// @exclude        http://*uploadbox.com*
// @exclude        http://*filenavi.com*
// @exclude        http://*vip-file.com*
// @exclude        http://*bitroad.net*
// @exclude        http://*link-protector.com*
// @exclude        http://*filebase.to*
// @include        http://*
// @include        file:///*

// ==/UserScript==

/* ************************ /*

About this script
 Automatically checks links from the page that you are visiting
 Supports :  rapidshare.de netload.in easy-share.com mediafire.com megashares.com 
             depositfiles.com vip-file.com yourfilehost.com sendspace.com filebase.to 
             link-protector.com bitroad.net vip-file.com filenavi.com uploadbox.com 
             zshare.net letitbit.net

Version History
 version 0.22 beta 23 July  2009 added co.cc vault protected links
 version 0.21 beta 23 July  2009 added co.cc vault protected links
 version 0.20 beta 10 March 2009 added more hosts, script corrections
 version 0.17 beta 16 July  2008 megaupload.com removed from the script ,added more hosts
 version 0.16 beta 27 April 2008 bug correction
 version 0.15 beta 20 April 2008 bug correction
 version 0.10 beta 09 April 2008 

/ ************************* */

// OPTIONS
var replace_co_cc_vault_links = '0'; // '0' or '1' ?


var netload_in= new Array(6)
 netload_in[0]="(?:www.|)netload.in/date";                  //name and search string in link to get description
 netload_in[1]='dl_first_tacho.gif';                      // file_is_alive
 netload_in[2]='Please contact the';                   // file_is_dead
 netload_in[3]='dsdlhkhsgdsgdhskjhgd';                  // no download slots or temporarily unavailable or servererror                  
 netload_in[4]="//a[contains(@href,'netload.in') and contains(@href,'date')]";  
 netload_in[5]='dsdlhkhsgdsgdhskjhgd';                  // tos violation
 netload_in[6]='<span style="color: #8d8d8d;">, (.*?)</span></div>';   // size
 
var easy_share_com= new Array(6)                       //http://w14.easy-share.com/10888291.html
 easy_share_com[0]="(?:w..\.|)easy-share.com";                   //name and search string in link to get description
 easy_share_com[1]='dwait';                            // file_is_alive
 easy_share_com[2]='File not found';                   // file_is_dead
 easy_share_com[3]='dsdlhkhsgdsgdhskjhgd';             // no download slots or temporarily unavailable or servererror                  
 easy_share_com[4]="//a[contains(@href,'easy-share.com/')]"; 
 easy_share_com[5]='file is deleted';                  // tos violation
 easy_share_com[6]='</strong> \\((.*?)\\)</h1>';   // size
 
var mediafire_com= new Array(6)                         //http://www.mediafire.com/?6egyjzxdfkx
 mediafire_com[0]="(?:www.|)mediafire.com/(?:download.php|)";                  //name and search string in link to get description
 mediafire_com[1]='You requested';                      // file_is_alive
 mediafire_com[2]='no longer stored';                   // file_is_dead
 mediafire_com[3]='dsdlhkhsgdsgdhskjhgd';                  // no download slots or temporarily unavailable or servererror                  
 mediafire_com[4]="//a[contains(@href,'www.mediafire.com/')]"; 
 mediafire_com[5]='tos_aup_violation';                  // tos violation
 mediafire_com[6]=' \\((.*?)\\)</div> </div> <div>';   // size
 
var megashares_com= new Array(6) //http://d01.megashares.com/?d01=e5e7882 megashares.com ?d01 516,000 google results 
 //megashares_com[0]="d\\d\\d.megashares.com";
 megashares_com[0]="(?:www\.|d\\d\\d\.|)megashares\.com/(?:dl|\\?d)"; //name and search string in link to get description
 megashares_com[1]='Filename';    // file_is_alive
 megashares_com[2]='Megashares Link Information';                   // file_is_dead
 megashares_com[3]='dsdlhkhsgdsgdhskjhgd';  // no download slots or temporarily unavailable or servererror
 megashares_com[4]="//a[contains(@href,'megashares.com/')]"; 
 megashares_com[5]='dsdlhkhsgdsgdhskjhgd'; //tos violation
 megashares_com[6]='size: (.*?)</dt>';   // size
 
var rapidshare_de= new Array(6)
 rapidshare_de[0]="rapidshare.de\/files"; //name and search string in link to get description
 rapidshare_de[1]='Choose download-type';    // file_is_alive
 rapidshare_de[2]='alert';                   // file_is_dead
 rapidshare_de[3]='dsdlhkhsgdsgdhskjhgd';  // no download slots or temporarily unavailable or servererror
 rapidshare_de[4]="//a[contains(@href,'rapidshare.de/files/')]"; 
 rapidshare_de[5]='dsdlhkhsgdsgdhskjhgd'; //tos violation
 rapidshare_de[6]='</strong> \((.*?)\)</h1>';   // size
 
var depositfiles_com= new Array(6) //http://depositfiles.com/en/files/3431646 //http://depositfiles.com/en/files/349814
 depositfiles_com[0]='depositfiles\.com\/(?:\\w\\w\/|)files\/(?:\w*)'; //name and search string in link to get description 
 depositfiles_com[1]='info';                           // file_is_alive
 depositfiles_com[2]='no_download_msg';          // file_is_dead
 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 depositfiles_com[4]="//a[contains(@href,'depositfiles') and contains(@href,'files')]";  
 depositfiles_com[5]='dsdlhkhsgdsgdhskjhgd';                                            //tos violation
 depositfiles_com[6]='File size: <b>(.*?)</b></span>';   // size
 
var yourfilehost_com= new Array(6)
 yourfilehost_com[0]='(?:www.|)yourfilehost\.com\/media\.php(?:.*?)cat=(?:.*?)&file=(?:.*?\.\w*)'; //name and search string in link to get description
 yourfilehost_com[1]='Uploaded by:';                                    // file_is_alive
 yourfilehost_com[2]='Error: File not found!';                            // file_is_dead
 yourfilehost_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 yourfilehost_com[4]="//a[contains(@href,'yourfilehost.com') and contains(@href,'cat') and contains(@href,'file')]";  
 yourfilehost_com[5]='dsdlhkhsgdsgdhskjhgd';
 yourfilehost_com[6]='</strong> \((.*?)\)</h1>';   // size
 
var sendspace_com= new Array(6) //http://www.sendspace.com/file/rcfrhu
 sendspace_com[0]='(?:www.|)sendspace\.com\/file\/(?:\w*)'; //name and search string in link to get description
 sendspace_com[1]='Download Link: ';                                    // file_is_alive
 sendspace_com[2]='the file you requested is not available.';                            // file_is_dead
 sendspace_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]";  
 sendspace_com[5]='dsdlhkhsgdsgdhskjhgd';
 sendspace_com[6]='<br><b>Size:</b> (.*?)  	                <br>';   // size
 
var filebase_to= new Array(6)   //http://filebase.to/files/148800/coa-tgg-xvid.avi
 filebase_to[0]='filebase\.to\/files\/(?:\w*)'; //name and search string in link to get description
 filebase_to[1]='Download wird';                                    // file_is_alive
 filebase_to[2]='404';                            // file_is_dead
 filebase_to[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 filebase_to[4]="//a[contains(@href,'filebase.to') and contains(@href,'files')]";  
 filebase_to[5]='dsdlhkhsgdsgdhskjhgd';
 filebase_to[6]='Dateigr&ouml;&szlig;e:</td>\r\n		<td width="50%" style="font-weight:bold;">(.*?)</td>';   // size
  
var link_protector_com= new Array(6)   //http://link-protector.com/686842/
 link_protector_com[0]='link-protector\.com\/(?:\d*)'; //name and search string in link to get description
 link_protector_com[1]='This link is';                                    // file_is_alive
 link_protector_com[2]='from automatic stealing';                            // file_is_dead
 link_protector_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 link_protector_com[4]="//a[contains(@href,'link-protector.com')]";  
 link_protector_com[5]='dsdlhkhsgdsgdhskjhgd';
 link_protector_com[6]='</strong> \((.*?)\)</h1>';   // size
 
var bitroad_net= new Array(6)   //http://bitroad.net/download/6b440b200685/ruby-warw.avi.html
 bitroad_net[0]='bitroad\.net\/download\/(?:.*?)/(?:.*?)\.html';      //name and search string in link to get description
 bitroad_net[1]='File Size';                            // file_is_alive
 bitroad_net[2]='not found';                            // file_is_dead
 bitroad_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 bitroad_net[4]="//a[contains(@href,'bitroad.net') and contains(@href,'download')]";  
 bitroad_net[5]='dsdlhkhsgdsgdhskjhgd';
 bitroad_net[6]='File Size:<b style="padding-left:5px;">(.*?)</b><br />';   // size
 
var vip_file_com= new Array(6)  //http://vip-file.com/download/7baaff893275/coa-tgg-xvid-IRFree.com.avi.html
 vip_file_com[0]='vip-file\.com\/download\/(?:.*?)/(?:.*?)\.html'; //name and search string in link to get description
 vip_file_com[1]='Description';                                    // file_is_alive
 vip_file_com[2]='This file not found';                            // file_is_dead
 vip_file_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 vip_file_com[4]="//a[contains(@href,'vip-file.com') and contains(@href,'download')]";  
 vip_file_com[5]='dsdlhkhsgdsgdhskjhgd'; 
 vip_file_com[6]='Size: <b style="padding-left:5px;">(.*?)</b></span>';   // size
  
var filenavi_com= new Array(6)  //http://www.filenavi.com/direct/77916e8f0181a71d2695d3c3196b30a3
 filenavi_com[0]='(?:www.|)filenavi\.com\/direct\/(?:\w*)';  //name and search string in link to get description
 filenavi_com[1]='file_name';                       // file_is_alive
 filenavi_com[2]='삭제된';                            // file_is_dead
 filenavi_com[3]='dsdlhkhsgdsgdhskjhgd';            // no download slots or temporarily unavailable or servererror
 filenavi_com[4]="//a[contains(@href,'filenavi.com') and contains(@href,'direct')]";  
 filenavi_com[5]='dsdlhkhsgdsgdhskjhgd'; 
 filenavi_com[6]='<td>(\\d.*?)</td>';   // size
  
var uploadbox_com= new Array(6)  //http://uploadbox.com/files/dHKtTbMPCJ
 uploadbox_com[0]='uploadbox.com/(?:.{1,3}\/|)files/(?:\w*)';       //name and search string in link to get description
 uploadbox_com[1]='download2';                           // file_is_alive
 uploadbox_com[2]='not_found';                            // file_is_dead
 uploadbox_com[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 uploadbox_com[4]="//a[contains(@href,'uploadbox.com') and contains(@href,'files')]";  
 uploadbox_com[5]='dsdlhkhsgdsgdhskjhgd'; 
 uploadbox_com[6]='<strong>File size:</strong> (\\d.*?)</li>';   // size
    
var letitbit_net= new Array(6)  //http://letitbit.net/download/a884f3171672/Hero.S03E19.avi.html
 letitbit_net[0]='letitbit\.net\/download\/(?:\w*)';     //name and search string in link to get description
 letitbit_net[1]='dlBlock';                              // file_is_alive
 letitbit_net[2]='not found';                            // file_is_dead
 letitbit_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]";  
 letitbit_net[5]='dsdlhkhsgdsgdhskjhgd'; 
 letitbit_net[6]='File size::</span> (\\d.*?)</h1>';   // size
 
var zshare_net= new Array(6)  //http://www.zshare.net/video/567993565c0c9478/
 zshare_net[0]='(?:www.|)zshare\.net\/(?:(?:download)|(?:video)|(?:audio))\/(?:\w*)';       //name and search string in link to get description
 zshare_net[1]='File Name';                              // file_is_alive
 zshare_net[2]='File Not Found';                            // file_is_dead
 zshare_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 zshare_net[4]="//a[contains(@href,'zshare.net/video') or contains(@href,'zshare.net/download') or contains(@href,'zshare.net/audio')]";  
 zshare_net[5]='dsdlhkhsgdsgdhskjhgd'; 
 zshare_net[6]='Video Size: <font color="#666666">(\\d.*?)</font></td>';   // size
 
var uploaded_to= new Array(6)  //http://uploaded.to/file/ezim9d/hio-oth.509.notv.part1.rar
 uploaded_to[0]='uploaded\.to\/file\/(?:\w*)';                //name and search string in link to get description
 uploaded_to[1]='"inputActive"';                              // file_is_alive
 uploaded_to[2]='"box_red"';                                  // file_is_dead
 uploaded_to[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 uploaded_to[4]="//a[contains(@href,'uploaded.to') and contains(@href,'file')]";  
 uploaded_to[5]='dsdlhkhsgdsgdhskjhgd';   
 uploaded_to[6]='Filesize: &nbsp;</td><td>      (\\d.*?)	</td>';   // size

var hotfile_com= new Array(6)  
 hotfile_com[0]='hotfile\.com\/dl';                //name and search string in link to get description
 hotfile_com[1]='<h2 style=\'margin-top: 20px\'>Downloading';   // file_is_alive
 hotfile_com[2]='is deleted by the';                                  // file_is_dead
 hotfile_com[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 hotfile_com[4]="//a[contains(@href,'hotfile.com') and contains(@href,'dl')]";  
 hotfile_com[5]='dsdlhkhsgdsgdhskjhgd';   
 hotfile_com[6]=' \\((.*?)\\)</h2>';   // size

var filesend_net= new Array(6)  
 filesend_net[0]='(?:www.|)filesend\.net\/download';                //name and search string in link to get description
 filesend_net[1]='buttdl';                              // file_is_alive
 filesend_net[2]='File removed';                                  // file_is_dead
 filesend_net[3]='Error';                       // no download slots or temporarily unavailable or servererror
 filesend_net[4]="//a[contains(@href,'filesend.net') and contains(@href,'download')]";  
 filesend_net[5]='dsdlhkhsgdsgdhskjhgd';   
 filesend_net[6]='File Size:</strong>\\n\\n(\\d*.*?)\\n</td></tr>';   // size

var uploading_com= new Array(6)  
 uploading_com[0]='uploading\.com\/files';                //name and search string in link to get description
 uploading_com[1]='ico_download_file';                              // file_is_alive
 uploading_com[2]='FILE REMOVED BECAUSE';                                  // file_is_dead
 uploading_com[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 uploading_com[4]="//a[contains(@href,'uploading.com') and contains(@href,'files')]";  
 uploading_com[5]='dsdlhkhsgdsgdhskjhgd';   
 uploading_com[6]='File size: (.*?)<br />';   // size
 
var ifile_it= new Array(6)  
 ifile_it[0]='ifile\.it\/';                //name and search string in link to get description
 ifile_it[1]='Request Download Ticket';                              // file_is_alive
 ifile_it[2]='file removed';                                  // file_is_dead
 ifile_it[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 ifile_it[4]="//a[contains(@href,'ifile.it')]";  
 ifile_it[5]='dsdlhkhsgdsgdhskjhgd';   
 ifile_it[6]='&nbsp;\\n.\\((.*?)\\)\\n&nbsp;';   // size
   
var co_cc_vault= new Array(6)   
 co_cc_vault[0]='(?:(?:defensive-pro\.org)|(?:.*?/(?:(?:vault)|(?:backup))/.*?))/downloads/';                //name and search string in link to get description
 co_cc_vault[1]='<input type="hidden" name="link" value="(.*)(?:|)';       // file_is_alive = real link
 co_cc_vault[2] = '( *$| "|>)';                                 // file_is_dead = reallinkcorrection
 co_cc_vault[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 co_cc_vault[4]="//a[contains(@href,'vault') or contains(@href,'downloads')]"; 
 co_cc_vault[5]='dsdlhkhsgdsgdhskjhgd';   
 co_cc_vault[6]='&nbsp;\\n.\\((.*?)\\)\\n&nbsp;';   // size
 co_cc_vault[7]='1'; 
 
// ONLY FOR co_cc_vault USAGE ------------START
var rapidshare_com= new Array(6) 
 rapidshare_com[0]='(|www\.)rapidshare\.com\/files';                 //name and search string in link to get description
 rapidshare_com[1]='File Name';                              // file_is_alive
 rapidshare_com[2]='error';                                  // file_is_dead
 rapidshare_com[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 rapidshare_com[4]="//a[contains(@href,'rapidshare')]"; 
 rapidshare_com[5]='dsdlhkhsgdsgdhskjhgd';   
 rapidshare_com[6]='File Size:  (\d.*?)<br>';   // size

var megaupload_com= new Array(6) 
 megaupload_com[0]='(|www\.)megaupload\.com';                 //name and search string in link to get description
 megaupload_com[1]='Filename:';                              // file_is_alive
 megaupload_com[2]='Unfortunately, the link you have clicked';                                  // file_is_dead
 megaupload_com[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 megaupload_com[4]="//a[contains(@href,'megaupload')]"; 
 megaupload_com[5]='dsdlhkhsgdsgdhskjhgd';   
 megaupload_com[6]='font-size:13px;">(\d.*?)<\/font>';   // size
 
var filefactory_com= new Array(6) 
 filefactory_com[0]='(|www\.)filefactory\.com';                 //name and search string in link to get description
 filefactory_com[1]='file uploaded';                              // file_is_alive
 filefactory_com[2]='no longer available';                                  // file_is_dead
 filefactory_com[3]='dsdlhkhsgdsgdhskjhgd';                       // no download slots or temporarily unavailable or servererror
 filefactory_com[4]="//a[contains(@href,'filefactory')]"; 
 filefactory_com[5]='dsdlhkhsgdsgdhskjhgd';   
 filefactory_com[6]='<span>(\d.*?) file uploaded .*ago.<\/span>';   // size
// ONLY FOR co_cc_vault USAGE ------------END 
         
var http_file_hosts=[netload_in,easy_share_com,mediafire_com,megashares_com,rapidshare_de,depositfiles_com,vip_file_com,yourfilehost_com,sendspace_com,filebase_to,link_protector_com,bitroad_net,filenavi_com,uploadbox_com,letitbit_net,zshare_net,uploaded_to,hotfile_com,filesend_net,uploading_com,ifile_it,co_cc_vault];
var http_file_hosts_all = [netload_in,easy_share_com,mediafire_com,megashares_com,rapidshare_de,depositfiles_com,vip_file_com,yourfilehost_com,sendspace_com,filebase_to,link_protector_com,bitroad_net,filenavi_com,uploadbox_com,letitbit_net,zshare_net,uploaded_to,hotfile_com,filesend_net,uploading_com,ifile_it,co_cc_vault,rapidshare_com,megaupload_com,filefactory_com];

var totalxpath='';
var totalourls='';

for (var x=0;x<http_file_hosts.length;x++){
	totalxpath = totalxpath + http_file_hosts[x][4] + '|';
	totalourls = totalourls + http_file_hosts[x][0] + '|';
	}
	
	totalxpath = totalxpath.replace(/\|$/g, "");
	totalourls = totalourls.replace(/\|$/g, "");

	linkify(totalourls);	

var lianks = document.evaluate(totalxpath,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

if (lianks.snapshotLength > 0){
	
	addstyle();
	
	if ( lianks.snapshotLength > 200 ){ checktill = "200";}else{checktill = lianks.snapshotLength;}

		for (var y = 0; y < checktill; y++) {

			var link = lianks.snapshotItem(y);	
	
	     	for (var i=0; i<http_file_hosts.length; i++) {
				
              if ( (link.href.match(http_file_hosts[i][0])) && (!(link.href.match(/google\./))) && (!(link.href.match(/cache:/))) && (!(link.href.match(/translate/))) && (!(link.id.match(/(alive_link)|(adead_link)|(NDSTUSERROR)/))) ){  
			   var URL                                          = link.href.replace(/http:\/\/.*?\?http:\/\//,'http://');    	
			   var name                                         = http_file_hosts[i][0];
			   var file_is_alive                                = http_file_hosts[i][1];
			   var file_is_dead                                 = http_file_hosts[i][2]; 
			   var no_dd_slots_temp_unavail_servererror         = http_file_hosts[i][3];
			   var whattoreplace                                = http_file_hosts[i][4];
			   var tos_violation                                = http_file_hosts[i][5];
			   var size                                         = http_file_hosts[i][6];
	           var url2decode                                   = http_file_hosts[i][7];
			   
	if (url2decode == 1){
		decurl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size , http_file_hosts_all,replace_co_cc_vault_links);
        }else{
        geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size);
        }
   }
  }
 }
}

//function to find the real urls, show them on the page and then check them
function decurl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation, size,http_file_hosts_all,replace_co_cc_vault_links){

GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {
			
var reallinkreg = file_is_alive;

var reallinkcorrection = file_is_dead;
	
var reallink  = responseDetails.responseText.match(reallinkreg)[1];

     reallink  = reallink.replace( new RegExp( reallinkcorrection, "g" ), "" );
  
     addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links);
   	
	}});		

}

function addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links){
   var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";	
   var allliveLinks, thisLink;
       allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

  for (var i = 0; i < allliveLinks.snapshotLength; i++) {
       var thisLink = allliveLinks.snapshotItem(i);

if (replace_co_cc_vault_links == '1'){
		   thisLink.href = reallink;		   
		   thisLink.innerHTML = reallink;
		   }else{
			   if (thisLink.id != 'checked'){
		   thisLink.id = 'checked';
		   div = document.createElement('div');
		   div.innerHTML = '<a href="'+reallink+'">'+reallink+'</a>';
		   thisLink.parentNode.insertBefore(div,thisLink);
		   }
	   }
	   
	     	for (var i=0; i<http_file_hosts_all.length; i++) {
				
              if ( (reallink.match(http_file_hosts_all[i][0])) && (!(reallink.match(/google\./))) && (!(reallink.match(/cache:/))) && (!(reallink.match(/translate/))) ){  
			   var URL                                          = reallink.replace(/http:\/\/.*?\?http:\/\//,'http://');    	
			   var name                                         = http_file_hosts_all[i][0];
			   var file_is_alive                                = http_file_hosts_all[i][1];
			   var file_is_dead                                 = http_file_hosts_all[i][2]; 
			   var no_dd_slots_temp_unavail_servererror         = http_file_hosts_all[i][3];
			   var whattoreplace                                = http_file_hosts_all[i][4];
			   var tos_violation                                = http_file_hosts_all[i][5];
			   var size                                         = http_file_hosts_all[i][6];
	           var url2decode                                   = http_file_hosts_all[i][7];
			   
geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size);
       			   
		  }	
	   }	   
	}	
 }

function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation, size){
//http://files-search.com/tools.comuf.com/rapidcheck/rapidcheck.php?link=222352037/Hannah_Montana_The_Movie_TS_XVID_-_STG.part1.rar&out=xml
if (URL.match(/rapidshare\.com/)){
	URL = URL.replace(/http:\/\/rapidshare\.com\/files\//,'http://files-search.com/tools.comuf.com/rapidcheck/rapidcheck.php?link=');
	//console.log(URL);
	}
GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {

if (URL.match(/tools\.comuf\.com/)){
	//URL = URL.replace(/http:\/\/rapidshare\.com\/files\//,'http://files-search.com/tools.comuf.com/rapidcheck/rapidcheck.php?link=');
	URL = URL.replace(/http:\/\/files-search.com\/tools.comuf.com\/rapidcheck\/rapidcheck.php\?link=/,'http://rapidshare.com/files/');
	//console.log(URL);
	}

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

	if (responseDetails.responseText.match(size) != null){
	var fileSize  = responseDetails.responseText.match(size)[1];
	fileSize = fileSize.replace(/&nbsp;/,' ');
	  }else{
	  	fileSize  = "unknown";
	  	}
		DiplayTheLiveLinks(URL,fileSize);	
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


function DiplayTheLiveLinks(URL,fileSize){

   var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";	
   var allliveLinks, thisLink;
       allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

  for (var i = 0; i < allliveLinks.snapshotLength; i++) {
       var thisLink = allliveLinks.snapshotItem(i);
           thisLink.id = 'alive_link';
           thisLink.title = 'size = '+fileSize;
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

	
	

/* possible link checking sites

http://www.rooseveltrp.com/filecheck/  -- slowww
http://www.mtworld.info/filec/ -- slowww
http://rapidzone.ws/linxtool/ -- fast
http://irapid.co.uk/LinkChecker/ 
http://lc.technospace.info/ -timeout 180 links
http://linkchecker.daily-warez.org/  -timeout  180 links
http://www.warezlounge.com/link_checker.php slow errors in the code

http://hajebi.ir/ fast  but checks only 20 at a time 

20 links test
http://linkchecker.daily-warez.org/  -timeout  20 links
http://hajebi.ir/ fast
http://irapid.co.uk/LinkChecker/ OK
http://lc.technospace.info/ timeout
http://www.rapid-hook.com/index.php not bad
http://rapidshoot.com/ rapidshare only
http://rapidzone.ws/linxtool/ -- very fast


*/

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

function linkify(totalourls){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{

//var regex = /http:\/\/(netload\.in\/date|w\d\d\.easy-share\.com|uploaded\.to\/file|filebase\.to\/files|link-protector\.com\/|depositfiles\.com\/files\/|bitroad\.net\/download\/|vip-file\.com\/download\/|www.filenavi\.com\/direct\/|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|uploadbox\.com\/files\/|www\.zshare\.net\/|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
	
	//GM_log('totalourls '+totalourls);
	//GM_log('11111dasdasd '+window.location.href);
	//GM_log('window.location.href = '+window.location.href+ ' -------- window.document.body.innerHTML = '+window.document.body.innerHTML);

var regexy = "http:\/\/("+ totalourls +")[\\w\\-.+$!*\\/(),~%?:@#&=\\\\]*";

var regex = new RegExp(regexy,"ig");

var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe' ];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

//var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links
var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;
	
	if(regex.test(muligtLink)){
		
		//til at holde det nye link, og teksten omkring det
		var span = document.createElement('span');	
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
//}else{	return;	}

} catch(e){alert(e);}

	}
