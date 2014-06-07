// ==UserScript==
// @name           Better Corriere.it
// @version        1.71
// @namespace      http://www.corriere.it
// @description    Rimuove immondizia da corriere.it / Removes garbage from corriere.it.
// @include        http://corriere.it/*
// @include        http://*.corriere.it/*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/79815.user.js
// @icon           http://images2.corriereobjects.it/images/static/common/pinie9/favicon.ico
// ==/UserScript==

/**** HISTORY ****/
//1.71   Removed the annoying "social" bullshit in home page and above articles
//1.69   Removed the soccer videos from the side
//1.68   Fixed the top black border in the sections
//       Removed a couple of extra ads from the 'viaggi' section
//1.67   Removed the top black border from the home page
//1.66   Trying to better handle the blocking of the iframe ads
//1.65   Minor fix yet again to the background ads
//1.64   Removed a couple of more ads in the regional pages, 
//       including a box with the current prices of gold (no comment).
//1.63   Fixed background issues with stupid ads
//1.62   Restored background, we'll see if ads don't get in the way
//1.61   Removed two little lines of spam links at the top
//1.60   Fixed the local header top margin
//       Still trying to fix the stupid cookie refresh
//       Blocked all iframes on the page because of the cretin Radio 105 ad

//moves the news flash applet
function moveNewsFlashApplet() {
  var ni = document.getElementById('col-dx');
  var newdiv = document.createElement('div');
  newdiv.setAttribute('id','flash-news-ads');
  newdiv.innerHTML = '<object type=\"application/x-shockwave-flash\" id=\"flash_news24_hp\" data=\"http://images2.corriereobjects.it/includes2007/ssi/boxes/boxNews/boxNews.swf?v=20100630152032\" height=\"350\" width=\"280\">	<param name=\"movie\" value="http://images2.corriereobjects.it/includes2007/ssi/boxes/boxNews/boxNews.swf?v=20100630152032"> 	<param name=\"wmode\" value=\"opaque\">  <param name=\"quality\" value=\"high\"> <param name=\"allowScriptAccess\" value=\"always\"> <param name=\"flashvars\" allowscriptaccess=\"always\" value=\"configPath=http://xml.corriereobjects.it/includes2007/ssi/boxes/boxNews/config.xml&amp;newsXML=news_hp_corsera.xml&amp;debug=S\">    <embed name=\"flash_news24_hp\" src="http://images2.corriereobjects.it/includes2007/ssi/boxes/boxNews/boxNews.swf?v=20100630152032" quality="high" allowscriptaccess=\"always\" wmode=\"opaque\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" flashvars=\"configPath=http://xml.corriereobjects.it/includes2007/ssi/boxes/boxNews/config.xml&amp;newsXML=news_hp_corsera.xml&amp;debug=S\" align=\"middle\" height=\"350\" width=\"280\"></object><br><br>';
  ni.insertBefore(newdiv, ni.firstChild);
}

