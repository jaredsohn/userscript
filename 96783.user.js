// ==UserScript==
// @name           FileList V3
// @namespace      filelist.ro
// @include        http://*filelist.ro/*
// @include        http://*flro.org/*
// @author 		   G-Man
// @date		    25ian 2010
// ==/UserScript==

	

/********** User Options - Change these if you want *****************************/


// 0: Use FileList V3 in logo
// 1: Use FileList in logo, w/ gold badge
// 2: Use FileList in logo, w/ no gold badge
var whichLogo = 0;

// .


/********************************************************************************/
/********** Don't Change Below Here! (unless you know what you're doing) ********/
/********************************************************************************/
(function() {
var css = "body {\n		color: #fffff !important; \n		background-color: #fffff !important;   \n	}\n\n	table {\n		background-color: #E0E0E0 !important;\n	}\n	\n	table.bottom {\n		background-color: #fffff !important;\n	}\n	td {\n          border-color: #fffff !important;\n        }\n	td.colhead {\n	  background-color: #0000 !important;\n           border-color: #0000!important;\n	}\n	\n	a:link, a:visited {\n	  color: #0000 !important;\n	}\n\n	a:hover {\n	  color: #fffff !important;\n	}\n	a.sort {\n		color: #0000 !important;	\n		text-decoration: none !important;\n	}\n	a.sort:hover {\n		text-decoration: underline !important;\n	}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

var useus = [];
var withus = [];
var useimg = [];

var destroy = [];
	
/**
 *bg
 */
var td = window.document.getElementsByTagName("td");
for(var i=0;i<td.length;i++){
	if(td[i].className.indexOf("xexe") != -1){
		td[i].style.backgroundColor = "#E0E0E0";
	}
	if(td[i].className.indexOf("clear") != -1){
		td[i].style.backgroundColor = "#E0E0E0";
	}
	if((td[i].className.indexOf("xexe") != -1)&&(td[i].style.background.indexOf("menubg")>0)){
		td[i].style.background = "";
	}
	if(td[i].className.indexOf("embedded")!=-1 && (""+window.location).indexOf("browse.php")>-1){
		td[i].style.backgroundColor = "#D8D8D8";
	}
	if(td[i].firstChild!=null && td[i].firstChild.tagName == "B"){
		if(td[i].firstChild.innerHTML.indexOf("SceneAccess")>-1){
			destroy.push(td[i].parentNode);
		}
	}
	if(td[i].style.backgroundColor == "#222222"){
		td[i].style.removeAttribute("style");
		td[i].style.removeAttribute("background");
	}
}


/**
 * Cat icons n other crap
 */
var imgs = window.document.getElementsByTagName("img");
for(var x=0;x<imgs.length;x++){
	if(imgs[x].src.indexOf("home.jpg")>-1){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-news.png";
		imgs[x].width = "72";
		imgs[x].height = "48";
		newimg = document.createElement("img");
		newimg.setAttribute("src","http://ubitsa.org/sctimg/nav-left.png");
		newimg.setAttribute('style','border:none;');
		imgs[x].parentNode.insertBefore(newimg,imgs[x]);
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
	}else 
	// .......
	if(imgs[x].src.indexOf("logo.jpg")>0){
		if(whichLogo == 0){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}else if(whichLogo == 1){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}else{
			imgs[x].parentNode.parentNode.parentNode.style.background = "url()";
		}
		var parent = imgs[x].parentNode;
		//parent.removeChild(imgs[x]);
		destroy.push(imgs[x]);
		parent.parentNode.parentNode.parentNode.parentNode.style.width="1022";
		parent.parentNode.parentNode.style.width="1022";
		parent.parentNode.removeAttribute('style');
		parent.parentNode.style.height="111";
		parent.parentNode.style.width = "340";
		parent.parentNode.nextSibling.removeAttribute('style');
		parent.parentNode.previousSibling.removeAttribute('style');
	}else if(imgs[x].src.indexOf("/unlockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/unlockednew2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/locked.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-locked.png";
	}else if(imgs[x].src.indexOf("/locked2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-locked.png";
	}else if(imgs[x].src.indexOf("/lockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockednew.png";
	}else if(imgs[x].src.indexOf("/lockednewposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockednewposted.png";
	}else if(imgs[x].src.indexOf("/lockedposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-lockedposted.png";
	}else if(imgs[x].src.indexOf("/unlocked.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlocked.png";
	}else if(imgs[x].src.indexOf("/unlockednew.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednew.png";
	}else if(imgs[x].src.indexOf("/unlockednewposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockednewposted.png";
	}else if(imgs[x].src.indexOf("/unlockedposted.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/forum-unlockedposted.png";
	}else if(imgs[x].src.indexOf("browse.jpg")>0){
		newimg = document.createElement("img");
		newimg.setAttribute("src","http://ubitsa.org/sctimg/nav-seperator.png");
		newimg.setAttribute('style','border:none;');
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
    		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
		imgs[x].src = "http://ubitsa.org/sctimg/nav-browse.png";
		destroy.push(imgs[x].parentNode.nextSibling);
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
	}else if(imgs[x].src.indexOf("browse2.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-mp30day.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("archive.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-archive.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("profile.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-profile.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("forums.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-forums.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("donate.jpg")>0){
		imgs[x].src = "http://img843.imageshack.us/img843/1226/snowicon.png";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("staff.jpg")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/nav-staff.png";
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));		
		newimg = document.createElement("img");
		newimg.setAttribute('src',"http://ubitsa.org/sctimg/nav-right.png");
		newimg.setAttribute('style','border:none;');
		imgs[x].parentNode.appendChild(newimg);
	}else if(imgs[x].src.indexOf("default_avatar.png")>0){
		imgs[x].src = "http://img524.imageshack.us/img524/4414/defaultavatar.gif";
	}else 
	// remove bookmark image, replace with blue one
	if(imgs[x].src.indexOf("bookmark.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/bookmark.png";
		destroy.push(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.previousSibling);
	}else 
	// change download image to text
	if(imgs[x].title == "Download"){
		var parent = imgs[x].parentNode;
		destroy.push(imgs[x]);
		var b = document.createElement("b");
		parent.appendChild(b);
		var txt = document.createTextNode("[DL]");
		b.appendChild(txt);
	}else if(imgs[x].src.indexOf("righttop.gif")>0){
		imgs[x].parentNode.removeAttribute('style');
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("bottom1.gif")>0){
		imgs[x].parentNode.style.background = "url(http://ubitsa.org/sctimg/bottom_left.png)";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("bottom3.gif")>0){
		imgs[x].parentNode.style.background = "url(http://i297.photobucket.com/albums/mm209/ubitsa_2/bottom_right.png)";
		destroy.push(imgs[x]);
	}else 
	// This does ... but it fixes the nav :)
	if(imgs[x].src.indexOf("left_top.gif")>0){
		var nextElem = imgs[x].parentNode.nextSibling.nextSibling; 
		nextElem.removeAttribute('style');
		nextElem.removeAttribute('background');
		imgs[x].parentNode.removeAttribute('style');
		imgs[x].parentNode.parentNode.style.background = "url(http://ubitsa.org/sctimg/navbg-new.png)";
		imgs[x].parentNode.parentNode.parentNode.parentNode.style.width = "1022";
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("background");
		if((""+window.location).indexOf("action=editpos")==-1){
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("background");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("style");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].style.background = "url(http://ubitsa.org/sctimg/newrightbar.png)";
		}else{
			var td = document.createElement("td");
			td.className = "xexe";
			td.style.width="36";
			td.style.background = "url(http://ubitsa.org/sctimg/newrightbar.png)";		
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.appendChild(td);
		}
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("style");
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].style.background = "url(http://ubitsa.org/sctimg/newleftbar.png)";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.width = "945";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.tableLayout = "fixed";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("xvid.png")!=-1){ 
		imgs[x].src = "http://shareimage.ro/images/esl7zbpmynmccq5ktigz.png";
	}else if(imgs[x].src.indexOf("eps.png")>0){
		imgs[x].src = "http://shareimage.ro/images/q7wwwut83ijeausc556n.png";
	}else if(imgs[x].src.indexOf("appz.png")>0){
		imgs[x].src = "http://shareimage.ro/images/jyp79e8n011t45ykef07.png";
        }else if(imgs[x].src.indexOf("games.png")>0){
		imgs[x].src = "http://shareimage.ro/images/x93r3nif7a3jmt7e7yki.png";  
	}else if(imgs[x].src.indexOf("misc.png")>0){
		imgs[x].src = "http://shareimage.ro/images/j8lo0r0av54g4q8ix9ky.png";
	}else if(imgs[x].src.indexOf("dvd-r.png")>0){
		imgs[x].src = "http://shareimage.ro/images/j8kg6zfdi94dmecc9nd.png";
	}else if(imgs[x].src.indexOf("console.png")>0){
		imgs[x].src = "http://shareimage.ro/images/pze4py3iptc5q6hudg5a.png";
        }else if(imgs[x].src.indexOf("hdtv.png")>0){
		imgs[x].src = "http://shareimage.ro/images/hb1s7edpkbno36fs3rzj.png";
        }else if(imgs[x].src.indexOf("hdtvro.png")>0){
		imgs[x].src = "http://shareimage.ro/images/937uwntyehlwmw55oime.png";
	}else if(imgs[x].src.indexOf("toons.png")>0){
		imgs[x].src = "http://shareimage.ro/images/k0wix3wgegds4vd9p6.png";
	}else if(imgs[x].src.indexOf("linux.png")>0){
		imgs[x].src = "http://shareimage.ro/images/ro1x58jt4krg3n6asxt.png";
	}else if(imgs[x].src.indexOf("mvideos.png")>0){
		imgs[x].src = "http://shareimage.ro/images/7iepq0q9u05k4e9sxvc6.png";
	}else if(imgs[x].src.indexOf("sport.png")>0){
		imgs[x].src = "http://shareimage.ro/images/2tklfw51kgtfmcwq3p1.png";
	}else if(imgs[x].src.indexOf("e-book.png")>0){
		imgs[x].src = "http://shareimage.ro/images/9h89fks34hfgxxcppnd0.png";
	}else if(imgs[x].src.indexOf("dvd.png")>0){
		imgs[x].src = "http://shareimage.ro/images/l3xfjfcy13wuhc2grmyl.png";
	}else if(imgs[x].src.indexOf("porn.png")>0){
		imgs[x].src = "http://shareimage.ro/images/ju4o3ojncwh0suxoo6f.png";
	}else if(imgs[x].src.indexOf("music.png")>0){
		imgs[x].src = "http://shareimage.ro/images/ajr3xx783meuyq6ezv6.png";
	}else if(imgs[x].src.indexOf("oldies.png")>0){
		imgs[x].src = "http://shareimage.ro/images/8e7n5phwyvt7pcdsivn6.png";
        }else if(imgs[x].src.indexOf("blu.png")>0){
		imgs[x].src = "http://shareimage.ro/images/9g72vo82i18pklnr4l9p.png";
	}else if(imgs[x].src.indexOf("vcd.png")>0){
		imgs[x].src = "http://shareimage.ro/images/h2hldisaa52x37tqkz4z.png";
        }else if(imgs[x].src.indexOf("hd.png")>0){
		imgs[x].src = "http://shareimage.ro/images/vedgjcn938hefscc6h3.png";
        }else if(imgs[x].src.indexOf("hdro.png")>0){
		imgs[x].src = "http://shareimage.ro/images/937uwntyehlwmw55oime.png";
	}else if(imgs[x].src.indexOf("logo.png")>0){
		imgs[x].src = "http://shareimage.ro/images/vbr4v5nwlm1b1vcvz8.png";
	}else if(imgs[x].src.indexOf("arrowup.gif")>0){
		imgs[x].src = "http://img34.imageshack.us/img34/7512/arrowupl.gif";
	}else if(imgs[x].src.indexOf("arrowdown.gif")>0){
		imgs[x].src = "http://img695.imageshack.us/img695/3289/arrowdownu.gif";
        }else if(imgs[x].src.indexOf("top.gif")>0){
		imgs[x].src = "http://img585.imageshack.us/img585/8859/redandgreen.gif";
	}else if(imgs[x].src.indexOf("download.gif")>0){
		imgs[x].src = "http://img801.imageshack.us/img801/9132/downloadmy.gif";
	}else if(imgs[x].src.indexOf("files.gif")>0){
		var txt = document.createTextNode("Files");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("comment")>0){    // these couple of ones are removing the images 
		var txt = document.createTextNode("Comm"); //   at the top of columns on browse page
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("added.gif")>0){
		var txt = document.createTextNode("Added");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);	
	}else if(imgs[x].src.indexOf("size.gif")>0){
		var txt = document.createTextNode("Size");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);	
	}else if(imgs[x].src.indexOf("downloaded.gif")>0){
		//imgs[x].parentNode.parentNode.parentNode.parentNode.parentNode.style.tableLayout = "fixed";
		imgs[x].parentNode.parentNode.parentNode.parentNode.parentNode.style.width = "940";
		var txt = document.createTextNode("Snatched");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("seeders.gif")>0){
		var txt = document.createTextNode("Seeds");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("leechers.gif")>0){
		var txt = document.createTextNode("Leechers");
		imgs[x].parentNode.appendChild(txt);
		destroy.push(imgs[x]);
        }else if(imgs[x].src.indexOf("star.png")>0){
		imgs[x].src = "http://shareimage.ro/images/s5hgn6v7u2uuhqgtyd1g.png";
        }else if(imgs[x].src.indexOf("inboxnew.gif")>0){
		imgs[x].src = "http://shareimage.ro/images/ifh468i145t7vp2yqypx.gif";  		
	}else if(imgs[x].src.indexOf("starbig.png")>0){
		imgs[x].src = "http://shareimage.ro/images/c3qty6vkxe4jhocus248.png";
	}else if(imgs[x].src.indexOf("buddylist.gif")>0){
		imgs[x].src = "http://img402.imageshack.us/img402/1881/buddylist.gif";
       }else if(imgs[x].src.indexOf("rss.gif")>0){
		imgs[x].src = "http://img33.imageshack.us/img33/6976/rssg.gif";
	}
	
}

//need this to be delayed til here cuz.... else it crashes
// just adds seperators between nav imgs
for(var i=0;i<useus.length;i++){
	useus[i].insertBefore(useimg[i],withus[i]);
}

// Change links in Seeders column to be black
var fonts = document.getElementsByTagName("font");
for(var i=0;i<fonts.length;i++){
	if(fonts[i].color =="#fffff0"){
		fonts[i].color = "#000000";
	}
	if(fonts[i].color =="#387fa8"){
		fonts[i].color = "#0e41e4";
		if(fonts[i].innerHTML == "Ratio:"){
			fonts[i].nextSibling.nextSibling.color = "#000000";
		}
	}
}

// remove all the images we're sposda get rid of
for(var i=0;i<destroy.length;i++){
	destroy[i].parentNode.removeChild(destroy[i]);
}

// fix bottom_mid pic
var links = document.getElementsByTagName("a");
for(var i=0;i<links.length;i++){
	if(links[i].href=="http://www.sceneaccess.org/bookmarks.php"||links[i].href=="https://www.sceneaccess.org/bookmarks.php"){
		links[i].parentNode.parentNode.parentNode.removeAttribute("style");
		links[i].parentNode.parentNode.parentNode.removeAttribute("background");
		links[i].parentNode.parentNode.parentNode.style.background = "url(http://ubitsa.org/sctimg/bottom_mid.png)";
	}
	// Donation bar creation.... jesus!
	if((links[i].href=="http://filelist.ro/donate.php"||links[i].href=="http://filelist.ro/donate.php") && links[i].className == "donation"){
		var pct = links[i].title; // donation %
		var numpct = parseInt(pct.substring(0,pct.length-1));
		//clear everything
		var parent = links[i].parentNode;
		parent.vAlign = "top";
		parent.style.width = "125";
		nukeChildren(parent);
		var spacer = document.createElement("div");
		spacer.style.height = "27";
		parent.appendChild(spacer);
		var dlink = document.createElement("a");
		dlink.setAttribute("href","/donate.php");
		dlink.style.cssFloat = "left";
		var dimg = document.createElement("img");
		dimg.src = "http://ubitsa.org/sctimg/donate_main.png";
		dimg.alt = "Donate!";
		dimg.style.cssFloat = "left";
		dimg.setAttribute('style','border:none;');
		parent.appendChild(dlink);
		dlink.appendChild(dimg);
		var dbar = document.createElement("div");
		dbar.style.cssFloat = "left";
		dbar.style.height = "40";
		dbar.style.width = "20";
		parent.appendChild(dbar);
		var heit = (numpct*30/100);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_top.png";
		dbimg.style.height = "5";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_empty.png";
		dbimg.style.height = parseInt(33-heit);
		dbimg.style.width = "18";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		var heit = (numpct*33/100);
		if(numpct <50){		
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_red.png";
			dbimg.style.height = parseInt(heit);
		}else if(numpct < 85){
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_yellow.png";
			dbimg.style.height = parseInt(heit);	
		}else{
			dbimg.src = "http://ubitsa.org/sctimg/donate_bar_green.png";
			dbimg.style.height = parseInt(heit);
		}		
		dbimg.setAttribute("title",pct);
		dbimg.style.width = "18";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
		var dbimg = document.createElement("img");
		dbimg.src = "http://ubitsa.org/sctimg/donate_bar_bottom.png";
		dbimg.style.height = "5";
		dimg.setAttribute('style','border:none;');
		dbar.appendChild(dbimg);
	}
}

function nukeChildren(node){
	if (node.hasChildNodes()){
		while (node.childNodes.length >= 1){
			node.removeChild(node.firstChild);       
		}
	}
}