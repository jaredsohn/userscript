// ==UserScript==
// @name IMDB Pirated Version
// @namespace http://userscripts.org/scripts/show/21977
// @version  20140203
var version="20120105";
// @description    IMDB.com enhancer for pirates
// @include        http://*.imdb.com/title/tt*
// @include        http://imdb.com/title/tt*
// @exlude         http://*imdb.com/*/board*
// @author         hosts (http://userscripts.org/users/hosts)
// @contributor    queeup (http://userscripts.org/users/76449)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==

// code corrections and h33t addition from queeup http://userscripts.org/users/76449

//---------------------------------------------------------------------------//
///////////////////////// START OF USER CONFIGURATION /////////////////////////
//---------------------------------------------------------------------------//


auto_check_for_a_new_version = 'yes';             //if yes will check each 10 days for a new version
showtrailer_on_imdb_directly_if_possible = 'yes';


//---------------------------------------------------------------------------//
////////////////////////// END OF USER CONFIGURATION //////////////////////////
//---------------------------------------------------------------------------//

  var debug = "nottrue";

// the ajax image
imgdata='data:;base64,'+
'R0lGODlhEAAQAPIAAP/3hQAAAMK8ZUJAIgAAAGJfM4J+RJKNTCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWph'+
'eGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkY'+
'DAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZ'+
'siUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp'+
'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5'+
'TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh'+
'+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJ'+
'CgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAA'+
'LAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';  

  var regexImdbNum = /\/title\/tt(\d{7})\//;
  var arrImdbNum = regexImdbNum.exec(document.location);
  var regexTitle = /(.*) \((.*)(\d{4}|\?{4}).*\)(.*)/;
  var strTitle = document.getElementsByTagName("title")[0].textContent;
  strTitle = strTitle.replace(/"/g,'')
  var MovieName = regexTitle.exec(strTitle);
  if(!(window.opera)){
  MovieName[1] = MovieName[1].replace(/(.*?)(?:, )(Les$|La$|Det$|Der$|Das$|Le$|El$|The$)/g,'$2 $1');
}
  MovieName[1] = MovieName[1].replace(/ /g,'%20');
  MovieName[1] = MovieName[1].replace(/:/g,'%20');
  MovieName[1] = MovieName[1].replace(/%20%20/g,'%20');

imdbID = arrImdbNum[1];
year = MovieName[3];
moviename = MovieName[1];
moviename = moviename.replace(/^IMDb%20-%20/g, ""); 

//--------------------------------------------
// about thumb images on the video to do an if trailer TODO
var allImages = document.evaluate('//a[contains(@href, "/gallery/")]/img[contains(@src, "/th-")]|'+
                                  '//a[contains(@href, "/photogallery")]/img[contains(@src, "/th-")]|'+
                                  '//a[contains(@href, "/gallery")]/img[contains(@src, "p.")]|'+
                                  '//a[contains(@href, "/photogallery")]/img[contains(@src, "p.")]|'+
                                  '//a[contains(@href, "/media")]/img[contains(@src, "._V")]',
                                  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=allImages.snapshotLength-1; i>=0; i--){
  var thisImage = allImages.snapshotItem(i);
  if (thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("/")+1) + thisImage.src.substring(thisImage.src.lastIndexOf("/")+4, thisImage.src.length)
   && thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("._")+2) + "SY400_SX600_.jpg"
   && thisImage.src != thisImage.src.substring(0, thisImage.src.lastIndexOf("/")+3) + "f.jpg"){
}
}

if(allImages.snapshotLength > 0){
 if (thisImage.src){
   var lastimagesrc = thisImage.src.replace(/http:/,'http%3A');
   var lastimagesrc = lastimagesrc.replace(/\,\d*_SS\d*_.jpg/,',SY400_SX600_.jpg');
   var lastimagesrc = lastimagesrc.replace(/_SY140_SX100_.jpg/,'_SY400_SX600_.jpg');
   var lastimagesrc = lastimagesrc.replace(/_CR\d*,0,\d*,\d*_SS90_\.jpg/,'_SY400_SX600_.jpg');
                                        
  }
}
// about thumb images on the video
//----------------------------------

//correct the new sept 2008 design
GM_addStyle('map{display: inline;}');
//correction for torrentz fonts
GM_addStyle('#tn15torrentz td{font-size:11px !important}');
GM_addStyle('#content-2-wide.redesign, #content-1.redesign {padding-top:0 !important;}');
if (document.getElementById('content-2-wide')){
	GM_addStyle('#tn15torrentz {margin-left:auto;margin-right:auto;width:942px; margin-top:2px; }');
}else{
	GM_addStyle('#tn15torrentz {margin-left:auto;margin-right:auto;width:840px; margin-top:2px; }');
	}
