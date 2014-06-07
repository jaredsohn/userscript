// ==UserScript==
// @name           GFT-ScT Icon Conversion
// @namespace      thegft.org
// @include        http://*thegft.org/*
// @include        https://*thegft.org/*
// @author         Friction
// @version:	   0.8.7
// @date		   Dec. 2nd 2009
// ==/UserScript==

/* Big thanks to Bap, nascent, and all the others who helped make this happen <3  */
	
/********************************************************************************/
/********** User Options - Change these if you want *****************************/
/********************************************************************************/

// 0: Use SceneTorrents in logo
// 1: Use SceneAccess in logo, w/ gold badge
// 2: Use SceneAccess in logo, w/ no gold badge
var whichLogo = 1;

// more options to come later ofc :)


/********************************************************************************/
/********** Don't Change Below Here! (unless you know what you're doing) ********/
/********************************************************************************/
(function() {
var css = "body {\n		color: #transparent !important; \n		background-color: #transparent !important;   \n	}\n\n	table {\n		background-color: #transparent !important;\n	}\n	\n	table.bottom {\n		background-color: #transparent !important;\n	}\n	td {\n          border-color: #transparent !important;\n        }\n	td.colhead {\n	  background-color: #transparent !important;\n           border-color: #000000 !important;\n	}\n	\n	a:link, a:visited {\n	  color: #transparent !important;\n	}\n\n	a:hover {\n	  color: #transparent !important;\n	}\n	a.sort {\n		color: #transparent !important;	\n		text-decoration: none !important;\n	}\n	a.sort:hover {\n		text-decoration: underline !important;\n	}";
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
 * Fix some bg colors :)
 */
var td = window.document.getElementsByTagName("td");
for(var i=0;i<td.length;i++){
	if(td[i].className.indexOf("xexe") != -1){
		td[i].style.backgroundColor = "#transparent";
	}
	if(td[i].className.indexOf("clear") != -1){
		td[i].style.backgroundColor = "#transparent";
	}
	if((td[i].className.indexOf("xexe") != -1)&&(td[i].style.background.indexOf("menubg")>0)){
		td[i].style.background = "";
	}
	if(td[i].className.indexOf("embedded")!=-1 && (""+window.location).indexOf("browse.php")>-1){
		td[i].style.backgroundColor = "#2f302c";
	}
	if(td[i].firstChild!=null && td[i].firstChild.tagName == "B"){
		if(td[i].firstChild.innerHTML.indexOf("SceneAccess")>-1){
			destroy.push(td[i].parentNode);
		}
	}
	if(td[i].style.backgroundColor == "#transparent"){
		td[i].style.removeAttribute("style");
		td[i].style.removeAttribute("background");
	}
}


/**
 * Replace images... for forums, cat icons, etc
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
	// fuck around with the logo.  Totally unnecessary, just for fun to get as close to ScT as possible
	if(imgs[x].src.indexOf("logo.jpg")>0){
		if(whichLogo == 0){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url(http://ubitsa.org/sctimg/newtop.png)";
		}else if(whichLogo == 1){
			imgs[x].parentNode.parentNode.parentNode.style.background = "url(http://i49.tinypic.com/1si9fs.png)";
		}else{
			imgs[x].parentNode.parentNode.parentNode.style.background = "url(http://i50.tinypic.com/2u5e2rm.png)";
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
		imgs[x].src = "about:blank";
		destroy.push(imgs[x].parentNode.nextSibling);
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
	}else if(imgs[x].src.indexOf("browse2.jpg")>0){
		imgs[x].src = "about:blank";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("archive.jpg")>0){
		imgs[x].src = "about:blank";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("profile.jpg")>0){
		imgs[x].src = "about:blank";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("forums.jpg")>0){
		imgs[x].src = "about:blank";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("donate.jpg")>0){
		imgs[x].src = "about:blank";
		//imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode.nextSibling);
		destroy.push(imgs[x].parentNode.nextSibling);
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));
	}else if(imgs[x].src.indexOf("staff.jpg")>0){
		imgs[x].src = "about:blank";
		
		imgs[x].parentNode.removeAttribute('onmouseover');
		imgs[x].parentNode.removeAttribute('onmouseout');
		
		useus.push(imgs[x].parentNode.parentNode);
		withus.push(imgs[x].parentNode);
		useimg.push(newimg.cloneNode(false));		
		newimg = document.createElement("img");
		newimg.setAttribute('src',"about:blank");
		newimg.setAttribute('style','border:none;');
		imgs[x].parentNode.appendChild(newimg);
	}else if(imgs[x].src.indexOf("default_avatar.gif")>0){
		imgs[x].src = "about:blank";
	}else 
	// remove bookmark image, replace with blue one
	if(imgs[x].src.indexOf("bookmark.gif")>0){
		imgs[x].src = "about:blank";
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
		imgs[x].parentNode.style.background = "url(about:blank)";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("bottom3.gif")>0){
		imgs[x].parentNode.style.background = "url(about:blank)";
		destroy.push(imgs[x]);
	}else 
	// This does ... but it fixes the nav :)
	if(imgs[x].src.indexOf("left_top.gif")>0){
		var nextElem = imgs[x].parentNode.nextSibling.nextSibling; 
		nextElem.removeAttribute('style');
		nextElem.removeAttribute('background');
		imgs[x].parentNode.removeAttribute('style');
		imgs[x].parentNode.parentNode.style.background = "url(about:blank)";
		imgs[x].parentNode.parentNode.parentNode.parentNode.style.width = "1022";
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("background");
		if((""+window.location).indexOf("action=editpos")==-1){
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("background");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].removeAttribute("style");
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[2].style.background = "url(about:blank)";
		}else{
			var td = document.createElement("td");
			td.className = "xexe";
			td.style.width="36";
			td.style.background = "url(about:blank)";		
			imgs[x].parentNode.parentNode.nextSibling.nextSibling.appendChild(td);
		}
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].removeAttribute("style");
		imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[0].style.background = "url(about:blank)";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.width = "945";
		//imgs[x].parentNode.parentNode.nextSibling.nextSibling.children[1].style.tableLayout = "fixed";
		destroy.push(imgs[x]);
	}else if(imgs[x].src.indexOf("TVXviD.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/tv_xvid.png";
	}else if(imgs[x].src.indexOf("GFT.gif")>0){
		imgs[x].src = "http://img85.imageshack.us/img85/5456/gftgems.png";
	}else if(imgs[x].src.indexOf("AppzWindows.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/appz.png";
	}else if(imgs[x].src.indexOf("Games2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/games_pc.png";
	}else if(imgs[x].src.indexOf("Misc2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/misc.png";
	}else if(imgs[x].src.indexOf("0Day.gif")>0){
		imgs[x].src = "http://img704.imageshack.us/img704/679/0day.png";
	}else if(imgs[x].src.indexOf("TVDVDRip.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/tv_dvdrip.png";
	}else if(imgs[x].src.indexOf("x264.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/movies_x264.png";
	}else if(imgs[x].src.indexOf("TVX264.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/tv_x264.png";
	}else if(imgs[x].src.indexOf("packs_tv.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/tv_packs.png";
	}else if(imgs[x].src.indexOf("packs_movies.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/movies_packs.png";
	}else if(imgs[x].src.indexOf("MviD.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/music_videos.png";
	}else if(imgs[x].src.indexOf("mac.png")>0){
		imgs[x].src = "http://img695.imageshack.us/img695/5973/macos.png";
	}else if(imgs[x].src.indexOf("XviD.gif")!=-1){ 
		imgs[x].src = "http://ubitsa.org/sctimg/movies_xvid.png";
	}else if(imgs[x].src.indexOf("MviD.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/music_videos.png";
	}else if(imgs[x].src.indexOf("cat_dox.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/dox.png";
	}else if(imgs[x].src.indexOf("cat_games_ps2.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/games_psp_ps2.png";
	}else if(imgs[x].src.indexOf("Wii.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/games_wii.png";
	}else if(imgs[x].src.indexOf("ebooks.gif")>0){
		imgs[x].src = "http://img130.imageshack.us/img130/6812/elearning.png";
	}else if(imgs[x].src.indexOf("XBox.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/games_xbox360.png";
	}else if(imgs[x].src.indexOf("DVDR.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/movies_dvdr.png";
	}else if(imgs[x].src.indexOf("cat_xxx_porn.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/xxx_xvid.png";
	}else if(imgs[x].src.indexOf("MP3.gif")>0){
		imgs[x].src = "http://ubitsa.org/sctimg/music_mp3.png";
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
	}else if(imgs[x].src.indexOf("")>0){
		imgs[x].src = "/line.gif";
	}else if(imgs[x].src.indexOf("")>0){
		imgs[x].src = "star.gif";
	}else if(imgs[x].src.indexOf("")>0){
		imgs[x].src = "starbig.gif";
	}else if(imgs[x].src.indexOf("")>0){
		imgs[x].src = "buddylist.gif";
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
	if(fonts[i].color =="#fffff0"){
		fonts[i].color = "#000000";
		if(fonts[i].innerHTML == "Ratio:"){
			fonts[i].nextSibling.nextSibling.color = "#transparent";
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
	if((links[i].href=="http://www.sceneaccess.org/donate.php"||links[i].href=="https://www.sceneaccess.org/donate.php") && links[i].className == "donation"){
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