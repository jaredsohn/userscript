// ==UserScript==
// @name           AIO_Auto Redirect Script for Thai Image Hosting
// @namespace      http://www.somethingselse.com
// @description    All-In-One Script Auto Redirect to Direct Image Links for Thai Image Hosting

// @include	http://*temppic.com/img*
// @include	http://paypic*.mwake.com/view*
// @include	http://upload.mwake.com/v*
// @include	http://*siam2.com/up/picture.php*
// @include	http://upload.sodazaa.cc/share*
// @include	http://uppic.dorabit.com/show*
// @include	http://upload.bluegy.com/show*
// @include	http://image.ohozaa.com/*
// @include	http://*zeedimage.net/viewer*
// @include	http://*uppic.net/show/*
// @include	http://images.torrentmove.com/show*
// @include	http://*zakudoh.com/#*
// @include	http://postto.me/show*
// @include	http://img.siambit.com/showpic*
// @include	http://*youpica.com/view*
// @include	http://xpic.us/showpic.php?*
// @include	http://*arai-dd.com/upload/?view=*
// @include	http://*uppicweb.com/show*
// @include	http://upic.me/show*
// @include	http://uppic.moosuper.net/show*
// @include	http://uppic.soizaa.com/viewer*
// @include	http://*aloneza.com/image/showpic*
// @include	http://loadpix.net/view*
// @include	http://*uppic99.com/show*
// @include	http://upload.dkrub.com/show*
// @include	http://upload.myfri3nd.com/view/*
// @include	http://img.dlzeed.com/view*
// @include	http://*clip-hot.com/uppic/v.php?*
// @include	http://uppic.sodazaa.cc/view*
// @include	http://*ulbuzz.com/*
// @include	http://*ziss.in.th/pic/show*
// @include	http://*soisiam.com/show.php*
// @include	http://*soisiam.com/view.php*
// @include	http://*gignisit.com/uppic/v.php*
// @include	http://img.soizaa.com/view*
// @include	http://*uppicfast.com/share.php?*
// @include	http://www.hulashare.com/viewer.php?*
// @include	http://*uptogu.com/*
// @include	http://*zeedzad.net/so/show*
// @include	http://upload.siamza.com/showpic*
// @include	http://pic.dkrub.com/viewer*
// @include	http://img.zuzaa.com/share*
// @include	http://*bestuppic.com/share*
// @include	http://filethai.com/admin/dl*
// @include	http://*pictme.in/viewer*
// @include	http://*uppicture.com/view*
// @include	http://*up-pic.info*
// @include	http://*up.xni.in*
// @include	http://*uppiczz.com*
// @include	http://*uppic.dlth.in.th*
// @include	http://*upload.zeedasia.com*
// @include	http://*siampic.net*
// @include	http://*newuppic.com*
// @include	http://*uppicpost.com*
// @include	http://*zeed2.com*
// @include	http://*uppicstock.com*
// @include	http://*img.fakrub.com*
// @include	http://*upmany.com*
// @include	http://*pic2you.net*
// @include	http://*upicy.com*
// @include	http://*xxxupl.com*
// @include	http://*piggy.in.th/share.php?*
// @include	http://*uppic.us/pic.php?*
// @include	http://*image.free.in.th/show.php?*
// @include	http://*imagetwist.com*
// @include	http://*sv2.uppic18up.com*
// @include	http://www.picpostclub.com/view.php?*
// @include	http://www.image24hr.com/show.php?*
// @include	http://imageshack.us/photo*
// @include	http://sv1.up200m.com/index.php?*
// @include	http://pic.up-img.com/show.php?*
// @include	http://www.picture69.com/dl/?*
// @include	http://uppiczi.com/show.php?*
// @include	http://www.picza.net/show.php?*
// @include	http://www.imageporter.com*
// @include	http://img3.imagehyper.com/img.php?*
// @include	http://img4.imagehyper.com/img.php?*
// @include	http://yfrog.com/*
// @include	http://www.inwpic.com/show-image.php?*
// @include	http://www.17upload.com/index.php?*
// @include	http://img.flyffup.net*
// @include	http://imageban.net/show*
// @include	http://www.zeedzazab.com/share.php?*
// @include	http://www.atuppic.com/share.php?*
// @include	http://www.picscrazy.com/view*
// @include	http://copot.in/?v*
// @include	http://img246.imagevenue.com/img.php?*
// @include	http://*flyffzeed.com/uppic/show*
// @include	http://img.flyffzeed.com/*
// @include	http://img.coolz-server.com/*
// @include	http://www.dumpt.com/img/viewer.php?*
// @include	http://www.mrjh.org/gallery.php?*
// @include	http://*imgiga.com/img.php?*
// @include	http://*picfoco.com/img.php?*
// @include	http://s2.pic2u.net/v.php?*
// @include	http://www.nootbook.net/viewer.php?*
// @include	http://pixss.info/*
// @include	http://avdue.net/index.php?*
// @include	http://www.wezatv.com/*
// @include	http://www.doballclub.com/upload/viewer.php?*
// @include	http://picth.com/*
// @include	http://sexstorythai.com/uppic*
// @include	http://www.gojav.net/?*
// @include	http://upload.armuay.com*
// @include	http://nisitpost.com/upload/san.php?*


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
function setredir77(sourceURL){
	url11 = document.URL;
	url22 = url11.replace("/pt-", "/di-");
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
if(domain=="paypic.mwake.com")setredir(1);
if(domain=="paypic2.mwake.com")setredir(1);
if(domain=="upload.mwake.com")setredir5(domain2 + "image");
if(domain=="siam2.com")setredir(4);
if(domain=="upload.sodazaa.cc")setredir5(domain2 + "image");
if(domain=="uppic.dorabit.com")setredir5(domain2 + "up");
if(domain=="upload.bluegy.com")setredir5(domain2 + "up");
if(domain=="image.ohozaa.com")setredir(6);
if(domain=="image.ohozaa.com")setredir5("/[a-z]/");
if(domain=="zeedimage.net")setredir5(domain2 + "image");
if(domain=="uppic.net")setredir5(domain2 + "[a-z]./");
if(domain=="images.torrentmove.com")setredir5(domain2 + "[a-z]./");
if(domain=="zakudoh.com")setredir2("#","pics/");
if(domain=="postto.me")setredir5(domain2 + "[a-z]./");
if(domain=="img.siambit.com")setredir(0);
if(domain=="youpica.com")setredir5(domain2 + "image");
if(domain=="xpic.us")setredir(1);
if(domain=="arai-dd.com")setredir5(domain2 + "upload");
if(domain=="uppicweb.com")setredir5(domain2 + "[a-z]./");
if(domain=="upic.me")setredir5(domain2 + "ts/" + "[a-z]/");
if(domain=="uppic.moosuper.net")setredir5("^http://" + domain + "./[a-z]./");
if(domain=="uppic.soizaa.com")setredir(18);
if(domain=="aloneza.com")setredir(3);
if(domain=="loadpix.net")setredir(4);
if(domain=="uppic99.com")setredir3("show.php?img=","out.php?i=",".html"); 
if(domain=="upload.dkrub.com")setredir3("show.php/","out.php/i",".html");
if(domain=="upload.myfri3nd.com")setredir(6);
if(domain=="img.dlzeed.com")setredir(7);
if(domain=="clip-hot.com")setredir2("v.php?id=","uppic/images/");
if(domain=="uppic.sodazaa.cc")setredir5(domain2 + "ima");
if(domain=="ulbuzz.com")setredir(6);
if(domain=="ziss.in.th")setredir5(domain2 + "pic");
if(domain=="soisiam.com")setredir2("show.php?file=","images/");
if(domain=="soisiam.com")setredir2("show.php?file=","images/");
if(domain=="gignisit.com")setredir2("v.php?id=","uppic/images/");
if(domain=="img.soizaa.com")setredir2("view-","images/");
if(domain=="uppicfast.com")setredir2("share.php?id=","image.php?id=");
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
if(domain=="newuppic.com")setredir2("view-","images/");
if(domain=="uppic.dlth.in.th")setredir2("share.php?id=","image.php?id=");
if(domain=="upload.zeedasia.com")setredir(4);
if(domain=="siampic.net")setredir5(domain2 + "[a-z]");
if(domain=="uppic.mobi")setredir3("share-","images-",".html");
if(domain=="newuppic.com")setredir2("share-","images-");
if(domain=="uppicpost.com")setredir2("share","image");
if(domain=="zeed2.com")setredir2("share","image");
if(domain=="pixsor.com")setredir88("asdf");
if(domain=="uppicstock.com")setredir99("asdf");
if(domain=="pic2me.com")setredir2("share","image");
if(domain=="pic.zeed2.com")setredir2("share","image");
if(domain=="img.fakrub.com")setredir2("fakRubDownload","image_org");
if(domain=="loadpix.net")setredir2("viewer.php?file=","images/");
if(domain=="upmany.com")setredir5(domain2 + "image/");
if(domain=="pic2you.net")setredir2("v2/viewer.php?file=","v2/images/");
if(domain=="upicy.com")setredir88("asdf");
if(domain=="xxxupl.com")setredir88("asdf");
if(domain=="piggy.in.th")setredir2("share.php?id=","image.php?id=");
if(domain=="uppic.us")setredir5(domain2 + "[a-z]");
if(domain=="image.free.in.th")setredir5(domain2 + "[a-z]/");
if(domain=="imagetwist.com")setredir(1);
if(domain=="sv2.uppic18up.com")setredir(0);
if(domain=="picpostclub.com")setredir5(domain2 + "uploads/");
if(domain=="image24hr.com")setredir5(domain2 + "upload/");
if(domain=="imageshack.us")setredir(1);
if(domain=="sv1.up200m.com")setredir5(domain2 + "[a-z]/");
if(domain=="pic.up-img.com")setredir(23);
if(domain=="picture69.com")setredir5(domain2 + "dl.php/");
if(domain=="uppiczi.com")setredir5(domain2 + "upload/");
if(domain=="picza.net")setredir5(domain2 + "uppic/");
if(domain=="imageporter.com")setredir(2);
if(domain=="img3.imagehyper.com")setredir5(domain2 + "img/");
if(domain=="img4.imagehyper.com")setredir5(domain2 + "img/");
if(domain=="yfrog.com")setredir5("xsize");
if(domain=="inwpic.com")setredir5(domain2 + "pictures/");
if(domain=="17upload.com")setredir2("index.php?mod=","plugin_view.php?mod=");
if(domain=="img.flyffup.net")setredir77("asdf");
if(domain=="imageban.net")setredir(8);
if(domain=="zeedzazab.com")setredir2("share.php?id=","image.php?id=");
if(domain=="atuppic.com")setredir2("share.php?id=","image.php?id=");
if(domain=="picscrazy.com")setredir5(domain2 + "image");
if(domain=="copot.in")setredir5(domain2 + "image");
if(domain=="img246.imagevenue.com")setredir(0);
if(domain=="flyffzeed.com")setredir(10);
if(domain=="img.flyffzeed.com")setredir77("asdf");
if(domain=="img.coolz-server.com")setredir5(domain2 + "img/[0-9]");
if(domain=="dumpt.com")setredir5(domain + "/img/files/");
if(domain=="mrjh.org")setredir5(domain2 + "images/");

	if(domain=="img001.imgiga.com")setredir(1);
	if(domain=="img002.imgiga.com")setredir(1);
	if(domain=="img003.imgiga.com")setredir(1);
	if(domain=="img004.imgiga.com")setredir(1);
	if(domain=="img005.imgiga.com")setredir(1);

	if(domain=="img117.picfoco.com")setredir(0);
	if(domain=="img118.picfoco.com")setredir(0);
	if(domain=="img119.picfoco.com")setredir(0);
	if(domain=="img120.picfoco.com")setredir(0);
	if(domain=="img121.picfoco.com")setredir(0);
	if(domain=="img122.picfoco.com")setredir(0);
	if(domain=="img123.picfoco.com")setredir(0);
	if(domain=="img124.picfoco.com")setredir(0);
	if(domain=="img125.picfoco.com")setredir(0);
	if(domain=="img126.picfoco.com")setredir(0);
	if(domain=="img127.picfoco.com")setredir(0);
	if(domain=="img128.picfoco.com")setredir(0);
	if(domain=="img129.picfoco.com")setredir(0);
	if(domain=="img130.picfoco.com")setredir(0);
	if(domain=="img131.picfoco.com")setredir(0);
	if(domain=="img132.picfoco.com")setredir(0);
	if(domain=="img133.picfoco.com")setredir(0);
	if(domain=="img134.picfoco.com")setredir(0);
	if(domain=="img135.picfoco.com")setredir(0);
	if(domain=="img136.picfoco.com")setredir(0);
	if(domain=="img137.picfoco.com")setredir(0);
	if(domain=="img138.picfoco.com")setredir(0);
	if(domain=="img139.picfoco.com")setredir(0);
	if(domain=="img140.picfoco.com")setredir(0);

if(domain=="s2.pic2u.net")setredir5(domain2 + "images/");
if(domain=="nootbook.net")setredir5(domain2 + "files/");
if(domain=="pixss.info")setredir(3);
if(domain=="avdue.net")setredir(0);
if(domain=="wezatv.com")setredir5(domain + "cen/file/");
if(domain=="doballclub.com")setredir2("upload/viewer.php?file=","upload/files/");
if(domain=="picth.com")setredir(1);
if(domain=="sexstorythai.com")setredir(0);
if(domain=="gojav.net")setredir(4);
if(domain=="upload.armuay.com")setredir(4);
if(domain=="nisitpost.com")setredir(0);