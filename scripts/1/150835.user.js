// ==UserScript==
// @name        Tweakersfix
// @namespace   tweakers.net
// @description tweakers.net damage control
// @include     http://tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @include     https://tweakers.net/*
// @include     https://gathering.tweakers.net/*
// @include     https://secure.tweakers.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.1.6
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==


//
// Responsive Design CSS uit. Zit in de weg.
//

for (var i = document.styleSheets.length - 1; i >= 0; i--) {
 if ((document.styleSheets[i].media[0]) == "(max-width: 499px)") { document.styleSheets[i].disabled = true; }
 if ((document.styleSheets[i].media[0]) == "(max-width: 767px)") { document.styleSheets[i].disabled = true; }
}


//
// Automatisch cookie waarschuwing beantwoorden en accepteren.
//

if(document.getElementById('cookieOverlay')) {
  document.getElementsByClassName("fancyButton")[0].click();
}


//
// Meuk Updates op Frontpage (zie ook Frontpage CSS)
//

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

if(document.getElementsByClassName('fpaItemsWrapper').length>0) {
var pageText;
var dameuk;

GM_xmlhttpRequest ( {
    method:	'GET',
    url:	'http://tweakers.net/meuktracker/',
    headers: {  'Cookie': 'TnetID='+getCookie("TnetID") },
    onload:	 function (responseDetails) {
			pageText = responseDetails.responseText;

			var meukstart = pageText.indexOf('<div class="meukTable portalBlock">');
			var meukend = pageText.indexOf('<br class="clear">');
			dameuk = pageText.substring(meukstart, meukend);

			dameuk = dameuk.replace(new RegExp('<h2>Laatste Software-updates</h2>','g'),'<h3><a class="MeukCategorieLink" href="http://tweakers.net/meuktracker/meukcat/77/">Laatste Software-updates</a></h3>');
			dameuk = dameuk.replace(new RegExp('<h2>Laatste Firmware-updates</h2>','g'),'<h3><a class="MeukCategorieLink" href="http://tweakers.net/meuktracker/meukcat/78/">Laatste Firmware-updates</a></h3>');
			dameuk = dameuk.replace(new RegExp('<h2>Laatste Driver-updates</h2>','g'),'<h3><a class="MeukCategorieLink" href="http://tweakers.net/meuktracker/meukcat/79/">Laatste Driver-updates</a></h3>');


			dameuk = '<h2><a href="http://tweakers.net/meuktracker/">Meuk Updates</a></h2>'+dameuk;
//			alert (dameuk);

			var MyMeuk = document.createElement("div");
			MyMeuk.id = "MeukUpdate";
			MyMeuk.className = "fpItem darkFpBlock";
			MyMeuk.innerHTML = dameuk;

			var pw = document.getElementById("pricewatch");
			pw.parentNode.insertBefore(MyMeuk, pw.nextSibling);

		},
//		synchronous: true
} );
}


//
// FP, niet-nieuws (meukupdates en video's) uit de lijst halen
//
notnewsposts = document.evaluate('//tr/td/span[text()="Video" or text()="Download"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i = 0; i < notnewsposts.snapshotLength; i++) {
  (foo = notnewsposts.snapshotItem(i).parentNode.parentNode).parentNode.removeChild(foo);
}


//
// Pricewatch, Specificaties plaatjes uit de lijst en apart rechts onder elkaar.
// Merk op: imageviewer werkt niet meer, plaatjes worden in apart venster geopend.
//
if (document.getElementById("tab:specificaties")) {
  PWspecifications_div = document.getElementById("tab:specificaties");
  PWspecifications_div.setAttribute("style", "position:relative;");

  var ImagesDiv = document.createElement("div");
  ImagesDiv.id = "PW-Images-Div";
  ImagesDiv.setAttribute("style", "position:absolute; top:0; right:0;");

  var newfoo = new Array();

  pricewatchdetailimages = document.evaluate('//tr/td/a[@class="thumb large"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (i = 0; i < pricewatchdetailimages.snapshotLength; i++) {
    (foo = pricewatchdetailimages.snapshotItem(i));
    newfoo[i] = foo.cloneNode(true);
    ImagesDiv.appendChild(newfoo[i]);
  }

foo.parentNode.parentNode.parentNode.removeChild(foo.parentNode.parentNode);

PWspecifications_div.appendChild(ImagesDiv);
}



