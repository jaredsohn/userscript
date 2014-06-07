// ==UserScript==
// @name           AIO_Auto Redirect Script for Thai Image Hosting
// @namespace      http://www.meddlesome.in.th
// @description    All-In-One Script Auto Redirect to Direct Image Links for Thai Image Hosting

// @include        http://*temppic.com/img*
// @include        http://upload.mwake.com/v*
// @include        http://upload.sodazaa.cc/share*
// @include        http://uppic.dorabit.com/show*
// @include        http://upload.bluegy.com/show*
// @include        http://image.ohozaa.com/show*
// @include        http://*zeedimage.net/viewer*
// @include        http://*uppic.net/show/*
// @include        http://images.torrentmove.com/show*
// @include        http://postto.me/show*
// @include        http://img.siambit.com/showpic*
// @include        http://*youpica.com/view*
// @include        http://xpic.us/showpic*
// @include        http://upload.armuay.com/*.png
// @include        http://upload.armuay.com/*.jpg
// @include        http://upload.armuay.com/*.gif
// @include        http://*arai-dd.com/upload/?view=*
// @include        http://*uppicweb.com/show*
// @include        http://upic.me/show*
// @include        http://uppic.moosuper.net/show*
// @include        http://uppic.soizaa.com/viewer*
// @include        http://loadpix.net/view*
// @include        http://*uppic99.com/show*
// @include        http://upload.dkrub.com/show*
// @include        http://upload.myfri3nd.com/view/*
// @include        http://*clip-hot.com/up/v.php?*
// @include        http://uppic.sodazaa.cc/view*
// @include        http://*ulbuzz.com/*
// @include        http://*ulbuzz.net/*
// @include        http://*ziss.in.th/pic/show*
// @include        http://*gignisit.com/uppic/v.php*
// @include  	   http://img.soizaa.com/view*
// @include  	   http://*uppicfast.com/share.php?*
// @include  	   http://*uptogu.com/pic/viewer*
// @include  	   http://*zeedzad.net/so/show*
// @include  	   http://upload.siamza.com/showpic*
// @include  	   http://pic.dkrub.com/viewer*
// @include  	   http://img.zuzaa.com/share*
// @include  	   http://*bestuppic.com/share*
// @include  	   http://filethai.com/admin/dl*
// @include  	   http://*pictme.in/viewer*
// @include  	   http://*uppicture.com/view*
// @include  	   http://*loadpix.net/view*
// @include  	   http://*up4z.com/share*
// @include  	   http://*hulashare.com/viewer*
// @include  	   http://*uppicja.com/show*
// @include  	   http://*upit.in.th/show*
// @include  	   http://*uparai.com/view*
// @include  	   http://*dorabit.com/show*
// @include  	   http://upload.ngungi.com/show-image*
// @include  	   http://*cvpic.com/view*
// @include  	   http://*uppicbb.com/image*
// @include  	   http://*xni.in/show*
// @include  	   http://*fakloop.in.th/share*
// @include 	   http://img2you.com/show*
// @include 	   http://*uppic666.com/viewer*
// @include 	   http://*imageslum.net/?v*
// @include 	   http://as.romathai.com/view*
// @include 	   http://img.ihere.org/new/share*
// @include 	   http://*siampic.net/SiamPIC*
// @include 	   http://*myuppic.com/show*
// @include 	   http://*uptogu.com/pix/share*
// @include 	   http://upload.soda-zaa.com/share*
// @include 	   http://*freeuppic.com/view*
// @include 	   http://*picme8.com/viewer*
// @include 	   http://img.fakrub.com/fakRubDownload*
// @include 	   http://*pic2u.in/view*
// @include 	   http://images.thport.com/show*
// @include 	   http://upload-dd.com/image/show*
// @include 	   http://*up-pic.info/share*
// @include 	   http://*uptogu.com/pic/view*

// ==/UserScript==

//redirectFunction
var domain = document.domain;
var domain3 = domain;
if(domain.substring(0,4)=="www.")
	domain = domain.substring(4);

var domain2 = 'http://' + domain3 + '/';
//------------------------------------
function setredir(iNum)
	window.location = document.getElementsByTagName('img')[iNum].src;
//------------------------------------
function setredir2(sourceURL,destURL)
	window.location = domain2 + destURL + window.location.href.substring(location.href.indexOf(sourceURL)+sourceURL.length);
//------------------------------------
function setredir2_1(sourceURL,destURL)
	window.location = destURL + window.location.href.substring(location.href.indexOf(sourceURL)+sourceURL.length);
//------------------------------------	
function setredir3(sourceURL,destURL,extURL)
	window.location = domain2 + destURL + window.location.href.substring(location.href.indexOf(sourceURL)+sourceURL.length,window.location.href.indexOf(extURL)); 
