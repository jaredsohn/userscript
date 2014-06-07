// ==UserScript==
// @name          KL Body Fixer
// @author        kl
// @description   调整正文页
// @include       http://*.zjol.com.cn/*
// @exclude       http://www.zjol.com.cn/*
// @include       http://*.ifeng.com/*
// @exclude       http://www.ifeng.com/*
// @include       http://*.people.com.cn/*
// @exclude       http://www.people.com.cn/*
// @include       http://www.dapenti.*/blog/index.asp
// @include       http://www.bbc.co.uk/*/simp/*
// @include       http://*.jav4you.com/*
// @include       http*://addons.mozilla.org/*/firefox/collections/*
// @include       http://www.guidingtech.com/
// @include       http://www.guidingtech.com/page/*/*
// @include       http://weiwuhui.com/*
// @include       *://*.google.com/*
// @include       *://*.google.com.hk/*
// @include       http://userscripts.org/home/scripts
// @include       http://userscripts.org/home/scripts?page=*
// @include       http://*.iplaysoft.com/*
// @include       http://*.ipc.me/*
// @include       http://*.x-hins.cn/*
// @include       http://sofun.tw/*
// @include       http://t.qq.com/*
// @include       http://*.t.qq.com/*
// @include       http://googlesystem.blogspot.com/*
// @include       http://www.bullogger.com/
// @include       http://www.danwei.com/*
// @include       http://www.bentutu.com/*
// @include       http://thenextweb.com/*
// @include       http://www.cyberciti.biz/
// @include       http://www.cyberciti.biz/*/page/*
// @include       http://www.bloomberg.com/*
// @include       http://www.webupd8.org/*
// @include       http://betanews.com/*
// @include       http://www.iloveubuntu.net/
// @include       http://www.iloveubuntu.net/node?page=*
// @include       http://www.chromestory.com/
// @include       http://www.chromestory.com/page/*
// @include       http://www.iminisd.com/*
// @include       http://www.labnol.org/*
// @include       http://*.3e-online.com/*
// @include       http://kuai.xunlei.com/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.2
// @history       0.0.2 2012-06-17
// @history       0.0.1 2012-05-28
// ==/UserScript==

var blhref=location.href;
var blhost=location.host; 

//不使用UserScript
if (blhref.indexOf("?userjs=no")>0 || blhref.indexOf("&userjs=no")>0){return;}

var bla;
var blarray;
var blbody;
var bldiv;
var blelement;
var blexit;
var blhtml;
var blinput;
var bljg;
var bllink;
var blname;
var blobject;
var blp;
var blparent;
var blspan;
var blsrc;
var bltd;
var bltext;
var bltitle;
var bltmp;
var blword;
var blxl;
var blyseno;
var i;

//kuai.xunlei.com
if (blhost.indexOf("kuai.xunlei.com")>=0){
	blobject=document.querySelectorAll('span.c_2');
	for (i=0;i<blobject.length;i++){
		bla=blobject[i].querySelector('a.file_name');
		if (bla.hasOwnProperty("title")){
			bltitle=bla.getAttribute("title");
			if (bltitle.length>30){bla.textContent=bltitle.substring(0,10)+'...'+bltitle.substring(bltitle.length-30);}
		}
	}
	return;
}

