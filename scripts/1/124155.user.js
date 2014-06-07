/*  NoDelay - Copyright (C) 2006-2010 chr15 (chr15@mail.com)
 *  NoDelay Source code at http://userscripts.org/scripts/show/6499
 *  This script is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public
 *  License as published by the Free Software Foundation; either
 *  version 2 of the License, or (at your option) any later version.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *  http://www.gnu.org/copyleft/gpl.html
 */
// ==UserScript==
// @name	NoDelay
// @namespace	nodelay
// @author	chr15
// @description	NoDelay automates the non user processes, and only alerts the user when an actual user intervention is required to complete a task.
// @description	NoDelay also allows you to customize any part of a web site, you can add/remove elements and change web site behaviour.
// @description	For example removing Ads and logos, remove the AdBlock check, etc.
// @description	Type "check.nodelay" in the address bar will check if you have the latest version.
// @include	http://*
// @include	https://*
// @version	1.4.20100421.1
// ==/UserScript==
//-OBJECTS-
sVer="1.4.20100421.1";
if(location.host.match(/check.nodelay$/i)){location.href='http://userscripts.org/scripts/show/6499'};
var unsafeWindow = this['unsafeWindow'] || window;eOK=new Error("OK");
//-DATA-
loc=location.host;
if(loc.match(/\.(org|ws|to)$/)){
if(loc.match(/\.org$/)){
dbS={row:[
	[/userscripts\.org/,[/scripts\/show\/6499$/,function(){if($(/Version\:\<\/b\>([0-9.]+)/,$('I:summary').innerHTML)!=sVer)alert('Please update to the latest version of NoDelay')}]]
,[/speedshare/,[/\./,function(){$clickCLOSE('I:downloadbtn')}]]
,[/link-share/,[/\./,function(){$go(/url=(.+?)/,location.href)}]]
,[/getupload/,[/\.org\/.+\/file/,function(){$goCLOSE(/http:\/\/getupload\.org(.+?)\".+type=.+button/)}]]
,[/icefile/,[/download\.php/,function(){$goCLOSE(/document.location=\"(.+?)\";this.disabled=true/)}]]
,[/sharecash/
 ,[/download\.php/,function(){$go('A:href','I:offer')}]
 ,[/offer\.php/,function(){$go(/Click <a href=\"(.+?)\">here to continue/);$closeTXT(true)}]
]
]}}else
if(loc.match(/\.to$/)){
dbS={row:[
 [/filebase/
 ,[/\/files[\/]/,function(){$go('/download/'+$(/\/files[\/](.+)$/,location.href));$exception()}]
 ,[/download[\/]/,function(){$click('N:wait')}]//$rmA(['I:adlayerad','I:werbelayer-1']);$captcha('N:uid');
]
,[/bluehost/,[/file/,function(){if(!$sub('N:bhmirror'))$subCLOSE('N:download')}]]
,[/files/,[/get/,function(){$subCLOSE('I:dlform')}]]
,[/youload/,[/download/,function(){$$display('none','I:e_before');$$display('block','I:e_after')}]]
,[/upit/,[/file\:/,function(){$goCLOSE(/var dlurl=\'(.+?)\';.+L_DownloadWaitWarn/)}]]
,[/dataup/,[/\./,function(){if(N=$('N:dl_button')){N.disabled="";N.onclick="";$click(N)}}]]
,[/mystream/,[/\./,function(){if(!$go(/\'download-divx-player\';.+else.+window\.location.href = \'(.+?)\?HasPlugin\';/))$gotoClose('A:src','//embed[@type="video/divx"]');}]]
,[/anonym/,[/\./,function(){$go('A:href',$('T:a','I:url',0))}]]
,[/storage/
 ,[/\/get[\/]/,function(){$go('/getlink/'+$(/\/get\/(.+?)[\/]/,location.href)+'/')}]
 ,[/getlink/,function(){var fA=function(){if(!$goCLOSE(/'link' : '(.+?)'/))$back};$wait($getINT(/'countdown' : (\d+),/),'ST',fA)}]
]
,[/sharebase/,[/files/,function(){var fA=function(){$click('C:d_button')};$wait(21,'SB',fA)}]]
,[/load/,[/\./,function(){$go(/form .+ action=\"(.+?)\" name/,$('C:download_left').innerHTML)}]]
,[/uploaded/,[/file/,function(){var fA=function(){$goCLOSE('A:action','N:download_form')};$wait($getINT(/var secs = (\d+);\/\/ /)+2,'SB',fA)}]]
,[/sendfile/,[/\./,function(){if(!$click('Y:submit','N:method_free'))$go(/This direct link will be available for your IP next.+?<a href=\"(.+?)\"/)}]]
,[/x7/,[/james/,function(){var fA=function(){$goCLOSE(/url:'(.+?)'/);$exception()};$wait($getINT(/wait:(\d+),/),'X7',fA);$exception()}],[/\./,function(){if(N=$(/\.to\/(.+?)[\/]/,location.href))if(N!='ad')$go('/james/ticket/dl/'+N)}]]
//AD's below
,[/drevil\.to\/p\/index31\/redir\.php|uploaded\.to\/register|load\.to\/recs\/usenext|uploaded\.to\/register/,[/\./,function(){$close()}]]
]}}
}else
if(loc.match(/\.(de|ru|us|tv)$/)){
if(loc.match(/\.de$/)){
dbS={row:[
 [/rapidshare/,[/\./,function(){if(!$click('V:Free'))$wait(($getINT(/Please wait <big><big><big>(\d+.\d+)<\/big><\/big><\/big> seconds/)+$getINT(/Or wait (\d+) minutes/,60)),'RS','')}]]
,[/xtraupload/,[/\./,function(){$captcha('N:captchacode');$goCLOSE(document.body.innerHTML.replace(/\n/g,'').match(/document.location=\"(.+?)\"; this/)[1])}]]
,[/dataup/
 ,[/dl/,function(){$sub('N:dl_load')}]
 ,[/\./,function(){$click('C:button_download2')}]
]
,[/uploadstube/,[/download\.php/,function(){$goCLOSE(/lick=\"window\.location=\\'http:\/\/www\.uploadstube\.de(.+?)\'\">';/)}]]
//AD's below
,[/telebid\.de\/\?from=|jamba\.de\/jmp\/goto\/music\/overview\?ref=|1und1\.de\/\?ac=|usenext\.de\/index\.cfm\?TD=/,[/\./,function(){$close()}]]
,[/desktop-downloads\.de|flirt-fever\.de|swoopo\.de\/\?from=|my-downloads\.de|kleinmalig\.de/,[/\./,function(){$close()}]]
,[/online-downloaden\.de\/\?pp=|sector15\.de\/index\.php\?register\&tclid=|99downloads\.de\/\?l=divx\&pp=/,[/\./,function(){$close()}]]
]}}else
if(loc.match(/\.ru$/)){
dbS={row:[
 [/rghost/,[/\./,function(){$goCLOSE(/h1 class=\"header_link.+href=\"(.+?)\" class=\"header_link/)}]]
,[/filegu/,[/f/,function(){$goCLOSE($(/var dl = new Download\( \'[a-zA-Z0-9]+\',\'([a-zA-Z0-9:\/\.]+)\',/) + '/link/' + $(/var dl = new Download\( \'([a-zA-Z0-9]+)\',\'/) + '/' + $(/var dl = new Download\( \'[a-zA-Z0-9]+\',\'[a-zA-Z0-9:\/\.]+\',\'([a-z0-9]+)\',/));$click('I:downloadButton')}]]
,[/onlinedisk/,[/file/,function(){$clickCLOSE('S:http://www.onlinedisk.ru//image/download_button.gif')}]]
,[/filestock/,[/\./,function(){$goCLOSE('A:href',$('T:a','C:DownLink',0))}]]
,[/mail/,[/files\.mail/,function(){var fA=function(){$goCLOSE(/href=\"(.+?)\"/,$('C:delimiterDown').innerHTML)};$wait($getINT(/FCntDelays\[0\] = \"(\d+)\"\;/),'MR',fA)}]]
]}
dbU={row:[
//AD's below
 [/post\.rmbn\.ru|moneywinner\.ru/,[/\./,function(){$close()}]]
]}}else
if(loc.match(/\.us$/)){
dbS={row:[
 [/dalink/,[/\./,function(){$go(/\/\?(.+?)/,location.href)}]]
,[/relink/,[/\./,function(){$go('A:src',$('N:ordner'))}]]
,[/flyfile/,[/\./,function(){if(!$sub('N:F1'))if(!$click('N:method_free'))$captcha('C:captcha_code')}]]
]}}
}else
if(loc.match(/\.(co\.uk|co\.cc|cc|biz)$/)){
if(loc.match(/\.co\.uk$/)){
dbU={row:[
 [/news\.bbc/,[/\./,function(){$rmA(['I:blq-pre-mast','I:blq-mast','I:blq-acc','C:newsbanner','C:servicev4 ifs_services','I:blq-foot']);$$css('#blq-container-inner {padding-top:1px;}');$rmP(1,'C:fpfeed')}]]
]}}else
if(loc.match(/\.co\.cc$/)){
dbS={row:[
 [/defensive-pro/,[/\.cc\/vault/,function(){$goCLOSE('A:value','N:link')}]]
,[/file404/,[/\.cc\/download\.php/,function(){$goCLOSE(/onClick=\"window.location=\\\'(.+?)\\\'\">\';/)}]]
,[/nl-ff/,[/\.cc\/fault/,function(){$goCLOSE($('A:href',$('I:imgdwn').parentNode))}]]
]}}else
if(loc.match(/\.cc$/)){
dbS={row:[
 [/fileserver/,[/\./,function(){if(!$captcha('C:captcha_code'))$click('N:method_free2');$waitTime('FS','');}]]
]}}else
if(loc.match(/\.biz$/)){
dbS={row:[
 [/affg/,[/\./,function(){if($('I:hawyphp_code')){hawy_code=document.getElementById('hawyphp_code').value;text ="<form action='2-"+hawy_code+".html' method='POST'><input type='hidden' name='thecode' value='$code' /><input type='submit' value='Click here'/></form>" ;document.getElementById('cont2').innerHTML = text;document.getElementById('cont').innerHTML = "";}if(N=$('V:Click here ..')){$go(/NewWindow\('(.+?)','protect_links/,$('A:onclick',N))}$click('V:Click here');}]]
,[/share-online/,[/download\.php/,function(){$goCLOSE(loadfilelink.decode($(/loadfilelink.decode\(\"(.+?)\"\);.+document.location/)))}]]
]}}
}else
if(loc.match(/\.(com\.br|ch|com\.ar|bz)$/)){
if(loc.match(/\.com\.br$/)){
dbS={row:[
 [/mandamais/
 ,[/download[\/]/,function(){$go('A:href',$('T:a','I:divDLStart',0))}]
 ,[/url/,function(){$goCLOSE('A:href','C:link11-azul')}]
]
]}}
}else
if(loc.match(/\.(cz|fm|fr|in)$/)){
if(loc.match(/\.fm$/)){
dbS={row:[
 [/jump/,[/\./,function(){$go(/Redirecting to (.+?).+<\/div/)}]]
]}}else
if(loc.match(/\.fr$/)){
dbS={row:[
 [/dl\.free/,[/getfile\.pl/,function(){$go('A:href','X:Télécharger ce fichier')}]]
]}}else
if(loc.match(/\.in$/)){
dbS={row:[
 [/netload/,[/\./,function(){var fA=function(){if(!$goCLOSE('A:href','C:download_fast_link'))$go('X:Click here for the download');};if(!$wait(($getINT(/countdown\((\d+)/)/100),'NL',fA))fA()}]]
,[/lix/,[/\./,function(){$sub("//form")}]]
,[/linksave/,[/\./,function(){if($(/(rapidshare\.com\/news)/))$click('V:Free User')}]]
,[/cramit/,[/\./,function(){var fA=function(){$click('I:btn_download')};$rm('I:interContainer');if(!$click('Y:submit','N:method_free'))if($go(/download link will be available for your IP.+?<a href=\"(.+?)\">/))$waitTime('CI',fA)}]]
]}}
}else
if(loc.match(/\.(it|ly|pl|eu\.pn)$/)){
if(loc.match(/\.it$/)){
dbS={row:[
 [/ifile/
 ,[/dl/,function(){var fA=function(){if(N=$('I:req_btn2-button'))if(!$click(N))$go('A:href',N);$exception()};$captcha('I:requestTbl');$wait(3,'IF',fA);$exception()}]
 ,[/\./,function(){if(!$click($('T:button',$('T:span','I:requestTicketBtn',0),0)))$goCLOSE('A:href',$('T:a',$('T:span','I:downloadBtn',0),0))}]
]
]}}else
if(loc.match(/\.ly$/)){
dbS={row:[
 [/adf/,[/\./,function(){location.href=$('A:href','I:skip_button')}]]
]}}else
if(loc.match(/\.pl$/)){
dbS={row:[
 [/sendspace\.pl/,[/file/,function(){$goCLOSE('A:href',$('//img[@alt="pobierz plik!"]').parentNode)}]]
,[/przeklej\.pl/,[/[d|plik]/,function(){$goCLOSE('A:href','C:download')}]]
]}}else
if(loc.match(/\.eu\.pn$/)){
dbS={row:[
 [/tinyurl/,[/\./,function(){$go(/<iframe name=\"pagetext\".+src=\"(.+?)\" frameborder=/,document.textContent)}]]
]}}
}else
if(loc.match(/\.(in\.ua|ro|eu|info|tk)$/)){
if(loc.match(/\.in\.ua$/)){
dbS={row:[
 [/filebox/,[/\./,function(){$subCLOSE($('N:method_free').parentNode)}]]
]}}else
if(loc.match(/\.eu$/)){
dbS={row:[
 [/uploadspace/,[/\./,function(){if(!$('I:btn_download'))$click('N:method_free')}]]
//AD's below
,[/gutschein-blog/,[/\./,function(){$close()}]]
]}}else
if(loc.match(/\.info$/)){
dbS={row:[
 [/jamber/,[/\./,function(){$captcha('I:cap');}]]
,[/tr59/,[/\/url\./,function(){$go(/<a href=\"(.+?)\">/,$('S:http://r1one.co.cc/aa.png').parentNode.parentNode.innerHTML)}]]
]}}
}
if(loc.match(/\.net$/)){
dbS={row:[
 [/zshare/
 ,[/download[\/]/,function(){var fA=function(){N=$(/var link_enc=new Array\((.+?)\);/);N=N.replace(/','/g,'').replace(/'/g,'');location.href=N;$closeTXT(N)};if(!$sub('N:form1'))$wait($getINT(/here\|(\d+)\|class/),'ZS',fA)}]
 ,[/player\.php/,function(){if(!$go('A:href','X:Download Video'))$go('A:href','X:Download this')}]
 ,[/video[\/]/,function(){$go('/download/'+$(/video\/(.+)/,location.href))}]
]
,[/fast-load/,[/index\.php/,function(){if(!$goCLOSE(/location=\'(.+?)\'\" value=/))if(!$clickCLOSE('V:download file'))$$('disabled',false,$('N:action'))}]]
,[/letitbit/,[/download[\/]/,function(){$sub('I:dvifree')}],[/download4\.php/,function(){$captcha('N:cap')}],[/download3\.php/,function(){$go('A:src','I:topFrame')}],[/tmpl_frame_top\.php/,function(){if($('I:countdown'))$wait($getINT(/y = (\d+);/,0,'head'),'LB','NULL');else{$goCLOSE(/href=\"(.+?)\"/,$('I:links').innerHTML)}}]]
,[/good/,[/dl/,function(){if(!$click('V:Free Download'))$goCLOSE('I:thelinkA')}]]
,[/sharesimple/,[/\.net\/.+\/download\.php/,function(){$captcha('N:captchacode');$goCLOSE("/getfile.php"+$(/http:\/\/www\.sharesimple\.net\/getfile.php(.+?)\";this.disabled=true/))}]]
,[/filesend/,[/download\.php/,function(){var fA=function(){$clickCLOSE('C:buttdl')};$wait($getINT(/time = (\d+)\;/),'FS',fA)}]]
,[/upshare/,[/download\.php/,function(){$goCLOSE(/document.location=\"(.+?)\";this/)}]]
,[/file2upload/,[/download/,function(){$goCLOSE('A:value','//input[@name="link"]')}]]
,[/paid4share/,[/file/,function(){$go('A:href',$('T:a','I:downloadfile',0))}]]
,[/ezyfile/,[/\./,function(){var fA=function(){if(!$clickCLOSE('I:btn_download'))$subCLOSE('N:F1');};fA();if(!$waitTime('EF',fA))if(!$waitTime('EF',fA))if(!$click('N:method_free'))$goCLOSE('A:href',$('T:a','//span[@style="border: 1px dotted rgb(187, 187, 187); padding: 7px; background-color: transparent;"]',0))}]]
,[/share-now/,[/\./,function(){$subCLOSE('N:download')}]]
,[/icefile/,[/index\.php/,function(){$goCLOSE(/window.location=\\\'(.+?)\\\'\"><font color=\"#FFFFFF\">Click here/)}]]
,[/shareator/,[/\./,function(){var fA=function(){if(N=$('I:btn_download')){$$('disabled',false,N);$clickCLOSE(N);}};if($('I:btn_download'))$waitTime('SA',fA);else{$goCLOSE(/<span style=\".+\"><a href=\"(.+?)\">http:\/[\/]/)}}]]
,[/bitroad/,[/\./,function(){if(!$sub('I:Premium')){if(!$go('A:href','//a[@title="Your link to download file"]'))$$display('none','I:countdown');$$display('block','I:links');alert(captionStr+' Download Ready...')}}]]
,[/filer/,[/\.net\/.+\/.+\/file/,function(){$clickCLOSE('I:submit_download')}]]
,[/rapidshare/,[/files/,function(){$go(/window.location = \"(.+?)\";/)}]]
,[/usershare/,[/\./,function(){$goCLOSE('A:href',$('//img[@src="/images/download_btn.jpg"]').parentNode)}]]
,[/freakshare/,[/\./,function(){$subCLOSE('N:waitform');if(loc_href.match(/error=timelimit/))$wait($getINT(/Download only \d+ File in (\d+) Minutes/,60),'FS','')}]]
,[/quickupload/,[/\./,function(){$captcha('C:captcha_code');$waitTime('QU','');if(!$click('N:method_free'))$goCLOSE($('A:href',$('T:a','//span[@style="border: 1px dotted rgb(187, 187, 187); padding: 7px; background: rgb(249, 249, 249) none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;"]',0)))}]]
,[/friendlyfiles/,[/download/,function(){$clickCLOSE('C:btn_2')}]]
,[/movshare/,[/video/,function(){if(N=$('I:watch'))$sub(N);else{$goCLOSE(/param name=\"src\" value=\"(.+?)\"><embed type/,$('I:embedcontmvshre').innerHTML)}}]]
,[/linkbucks|picturesetc|realfiles/,[/\./,function(){$go('A:href','C:lb_link right');$go(/var LinkURL = '(.+?)';/)}]]
,[/turbobit/
// ,[/download\/free/,function(){var fA=function(){$go(/id=\"timeout\"><a href=\"(.+?)\"/))};if(!$captcha('C:captcha'))$wait($getINT(/limit: (\d+),/)+4,'TB',fA)}]
 ,[/download\/free/,function(){var fA=function(){if(N=$(/id=\"timeout\"><a href=\"(.+?)\"/))$go(N)};if(!$captcha('C:captcha'))$wait($getINT(/limit: (\d+),/)+4,'TB',fA)}]
 ,[/\.net\/[a-z0-9]+\.html/,function(){$go('A:href','C:free');}]
]
,[/shareflare/
 ,[/download[\/]/,function(){$sub('I:dvifree')}]
 ,[/download4/,function(){$captcha('N:cap')}]
]
,[/urlcash/,[/\./,function(){if(N=$(/javascript\:DoubleOpen\(\'.+?\'.+?\'(.+?)\'\)/,$('I:loaderSeconds').parentNode.parentNode.innerHTML)){location.href=N;}else{if(N=$(/onclick=\"top.location=\'(.+?)\'\"/,$('I:btnContinue').parentNode.innerHTML)){location.href=N;}}}]]
]}
dbU={row:[
 [/brasilienfreunde/,[/\./,function(){$rm('I:blockblockA')}]] //example of disabling AdBlock check
//AD's below
,[/content\.promoisland\.net\/pop_up\.html|www\.siiu/,[/\./,function(){$close()}]]
]}
}
if(loc.match(/\.com$/)){
dbS={row:[
 [/megaupload|megaporn/
 ,[/\?c=/,function(){if($wait($getINT(/[Please wait|check back in] (\d+) minutes/,60),'MU',$backReload))$wait(120,'MU',$backReload)}]
 ,[/\./,function(){var fA=function(){$goCLOSE('A:href',$('T:a','I:downloadlink',0))};if(!$captcha('I:captchafield')){if($('I:downloadlink'))$wait($getINT(/count=(\d+);/),'MU',fA)}}]
]
,[/megavideo/,[/\./,function(){location.href='http\:\/\/www.megaupload.com/?d='+$(/megavideo\.com\/v\/(.+?)/,location.href)}]]
,[/2shared/,[/file/,function(){$goCLOSE(/window.location = \"(.+?)\";.+downloadForm/,'head')}]]
,[/mediafire/
 ,[/blank\.html/,function(){$null()}]
 ,[/\./,function(){var fA=function(){$rmA(['N:download_link','N:download_link']);$click('X: Click here to start download..');};$wait(5,'MF',fA)}]
]
,[/filefactory/
 ,[/\/dlf\/[0-9a-z]/,function(){var fA=function(){$go('A:href',$('T:a','I:downloadLink',0))};$wait($getINT($('A:value','I:startWait')),'FF',fA)}]
 ,[/\/info\/[0-9a-z]/,function(){$waitTime('FF',$back)}]
 ,[/\/file\/[0-9a-z]/,function(){$go('/dlf'+$(/\/dlf(.+?)\">.+button\.basic/))}]
]
,[/hotfile/,[/dl/,function(){$captcha('I:recaptcha_response_field');try{starttimer();N=$getINT(/[wait|begin][\s|.+?](\d+) seconds/);if(N==0)N=$getINT(/wait[\s|.+?](\d+) minutes/,60);if(N>0)$wait(N+2,'HF','hide');else{$click('V:Download the file')}}catch(e){$goCLOSE('A:href','X:Click here to download')}}]]
,[/rapidshare/
 ,[/files/,function(){
 	var fA=function(){$go('A:href',$('T:a','C:downloadlink',0))};
 	var fASub=function(){if(autoDownload){$subCLOSE('N:dlf');}else{alert(sDownload)}};
 	if(!$click('V:Free user'))
 	if(!$wait($getINT(/var c=(\d+);/),'RS',fASub))
 	if(!$wait($getINT(/ (\d+) minutes/,60),'RS',fA))
 	if($(/wait (.+?) the download is completed/)=='until')
 	 $wait(60,'RS',$back)}]
]
,[/uploadjockey/
 ,[/redirect\.php/,function(){$go('A:src','N:top')}]
 ,[/download/,function(){N=$siteORDER();$go('A:href',N)}]
]
,[/i741/
 ,[/redirect/,function(){$go('A:src','N:main')}]
 ,[/status\.php/,function(){if(N2=$siteORDER())if(N=$('//img[@src="/images/Success.gif"]',$('T:td',N2.parentNode.parentNode,3)));if(N)$goCLOSE('A:href',$('T:a',$('T:td',N2.parentNode.parentNode,1),0));}]
]
,[/depositfiles/,[/\/files[\/]/,function(){var fA=function(){$back();};if(!$goCLOSE(/id=\"download_url\".+action=\"(.+?)\" method=\"get\"/))if(!$click('V:FREE downloading'))$waitTime('DF',fA)}]]
,[/4shared/
 ,[/file/,function(){$go('A:href','C:dbtn')}]
 ,[/get/,function(){var fA=function(){$goCLOSE('A:href','X:Click here to download this file');};if($('I:divDLStart'))$wait($getINT(/var c = (\d+)/,1,'head'),'4S',fA)}]
]
,[/sendspace/
 ,[/\/defaults\/sendspace-pop\.htm/,[/\./,function(){$close()}]]
 ,[/file/,function(){if(N=$('N:download'))$click(N);else{if(!$goCLOSE('A:href','I:downlink'))$goCLOSE(/href="(.+?)" /,link_dec)}}]
]
,[/easy-share/,[/\./,function(){var fA=function(){if(!$clickClose('I:freeButton'))$clickClose('V:Download')};if($('Y:hidden','I:captcha'))$click('V:Download the file');else{$wait($getINT(/w=\'(\d+)\'/)+2,'ES',fA)}}]]
,[/file-rack/
 ,[/files/,function(){var fA=function(){$click('N:method_free')};$wait($getINT(/Please wait (\d+) minutes/,60)+2,'FR',fA)}]
 ,[/downloads/,function(){var fA=function(){if(!$click('I:btn_download'))$go('A:href',$('T:a','I:btn_download2',0))};$captcha('N:vImageCodP');$waitTime('FR',fA)}]
]
,[/gigasize/
 ,[/get\.php/,function(){$captcha('C:inpcode')}]
 ,[/\.\/c/,function(){if(N=$captcha('I:captcha',false)){if((N.type='hidden')&&(N.value='1'))$clickCLOSE('V:Download the file')}}]
 ,[/register\.php/,function(){$close()}]
 ,[/formdownload\.php/,function(){$wait($getINT(/var seconds=(\d+)/),'GS','')}]
 //var fA=function(){$click('I:dlb')};
 //$$display('none','I:askPws');$$display('block','I:verify');$$display('block','I:dlb');$click('I:dlb')}]
]
,[/filezzz/,[/download/,function(){if(!$clickCLOSE('V:Click here to download...'))$go('A:href','X:lick here to ');$closeTXT(true)}]]
,[/badongo/
// ,[/cfile/,function(){var fA=function(){if(data=$(/<a onclick=\"return doDownload\(\'(.+?)\'\);\" href=\"#\">/))alert(data)};$captcha('N:cap_id');if(!$wait($getINT(/var check_n = (\d+);/),'BD',fA))fA()}]
 ,[/vid/,function(){$captcha('N:cap_id')}]
]
,[/qshare/
 ,[/get/,function(){$go(/<a class=\"button\" href=\"(.+?)\"><span>.+Free/)}]
 ,[/\./,function(){$goCLOSE(/writeToPage.+HREF=\"(.+?)\" onclick=.+redirect_user/);$wait($getINT(/will be resetted in (\d+) minutes/,60),'QS','')}]
]
,[/flyupload/,[/get/,function(){if(!$go(/size=.+\"(.+?)\">Click/))if(!$go(/size=.+\"(.+?)\">Continue/))$goCLOSE(/size=.+\"(.+?)\">Download Now/)}]]
,[/fdcupload/,[/\./,function(){if(N=$('I:btn_download')){$$('onsubmit','',$('T:form',$('T:center',document.body,0),0));N.disabled=false;$clickCLOSE(N);}else{$goCLOSE('A:href',$('T:a',$('T:span',$('T:center',document.body,0),0),0))}}]]
,[/sendmefile/,[/\./,function(){$click('V:Download File')}]]
,[/milledrive/,[/files/,function(){$subCLOSE('I:free-down')}]]
,[/filegetty/,[/\./,function(){$goCLOSE('A:href',$('//img[@src="/images/download.gif"]').parentNode)}]]
,[/alexupload/,[/\./,function(){$captcha('C:captcha_code')}]]
,[/x-fs/,[/download\.php/,function(){$goCLOSE(/http:\/\/x-fs\.com(.+?)\"; this.disabled=true/)}]]
,[/kewlshare/,[/dl/,function(){if(!$clickCLOSE('V:Free User'))$subCLOSE($('T:form','I:dl22',0))}]]
,[/odsiebie/,[/pokaz|pobierz/,function(){$go($$(/pokaz|pobierz/,'download',location.href))}]]
,[/turboupload/
 ,[/files/,function(){$$('onsubmit','',$('I:dlhere').parentNode)}]
 ,[/\./,function(){if(!$captcha('C:captcha_code'))$click('N:method_free')}]
]
,[/dsfileshare/,[/download\.php/,function(){if(data=$(/http:\/\/www\.dsfileshare\.com\/getfile.php\?id=(.+?)\".+this.disabled/))$goCLOSE('/getfile.php?id='+data)}]]
,[/netgull/,[/\./,function(){if(data=$(/http:\/\/www\.netgull\.com\/getfile.php\?id=(.+?)\";/))$goCLOSE('/getfile.php?id='+data)}]]
,[/link-protector/,[/\./,function(){$go('A:src','N:url')}]]
,[/usercash/,[/\./,function(){N=$('X:lick here to load the requested page ...');if(!N)N=$('X:lick here to enter ...');if(N)$goCLOSE('A:href',N.parentNode.parentNode)}]]
,[/sharedzilla/,[/\.com\/\/.+\/get/,function(){$subCLOSE('N:download')}]]
,[/vip-file/,[/download/,function(){if(!$goCLOSE(/Test our download speed.+<a href=\"(.+?)\">Or download/))$goCLOSE('A:href','X:Or download with Very Slow Speed')}]]
,[/nakido/,[/\./,function(){$goCLOSE('A:href','I:ndownloadlink')}]]
,[/megashares/,[/\./,function(){$captcha('I:verifyinput');if(!$click('C:button_free'))$click($('//img[@alt="download_file"]').parentNode)}]]
,[/zippyshare/,[/\.com\/v/,function(){if(data=$(/var .+ = \'fck(.+?)\';.+var .+unescape/))$goURL(unescape(data))}]]
,[/anonymz/,[/\./,function(){$go('A:href',$('T:a','X:redirected to',0))}]]
,[/xinony/,[/\./,function(){$click('V:Free Download')}]]
,[/live-share/,[/files/,function(){$goCLOSE(/Download: <\/span> <a href=\"(.+?)\" class=\"bold\" id=\"download_link_btn/)}]]
,[/uploading/,[/files/,function(){var fA=function(){$click('I:waitblock')};if(!$click('X:Free Download'))$waitTime('UL',fA)}]]
,[/shareator/,[/\./,function(){if(N=$('I:btn_download')){$$('innerHtml',0,'I:countdown');$$('disabled',false,N);$$display('none','I:countdown_str')}}]]
,[/fileqube/,[/file/,function(){$goCLOSE('A:href',$('X:Download file').parentNode)}]]
,[/ziddu/,[/download/,function(){if(!$click('V:Download'))if(!$go('A:href','C:download'))$go('A:href','C:link2')}]]
,[/filesmonster/
 ,[/\/download\.php/,function(){$sub('I:slowdownload')}]
 ,[/free_download\.php/,function(){var fA=function(){$sub('N:getFile')};$waitTime('FM',fA)}]
 ,[/get\/free/,function(){$waitTime('FM','')}]
]
,[/megashare/,[/\./,function(){$sub('N:FreeDz')}]]
,[/linkreducer/,[/\./,function(){$go('A:href','C:newhyper_lg')}]]
,[/flsend/,[/dl/,function(){$sub($('N:sit').parentNode)}]]
,[/uploadline/,[/\./,function(){$captcha('C:captcha_code');$waitTime('UL','');if(!$click('N:method_free')){$goCLOSE('A:href',$('X:Click here to Download').parentNode)}}]]
,[/ultrauploading/,[/\./,function(){$goCLOSE(unescape(/downloadlink = unescape\(\'(.+?)\'\);/))}]]
,[/disperseit/,[/view\.php/,function(){$goCLOSE('A:href','X:Click Here To Download')}]]
,[/partage-facile/,[/\./,function(){if(!$click('V:Télécharger'))$click('N:freedl')}]]
,[/uploadland/,[/\./,function(){if(!$clickCLOSE('I:downloadbtn'))$captcha('N:captchacode')}]]
,[/shragle/,[/files/,function(){var anon=function(){$click('V:Download')};$wait($getINT(/var downloadWait = (\d+);/),'SG','')}]]
,[/duckload/,[/download/,function(){$captcha(/(Captcha)/);$$display('block','I:e_after');$$display('none','I:e_before')}]]
,[/fileflyer/,[/\./,function(){$goCLOSE('A:href','I:ItemsList_ctl00_file')}]]
,[/enterupload/,[/\./,function(){if(!$waitTime('EU',''))if(!$click('N:method_free'))$captcha('N:code]')}]]
,[/uploadrack/,[/\./,function(){var fA=function(){if(N=$('I:btn_download')){$$('disabled',false,N);$clickCLOSE(N);}};$captcha('N:code');if(!$waitTime('UR',fA))if(!$clickCLOSE('N:method_free'))if(!$waitTime('UR',fA))fA()}]]
,[/uploadcell/,[/\./,function(){var fA=function(){$click('I:btn_download');};$captcha('C:captcha_code');!$click('N:method_free')}]]
,[/supernovatube/
 ,[/human\.php|divx\.php/,function(){$click('V:I am human now let me watch this video')}]
 ,[/divxp\.php/,function(){$go(/images\/play\.jpg\" \/><embed type=\"video\/divx\" src=\"(.+?)\" width=.+previewImage/);closeTXT(true)}]
 ,[/play\.php/,function(){$go(/so\.addVariable\(\"file\",\"(.+?)\"\);.+so\.addVariable\(\"width\"/)}]
]
,[/wisevid/,[/gateway\.php/,function(){$click('V:Yes, Let me watch')}]]
,[/filesdump/
 ,[/file/,function(){var fA=function(){$goURL(/\$ld\('(.+?)', 'timer_div'\)\;/,document.textContent);};$wait($getINT(/var stime = (\d+);/),'FD',fA)}]
 ,[/process\.php/,function(){$go('A:href',$('T:a',0))}]
]
,[/linkbucks/
 ,[/\/url/,function(){$goURL(/url\/(.+?)/,location.href)}]
 ,[/\./,function(){$go('A:href','C:lb_link right');$go(/var LinkURL = '(.+?)';/)}]
]
,[/stagevu/,[/video/,function(){$go($('T:param',$('T:object',$('T:div',$('T:div','I:vidbox',0),1),0),2).value)}]]
,[/saveqube/,[/getfile/,function(){if(!$sub('I:form_free')){$$display('none','I:dt');$$display('block','I:db');$waitTime('SQ','')}}]]
,[/referhush/,[/\/\?rh=/,function(){$go(/onclick=\"window\.open\('http\:\/\/www\.referhush\.com(.+?)'\);\">Continue/)}]]
,[/hyperlinkcash/,[/link\.php/,function(){if(!$sub('N:forx'))$goCLOSE('A:href',$('T:a',document.body,0))}]]
,[/blogger\.com\/blogin\.g\?blogspotURL=/,[/blogspotURL/,function(){$go('A:href','I:continueButton')}]]
,[/filestube\.com\/[0-9a-z]+\/go\.html/,[/\./,function(){$go('A:src','I:iframe_content')}]]
,[/megaftp/,[/\./,function(){var fA=function(){$click('C:textfield')};$wait($getINT(/var x = (\d+); /),'MF',fA)}]]
,[/uploadmachine/,[/download\.php/,function(){var fA=function(){$click('I:downloadbtn')};$wait($getINT(/var timeout='(\d+)';/),'UM',fA)}]]
,[/filebox/,[/\./,function(){var fA=function(){$sub('N:F1')};$$('A:onSubmit','','N:F1');if($(/captchas\/([a-z0-9]+?)\.jpg.+?Captcha/))$captcha(/captchas\/([a-z0-9]+?)\.jpg/);else{$waitTime('FB',fA)}}]]
,[/file2box/,[/\./,function(){if(!$go('A:href','X:Download file'))$waitTime('FB','')}]]
,[/axifile/
 ,[/\/\?/,function(){$go('/mydownload.php?file='+$(/\/\?(.+?)/,location.href))}]
 ,[/mydownload\.php/,function(){$go('A:href','N:dlLink')}]
]
,[/slingfile/,[/\/file/,function(){if(!$sub('N:form1'))$go(/window\.location=\"(.+?)\";/)}]]
,[/link2dollar/,[/\./,function(){$go(/var rlink = \'(.+?)\'\;.+DONE/,'head')}]]
,[/hamstershare/,[/dload/,function(){$goCLOSE(/onclick=\"window\.document\.location\.href=\'(.+?)\'\" value=/)}]]
,[/evilshare/,[/\./,function(){if($('N:F1'))$waitTime('ES','');else $click('N:method_free')}]]
,[/adrive/,[/public/,function(){$goCLOSE(/does not start automatically, please click <a href=\"(.+?)\">here<\/a> to start the download process/)}]]
,[/nanosend/,[/\./,function(){if($('C:err'))$waitTime('NS','');else $click('N:method_free')}]]
,[/gotupload/,[/\./,function(){var fA=function(){$click('I:btn_download')};if(!$('N:F1'))$click('N:method_free');else{$waitTime('GU',fA)}}]]
,[/cinshare/,[/\./,function(){var fA=function(){$click('C:buttonGreen')};$waitTime('CS',fA)}]]
,[/vidreel/
 ,[/human/,function(){location.href=$$(/human/,'video',location.href)}]
 ,[/video/,function(){$rm('I:aad');$go(/rtmp\:\/\/(.+?)/,$('I:mediaspace').innerHTML)}]
]
,[/novaup/,[/download/,function(){$go(/href=\"(.+?)\">/,$('C:dwl_novaup').parentNode.parentNode.innerHTML)}]]
,[/bigandfree/,[/\./,function(){var fA=function(){$click('V:Click here to download')};if(!$click('N:chosen_free'))if($(/exceeded your download (limit)/))$wait($getINT(/Please wait (\d+) Minutes/,60),'BF',fA);else{$wait($getINT(/var x = (\d+); /)+2,'BF',fA)}}]]
,[/novamov/,[/video/,function(){$go(/file=(.+?)&amp;streamer/,$('I:mediaspace').innerHTML)}]]
,[/fileop/,[/\./,function(){if(!$captcha('C:captcha_code'))if(N=$('X:Download: '))$go('A:href',N.getElementsByTagName('a')[0]);else{$waitTime('FO','')}}]]
,[/putshare/,[/\./,function(){if(!$captcha('C:captcha_code'))if(!$click('Y:submit','N:method_free'))$waitTime('PS','')}]]
,[/uploadbox/,[/files/,function(){if(!$click('I:downl_free')){$$display('none','I:countdown');$$display('block','I:capbox');$captcha('I:captcha')}}]]
,[/jumbofiles/,[/\./,function(){if(!$sub('N:F1'))location.href=$(/href=\"(http:\/\/www.+?)\">/)}]]
,[/dualshare/,[/\./,function(){$captcha('C:captcha_code');$click('N:method_free');$waitTime('DS','')}]]
,[/superfastfile/
 ,[/\./,function(){$$css('#blockblockA {height:1px; width:1px;}');$rm('I:blockblockA');$$display('block','I:blockblockB');
 	if($captcha('C:captcha_code'))$waitTime('SF','');else{$click('N:method_free')}}]
]
,[/uploadmirrors/
 ,[/download/,function(){$go(/(\/status\.php\?uid=.+?)\",/)}]
 ,[/redirect/,function(){$go('A:src','N:main')}]
]
,[/fufox/,[/\./,function(){$captcha('I:captcha');$click('X:Cliquez-ici pour lancer le téléchargement (Compte a rebour)')}]]
,[/upfilestream/,[/files\/get/,function(){$$display('none','I:waitL');$$display('block','I:captcha');$captcha('I:captcha')}]]
,[/missupload/,[/\./,function(){if($captcha('C:captcha_code'))$waitTime('MU','');else{if(!$click('N:method_free'))$go(/This direct link will be available for your IP.+?<a href=\"(.+?)\">/)}}]]
,[/divxcloud/,[/\./,function(){var fA=function(){$click('I:btn_download')};if(!$waitTime('DC',fA))$goURL(/id=\"divxshowboxt\".+?\"url\" value=\"(.+?)\">/)}]]
,[/xtshare/
 ,[/humancheck\.php/,function(){$click('I:submit')}]
 ,[/toshare\.php/,function(){$goURL('http://xtshare.com/download.php?download='+$(/\?Id=(.+?)/,location.href))}]
 ,[/download\.php/,function(){location.href=$('A:href',$('S:images/download-button.jpg').parentNode)}]
]
,[/qvvo|thesegalleries|thesefiles|seriousfiles/,[/\./,function(){$go('A:href','C:lb_link right');$go(/var LinkURL = '(.+?)';/)}]]
,[/sligfile/,[/\./,function(){$go('A:href',$('//img[@src="http://url.sligfile.com/aa.png"]').parentNode)}]]
,[/oron/,[/\./,function(){var fA=function(){$click('I:btn_download')};if(!$click('Y:submit','N:method_free'))$waitTime('OC',fA)}]]
,[/infinitemb/,[/download|stream/,function(){if(!$goCLOSE(/var tt = \'Click <a href=\"(.+?)\" target=\"_top\">here<\/a> to start/))if(!$goCLOSE('A:value','//param[@name="src"]'))$click('//input[@alt="Begin Download"]')}]]
,[/fastfreefilehosting/,[/file/,function(){$goCLOSE(/return false\;\}document\.location=\"(.+?)\"\;this.disabled=true\;/)}]]
,[/fofly/,[/\./,function(){$click('V:Free Download')}]]
,[/sharingmatrix/
 ,[/popdown\.html/,function(){$close()}]
 ,[/file/,function(){var fA=function(){$wait($getINT(/id=\"div_countdown\">(\d+):/,60)+$getINT(/id=\"div_countdown\">\d+:(\d+)/),'SM','')};
 	if(!$click('X:Download the file'))$wait(5,'SM',fA)}]
//sharingmatrix.com/ajax_scripts/download.php?type_membership=free&link_id=930516
 //)if(!$click('I:free_download'))$click('C:click_btn')}]
]
,[/extabit/,[/file/,function(){if(!$click('I:cmn_link_slow'))$wait($getINT(/\.captchatimer\(\{time: \'(\d+)\', timerBlock: .+?, captchaBlock:/),'EB','')}]]
,[/linkbee/,[/\./,function(){$go('A:src',$('T:iframe',1))}]]
,[/deniedltd/,[/\./,function(){$go(location.href.replace(/^.+?\?/,''))}]]
,[/megaawesomeload/,[/xxxx\./,function(){$go(/document\.location=\"(.+?)\";/,$('A:onclick','I:downloadbtn'))}]]
,[/czshare/,[/\./,function(){if(!$click('V:FREE download'))if(!$captcha('I:captchastring'))$sub('N:pre_download_form')}]]
,[/miloyski/,[/video/,function(){var fA=function(){$go('A:href','I:IE_divx')};if(!$click('V:Continue'))$wait(3,'MC',fA);}]]
,[/ugotfile/
 ,[/file\/[0-9]+[\/]/,function(){var fA=function(){location.href='/file/thank-you'};$captcha('C:ugfCaptcha');$wait($getINT(/<h1 class=\"ugfCountDown\">(\d+)<\/h1>/)+2,'UG',fA)}]
// $getINT(/sessionCountDown.+?(\d+)/)
 ,[/file\/thank-you/,function(){$click('C:ugfLink')}]
]
,[/solidfile/,[/\./,function(){var fA=function(){if($click('I:btn_download'))$go(/(\/files\/.+?)\"/);};if($click('N:method_free'))$waitTime('SF',fA)}]]
,[/filechip/,[/\./,function(){var fA=function(){if(!$click('I:btn_download'))$click('N:method_free');};if(!$go(/(\/files\/.+?)\"/)){$captcha('I:recaptcha_widget_div');if(!$waitTime('FC',fA))$click('N:method_free')}}]]
,[/filebling/,[/full/,function(){$go('A:href','X:Proceed to Free Download')}],[/\/g1[\/]/,function(){$captcha('I:recaptcha_table')}],[/p2\.php/,function(){var fA=function(){$go('A:href','X:Proceed to Download')};$wait($getINT(/var countdownfrom=(\d+)/),'FB',fA)}],[/\/g3[\/]/,function(){$go('A:href','X:Download')}]]
,[/filefront/,[/\./,function(){$go(/href=\"(.+?)\"/,$('I:age_gate_1').innerHTML)}]]
]}
dbU={row:[
//AD's below
 [/adisfy\.com|partypoker\.com|adultfriendfinder\.com\/go|bisound\.com|yieldmanager\.com|partners\.webmasterplan/,[/\./,function(){$close()}]]
,[/wongsearch\.com|games\.uploading\.com|gamesfeeder\.com|togo-airline-tickets\.com|letsgo-tours\.com|celldorado/,[/\./,function(){$close()}]]
,[/7-pic\.com|pcwallpaperzone\.com|marketgid\.com|ad\.globe7\.com|ad\.spot200\.com|servedby\.adxpower\.com|divx-kostenlos/,[/\./,function(){$close()}]]
,[/gesichtsanalyse|splash\.entertainment-multimedia\.com|mocally\.com\/mc|script\.banstex\.com|ad\.xtendmedia\.com/,[/\./,function(){$close()}]]
]}
}
//-FUNCTIONS-
var fNull=function(){};
var $getPAGE=fNull;var $injectPAGE=fNull;var $appendPAGE=fNull;var $appendChild=fNull;
var $getA=fNull;var $=fNull;var $now=fNull;var $init=fNull;var $log=fNull;var $alert=fNull;var $test=fNull;var $back=fNull;
var $reload=fNull;var $backReload=fNull;var $close=fNull;var $null=fNull;var $alertRET=fNull;var $closeTXT=fNull;var $int=fNull;
var $getINT=fNull;var $$=fNull;var $$css=fNull;var $$display=fNull;var $$$=fNull;var $rm=fNull;var $rmP=fNull;var $rmL=fNull;
var $rmA=fNull;var $goURL=fNull;var $go=fNull;var $goCLOSE=fNull;var $sub=fNull;var $subCLOSE=fNull;var $click=fNull;
var $clickCLOSE=fNull;var $wait=fNull;var $waitTime=fNull;var $captcha=fNull;var $listCall=fNull;var $siteORDER=fNull;
var $addEvent=fNull;var $removeEvent=fNull;var $rv=fNull;var $rf=fNull;var $rs=fNull;var $rns=fNull;var r=fNull;
var $exception=fNull;var dbO={};
//-START-
if((typeof dbU=='object')||(typeof dbS=='object'))
try{$init();$log("START");
function processDATA(db,sS){with(db){try{i=0;imax=row.length;while(i<imax){if(location.host.match(row[i][0])){ii=0;iimax=row[i].length;while(ii<iimax){
 if(sS.match(row[i][ii][0])){
 if(row[i][ii][1]){
   initCmds();
 		row[i][ii][1]();
 }}ii++;}throw eOK;}i++;}}catch(e){raise;}}};
function finalCmds(){$log("END",location.href);if(sLog!="")alert(sLog);
	sLog="";sNL='';eMsg="";time=0;sQ="";sClose="";sDownload="";sNotActivated="";sCaptcha="";sVer="";dbS=null;dbU=null;dbO=null;
};
function initCmds(){sLog="";sNL='#1310#';eRaise=false;eMsg="";time=0;sQ=" : ";bTimerInTitle=true;autoDownload=false;sClose="CLOSE";sDownload="Download now";sNotActivated="Not Activated";sCaptcha="Captcha Code needed";
	$test=function(){alert(location.href)};
 $addEvent=function(pEvent, pFunc, pMode){document.addEventListener(pEvent, pFunc, pMode)};
//Executed in capturing (true) or bubbling (false) [default] phase // DOMNodeInserted | DOMNodeRemoved | DOMAttrModified
 $removeEvent=function(pEvent, pFunc, pMode){document.removeEventListener(pEvent, pFunc, pMode)};
/*
 $now=function(){return (new Date()).getTime();};
 $init=function(){time=$now();};
 $log=function(sTitle,sData){sLog=sLog+sQ+sTitle+sQ+($now()-time);if(sData)sLog=sLog+sQ+sData;};
 $alert=function(logValue,logName){if(!logName)logName='ALL';alert(logName+sQ+logValue);};
*/
 $getPAGE=function(pUrl,pCall,pGET){if(!pGET)pGET='GET';var http_request=false;if(window.XMLHttpRequest){http_request=new XMLHttpRequest();if(http_request.overrideMimeType){http_request.overrideMimeType('text/xml');}}else if(window.ActiveXObject){try{http_request=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{http_request=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}};if(!http_request){alert('XMLHTTP instance creation failed');return false;}http_request.onreadystatechange=function(){pCall(http_request);};http_request.open(pGET, pUrl, true);http_request.send(null);};
 $injectPAGE=function(pUrl,pInjectHTML){function inject_HTML(http_request){if(http_request.readyState==4){if(http_request.status==200){$$(pInjectHTML, http_request.responseText);}else{alert('Problem with request.');}}}$getPAGE(pUrl,inject_HTML);};
 $appendPAGE=function(pUrl){function append_HTML(http_request){if(http_request.readyState==4){if(http_request.status==200){document.body.innerHTML=document.body.innerHTML+http_request.responseText;}else{alert('Problem with request.');}}}$getPAGE(pUrl,append_HTML);};
 $appendChild=function(pParent,pData,pValue,pColor){var El = document.createElement('a');El.setAttribute('href',pData);if(pColor)El.setAttribute('style',pColor);var Tx = document.createTextNode(pValue);El.appendChild(Tx);pParent.appendChild(El);};
 $back=function(){back()};
 $reload=function(){reload()};
 $close=function(){close()};
 $backReload=function(){$back();$reload()};
 $null=function(){};
 $alertRET=function(Msg){alert(Msg+sQ+sNotActivated);return;};
 $closeTXT=function(res){if(res)document.title=sClose;};
 $int=function(intNumber,multiplier){if(!multiplier)multiplier=1;if((!intNumber)||(intNumber<=0))return 0;else{res=((intNumber/1)*multiplier);return res;}};
 $getINT=function(sText,multiplier,sSource){if(!multiplier)multiplier=1;return $int($(sText,sSource),multiplier)};
	$goURL=function(urlLink){$alert(urlLink,'$goURL');urlLink=urlLink.replace(/[&]amp;/g,'&');urlLink=urlLink.replace(/[&]gt;/g,'>');urlLink=urlLink.replace(/[&]lt;/g,'<');urlLink=urlLink.replace(/[&]quot;/g,'"');$alert(urlLink,'$gotoURL');location.href=urlLink;};
	$go=function(data,parentNode){$alert(data+sQ+parentNode,'$go');if(!data)return null;try{if(N=$(data,parentNode)){if(typeof N=='string'){if(N.indexOf("://")==-1){if(N[0]!='/')N=location.protocol+'//'+location.host+'/'+N;else{N=location.protocol+'//'+location.host+N;}}}$alert(N,'$go');$goURL(N);return true;}else{return null;}}catch(e){if((eRaise)&&(eMsg!="")){alert('EXCEPTION: '+eMsg);raise;}return null;}};
	$goCLOSE=function(data,parentNode){var res=$go(data,parentNode);$closeTXT(res);return res;};
 $$=function(sText,sReplace,sSource){$alert(sText+sQ+sReplace+sQ+sSource,'$$');if(sText!=null)try{if((!sSource)||(sSource=='body')||(sSource=='head')||(sSource=='all')){if((!sSource)||(sSource=='body')||(sSource=='all')){document.body.innerHTML=document.body.innerHTML.replace(/\n/g,sNL).replace(sText,sReplace).replace(/#1310#/g,'\n');};if((sSource=='head')||(sSource=='all')){document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML.replace(/\n/g,sNL).replace(sText,sReplace).replace(/#1310#/g,'\n');}}else{if(typeof sSource=='string')return sSource.replace(/\n/g,sNL).replace(sText,sReplace).replace(/#1310#/g,'\n');else{sSource.setAttribute(sText, sReplace);}}}catch(e){return null;}};
 $$css=function(style){var head=document.getElementsByTagName("HEAD")[0];var el=window.document.createElement('link');el.rel='stylesheet';el.type='text/css';el.href='data:text/css;charset=utf-8,'+escape(style);head.appendChild(el);};
 $$display=function(style,data){if((!data)||(!style))return;$$('style','display:'+style,$(data))};
 $$$=function(data,pCSS,pCSS2){if(data)$(data).innerHTML='';if(pCSS)$$css(pCSS+" {height:1px;min-height:1px;}");if(pCSS2)$$css(pCSS+" {"+pCSS2+"}")};
 $rm=function(data,parentNode,idx){if(data){if(N=$(data,parentNode,idx))N.parentNode.removeChild(N)}};
 $rmP=function(cnt,data,parentNode,idx){if(data){if(typeof data=='string')data=[data];dlen=data.length;for(i=0;i<dlen;i++)if(N=$(data[i],parentNode,idx)){while(cnt>0){N=N.parentNode;cnt--;}N.parentNode.removeChild(N)}}};
 $rmL=function(ST,EN,data,parentNode){if(EN>ST){i=EN;pE=ST-1}else{i=ST;pE=EN-1};while(i>pE){$rm(data,parentNode,i);i--;}};
 $rmA=function(data,pParent){if(!data)return;dlen=data.length;for(i=0;i<dlen;i++)$rm(data[i],pParent)};
 $sub=function(data,parentNode){if(!data)return null;try{if(N=$(data,parentNode)){N.submit();return true;}else{return null;}}catch(e){if((eRaise)&&(eMsg!="")){alert('EXCEPTION: '+eMsg);if(eRaise)raise;}return null;}};
 $subCLOSE=function(data,parentNode){var res=$sub(data,parentNode);$closeTXT(res);return res;};
 $click=function(data,parentNode){if(!data)return null;try{if(N=$(data,parentNode)){N.click();return true;}else{return null;}}catch(e){if((eRaise)&&(eMsg!="")){alert('EXCEPTION: '+eMsg);if(eRaise)raise;}return null;}};
 $clickCLOSE=function(data,parentNode){var res=$click(data,parentNode);$closeTXT(res);return res;};
 $captcha=function(exp,display){if(display!=false)display=true;if(N=$(exp)){if(display)alert(sCaptcha);}return N};
 $wait=function(delaySeconds,captionStr,download){if(!delaySeconds)return null;if(delaySeconds<=0)return null;try{var timeReady=new Date();timeReady.setSeconds(timeReady.getSeconds()+delaySeconds);return waitTimeoff();}catch(e){alert('waitUntilReady Exception');}function waitTimeoff(){try{var $now=new Date();if($now<timeReady){var left=new Date(timeReady-$now);var strTime=left.toUTCString().match(/(0[1-9]:)?\d\d:\d\d /)[0];if(bTimerInTitle)document.title=captionStr+" ("+strTime+")";setTimeout(function(){waitTimeoff();},100);}else{if(download){if(typeof data!='string')download();}else{document.title="Download";if(download!='NULL')alert(captionStr+' Download Ready...')}return true}}catch(e){return null}}};
 $waitTime=function(captionStr,download){N=$(/<.+? id=\".+?\">(\d+)<\/.+?>/);if(N){N=$getINT(N);}else{N=$getINT(/(\d+) [Second|second]/)+$getINT(/(\d+) [Minute|minute]/,60)+$getINT(/(\d+) [Hour|hour]/,3600)};return $wait(N+2,captionStr,download)};
 $listCall=function(pExp,pcall,pStart,pEnd){list=$(pExp);if(list){if(pStart){if(pStart<0)i=list.length+pStart;else{i=pStart}}else{i=0};if(pEnd){if(pEnd<0)imax=list.length+pEnd;else{imax=pEnd}}else{imax=list.length};while(i<imax){pcall(list[i],i);i++;}}};
 $siteORDER=function(pOrderASC,parentNode){if(!parentNode)parentNode=document.body;if(!pOrderASC){with(dbO){i=0;imax=row.length;while(i<imax){ii=0;iimax=row[i].length;while(ii<iimax){if(N=$(row[i][ii]))return N;ii++};i++;}}return null;}else{with(dbO){i=0;imax=row.length;while(i<imax){ii=row[i].length;iimax=-1;while(ii>iimax){if(N=$(row[i][ii]))return N;ii--};i++;}}return null;}};
 $rv=function(sSource,sText1,sReplace1,sText2,sReplace2,sText3,sReplace3){try{if((!sSource)||(sSource=='body')||(sSource=='all')){if(sText3)document.body.innerHTML=document.body.innerHTML.replace(/\n/g,sNL).replace(sText1,sReplace1).replace(sText2,sReplace2).replace(sText3,sReplace3).replace(/#1310#/g,'\n');else{if(sText2)document.body.innerHTML=document.body.innerHTML.replace(/\n/g,sNL).replace(sText1,sReplace1).replace(sText2,sReplace2).replace(/#1310#/g,'\n');}};if((sSource=='head')||(sSource=='all')){if(sText3)document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML.replace(/\n/g,sNL).replace(sText1,sReplace1).replace(sText2,sReplace2).replace(sText3,sReplace3).replace(/#1310#/g,'\n');else{if(sText2)document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML.replace(/\n/g,sNL).replace(sText1,sReplace1).replace(sText2,sReplace2).replace(/#1310#/g,'\n');}}}catch(e){return null;}};
 $rf=function(data){$rv(data,/(<iframe.+?)</g,'<',/<\/iframe>/g,'')};
 $rs=function(data){$rv(data,/(<script.+?)</g,'<',/<\/script>/g,'')};
 $rns=function(data){$rv(data,/(<noscript.+?)</g,'<',/<\/noscript>/g,'')};
 r=function(data){$rf(data);$rs(data);$rns(data)};
 $exception=function(){throw eOK;};
	$getA=function(x,idx){if(x){if(idx<0){if((x.length+idx)>-1)return x[x.length+idx];else{if(eRaise){alert('$getA: '+x.length+idx);raise}return null}}else{return x[idx]}}};
	$=function(data,parentNode,idx){var res=null;
	if(data)try{
	 if(typeof parentNode=='number'){idx=parentNode;parentNode=null;}
	 if(parentNode){if(typeof parentNode=='string'){if(parentNode=='body')parentNode=document.body.innerHTML;else{if(parentNode=='head')parentNode=document.getElementsByTagName('head')[0].innerHTML;else{parentNode=$(parentNode);}}}}
	 if(typeof data=='string'){
	  if(data[1]==':'){switch(data[0]+data[1]){
	  	case'C:':idx='class';break;
	  	case'V:':idx='value';break;
	  	case'S:':idx='src';break;
	  	case'H:':idx='href';break;
	  	case'L:':idx='style';break;
	  }
	  if(typeof idx=='string')data='Z'+data.substring(1);
	  switch(data[0]+data[1]){
	  case'A:':if(parentNode)res=parentNode.getAttribute(data.substring(2));break;
	  case'I:':if(!parentNode)parentNode=document;res=parentNode.getElementById(data.substring(2));break;
	  case'N:':if(!parentNode)parentNode=document;if(!idx)idx=0;res=parentNode.getElementsByName(data.substring(2)).item(idx);idx='';break;
	  case'T:':if(!parentNode)parentNode=document;res=parentNode.getElementsByTagName(data.substring(2));break;
	  case'X:':if(!parentNode)parentNode='*';res=$('//'+parentNode+'[contains(text(),"'+data.substring(2)+'")]');break;
	  case'Y:':if(parentNode)if(parentNode.getAttribute('type')==data.substring(2))res=parentNode;break;
	  case'Z:':if(!parentNode)parentNode='*';res=$('//'+parentNode+'[@'+idx+'="'+data.substring(2)+'"]');break;
	  }
	  if(typeof idx=='number')res=$getA(res,idx);
	  }else{
	 	if(data=='body')res=document.body.innerHTML;
	 	else{
	 	 if(data=='head')res=document.getElementsByTagName('head')[0].innerHTML;
	 	 else{
	 	 	if((data[0]=='/')&&(data[1]=='/')){
	 	 	 res=document.evaluate(data,parentNode || document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	 	 	}else{
	 	 	if((data[0]=='U')&&(data[1]=='/')&&(data[2]=='/')){
		   var i,res=[],x = document.evaluate(data.substring(1),parentNode || document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
		   while(i=x.iterateNext()) res.push(i);
	 	 	}else{
	 	 	if((data[0]=='O')&&(data[1]=='/')&&(data[2]=='/')){
		   var i,res=[],x = document.evaluate(data.substring(1),parentNode || document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		   while(i=x.iterateNext()) res.push(i);
	 	 	}else{
	 	 		res=data;
	 }}}}}}}else{
	if(data.nodeType)res=data;
	else{
	 	try{
	 	 if(!parentNode)parentNode=document.body.innerHTML;
	 	 if(!idx)idx=1;
	 	 var x=parentNode.replace(/\n/g,'').match(data);
	   if(idx==0)res=x;else{res=$getA(x,idx)}
	 	}catch(e){res=data;}}
	 };$alert(res,'$');
	 }catch(e){$alert('Exception:','$');}
	 return res;
	};
	dbO={
	row:[
	 ['X:Zshare','X:ZSHARE','//img[@src="/images/ZShare.jpg"]','X:Zshare.net']
	,['X:Megaupload','//img[@src="/images/MegaUpload.jpg"]','X:Megaupload.com']
	,['X:FileFactory','X:Filefactory','X:Filefactory.com']
	,['//img[@src="/images/SendSpace.jpg"]','X:Sendspace.com']
	,['X:Easy-Share','X:Easy-share.com']
	,['//img[@src="/images/RapidShare.jpg"]','X:Rapidshare.com']
	,['X:Uploaded','X:Uploaded.to']
	,['X:DepositFiles','X:Depositfiles.com']
	,['X:Badongo','X:Badongo.com']
	,['X:Zippyshare.com']
	,['X:Mediafire.com']
	]
	};
};
if(typeof dbU=='object')processDATA(dbU,location.href);
if(typeof dbS=='object')processDATA(dbS,location.href);
}catch(e){}finally{finalCmds();eOK=null;}
loc='';
//-END-