//------------------------------------
function setredir4(sourceURL){
	imgFname = window.location.href.substring(location.href.indexOf(sourceURL)+sourceURL.length);

	for(var i=0;i<document.getElementsByTagName('img').length;i++) {
		if(document.getElementsByTagName('img')[i].src.substring(location.href.indexOf(sourceURL)+sourceURL.length) == imgFname)
			target = document.getElementsByTagName('img')[i].src;
	}
	window.location = 'javascript:document.write(\'<img src="' + target + '" />\')';
}
//------------------------------------
function setredir5(regex,pos){	
	regex = new RegExp(regex);
	var target = "NO";
	if(isNaN(pos))var i=0;
	else var i = pos;
	for(;i<document.getElementsByTagName('img').length;i++) {
		if(document.getElementsByTagName('img')[i].src.match(regex)){
			target = document.getElementsByTagName('img')[i].src;
			break;
		}
	}
	if(target != "NO")
		window.location = target;
}
//------------------------------------

/*
//debugFunction (just unComment to run debugFunction)
var debugURLvalue = 'URL of images.\n';
function debugURL(){
	for(var i=0;i<document.getElementsByTagName('img').length;i++)
		debugURLvalue += i + ') ' + document.getElementsByTagName('img')[i].src + '\n';

	alert('This Page have ' + i + ' images.\n\n' + debugURLvalue);
}
debugURL();
*/

var urls_1 = new Array("temppic.com","arai-dd.com","cvpic.com","upload.bluegy.com");
var urls_2 = new Array("uppic.dorabit.com","dorabit.com");
var urls_3 = new Array("image.ohozaa.com","uppic.net","images.torrentmove.com","postto.me","uppicweb.com","zeedzad.net","siampic.net","myuppic.com","xpic.us","img.siambit.com");
var urls_4 = new Array("upload.mwake.com","zeedimage.net","uppic.sodazaa.cc","youpica.com","pic.dkrub.com","img.zuzaa.com","bestuppic.com","up4z.com","hulashare.com","uppicbb.com","fakloop.in.th","upload.soda-zaa.com","freeuppic.com","picme8.com","img.fakrub.com","images.thport.com","up-pic.info");
var urls_5 = new Array("loadpix.net","uparai.com");
var urls_6 = new Array("ziss.in.th","uppicja.com","upload.ngungi.com");
var urls_7 = new Array("img.soizaa.com","uppicture.com","as.romathai.com","pic2u.in");
var urls_8 = new Array("upload.dkrub.com","up.xni.in");
var urls_9 = new Array("uppic.soizaa.com","upload.siamza.com");

for(x in urls_1) if(domain==urls_1[x])setredir5(domain2 + "upload");
for(x in urls_2) if(domain==urls_2[x])setredir5(domain2 + "uppic",1);
for(x in urls_3) if(domain==urls_3[x])setredir5(domain2 + "[a-z]./");
for(x in urls_4) if(domain==urls_4[x])setredir5(domain2 + "ima");
for(x in urls_5) if(domain==urls_5[x])setredir2("file=","images/");
for(x in urls_6) if(domain==urls_6[x])setredir5(domain2 + "pic");
for(x in urls_7) if(domain==urls_7[x])setredir2("view-","images/");
for(x in urls_8) if(domain==urls_8[x])setredir3("show.php/","out.php/i",".html");
for(x in urls_9) if(domain==urls_9[x])setredir5(domain2 + "file");

if(domain=="upload.armuay.com")setredir5(domain2 + "img");
//if(domain=="upic.me")setredir5(domain2 + "[a-z]/");
if(domain=="uppic.moosuper.net")setredir5("^http://" + domain + "./[a-z]./");
if(domain=="uppic99.com")setredir3("show.php?img=","out.php?i=",".html"); 
if(domain=="upload.myfri3nd.com")setredir5("i[a-z.]*.myfri3nd.com/up");
if(domain=="clip-hot.com")setredir2("v.php?id=","up/images/");
if(domain=="ulbuzz.net")setredir5("^http://sv[0-9]");
if(domain=="gignisit.com")setredir2("v.php?id=","uppic/images/");
if(domain=="uppicfast.com")setredir2("share.php?id=","image.php?id=");
if(domain=="uptogu.com"){setredir2_1("filename=","http://www.2isme.com/pic/");setredir5(domain2 + "pix/image");}
if(domain=="filethai.com")setredir5(domain2 + "adm");
if(domain=="pictme.in")setredir2("viewer.php?file=","images/");
if(domain=="upit.in.th")setredir5(domain2 + "i");
if(domain=="img2you.com")setredir2("showimg.php?id=","/img/");
if(domain=="uppic666.com")setredir2("viewer.php?file=","/images/");
if(domain=="imageslum.net")setredir2("?v=","/images/");
if(domain=="img.ihere.org")setredir2("share.php?id=","new/image.php?id=");
if(domain=="upload-dd.com")setredir2("image/show/","image/direct/");