//
// CSS veranderingen
//
GM_addStyle( '\
\
/*\
 * Global styles\
 */\
\
body {	background: #444; }\
h1, h2, h3, p { margin: 0 0 10px;}\
\
#notifications {display: none;}		/* geen gele notifications bovenin */\
#cookieBar {display: none;}		/* geen cookiebar */\
// #searchbar {display: none; }		/* geen searchbar */\
// #menubar {display: none; }		/* geen zwarte menu balk meer */\
// #bottom {display: none;}		/* geen zwarte balk aan de onderkant meer */ \
.icon.display {display: none;}		/* geen display options meer, voegt niets toe en zit werking script tegen als het gebruikt wordt */\
\
#menubar {\
	width: 1020px;\
	border-radius: 8px 8px 0 0;\
	height: 32px;\
	margin-bottom: 36px;\
	z-index: 1;\
}\
\
\
#searchbar {\
	width: 1020px;\
	height: 0px;\
	margin: 0 auto;\
	background: none;\
	position: relative;\
	z-index: 1;\
}\
\
	#true {display: none; }		/* Searchbar: geen TRUE logo meer */\
	#streamone {display: none; }	/* Searchbar: geen StreamOne log meer */\
\
	#search {\
		position: absolute;\
		width: 486px;\
		right: 0px;\
		top: -60px;\
		padding: 0;\
	}\
\
		#search .keywordSearch {\
			width: 376px;\
			height: 24px;\
			margin-top: 4px;\
		}\
\
		#search input.text {\
			width: 320px;\
			height: 22px;\
			font-size: 12px;\
			padding: 5px 10px 3px;\
		}\
\
		#search input.text.small {\
			width: 212px;\
			height: 12px;\
			font-size: 12px;\
			padding: 5px 10px 3px;\
		}\
\
\
		#search input.submit {\
			height: 24px;\
			background-position: 1px -75px;\
		}\
		\
		.mainSearchSuggest {\
			margin-left: -211px;\
		}\
\
		#detailedSearchListing {\
			width: 107px;\
			height: 24px;\
			font-size: 12px;\
			margin-top: 0px;\
		}\
\
		#detailedSearchListing ul {\
			width: 108px;\
		}\
\
\
.galleryHeadingContainer, /* High header content */\
.pageTabsContainer,\
#tabs,\
#tweakbase {\
	margin: 0 auto;\
	width: 1020px;\
}\
\
\
#sponsored { display: none; } /* Frontpage: geen gesponsorde acties meer */\
\
/* Advertentiespul, als je dit niet wilt heb je  waarschijnlijk al addblock en noscript draaien. */\
//#b_tb      { display: none; }	/* Top Banner /*\
//#b_ad      { display: none; }	/* advertorial /*\
//#b_re      { display: none; }	/* gereserveerd voor ads in rechter kolom ? */\
//#b_tb_tmp      { display: none; }	/* Top Banner /*\
//#b_ad_tmp      { display: none; }	/* advertorial /*\
//#b_re_tmp      { display: none; }	/* gereserveerd voor ads in rechter kolom ? */\
\
\
#contentArea {\
	background: #f5f5f5;\
	padding: 24px 20px 166px;\
}\
\
#bottom .hr { display: none; }	/* verwijderd witte randje onderkant scherm net boven zwarte balk */\
\
/*\
 * End of Global styles\
 */\
\
\
/*\
 * Frontpage\
 */\
\
// #fp_tabs_container {display: none;}	/* geen tabs meer */\
// #community {display: none;}		/* geen uit-de-community meer */\
// #jobs {display: none;}		/* geen IT-Banen */\
// #pricewatch {display:none;}		/* geen Pricewatch */\
// #poll {display: none;}		/* geen Poll */\
#social {display: none;}		/* geen facebook/twitter gedoe */\
#newsletter {display: none;}		/* geen signup voor de newsletter */\
#highlights {display: none;}		/* geen highlights sectie meer */\
.fpaItemsWrapper {display: none;}	/* geen ankeilers (3 plaatjes bovenin) meer */\
#categoryDropdown  {display: none;}	/* geen Categorie box meer */\
#categoryBar {display: none;}		/* geen Pricewatch Categorie balk box meer */\
#promo {display: none;}			/* geen Promo links rechts bovenin meer, staan in de weg voor searchbox */\
\
/* Afmetingenen en marges, nieuws-categorien tabs */\
#fp_tabs_container { margin-bottom: 10px; height: 31px;}\
#fp_tabs { padding-top: 0; }\
\
/* ruimte en marges tussen de niewsberichten */\
table.highlights { margin-bottom: 15px;}\
table.highlights td { padding: 3px 0; }\
table.highlights .type { padding: 3px 0; }\
\
.secondColumn .fpItem { margin-bottom: 10px; }\
\
/* frontpage link kleuren */\
// a{color:#024368;text-decoration:none}\
// a:hover,a.highlightlink{text-decoration:underline;color:#b9133c}\
// .frontPageLink:visited{color:#7d3475}\
\
/* frontpage pricewatchbox populaire categorien verwijderen */\
#pricewatch ul {display : none;}\
#pricewatch h3 {display : none;}\
\
/* vormgeving alle frontpage boxen aanpassen, inclusief de nieuwe MeukUpdate */\
#MeukUpdate,#pricewatch,#jobs,#poll,#newsletter,#sponsored,#textlink,#social .button{line-height:12px; padding:10px 15px 10px;border:1px solid #dddede;border-radius:1px;background:#edeeee;background-image:-webkit-linear-gradient(#f5f6f6,#edeeee);background-image:-moz-linear-gradient(#f5f6f6,#edeeee);background-image:linear-gradient(#f5f6f6,#edeeee);-webkit-box-shadow:inset 0 0 0 1px rgba(255,255,255,.33);box-shadow:inset 0 0 0 1px rgba(255,255,255,.33)}\
\
/* frontpage MeukUpdate, aantal items verminderen. */\
#MeukUpdate .meukTable table.highlights tr:nth-child(n+7) {display: none;}\
\
/* "meer updates" links verwijderen */\
#MeukUpdate .meukTable p {display: none;}\
\
/* "breedte icoontjes in meukUpdate corrigeren */\
div.meukTable:nth-child(n+1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) {width: 20px;}\
\
/*\
 * End of frontpage\
 */\
\
\
/*\
 * Article detail page\
 */\
\
// .relevancyColumn {display: none;}	/* verwijderd hele kolom rechts met relevante zaken */\
// #relationbox {display: none;}		/* verwijderd alleen de Onderwerpen */\
// #productEditionPriceBlock {display: none;}	/* verwijderd alleen de prijzen */\
// .relatedContent {display: none;}		/* verwijderd alleen Gerelateerde Content */\
\
\
.articleColumn { line-height: 1.4em; }\
.article { line-height: 1.4em; }\
.article table th, .article table td { padding: 6px 5px; }\
\
#reacties .reactie{background: #f8f9f9; }\
#reacties .reactie .topBorder{border-top:1px solid #d7dfdd;height:1px;width:auto;margin-left:-40px;}\
 \
/*\
 * End of article detail page\
 */\
\
\
/* Plan articles */\
.plan .content { line-height: 1.4em; }\
\
\
\
/*\
 * User galleries\
 */\
\
.bar{min-height:14px; line-height:14px}\
table.galleryTable td{padding:2px 0px;}\
table.galleryInnerTable td{padding:2px 0px;}\
\
/*\
 * End of user galleries\
 */\
\
\
\
/*\
 * GoT\
 */\
\
#forum_tabs {\
	padding-top: 0;\
}\
\
.reactie {line-height: 1.4em; }\
\
#community li {padding: 5px 0;}\
\
#content .forumList:last-child table.listing {\
	border: 10px solid #fc0;\
	color: #65f;\
	margin-bottom: 0;\
}\
\
table.listing td, table.listing th { padding: 2px 5px; } /* Forum lijsten dichter op eklaar */\
\
table.listing td.tags {	\
	overflow: hidden;\
	 white-space: nowrap;\
}\
\
.channelHeader { display: none; }	/* geen channelheaders (icoontjes + titels) in forum lijst */\
\
#messages, .topic_actions { \
	overflow: hidden;\
}\
	div.message .messageheader {\
		background-color: #ddd;\
	}\
\
	div.message {\
		margin-bottom: 0px;\
		line-height: 1.4em;\
		border-top: 0;\
		border-radius: 0;\
	}\
\
#title { height: 50px; }\
#title p.mods {	display: none; }\
\
.pagecounter { margin-top: 10px; }\
\
#footer .breadcrumb { margin-bottom: 0; }\
\
div.message.topicstarter .messageheader { background-color: #ccc; }\
\
/* Forum kleuren op de categorien */\
.forumList:nth-child(3) table.listing tr th {\
	background:#db2252;\
	background-image:-webkit-linear-gradient(#db2252, #b5012e);\
	background-image:-moz-linear-gradient(#db2252, #b5012e);\
	background-image:linear-gradient(#db2252, #b5012e);\
}\
.forumList:nth-child(4) table.listing tr th {\
	background:#673c87;\
	background-image:-webkit-linear-gradient(#673c87, #4c2a66);\
	background-image:-moz-linear-gradient(#673c87, #4c2a66);\
	background-image:linear-gradient(#673c87, #4c2a66);\
}\
.forumList:nth-child(5) table.listing tr th {\
	background:#24b635;\
	background-image:-webkit-linear-gradient(#24b635, #1c8c29);\
	background-image:-moz-linear-gradient(#24b635, #1c8c29);\
	background-image:linear-gradient(#24b635, #1c8c29);\
}\
.forumList:nth-child(6) table.listing tr th {\
	background:#ff6d26;\
	background-image:-webkit-linear-gradient(#ff6d26, #ff4800);\
	background-image:-moz-linear-gradient(#ff6d26, #ff4800);\
	background-image:linear-gradient(#ff6d26, #ff4800);\
}\
.forumList:nth-child(7) table.listing tr th {\
	background:#00b689;\
	background-image:-webkit-linear-gradient(#00b689, #14a985);\
	background-image:-moz-linear-gradient(#00b689, #14a985);\
	background-image:linear-gradient(#00b689, #14a985);\
}\
.forumList:nth-child(9) table.listing {\
	margin-bottom: 0 !important;\
}\
\
\
/*\
 * End of GoT\
 */\
\
\
\
/* Pricewatch Start */\
\
table.shop-listing td {padding: 0px 2px;}\
table.shop-listing .shop-name{font-size:12px;}\
table.shop-listing .shop-price a{font-size:12px;}\
table.shop-listing .shop-clickout {padding-bottom:1px; padding-top:1px;}\
table.shop-listing .shop-clickout span.fancyButton {height:19px; line-height:19px;}\
table.shop-listing .shop-clickout span.fancyButton.clickOut:after{top:4px;}\
\
#filter .filterOption {line-height:18px;}\
\
table.spec-detail td{padding:0px 0;}\
#scorecard td{padding:4px 0;}\
\
\
/* Nodig voor het pricewatch plaatjes script. voorkomt door elkaar lopen informatie en plaatjes */\
table.spec-detail {max-width:700px;}\
\
/* Pricewatch End */\
\
\
/* Tracker Start */\
#tracker .trackeritem li {height:9px}\
\
/* Tracker End */\
\
\
');