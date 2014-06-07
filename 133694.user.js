// ==UserScript==
// @name          KL Photo Viewer
// @author        kl
// @description   显示大图片或图片地址
// @include       http://slide.*.sina.com.cn/*
// @include       http://*.163.com/photoview/*
// @include       http://www.360buy.com/bigimage.*
// @include       http://www.imdb.com/media/*
// @include       http://www.19lou.com/forum*
// @include       http://www.douban.com/*
// @include       http://movie.douban.com/*/photos*
// @include       http://www.douban.com/photos/album/*
// @include       http://site.douban.com/widget/photos/*
// @include       http://site.douban.com/widget/public_album/*
// @include       http://onebigphoto.com/*
// @include       http://acidcow.com/*/*.*
// @include       http://www.bbc.co.uk/zhongwen/simp/multimedia/*
// @include       http://cn.wsj.com/*
// @include       http://www.cn.wsj.com/*
// @include       http://www.tampabay.com/blogs/alleyes/content/*
// @include       http://www.flickr.com/photos/*/in/photostream*
// @include       http://www.archdaily.com/*/*
// @include       http://blog.yam.com/*
// @include       http://www.cruzine.com/*
// @include       http://www.howtogeek.com/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.4
// @history       0.0.4 2012-11-01
// @history       0.0.3 2012-10-06
// @history       0.0.2 2012-06-17
// @history       0.0.1 2012-05-18
// ==/UserScript==

var blhref=location.href;
var blhost=location.host; 

//不使用UserScript
if (blhref.indexOf("?userjs=no")>0 || blhref.indexOf("&userjs=no")>0){return;}

var bla;
var blarray;
var bldate;
var bldd;
var bldiv;
var bldt;
var blelement;
var blgallery;
var blhead;
var blhtml;
var blimg;
var blitem;
var bljg;
var blli;
var bllink;
var blobject;
var blp;
var blparent;
var blsize;
var blsrc;
var blstr;
var blsummary;
var bltext;
var bltitle;
var bltmp;
var blxl;
var blyesno
var i;

//.archdaily.com
if (blhost.indexOf(".archdaily.com")>0){
	bla=document.querySelectorAll('a');
	for (i=0;i<bla.length;i++){
		if (bla[i].innerHTML=="Original size"){
			window.location=bla[i].getAttribute("href");
		}
	}
	return;
}

//flickr
if (blhost.indexOf("www.flickr.com")>=0){
	if (blhref.indexOf("/sizes/")>0){return;}
	if (blhref.indexOf("/in/photostream")==-1){return;}
	bldiv=document.querySelector('div#meta');
	if (bldiv){
		bltmp='<a href="'+blhref.replace("/in/photostream","/sizes/l/in/photostream")+'">l</a>&nbsp;'
		bltmp=bltmp+'<a href="'+blhref.replace("/in/photostream","/sizes/h/in/photostream")+'">h</a>&nbsp;'
		bltmp=bltmp+'<a href="'+blhref.replace("/in/photostream","/sizes/k/in/photostream")+'">k</a>&nbsp;'
		bltmp=bltmp+'<a href="'+blhref.replace("/in/photostream","/sizes/o/in/photostream")+'">o</a>'
			
		blobject=document.createElement("div");
		blobject.innerHTML=bltmp;
		bldiv.parentNode.insertBefore(blobject,bldiv);
	}
	return;
}
//tampabay-alleyes
if (blhost.indexOf("www.tampabay.com")>=0){
	bldiv=document.querySelector('div#galleria-content');
	if (bldiv){
		blelement=bldiv.querySelector('ul');
		if (blelement){
			bljg="";
			blobject=blelement.querySelectorAll('li');
			for (i=0;i<blobject.length;i++){
				bljg=bljg+"<div class=klwoslsxaa>"+blobject[i].innerHTML+"</div>";
			}
			if (!bljg==""){bldiv.innerHTML=bljg;}
			
			blobject=bldiv.querySelectorAll('div.klwoslsxaa');
			bljg="";
			blxl=1;
			for (i=0;i<blobject.length;i++){
				bla=blobject[i].querySelector('a');
				blimg=blobject[i].querySelector('img');
				if (bla && blimg){
					bltitle=bla.getAttribute("title");
					if (bltitle==""){bltitle=blimg.getAttribute("title");}
					if (bltitle==""){bltitle=blimg.getAttribute("alt");}
					
					bllink=bla.getAttribute("href");
					if (!bllink==""){
						bljg=bljg+'<p><img src="'+bllink+'"><p>'+blxl+". "+bltitle;
						blxl=blxl+1;
					}
				}
			}
			if (!bljg==""){bldiv.innerHTML=bljg;}
		}
	}
	return;
}

