// ==UserScript==
// @name           Google Images Enhancer
// @author         Keyser Söze
// @namespace	   http://userscripts.org/users/KeyserSoze
// @homepageURL    https://userscripts.org/scripts/show/150950
// @website        http://userscripts.org/scripts/show/150950
// @updateURL      https://userscripts.org/scripts/source/150950.meta.js
// @installURL     https://userscripts.org/scripts/source/150950.user.js
// @downloadURL    https://userscripts.org/scripts/source/150950.user.js
// @icon           http://files.myopera.com/TrikiTran/albums/11598242/avatar117399_1.gif
// @description    Mejora Tu Experiencia Al Navegar En Google IMÁGENES | Improves Your Browsing Experience In Google IMAGES.
// @grant          GM_addStyle
// @version        2.0
// @include        htt*://*.google.*/*tbm=isch*
// @include        htt*://*.google.*/images?*
// @include        htt*://images.google.*/search?*imghp*
// @include        htt*://*.google.*/search?*
// @include        htt*://*.google.*/
// @include        htt*://*.google.*/firefox
// @exclude        htt*://*.google.com/
// @exclude        htt*://*.google.tld/
// @exclude        htt*://*.google.*/mail/*
// Basado en	   "Google Enlarge", "PicViewer" & "Greased LightBox"... Así que, muchas gracias a los autores originales!
// Based on 	   "Google Enlarge", "PicViewer" & "Greased LightBox"... So, many thanks to original authors
// ==/UserScript==

(function() {

/*
		=============================
		|| Google From Dusk 2 Dawn ||
		=============================
*/

{	var css = "#pmocntr2,#gt-bbar{display:none!important}select,select > button{-moz-appearance:none!important;-webkit-appearance:none!important}*{color:hsl(0,0%,80%);outline:none!important}h1,h2,h3,h4,h5,h6,strong,span,select,#rhs *,.jfk-button-standard,#sections-header,div[style=\"display:table-cell;padding-left:16px;font-size:13px;color:#222\"],.cell-header-label,.header-label,.sllabel,.goog-slider li,#srchButton,.ksb,.ab_button{color:hsl(0,0%,80%)!important}a{color:hsl(240,99%,73%)!important}a:hover,a:active,#gbz .gbts:hover{color:hsl(0,0%,85%)!important;text-shadow:0 0 5px hsla(0,0%,90%,.9)!important;-moz-transition:text-shadow .2s ease!important;-webkit-transition:text-shadow .2s ease!important}  a:visited{color:hsla(105,66%,39%,.6)!important} .f,#pocs,.gt-baf-word{color:hsl(240,96%,90%)!important} .goog-menuitem-highlight div,.goog-option-selected .goog-menuitem-content{color:hsl(0,0%,99%)!important} b,em,.gt-baf-pos,#lc a,.tbou > a.q, #tbpi,#tbtro,.tbt label,#prc_opt,#set_location_section a,.tbtctlabel,#swr a{color:hsl(240,99%,80%)!important} #gt-src-wrap *,#gt-res-wrap *{color:hsl(0,0%,0%)!important}html,body,div[style=\"border-bottom:1px solid #dedede;height:57px\"],#gbx1,#gbx2,.rg_hv,.uh_hv,li.g.psgi:hover,#il_m,#il_ic{background:hsl(0,0%,5%)!important} .c,.gssb_c,.gssb_c td,#nycp,select{background-color:hsl(0,0%,17%)!important} select > button,.gbxms{background-color:hsla(0,0%,17%,.6)!important} select > optgroup{background-color:hsl(0,0%,6%)!important} #nycp{background-color:hsl(0,0%,28%)!important} #gt-src-wrap{background-color:hsl(0,0%,66%)!important} #gt-res-wrap,.close_lk{background-color:hsl(0,0%,77%)!important} .gssb_a span *,.gbto #gbs,#gbx3,#gbx4,.lst-d,.lst-t,.ab_wrp,#appbar,.lhshdr,.tphdr,#tbbcc,.rshdr{background:transparent!important}  #header,#footer,.signin-box,.accountchooser-box,.google-header-bar,#leftnav,#tbdi,#hidden_modes,#hmp,#sc-block .sc,#leftnav a,#gt-appbar,#gt-ft-res,.goog-menuitem-content,div.bottom-links-wrapper,.gssb_m,.gbgt-hvr #gbgs3,#gbg3:focus #gbgs3,#gbg3:active #gbgs3,.flyr-o,.flyr-w,#advd-search-header h1{background-color:transparent!important}#bms *,#gbx1,#gbx2,div[style=\"border-bottom:1px solid #dedede;height:57px\"],.google-header-bar,#footer,#footer > div,.google-footer-bar,#top-content,#header,#gt-ft-res,#nycp,.gstl_0.gssb_c *,.lst-d,.lst-d:hover{border-color:transparent!important}.gbm ol *,.c,.appbar_b,div.splitter,.ab_dropdownrule,.ab_wrp{border-color:hsla(0,0%,6%,.6)!important}.gsq_a tr{border:2px solid transparent!important} button:not(#nycx):not(.eswd),.vsh.nyc_opening .vsc:hover .vspii,.vsh.nyc_open .vsc:hover .vspii,.vso .vspii,.jfk-button-standard,.jfk-button,.g-button,select,.cpbb,.kpbb,.kprb,.kpgb,.kpgrb,.ksb,.ab_button{border:hsl(0,0%,70%) 2px ridge!important}button,select,select > optgroup,select > option,.vsh.nyc_opening .vsc:hover .vspii,.vsh.nyc_open .vsc:hover .vspii,.vso .vspii,.mitem,.msel .kls,.c,.gbmc,.gssb_c,.gssb_c table,.goog-flat-menu-button,.gsq_a span,.jfk-button-standard,.jfk-button,.g-button,.rgsh,.cpbb,.kpbb,.kprb,.kpgb,.kpgrb,.ksb,.ab_button,#taw div,.selector,.ab_dropdownitem,ol,ul,li,.goog-menuitem,#gt-src-wrap,#gt-res-wrap,#nycp,.rg_hv,.uh_hv,.gssb_a td,.gssb_e,#srchButton,#il_ic,#il_fi,.close_lk{border-radius:4px!important} img,.rg_i{border-radius:2px!important}.rg-hi,.rg_hv:hover,#rhs,#nycp,.uh_hv,li.g.psgi:hover{border-radius:6px!important;box-shadow:1px 1px 2px #000,-1px -1px 2px hsl(0,0%,32%),2px 6px 16px 5px hsl(0,0%,0%)!important} .lst-d:hover{box-shadow:none!important}.goog-menu,.gbmc,.ab_dropdown{-moz-appearance:none!important;-webkit-appearance:none!important;background:hsl(60,3%,6%) -moz-linear-gradient(left,hsl(0,0%,6%),hsl(0,0%,28%))!important;background:hsl(60,3%,6%) -webkit-linear-gradient(left,hsl(0,0%,6%),hsl(0,0%,28%))!important;background-repeat:repeat!important;background-position:left!important;background-attachment:fixed!important;text-shadow:1px 1px 1px hsl(0,0%,0%)!important;border-radius:6px!important;box-shadow:2px 2px 5px 5px hsl(0,0%,0%),1px 1px 3px hsl(0,0%,6%),-1px -1px 3px hsl(0,0%,28%)!important} #gbx3,#gsr .p_ksb{-moz-appearance:none!important;-webkit-appearance:none!important;background:-moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;background:-webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;text-shadow:1px 1px 1px hsl(227,32%,28%)!important;box-shadow:0 1px 5px hsl(0,0%,0%)!important} :not(select) > button:not(#nycx):not(.eswd),.vsh.nyc_opening .vsc:hover .vspii,.vsh.nyc_open .vsc:hover .vspii,.vso .vspii,#gbgs4,.gbgs,.kpbb,.g-button,.jfk-button,.goog-flat-menu-button,.cpbb,.kpbb,.kprb,.kpgb,.kpgrb,.ksb,.ab_button,.goog-button-base-pos,#srchButton{-moz-appearance:none!important;-webkit-appearance:none!important;background:transparent!important;background-image:-moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;background-image:-webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;text-shadow:1px 1px 3px hsl(0,0%,0%)!important;box-shadow:1px 1px 5px hsl(0,0%,0%),-1px -1px 5px hsl(219,16%,32%)!important}button:not(#nycx):not(.eswd):hover,.mitem:hover,.vsh.nyc_opening .vsc:hover .vspii,.vsh.nyc_open .vsc:hover .vspii,.vso .vspii:hover,#gbgs4:hover,.gbgs:hover,.kpbb:hover,.g-button:hover,.jfk-button:hover,.gbto .gbts,.gbmcc li:hover,.ab_dropdownlnk:hover,.ab_dropdownlnkinfo:hover,.goog-menuitem:hover,.cpbb:hover,.kpbb:hover,.kprb:hover,.kpgb:hover,.kpgrb:hover,.ksb:hover,.ab_button:hover,.scroll-tree li a:hover,.selector:hover,.lhn-section-primary:hover,.ab_dropdownitem:hover,#gsr .p_ksb:hover,#doodle-site-navigation li a:hover,.gbmcc.gbsbic li a:hover,.goog-toolbar-button:hover,.goog-flat-menu-button:hover,select > option:hover,.gssb_a td:hover,#srchButton:hover{-moz-appearance:none;-webkit-appearance:none;background:-moz-radial-gradient(center bottom,hsla(123,50%,65%,.6),transparent), -moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;background:-webkit-radial-gradient(center bottom,hsla(123,50%,65%,.6),transparent), -webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;-moz-transition:background-color .1s ease-in!important;-webkit-transition:background-color .1s ease-in!important;outline:none!important;opacity:1.0!important;color:hsl(0,0%,99%)!important;text-shadow:1px 1px 1px hsl(0,0%,0%),0 0 2px hsla(123,50%,50%,.8)!important} button:not(#nycx):not(.eswd):hover,.mitem:hover,.vsh.nyc_opening .vsc:hover .vspii,.vsh.nyc_open .vsc:hover .vspii,.vso .vspii:hover,#gbgs4:hover,.gbgs:hover,.kpbb:hover,.g-button:hover,.jfk-button:hover,.gbto .gbts,.gbmcc li:hover,.ab_dropdownlnk:hover,.ab_dropdownlnkinfo:hover,.goog-menuitem:hover,.gsq_a tr:hover span,.cpbb:hover,.kpbb:hover,.kprb:hover,.kpgb:hover,.kpgrb:hover,.ksb:hover,.ab_button:hover,.scroll-tree li a:hover,.selector:hover,.lhn-section-primary:hover,.ab_dropdownitem:hover,#gsr .p_ksb:hover,.mitem:hover,.goog-flat-menu-button:hover,select > option:hover,#srchButton:hover,.close_lk:hover{-moz-appearance:none;-webkit-appearance:none;border-color:hsla(123,50%,75%,.6) hsla(123,50%,65%,.6) hsla(123,50%,55%,.6)!important;box-shadow:0 0 10px hsl(123,50%,75%)!important;-moz-transition:border-color .2s ease,box-shadow .3s ease!important;-webkit-transition:border-color .2s ease,box-shadow .3s ease!important} li.selected,.msel .kls,.goog-option-selected,.rgsh,#scrollable-sections .tree-link-selected,.selector.selected,#tbbc,.goog-toolbar-button-selected,.goog-toolbar-button-checked,.goog-toolbar-menu-button-open,.goog-option-selected .goog-menuitem-content{background-image:-moz-radial-gradient(center bottom,hsl(123,99%,55%),transparent),-moz-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;background-image:-webkit-radial-gradient(center bottom,hsl(123,99%,55%),transparent),-webkit-linear-gradient(top,hsl(0,0%,33%) 48%,hsl(0,0%,20%) 49%,hsl(0,0%,0%) 85%,hsl(0,0%,20%))!important;-moz-transition:all .3s!important;-webkit-transition:all .3s!important}.gbqfqw,#lst-ib,input[type=\"email\"],input[type=\"number\"],input[type=\"password\"],input[type=\"tel\"],input[type=\"url\"],.signin-box input[type=\"text\"],.advtable input[type=\"text\"],#newu,#search_box,.as-text-input,.as-table-cont td input[type=\"text\"],.ktf{-moz-appearance:none!important;-webkit-appearance:none!important;font-weight:bold!important;box-shadow:1px 1px 5px hsl(0,0%,0%) inset,0 -1px 1px 1px hsl(240,20%,30%) inset!important;background:hsl(0,0%,17%)!important;text-shadow:1px 1px 1px hsla(123,99%,89%,.6),-1px -1px 1px hsl(0,0%,0%)!important;color:hsl(0,0%,80%)!important;border-radius:50px!important;border:none!important;padding-left:4px!important}#lga > *{opacity:0!important}#lga {background:transparent url(\"https://lh6.ggpht.com/_6Bqt_HqYues/THR8YbT0qxI/AAAAAAAAADc/NALhWF1Xjsk/logo.png\") top center no-repeat!important;height:100%!important;top:9px!important;margin-bottom:10px!important;background-size:contain!important}";
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
		heads[0].appendChild(node);}
  }
	var css = "*, \n* {cursor: \nurl(\"http://reloaded.site88.net/Data/aero_arrow.cur\"), \ndefault !important\n}\na, a \n* {cursor: \nurl(\"http://reloaded.site88.net/Data/aero_link.cur\"), \npointer !important\n}\nHtml, Div.Span\n, DIV.gb_yb.gb_3b, Div#LeftNav, Span.st, Div#fbar, Div.fbar, Div.gb_Ab.gb_5b, Div.gb_na.gb_5b.gb_k.gb_4b, Div.gb_t.gb_u, Div.gb_t.gb_A, UL.gb_v.gb_z, UL.gb_v.gb_Kb, Div#hdtbSum, Div#gbd, Div#gbmmb, a#gb, ol#gbmm, p.sp_cnt, Div#res.med, Div#center_col, Div#cnt.big, Div#LeftNavc, Div#gbx3, Div#hdtb_more_mn, a#hdtb_tls, Div#hdtbMenus, Box, A#ShowModes, Div#More_Link, Span.Tbpo, A#Tbpi, Div#Ms.Open, Div#Bms, Div.Insep, DIV.gb_yb.gb_Fb.gb_j, DIV.gb_fa.gb_Fb.gb_j.gb_Eb, DIV.gb_ib.gb_Fb, DIV#gb.gb_Bb.gb_1a, DIV#mngb, DIV#tphdr.tphdr,Box1, Box2, Box3, Box4, Box5, O1, Table, Div.Gbmc, #Gbmm, Li, Input, Input.Post, Body\n {\nBackground        : url(\"data:image/png;base64,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\") \nFixed Repeat Center!important\n; Background-color: Black !important\n; Color           : SkyBlue !important\n}\na:Link\n{\nColor: YellowGreen !important;\n}\na:Visited\n{\nColor: Plum !important;\n}\na:Hover\n{\nBackground-color: #222334 !important;\nText-decoration: none !important;\nColor: Teal !important;\n}\na.gbmt, a.gbml1, .gbmt:visited {\n  background-color: transparent !important;\n  color: Red !important;\n  border-color: #444 !important;\n  text-decoration: none !important}\n*, *:focus {outline: none !important}\n\nh1, h2, h3, h4, h5, h6, h1 *, h2 *, h3 *, .med, em, #rg_hta, .qbtt, .ss-link.ss-selected, td > font > b, #qbut b, #qbft b, a.spell, a.spell *, a.spell_orig, #gen-query .operator, .threadCountNumber, #popup_dialog_title, .settings-title, .thread-subject, .leftTitle, #conditions #temp, #conditions #condition, .mapBalloon .b {color: Yellow !important}\n#hplogo div, #ftby a, .page-title, .jhp input[type=\"submit\"], body > div[style*=\"fixed\"] > div > b, .rhsvw span > .fl, .rhsvw span > .fl b, .rhsvw span > b, .rhsvw fieldset > legend {color: #c75805 !important}\n\n.titleBox, .titleBox *, .tablib_selected .tab_content {color: #444 !important; text-shadow: 0 1px 0 #000 !important}\n\n.msel, .msel .kls, .tbos,  .tbos b, .tbots, .tbotu, #leftnav > h2, .selectedTab .kdSidebarContent > div, .cb .G-G- {color: Crimson !important}\n.a, .cite, cite, cite a, cite b, #ans > i, .f .bc, cite .bc, #rg_hr, #rg_hr a {color: Orange !important}\n.gac_b *, .gssb_i *, .esc.kb, .ac-row.active, .ac-row.active *, .dropdown-box > div:hover {color: Violet !important}\n.xsm, .psgiprice, .psliprice b, .selectionTools span, .pagination-div a, .f span[style*=\"background:#aaa;border:#999 1px solid;border-radius:2px;\"] {color: #F80 !important}\n#GMmessages a, .bubble .item-body a, .mapBalloon a, .item-body a, #weather .on a, #weather a.active, #weather .active a, #conditions #obsTable .b, #conditions #obsTable .b *, #stars table .b, #conditions .b {color: Purple !important}\n#leftnav a, #leftnav a *, .cb > div, .kdSidebarContent > div, .kdSidebar > div, #talk_title, a.ss-link, .fl > span {color: DeepSkyBlue !important}\n.f, .f span, .osl, .osl a, .bc a, .gl a, .esc > a, #knavm, .pslipricecol cite > a, .goog-date-picker-other-month, .RssSummary div, .RssEntryOuterContent, #bp-bd form span.small, .thread_table .read .thread, .read .subject_and_snippet, #views .Nk.Pk *,\n.tn-snippet, .tn-time, .tn-source, #container .source, #container .source-link {color: Cyan !important}\n.msel, #leftnav > h2 {font-weight: bold !important}\n.msel, #leftnav > h2, .tbos, .selectedTab div.kdTabTitle, .selectedGadgetTitle {text-shadow: 0 1px 0 rgba(0,0,0,0.5) !important}\n.gbts, #gbgs4dn {text-shadow: 0 1px 0 #000 !important}\n#knavm {text-shadow: 0 0 2px #000 !important}\n#content .uim .title-cell strong, #content .uim .callout strong, .thread_table .unread b, .thread_table .selected b, #views .Nk.Ok b {color: #FFF !important; text-shadow: 0 0 6px rgba(255,255,200,0.8) !important}\nspan.bd, .controls > b > a, td.goog-date-picker-month, td.goog-date-picker-year, th.goog-date-picker-wday {border-bottom: 1px dotted #444 !important}\n.f span[style*=\"background:#aaa;border:#999 1px solid;border-radius:2px;\"] {border-style: dashed !important}\n\n#res a:hover img, .videobox a:hover img, .vstb, .vsbb, .vstbb, .vstbt, a:hover .newsimg {border-color: #FA0 !important}\n.f span[style*=\"background:#aaa;border:#999 1px solid;border-radius:2px;\"] {border-color: #F80 !important}\n\na:hover, a:hover *, .link:hover, #gbgs4dn:hover, .cb > div:hover, .kdSidebarContent > div:hover, #sharesLink:hover, #updatesLink:hover, #friendsLink:hover, #talk_title:hover, .as-tip-span:hover, .g a:visited:hover, .g a:visited:hover *, #footer a:hover, #leftnav a:hover, #leftnav a:hover *, .chip_x:hover, .gsib_b:hover, #rg_hta:hover, .goog-date-picker-date:hover, #add_gadget:hover, #change_theme:hover, #themes_keep_theme_link:hover, .selectionTools span:hover, #GMmessages a:hover, .bubble .item-body a:hover {\n  color: LightPink !important;\n  text-shadow: 0 0 6px rgba(255,255,200,0.8) !important}\na.kd-button:hover *, a.nolink:hover {text-shadow: none !important; color: #999 !important}\ntd.menulist:hover {\n  color: #BBB !important;\n  background: -o-linear-gradient(left, #333, #111) !important;\n  background: -moz-linear-gradient(left, #333, #111) !important;\n  background: -webkit-linear-gradient(left, #333, #111) !important}\n\n.vst {border-bottom: 1px dotted #666 !important}\n.g a:visited, .g a:visited * {color: DarkCyan !important}";
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
}{
    
/*
		================================
		|| Google Images Enhancements ||
		================================
*/

var doubleDecodeURIComponent = function (component){
  var tmp = decodeURIComponent(component);
  tmp = decodeURIComponent(tmp);
  return tmp;
}

var parseUrl = function (url) {
  var qstr = url.split('?');
  if (qstr.length <= 1)
    return [];
  var rawparams = qstr[1].split('&');
  var par = [];
  for (var i=0 ; i<rawparams.length ; i++){
    var p = rawparams[i].split("=");
    par[p[0]] = p[1];
  }
  return par;
}

var getImageLinks = function (url) {
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = decodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["url"]);
  return links;  
}

var getNewImageLinks = function (url) {
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = doubleDecodeURIComponent(param["imgurl"]);
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}

var firstOrNull = function (elems) {
  return (elems.length > 0 ) ? elems[0] : null;
}

