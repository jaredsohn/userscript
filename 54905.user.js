// ==UserScript==
// @name           asfasf
// @namespace      http://userscripts.org/scripts/show/54905
// @description    Universal Links Checker supports many file hosting sites. Warning !! this script is a bandwidth killer and it doesn't check more than 200 links per page. If you own an account in any of those files hosts then you have to turn automatic downloads off because this script will download the files in the background.
// @version        2009.05.09 18:50
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
// @exclude        http://*data.hu*
// @exclude        http://*filenavi.com*
// @exclude        http://*vip-file.com*
// @exclude        http://*bitroad.net*
// @exclude        http://*addat.hu*
// @exclude        http://*filebase.to*
// @exclude        http://*filebox.com*

// ==/UserScript==

/* ************************ /*

About this script
 Automatically checks links from the page that you are visiting
 Supports :  rapidshare.de netload.in easy-share.com mediafire.com megashares.com 
             depositfiles.com vip-file.com yourfilehost.com sendspace.com filebase.to 
             addat.hu bitroad.net vip-file.com filenavi.com data.hu 
             zshare.net letitbit.net filebox.com

Version History
 version 0.31 beta 09 May 2009 hozzáadva data.hu és addat.hu
 version 0.20 beta 10 March 2009 added more hosts, script corrections
 version 0.17 beta 16 July  2008 megaupload.com removed from the script ,added more hosts
 version 0.16 beta 27 April 2008 bug correction
 version 0.15 beta 20 April 2008 bug correction
 version 0.10 beta 09 April 2008 

/ ************************* */


linkify();

var netload_in= new Array(6)
 netload_in[0]="netload.in/date";                  //name and search string in link to get description
 netload_in[1]='file_slot';                      // file_is_alive
 netload_in[2]='Please contact the';                   // file_is_dead
 netload_in[3]='dsdlhkhsgdsgdhskjhgd';                  // no download slots or temporarily unavailable or servererror                  
 netload_in[4]="//a[contains(@href,'netload.in') and contains(@href,'date')]";  
 netload_in[5]='dsdlhkhsgdsgdhskjhgd';                  // tos violation
 
 
 var filebox_com= new Array(6)
 filebox_com[0]="filebox.com/";                  //name and search string in link to get description
 filebox_com[1]='content';                      // file_is_alive
 filebox_com[2]='No such file';                   // file_is_dead
 filebox_com[3]='dsdlhkhsgdsgdhskjhgd';                  // no download slots or temporarily unavailable or servererror                  
 filebox_com[4]="//a[contains(@href,'filebox.com') and contains(@href)]";  
 filebox_com[5]='dsdlhkhsgdsgdhskjhgd';  
 

var easy_share_com= new Array(6)                       //http://w14.easy-share.com/10888291.html
 easy_share_com[0]="easy-share.com";                   //name and search string in link to get description
 easy_share_com[1]='dwait';                            // file_is_alive
 easy_share_com[2]='File not found';                   // file_is_dead
 easy_share_com[3]='dsdlhkhsgdsgdhskjhgd';             // no download slots or temporarily unavailable or servererror                  
 easy_share_com[4]="//a[contains(@href,'easy-share.com/')]"; 
 easy_share_com[5]='file is deleted';                  // tos violation

var mediafire_com= new Array(6)                         //http://www.mediafire.com/?6egyjzxdfkx
 mediafire_com[0]="mediafire.com/\\?";                  //name and search string in link to get description
 mediafire_com[1]='You requested';                      // file_is_alive
 mediafire_com[2]='Invalid Quickkey';                   // file_is_dead
 mediafire_com[3]='dsdlhkhsgdsgdhskjhgd';                  // no download slots or temporarily unavailable or servererror                  
 mediafire_com[4]="//a[contains(@href,'www.mediafire.com/?')]"; 
 mediafire_com[5]='tos_aup_violation';                  // tos violation

var megashares_com= new Array(6) //http://d01.megashares.com/?d01=e5e7882 megashares.com ?d01 516,000 google results 
 megashares_com[0]="megashares.com/\\?d"; //name and search string in link to get description
 megashares_com[1]='Filename';    // file_is_alive
 megashares_com[2]='Megashares Link Information';                   // file_is_dead
 megashares_com[3]='dsdlhkhsgdsgdhskjhgd';  // no download slots or temporarily unavailable or servererror
 megashares_com[4]="//a[contains(@href,'megashares.com/?d')]"; 
 megashares_com[5]='dsdlhkhsgdsgdhskjhgd'; //tos violation

var rapidshare_de= new Array(6)
 rapidshare_de[0]="rapidshare.de\/files"; //name and search string in link to get description
 rapidshare_de[1]='Choose download-type';    // file_is_alive
 rapidshare_de[2]='alert';                   // file_is_dead
 rapidshare_de[3]='dsdlhkhsgdsgdhskjhgd';  // no download slots or temporarily unavailable or servererror
 rapidshare_de[4]="//a[contains(@href,'rapidshare.de/files/')]"; 
 rapidshare_de[5]='dsdlhkhsgdsgdhskjhgd'; //tos violation