//新浪新闻大图片
if (blhost.indexOf(".sina.com.cn")>0){
	bldate="";
	bljg="";
	bltitle='<h1>'+document.title+'</h1>';
	blelement=document.querySelectorAll('#eData > dl');
	if (blelement){
		bldt=blelement[0].querySelector('dt');
		if (bldt){
			bltmp=bldt.innerText;
			if (bltmp==undefined){bltmp=bldt.textContent;}
			bltitle=bltitle+"<h2>"+bltmp+"</h2>";
		}
		
		bldd=blelement[0].querySelectorAll('dd');
		if (bldd && bldd.length>=4){
			bltmp=bldd[3].innerText;
			if (bltmp==undefined){bltmp=bldd[3].textContent;}
			bldate="<p>"+bltmp+"</p>";
		}
	}
	for (i=0;i<blelement.length;i++){
		bldd=blelement[i].querySelectorAll('dd');
		if (bldd && bldd.length>=5){
			bllink=bldd[0].innerText;
			if (bllink==undefined){bllink=bldd[0].textContent;}
			blhtml=bldd[4].innerHTML;
			bljg=bljg+'<br><img src="'+bllink+'"></br><br><font size=3>'+blhtml+'</font></br>';
		}
	}

	if (!bljg==""){
		document.write('<table bgcolor=#F4F4EC width=730px align=center border=0><tr><td style="padding:20px;">'+bltitle+bldate+bljg+'</td></tr></table>');
	}
	return;
}

//网易新闻大图片
if (blhost.indexOf(".163.com")>=0){
	bljg="";
	bltitle='<h2>'+document.title+'</h2>';
	blelement=document.querySelector('#photoList');
	if (blelement){
		blobject=document.createElement("div");
		blobject.innerHTML=blelement.value;
		blparent=blelement.parentNode;
		blparent.insertBefore(blobject,blelement);
		blparent.removeChild(blelement);
		
		blelement=blobject.querySelectorAll('li');
		for (i=0;i<blelement.length;i++){
			blimg=blelement[i].querySelector('i[title="img"]');
			bllink="";
			if (blimg){
				bllink=blimg.textContent;
				blimg.textContent="";
			}
			blimg=blelement[i].querySelector('i[title="timg"]');
			if (blimg){blimg.textContent="";}
			//blp=blelement[i].querySelector("p");
			//if (blp && !bllink==""){
			if (!bllink==""){
				//blhtml=blp.innerHTML;
				blhtml=blelement[i].textContent;
				bljg=bljg+'<br><img src="'+bllink+'"></br><br><font size=3>'+blhtml+'</font></br>';
			}
		}
	}

	blelement=document.querySelector('#galleryRelat');
	if (blelement){
		bljg=bljg+blelement.innerHTML;
	}

	blelement=document.querySelector('.nph_set_title');
	if (blelement){
		blitem=document.getElementById('photoType');
		if(blitem){blitem.parentNode.removeChild(blitem);}
		bltitle=blelement.innerHTML;
	}

	if (!bljg==""){
		document.write('<table bgcolor=#F4F4EC width=730px align=center border=0><tr><td style="padding:20px;">'+bltitle+bljg+'</td></tr></table>');
	}
	return;
}