//replaces br with space
function replaceBr(){
	
   var elems0 = document.getElementsByTagName("p");
   for (i=0; i<elems0.length; i++) {
     elems0[i].innerHTML = elems0[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }
  
     var elems1 = document.getElementsByTagName("h3");
   for (i=0; i<elems1.length; i++) {
     elems1[i].innerHTML = elems1[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }
  
     var elems2 = document.getElementsByTagName("ul");
   for (i=0; i<elems2.length; i++) {
     elems2[i].innerHTML = elems2[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }
  
     var elems3 = document.getElementsByTagName("h2");
   for (i=0; i<elems3.length; i++) {
     elems3[i].innerHTML = elems3[i].innerHTML.replace(new RegExp("<br>","g"),' ');
  }
  
     var elems4 = document.getElementById("col-dx");
     elems4.innerHTML = elems4.innerHTML.replace(new RegExp("<br>","g"),'<br>');
  
	//document.body.innerHTML=document.body.innerHTML.replace(new RegExp("<br>","g"),' ');
	}

//try and do things
function fewLittleThings(){
	
	//document.getElementById('col-dx').childNodes[2].innerHTML ='';
	
	// break moronic refresh of the page
	for(h=1;h<10;h++) {unsafeWindow.clearTimeout(h);}
	document.body.appendChild(document.createElement('script')).innerHTML = "function setRefreshCookie() {}";
	  
	//break annoying selection gif button  
	//document = unsafeWindow.document;
	//document.onmouseup = null;
	document.body.appendChild(document.createElement('script')).innerHTML = "function mostraPulsante() {}";
	
	
	}

//remove images by name
function findImgAndRemove(){
 var imgs,i;
 imgs=document.getElementsByTagName('img');
 for(i in imgs){
  if(/2010-un-anno-100-foto.jpg/.test(imgs[i].src)){
    imgs[i].style.display = 'none';
   }
  }
}

//main function 
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '#home-2col, #home-2col-adv, #pushbar2, #soppalco_mondiali, #media-daytop, .collection, #square-top, .wide-pushbar , #mirago, #mirago-feed-hp, #ad_home_hide, .vaschetta3col, .manchetteSX, .manchetteDX, .bacheca-viaggi, .box-mktg-dx, .promo_sp, .boxpub, #paginegialle-icone, #tabellino-shared, .bacheca-pub, .vaschetta3, .bacheca-mkt, .box-corriere-superenalotto, #box-viaggi-home-cor, #box-viaggi-home-cor-single, .tr-home-container, #box-fb, .bacheca-pub-home, .edizione-straordinaria-grafica, #corriere-tv-mid_small, #ctv-live, .content-grafica, .edizione-grafica, #mirago-feed, #halloween_carousel, ul.toolbar, #techsource_Frame1, .box-corriere-store, #ads_halfpage, #techsource_Top, .box-bottom-mobile, #rectangle, #bannerone, #leaderboard, .box-pgialle, #testata_tkv, #colonnasx, #colonnadx, .minisport_player_container, #soppalco-gol, #Position1teaser, #rectangle, .gol, #news_nouvelobs, #box-annunci, #ctv3a, #header-leaderboard, #pushbar, .spacer_bottom, .leaderboard, .boxfb, #box-servizi, #fanbox4, #box_mobile_mattino, #box_radios_new, .home-2col-exid, .container-box-fotovideo, .corner-fotovideo-bottom, #tabellino-hp, #box_blog_multi, .connect_width, .link_external, #testata_tkv, .colonnasx, .colonnadx, .square-banner, #yoodeal, .box-mkt, #box_quotazioni_oro, #eyeDiv, #share-article-box, /*#wrapper, */.centra_adv, .bacheca-pub-viaggi, #boxPerShop, #doveViaggiCont, .player-serieA-wrap, #multibar, .social-bar, #box-community-social, #box-interessi, #box-emotional, #hp-top-reply, #hp-top-share, #hp_must_head {display:none !important}';
	
	//note: #wrapper is added here to block the content of certain iframes (radio 15 and such)
	
	//a little make-up
cssStyle += '.logo-HOME{float:none; margin:auto} .articles-home{width:615px} #giochi_carousel{visibility:hidden} #giochi_carousel{height:0px; font-size:1px; margin:0} #forum-blog-sx, #forum-sx-new, #forum-dx, #forum-dx-new, #bf-blog,#forum-sx-new div, #forum-blog-sx div,#forum-dx-new div, #forum-blog-dx div, #forum-blog-dx {width:100%} #fanbox3{background-image:none !important;margin:0;display:none} #pan_box{margin-top:0} #col-dx br{clear} #flash-news-ads{margin-top:2px; margin-left:0px} #corriere-tv-mid_small{} .homearticle-box p {font-size:125%} .homearticle-box h2 {font-size:2.3em} .articles-home h1 {font-size:2.7em} img.left,img.right {/*min-width:200px;*/ border:1px solid #bbb; /*padding:5px;*/ background-color:#eee;} .formichina{margin-top:5px} body{/*background:none !important*/} #direttasms{height:90px !important; margin-top:5px; width:370px !important} .edizione-straordinaria p {margin-bottom:0px; padding-bottom:0px} #box-informazione-locale2{margin-bottom:0px; padding-bottom:0px} html body#home div#main, .first-lista {background:none !important} .link-testata-local{margin-top:37px !important} body{background: url("http://images2.corriereobjects.it/images/static/common/new/bg_page_cor.gif") repeat-y scroll center 18px #FFFFFF !important; margin-top:8px} .top_header_hp, #header_menu_meth .top_header {    background: url("http://images2.corriereobjects.it/images/static/common/new/bg_testatina_hp.jpg?v=201205291447") repeat-x scroll 0 -2px transparent !important;}'; 


	//modifiers for home page only
	if (window.location.href == "http://www.corriere.it/" || window.location.href == "http://corriere.it/"  || window.location.href == "http://corriere.it/index.shtml" || window.location.href == "http://www.corriere.it/index.shtml" ) {
		moveNewsFlashApplet();
		replaceBr();
		findImgAndRemove();
		
		/*cssStyle += 'iframe {display:none !important}';*/
		
	}	
	
	//add CSS
	addGlobalStyle(cssStyle);
	
	//some
	fewLittleThings()
	  
}

)()