var depositfiles_com= new Array(6) //http://depositfiles.com/en/files/3431646 //http://depositfiles.com/en/files/349814
 depositfiles_com[0]='depositfiles\.com\/(?:\\w\\w\/|)files\/(?:\w*)'; //name and search string in link to get description 
 depositfiles_com[1]='info';                           // file_is_alive
 depositfiles_com[2]='no_download_msg';          // file_is_dead
 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 depositfiles_com[4]="//a[contains(@href,'depositfiles') and contains(@href,'files')]";  
 depositfiles_com[5]='dsdlhkhsgdsgdhskjhgd';                                            //tos violation

var yourfilehost_com= new Array(6)
 yourfilehost_com[0]='yourfilehost\.com\/media\.php(?:.*?)cat=(?:.*?)&file=(?:.*?\.\w*)'; //name and search string in link to get description
 yourfilehost_com[1]='Uploaded by:';                                    // file_is_alive
 yourfilehost_com[2]='Error: File not found!';                            // file_is_dead
 yourfilehost_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 yourfilehost_com[4]="//a[contains(@href,'yourfilehost.com') and contains(@href,'cat') and contains(@href,'file')]";  
 yourfilehost_com[5]='dsdlhkhsgdsgdhskjhgd';

var sendspace_com= new Array(6) //http://www.sendspace.com/file/rcfrhu
 sendspace_com[0]='sendspace\.com\/file\/(?:\w*)'; //name and search string in link to get description
 sendspace_com[1]='Download Link: ';                                    // file_is_alive
 sendspace_com[2]='the file you requested is not available.';                            // file_is_dead
 sendspace_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]";  
 sendspace_com[5]='dsdlhkhsgdsgdhskjhgd';