//京东图片页
if (blhost.indexOf("www.360buy.com")>=0){
	blhtml='';
	blelement=document.querySelectorAll('script'); 
	for (i=0;i<blelement.length;i++){
		blhtml=blelement[i].innerHTML;
		if (blhtml.indexOf("var newOutputAllImages")>=0){
			break;
		}
	}

	if (blhtml.indexOf("[")>=0){blhtml=blhtml.substring(blhtml.indexOf("[")+1);}
	if (blhtml.indexOf("]")>=0){blhtml=blhtml.substring(0,blhtml.indexOf("]"));}
	if (blhtml.indexOf('{img:"http:')>=0){
		blhtml=blhtml.replace(new RegExp('{img:"http:',"gm"),'<br><img style="margin:5px;" src="http:');
	}
	if (blhtml.indexOf('",data:')>=0){
		blhtml=blhtml.replace(new RegExp('",data:',"gm"),'"><!--');
	}

	if (blhtml.indexOf('},')>=0){
		blhtml=blhtml.replace(new RegExp('},',"gm"),'-->');
	}

	if (blhtml.indexOf('}')>=0){
		blhtml=blhtml.replace(new RegExp('}',"gm"),'-->');
	}

	if (blhtml.indexOf('/n5/')>=0){
		blhtml=blhtml.replace(new RegExp('/n5/',"gm"),'/n0/');
	}

	bltitle=document.querySelector('h1');

	bldiv=document.querySelector('div.left');
	if (bldiv && !blhtml==""){
		bltmp=bltitle.innerText;
		if (bltmp==undefined){bltmp=bltitle.textContent;}
		bldiv.innerHTML="<h1>"+bltmp+"</h1>"+blhtml;
	}
	return;
}

//显示IMDb中的图片地址
if (blhost.indexOf("www.imdb.com")>=0){
	blimg=document.querySelector('img#primary-img');
	if (blimg){
		blsrc=blimg.getAttribute("src");
		blobject=document.createElement("p");
		blobject.innerHTML='<a href="'+blsrc+'" target=_blank>Img Link</a>';
		blobject.style.cssText="font-size:9px;";
		blparent=blimg.parentNode;
		blparent.insertBefore(blobject,blimg.nextSibling);
	}
	return;
}

//不用登陆直接显示19楼的大图片
if (blhost.indexOf("www.19lou.com")>=0){
	blsize='onload="javascript:if (this.width>750) this.width=750;"';
	blelement=document.querySelectorAll('span');
	for (i=0;i<blelement.length;i++){
		if (blelement[i].getAttribute("class")=="unlogin-img"){
			blimg=blelement[i].querySelector('img[src*="/thumb_"]');
			if (blimg){
				blsrc=blimg.getAttribute("src");
				blsrc=blsrc.replace("/thumb_","/");
				blelement[i].innerHTML='<img src="'+blsrc+'" '+blsize+'>';
				blelement[i].className="";
			}
		}
	}
	return;
}

//显示豆瓣中的大图片
if (blhost.indexOf(".douban.com")>=0){
	bljg="";
	bldiv=document.querySelectorAll('div.photo_wrap,div.photo-item');
	for (i=0;i<bldiv.length;i++){
		blimg=bldiv[i].querySelector('img[src*="/thumb/"]');
		if (blimg){
			blsrc=blimg.getAttribute("src");
			blimg.setAttribute("src",blsrc.replace("/thumb/","/photo/"));
			bljg=bljg+'<p>'+bldiv[i].innerHTML;
		}
	}

	blparent=document.querySelector('div[class="photolst clearfix"],div.event-photo-list');
	if (blparent && !bljg==""){
		blparent.innerHTML=bljg;
		bljg="";
	}

	var blimg=document.querySelectorAll('img[src*="/view/photo/icon/"]');
	for (i=0;i<blimg.length;i++){
		blsrc=blimg[i].getAttribute("src");
		blimg[i].setAttribute("src",blsrc.replace("/icon/","/photo/"));
	}

	bljg="";
	bldiv=document.querySelectorAll('ul[class*="clearfix"] > li');
	for (i=0;i<bldiv.length;i++){
		blimg=bldiv[i].querySelector('img[src*="/thumb/"]');
		if (blimg){
			blsrc=blimg.getAttribute("src");
			blimg.setAttribute("src",blsrc.replace("/thumb/","/photo/"));
			bljg=bljg+bldiv[i].innerHTML;
		}
	}

	if (bljg!==""){
		bldiv=document.querySelector('ul[class*="clearfix"]');
		var blobject=document.createElement("div");
		blobject.innerHTML=bljg;
		blparent=bldiv.parentNode;
		blparent.insertBefore(blobject,bldiv);
		blparent.removeChild(bldiv);
	}
	return;
}