// some ads removal making it cleaner
RemoveAds();    
function RemoveAds(){
var ads1 = document.getElementById('tn15adrhs');
if (ads1) {
		
	videodiv = document.createElement("div");
	videodiv.setAttribute("id","adremovedvideospace");
	ads1.parentNode.insertBefore(videodiv,ads1.nextSibling);


var  adremovedvideospacecss = '\
#adremovedvideospace {\
background:#FFFFFF none repeat scroll 0 0;\
border-left:9px solid #FFFFFF;\
color:black;\
float:right;\
text-align:left;\
z-index:100;\
width: 323px;\
padding-bottom:10px;\
}\
';

	GM_addStyle(adremovedvideospacecss);

	if (document.getElementById('adremovedvideospace')){
		var adtoremove = document.getElementById('adremovedvideospace').nextSibling.nextSibling.nextSibling;
		adtoremove.parentNode.removeChild(adtoremove);
	}
	if (ads1) {    ads1.parentNode.removeChild(ads1);    }

	}else{
	videodiv = document.createElement("div");
	videodiv.setAttribute("id","adremovedvideospace");
	videodiv.setAttribute("class","article");
	
		if(document.getElementById('main')){		
			ads1=document.getElementById('main').children[0];
			ads1.parentNode.insertBefore(videodiv,ads1.nextSibling);
		}
		
		if(document.getElementById('maindetails_center_bottom')){		
			//ads1=document.getElementById('maindetails_center_bottom').children[0];
			//ads1.parentNode.insertBefore(videodiv,ads1.nextSibling);
					if(document.getElementById('tn15rating')){
						var User_Rating = document.getElementById('tn15rating');
						}else if(document.getElementById('director-info')){
						var User_Rating = document.getElementById('director-info');	
							}else{
						var User_Rating = document.getElementById('title-overview-widget-layout');	
						videodiv.setAttribute("style","float: left;");		
								}
			addElementAfter(User_Rating,videodiv);
			
		}		

		}
	
	var ads2 = document.getElementById('tn15shopbox');

	if (ads2) {     ads2.parentNode.removeChild(ads2);    }  
  

// thanks to imdb.com Cleaner http://userscripts.org/scripts/show/5149       

 var patterns = new Array(
     "//div[@id='floating1_wrapper']",
 	 "//iframe[@id='top_ad']",
	 "//div[@id='supertab']",
     "//div/div[3]/div[3]/a/img",
     "//layer/div[2]/div/div[3]/div[3]/a[1]",
     "//div[@id='sponsored_links_afc_div_MIDDLE_CENTER']",
	 "//div[@id='sponsored_links_afc_div_middle_center']",
     "//div[@id='nb15supertab']",
     "//div[@id='tn15']/div[@id='tn15lhs']/iframe",
     "//div[@id='tn15bot']/div/center/iframe",
     "id('tn15bot')/div/div/iframe",
     "//div[@id='swf_728x90']",
     "//div[@id='wrapper']/div[1]/script",
     "//div[@id='wrapper']/div[1]/iframe",
     "//div[@id='wrapper']/script",
     "//div[@id='wrapper']/iframe",
     "//div[@id='wrapper']/div[@id='root']/div[@class='maindetails' and @id='tn15']/div[@id='tn15main']/div[@class='wide' and @id='tn15content']/div[@id='tn15bot']/div[@class='right' and position()=1]/div/iframe",
     "//div[@id='wrapper']/div[3]/script",
     "//div[@id='wrapper']/div[3]/iframe",
     "id('amazoncontent')",
     "//div[contains(@id, 'lea')]",
     "//a[contains(@href, 'servedby.advertising.com')]",
     "//a[contains(@href, 'eyewonderlabs.com')]",
     "//iframe[contains(@src, 'servedby.advertising.com')]",
     "//iframe[@name = 'kanoodleAd']/ancestor::div[1]",
     "//map[@name = 'AtlasAltMap']/ancestor::div[1]"
 );
 var results;
 for (var i = 0; i < patterns.length; i++) {
     results = document.evaluate(patterns[i], document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     for (var j = 0; j < results.snapshotLength; j++) {		 
            node = results.snapshotItem(j);
            node.parentNode.removeChild(node);
            }
 }
}

// some ads removal making it cleaner end

// add a PIRATED VERSION under logo

Add_a_PIRATED_VERSION_under_logo();
function Add_a_PIRATED_VERSION_under_logo(){
espan = document.createElement("span");
espan.setAttribute("id","pyratedlogospan");
espan.appendChild(document.createTextNode("Pirated Version"));

if (document.getElementById("home_img_holder")){	
	document.getElementById("home_img_holder").appendChild(espan);
	GM_addStyle('#pyratedlogospan {color:#E5CF3E; position: absolute; left: 43px; font-weight: bold; font-family: Arial; font-size: 10px; bottom:-2px; opacity:0.8;} ');	
  }

}
// add a PIRATED VERSION under logo end

GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');
GM_addStyle('img#PleaseWaitForVcdQuality{  display: none;}');
GM_addStyle('img#PleaseWaitForSubs{  display: none;}');
GM_addStyle('img#PleaseWaitForRapidshare{  display: none;}');
GM_addStyle('img#PleaseWaitForOtherhosts{  display: none;}');
// language  part 1
if (GM_getValue("language")){
var what_language_do_you_want_to_search_for = GM_getValue("language");
}else{
var what_language_do_you_want_to_search_for = "eng";
GM_setValue("language", "eng");
	};

if (GM_getValue("SharedHttpFiles")){
var what_SharedHttpFiles_do_you_want_to_search_for = GM_getValue("SharedHttpFiles");
}else{
var what_SharedHttpFiles_do_you_want_to_search_for = "rap";
GM_setValue("SharedHttpFiles", "rap");
	};	


//flag images 
var do_you_want_the_subtitles_box = true;
if (do_you_want_the_subtitles_box) {

allflags_png = 'data:image/png;base64,'+
'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'+
'ZofgnA+6AAAAAElFTkSuQmCC';


GM_addStyle('.flag {display: inline;background:transparent url('+allflags_png+') no-repeat scroll 0%;height:12px;margin-right:3px;width:18px;}');
//var what_language = what_language_do_you_want_to_search_for.slice(0,what_language_do_you_want_to_search_for.length-1);
var what_language = what_language_do_you_want_to_search_for;

var myFlagArray = {
"ara" : "{background-position:-18px 0px;}",
"ass" : "{background-position:0px 0px;}",
"bul" : "{background-position:-54px 0px;}",
"bos" : "{background-position:-36px 0px;}",
"cat" : "{background-position:-90px 0px;}",
"cze" : "{background-position:-72px 0px;}",
"dan" : "{background-position:-108px 0px;}",
"ger" : "{background-position:-126px 0px;}",
"eng" : "{background-position:-144px 0px;}",
"spa" : "{background-position:-162px 0px;}",
"est" : "{background-position:-180px 0px;}",
"per" : "{background-position:-198px 0px;}",
"fin" : "{background-position:-216px 0px;}",
"fre" : "{background-position:-234px 0px;}",
"gre" : "{background-position:-252px 0px;}",
"ell" : "{background-position:-252px 0px;}",
"heb" : "{background-position:-270px 0px;}",
"hrv" : "{background-position:-288px 0px;}",
"hun" : "{background-position:-306px 0px;}",
"arm" : "{background-position:-324px 0px;}",
"ind" : "{background-position:-342px 0px;}",
"ice" : "{background-position:-360px 0px;}",
"ita" : "{background-position:-378px 0px;}",
"jpn" : "{background-position:-396px 0px;}",
"geo" : "{background-position:-414px 0px;}",
"kaz" : "{background-position:-432px 0px;}",
"kor" : "{background-position:-450px 0px;}",
"ltz" : "{background-position:-468px 0px;}",
"lit" : "{background-position:-486px 0px;}",
"lav" : "{background-position:-504px 0px;}",
"mac" : "{background-position:-522px 0px;}",
"dut" : "{background-position:-540px 0px;}",
"nor" : "{background-position:-558px 0px;}",
"pob" : "{background-position:-576px 0px;}",
"pol" : "{background-position:-594px 0px;}",
"por" : "{background-position:-612px 0px;}",
"rum" : "{background-position:-630px 0px;}",
"rus" : "{background-position:-648px 0px;}",
"slo" : "{background-position:-666px 0px;}",
"slv" : "{background-position:-684px 0px;}",
"alb" : "{background-position:-702px 0px;}",
"scc" : "{background-position:-720px 0px;}",
"swe" : "{background-position:-738px 0px;}",
"tha" : "{background-position:-756px 0px;}",
"tur" : "{background-position:-774px 0px;}",
"ukr" : "{background-position:-792px 0px;}",
"vie" : "{background-position:-810px 0px;}",
"chi" : "{background-position:-828px 0px;}",
"un" : "{background-position:-846px 0px;}",
"glg" : "{background-position:-864px 0px;}"}; 

// missing flags 
//"Hindi" href="hin"><div class="flag hi"> 
//"Malay" href="may"><div class="flag ms">

GM_addStyle('.'+what_language +' '+myFlagArray[what_language]);

var what_SharedHttpFiles = what_SharedHttpFiles_do_you_want_to_search_for;
GM_addStyle('.SharedHttpFiles {display: inline;height:12px;margin-right:3px;width:18px;}');	
}

var langselect = "<div class='flag "+what_language+"' style='font-size:80%;'><SELECT NAME='gourl' id=selected>"+
"<option value='all'>ALL"+
"<option value='alb'>Albanian"+
"<option value='ara'>Arabic"+
"<option value='arm'>Armenian"+
"<option value='ass'>Assyrian"+
"<option value='bos'>Bosnian"+
"<option value='bul'>Bulgarian"+
"<option value='cat'>Catalan"+
"<option value='chi'>Chinese"+
"<option value='hrv'>Croatian"+
"<option value='cze'>Czech"+
"<option value='dan'>Danish"+
"<option value='dut'>Dutch"+
"<option value='eng'>English"+
"<option value='est'>Estonian"+
"<option value='per'>Farsi"+
"<option value='fin'>Finnish"+
"<option value='fre'>French"+
"<option value='glg'>Galician"+
"<option value='geo'>Georgian"+
"<option value='ger'>German"+
"<option value='ell'>Greek"+
"<option value='heb'>Hebrew"+
"<option value='hin'>Hindi"+
"<option value='hun'>Hungarian"+
"<option value='ice'>Icelandic"+
"<option value='ind'>Indonesian"+
"<option value='ita'>Italian"+
"<option value='jpn'>Japanese"+
"<option value='kaz'>Kazakh"+
"<option value='kor'>Korean"+
"<option value='lav'>Latvian"+
"<option value='lit'>Lithuanian"+
"<option value='ltz'>Luxembourgish"+
"<option value='mac'>Macedonian"+
"<option value='may'>Malay"+
"<option value='nor'>Norwegian"+
"<option value='pol'>Polish"+
"<option value='por'>Portuguese"+
"<option value='pob'>Portuguese-BR"+
"<option value='rum'>Romanian"+
"<option value='rus'>Russian"+
"<option value='scc'>Serbian"+
"<option value='slo'>Slovak"+
"<option value='slv'>Slovenian"+
"<option value='spa'>Spanish"+
"<option value='swe'>Swedish"+
"<option value='tha'>Thai"+
"<option value='tur'>Turkish"+
"<option value='ukr'>Ukrainian"+
"<option value='vie'>Vietnamese"+
"</SELECT></div>";

GM_addStyle('select#selected{cursor:pointer; opacity: 0; width:18px; background:white;}');
GM_addStyle('select#selected > option{border:thin none;padding:-1px 3px;width:89px;background:PaleGoldenrod none repeat scroll 0%;margin:1px;}');

var SharedHttpFilesSelect = "<div class='SharedHttpFiles "+what_SharedHttpFiles+"' style='font-size:80%;'><SELECT NAME='gourl' id=SharedHttpFilesId>"+
"<option value='all'>all shared"+
"<option value='all2'>all shared 2"+
"<option value='singlelink'>single link"+
"<option value='singlelink2'>single link 2"+
"<option value='rapidshare'>rapidshare"+
"<option value='rapidshare2'>rapidshare 2"+
"<option value='megaupload'>megaupload"+
"<option value='megaupload2'>megaupload 2"+
"<option value='hotfile'>hotfile"+
"<option value='hotfile2'>hotfile 2"+
"<option value='filefactory'>filefactory"+
"<option value='ed2k'>ed2k"+
"<option value='watch_online'>watch online"+
"<option value='uploaded.to'>uploaded.to"+
"<option value='badongo.com'>badongo.com"+
"<option value='depositfiles.com'>depositfiles.com"+
"<option value='megashares'>megashares.com"+
"<option value='binfile.org'>binfile.org"+
"<option value='bluehost.to'>bluehost.to"+
"<option value='ftp2share.com'>ftp2share"+
"<option value='mytempdir'>mytempdir"+
"<option value='jabello.com'>jabello.com"+
"<option value='media.filecabi.net'>media.filecabi.net"+
"<option value='primeupload.com'>primeupload.com"+
"<option value='rsprotect.com'>rsprotect.com"+
"<option value='sprintshare.com'>sprintshare.com"+
"<option value='up.9q9q.net'>up.9q9q.net"+
"<option value='zupload.com'>zupload.com"+
"<option value='4filehosting.com'>4filehosting.com"+
"<option value='4shared.com'>4shared.com"+
"<option value='4shared.com'>4shared.com"+
"<option value='allyoucanupload.webshots.com'>allyoucanupload.webshots.com"+
"<option value='arabsoftware.net'>arabsoftware.net"+
"<option value='arbup.org'>arbup.org"+
"<option value='archive.org'>archive.org"+
"<option value='bravoshare.com'>bravoshare.com"+
"<option value='datapickup.com'>datapickup.com"+
"<option value='datenklo.net'>datenklo.ne"+
"<option value='divshare.com'>divshare.com"+
"<option value='f-forge.com'>f-forge.com"+
"<option value='fileblob.com'>fileblob.com"+
"<option value='filecabi.net'>filecabi.net"+
"<option value='filedepartment.com'>filedepartment.com"+
"<option value='filedepartment.com'>filedepartment.com"+
"<option value='fileflyer.com'>fileflyer.com"+
"<option value='filehd.com'>filehd.com"+
"<option value='filehd.com'>filehd.com"+
"<option value='fileho.com'>fileho.com"+
"<option value='filehostia.com'>filehostia.com"+
"<option value='filelodge.com'>filelodge.com"+
"<option value='filesend.net'>filesend.net"+
"<option value='filesupload.com'>filesupload.com"+
"<option value='filesupload.com'>filesupload.com"+
"<option value='fileupyours.com'>fileupyours.com"+
"<option value='fyad.org'>fyad.org"+
"<option value='gigashare.com'>gigashare.com"+
"<option value='glintfiles.net'>glintfiles.net"+
"<option value='axifile'>axifile.com"+
"<option value='cocoshare'>cocoshare.cc"+
"<option value='easy-share'>easy-share.com"+
"<option value='egoshare'>egoshare.com"+
"<option value='filefront'>filefront.com"+
"<option value='flyupload'>flyupload.com"+
"<option value='ftpz.us'>ftpz.us"+
"<option value='gigasize'>gigasize.com"+
"<option value='mediafire'>mediafire.com"+
"<option value='MegaShare'>MegaShare.com"+
"<option value='putfile'>putfile.com"+
"<option value='ripway'>ripway.com"+
"<option value='rogepost'>rogepost.com"+
"<option value='sendmefile'>sendmefile.com"+
"<option value='speedyshare'>speedyshare.com"+
"<option value='uploading'>uploading"+
"<option value='uploadyourfiles'>uploadyourfiles"+
"<option value='urlcash'>urlcash"+
"<option value='webfile'>webfile"+
"<option value='yourfilehost'>yourfilehost"+
"<option value='zippyvideos'>zippyvideos"+
"<option value='come2store'>come2store.com"+
"<option value='35mb'>35mb"+
"<option value='file2you'>file2you.net"+
"<option value='yousendit'>yousendit.com"+
"<option value='uploadr'>uploadr"+
"<option value='slil.ru'>slil.ru"+
"<option value='bigupload'>bigupload.com"+
"<option value='sendspace'>sendspace.com"+
"<option value='hyperupload.com'>hyperupload.com"+
"<option value='icefile.com'>icefile.com"+
"<option value='icefile.net'>icefile.net"+
"<option value='icefile.org'>icefile.org"+
"<option value='illhostit.com'>illhostit.com"+
"<option value='keepmyfile.com'>keepmyfile.com"+
"<option value='live-share.com'>live-share.com"+
"<option value='live-share.com'>live-share.com"+
"<option value='looler.com'>looler.com"+
"<option value='maxishare.net'>maxishare.ne"+
"<option value='megadownload.net'>megadownload.net"+
"<option value='megadownload.net'>megadownload.net"+
"<option value='megafileupload.com'>megafileupload.com"+
"<option value='mfile3.com'>mfile3.com"+
"<option value='miniuploads.com'>miniuploads.com"+
"<option value='misterupload.com'>misterupload.com"+
"<option value='mooload.com'>mooload.com"+
"<option value='myfilestash.com'>myfilestash.com"+
"<option value='oxyshare.com'>oxyshare.com"+
"<option value='perushare.com'>perushare.com"+
"<option value='pushfile.net'>pushfile.net"+
"<option value='quickdump.com'>quickdump.com"+
"<option value='quicksharing.com'>quicksharing.com"+
"<option value='rapidfile.net'>rapidfile.net"+
"<option value='rapidshare.de'>rapidshare.de"+
"<option value='savefile.com'>savefile.com"+
"<option value='savefile.info'>savefile.info"+
"<option value='scambia.com'>scambia.com"+
"<option value='share-online.biz'>share-online.biz"+
"<option value='sharebigfile.com'>sharebigfile.com"+
"<option value='sharingmatrix.com'>sharingmatrix.com"+
"<option value='spread-it.com'>spread-it.com"+
"<option value='storeandserve.com'>storeandserve.com"+
"<option value='supasic.com'>supasic.com"+
"<option value='thefilebucket.com'>thefilebucket.com"+
"<option value='thefilebucket.com'>thefilebucket.com"+
"<option value='transferbigfiles.com'>transferbigfiles.com"+
"<option value='turboupload.com'>turboupload.com"+
"<option value='ultrashare.de'>ultrashare.de"+
"<option value='up-x.info'>up-x.info"+
"<option value='up.li.ru'>up.li.ru"+
"<option value='up.spbland.ru'>up.spbland.ru"+
"<option value='upitus.com'>upitus.com"+
"<option value='upload.pk'>upload.pk"+
"<option value='upload02.uploadpk.com'>upload02.uploadpk.com"+
"<option value='upload2.net'>upload2.net"+
"<option value='upload2.net'>upload2.net"+
"<option value='uploadcomet.com'>uploadcomet.com"+
"<option value='uploadhut.com'>uploadhut.com"+
"<option value='uploadpalace.com'>uploadpalace.com"+
"<option value='uploadpalace.com'>uploadpalace.com"+
"<option value='uploadsend.com'>uploadsend.com"+
"<option value='uppit.com'>uppit.com"+
"<option value='us.archive.org'>us.archive.org"+
"<option value='ushareit.com'>ushareit.com"+
"<option value='verzend.be'>verzend.be"+
"<option value='vietsharing.us'>vietsharing.us"+
"<option value='viprasys.com'>viprasys.com"+
"<option value='w-n-n.com'>w-n-n.com"+
"<option value='webfilehost.com'>webfilehost.com"+
"<option value='wtfhost.com'>wtfhost.com"+
"<option value='wtfhost.com'>wtfhost.com"+
"<option value='yofreespace.com'>yofreespace.com"+
"<option value='youploadit.com'>youploadit.com"+
"<option value='yousendit.com'>yousendit.com"+
"<option value='zshare'>zshare.net/download"+
"</SELECT></div>";

GM_addStyle('select#SharedHttpFilesId{cursor:pointer; opacity: 0.9; width:102px; background:white;}');
GM_addStyle('select#SharedHttpFilesId > option{border:thin none;padding:-1px 3px;width:89px;background:PaleGoldenrod none repeat scroll 0%;margin:1px;}');
GM_addStyle('select#SharedHttpFilesId{background:white none repeat scroll 0 0; color:black; cursor:pointer; height:21px; left:4px; opacity:0.8; position:relative; top:0; width:117px;}');

//imageWithControls = "http://i27.tinypic.com/33xjva1.gif";
imageWithControls = 'data:image/gif;base64,'+
'R0lGODlhHwANAOZ3AMqpMM+vMs6vMuzcPvDgQuDJOuzcQNG1NeTRPOTRO9a7Nu/gQsmqMPDhQvHg'+
'QuTQO9a8NsmrMO3cPtrCOM6vMfbsfdG1NNrEcc2vMe3bPs6vMOzaPvv4y+DJOebXm/DnxuTQPNvD'+
'OOzbPuzbQNO4MeLOO9i/N+fUPNG1M9K2St/JOtC1Nv/++/7++9W7NsmpLvHhQuTPPPjwl+3cQIR6'+
'J0Y+Gd/KOWdfIY1/KGtdHzs3FzgyFu3bQejWPuDKOsy8N9/JOc/BOHxvJL+qMpKHKsCzNp6QLO3d'+
'PujXPrefMKOYL7efLtvCN3psI9G2M+3bQM6wMrykMamPK3JmIunWPtvCOM6wMYJ2J8i2Nn9zJZCD'+
'KuDKOSwoFJSDKY96JdrCN4RzJOTPO82vMs+vMdvBONrDOMSwNMCqMm9jIXdoI8qqMM+vMOjWPXZs'+
'JM2wMsmpMEQ8GO/hQunWPcusOPPlSfLkQhEQDv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
'BAEAAHcALAAAAAAfAA0AAAf/gCwcdISFhoQViYeLdBwsMnWRkpOSd5aUmJEyGw5xC3GgCwQNCw2g'+
'lncEMHEEnaasMAsOGydHBkVKAyIjGRIGEiIDqAYZBjMzAzxBAwNPIxInIEhyNHZ2bT9y2tuo29s3'+
'dkRUPXJsICUxCVfW1jpGCAkxD6hhCQkICFrsWAgPDyUqChTIwq7gFDNbUHUo0AEIjoJ2CviwoWLC'+
'BDJCIFpDcyYEqi9VmAzRyCVEmQkmXEBoUnBHFwUwIaByoSCKRms1IJggccBJGms5kliwgOLAARSo'+
'LBwAA6epU6dLSKwIQEGKFwxWoGjQgCGAAAqo1lAN4FWAADcCMIgZs8IDgBcAKN68iRBBLoO4DFAB'+
'UPMGAF4Gdd/A9dDiQ4o5iBMrnnOh8eLHKT60CAQAOw== ';

GM_addStyle('.control { margin:2px 7px -1px 0pt; background-color:PaleGoldenrod; border=0; font-weight: bold; font-family: Tahoma; font-size: 12px;} ');

if (debug == "true"){
GM_addStyle('* {margin: 0;padding: 0;border: 1px dotted peachPuff;} ');
}

GM_addStyle('#TorrentzResultsRHere { -moz-border-radius-topleft:11px;-moz-border-radius-topright:11px;background-color:PaleGoldenrod;font-family:Tahoma;font-size:11px;font-weight:bold;margin:0 13px;padding:1px 9px;position:fixed;text-align:center;position:absolute;} ');
GM_addStyle('#VcdqualityResultsRHere { background:transparent url(/images/tn15/lhs_selected_bgd.gif);font-family:Tahoma; -moz-border-radius-bottomleft:4px; -moz-border-radius-bottomright:4px; font-size:11px;font-weight:bold;margin:0px 0pt 3px;padding:0px 4px;position:absolute;right:14%;text-align:center;} ');
GM_addStyle('#VcdqualityResultsRHere a:link{ color:white; text-decoration:none;}');
GM_addStyle('#SubsResultsRHere { background:transparent url(/images/tn15/messageboard_header_bgd.gif) repeat-x scroll 0 0;font-family:Tahoma; -moz-border-radius-bottomleft:4px; -moz-border-radius-bottomright:4px; font-size:11px;font-weight:bold;margin:0px 0pt 3px;padding:0px 4px;position:absolute;right:20%;text-align:center;} ');


var div_tn15torrentz = document.createElement("div");

if(document.getElementById('tn15content')){
	//old design
var main = document.getElementById('tn15content');
}else{
	//new design
var main = document.getElementById('maindetails_center_top');
div_tn15torrentz.setAttribute('class', 'article');
}




div_tn15torrentz.id = "tn15torrentz";

var div_tn15torrentz_innerHTML = 
"<div class='strip toplinks'><b class='ch5'>Torrents</b> <img border='0' class='control' src='"+imageWithControls+"' usemap='#Maptorrent'> "+
"<map name='Maptorrent'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizetorrent' ALT='Get Torrents' TITLE='Get Torrents'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizetorrent' ALT='Close Torrents' TITLE='Close Torrents'>"+
"</map>"+	
"<b class='ch5'>Scene</b> <img border='0' class='control' src='"+imageWithControls+"' usemap='#MapVcdquality'> "+
"<map name='MapVcdquality'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizeVcdquality' ALT='Get Vcdquality' TITLE='Get Vcdquality'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizeVcdquality' ALT='Close Vcdquality' TITLE='Close Vcdquality'>"+
"</map>"+	
"<b class='ch5'>"+langselect+"Subs</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapSubs'> "+
"<map name='MapSubs'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizeSubs' ALT='Get Subtitles' TITLE='Get Subtitles'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizeSubs' ALT='Close Subtitles' TITLE='Close Subtitles'>"+
"</map>"+
"<b class='ch5'><!--Files@!-->"+SharedHttpFilesSelect+"</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapSharedHttpFiles'> "+
"<map name='MapSharedHttpFiles'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizeSharedHttpFiles' ALT='Get SharedHttpFiles' TITLE='Get SharedHttpFiles'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizeSharedHttpFiles' ALT='Close SharedHttpFiles' TITLE='Close SharedHttpFiles'>"+
"</map>"+
"<!--b class='ch5'>Rapidshare</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapRapidshare' > "+
"<map name='MapRapidshare'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizehttprapidshare' ALT='Get files from rapidshare.com' TITLE='Get files from rapidshare.com'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizehttprapidshare' ALT='Close results from rapidshare.com' TITLE='Close results from rapidshare.com'>"+
"</map>"+
"<b class='ch5'>On Other Servers</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapOtherhosts'> "+
"<map name='MapOtherhosts'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizehttpother' ALT='Get files from http hosts' TITLE='Get files from megaupload mediafire uploaded.to megashares.com rapidshare.de depositfiles netload.in'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizehttpother' ALT='Close results from http hosts' TITLE='Close results from megaupload mediafire uploaded.to megashares.com rapidshare.de depositfiles netload.in'>"+
"</map-->";


//if (GM_getValue("viewmoviesonline")== true) {	
div_tn15torrentz_innerHTML += 
"<!--b class='ch5'>Watch Movie</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapWatchMovieOnline'> "+
"<map name='MapWatchMovieOnline'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizewatchmovieonline' ALT='Get files from http hosts' TITLE='Get links so you can watch the "+moviename+" movie online'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizewatchmovieonline' ALT='Close results from http hosts' TITLE='Close results'>"+
"</map-->";
//		}
		
div_tn15torrentz_innerHTML +=	
"<b class='ch5'><input id='trailersoption' type='checkbox' name='trailersoption' value='trailersoption'></b> "+	
"<b class='ch5'>Trailers</b> <img  border='0' class='control' src='"+imageWithControls+"' usemap='#MapTrailers' > "+
"<map name='MapTrailers'>"+
"<area class='aa3' id='makebig' shape='rect' coords='1,1,15,15' href='#maximizehttptrailers' ALT='Find more trailers' TITLE='Find more trailers'>"+
"<area class='aa2' id='makesmall' shape='rect' coords='16,1,31,15' href='#minimizehttptrailers' ALT='Close results for more trailers' TITLE='Close results for more trailers'>"+
"</map>";
	
div_tn15torrentz_innerHTML += 

"</div>"+
"<div id ='SpaceForTorrentResults' class='SpaceForTorrentResults'><img   id='PleaseWaitForTorrents' width='16' weight='16' src='"+imgdata+"' alt='Getting Results Please Wait' /></div>"+
"<div id ='SpaceForVCDQualityResults'  class='SpaceForVCDQualityResults'><img   id='PleaseWaitForVcdQuality' width='16' weight='16' src='"+imgdata+"' alt='Getting Results Please Wait' /></div></div>"+
"<div id ='SpaceForSubsResults'  class='SpaceForSubsResults'><img   id='PleaseWaitForSubs' width='16' weight='16' src='"+imgdata+"' alt='Getting Results Please Wait' /></div></div>"+  
"<div id ='SpaceForRapidshareResults'  class='SpaceForRapidshareResults'><img   id='PleaseWaitForRapidshare' width='16' weight='16' src='"+imgdata+"' alt='Getting Results Please Wait' /></div></div>"+  
"<div id ='SpaceForMoviesOnlineResults'  class='SpaceForMoviesOnlineResults'><img   id='PleaseWaitForOtherhosts' width='16' weight='16' src='"+imgdata+"' alt='Getting Results Please Wait' /></div></div>";        

div_tn15torrentz.innerHTML = div_tn15torrentz_innerHTML;

	

main.parentNode.insertBefore(div_tn15torrentz, main);

var TorrentAreas = document.getElementsByTagName('MAP')[0].areas;
var VcdqualityAreas = document.getElementsByTagName('MAP')[1].areas;
var SubsAreas = document.getElementsByTagName('MAP')[2].areas;
var SharedHttpFiles = document.getElementsByTagName('MAP')[3].areas;

if (document.getElementsByTagName('MAP')[4].name == 'MapTrailers'){
	var FindTrailersAreas = document.getElementsByTagName('MAP')[4].areas;
    }else{
	var WatchMoviesAreas = document.getElementsByTagName('MAP')[4].areas;
	addEventListeners(WatchMoviesAreas);
	var FindTrailersAreas = document.getElementsByTagName('MAP')[5].areas;		
	}

var ShowTrailers = document.getElementsByTagName('input');
addEventListeners(TorrentAreas);
addEventListeners(VcdqualityAreas);
addEventListeners(SubsAreas);
addEventListeners(SharedHttpFiles);
addEventListeners(ShowTrailers);
addEventListeners(FindTrailersAreas);

// for lang only SubsAreas start
var select = document.getElementsByTagName('select');
addlangselectEventListeners(select);

function addlangselectEventListeners(select){
	for (var i = select.length - 1; i >= 0; i--) {
	  if (select[i].id == 'selected'){
	  	 if(GM_getValue("language")){
	  		 for (var y = select[i].childNodes.length - 1; y >= 0; y--) {
	  			if (select[i].childNodes[y].value == GM_getValue("language")){
	  				select[i].childNodes[y].selected = true;
	  				}
	  		    }
	    	}
		  select[i].addEventListener("change", setlangselect, false);
	      }  
	  }
  }
function setlangselect(evt){
	var selectLANG = evt.target.options; // TRING TO GET THE FULLNAME of the lanuage from the short name
	for (var i = selectLANG.length - 1; i >= 0; i--) {
	
	if (evt.target.value == selectLANG[i].value){
		GM_setValue("FullNameLanguage", selectLANG[i].text); //Setting the value of FullNameLanguage
		}
	}
	if (evt.target.value){
			GM_setValue("language", evt.target.value);
	
// making changes in the div class=flag new)language
flagDiv = document.getElementById("selected").parentNode;
flagDiv.setAttribute('class', 'flag '+evt.target.value);	
// adding the new style for the new language
GM_addStyle('.'+evt.target.value +' '+myFlagArray[evt.target.value]);	
	}	
}
 
// for lang only SubsAreas end


// for lang only SharedHttpFiles start
var select2 = document.getElementsByTagName('select');

addSharedHttpFilesselectEventListeners(select);

function addSharedHttpFilesselectEventListeners(select){
	for (var i = select2.length - 1; i >= 0; i--) {
	  if (select2[i].id == 'SharedHttpFilesId'){
		 if(GM_getValue("SharedHttpFiles")){
	  		 for (var y = select2[i].childNodes.length - 1; y >= 0; y--) {
	  			if (select2[i].childNodes[y].value == GM_getValue("SharedHttpFiles")){
	  				select2[i].childNodes[y].selected = true;
	  				}
	  		    }
	    	}
		  select2[i].addEventListener("change", setSharedHttpFilesselect, false);
	      }  
	  }
  }
function setSharedHttpFilesselect(evt){
	var selectSharedHttpFiles = evt.target.options; // TRING TO GET THE FULLNAME of the lanuage from the short name
	for (var i = selectSharedHttpFiles.length - 1; i >= 0; i--) {
	
	if (evt.target.value == selectSharedHttpFiles[i].value){
		GM_setValue("SharedHttpFilesFullName", selectSharedHttpFiles[i].text); //Setting the value of FullNameLanguage
		}
	}
	if (evt.target.value){
			GM_setValue("SharedHttpFiles", evt.target.value);
	

flagDiv = document.getElementById("SharedHttpFilesId").parentNode;
flagDiv.setAttribute('class', 'SharedHttpFiles '+evt.target.value);	

	}	
}
 
// for lang only SharedHttpFiles end


function addEventListeners(MAPAreas){
	for (var i = MAPAreas.length - 1; i >= 0; i--) {

	  if (MAPAreas[i].id == 'makesmall'){
			  MAPAreas[i].addEventListener("click", minimizefuncarea, false);
	      }	      
	  if (MAPAreas[i].id == 'makebig'){
		    MAPAreas[i].addEventListener("click", maximizefuncarea, false);
	      }
	  if (MAPAreas[i].id == 'trailersoption'){
		    MAPAreas[i].addEventListener("change", minimizefuncarea, false);
	      }  
	  if (MAPAreas[i].id == 'msearchFormSubmitBtn'){
	     // MAPAreas[i].addEventListener("change", minimizefuncarea, false);
	      }         
	} 
}	

function minimizefuncarea(evt) {
	if (evt.target.name == "trailersoption"){
		if (evt.target.checked){
			Add_Trailer_direct_view();
			GM_setValue("trailer", "show");
			}
			else{
				GM_setValue("trailer", "dontshow");
var deldiv = document.evaluate("//*[@id='videospace']", 
    document, null, 9, null).singleNodeValue;
    deldiv.parentNode.removeChild(deldiv);
				}
		}
	
	if (evt.target.parentNode.name == "Maptorrent"){
		closeTorrents();
		}
    if (evt.target.parentNode.name == "MapVcdquality"){
		closeVcdquality();
		}	
	if (evt.target.parentNode.name == "MapSubs"){
		closeSubs();
		}
	if (evt.target.parentNode.name == "MapSharedHttpFiles"){
		closeRapidshare();
		}		
	if (evt.target.parentNode.name == "MapRapidshare"){
		closeRapidshare();
		}
	if (evt.target.parentNode.name == "MapTrailers"){
		closeTrailers();
		}
	if (evt.target.parentNode.name == "MapOtherhosts"){
		closeOtherhosts();
		}		
	if (evt.target.parentNode.name == "MapWatchMovieOnline"){
		closeWatchMovieOnline();
		}				
	}
	

function maximizefuncarea(evt) {
	
	if (evt.target.parentNode.name == "Maptorrent"){
		openTorrents();
		}
    if (evt.target.parentNode.name == "MapVcdquality"){
		openVcdquality();
		}	
	if (evt.target.parentNode.name == "MapSubs"){
		openSubs();
		}	
	if (evt.target.parentNode.name == "MapSharedHttpFiles"){
		openRapidshare();
		}				
	if (evt.target.parentNode.name == "MapRapidshare"){
		openRapidshare();
		}				
	if (evt.target.parentNode.name == "MapTrailers"){
		loadTrailersPage();
		}
	if (evt.target.parentNode.name == "MapOtherhosts"){
		openOtherhosts();
		}	
	if (evt.target.parentNode.name == "MapWatchMovieOnline"){
		openWatchMovieOnline();
		}						
}	
function closeWatchMovieOnline(){
	var closeWatchMovieOnlinew = document.getElementsByTagName('div');
  	for (var i = closeWatchMovieOnlinew.length - 1; i >= 0; i--) {
      if (closeWatchMovieOnlinew[i].className == "SpaceForMoviesOnlineResults"){
          closeWatchMovieOnlinew[i].style.visibility = "hidden";
	        closeWatchMovieOnlinew[i].style.height = "0";
      }
    }	
	}
	
	
function openWatchMovieOnline(){
	var openRapidsharew = document.getElementsByTagName('div');
	for (var i = openRapidsharew.length - 1; i >= 0; i--) {
     if (openRapidsharew[i].className == "SpaceForMoviesOnlineResults"){     	 
         openRapidsharew[i].style.visibility = "visible";
         openRapidsharew[i].style.height = "auto";
         GM_addStyle('div#SpaceForMoviesOnlineResults{  overflow-x:auto;}');       

	       if(!document.getElementById('MoviesOnlineRHere')){
	        googlesearchurl =	"http://www.google.com/search?hl=en&q=tt"+imdbID+"&btnG=Search";
            var where = "MoviesOnline";
            var rightpositionprs = 3;
            TheQueryIsCommingFrom = "openMoviesOnline";
            GetAndShowMeTheMoviesOnline(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom);

	         }
      }
  }
}

function closeRapidshare(){
	var closeRapidsharew = document.getElementsByTagName('div');
  	for (var i = closeRapidsharew.length - 1; i >= 0; i--) {
      if (closeRapidsharew[i].className == "SpaceForRapidshareResults"){
          closeRapidsharew[i].style.visibility = "hidden";
          closeRapidsharew[i].style.display = "none";
	        closeRapidsharew[i].style.height = "0";
      }
    }
}

function closeTrailers(){
	var closeRapidsharew = document.getElementsByTagName('div');
  	for (var i = closeRapidsharew.length - 1; i >= 0; i--) {
      if (closeRapidsharew[i].id == "trailercontent"){
          closeRapidsharew[i].style.visibility = "hidden";
          closeRapidsharew[i].style.display = "none";
	        closeRapidsharew[i].style.height = "0";
      }
    }	
	}

function loadTrailersPage(){
	
googlejsonurl = 'http://www.google.com/uds/GvideoSearch?callback=json_callback&context=0&lstkp=0&rsz=large&hl=en&source=gsc&gss=.com&sig=6cc925a597703a43cc65b5d7c705f351&start=0&q='+MovieName[1]+'%20trailer+HD+OR+movie+OR+'+year+'&key=notsupplied&v=1.0';

	GM_xmlhttpRequest({
		method: 'GET',
		url: googlejsonurl,		
		onload: function(jsonhttp) {
            var jsontxt = jsonhttp.responseText;
				jsontxt = jsontxt.replace(/^json_callback\(\'0\',/,'');
				jsontxt = jsontxt.replace(/"}},.*$/,'"}}');
			    json = eval('(' + jsontxt + ')') ;
			    			
			//GM_addStyle('div#trailerinfodiv{border:thin none;padding:-1px 3px; min-height:116px;}');	
			GM_addStyle('div#trailerinfodiv{border:thin none;padding:-1px 3px;max-height:140px;}');			
			var trailercontent = document.createElement('div'); 
			trailercontent.id = 'trailercontent';
			//trailercontent.setAttribute('style', 'position: relative; float: left;');
			trailercontent.setAttribute('class', 'article links');
			var scr = document.getElementById('tn15torrentz'); 
			//scr.parentNode.insertBefore(trailercontent, scr.nextSibling);
			scr.appendChild(trailercontent);
			for (i in json.results){
				if(json.results[i].title){
					title = json.results[i].title;
					viimg = json.results[i].tbUrl;
					ratei = json.results[i].rating;
					conte = json.results[i].content;
					vidur = json.results[i].url;
				   var d = document.createElement('div');
				 	d.id = 'trailerinfodiv';
				 	d.setAttribute('value',title);
				 	d.innerHTML="<h2>"+title+"</h2><a href='"+vidur+"'><img style='float:left; padding:3px;' src='"+viimg+"'/></a>"+conte+"<br/><a href="+vidur+">link</a><div style='clear:both;'></div>";
					trailercontent.appendChild(d);					
				}
			}

			
			}});

}

function wheretosearch(){
if (GM_getValue("SharedHttpFiles")){
var what_SharedHttpFiles_do_you_want_to_search_for = GM_getValue("SharedHttpFiles");
}else{
var what_SharedHttpFiles_do_you_want_to_search_for = "rap";
GM_setValue("SharedHttpFiles", "rap");
	};	

	whatsite = GM_getValue("SharedHttpFiles");
	
var mySharedHttpFilesArrayIs = {
"all" 						   : '"rapidshare.com/files"||"megaupload.com/?d"||"hotfile.com/dl"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date"',
"all2" 						   : '"rapidshare.com/files"||"megaupload.com/?d"||"hotfile.com/dl"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date"',
"singlelink" 				   : '"single link" OR "one link download" "fileserve.com/file/"||"turbobit.net/"||"megaupload.com/?d"||"letitbit.net"||"quickupload.net/"||"depositfiles.com/"||"vip-file.com/download"||"gettyfile.ru"||"filestab.com"||"cramit.in"||"netload.in/date"||"gigasize.com"||"sharejunky.com"||"2shared.com"',
"singlelink2" 				   : '"single link" OR "one link download" "fileserve.com/file/"||"turbobit.net/"||"megaupload.com/?d"||"letitbit.net"||"quickupload.net/"||"depositfiles.com/"||"vip-file.com/download"||"gettyfile.ru"||"filestab.com"||"cramit.in"||"netload.in/date"||"gigasize.com"||"sharejunky.com"||"2shared.com"',
"rapidshare"                   : "%22rapidshare.com/files/%22",
"rapidshare2"                  : "%22rapidshare.com/files/%22",
"megaupload"                   : "%22megaupload.com/?d=%22",
"megaupload2"                  : "%22megaupload.com/?d=%22",
"hotfile"                  	   : "%22hotfile.com/dl%22",
"hotfile2"               	   : "%22hotfile.com/dl%22",
"filefactory"                  : "%22filefactory.com/file/%22",   
"ed2k"                         : "\"ed2k%3a%2f%2f*\"+OR+site%3asharevirus.com+OR+site%3asharethefiles.com+OR+site%3aforum.divxplanet.com",
"uploaded.to"                  : "%22uploaded.to/.id=%22",
"watch_online"                 : "watch_online",
"badongo.com"                  : "%22badongo.com/file/%22",
"depositfiles.com"             : "%22depositfiles.com/files/%22",
"megashares"                   : "%22http:// * megashares.com%22",
"binfile.org"                  : "%22binfile.org/download%22",
"bluehost.to"                  : "%22bluehost.to/dl=%22",
"ftp2share.com"                : "%22ftp2share.com/file%22",
"mytempdir"                    : "%22http:// * mytempdir.com/%22",
"jabello.com"                  : "%22jabello.com/download * id=%22",
"media.filecabi.net"           : "%22media.filecabi.net/upload%22",
"primeupload.com"              : "%22primeupload.com/file/%22",
"rsprotect.com"                : "%22rsprotect.com/rc%22",
"sprintshare.com"              : "%22sprintshare.com/en/file/%22",
"up.9q9q.net"                  : "%22up.9q9q.net/up/%22",
"zupload.com"                  : "%22zupload.com/download * file=%22",
"4filehosting.com"             : "%224filehosting.com/file/%22",
"4shared.com"                  : "%224shared.com/dir/%22",
"4shared.com"                  : "%224shared.com/file/%22",
"allyoucanupload.webshots.com" : "%22allyoucanupload.webshots.com/v/%22",
"arabsoftware.net"             : "%22arabsoftware.net/uploads/%22",
"arbup.org"                    : "%22arbup.org/v/%22",
"archive.org"                  : "%22archive.org/download/%22",
"bravoshare.com"               : "%22bravoshare.com/download%22",
"datapickup.com"               : "%22datapickup.com/d%22",
"datenklo.net"                 : "%22datenklo.net/dl-%22",
"divshare.com"                 : "%22divshare.com/download/%22",
"f-forge.com"                  : "%22f-forge.com/?d=%22",
"fileblob.com"                 : "%22fileblob.com/download%22",
"filecabi.net"                 : "%22filecabi.net/video%22",
"filedepartment.com"           : "%22filedepartment.com/freeshare%22",
"filedepartment.com"           : "%22filedepartment.com/totalshare%22",
"fileflyer.com"                : "%22fileflyer.com/view/%22",
"filehd.com"                   : "%22filehd.com/1/%22",
"filehd.com"                   : "%22filehd.com/download%22",
"fileho.com"                   : "%22fileho.com/download3/%22",
"filehostia.com"               : "%22filehostia.com/show%22",
"filelodge.com"                : "%22filelodge.com/files/%22",
"filesend.net"                 : "%22filesend.net/download%22",
"filesupload.com"              : "%22filesupload.com/showlink%22",
"filesupload.com"              : "%22filesupload.com/userfiles/%22",
"fileupyours.com"              : "%22fileupyours.com/files%22",
"fyad.org"                     : "%22fyad.org/%22",
"gigashare.com"                : "%22gigashare.com/files/%22",
"glintfiles.net"               : "%22glintfiles.net/get%22",
"axifile"                      : "%22http:// * axifile.com/%22",
"cocoshare"                    : "%22http:// * cocoshare.cc%22",
"easy-share"                   : "%22http:// * easy-share.com/%22",
"egoshare"                     : "%22http:// * egoshare.com/%22",
"filefront"                    : "%22http:// * filefront.com%22",
"flyupload"                    : "%22http:// * flyupload.com%22",
"ftpz.us"                      : "%22http:// * ftpz.us/%22",
"gigasize"                     : "%22http:// * gigasize.com/get%22",
"mediafire"                    : "%22http:// * mediafire.com/%22",
"MegaShare"                    : "%22http:// * MegaShare.com/%22",
"putfile"                      : "%22http:// * putfile.com/%22",
"ripway"                       : "%22http:// * ripway.com/%22",
"rogepost"                     : "%22http:// * rogepost.com/%22",
"sendmefile"                   : "%22http:// * sendmefile.com/%22",
"speedyshare"                  : "%22http:// * speedyshare.com/%22",
"uploading"                    : "%22http:// * uploading.com%22",
"uploadyourfiles"              : "%22http:// * uploadyourfiles.de/%22",
"urlcash"                      : "%22http:// * urlcash.net%22",
"webfile"                      : "%22http:// * webfile.ru/%22",
"yourfilehost"                 : "%22http:// * yourfilehost.com/%22",
"zippyvideos"                  : "%22http:// * zippyvideos.com/%22",
"come2store"                   : "%22http://download * come2store.com/%22",
"35mb"                         : "%22http://download.35mb.com/%22",
"file2you"                     : "%22http://download.file2you.net/%22",
"yousendit"                    : "%22http://download.yousendit.com/%22",
"uploadr"                      : "%22http://file.uploadr.com/%22",
"slil.ru"                      : "%22http://slil.ru/%22",
"bigupload"                    : "%22http://www.bigupload.com/d=%22",
"sendspace"                    : "%22http://www.sendspace.com/file/%22",
"hyperupload.com"              : "%22hyperupload.com/download%22",
"icefile.com"                  : "%22icefile.com/index%22",
"icefile.net"                  : "%22icefile.net/index%22",
"icefile.org"                  : "%22icefile.org/index%22",
"illhostit.com"                : "%22illhostit.com/files/%22",
"keepmyfile.com"               : "%22keepmyfile.com/download/%22",
"live-share.com"               : "%22live-share.com/d/%22",
"live-share.com"               : "%22live-share.com/files/%22",
"looler.com"                   : "%22looler.com/file/%22",
"maxishare.net"                : "%22maxishare.net/en/file/%22",
"megadownload.net"             : "%22megadownload.net/download%22",
"megadownload.net"             : "%22megadownload.net/file%22",
"megafileupload.com"           : "%22megafileupload.com/en/file%22",
"mfile3.com"                   : "%22mfile3.com/download%22",
"miniuploads.com"              : "%22miniuploads.com/download * id=%22",
"misterupload.com"             : "%22misterupload.com/?d=%22",
"mooload.com"                  : "%22mooload.com/file * file=files%22",
"myfilestash.com"              : "%22myfilestash.com/userfiles%22",
"oxyshare.com"                 : "%22oxyshare.com/get/%22",
"perushare.com"                : "%22perushare.com/index%22",
"pushfile.net"                 : "%22pushfile.net/get%22",
"quickdump.com"                : "%22quickdump.com/files%22",
"quicksharing.com"             : "%22quicksharing.com/v/%22",
"rapidfile.net"                : "%22rapidfile.net/.d=%22",
"rapidshare.de"                : "%22rapidshare.de/files/%22",
"savefile.com"                 : "%22savefile.com/files/%22",
"savefile.info"                : "%22savefile.info/file/%22",
"scambia.com"                  : "%22scambia.com/download%22",
"share-online.biz"             : "%22share-online.biz/dl/%22",
"sharebigfile.com"             : "%22sharebigfile.com/file/%22",
"sharingmatrix.com"            : "%22sharingmatrix.com/file/%22",
"spread-it.com"                : "%22spread-it.com/dl%22",
"storeandserve.com"            : "%22storeandserve.com/download/%22",
"supasic.com"                  : "%22supasic.com/download%22",
"thefilebucket.com"            : "%22thefilebucket.com/files%22",
"thefilebucket.com"            : "%22thefilebucket.com/userfiles%22",
"transferbigfiles.com"         : "%22transferbigfiles.com/Get.aspx%22",
"turboupload.com"              : "%22turboupload.com/d/%22",
"ultrashare.de"                : "%22ultrashare.de/f/%22",
"up-x.info"                    : "%22up-x.info/serv01%22",
"up.li.ru"                     : "%22up.li.ru/?id=%22",
"up.spbland.ru"                : "%22up.spbland.ru/files/%22",
"upitus.com"                   : "%22upitus.com/download%22",
"upload.pk"                    : "%22upload.pk/freeupload/%22",
"upload02.uploadpk.com"        : "%22upload02.uploadpk.com/file/%22",
"upload2.net"                  : "%22upload2.net/download2/%22",
"upload2.net"                  : "%22upload2.net/page/%22",
"uploadcomet.com"              : "%22uploadcomet.com/download%22",
"uploadhut.com"                : "%22uploadhut.com/upload%22", 
"uploadpalace.com"             : "%22uploadpalace.com/download/%22",
"uploadpalace.com"             : "%22uploadpalace.com/en/file/%22",
"uploadsend.com"               : "%22uploadsend.com/d%22",
"uppit.com"                    : "%22uppit.com/dl%22",
"us.archive.org"               : "%22us.archive.org%22",
"ushareit.com"                 : "%22ushareit.com/view%22",
"verzend.be"                   : "%22verzend.be/v/%22",
"vietsharing.us"               : "%22vietsharing.us/?d=%22",
"viprasys.com"                 : "%22viprasys.com/host/%22",
"w-n-n.com"                    : "%22w-n-n.com/up%22",
"webfilehost.com"              : "%22webfilehost.com/index%22",
"wtfhost.com"                  : "%22wtfhost.com/files%22",
"wtfhost.com"                  : "%22wtfhost.com/userfiles%22",
"yofreespace.com"              : "%22yofreespace.com/download%22",
"youploadit.com"               : "%22youploadit.com/file/%22",
"yousendit.com"                : "%22yousendit.com/d.aspx?id=%22",
"zshare"                       : "%22zshare.net/download/%22"};

	return mySharedHttpFilesArrayIs[whatsite];
		
	}

function openRapidshare(){
	
	var wheretosearchURL = wheretosearch();
	
if(document.getElementById('RapidshareResultsRHere')){
	  el = document.getElementById('RapidshareResultsRHere');
  	  el.parentNode.removeChild(el);
	}
	
	var openRapidsharew = document.getElementsByTagName('div');
	for (var i = openRapidsharew.length - 1; i >= 0; i--) {
     if (openRapidsharew[i].className == "SpaceForRapidshareResults"){
      	 openRapidsharew[i].style.visibility = "visible";
         openRapidsharew[i].style.display = "inline";
         openRapidsharew[i].style.height = "auto";
	       if(!document.getElementById('RapidshareResultsRHere')){
	        
			if ( (whatsite == 'megaupload2') || (whatsite == 'hotfile2') || (whatsite == 'rapidshare2') || (whatsite == 'all2')   || (whatsite == 'singlelink2')){
			googlesearchurl =	"http://www.google.com/search?q=intitle:\""+moviename+"\"+\""+moviename+"\"+"+year+"+"+wheretosearchURL+"&num=100&hl=en&lr=&btnG=Search";
			}else if (whatsite == 'watch_online'){
			googlesearchurl =	"http://www.google.com/search?q=intitle:\""+moviename+"\"+\""+moviename+"\"+solarmovie.eu++OR+www.solarmovie.so/watch-+OR+www.movie2k.to+OR+kinox.to+-trailer+-nabolister+-jamespot+-weebly+-lovefilm+-removed&num=100&hl=en&lr=&btnG=Search";
			}else{
			googlesearchurl =	"http://www.google.com/search?q=tt"+imdbID+"+"+wheretosearchURL+"+&num=100&hl=en&lr=&btnG=Search";
		    }
			var where = "Rapidshare";
            var rightpositionprs = 3;
            	TheQueryIsCommingFrom = "openRapidshare";
            	GetAndShowMeTheRapidshare(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom);
	        }
        }
    }
}

function closeOtherhosts(){
	var closeOtherhostsw = document.getElementsByTagName('div');
  	for (var i = closeOtherhostsw.length - 1; i >= 0; i--) {
      if (closeOtherhostsw[i].className == "SpaceForOtherhostsResults"){
          closeOtherhostsw[i].style.visibility = "hidden";
          closeOtherhostsw[i].style.display = "none";
	        closeOtherhostsw[i].style.height = "0";
      }
    }
}

function openOtherhosts(){
	 if(!document.getElementById('OtherhostsSearch')){
		otherhostssearchurl = "tt"+imdbID+"+%22interchangeable+links%22+OR+%22megaupload+com+d%22+OR+%22mediafire.com%2F%5C%5C%3F%22+OR+%22hotfile+com+dl%22+OR+%22uploaded+to+id%22+OR+%22megashares.com%22+OR+%22rapidshare.de%5C%2Ffiles%22+OR+%22depositfiles%5C.com%22+OR+%22netload%5C%5C.in%22+OR+%22filefactory.com/file/%22";

	var OtherhostsSearch = document.createElement("div");
		OtherhostsSearch.id= "OtherhostsSearch";
		OtherhostsSearch.innerHTML = "On other servers search google query<br/><input style='width:96%;font-size:0.9em;'type='text' value='"+unescape(otherhostssearchurl)+"' title='search_Otherhosts' id='search_Otherhosts_id'/><div id='clear-button'>&nbsp;</div><br/>";
		OtherhostsSearch.setAttribute('style', 'vertical-align:text-bottom;margin-left:6px; border:1px solid #CCCCCC; background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom;border-bottom-width:0; padding:3px; ');
	GM_addStyle('div#clear-button{  float:right;background-image:url(http://www.google.com/uds/css/clear.gif);background-position:right bottom;background-repeat:no-repeat;cursor:pointer;margin-left:4px;margin-right:4px;padding-left:10px;text-align:right; }');    
    var go_search_image = document.createElement("img");
		go_search_image.id= "go_search_image";
		go_search_image.src= "http://i.media-imdb.com/images/intl/en/go.gif";
		go_search_image.src= "http://www.imdb.com/images/tvgrid/button_go.gif";
		go_search_image.setAttribute('style', 'vertical-align:text-bottom;margin:2px 25px 3px;cursor:pointer;');   
		go_search_image.addEventListener("click", makeTheSearchQueryOtherhosts, true);
	OtherhostsSearch.appendChild(go_search_image);
	document.getElementById('tn15torrentz').appendChild(OtherhostsSearch);
     }
}
	
function makeTheSearchQueryOtherhosts(event){
    theSearchQueryOtherhosts = "http://www.google.com/search?hl=en&q="+escape(event.target.parentNode.childNodes[2].value)+"&btnG=Search";
	openOtherhosts2(theSearchQueryOtherhosts);
	}
function openOtherhosts2(theSearchQueryOtherhosts){
	var openOtherhostsw = document.getElementsByTagName('div');
	for (var i = openOtherhostsw.length - 1; i >= 0; i--) {
     if (openOtherhostsw[i].className == "SpaceForOtherhostsResults"){
       openOtherhostsw[i].style.visibility = "visible";
       openOtherhostsw[i].style.display = "inline";
       openOtherhostsw[i].style.height = "auto";
	   otherhostssearchurl = theSearchQueryOtherhosts;
              var where = "Otherhosts";
	          var rightpositionprs = 2;
	          TheQueryIsCommingFrom = "openOtherhosts";
	          GetAndShowMeTheRapidshare(otherhostssearchurl,where,rightpositionprs,TheQueryIsCommingFrom);
      }
  }
}

function closeTorrents(){
	var openTorrentsw = document.getElementsByTagName('div');
  	for (var i = openTorrentsw.length - 1; i >= 0; i--) {
      if (openTorrentsw[i].className == "SpaceForTorrentResults"){
          openTorrentsw[i].style.visibility = "hidden";
	        openTorrentsw[i].style.height = "0";
      }
    }
}

function openTorrents(query){
	var openTorrentsw = document.getElementsByTagName('div');
	for (var i = openTorrentsw.length - 1; i >= 0; i--) {
     if (openTorrentsw[i].className == "SpaceForTorrentResults"){
       openTorrentsw[i].style.visibility = "visible";
       openTorrentsw[i].style.height = "auto";
	       if(!document.getElementById('TorrentzResultsRHere')){
               GetAndShowMeTheTorrentz(query);
	         }
      }
  }
}

function closeVcdquality(){
		var openTorrentsw = document.getElementsByTagName('div');
	for (var i = openTorrentsw.length - 1; i >= 0; i--) {
     if (openTorrentsw[i].className == "SpaceForVCDQualityResults"){
       openTorrentsw[i].style.visibility = "hidden";
	     openTorrentsw[i].style.height = "0";
      }
  }
	}
	
function openVcdquality(){
	var openVcdqualityw = document.getElementsByTagName('div');
	for (var i = openVcdqualityw.length - 1; i >= 0; i--) {

     if (openVcdqualityw[i].className == "SpaceForVCDQualityResults"){
     openVcdqualityw[i].style.visibility = "visible";
	   openVcdqualityw[i].style.height = "auto";	   
	        if(!document.getElementById('VcdqualityResultsRHere')){
	         GetAndShowMeTheScene();
	        }
        }
   }
}

function openSubs(){
	var openSubsw = document.getElementsByTagName('div');
	for (var i = openSubsw.length - 1; i >= 0; i--) {
     if (openSubsw[i].className == "SpaceForSubsResults"){
       openSubsw[i].style.visibility = "visible";
	   openSubsw[i].style.height = "auto";
	   openSubsw[i].setAttribute('class', 'SpaceForSubsResults article links');
	 GetAndShowMeTheSubsResults();
      }
   }
}

function closeSubs(){
		var closeSubsw = document.getElementsByTagName('div');
	for (var i = closeSubsw.length - 1; i >= 0; i--) {
     if (closeSubsw[i].className == "SpaceForSubsResults article links"){
         closeSubsw[i].style.visibility = "hidden";
	     closeSubsw[i].style.height = "0";
	     closeSubsw[i].removeAttribute('class');
	     closeSubsw[i].setAttribute('class', 'SpaceForSubsResults');
	     
      }
   }
}


function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function GetAndShowMeTheMoviesOnline(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom){
GM_addStyle('h2#titlesmallfonts {font-size:small !important;}');	
GM_addStyle('img#PleaseWaitForRapidshare{  display: block; padding:0px 70px 3px;}');

function getFromGoogleVideo(){
GM_addStyle('div#SpaceForMoviesOnlineResults{-moz-box-sizing:border-box;}');
GM_addStyle('div#onlinevideores{background-color:#FFFEEF; min-height:23em; border:1px solid #CCCCCC; float:left; margin:5px 5px 5px 5px; min-width:14em;overflow:hidden; padding:0px; width:22%;}');
  gvideourl = "http://video.google.com/videosearch?q=\""+moviename+"\"+"+year+" -BBC -Geographic -Millionaire&hl=en&emb=0&dur=3&client=firefox-a&output=xml";//output=xml
  gvideourl = "http://www.google.com/search?hl=en&q=\""+moviename+"\"+"+year+" -BBC -Geographic -Millionaire&tbs=vid%3A1%2Cdur%3Al&tbo=p&source=vgc&num=50";
	//GM_log(gvideourl);
 GM_xmlhttpRequest({
		    method:'GET',
		   // overrideMimeType: 'text/plain; charset=x-user-defined',
		    url:gvideourl,
			onload:function(responseDetails){				
				//responseDetails.responseText = responseDetails.responseText.replace(/<\/em>/g,'');
				//responseDetails.responseText = responseDetails.responseText.replace(/<em>/g,'');
				response = responseDetails.responseText;
				//response = response.replace(/^.*<span class=std>/,'');
				//response = response.replace(/Search Help.*$/,'');

				GM_addStyle('img#PleaseWaitForRapidshare{  display: none;}');
				var foundresults = document.getElementById('SpaceFor'+where+'Results');
				
       if (response.match(/did not return any results/)){
          foundresults.innerHTML	+= "<h5>Search for online video using <a href='"+gvideourl.replace(/output=results/, '')+"'>google.com</a></h5>Sorry, nothing found<br/><br/>";
	    }else{	
	      foundresults.innerHTML	+= "<br/><h5>Search for online video using <a href='"+gvideourl.replace(/output=results/, '')+"'>google.com</a></h5>";
	      var gVideoRes = document.createElement('div');
     		  gVideoRes.setAttribute('id', 'gVideoRes');
     		  gVideoRes.setAttribute('name', 'gVideoRes');
     		  gVideoRes.innerHTML = response;

var divs = gVideoRes.getElementsByTagName('table');

for(var i = 0, n = divs.length; i < n; i++){
	if (divs[i].className=='ts') {
		var thisurl = divs[i].getElementsByTagName('a')[0];
		var tooManyIpMUreg = new RegExp("url=(.*?)\\&");
		var match = tooManyIpMUreg.exec(thisurl);
		if (match != null) {
			thisurl = match[1];
		} 				
		var thistitle = divs[i].getElementsByTagName('h3')[0].textContent;	
			thistitle = thistitle.replace(/\n/g,'');
		
		var thisduration = divs[i].getElementsByTagName('span')[0].getElementsByTagName('span')[0].textContent;	
		var thisdate = divs[i].getElementsByTagName('span')[0].getElementsByTagName('span')[1].textContent;	
		var thisinfo = divs[i].getElementsByTagName('div')[0].textContent;
		var thisthumbnailid = divs[i].getElementsByTagName('img')[0].id;
		
		var stupidgooglesrcregex = new RegExp("document\\.getElementById\\('"+thisthumbnailid+"'\\)\\);</script><script>\\(function\\(x\\){x&&\\(x\\.src='(.*?)'\\)");
		var match = stupidgooglesrcregex.exec(response);
		if (match != null) {
			thisthumbnail = match[1];
		} else {
			thisthumbnail = '';
		}
		var minutes=thisduration.replace(/ min/g,'');
		minutes = ((minutes < 10) ? "0" + minutes : minutes); 
		seconds = '00';
		var hours = Math.floor(minutes/60);
		var minutes = minutes%60;
		thisduration= hours+':'+minutes+':'+seconds;		
		//var thisdate_ = getElementsByClassName("rl-age","span", divs[i]);	
		//var thisdate = thisdate_[0].innerHTML;		
		//var thisinfo_ = getElementsByClassName("rl-snippet","div", divs[i]);	
		//var thisinfo = thisinfo_[0].innerHTML
	 		//thisinfo = thisinfo.replace(/[^a-z A-Z 0-9]/g,'');
		//var thumbnailimg_ = getElementsByClassName("thumbnail-img" , "img", divs[i]);		
		//thisthumbnail = thumbnailimg_[0].src;

   re = /^https?:\/\/(www\.)?([^/]+)?/i;
   thisurl.match( re );
   
var favicon = "http://"+RegExp.$2+"/favicon.ico";

	if (!(thisurl.match(/(rottentomatoes)|(amazon\.com)|(yahoo\.com)|(uzout\.com)|(video\.aol\.com)|(cineworld\.co\.uk)/))){		
		foundresults.innerHTML	+= "<div id='onlinevideores'><h2 id='titlesmallfonts' class='item-title' title='"+thistitle+"'>"+thistitle.substr(0,66)+" </h4><div id='item-img'><center><img id='"+thisthumbnailid+"' style='width:124px;'/></center></div>"+
		"<div id='onlinemovieinfo'><img style='max-height:22px;' src='"+favicon+"'> <a href='"+thisurl+"'>"+RegExp.$2+"</a><br>Runtime : "+thisduration.substr(0,7)+"<br>Date : "+thisdate+"<div >Info : <span style='font-size:9px;'>"+thisinfo.substr(0,44)+"</span></div></div></div>";  	
      
var x=document.getElementById(thisthumbnailid);
//x.src=thisthumbnail; 

x.src=thisthumbnail;

//var base64regexe = new RegExp("(^.*?base64,/)(.*?$)");
//var match = base64regexe.exec(thisthumbnail);
//if (match != null) {
	//x.src=match[1]+unescape(match[2]);
//} 




//translateToBinaryString    
      }


//(function(x){x&&(x.src='"+thisthumbnail+"');})

      
   }
}

gVideoRes.innerHTML = "";

GM_addStyle('h2.item-title {background:transparent url(/images/nb15/sprocket.gif) repeat-x scroll 43px -1px;font-size:small;font-weight:bold;line-height:1.1;margin:0;min-height:2em;padding:2px 2px 2px 2px;text-align:center;}');


GM_addStyle('div#onlinemovieinfo{padding:5px 5px 8px 8px;border:1px solid Beige;margin:8px;}');
GM_addStyle('div#item-img-google{background-color:Beige;}');
GM_addStyle('div#onlinemovieinfo a:link {color:black;}');			
GM_addStyle('div#onlinemovieinfo a:visited {color:GrayText;}');						
GM_addStyle('div#onlinevideoresgoogle{background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom; min-height:23em; border:1px solid #CCCCCC; float:left; margin:5px 5px 5px 5px; min-width:14em;overflow:hidden; padding:0px; width:22%;}');
GM_addStyle('div#onlinevideoresgoogle:hover{background:Beige;}');
GM_addStyle('div#skata{clear:both;}');
GM_addStyle('img#google-video-image{width:128px;}'); 
}
}});
}

  if (document.getElementById('tn15content')){
  	var min = document.getElementById('tn15content').innerHTML.match(/(\d{1,}) min/);
	}else{
	var min = document.body.innerHTML.match(/(\d{1,}) min/);
	}
		
  if (min){
     min = min[1];
     var hours = min/60;
     var inthours = parseInt(min/60);
     var differ = hours - inthours;
     minutes = parseInt(differ*60);
     if (minutes<10){minutes = "0"+minutes;}
     var firstpartofthehour = inthours+":"+minutes	;
     var firstpartofthehour = firstpartofthehour.substr(0,3);
    }else{
     var firstpartofthehour = '00:0';
     var inthours = '00';
     var minutes = '00';
    }
	
var foundresults = document.getElementById('SpaceFor'+where+'Results');
foundresults.innerHTML	+= "Expected video length : <span id='highlight'>"+inthours+":"+minutes+":00</span> (titles and info translated from chinese)";					  

function get_the_final_url_from_google_translate(gtrans1, cb){
GM_xmlhttpRequest({
		    method:'GET',
		    url:gtrans1,
			onload:function(responseDetails){          
            responseDetails.responseText = responseDetails.responseText.replace(/amp;/g,'');
            var myregexp = /(?:<a href="(\/translate_.*?)">Translate<\/a>)|(?:URL=(.*?)">)/;
            var match = myregexp.exec(responseDetails.responseText);
            
   if (match[1] != null) {
	gtrans2 = match[1].replace(/^\/translate/,'http://translate.google.com/translate');
    get_the_final_url_from_google_translate(gtrans2, inform);
     }	
   
   if (match[2] != null) {	
   	match[2] = match[2].toString();
	}
   	cb(match[2]);
			
				}})
}


function inform(youkuvideourl) {
	if (youkuvideourl){
      	getfromyoukuvideo(youkuvideourl,where,inthours,minutes,firstpartofthehour);
		}
}
var movienameescape = escape(moviename);
gtrans1 = "http://translate.google.com/translate?prev=_t&hl=en&ie=UTF-8&u=http%3A%2F%2Fso.youku.com%2Fsearch_playlist%2Fq_%2B"+movienameescape+"%2Fcateid_128&sl=zh-CN&tl=en&history_state0=";	
gtrans1 = "http://translate.google.com/translate?prev=_t&hl=en&ie=UTF-8&u=http%3A%2F%2Fwww.soku.com%search_video%2Fq_%2B"+movienameescape+"%2F";
var sokuescape = escape("http://www.soku.com/search_video/q_"+moviename+"_orderby_1_lengthtype_4");
//alert(sokuescape);
gtrans1 = "http://translate.google.com/translate?prev=_t&hl=en&ie=UTF-8&u="+sokuescape;	

//gtrans1 = "http://translate.google.com/translate?prev=_t&hl=en&ie=UTF-8&u=http%3A%2F%2Fso.youku.com%2Fsearch_video%2Fq_%2B"+movienameescape;	
get_the_final_url_from_google_translate(gtrans1, inform);

function getfromyoukuvideo(youkuvideourl,where,inthours,minutes,firstpartofthehour){
	
GM_xmlhttpRequest({
		    method:'GET',
		    url:youkuvideourl.toString(),
			onload:function(responseDetails){
				var foundresults = document.getElementById('SpaceFor'+where+'Results');
				var orglinkyoukuvideourl = youkuvideourl;
					orglinkyoukuvideourl = unescape(orglinkyoukuvideourl.match(/http\:\/\/.*?1&u=(.*?)&usg=.*?$/)[1]);

foundresults.innerHTML	+= '<div id="MoviesOnlineRHere">'+
"<h5>Search for online video using youku.com</h5>"+
"<img src='http://www.google.com/favicon.ico'> <a href="+youkuvideourl+">youku.com translated to english</a><br>"+
"<img src='http://www.youku.com/favicon.ico'> <a href="+orglinkyoukuvideourl+">youku.com original page</a><br>"+
'</div>';
//
	       if (responseDetails.responseText.match(/Sorry, /)){
			foundresults.innerHTML	+= "Sorry, nothing found</div><br/><br/>";
			GM_addStyle('img#PleaseWaitForRapidshare{  display: none;}');	
			getFromGoogleVideo();
			}else{	
			foundresults.innerHTML	+= '</div>';
			GM_addStyle('div#MoviesOnlineRHereinfo{  background: red;}');	
			GM_addStyle('img#PleaseWaitForRapidshare{  display: none;}');		
			GM_addStyle('h2.item-title {background:transparent url(/images/nb15/sprocket.gif) repeat-x scroll 43px -1px;font-size:small;font-weight:bold;line-height:1.1;margin:0;min-height:2em;padding:2px 2px 2px 2px;text-align:center;}');
			GM_addStyle('div#onlinemovieinfo{padding:5px 5px 8px 8px;border:1px solid Beige;margin:8px;}');
			GM_addStyle('div#item-img{background-color:Beige;}');
			GM_addStyle('div#onlinemovieinfo a:link {color:black;}');			
			GM_addStyle('div#onlinemovieinfo a:visited {color:GrayText;}');						
			GM_addStyle('div#onlinevideores{background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom; max-height:260px; min-height:19em; border:1px solid #CCCCCC; float:left; margin:5px 5px 5px 5px; min-width:14em;overflow:hidden; padding:0px; width:22%;}');
			GM_addStyle('div#onlinevideores:hover{background:Beige;}');
			GM_addStyle('div#skata{clear:both;}');

		var gVideoResTr = document.createElement('div');
     		gVideoResTr.setAttribute('id', 'gVideoRes');
     		gVideoResTr.setAttribute('name', 'gVideoRes');
     		gVideoResTr.innerHTML = responseDetails.responseText;

 		var divs = gVideoResTr.getElementsByTagName('ul');

if (divs.length){
  for(var i = 0, n = divs.length; i < n; i++){
    //if (divs[i].className=='video pList') {		
	 //var vLink = getElementsByClassName("vLink" , "li", divs[i]);
	 //var videoImg = getElementsByClassName("vImg" , "li", divs[i]);
	 //var num = getElementsByClassName("num" , "span", divs[i]);
	 //var vTag = getElementsByClassName("vTag" , "li", divs[i]);	
    //if (divs[i].className=='p') {		
	 //var vLink = getElementsByClassName("p_link" , "li", divs[i]);
	 //var videoImg = getElementsByClassName("p_thumb" , "li", divs[i]);
	 //var num = getElementsByClassName("num" , "span", divs[i]);
	 //var vTag = getElementsByClassName("p_title" , "li", divs[i]);	
    if (divs[i].className=='v') {		
	 var vLink = getElementsByClassName("v_link" , "li", divs[i]);
	 var videoImg = getElementsByClassName("v_thumb" , "li", divs[i]);
	 var num = getElementsByClassName("num" , "span", divs[i]);
	 var vTag = getElementsByClassName("v_title" , "li", divs[i]);  
    if (vTag[0]){
     var dlink = vLink[0].childNodes[0].href;
     var thetitle = videoImg[0].childNodes[0].alt;	 
	     thetitle = thetitle.replace(/】/,'');
		 thetitle = thetitle.replace(/【/,'');
     var image = videoImg[0].childNodes[0].src;
     var runtime = num[0].textContent;	
     var info = vTag[0].textContent;
         info = info.replace(/[^a-z A-Z 0-9]/g,'');		 	  
     //var orglink = unescape(dlink.match(/http\:\/\/.*?u=(.*?)&prev=.*?$/)[1]);
     var orglink = unescape(dlink.match(/http\:\/\/.*?1&u=(.*?)&usg=.*?$/)[1]);

     if (runtime.match("^"+firstpartofthehour)){
            GM_addStyle('span#highlight{-moz-border-radius:3px; background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom; padding:1px 4px;}');
 			runtime = "<span id='highlight'>"+runtime+"</span>";
          }else{
            runtime = "<span>"+runtime+"</span>";
          }

		foundresults.innerHTML	+= "<div id='onlinevideores'>"+
		"<h2 id='titlesmallfonts' class='item-title' title='"+thetitle+"'>"+thetitle.substr(0,66)+" </h2>"+
		"<div id='item-img'><center><img src='"+image+"'/></center></div>"+
		"<div id='onlinemovieinfo'><img src='http://www.google.com/favicon.ico'>"+
		"<a href="+dlink+">Translated page</a><br>"+
		"<img src='http://www.youku.com/favicon.ico'><a href='"+orglink+"'>Original page</a><br>"+
		"Runtime : "+runtime+
		"<br>Info : <span style='font-size:9px;'>"+info.substr(0,34)+
		"</span>"+
		"</div></div>";
      }
	 }
	}
foundresults.innerHTML	+= "<div id=skata></div>";
getFromGoogleVideo();	
}	
	


 }
}});

}

}

function prepareforanewgooglesearch(evt){
	document.getElementById('show_more').removeEventListener("click", prepareforanewgooglesearch, false); 
	var foundresults = document.getElementById('SpaceForRapidshareResults');
	var googlesearchurl = 'http://www.google.com/search?hl=en&q='+evt.currentTarget.previousSibling.value+'&btnG=Search';
	GetAndShowMeTheRapidshare(googlesearchurl,'Rapidshare','3','openRapidshare');
	}

function GetAndShowMeTheRapidshare(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom){

		GM_addStyle('img#PleaseWaitForRapidshare{  display: block; padding:0px 70px 3px;}');
		GM_xmlhttpRequest({
		    method:'GET',
		    url: googlesearchurl,
			headers: {'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',},
			onload:function(responseDetails){
			var googleresponse = responseDetails.responseText;
			var foundresults = document.getElementById('SpaceFor'+where+'Results');			  
			var inputbox = 'Asking google for: '+googleresponse.match(/<input autocomplete="off" class="lst".*?>/);

					//googleresponse = googleresponse.replace(/\r/g,'');
					//googleresponse = googleresponse.replace(/\n/g,'');					
					//googleresponse = googleresponse.replace(/<em>(.*?)<\/em>/ig,'$1');
					//googleresponse = googleresponse.replace(/<wbr><\/wbr>/ig,'');
					//googleresponse = googleresponse.replace(/<wbr>/ig,'');					
					//googleresponse = googleresponse.replace(/http:\/\/(?:www.|)imdb\.com\/title\/tt/ig,'imdb.com/title/tt');					
					//googleresponse = googleresponse.replace(/.*?<h2 class=hd>Search Results<\/h2>/,'');
					//googleresponse = googleresponse.replace(/<div id=foot.*?$/ig, "");
					//googleresponse = googleresponse.replace(/<span class=gl>-<\/span> \[ <a href="http:\/\/translate.*?Translate this page<\/a> \]/g,'');					
					//googleresponse = googleresponse.replace(/<a href=# onclick="return false" class=mblink>Show more results from .*?<\/a><\/span>/g,'');
					//googleresponse = googleresponse.replace(/ - <\/span><span class=gl><a.*?Similar<\/a><\/span>/g,'</span>');
					//googleresponse = googleresponse.replace(/<p id=mfr><i>In response to a complaint.*?<\/i><\/p>/g,'');
					
					googleresponse = googleresponse.replace(/\n/g,'');					
					googleresponse = googleresponse.replace(/.*?<\/head>/i, "");					
					googleresponse = googleresponse.replace(/<style>.*?<\/style>/ig,'');
					googleresponse = googleresponse.replace(/^.*?<div id="res">/,'<div id="res">');					
					googleresponse = googleresponse.replace(/<p id="mfr".*?$/ig,'');     
					googleresponse = googleresponse.replace(/<div id="foot".*?$/i, "");					
					googleresponse = googleresponse.replace(/ - <a href="\/search.*?>Similar<\/a>/g,'');
					googleresponse = googleresponse.replace(/<blockquote style="margin-bottom:0">/g,'');
					googleresponse = googleresponse.replace(/<.blockquote>/g,'');
					googleresponse = googleresponse.replace(/<i>In order to show you.*?<\/i>/, "");
					googleresponse = googleresponse.replace(/<b>/g,"");
					googleresponse = googleresponse.replace(/<\/b>/g,"");
					
			GM_addStyle('input.lst{font-size:12px;height:15px;vertical-align:middle;width:64%;}');
            GM_addStyle('input#i{  font-size:13px; font-weight:bolder;background-image:url(/images/tn15/messageboard_header_bgd.gif);background-position:center top;background-repeat:repeat-x;}');
            GM_addStyle('input#show_more{margin:-1px 7px 0;}');
			GM_addStyle('li.g{display:inline-block;margin-bottom:10px!important;background-color:#EDECEB;-moz-border-radius:10px 10px 10px 10px;border:1px solid #FAFAFA;width:80%;}');
			GM_addStyle('a.l{color:#003399;font-size:14px}');
			GM_addStyle('h3.r{margin:0 8px 4px;margin-top:4px !important;font-size: 13px;}');
			GM_addStyle('div.s{margin:0 8px 4px;font-size: 11px;}');
			GM_addStyle('img#PleaseWaitForRapidshare{  display: none;}');	              
			GM_addStyle('cite{color:#136CB2}');
			
					analyseResults(googleresponse,where);	
					
if ( (googleresponse.match(/<li class="g">/)) && (!(googleresponse.match(/did not match any documents/))) ){

	googleresponse = googleresponse.replace(/<li class="g">/ig,'<li class="g aux-content-widget-3 links">');
	
	googleresponse = googleresponse.replace(/<li class="g id"/ig,'<li class="g aux-content-widget-3 links" id');
	
	googleresponse = googleresponse.replace(/class="f">/ig,'class="f see-more">');
	
    var top =document.getElementById('tn15torrentz').offsetTop+20;
     
	foundresults.innerHTML	= '<div id="'+where+'ResultsRHere" style="">'+
	'<div>'+inputbox+'<input type="image" align="absmiddle" id="show_more" src="/images/tvgrid/button_go.gif"/></div>'+
	'<!--div id="exper_search">'+googlesearchurl+'<a href="http://92.119.154.125/grsubsmovies/showinfo.php?id='+imdbID+'">Experimental Search</a></div-->'+
	googleresponse+	'Results obtained with <a href='+googlesearchurl+'>this query</a></div>';

    document.getElementById('show_more').addEventListener("click", prepareforanewgooglesearch, false); 

    GM_addStyle('div#exper_search{  background:#FAFAFA none repeat scroll 0 0;border:1px solid #999999;margin-bottom:4px;margin-top:4px;padding-bottom:4px;padding-top:4px;text-align:center;width:auto;}');
    return;
}
else if(googleresponse.match(/automated queries/))
{
			googleresponse = googleresponse.replace(/src="\/sorry\//ig,'src="http://google.com/sorry/');	
			googleresponse = googleresponse.replace(/action="Captcha"/ig,'action="http://google.com/sorry/Captcha"');	
			googleresponse = googleresponse.replace(/<form /,'<form target="_blank" ');
			alert('google is blocking the results \nenter the capcha or delete your cookies from google' );
			var top =document.getElementById('tn15torrentz').offsetTop+20;
			foundresults.innerHTML	+= '<div id="'+where+'ResultsRHere" style="border: #F8F4D1  1px dashed; font-size:8pt;font-weight:bold;font-family:arial,sans-serif;background-color:#F3EEAD;margin: 5px; padding: 5px; overflow-x: hidden; overflow-y: auto; -moz-border-radius-bottomleft: 10px; -moz-border-radius-bottomright: 10px; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; position: absolute; right: '+rightpositionprs+'%; top: '+top+'px; width: 45%; opacity: 0.95; z-index: 100; height: auto; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">'+googleresponse+'Error 404 obtained with <a href='+googlesearchurl+'>this query</a> </div>';
			return;
}
else
{  
	foundresults.innerHTML	= '<div id="'+where+'ResultsRHere" style="">'+
	'<a href='+googlesearchurl+'>this query</a> did not match any documents</div>';	


	    //no results from first query
       /*
   	   var top =document.getElementById('tn15torrentz').offsetTop+document.getElementById('tn15torrentz').offsetHeight;
       googlesearchurlqueryfixed = googlesearchurl.replace(/&quot;/g,'%22');
	   googlesearchurlqueryfixed = googlesearchurlqueryfixed.replace(/"/g,'%22');
	   foundresults.innerHTML	= '<div id="'+where+'ResultsRHere" style="border: #DDCA75  1px dashed; font-size:8pt;font-weight:bold;font-family:arial,sans-serif;background-color:#F3EEAD;margin: 5px; padding: 5px; overflow-x: hidden; overflow-y: auto; -moz-border-radius-bottomleft: 10px; -moz-border-radius-bottomright: 10px; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; position: absolute; right: '+rightpositionprs+'%; top: '+top+'px; width: 45%; opacity: 0.95; z-index: 100; height: auto; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">No results <a href="'+googlesearchurlqueryfixed+'">with this</a> query ,try another one:<br/>'+
  	   '<div>'+inputbox+'<input type="image" align="absmiddle" id="show_more" src="/images/tvgrid/button_go.gif"/></div></div>';
	   document.getElementById('show_more').addEventListener("click", prepareforanewgooglesearch, false); 
	   */
		   // make an automatic alternative search
		   //no results from first query so we make a secont different query
  	       if (TheQueryIsCommingFrom == "openOtherhosts"){
  	       	newgooglesearchurl =	"http://www.google.com/search?hl=en&q=%22"+moviename+"%22+%22interchangeable+links%22+OR+%22megaupload+com+d%22+OR+%22mediafire.com%2F%5C%5C%3F%22+OR+%22hotfile+com+dl%22OR+%22uploaded+to+id%22+OR+%22megashares.com%22+OR+%22rapidshare.de%5C%2Ffiles%22+OR+%22depositfiles%5C.com%22+OR+%22netload%5C%5C.in%22+OR+%22filefactory.com/file/%22&num=100&btnG=Search";
	          }
  	       if (TheQueryIsCommingFrom == "openRapidshare"){
  	       	newgooglesearchurl =	"http://www.google.com/search?hl=en&q=%22"+moviename+"%22+%22rapidshare+com+files%22&num=100&btnG=Search";
            }

  	}

  }
});
	
	
	
		
}

function analyseResults(toanalyse,where){

	toanalyse = toanalyse.replace(/title=\".*?\" /g,'');	
	  
//var toanalyse_array=toanalyse.split("</nobr>");
var toanalyse_array=toanalyse.split("<li class=\"g\">");

GM_addStyle('span#nr_of_links{color:#6F3822;font-size:11px;padding:0 19px;}');
GM_addStyle('div#final_links{font-family:Verdana;color:black;font-size:11px;margin:0 13px 4px;padding:0 14px;font-weight:normal;}');
GM_addStyle('#hand {cursor:help;}');	

var x = 0;
for (var i = 0; i < toanalyse_array.length; i++) {

		toanalyse_array[i] = toanalyse_array[i].replace(/\. DVDRip /,' ');	
		toanalyse_array[i] = toanalyse_array[i].replace(/\&nbsp\;/g,'');
		var myregexp = /<a href="(.*?)" .*?>(.*?)<\/a><\/h3>/;
		var match = myregexp.exec(toanalyse_array[i]);

		  if (match != null) {
	  		linko = match[1];
	  		linko = linko.replace(/\/interstitial\?url=/g,'');	  
	  		linktitle = match[2];
	   		if (x < 20){ //no more than 15 results
       		get_url_analize_and_show_them(linko,linktitle,where);       		
     		}
     		x++;
  		  }	
   	}
}


Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

//function unique end

function get_url_analize_and_show_them(linko,linktitle,where){



	GM_xmlhttpRequest({
		    method:'GET',
		    url:linko,
		    headers: {'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',},
			onload:function(responseDetails){
				indyvidualpages = responseDetails.responseText;
				indyvidualpages = indyvidualpages.replace(/(<a.*?>).*?(<\/a.*?>)/g,"$1$2");
				var rapregexp = /((?:http:\/\/rapidshare\.com\/files\/\d{5,}\/.*?)|(?:ed2k:\/\/.*?)|(?:http:\/\/www\.megaupload\.com\/\?d=\w.*?)|(?:http:\/\/hotfile\.com\/dl\/.*?)|(?:http:\/\/www\.sharevirus\.com.*?)|(?:http:\/\/www\.sharethefiles\.com.*?)|(?:http:\/\/www\.divxplanet\.com.*?)|(?:http:\/\/netload\.in.*?)|(?:http:\/\/www\.filefactory\.com.*?)|(?:http:\/\/rapidshare.de.*?)|(?:http:\/\/d\d{1,}\.megashares\.com.*?)|(?:http:\/\/uploaded\.to.*?)|(?:http:\/\/mediafire\.com.*?)|(?:http:\/\/sharedzilla\.com.*?)|(?:http:\/\/www\.adrive\.com.*?)|(?:http:\/\/www\.badongo\.com.*?)|(?:http:\/\/www\.flyupload\.com.*?)|(?:http:\/\/www\.sharing\.ru.*?)|(?:http:\/\/depositfiles\.com\/files\/.*?)|(?:http:\/\/www\.sendspace\.com.*?)|(?:http:\/\/mihd\.net.*?)|(?:http:\/\/friendlyfiles\.net.*?)|(?:http:\/\/up-file\.com.*?))(?:\<|\)|\"|\'| |\r|\n|http:\/\/)/ig;

				var myArray = [];

				while (raplinksmatch = rapregexp.exec( indyvidualpages )){
					if(!(raplinksmatch[1].match(/\.\.\./))){
						
						if ( myArray.length==0) {myArray.push(raplinksmatch[1]);}else{
						if ((myArray[myArray.length-2] != raplinksmatch[1])){
						   myArray.push(raplinksmatch[1]);
							}
						
						}
					}
					}
				myArray.sort;

				var dalinks1 = myArray.join('<br/>');
				var dalinks1 = myArray.join("</div><div id='foundlink'>");
				dalinks1 = "<div id='foundlink'>"+dalinks1;
				dalinks1 = dalinks1.replace(/<div id='foundlink'>$/,'')

				if ( dalinks1.match(/ed2k/) ){
						dalinks = dalinks1.slice(0,1980);
						dalinks = dalinks + '...';		
						dalinks = dalinks.replace(/(ed2k:\/\/.*?)\|(\d{3,})\|(\w{32})\|/g,"$2 Bytes <a href=http://ed2k.shortypower.dyndns.org/?hash=$3>ed2k-stats</a><!--a href=http://bitzi.com/search/?keywords=$3>bitzi</a--> <a href=$1|$2|$3>ed2k link</a> ");
					}else{
						dalinks = dalinks1.slice(0,1980);
						dalinks = dalinks + '...';		
					}

			  if (myArray.length>0){           
				 
				 analised = '<hr>Number of links : ' +myArray.length+'<br> from :<a href='+linko+'>' + linktitle + '</a><br>links:<br>'+ dalinks;	
				 var therigthfoundlink = document.evaluate('//a[contains(@href, "'+linko+'") and not (contains(@href, "related")) and not (contains(@href, "cache"))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);				 
				 //var therigthfoundlink = document.evaluate('//a[contains(@href, "'+linko+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							 
							 for (var i = 0; i < therigthfoundlink.snapshotLength; i++) {
								 node = therigthfoundlink.snapshotItem(i);
								 var span = document.createElement('div');
								 span.setAttribute('id', 'additional_info');
								 span.setAttribute('class', 'comment');
								 span.innerHTML += '<span id="nr_of_links">' +myArray.length +' links detected</span>'+
												   '<div id="final_links" class="article">'+ dalinks+'</div>';
								 node.parentNode.appendChild(span);  
							  }        
					   
					   }
		
				}
			});
		}




function GetAndShowMeTheSubsResults(){
GM_addStyle('.chart_head {background:transparent url(/images/tn15/messageboard_header_bgd.gif) repeat-x scroll 0 0;color:white;font-size:10px;Height:19px;text-align:center;}');	
GM_addStyle('.chart_odd_row {background-color:#F0F1F7;border-bottom:1px dotted #999999;border-top:1px dotted #999999;font-size:12px;vertical-align:middle;}');	
GM_addStyle('.chart_even_row {background-color:#FAFAFA;border-bottom:1px dotted #999999;border-top:1px dotted #999999;font-size:12px;vertical-align:middle;}');	
	
	
	GM_addStyle('img#PleaseWaitForSubs{  display: block; padding:0px 70px 3px;}');
if (GM_getValue("language")){
var what_language_do_you_want_to_search_for = GM_getValue("language");
}else{
var what_language_do_you_want_to_search_for = "eng";
GM_setValue("language", "eng");
	};

var new_language = what_language_do_you_want_to_search_for;

url =	"http://www.opensubtitles.com/en/search/sublanguageid-"+what_language_do_you_want_to_search_for+"/imdbid-"+imdbID;
////url =	"http://www.opensubtitles.com/en/search/sublanguageid-"+what_language_do_you_want_to_search_for+"/imdbid-"+movieID;
// example http://www.opensubtitles.com/en/search/sublanguageid-eng/imdbid-0070488	
GM_xmlhttpRequest({
		    method:'GET',
		    url:url+"/rss_2_00",
		    headers: {'User-agent': 'UniversalBrowserRead',},
			onload:function(responseDetails){

					var foundresults = document.getElementById('SpaceForSubsResults');

					if (responseDetails.responseText.match(/<item>/)){
					var opensubtitlesresults = '<table border="0" width="98%">';
					    opensubtitlesresults += '<tr class="chart_head"><th text-align="center">Movie Name</th><th>Release</th><th>Format</th><th>Uploaded</th></tr>';
							
					responseDetails.responseText = responseDetails.responseText.replace(/\n/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/\r/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/.*?<\/skipHours>    <item>/,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<item>/g,'<br>');
					responseDetails.responseText = responseDetails.responseText.replace(/<\/item>/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<pubDate>.*?<\/pubDate>/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<title>(.*?)<\/title>      <link>(.*?)<\/link>/g,'<a href=$2>$1</a>');
					responseDetails.responseText = responseDetails.responseText.replace(/Format:/g,'</a>Format:');
					responseDetails.responseText = responseDetails.responseText.replace(/	Released as\: /g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/;										/g,' | ');
					responseDetails.responseText = responseDetails.responseText.replace(/;					/g,' | ');
					responseDetails.responseText = responseDetails.responseText.replace(/Enter your search terms.*/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<description>/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<\/description>/g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/<textinput>      <title>Search subtitles<\/title> /g,'');     
					responseDetails.responseText = responseDetails.responseText.replace(/Download:.*?      <enclosure.*?>              /g,'');
					responseDetails.responseText = responseDetails.responseText.replace(/\t/g,'');
					//responseDetails.responseText = responseDetails.responseText.replace(/ Uploaded at /g,'');
opensubtitlesresults += responseDetails.responseText.replace(/      <a/g,'<tr><td><a');
opensubtitlesresults = opensubtitlesresults.replace(/ <\/a>Format: /g,'</td><td>');
opensubtitlesresults = opensubtitlesresults.replace(/ \| /g,'</td><td>');
opensubtitlesresults = opensubtitlesresults.replace(/<br>Format: /g,'</td></tr>');
opensubtitlesresults = opensubtitlesresults.replace(/<\/a>/g,'</a></td><td>');
opensubtitlesresults = opensubtitlesresults.replace(/ \|/g,'');
opensubtitlesresults = opensubtitlesresults.replace(/Uploaded at /g,'');

opensubtitlesresults = opensubtitlesresults.replace(/<tr>(.*?)<tr>/g, "<tr class=\"chart_odd_row\">$1<tr class=\"chart_even_row\">");

opensubtitlesresults += '</table>';

					foundresults.innerHTML += opensubtitlesresults;
					foundresults.style.fontSize  = "87%";
				}else if(responseDetails.responseText.match(/title="Download"/)){
					foundresults.innerHTML += "<div>Found <a href="+url+">one</a> subtitle</div>";
					}
				else{
					foundresults.innerHTML += "<div>No results</div>";
					}
					
foundresults.innerHTML += "<DIV id=SubsResultsRHere><a style='color:white;' href='"+url+"'>from opensubtitles.com</a></DIV><DIV>&nbsp;</DIV>";

                  }
                  });

//staring code for all4divx.com 

function isEven(num) {
  return !(num % 2);
}


movienameforall4divxurl = moviename.replace(/ /,'+');
movienameforall4divxurl = moviename.replace(/\//,'+');
// getting the FullNameLanguage
if (GM_getValue("FullNameLanguage")){
var FullNameLanguage = GM_getValue("FullNameLanguage");
}else{
var FullNameLanguage = "English";
GM_setValue("FullNameLanguage", "English");
	};

	
if (FullNameLanguage == "ALL"){	
var FullNameLanguage = "any";} // correction it doesn't exits 'ALL' in all4divx it exits 'any'

// getting the FullNameLanguage end

var all4divxurl = "http://all4divx.com/subtitles/"+escape(movienameforall4divxurl)+"/"+FullNameLanguage+"/xml";

GM_xmlhttpRequest({
		    method:'GET',
		    url:all4divxurl,
		    headers: {'User-agent': 'Greasemonkey_userscript_IMDB_Pirated_Version',},
			onload:function(responseDetails){
					var foundresults = document.getElementById('SpaceForSubsResults');
					var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
					var items = xmlobject.getElementsByTagName('subtitle');

	if (items.length>1){
		
		var all4divxresults = '<table border="0" width="98%">';
			all4divxresults += '<tr class="chart_head"><th text-align="center">Movie Name</th><th>Release</th><th>Language</th><th>cds</th></tr>';
	
		for (var i = 0 ; i < items.length ; i++) {
            var item = items[i];
	        var title = item.getElementsByTagName("title")[0].firstChild.nodeValue;
	        var release = item.getElementsByTagName("release")[0].firstChild.nodeValue;
	        var language = item.getElementsByTagName("language")[0].firstChild.nodeValue;	
     	    var cd=item.getElementsByTagName("cd")[0].firstChild.nodeValue;	
     	    var link=item.getElementsByTagName("link")[0].firstChild.textContent;	

      if(isEven(i)){var class_row="chart_odd_row";}else{var class_row="chart_even_row";}
     
        all4divxresults += '<tr class="'+class_row+'"><td><a href='+link+'>'+title+'</a></td><td>'+release+'</td><td>'+language+'</td><td>'+cd+'</td></tr>';
				
			}
		}else{
		  all4divxresults = '<br><table><div>No results</div>';
			 }
          all4divxresults += '</table>';
          foundresults.innerHTML += all4divxresults;
          GM_addStyle('img#PleaseWaitForSubs{  display: none;}');
					
foundresults.innerHTML += "<DIV id=SubsResultsRHere><a style='color:white;' href='"+all4divxurl.replace(/\/xml$/,'/1')+"'>from all4divx.com</a></DIV><DIV>&nbsp;</DIV>";
        
                  }
                });

}
//code for all4divx.com end

function MatchFromStartToEnd(dstring,start,end){	
	dstring = dstring.match(start+'(.*?)'+end);
	if (dstring[1]){
		return dstring[1];
		}
    }
/*
function transformThisstringForGoogleSearch(dstring){	
	dstring = dstring.replace(/Kundun/g,'xxxxxxxxx');
	return dstring;
    }
*/
function GetAndShowMeTheScene(){
	
	GetAndShowMeTheorlydb();
	GetAndShowMeTheVcdquality();
	
	}

	
function GetAndShowMeTheorlydb(){
GM_addStyle('span.timestamp{display:inline-block;font-size:11px;height:12px;overflow:hidden;width:69px;}');
GM_addStyle('span.section{display:inline-block;font-size:11px;width:51px;height:12px;overflow:hidden;}');
GM_addStyle('a#release{display:inline-block;font-size:11px;height:13px;line-height:13px;overflow:hidden;position:relative;top:2px;width:44em;}');
GM_addStyle('div#release{display:inline-block;font-size:11px;height:13px;line-height:13px;overflow:hidden;position:relative;top:2px;width:44em;}');
GM_addStyle('span.inforight{font-size:11px;}');
GM_addStyle('span.info{font-size:11px;}');
GM_addStyle('span.nuke{font-size:11px;}');
GM_addStyle('img#PleaseWaitForVcdQuality{  display: block; padding:0px 70px 3px;}');
searchorlydb ='http://www.orlydb.com/?q='+moviename;


    GM_xmlhttpRequest({
        method: 'GET',
         url: searchorlydb,
         headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
         onload: function(rd) {

        if (rd.status == 200) {

         rd.responseText = rd.responseText.replace(/\n/g,' ');
         rd.responseText = rd.responseText.replace(/\r/g,' ');
         rd.responseText = rd.responseText.replace(/\t/g,' ');
         rd.responseText = rd.responseText.replace(/  /g,' ');

      var intersestpart = MatchFromStartToEnd(rd.responseText,'<div id="releases">','<div id="pager">');  	    
          
          //intersestpart = intersestpart.replace(/<div> <span class=.*?MP3.*? <\/div> /g, "");       
          //console.log(intersestpart);
          intersestpart = intersestpart.replace(/a href="\//,'a href="http://www.orlydb.com/');      
                      
         // intersestpart = intersestpart.replace(/<span class="release">(.*?)<\/span>/gi,'<a href="#$1" id="release">$1</a>');
          intersestpart = intersestpart.replace(/<span class="release">(.*?)<\/span>/gi,'<div id="release">$1</div>');
          intersestpart = intersestpart.replace(/<div>         <span(.*?)<div>         <span/g, "<div class='odd'> <span$1<div> <span");
          intersestpart = intersestpart.replace(/<a href="#/g, "<a target=\"_blank\" href=\"http://www.google.com/search?q=");
		  intersestpart = intersestpart.replace(/<a href="\/s\//g, "<a href=\"http://www.orlydb.com/s/");
          intersestpart = intersestpart.replace(/<a href="\/dl\/(.*?)\/" class="dlright"><span class="dl">DL<\/span><\/a>/g, "<a href=\"http://metasearch.torrentproject.com/?search=$1\" target=\"_blank\" class=\"dlright\"><span class=\"dl\">find torrent</span></a> \r\n<a href=\"http://torrentproject.com/userscripts/rapidshare_links_checker_new/search/?search=$1\" target=\"_blank\" class=\"dlright\"><span class=\"dl\">http download</span></a>");


   var SpaceForVCDQualityResults = document.getElementById('SpaceForVCDQualityResults');	   
	   SpaceForVCDQualityResults.innerHTML += intersestpart;
	   SpaceForVCDQualityResults.innerHTML += "<div id=VcdqualityResultsRHere><a href='"+searchorlydb+"'>from orlydb.com</a></div><DIV>&nbsp;</DIV>";

GM_addStyle('#vcdtablestyle { text-align:left; font-size:larger; background:transparent url(/images/tn15/lhs_selected_bgd.gif) repeat scroll 0 0;}');
GM_addStyle('#vcdtablestyle a:link{ color:white; text-decoration:none;}');
GM_addStyle('th.views-field {font-size:11px;font-weight:normal;line-height:100%;}');
GM_addStyle('td.views-field {line-height:100%;}');
GM_addStyle('td.views-field-title {float:left;overflow:hidden;width:32em;}');
GM_addStyle('img#PleaseWaitForVcdQuality{  display: none; padding:0px 70px 3px;}');


}else{
	GM_addStyle('img#PleaseWaitForVcdQuality{  display: none; padding:0px 70px 3px;}');
	}
}});}
	
function GetAndShowMeTheVcdquality(){
GM_addStyle('img#PleaseWaitForVcdQuality{  display: block; padding:0px 70px 3px;}');
searchvcd ='http://www.vcdq.com/search-vcdq?title=';
urlvcd = searchvcd+moviename;

    GM_xmlhttpRequest({
        method: 'GET',
         url: urlvcd,
          headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {
			 
        if (rd.status == 200) {
		//GM_log(rd.responseText);
         rd.responseText = rd.responseText.replace(/\n/g,' ');
         rd.responseText = rd.responseText.replace(/\r/g,' ');
         rd.responseText = rd.responseText.replace(/\t/g,' ');
         rd.responseText = rd.responseText.replace(/This is a release news site only. It is impossible to download anything except jpeg samples from this site. Please DO NOT e-mail me asking where\/how to download\/buy anything mentioned on this site. Thanks -X69/i,'');
         rd.responseText = rd.responseText.replace(/<table/g,'<table id="vcdqualitytbl"'); 
         rd.responseText = rd.responseText.replace(/styles\/(?:\w{2,})\/(\w{2,}|\d)\.gif/g, "styles/vcdxp/$1.gif");
         rd.responseText = rd.responseText.replace(/styles\/vcdxp\/nfo\.gif\" title=\"X\"/g,'styles/neonblue/nfo.gif" title="click to read nfo"'); 
         rd.responseText = rd.responseText.replace(/<img /g,'<img border="0" '); 
         rd.responseText = rd.responseText.replace(/Date/,'&nbsp;Date'); 
         rd.responseText = rd.responseText.replace(/<a href="index.php/g,'<a href="http:\/\/www.vcdquality.com/index.php');
         //rd.responseText = rd.responseText.replace(/\/sites\/all\/themes\/vcdq\/images/g,'http://www.vcdq.com/sites/all/themes/vcdq/images'); 
         //rd.responseText = rd.responseText.replace(/\/search-vcdq/g,'http://www.vcdq.com/search-vcdq'); 
         rd.responseText = rd.responseText.replace(/<script type="text\/javascript">.*?<\/script>/g, "");
         rd.responseText = rd.responseText.replace(/<td class="views-field views-field-created-1"> *<\/td>/g, "");
         rd.responseText = rd.responseText.replace(/<th class="views-field views-field-tid"> *Source *<\/th>/g, "");
         rd.responseText = rd.responseText.replace(/<a href="\/\/cdn/g, "<a href=\"http://cdn");
         rd.responseText = rd.responseText.replace(/<a href="\//g, "<a href=\"http://www.vcdq.com/");
         rd.responseText = rd.responseText.replace(/Comment/g, "Comm");
         //GM_log(rd.responseText);
       var re = new RegExp('<table.*?table>', 'i', 'm');
       var imdblinkvcd = re.exec(rd.responseText);      
       if (!(imdblinkvcd)){
		   imdblinkvcd = '<table id="vcdqualitytbl" class="views-table cols-7" style="font-size:1em !important;">No results from vcdq.com</table>';
		   }

   var SpaceForVCDQualityResults = document.getElementById('SpaceForVCDQualityResults');	   
	   SpaceForVCDQualityResults.innerHTML += imdblinkvcd;
	   SpaceForVCDQualityResults.innerHTML = SpaceForVCDQualityResults.innerHTML.replace(/<table id=\"vcdqualitytbl\" .*?>Comments<\/a><\/th> <\/tr> <tr><t.*?<\/table>/g, '<table id="vcdqualitytbl"><tr></tr><tr><td>No results from vcdquality.com</td></tr></table>');
	   SpaceForVCDQualityResults.innerHTML += "<div id=VcdqualityResultsRHere><a href='"+urlvcd+"'>from vcdquality.com</a></div><DIV>&nbsp;</DIV>";
       SpaceForVCDQualityResults.firstChild.style.fontSize = "0.75em";
       SpaceForVCDQualityResults.firstChild.style.width = "98%";
       
   var somelayoutVCDQualityResults = document.getElementById('vcdqualitytbl');
       if (somelayoutVCDQualityResults.rows[0]) {somelayoutVCDQualityResults.rows[0].setAttribute('id','vcdtablestyle');}
	 //var image_folder = document.getElementsByTagName('link')[0].href.replace(/consumersite.css$/,'');
GM_addStyle('#vcdtablestyle { text-align:left; font-size:larger; background:transparent url(/images/tn15/lhs_selected_bgd.gif) repeat scroll 0 0;}');
GM_addStyle('#vcdtablestyle a:link{ color:white; text-decoration:none;}');
GM_addStyle('th.views-field {font-size:11px;font-weight:normal;line-height:100%;}');
GM_addStyle('td.views-field {line-height:100%;}');
GM_addStyle('td.views-field-title {float:left;overflow:hidden;width:27em;}');
GM_addStyle('table#vcdqualitytbl{  width: 100%; }');
GM_addStyle('img#PleaseWaitForVcdQuality{  display: none; padding:0px 70px 3px;}');

//GM_addStyle('th.views-field-title {overflow:hidden;position:absolute;width:29em;}');
GM_registerMenuCommand('Get the 3 latest screenshots from vcdquality', function(){showallimagesvcd();});

//getandshownfo();

}else{
GM_addStyle('img#PleaseWaitForVcdQuality{  display: none; padding:0px 70px 3px;}');	
	}
}});}
/*
function getandshownfo(){
var vcdqualitynfohak = document.evaluate(
//"id('vcdqualitytbl')/tbody/tr/td[5]/a",
"id('vcdqualitytbl')/tbody/tr/td[8]/a[1]",    
  document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var y = 0; y < vcdqualitynfohak.snapshotLength; y++) {	
    vcdqualitynfohak.snapshotItem(y).id = vcdqualitynfohak.snapshotItem(y).href;
    vcdqualitynfohak.snapshotItem(y).href = '#';
	vcdqualitynfohak.snapshotItem(y).addEventListener( "click", shownfo , true);
	vcdqualitynfohak.snapshotItem(y).addEventListener( "move", shownfo , true);
	}
}

function shownfo(evt){

	link = evt.target.parentNode.id;
	link = link.replace(/vcdquality/g,'vcdq');
	link = link.replace(/$/g,'&show=text');
	
    GM_xmlhttpRequest({
        method: 'GET',
         url: link,
          headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {
      if (rd.status == 200) {

      	rd.responseText = rd.responseText.replace(/\n/g,'<br/>');
      	rd.responseText = rd.responseText.replace(/\r/g,'');
      	
      	rd.responseText = rd.responseText.replace(/^.*?<pre>/g,'');
      	rd.responseText = rd.responseText.replace(/<\/pre>.*?$/g,'');
//▀■▄█░¦▀▄▓▒░▓▒▓░▓░░▒░▓░▒▓▒▓█▒
//Ì  
//Ù
//─
// ┌──────┐
// │      │
// └──────┘ 
    	
      	rd.responseText = rd.responseText.replace(/Ü/g,'▄');
      	rd.responseText = rd.responseText.replace(/Û/g,'█');
      	rd.responseText = rd.responseText.replace(/°/g,'░');
      	rd.responseText = rd.responseText.replace(/±/g,'▒');
      	rd.responseText = rd.responseText.replace(/²/g,'▓');
      	rd.responseText = rd.responseText.replace(/þ/g,'■');
      	rd.responseText = rd.responseText.replace(/ß/g,'▀');
      	rd.responseText = rd.responseText.replace(/Þ/g,'▐');
      	rd.responseText = rd.responseText.replace(/Ý/g,'▌');
      	rd.responseText = rd.responseText.replace(/Ä/g,'─');
      	rd.responseText = rd.responseText.replace(/³/g,'│');
      	rd.responseText = rd.responseText.replace(/Í/g,'═');
      	rd.responseText = rd.responseText.replace(/Ñ/g,'╤');
      	rd.responseText = rd.responseText.replace(/À/g,'└');    
      	rd.responseText = rd.responseText.replace(/Ù/g,'┘');    
      	rd.responseText = rd.responseText.replace(/º/g,'║');  
      	rd.responseText = rd.responseText.replace(/Ì/g,'╠');
      	rd.responseText = rd.responseText.replace(/¹/g,'╣');
      	rd.responseText = rd.responseText.replace(/È/g,'╚');
      	rd.responseText = rd.responseText.replace(/É/g,'╔');
      	rd.responseText = rd.responseText.replace(/»/g,'╗');
      	rd.responseText = rd.responseText.replace(/¼/g,'╝');
      	rd.responseText = rd.responseText.replace(/¿/g,'┐');
      	rd.responseText = rd.responseText.replace(/Ë/g,'╦');
      	rd.responseText = rd.responseText.replace(/Å/g,'┼');
      	rd.responseText = rd.responseText.replace(/Ú/g,'┌');
      	rd.responseText = rd.responseText.replace(/ú/g,'-'); // not this actualy
      	rd.responseText = rd.responseText.replace(/Ã/g,'├');

      	configureScript(rd.responseText);
      	}}});
	
}
*/


function GetAndShowMeTheTorrentz(query)  {

             GM_addStyle('#p-maintrrz{  display: block;}');              	
				 if (query == null) {
					 query = moviename.replace(/\%20/g, "+");
				    }
				    
				 if (!(query.match(/\+/) )){
					query +="+"+year;
					}	
	          
//fixing the query for the torrents search

query = query.replace(/'s/g, "");
query = query.replace(/'/g, " ");
query = query.replace(/\./g, " ");  
query = query.replace(/ù/g, "u");                                          
var SpaceForTorrentResults = document.getElementById('SpaceForTorrentResults');

if (document.getElementById('torrentsmeta')){
	SpaceForTorrentResults.style.visibility = "visible";
	SpaceForTorrentResults.style.height = "auto";
	return;  
	}
	
	GM_addStyle('img#PleaseWaitForTorrents{  display: block; padding:0px 70px 3px;}');
	var torrentsearchsrc = 'http://metasearch.torrentproject.com/imdbpirated.php?search='+query;
	   ifrm = document.createElement("IFRAME");
	   ifrm.setAttribute("src", torrentsearchsrc);
	   ifrm.setAttribute("width", "100%");
	   ifrm.setAttribute("height", "500px");
	   ifrm.setAttribute("border", "0");
	   ifrm.setAttribute("id", "torrentsmeta");
	SpaceForTorrentResults.appendChild(ifrm); 
   
	
	GM_addStyle('iframe#torrentsmeta{  border:0px;}');
	GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');


return;
  
if (!(isNaN(GM_getValue("torrentz.com")))){

var get_results_from_torrentz_eu = GM_getValue("torrentz.com");
var get_results_from_pizzatorrent_com = GM_getValue("pizzatorrent.com");
var get_results_from_piratebay_org = GM_getValue("piratebay.org");
var get_results_from_mininova_com = GM_getValue("mininova.com");
var get_results_from_btjunkie_org = GM_getValue("btjunkie.org");
var get_results_from_rarbg_com = GM_getValue("rarbg.com");
var get_results_from_vertor_com = GM_getValue("vertor.com");
var get_results_from_h33t_com = GM_getValue("h33t.com");

}else{
	//alert('This is the first run of the IMDB Pirated Version userscript\n');
	// to do run configuration;
var get_results_from_torrentz_eu = true;
var get_results_from_pizzatorrent_com = false;
var get_results_from_piratebay_org = false;
var get_results_from_mininova_com = true;
var get_results_from_btjunkie_org = false;
var get_results_from_rarbg_com = false;
var get_results_from_vertor_com = false;
var get_results_from_h33t_com = false;

GM_setValue("torrentz.com", get_results_from_torrentz_eu);
GM_setValue("pizzatorrent.com", get_results_from_pizzatorrent_com);
GM_setValue("piratebay.org", get_results_from_piratebay_org);
GM_setValue("mininova.com", get_results_from_mininova_com);
GM_setValue("btjunkie.org", get_results_from_btjunkie_org);
GM_setValue("rarbg.com", get_results_from_rarbg_com);
GM_setValue("vertor.com", get_results_from_vertor_com);
GM_setValue("h33t.com", get_results_from_h33t_com);

};

if (get_results_from_torrentz_eu){getrorrentz_eu();}
if (get_results_from_pizzatorrent_com){getpizzatorrent_com();} 
if (get_results_from_piratebay_org){getthepiratebay_org();}  
if (get_results_from_mininova_com){get_mininova_com();}
if (get_results_from_btjunkie_org){get_btjunkie_org();}
if (get_results_from_rarbg_com){get_rarbg_com();}
if (get_results_from_vertor_com){get_vertor_com();}
if (get_results_from_h33t_com){get_h33t_com();}

function get_btjunkie_org(){
search='http://btjunkie.org/search?q=';




//url = search+query;

url = search+query+'+size>600&c=6'; 

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {        
      
      if (rd.responseText.match(/Did you mean:/)){
      	SpaceForTorrentResults.innerHTML += "No Torrents Found <a href='"+url+"'>at btjunkie.org</a>";
      	}else
      		{ 

      			rd.responseText = rd.responseText.replace(/\n/g,'');
      			rd.responseText = rd.responseText.replace(/\r/g,'');

        var re = new RegExp('<table cellpadding="1".*?Next', 'i', 'm');
 
        
        var imdblink = re.exec(rd.responseText);	
        
        imdblink = imdblink.toString();
        imdblink = imdblink.replace(/<(?:|\/)font.*?>/g,'');
        imdblink = imdblink.replace(/FFFF99/g,'F3EEAD');
        imdblink = imdblink.replace(/<tr bgcolor="#F1F2F6"><th colspan="7" height="4"><\/th><\/tr>/g,'');
        imdblink = imdblink.replace(/<tr bgcolor="#FFFFFF"><th colspan="7" height="4"><\/th><\/tr>/g,'<tr bgcolor="#F3EEAD"><th colspan="7" height="1"></th></tr>');
        imdblink = imdblink.replace(/="\//g,'="http://btjunkie.org/');
        imdblink = imdblink.replace(/>\t\t<a href=.*?\/files\/.*?listfiles.*?<\/a>/g,'>');
        imdblink = imdblink.replace(/<th bgcolor="#FFFF66".*?<\/th>/g,'');
        imdblink = imdblink.replace(/align="center"><table.*/g,'align="center"></table>');
        imdblink = imdblink.replace(/'\/images/g,"'http://btjunkie.org/images");
        

        SpaceForTorrentResults.innerHTML += "<br/><DIV id=TorrentzResultsRHere><a href='"+url+"'>from btjunkie.org</a></DIV><DIV>&nbsp;</DIV>";
        SpaceForTorrentResults.innerHTML += imdblink;
        
        
       
    GM_addStyle('.label {color:brown !important;}');  
 
    GM_addStyle('.barback { border: 1px solid #B5B5B5;display: block;background-color:#FFFFFF;width: 38px;height: 7px; }');
    GM_addStyle('.barback2 { border: 1px solid #B5B5B5;display: block;background-color:#FFFFFF;width: 120px;height: 5px; }');
    GM_addStyle('.bar1 { background-color:#FF0000;display: block;width: 6px; height: 7px; }');
    GM_addStyle('.bar2 { background-color:#FFFF00;display:block;width:14px; height:7px; }');
    GM_addStyle('.bar3 { background-color:#32CD32;display: block;width: 22px; height: 7px; }');
    GM_addStyle('.bar4 { background-color:#32CD32;display: block;width: 30px; height: 7px; }');
    GM_addStyle('.bar5 { background-color:#32CD32;display: block;width: 38px; height: 7px;}');


GM_addStyle('.tab_results { color: #000000; font-weight: normal; font-size:10px !important; background-color:#F3EEAD; padding:1px 0; }');

GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');

           }

        
      }
    }
  });
	}

function getrorrentz_eu(){
var torrentzsearch='http://www.torrentz.com/searchA?q=';


//query = encodeURI(moviename); 

//var torrentzurl = torrentzsearch+query+'&p=0&s=A';
var torrentzurl = torrentzsearch+query+'+movies&p=0&s=A';
    GM_xmlhttpRequest({
        method: 'GET',
        url: torrentzurl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
        var re = new RegExp('<div class="results">.*?</dl></div>', 'i', 'm');
		rd.responseText = rd.responseText.replace(/<h3>.*?<\/h3>/g,'');
        rd.responseText = rd.responseText.replace(/<p>/g,'</div>');
        rd.responseText = rd.responseText.replace(/<a href="\//g,'<a href="http:\/\/www.torrentz.com/');
        rd.responseText = rd.responseText.replace(/<iframe src=.*?\/iframe>/g,'');
        rd.responseText = rd.responseText.replace(/<div class="nav"><span>&laquo;.*?Next &raquo;<\/a><\/div>/g,'');
        rd.responseText = rd.responseText.replace(/i\/h(\d).png/g, "http:\/\/torrentz.com\/i\/h$1.png");
        rd.responseText = rd.responseText.replace(/img src=\"\/img\/rss.png\"/,'img src="http://torrentz.com/img/rss.png"');
        
        
        var imdblink = re.exec(rd.responseText);	
      
      
      if (rd.responseText.match(/Please try other or less keywords/)){
      	SpaceForTorrentResults.innerHTML = "No Torrents Found <a href='"+url+"'>at torrentz.com</a>";
      	}else
      		{     
        
        SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+torrentzurl+"'>from torrentz.com</a></DIV><DIV>&nbsp;</DIV>";
        SpaceForTorrentResults.innerHTML += imdblink;
             var head = document.getElementsByTagName('head')[0];
             if(!head) { return; }
             var link = document.createElement('link');
                 link.setAttribute('rel', 'stylesheet');
                 link.setAttribute('type', 'text/css');
                 link.setAttribute('href', 'http://torrentz.com/style.css');
             head.appendChild(link);          
        

              GM_addStyle(':link {text-decoration:none !important;}');
              //update
              GM_addStyle("div.results > dl > dt {font-size:11px;}"); 
              GM_addStyle("div.results > dl > dd {font-size:11px;}");
              GM_addStyle("div.results > h2 {font-size:12px;padding:0px 0pt 0px 8px;border-bottom:0px solid #FFFFFF;}");
              GM_addStyle("div.results > div {float:right; font-size:12px;padding:0px 14px 0pt 0pt;}");
              GM_addStyle("div.results > dl {background-color:#FFFFFF;border-bottom:1px solid PaleGoldenrod;display:block;padding:0px 0pt;}");
              GM_addStyle("div.info {background:white;border:0px solid #00B900;font-size:100%;line-height:131%;margin:0pt;padding:0px 0px;}");
              GM_addStyle("div.results {background:PaleGoldenrod url(http://torrentz.com/img/ctr.gif) no-repeat scroll right top;margin:20px 0pt;}");
             
              //make some css changes
              GM_addStyle("#p-maintrrz {width: 100%; margin: 9px auto 0 auto;}"); 
              GM_addStyle("#p-mainvcdq {width: 100%; margin: 9px auto 0 auto;}");                	
              GM_addStyle("#tn15main h4 {font-size: 88%;}");  	
              GM_addStyle("div.results #head a {color:000000;}"); 
              GM_addStyle("div.results #head {background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom;}"); 
              GM_addStyle("div.results #head ul li{text-align:right;}");
              GM_addStyle("div.results div.result {border-bottom:1px solid gainsboro}"); 
              GM_addStyle('div.results {margin:0pt 0px 3px;width:98%;} '); 
              GM_addStyle('div.results > dl > dd > span.u {width:44px;} '); 
              GM_addStyle('body {  width: 98%;}');
              GM_addStyle('#tn15main, #tn15main table  {line-height: 100%;}');  
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');

           }

        
      }
    }
  });
}  


//thepiratebay.org start
function getthepiratebay_org(){

//you may change the thepiratebayurl
thepiratebayurl = 'http://thepiratebay.org/search/'+query+'/0/7/200';
//thepiratebayurl = 'http://thepiratebay.org/search/300 (2006) sdfsd fsdfs sdf sdf/0/7/200';
    GM_xmlhttpRequest({
        method: 'GET',
        url: thepiratebayurl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
        	if (!(rd.responseText.match(/No hits. Try adding/))){

rd.responseText = rd.responseText.replace(/\n|\r/g, "");
rd.responseText = rd.responseText.replace(/.*?<table id=\"searchResult\">/,'<table id="searchResult">');
rd.responseText = rd.responseText.replace(/<\/table>.*/,'</table>');
rd.responseText = rd.responseText.replace(/href=\"\//g,'href=\"http://thepiratebay.org/');


   SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+thepiratebayurl+"'>from thepiratebay.org</a></DIV><DIV>&nbsp;</DIV>";
   SpaceForTorrentResults.innerHTML += rd.responseText;
GM_addStyle('table#searchResult {font-size:80%; width:98%;} '); 
GM_addStyle('table#searchResult > tbody > tr {background-color:#FFFFFF;} '); 
GM_addStyle('table#searchResult > tbody > tr > td {border-bottom:1px solid PaleGoldenrod;} '); 
GM_addStyle('table#searchResult > thead > tr.header {background:paleGoldenRod;font-size:12px;color:#805B4D;font-weight:normal;line-height:131%;} '); 
GM_addStyle('table#searchResult > thead > tr.header a:link  {color:#805B4D;}'); 
GM_addStyle('table#searchResult > thead > tr.header a:visited  {color:#805B4D;}'); 
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');
        }}}});

}
//thepiratebay.org end

//rarbg.com start
function get_rarbg_com(){

//you may change the rarbgurl
rarbgurl = 'http://rarbg.com/torrents.php?imdb='+imdbID;
//rarbgurl = 'http://rarbg.com/torrents.php?search=dark+knight&category=14;15;16;17;18;19;20;21;22'
//'http://rarbg.com/torrents.php?imdb='+imdbID;
    GM_xmlhttpRequest({
        method: 'GET',
        url: rarbgurl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
        	if (!(rd.responseText.match(/No hits. Try adding/))){

rd.responseText = rd.responseText.replace(/\n|\r/g, "");
rd.responseText = rd.responseText.replace(/<img src=\".*?\".*?>/g,'');


rd.responseText = rd.responseText.replace(/<td width=\".*?\" align=\".*?\" class=\".*?\">.*?>/g,'');
rd.responseText = rd.responseText.replace(/.*?<table width=\"100%\" class=\"lista2\"><tr>/,'<table id="searchResult" class="maintable"><tr style="background-color:PaleGoldenrod;">');
rd.responseText = rd.responseText.replace(/<td align="left" class="lista"><a href="torrents\?category=\d*"><\/td>/g, "");
rd.responseText = rd.responseText.replace(/<\/table>.*/,'</table>');
rd.responseText = rd.responseText.replace(/href=\"\//g,'href=\"http://rarbg.com/');

SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+rarbgurl+"'>from rarbg.com</a></DIV><DIV>&nbsp;</DIV>";
SpaceForTorrentResults.innerHTML += rd.responseText;


GM_addStyle('table#searchResult {font-size:80%; width:98%;} '); 
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');
        }}}});

}
//rarbg.com end

//h33t.com start
function get_h33t_com(){
//you may change the rarbgurl
h33turl = 'http://www.h33t.com/torrents.php?search='+query+'&category=1&active=1&tracked=0&Go.x=29&Go.y=13&Go=Search';
GM_xmlhttpRequest({
method: 'GET',
url: h33turl,
headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {
if (rd.status == 200) {
	if (!(rd.responseText.match(/No hits. Try adding/))){
rd.responseText = rd.responseText.replace(/\n|\r/g, "");
//rd.responseText = rd.responseText.replace(/<img src=\".*?\".*?>/g,'');
rd.responseText = rd.responseText.replace(/<TD align=\"center\" class=\"header\"><a href=\".*?\">h0t<\/a><\/TD>/g,'');
rd.responseText = rd.responseText.replace(/.*?<TABLE width=\"100\%\" align=\"center\" class=\"lista\" border=\"0\">/,'<table id="searchResult">');
rd.responseText = rd.responseText.replace(/<td align=\"center\" class=\"lista\"><a href=\"towh.php\?id=1\" title=\"Movies hot torrents\"><img src=.*?alt=\"\"\/><\/a><\/td>	/g, "");
rd.responseText = rd.responseText.replace(/<\/TABLE>.*/,'</table>');
rd.responseText = rd.responseText.replace(/HREF=\"/g,'href="http://www.h33t.com/');
rd.responseText = rd.responseText.replace(/HREF=download.php/g,'href=http://www.h33t.com/download.php');
rd.responseText = rd.responseText.replace(/href=\"\//g,'href=\"http://www.h33t.com/');
rd.responseText = rd.responseText.replace(/href=userdetails.php/g,'href=http://www.h33t.com/userdetails.php');
//<td align="left" class="lista"><a href="torrents\?category=\d*"></td>
SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+h33turl+"'>from h33t.com</a></DIV><DIV>&nbsp;</DIV>";
SpaceForTorrentResults.innerHTML += rd.responseText;
GM_addStyle('table#searchResult {font-size:80%; width:98%;} ');
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');
        }}}});
}
//h33t.com end

//vertor.com start
function get_vertor_com(){

vertorurl = 'http://www.vertor.com/index.php?mod=search&search=&words='+query+'&x=0&y=0';
    GM_xmlhttpRequest({
        method: 'GET',
        url: vertorurl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
        	if (!(rd.responseText.match(/Nothing found/))){
				

//rd.responseText = rd.responseText.replace(/\n|\r/g, "");
//rd.responseText = rd.responseText.replace(/.*?<table class=\"search\">/,'<table id="searchResult">');
//rd.responseText = rd.responseText.replace(/<table id="searchResult">    <tr>/,'<table id="searchResult" class="maintable">    <tr class="header">');
//rd.responseText = rd.responseText.replace(/<\/table>.*/,'</table>');

rd.responseText = rd.responseText.replace(/\n|\r/g, "");
rd.responseText = rd.responseText.replace(/.*?<table class=\"search\">/,'');
rd.responseText = rd.responseText.replace(/.*?<table class=\"search\">/,'<table id="searchResult">');
rd.responseText = rd.responseText.replace(/<table id="searchResult">    <tr>/,'<table id="searchResult" class="maintable">    <tr class="header">');
rd.responseText = rd.responseText.replace(/<\/table>.*/,'</table>');



SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+vertorurl+"'>from vertor.com</a></DIV><DIV>&nbsp;</DIV>";
SpaceForTorrentResults.innerHTML += rd.responseText;

GM_addStyle('table.maintable {font-size:80%; width:98%;} '); 
GM_addStyle('tr.d {font-size:11px; width:98%;} '); 
GM_addStyle('.maintable .ti.com {background-color:paleGoldenRod; padding:0px 0px 0px 4px; -moz-border-radius:7px;}'); 
GM_addStyle('table.maintable tr {	border-bottom:1px solid PaleGoldenrod;}'); 
GM_addStyle('table.maintable th {	padding: 1px 1px 1px 1px;	background-color: PaleGoldenrod;	-moz-border-radius-bottomleft:4px;	-moz-border-radius: 3px 3px 3px 3px;	border-top-width: 1px;	border-bottom-width: 1px;	border-top-style: inset;	border-bottom-style: inset;	border-top-color: PaleGoldenrod;	border-right-color: #FFFFFF;	border-bottom-color: PaleGoldenrod;	border-left-color: #FFFFFF;}'); 
GM_addStyle('table.maintable {	border-spacing: 0px;	border-collapse: collapse;	background-color: white;	border-top-width: medium;	border-bottom-width: 0px;	border-top-style: solid;	border-bottom-style: solid;	border-left-style: none;	border-top-color: PaleGoldenrod;	border-bottom-color: PaleGoldenrod;	font-size: small;}'); 
GM_addStyle('#linksfrommininova{	color: #75808A !important; margin-left:2px; text-transform:lowercase;}'); 
GM_addStyle('table#maintable > tbody > tr.header a:link  {color:#805B4D;}');
GM_addStyle('table#searchResult {font-size:80%; width:98%;} '); 
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');

        }}}});

}
//vertor.com end

//pizzatorrent start
function getpizzatorrent_com(){

pizzaquery = moviename.replace(/\%20/g, "-");
pizzaquery = query.replace(/'/g, "");
pizzaquery = query.replace(/\./g, " ");

pizzatorrenturl = 'http://www.pizzatorrent.com/'+pizzaquery+'-torrents';

    GM_xmlhttpRequest({
        method: 'GET',
        url: pizzatorrenturl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
rd.responseText = rd.responseText.replace(/\n|\r/g, "");

			var pizzaaray = rd.responseText.match(/\[\{.*?\}\]/g);
			if (!(pizzaaray)){return;}			
				var mypizzaresultsArray = [];
				for(var i=0; i<pizzaaray.length; i++){
					pizzaaray[i] = pizzaaray[i].replace(/^\[/,'var cache=[');	
					eval(pizzaaray[i]);
				  
				  	for(var y=0; y<cache.length; y++){

				  	  myString = cache[y].name +'';
				  	  
				  	  re = new RegExp("(?:^| )"+pizzaquery+"(?: |$)");
	if ((cache[y].relevance > 0) && (!(cache[y].link +'').match(/usenext/i))){
		mypizzaresultsArray.push("<tr><td>"+cache[y].relevance +"</td><td>"+cache[y].date + "</td><td><a href='"+cache[y].link+"'>"+ cache[y].name+"</a></td><td>"+cache[y].seeds+"</td><td>"+cache[y].peers+"</td><td>"+cache[y].engine+"</td><td></tr>");
				  	}


				  }
				
			}

mypizzaresultsArray = mypizzaresultsArray.sort();
res = mypizzaresultsArray.join();
res = res.replace(/\,/g,'');

var table = '<table class="sortable" id="myTable"><tr><th class="sortable">relevance</th><th class="sorttable_numeric">date</th><th>name</th><th>seeds</th><th>peers</th><th>engine</th><th></tr>'+res+'</table>';
SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+pizzatorrenturl+"'>from pizzatorrent.com</a></DIV><DIV>&nbsp;</DIV>";
SpaceForTorrentResults.innerHTML += table;

GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');       
        }}});
}                
     
//pizzatorrent end



// mininova.org start
function get_mininova_com(){
mininovaurl = 'http://www.mininova.org/imdb/?imdb='+imdbID;

    GM_xmlhttpRequest({
        method: 'GET',
        url: mininovaurl,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
                onload: function(rd) {
        if (rd.status == 200) {
        	if (!(rd.responseText.match(/No results found/))){

        	rd.responseText = rd.responseText.replace(/<img src=.*?>/g,'');
        	rd.responseText = rd.responseText.replace(/<tr>/g,'<tr class="d">');
        	rd.responseText = rd.responseText.replace(/onclick=".*?"/g,'');
        	rd.responseText = rd.responseText.replace(/<small>in /g,'<small><span id="linksfrommininova">ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»</span> ');
        	rd.responseText = rd.responseText.replace(/href="\//g,'href="http://www.mininova.org/'); //http://www.mininova.org/tor/1033892
        	rd.responseText = rd.responseText.replace(/href="http:\/\/www.mininova.org\/sub/g,'id="linksfrommininova" href="http://www.mininova.org/sub');
        	rd.responseText = rd.responseText.replace(/<span id="linksfrommininova">.*?<\/span>/g,'');
        	
        	var regexpressmininova = new RegExp('<table class="maintable".*?</tr></table>', 'i', 'm');
        	var imdblink = regexpressmininova.exec(rd.responseText);

        	SpaceForTorrentResults.innerHTML += "<DIV id=TorrentzResultsRHere><a href='"+mininovaurl+"'>from mininova.org</a></DIV><DIV>&nbsp;</DIV>";
        	SpaceForTorrentResults.innerHTML += imdblink;
GM_addStyle('table.maintable {font-size:80%; width:98%;} '); 
GM_addStyle('tr.d {font-size:11px; width:98%;} '); 
GM_addStyle('.maintable .ti.com {background-color:paleGoldenRod; padding:0px 0px 0px 4px; -moz-border-radius:7px;}'); 
GM_addStyle('table.maintable tr {	border-bottom:1px solid PaleGoldenrod;}'); 
GM_addStyle('table.maintable th {	padding: 1px 1px 1px 1px;	background-color: PaleGoldenrod;	-moz-border-radius-bottomleft:4px;	-moz-border-radius: 3px 3px 3px 3px;	border-top-width: 1px;	border-bottom-width: 1px;	border-top-style: inset;	border-bottom-style: inset;	border-top-color: PaleGoldenrod;	border-right-color: #FFFFFF;	border-bottom-color: PaleGoldenrod;	border-left-color: #FFFFFF;}'); 
GM_addStyle('table.maintable {	border-spacing: 0px;	border-collapse: collapse;	background-color: white;	border-top-width: medium;	border-bottom-width: 0px;	border-top-style: solid;	border-bottom-style: solid;	border-left-style: none;	border-top-color: PaleGoldenrod;	border-bottom-color: PaleGoldenrod;	font-size: small;}'); 
GM_addStyle('#linksfrommininova{	color: #75808A !important; margin-left:2px; text-transform:lowercase;}'); 
GM_addStyle('table#maintable > tbody > tr.header a:link  {color:#805B4D;}'); 
GM_addStyle('img#PleaseWaitForTorrents{  display: none;}');


        }}}});
}
// mininova.org end
				 
      	
}


//VIDEO YEA

if (GM_getValue("trailer") == "show"){

var addtickonShowTrailers = document.getElementsByTagName('input');
for (var i = addtickonShowTrailers.length - 1; i >= 0; i--) {
		  if (addtickonShowTrailers[i].id == 'trailersoption'){
		    addtickonShowTrailers[i].addEventListener("change", minimizefuncarea, false);
	      	addtickonShowTrailers[i].checked=true;
	      }    
}
Add_Trailer_direct_view();
}else{
	tR = document.getElementById('adremovedvideospace');
	tR.parentNode.removeChild(tR);

	}


/////////////Trailer Direct View

function Add_Trailer_direct_view(){ 
	
	
	if (document.getElementById('videospace')){
		return;
		}

      	var main = document.getElementById('tn15torrentz');

      	var videospace = document.createElement("div");  	
      	videospace.id = 'videospace';
      	videospace.setAttribute('width', '55%');      

   		var other_trailers = document.createElement("span");
   		other_trailers.setAttribute('id', 'other_trailers'); 
   		other_trailers.setAttribute('style', 'padding: 2.3px 5px 5px; overflow: hidden; -moz-border-radius-bottomleft: 10px; -moz-border-radius-bottomright: 10px; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; width: 70px; opacity: 1.7; margin-top: 0px; height: 15px; position: absolute;');

		GM_addStyle('.ch5{  position:relative;}');


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}



function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

//------


main.appendChild(videospace);


var trailerview = document.evaluate(
  "//a[contains(@href, 'video/trailer/me')]",  
  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
for (var i = 0; i < trailerview.snapshotLength; i++) {
	var trailerlinkpoint = trailerview.snapshotItem(i);	
    gettheImagesandTheflvlinks(trailerlinkpoint);
}

function gettheImagesandTheflvlinks(url){	
	GM_xmlhttpRequest({ method: 'GET',         url: trailerlinkpoint+'player',
          headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {if (rd.status == 200) {
         var regexfile = /"file", "(http%3A%2F%2Fia.media-imdb.com(?:.*?).flv)"/;
         var file = regexfile.exec(rd.responseText)[1];
         //file = rd.responseText.match /so.addVariable\(\"file\"\, http%3A%2F%2Fia.media-imdb.com%2Fimages%2FM%2FMV5BMTA3NTIyNTUzNjNeQTJeQWZsdl5BbWU3MDUzNTI5NTE%40._V1_.flv\"\)\;/;
         var regeximage = /"image", "(http%3A%2F%2Fia.media-imdb.com(?:.*?).jpg)"/;
         var image = regeximage.exec(rd.responseText)[1];
createtheiframes(image,file);
//callback(image,file);
        }}});
      }
function createtheiframes(image,file){
	  var div = document.createElement('div');
      div.setAttribute("id","video-page");
	  GM_addStyle("div#video-page {overflow:hidden;}"); 
	  GM_addStyle("div.media_strip_thumbs {height:auto;overflow:visible;}"); //will fix the images
   	  div.innerHTML = '<embed width="400" height="316" allowfullscreen="true" flashvars="file='+file+'&image='+image+'&backcolor=0xF00000&frontcolor=0xCCCCCC&lightcolor=0x557722&shuffle=false&repeat=end&autostart=false&width=400&overstretch=none&height=316" quality="high" bgcolor="#FFFFFF" name="player" id="player" style="" src="/images/js/app/video/flvplayer.swf?c=1" type="application/x-shockwave-flash"/>';
	  trailerlinkpoint.appendChild(div);
}


function changeYouTubeShape(){
//250 200
//323 258
var cfg = new Array();
	cfg['url'] = new Array();
	//cfg['url']['zoomin'] = 'http://myspecial.de/player/toggle_big.png';
	cfg['url']['zoomin'] =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAINJREFUOE/tU1sKwDAIs7v/RewluzkQgqRzuJ8ymk/rI8ZUZONfCgyAqo64ncUQbPvGglbk8XahknNkWuMQz2Wx2Ic27r0LMsVGcRvLLcG1RLZvGJeGrV1UlYIez737pKW/MZ+bVKlH76Tg5TiQeT31MSuafRo8atp49qXXdsZm90mBE8g+daV5GY3vAAAAAElFTkSuQmCC';
	//cfg['url']['zoomout'] = 'http://myspecial.de/player/toggle_small.png';
	cfg['url']['zoomout'] =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAIdJREFUOE/tU0EOwCAI0/3/I/jJTZZhGmLRLLu4yEUjtClQU9rxrwmcT4y6iuqOCKxAzYvIfeLdcgyfWcIDcw2tZe+ehyo2oqijqIYSY/uMfKZmtKcF8tomhknGt2gU1BXeAT1XvFreyKc96+Eiuq5AUlVVSmkYvaPSGQEN/MWXXsBGWyKbwAUBTHWlshsvcgAAAABJRU5ErkJggg==';
	img = cfg['url']['zoomout'];  	

if (document.getElementById('tn15main')){
	tn15main = 'tn15main';
	difereinwindth = 9;
	}else if (document.getElementById('main')){
	tn15main = 'main';	
	difereinwindth = 26;
	}else{
	tn15main = 'maindetails_center_bottom';	
	difereinwindth = 26;
		}
		
var playerZoomWidth = document.getElementById(tn15main).clientWidth - difereinwindth;
var playerZoomHeight = (parseInt(playerZoomWidth)/parseInt(parseInt(document.getElementById('jeroenwijering').style.height)/parseInt(document.getElementById('jeroenwijering').style.width)));
var playerSmallHeight = 258;
var playerSmallWidth = 323;	

		if(parseFloat(document.getElementById('jeroenwijering').width) != playerZoomWidth){ 
			// kanta megala
			if (tn15main == 'tn15main'){document.getElementById('adremovedvideospace').style.width = playerZoomWidth+"px";	}		
			document.getElementById('jeroenwijering').width = playerZoomWidth;
            document.getElementById('jeroenwijering').height = (playerZoomWidth/playerSmallWidth)*playerSmallHeight;			
			document.getElementById('ytplayerX').width = playerZoomWidth;	
			document.getElementById('ytplayerX').height = (playerZoomWidth/playerSmallWidth)*playerSmallHeight;	
            document.getElementById('toggleSize').src = cfg['url']['zoomout'];
		}else{
			if (tn15main == 'tn15main'){document.getElementById('adremovedvideospace').style.width = "323px";	}	
			document.getElementById('jeroenwijering').width = "323";	
			document.getElementById('jeroenwijering').height = '258';			
			document.getElementById('ytplayerX').width = "323";	
			document.getElementById('ytplayerX').height = '258';	
            document.getElementById('toggleSize').src = cfg['url']['zoomin'];
		}
	}

function useyoutubeplayer(){

googlejsonurl = 'http://www.google.com/uds/GvideoSearch?callback=json_callback&context=0&lstkp=0&rsz=large&hl=en&source=gsc&gss=.com&sig=6cc925a597703a43cc65b5d7c705f351&start=0&q='+MovieName[1]+'%20trailer+HD+OR+movie+OR+'+year+'%20site:youtube.com&key=notsupplied&v=1.0';

	GM_xmlhttpRequest({
		method: 'GET',
		url: googlejsonurl,		
		onload: function(jsonhttp) {
            var jsontxt = jsonhttp.responseText;
				jsontxt = jsontxt.replace(/^json_callback\(\'0\',/,'');
				jsontxt = jsontxt.replace(/"}},.*$/,'"}}');
			    json = eval('(' + jsontxt + ')') ;

			if(json.results[1].title){
					title = json.results[0].title;
					viimg = json.results[0].tbUrl;
					ratei = json.results[0].rating;
					conte = json.results[0].content;
					vidur = json.results[0].url;
					youtubeid =	vidur.match(/%3Fv%3D(.*?)&/)[1];
				
if (youtubeid){ 

youtubelinktitle=title;
  
var div = document.createElement('div');
	div.id = "holdinthem";
	if(document.getElementById('main')){
	div.innerHTML = '<h3 style="width:35em;overflow:hidden;height:19px;"> '+youtubelinktitle+'</h3>';	
		}else{
	div.innerHTML = '<h3 style="width:19em;overflow:hidden;height:1.2em; font-size:136% !important;margin: 0;"> '+youtubelinktitle+'</h3>';
		} 
var swf = document.createElement("embed");

var youtubediv_jeroenwijering = document.createElement('div');
    youtubediv_jeroenwijering.id = "youtube_embed";

var object_jeroenwijering = document.createElement('object');
	object_jeroenwijering.id="jeroenwijering";  
	object_jeroenwijering.width="323"; 
	object_jeroenwijering.height="258";

var param1 = document.createElement('param');
	param1.name = "movie";
	param1.value="http://www.youtube.com/v/"+youtubeid+"&hl=en&fs=1&hd=1&color1=0xD4D9DD&color2=0xEEE7A0&enablejsapi=1&playerapiid=ytplayer";

var param2 = document.createElement('param');
	param2.name = "allowFullScreen";
	param2.value="true";

var param3 = document.createElement('param');
	param3.name = "allowscriptaccess";
	param3.value="always";

var embed_jeroenwijering = document.createElement('embed');
	embed_jeroenwijering.id = "ytplayerX";
	embed_jeroenwijering.src = "http://www.youtube.com/v/"+youtubeid+"&hl=en&fs=1&iv_load_policy=3&hd=1&color1=0xD4D9DD&color2=0xEEE7A0&showinfo=0&enablejsapi=1&playerapiid=ytplayer";
	embed_jeroenwijering.type="application/x-shockwave-flash";
	embed_jeroenwijering.setAttribute("allowfullscreen","true");
	embed_jeroenwijering.setAttribute("wmode","transparent");
	embed_jeroenwijering.setAttribute("allowscriptaccess","always");
	embed_jeroenwijering.width="323"; 
	embed_jeroenwijering.height="258";

	object_jeroenwijering.appendChild(param1);
	object_jeroenwijering.appendChild(param2);
	object_jeroenwijering.appendChild(param3);
	object_jeroenwijering.appendChild(embed_jeroenwijering);
	youtubediv_jeroenwijering.appendChild(object_jeroenwijering);


var cfg = new Array();
	cfg['url'] = new Array();
	//cfg['url']['zoomin'] = 'http://myspecial.de/player/toggle_big.png';
	cfg['url']['zoomin'] =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAINJREFUOE/tU1sKwDAIs7v/RewluzkQgqRzuJ8ymk/rI8ZUZONfCgyAqo64ncUQbPvGglbk8XahknNkWuMQz2Wx2Ic27r0LMsVGcRvLLcG1RLZvGJeGrV1UlYIez737pKW/MZ+bVKlH76Tg5TiQeT31MSuafRo8atp49qXXdsZm90mBE8g+daV5GY3vAAAAAElFTkSuQmCC';
	//cfg['url']['zoomout'] = 'http://myspecial.de/player/toggle_small.png';
	cfg['url']['zoomout'] =	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAIdJREFUOE/tU0EOwCAI0/3/I/jJTZZhGmLRLLu4yEUjtClQU9rxrwmcT4y6iuqOCKxAzYvIfeLdcgyfWcIDcw2tZe+ehyo2oqijqIYSY/uMfKZmtKcF8tomhknGt2gU1BXeAT1XvFreyKc96+Eiuq5AUlVVSmkYvaPSGQEN/MWXXsBGWyKbwAUBTHWlshsvcgAAAABJRU5ErkJggg==';
	img = cfg['url']['zoomin'];  	
       
var img_toggleSize = document.createElement("img"); 
    img_toggleSize.id = "toggleSize";
    img_toggleSize.src = img;
    img_toggleSize.setAttribute("style","cursor: pointer; float: left; z-index:10; position:relative; left:10px;margin:-10px;top:9px;");

div.appendChild(img_toggleSize);    
    
div.appendChild(youtubediv_jeroenwijering);

if(document.getElementById("adremovedvideospace")){  		
    document.getElementById("adremovedvideospace").appendChild(div);
}
	document.getElementById('toggleSize').addEventListener('click', changeYouTubeShape, false);
    
}else{
	//GM_addStyle('#Show_Trailer {color:gray;}');
	GM_addStyle('#trailersoption {opacity:0.4;}');
	
	}
					
				}
				
	
			
			}});
}


if (!(trailerlinkpoint)){
useyoutubeplayer();
}
}		
/////////////////Trailer direct view end

/////////////////alternative_watch start
function alternative_watch(youtubevideo){
	
	GM_addStyle('#alternative_watch{cursor:pointer;color:#003399;text-decoration:underline}');
	alternative_watch_id = document.getElementById('alternative_watch');
	alternative_watch_id.addEventListener('click',get_download_link,false);
get_download_link();
  function get_download_link(){
  	youtubevideo = youtubevideo.replace(/\/v\//, "watch?v=");
	  url = youtubevideo;
	  GM_xmlhttpRequest({ method: 'GET',         url: url,
          headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {if (rd.status == 200) {
        	var aStr = rd.responseText;      	

}}});
}
}

/////////////////alternative_watch end
	
	
/////////////////size_controlers_for_trailer start
function size_controlers_for_trailer(){
	GM_addStyle('#sizecontrol {display:inline;position:relative;}');
			if (!(isNaN(GM_getValue("objwidthtr")))){
        var objwidthtrf = GM_getValue("objwidthtr");
        var objheighttrf = GM_getValue("objheighttr");
      }else{
      var objwidthtrf = "";
      var objheighttrf = "";	
      }	
	sizecontrolspace = document.getElementById("sizecontrol");
	sizecontrolspace.innerHTML += 'Width :<input style="font-size:1em !important; top:2px;font-size:0.8em; height:11px;  width:4em;" id="width" type="text" title="Search" value="'+objwidthtrf+'" maxlength="2048" size="41" name="q"/>';
    sizecontrolspace.innerHTML += ' Height :<input style="font-size:1em !important; top:2px; font-size:0.8em; height:11px;   width:4em;" id="height" type="text" title="Search" value="'+objheighttrf+'" maxlength="2048" size="41" name="q"/>';
    sizecontrolspace.innerHTML += '&nbsp;<input id="setsizebtn" type="submit" value="Set Trailer Size" style="border-color: rgb(204, 204, 238); font-size: 8pt; font-weight: bold; background-color: rgb(238, 238, 238); color: black;"/>';
	sizecontrolspacebtn = document.getElementById('setsizebtn');
	sizecontrolspacebtn.addEventListener("click", addeventbtn, false);
	
function addeventbtn(){

		var objwidthtr = document.getElementById('width').value;
		var objheighttr = document.getElementById('height').value;
		
var newtrailer = document.getElementById('newtrailer2');
if (newtrailer){
	if (!(newtrailer.getElementsByTagName('object')[0])){
			var object1 = document.createElement("object");
			document.getElementById('newtrailer2').appendChild(object1);
			}
		}
		
		
		
	if (newtrailer){
		var object1 = document.getElementById('newtrailer2').getElementsByTagName('object')[0];
		}else{
		var object1 = document.getElementById('videospace').getElementsByTagName('object')[0];
	}
		
		object1.width = objwidthtr;
		object1.height = objheighttr;
			
		if (object1.className != 1){
		  object1.className = '1';
	    }else{
		  object1.className = '2';
		  }

	if (document.getElementById('newtrailer2')){
		var embed = document.getElementById('newtrailer2').getElementsByTagName('embed')[0];
		
		if (!(embed)){var embed = object1.getElementsByTagName('embed')[0];}
			}else{
		var embed = document.getElementById('videospace').getElementsByTagName('embed')[0];
	}

		embed.style.setProperty( "position", "", "" );
		embed.width = objwidthtr;
		embed.height = objheighttr;
		
GM_setValue("objwidthtr", objwidthtr);
GM_setValue("objheighttr", objheighttr);

		if (object1.className == 1){
			embed.style.setProperty( "position", "relative", "" );
		 }else{
		  embed.style.setProperty( "position", "static", "" );
	   }
		
	}

}


/////////////////size_controlers_for_trailer end

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////// fuction to get binnary files ///////////////////////

function translateToBinaryString(text){
var out;
out='';
for(i=0;i<text.length;i++){
//*bugfix* by Marcus Granado 2006 [http://mgran.blogspot.com] adapted by Thomas Belot
out+=String.fromCharCode(text.charCodeAt(i) & 0xff);
}
encodedimage=encode64(out);
return encodedimage;
}


function encode64(input) {
var output = "";
var chr1, chr2, chr3;
var enc1, enc2, enc3, enc4;
var i = 0;
do {
chr1 = input.charCodeAt(i++);
chr2 = input.charCodeAt(i++);
chr3 = input.charCodeAt(i++);
enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;

if (isNaN(chr2)) {
enc3 = enc4 = 64;
} else if (isNaN(chr3)) {
enc4 = 64;
}
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
keyStr.charAt(enc3) + keyStr.charAt(enc4);
} while (i < input.length);
return output;
}	


function showallimagesvcd(){

  var vcdqualityhak = document.evaluate( 
  "id('vcdqualitytbl')/tbody/tr/td[6]/a[1]",  
  document,	null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

if 	(vcdqualityhak.snapshotLength > 3){
	howmanyimages = 3;
	}	else {
		howmanyimages = vcdqualityhak.snapshotLength;
		}
	
for (var y = 0; y < howmanyimages; y++) {	
		davcdimages = vcdqualityhak.snapshotItem(y);

if (vcdqualityhak.snapshotItem(y)){
davcdimages = davcdimages.href.replace(/index\.php\?page=sample&id=(\d*)/g,'sample/id$1\.jpg');

getImgAsDataScheme(davcdimages, showimage);

}

}


function showimage(encodedimage) {
  if (encodedimage.length > 1){
encodedimage = 'data:image/png;base64,'+encodedimage;
encodedimage = '<img src='+encodedimage+'><br>';
myWindow = window.open("",  encodedimage.length ,"width=650,height=500,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes");
myWindow.document.write(encodedimage);
myWindow.document.write('<FORM><INPUT type="button" value="Close Window" onClick="window.close()"></FORM>');
myWindow.document.bgColor="lightblue";
myWindow.document.close();	
}


  if (encodedimage.length < 80){
alive_link_png = 'data:image/png;base64,'+encodedimage;
	myWindow = window.open("",  encodedimage.length ,"width=300,height=300,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes");
	myWindow.document.write('<img src='+alive_link_png+'><FORM><INPUT type="button" value="Close Window" onClick="window.close()"></FORM>');
	myWindow.document.bgColor="lightblue";
	myWindow.document.close();

}

  if (encodedimage.length < -80){
alive_link_png = 'data:image/png;base64,'+encodedimage;
var img = document.createElement("img");
img.setAttribute('src', alive_link_png);
var div = document.createElement("div");
	div.style.fontWeight = "bolder";
	div.style.background = "#CCC";
	div.style.borderBottom = "1px solid #666";
	div.style.padding = '3px';
	div.style.float = 'left';
	div.style.height = 'auto';
	div.style.position = 'absolute';
	div.style.overflow = 'visible';
	div.style.width = 'auto';
	div.style.left = '5%'; 
	div.style.top = '86px'; 
	
div.appendChild(img);

var existingobject = document.getElementsByTagName("body");

existingobject[0].parentNode.insertBefore(div,existingobject[0]);
}
}

function getImgAsDataScheme(url, callback){
      GM_xmlhttpRequest({method: 'get',
      url: url,
      headers: {'User-agent': 'UniversalBrowserRead',},
      overrideMimeType: 'text/plain; charset=x-user-defined',
      onload: function(responseDetails) {
      	var re = new RegExp("<html>");
if (!(responseDetails.responseText.match(re))){ 

var encodedimage = translateToBinaryString(responseDetails.responseText);
callback(encodedimage);
}
        }
      });
      return;
}


}
//version = "20081225";
if (auto_check_for_a_new_version == 'yes'){
check_update(version);
}

function check_update(version){
 var today = new Date( );
 day = parseInt( getdays (today) );

    function getdays(date){
    	Year = ((date.getYear() + 1900)*365);    	
    	var daday = (date.getMonth() + 1);    	
         if(daday<10) {daday = "0" + daday;}
    	daday  = (daday*30);    	
    	daret = Year+daday+date.getDate();    	
    return daret;
    }

//GM_setValue("day","0");
if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 10)){
	//setTimeout(check_version,1000);
	check_version(version);
	GM_setValue("day",day);
	}
//check_version(version);

}

function check_version(version) {
		var script_url = "http://userscripts.org/scripts/source/21977.meta.js";
	GM_xmlhttpRequest({ method:"GET",url:script_url,
		onload:function(result) {

        var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];

		if (null == newversion){
			alert('There was an error in the update function of the "IMDB Pirated Version" userscript.\nGo to '+script_url+' to download the latest version.\nThis message will appear again in 10 days');
			}
 
		if(newversion==version){
			    return;
			}else{
				var answer = confirm('A new version of the "IMDB Pirated Version" userscript for Greasemonkey is available.\nYour version = '+version+'\nNew version = '+newversion+'\nDo you want to update now? Check for update will be done again in 10 days');

			  if (answer){			
                 GM_openInTab("http://userscripts.org/scripts/source/21977.user.js");
			    } 
		    }
          }
		});
}

// configureScript start
 //configureScript();
if (!(isNaN(GM_getValue("torrentz.com")))){

var get_results_from_torrentz_eu = GM_getValue("torrentz.com");
var get_results_from_pizzatorrent_com = GM_getValue("pizzatorrent.com");
var get_results_from_piratebay_org = GM_getValue("piratebay.org");
var get_results_from_mininova_com = GM_getValue("mininova.com");
var get_results_from_btjunkie_org = GM_getValue("btjunkie.org");
var get_results_from_rarbg_com = GM_getValue("rarbg.com");
var get_results_from_vertor_com = GM_getValue("vertor.com");
var get_results_from_h33t_com = GM_getValue("h33t.com");
var viewmoviesonline = GM_getValue("viewmoviesonline");
//alert(get_results_from_torrentz_eu);
}else{
	//alert('This is the first run of the IMDB Pirated Version userscript\nConfiguration will appear');
	//configureScript();
	// to do run configuration;
var get_results_from_torrentz_eu = true;
var get_results_from_pizzatorrent_com = false;
var get_results_from_piratebay_org = false;
var get_results_from_mininova_com = true;
var get_results_from_btjunkie_org = false;
var get_results_from_rarbg_com = false;
var get_results_from_vertor_com = false;
var get_results_from_h33tr_com = false;

var viewmoviesonline = true;
GM_setValue("torrentz.com", get_results_from_torrentz_eu);
GM_setValue("pizzatorrent.com", get_results_from_pizzatorrent_com);
GM_setValue("piratebay.org", get_results_from_piratebay_org);
GM_setValue("mininova.com", get_results_from_mininova_com);
GM_setValue("btjunkie.org", get_results_from_btjunkie_org);
GM_setValue("rarbg.com", get_results_from_rarbg_com);
GM_setValue("vertor.com", get_results_from_vertor_com);
GM_setValue("h33t.com", get_results_from_h33t_com);
GM_setValue("viewmoviesonline", viewmoviesonline);

};

function makecheckbox(id){
	checkbo_x = "<input_type='checkbox'_class_='checkboxconfig'_value='"+id+"'_name='"+id+"'_id='"+id+"'/>"; //false
	return checkbo_x;
	}
function configureScript(nfo){
	
	
	var node = document.createElement("div");
	node.setAttribute("id", "configuration_layer");

var code1 = "<span id='closeX'>X</span><table  cellspacing='1' cellpadding='3' border='0' align='center'><tbody><tr><td class='code'>";  

if(nfo){
	code2 = nfo;
	}else{
var code2 =""+
"<br> ▄██▄ ▄               ░            ▄¦ ▄███▀░▄ ▀▄              ▄     ▄   ▓     ▄██▄ "+
"<br>▒█▓░▓▒             ▄▒■  ▄█▄                              ▄█▄  ■▒▄            ▒▓░▓█▒"+
"<br>▒█▓▒▓▒     ▄  ░░▄▓■▒█▓▄░█▒░▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀░▒█░▄▓█▒■▓▄░░  ▄    ▒▓▒▓█▒"+ 
"<br> ▀██▀     ▓▓██■■▓█▓█▓█▓█ IMDB Pirated Version Configuration █▓█▓█▓█▓■■██▓▓    ▀██▀ "+
"<br> ║▒║█     ▀  ░░▀▓■▓█▒▀░█▒░▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄░▒█░▀▒█▓■▓▀░░  ▀      █║│█ "+
"<br> █║║█             ▀▒■  ▀█▀                              ▀█▀  ■▒▀              █║▒│ "+
"<br> ║▒║█▀██▄                                                                  ▄▄ █║│█ "+ 
"<br> ▄██▄   ▀██▄▄       ▄▄▄▄ ▀■▄░▄▀                         ▀▄░▄■▀ ▄▄▄▄    ▄▄████ ▄██▄ "+ 
"<br>▒█▓░▓▒    ▄▄ ▀▀■ ▄▀▀ ░▀▀▓▓▄ ▀▄▄█▓▀                   ▀▓█▄▄▀ ▄▓▓▀▀░ ▀▀▄ ▀ ▄▄  ▒▓░▓█▒"+ 
"<br>▒█▓▒▓▒                              ▄▄▓█■▀▀■█▓▄▄                             ▒▓▒▓█▒"+ 
"<br> ▀██▀                       Torrent Search Configuration                      ▀██▀ "+ 
"<br>  ██                                ▀▀▓█▄▄▄▄█▓▀▀                                   "+ 
"<br>       Get results from torrentz.com "+makecheckbox("torrentz.com")+ "                                       "+ 
"<br><br>       Get results from pizzatorrent.com cache only not live search "+makecheckbox("pizzatorrent.com")+"        "+ 
"<br><br>       Get results from piratebay.org "+makecheckbox("piratebay.org")+"                                      "+ 
"<br><br>       Get results from mininova.com search using the imdbID number                "+ 
"<br>       (eg "+imdbID+" for this page) not the name of the movie   "+makecheckbox("mininova.com")+"             "+ 
"<br><br>       Get results from btjunkie.org   "+makecheckbox("btjunkie.org")+"<br>                                     "+
"<br>       Get results from rarbg.com   "+makecheckbox("rarbg.com")+"<br>                                     "+  
"<br>       Get results from vertor.com   "+makecheckbox("vertor.com")+"<br>                                   "+ 
"<br>       Get results from h33t.com   "+makecheckbox("h33t.com")+"<br>                                   "+ 
"<br>▄▒▓▓▓▄                              ▄▄▓█■▀▀■█▓▄▄                             ▄■██■▄"+ 
"<br> ▀██▀                         Other Stuff  Configuration                      ▀██▀ "+ 
"<br>  ║║                                ▀▀▓█▄▄▄▄█▓▀▀                                   "+
"<br>       Watch movies online "+makecheckbox("viewmoviesonline")+ "                                       "+ 
"<br> ▒║║                                                                              "+ 
"<br> ║▒║█▀██▄                                                                  ▄▄ █║│█ "+ 
"<br> ▄██▄  ▀██▄▄       ▄▄▄▄ ▀■▄░▄▀ ▄▓▓█▄▄░■▄▄███▄▄■░▄▄█▓▓▄ ▀▄░▄■▀ ▄▄▄▄    ▄▄████  ▄██▄ "+ 
"<br>▒█▓░▓▒   ▄▄ ▀▀■ ▄▀▀ ░▀▀▓▓▄ ▀▄▄█▓▀ ▀▀▓█▄▄░▄ ▄░▄▄█▓▀▀ ▀▓█▄▄▀ ▄▓▓▀▀░ ▀▀▄ ▀ ▄▄   ▒▓░▓█▒"+ 
"<br>▒█▓▒▓▒▄██▓▓▀             ▀▀▀▀▀        ▀▀▀   ▀▀▀        ▀▀▀▀▀           ▀▓▓██▄▒▓▒▓█▒"+ 
"<br> ▀██▀                                                                    hosts▀██▀ ";
}
var code3 ="<br></td></tr></tbody></table>";
    node.innerHTML = code1 + code2.replace(/ /g,'&nbsp;').replace(/_/g,' ');    
    node.innerHTML += code3;         
	GM_addStyle("td.code {background-color:white;color:black;font-family:monospace;font-size:13px;font-weight:bold;line-height:13px;margin:0 auto;padding:2px;width:auto;}");
	GM_addStyle("a#configa {text-decoration:none; color:white;}"); 
	GM_addStyle("span#closeX {-moz-border-radius:10px;border:2px solid #F3EEAD;color:#F3EEAD;cursor:pointer;font-family:Verdana;font-size:110%;font-weight:bold;margin:2px 17px;padding:0 2px;position:absolute;right:0;top:7px;}"); 
	GM_addStyle("span#closeX:hover {border:2px solid white;color:white;}"); 
	//GM_addStyle("div#configuration_layer {background-color:black;-moz-border-radius:7px;border:5px solid graytext;color:white;font-family:Arial,Helvetica,sans-serif;font-size:14px;height:80%;left:118px;overflow-x:scroll;overflow-y:scroll;padding-bottom:10px;padding-left:10%;padding-right:10%;padding-top:10px;position:absolute;top:47px;width:52%;z-index:1010;}");
	GM_addStyle("div#configuration_layer {background-color:black;color:white;font-family:Arial,Helvetica,sans-serif;font-size:14px;height:100%;overflow-y:scroll;position:fixed;width:100%;z-index:1010;}"); 
    GM_addStyle("input.checkboxconfig{position:absolute;}"); 
var existingobject = document.getElementsByTagName("body");
	existingobject[0].parentNode.insertBefore(node,existingobject[0]);	

if(!(nfo)){
	document.getElementById("torrentz.com").checked = GM_getValue("torrentz.com");
	document.getElementById("torrentz.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("pizzatorrent.com").checked = GM_getValue("pizzatorrent.com");
	document.getElementById("pizzatorrent.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("piratebay.org").checked = GM_getValue("piratebay.org");
	document.getElementById("piratebay.org").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("mininova.com").checked = GM_getValue("mininova.com");
	document.getElementById("mininova.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("btjunkie.org").checked = GM_getValue("btjunkie.org");
	document.getElementById("btjunkie.org").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("rarbg.com").checked = GM_getValue("rarbg.com");
	document.getElementById("rarbg.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("vertor.com").checked = GM_getValue("vertor.com");
	document.getElementById("vertor.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("h33t.com").checked = GM_getValue("h33t.com");
	document.getElementById("h33t.com").addEventListener("change", torrentzfuncarea, false);
	document.getElementById("viewmoviesonline").checked = GM_getValue("viewmoviesonline");
	document.getElementById("viewmoviesonline").addEventListener("change", torrentzfuncarea, false);
}

	document.getElementById("closeX").addEventListener("click", closeconfigureScript, false);

		
	function closeconfigureScript(){
		document.getElementById("configuration_layer").parentNode.removeChild( document.getElementById("configuration_layer") );
		}
		
	function torrentzfuncarea(evt) {

			if ((GM_getValue(evt.target.id) == false) || (GM_getValue(evt.target.id) == "false")){
				GM_setValue(evt.target.id, true);
				document.getElementById(evt.target.id).checked = GM_getValue(evt.target.id);
			}else{
				GM_setValue(evt.target.id, false);
				document.getElementById(evt.target.id).checked = GM_getValue(evt.target.id);
			}

	}

}




//GM_registerMenuCommand("IMDB Pirated Version Configuration", configureScript, null, null, "P");
// configureScript end


///////////////// getInfoFromWikipedia ///////////////
/////////////////       start          ///////////////
getInfoFromWikipedia();

function removeElement(element) {
    element.parentNode.removeChild(element);
}

function addElementAfter(node,newnode)
    {
       node.parentNode.insertBefore(newnode,node.nextSibling);
    }

function closewikipediares(){
				var closewikipediaresults = document.getElementById('bodyContent');
					closewikipediaresults.parentNode.removeChild(closewikipediaresults);
				var wikipedia_more = document.getElementById('wikipedia_more')
					wikipedia_more.innerHTML = 'retrieve';
					wikipedia_more.removeEventListener("click", closewikipediares, false);				
					wikipedia_more.addEventListener("click", retWikipedia, false);			
	}
	
function callback2page(url,response)
	{
	var wikidiv = document.createElement('div');
		wikidiv.innerHTML = response;

	var wikibodyContent = wikidiv.getElementsByTagName('div');

GM_addStyle('.infobox {background-color:#F9F9F9;border:1px dotted #999999;clear:right;color:black;float:right;margin:0em 0 0.5em 1em;padding:0.2em;}');
GM_addStyle('div.tright {border-width:0.5em 0 0.8em 1.4em;clear:right;float:right;}');
GM_addStyle('div.thumb {border-color:white;border-style:solid;margin-bottom:0.5em;width:auto;}');
//GM_addStyle('div#bodyContent {background-color:#FFFFF0;}'); <-- this is also nice
GM_addStyle('div#bodyContent {background-color:#F0F1F7;margin-left:0px;padding-left:4px;}');


	 for (var y = 0; y < wikibodyContent.length; y++) {	
	   if(wikibodyContent[y].id == "bodyContent")
	 		{		
				var toremove = getElementsByClassName("editsection" , "span", wikibodyContent[y]);
			for(var i = 0; i < toremove.length; i++){
				toremove[i].parentNode.removeChild(toremove[i]);				
				}		
		
		wikibodyContent[y].innerHTML = wikibodyContent[y].innerHTML.replace(/<h2>/g,'<h3>');
		wikibodyContent[y].innerHTML = wikibodyContent[y].innerHTML.replace(/href="\//g,'href="http://en.wikipedia.org/');
				wikibodyContent[y].innerHTML = '<hr/><p>Retrieved from "<a href='+url+'>'+url+'</a>"</p>' + wikibodyContent[y].innerHTML + '<hr/>';
				var wikipedia_more = document.getElementById('divwikipedia');
				addElementAfter(wikipedia_more,wikibodyContent[y]);	
				removeElement(document.getElementById('PleaseWaitForWikipedia'));
				
				var wikipedia_more = document.getElementById('wikipedia_more')
				wikipedia_more.innerHTML = 'close';
				wikipedia_more.removeEventListener('click',retWikipedia,false);
				wikipedia_more.addEventListener("click", closewikipediares, false);	
	 		}
		}
	
    }
	
function retWikipediaPage(url)
	{		GM_xmlhttpRequest({
		    method:'GET',
		    url:url,
		    headers: {'User-agent': 'Greasemonkey_userscript_IMDB_Pirated_Version',},
			onload:function(res){
				if (res.status == 200 && callback2page) callback2page(url,res.responseText); }
				
				});		
	}

function callback(url,response)
	{
	var myregexp = /<li><div class='mw-search-result-heading'><a href="(\/wiki\/.*?)" title="(.*?)">(.*?)<\/a>/;
	var match = myregexp.exec(response);
	if (match != null) {
			url = "http://en.wikipedia.org"+match[1];
			retWikipediaPage(url);
		} else {
			
			var divnores = document.createElement("div");
			divnores.id = "noreswikipedia";
			divnores.setAttribute('class', 'info');
			divnores.innerHTML = '<h5>No results from wikipedia</h5>'; 
			addElementAfter(document.getElementById('wikipedia_more'),divnores);	
			removeElement(document.getElementById('PleaseWaitForWikipedia'));
		}
	}

function retWikipedia()
	{

		var imgPleaseWaitForSubs = document.createElement("img");
			imgPleaseWaitForSubs.id = 'PleaseWaitForWikipedia';	
			imgPleaseWaitForSubs.src=imgdata;
			imgPleaseWaitForSubs.setAttribute('style', 'display:block;margin-bottom:1em;');

		var wikipedia_more = document.getElementById('divwikipedia');	
			addElementAfter(wikipedia_more,imgPleaseWaitForSubs);			

		var wikiurl = "http://en.wikipedia.org/w/index.php?title=Special:Search&ns0=1&redirs=0&search="+imdbID+"+film+-Filmography&limit=20&offset=0";
		
		GM_xmlhttpRequest({
		    method:'GET',
		    url:wikiurl,
		    headers: {'User-agent': 'Greasemonkey_userscript_IMDB_Pirated_Version',},
			onload:function(res){
				if (res.status == 200 && callback) callback(wikiurl,res.responseText); }
				
				});
		
		
	}	 
 
function getInfoFromWikipedia()
	{
		if(document.getElementById('tn15rating')){
			var User_Rating = document.getElementById('tn15rating');
			}else if(document.getElementById('director-info')){
			var User_Rating = document.getElementById('director-info');	
				}else{
			var User_Rating = document.getElementById('title-overview-widget-layout');			
					}

		var div = document.createElement("div");
			div.id = "divwikipedia";
			div.setAttribute('class', 'wikipedia info');
			//div.setAttribute('style', 'dispay:inline');
			div.innerHTML = '<h5 style="display: inline; font-size: 12px;">Wikipedia Info:</h5>';
		
		var wikipedia_more = document.createElement("a");
			wikipedia_more.id = 'wikipedia_more';
			wikipedia_more.setAttribute('class', 'tn15more inline');
			wikipedia_more.setAttribute('style', 'cursor:pointer; color:#003399; text-decoration:underline;font-size:100%;');
			wikipedia_more.innerHTML = 'retrieve';
		
		div.appendChild(wikipedia_more);
		addElementAfter(User_Rating,div);
		wikipedia_more.addEventListener("click", retWikipedia, false);		
	}


//var a = document.getElementsByTagName('a');

//for(var i = 0; i < a.length; i++){
	//}

/////////////////         end          ///////////////
///////////////// getInfoFromWikipedia ///////////////



// MEMO  //
//  end  // 


//Direct-Download : Single Links to add MEMO
//http://www.2shared.com/file/4641168/1d817c0f nice speed
//http://www.eatlime.com/download.lc?sid=9ECD949E-959C-A503-1C00-EA20AB77344D
//http://www.woofiles.com/dl-154892-QlRDof5E-sphchaostheory.UpJusticeiro..avi
//http://sharedzilla.com/en/get?id=156567
//http://vip-file.com/download/aa3589134941/sph-chaostheory.Up-Justiceiro..avi.html
//http://letitbit.net/download/aa3589342945/sph-chaostheory.Up-Justiceiro..avi.html
//http://www.adrive.com/public/e128d78c4d81f17b05987c59a1c84f41769bb85d3284443b1fed5f5be10e9c38.html
//http://vip-file.com/download/58b22a205511/dmd-rocknrolla-IRFree.avi.html
//http://sms4file.com/downloadvip/58b22a205511/dmd-rocknrolla-IRFree.avi.html
//http://letitbit.net/download/58b22a960768/dmd-rocknrolla-IRFree.avi.html

/*
ed2k://|file|Futurama.Benders.Game.2008.DVDRiP.AC3.XViD-NoGRP.avi|997380096|3D3945E53523D8A56198CCC77031E329|/
ed2k://|file|Futurama.Benders.Game.2008.DVDRiP.XViD-DOMiNO.avi|733083648|41F9E152215776AAFEFBABD687E550B9|/...
ed2k://|file|Futurama.Benders.Game.2008.DVDRiP.XViD-DOMiNO.[sharethefiles.com].avi|733083648|41F9E152215776AAFEFBABD687E550B9|/...
ed2k://|file|[歌魂].Utatama.2008.DVD-RMVB-CD2-人人影视 -C52.rmvb|320803706|5c9e844495a58db69196722f8553e5b7|h=X3BO7FAOU6ZKKAKBBXPYP2XSMWYUQ3OC|/& amp;title=《YYeTs人人影视2008年11月电影合辑》中文字幕<007：大破量子危机+海上梦境+爱国者+歌魂+漂浪青春+北极的圣诞老人兄弟>[RMVB]_VeryCD电驴下载
3D3945E53523D8A56198CCC77031E329
41F9E152215776AAFEFBABD687E550B9
41F9E152215776AAFEFBABD687E550B9
* http://ed2k.shortypower.dyndns.org/?hash=3D3945E53523D8A56198CCC77031E329

http://blogsearch.google.com/blogsearch_feeds?hl=en&q=The%20Hurt%20Locker+%28rapidshare.+|+megaupload.+|+sharebee.+|+mediafire.+|+slil.+|+sendspace.+|+turboupload.+|+speedshare.+|+depositfiles.%29&ie=utf-8&num=10&output=rss
http://www.scenetube.net/search/The+Hurt+Locker/feed/rss2/
http://scenereleases.info/?s=The%20Hurt%20Locker&feed=rss2
http://scenedown.org/search/The+Hurt+Locker/feed/rss2/
http://www.irfree.com/search/The+Hurt+Locker/feed/rss2/
* 
* http://www.orlydb.com/?q=Predators
* http://pre.scnsrc.net/index.php?s=Kundun&cat=
* http://movie-info.org/searchimdb?searchType=imdb&srch=tt0119485&sceneOnly=both&x264_1080p=on&xvid=on&x264_720p=on&titleType=movie&
* */
// start // 
// MEMO  //