var filebase_to= new Array(6)   //http://filebase.to/files/148800/coa-tgg-xvid.avi
 filebase_to[0]='filebase\.to\/files\/(?:\w*)'; //name and search string in link to get description
 filebase_to[1]='Download wird';                                    // file_is_alive
 filebase_to[2]='404';                            // file_is_dead
 filebase_to[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 filebase_to[4]="//a[contains(@href,'filebase.to') and contains(@href,'files')]";  
 filebase_to[5]='dsdlhkhsgdsgdhskjhgd';
 
var addat_hu= new Array(6)   //http://addat.hu/47abfe32/hsh-hangov-xvid.part1.rar
 addat_hu[0]='addat\.hu\/(?:\d*)'; //name and search string in link to get description
 addat_hu[1]='free_download';                                    // file_is_alive
 addat_hu[2]='Sajnáljuk, de a keresett fájl nem található.';                            // file_is_dead
 addat_hu[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 addat_hu[4]="//a[contains(@href,'addat.hu')]";  
 addat_hu[5]='dsdlhkhsgdsgdhskjhgd';



var bitroad_net= new Array(6)   //http://bitroad.net/download/6b440b200685/ruby-warw.avi.html
 bitroad_net[0]='bitroad\.net\/download\/(?:.*?)/(?:.*?)\.html';      //name and search string in link to get description
 bitroad_net[1]='File Size';                            // file_is_alive
 bitroad_net[2]='not found';                            // file_is_dead
 bitroad_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 bitroad_net[4]="//a[contains(@href,'bitroad.net') and contains(@href,'download')]";  
 bitroad_net[5]='dsdlhkhsgdsgdhskjhgd';

var vip_file_com= new Array(6)  //http://vip-file.com/download/7baaff893275/coa-tgg-xvid-IRFree.com.avi.html
 vip_file_com[0]='vip-file\.com\/download\/(?:.*?)/(?:.*?)\.html'; //name and search string in link to get description
 vip_file_com[1]='Description';                                    // file_is_alive
 vip_file_com[2]='This file not found';                            // file_is_dead
 vip_file_com[3]='dsdlhkhsgdsgdhskjhgd';                                            // no download slots or temporarily unavailable or servererror
 vip_file_com[4]="//a[contains(@href,'vip-file.com') and contains(@href,'download')]";  
 vip_file_com[5]='dsdlhkhsgdsgdhskjhgd'; 
 
var filenavi_com= new Array(6)  //http://www.filenavi.com/direct/77916e8f0181a71d2695d3c3196b30a3
 filenavi_com[0]='filenavi\.com\/direct\/(?:\w*)';  //name and search string in link to get description
 filenavi_com[1]='file_name';                       // file_is_alive
 filenavi_com[2]='삭제된';                            // file_is_dead
 filenavi_com[3]='dsdlhkhsgdsgdhskjhgd';            // no download slots or temporarily unavailable or servererror
 filenavi_com[4]="//a[contains(@href,'filenavi.com') and contains(@href,'direct')]";  
 filenavi_com[5]='dsdlhkhsgdsgdhskjhgd'; 
 
var data_hu= new Array(6)  //http://data.hu/get/1363057/portablekeyboard_music_2.4.rar
 data_hu[0]='data\.hu\/get\/(?:\w*)';       //name and search string in link to get description
 data_hu[1]='downlayout';                           // file_is_alive
 data_hu[2]='error_box';                            // file_is_dead
 data_hu[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 data_hu[4]="//a[contains(@href,'data.hu') and contains(@href,'get')]";  
 data_hu[5]='dsdlhkhsgdsgdhskjhgd'; 
   
var letitbit_net= new Array(6)  //http://letitbit.net/download/a884f3171672/Hero.S03E19.avi.html
 letitbit_net[0]='letitbit\.net\/download\/(?:\w*)';     //name and search string in link to get description
 letitbit_net[1]='dlBlock';                              // file_is_alive
 letitbit_net[2]='not found';                            // file_is_dead
 letitbit_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]";  
 letitbit_net[5]='dsdlhkhsgdsgdhskjhgd'; 

var zshare_net= new Array(6)  //http://www.zshare.net/video/567993565c0c9478/
 zshare_net[0]='zshare\.net\/(?:(?:download)|(?:video)|(?:audio))\/(?:\w*)';       //name and search string in link to get description
 zshare_net[1]='File Name';                              // file_is_alive
 zshare_net[2]='File Not Found';                            // file_is_dead
 zshare_net[3]='dsdlhkhsgdsgdhskjhgd';                 // no download slots or temporarily unavailable or servererror
 zshare_net[4]="//a[contains(@href,'zshare.net/video') or contains(@href,'zshare.net/download') or contains(@href,'zshare.net/audio')]";  
 zshare_net[5]='dsdlhkhsgdsgdhskjhgd'; 
    
var http_file_hosts=[netload_in,filebox_com,easy_share_com,mediafire_com,megashares_com,rapidshare_de,depositfiles_com,vip_file_com,yourfilehost_com,sendspace_com,filebase_to,addat_hu,bitroad_net,filenavi_com,data_hu,letitbit_net,zshare_net];

/*is this faster ?  var lianks = document.getElementsByTagName('a'); for (var i = links.length - 1; i >= 0; i--) { }  var lianks = document.getElementsByTagName('a');*/

var lianks = document.evaluate(netload_in[4]+'|'+filebox_com[4]+'|'+easy_share_com[4]+'|'+mediafire_com[4]+'|'+megashares_com[4]+'|'+depositfiles_com[4]+'|'+vip_file_com[4]+'|'+sendspace_com[4]+'|'+yourfilehost_com[4]+'|'+rapidshare_de[4]+'|'+filebase_to[4]+'|'+addat_hu[4]+'|'+bitroad_net[4]+'|'+filenavi_com[4]+'|'+data_hu[4]+'|'+letitbit_net[4]+'|'+zshare_net[4] ,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

if (lianks.snapshotLength > 0){
	addstyle();
	 if ( lianks.snapshotLength > 200 ){ checktill = "200";}else{checktill = lianks.snapshotLength;}

for (var y = 0; y < checktill; y++) {

	var link = lianks.snapshotItem(y);	

	     for (var i=0; i<http_file_hosts.length; i++) {
	     	//GM_log(http_file_hosts[i][0]+' +++ '+link.href);
    if ( (link.href.match(http_file_hosts[i][0])) && (!(link.href.match(/google\./))) && (!(link.href.match(/cache:/))) ){
//http://userscripts.org/scripts/show/24953/Universal Links Checker: http://74.125.77.132/search?q=cache:2NdfxMpTIvUJ:depositfiles.com/en/files/282791/FIFA.07-RELOADED.part02.rar.html+depositfiles.com/en/files+300&hl=el&ct=clnk&cd=3&gl=gr&client=firefox-a
    	//GM_log(http_file_hosts[i][0]+' +++ '+link.href);
           var URL                                          = link.href.replace(/http:\/\/anonym\.to\/\?http:\/\//,'http://');    	
           //var URL                                          = link.href;
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
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', }, //headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
onload: function(responseDetails) {

//GM_log(URL);	
//GM_log(responseDetails.responseText);	

if (responseDetails.status == 403 || responseDetails.status == 404 ){
	DiplayTheNDSTUSERROR(URL);
	}
//GM_log(responseDetails.status);	
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






function linkify(){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{
//dk|com|net|org|se|no|nl|us|uk|de|it|nu|edu|info
//var regex = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h\*\*p)((?:\:\/\/www\.megaupload\.com\/\?d=.*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/rapidshare\.de\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]))/ig;
//var regex = /http:\/\/(netload\.in\/date|filebox\.com\/|w\d\d\.easy-share\.com|depositfiles|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|(www\.|)megaupload\.com|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
//var regex = /http:\/\/(netload\.in\/date|filebox\.com\/|w\d\d\.easy-share\.com|depositfiles|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
var regex = /http:\/\/(netload\.in\/date|filebox\.com\/|w\d\d\.easy-share\.com|filebase\.to\/files|addat\.hu\/|depositfiles\.com\/files\/|bitroad\.net\/download\/|vip-file\.com\/download\/|www.filenavi\.com\/direct\/|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|data\.hu\/get\/|www\.zshare\.net\/|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;


var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links

//var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links
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