//onebigphoto
if (blhost.indexOf("onebigphoto.com")>=0){
	blelement=document.getElementsByTagName("body")[0];
	bldate=blelement.innerHTML;
	if (bldate.indexOf("<!-- Cached page generated by WP-Super-Cache on ")>=0){
		bldate=bldate.substring(bldate.indexOf("<!-- Cached page generated by WP-Super-Cache on ")+5);
		if (bldate.indexOf(" -->")>=0){bldate=bldate.substring(0,bldate.indexOf(" -->"));}
		else{bldate="";}
	}
	else{bldate="";}
	
	bla=document.querySelector('div.content > p > a'); 
	if (bla){
		blimg=bla.getElementsByTagName("img")[0];
		if (blimg){
			blsrc=blimg.getAttribute("src");
			//blhtml=bla.innerHTML;
			
			bldiv = document.createElement("div");
			bldiv.innerHTML='<br><font size=1><a href="'+blsrc+'" target=_blank>img address</a> '+bldate+'</font></br>';
			bla.parentNode.insertBefore(bldiv,bla.nextSibling);
		}
	}
	return;
}

//Acidcow.com
if (blhost.indexOf("acidcow.com")>=0){
	bldiv=document.querySelector('div [id^="news-id-"]'); 
	if (bldiv){
		blimg=bldiv.querySelectorAll('img[src*="acidcow.com/pics/"]'); 
		bljg="";
		for (i=0;i<blimg.length;i++){
			bljg=bljg+'<img src="'+blimg[i].getAttribute("src")+'" style="float:left;padding:0px;margin-right:3px;margin-bottom:3px;" onload=';
			bljg=bljg+'"javascript:if (this.width>150) this.width=150;">';
		}
		if (bljg!==""){bldiv.innerHTML=bljg;}
	}
	return;
}

//BBC中文网图辑
if (blhref.indexOf("http://www.bbc.co.uk/zhongwen/simp/multimedia/")>=0){
	if (blhref.indexOf("?print=1")==-1 && document.title.indexOf("图辑")>=0){location.href=blhref+"?print=1";return;}
	
	bljg="";
	blelement=document.querySelectorAll('div[class^="box bx-picture"] > div.content');
	for (i=0;i<blelement.length;i++){
		bla=blelement[i].querySelector("div.module > a");
		if (bla){
			blimg=bla.getAttribute("href");
			bltext=blelement[i].querySelector("div.body");
			if (bltext){
				blhtml=bltext.innerHTML;
				bljg=bljg+'<br><img src="'+blimg+'"></br><br><font size=3>'+blhtml+'</font></br>';
			}
		}
	}

	bldiv=document.querySelector('div.bodytext');
	if (bldiv && !bljg==""){
		bldiv.innerHTML=bljg;
	}
	return;
}

//cn.wsj.com
if (blhost.indexOf("cn.wsj.com")>=0){
	blstr="";
	blhtml="";
	blhead="";
	blsummary="";

	bldiv=document.querySelector('div#sliderBox');
	blli=bldiv.querySelectorAll('ul > li');
	for (var i=0;i<blli.length;i++){
		blstr=blstr+blli[i].innerHTML;
	}

	blobject=document.querySelector('div#headline');
	if (blobject){blhead="<H2>"+blobject.innerHTML+"</H2>";}

	blobject=document.querySelector('div#summary');
	if (blobject){blsummary="<p>"+blobject.innerHTML+"<hr>";}

	blobject=document.querySelector('div#bodytext');
	if (blobject && blstr!==""){
		blobject.innerHTML=blhead+blsummary+blstr;
	}
	return;
}

//date-src, date-href
blarray=["blog.yam.com",".cruzine.com",".howtogeek.com"];
blyesno=false;
for (i in blarray){
	if (blhref.indexOf(blarray[i])>=0){
		blyesno=true;
		break;
	}
}
if (blyesno==true){
	blimg=document.querySelectorAll('img');
	for (i=0;i<blimg.length;i++){
		blsrc=blimg[i].getAttribute("data-src");
		if (!blsrc==""){
			blimg[i].setAttribute("src",blsrc);
			blimg[i].setAttribute("onload","");
			blimg[i].setAttribute("onerror","");
		}
		else {
			blsrc=blimg[i].getAttribute("data-href");
			if (!blsrc==""){
				blimg[i].setAttribute("src",blsrc);
			}
		}
	}
	return;
}