// ==UserScript==
// @name           AIO_Auto Redirect Script for Thai Image Hosting
// @namespace      http://www.somethingselse.com
// @description    All-In-One Script Auto Redirect to Direct Image Links for Thai Image Hosting

// @include        http://*temppic.com/img*
// @include        http://paypic*.mwake.com/view*
// @include        http://upload.mwake.com/v*
// @include        http://*siam2.com/up/picture.php*
// @include        http://upload.sodazaa.cc/share*
// @include        http://uppic.dorabit.com/show*
// @include        http://upload.bluegy.com/show*
// @include        http://image.ohozaa.com/show*
// @include        http://*zeedimage.net/viewer*
// @include        http://*uppic.net/show/*
// @include        http://images.torrentmove.com/show*
// @include        http://*zakudoh.com/#*
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
// @include        http://*aloneza.com/image/showpic*
// @include        http://loadpix.net/view*
// @include        http://*uppic99.com/show*
// @include        http://upload.dkrub.com/show*
// @include        http://upload.myfri3nd.com/view/*
// @include        http://img.dlzeed.com/view*
// @include        http://*clip-hot.com/uppic/v.php?*
// @include        http://uppic.sodazaa.cc/view*
// @include        http://*ulbuzz.com/*
// @include        http://*ziss.in.th/pic/show*
// @include        http://*soisiam.com/show.php*
// @include        http://*soisiam.com/view.php*
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
// @include 	http://*uptogu.com*
// @include 	http://*up-pic.info*
// @include 	http://*up.xni.in*
// @include 	http://*uppiczz.com*
// @include 	http://*uppic.dlth.in.th*
// @include 	http://*upload.zeedasia.com*
// @include 	http://*siampic.net*
// @include 	http://*newuppic.com*
// @include 	http://*uppicpost.com*
// @include 	http://*zeed2.com*
// @include 	http://*uppicstock.com*
// @include 	http://*img.fakrub.com*
// @include 	http://*upmany.com*
// @include	http://*pic2you.net*
// @include	http://*upicy.com*
// @include	http://*xxxupl.com*



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
function setredir99(sourceURL){
	url11 = document.URL;
	url22 = url11.replace("/upper/share.php?id=", "/upper/image-");
	urlxx = url11.substring(0, url11.length - 13);
	url33 = url11.substring(urlxx.length);
	url44 = url22 + '.jpg';
	//alert(url44)
	window.location = url44;
}
//------------------------------------	
function setredir88(sourceURL){
	url11 = document.URL;
	url22 = url11.replace("/share-", "/image-");
	urlxx = url11.substring(0, url11.length - 13);
	url33 = url11.substring(urlxx.length);
	url44 = url22.replace(".html", ".jpg");
	//alert(url44)
	window.location = url44;
}
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
function setredir5(regex){	
	regex = new RegExp(regex);
	var target = "NO";
	
	for(var i=0;i<document.getElementsByTagName('img').length;i++) {
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

if(domain=="temppic.com")setredir5(domain2 + "upload");
//if(domain=="paypic.mwake.com")setredir(1);
//if(domain=="paypic2.mwake.com")setredir(1);
if(domain=="upload.mwake.com")setredir5(domain2 + "image");
//if(domain=="siam2.com")setredir(4);
if(domain=="upload.sodazaa.cc")setredir5(domain2 + "image");
if(domain=="uppic.dorabit.com")setredir5(domain2 + "up");
if(domain=="upload.bluegy.com")setredir5(domain2 + "up");
if(domain=="image.ohozaa.com")setredir5(domain2 + "[a-z]./");
if(domain=="zeedimage.net")setredir5(domain2 + "image");
if(domain=="uppic.net")setredir5(domain2 + "[a-z]./");
if(domain=="images.torrentmove.com")setredir5(domain2 + "[a-z]./");
//if(domain=="zakudoh.com")setredir2("#","pics/");
if(domain=="postto.me")setredir5(domain2 + "[a-z]./");
//if(domain=="img.siambit.com")setredir(0);
if(domain=="youpica.com")setredir5(domain2 + "image");
//if(domain=="xpic.us")setredir(0);
if(domain=="upload.armuay.com")setredir5(domain2 + "img");
//if(domain=="upload.armuay.com")setredir(4); (mysqlerror)
if(domain=="arai-dd.com")setredir5(domain2 + "upload");
if(domain=="uppicweb.com")setredir5(domain2 + "[a-z]./");
if(domain=="upic.me")setredir5(domain2 + "[a-z]/");
if(domain=="uppic.moosuper.net")setredir5("^http://" + domain + "./[a-z]./");
//if(domain=="uppic.soizaa.com")setredir(18);
//if(domain=="aloneza.com")setredir(3);
//if(domain=="loadpix.net")setredir(4);
if(domain=="uppic99.com")setredir3("show.php?img=","out.php?i=",".html"); 
if(domain=="upload.dkrub.com")setredir3("show.php/","out.php/i",".html");
if(domain=="upload.myfri3nd.com")setredir(6);
//if(domain=="img.dlzeed.com")setredir(7);
if(domain=="clip-hot.com")setredir2("v.php?id=","uppic/images/");
if(domain=="uppic.sodazaa.cc")setredir5(domain2 + "ima");
if(domain=="ulbuzz.com")setredir(6);
if(domain=="ziss.in.th")setredir5(domain2 + "pic");
//if(domain=="soisiam.com")setredir2("show.php?file=","images/");
if(domain=="soisiam.com")setredir2("show.php?file=","images/");
if(domain=="gignisit.com")setredir2("v.php?id=","uppic/images/");
if(domain=="img.soizaa.com")setredir2("view-","images/");
if(domain=="uppicfast.com")setredir2("share.php?id=","image.php?id=");
if(domain=="uptogu.com")setredir2("viewer.php?file=","/pic/images/");
if(domain=="zeedzad.net")setredir5(domain2 + "[a-z]./");
if(domain=="upload.siamza.com")setredir5(domain2 + "file");
if(domain=="pic.dkrub.com")setredir5(domain2 + "ima");
if(domain=="img.zuzaa.com")setredir5(domain2 + "ima");
if(domain=="bestuppic.com")setredir5(domain2 + "ima");
if(domain=="filethai.com")setredir5(domain2 + "adm");
if(domain=="pictme.in")setredir2("viewer.php?file=","images/");
if(domain=="uppicture.com")setredir2("view-","images/");
if(domain=="post-pic.info")setredir2("share.php?id=","image.php?id=");
if(domain=="hulashare.com")setredir2("viewer.php?file=","images/");
if(domain=="uptogu.com")setredir2("pix/share.php?id=","pix/image.php?id=");
if(domain=="up-pic.info")setredir2("share.php?id=","image.php?id=");
if(domain=="up.xni.in")setredir3("show.php/","out.php/i",".html");
if(domain=="uppiczz.com")setredir5(domain2 + "[a-z]");
//if(domain=="newuppic.com")setredir2("view-","images/");
if(domain=="uppic.dlth.in.th")setredir2("share.php?id=","image.php?id=");
if(domain=="upload.zeedasia.com")setredir2("/viewer.php?file=","/files/");
if(domain=="siampic.net")setredir5(domain2 + "[a-z]");
//if(domain=="uppic.mobi")setredir3("share-","images-",".html");
if(domain=="newuppic.com")setredir2("share-","images-");
if(domain=="uppicpost.com")setredir2("share","image");
if(domain=="zeed2.com")setredir2("share","image");
//if(domain=="pixsor.com")setredir88("asdf");
if(domain=="uppicstock.com")setredir99("asdf");
if(domain=="pic2me.com")setredir2("share","image");
if(domain=="pic.zeed2.com")setredir2("share","image");
if(domain=="img.fakrub.com")setredir2("fakRubDownload","image_org");
if(domain=="loadpix.net")setredir2("viewer.php?file=","images/");
if(domain=="upmany.com")setredir5(domain2 + "[a-z]");
if(domain=="pic2you.net")setredir2("v2/viewer.php?file=","v2/images/");
if(domain=="upicy.com")setredir88("asdf");
if(domain=="xxxupl.com")setredir88("asdf");