var imgTable = firstOrNull(document.getElementsByClassName('images_table'));
if ( imgTable ) { // for basic version
  var imgCell = imgTable.getElementsByTagName('td');
  for( j=0 ; j<imgCell.length ; j++ ) {
    var imageAnchor = imgCell[j].getElementsByTagName('a')[0];
    var domainText =  imgCell[j].getElementsByTagName('cite')[0];
    console.log(imageAnchor.href);
    var links = getImageLinks(imageAnchor.href);
    //links.toPageHref = imageAnchor.href; // TODO fixme
    links.toImgHref = imageAnchor.href; // TODO fixme
    
    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '/&hellip;<\a>';
    imageAnchor.href = links.toImgHref;
  }
}
else { // standard version
  console.log("standard version");
  var stopEvent = function(event){ event.stopPropagation() }
  
  var fixStyle = function(target){
    var parent = target.parentNode;
    parent.style.height = target.style.height;
    parent.style.width = target.style.width;
    parent.style.left = target.style.left;
    target.style.left = 'auto';
  }
  
  var fixBoxObserver = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation) {
      var target = mutation.target;
      var parent = mutation.target.parentNode;
      if (mutation.attributeName === 'style' && target.style.left !== 'auto'){
	fixStyle(target);
      }
    });
  });
  var fixBoxMutationConfig = { attributes: true, childList: true, characterData: false, subtree: false };
    
  var fixImageBox = function(image){
    if ( /\blinkOk\b/.test(image.className) ) {
      return;
    }
    var span = image.querySelector('span.rg_ilmn');
    if (span !== null) {
      var a = firstOrNull(image.getElementsByTagName('a'));
      var links = getNewImageLinks(a.href);
      a.href = links.toImgHref;
      a.addEventListener('click', stopEvent, false);
	  a.addEventListener('mousedown', stopEvent, false);

      var newContainer = document.createElement('div');
      newContainer.className = 'newCont';

      a.parentNode.appendChild(newContainer);
      newContainer.appendChild(a);
      newContainer.appendChild(span.parentNode);

      fixStyle(a);
      
      var desc = span.innerHTML;
      span.innerHTML = '<a style="color:#fff" href="' + links.toPageHref + '">' + desc + '</a>';
      image.className += ' linkOk'
      fixBoxObserver.observe(a, fixBoxMutationConfig);
    }
    else {
      console.log("incomplete span");
      image.className += ' notComplete';
    }
  }
 
  var fixImages = function(){
    var imagesContainer = document.getElementById('rg_s');
	if ( imagesContainer == null ) return;
    var images = imagesContainer.getElementsByClassName('rg_di');
    for (var i = 0 ; i< images.length ; i++) {
      fixImageBox(images[i]);
    }
  }
  
  var newBoxMutationConfig = { attributes: false, childList: true, characterData: false, subtree: true };
  var newBoxObserver = new MutationObserver(function(mutations){
    var needFix = false;
    mutations.forEach(function(mutation) {
      needFix = needFix || mutation.target.id == 'rg_s';
    });
    if (needFix)
      fixImages();
  });

  fixImages();
  newBoxObserver.observe(document.body, newBoxMutationConfig);

  var css = [];  var i = 0;
  css[i++] = '.newCont { position: relative; }';
  css[i++] = '.newCont .rg_ilmbg { display: none; }';
  css[i++] = '.newCont:hover .rg_ilmbg { display: block; }';
  
  css[i++] = '.imgSiteLnk {'; ///img preview
  css[i++] = '  background-color: rgba(255, 255, 255, 0.77);';
  css[i++] = '  bottom: 0;';
  css[i++] = '  color: #000000;';
  css[i++] = '  display: block;';
  css[i++] = '  line-height: normal;';
  css[i++] = '  position: absolute;';
  css[i++] = '  text-decoration: none;';
  css[i++] = '  width: 100%; ';
  css[i++] = '  display: none }';
  css[i++] = '.imgPrev:hover .imgSiteLnk { display: block }';///img preview
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css.join('\n')));
  document.head.appendChild(style);

  ///img preview in google search (only links to page)
  var fixImagePreview = function(div){
	var images = document.getElementsByClassName('bicc');
	for (var i = 0 ; i<images.length ; i++) {
		var div = images[i];
		var el = div.getElementsByTagName('a');
		if ( el.length == 1 ) {
			div.className += ' imgPrev';
			//div.style.border = '4em solid black';
			var href = el[0].href;
			var link = doubleDecodeURIComponent(parseUrl(href)['imgil']);
			link = decodeURIComponent(link.split(';')[5]);
			
			var a = document.createElement('a');
			a.href = link;
			a.className = 'imgSiteLnk';
			a.textContent = link.split('/')[2];
			div.appendChild(a);
		}
	}
  }
  var searchObserver = new MutationObserver(function(mutations){
	fixImagePreview();
  });
  searchObserver.observe(document.body, 
	{ 
		attributes: false, 
		childList: true, 
		characterData: false, 
		subtree: true 
	}
	);
  
  // visually similar search img preview (oly links to image)
  var similars = document.querySelectorAll('div._mj a');
  console.log(similars.length)
  for (var i = 0 ; i < similars.length ; i++){
	var a = similars[i];
	var href = getNewImageLinks(a.href);
	console.log(href)
	if ( typeof href.toImgHref === 'undefined' ) {
		console.log('skip')
		continue;
	}
	console.log(href.toImgHref)
	var newA = document.createElement('a');
	newA.href = href.toImgHref;
	newA.appendChild(a.firstChild);
	a.parentNode.replaceChild(newA, a);
  }

}

}{

/*		=================================
		|| Additional Google SearchBar ||
		=================================
*/

var langs = {
	'':'-'
	,'Any Language': '-'
	,'Spanish': 'es'
	,'Russian': 'ru'
	,'Portuguese': 'pt'
	,'Italian': 'it'
	,'Greek': 'el'
	,'German': 'de'
	,'French': 'fr'
	,'English': 'en'
	,'==========': '-'
	,'Afrikaans': 'af'
	,'Arabic': 'ar'
	,'Armenian': 'hy'
	,'Belarusian': 'be'
	,'Bulgarian': 'bg'
	//,'Catalan': 'ca'
	,'Chinese': 'zh-CN'
	//,'Chinese (Traditional)': 'zh-TW'
	,'Croatian': 'hr'
	,'Czech': 'cs'
	,'Danish': 'da'
	,'Dutch': 'nl'
	//,'Esperanto': 'eo'
	,'Estonian': 'et'
	,'Filipino': 'tl'
	,'Finnish': 'fi'
	,'Hebrew': 'iw'
	,'Hindi': 'hi'
	,'Hungarian': 'hu'
	,'Icelandic': 'is'
	,'Indonesian': 'id'
	,'Japanese': 'ja'
	,'Korean': 'ko'
	,'Latvian': 'lv'
	,'Lithuanian': 'lt'
	,'Norwegian': 'no'
	,'Persian': 'fa'
	,'Polish': 'pl'
	,'Romanian': 'ro'
	,'Serbian': 'sr'
	,'Slovak': 'sk'
	,'Slovenian': 'sl'
	//,'Swahili': 'sw'
	,'Swedish': 'sv'
	,'Thai': 'th'
	,'Turkish': 'tr'
	,'Ukrainian': 'uk'
	,'Vietnamese': 'vi'
};

var filetypes = {
	'':'-'
	,'Any Format': '-'
	,'Adobe PDF (.pdf)': 'pdf'
	,'Adobe Postscript (.ps)': 'ps'
	,'Autodesk DWF (.dwf)': 'dwf'
	,'Digital Audio M4A (.m4a)': 'm4a'
	,'Digital Audio MP3 (.mp3)': 'mp3'
	,'Digital Video Avi (.avi)': 'avi'
	,'Digital Video MP4 (.mp4)': 'mp4'
	,'Digital Video MKV (.mkv)': 'mkv'
	,'Excel Datasheet(.xls)': 'xls'
	,'Google Earth KML (.kml)': 'kml'
	,'Google Earth KMZ (.kmz)': 'kmz'
	,'Metadata File (.torrent)': 'torrent'
	,'PowerPoint (.ppt)': 'ppt'
	,'Rich Text Format (.rtf)': 'rtf'
	,'Shockwave Flash (.swf)': 'swf'
	,'WinRAR Archiver (.rar)': 'rar'
	,'Word Document (.doc)': 'doc'
};

var sitesearches = {
	'':'-'
	,'Any Site': '-'
	,'AvaxHome': 'avaxho.me'
	,'Ba-K': 'ba-k.com'
	,'EbookBrowse': 'ebookbrowse.com'
	,'EbooksBay': 'ebooksbay.org'
	,'Education': '.edu'
	,'Fapdu': 'fapdu.com'
	,'FileShut': 'fileshut.com'
	,'Gobierno MX': '.gob.mx'
	,'Government': '.gov'
	,'IATE': 'iate.europa.eu'
	,'Identi': 'identi.li'
	,'Redalyc': 'redalyc.org'
	,'Taringa': 'taringa.net'
	,'Twilight': 'twilight.ws'

};

var holder = document.createElement('div')
	,cboLang = document.createElement('select')
	,cboFileType = document.createElement('select')
	,cboSiteSearch = document.createElement('select')
	,btnSearch = document.createElement('button')
	,searchBoxHolderID = 'gbqfw'
	,searchBoxID = 'gbqfq'
	,query = location.search;

/* Fill combo boxes */
for (var l in langs) {
		cboLang.innerHTML += '<option ' + 
			((query.indexOf('&lr=lang_' + langs[l]) !== -1) ? 'selected="selected"' : '') + 
			'value="' + langs[l] + '">' + l + '</option>';
}

for (var f in filetypes) {
	cboFileType.innerHTML += '<option ' + 
			((query.indexOf('&as_filetype=' + filetypes[f]) !== -1) ? 'selected="selected"' : '') + 
			'value="' + filetypes[f] + '">' + f + '</option>';
}

for (var s in sitesearches) {
	cboSiteSearch.innerHTML += '<option ' + 
			((query.indexOf('&as_sitesearch=' + sitesearches[s]) !== -1) ? 'selected="selected"' : '') + 
			'value="' + sitesearches[s] + '">' + s + '</option>';
}

/* Add elements to the page */
holder.setAttribute('style','background-color:inherit;border:1px solid inherit;padding:1px 5px;');
holder.appendChild(document.createTextNode(' Language: '));
holder.appendChild(cboLang);
holder.appendChild(document.createTextNode(' File Type: '));
holder.appendChild(cboFileType);
holder.appendChild(document.createTextNode(' Site: '));
holder.appendChild(cboSiteSearch);
btnSearch.appendChild(document.createTextNode('Search'));
btnSearch.setAttribute('style','margin-left:5px;');
holder.appendChild(btnSearch);
document.getElementById(searchBoxHolderID).appendChild(holder);

/* Search with customized settings */
btnSearch.onclick = function () {
	var selectedLang = cboLang.options[cboLang.selectedIndex].value
		,searchTerm = document.getElementById(searchBoxID).value.replace(/ +filetype:[^ ]*/gi, '')
		,selectedFileType = cboFileType.options[cboFileType.selectedIndex].value
		,searchTerm = document.getElementById(searchBoxID).value.replace(/ +OR+sitesearch:[^ ]*/gi, '')
		,selectedSiteSearch = cboSiteSearch.options[cboSiteSearch.selectedIndex].value
		,lang = (selectedLang == '-') ? '' : ('&lr=lang_' + selectedLang)
		,filetype = (selectedFileType == '-') ? '' : ('&as_filetype=' + selectedFileType)
		,sitesearch = (selectedSiteSearch == '-') ? '' : ('&as_sitesearch=' + selectedSiteSearch)
		,url = location.protocol + '//' + location.host + '/search?q=' + encodeURIComponent(searchTerm) + lang + filetype + sitesearch;
	
	window.location.replace(url);
};

}{

/*
		========================================
		|| Pictures Viewer & Greased LightBox ||
		========================================
*/

(function(topObject,window,document){
	'use strict';

	function init(topObject,window,document,arrayFn,envir){
		//一些设定。
		var prefs={
			floatBar:{//浮动工具栏相关设置.
				butonOrder:['actual','current','magnifier','gallery'],//按钮排列顺序'actual'(实际的图片),'current'(当前显示的图片),'magnifier'(放大镜观察),'gallery'(图集)
				showDelay:366,//浮动工具栏显示延时.单位(毫秒)
				hideDelay:566,//浮动工具栏隐藏延时.单位(毫秒)
				position:'top left',// 取值为: 'top left'(图片左上角) 或者 'top right'(图片右上角) 'bottom right'(图片右下角) 'bottom left'(图片左下角);
				offset:{//浮动工具栏偏移.单位(像素)
					x:-15,//x轴偏移(正值,向右偏移,负值向左)
					y:-15,//y轴偏移(正值,向下,负值向上)
				},
				forceShow:{//在没有被缩放的图片上,但是大小超过下面设定的尺寸时,强制显示浮动框.(以便进行旋转,放大,翻转等等操作)..
					enabled:true,//启用强制显示.
					size:{//图片尺寸.单位(像素);
						w:166,
						h:166,
					},
				},
				minSizeLimit:{//就算是图片被缩放了(看到的图片被设定了width或者height限定了大小,这种情况下),如果没有被缩放的原图片小于设定值,那么也不显示浮动工具栏.
					w:100,
					h:100,
				},
			},

			magnifier:{//放大镜的设置.
				radius:77,//默认半径.单位(像素).
				wheelZoom:{//滚轮缩放.
					enabled:true,
					pauseFirst:true,//需要暂停(单击暂停)后,才能缩放.(推荐,否则因为放大镜会跟着鼠标,如果放大镜过大,那么会影响滚动.)..
					range:[0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放的范围
				},
			},

			gallery:{//图库相关设定
				fitToScreen:false,//图片适应屏幕(适应方式为contain，非cover).
				sidebarPosition:'bottom',//'top' 'right' 'bottom' 'left'  四个可能值
				sidebarSize:130,//侧栏的高（如果是水平放置）或者宽（如果是垂直放置）
				preload:true,//对附近的图片进行预读。
				max:5,//最多预读多少张（前后各多少张）
			},

			imgWindow:{//图片窗相关设置
				fitToScreen:false,//适应屏幕,并且水平垂直居中(适应方式为contain，非cover).
				defaultTool:'hand',//"hand","rotate","zoom";打开窗口的时候默认选择的工具
				overlayer:{//覆盖层.
					shown:false,//显示
					color:'rgba(0,0,0,0.73)',//颜色和不透明度设置.
					clickToClose:[true,'click'],//[是否使用点击关闭窗口 "true,false"，关闭触发方式，"click,dblclick"]
				},
				zoom:{//滚轮缩放
					range:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.7,1.9,2,2.5,3.0,4.0],//缩放比例.(不要出现负数,谢谢-_-!~)
					mouseWheelZoom:true,//是否允许使用滚轮缩放。
				},
			},

			//旋转的时候，按住shift键时,旋转的步进.单位:度.
			shiftRotateStep:15,

			//等图片完全载入后,才开始执行弹出,放大等等操作,
			//按住ctrl键的时候,可以临时执行和这个设定相反的设定.
			waitImgLoad:true,

			//框架里面的图片在顶层窗口展示出来，但是当frame与顶层窗口domain不一样的时候，可能导致图片被反盗链拦截，
			//按住shift键，可以临时执行和这个设定相反的设定
			framesPicOpenInTopWindow:true,
		};


		//各网站高级规则;
		var siteInfo=[
			{siteName:"google图片搜索",
				//网址例子.(方便测试.查看.之类的)
				siteExample:"http://www.google.com.hk/search?q=opera&tbm=isch",
				//是否启用
				enabled:true,
				//站点正则
				url:/https?:\/\/www.google(\.\w{1,3}){1,3}\/search\?.*&tbm=isch/,
				//鼠标左键点击直接打开..（这个只是当高级规则的getImage()返回图片的时候生效）
				clikToOpen:{
					enabled:true,
					preventDefault:true,//是否尝试阻止点击的默认行为（比如如果是你点的是一个链接，默认行为是打开这个链接，如果是true，js会尝试阻止链接的打开(如果想临时打开这个链接，请使用右键的打开命令)）
					type:'actual',//默认的打开方式: 'actual'(弹出,原始图片) 'magnifier'(放大镜) 'current'(弹出,当前图片)
				},
				//获取图片实际地址的处理函数,
				//this 为当前鼠标悬浮图片的引用,
				//第一个参数为当前图片的引用,
				//第二个参数为包裹当前图片的第一个a元素(可能不存在).
				getImage:function(img,a){
					if(!a)return;
					return (a.href.match(/imgurl=(.*?\.\w{1,5})&/i) || [])[1]; 
				},
			},
			{sitename:"百度图片搜索",
				enabled:true,
				url:/^https?:\/\/image\.baidu\.com\/i\?/i,
				getImage:function(img,a){
					var origin=img.dataset['origin'];
					if(origin){
						return origin
					}else{
						if(a){
							var onclick=a.getAttribute('onclick');
							if(onclick){
								return (onclick.match(/u:'(https?:\/\/[^']+)'/i) || [])[1];
							};
						};
					};
				},
			},
			{sitename:"豆瓣",
				siteExample:"http://movie.douban.com/photos/photo/1000656155/",
				enabled:true,
				url:/^https?:\/\/[^.]*\.douban\.com/i,
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/\/view\/photo\/photo\/public\//i,'/view/photo/raw/public/');
					if(newsrc!=oldsrc)return newsrc;
				}
			},
			{sitename:"deviantart",
				enabled:true,
				url:/^https?:\/\/[^.]*\.deviantart\.com/i,
				siteExample:"http://www.deviantart.com",
				getImage:function(){
					var oldsrc=this.src;
					var newsrc=oldsrc.replace(/(http:\/\/[^\/]+\/fs\d+\/)200H\/(.*)/i,'$1$2');
					return newsrc==oldsrc? '' : newsrc;
				},
			},
			{sitename:"opera官方论坛",
				enabled:true,
				url:/^http:\/\/bbs\.operachina\.com/i,
				siteExample:"http://bbs.operachina.com",
				getImage:function(){
					var src=this.src;
					if(/file.php\?id=\d+$/i.test(src)){
						return src+'&mode=view';
					};
				},
			},
			{sitename:"QQ微博",
				enabled:true,
				url:/^http:\/\/[^\/]*t\.qq\.com\//i,
				siteExample:"http://t.qq.com/p/news",
				getImage:function(img){
					var pic=/(\.qpic\.cn\/mblogpic\/\w+)\/\d+/i;//图片
					var head=/(\.qlogo\.cn\/mbloghead\/\w+)\/\d+/i;//头像.
					var oldsrc=this.src;
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1/2000');
						return newsrc==oldsrc? '' : newsrc;;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/0');
						return newsrc==oldsrc? '' : newsrc;;
					};
				},
			},
			{sitename:"新浪微博",
				enabled:true,
				url:/^http:\/\/weibo\.com/i,
				siteExample:"http://weibo.com/pub/?source=toptray",
				getImage:function(img){
					var oldsrc=this.src;
					var pic=/(\.sinaimg\.cn\/)(?:bmiddle|thumbnail)/i;//图片.
					var head=/(\.sinaimg\.cn\/\d+)\/50\//i;//头像.
					var photoList=/\.sinaimg\.cn\/thumb150\/\w+/i//相册
					var newsrc;
					if(pic.test(oldsrc)){
						newsrc=oldsrc.replace(pic,'$1large');
						return newsrc==oldsrc? '' : newsrc;
					}else if(head.test(oldsrc)){
						newsrc=oldsrc.replace(head,'$1/180/');
						return newsrc==oldsrc? '' : newsrc;
					}else if(photoList.test(oldsrc)){
						newsrc=oldsrc.replace('/thumb150/','/mw690/');
						return newsrc==oldsrc? '' : newsrc;
					};
				},
			},
			{sitename:"pixiv",
				enabled:true,
				url:/^http:\/\/www\.pixiv\.net/i,
				getImage:function(img){
					var oldsrc=this.src;
					var reg=/(\d+)(_\w)(\.\w{2,5})$/i
					if(reg.test(oldsrc)){
						return oldsrc.replace(reg,'$1$3');
					};
				},
			},
			{sitename:"沪江碎碎",
				enabled:true,
				url:/^https?:\/\/([^.]+\.)*(?:yeshj\.com|hjenglish\.com|hujiang\.com)/i,
				getImage:function(img){
					var oldsrc=this.src;
					var reg=/^(https?:\/\/(?:[^.]+\.)*hjfile.cn\/.+)(_(?:s|m))(\.\w+)$/i;
					if(reg.test(oldsrc)){
						return oldsrc.replace(reg,'$1$3');
					};
				},
			},
			{sitename:"百度贴吧",
				enabled:true,
				url:/^http:\/\/tieba\.baidu\.com\/.+/i,
				getImage:function(img){
					var src=img.src;
					var reg=/^(http:\/\/imgsrc\.baidu\.com\/forum\/)ab(pic\/item\/[\w.]+)/i
					var result=src.match(reg);
					if(result){
						return result[1]+result[2];
					}else{
						var id=img.id;
						if(id.indexOf('big_img_')==0){
							return src;
						};
					};
				},
			},
			{sitename:"178.com",
				enabled:true,
				url:/^https?:\/\/(?:\w+\.)+178\.com\//i,
				clikToOpen:{
					enabled:true,
					preventDefault:true,
					type:'actual',
				},
				getImage:function(img,a){
					if(!a)return;
					var reg=/^https?:\/\/(?:\w+\.)+178\.com\/.+?(https?:\/\/img\d*.178.com\/[^.]+\.(?:jpg|jpeg|png|gif|bmp))/i;
					var matched=a.href.match(reg);
					return (a.href.match(reg) || [])[1];
				},
			},
		];

		//通配型规则,无视站点.
		var tprules=[
			function(img,a){//解决新的dz论坛的原图获取方式.
				var reg=/(.+\/attachments?\/.+)\.thumb\.\w{2,5}$/i;
				var oldsrc=this.src;
				var newsrc=oldsrc.replace(reg,'$1');
				if(oldsrc!=newsrc)return newsrc;
			},
		];

		//图标
		prefs.icons={
			actual:'',
			magnifier:'',
			current:'',
			gallery:'',


			loading:'data:image/gif;base64,R0lGODlhGAAYALMPACgoKOnp6cnJyaamppmZmVhYWGdnZ3d3d4aGhgEBAdnZ2UNDQ/b29r29vbGx  sf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/  IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRv  YmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwg  MjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8v  d3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiBy  ZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxu  czp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0  dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9y  VG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9Inht  cC5paWQ6QUU5MTZGNDMxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiIHhtcE1NOkRvY3VtZW50SUQ9  InhtcC5kaWQ6QUU5MTZGNDQxQ0E4MTFFMkE1Q0NEMTFGODU0MkUzNzUiPiA8eG1wTU06RGVyaXZl  ZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTkxNkY0MTFDQTgxMUUyQTVDQ0QxMUY4  NTQyRTM3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRTkxNkY0MjFDQTgxMUUyQTVDQ0Qx  MUY4NTQyRTM3NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4g  PD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb  2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOi  oaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2pp  aGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEw  Ly4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAUFAA8A  LAAAAAAYABgAAATMMMlJq710GQQAMgBmLYMSKMuirMQiSocZnOlqH68h06qtFJhPomASEDoEwQpY  MFQWM2fhEJoADkyBwDVxMBgBp6igVBAm0C8D8YqtBFWDWlHFABo2MQLMGLwkCFoCbAkAKQt1IoaL  Eh2Of4WOVQUDBANiL4ENAjgJJAOViRYADoJAhZagpxgGgg11BqAtLwWbgxQABLMaiQAGLrUNXGgu  JA4EVB4DDQ7AmE8DDtIDHQ4N18200dIO1dfMq3YI0dSkDQMckI1NHb+i6vARACH5BAUFAA8ALAAA  AAABAAEAAAQC8EUAIfkEBQUADwAsAQABABYAFgAABJbwySkPoYtq6gILEzhsmsd8YQCS4YlK6roV  meEpY0gdE0AQNQRLolBMDoMBcEiUjHzJQYFJUSwW0QtVQCkoBwbqg1A0PgBo8SSj3mRqjjhPLVAI  444cs1EOD/BhQwdlXA8HcXpDdQpaD0lMcw8ChRJTEg4NiQ4CDZYsmA0NDhINk5yeG6ANE6WTq0MZ  mKMPpa9tcweoFBEAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFQAVAAAEgvDJ  +cAykhzKJzjEQABPwARONxXhIJImc6rP0r6lfGKqLfIDxe7Bk7gki0IHgSlKHI4BjRMIGKGpqaRq  fWC1FK4BuwGbz+gOqfFgmwkKhaRBPws4dPdZ3m5ktXwUWUoqhHEdBQ0CDggZDYGFigICbgJxCncq  BpKUEpZxAk4dipWYHREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAE  n/DJKcs0C9A9FxrO8ADEQBzcBjrhWA6mlT5rS8Lmwhky+KAPQ4mgeyA6LFmqUAwEZIhGw6FMGQIM  BkXaMMwkiKz2UeCKvhKFGNUAoyUDBpbwrkuK9oXuIGgIjnYTBQKEDnZOARJ+hEAzCIgPOgiEDVUz  TmcPUjKNE4AzMgIKbRMCDwoSBp2lCq2mC6hpaKKukbF2BKICerFEdQsGgJ8cEQAh+QQFBQAPACwA  AAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASU8Mk5zyw0a9ecHM6AABrFNd3nrEMpFWf6  gKz7eq10gPmCTaiJwbYgEEgSgaBhkxQHA8ujoRQ0HwUolFT1XAnagoV6lRgG4GE5A2hTkGuKQvEg  lAeMAMM+VzCvCgyCUn1lgnkTc1ZNBnoMXg9KV0ONARRqDwoBAnYSmg+YJXQBAXQSpJahGZ+lE6im  TXQKSK1rcGYuEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFACH5BAUFAA8ALAEAAQAWABYAAASV8MlJ  5amYkiaadI3zLJlkcEL3NaxYPqj6gO0rcQ5ChUWWSj2MYTIYkB4EhUJgkwwcOYlAqbjYoK4H1dOc  QaVMQvfgeEpIx25lwVY/APCHTqs2DAiD4YTZxBdJfHI2BUV3AEgSCk0LflYkihJzGYwEhxV6FAMP  DAFnQRRDnWcPAQymohlWoiSlpg9WJZqdrAwPml1pTREAIfkEBQUADwAsAAAAAAEAAQAABALwRQAh  +QQFBQAPACwBAAEAFgAWAAAEi/DJKQ2iOFOhhGxCo2Gc0n1C2hjjU54PqBbZMXGihDjhxE6mloT2  cDgAGIVQ4mjkHsplxdlwPH5SyYAqMUWzVpsEmS2bywfHwGoIuL9Co4OmcAek8sHEnV1bgVeBGQUL  WnoUPwEMCocGBAMEhS2KDAx3AI8DkJIalJYPmJqbcYqXjwQGZEsHBEOcGBEAIfkEBQUADwAsAAAA  AAEAAQAABALwRQAh+QQFBQAPACwBAAEAFgAWAAAEk/DJSSUyNc+hnlqPoAiENh2dlIrKaKrTF7au  hnlhKTV1YUuHTPBRaDRAj0Eg8JoUBQLKktkMQRuSabTqgEYR1KpF0NhKkOK0mhFgDNSOR5BBTw+M  WAmdUTXgN3QBNy8ORghSZz4Vgw5xJ2cEAwQ3BwMOby8LkQOSAEmNly8Fm5yelo0DihoAB5EEppdD  VQALN4MZEQAh+QQFBQAPACwAAAAAAQABAAAEAvBFADs=',
			loadingCancle:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6MzBFMjYzRTUxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6MzBFMjYzRTYxQ0IwMTFFMkE5RkRDMDFGNUY3NTA2OTYiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMEUyNjNFMzFDQjAxMUUyQTlG  REMwMUY1Rjc1MDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMEUyNjNFNDFDQjAxMUUy  QTlGREMwMUY1Rjc1MDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmI2XfsAAADqSURBVHja7FTLDYMwDI1puwQr5MCJKZCy  B3cklsg9GzAAEjAEezBFhRtHISr/T9VD1VgyJP68ZzsBQET2TQFP8McEaZoGJ7F6pdTMeN9KaNv2  nR3iODYLbaeX82k7nO6g67oRiBCC6VgDBABYluUIhx5hGM5w9sbgKrOARLgIfrWDQXCvgLUOVgmi  KGJ2HEarqhoFJklicod8zjkriuL0iLY6OHS/jxCgrn5mtDb8lADrunabPM8fpMPe+vASAc20aZrp  gT6tusOlGIpdk60PLciy7EYLKWW/dIO0P5gU2vu/qSf4QYKXAAMAJ5qBE+5PPaUAAAAASUVORK5C  YII=',

			hand:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6QjI3OEJEQkYxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6QjI3OEJEQzAxQ0U3MTFFMjg5NDZFNzJBMTc5RTBBMzMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCMjc4QkRCRDFDRTcxMUUyODk0  NkU3MkExNzlFMEEzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCMjc4QkRCRTFDRTcxMUUy  ODk0NkU3MkExNzlFMEEzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjEL5KQAAAHBSURBVHja5FRNywFhFGVmkM9EEaWQEik1  Fqws/AWJn2Dl/8haKTsW/ANljaQslLLwka98NjNOpvTkfeadUXo371k83bndOXPuufcZfT6f130D  jO5L+EOi0Wg0GAxUyzhqdj6fX6/XYDDIsmytVlssFo1G43w+z2Yzh8Ph9/u1KspkMsViURRF+dHn  8+G0WCzVarVQKHygqFQqCYIwHo+Px+MrGY1GcTqdzg882mw2OMPhMOheSbvdTvY+nU7ViWCKJEmx  WOx0OklPrNdrtCbHt9stnU6Xy2V1ot1uB4O8Xq/b7RafQEfJZBLB/X4/HA5YY7PZTL7CxuNxOdpu  t5g0JNhsNqPRGIlE8PFUKiWrgAQ5QNcejycQCGCsqKcQ8TxfqVSsVmu/30d1NpuVaHC5XGAxmUyt  VgtfpUxtuVxyHIfBJxKJer2+3+9hitL6YaFQT28N9AzDhEIhGAF1l8vFYDBQRWFLu90uKed9j3q9  HkwFF4rgJTl7EhC7Wq1U9qjT6UAzLBCVIW+Z+kI2m01MEIGgAK1EQLvdFpTxZvNvRPBoOBxS+8IQ  cD+0XlpgMpnkcrmfefIak9D/53+2RjwEGAAlkHhWHev9/QAAAABJRU5ErkJggg==',
			rotate:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6RjM2M0UyRTcxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6RjM2M0UyRTgxQ0U3MTFFMjgxRDNEQkM4N0Q3NTg2QkMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMzYzRTJFNTFDRTcxMUUyODFE  M0RCQzg3RDc1ODZCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMzYzRTJFNjFDRTcxMUUy  ODFEM0RCQzg3RDc1ODZCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlX779gAAAJXSURBVHja3JQ5a6pREIbzqbigoqBeNyI2  pghEAnZiJZZ2/gMLQZBgoYUEXIJgYyD+gYhYxcJGtDKQH6CIImKhuIAGFHHfl9yXyPV6DZoUKS6Z  YjhHzzxn5p05H2EwGM6+w0hn32T/H4hy7I/RaNTpdCaTCYVCWa1W6/X617vVajV4BoPxOQgx1WpV  oVCYzWa5XD6fz2k0Gn58fHxMJpMmk+n5+RlbMpm8H0UcdA0n6vX67e2tQCCIx+OlUqlQKFxeXl5f  X+t0OuQokUiAttvtfD5/n3Wo0XA49Hq9r6+vgUAAFKSGLXw6nQady+WiWFx2c3OD+05lpNfrZ7MZ  SsAa8R6Ph0qlLhYLv99/d3fH4XB2J/v9Pi47CtpZLpfTarVisVilUkEjsFwuFyT7avszmUyr1cLC  arUul8tsNnt/f48t8kJ2yPGrIIfDgRgsNBoN2ux2u5VKZT6fh3aQ1ul0HmMdglgslsVi2Sa1NQj8  9PQUiUQwTSQSCZJXKpXPQegFhCAIYrPZNJtNeOTi8/l4PN763cBC1h9ZpH11Go0GWo6bUQK80WiE  Pz8/Z7PZ0Gv9x8B6eHg4CrLZbEwm8+XlBY8ABSKATqfDq9VqeIzfDiQUCkOh0NEngmvRl0Qi0W63  RSLRwblutwsEFlKpNBgM9nq9gwNkjP92hXbIZLKrqys8js2/ViwW397eoDooyAWjeEpsDHQ0GsUL  WH0w5IhROEE57BpYsVjsIwjtu7i4CIfDg8Hg2ED+LW1r4/EYg4dm7+pKpVLlchkjPp1OT3zYiJ/7  8f8twABFT5G5Yf+a5QAAAABJRU5ErkJggg==',
			zoom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6MzI2NDFENzExQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6MzI2NDFENzIxQ0NBMTFFMjhDOUNGQ0NDOTYzODI4REUiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMjY0MUQ2RjFDQ0ExMUUyOEM5  Q0ZDQ0M5NjM4MjhERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMjY0MUQ3MDFDQ0ExMUUy  OEM5Q0ZDQ0M5NjM4MjhERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUXtsUAAAHTSURBVHjazJTHakJREIZzc63YS2xYsKx0  5cYXEHwBfQb3PpgbwRdw60oXtoWoWBAL9i7mQyGERMNNWeRfXA4znO/M/GfuEZLJ5NNf6Pnpj/T/  QLK70cPhMBgMlsslC4VCodPpnE4ni++BVqsViFQqFQgEjEbjbDZrNpu5XA6cVqt9BBLD4fCHWuRy  eSaT4fxOp1Ov17fbrdvtTiQSpVLpdDqJoijJo/1+n06nQTQajcvlQkXn87larbZaLeJkpZodj8fp  pd/v04UgCFD46vX6Xq83nU7JSgX5/X4oarWawyFOJpP5fL7b7TQaDXGyUs2mF7ygKTafryKITSqV  itKi0ajUiqjCZDJh6of48XgkTlYqaDQacUcc/nyVeNVt7fV6y+UylUoCFYtFs9nMBMES3ykYDNps  NpfL1e1277LuzNFwOIzFYlarFYPokUUkEgmFQuv1+uWqQqHAncpksq9AaLFYMERs8Hg8ZNnD3dGa  wWDgGIfDYbfbP7ME6e8RPw30zWbDGrOy2azP53sb9DsVPVKlUuEe+OPwiH6xkgjz9W0QqtVqsGjq  xrrN6g/fI56B8XhssVgY3bdyHr5HXyufz+OOUqnkB/wVCLXb7X//Zr8KMADSBu6sAZizOwAAAABJ  RU5ErkJggg==',
			flipVertical:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Mzc5RkM3NzYxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Mzc5RkM3NzcxQ0Y0MTFFMkFGQzk4NzFDMzc4MTVBMTIiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzlGQzc3NDFDRjQxMUUyQUZD  OTg3MUMzNzgxNUExMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzlGQzc3NTFDRjQxMUUy  QUZDOTg3MUMzNzgxNUExMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoWGg/MAAAFCSURBVHja3JTNboMwDMftaVyKVlrYCU68  Ae/Ci/MQE1JRCuok1gNCnuMExgQEJnGaUaIA8S9/fwDmeQ5H2AscZIeBXqc3Xde1bcvzppvneb7v  87wMSpIkjuOdEsqyrKpqGcSUoigQkPQgQuQZkN8gkKz0JUuALMtWQWxBEOyRQ+4csYXXUCTovYR6  IGo3lHsYFRJtgKL3SPbooSMD8TPBoDxGOYeo73snKArFGa2z4AxJpOEo7XarXKArhzac7TKEDdDb  +Qw/9TGx2AFDesAG7MyRfzqtVAn/0NlsX88n6BzIhNNiGyGms+ZFm4E+H495OrYStgSq68Y0r9QK  x8sCLdH0lhN0r5XeRxYCQ3bpl7gFkTOQuoNtOrQlI3HTeZl8bQCX4OICNU2z8+t3gZRSaZruBPHm  VdCH2H/5Zx8G+hZgAJcamqB3G0N7AAAAAElFTkSuQmCC',
			flipHorizontal:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6NUVBRDRDOTkxQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6NUVBRDRDOUExQ0Y0MTFFMkI0OUU5NThEQzI4NTFGNDMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RUFENEM5NzFDRjQxMUUyQjQ5  RTk1OERDMjg1MUY0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RUFENEM5ODFDRjQxMUUy  QjQ5RTk1OERDMjg1MUY0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pnl92swAAAFKSURBVHja3JTJjoMwDIbxqBw6SKVAT3Di  DXgX3l9cRkhFLKIjekHIk9gJoXQhB07jILPFX37bAcjz3NnDvpydbDfQYXkzjuMwDMJvhrmu63me  8K9BSZLEcWwpoSzLqqpegwSlKIogCKJLFIWXMAxOvv99PA73++/t1nVt07RN3bRd2/d9lmVL0Lsa  gRhkSA75Sp7h4fUnEIhZKkhPpzhyqPBg1TVAMcBEMJnRjAJECxBKkloUlo+FWLkG8S1SU8sDPjDm  M2u0UwScnJFDUCEHqIIrpR9qhHIAeZ2Tfj4rsUptlZW6RWSk2RAbIFw2Ho2nxFSN0E4RzUe9qUxi  YPTZ1Agck5rqDhdbooC1gGNZbN7JWpFOEFbpb9VIBZnNrLCyj6KZT4znr7+u6zRNxcU0Tdequi4+  7tn881kcPPkt6Ifsv/yzdwP9CTAAzDedWzss4SgAAAAASUVORK5CYII=',
			close:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARCAIAAAAt9wkYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Q0I3NzA1RDAxQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Q0I3NzA1RDExQ0Y3MTFFMkJGMTU4MTc4OEQ2N0MzQjkiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjc3MDVDRTFDRjcxMUUyQkYx  NTgxNzg4RDY3QzNCOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjc3MDVDRjFDRjcxMUUy  QkYxNTgxNzg4RDY3QzNCOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmUW1owAAADqSURBVHja5FWxCoQwDL2W+x4X/QmHujvX  zV0XadHN31HUn2gR/KD2AgWRAytETpTLEF5eSfqaaEvyPH/dw97W2rtIMcY8uytKKQeiKPKTP5fS  dZ0DSZKEYQhAa72SdV0japIsy3D9XPdjjIHv+96FUkpPFqV0VwrnHD3dpmm+GCHEwdEJ2VVpTlhV  VdtaEB6m2H2j9oTN87yVAuFhikclviuw8TAMWykQAonuCvJeWZZlmiaHy7IE37Yt+HEc4zgOggBR  EzmgVUdRFI4B4BhYwg2IpGl65ZXq+ZmvfoM838MfP4fPGNBHgAEAi7gyuvHuhZcAAAAASUVORK5C  YII=',
			rotateIndicatorBG:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAAC5CAYAAACfmiVfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEu  MC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVz  b3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1N  Ok9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNDQzRDlCNjE4MjRFMjExQTlDNjhCQTlBOTYy  NUVGMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRDEzOEEzQTI0MjAxMUUyOTRGREE2Njky  QjdBREQ5OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDEzOEEzOTI0MjAxMUUyOTRGREE2  NjkyQjdBREQ5OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dz  KSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwOTI1OTNB  MUUyNEUyMTFBOUM2OEJBOUE5NjI1RUYzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA0NDNE  OUI2MTgyNEUyMTFBOUM2OEJBOUE5NjI1RUYzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS  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  9BnasNkcSoMAAAAASUVORK5CYII=',
			rotateIndicatorPointer:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAADxCAYAAACEXZTsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6OTQ0RjM2N0YyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6OTQ0RjM2ODAyNDJFMTFFMjk1QkFBRDIwRTU4OTdBRDgiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NDRGMzY3RDI0MkUxMUUyOTVC  QUFEMjBFNTg5N0FEOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NDRGMzY3RTI0MkUxMUUy  OTVCQUFEMjBFNTg5N0FEOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Psfyr6YAAArZSURBVHja3J1bbyNJFcfL7cT25D6Jc2Em  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',

			arrowTop:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6QjNFMkVGMDEyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6QjNFMkVGMDIyQzI0MTFFMjg3QzRFMzA4RUMzNUU1M0UiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCM0UyRUVGRjJDMjQxMUUyODdD  NEUzMDhFQzM1RTUzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCM0UyRUYwMDJDMjQxMUUy  ODdDNEUzMDhFQzM1RTUzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlvCjVAAAAD/SURBVHja1JjRDYQgDIbZgBEYwREcgREY  xREcoSMxwo3gCHc+0MQQPCgUKCT/G8r3GW0RpfoNfceHaLXYQPhvyFISJoJ/Shjp8NudKwGPucKc  JeFFS9hC+KeElQLvCOBx3Mrw0yVOBnjMORoeGOExIBEeKuYP664UGIpEl67dAj9dwjDA10o0bz1K  uyulmlCqV1PXpsK7Tv2jSsJ2hK+VsD1u3NpJ2dcaCc++JvXj2hnL9N5aLGBUZWAsGiAJvknCC4Gv  kfC4Tchd8Bn8G7iFNXMPVJdYzzoS+bf/Sr4NThB8TuK1lB4CD6NiiaPkh0XaSRpKQOlkiceASa6f  AAMADgHRdvHjSZ0AAAAASUVORK5CYII=',
			arrowBottom:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAdCAYAAADsMO9vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6Qzg4RUFEREQyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6Qzg4RUFEREUyQzI0MTFFMkJGRTVENTM1RUFERUEyNjMiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDODhFQUREQjJDMjQxMUUyQkZF  NUQ1MzVFQURFQTI2MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDODhFQUREQzJDMjQxMUUy  QkZFNUQ1MzVFQURFQTI2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl7tKzkAAAEVSURBVHja1JjREYQgDES5CizhSqAES7gS  UoolUAIlUcKVQAmRD5hhPBXDkRgzk79V3uK4Roz5LZ86pJ6Mnpoyk28Jl9SYW4uJAl+4liMhVCIt  JrbwpWErtKnjjvBOE0fwmFltLTyCL/2tLxAom9c8Y4plY0NDuOuaGT5eZAoldVCJCQo81qmkwUQ3  fClHNDEPhJ+J8I4SpWcNA+CHrylpgm2tD/GRAjN8zEysLxUwwlupZHAX7umkE+9N+NhhY2KkxHXI  a7PPJVdNUOGHz1//mLgdvncnfYdepDwxv1XB96TJiPRiKRgAD+bmgifD944eXaOBlj8pqT87FhOq  4Vujx9DRQPpIRNtJH8kEK/wLEc2TaxVgABhX1Dief8wFAAAAAElFTkSuQmCC',
			arrowLeft:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6NTkwNjJDNTkyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6NTkwNjJDNUEyQzI0MTFFMkI0NzZFM0NEMTRCQUU4NzAiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OTA2MkM1NzJDMjQxMUUyQjQ3  NkUzQ0QxNEJBRTg3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1OTA2MkM1ODJDMjQxMUUy  QjQ3NkUzQ0QxNEJBRTg3MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps3mm0sAAAEHSURBVHjaxNhhDcMgEIZhMgOVMAmVMAmV  gJRJQAKSJmESJoHRhSVkNIM7oC/J/WrSJ2nhA86EEMyk4WM9Yi3Fk0noDoZUr1jrbNRlYA7bWag9  APO6j0Zr4Lf8KHRrBMNncg1A1/TP2sB9NneicrDzn15VYAe6pBe1gM8iIBSoBCyDQYn2gQrUd4NC  dAwoQJ1g8d+qb2tArQC0Td+sgo4HK+g2BfyDSuLNiqPlAJWAThWgP6gkT716m8hQSbzpwQw9D8zQ  88A4LoYY5OdFJhK2ZLBwwGIQC3xsa8M2cey4gh3MsCModtjGrhXIBQq7KmKXYuz6jzU6sJYO1rzC  2nRYQ7Laen0LMACbElNZVX4epQAAAABJRU5ErkJggg==',
			arrowRight:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAwCAYAAADtoXHnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp  bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6  eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0  NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo  dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw  dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv  IiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS  ZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD  cmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNl  SUQ9InhtcC5paWQ6N0M5MkUyMEIyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiIHhtcE1NOkRvY3Vt  ZW50SUQ9InhtcC5kaWQ6N0M5MkUyMEMyQzI0MTFFMkJEREE4MzFDNDE2ODE0OTAiPiA8eG1wTU06  RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzkyRTIwOTJDMjQxMUUyQkRE  QTgzMUM0MTY4MTQ5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzkyRTIwQTJDMjQxMUUy  QkREQTgzMUM0MTY4MTQ5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1w  bWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrqtTzoAAADVSURBVHja5NjhCYMwEAXgows4giN0BEdw  hBvFETpCRsoIjuAINsIJpfgjoZf3YhN4/4QPgj6TE7leQ0pMCQJaz5QtZbdUh/ULPPOqBS4X2GfU  ExtsC/eMqCcaM9EjMwPe7GXrCx494TUTjvZ8lYJoFhYGHP4CngrKw7WntQDW7uCZAbvWpdgLQ4ED  o6dLYNe6vAf8kBsv+PY2C7p9MvBy0FZBt8KH/9rgIPy4Aj+YNQ1GBvhzvcEvUPCrIvxSTLmFwwcd  lJEOZXhFHdPRBpKQ0etbgAEA5TXHBKbv1IkAAAAASUVORK5CYII=',
		};


		//获取位置
		function getTargetPosition(target){
			var target=target;
			var rect=target.getBoundingClientRect();
			var compStyle=getComputedStyle(target,'');
			var pFloat=parseFloat;
			var t=rect.top + pFloat(compStyle.paddingTop) + pFloat(compStyle.borderTopWidth);
			var l=rect.left + pFloat(compStyle.paddingLeft) + pFloat(compStyle.borderLeftWidth);
			var r=rect.right - pFloat(compStyle.paddingRight) - pFloat(compStyle.borderRightWidth);
			var b=rect.bottom - pFloat(compStyle.paddingBottom) - pFloat(compStyle.borderBottomWidth);
			var scrollXY={
				x:window.scrollX,
				y:window.scrollY,
			};
			return {
				t:t,
				l:l,
				r:r,
				b:b,
				top: t + scrollXY.y,
				left: l + scrollXY.x,
				right: r + scrollXY.x,
				bottom: b + scrollXY.y,
			};
		};

		//获取窗口大小.
		function getWindowSize(){
			//window.innerHeight;window.innerWidth;
			return {
				h:window.innerHeight,
				w:window.innerWidth,
			};
			/*
			var de=document.documentElement;
			return {
				h:document.compatMode=='BackCompat'? document.body.clientHeight : de.clientHeight,
				w:de.clientWidth,
			};
			*/
		};


		function getCurrentSize(target){//获取页面上显示的图片的宽 高.
			var iCS=getComputedStyle(target,'');
			return {
				h:parseFloat(iCS.height),
				w:parseFloat(iCS.width),
			};
		};


		//xpath 获取单个元素
		function getElementByXpath(xpath,contextNode,doc){
			doc=doc || document;
			contextNode=contextNode || doc;
			return doc.evaluate(xpath,contextNode,null,9,null).singleNodeValue;
		};


		//事件支持检测.
		function eventSupported( eventName,el ){
			el = el || document.createElement("div");
			eventName = "on" + eventName;
			var isSupported = (eventName in el);
			if (!isSupported && el.setAttribute) {
				el.setAttribute(eventName, "return;");
				isSupported = typeof el[eventName] === "function";
			};
			return isSupported;
		};


		//检测属性支持.
		function attrSupported(proName,el){
			el = el || document.createElement("div");
			var isSupported = (proName in el);
			return isSupported;
		};

		//css属性支持
		function cssProSupported(proName,elem){
			var prefix=['','-webkit-','-o-','-moz-','-ms-'];
			elem=elem || document.createElement('div');
			var style=elem.style;
			var camelPro;
			for(var i=0,ii=prefix.length;i<ii;i++){
				camelPro=(prefix[i]+proName).replace(/-([a-z])/g,function(a,b){
					return b.toUpperCase();
				});
				if(camelPro in style){
					return camelPro;
				};
			};
		};

		//css属性值支持
		function cssValueSupported(proName,value,elem){
			var prefix=['','-webkit-','-o-','-moz-','-ms-'];
			elem=elem || document.createElement('div');
			var style=elem.style;
			var prefixedValue;
			for(var i=0,ii=prefix.length;i<ii;i++){
				prefixedValue=prefix[i] + value;
				style[proName]=prefixedValue;
				if(style[proName]==prefixedValue){
					return prefixedValue;
				};
			};
		};

		//抛出错误到错误控制台
		function throwErrorInfo(err){
			if(console && console.error){
				console.error(err.message + '\n\n' + (err.stacktrace? err.stacktrace : '') + '\n\n' , err);
			};
		};


		//支持情况.
		var support={
			cssTransform:cssProSupported('transform'),
			cssCursorValue:{
				zoomIn:cssValueSupported('cursor','zoom-in'),
				zoomOut:cssValueSupported('cursor','zoom-out'),
			},
			requestFullscreen:(function(){
				var array=['webkitRequestFullScreen','mozRequestFullScreen','requestFullscreen'];
				var tempEle=document.body;
				var ret;
				for(var i=array.length-1;i>=0;i--){
					ret=array[i];
					if(ret in tempEle){
						return ret;
					};
				};
			})(),
		};


		//console.log('浏览器的一些对象支持情况:',support);

		//imgReady
		var imgReady=(function(){
			var iRInterval,
				iRReadyFn=[],
				isrcs=[]
			;

			var timeLimit=3 * 60 * 1000;//3分钟

			function checkReady(){
				var now=Date.now();
				for(var i=0,ii=iRReadyFn.length,iRReadyFn_i;i<ii;i++){
					iRReadyFn_i=iRReadyFn[i];
					//now - iRReadyFn_i.startTime >= timeLimit || 
					if(iRReadyFn_i()){
						iRReadyFn.splice(i,1);
						isrcs.splice(i,1);
						i--;
						ii--;
					};
				};
				//console.log('checkReady',iRReadyFn.length)
				if(iRReadyFn.length==0){
					clearInterval(iRInterval);
					iRInterval=null;
				};
			};



			var imgReady=function(img,opts){

				if(/NodeList|HTMLCollection/.test(Object.prototype.toString.call(img))  || Array.isArray(img)){
					arrayFn.forEach.call(img,function(img,index,array){
						if(img instanceof HTMLImageElement){
							imgReady(img,opts);
						};
					});
					return;
				};

				if(!(img instanceof HTMLImageElement)){
					var t_img=new Image();
					t_img.src=img;
					img=t_img;
					t_img=null;
				};

				var ready,load,error,loadEnd,abort,timeout,time;
				ready=opts.ready;
				load=opts.load;
				error=opts.error;
				loadEnd=opts.loadEnd;
				abort=opts.abort;
				timeout=opts.timeout;
				time=typeof opts.time=='number'? opts.time : 0;

				if(time){
					setTimeout(function(){
						if(!loadEndDone){
							aborted=true;
							removeListener();
							img.src='data:';
							if(timeout){
								timeout.call(img,{
									target:img,
									type:'timeout',
								});
							};
							loadEndDone=true;
							if(loadEnd){
								loadEnd.call(img,{
									target:img,
									type:'timeout',
								});
							};
							
						};
					},time);
				};

				var src=img.src;
				var loadEndDone;

				function go(type,e){
					switch(type){
						case 'load':{
							removeListener();
							go('ready');//如果直接触发load，那么先触发ready
							if(load){
								load.call(img,e);
							};
							loadEndDone=true;
							if(loadEnd){
								loadEnd.call(img,e);
							};
						}break;
						case 'ready':{
							if(!ready || readyHandler.done)return;
							readyHandler.done=true;
							ready.call(img,{
								target:img,
								type:'ready',
							});
						}break;
						case 'error':{
							removeListener();
							if(error){
								error.call(img,e);
							};
							loadEndDone=true;
							if(loadEnd){
								loadEnd.call(img,e);
							};
						}break;
					};
				};

				var aborted;
				var ret={
					img:img,
					abort:function(){
						if(!loadEndDone){
							aborted=true;
							removeListener();
							img.src='data:';
							if(abort){
								abort.call(img,{
									target:img,
									type:'abort',
								});
							};
							loadEndDone=true;
							if(loadEnd){
								loadEnd.call(img,{
									target:img,
									type:'abort',
								});
							};
						};
					},
				};

				function readyHandler(){//尽快的检测图片大小.
					if(loadEndDone || aborted)return true;
					if(img.naturalWidth==0 || img.naturalHeight==0)return;
					go('ready');
					return true;
				};


				function loadHandler(e){
					go('load',e);
				};

				function errorHandler(e){
					go('error',e);
				};

				function removeListener(){
					img.removeEventListener('load',loadHandler,true);
					img.removeEventListener('error',errorHandler,true);
				};

				//ready必须在load之前触发。

				if(img.complete){//图片已经加载完成.
					if(typeof img.width=='number' && img.width && img.height){//图片
						setTimeout(function(){
							if(aborted)return;
							go('load',{
								type:'load',
								target:img,
							});
						},0);
					}else{//这不是图片.opera会识别错误.
						setTimeout(function(){
							if(aborted)return;
							go('error',{
								type:'error',
								target:img,
							});
						},0);
					};
					return ret;
				};


				img.addEventListener('load',loadHandler,true);
				img.addEventListener('error',errorHandler,true);


				if(ready){
					var index=isrcs.indexOf(src);
					if(index==-1){
						isrcs.push(src);
						readyHandler.startTime=Date.now();
						iRReadyFn.push(readyHandler);
					}else{
						iRReadyFn[index].startTime=Date.now();
					};

					if(!iRInterval){
						iRInterval=setInterval(checkReady,66);
					};
				};

				return ret;
			};

			return imgReady;
		})();


		var addWheelEvent=(function(){
			var eventName;

			if('onwheel' in document){//w3c FF>=17 ie>=9
				eventName='wheel';
			}else if('onmousewheel' in document){//ie
				eventName='mousewheel';
			}else{// < FF17
				eventName='DOMMouseScroll';
			};

			return function(ele,callback,useCapture){
				ele.addEventListener(eventName,function(e){
					var type=e.type;
					var ne;
					if(type!='wheel'){
						ne={};
						for(var i in e){
							ne[i]=e[i];
						};

						ne.type='wheel';
						ne.deltaX=0;
						ne.deltaY=0;
						ne.deltaZ=0;
						ne.deltaMode=1;//line
						ne.preventDefault=e.preventDefault.bind(e);
						ne.stopPropagation=e.stopPropagation.bind(e);

						if((typeof e.axis=='number' && e.axis==2) || (typeof e.wheelDeltaY=='number' && e.wheelDeltaY!=0)){//Y轴的滚动
							ne.deltaY = e.wheelDeltaY? -e.wheelDeltaY/40 : e.detail;
						}else{
							ne.deltaX = e.wheelDeltaX? -e.wheelDeltaX/40 : e.detail;
						};
					};

					callback.call(this,ne? ne : e);
				},useCapture || false);
			};
		})();


		var addCusMouseEvent=(function(){
			var tele= document.documentElement || document.createElement('div');

			var support={
				mouseleave:'onmouseleave' in tele,
				mouseenter:'onmouseenter' in tele,
			}; 

			tele=null;

			var map={
				'mouseleave':'mouseout',
				'mouseenter':'mouseover',
			};

			return function(type, ele, fn){//事件类型，元素，监听函数
				type=type.toLowerCase();
				if(support[type]){
					ele.addEventListener(type,fn,false);//mouseleave,enter不冒泡
				}else{
					ele.addEventListener(map[type],function(e){
						var relatedTarget=e.relatedTarget;//mouseout，去往的元素；mouseover，来自的元素
						if(!this.contains(relatedTarget)){
							fn.call(this,e);
						};
					},true);
				};
			};

		})();



		//库
		function GalleryC(){
			this.init();
		};


		var gallery;
		var galleryMode;
		GalleryC.prototype={
			init:function(){
				this.addStyle();
				var container=document.createElement('span');

				this.gallery=container;
				container.className='pv-gallery-container';
				container.tabIndex=1;
				container.innerHTML=''+
					'<span class="pv-gallery-head">'+
						'<span title="弹出照片进行复杂操作" class="pv-gallery-operate">折腾</span>'+
						'<span title="一些命令菜单" class="pv-gallery-commands">命令</span>'+
						'<span title="分享" class="pv-gallery-share">分享</span>'+
						'<span title="Close | Cerrar" class="pv-gallery-close"></span>'+
					'</span>'+
					'<span class="pv-gallery-body">'+
						'<span class="pv-gallery-img-container">'+
							'<span class="pv-gallery-img-container-left-side">'+
								'<span class="pv-gallery-img-controler-pre"></span>'+
							'</span>'+
							'<span class="pv-gallery-img-content">'+
								'<span class="pv-gallery-img-parent"><!--图片放在这个里面--></span>'+
								'<span class="pv-gallery-vertical-align-helper"></span>'+
							'</span>'+
							'<span class="pv-gallery-img-container-right-side">'+
								'<span class="pv-gallery-scrollbar-v pv-gallery-img-scrollbar-v">'+
									'<span class="pv-gallery-scrollbar-v-track pv-gallery-img-scrollbar-v-track">'+
										'<span class="pv-gallery-scrollbar-v-handle pv-gallery-img-scrollbar-v-handle"></span>'+
									'</span>'+
								'</span>'+
								'<span class="pv-gallery-img-controler-next"></span>'+
							'</span>'+
							'<span class="pv-gallery-img-container-bottom-side">'+
								'<span class="pv-gallery-scrollbar-h pv-gallery-img-scrollbar-h">'+
									'<span class="pv-gallery-scrollbar-h-track pv-gallery-img-scrollbar-h-track">'+
										'<span class="pv-gallery-scrollbar-h-handle pv-gallery-img-scrollbar-h-handle"></span>'+
									'</span>'+
								'</span>'+
							'</span>'+
						'</span>'+
						'<span class="pv-gallery-sidebar-container" unselectable="on">'+
							'<span class="pv-gallery-sidebar-content" >'+
								'<span class="pv-gallery-scrollbar-h pv-gallery-thumb-scrollbar-h">'+
									'<span class="pv-gallery-scrollbar-h-track pv-gallery-thumb-scrollbar-h-track">'+
										'<span class="pv-gallery-scrollbar-h-handle pv-gallery-thumb-scrollbar-h-handle"></span>'+
									'</span>'+
								'</span>'+
								'<span class="pv-gallery-sidebar-controler-pre"></span>'+
								'<span class="pv-gallery-sidebar-thumbnails-container">'+
									'<span class="pv-gallery-sidebar-thumbnails">'+
										'<!--用innerHTML写入被span.pv-gallery-sidebar-thumb包裹的img元素，并设置宽度货高度-->'+
									'</span>'+
								'</span>'+
								'<span class="pv-gallery-scrollbar-v pv-gallery-thumb-scrollbar-v">'+
									'<span class="pv-gallery-scrollbar-v-track pv-gallery-thumb-scrollbar-v-track">'+
										'<span class="pv-gallery-scrollbar-v-handle pv-gallery-thumb-scrollbar-v-handle"></span>'+
									'</span>'+
								'</span>'+
								'<span class="pv-gallery-sidebar-controler-next"></span>'+
							'</span>'+
						'</span>'+
					'</span>';
				document.body.appendChild(container);

				var validPos=['top','right','bottom','left'];
				var sBarPosition=prefs.gallery.sidebarPosition.trim();
				if(validPos.indexOf(sBarPosition)==-1){
					sBarPosition='bottom';
				};

				this.sBarPosition=sBarPosition;
				this.selectedClassName='pv-gallery-sidebar-thumb_selected-' + sBarPosition;


				var sBarDirection;
				var isHorizontal=false;
				if(sBarPosition=='top' || sBarPosition=='bottom'){
					sBarDirection='h';//水平放置
					isHorizontal=true;
				}else{
					sBarDirection='v';//垂直放置
				};
				this.sBarDirection=sBarDirection;
				this.isHorizontal=isHorizontal;

				var classPrefix='pv-gallery-';
				var validClass=[
					'close',
					'body',
					'img-container',

					'img-scrollbar-h',
					'img-scrollbar-h-handle',
					'img-scrollbar-h-track',

					'img-scrollbar-v',
					'img-scrollbar-v-handle',
					'img-scrollbar-v-track',

					'thumb-scrollbar-h',
					'thumb-scrollbar-h-handle',
					'thumb-scrollbar-h-track',

					'thumb-scrollbar-v',
					'thumb-scrollbar-v-handle',
					'thumb-scrollbar-v-track',

					'img-content',
					'img-parent',

					'img-controler-pre',
					'img-controler-next',

					'sidebar-container',
					'sidebar-content',

					'sidebar-controler-pre',
					'sidebar-controler-next',

					'sidebar-thumbnails',
					'sidebar-thumbnails-container',
				];

				var eleMaps={};
				this.eleMaps=eleMaps;

				validClass.forEach(function(c){
					eleMaps[c]=container.querySelector('.'+ classPrefix + c);
				});

				var posClass=[//需要添加'top bottom left right'class的元素
					'img-container',
					'sidebar-container',
					'sidebar-thumbnails-container',
				];
				posClass.forEach(function(c){
					eleMaps[c].classList.add(classPrefix + c + '-' +sBarPosition);
				});

				var hvClass=[//需要添加'v h'class的元素
					'sidebar-container',
					'sidebar-content',
					'sidebar-controler-pre',
					'sidebar-controler-next',
					'sidebar-thumbnails',
				];
				hvClass.forEach(function(c){
					eleMaps[c].classList.add(classPrefix + c + '-' + sBarDirection);
				});



				//图片区域水平方向的滚动条
				var imgScrollbarH=new this.Scrollbar({
						bar:eleMaps['img-scrollbar-h'],
						handle:eleMaps['img-scrollbar-h-handle'],
						track:eleMaps['img-scrollbar-h-track'],
					},
					eleMaps['img-parent'],
					eleMaps['img-content'],
					true);
					this.imgScrollbarH=imgScrollbarH;

				//图片区域垂直方向的滚动条
				var imgScrollbarV=new this.Scrollbar({
						bar:eleMaps['img-scrollbar-v'],
						handle:eleMaps['img-scrollbar-v-handle'],
						track:eleMaps['img-scrollbar-v-track'],
					},
					eleMaps['img-parent'],
					eleMaps['img-content'],
					false);
				this.imgScrollbarV=imgScrollbarV;

				//缩略图区域的滚动条
				var thumbScrollbar;
				if(isHorizontal){
					thumbScrollbar=new this.Scrollbar({
						bar:eleMaps['thumb-scrollbar-h'],
						handle:eleMaps['thumb-scrollbar-h-handle'],
						track:eleMaps['thumb-scrollbar-h-track'],
					},
					eleMaps['sidebar-thumbnails'],
					eleMaps['sidebar-thumbnails-container'],
					true); 
				}else{
					thumbScrollbar=new this.Scrollbar({
						bar:eleMaps['thumb-scrollbar-v'],
						handle:eleMaps['thumb-scrollbar-v-handle'],
						track:eleMaps['thumb-scrollbar-v-track'],
					},
					eleMaps['sidebar-thumbnails'],
					eleMaps['sidebar-thumbnails-container'],
					false); 
				};
				this.thumbScrollbar=thumbScrollbar;



				var self=this;

				eleMaps['sidebar-thumbnails-container'].addEventListener('scroll',function(e){//发生scroll事件时加载缩略图
					self.loadThumb();
				},false);

				addWheelEvent(eleMaps['body'],function(e){//wheel事件
					var target=e.target;
					e.preventDefault();
					if(eleMaps['sidebar-container'].contains(target)){//缩略图区滚动滚轮翻图片
						var distance=self.sideLengthO;
						if(e.deltaY<0 || e.deltaX<0 || e.deltaZ<0){//向上滚
							distance=-distance;
						};
						thumbScrollbar.scrollBy(distance)
					}else{//图片区域滚动
						var distance=100;
						if(e.deltaY!=0){//y轴
							if(e.deltaY < 0){
								distance=-distance;
							};
							imgScrollbarV.scrollBy(distance);
						}else if(e.deltaX!=0){//x轴
							if(e.deltaX < 0){
								distance=-distance;
							};
							imgScrollbarH.scrollBy(distance);
						};
					};

					self.forceRepaint();
				},true);



				var validKeyCode=[38,39,40,37]//上右下左
				var keyUp=true;
				var keyIntervalTimer;
				container.addEventListener('keydown',function(e){//上下左右切换图片
					e.stopPropagation();
					var keyCode=e.keyCode;
					var index=validKeyCode.indexOf(keyCode);
					if(index==-1)return;
					e.preventDefault();

					if(!keyUp)return;//已按下。
					keyUp=false;

					switch(index){
						case 0:;
						case 3:{
							self.selectPrevious();
							keyIntervalTimer=setInterval(function(e){
								self.selectPrevious();
							},800);
						}break;
						case 1:;
						case 2:{
							self.selectNext();
							keyIntervalTimer=setInterval(function(e){
								self.selectNext();
							},800);
						}break;
					};

					function keyUpHandler(e){
						if(e.keyCode!=validKeyCode[index])return;
						this.removeEventListener('keyup',keyUpHandler,false);
						clearInterval(keyIntervalTimer);
						keyUp=true;
					};
					this.addEventListener('keyup',keyUpHandler,false);

				},false);


				var imgDraged;
				eleMaps['img-parent'].addEventListener('mousedown',function(e){//如果图片尺寸大于屏幕的时候按住图片进行拖移
					var target=e.target;
					if(e.button!=0 || target.nodeName!='IMG')return;
					var bigger=target.classList.contains('pv-gallery-img_zoom-out');//如果是大于屏幕

					var oClient={
						x:e.clientX,
						y:e.clientY,
					};

					var oScroll={
						left:self.imgScrollbarH.getScrolled(),
						top:self.imgScrollbarV.getScrolled(),
					};

					var moveHandler=function(e){
						imgDraged=true;
						if(bigger){
							target.style.cursor='pointer';
							self.imgScrollbarV.scroll(oScroll.top-(e.clientY-oClient.y));
							self.imgScrollbarH.scroll(oScroll.left-(e.clientX-oClient.x));
						};
					};

					var upHandler=function(){
						target.style.cursor='';

						//拖曳之后阻止随后可能产生click事件产生的大小切换。
						//确保在随后的click事件发生后执行
						setTimeout(function(){
							imgDraged=false;
						},0);

						document.removeEventListener('mousemove',moveHandler,true);
						document.removeEventListener('mouseup',upHandler,true);
					};

					document.addEventListener('mousemove',moveHandler,true);
					document.addEventListener('mouseup',upHandler,true);
				},true);

				eleMaps['img-parent'].addEventListener('click',function(e){//点击图片本身就行图片缩放处理

					var target=e.target;
					if(e.button!=0 || target.nodeName!='IMG')return;

					if(imgDraged){//在拖动后触发的click事件，取消掉。免得一拖动完就立即进行的缩放。。。
						imgDraged=false;
						return;
					}; 

					if(target.classList.contains('pv-gallery-img_zoom-in')){//放大
						self.fitContains=false;
						var zoomX = typeof e.offsetX=='undefined' ? e.layerX : e.offsetX;
						var zoomY = typeof e.offsetY=='undefined' ? e.layerY : e.offsetY;
						var scaleX=zoomX/target.clientWidth;
						var scaleY=zoomY/target.clientHeight;
						self.fitToScreen({
							x:scaleX,
							y:scaleY,
						});
					}else if(target.classList.contains('pv-gallery-img_zoom-out')){
						self.fitContains=true;
						self.fitToScreen();
					};
				},true);

				var mouseIntervalTimer;
				container.addEventListener('mousedown',function(e){//鼠标按在导航上，切换图片
					if(e.button!=0)return;//左键
					var target=e.target;
					if(target.nodeName=='IMG')e.preventDefault();

					var matched=true;
					switch(target){
						case eleMaps['img-controler-pre']:;
						case eleMaps['sidebar-controler-pre']:{//上一个
							self.selectPrevious();
							clearInterval(mouseIntervalTimer);
							mouseIntervalTimer=setInterval(function(e){
								self.selectPrevious();
							},800);
						}break;
						case eleMaps['img-controler-next']:;
						case eleMaps['sidebar-controler-next']:{//下一个
							self.selectNext();
							clearInterval(mouseIntervalTimer);
							mouseIntervalTimer=setInterval(function(e){
								self.selectNext();
							},800);
						}break;
						default:{
							matched=false;
						}break;
					};

					function mouseUpHandler(e){//opera，按下左键的时候，按右键然后松开不会触发mouseup，再松开左键，还是不会触发mouseup
						document.removeEventListener('mouseup',mouseUpHandler,true);
						clearInterval(mouseIntervalTimer);
					};

					if(matched){
						e.preventDefault();
						document.addEventListener('mouseup',mouseUpHandler,true);
					};
				},false);

				eleMaps['sidebar-content'].addEventListener('click',function(e){//点击缩略图切换
					if(e.button!=0)return;//左键
					var target=e.target;
					if(!target.dataset['src'])return;
					self.select((target.nodeName=='SPAN'? target : target.parentNode));
				},false);

				eleMaps['close'].addEventListener('click',function(e){//关闭
					self.close();
				},false);

				this._resizeHandler=this.resizeHandler.bind(this);

				this.sideLength=isHorizontal ?  eleMaps['sidebar-thumbnails'].clientHeight : eleMaps['sidebar-thumbnails'].clientWidth;
				this.sideLengthO=this.sideLength + 3;//加上margin

				this.thumbSpanStyle=isHorizontal ? ';width:' + this.sideLength +'px;' : ';height:' + this.sideLength +'px;';

				container.style.display='none';
			},
			selectPrevious:function(){
				var pre;
				var _pre=this.selected.previousElementSibling;
				while(_pre){
					if(_pre.clientWidth!=0){
						pre=_pre;
						break;
					};
					_pre=_pre.previousElementSibling;
				};

				this.select(pre);

			},
			selectNext:function(){
				var next;
				var _next=this.selected.nextElementSibling;
				while(_next){
					if(_next.clientWidth!=0){
						next=_next;
						break;
					};
					_next=_next.nextElementSibling;
				};

				this.select(next);

			},
			close:function(){
				galleryMode=false;
				this.gallery.blur();
				this.gallery.style.display='none';
				var des=document.documentElement.style;
				des.overflowX=this.deOverflow.x;
				des.overflowY=this.deOverflow.y;
				window.removeEventListener('resize',this._resizeHandler,true);
			},
			selectedIntoView:function(){
				var thumBC=this.eleMaps['sidebar-thumbnails-container'];
				//需要滚动的距离。
				var needScrollDis=this.isHorizontal ? this.selected.offsetLeft : this.selected.offsetTop;
				//尽可能的居中显示
				var thumBCClient=this.isHorizontal ? thumBC.clientWidth : thumBC.clientHeight;
				var scrollCenter=Math.max((thumBCClient - this.sideLengthO)/2,0);

				needScrollDis=Math.max(needScrollDis-scrollCenter,0);
				this.thumbScrollbar.scroll(needScrollDis);
			},
			select:function(ele){
				if(!ele || this.selected==ele)return;
				if(this.selected){
					this.selected.classList.remove(this.selectedClassName);
					this.selected.classList.remove('pv-gallery-sidebar-thumb_selected');
				};
				ele.classList.add(this.selectedClassName);
				ele.classList.add('pv-gallery-sidebar-thumb_selected');

				this.selected=ele;

				var self=this;
				clearTimeout(this.loadImgTimer);
				this.loadImgTimer=setTimeout(function(){//快速跳转的时候不要尝试读取图片。
					self.loadImg(ele);
				},200);

				this.selectedIntoView();
				this.forceRepaint();
			},
			clear:function(){

				this.allLoading=[];//读取中的图片数组

				this.allImgs={//图片的总类，统计
					rule:{
						shown:true,
						number:0,
					},
					tpRule:{
						shown:true,
						number:0,
					},
					scale:{
						shown:true,
						number:0,
					},
					force:{
						shown:true,
						number:0,
					},
				};

				if(this.img){
					this.img.style.display='none';
				};

				this.img=null;
				this.selected==null;
				this.eleMaps['sidebar-thumbnails'].innerHTML='';
				this.imgScrollbarV.hide();
				this.imgScrollbarH.hide();
				this.thumbScrollbar.hide();
				window.removeEventListener('resize',this._resizeHandler,true);
			},
			load:function(img,data,from){
				this.clear();//还原对象的一些修改，以便复用。
				galleryMode=true;

				var gallery=this.gallery;
				var galleryStyle=gallery.style;

				if(galleryStyle.display=='none'){
					var des=document.documentElement.style;
					this.deOverflow={
						x:des.overflowX,
						y:des.overflowY,
					};
					des.overflow='hidden';
					galleryStyle.display='';
					gallery.focus();
				};


				var imgSrc=img.src;
				var dataSrcs=[];
				var data_i;
				var index;
				var data_i_src;
				for(var i=0,ii=data.length;i<ii;i++){//unique顺便算出img所在data中的index;
					data_i=data[i];
					data_i_src=data_i.src;
					if(dataSrcs.indexOf(data_i_src)!=-1){//已经存在
						data.splice(i,1);//移除
						i--;
						ii--;
						continue;
					};
					dataSrcs.push(data_i_src);

					if(imgSrc==data_i_src){
						index=i;
					};
				};

				if(typeof index =='undefined'){
					index=0;
					data.unshift(data.target);
				};

				//console.log(data);
				this.data=data;
				this.from=from;//如果来自frame，那么这个from应该保存了那个frame的窗口id，便于以后通信。

				var thumbnails=this.eleMaps['sidebar-thumbnails'];


				if(this.isHorizontal){
					thumbnails.style.width=this.sideLengthO * data.length + 'px';//如果是水平放置，需要设置宽度
				};



				var spanMark='';
				var data_i;
				 for(var i=0,ii=data.length;i<ii;i++){
					data_i=data[i];
					this.allImgs[data_i.type].number++;
					 spanMark += 
					 '<span class="pv-gallery-sidebar-thumb-container'+
						'" data-type="' + data_i.type + 
						'" data-src="' + data_i.src + 
						'" data-img-src="' + data_i.imgSrc +
						'" style="'+ this.thumbSpanStyle +'">'+
						'<span class="pv-gallery-vertical-align-helper"></span>'+
						'<span class="pv-gallery-sidebar-thumb-loading" title="正在读取中......"></span>'+
					'</span>';
				};
				//console.log(this.allImgs);

				thumbnails.innerHTML=spanMark;

				//初始化滚动条
				this.thumbScrollbar.reset();

				this.imgSpans=thumbnails.children;

				this.select(this.imgSpans[index]);
				this.loadThumb();

				//resize监听
				window.addEventListener('resize',this._resizeHandler,true);
			},
			forceRepaint:function(){//解决opera的fixed元素，当滚动条不再最高处的时候，不重绘fixed元素的问题。
				if(envir.opera){
					window.scrollBy(0,1);
					window.scrollBy(0,-1);
				};
			},
			resizeHandler:function(){//窗口变化时，调整一些东西。
				this.fitToScreen();
				this.thumbScrollbar.reset();
				this.selectedIntoView();
				this.loadThumb();
			},
			getImg:function(ele){
				var allLoading=this.allLoading;

				var src=ele.dataset['src']
				var index=allLoading.indexOf(src);
				if(index!=-1){
					allLoading.splice(index,1);
				};

				allLoading.push(src);


				if(this.imgReady && this.img && this.imgReady.img.src!=this.img.src){
					this.imgReady.abort();
					this.imgReady.loadingIndicator.style.removeProperty('display');
				};


				var loadingIndicator=ele.querySelector('.pv-gallery-sidebar-thumb-loading');
				loadingIndicator.style.display='block';

				var self=this;

				this.imgReady=imgReady(src,{
					ready:function(){
						if(allLoading.indexOf(src)!=allLoading.length-1)return;//如果不是最后一张

						loadingIndicator.style.removeProperty('display');
						self.loadImg(this);
					},
					loadEnd:function(){//在loadend后开始预读。
						if(allLoading.indexOf(src)!=allLoading.length-1)return;
						if(self.preloading){//结束上次的预读。
							self.preloading.finish();
						};
						//console.log(this,'预读开始');
						if(prefs.gallery.preload){
							self.preloading=new self.Preload(ele);
						};
					},
				});

				this.imgReady.loadingIndicator=loadingIndicator;
			},
			Preload:function(ele){
				this.ele=ele;
				this.init();
			},
			Scrollbar:function(scrollbar,content,container,isHorizontal){
				this.scrollbar=scrollbar;
				this.content=content;
				this.container=container;
				this.isHorizontal=isHorizontal
				this.init();
			},
			loadImg:function(img){
				if(img.nodeName!='IMG'){//先读取。
					this.getImg(img);
					return;
				};

				if(this.img){
					this.img.style.display='none';
				};

				this.img=img;
				img.className='pv-gallery-img';
				this.eleMaps['img-parent'].appendChild(img);
				this.fitContains=prefs.gallery.fitToScreen;//适应屏幕
				this.fitToScreen();
			},
			fitToScreen:function(scale){

				var container=this.eleMaps['img-content'];
				var containerSize={
					h:container.clientHeight,
					w:container.clientWidth,
				};

				var img=this.img;
				img.classList.remove('pv-gallery-img_zoom-in');
				img.classList.remove('pv-gallery-img_zoom-out');
				img.removeAttribute('height');
				img.removeAttribute('width');

				var content=this.eleMaps['img-parent'];
				var contentSize={
					w:content.offsetWidth,
					h:content.offsetHeight,
				};

				var larger=contentSize.w > containerSize.w || contentSize.h > containerSize.h;

				if(this.fitContains){//适应屏幕
					this.imgScrollbarV.hide();
					this.imgScrollbarH.hide();
					if(larger){
						img.classList.add('pv-gallery-img_zoom-in');
						if(contentSize.h/contentSize.w >=containerSize.h/containerSize.w){
							img.height=containerSize.h-20;//20是父元素padding之和
						}else{
							img.width=containerSize.w-20;
						};
					};
				}else{//不做尺寸调整，如果大于屏幕就出现滚动条
					this.imgScrollbarV.reset();
					this.imgScrollbarH.reset();
					if(larger){
						img.classList.add('pv-gallery-img_zoom-out');
						if(scale){//通过鼠标点击进行的切换。
							this.imgScrollbarH.scroll(container.scrollWidth * scale.x - containerSize.w/2);
							this.imgScrollbarV.scroll(container.scrollHeight * scale.y - containerSize.h/2);
						};
					};
				};
			},
			loadThumb:function(){//读取可视范围里面的缩略图

				var self=this;

				function ready(){
					var naturalSize={
						h:this.naturalHeight,
						w:this.naturalWidth,
					};
					var style=this.style;
					style.removeProperty('width');
					style.removeProperty('height');
					if(naturalSize.h > self.sideLength || naturalSize.w > self.sideLength){
						if(naturalSize.h>=naturalSize.w){
							style.height='100%';
						}else{
							style.width='100%';
						};
					};
					self.forceRepaint();
				};


				var thumBC=this.eleMaps['sidebar-thumbnails-container'];
				var scrolled=this.isHorizontal ? thumBC.scrollLeft : thumBC.scrollTop;
				var thumBCClient=this.isHorizontal ? thumBC.clientWidth : thumBC.clientHeight;

				var loadDis=scrolled - this.sideLengthO;
				var loadIndex=Math.floor(scrolled/this.sideLengthO);//至少从第几张开始读取。
				var loadStopDis=scrolled + thumBCClient;

				var imgSpans=this.imgSpans;
				var span_i;
				var pro=this.isHorizontal ? 'offsetLeft' : 'offsetTop';
				var proValue;
				var thumb;

				for(var i=loadIndex,ii=imgSpans.length;i<ii;i++){
					span_i=imgSpans[i];
					if(span_i.clientWidth==0)continue;//隐藏的

					proValue=span_i[pro];
					if(proValue <= loadDis)continue;//在滚动条上面了
					if(proValue >= loadStopDis)break;//在滚动条下面了

					if(span_i.dataset['loaded'])continue;//已经加载了缩略图

					thumb=new Image();
					thumb.src=span_i.dataset['imgSrc']; //+ '?' +Math.random();
					thumb.style.cssText='\
						height:100%;\
						width:100%;\
					';
					thumb.className='pv-gallery-sidebar-thumb';

					//GM环境下的dataset可读不可写。。
					thumb.setAttribute('data-src',span_i.dataset['src']);
					span_i.setAttribute('data-loaded','true');

					span_i.appendChild(thumb);
					imgReady(thumb,{
						ready:ready,
					});
				};

			},
			addStyle:function(){
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					.pv-gallery-container {\
						position: fixed;\
						top: 0;\
						left: 0;\
						width: 100%;\
						height: 100%;\
						padding: 0;\
						margin: 0;\
						border: none;\
						z-index:899999999;\
						background-color: transparent;\
					}\
					.pv-gallery-container span{\
						-moz-box-sizing: border-box;\
						box-sizing: border-box;\
					}\
					.pv-gallery-head {\
						position: absolute;\
						top: 0;\
						left: 0;\
						width: 100%;\
						height:26px;\
						z-index:1;\
						background-color:rgba(0,0,0,0.96);\
						border:none;\
						border-bottom:1px solid #333333;\
					}\
					.pv-gallery-operate,\
					.pv-gallery-commands,\
					.pv-gallery-share{\
						color:#ccc;\
						display:none;\
					}\
					.pv-gallery-close{\
						cursor:pointer;\
						position:absolute;\
						top:0;\
						right:0;\
						height:100%;\
						width:40px;\
						border:none;\
						border-left: 1px solid #333333;\
						opacity:0.6;\
						background:transparent no-repeat center;\
						background-image:url("'+prefs.icons.loadingCancle+'");\
					}\
					.pv-gallery-close:hover{\
						opacity:1;\
					}\
					.pv-gallery-body {\
						display: block;\
						height: 100%;\
						width: 100%;\
						margin: 0;\
						padding: 0;\
						border: none;\
						border-top: 26px solid transparent;\
						position: relative;\
						background-clip: padding-box;\
					}\
					.pv-gallery-img-container {\
						display: block;\
						padding: 0;\
						margin: 0;\
						border: none;\
						height: 100%;\
						width: 100%;\
						background-clip: padding-box;\
						background-color: rgba(20,20,20,0.96);\
						position:relative;\
					}\
					.pv-gallery-img-container-top {\
						border-top: '+ prefs.gallery.sidebarSize +'px solid transparent;\
					}\
					.pv-gallery-img-container-right {\
						border-right: '+ prefs.gallery.sidebarSize +'px solid transparent;\
					}\
					.pv-gallery-img-container-bottom {\
						border-bottom: '+ prefs.gallery.sidebarSize +'px solid transparent;\
					}\
					.pv-gallery-img-container-left {\
						border-left: '+ prefs.gallery.sidebarSize +'px solid transparent;\
					}\
					.pv-gallery-img-container-left-side,\
					.pv-gallery-img-container-right-side{\
						position:absolute;\
						height:100%;\
						top:0;\
						z-index:2;\
					}\
					.pv-gallery-img-container-left-side{\
						left:0;\
					}\
					.pv-gallery-img-container-right-side{\
						right:0;\
					}\
					.pv-gallery-img-container-bottom-side{\
						position:absolute;\
						width:100%;\
						left:0;\
						bottom:0;\
						z-index:2;\
					}\
					.pv-gallery-img-controler-pre,\
					.pv-gallery-img-controler-next{\
						position:absolute;\
						top:50%;\
						height:120px;\
						width:50px;\
						margin-top:-60px;\
						cursor:pointer;\
						opacity:0.3;\
					}\
					.pv-gallery-img-controler-pre{\
						background:rgba(70,70,70,0.5) url("'+prefs.icons.arrowLeft+'") no-repeat center;\
						left:10px;\
					}\
					.pv-gallery-img-controler-next{\
						background:rgba(70,70,70,0.5) url("'+prefs.icons.arrowRight+'") no-repeat center;\
						right:10px;\
					}\
					.pv-gallery-img-controler-pre:hover,\
					.pv-gallery-img-controler-next:hover{\
						opacity:0.8;\
					}\
					/*滚动条样式--开始*/\
					.pv-gallery-scrollbar-h,\
					.pv-gallery-scrollbar-v{\
						display:none;\
						position:relative;\
						z-index:1;\
						opacity:0.6;\
					}\
					.pv-gallery-thumb-scrollbar-v,\
					.pv-gallery-thumb-scrollbar-h{\
						position:absolute;\
					}\
					.pv-gallery-scrollbar-h:hover,\
					.pv-gallery-scrollbar-v:hover{\
						opacity:0.95;\
					}\
					.pv-gallery-scrollbar-h{\
						width:100%;\
						overflow:hidden;\
						padding:0;\
						padding-left:2px;\
						padding-right:16px;\
					}\
					.pv-gallery-scrollbar-v{\
						height:100%;\
						padding:0;\
						padding-top:2px;\
						padding-bottom:16px;\
					}\
					.pv-gallery-thumb-scrollbar-h{\
						bottom:0;\
						left:0;\
						padding:0 2px;\
					}\
					.pv-gallery-thumb-scrollbar-v{\
						right:0;\
						top:0;\
						padding:2px 0;\
					}\
					.pv-gallery-scrollbar-h-track,\
					.pv-gallery-scrollbar-v-track{\
						position:relative;\
						display:block;\
						background-color:rgba(100,100,100,1);\
					}\
					.pv-gallery-scrollbar-h-track{\
						margin:5px 0;\
						height:10px;\
						width:100%;\
					}\
					.pv-gallery-scrollbar-h:hover .pv-gallery-scrollbar-h-track{\
						height:16px;\
					}\
					.pv-gallery-scrollbar-v-track{\
						height:100%;\
						width:10px;\
						margin:0 5px;\
					}\
					.pv-gallery-scrollbar-v:hover .pv-gallery-scrollbar-v-track{\
						width:16px;\
					}\
					.pv-gallery-scrollbar-h-handle,\
					.pv-gallery-scrollbar-v-handle{\
						position:absolute;\
						background-color:black;\
					}\
					.pv-gallery-scrollbar-h-handle:hover,\
					.pv-gallery-scrollbar-v-handle:hover{\
						background-color:#502121;\
					}\
					.pv-gallery-scrollbar-h-handle:active,\
					.pv-gallery-scrollbar-v-handle:active{\
						background-color:#391A1A;\
					}\
					.pv-gallery-scrollbar-h-handle{\
						height:100%;\
						width:20px;\
						left:10px;\
						top:0;\
					}\
					.pv-gallery-scrollbar-v-handle{\
						height:20px;\
						width:100%;\
						top:10px;\
						left:0;\
					}\
					/*滚动条样式--结束*/\
					.pv-gallery-img-content{\
						display:block;\
						width:100%;\
						height:100%;\
						overflow:hidden;\
						text-align:center;\
						padding:0;\
						border:none;\
						margin:0;\
						line-height:0;\
						font-size:0;\
						white-space:nowrap;\
					}\
					.pv-gallery-img-parent{\
						display:inline-block;\
						vertical-align:middle;\
						padding:10px;\
						border:none;\
						margin:0;\
						line-height:0;\
						font-size:0;\
					}\
					.pv-gallery-img{\
						box-shadow:0 0 10px rgba(0,0,0,0.6);\
						display:inline-block;\
						vertical-align:middle;\
						padding:0;\
						border:none;\
						margin:0;\
					}\
					.pv-gallery-img_zoom-out{\
						cursor:'+support.cssCursorValue.zoomOut+';\
					}\
					.pv-gallery-img_zoom-in{\
						cursor:'+support.cssCursorValue.zoomIn+';\
					}\
					.pv-gallery-sidebar-container {\
						position: absolute;\
						background-color:rgba(0,0,0,0.96);\
						padding:10px;\
						border:none;\
						margin:none;\
						-o-user-select: none;\
						-webkit-user-select: none;\
						-moz-user-select: -moz-none;\
						user-select: none;\
					}\
					.pv-gallery-sidebar-container-h {\
						height: '+ prefs.gallery.sidebarSize +'px;\
						width: 100%;\
					}\
					.pv-gallery-sidebar-container-v {\
						width: '+ prefs.gallery.sidebarSize +'px;\
						height: 100%;\
					}\
					.pv-gallery-sidebar-container-top {\
						top: 0;\
						left: 0;\
						border-bottom:1px solid #333333;\
					}\
					.pv-gallery-sidebar-container-right {\
						top: 0;\
						right: 0;\
						border-left:1px solid #333333;\
					}\
					.pv-gallery-sidebar-container-bottom {\
						bottom: 0;\
						left: 0;\
						border-top:1px solid #333333;\
					}\
					.pv-gallery-sidebar-container-left {\
						top: 0;\
						left: 0;\
						border-right:1px solid #333333;\
					}\
					.pv-gallery-sidebar-content {\
						display: block;\
						margin: 0;\
						padding: 0;\
						border: 0;\
						background-clip: padding-box;\
						position: relative;\
					}\
					.pv-gallery-sidebar-content-h {\
						height: 100%;\
						width: 90%;\
						margin-left: auto;\
						margin-right: auto;\
						border-left: 40px solid transparent;\
						border-right: 40px solid transparent;\
					}\
					.pv-gallery-sidebar-content-v {\
						height: 90%;\
						width: 100%;\
						top: 5%;\
						border-top: 40px solid transparent;\
						border-bottom: 40px solid transparent;\
					}\
					.pv-gallery-sidebar-controler-pre,\
					.pv-gallery-sidebar-controler-next{\
						cursor:pointer;\
						position:absolute;\
						background:rgba(255,255,255,0.1) no-repeat center;\
					}\
					.pv-gallery-sidebar-controler-pre-h,\
					.pv-gallery-sidebar-controler-next-h{\
						top:2px;\
						width:36px;\
						height:100%;\
					}\
					.pv-gallery-sidebar-controler-pre-v,\
					.pv-gallery-sidebar-controler-next-v{\
						left:2px;\
						width:100%;\
						height:36px;\
					}\
					.pv-gallery-sidebar-controler-pre-h {\
						left: -40px;\
						background-image: url("'+prefs.icons.arrowLeft+'");\
					}\
					.pv-gallery-sidebar-controler-next-h {\
						right: -40px;\
						background-image: url("'+prefs.icons.arrowRight+'");\
					}\
					.pv-gallery-sidebar-controler-pre-h:hover{\
						box-shadow:inset 22px 0 0 rgba(255,255,255,0.2) ,inset -14px 0 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-next-h:hover{\
						box-shadow:inset -22px 0 0 rgba(255,255,255,0.2),inset 14px 0 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-pre-v {\
						top: -40px;\
						background-image: url("'+prefs.icons.arrowTop+'");\
					}\
					.pv-gallery-sidebar-controler-next-v {\
						bottom: -40px;\
						background-image: url("'+prefs.icons.arrowBottom+'");\
					}\
					.pv-gallery-sidebar-controler-pre-v:hover{\
						box-shadow:inset 0 22px 0 rgba(255,255,255,0.2) ,inset 0 -14px 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-controler-next-v:hover{\
						box-shadow:inset 0 -22px 0 rgba(255,255,255,0.2),inset 0 14px 0 rgba(0,0,0,0.2);\
					}\
					.pv-gallery-sidebar-thumbnails-container {\
						display: block;\
						overflow: hidden;\
						height: 100%;\
						width: 100%;\
						margin:0;\
						border:none;\
						padding:0;\
					}\
					.pv-gallery-sidebar-thumbnails-container-top {\
						padding-bottom:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-right {\
						padding-left:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-bottom {\
						padding-top:5px;\
					}\
					.pv-gallery-sidebar-thumbnails-container-left {\
						padding-right:5px;\
					}\
					.pv-gallery-sidebar-thumbnails {\
						position:relative;\
						display: block;\
						padding: 0;\
						margin: 0;\
						border: none;\
						line-height:0;/*竖列时消除inline-block元素的行高*/\
					}\
					.pv-gallery-sidebar-thumbnails-h {\
						height: 100%;\
					}\
					.pv-gallery-sidebar-thumbnails-v {\
						width: 100%;\
					}\
					.pv-gallery-sidebar-thumb-container {\
						display:inline-block;\
						text-align: center;\
						border:2px solid rgb(52,52,52);\
						cursor:pointer;\
						position:relative;\
						padding:2px;\
						font-size:0;\
						line-height:0;\
						/*强制图片后面作为vertical-align参考的字符不换行，以防vertical-align:middle达不到预期效果*/\
						white-space:nowrap;\
					}\
					.pv-gallery-sidebar-container-h  .pv-gallery-sidebar-thumb-container {\
						margin:0 3px 0 0;\
						height:100%;\
					}\
					.pv-gallery-sidebar-container-v .pv-gallery-sidebar-thumb-container {\
						margin:0 0 3px 0;\
						width:100%;\
					}\
					.pv-gallery-sidebar-thumb-container:hover {\
						border:2px solid rgb(57,149,211);\
					}\
					.pv-gallery-sidebar-thumb_selected {\
						border:2px solid rgb(229,59,62);\
					}\
					.pv-gallery-sidebar-thumb_selected-top {\
						bottom:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-right {\
						left:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-bottom {\
						top:-5px;\
					}\
					.pv-gallery-sidebar-thumb_selected-left {\
						right:-5px;\
					}\
					.pv-gallery-sidebar-thumb-loading{\
						position:absolute;\
						top:0;\
						left:0;\
						width:100%;\
						height:100%;\
						display:none;\
						opacity:0.5;\
						background:black url("'+ prefs.icons.loading + '") no-repeat center ;\
					}\
					.pv-gallery-sidebar-thumb-loading:hover{\
						opacity:0.6;\
					}\
					.pv-gallery-sidebar-thumb {\
						display: inline-block;\
						vertical-align: middle;\
					}\
					.pv-gallery-vertical-align-helper{\
						display:inline-block;\
						vertical-align:middle;\
						width:0;\
						height:100%;\
						margin:0;\
						border:0;\
						padding:0;\
						visibility:hidden;\
						white-space:nowrap;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
		};

		GalleryC.prototype.Preload.prototype={//预读对象
			container:(function(){
				var div=document.createElement('div');
				div.className='pv-gallery-preloaded-img-container';
				div.style.display='none';
				document.body.appendChild(div);
				return div;
			})(),
			init:function(){
				this.max=prefs.gallery.max;
				this.nextNumber=0;
				this.nextEle=this.ele;
				this.preNumber=0;
				this.preEle=this.ele;
				this.direction='pre';
				this.preload();
			},
			preload:function(){
				var ele=this.getPreloadEle();
				if(!ele){
					//conole.log('预读正常结束');
					return;
				};

				//conole.log('正在预读：',ele);
				var self=this;
				this.imgReady=imgReady(ele.dataset['src'],{
					loadEnd:function(){
						if(self.finished){
							//conole.log('强制终止了');
							return;
						};
						ele.setAttribute('data-preloaded','true');
						self.container.appendChild(this);
						self.preload();
					},
					time:60 * 1000,//限时一分钟，否则强制结束并开始预读下一张。
				});
			},
			getPreloadEle:function(){
				if((this.max<=this.nextNumber && this.max<=this.preNumber) || (!this.nextEle && !this.preEle)){
					return;
				};
				var ele=this.direction=='pre'?  this.getNext() : this.getPrevious();
				if(ele && !ele.dataset['preloaded']){
					return ele;
				}else{
					return this.getPreloadEle();
				};
			},
			getNext:function(){
				this.nextNumber++;
				this.direction='next';
				if(!this.nextEle)return;

				var next;
				var _next=this.nextEle.nextElementSibling;
				while(_next){
					if(_next.clientWidth!=0){
						next=_next;
						break;
					};
					_next=_next.nextElementSibling;
				};
				this.nextEle=next;
				return next;
			},
			getPrevious:function(){
				this.preNumber++;
				this.direction='pre';
				if(!this.preEle)return;

				var pre;
				var _pre=this.preEle.previousElementSibling;
				while(_pre){
					if(_pre.clientWidth!=0){
						pre=_pre;
						break;
					};
					_pre=_pre.previousElementSibling;
				};
				this.preEle=pre;
				return pre;
			},
			finish:function(){
				this.finished=true;
				if(this.imgReady){
					this.imgReady.abort();
				};
			},
		};

		GalleryC.prototype.Scrollbar.prototype={//滚动条对象
			init:function(){
				var self=this;
				this.scrollbar.bar.addEventListener('mousedown',function(e){//点击滚动条区域，该干点什么！
					e.preventDefault();
					var target=e.target;
					var handle=self.scrollbar.handle;
					var track=self.scrollbar.track;
					switch(target){
						case handle:{//手柄；功能，拖动手柄来滚动窗口
							var pro=self.isHorizontal ? ['left','clientX'] : ['top','clientY'];
							var oHOffset=parseFloat(handle.style[pro[0]]);
							var oClient=e[pro[1]];

							var moveHandler=function(e){
								self.scroll(oHOffset + e[pro[1]] - oClient,true);
							};
							var upHandler=function(){
								document.removeEventListener('mousemove',moveHandler,true);
								document.removeEventListener('mouseup',upHandler,true);
							};
							document.addEventListener('mousemove',moveHandler,true);
							document.addEventListener('mouseup',upHandler,true);
						}break;
						case track:{//轨道；功能，按住不放来连续滚动一个页面的距离
							var pro=self.isHorizontal ? ['left','offsetX','layerX','clientWidth','offsetWidth'] : ['top' , 'offsetY' ,'layerY','clientHeight','offsetHeight'];
							var clickOffset=typeof e[pro[1]]=='undefined' ?  e[pro[2]] : e[pro[1]];
							var handleOffset=parseFloat(handle.style[pro[0]]);
							var handleSize=handle[pro[4]];
							var under= clickOffset > handleOffset ;//点击在滚动手柄的下方
							var containerSize=self.container[pro[3]];

							var scroll=function(){
								self.scrollBy(under?  (containerSize - 10) : (-containerSize + 10));//滚动一个页面距离少一点
							};
							scroll();

							var checkStop=function(){//当手柄到达点击位置时停止
								var handleOffset=parseFloat(handle.style[pro[0]]);
								if(clickOffset >= handleOffset && clickOffset <= (handleOffset + handleSize)){
									clearInterval(scrollInterval);
								};
							};

							var scrollInterval=setInterval(function(){
								scroll();
								checkStop();
							},300);

							checkStop();

							var upHandler=function(){
								clearInterval(scrollInterval);
								document.removeEventListener('mouseup',upHandler,true);
							};
							document.addEventListener('mouseup',upHandler,true);
						}break;
					};
					
				},true);
			},
			reset:function(){//判断滚动条该显示还是隐藏
				var contentPro,containerPro,trackPro,handlePro;

				if(this.isHorizontal){
					contentPro='offsetWidth';
					containerPro='clientWidth';
					handlePro='width';
					trackPro='clientWidth';
				}else{
					contentPro='offsetHeight';
					containerPro='clientHeight';
					handlePro='height';
					trackPro='clientHeight';
				};
				//如果内容大于容器的content区域
				var contentSize=this.content[contentPro];
				var containerSize=this.container[containerPro];
				if(contentSize > containerSize){
					this.show();
					var trackSize=this.scrollbar.track[trackPro];
					this.trackSize=trackSize;
					var handleSize=Math.floor((containerSize/contentSize) * trackSize);
					handleSize=Math.max(20,handleSize);//限制手柄的最小大小;
					this.handleSize=handleSize;
					this.one=(trackSize-handleSize) / (contentSize-containerSize);//一个像素对应的滚动条长度
					this.scrollbar.handle.style[handlePro]= handleSize + 'px';
					this.scroll(this.getScrolled());
				}else{
					this.hide();
				};
			},
			show:function(){
				this.scrollbar.bar.style.display='block';
				this.shown=true;
			},
			hide:function(){
				this.scrollbar.bar.style.display='none';
				this.shown=false;
			},
			scrollBy:function(distance,handleDistance){
				this.scroll(this.getScrolled() + (handleDistance?  distance / this.one :  distance));
			},
			scroll:function(distance,handleDistance){
				if(!this.shown)return;

				var pro;

				//滚动实际滚动条
				var _distance=distance;
				_distance=handleDistance?  distance / this.one :  distance;
				if(this.isHorizontal){
					pro='left';
					this.container.scrollLeft=_distance;
				}else{
					pro='top';
					this.container.scrollTop=_distance;
				};

				//滚动虚拟滚动条
				//根据比例转换为滚动条上应该滚动的距离。
				distance=handleDistance? distance : this.one * distance;
				//处理非法值
				distance=Math.max(0,distance);//如果值小于0那么取0
				distance=Math.min(distance,this.trackSize - this.handleSize);//大于极限值，取极限值
				this.scrollbar.handle.style[pro]=distance + 'px';
			},
			getScrolled:function(){
				if(this.isHorizontal){
					return this.container.scrollLeft;
				}else{
					return this.container.scrollTop;
				};
			},
		};


		//放大镜
		function MagnifierC(img,data){
			this.img=img;
			this.data=data;
			this.init();
		};

		MagnifierC.all=[];
		MagnifierC.styleZIndex=900000000;//全局z-index;
		MagnifierC.zoomRange=prefs.magnifier.wheelZoom.range.slice(0).sort();//升序
		MagnifierC.zoomRangeR=MagnifierC.zoomRange.slice(0).reverse();//降序

		MagnifierC.prototype={
			init:function(){
				this.addStyle();
				MagnifierC.all.push(this);
				var container=document.createElement('span');

				container.className='pv-magnifier-container';
				document.body.appendChild(container);

				this.magnifier=container;

				var imgNaturalSize={
					h:this.img.naturalHeight,
					w:this.img.naturalWidth,
				};

				this.imgNaturalSize=imgNaturalSize;

				var cs=container.style;
				cs.zIndex=MagnifierC.styleZIndex++;



				var maxDia=Math.ceil(Math.sqrt(Math.pow(1/2*imgNaturalSize.w,2) + Math.pow(1/2*imgNaturalSize.h,2)) * 2);
				this.maxDia=maxDia;

				var radius=prefs.magnifier.radius;
				radius=Math.min(maxDia/2,radius);
				this.radius=radius;
				var diameter=radius * 2;
				this.diameter=diameter;

				cs.width=diameter + 'px';
				cs.height=diameter + 'px';
				cs.borderRadius=radius+1 + 'px';
				cs.backgroundImage='url("'+ this.img.src +'")';
				cs.marginLeft= -radius +'px';
				cs.marginTop= -radius +'px';

				var imgPos=getTargetPosition(this.data.img);
				var imgRange={//图片所在范围
					x:[imgPos.left , imgPos.right],
					y:[imgPos.top , imgPos.bottom],
				};
				var imgW=imgRange.x[1] - imgRange.x[0];
				var imgH=imgRange.y[1] - imgRange.y[0];
				//如果图片太小的话，进行范围扩大。
				var minSize=60;
				if(imgW < minSize){
					imgRange.x[1] +=(minSize - imgW)/2;
					imgRange.x[0] -=(minSize - imgW)/2;
					imgW=minSize;
				};
				if(imgH < minSize){
					imgRange.y[1] +=(minSize - imgH)/2;
					imgRange.y[0] -=(minSize - imgH)/2;
					imgH=minSize;
				};
				this.imgSize={
					w:imgW,
					h:imgH,
				};
				this.imgRange=imgRange;
				//console.log(this.imgRange,this.imgSize);

				this.setMouseRange();


				this.move({
					pageX:imgRange.x[0],
					pageY:imgRange.y[0],
				});

				this._focus=this.focus.bind(this);
				this._blur=this.blur.bind(this);
				this._move=this.move.bind(this);
				this._remove=this.remove.bind(this);
				this._pause=this.pause.bind(this);
				this._zoom=this.zoom.bind(this);

				if(prefs.magnifier.wheelZoom.enabled){
					this.zoomLevel=1;
					this.defaultDia=diameter;
					addWheelEvent(container,this._zoom,false);
				};

				container.addEventListener('mouseover',this._focus,false);
				container.addEventListener('mouseout',this._blur,false);
				container.addEventListener('dblclick',this._remove,false);
				container.addEventListener('click',this._pause,false);


				document.addEventListener('mousemove',this._move,true);
			},
			addStyle:function(){
				if(MagnifierC.style)return;
				var style=document.createElement('style');
				style.type='text/css';
				MagnifierC.style=style;
				style.textContent='\
					.pv-magnifier-container{\
						position:absolute;\
						padding:0;\
						margin:0;\
						background-origin:border-box;\
						-moz-box-sizing:border-box;\
						box-sizing:border-box;\
						border:3px solid #CCCCCC;\
						background:rgba(40, 40, 40, 0.9) no-repeat;\
					}\
					.pv-magnifier-container_focus{\
						box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.7);\
					}\
					.pv-magnifier-container_pause{\
						border-color:red;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			focus:function(){
				this.magnifier.classList.add('pv-magnifier-container_focus');
				this.magnifier.style.zIndex=MagnifierC.styleZIndex++;
			},
			blur:function(){
				this.magnifier.classList.remove('pv-magnifier-container_focus');
			},
			move:function(e){
				var mouseCoor={
					x:e.pageX,
					y:e.pageY,
				};
				var mouseRange=this.mouseRange;
				var imgRange=this.imgRange;

				if( !(mouseCoor.x >= mouseRange.x[0] && mouseCoor.x <= mouseRange.x[1] && mouseCoor.y >= mouseRange.y[0] && mouseCoor.y <= mouseRange.y[1]))return;//如果不再鼠标范围
				if(mouseCoor.x > imgRange.x[1]){
					mouseCoor.x = imgRange.x[1];
				}else if(mouseCoor.x < imgRange.x[0]){
					mouseCoor.x = imgRange.x[0];
				};
				if(mouseCoor.y > imgRange.y[1]){
					mouseCoor.y = imgRange.y[1];
				}else if(mouseCoor.y < imgRange.y[0]){
					mouseCoor.y = imgRange.y[0];
				};

				var ms=this.magnifier.style;
				ms.top= mouseCoor.y + 'px';
				ms.left= mouseCoor.x + 'px';

				var radius=this.radius;
				var imgSize=this.imgSize;
				var imgNaturalSize=this.imgNaturalSize;
				var px=-((mouseCoor.x-imgRange.x[0])/imgSize.w * imgNaturalSize.w) + radius +'px';
				var py=-((mouseCoor.y-imgRange.y[0])/imgSize.h * imgNaturalSize.h) + radius +'px';
				//console.log(px,py);
				ms.backgroundPosition=px + ' ' + py;
			},
			getNextZoomLevel:function(){
				var level;
				var self=this;
				if(this.zoomOut){//缩小
					MagnifierC.zoomRangeR._find(function(value){
						if(value < self.zoomLevel){
							level=value;
							return true;
						}
					})
				}else{
					MagnifierC.zoomRange._find(function(value){
						if(value > self.zoomLevel){
							level=value;
							return true;
						};
					});
				}
				return level;
			},
			zoom:function(e){
				if(e.deltaY===0)return;//非Y轴的滚动
				if(prefs.magnifier.wheelZoom.pauseFirst && !this.paused)return;
				e.preventDefault();
				if(e.deltaY < 0){//向上滚，放大；
					if(this.diameter >= this.maxDia)return;
					this.zoomOut=false;
				}else{
					this.zoomOut=true;
				};
				var level=this.getNextZoomLevel();
				if(!level)return;

				this.zoomLevel=level;
				var diameter=this.defaultDia * level;
				if(diameter > this.maxDia){
					diameter = this.maxDia;
				};

				var radius=diameter/2
				this.diameter=diameter;
				var bRadius=this.radius;
				this.radius=radius;
				this.setMouseRange();
				var ms=this.magnifier.style;
				ms.width=diameter+'px';
				ms.height=diameter+'px';
				ms.borderRadius=radius+1 + 'px';
				ms.marginLeft=-radius+'px';
				ms.marginTop=-radius+'px';
				var bBP=ms.backgroundPosition.split(' ');
				ms.backgroundPosition=parseFloat(bBP[0]) + (radius - bRadius) + 'px' + ' ' + (parseFloat(bBP[1]) + ( radius - bRadius) + 'px');

			},
			pause:function(){
				if(this.paused){
					this.magnifier.classList.remove('pv-magnifier-container_pause');
					document.addEventListener('mousemove',this._move,true);
				}else{
					this.magnifier.classList.add('pv-magnifier-container_pause');
					document.removeEventListener('mousemove',this._move,true);
				};
				this.paused=!this.paused;
			},
			setMouseRange:function(){
				var imgRange=this.imgRange;
				var radius=this.radius;
				this.mouseRange={//鼠标活动范围
					x:[imgRange.x[0]-radius , imgRange.x[1] + radius],
					y:[imgRange.y[0]-radius , imgRange.y[1] + radius],
				};
			},
			remove:function(){
				this.magnifier.parentNode.removeChild(this.magnifier);
				document.removeEventListener('mousemove',this._move,true);
				MagnifierC.all.splice(MagnifierC.all.indexOf(this),1);
			},
		};



		//图片窗口
		function ImgWindowC(img){
			this.img=img;
			this.src=img.src;
			this.init();
		};

		ImgWindowC.styleZIndex=1000000000;//全局z-index;
		ImgWindowC.all=[];//所有的窗口对象
		ImgWindowC.zoomRange=prefs.imgWindow.zoom.range.slice(0).sort();//升序
		ImgWindowC.zoomRangeR=ImgWindowC.zoomRange.slice(0).reverse();//降序


		ImgWindowC.prototype={
			init:function(){
				var self=this;
				//图片是否已经被打开
				if(ImgWindowC.all._find(function(iwin){
					if(iwin.src==self.src){
						iwin.firstOpen();
						return true;
					};
				}))return;

				this.addStyle();
				this.addRotateIndicator();

				var img=this.img;
				img.className='pv-pic-window-pic pv-pic-not-allowed';
				img.style.cssText='\
					top:0px;\
					left:0px;\
				';

				var imgNaturalSize={
					h:img.naturalHeight,
					w:img.naturalWidth,
				};
				this.imgNaturalSize=imgNaturalSize;

				var container=document.createElement('span');
				container.style.cssText='\
					cursor:pointer;\
					top:0px;\
					left:0px;\
				';
				container.className='pv-pic-window-container';
				container.innerHTML=''+
									'<span class="pv-pic-window-toolbar">'+
										'<span class="pv-pic-window-tb-hand pv-pic-window-tb-tool pv-pic-window-tb-tool-selected" title="Hand Tool"></span>'+
										'<span class="pv-pic-window-tb-tool-badge-container">'+
											'<span class="pv-pic-window-tb-rotate pv-pic-window-tb-tool" title="Rotate | Rotar"></span>'+
											'<span class="pv-pic-window-tb-tool-badge">0</span>'+
										'</span>'+
										'<span class="pv-pic-window-tb-tool-badge-container">'+
											'<span class="pv-pic-window-tb-zoom pv-pic-window-tb-tool" title="Zoom"></span>'+
											'<span class="pv-pic-window-tb-tool-badge">0</span>'+
										'</span>'+
										'<span class="pv-pic-window-tb-flip-horizontal pv-pic-window-tb-command" title="Giro HORIZONTAL Flip"></span>'+
										'<span class="pv-pic-window-tb-flip-vertical pv-pic-window-tb-command" title="Giro VERTICAL Flip"></span>'+
									'</span>'+
									'<span class="pv-pic-window-close"></span>'+
									'<span class="pv-pic-window-range"></span>';

				container.insertBefore(img,container.firstChild);

				this.imgWindow=container;

				var toolMap={
					'hand':container.querySelector('.pv-pic-window-tb-hand'),
					'rotate':container.querySelector('.pv-pic-window-tb-rotate'),
					'zoom':container.querySelector('.pv-pic-window-tb-zoom'),
					'fh':container.querySelector('.pv-pic-window-tb-flip-horizontal'),
					'fv':container.querySelector('.pv-pic-window-tb-flip-vertical'),
				};
				this.toolMap=toolMap;

				this.viewRange=container.querySelector('.pv-pic-window-range');




				//关闭
				var closeButton=container.querySelector('.pv-pic-window-close');
				closeButton.style.cssText='\
					top: -24px;\
					right: 0px;\
				';
				this.closeButton=closeButton;

				closeButton.addEventListener('click',function(e){
					self.remove();
				},false);

				var toolbar=container.querySelector('.pv-pic-window-toolbar');
				toolbar.style.cssText='\
					top: 0px;\
					left: -45px;\
				';
				this.toolbar=toolbar;

				this.selectedTool='hand';
				this.cursor='hand';
				this.selectedToolClass='pv-pic-window-tb-tool-selected';
				


				this.hKeyUp=true;
				this.rKeyUp=true;
				this.zKeyUp=true;

				this.spaceKeyUp=true;
				this.ctrlKeyUp=true;
				this.altKeyUp=true;
				this.shiftKeyUp=true;


				toolbar.addEventListener('mousedown',function(e){//鼠标按下选择工具
					self.toolbarEventHandler(e);
				},false);


				toolbar.addEventListener('dblclick',function(e){//鼠标双击工具
					self.toolbarEventHandler(e);
				},false);


				//阻止浏览器对图片的默认控制行为
				img.addEventListener('mousedown',function(e){
					e.preventDefault();
				},false);


				container.addEventListener('mousedown',function(e){//当按下的时，执行平移，缩放，旋转操作
					self.imgWindowEventHandler(e);
				},false);

				container.addEventListener('click',function(e){//阻止opera ctrl+点击保存图片
					self.imgWindowEventHandler(e);
				},false);

				if(prefs.imgWindow.zoom.mouseWheelZoom){//是否使用鼠标缩放
					addWheelEvent(container,function(e){//滚轮缩放
						self.imgWindowEventHandler(e);
					},false);
				};


				if(prefs.imgWindow.overlayer.shown){//是否显示覆盖层
					var overlayer=document.createElement('span');
					this.overlayer=overlayer;
					overlayer.className='pv-pic-window-overlayer';
					overlayer.style.backgroundColor=prefs.imgWindow.overlayer.color;
					document.body.appendChild(overlayer);
					if(prefs.imgWindow.overlayer.clickToClose[0]){
						overlayer.addEventListener(prefs.imgWindow.overlayer.clickToClose[1],function(e){
							self.remove();
						},false);
					}
				};

				document.body.appendChild(container);
				ImgWindowC.all.push(this);

				this._blur=this.blur.bind(this);
				this._focusedKeydown=this.focusedKeydown.bind(this);
				this._focusedKeyup=this.focusedKeyup.bind(this);

				this.rotatedRadians=0;//已经旋转的角度
				this.zoomLevel=1;//缩放级别
				this.setToolBadge('zoom',1);

				//选中默认工具
				this.selectTool(prefs.imgWindow.defaultTool);

				this.firstOpen();
			},
			firstOpen:function(){
				this.focus();
				var imgWindow=this.imgWindow;
				imgWindow.style.left=-5 + window.scrollX + 'px';
				imgWindow.style.top=-5 + window.scrollY + 'px';

				if(prefs.imgWindow.fitToScreen){
					this.fitToScreen();
					this.center(true,true);
				}else{
					//window的尺寸
					var wSize=getWindowSize();
					//空隙
					wSize.h -= 16;
					wSize.w -= 16;

					var imgWindowCS=getComputedStyle(imgWindow,'');

					var rectSize={
						h:parseFloat(imgWindowCS.height),
						w:parseFloat(imgWindowCS.width),
					};

					this.center(rectSize.w <= wSize.w , rectSize.h <= wSize.h);
				};

				this.keepScreenInside();
			},
			addStyle:function(){
				if(ImgWindowC.style)return;
				var style=document.createElement('style');
				ImgWindowC.style=style;
				style.textContent='\
					.pv-pic-window-container {\
						position: absolute;\
						background-color: rgba(40,40,40,0.9);\
						padding: 8px;\
						border: 5px solid #ccc;\
						line-height: 0;\
						text-align: left;\
					}\
					.pv-pic-window-container_focus {\
						box-shadow: 0 0 10px rgba(0,0,0,0.6);\
					}\
					.pv-pic-window-close, .pv-pic-window-toolbar {\
						-webkit-transition: opacity 0.2s ease-in-out;\
						transition: opacity 0.2s ease-in-out;\
					}\
					.pv-pic-window-toolbar {\
						position: absolute;\
						background-color: #535353;\
						padding: 0;\
						opacity: 0.9;\
						display: none;\
						cursor: default;\
					}\
					.pv-pic-window-toolbar:hover {\
						opacity: 1;\
					}\
					.pv-pic-window-toolbar_focus {\
						display: block;\
					}\
					.pv-pic-window-close {\
						cursor: pointer;\
						position: absolute;\
						right: 0px;\
						top: -24px;\
						background: url("'+prefs.icons.close+'") no-repeat center bottom;\
						height: 17px;\
						width: 46px;\
						opacity: 0.9;\
						border:none;\
						padding:0;\
						padding-top:2px;\
						background-color:#1771FF;\
						display: none;\
					}\
					.pv-pic-window-close:hover {\
						background-color:red;\
						opacity: 1;\
					}\
					.pv-pic-window-close_focus {\
						display: block;\
					}\
					.pv-pic-window-pic {\
						position: relative;\
						display:inline-block;\/*opera把图片设置display:block会出现渲染问题，会有残影，还会引发其他各种问题，吓尿*/\
						max-width:none;\
						min-width:none;\
						max-height:none;\
						min-height:none;\
						padding:0;\
						margin:0;\
					}\
					.pv-pic-window-pic_focus {\
						box-shadow: 0 0 6px black;\
					}\
					.pv-pic-window-tb-tool, .pv-pic-window-tb-command{\
						height: 24px;\
						width: 24px;\
						padding: 12px 8px 6px 6px;\
						margin:0;\
						display: block;\
						background: transparent no-repeat center;\
						cursor: pointer;\
						position: relative;\
						border: none;\
						border-left: 2px solid transparent;\
						border-bottom: 1px solid #868686;\
						background-origin: content-box;\
					}\
					.pv-pic-window-toolbar > span:last-child {\
						border-bottom: none;\
					}\
					.pv-pic-window-tb-tool:hover, .pv-pic-window-tb-command:hover{\
						border-left: 2px solid red;\
					}\
					.pv-pic-window-tb-tool-selected{\
						box-shadow: inset 0 21px 0 rgba(255,255,255,0.3) ,inset 0 -21px 0 rgba(0,0,0,0.3);\
						border-left:2px solid #1771FF;\
					}\
					.pv-pic-window-tb-hand {\
						background-image: url("'+prefs.icons.hand+'");\
					}\
					.pv-pic-window-tb-rotate {\
						background-image: url("'+prefs.icons.rotate+'");\
					}\
					.pv-pic-window-tb-zoom {\
						background-image: url("'+prefs.icons.zoom+'");\
					}\
					.pv-pic-window-tb-flip-horizontal {\
						background-image: url("'+prefs.icons.flipHorizontal+'");\
					}\
					.pv-pic-window-tb-flip-vertical {\
						background-image: url("'+prefs.icons.flipVertical+'");\
					}\
					.pv-pic-window-tb-tool-badge-container {\
						display: block;\
						position: relative;\
					}\
					.pv-pic-window-tb-tool-badge {\
						position: absolute;\
						top: -3px;\
						right: 1px;\
						font-size: 10px;\
						line-height: 1.5;\
						padding: 0 3px;\
						background-color: #F93;\
						border-radius: 50px;\
						opacity: 0.5;\
						color: black;\
					}\
					.pv-pic-window-overlayer{\
						height:100%;\
						width:100%;\
						position:fixed;\
						z-index:999999999;\
						top:0;\
						left:0;\
					}\
					.pv-pic-window-rotate-indicator{\
						cursor: progress;\
						position:absolute;\
						z-index:1100000000;\
						width:250px;\
						height:250px;\
						padding:10px;\
						margin-top:-135px;\
						margin-left:-135px;\
						background:transparent url("'+ prefs.icons.rotateIndicatorBG +'") no-repeat center;\
					}\
					.pv-pic-window-rotate-indicator-pointer{\
						display:block;\
						margin-left:auto;\
						margin-right:auto;\
						background:transparent url("'+ prefs.icons.rotateIndicatorPointer +'") no-repeat center;\
						width:60px;\
						height:240px;\
						position:relative;\
						top:5px;\
					}\
					.pv-pic-window-range{\
						position:absolute;\
						border:none;\
						width:100px;\
						height:100px;\
						box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);\
						display:none;\
						padding:0;\
						background-color:rgba(255, 0, 0, 0.150);\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			addRotateIndicator:function(){
				if(ImgWindowC.rotateIndicator)return;
				var rotateIndicator=document.createElement('span');
				rotateIndicator.className='pv-pic-window-rotate-indicator';
				ImgWindowC.rotateIndicator=rotateIndicator;
				rotateIndicator.style.cssText='\
					display:none;\
				';
				var rotateIndicatorPointer=document.createElement('span');
				rotateIndicatorPointer.className='pv-pic-window-rotate-indicator-pointer';
				ImgWindowC.rotateIndicatorPointer=rotateIndicatorPointer;
				rotateIndicator.appendChild(rotateIndicatorPointer);
				document.body.appendChild(rotateIndicator);
			},
			keepScreenInside:function(){//保持按钮在屏幕里面.
				var imgWindow=this.imgWindow;
				var imgWindowFullSize={
					h:imgWindow.offsetHeight,
					w:imgWindow.offsetWidth,
				};

				var windowSize=getWindowSize();

				function keepSI(obj,offsetDirection,defaultValue){
					var objRect=obj.getBoundingClientRect();
					var objStyle=obj.style;

					while(offsetDirection.length){
						var oD=offsetDirection[0];
						var oDV=defaultValue[0];
						offsetDirection.shift();
						defaultValue.shift();
						var oValue=parseFloat(objStyle[oD]);
						var newValue;
						switch(oD){
							case 'top':{
								newValue=oValue - objRect.top;
								if(objRect.top<0){
									newValue=Math.min(newValue,imgWindowFullSize.h);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'right':{
								newValue=oValue + (objRect.right - windowSize.w);
								if(objRect.right > windowSize.w){//屏幕外
									newValue=Math.min(newValue,imgWindowFullSize.w);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'bottom':{
								newValue=oValue + (objRect.bottom - windowSize.h);
								if(objRect.bottom > windowSize.h){//屏幕外
									newValue=Math.min(newValue,imgWindowFullSize.h);
								}else{
									newValue=Math.max(newValue,oDV);
								};
							}break;
							case 'left':{
								newValue=oValue - objRect.left;
								if(objRect.left<0){
									newValue=Math.min(newValue,imgWindowFullSize.w);
								}else{
									newValue=Math.max(newValue,oDV);
								}
							}break;
						};
						//console.log(newValue);
						objStyle[oD]=newValue + 'px';
						
					};
				};

				keepSI(this.closeButton,['top','right'],[-24,0]);
				keepSI(this.toolbar,['top','left'],[0,-45]);
			},
			fitToScreen:function(){
				var wSize=getWindowSize();
				//空隙
				wSize.h -= 16;
				wSize.w -= 16;

				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var rectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};


				var size;
				if(rectSize.w - wSize.w>0 || rectSize.h - wSize.h>0){//超出屏幕，那么缩小。
					if(rectSize.w/rectSize.h > wSize.w/wSize.h){
						size={
							w:wSize.w,
							h:wSize.w / (rectSize.w/rectSize.h),
						};
					}else{
						size={
							h:wSize.h,
							w:wSize.h * (rectSize.w/rectSize.h),
						}
					};

					this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);
				};
			},
			center:function(horizontal,vertical){
				if(!horizontal && !vertical)return;
				var wSize=getWindowSize();
				var imgWindow=this.imgWindow;
				if(horizontal)imgWindow.style.left= (wSize.w - imgWindow.offsetWidth)/2 + window.scrollX +'px';
				if(vertical)imgWindow.style.top= (wSize.h - imgWindow.offsetHeight)/2 + window.scrollY +'px';
			},
			move:function(e){
				this.working=true;
				var mouseCoor={
					x:e.pageX,
					y:e.pageY,
				};
				var imgWindow=this.imgWindow;
				var imgWStyle=imgWindow.style;
				var oriOffset={
					left:parseFloat(imgWStyle.left),
					top:parseFloat(imgWStyle.top),
				};
				var self=this;
				var moveHandler=function(e){
					imgWStyle.left=oriOffset.left+ e.pageX-mouseCoor.x +'px';
					imgWStyle.top=oriOffset.top + e.pageY-mouseCoor.y +'px';
					self.keepScreenInside();
				};
				var mouseupHandler=function(){
					e.preventDefault();
					self.working=false;
					if(self.tempHand && self.spaceKeyUp){//如果是临时切换到抓手工具，平移完成后返回上个工具
						self.tempHand=false;
						self.changeCursor(self.selectedTool);
					};
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};
				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			rotate:function(origin,topLeft){

				var img=this.img;
				var imgWindow=this.imgWindow;

				var iTransform=img.style[support.cssTransform].replace(/rotate\([^)]*\)/i,'');

				var imgWindowCS=getComputedStyle(imgWindow,'');
				var imgRectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};

				var rectOffset={
					top:parseFloat(imgWindow.style.top),
					left:parseFloat(imgWindow.style.left),
				};

				var imgSize={
					h:img.clientHeight,
					w:img.clientWidth,
				};

				var imgOffset={
					top:parseFloat(img.style.top),
					left:parseFloat(img.style.left),
				};


				var self=this;
				var PI=Math.PI;

				var rotate=function (radians){
					if(self.rotatedRadians==radians)return;
					img.style[support.cssTransform] = ' rotate('+ radians +'rad) ' + iTransform;
					ImgWindowC.rotateIndicatorPointer.style[support.cssTransform]='rotate('+ radians +'rad)';

					self.rotatedRadians=radians;
					self.setToolBadge('rotate',radians/(PI/180));

					var afterimgRectSize=self.getRotatedImgRectSize( radians, imgSize );
					imgWindow.style.width=afterimgRectSize.w +'px';
					imgWindow.style.height=afterimgRectSize.h + 'px';
					if(!topLeft)self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize);
					self.setImgOffset(imgOffset,imgRectSize,afterimgRectSize);
					self.keepScreenInside();
				};


				if(typeof origin=='number'){
					rotate(origin);
					return;
				};


				this.working=true;

				var lastRotatedRadians=this.rotatedRadians;
				this.shiftKeyUp=true;
				var shiftRotateStep=prefs.shiftRotateStep / (180/Math.PI);//转成弧度

				var moveHandler=function(e){
					var radians=lastRotatedRadians + Math.atan2( e.pageY - origin.pageY, e.pageX - origin.pageX );

					if(radians>2*PI){
						radians-=2*PI;
					}else if(radians<0){
						radians+=2*PI;
					};

					if(!self.shiftKeyUp){//如果按下了shift键，那么步进缩放
						radians -= radians % shiftRotateStep;
						radians += shiftRotateStep;
					};
					rotate(radians);
				};

				var mouseupHandler=function(){
					self.working=false;
					ImgWindowC.rotateIndicator.style.display='none';
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};

				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			getNextZoomLevel:function(){
				var level;
				var self=this;
				if(this.zoomOut){//缩小
					ImgWindowC.zoomRangeR._find(function(value){
						if(value < self.zoomLevel){
							level=value;
							return true;
						}
					})
				}else{
					ImgWindowC.zoomRange._find(function(value){
						if(value > self.zoomLevel){
							level=value;
							return true;
						};
					});
				}
				return level;
			},
			getZoomRatio:function(mouseCoor){
				var ibcRect=this.img.getBoundingClientRect();
				var ratio={
					x:(mouseCoor.x-ibcRect.left)/ibcRect.width,
					y:(mouseCoor.y-ibcRect.top)/ibcRect.height,
				};
				if(ratio.x<0){
					ratio.x=0
				}else if(ratio.x>1){
					ratio.x=1
				};
				if(ratio.y<0){
					ratio.y=0
				}else if(ratio.y>1){
					ratio.y=1
				};
				return ratio;
			},
			zoom:function(e,ratio){//e可能是undefined,可能是事件对象，可能是直接的缩放级别数字
				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var imgRectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};

				var rectOffset={
					top:parseFloat(imgWindow.style.top),
					left:parseFloat(imgWindow.style.left),
				};

				var img=this.img;
				var self=this;

				var zoom=function(level){//缩放到指定级别
					if(typeof level==='undefined' || level<0 || level==self.zoomLevel)return;

					var afterImgSize={
						h:self.imgNaturalSize.h * level,
						w:self.imgNaturalSize.w * level,
					};
					img.width=afterImgSize.w;
					img.height=afterImgSize.h;

					var afterimgRectSize=self.getRotatedImgRectSize( self.rotatedRadians, afterImgSize );
					imgWindow.style.width=afterimgRectSize.w +'px';
					imgWindow.style.height=afterimgRectSize.h + 'px';
					self.setImgWindowOffset(rectOffset,imgRectSize,afterimgRectSize,ratio);
					self.setImgOffset({top:0,left:0},afterImgSize,afterimgRectSize);//如果旋转了，调整偏移
					self.zoomLevel=level;
					self.setToolBadge('zoom',level);
					self.keepScreenInside();
				};

				if(typeof e!='object'){
					ratio=ratio? ratio : {
						x:1/2,
						y:1/2,
					};
					zoom(e);
					return;
				};

				this.working=true;

				ratio=this.getZoomRatio({
					x:e.clientX,
					y:e.clientY,
				});


				var moved;
				var lastPageX=e.pageX;
				var currentLevel=this.zoomLevel;
				var moveHandler=function(e){
					moved=true;
					var pageX=e.pageX;
					var level;
					if(pageX > lastPageX){//向右移，zoomin扩大
						self.changeCursor('zoom',false);
						level=0.05;
					}else{//向左移，zoomout缩小
						self.changeCursor('zoom',true);
						level=-0.05;
					};
					lastPageX=pageX;
					currentLevel += level;
					zoom(currentLevel);
				};

				var mouseupHandler=function(e){
					self.working=false;
					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);

					var level=self.getNextZoomLevel();

					if(self.zoomOut && self.altKeyUp){
						self.zoomOut=false;
					};

					if(!moved){//如果没有平移缩放。
						zoom(level);
					};

					self.changeCursor('zoom',self.zoomOut);

					if(self.tempZoom && self.ctrlKeyUp && self.altKeyUp){
						self.tempZoom=false;
						self.changeCursor(self.selectedTool);
					};

				};

				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
			convertToValidRadians:function(radians){
				//转成0-90的等价角度。
				var PI=Math.PI;
				if(radians > PI){
					radians = 2*PI - radians;
				};
				if(radians > 1/2*PI){
					radians = PI - radians;
				};
				return radians;
			},
			getRotatedImgRectSize:function( radians, imgSize ){//通过旋转后的角度和图片的大小，求虚拟矩形的大小
				imgSize= imgSize ? imgSize :{
					h:this.img.clientHeight,
					w:this.img.clentWidth,
				};

				if(typeof radians==='undefined'){
					radians = this.rotatedRadians;
				};

				radians=this.convertToValidRadians(radians);

				return {
					h:imgSize.h* Math.cos(radians) + imgSize.w * Math.sin(radians),
					w:imgSize.h* Math.sin(radians) + imgSize.w * Math.cos(radians),
				};
			},
			getRotatedImgCliSize:function(rectSize,radians){//通过虚拟矩形的大小和图片的旋转角度，求图片的大小

				if(typeof radians==='undefined'){
					radians = this.rotatedRadians;
				};

				radians=this.convertToValidRadians(radians);

				if(radians==0){
					//radians=Math.PI/180 * 1/100;
					return rectSize;
				};

				var h=(rectSize.h-rectSize.w * Math.tan(radians))/(Math.cos(radians)-Math.sin(radians)*Math.tan(radians));
				var w=(rectSize.h - h*Math.cos(radians))/Math.sin(radians);
				return {
					h:h,
					w:w,
				};

			},
			setImgOffset:function(oriOffset,bImgSize,aImgSize){
				var imgStyle=this.img.style;
				var top=Math.floor(oriOffset.top + (aImgSize.h-bImgSize.h)*1/2) + 'px';
				var left=Math.floor(oriOffset.left + (aImgSize.w-bImgSize.w)*1/2) + 'px';
				imgStyle.top= top;
				imgStyle.left= left;
			},
			setImgWindowOffset:function(oriOffset,bImgWindowSize,aImgWidnowSize,ratio){
				ratio= ratio? ratio : {x:1/2,y:1/2};
				var imgWindowStyle=this.imgWindow.style;
				var top=oriOffset.top - (aImgWidnowSize.h-bImgWindowSize.h)*ratio.y + 'px';
				var left=oriOffset.left - (aImgWidnowSize.w-bImgWindowSize.w)*ratio.x + 'px';
				imgWindowStyle.top= top;
				imgWindowStyle.left= left;
			},
			setToolBadge:function(tool,content){
				var scale=0;
				switch(tool){
					case 'zoom':{
						scale=2;
					}break;
					case 'rotate':{
						scale=1;
					}break;
					default:break;
				}
				content=typeof content=='string'? content : content.toFixed(scale);
				this.toolMap[tool].nextElementSibling.textContent=content;
			},
			changeCursor:function(tool,zoomOut){
				if(tool=='zoom'){
					tool+=zoomOut? '-out' : '-in';
				};
				if(this.cursor==tool)return;
				this.cursor=tool;
				var imgWStyle=this.imgWindow.style;
				switch(tool){
					case 'hand':{
						imgWStyle.cursor='pointer';
					}break;
					case 'zoom-in':{
						imgWStyle.cursor=support.cssCursorValue.zoomIn;
					}break;
					case 'zoom-out':{
						imgWStyle.cursor=support.cssCursorValue.zoomOut;
					}break;
					case 'rotate':{
						imgWStyle.cursor='progress';
					}break;
					case 'default':{
						imgWStyle.removeProperty('cursor');
					}break;
					default:break;
				};
			},
			blur:function(e){
				if(!this.focused)return;
				var imgWindow =this.imgWindow;
				//点击imgWinodw的外部的时候失去焦点
				if(e!==true && (imgWindow==e.target || (imgWindow.compareDocumentPosition(e.target) & 16)))return;
				imgWindow.classList.remove('pv-pic-window-container_focus');
				this.toolbar.classList.remove('pv-pic-window-toolbar_focus');
				this.closeButton.classList.remove('pv-pic-window-close_focus');
				this.img.classList.remove('pv-pic-window-pic_focus');
				document.removeEventListener('mousedown',this._blur,true);
				document.removeEventListener('keydown',this._focusedKeydown,true);
				document.removeEventListener('keyup',this._focusedKeyup,true);
				this.changeCursor('default');
				this.focused=false;
			},
			focus:function(){
				if(this.focused)return;
				this.imgWindow.classList.add('pv-pic-window-container_focus');
				this.toolbar.classList.add('pv-pic-window-toolbar_focus');
				this.closeButton.classList.add('pv-pic-window-close_focus');
				this.img.classList.add('pv-pic-window-pic_focus');
				this.imgWindow.style.zIndex= ImgWindowC.styleZIndex;
				this.zIndex=ImgWindowC.styleZIndex;
				ImgWindowC.styleZIndex ++;
				document.addEventListener('keydown',this._focusedKeydown,true);
				document.addEventListener('keyup',this._focusedKeyup,true);
				document.addEventListener('mousedown',this._blur,true);
				this.changeCursor(this.selectedTool);//还原鼠标样式。
				this.focused=true;
			},
			focusedKeyup:function(e){
				var keyCode=e.keyCode;
				var valid=[32,18,16,72,17,72,82,90,67];
				if(valid.indexOf(keyCode)==-1)return;

				e.preventDefault();

				switch(keyCode){
					case 32:{//空格键，临时切换到移动
						this.spaceKeyUp=true;
						if(!this.tempHand)return;//如果之前没有临时切换到抓手工具（当已经在工作的时候，按下空格不会临时切换到抓手工具）
						if(!this.working){//松开按键的时候，没有在继续平移了。
							this.tempHand=false;
							this.changeCursor(this.selectedTool);
						};
					}break;
					case 18:{//alt键盘切换缩小放大。
						this.altKeyUp=true;
						if(!this.zoomOut)return;
						if(!this.working){
							this.zoomOut=false;
							this.changeCursor('zoom');
							if(this.tempZoom && this.ctrlKeyUp){
								this.tempZoom=false;
								this.changeCursor(this.selectedTool);
							};
						};
					}break;
					case 16:{//shift键，旋转的时候按住shift键，步进缩放。
						this.shiftKeyUp=true;
					}break;
					case 17:{//ctrl键
						clearTimeout(this.ctrlkeyDownTimer);
						if(!this.justCKeyUp){//如果刚才没有松开c，规避划词软件的ctrl+c松开
							this.ctrlKeyUp=true;
							if(!this.tempZoom)return;//如果没有切换到了缩放
							if(!this.working && this.altKeyUp){
								this.tempZoom=false;
								this.changeCursor(this.selectedTool);
							};
						};
					}break;
					case 67:{//c键
						this.justCKeyUp=true;
						var self=this;
						clearTimeout(this.justCKeyUpTimer);
						this.justCKeyUpTimer=setTimeout(function(){
							self.justCKeyUp=false;
						},100)
					}break;
					case 72:{//h键
						this.hKeyUp=true;
					}break;
					case 82:{//r键
						this.rKeyUp=true;
					}break;
					case 90:{//z键
						this.zKeyUp=true;
					}break;
					default:break;
				};

				if([72,82,90].indexOf(keyCode)!=-1){
					if(!this.working && this.restoreBeforeTool){
						this.restoreBeforeTool=false;
						this.selectTool(this.beforeTool);
					};
				};
			},
			focusedKeydown:function(e){
				var keyCode=e.keyCode;
				var valid=[32,82,72,90,18,16,17,27,67];//有效的按键
				if(valid.indexOf(keyCode)==-1) return;

				e.preventDefault();

				if(this.working){//working的时候也可以接受按下shift键，以便旋转的时候可以任何时候按下
					if(keyCode==16){//shift键
						this.shiftKeyUp=false;
					};
					return;
				};

				switch(keyCode){
					case 82:{//r键,切换到旋转工具
						if(this.rKeyUp){
							this.rKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('rotate');
						};
					}break;
					case 72:{//h键,切换到抓手工具
						if(this.hKeyUp){
							this.hKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('hand');
						};
					}break;
					case 90:{//z键,切换到缩放工具
						if(this.zKeyUp){
							this.zKeyUp=false;
							this.beforeTool=this.selectedTool;
							this.selectTool('zoom');
						};
					}break;
					case 32:{//空格键阻止,临时切换到抓手功能
						if(this.spaceKeyUp){
							this.spaceKeyUp=false;
							if(this.selectedTool!='hand'){
								this.tempHand=true;
								this.changeCursor('hand');
							};
						};
					}break;
					case 18:{//alt键,在当前选择是缩放工具的时候，按下的时候切换到缩小功能
						if(this.altKeyUp){
							if((this.selectedTool!='zoom' && !this.tempZoom) || this.zoomOut)return;
							this.zoomOut=true;
							this.altKeyUp=false;
							this.changeCursor('zoom',true);
						};
					}break;
					case 17:{//ctrl键临时切换到缩放工具
						if(this.ctrlKeyUp){
							var self=this;
							this.ctrlkeyDownTimer=setTimeout(function(){//规避词典软件的ctrl+c，一瞬间切换到缩放的问题
								self.ctrlKeyUp=false;
								if(self.selectedTool!='zoom'){
									self.tempZoom=true;
									self.changeCursor('zoom');
								};
							},100);
						};
					}break;
					case 67:{//c键
						clearTimeout(this.ctrlkeyDownTimer);
					}break;
					case 27:{//ese关闭窗口
						this.remove();
					}break;
					default:break;
				};
			},
			toolbarEventHandler:function(e){
				e.stopPropagation();
				var target=e.target;
				var toolMap=this.toolMap;
				for(var i in toolMap){
					if(toolMap.hasOwnProperty(i) && toolMap[i]==target){
						switch(e.type){
							case 'mousedown':{
								this.selectTool(i);
							}break;
							case 'dblclick':{
								this.dblclickCommand(i);
							}break;
							default:break;
						};
						break;
					};
				};
			},
			imgWindowEventHandler:function(e){
				e.stopPropagation();
				switch(e.type){
					case 'click':{//阻止opera的图片保存
						if(e.ctrlKey && e.target.nodeName=='IMG'){
							e.preventDefault();
						};
					}break;
					case 'mousedown':{
						if(!this.focused){//如果没有focus，先focus
							this.focus();
							this.keepScreenInside();
						};

						var target=e.target;
						if(e.button!=0 || (target!=this.imgWindow && target!=this.img))return;
						var selectedTool=this.selectedTool;
						if(this.tempHand){
							this.move(e);
						}else if(this.tempZoom){
							this.zoom(e);
						}else if(selectedTool=='hand'){
							this.restoreBeforeTool=!this.hKeyUp;
							if(this.hKeyUp){
								this.move(e);
							}else{//鸟瞰视图
								this.aerialView(e);
							};
						}else if(selectedTool=='rotate'){
							var rIS=ImgWindowC.rotateIndicator.style;
							rIS.display='block';
							var origin={//旋转原点
								pageX:e.pageX - 30,//稍微偏左一点。
								pageY:e.pageY,
							};
							rIS.top=origin.pageY + 'px';
							rIS.left=origin.pageX + 'px';
							ImgWindowC.rotateIndicatorPointer.style[support.cssTransform]='rotate(' + this.rotatedRadians + 'rad)';
							this.restoreBeforeTool=!this.rKeyUp;
							this.rotate(origin);
						}else if(selectedTool=='zoom'){
							this.restoreBeforeTool=!this.zKeyUp;
							this.zoom(e);
						};
					}break;
					case 'wheel':{
						if(!this.focused)return;//如果没有focus
						if(e.deltaY===0)return;//非Y轴的滚动
						e.preventDefault();
						if(this.working)return;
						var oriZoomOut=this.zoomOut;
						this.zoomOut = !!(e.deltaY > 0);

						var ratio=this.getZoomRatio({
							x:e.clientX,
							y:e.clientY,
						});

						var level=this.getNextZoomLevel();

						this.zoom(level,ratio);
						this.zoomOut=oriZoomOut;
					}break;
					default:break;
				};
			},
			dblclickCommand:function(tool){
				var done;
				switch(tool){
					case 'hand':{//双击居中,并且适应屏幕
						this.zoom(1);
						this.fitToScreen();
						this.center(true,true);
						this.keepScreenInside();
					}break;
					case 'rotate':{//双击还原旋转
						if(this.rotatedRadians==0)return;
						done=true;
						this.rotate(0,true);
					}break;
					case 'zoom':{//双击还原缩放
						if(this.zoomLevel==1)return;
						done=true;
						this.zoom(1,{x:0,y:0});
					}break;
					default:break;
				};

				if((tool=='rotate' || tool=='zoom') && done){
					var imgWindow=this.imgWindow;
					var imgWinodowRect=imgWindow.getBoundingClientRect();
					var imgWindowStyle=imgWindow.style;
					if(imgWinodowRect.left<40){
						imgWindowStyle.left=40 + window.scrollX + 'px';
					};
					if(imgWinodowRect.top<-5){
						imgWindowStyle.top=-5 + window.scrollY +'px';
					};
					this.keepScreenInside();
				};

				},
			doFlipCommand:function(command){
				var map={
					fv:[/scaleY\([^)]*\)/i,' scaleY(-1) '],
					fh:[/scaleX\([^)]*\)/i,' scaleX(-1) '],
				};

				var iTransform=this.img.style[support.cssTransform];

				var toolClassList=this.toolMap[command].classList;

				if(map[command][0].test(iTransform)){
					iTransform=iTransform.replace(map[command][0],'');
					toolClassList.remove(this.selectedToolClass);
				}else{
					iTransform += map[command][1];
					toolClassList.add(this.selectedToolClass);
				};
				this.img.style[support.cssTransform]=iTransform;
				
			},
			selectTool:function(tool){
				var command=['fv','fh'];
				if(command.indexOf(tool)==-1){//工具选择
					if(this.selectedTool==tool)return;
					var selectedTool=this.selectedTool;
					this.selectedTool=tool;
					if(this.tempHand || this.tempZoom){//临时工具中。不变鼠标
						return;
					};
					this.toolMap[selectedTool].classList.remove(this.selectedToolClass);
					this.toolMap[tool].classList.add(this.selectedToolClass);
					this.changeCursor(tool);
				}else{//命令
					this.doFlipCommand(tool);
				};
			},
			remove:function(){
				if(this.removed)return;
				this.removed=true;
				this.blur(true);
				this.img.src='';//如果在加载中取消，图片也取消读取。
				if(this.overlayer){
					this.overlayer.parentNode.removeChild(this.overlayer);
				};
				this.imgWindow.parentNode.removeChild(this.imgWindow);

				var index=ImgWindowC.all.indexOf(this);
				ImgWindowC.all.splice(index,1);

				//focus next
				var topmost=0;
				ImgWindowC.all.forEach(function(iwin){
					if(iwin.zIndex > topmost){
						topmost=iwin;
					};
				});
				if(topmost){
					topmost.focus();
				};
			},
			aerialView:function(e){
				this.working=true;
				//记住现在的缩放比例
				var cLevel=this.zoomLevel;

				var wSize=getWindowSize();
				wSize.h -= 16;
				wSize.w -= 16;

				var imgWindow=this.imgWindow;
				var imgWindowCS=getComputedStyle(imgWindow,'');
				var rectSize={
					h:parseFloat(imgWindowCS.height),
					w:parseFloat(imgWindowCS.width),
				};
				var rectRatio=rectSize.h/rectSize.w;
				var windowRatio=wSize.h/wSize.w;

				var size;
				var rangeSize={};
				if(rectRatio > windowRatio){
					size={
						h:wSize.h,
						w:wSize.h / rectRatio,
					};
					rangeSize.h=Math.min(wSize.h *  (size.h / rectSize.h), size.h);
					rangeSize.w=Math.min(rangeSize.h / windowRatio , size.w);
				}else{
					size={
						w:wSize.w,
						h:wSize.w * rectRatio,
					};
					rangeSize.w=Math.min(wSize.w *  (size.w / rectSize.w), size.w);
					rangeSize.h=Math.min(rangeSize.w * windowRatio , size.h);
				};


				this.zoom(this.getRotatedImgCliSize(size).w/this.imgNaturalSize.w);

				this.center(true,true);

				this.keepScreenInside();

				var viewRange=this.viewRange;
				var vRS=viewRange.style;
				vRS.display='block';
				vRS.height=rangeSize.h + 'px';
				vRS.width=rangeSize.w + 'px';
				vRS.top=0 + 'px';
				vRS.left=0 + 'px';
				


				var viewRangeRect=viewRange.getBoundingClientRect();
				var viewRangeCenterCoor={
					x:viewRangeRect.left + window.scrollX + 1/2 * rangeSize.w,
					y:viewRangeRect.top + window.scrollY + 1/2 * rangeSize.h,
				};

				var self=this;

				var moveRange={
					x:[8,8+size.w-rangeSize.w],
					y:[8,8+size.h-rangeSize.h]
				};


				function setViewRangePosition(pageXY){
					var top=pageXY.y - viewRangeCenterCoor.y;
					var left=pageXY.x - viewRangeCenterCoor.x;
					if(top<=moveRange.y[0]){
						top=moveRange.y[0];
					}else if(top>=moveRange.y[1]){
						top=moveRange.y[1];
					};
					vRS.top= top + 'px';
					if(left<=moveRange.x[0]){
						left=moveRange.x[0];
					}else if(left>=moveRange.x[1]){
						left=moveRange.x[1];
					};
					vRS.left= left + 'px';
				};

				setViewRangePosition({
					x:e.pageX,
					y:e.pageY,
				});

				var moveHandler=function(e){
					setViewRangePosition({
						x:e.pageX,
						y:e.pageY,
					});
				};

				var mouseupHandler=function(){
					self.working=false;
					viewRange.style.display='none';
					self.zoom(cLevel);
					imgWindow.style.top= -13 -  rectSize.h * ((parseFloat(vRS.top) - moveRange.y[0])/size.h) + window.scrollY +'px'; 
					imgWindow.style.left= -13 - rectSize.w * ((parseFloat(vRS.left) - moveRange.x[0])/size.w) + window.scrollX +'px';
					
					//说明图片的高度没有屏幕高，居中
					//说明图片的宽度没有屏幕宽，居中
					self.center(rangeSize.w == size.w , rangeSize.h == size.h);

					self.keepScreenInside();

					document.removeEventListener('mousemove',moveHandler,true);
					document.removeEventListener('mouseup',mouseupHandler,true);
				};
				document.addEventListener('mousemove',moveHandler,true);
				document.addEventListener('mouseup',mouseupHandler,true);
			},
		};


		//载入动画
		function LoadingAnimC(data,buttonType,waitImgLoad,openInTopWindow){
			this.data=data;//data
			this.buttonType=buttonType;//点击的按钮类型
			this.openInTopWindow=openInTopWindow;//是否在顶层窗口打开，如果在frame里面的话
			this.waitImgLoad=waitImgLoad;//是否等待完全读取后打开
			this.init();
		};

		LoadingAnimC.all=[];

		LoadingAnimC.prototype={
			init:function(){
				LoadingAnimC.all.push(this);
				this.addStyle();
				var container=document.createElement('span');

				container.classList.add('pv-loading-container');
				this.loadingAnim=container;

				container.title='正在加载:' + this.data.src;
				container.innerHTML=''+
									'<span class="pv-loading-error" style="display:none;">Error</span>'+
									'<span class="pv-loading-cancle" title="取消"></span>';


				var loadingError=container.querySelector('.pv-loading-error');
				var loadingCancle=container.querySelector('.pv-loading-cancle');

				this.loadingError=loadingError;
				this.loadingCancle=loadingCancle;

				var self=this;
				loadingCancle.addEventListener('click',function(e){
					self.imgReady.abort();
					self.remove();
				},true);

				document.body.appendChild(container);
				this.setPosition();

				var img=new Image();
				img.src= this.buttonType=='current'? this.data.imgSrc : this.data.src;

				var opts={
					error:function(e){
						self.error(this,e);
					},
				};

				opts[this.waitImgLoad? 'load' : 'ready' ]=function(e){
					self.load(this,e);
				};

				this.imgReady=imgReady(img,opts);
			},
			addStyle:function(){
				if(LoadingAnimC.styleAdded)return;
				LoadingAnimC.styleAdded=true;
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					.pv-loading-container {\
						position: absolute;\
						z-index:999999997;\
						top: 100px;\
						left: 100px;\
						background-color: black;\
						background-image: url("'+prefs.icons.loading+'");\
						background-repeat: no-repeat;\
						background-position: center;\
						background-origin: content-box;\
						border: none;\
						padding: 1px 30px 1px 2px;\
						margin: 0;\
						opacity: 0.6;\
						height: 24px;\
						min-width: 24px;\
						box-shadow: 2px 2px 0px #666;\
						-webkit-transition: opacity 0.15s ease-in-out;\
						transition: opacity 0.15s ease-in-out;\
					}\
					.pv-loading-container:hover {\
						opacity: 0.9;\
					}\
					.pv-loading-cancle {\
						cursor: pointer;\
						background-image: url("'+prefs.icons.loadingCancle+'");\
						height: 24px;\
						width: 24px;\
						position: absolute;\
						right: 0;\
						top: 0;\
						opacity: 0.2;\
						display: block;\
						-webkit-transition: opacity 0.15s ease-in-out;\
						transition: opacity 0.15s ease-in-out;\
					}\
					.pv-loading-cancle:hover {\
						opacity: 1;\
					}\
					.pv-loading-error {\
						line-height: 24px;\
						color: red;\
						font-size: 12px;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			remove:function(){
				if(!this.removed){
					this.removed=true;
					this.loadingAnim.parentNode.removeChild(this.loadingAnim);
					LoadingAnimC.all.splice(LoadingAnimC.all.indexOf(this),1);
				};
			},
			error:function(img,e){
				this.loadingAnim.style.backgroundImage='none';
				this.loadingError.style.removeProperty('display');
				var self=this;
				setTimeout(function(){
					self.remove();
				},2000)
			},
			setPosition:function(){
				var position=getTargetPosition(this.data.img);
				var cs=this.loadingAnim.style;
				cs.top=position.top +1 + 'px';
				cs.left=position.left +1 + 'px';
				cs.removeProperty('display');
			},
			load:function(img,e){
				this.remove();
				this.img=img;
				var buttonType=this.buttonType;

				if(buttonType=='gallery'){
					var allData=this.getAllValidImgs();
					allData.target=this.data;
					this.data=allData;
				};

				if(this.openInTopWindow && isFrame && buttonType!='magnifier'){
					var data=this.data;
					//删除不能发送的项。
					var delCantClone=function(obj){
						delete obj.img;
						delete obj.imgPA;
					};
					if(Array.isArray(data)){
						delCantClone(data.target);
						data.forEach(function(obj){
							delCantClone(obj);
						});
					}else{
						delCantClone(data);
					};

					window.postMessage({
						messageID:messageID,
						src:img.src,
						data:data,
						buttonType:buttonType,
						to:'top',
					},'*');
				}else{
					this.open();
				};


			},
			getAllValidImgs:function(){
				var imgs=document.getElementsByTagName('img'),//html collection
					validImgs=[]
				;
				arrayFn.forEach.call(imgs,function(img,index,imgs){
					var result=findPic(img);
					if(result){
						validImgs.push(result);
					};
				});
				return validImgs;
			},
			open:function(){
				switch(this.buttonType){
					case 'gallery':{
						if(!gallery){
							gallery=new GalleryC();
						};
						gallery.load(this.img,this.data,this.from);
					}break;
					case 'magnifier':{
						new MagnifierC(this.img,this.data);
					}break;
					case 'actual':;
					case 'current':;
					case 'original':{//original 是为了兼容以前的规则
						new ImgWindowC(this.img);
					}break;
				};
			},
		};

		//工具栏
		function FloatBarC(){
			this.init();
		};


		FloatBarC.prototype={
			init:function(){
				this.addStyle();
				var container=document.createElement('span');
				container.id='pv-float-bar-container';
				//innerHTML中的span不能加空格
				container.innerHTML=''+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>'+
									'<span class="pv-float-bar-button"></span>';
				document.body.appendChild(container);

				var buttons={};
				this.buttons=buttons;
				this.children=container.children;

				arrayFn.forEach.call(this.children,function(child,index,children){
					var titleMap={
						actual:'Tamaño REAL Size',
						gallery:'Picture Gallery | Galeria de Imágenes',
						current:'Current Size | Tamaño Actual',
						magnifier:'Lupa | Magnifier',
					};
					var buttonName=prefs.floatBar.butonOrder[index];
					buttons[buttonName]=child;
					child.title=titleMap[buttonName];
					child.classList.add('pv-float-bar-button-' + buttonName);
				});


				this.floatBar=container;
				this.shown=true;
				this.preShownImg=null;


				var self=this;
				container.addEventListener('click',function(e){
					var buttonType;
					var target=e.target;
					for(var type in buttons){
						if(!buttons.hasOwnProperty(type))return;
						if(target==buttons[type]){
							buttonType=type;
							break;
						};
					};
					if(!buttonType)return;

					self.hide();
					self.open(e,buttonType);

				},true);


				addCusMouseEvent('mouseleave',container,function(e){
					clearTimeout(self.hideTimer);
					self.hideTimer=setTimeout(function(){
						self.hide();
					},prefs.floatBar.hideDelay);
				});

				addCusMouseEvent('mouseenter',container,function(e){
					clearTimeout(self.hideTimer);
				});
			},
			addStyle:function(){
				var style=document.createElement('style');
				style.type='text/css';
				style.textContent='\
					#pv-float-bar-container {\
						position: absolute;\
						z-index:999999998;\
						top: -100px;\
						left: -100px;\
						padding: 5px;\
						margin: 0;\
						border: none;\
						opacity: 0.6;\
						line-height: 0;\
						-webkit-transition: opacity 0.2s ease-in-out;\
						transition: opacity 0.2s ease-in-out;\
					}\
					#pv-float-bar-container:hover {\
						opacity: 1;\
					}\
					.pv-float-bar-button {\
						cursor: pointer;\
						width: 18px;\
						height: 18px;\
						padding: 1px;\
						margin: 0;\
						border: none;\
						display: inline-block;\
						position: relative;\
						border-radius: 100px;\
						box-shadow: 1px 1px 3px 0px black;\
						background-color: transparent;\
						background-repeat: no-repeat;\
						background-origin: content-box;\
						background-clip: content-box;\
						background-size: 100% 100%;\
						-webkit-transition: margin-left 0.15s ease-in-out,  width 0.15s ease-in-out,  height 0.15s ease-in-out;\
						transition: margin-left 0.15s ease-in-out,  width 0.15s ease-in-out,  height 0.15s ease-in-out;\
					}\
					.pv-float-bar-button:nth-child(n+2){\
						margin-left: -16px;\
					}\
					.pv-float-bar-button:first-child {\
						z-index: 4;\
					}\
					.pv-float-bar-button:nth-child(2) {\
						z-index: 3;\
					}\
					.pv-float-bar-button:nth-child(3) {\
						z-index: 2;\
					}\
					.pv-float-bar-button:last-child {\
						z-index: 1;\
					}\
					#pv-float-bar-container:hover > .pv-float-bar-button {\
						width: 24px;\
						height: 24px;\
					}\
					#pv-float-bar-container:hover > .pv-float-bar-button:nth-child(n+2) {\
						margin-left: 0;\
					}\
					.pv-float-bar-button-actual {\
						background-image:url("'+ prefs.icons.actual +'");\
						background-color: red;\
					}\
					.pv-float-bar-button-gallery {\
						background-image:url("'+ prefs.icons.gallery +'");\
						background-color: yellow;\
					}\
					.pv-float-bar-button-current {\
						background-image:url("'+ prefs.icons.current +'");\
						background-color: blue;\
					}\
					.pv-float-bar-button-magnifier {\
						background-image:url("'+ prefs.icons.magnifier +'");\
						background-color: pink;\
					}\
				';
				document.querySelector('head').appendChild(style);
			},
			start:function(data){

				//读取中的图片,不显示浮动栏,调整读取图标的位置.
				if(LoadingAnimC.all._find(function(item,index,array){
					if(data.img==item.data.img){
						return true;
					};
				}))return;


				//被放大镜盯上的图片,不要显示浮动栏.
				if(MagnifierC.all._find(function(item,index,array){
					if(data.img==item.data.img){
						return true;
					};
				}))return;

				this.data=data;
				var self=this;
				clearTimeout(this.hideTimer);

				var imgOutHandler=function(e){
					document.removeEventListener('mouseout',imgOutHandler,true);
					clearTimeout(self.showTimer);
					clearTimeout(self.hideTimer);
					self.hideTimer=setTimeout(function(){
						self.hide();
					},prefs.floatBar.hideDelay);
				};

				clearTimeout(this.globarOutTimer);
				this.globarOutTimer=setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
					document.addEventListener('mouseout',imgOutHandler,true);
				},100);


				if(data.img==this.preShownImg && this.shown){
					this.setPosition();
					return;
				};

				clearTimeout(this.showTimer);
				this.showTimer=setTimeout(function(){
					self.show();
				},prefs.floatBar.showDelay);
			},
			setButton:function(){
				if(this.data.type=='force'){
					this.buttons['actual'].style.display='none';
					this.buttons['magnifier'].style.display='none';
				}else{
					this.buttons['actual'].style.removeProperty('display');
					this.buttons['magnifier'].style.removeProperty('display');
				};

				//如果隐藏的按钮是第一个，css弹出层叠按钮的动画会有些维和，这些修正一下。
				var firstHidden;
				arrayFn._find.call(this.children,function(child, index, children){
					var cs=child.style;
					if(index==0){
						if(cs.display=='none'){
							firstHidden=true;
						};
					};

					if(firstHidden){//如果第一个是隐藏的，那么去掉以后第一个非隐藏的marginleft
						if(cs.display!='none'){
							cs.marginLeft=0;
							return true;
						};
					}else{
						cs.removeProperty('margin-left');
					};
				});
			},
			setPosition:function(){
				//如果图片被删除了，或者隐藏了。
				var bCR=this.data.img.getBoundingClientRect();

				if((bCR.left==0 && bCR.right==0) || (bCR.top==0 && bCR.bottom==0))return false;

				var targetPosi=getTargetPosition(this.data.img);
				var windowSize=getWindowSize();

				var floatBarPosi=prefs.floatBar.position.toLowerCase().trim().split(/\s+/);

				var offsetX=prefs.floatBar.offset.x;
				var offsetY=prefs.floatBar.offset.y;


				var scrollXY={
					x:window.scrollX,
					y:window.scrollY,
				};

				var fbs=this.floatBar.style;
				var setPosition={
					top:function(){
						var top=targetPosi.top;
						if(targetPosi.t < -offsetY){//满足图标被遮住的条件.
							top=scrollXY.y;
							offsetY=0;
						};
						fbs.top=top + offsetY + 'px';
					},
					right:function(){
						var right=windowSize.w - targetPosi.r;
						if(right < offsetX){
							right= -scrollXY.x;
							offsetX=0;
						}else{
							right -=scrollXY.x;
						};
						fbs.right=right - offsetX + 'px';
					},
					bottom:function(){
						var bottom=windowSize.h-targetPosi.b;
						if(bottom <= offsetY){
							offsetY=0;
						};
						bottom -= scrollXY.y;
						fbs.bottom=bottom - offsetY + 'px';
					},
					left:function(){
						var left=targetPosi.left;
						if(targetPosi.l < -offsetX){
							left=scrollXY.x;
							offsetX=0;
						};
						fbs.left=left + offsetX + 'px';
					},
				};

				setPosition[floatBarPosi[0]]();
				setPosition[floatBarPosi[1]]();
			},
			show:function(){
				if(this.setPosition()===false){
					return;
				};
				this.preShownImg=this.data.img;
				this.shown=true;
				this.setButton();
				this.floatBar.style.removeProperty('display');
				clearTimeout(this.hideTimer);
			},
			hide:function(){
				clearTimeout(this.showTimer);
				this.shown=false;
				this.floatBar.style.display='none';
			},
			open:function(e,buttonType){
				var waitImgLoad=e.ctrlKey? !prefs.waitImgLoad : prefs.waitImgLoad;//按住ctrl取反向值
				var openInTopWindow=e.shiftKey? !prefs.framesPicOpenInTopWindow : prefs.framesPicOpenInTopWindow;//按住shift取反向值

				if(!waitImgLoad && buttonType=='magnifier' && !envir.chrome){//非chrome的background-image需要全部载入后才能显示出来
					waitImgLoad=true;
				};
				new LoadingAnimC(this.data,buttonType,waitImgLoad,openInTopWindow);
			},
		};


		var matchedRule,
			URL=location.href,
			floatBar
		;

		function findPic(img){
			var imgPA=getElementByXpath('./ancestor::a[1]',img);

			var iPASrc=imgPA? imgPA.href : '';
			//base64字符串过场导致正则匹配卡死浏览器
			var base64Img=/^data:[^;]+;base64,/i.test(img.src);


			if(matchedRule===undefined){//找到符合站点的高级规则,并缓存.
				matchedRule=siteInfo._find(function(site,index,array){
					if(site.enabled && site.url && site.url.test(URL)){
						return true;
					};
				});
				matchedRule=matchedRule? matchedRule[0] : false;
				//console.log('匹配的规则：',matchedRule);
			};

			var src, type;

			if(!src && matchedRule){//通过高级规则获取.
				try{
					src=matchedRule.getImage.call(img,img,imgPA);
				}catch(err){
					throwErrorInfo(err);
				};

				if(src)type='rule';
			};

			if(!src && !base64Img){//遍历通配规则
				tprules._find(function(rule,index,array){
					try{
						src=rule.call(img,img,imgPA);
						if(src){
							//console.log('匹配的通配规则',rule);
							return true;
						};
					}catch(err){
						throwErrorInfo(err);
					};
				});
				if(src)type='tpRule';
			};

			if(!src && imgPA){//链接可能是一张图片...
				if(/\.(?:jpg|jpeg|png|gif|bmp)$/i.test(iPASrc)){
					src=iPASrc;
				};
				if(src)type='scale';
			};

			if(!src){//本图片是否被缩放.
				var imgAS={//实际尺寸。
					h:img.naturalHeight,
					w:img.naturalWidth,
				};
				var imgCS=getCurrentSize(img);
				if(!(imgAS.w==imgCS.w && imgAS.h==imgCS.h)){//如果不是两者完全相等,那么被缩放了.
					if(imgAS.h > prefs.floatBar.minSizeLimit.h || imgAS.w > prefs.floatBar.minSizeLimit.w){//最小限定判断.
						src=img.src;
						type='scale';
					};
				}else{
					if(prefs.floatBar.forceShow.enabled && (imgCS.w>=prefs.floatBar.forceShow.size.w && imgCS.h>=prefs.floatBar.forceShow.size.h)){
						src=img.src;
						type='force';
					};
				};
			};


			if(!src)return;

			var ret={
				src:src,//得到的src
				type:type,//通过哪种方式得到的
				imgSrc:img.src,//处理的图片的src
				iPASrc:iPASrc,//图片的第一个父a元素的链接地址

				img:img,//处理的图片
				imgPA:imgPA,//图片的第一个父a元素
			};

			//console.log('图片查找结果:',ret);
			return ret;
		};


		var isFrame=window!=window.parent;

		window.addEventListener('message',function(e){//contentscript里面的message监听，监听来自别的窗口的数据。
			var data=e.data;
			if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
			var source=e.source;
			if(typeof source=='undefined' || source!==window){//来自别的窗口
				if(!isFrame){//顶层窗口
					//console.log('top-contentscript接收到：',e);

/*
					window.postMessage({
						messageID:messageID,
						to:data.from,
						data:'hello',
					},'*');
*/

					var img=new Image();
					img.src=data.src;


					imgReady(img,{
						ready:function(){
							LoadingAnimC.prototype.open.call({
								img:img,
								data:data.data,
								buttonType:data.buttonType,
								from:data.from,//来自哪个窗口
							});
						},
					});
				}else{//frame窗口
					//console.log('frame-contentscript接收到',e);
				};

			};
		},true);



		//页面脚本用来转发消息
		//原因chrome的contentscript无法访问非自己外的别的窗口。都会返回undefined，自然也无法向其他的窗口发送信息,这里用pagescript做个中间代理
		//通讯逻辑..A页面的contentscript发送到A页面的pagescript，pagescript转交给B页面的contentscript

		var messageID='pv-0.5106795670312598';

		var pageScript=document.createElement('script');

		var pageScriptText=function(messageID){
			var frameID=Math.random();
			var frames={
				top:window.top,
			};

			window.addEventListener('message',function(e){
				var data=e.data;
				if( !data || !data.messageID || data.messageID != messageID )return;//通信ID认证
				var source=e.source;
				if(source===window){//来自contentscript,发送出去
					data.from=frameID;
					frames[data.to].postMessage(data,'*');
				}else{//来自别的窗口的，contentscript可以直接接收，这里保存下来自的窗口的引用
					frames[data.from]=source;
				};
			},true)
		};

		pageScript.textContent='(' + pageScriptText.toString() + ')('+ JSON.stringify(messageID) +')';
		document.querySelector('head').appendChild(pageScript);


		function clikToOpen(data){

			var preventDefault = matchedRule.clikToOpen.preventDefault;

			function mouseout(){
				document.removeEventListener('mouseout',mouseout,true);
				document.removeEventListener('click',click,true);
				if(data.imgPA && preventDefault){
					data.imgPA.removeEventListener('click',clickA,false);
				};
			};

			function click(e){
				FloatBarC.prototype.open.call({
					data:data,
				},
				e,
				matchedRule.clikToOpen.type);
			};

			function clickA(e){//阻止a的默认行为
				e.preventDefault();
			};

			document.addEventListener('click',click,true);

			if(data.imgPA && preventDefault){
				data.imgPA.addEventListener('click',clickA,false);
			};

			setTimeout(function(){//稍微延时。错开由于css hover样式发生的out;
				document.addEventListener('mouseout',mouseout,true);
			},100);
			
			return function(){
				mouseout()
			};
		};

		//监听 mouseover
		var canclePreCTO;
		function globalMouseoverHandler(e){

			if(galleryMode)return;//库模式全屏中......

			var target=e.target;
			if(target.nodeName!='IMG' || target.classList.contains('pv-pic-not-allowed')){
				return;
			};

			var result=findPic(target);
			if(result){
				if(!floatBar){
					floatBar=new FloatBarC();
				};
				if(result.type=='rule' && matchedRule.clikToOpen && matchedRule.clikToOpen.enabled){
					if(canclePreCTO){//取消上次的，防止一次点击打开多张图片
						canclePreCTO();
					};
					canclePreCTO=clikToOpen(result);
				};
				floatBar.start(result);//出现悬浮工具栏
			};
		};

		document.addEventListener('mouseover',globalMouseoverHandler,true);
	};


	function init2(){
		init(topObject,window,document,arrayFn,envir);
	};


	var arrayFn=(function(){
		//Array的某些方法对所有的类数组都有效，比如HTMLCollection,NodeList

		//添加一个当函数返回true时，返回[array[index],index]，并且跳出循环的方法
		//类似做到 for 循环，在满足条件的时候直接break跳出的效果。
		if(typeof Array.prototype['_find']!='function'){
			Object.defineProperty(Array.prototype,'_find',{
				value:function(callback , thisArg){
					if (this == null){
						throw new TypeError( "this is null or not defined" );
					};

					if(typeof callback != 'function') {
						throw new TypeError( callback + " is not a function" );
					};

					var i = 0,
						l = this.length,
						value,
						hasOwnProperty=Object.prototype.hasOwnProperty
					;


					while(i<l){
						if(hasOwnProperty.call(this,i)){
							value = this[i];
							if(callback.call( thisArg, value, i, this )===true){
								return [value,i,this];
							};
						};
						i++;
					};
				},
				writable:true,
				enumerable:false,//与原生方法一样不可枚举，维护网页和谐。。。
				configurable:true,
			});
		};

		var arrayProto=Array.prototype;
		return {
			_find:arrayProto._find,
			slice:arrayProto.slice,
			forEach:arrayProto.forEach,
			some:arrayProto.some,
			every:arrayProto.every,
			map:arrayProto.map,
			filter:arrayProto.filter,
			indexOf:arrayProto.indexOf,
			lastIndexOf:arrayProto.lastIndexOf,
		};

	})();


	//检测运行环境
	var envir={
		opera:!!window.opera,
		chrome:!!window.chrome,
		firefox:typeof XPCNativeWrapper=='function'? true : false,
	};


	if(document.readyState=='loading'){
		document.addEventListener('DOMContentLoaded',init2,true);
	}else if(document.readyState!='complete'){
		document.addEventListener('DOMContentLoaded',function(){
			window.removeEventListener('load',init2,true);
			init2();
		},true);
		window.addEventListener('load',init2,true);
	}else{
		init2();
	};
})(this,window,document)

}{     var greasedLightbox = {
	
	aspectRatio : null,
	timer : null, 
	slideTime : 3,
	currentAddress : null,
	allImageLinks : [],
	currentImagePosition : 0,
	lastMove : 1,
	isShowing : false,
	isSlideShow : false,
	searchDefs : [
		// wikipedia (needs to come before 'show')
		{
			name				: 'wikipedia',
			includeRegExp		: /^https?:\/\/(.*?\.)?wikipedia\.org/i,
			linkRegExp			: /.*?\/(Fi(le?|xter|txategi|gura|n?ch(ier|eiro))|Fa(il|sciculus)|Dat(oteka|ei)|Delwedd|Dosiero|Be(stand|rkas)|Billede|Skeudenn|Soubor|Slika|Pilt|Archivo|Mynd|Vaizdas|Tiedosto|Larawan|Resim):.*\.(jpe?g|gif|png)$/i,
			findImageRegExp		: /(.+?)\/thumb\/(.+?)\.(jpe?g|gif|png).*$/i,
			replaceString		: '$1/$2.$3',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'wikipedia'); return false; }
		}, // wikipedia
		
		// imagesocket (needs to come before 'show')
		{
			name				: 'imagesocket',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /^(https?:\/\/)(.*?\.)?imagesocket\.com\/(view|thumbs)\/(.*?\.(jpe?g|gif|png))$/i,
			replaceString		: '$1content.imagesocket.com/images/$4',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagesocket'); return false; }
		}, // imagesocket
		
		// imagesocket site (needs to come before 'show')
		{
			name				: 'imagesocketSite',
			includeRegExp		: /^https?:\/\/(.*?\.)?imagesocket\.com/i,
			linkRegExp			: /^\/view\/(.*?\.(jpe?g|gif|png))$/i,
			replaceString		: 'http://content.imagesocket.com/images/$1',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagesocketSite'); return false; }
		}, // imagesocket site
		
		// blogger/blogspot (needs to come before 'show')
		{
			name				: 'blogger',
			includeRegExp		: /^https?:\/\/(.*?\.)?blog(ger|spot)\.com/i,
			linkRegExp			: /^(https?:\/\/.*?\.blogger\.com\/.*?\/.*?\/.*?\/.*?)\/.*?-h(\/.*?\.(jpe?g|gif|png))$/i,
			replaceString		: '$1$2',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'blogger'); return false; }
		}, // blogger/blogspot
        // radikal.ru
        {
            name                : 'radikal',
            includeRegExp       : /./, // used in every page
            linkRegExp          : /http:\/\/(radikal.ru\/F\/)?(.*\.(jpg|png))(\.html)?$/i,
            replaceString       : 'http://$2',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'radikal'); return false; }
            
        },  // radikal.ru
		// regular links to images
		{
			name				: 'show',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /.*?\.(jpe?g|gif|png)$/i,
			excludeLinkRegExp	: /\?/i,
			showFunction		: function(event) { greasedLightbox.show(event); return false; }
		}, // regular links to images
		
		// picasa
		/* "view in original context" is not worked propertly */
		{
			name				: 'picasa',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /https?:\/\/picasaweb\.google\..*\/.+/i,
			findImageRegExp		: /^(https?:\/\/.*)\/s[0-9]+\/(.*)\.jpg$/i,
			replaceString		: '$1/s1024/$2.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'picasa'); return false; }
		},
		
		// ipicture/upload
		{
			name				: 'ipicture',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /http:\/\/ipicture\.ru\/upload\/(.*(jpg|png|jpeg|gif))$/i,
			replaceString		: 'http://ipicture.ru/upload/$1',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'picasa'); return false; }			
		},
		
		// search engine images (google, yahoo, ask jeeves, blingo)
		{
			name				: 'search',
			includeRegExp		: /^https?:\/\/(.*?\.)?(google\..*|search\.yahoo\.com|blingo\.com\/images)/i, 
			linkRegExp			: /.*?(im(age|g)(ur(i|l)|src))=(http(s?):\/\/)?(.*?)&.*/i,
			replaceString		: 'http$6://$7',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'search'); return false; }
		}, // search engine images
		
		// doubanpic
		{
			name				: 'doubanpic',
			includeRegExp		: /^http:\/\/www\.douban\.com\/subject\/[0-9]+\//i,
			linkRegExp			: /^(http:\/\/t\.douban\.com\/)l(pic\/s[0-9]+\.jpg)/i,
			replaceString		: '$1m$2',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanpic'); return false; }
		}, // doubanpic
		// doubanphoto
		{
			name				: 'doubanphoto',
			includeRegExp		: /^http:\/\/www\.douban\.com\/photos\/album\/[0-9]+\//i,
			linkRegExp			: /^http:\/\/www\.douban\.com\/photos\/photo\/([0-9]+)\/$/i,
			replaceString		: 'http://t.douban.com/view/photo/photo/public/p$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanphoto'); return false; }
		}, // doubanphoto
		// doubanevent
		{
			name				: 'doubanevent',
			includeRegExp		: /^http:\/\/www\.douban\.com\/event\/album\/[0-9]+\//i,
			linkRegExp			: /^http:\/\/www\.douban\.com\/event\/photo\/([0-9]+)\/$/i,
			replaceString		: 'http://t.douban.com/view/photo/photo/public/p$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanevent'); return false; }
		}, // doubanevent
		// doubanonline
		{
			name				: 'doubanonline',
			includeRegExp		: /^http:\/\/www\.douban\.com\/online\/[0-9]+\/album\/[0-9]+\//i,
			linkRegExp			: /^http:\/\/www\.douban\.com\/online\/[0-9]+\/photo\/([0-9]+)\/$/i,
			replaceString		: 'http://img2.douban.com/view/photo/photo/public/p$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanonline'); return false; }
		}, // doubanonline
		// doubanartist1
		{
			name				: 'doubanartist1',
			includeRegExp		: /^http:\/\/www\.douban\.com\/artist\/[a-z]+\/album\/[0-9]+\//i,
			linkRegExp			: /^http:\/\/www\.douban\.com\/artist\/[a-z]+\/photo\/([0-9]+)\/$/i,
			replaceString		: 'http://t.douban.com/view/photo/photo/public/p$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanartist1'); return false; }
		}, // artist1
		// doubanartist2
		{
			name				: 'doubanartist2',
			includeRegExp		: /^http:\/\/www\.douban\.com\/artist\/[a-z]+\/public_album\/[0-9]+\//i,
			linkRegExp			: /^http:\/\/www\.douban\.com\/artist\/[a-z]+\/public_photo\/([0-9]+)\/$/i,
			replaceString		: 'http://t.douban.com/view/photo/photo/public/p$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'doubanartist2'); return false; }
		}, // doubanartist2
		
		// flickr
		{
			name				: 'flickr',
			includeRegExp		: /^https?:\/\/(.*?\.)?flickr\.com/i,
			linkRegExp			: /\/photos\/[^\/]+\/[0-9]+/i,
			findImageRegExp		: /_[tsm]\.jpg/i,
			replaceString		: '.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'flickr'); return false; }
		}, // flickr
		
		// facebook
		/* removed support because they now have nice built-in image viewing features
		{
			name				: 'facebook',
			includeRegExp		: /^https?:\/\/(.*?\.)?facebook\.com/i,
			linkRegExp			: /photo\.php\?pid=[0-9]+/i,
			findImageRegExp		: /[st]([0-9]+.*?)\.jpg/i,
			replaceString		: 'n$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'facebook'); return false; }
		}, // facebook
		*/
		
		// myspace1
		{
			name				: 'myspace1',
			includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
			linkRegExp			: /imageID=[0-9]+/i,
			findImageRegExp		: /m_(.+)\.jpg/i,
			replaceString		: 'l_$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'myspace1'); return false; }
		},  // myspace1
		
		// myspace2
		{
			name				: 'myspace2',
			includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
			linkRegExp			: /imageID/i,
			findImageRegExp		: /_m/i,
			replaceString		: '_l',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'myspace2'); return false; }
		},  // myspace2
		
		// deviantart
		{
			name				: 'deviantart',
			includeRegExp		: /^https?:\/\/(.*?\.)?deviantart\.com/i,
			linkRegExp			: /deviantart\.com\/(deviation|print|art)\/.+/i,
			findImageRegExp		: /^http(s)?:\/\/.*?\.deviantart\.com\/([^\/]*)\/[^\/]*\/(.*?)\.(jpe?g|gif|png)$/i,
			replaceString		: 'http$1://fc01.deviantart.com/$2/$3.$4',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'deviantart'); return false; }
		}, // deviantart
		
		// subvariance
		{
			name				: 'subvariance',
			includeRegExp		: /^https?:\/\/(.*?\.)?subvariance\.com/i,
			linkRegExp			: /\/view\/[0-9]+/i,
			findImageRegExp		: /\/items\/thumbs\/(.*?)\.jpg/i,
			replaceString		: '/items/$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'subvariance'); return false; }
		}, // subvariance
		
		// gmail
		{
			name				: 'gmail',
			includeRegExp		: /^https?:\/\/mail\.google\..*/i,
			linkRegExp			: /^(\/mail\/\?view=att&(amp;)?disp=)inline/i,
			replaceString		: 'http://' + window.location.host + '$1emb',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'gmail'); return false; }
		}, // gmail
		
		// imagefap
		{
			name				: 'imagefap',
			includeRegExp		: /^https?:\/\/(.*?\.)?imagefap\.com/i,
			linkRegExp			: /(image.php\?id=|gallery\/)[0-9]+/i,
			findImageRegExp		: /\/images\/(thumb|mini)\/([0-9]+)\/([0-9]+)\/([0-9]+)\.jpg/i,
			replaceString		: '/full/$2/$3/$4.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagefap'); return false; }
		},
		
		// ffffound!
		{
			name				: 'ffffound',
			includeRegExp		: /^https?:\/\/(.*?\.)?ffffound\.com/i,
			linkRegExp			: /\/image\/[\w]+$/i,
			findImageRegExp		: /img(-thumb)?\.ffffound\.com\/static-data\/assets\/([\w\/]+?)_[\w]+\.(jpe?g|gif|png)$/i,
			replaceString		: 'img.ffffound.com/static-data/assets/$2.$3',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'ffffound'); return false; }
		},
		
		// textamerica
		/* removed support because they are now subscription-based
		{
			name				: 'textamerica',
			includeRegExp		: /^http(s)?:\/\/(.*?\.)?textamerica\.com/i,
			linkRegExp			: /\?r=[0-9]+$/i,
			findImageRegExp		: /user\.images\.x\/(.*?\/.*?)\/(.*?)\/(.*?)\.jpg(.*)$/i,
			replaceString		: 'user.images.x/$1\/$3.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'textamerica'); return false; }
		} // textamerica
		*/
		
		// image		http://bp2.blogger.com/_a7jkcMVp5Vg/SAGu9Ym-S2I/AAAAAAAAEoM/WCGF3uywJzE/s400/empty.jpg
		// link			http://bp2.blogger.com/_a7jkcMVp5Vg/SAGu9Ym-S2I/AAAAAAAAEoM/WCGF3uywJzE/s1600-h/empty.jpg
		// final image	http://bp2.blogger.com/_a7jkcMVp5Vg/SAGu9Ym-S2I/AAAAAAAAEoM/WCGF3uywJzE/s1600/empty.jpg
		
	], // searchDefs[]
	
	// useLinkForShow()
	useLinkForShow : function(searchDef) {
		if (searchDef.findImageRegExp)
			return false;
		else
			return true;
	},
	
	// showFrom()
	// generic helper function that calls show() with the correct parameters
	showFrom : function(event, showName) {
		var link;
		if (event.currentTarget)
			link							= event.currentTarget;
		else
			link							= event;
		
		var address							= unescape(unescape(greasedLightbox.getAddress(link)));
		var img								= greasedLightbox.getImageToShow(link, address, showName);
		
		greasedLightbox.show(event, img, address);
	}, // showFromLink()
	
	// getImageToShow()
	getImageToShow : function(link, address, showName) {
		var searchDef						= greasedLightbox.getRegExpObj(greasedLightbox.searchDefs, showName);
		
		if (greasedLightbox.useLinkForShow(searchDef)) {
			address							= unescape(unescape(address));
			if (searchDef['replaceString'])
				var img						= address.replace(searchDef['linkRegExp'], searchDef['replaceString']);
			else
				var img						= address.match(searchDef['linkRegExp'])[0];
		} else {
			var img							= greasedLightbox.containsThumb(link, greasedLightbox.getRegExpObj(greasedLightbox.searchDefs, showName), true);
		}
		
		return img;
	}, // getImageToShow()
	
	// getRegExpObj()
	// returns the requested regular expression object from the regExp array
	getRegExpObj : function(regExpObject, showName) {
		var rExObj;
		
		for (var i = 0; i < regExpObject.length; i++) {
			rExObj							= regExpObject[i];
			if (rExObj['name'] == showName)
				return rExObj;
		}
	}, // getRegExpObj()
	
	// containsThumb()
	containsThumb : function(elem, rExObj, verbose) {
		var images, image, src;
		images = document.evaluate('descendant::img[@src]', elem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < images.snapshotLength; i++) {
			thisImage	= images.snapshotItem(i);
			src			= thisImage.getAttribute('src');
			if(rExObj['findImageRegExp'].test(src)) {
				if(!verbose) return true;
					return src.replace(rExObj['findImageRegExp'], rExObj['replaceString']);
			}
		}
		
		return false;
	}, // containsThumb()
	
	// getAddress()
	// extracts an address out of a linkObj
	getAddress : function(linkObj) {
        var address                            = linkObj.getAttribute('href');
		
        // for GreaseKit users because Safari doesn't like stopping events even though it says it does...
        if(/Safari/.test(navigator.userAgent)) {
            linkObj.onclick = function() { return false; };
        }
        return address;
    }, // getAddress()
	
	// getPageScroll()
	// Returns array with x,y page scroll values.
	// Core code from - quirksmode.org
	getPageScroll : function() {
		var xScroll, yScroll;
		if (self.pageYOffset) {
			yScroll 						= self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
			yScroll 						= document.documentElement.scrollTop;
		} else if (document.body) {// all other Explorers
			yScroll 						= document.body.scrollTop;
		}
		
		if (self.pageXOffset) {
			xScroll 						= self.pageXOffset;
		} else if (document.documentElement && document.documentElement.scrollLeft){	 // Explorer 6 Strict
			xScroll 						= document.documentElement.scrollLeft;
		} else if (document.body) {// all other Explorers
			xScroll 						= document.body.scrollLeft;
		}
	
		arrayPageScroll 					= new Array(xScroll,yScroll) 
		return arrayPageScroll;
	}, // getPageScroll()
	
	// getPageSize()
	// Returns array with page width, height and window width, height
	// Core code from - quirksmode.org
	// Edit for Firefox by pHaez
	getPageSize : function() {
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll							= document.body.scrollWidth;
			yScroll							= window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll							= document.body.scrollWidth;
			yScroll							= document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll							= document.body.offsetWidth;
			yScroll							= document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			windowWidth						= self.innerWidth;
			windowHeight					= self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth						= document.documentElement.clientWidth;
			windowHeight					= document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth						= document.body.clientWidth;
			windowHeight					= document.body.clientHeight;
		}	
		
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight						= windowHeight;
		} else { 
			pageHeight						= yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth						= windowWidth;
		} else {
			pageWidth						= xScroll;
		}
	
		arrayPageSize						= new Array(pageWidth,pageHeight,windowWidth,windowHeight);
		return arrayPageSize;
	}, // getPageSize()
	
	// center()
	// centers the object in the page
	center : function(objToCenter, arrayPageScroll, arrayPageSize) {
		var oldDisplay					= new Array(objToCenter.style.visibility, objToCenter.style.display);
		
		objToCenter.style.display		= 'none';
		
		var arrayPageScroll				= (arrayPageScroll) ? arrayPageScroll : greasedLightbox.getPageScroll();
		var arrayPageSize				= (arrayPageSize) ? arrayPageSize : greasedLightbox.getPageSize();
		objToCenter.style.visibility	= 'hidden';
		objToCenter.style.display		= 'block';
		
		var objTop						= arrayPageScroll[1] + ((arrayPageSize[3] + 35 - objToCenter.offsetHeight) / 2);
		var objLeft						= (arrayPageSize[0] - objToCenter.offsetWidth) / 2;
		
		objToCenter.style.top			= (objTop < 0) ? "0px" : objTop + "px";
		objToCenter.style.left			= (objLeft < 0) ? "0px" : objLeft + "px";
		
		objToCenter.style.visibility	= oldDisplay[0];
		objToCenter.style.display		= oldDisplay[1];
	}, // center()
	
	// centerItAll()
	// Centers the lightbox object and the loading/error object on the page
	centerItAll : function() {
		var objLightbox					= document.getElementById('greasedLightbox');
		var objLoading					= document.getElementById('greasedLightboxLoading');
		var arrayPageSize				= greasedLightbox.getPageSize();
		var arrayPageScroll 			= greasedLightbox.getPageScroll();
		
		greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
		greasedLightbox.center(objLoading, arrayPageScroll, arrayPageSize);
	}, // centerItAll()
	
	// show()
	// Preloads images. Pleaces new image in lightbox then centers and displays.
	show : function(event, img, context) {
		//alert(img);
		// let shift+click and ctrl+click (but not ctrl+shift+click) through without lightbox
		if ((event.shiftKey || event.ctrlKey) && !(event.shiftKey && event.ctrlKey)) return true;
			
		// if this is a real event stop the click and set the link, otherwise, just set the link
		if (event.currentTarget) {
			var link						= event.currentTarget;
			greasedLightbox.stopEvents(event);
		} else {
			var link						= event;
		}
		
		if (img == null || img == '') img	= link.getAttribute('href');
		greasedLightbox.currentAddress		= unescape(unescape(greasedLightbox.getAddress(link)));
		
		// make ctrl+shift+click follow link without lightbox
		if (event.shiftKey && event.ctrlKey) {
			window.location.href			= greasedLightbox.currentAddress;
			return true;
		}
		
		// center when resized
		if (greasedLightbox.isShowing != true)
			window.addEventListener('resize', greasedLightbox.centerItAll, true);
		
		greasedLightbox.isShowing			= true;
		
		// get the caption from the title attribute of the link. if that doesn't exist, look for it in the title attribute of the image.
		capt								= link.getAttribute('title');
		
		if (capt == null || capt == '') {
			try {
				var imgObj					= link.firstChild;
				capt						= imgObj.getAttribute('title');
			} catch (e) { }
		}
		if (capt == null || capt == '') {
			try {
				var imgObj					= link.firstChild;
				capt						= imgObj.getAttribute('alt');
			} catch (e) { }
		}
		
		// prep objects
		var objOverlay						= document.getElementById('greasedLightboxOverlay');
		var objMenu							= document.getElementById('greasedLightboxMenu');
		var objLightbox						= document.getElementById('greasedLightbox');
		var objCaption						= document.getElementById('greasedLightboxCaption');
		var imgPreload						= document.getElementById('greasedLightboxPreload');
		var objImage						= document.getElementById('greasedLightboxImage');
		var objLoading						= document.getElementById('greasedLightboxLoading');
		
		objOverlay.style.display			= 'none'; // This will ensure that we have a correct reading of the page size
		var arrayPageSize					= greasedLightbox.getPageSize();
		var arrayPageScroll 				= greasedLightbox.getPageScroll();
	
		// set height of Overlay to take up whole page and show
		objOverlay.style.height				= (arrayPageSize[1] + 'px');
		objOverlay.style.display			= 'block';
		
		// show menu
		objMenu.style.display				= 'block';
		
		// center loader and error message
		objLoading.style.visibility			= 'hidden';
		objLoading.style.display			= 'block';
		greasedLightbox.center(objLoading, arrayPageScroll, arrayPageSize);
		objLoading.style.visibility			= 'visible';
		
		var imgPreload						= document.getElementById('greasedLightboxPreload');
		
		// preload image
		preloaderDone = function() {
			loaderDone	= function() {
				objImage.removeAttribute('width');
				objImage.removeAttribute('height');
				greasedLightbox.aspectRatio		= null;
				
				if (capt) {
					objCaption.innerHTML		= capt;
				} else {
					objCaption.innerHTML		= img;
				}
				
				// dimensions
				// objCaption.innerHTML			= objCaption.innerHTML + '<br/><br/>(width: ' + objImage.width + 'px; height: ' + objImage.height + 'px;)';
				
				// add a link for context
				if (context) objCaption.innerHTML	= objCaption.innerHTML + '<br/><br/><a href="' + context + '">' + greasedLanguage[greasedLanguage.language][0].context + '</a>';
				
				// center lightbox and make sure that the top and left values are not negative
				// and the image placed outside the viewport
				//objLightbox.style.visibility	= 'hidden';
				objLightbox.style.display		= 'block';
				
				greasedLightbox.aspectRatio		= objImage.height / objImage.width;
				
				// if image is larger than the screen
				if (objImage.height > arrayPageSize[3] - 70) {
						var newHeight			= arrayPageSize[3] - 70;
						var newWidth			= (objImage.width / objImage.height) * newHeight;
						objImage.height			= newHeight;
						objImage.width			= newWidth;
				}
				if (objImage.width > arrayPageSize[2] - 70) {
						var newWidth			= arrayPageSize[2] - 70;
						var newHeight			= greasedLightbox.aspectRatio * newWidth;
						objImage.height			= newHeight;
						objImage.width			= newWidth;
				}
				
				greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
				
				// if it went bigger than the page
				if (objLightbox.offsetHeight > objOverlay.offsetHeight) objOverlay.style.height		= objLightbox.offsetHeight + 'px';
				if (objLightbox.offsetWidth > objOverlay.offsetwidth) objOverlay.style.width		= objLightbox.offsetWidth + 'px';
				
				greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
				
				objLoading.style.display		= 'none';
				objCaption.style.display		= 'block';
				objLightbox.style.visibility	= 'visible';
				
				// clean it up a bit for memory's sake
				objImage.removeEventListener('load', loaderDone, false);
				imgPreload.removeEventListener('load', preloaderDone, false);
				imgPreload.removeEventListener('error', greasedLightbox.noImage, false);
				imgPreload.src					= '';
				
				if (greasedLightbox.isSlideShow)
					greasedLightbox.timer = setTimeout(function(event) { greasedLightbox.moveSlide(event, 1) }, greasedLightbox.slideTime * 1000);
				
				return false;
			} // loaderDone()
			
			objImage.addEventListener('load', loaderDone, false);
			objImage.src					= img;
			
			return false;
		} // preloaderDone()
		
		
		if (imgPreload.src != img) {
			imgPreload.addEventListener('load', preloaderDone, false);
			imgPreload.addEventListener('error', greasedLightbox.noImage, false);
			imgPreload.src					= img;
		} else {
			preloaderDone();
		}
		
		// hides flash movies that peek through the overlay
		var obtrusives, thisObtrusive;
		obtrusives	= document.evaluate('//object|//embed|//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < obtrusives.snapshotLength; i++) {
			thisObtrusive					= obtrusives.snapshotItem(i);
			thisObtrusive.style.visibility	= 'hidden';
		}
		
		if (greasedLightbox.allImageLinks.length > 1) {
			// initialize slideshow
			// set currentImagePosition
			findCurrentPosition : for(var i = 0; i < greasedLightbox.allImageLinks.length; i++) {
				if (greasedLightbox.allImageLinks[i]['link'] == link) {
					greasedLightbox.currentImagePosition	= i;
					break findCurrentPosition;
				}
			} // for()
			
			// pre-fetch next image
			if (!window.opera) { // for some reason this pre-fetching breaks lightbox in opera
				var imgPrefetch			= document.getElementById('greasedLightboxPrefetch');
				
				var nextImagePosition	= (greasedLightbox.currentImagePosition + greasedLightbox.lastMove) % greasedLightbox.allImageLinks.length;
				if (nextImagePosition < 0) nextImagePosition = greasedLightbox.allImageLinks.length - 1;
				
				var nextImage			= greasedLightbox.allImageLinks[nextImagePosition];
				var nextImageSrc		= greasedLightbox.getImageToShow(nextImage['link'], greasedLightbox.getAddress(nextImage['link']), nextImage['name']);
				imgPrefetch.src			= nextImageSrc;
			}
		} // if()
		
	}, // show()
	
	// slideShow()
	// cycles through all of the lightboxable images
	slideShow: function(cmd) {
		var objMenuButtonShow = document.getElementById('greasedLightboxButtonSlide');
		if (cmd != 'stop') { // start the show
			greasedLightbox.isSlideShow	= true;
			greasedLightbox.moveSlide(null, 1);
			
			// switch function to stop button
			objMenuButtonShow.removeEventListener('click', greasedLightbox.slideShow, false);
			objMenuButtonShow.innerHTML	= '\u2169';
			objMenuButtonShow.addEventListener('click', function(event) { greasedLightbox.slideShow('stop') }, false);
		}
		else { // stop the show
			clearTimeout(greasedLightbox.timer);
			greasedLightbox.isSlideShow	= false;
			objMenuButtonShow.removeEventListener('click', function(event) { greasedLightbox.slideShow('stop') }, false);
			objMenuButtonShow.innerHTML	= '\u21BB';
			objMenuButtonShow.addEventListener('click', greasedLightbox.slideShow, false);
		}
	}, // slideShow()
	
	// hide()
	// Stops the preloader in case it hasn't finished and then hides all of the lightbox components
	hide : function(event) {
		greasedLightbox.stopEvents(event);
		greasedLightbox.isShowing			= false;
		window.removeEventListener('resize', greasedLightbox.centerItAll, true);
		
		// get objects
		var objPreloader					= document.getElementById('greasedLightboxPreload');
		var objLoading						= document.getElementById('greasedLightboxLoading');
		var objError						= document.getElementById('greasedLightboxError');
		var objOverlay						= document.getElementById('greasedLightboxOverlay');
		var objLightbox						= document.getElementById('greasedLightbox');
		var objMenu							= document.getElementById('greasedLightboxMenu');
		var imgPreload						= document.getElementById('greasedLightboxPreload');
		
		// stop preloader
		objPreloader.removeEventListener('load', preloaderDone, false);
		imgPreload.removeEventListener('error', greasedLightbox.noImage, false);
		//imgPreload.src					= '';
		
		// show flash movies again
		var obtrusives, thisObtrusive;
		obtrusives	= document.evaluate('//object|//embed|//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < obtrusives.snapshotLength; i++) {
			thisObtrusive					= obtrusives.snapshotItem(i);
			thisObtrusive.style.visibility	= 'visible';
		}
		
		// hide everything
		objLoading.style.display			= 'none';
		objError.style.display				= 'none';
		objOverlay.style.display			= 'none';
		objLightbox.style.display			= 'none';
		objMenu.style.display				= 'none';
		
	}, // hide()
	
	// halt()
	// stops the slideshow and hides the lightbox
	halt : function() {
		greasedLightbox.slideShow('stop');
		greasedLightbox.hide();
	},
	
	// stopEvents()
	stopEvents : function(event) {
		if (event) {
			if (event.stopPropagation) event.stopPropagation();
			if (event.preventDefault) event.preventDefault();
		}
	},
	
	// resize()
	resize : function(event, resizeByAmount) {
		greasedLightbox.stopEvents(event);
		
		// stop slidshow
		greasedLightbox.slideShow('stop');
		
		// resize the image
		var objImage						= document.getElementById('greasedLightboxImage');
		var imgPreload						= document.getElementById('greasedLightboxPreload');
                
		if (resizeByAmount == 0) {
			objImage.removeAttribute('width');
			objImage.removeAttribute('height');
		} else {
			var newWidth					= objImage.width + (objImage.width * (resizeByAmount/100));
			var newHeight					= this.aspectRatio * newWidth;
			if (newWidth > 30 || newHeight > 30) {
				objImage.width				= newWidth;
				objImage.height				= newHeight;
			}
		}
		
		// re-center the lightbox
		var objLightbox						= document.getElementById('greasedLightbox');
		greasedLightbox.center(objLightbox);
	}, // resize()
	
	// noImage()
	// Displays a nice error message when no image can be found.
	noImage : function(event) {
		var objLoading						= document.getElementById('greasedLightboxLoading');
		var objError						= document.getElementById('greasedLightboxError');
		var objErrorContext					= document.getElementById('greasedLightboxErrorContext');
		
		objError.style.visibility			= 'hidden';
		objError.style.display				= 'block';
		
		objErrorContext.innerHTML			= '<a href="' + greasedLightbox.currentAddress + '">' + greasedLanguage[greasedLanguage.language][0].context + '</a>';
		
		greasedLightbox.center(objError);
		
		objLoading.style.display			= 'none';
		objError.style.visibility			= 'visible';
		
		if (greasedLightbox.isSlideShow)
			greasedLightbox.timer = setTimeout(function(event) { greasedLightbox.moveSlide(event, 1) }, 500);
	}, // noImage()
	    
	// handleKey(event)
	// handles keypress. If 'x' is pressed then it hides the lightbox. If a left or right arrow is pressed it cycles through images on a page
	handleKey : function(event) {
		if (greasedLightbox.isShowing) {
			var keycode							= event.which;
			var key								= String.fromCharCode(keycode).toLowerCase();
			
			switch(key) {
				case 'x':
					greasedLightbox.halt(event);
					break;
				case '+': // increase size
					greasedLightbox.resize(event, 13);
					break;
				case '-': // decrease size
					greasedLightbox.resize(event, -13);
					break;
				case '0': // set to default size
					greasedLightbox.resize(event, 0);
					break;
				/* @todo
				case 'v': // view image in original context
					
					break;
				*/
				default:
					switch(event.keyCode) {
						// esc key
						case 27:
							greasedLightbox.halt(event);
							break;
							
						// left arrow
						case 37:		// firefox
						case 63234:		// safari
							greasedLightbox.slideShow('stop');
							greasedLightbox.moveSlide(event, -1);
							break;
							
						// right arrow
						case 39:		// firefox
						case 63235:		// safari
							greasedLightbox.slideShow('stop');
							greasedLightbox.moveSlide(event, 1);
							break;
							
					} // switch(event.keyCode)
					break;
			} // switch(key)
		} // if
	}, // getKey()
	
	// moveSlide()
	// loads another image from allImageLinks[]
	moveSlide : function(event, moveByAmount) {
		if (greasedLightbox.allImageLinks.length > 1) {
			if (greasedLightbox.currentImagePosition + moveByAmount == -1) greasedLightbox.currentImagePosition = greasedLightbox.allImageLinks.length;
			var newSlidePosition				= (greasedLightbox.currentImagePosition + moveByAmount) % greasedLightbox.allImageLinks.length;
			var slideToLoad						= greasedLightbox.allImageLinks[newSlidePosition];
			
			greasedLightbox.hide(event);
			slideToLoad['showFunction'](slideToLoad['link']);
			greasedLightbox.lastMove			= moveByAmount;
		} // if
	}, // moveSlide()
	
	// lightBulbOnIcon
	// used when an update is available
	lightBulbOnIcon :"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKgSURBVDjLlZLrS1NxGMd90ZvovdEfEBEUEhZIb0xMjdyLIuyGkiHGUFKydFKKJiRegjIyFJRwojMxzfJSaVOYeTfxtpSNuZ1tXnY2z27nsss5334uWloG9uLD7%2FA7z%2FfzPPx4IgBE7ISl3qWyelUvu9JIueZqeOdUmcCMFDgcQ3fntjSK0j%2Frwx%2BcsesIZ3jbL1j6EbCPIej5DpE3QRIoBJ3LEFb74BjIxkbXVYNdrTixS8Ca3h%2Fy6pSTfloD0UcRjCS8BJGbRdA7QRgjd1pIfhruyeewKOMdm%2BrCw2GBV1tXKZh7SIEVoqAjpwVS0AlIvhBSkCGyeQRcPYDogO1DNixvrveFBa6ZCkuAmSe1OtJpFVLATkJboWCIAE3%2BGYngI6ENgnUK%2BhcxfFiw9fWRT%2BRWEWTHEeRmyPhaMvYCgu5ZEpgkbzCCgPszBNsr8NY8iF4Ky5WnpLDArs41%2BzYnSPdF8OYi0qEcTHc6mF45mJ4M2Ftl4C1lYPU34KerwFNTWKmO%2Fj2BfbiwghmvJuPawZsUsNVHgTPlEx6ANcjJeR9r5QfhWUqEJOlhbc%2BFoV42FBY4R0sPbPbKlz2LLeQB9aCbYkJhzpIFlkoDZ8zDRk0kRHYYrm8d0JYeEyyduUd37QH9pTBqvSOV9iy0wtmZ%2BVNAOm%2BHOeM92JtlYDQN0JYcD1BtmTf%2FWqRtbJ%2FyTxtUt9fXGhPBq5MhriVBtMYhoLkMQ1Ek5sqi3eb2O4l7buIvhlRPkmsfZ%2Fibax%2BiruosnpacQUFOOq7Fn5TUypJz%2F1zlnRQr5JSypRVKZRvq6htR%2FewlriTH03vV7ilQ5NwaHRgchM1GY3p6Bq%2BbmpEii9XtWzCgqkhLuXSBTUg4L8XFxUoXk2K57obirH0L%2FocfNQ8V8wE%2BuE0AAAAASUVORK5CYII%3D')",
	
	// showUpdate()
	// shows the user that an update is available
	showUpdate : function(latestVersion) {
		var titleLink	= document.getElementById('greasedLightboxTitleLink');
		titleLink.setAttribute('title', greasedLanguage[greasedLanguage.language][0].update + ' (v' + latestVersion + ')');
		titleLink.innerHTML				= titleLink.innerHTML + ' - ' + greasedLanguage[greasedLanguage.language][0].update + ' (v' + latestVersion + ')';
		var cssStr 						= '#greasedLightboxTitleLink { background-image: ' + greasedLightbox.lightBulbOnIcon + ' !important; }';
		
		var styleSheet					= document.getElementById('greasedLightboxCSS');
		var cssText						= document.createTextNode(cssStr);
		styleSheet.appendChild(cssText);
	},
	
	// init()
	// Function runs on window load, going through link tags looking for links to images.
	// These links receive onclick events that enable the lightbox display for their targets.
	// The function also inserts html markup at the top of the page which will be used as a
	// container for the overlay pattern and the inline image.
	init : function() {
		// initialize localization
		greasedLanguage.init();
		
		// set up list of searchDefs to use based on how includeRegExp matches window.location.href
		var currentURL, searchDefsToUse;
		currentURL			= window.location.href;
		searchDefsToUse		= new Array();
		
		
		for(var i = 0; i < greasedLightbox.searchDefs.length; i++) {
			if(greasedLightbox.searchDefs[i]['includeRegExp'].test(currentURL)) searchDefsToUse.push(greasedLightbox.searchDefs[i]);
		}
		
		if(!searchDefsToUse.length) return;
		
		// set variables
		var links, thisLink, href, lightboxedLinksTotal = 0;
		links 			= document.evaluate('//a[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < links.snapshotLength; i++) {
			thisLink	= links.snapshotItem(i);
			href		= unescape(thisLink.getAttribute('href'));
		
			// check regularExpressions from searchDefsToUse
			checkLink : for (var ii = 0; ii < searchDefsToUse.length; ii++) {
				
				// for links that reveal larger image's location
				if (!searchDefsToUse[ii]['findImageRegExp']) {
					if(searchDefsToUse[ii]['linkRegExp'].test(href)) {
						if (!searchDefsToUse[ii]['excludeLinkRegExp'] || !searchDefsToUse[ii]['excludeLinkRegExp'].test(href)) {
							if (!(thisLink.getAttribute('rel') && thisLink.getAttribute('rel').toLowerCase().match('lightbox'))) // prevents doubling lightboxes
								thisLink.addEventListener('click', searchDefsToUse[ii]['showFunction'], true);
							this.allImageLinks[lightboxedLinksTotal]						= new Array(3);
							this.allImageLinks[lightboxedLinksTotal]['name']				= searchDefsToUse[ii]['name'];
							this.allImageLinks[lightboxedLinksTotal]['showFunction']		= searchDefsToUse[ii]['showFunction'];
							this.allImageLinks[lightboxedLinksTotal]['link']				= thisLink;
							lightboxedLinksTotal++;
							break checkLink;
						}
					}
				// for links that contain images that reveal larger image's location
				} else if (searchDefsToUse[ii]['findImageRegExp']) {
					if(this.containsThumb(thisLink, searchDefsToUse[ii], false)) {
						if(searchDefsToUse[ii]['linkRegExp'].test(href)) {
							if (!searchDefsToUse[ii]['excludeLinkRegExp'] || !searchDefsToUse[ii]['excludeLinkRegExp'].test(href)) {
								if (!(thisLink.getAttribute('rel') && thisLink.getAttribute('rel').toLowerCase().match('lightbox'))) // prevents doubling lightboxes
									thisLink.addEventListener('click', searchDefsToUse[ii]['showFunction'], true);
								/*for (ii = 0; ii < lightboxedLinksTotal; ii++) {
									if(greasedLightbox.allImageLinks[ii]['link'] == links[i]) break checkLink;
								}*/
								this.allImageLinks[lightboxedLinksTotal]					= new Array(3);
								this.allImageLinks[lightboxedLinksTotal]['name']			= searchDefsToUse[ii]['name'];
								this.allImageLinks[lightboxedLinksTotal]['showFunction']	= searchDefsToUse[ii]['showFunction'];
								this.allImageLinks[lightboxedLinksTotal]['link']			= thisLink;
								lightboxedLinksTotal++;
								break checkLink;
							}
						}
					}
				}
			} // checkLink : for()
		} // for()
		
		if (lightboxedLinksTotal == 0) return;
		
		window.addEventListener('unload', this.unload, false);
		
		var objBody							= document.getElementsByTagName("body").item(0);
		
		var pngOverlay						= "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmJgYDgDEGAAANsAz1TKIeAAAAAASUVORK5CYII%3D')";
											   
		var lightbulbOffIcon				= "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJOSURBVDjLlZLdTxJQGMa96K4%2FoPUHdFfrpntyZrXsoq25tlbroi6qi7ZuYsuZ0UXRWiv72NS0gjIgDQ1LS0wkwU%2FUVEREUkEIBBFE%2BV48ve%2FZICza7OLZOTt739%2FznHPeEgAlhZpyB8%2BMLa58HHL63H2zy4muycVku8UZahl2TNJ688%2F6wsbd31yBLps3BNdqFCvrMYRjSURIvOdzzdAcmozWhTaLc%2B8WADXvHHb6RhYCEdEU2kiIJu%2FaBtwEywE3k2lQKjz8NB7Sjs7vygPMDu9ddogmUliNxsWaSGfwM5sViqcy%2BBHeFCl4r6YkzwzTnXlA9%2FSSh924md25qFDszMnmfGuga4pEd3QjiTxAN%2F49xY0c10MgjsuOuSssBdfh8IdBSUG1AibTDmbzAHrhZab6IzHQq6N3xo3%2BLyqY%2B1phMmig%2F9AISolm8yyMdo9IcKtt6HcC%2Bh653uoScTsJ0K65jw5yYrWOOISrol6Kht4pcUV%2Bg0efJwx5ADXtUA3a7aMLflHQoa0VzfTSoHMBUClqwL9EM4Lrb01JOt%2BzZQ7ob%2Fc%2FN1qDDGEHBugKxO6mOS%2BqWswZRb%2Ft9F%2BDxCLHAzQovsfdEyAYXn6d4cHBa7r7NXU%2FbrwbiCpNtsNFJzEnaqp4KjufblDU4XbtJVTJL%2BBqjQynyvZl6e8P%2FnOUC1UtvehWNr%2BBUqlGXX0T7j14gpMVZcFitUUB0ivnBvQ9PQgEgrBYxvBC8QqVxyXz2wboVfKzlSeOxsrLD2VLSyXZY0ck8feN1Ze3Dfgf%2FQJBCig%2B4GhFlwAAAABJRU5ErkJggg%3D%3D')";
		
		// CSS
		var head, styleSheet, cssStr, cssText;
		head = document.getElementsByTagName('head')[0];
		styleSheet						= document.createElement('style');
		styleSheet.setAttribute('id','greasedLightboxCSS');
		styleSheet.setAttribute('type','text/css');
		head.appendChild(styleSheet);
		
		cssStr							= ''+
		'#greasedLightboxOverlay { position: absolute; top: 0; left: 0; z-index: 10000000; width: 100%; background-image: ' + pngOverlay + '; background-repeat: repeat; cursor: pointer; }'+
		
		'#greasedLightboxMenu { position: fixed; top: 0; left: 0; width: 100%; z-index: 10000100; background: #000; font-family: "Terbuchet MS", Tahoma, Arial, Verdana, sans-serif; font-size: 14px; font-weight: bold; height: 35px; line-height: 35px; opacity: .5; }'+
		'#greasedLightboxMenu:hover { opacity: 1; }'+
		'a#greasedLightboxTitleLink { position: absolute; top: 0; left: 0; display: block; height: 35px; line-height: 35px; margin: 0 5px; padding: 0 5px 0 27px; background-image: ' + lightbulbOffIcon + '; background-repeat: no-repeat; background-position: 5px 55%; color: #aaa; background-color: #000; text-decoration: none; cursor: pointer; z-index: 10000450; }'+
		'a#greasedLightboxTitleLink:hover { color: #fff; background-color: #333; }'+
		'#greasedLightboxButtons { position: absolute; top: 0; left: 0; height: 35px; width: 100%; line-height: 35px; margin: 0; padding: 0; z-index: 10000400; }'+
		'#greasedLightboxButtons a { display: block; width: 33px; height: 33px; border: 1px solid #000; background: #000; cursor: pointer; float: right; text-align: center; color: #aaa; z-index: 10000450; }'+
		'#greasedLightboxButtons a:hover { border-color: orange; background-color: #333; color: #fff; }'+
		'#greasedLightboxLoading { position: absolute; z-index: 10000050; color: #fff; font-weight: bold; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; text-align: center; line-height: 2em; }'+
		'p#greasedLightboxLoadingText { margin: 0; padding: 25px 0 5px 0; font-size: 45px; color: #fff; font-weight: bold; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'p#greasedLightboxLoadingHelp { margin: 0; padding: 5px 0; font-weight: normal; font-size: 11px; color: #fff; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'#greasedLightboxError { position: absolute; z-index: 10000050; text-align: center; background: #000; color: #aaa; padding: 10px; border: 1px solid #444; -moz-border-radius: 10px; font-family: verdana, sans-serif; font-size: 11px; }'+
		'p#greasedLightboxErrorMessage { color: #fff; font-size: 45px; font-weight: bold; margin: 10px 20px; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; text-decoration: none; border: none; text-align: center; }'+
		'#greasedLightboxError a, #greasedLightbox a { color: #aaa; text-decoration: none; border-bottom: 1px solid #777; }'+
		'p#greasedLightboxErrorContext { margin: 0; padding: 5px 0; font-weight: normal; font-size: 11px; color: #fff; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'#greasedLightbox { position: absolute; z-index: 10000050; text-align: center; background: #000; color: #aaa; padding: 10px; border: 1px solid #444; -moz-border-radius: 10px; font-family: verdana, sans-serif; font-size: 12px; }'+
		'img#greasedLightboxImage { border: none; cursor: pointer; }'+
		'img#greasedLightboxImage, img#greasedLightboxPreload, img#greasedLightboxPrefetch {  max-height: none; max-width: none; }'+
		'#greasedLightbox, #greasedLightboxMenu, #greasedLightboxOverlay, #greasedLightboxError, #greasedLightboxLoading, img#greasedLightboxPreload, img#greasedLightboxPrefetch { display: none; }'+
		'#greasedLightboxCaption { color: #aaa; padding: 10px 0; }';
		
		cssText							= document.createTextNode(cssStr);
		styleSheet.appendChild(cssText);
		
		// overlay div
		var objOverlay						= document.createElement("div");
		objOverlay.addEventListener('click', greasedLightbox.halt, false);
		objOverlay.setAttribute('id','greasedLightboxOverlay');
		objBody.appendChild(objOverlay);
		
		// menu div
		var objMenu							= document.createElement("div");
		objMenu.setAttribute('id', 'greasedLightboxMenu');
		objBody.appendChild(objMenu);
		
		// title link
		var objMenuLink						= document.createElement("a");
		objMenuLink.setAttribute('id', 'greasedLightboxTitleLink');
		objMenuLink.setAttribute('href', 'http://userscripts.org/users/426977/scripts');
		objMenuLink.innerHTML					= 'Keyser Söze Scripts';
		objMenu.appendChild(objMenuLink);
		
		// menu buttons div
		var objMenuButtons					= document.createElement("div");
		objMenuButtons.setAttribute('id', 'greasedLightboxButtons');
		objMenu.appendChild(objMenuButtons);
		
		// right button
		var objMenuButtonRight				= document.createElement("a");
		objMenuButtonRight.setAttribute('id', 'greasedLightboxButtonRight');
		objMenuButtonRight.setAttribute('title', greasedLanguage[greasedLanguage.language][0].next);
		objMenuButtonRight.innerHTML		= '\u2192';
		objMenuButtonRight.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.moveSlide(event, 1); }, false);
		objMenuButtons.appendChild(objMenuButtonRight);
		
		// left button
		var objMenuButtonLeft				= document.createElement("a");
		objMenuButtonLeft.setAttribute('id', 'greasedLightboxButtonLeft');
		objMenuButtonLeft.setAttribute('title', greasedLanguage[greasedLanguage.language][0].previous);
		objMenuButtonLeft.innerHTML			= '\u2190';
		objMenuButtonLeft.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.moveSlide(event, -1); }, false);
		objMenuButtons.appendChild(objMenuButtonLeft);
		
		// magnify button
		var objMenuButtonPlus				= document.createElement("a");
		objMenuButtonPlus.setAttribute('id', 'greasedLightboxButtonPlus');
		objMenuButtonPlus.setAttribute('title', greasedLanguage[greasedLanguage.language][0].magnify);
		objMenuButtonPlus.innerHTML		= '+';
		objMenuButtonPlus.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.resize(event, 13); }, false);
		objMenuButtons.appendChild(objMenuButtonPlus);
		
		// shrink button
		var objMenuButtonMinus				= document.createElement("a");
		objMenuButtonMinus.setAttribute('id', 'greasedLightboxButtonMinus');
		objMenuButtonMinus.setAttribute('title', greasedLanguage[greasedLanguage.language][0].shrink);
		objMenuButtonMinus.innerHTML		= '-';
		objMenuButtonMinus.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.resize(event, -13); }, false);
		objMenuButtons.appendChild(objMenuButtonMinus);
		
		// slideshow button
		var objMenuButtonShow				= document.createElement('a');
		objMenuButtonShow.setAttribute('id', 'greasedLightboxButtonSlide');
		objMenuButtonShow.setAttribute('title', greasedLanguage[greasedLanguage.language][0].slideshow);
		objMenuButtonShow.innerHTML			= '\u21BB';
		objMenuButtonShow.addEventListener('click', greasedLightbox.slideShow, false);
		objMenuButtons.appendChild(objMenuButtonShow);
		
		// loader div
		var objLoading						= document.createElement("div");
		objLoading.setAttribute('id','greasedLightboxLoading');
		objLoading.addEventListener('click', greasedLightbox.halt, false);
		objBody.appendChild(objLoading);
		
		var loadingGif = document.createElement('img');
		loadingGif.src = "data:image/gif,GIF89a%80%00%80%00%A2%00%00%FF%FF%FF%DD%DD%DD%BB%BB%BB%99%99%99%00%00%FF%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2."+
		"0%03%01%00%00%00!%F9%04%05%05%00%04%00%2C%02%00%02%00%7C%00%7C%00%00%03%FFH%BA%DC%FE0%CA%06*%988%EB%CD%BB_%96%F5%8Ddibax%AEl%AB%A5%A2%2B%CF.%5C%D1x%"+
		"3E%DA%97%EE%FF%12%1EpHT%08%8B%C8G%60%190%1DI%83%E8%20%F9a2K%CF%8FTJ%E5X%AD%A4lg%BB%EDj%BE%D7%9D%0DJ%8E%9A3%E8%B4G%BCis%DF%93%B8%9CC%CF%D8%EFx%12zMsk"+
		"%1E%7FS%81%18%83%850%87%7F%8Apz%8D)%8Fv%91%92q%1D%7D%12%88%98%99%9A%1B%9C%10%88%89%9Fy%93%A2%86%1A%9E%A7%8B%8C%2F%AB%18%A5%AE%A0_%AA%8E%AC%90%B5%B6%"+
		"60%19%A3%0D%AD%BC%AF%A1(%B2%9D%BB%C3%C4h%BF%C7%A4%C9%CA%A8%A9A%CE%0E%B4%D1%BD%7B%10%C0%0A%C2%D8%D2%C5%DB%D5%0C%D7%DF%CB%B7%13%B9%C8%97x%02%EE%02%2B%"+
		"B0%D47%13%DEln%1E%EF%EF'%F2%2B%F6Zd%3A%E8%1Bhb%9A%3Fv%F7%DAp%18%C8%90%84%C1%13%D0%C6%94%CB%C0%B0%E2%08f2%14%02%2Ce%8A%FFb%C5%86U%B4%B5(%B3%91%A3%C0%"+
		"8F%20%CD%CD%E2%08h!%CA%94*%AD%B1l%99%EF%25%C1%98%0Bf%D2%1Ca%F3fL%9D%F8X%F4%D4g%0EhG%17C%F7%0D3%EA%23%A9%3B%5EL%818u%054%C9P%AA%2C%DF%D8%C4%FA%8F%CAK"+
		"%AE%08%15Y%AC%15%F6%13%D1%A5%3Bq%AA%5D%CB%B6%AD%DB%B7p%E3%CA%9DK%B7%AE%DD%BBx%F3B4%DA%F5%1B_a%7F'%16%0D%0C%89%B0%E0h%86%13%F3%FD%A9%B8qV%95%8E%23%F7"+
		"%85*%D9Me%B5%97%BB9f%1BY%AF%E7%CF%A0C%8B%1EM%BA%B4%E9%D3%A8S%AB%C6A%92r%D0Se1%C5~s8P%ED%24%26a%DF%1E2%13%EC%E4%1CUu%F7%06%12%D5wn%E0%C1%5D%0F%9FQ%1C"+
		"q%F2%83%3A1%3FO%F8Xzt%EA%C7%DB6%AFs%5D%EE%F4%95%D5%25%BEv%D1Z%7Cv%F0%BB%EB%05%CC%B8%DERz%99%BF%D5kd%11%91%C3y%F9%F3G%D4%2F%B1%DF~%FF%08%BC%F9%E9%F7_"+
		"I%EDaW%12t%01%3EP%DE3%B3%B9g%DB%80%9A-%A8%20%84%8CAha%7C%90Q%A8!%85~a%B8!%87%CE5%18%8C%88%E4%80%88%16%89%25%26%C8%A0%8A%19%A2%98%93%8B%11%B2%D8!%8C1"+
		"J%08%A0%89%9F%BC%97b%81%F8%C9x%A2%8F%F0%F1%D8%A3%8D%CA%E8%B8%23%91%2B%02)%9C%92%232y%24%92%C6%A55%E4x~%E0H%9B%95%04%60%89%A1%22%5B%06%09%E5%8D4%9Aa%"+
		"A4%97RNY%26%97X%D6x%E6%3ANv%91%A6%9ATr%D7%26%15of%19%26%99q%E6(%A4%7Fs%929%E3Q%EE%7D%89%1Eiu%AAVhj%87%A2%96%E8i%8B%9A%D6%A8%A3%7B%AE%C6'%A0%AE%24%00"+
		"%00!%F9%04%05%05%00%04%00%2C%0A%00%02%00W%000%00%00%03%FFH%BA%DC%FE0%BE%40%83%BC8%EB%3D%2B%E5%60(J%9E7%9E(WVi%EBv%EB%2B%BF%EB7%DFgm%E1%3C%A8%F7%23%8"+
		"1P%90%FA%A1%00H%40k8D%19G%C9%24%8A%C9%CC%D5N%D1%E8%89%DA%1C%3DCYi%90%2B%F4%5EEa%B1%88%DC%F5%9DAi%F5%9A-%FAn%E2%CA%14%9B%E8%8E%C1%E3.%7B!v%19x%2F%82*"+
		"o%1A%86%87%88%1A%84%12xy%8Dd%89~%8B%803%7B%7C%19%90%10%928%8E%18%9E%0F%8C%A1t%9D%8A%91%99%3C%A2%24%AA%11%A6%AD%A8%17%A4%0C%B2%B3%B4%11%B6%0A%A0%40%0"+
		"A%AE0%25%18%B8%3D%9B%B5%B0%0D%BE%BF%C0%BA%10%97%B1%AC%10%03%D4%03%81%CE%C2%C4%D2%0F%D5%D5K%D8G%DB%0D%DD%E4z%952%E2%E3%E4%E5c%5C3%E9%0C%EB%F2%EDm%E8Y"+
		"%18%F2%F3se%3CZ%19%F9%FA%98%09%04%18P%E0%2F%82%EB%0C2C%C8N!%10%86%DD%1C%1E%84HMb%0F%8A%15-%F2%C0%A8%F1%13%22%C3%8E%0F%09%82%0C%99o%E4%C4%86%26IZK%A9"+
		"!%01%00!%F9%04%05%05%00%04%00%2C%1F%00%02%00W%000%00%00%03%FFH%BA%DC%FEKH%01%AB%BD8%EB6%E7%FE%60%A8u%9Dh%9E%22%E9%A1l%5B%A9%92%2B%CF%04L%D1%F8i%E7%7"+
		"C%B8%F7%A2%81p%C0%FA%9D%02%C8%40k8D%19E%C9%24%8A%C9%D4%C1%8EQ%A9%89%DA4%3DAYm%90%2B%F4%5E%A1a%E4%89%DC%05%7D5i%F1%98%9C%3A%83%E3K%B6%CF%BE%89%2B%F3t"+
		"n%7Cpx.lD%1Fo%17~3%87%88%23%83%8B%8C%8Dz%1B%8A%15%93%94%95%19%97%0F~%7F4%87%96%91%98%859%A2%9C%A4%9E%A6%A7%9B%17%9D%0D%99%3C%A8%AF%AA%B1%AC%B3%B4%2F"+
		"%B6%0B%9F%40%0B%BA%10%B0%0A%B2%40%8E%B5*%92%B8%C6%AE%C2%24%18%C5%BF%04%C1%0F%25%CAa.%00%DA%00%18%D4(%D1!%DB%DB%DD%812%CB%20%E2%E9%17%CD%2C%E7%1A%E9%"+
		"F0%E4U8%D8%22%F0%F7%19%F39Q%26%F7%F8%D2%D2%FC%FD%03%D8C%E0%40%828%0C%C6C%C8C%A1%3A%86%09%1D%8E%83HC%E2D%8A3%2Cj%C3X%D1%14%22%C7%88%0A%3F%E6%08)r%A4%"+
		"C0%92%05%17%A2L%B9%D1D%02%00!%F9%04%05%05%00%04%00%2C%3C%00%02%00B%00B%00%00%03%FEH4%3C%FA0%CAI%AB%9D%AD%DD%CD%7B%CD%99'%8E%16%A8%91hj2i%3B%AE%8E%2B"+
		"o%F0l%7F%EB%ADG%B5%2B%FC%82%DD%A3%97%02%02%85%8B%5C%D1x%DC%11I%CC%A6%EE)%8AJo%D4%8E%F5j%CBr%B6A%A1%F7%02F%26M%D0%ADy%5C)%AF%95Z7%92%3D%91%CF%E1%1Bp%"+
		"F8%8D%8E%5B%CDCx%16v%7C%20~Q%80%81%7Ddj%89%0At%0Az%8E%8F%82u%8D%93%90%92%93%94!%8C%7F%9B%8A1%83%97.%01%A6%01%3B%84(%A7%A7%3A%A4%AB%AC%AC7%AF%22%B1%B"+
		"6%AEL)%B6%BB%A9%5C%1E%BB%BC%A0%1B%C0%C1%C2%15%C4%C5%C6%12%C8%B7%CA%14%CC%B1%CE%13%D0%B2%D2%11%D4%AD%D6%D7%D8%A8%DA%10%DC%DE%CB%D0%E1%D3%C8%E4%CF%C4%"+
		"E7%C7%CD%EA%EB%A6%ED%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FA%00%FD%FE%FF%00%03%024%26%B0%A0%C1%7F%A0%0E*4%B8i%A1%C3%81%93%1EJ%04%D0p%A2%C3%84%16%0F%12%C"+
		"C(%03PA%02%00!%F9%04%05%05%00%04%00%2CN%00%0A%000%00W%00%00%03%ECH%BA%BC%F3%A3%C9I%2B%85%D0%EA%7Dq%E6%E0%E6%7Da)%8D%A4%A9%A2%A9Z%B2%91%BB%B2%B2%0B%D"+
		"7%E6%8D%87p%BCs%BA%9F((%B4%10%8B%1D%14r%A8%5CV%8ENF%2F%9A%1CQ'%D3k%03z%E5%AA%04%60%81%91%B6%0B%87%9F%CD%9Ay%5D%C5%A8%D7%EC%B6%CF%04%AF%8F%1F%B2%BA%9"+
		"D%AA%DF%3B%FB~H%80p%7C%83fQ%86%87%7F%89%60%85%8C%8E%86Z%89Z%0A%83%94%0B%80%97%0C%81%9A%95g%9D%A0%A1%A2%A3%A4%A5%A6%A7%A8%A9%AA*%01%AD%AE%AF%B0%B1%B0"+
		"5%B2%B5%B6%AF.%B7%BA%B6%AC%BB%BE%B8%26%BF%C2%01%BD%C3%BB%B9%C6%B7%B4%C9%B2%AB%CE%CF%D0%D1%D2%D3%D4%D52%00%D8%00%A5%D9%DC%A2%DC%DF%DA%9D%E0%DF%E2%E3%"+
		"E4%94%E6%E3%E8%E9%E0Z%EC%ED%EE%EF%DD%F1%F2%D8%F4%F5%EB%F5%E1W%FA%FB%FC%F8%F9%D8%95K%17%8A%A0%B7s%A3%E6QH%00%00!%F9%04%05%05%00%04%00%2CN%00%1F%000%0"+
		"0W%00%00%03%E9H%BA%DC%FEn%C8%01%AB%BDmN%CC%3B%D1%A0'F%608%8Eez%8A%A9%BAb%AD%FBV%B1%3C%93%B5v%D3%B9%BE%E3%3D%CA%2F%13%94%0C%81%BD%231%A8D%B6%9A%8F%1C"+
		"%14R%9B%F2L%D6%AB0%CB%EDz%BF%E0%B0xL.%9B%CF%5C%81z%CDn%BB%DB%B3%B7%7C%CE%5E%D1%EF%F3%13~%0F%1F%F1%FF%02z%80%7Bv%83tq%86oh%8B%8C%8D%8E%8F%90%91%92%93"+
		"%0A%01%96%01f%97%9Ac%9A%9D%98%60%9E%9D%A0%A1%A2%5D%A4%A1%A6%A7%9E%5C%AA%AB%AC%AD%9B%AF%B0%96%B2%B3%A9%B3%9FY%B8%B9%10%00%BE%00%2F%B8%15%BF%BF%C1%B0%"+
		"BD%C4%C5%C6%A7%C8%C9%C07%CC%0F%CE%CA%D0%A5%D2%D3%CF%3B%B1%C3%D8b%D8%BE%DE%DDa%DF%D9_%DFc%E7%E3%E2%EA%D3%E1%EB%E6%EF%5E%E4%EE%CE%E8%F1%5D%E9%EC%F5%FA"+
		"%FB%60%F9%FE%ED%E8%11%23%D3%CF%1E%B8)%09%00%00!%F9%04%05%05%00%04%00%2C%3C%00%3C%00B%00B%00%00%03%F9H%BA%DC%FEP%8DI%AB%BD6%EA%1D%B1%FF%15'r%60%F9%8D"+
		"%E8c%AEY%EAJl%FC%BE%B1%3C%BB%B5y%CF%F9%B9%FF%C0%A0pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%10X%05%D4%D7u%9B%1Dm%BF%D8%AE%06%FC%15G%C8%60%B3%03MV3%D8mw%1"+
		"5%5E%96%CF%E9W%FB%1D%1Fv%F3%F3v%7FVz%82F%01%87%017%7FD%88%88%8AxC%8D%8D%3Bt%91%92%87%40l%96%97%89%99u%11%00%A1%00%1C%9C%98A%5C%1A%A2%A2%A4%A5O%AA%AA"+
		"%1B%A5%A6L%AF%AB%B1%ADM%B5%A1%AC%B8K%BA%A3%BC%97%B9%BA%23%B2%B4%C4%22%C6%BE%C8%C9%BDH%BF(%B2%9D%CF%CC%CD%9CJ%D0%D1%CAG%D9%DA%D7%D4%B5%2F%DBE%DD%DE%C"+
		"2%DC%D5%E6%92%E8%E1%E2%E3B%E5)%EFA%F1%F2%DFD%F5%EA%8E%E4%E9.%E7%FC%EDvLb%F7J%8F%83%7Cv%10%CAQ%E8%86%A1%1A%87%0F%0B%1A%7C%00kb%83%04%00!%F9%04%05%05%"+
		"00%04%00%2C%1F%00N%00W%000%00%00%03%FFH%BA%DC%FE0%CA7%EA%988%EB%CD%89%FD%5D(%8E%CDg%5Ed%AAJ%A7%B9%BE%B0%D7%BAq%1D%CE%AD%ADkx%BE%FF%90%DE%09Ht%08i%C5"+
		"%E4%11%94%2C.-M%E5%13%15%05N5%80%2C%E0'%E8%0AFO%8CV%AB%F3z%C1%C7%C9x%5C3%9BIB%F5%3A%DBvwU8%C9%9C%1C%B3%9F%F1H%10%7Bt%13%01%86%01%18~w%2BL%11%83%5B%8"+
		"5%87%86%89%8AQ%8F%90%11%92%92%13%8A%8BE%8F%18%9A%87%94~I%97%A1%A2%88%9C%9D%9F%83%19%A9%AA%AB%A5%40%A0%AF%A9%1A%AC%3F%B5%A8%A2%B8%95%3B%BB%BC%9A%1B%B"+
		"95%A7%1A%B0%C4%C50%C1%C2%9B%CA%B3%CC%CD%91%BD%D0%D1%2B%D3%D4%C3%1C%CB)%D9%DA%CF%DC%BF*%DF%12%C9%1D%DD%22%E5%E6%B7!%E9%1C%C7%1D%E7%E8%EFX%AE%22%F3%F4"+
		"%D7%1D%F7%F8%ED%22%E3B%F4%0B%91O%9F%1BokR%144%E8%89%04%1B%85%FFF%BC%A9%E2l%14%C5(%0B%2F%FE%C8%A8Q%13%07%C7%8E5%3E%82%84!r%E4%8Bj%26%89%84K%A9%20%01%"+
		"00!%F9%04%05%05%00%04%00%2C%0A%00N%00W%000%00%00%03%FFH%BA%DC%0E%10%B8I%AB%BD8%B7%C8%B5%FF%E0%C7%8DRh%9E!9%A2lK%A9%A4%2B%B7%B0%3A%DF%60m%E3%3C%A6%C7"+
		"%BD%E0%E4%B7%12%1A%17%C4%CEq%99%8C%2C%8FM%C8%13%DA%9CR%89%A7%806%20%1Cx%07%99dv%AB%ED%7D%BF%3E%1D%8AL%C6%9D%CF%97Z%8B%BDu%BF%BDi%25%8B%5E%BF%DD%D1qN"+
		".%7Ce%17%02%87%02%18%7FxV%04%84%5C%86%88%87%8A%8BV%8F%90%15%92%92%17%8B%8CK%8F%18%9A%88%94%7FO%97%A1%A2%89%9C%9D%9F%84%19%A9%AA%AB%A5F%A0%AF%A9%1A%A"+
		"CB%B5%A8%A2%B8%95A%BB%BC%9A%1E%B98%A7%1A%B0%C4%C53%C1%C2%9B%CA%B3%CC%CD%91%BD%D0%D1%83%AE%1F%C9%1F%CB%7B%D9%DA%B7%20%DDc%7C!%DB%DC%BF%DE%E5%E6%E1%E2"+
		"%E9%26%C7%20%E7%E8%EF%20%D3%C8%ED%EE%D7%F6%EB%26%F3%FAo%D6%F4cW%CDD%3D~mP%FC%03%E8I%60!%85%F9%0C%02jDm%18E%2B%0B%2F%0A%C9%A8%B1%12%07%C7%8E8%3E%82%9"+
		"C!r%A4%8C%82%26%8D%3C%E3%91%00%00!%F9%04%05%05%00%04%00%2C%02%00%3C%00B%00B%00%00%03%F5H%04%DC%FE%F0%A9I%AB%BD%98%C6%CD%5D%FE%E0%D5%8D%5Ch%82d*%9D%A"+
		"C%A5%BE%40%2BO%B0%3A%DF%F5x%EF%F9%B6%FF%C0%A0pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%3D%05%AE%81%AA%0C%CB%D5%9A%B8%E0%AC7%13%06%8F%2F%E5%F0%99%92.%AF%0"+
		"9m%F7%3A%AE%3E%D3%CD%F6%3B%F6%AD%DF%E7%FB%7C%80%81w%3B%02%86%02Fz%85%87%86Et%3F%8C%8CDmA%91%87%8Ex%40%96%97%98WC%9B%8D%20%03%A3%03R%A0%88%A2%A4%A3P%"+
		"A7%A8%19%AA%AAO%A7!%B0%A4N%AD%B4%B5%A5M%B3%B9%B5%BC%A0'%BA%BBK%BD%BE%B0L%C6%C7%B1J%B8%C2%BA%C5%C1%2C%C3%CD%CA%CB%B6I%D6%D7%ABH%DA%DB%C4F%DE%A9%BFG%E"+
		"2%E3%C8%E1%E6%1F%D4%E9%9B%3B%ECE%D27%F0D%F23%F4%F5%91%40%F8%F9%A1%3F%FCo%26%00%0CH%60%60%40%83o%10%AEQx%86aCt%0410K%00%00!%F9%04%05%05%00%04%00%2C%0"+
		"2%00%1F%000%00W%00%00%03%E7H%BA%0C%0E%2C%CAIk%7B%CE%EAM%B1%E7%E0%E6%8Da)%8D%A8%A9%A2%A9Z%B2%AD%CB%C1%B1%AC%D1%A4%7D%E3%98.%F2%0F%DF%0E%08%11v%88E%E3"+
		"%04%A9%AC%00%9B%16%1C4%0A%9B%0E%7B%D6_%26%CB%EDz%BF%E0%B0xL.%9B%CF%A1%80z%CDn%BB%DB%B6%B7%7C%CEv%D1%EFs%15~%0F7%F1%FF%01z%80%7Bv%83tq%86oh%8B%8C%8D%"+
		"8E%8F%90%91%92%93h%02%96%02f%97%9Ac%9A%9D%98%60%9E%9D_%A1%9E%5D%A4%A1Y%A7%A8V%AA%A5S%AD%A2%AF%B0%97%A9%B3%96%AC%B6%9F%B2%B3%5C%B62%03%C0%03%16%BC.%C"+
		"1%C1%15%AD6%C6%C6%14%A7%3E%CB%C7%CD%B1%3A%D0%D1%D2%B7B%D5%C0b%DA%C2a%DD%DE%60%DD%DC%E3%DF%DA%E4%D5c%E5%E2%E7%E6%ED%EC%E9%EE%F1%F0%D0%E8%F5%F6%CB%F8%"+
		"CC%F2%F7%F4%F9%FA%DB%D4%CD%D3wf%9F%86%04%00!%F9%04%09%05%00%04%00%2C%02%00%02%00%7C%00%7C%00%00%03%FFH%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh"+
		"%AA%AEl%EB%BEp%2C%CFt%0A%DC%40%AD%938%BE%FF%9E%5E%0FH%CC%08%7D%C5%24%E5%88T%3A%1D%CC%E6sJ%88%E6%A8X%2B%96%AA%DDN%BB%5E%A5%F5%1AN%82%CB%C41%DA%1C%5D%"+
		"B3%99%EEt%3B%0E%3C%D3i%EA%BB%CE%AE%8F%E5%FB3%7C%80%12%01%85%01!%82%83%0E%86%86%20%89%8A%0B%8C%92%1Fs%90%10%92%98%1D%95%96%8B%98%99%1BG%9C%11%9E%9E%1"+
		"CC%A2%A3%A4%9F%A8%26%AA%A5%AC%AD%AE%93%B0%24%B2%B3%B4%23%B6%8C%B8%B5%BA%85%BC%22%BE%BF%C0!%C2%C4%C1%B6%C7%B9%AE%CA%CB%A4%CD%BD%B7%D0%CE%87%D3%D6%D7%"+
		"D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%C0%02%E4%E5%E6%E7%E8%E7%DC%E9%EC%ED%E6%DA%EE%F1%ED%D9%F2%F5%EA%D8%F6%F9%02%F4%FA%F5%F0%FD%EE%D6%01L'%AE%A0%C1%83%08%13"+
		"*%5C%C8%B0%A1%C3%87h%06H%1C%00q%C1%C4%8B%10%2Fj%A4%D8pP%A3F%86%1E7*%0C%E9%11!%C9%92%07O%8A4%A8%F2%23%CB%96%13M%C2%94%98r%26%C7%970%13%CE%5C%98%93%E7"+
		"I%87%24%2B%AE%ACH%00%23%D1%A3H%93*%5D%CA%B4%A9%D3%A7P%A3J%9DJ%B5%AA%D5%ABX%B3j%DD%CA%B5%AB%D7%AF%60%C3%16I%00%00%3B";
		loadingGif.style.border					= 'none';
		
		objLoading.appendChild(loadingGif);
		
		// loading text
		var objLoadingText					= document.createElement("p");
		objLoadingText.setAttribute('id','greasedLightboxLoadingText');
		objLoadingText.innerHTML			= greasedLanguage[greasedLanguage.language][0].loading;
		objLoading.appendChild(objLoadingText);
		
		// helper message
		var objLoadingHelp					= document.createElement("p");
		objLoadingHelp.setAttribute('id','greasedLightboxLoadingHelp');
		objLoadingHelp.innerHTML			= greasedLanguage[greasedLanguage.language][0].loadingSub;
		objLoading.appendChild(objLoadingHelp);
		
		// error div
		var objErrorBox						= document.createElement("div");
		objErrorBox.setAttribute('id','greasedLightboxError');
		objBody.appendChild(objErrorBox);
		
		
		// error message
		var objError						= document.createElement("p");
		objError.setAttribute('id','greasedLightboxErrorMessage');
		objError.innerHTML					= greasedLanguage[greasedLanguage.language][0].error +
			'<p id="greasedLightboxErrorContext"></p>';
		objErrorBox.appendChild(objError);
		// lightbox div
		var objLightbox						= document.createElement("div");
		objLightbox.setAttribute('id','greasedLightbox');
		objOverlay.appendChild(objLightbox);
		
		// empty image
		var objImage						= document.createElement("img");
		objImage.addEventListener('click', greasedLightbox.halt, false);
		objImage.setAttribute('id','greasedLightboxImage');
		objLightbox.appendChild(objImage);
		
		// empty preloader
		var objPreload						= document.createElement("img");
		objPreload.setAttribute('id','greasedLightboxPreload');
		objBody.appendChild(objPreload);
		
		// empty prefetcher
		var objPrefetch						= document.createElement("img");
		objPrefetch.setAttribute('id','greasedLightboxPrefetch');
		objPrefetch.addEventListener('error', function() { return false; }, false);
		objBody.appendChild(objPrefetch);
		
		// empty caption
		var objCaption						= document.createElement("div");
		objCaption.setAttribute('id','greasedLightboxCaption');
		objLightbox.appendChild(objCaption);
		
		document.addEventListener('keypress', greasedLightbox.handleKey, true);
		
	}, // init()
	
	// unload
	// runs onunload to clear up possible memory leaks
	unload : function () {
		var objOverlay			= document.getElementById('greasedLightboxOverlay');
		objOverlay.removeEventListener('click', greasedLightbox.halt, false);
		
		var objMenuButtonRight	= document.getElementById('greasedLightboxButtonRight');
		objMenuButtonRight.removeEventListener('click', function(event) { greasedLightbox.moveSlide(event, 1); }, false);
		
		var objMenuButtonLeft	= document.getElementById('greasedLightboxButtonLeft');
		objMenuButtonLeft.removeEventListener('click', function(event) { greasedLightbox.moveSlide(event, -1); }, false);
		
		var objMenuButtonPlus	= document.getElementById('greasedLightboxButtonPlus');
		objMenuButtonPlus.removeEventListener('click', function(event) { greasedLightbox.resize(event, 13); }, false);
		
		var objMenuButtonMinus	= document.getElementById('greasedLightboxButtonMinus');
		objMenuButtonMinus.removeEventListener('click', function(event) { greasedLightbox.resize(event, -13); }, false);
		
		var objLoading			= document.getElementById('greasedLightboxLoading');
		objLoading.removeEventListener('click', greasedLightbox.halt, false);
		
		var objError			= document.getElementById('greasedLightboxErrorMessage');
		objError.removeEventListener('click', greasedLightbox.halt, false);
		
		var objImage			= document.getElementById('greasedLightboxImage');
		objImage.removeEventListener('click', greasedLightbox.halt, false);
		
		var objPrefetch			= document.getElementById('greasedLightboxPrefetch');
		objPrefetch.removeEventListener('error', function() { return false; }, false);
		
		document.removeEventListener('keypress', greasedLightbox.handleKey, true);
		
	} // unload()
} // greasedLightbox
var greasedLanguage = {
	
	// english
	en : [
		{
			loading			: 'Loading image',
			loadingSub		: 'Click anywhere to cancel',
			context			: 'View image in its original context',
			error			: 'Image unavailable',
			next			: 'Next image (right arrow key)',
			previous		: 'Previous image (left arrow key)',
			magnify			: 'Magnify image (+ key)',
			shrink			: 'Shrink image (- key)',
			update			: 'Update available',
			slideshow		: 'Start/stop slideshow'
		}
	], // english
	
	// español
	es : [
		{
			loading			: 'Cargando imagen',
			loadingSub		: 'Click en cualquier sitio para cancelar',
			context			: 'Ver imagen en su contexto original',
			error			: 'La imagen no está disponible',
			next			: 'Siguiente imagen (tecla derecha)',
			previous		: 'Imagen anterior (tecla izquierda)',
			magnify			: 'Aumentar tamaño (tecla +)',
			shrink			: 'Reducir tamaño (tecla -)',
			update			: 'Actualización disponible',
			slideshow		: ''
		}
	], // español
	
	// português (portuguese)
    pt : [
		{
			loading			: 'Carregando imagem',
			loadingSub		: 'Clique em qualquer lugar para cancelar',
			context			: 'Imagem no contexto original',
			error			: 'Imagem indisponível',
			next			: 'Próxima imagem (tecle na seta da direita)',
			previous		: 'Imagem anterior (tecle na seta da esquerda)',
			magnify			: 'Aumente o zoom (tecle +)',
			shrink			: 'Diminua o zoom (tecle -)',
			update			: 'Atualização disponível',
			slideshow		: 'Iniciar/cancelar apresentação'
		}
    ], // português
	
	// deutsch (german)
	de : [
		{
		  	loading			: 'Bild wird geladen',
			loadingSub		: 'Zum Abbrechen irgendwo klicken',
			context			: 'Bild im ursprünglichen Kontext anzeigen',
			error			: 'Bild nicht verfügbar',
			next			: 'Nächstes Bild (Pfeil rechts)',
			previous		: 'Vorheriges Bild (Pfeil links)',
			magnify			: 'Bild vergrößern (+ Taste)',
			shrink			: 'Bild verkleinern (- Taste)',
			update			: 'Aktualisierung verfügbar',
			slideshow		: 'Diashow starten/beenden'
		}
	], // deutsch
	
	// français (french)
	fr : [
		{
			loading			: 'Chargement de l\'image',
			loadingSub		: 'Cliquez n\'importe où pour annuler',
			context			: 'Voir cette image dans son contexte original',
			error			: 'Image indisponible',
			next			: 'Image suivante (Touche flèche droite) ',
			previous		: 'Image précédente (Touche fléche gauche)',
			magnify			: 'Agrandir l\'image (Touche +)',
			shrink			: 'Reduire l\'image (Touche -)',
			update			: 'Mise à jour disponible',
			slideshow		: ''
		}
	], // français
	
	// het Nederlands (dutch)
	nl : [
		{
			loading			: 'Laden',
			loadingSub		: 'Klik ergens om terug te keren',
			context			: 'Bekijk het plaatje in zijn originele context',
			error			: 'Plaatje niet beschikbaar',
			next			: 'Volgend plaatje (rechter pijltjestoets)',
			previous		: 'Vorig plaatje (linker pijltjestoets)',
			magnify			: 'Vergoot plaatje (+ toets)',
			shrink			: 'Verklein plaatje (- toets)',
			update			: 'Update beschikbaar',
			slideshow		: 'Start/stop diavoorstelling'
		}
	], // het Nederlands
	
	// italiano (italian)
	it : [
		{
		  	loading			: 'Scarico immagine',
			loadingSub		: 'Fai clic sullo sfondo per annullare',
			context			: 'Mostra nel suo contesto originale',
			error			: 'Immagine non disponibile',
			next			: 'Successiva (tasto freccia a destra)',
			previous		: 'Precedente (tasto freccia a sinistra)',
			magnify			: 'Ingrandisci (tasto +)',
			shrink			: 'Riduci zoom (tasto -)',
			update			: 'Aggiornamento disponibile',
			slideshow		: 'Avvia/ferma presentazione'
		}
	], // italiano
	
	// ???????? (greek)
	el : [
		{
		  	loading			: '?????a f??t?s??',
			loadingSub		: '?t?p?ste ?p??d?p?te ??a ?a a????sete',
			context			: '?????a ?p???? st? a????? p?a?s?? t??',
			error			: '?????a µ? d?a??s?µ?',
			next			: 'Next image (right arrow key)',
			previous		: 'Previous image (left arrow key)',
			magnify			: 'Magnify image (+ key)',
			shrink			: 'Shrink image (- key)',
			update			: 'Update available',
			slideshow		: ''
		}
	], // ????????
	
	// russki (russian)
	ru : [
		{
		  	loading			: '??????????? ????????',
			loadingSub		: 'Click ???-????, ????? ????? ????????',
			context			: '??????????? ??????? ? ????? ????????????? ??????',
			error			: '??????????? ?????????????',
			next			: 'Next image (right arrow key)',
			previous		: 'Previous image (left arrow key)',
			magnify			: 'Magnify image (+ key)',
			shrink			: 'Shrink image (- key)',
			update			: 'Update available',
			slideshow		: ''
		}
	], // russki
	
	// hungarian
	hu : [
		{
			loading			: 'K\u00E9p bet\u00F6lt\u00E9se',
			loadingSub		: 'Kattints a visszal\u00E9p\u00E9shez',
			context			: 'Megtekint\u00E9s az eredeti k\u00F6rnyezet\u00E9ben',
			error			: 'K\u00E9p nem el\u00E9rhet\u0151',
			next			: 'K\u00F6vetkez\u0150 k\u00E9p (jobbra gomb)',
			previous		: 'El\u0150z\u0150 k\u00E9p (balra gomb)',
			magnify			: 'Nagy\u00EDtás (+ gomb)',
			shrink			: 'Kicsiny\u00EDt\u00E9s (- gomb)',
			update			: 'El\u00E9rhet\u0150 az \u00FAjabb verzi\u00F3',
			slideshow		: ''
		}
	], // hungarian
	
	// finnish
	fi : [
	  {
			loading			: 'Ladataan kuvaa',
			loadingSub		: 'Napsauta kerran keskeyttääksesi',
			context			: 'Näytä kuva alkuperäisessä kontekstissa',
			error			: 'Kuvaa ei saatavissa',
			next     		: 'Seuraava kuva (oikea nuolinäppäin)',
			previous 		: 'Edellinen kuva (vasen nuolinäppäin)',
			magnify  		: 'Suurenna kuvaa (+ näppäin)',
			shrink   		: 'Pienennä kuvaa (- näppäin)',
			update   		: 'Päivitys saatavilla',
			slideshow		: 'Käynnistä/Pysäytä dia esitys'
	  }
	], // finnish
	
	// japanese
	ja : [
		{
		  	loading			: '\u8AAD\u307F\u8FBC\u307F\u4E2D',
			loadingSub		: '\u30AF\u30EA\u30C3\u30AF\u3067\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u307E\u3059',
			context			: '\u5143\u306E\u753B\u50CF\u3092\u8868\u793A',
			error			: '\u753B\u50CF\u304C\u5B58\u5728\u3057\u307E\u305B\u3093',
			next			: '\u6B21\u306E\u753B\u50CF',
			previous		: '\u524D\u306E\u753B\u50CF',
			magnify			: '\u753B\u50CF\u3092\u62E1\u5927 (+)',
			shrink			: '\u753B\u50CF\u3092\u7E2E\u5C0F (-)',
			update			: '\u65B0\u3057\u3044\u66F4\u65B0\u304C\u3042\u308A\u307E\u3059',
			slideshow		: '\u30B9\u30E9\u30A4\u30C9\u30B7\u30E7\u30FC\u3092\u958B\u59CB\u002F\u505C\u6B62'
		}
	], // japanese 
	
	// chinese (simplified)
	zh : [
		{
		  	loading			: '\u8BFB\u53D6\u56FE\u7247',
			loadingSub		: '\u6309\u4EFB\u610F\u952E\u6765\u53D6\u6D88',
			context			: '\u4EE5\u539F\u6587\u672C\u67E5\u770B\u56FE\u7247',
			error			: '\u56FE\u7247\u4E0D\u53EF\u8BFB',
			next			: '\u4E0B\u4E00\u4E2A\u56FE\u7247 (\u53F3\u952E)',
			previous		: '\u524D\u4E00\u4E2A\u56FE\u7247 (\u56FE\u7247)',
			magnify			: '\u653E\u5927\u56FE\u7247 (+\u952E)',
			shrink			: '\u7F29\u5C0F\u56FE\u7247 (-\u952E)',
			update			: '\u53EF\u63D0\u4F9B\u66F4\u65B0',
			slideshow		: ''
		}
	], // chinese (simplified)
	
    // Chinese (traditional)
	tw : [
		{
			loading			: '\\u8F09\\u5165\\u5716\\u7247\\u4E2D',
			loadingSub		: '\\u6309\\u4EFB\\u610F\\u9375\\u53D6\\u6D88',
			context			: '\\u6253\\u958B\\u5716\\u7247\\u539F\\u59CB\\u7DB2\\u5740',
			error			: '\\u7121\\u6CD5\\u8F09\\u5165\\u5716\\u7247',
			next			: '\\u4E0B\\u4E00\\u5F35\\u5716 (\\u53F3\\u9375)',
			previous		: '\\u4E0A\\u4E00\\u5F35\\u5716 (\\u5DE6\\u9375)',
			magnify			: '\\u653E\\u5927\\u5716\\u7247 (+\\u9375)',
			shrink			: '\\u7E2E\\u5C0F\\u5716\\u7247 (-\\u9375)',
			update			: '\\u6709\\u66F4\\u65B0\\u7248\\u672C',
			slideshow		: '\\u958B\\u59CB/\\u505C\\u6B62\\u5FAA\\u5E8F\\u64AD\\u653E'
		}
	], // Chinese (traditional)
    
    // polish
	pl : [
		{
			loading			: '\u0141aduj\u0119 obraz',
			loadingSub		: 'Kliknij aby przerwa\u010B',
			context			: 'Zobacz obraz w oryginalnym kontek\u015Bcie',
			error			: 'Obraz niedost\u0119pny',
			next			: 'Nast\u0119pny obraz (klawisz \u2192)',
			previous		: 'Poprzedni obraz (klawisz \u2190)',
			magnify			: 'Powi\u0119ksz obraz (klawisz +)',
			shrink			: 'Zmniejsz obraz (klawisz -)',
			update			: 'Dost\u0119pna nowa wersja',
			slideshow		: 'Uruchom/zatrzymaj pokaz slajd\u00F3w'
		}
	], // polish 
	
	// czech
	cs : [
		{
			loading			: 'Nahrávám obrázek',
			loadingSub		: 'Kliknete kamkoliv pro zrušení',
			context			: 'Prohlížet obrázek v orignálním kontextu',
			error			: 'Obrázek není dostupný',
			next			: 'Další obrázek (šipka doprava)',
			previous		: 'Predchozí obrázek (šipka doleva)',
			magnify			: 'Priblížit obrázek (klávesa +)',
			shrink			: 'Oddálit obrázek (klávesa -)',
			update			: 'Je dostupná aktualizace',
			slideshow		: 'Spustit/zastavit slideshow'
		}
	], // czech
	
	// slovak
	sk : [
		{
			loading			: 'Nahrávam obrázok',
			loadingSub		: 'Pre zrušenie kliknite kdekolvek',
			context			: 'Prezriet obrázok v orignálnom kontexte',
			error			: 'Obrázok nie je dostupný',
			next			: 'Další obrázok (šípka doprava)',
			previous		: 'Predchádzajúci obrázok (šípka dolava)',
			magnify			: 'Priblížit obrázok (klávesa +)',
			shrink			: 'Oddialit obrázok (klávesa -)',
			update			: 'Je dostupná aktualizácia',
			slideshow		: ''
		}
	], // slovak
	
	// swedish
	sv : [
		{
			loading			: 'Laddar bild',
			loadingSub		: 'Klicka för att avbryta',
			context			: 'Visa originalbild',
			error			: 'Bild inte tillgänglig',
			next			: 'Nästa bild (höger piltangent)',
			previous		: 'Föregående bild (vänster piltangent)',
			magnify			: 'Förstora bild (+-tangent)',
			shrink			: 'Förminska bild (–tangent)',
			update			: 'Ny uppdatering tillgänglig',
			slideshow		: 'Starta/stoppa bildspel'
		}
	], // swedish
	 
	/* language template
	// 
	 : [
		{
		  	loading			: '',
			loadingSub		: '',
			context			: '',
			error			: '',
			next			: '',
			previous		: '',
			magnify			: '',
			shrink			: '',
			update			: '',
			slideshow		: ''
		}
	], // end 
	*/
	
	// lauguage
	// the correct language for localization is set in init()
	language : null,
	
	// init()
	// sets this.language to the correct value based on navigator.language
	init : function() {
		this.language		= this[navigator.language.substring(0,2)] ? navigator.language.substring(0,2) : 'en';
	} // init()
}; // greasedLanguage
if (document.body) greasedLightbox.init();}

var offInstantSearch = true;

if (offInstantSearch) {
	if (top != self) return;
	var target = document.getElementById("po-off");
	if (!target) return;

	var className = target.className;
	if (!className) return;

	if (/unselected/.test(className))window.location = target.href;}

})();