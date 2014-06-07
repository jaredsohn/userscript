// ==UserScript==
// @name        Tweakers v7 Desktop
// @namespace   tweakers.net
// @description Make tweakers.net usable again
// @include     http://tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @include     https://secure.tweakers.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     2.8
// @grant       GM_addStyle
// ==/UserScript==
// Based on     Tweakers 7.5 rev 1.1.0 by eXistenZNL : http://userscripts.org/scripts/show/150491
// Changes      Tracker always on left side. privacy tweak, optimum 1270 px width, so also for small laptop
GM_addStyle((<><![CDATA[
/* Global defs ============================================================================ */
body       { background: #444; } 
body, td, input, textarea, select, .bar, .sitename, .shop-name { font-size: 12px!important; }
#layout { padding-bottom: 0px; }
/* search to top, make it width search input will get centered */
#searchbar { height: 5px !important; } 
#search    { position:absolute;  padding-top:0px; top: 12px;  margin-left:10px; width:1150px; z-index:99; } 
//.galleryHeadingContainer, .pageTabsContainer { width:980px; margin-left:252px; padding-left:10px; }
//#top { height: 75px!important }
#menubar   { 
    height: 32px;
    margin-bottom: 36px;
//    margin-left: 252px;
    z-index: 2; 
    width:990px;
    border-radius: 8px 8px 0 0;
}
h1,h2,h3,p { margin: 0 0 6px; } 
#contentArea {  
  background: #fff; 
  border-radius: 0 0 8px 8px;   
//  box-shadow: 0 0 10px 7px #222;
  margin-bottom: 20px;    
  padding-left: 10px;
  padding-bottom: 180px;
} 
#bottom     { position: relative;  } 
#bottom .hr { display: none; } 
#ticker p   { margin-left:252px; }
/* Privacy defs ======================================================================== */
#userbar       > li.more {display:none; }
#userbar:hover > li.more {display:block;}
#myprofilecontainer       .padding { display: none;  }
#myprofilecontainer:hover .padding { display: block; }
    
/* Frontpage defs ======================================================================== */
#jobs               { display: none; }
    
/* Reduce margins of news category tabs */
#fp_tabs_container  { margin-bottom: 10px; height: 31px; } 
#fp_tabs            { padding-top: 0; } 
table.highlights    { margin-bottom: 6px; } 
    table.highlights td { line-height: 1.4em; padding: 1px 0;	} 
table.highlights .type { line-height: 1.4em; padding: 1px 0; }
    
.articleColumn, .plan .content, .article { 	line-height: 1.32em;  }    
        
/* Move Image items to right top,  with greasemonkey move div into secondColumn */
#fpaItems { 
  margin-bottom: 5px;
  border: 1px solid #d0d0d0; 
  background: linear-gradient(#F5F6F6, #EDEEEE) repeat scroll 0 0 #EDEEEE;
//  background: #fff; 
  padding: 2px;
} 
.fpaItem {
  margin: 1px !important; 
  border: 1px solid #d0d0d0;
  position: relative; 
}
.fpaItemC {
  margin: 1px !important; 
  height: auto;
  border: 1px solid #d0d0d0;
  position: relative; 
}
.fpaItem div.imageContainer { width: 100%; }
.fpaItem img { margin-left: -42px; }
.fpaItem div.textContainer { 
    background-color: #000; opacity: 0.8; width: 100%; height: auto; 			
	font-size: 12px; line-height: 1.25em; padding: 2px; position: absolute; bottom: 0; 
}
/* Article details ====================================================================== */
.article          { line-height: 1.25em; }
.articleColumn    { line-height: 1.25em; }
.reactie          { line-height: 1.4em; }
.topBorder        { display: none; }
/*Frontpage Reacties   -  bitshape */ 
.reactie { background: #F5F5F6; border-left: 1px solid #BECFE3; } 
.reactie.last > .reactieContainer { border-left: 1px solid #F5F5F6; } 
.reactieBody.informative { background-color: #F7FBF6; border: 1px solid #C9EEC7; } 
.reactieBody.spotlight { background-color: #EFF8F2; border: 1px solid #22CF1A; } 
.reactieContainer .reactieHeader { background-color:#BECFE3!important; padding-left: 10px!important; padding-top: 1px!important; padding-bottom: 1px!important; } 
.reactieContainer .reactieContent { padding: 5px 0px 3px; } 
.reactieFooter .reactieReply { font-size: 10px!important; }
.eenReactie { margin-top: 5px; }
    
/* Review pages ====================================================================== */
#categoryBrowser { margin-bottom: 5px; }    
table.listing p { line-height: 1.4em;  }
.image a { margin-top: 1px; }
.popularEditorialReviewsBlock .image { padding-bottom: 4px; }    
/* Pricewatch pages ====================================================================== */
#tweakbase, #tabs { padding: 10px 5px 0; }
table.shop-listing td { padding: 0px; }
table.listing .price-score { padding-top: 2px;}
.filterOption { margin-bottom: 1px!important;  line-height: 18px; }
table.spec-detail td.spec-group-name { padding-top: 4px; }
table.spec-detail td { padding: 0px; }   
table.spec-detail td.spec-column { line-height: 1.25em; }
/* Vraag en aanbod pages =============================================================== */
.adDetails dt, .adDetails dd { padding: 2px 0; height: auto; line-height: 1.4em;}
    
/* Forum pages ====================================================================== */
#forum_tabs    { padding-top: 0; }
.forumList table.listing { margin-bottom: 10px; }
.channelHeader { display: none; }
#community li  { padding: 5px 0; }
table.listing td, table.listing th { padding: 1px; margin: 1px; border:1px; }
table.listing td.tags {	overflow: hidden; white-space: nowrap; }
#messages, .topic_actions { overflow: hidden; }
#messages div.message .messageheader { background-color: #ddd;}
#messages div.message {	margin-bottom: 0px; }
div.message { line-height: 1.25em; }
#title        { height: 50px; }
#title p.mods {	display: none; }
.pagecounter  { margin-top: 10px; }
.forumList:nth-child(3) table.listing tr th{ background-image: none; background-color: #A30028; } 
.forumList:nth-child(4) table.listing tr th{ background-image: none; background-color: #400072; } 
.forumList:nth-child(5) table.listing tr th{ background-image: none; background-color: #0E8F1D; } 
.forumList:nth-child(6) table.listing tr th{ background-image: none; background-color: #BD3500; } 
.forumList:nth-child(7) table.listing tr th{ background-image: none; background-color: #04926C; } 
.forumList:nth-child(8) table.listing tr th{ background-image: none; background-color: #A57D00; } 
.forumList:nth-child(9) table.listing tr th{ background-image: none; background-color: #A57D00; }

           
/* Tracker ========================================================================= */
#tracker .trackeritem li { padding: 1px 0 1px 3px; }
/* User galleries ================================================================== */
.galleryHeading .karma   { padding-top: 0; }
.galleryHeading .karma p { display: inline;	margin-right: 5px;	}
]]></>).toString());
if ( $('#fpaItems').length > 0) {
    // move newsimages into secondcolumn div only on newspage and set correct size
    if ($('div.mainlist').length > 0 ) {              // review page
        $('#fpaItems div.fpaItem').each(function() {
           $(this).css('width' ,'117px');             // 8 on a row
           $(this).css('height','101px');
        });
    } else {                                          // news page
        $('#fpaItems').insertBefore('#b_re');    
        $('#fpaItems div.fpaItem').each(function() {
           $(this).css('width' ,'161px');             // 2x2 square
           $(this).css('height','101px');
        });
    }
}
// ------------------- Move selective type of FP articles, to the secondColumn  (Blue-eagle adapted)
var displaceFPItems = [
    { iconClass: "video", fpItemID: "videos", link: "/video/", title: "Video's", max: 4 },
    { iconClass: "review", fpItemID: "reviews", link: "/reviews/", title: "Reviews", max: 3 },
    { iconClass: "download", fpItemID: "downloads", link: "/meuktracker/", title: "Downloads", max: 3 },
    { iconClass: "plan", fpItemID: "plans", link: "/plan/", title: ".plans", max: 1 }
];
for(var i = 0; i != displaceFPItems.length; i++) {
    var obj = displaceFPItems[i];
    var content = '';
    var no=0;
    $("tr:has(span."+ obj.iconClass +")").each(function() {
        no=no+1;
        if (no < obj.max) {
            var theLink = $(this).find("td a").clone().wrap('<p>').parent().html();
            var theIcon = $(this).find("td.type span").clone().wrap('<p>').parent().html();
            content = content + '<tr><td class="type" valign="top">' + theIcon + '</td><td>'+ theLink + '</td></tr>';
        }
        $(this).remove();
    });
    if (content != '') {  // add it if something was found
       $('<div class="fpItemC"><h2><a href="'+ obj.link +'">'+ obj.title +'</a></h2><table class="highlights"><tbody>' + content + '</tbody></table></div>').insertBefore("#b_re");
    }
}
// --- hide empty days, due to the above moves
$('table.highlights tbody').each(function() {
    if (!$.trim($(this).text())) {
        $(this).parent().prev().css('display','none');
        $(this).parent().css('display','none');
    }
});
// --- remove details from pricewatchbox on the frontpage
$('#pricewatch h3').each(function() {
        $(this).remove();
});
$('#pricewatch ul').each(function() {
        $(this).remove();
});

if ($('.shop-listing').length > 0 ) {
  $(".shop-clickout").css('padding','1px');
}

// ---- Pricewatch details:  reduce height and put images on secondcolumn
if ($('#tab\\:specificaties').length > 0 ) {
  // make a main and secondcolumn 
  $("div.tab_active").wrap('<div class="mainColumn" />');
  var html = '<div class="secondColumn"><div id="priceimages"><table></table></div></div><br class="clear">' ;
  $(html).appendTo("#contentArea");
    
  $("#priceimages").css('width','250px');
  $("tr td:contains('Afbeeld')").each(function(){
       //        $(this).parent().css('display','none');
      $(this).parent().appendTo('#priceimages table');    
      $(this).remove();
  });
}



jQuery(document).ready(function($) {
    // -- this must be here, because of script inside tweakbase, breadcrums
    $('#top #tabs').insertAfter('#top');    
    $('#top #tweakbase').insertAfter('#top');    
    $('#top .pageTabsContainer').insertAfter('#top');    
    $('#top .galleryHeadingContainer').insertAfter('#top');    
    $('#listing .shop-name').each(function() {
        $(this).css('font-size','12px');
    });
});