//.labnol.org
if (blhost.indexOf(".labnol.org")>0){
	blobject=document.querySelectorAll('h1');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//.iminisd.com
if (blhost.indexOf(".iminisd.com")>0){
	blobject=document.querySelectorAll('font.jammer');
	for (i=0;i<blobject.length;i++){
		blobject[i].innerHTML='';
	}
	return;
}

//.3e-online.com
if (blhost.indexOf(".3e-online.com")>0){
	blobject=document.querySelectorAll('font.jammer');
	for (i=0;i<blobject.length;i++){
		blobject[i].innerHTML='';
	}
	return;
}

//.chromestory.com
if (blhost.indexOf(".chromestory.com")>0){
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//.iloveubuntu.net
if (blhost.indexOf(".iloveubuntu.net")>0){
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//betanews.com
if (blhost.indexOf("betanews.com")>=0){
	bla=document.querySelector('div.loadMore > a');
	if (bla) {
		bllink=bla.getAttribute("href");
		bltmp=bllink.replace("http://betanews.com/page/","");
		bltmp=bltmp.replace("/","");
		blxl=parseInt(bltmp);
		if (blxl>0){
			bljg="";
			for (i=Math.max(blxl-6,1);i<blxl+5;i++){
				if (i==blxl-1){bljg=bljg+'<a href="http://betanews.com/page/'+i+'/"><font color=#ff0000>'+i+'</font></a>&nbsp;';}
				else {bljg=bljg+'<a href="http://betanews.com/page/'+i+'/">'+i+'</a>&nbsp;';}
			}
			if (!bljg==""){
				blobject=document.querySelector('div.loadMore');
				if (blobject){
					blobject.innerHTML='<p style="align:center;font-family:Tahoma;font-size:20pt;">'+bljg;
					blobject.removeAttribute("class");
				}
			}
		}
	}
	return;
}

//cyberciti.biz
if (blhost.indexOf(".cyberciti.biz")>0){
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//thenextweb
if (blhost.indexOf("thenextweb.com")>=0){
	blobject=document.querySelectorAll('h1');
	for (i=0;i<blobject.length;i++){
		blobject[i].style.cssText="font-size:25pt;";
	}
		
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blobject[i].style.cssText="font-weight:600;font-size:17pt;font-family:Tahoma;";
	}
	
	blobject=document.querySelectorAll('p');
	for (i=0;i<blobject.length;i++){
		if (blobject[i].getAttribute("class")!=="article-meta" && blobject[i].parentNode.getAttribute("class")!=="box clearfix"){blobject[i].style.cssText="font-weight:300;color:#000000;font-size:13pt;font-family:Tahoma;";}
	}
	return;
}

//bentutu
if (blhost.indexOf(".bentutu.com")>=0){
	blobject=document.querySelectorAll('h1');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//danwei
if (blhost.indexOf(".danwei.com")>=0){
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	blobject=document.querySelectorAll('h1');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}	
	return;
}

//牛博
if (blhost.indexOf("www.bullogger.com")>=0){
	blobject=document.querySelectorAll('a[href*="/archives/"]');
	for (i=0;i<blobject.length;i++){
		blobject[i].style.cssText="font-size:12pt;line-height:120%;color:#000000;font-family:Tahoma;";
		blobject[i].removeAttribute("id");
	}
	blobject=document.querySelector('body');
	if (blobject){blobject.style.backgroundColor="#F1F1DE";}
	return;
}

//googlesystem.blogspot.com
if (blhost.indexOf("googlesystem.blogspot.com")>=0){
	blobject=document.querySelectorAll('h3');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//腾讯微博
if (blhost.indexOf("t.qq.com")>=0){
	blelement = document.getElementById('msgTxt');

	if (blelement && blelement.tagName=='TEXTAREA'){
		blelement.value = ' ';
		blelement.setAttribute('onblur','if (this.value=="" || (this.value.substring(0,1)==\"#\" && this.value.substring(this.value.length-1)==\"#\")){this.value = \" \";}');
		blelement.setAttribute('onchange','if (this.value=="" || (this.value.substring(0,1)==\"#\" && this.value.substring(this.value.length-1)==\"#\")){this.value = \" \";}');
	}

	document.getElementsByTagName('body')[0].setAttribute("onclick","var blitem=event.srcElement||event.target;if (blitem.getAttribute(\"class\")==\"safeType\" && blitem.tagName.toLowerCase()==\"p\"){var bllink=blitem.textContent;if (bllink.indexOf(\"http\")>=0 && !blitem.getElementsByTagName(\'a\')[0]){var bltext=bllink.substring(0,bllink.indexOf(\"http\"));bllink=bllink.substring(bllink.indexOf(\"http\"));blitem.innerHTML=\'<a href=\"\'+bllink+\'\" target=_blank>\'+bltext+bllink+\'</a>\';window.open(bllink);};}");
	return;
}

//userscript表格序号
if (blhost.indexOf("userscripts.org")>=0){
	blobject=document.querySelector('th.la'); 

	if (blobject){
		bltd=document.createElement("th");
		blparent=blobject.parentNode;
		blparent.insertBefore(bltd,blobject);
		if (bltd.innerText==undefined){bltd.textContent="No.";}
		else {bltd.innerText="No.";}
		bltd.style.className="la";
	}

	blelement=document.querySelectorAll('td.script-meat'); 
	for (i=0;i<blelement.length;i++){
		bltd=document.createElement("td");
		blparent=blelement[i].parentNode;
		blparent.insertBefore(bltd,blelement[i]);
		if (bltd.innerText==undefined){bltd.textContent=i+1;}
		else {bltd.innerText=i+1;}
		bltd.style.cssText="text-align:right;";
	}
	return;
}

//google
if (blhost.indexOf(".google.com")>=0){
	blelement=document.querySelector('h3.r');
	if (typeof blelement == "undefined"){
		blelement=document.querySelector('#sbfrm_l');
	}
	blinput=document.querySelector('#lst-ib');
	if (blelement && blinput){
		blword=blinput.getAttribute("value");
		blword=unescape(blword);
		blobject=document.createElement("div");
		bltmp='';
		bltmp=bltmp+'<a href="https://twitter.com/#!/search/'+blword+'" target=_blank>Twitter</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.facebook.com/search/results.php?q='+blword+'" target=_blank>Facebook</a>&nbsp;';
		bltmp=bltmp+'<a href="https://plus.google.com/s/'+blword+'" target=_blank>Google+</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.tumblr.com/tagged/'+blword+'" target=_blank>Tumblr</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.flickr.com/search/?q='+blword+'&f=hp" target=_blank>Flickr</a>&nbsp;';
		bltmp=bltmp+'<a href="https://friendfeed.com/search?q='+blword+'" target=_blank>Friendfeed</a>&nbsp;';
		bltmp=bltmp+'<a href="http://en.search.wordpress.com/?q='+blword+'" target=_blank>WordPress.com</a>&nbsp;';
		bltmp=bltmp+'<a href="http://fanfou.com/home#search?q='+blword+'" target=_blank>饭否</a>&nbsp;';
		bltmp=bltmp+'<a href="http://s.weibo.com/weibo/'+blword+'" target=_blank>新浪微博</a>&nbsp;';
		bltmp=bltmp+'<a href="http://t.qq.com/search/index.php?k='+blword+'" target=_blank>腾讯微博</a>&nbsp;';
		
		bltmp=bltmp+'<a href="http://en.wikipedia.org/wiki/'+blword+'" target=_blank>WikiPedia</a>&nbsp;';
		bltmp=bltmp+'<a href="http://zh.wikipedia.org/zh/'+blword+'" target=_blank>维基百科</a>&nbsp;';		
		bltmp=bltmp+'<a href="http://www.imdb.com/find?q='+blword+'&s=all" target=_blank>IMDB</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.youtube.com/results?search_query='+blword+'" target=_blank>YouTube</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.soku.com/search_video/q_'+blword+'" target=_blank>搜库</a>&nbsp;';
		bltmp=bltmp+'<a href="http://so.tudou.com/nisearch/'+blword+'/" target=_blank>土豆</a>&nbsp;';
		bltmp=bltmp+'<a href="http://so.56.com/video/'+blword+'/?" target=_blank>56</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.verycd.com/search/entries/'+blword+'" target=_blank>VeryCD</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.simplecd.org/?q='+blword+'" target=_blank>SimpleCD</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.douban.com/search?search_text='+blword+'" target=_blank>豆瓣</a>&nbsp;';
		bltmp=bltmp+'<a href="https://www.shooter.cn/search/'+blword+'/" target=_blank>射手网</a>&nbsp;';
		bltmp=bltmp+'<a href="http://bt.ktxp.com/search.php?keyword='+blword+'" target=_blank>极影BT</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.google.cn/music/search?q='+blword+'" target=_blank>谷歌音乐</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.portablefreeware.com/?q='+blword+'&m=Search" target=_blank>Portable Freeware</a>&nbsp;';
		bltmp=bltmp+'<a href="http://portableapps.com/search/node/'+blword+'" target=_blank>Portableapps</a>&nbsp;';
		bltmp=bltmp+'<a href="http://userscripts.org/scripts/search?q='+blword+'" target=_blank>Userscripts.org</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.iconfinder.net/search/?q='+blword+'" target=_blank>Icon Finder</a>&nbsp;';
		bltmp=bltmp+'<a href="http://findicons.com/search/'+blword+'" target=_blank>Find Icons</a>&nbsp;';
		bltmp=bltmp+'<a href="http://dict.cn/'+blword+'" target=_blank>海词</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.iciba.com/'+blword+'" target=_blank>爱词霸</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.jukuu.com/search.php?q='+blword+'" target=_blank>句酷</a>&nbsp;';
		bltmp=bltmp+'<a href="http://dict.bing.com.cn/#'+blword+'" target=_blank>英库</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.amazon.cn/gp/search?field-keywords='+blword+'" target=_blank>卓越亚马逊</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.bing.com/search?q='+blword+'" target=_blank>Bing</a>&nbsp;';
		bltmp=bltmp+'<a href="http://www.baidu.com/s?wd='+blword+'" target=_blank>百度</a>&nbsp;';
		bltmp=bltmp+'<hr>';
		blobject.innerHTML=bltmp;
		blelement.parentNode.insertBefore(blobject,blelement);
	}
	return;
}

//enable copy
if (blhost.indexOf("weiwuhui.com")>=0){
	blbody=document.getElementsByTagName("body")[0];
	blbody.setAttribute("oncopy",undefined);
	return;
}

//浙江在线
if (blhost.indexOf(".zjol.com.cn")>0){
	bltitle="";
	bltext="";
	klremoveelementbyclassname('bshare-custom');
	klremoveelementbyclassname('meiriguanzhukuang');
	klremoveelementbyid('page_scr');
	blelement=document.getElementById('oZoom');
	if(blelement){
		bltext=blelement.innerHTML;
		bltext='<table bgcolor=#F4F4EC width=730px align=center border=0 style="margin-left:100px;"><tr><td style="padding:20px;" align=left>'+bltext+'</td></tr></table>';
		blbody = document.getElementsByTagName("body")[0];
		blbody.innerHTML=bltext;

	}

	blelement=document.getElementsByClassName('contentTitle')[0];
	if(blelement){
		bltitle=blelement.innerHTML;
		blelement.innerHTML='<h2>'+bltitle+'</h2>';
	}
	return;
}

//凤凰网
if (blhost.indexOf(".ifeng.com")>0){
	bltext="";
	klremoveelementbyid("artical_sth3");

	blarray=["cmt","cmt","print","forword"];
	for (i in blarray){
		klremoveelementbyclassname(blarray[i]);
	}

	blelement=document.getElementsByTagName('H6')[0];
	if(blelement){
		bltext=blelement.innerHTML;
		if (bltext.indexOf("字号:")>-1 && bltext.indexOf("T")>-1){
			blelement.parentNode.removeChild(blelement);
		}
	}

	blelement=document.getElementById('artical');
	if(blelement){
		bltext=blelement.innerHTML;
		bltext='<table bgcolor=#F4F4EC width=730px align=center border=0 style="margin-left:100px;"><tr><td style="padding:20px;">'+bltext+'</td></tr></table>';
		blbody = document.getElementsByTagName("body")[0];
		blbody.innerHTML=bltext;
	}
	return;
}

//人民网
if (blhost.indexOf(".people.com.cn")>0){
	bltext="";
	blelement=document.getElementsByClassName('text_c')[0];
	if(blelement){
		bltext=blelement.innerHTML;
		bltext='<table bgcolor=#F4F4EC width=730px align=center border=0 style="margin-left:100px;"><tr><td style="padding:20px;">'+bltext+'</td></tr></table>';
		blbody = document.getElementsByTagName("body")[0];
		blbody.innerHTML=bltext;
	}

	blarray=["tools","tools tools_b","hot_day","about","rmshjb"];
	for (i in blarray){
		klremoveelementbyclassname(blarray[i]);
	}

	while (true){
		blelement=document.getElementsByTagName("iframe")[0];
		if (blelement){
			blsrc=blelement.getAttribute("src");
			if (blsrc && blsrc.indexOf("opinion.people.com.cn")!=-1){
				blelement.parentNode.removeChild(blelement);
				continue;
			}
			break;
		}
		break;
	}
	return;
}

//喷嚏网
if (blhost.indexOf("www.dapenti.")>=0){
	blelement=document.querySelectorAll('a[href*="more.asp"]');
	bljg="";
	for (i=0;i<blelement.length;i++){
		bltitle=blelement[i].getAttribute("title");
		blhtml=blelement[i].innerHTML;
		bltext=blelement[i].textContent;
		if (bltitle==undefined){bltitle=bltext;}
		
		if (bltext==blhtml){
			blelement[i].setAttribute("title","slowslALKSJDOW840222dd");
			bljg=bljg+'<li><a href="'+blelement[i].getAttribute("href")+'" target=_blank>'+bltitle+'</a></li>';
		}
	}

	while (true){
		blelement=document.querySelector('a[title="slowslALKSJDOW840222dd"]');
		if (blelement){
			blelement.parentNode.removeChild(blelement);
			continue;
		}
		break;
	}
	
	blbody=document.getElementsByTagName("body")[0];
	blelement=blbody.querySelector('*');	
	bldiv=document.createElement("div");
	blbody.insertBefore(bldiv,blelement);
	bldiv.innerHTML='<ol>'+bljg+"</ol>";
	bldiv.style.cssText="padding:5px;text-align:left;font-size:12.0pt;font-family:Tahoma;line-height:100%;width:730px;margin-left:auto;margin-right:auto;border:5px dashed #C5C59E;background-color:#F1F1DE;";
	
	while (true){
		blexit=true;
		blelement=document.querySelectorAll('ul');
		for (i=0;i<blelement.length;i++){
			blhtml=blelement[i].innerHTML;
			blhtml=blhtml.replace(new RegExp("<li>","gm"),"");
			blhtml=blhtml.replace(new RegExp("</li>","gm"),"");
			blhtml=blhtml.replace(new RegExp("\r","gm"),"");
			blhtml=blhtml.replace(new RegExp("\n","gm"),"");
			blhtml=blhtml.replace(new RegExp(" ","gm"),"");
			if (blhtml==""){
				blelement[i].parentNode.removeChild(blelement[i]);
				blexit=false;
				break;
			}
		}
		if (blexit==true){break;}
	}
	return;
}

//BBC中文网的相关内容位置
if (blhost.indexOf(".bbc.co.uk")>0){
	blhtml="";
	blelement=document.querySelector('div[class="list li-relatedlinks"]');
	if (blelement){
		blhtml=blelement.innerHTML;
		blelement.parentNode.removeChild(blelement);
	}

	while (true){
	    blelement=document.querySelector('div[class="list li-relatedlinks"]');
		if (blelement){blelement.parentNode.removeChild(blelement);}
		else {break;}
	}

	blelement=document.querySelector('div[class="list li-plain topstories-list"]');
	if (!blelement){
		blbody=document.getElementsByTagName("body")[0];
		blelement=blbody.querySelector('*');
	}

	if (blelement && !blhtml==""){
		blobject=document.createElement("div");
		blobject.innerHTML=blhtml;
		while (true){
			blp=blobject.querySelector('p[class="date timeago"]');
			if (blp){blp.parentNode.removeChild(blp);}
			else{break;}
		}

		while (true){
			blp=blobject.querySelector('p.topics');
			if (blp){blp.parentNode.removeChild(blp);}
			else{break;}
		}
		
		bljg='<h2 class="title">相关内容</h3>';
		bla=blobject.querySelectorAll('a');
		for (i=0;i<bla.length;i++){
			bljg=bljg+'<p><a href="'+bla[i].getAttribute("href")+'">'+bla[i].innerHTML+'</a>';
		}
		blobject.innerHTML=bljg;
		blobject.style.className="list";
		blparent=blelement.parentNode;
		blparent.insertBefore(blobject,blelement);
	}
	return;
}

//Firefox Addons Collections List
if (blhost.indexOf("addons.mozilla.org")>=0){
	blobject=document.querySelectorAll('div.item');
	bljg="";
	for (i=0;i<blobject.length;i++){
		bla=blobject[i].querySelector('a[href*="firefox/addon/"]');
		if (bla){
			blname=bla.innerText;
			if (blname==undefined){blname=bla.textContent;}
			bllink=bla.getAttribute("href");
			if (bllink.substring(0,4).toLowerCase()!=='http'){
				bllink='https://'+blhost+bllink;
			}
			if (bllink.indexOf("/\?src=")>=0){
				bllink=bllink.substring(0,bllink.indexOf("/\?src="));
				bljg=bljg+blname+'&nbsp;&nbsp;<a href="'+bllink+'" target=_blank>'+bllink+'</a>\r\n<br>';
			}
		}
	}

	if (bljg!==""){
		blbody = document.getElementsByTagName("body")[0];
		blelement=blbody.querySelector('*');	
		bldiv = document.createElement("div");
		blbody.insertBefore(bldiv,blelement);
		bldiv.innerHTML=bljg;
		bldiv.style.cssText="margin:5px;padding:5px;border:1px dashed #c0c0c0;text-align:left;font-size:9.0pt;line-height:100%;";
	}
	return;
}

//webupd8.org
if (blhost.indexOf(".webupd8.org")>0){
	blobject=document.querySelectorAll('h1');
	for (i=0;i<blobject.length;i++){
		bltmp=blobject[i].getAttribute("class");
		if (bltmp=="entry-title"){
			blobject[i].removeAttribute("class");
			blobject[i].style.cssText="font-family:Tahoma;text-transform:none;";
		}
	}
	blobject=document.querySelectorAll('h1 > a');
	for (i=0;i<blobject.length;i++){
		bltmp=blobject[i].getAttribute("class");
		if (bltmp=="title-block"){
			blobject[i].removeAttribute("class");
			blobject[i].style.cssText="font-family:Tahoma;text-transform:none;";
		}
	}
	return;
}

//Guiding Tech
if (blhost.indexOf(".guidingtech.com")>0){
	blobject=document.querySelectorAll('h2');
	for (i=0;i<blobject.length;i++){
		blhtml=blobject[i].innerHTML;
		blobject[i].innerHTML='<b>'+blhtml+'</b>';
	}
	return;
}

//rewrite body innerHTML
blarray=[".jav4you.com"];
blyesno=false;
for (i in blarray){
	if (blhref.indexOf(blarray[i])>=0){
		blyesno=true;
		break;
	}
}
if (blyesno==true){
	blbody=document.getElementsByTagName("body")[0];
	blhtml=blbody.innerHTML;
	document.write(blhtml);
	return;
}

//去掉同网址相同的链接
blarray=[".iplaysoft.com",".ipc.me",".x-hins.cn","sofun.tw"];
blyesno=false;
for (i in blarray){
	if (blhref.indexOf(blarray[i])>=0){
		blyesno=true;
		break;
	}
}
if (blyesno==true){
	while (true){
		blelement=document.querySelector('a[href="'+blhref+'"]'); 
		if (blelement){
			blhtml=blelement.innerHTML;
			blobject=document.createElement("span");
			blobject.innerHTML=blhtml;
			blparent=blelement.parentNode;
			blparent.insertBefore(blobject,blelement);
			blparent.removeChild(blelement);
			continue;
		}
		break;
	}
	return;
}

//bloomberg.com
if (blhost.indexOf("bloomberg.com")>=0){
	if (blhref.indexOf("?print=yes")>0 || blhref.indexOf("&print=yes")>0){
		bldiv=['global_nav_hat','footer','related_news_bottom','secondary_content','story_social_toolbar_bottom','market_snapshot_simple','story_social_toolbar_bottom','header_top',"story_social_toolbar_top_container"];
		for (i=0;i<bldiv.length;i++){
			klremoveelementbyid(bldiv[i]);
		}
		while (true){
			blelement=document.querySelectorAll('span');
			blexit=true;
			for (i=0;i<blelement.length;i++){
				if (blelement[i].innerHTML=="Enlarge image"){
					blelement[i].parentNode.removeChild(blelement[i]);
					blexit=false;
					break;
				}
			}
			if (blexit==true){break;}
		}
		
		while (true){
			blelement=document.querySelector('li[id^="nav_"]');
			if (blelement){
				blelement.parentNode.removeChild(blelement);
				continue;
			}
			break;
		}
	}
	return;
}

//函数
function klremoveelementbyclassname(blclassname){
	var blitem=document.getElementsByClassName(blclassname)[0];
	if(blitem){blitem.parentNode.removeChild(blitem);}
}

function klremoveelementbyid(blid){
	var blitem=document.getElementById(blid);
	if(blitem){blitem.parentNode.removeChild(blitem);}
}