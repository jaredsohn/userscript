// ==UserScript==
// @name OGame Style - Darkness V2.0 (edited)-P1
// @namespace xxx
// @description OGame Style - Darkness V2.0 (edited)-P1
// @include http://*.ogame.pl/*
// ==/UserScript==
/*
#####################################
#####################################
####
#### OGame Style - Darkness V2.0 -P1
#### By rtml aka Forcetree
#### Credits to:
####
####	Mic2003
####	FS.Ironman
####
#### Used Tools:
####
####	Proton
####	Gimp
####
#####################################
#####################################
*/

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document
domain("uniXYZ.ogame.TLD"),

domain("andromeda.ogame.pl"),
domain("barym.ogame.pl"),
domain("capella.ogame.pl"),
domain("draco.ogame.pl"),
domain("electra.ogame.pl"),
domain("fornax.ogame.pl"),
domain("gemini.ogame.pl"),
domain("hydra.ogame.pl"),
domain("io.ogame.pl"),
domain("jupiter.ogame.pl"),
domain("kassiopeia.ogame.pl"),
domain("leo.ogame.pl"),
domain("mizar.ogame.pl"),
domain("nekkar.ogame.pl"),
domain("orion.ogame.pl"),
domain("pegasus.ogame.pl"),
domain("quantum.ogame.pl"),
domain("rigel.ogame.pl"),
domain("sirius.ogame.pl"),
domain("taurus.ogame.pl"),
domain("ursa.ogame.pl"),
domain("vega.ogame.pl"),
domain("wasat.ogame.pl"),
domain("xalynth.ogame.pl"),
domain("yakini.ogame.pl"),
domain("zagadra.ogame.pl"),

domain("uni101.ogame.pl"),
domain("uni102.ogame.pl"),
domain("uni103.ogame.pl"),
domain("uni104.ogame.pl"),
domain("uni105.ogame.pl"),
domain("uni106.ogame.pl"),
domain("uni107.ogame.pl"),
domain("uni108.ogame.pl"),
domain("uni109.ogame.pl"),
domain("uni110.ogame.pl"),
domain("uni111.ogame.pl"),
domain("uni113.ogame.pl"),
domain("uni114.ogame.pl"),
domain("uni115.ogame.pl"),
domain("uni116.ogame.pl"),
domain("uni117.ogame.pl"),
domain("uni118.ogame.pl"),
domain("uni119.ogame.pl"),
domain("uni120.ogame.pl"),
domain("uni121.ogame.pl"),
domain("uni122.ogame.pl"),
domain("uni123.ogame.pl"),
domain("uni124.ogame.pl"),
domain("uni125.ogame.pl"),
domain("uni126.ogame.pl"),
domain("uni127.ogame.pl"),

domain("uni1.ogame.pl"),
domain("uni2.ogame.pl"),
domain("uni3.ogame.pl"),
domain("uni4.ogame.pl"),
domain("uni5.ogame.pl"),
domain("uni6.ogame.pl"),
domain("uni7.ogame.pl"),
domain("uni8.ogame.pl"),
domain("uni9.ogame.pl"),
domain("uni10.ogame.pl"),
domain("uni11.ogame.pl"),
domain("uni13.ogame.pl"),
domain("uni14.ogame.pl"),
domain("uni15.ogame.pl"),
domain("uni16.ogame.pl"),
domain("uni17.ogame.pl"),
domain("uni18.ogame.pl"),
domain("uni19.ogame.pl"),
domain("uni20.ogame.pl"),
domain("uni21.ogame.pl"),
domain("uni22.ogame.pl"),
domain("uni23.ogame.pl"),
domain("uni24.ogame.pl"),
domain("uni25.ogame.pl"),
domain("uni26.ogame.pl"),
domain("uni27.ogame.pl"),
domain("uni28.ogame.pl"),
domain("uni29.ogame.pl"),
domain("uni30.ogame.pl"),
domain("uni31.ogame.pl"),
domain("uni32.ogame.pl"),
domain("uni33.ogame.pl"),
domain("uni34.ogame.pl"),
domain("uni35.ogame.pl"),
domain("uni36.ogame.pl"),
domain("uni37.ogame.pl"),
domain("uni38.ogame.pl"),
domain("uni39.ogame.pl"),
domain("uni40.ogame.pl"),
domain("uni41.ogame.pl"),
domain("uni42.ogame.pl"),
domain("uni43.ogame.pl"),
domain("uni44.ogame.pl"),
domain("uni45.ogame.pl"),
domain("uni46.ogame.pl"),
domain("uni47.ogame.pl"),
domain("uni48.ogame.pl"),
domain("uni49.ogame.pl"),
domain("uni50.ogame.pl"),
domain("uni51.ogame.pl"),
domain("uni52.ogame.pl"),
domain("uni53.ogame.pl"),
domain("uni54.ogame.pl"),
domain("uni55.ogame.pl"),
domain("uni56.ogame.pl"),
domain("uni57.ogame.pl"),
domain("uni58.ogame.pl"),
domain("uni59.ogame.pl"),
domain("uni60.ogame.pl"),
domain("uni61.ogame.pl"),
domain("uni62.ogame.pl"),
domain("uni63.ogame.pl"),
domain("uni64.ogame.pl"),
domain("uni65.ogame.pl"),
domain("uni66.ogame.pl"),

domain("uniXYZ.ogame.TLD")


{


 /*#######################################################
                   	ALLGEMEIN
#######################################################*/

 .textInput,
 #planetName,
 #number {
  background-color: #848484 !important;
  color: #000000 !important;
  opacity: 0.3;
 }

 /*Part by Mic2003*/
 #bar,
 #box,
 #info,
 #boxBG {
  color: #848484 !important;
  background-image: none !important;
  background-color: transparent !important;
 }

 .button188, .buttonSave, .buttonOK,
 .button188:hover, .buttonSave:hover, .buttonOK:hover {
  border: 2px solid #000 !important;
  background-image: none !important;
 }

 .button188:hover,
 .buttonSave:hover,
 .buttonOK:hover{
  opacity: 0.4 !important;
 }

 .buttonOK:hover{
  background-position: -88px -81px !important;
 }

 .fadeBox{
  color: #848484 !important;
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000 !important;
 }

 .fadeBox p,
 .fadeBox span{
   color: #848484 !important;
 }

 .fadeBox .success{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/ok.png) !important;
 }

 .fadeBox .failed{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/error.png) !important;
 }

 h1, h2, h3, h4, h5{
  color: #848484 !important;
 }

 a, h1, h2, h3, li, ul{
  color: #848484 !important;
 }

 a{
  color: #848484 !important;
 }

 a:hover{
  color: #ffffff !important;
 }

 .tips, .tips.fleft  span{
  color: #848484 !important;
 }

 body#alliance,
 body#changelog,
 body#combatreport,
 body#defense,
 body#fleet1,
 body#fleet2,
 body#fleet3,
 body#galaxy,
 body#imperium,
 body#messages,
 body#movement,
 body#network,
 body#networkbewerbungen,
 body#networkkommunikation,
 body#networkverwaltung,
 body#overview,
 body#payment,
 body#preferences,
 body#premium,
 body#research,
 body#resources,
 body#resourceSettings,
 body#shipyard,
 body#station,
 body#station-moon,
 body#statistics,
 body#techtree,
 body#ticket,
 body#trader,
 body#tutorial{
 
  background: #000 url(http://www.skinsog1.yoyo.pl/new/bkd_page.gif) !important;
 
  background-position: top !important;
 }

 /*#######################################################
                   	HEADER UND INFO
####################################################### */
 /*Part by Mic2003*/

 a[id="message_alert_box"].tipsStandard{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/post_on.png) !important;
 }

 a[id="message_alert_box"].emptyMessage{
 background: url(http://forcetree.redio.de/DarknessV2.0/post_off.png) no-repeat !important;
 }

 a[id="message_alert_box"] span{
  margin-top: -3px !important;
  margin-left: -15px !important;
 }

 /*Dropdownlink Flottenanzeige*/
 #messages_collapsed{
  background-image: none !important;
 }

 #messages_collapsed a:link,
 #messages_collapsed a:visited,
 #messages_collapsed a:hover,
 #messages_collapsed a:active{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/message-open-close-bg.gif) !important;
 }

 #messages_collapsed a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/message-open-close-bg.gif) !important;
 }

 #eventtype{
  margin-top: 1px !important;
 }

 /*"Keine Flottenbewegungen*/
 #eventboxBlank{
  color: #848484!important;
  text-transform: capitalize !important;
 }

 #eventboxBlank:before{
  content: "-";
 }

 #eventboxBlank:after{
  content: " -";
 }

 /*Rohstoffeanzeige färben*/

 #info li .value{
  color: #848484 !important;
 }

 #helper{
  margin-top: 4px !important;
  margin-left: -2px !important;
 }

 #bar, #playerName, #OGameClock {
  background-color: transparent !important;
  color:#848484 !important;
  margin: 0px !important;
  padding: 5px 0px 0px 0px !important;
  height: auto !important;
  font-size: 10px !important;
  top: -2px !important;
 }

 #playerName {
  text-align: left !important;
  left: 0px !important;
  width: 200px !important;
  padding-left: 5px !important;
 }

 #bar{
  text-align: center !important;
  border: 0px !important;
  width: 980px !important;
 }

 #bar a:hover{
  color: #ffffff !important;
 }

 #OGameClock{
  left: 790px !important;
  width: 200px !important;
 }

 #playerName .textBeefy, #OGameClock span{
  color: #848484 !important;
 }

 #bar ul{
  width: 950px !important;
 }

 #bar ul,
 #bar ul li,
 #bar ul li a{
  margin: 0px !important;
 }

 #bar ul li a{
  color: #848484 !important;
  margin: 0px 0px 0px 5px !important;
 }

 /*Rohstoffbilder ersetzen*/
 #metal_box > IMG,
 #crystal_box > IMG,
 #deuterium_box > IMG,
 #energy_box > IMG,
 #darkmatter_box > A > IMG{
  opacity: 0.0!important;
 }

 #info ul#resources li.metal{
  background:url(http://forcetree.redio.de/DarknessV2.0/metall.gif) no-repeat center !important;
 }

 #info ul#resources li.crystal{
  background:url(http://forcetree.redio.de/DarknessV2.0/kristall.gif) no-repeat center !important;
  }

 #info ul#resources li.deuterium{
  background:url(http://forcetree.redio.de/DarknessV2.0/deuterium.gif) no-repeat center !important;
  }

 #info ul#resources li.energy{
  background:url(http://forcetree.redio.de/DarknessV2.0/energie.gif) no-repeat center !important;
  }

 #info ul#resources li.darkmatter{
  background:url(http://forcetree.redio.de/DarknessV2.0/ressourcen_DM.gif) no-repeat center !important;
 }

 /*Part by FS.Ironman*/

 #info{
  background-image : url(http://www.skinsog1.yoyo.pl/new/toolbar_neu_2.png) !important;
 }

 #clearAdvice{
  display:none !important;
 }

 #links{
  position:relative !important;
  top:1px !important;
 }

 #attack_alert{
  position:relative !important;
  left:9px !important;
  top:0px !important;
 }

 #eventboxFilled{
  position:relative !important;
  right:-8px !important;
  top:-0px !important;
 }

 .c-right,
 .c-left{
  display:none ;
 }

 a .tips thickbox{
  display:none !important;
 }

 .content-box-s{
  position:relative !important;
  top:-8px !important;
  right:-1px !important;
 }

 /*#######################################################
                   	MENÜ
####################################################### */
 /*Part by FS.Ironman*/
 #links #menuTable a.menubutton{
  background:url(http://forcetree.redio.de/DarknessV2.0/hauptnavi_a.gif) !important;}

 #links #menuTable a.menubutton:hover,
 #links #menuTable a.menubutton:active,
 #links #menuTable a.selected:link,
 #links #menuTable a.selected:visited,
 #links #menuTable a.selected:hover,
 #links #menuTable a.selected:active{
  background: url(http://forcetree.redio.de/DarknessV2.0/hauptnavi_a.gif) no-repeat !important;
  color: #ffffff !important;
 }

 /*Part by Mic2003*/
/* li .menu_icon img{
  display: none;
 }

 #links #menuTable li span.menu_icon{
  display: block !important;
  height: 29px !important;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_overview_a.gif);
 }

 #links #menuTable li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_resources_a.gif);
 }

 #links #menuTable li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_station_a.gif);
 }

 #links #menuTable li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_trader_a.gif);
 }

 #links #menuTable li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_research_a.gif);
 }

 #links #menuTable li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_shipyard_a.gif);
 }

 #links #menuTable li + li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_defense_a.gif);
 }

 #links #menuTable li + li + li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_fleet1_a.gif);
 }

 #links #menuTable li + li + li + li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_galaxy_a.gif);
 }

 #links #menuTable li + li + li + li + li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_network_a.gif);
 }

 #links #menuTable li + li + li + li + li + li + li + li + li + li + li span.menu_icon{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_premium_a.gif);
 }

 #links #menuTable li span.menu_icon a{
  display: block !important;
  height: 29px !important;
 }

 #links #menuTable li span.menu_icon a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_overview_b.gif) !important;
 }

 #links #menuTable li + li span.menu_icon a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_resources_b.gif) !important;
 }

 #links #menuTable li + li + li + li + li + li + li + li span.menu_icon a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/navi_ikon_fleet1_b.gif) !important;
 }


 /*#######################################################
                       KLEINE BOXEN
####################################################### */

 /*Versorgungseinstellungen / Raketenabreißen Button*/
 #planet .slot,
 #planet .slot-hover,
 .breakrocket a,
 .breakrocket a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/slots-bg.gif) !important;
 }

 .content-box-s .header{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/box_1_kopf.gif) !important;
 }

 .content-box-s .content{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/box_1_mitte.gif) !important;
 }

 .content-box-s .footer{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/box_1_fuss.gif) !important;
 }


 /*#######################################################
                       Planetenmenü
####################################################### */

 #countColonies {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/countColonies-bg.gif) !important;
  position: relative !important; top: 3px !important;
  color: #848484 !important;
 }

 .constructionName {
  color: #ffffff !important;
  font-size: 9px !important;
  position: absolute !important;
  top: 6px !important;
  left: 50px !important;
 }

 .planetPic,
 .planet-name {
  display: none !important;
 }

 .icon-moon:hover,
 .icon-moon:focus,
 .icon-moon:active {
  background: url(http://forcetree.redio.de/DarknessV2.0/moon_hover.gif) no-repeat !important;
 }

 .icon-moon {
  height: 0 !important;
  width: 0 !important;
  position: absolute !important;
  left: 0px !important;
  padding-left: 16px !important;
  padding-top: 16px !important;
  background: url(http://forcetree.redio.de/DarknessV2.0/moon.gif) no-repeat !important;
 }

 .planet-koords {
  font-weight: bold !important;
  font-size: 12px !important;
  text-align: left !important;
 }

 #rechts #cutty .smallplanet,
 .planetlink.tipsStandard {
  height:16px !important;
 }

 .moonlink.tipsStandard {
  height: 16px !important;
  width: 40px !important;
  margin-left: 2px !important;
  position: absolute !important; top: 0px !important;

 }

 .planet-koords {
  position: absolute !important; top: 0px !important;
  right: 0px !important;
}

 #rechts .smallplanet a.planetlink:hover {
  background: none !important;
 }

 #rechts .smallplanet a.active,
 #rechts .smallplanet a.active:link{
  background: none !important;
 }

 #rechts a.alert span.activity {
  position: absolute !important; top: -19px !important;
 }

 /*#######################################################
                   	 ÜBERSICHT
####################################################### */

 /*Part by Mic2003*/

 /* Planetdata */
 #overview #planetdata{
  font-size: 10px !important;
  padding: 20px 0px 3px 0px !important;
  margin: 0px 0px 0px 0px !important;
  width: 271px !important;
  height: 83px !important;
  border: 1px dashed #848484 !important;
/*  float: left !important;*/
 }

 #planetdata #diameterField, #temperatureField, #positionField, #scoreField, #optionsField{
  color: #848484 !important;
  font-weight: normal !important;
 }

 #overview #planet > H2 {
  font-size: 12px !important;
  width: 150px !important;
  height: 20px !important;
  position: absolute !important;
  top: -5px !important;
  left: 245px !important;
 }

 #overview #planet .planetNameOverview {
  display: none;
 }

 #overview #planet {
  position: relative !important;
  top: 0px !important;
  left: 0px !important;
  width: 654px !important;
  height: 109px !important;
 }

 #overview #moon > A > IMG,
 #overview #planet_as_moon > A > IMG {
  opacity: 0.0 !important;
 }

 #overview #planet_as_moon > A > IMG,
 #overview #moon > A > IMG{
  width: 350px !important;
  height: 109px !important;
 }

 #overview #moon,
 #overview #planet_as_moon {
  position: relative !important;
  top: 0px !important;
  left: 0px !important;
  width: 10px !important;
  height: 109px !important;
 }

 #overview #planet_as_moon:after,
 #overview #moon:after {
  position: relative !important;
  top: -60px !important;
  right: 350px;
  font-weight: bold !important;
 }

 #overview #planet_as_moon:after {
  content: "Przełącz na Planetę" !important;
 }

 #overview #moon:after {
  content: "Przełącz na Księżyc" !important;
 }

 /*#######################################################
                       CONTENT HINTERGRÜNDE
####################################################### */

 #fleet1 #warning,
 #fleet2 #warning,
 #movement #warning,
 #fleet3 #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h150.gif) !important;
 }

 #station #buttonz, #station-moon #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h150.gif) !important;
 }

 #resources #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h220.gif) !important;
 }

 #trader #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h175.gif) !important;
 }

 #research #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box-res-bg.gif) !important;
 }

 #shipyard #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h220.gif) !important;
 }

 #spacer{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_trenner_oben.gif) !important;
 }

 #defense #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h220.gif) !important;
 }

 #fleet1 #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h375.gif) !important;
 }

 #premium #buttonz{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/box_h220.gif) !important;
 }

 div #buttonz h2,
 #trader div #buttonz h3,
 #shipyard div #civilships,
 #fleet3 div #buttonz h3,
 #fleet3  #wrap  #resources,
 #fleet3 div #roundup,
 div #abandonplanet h3{
  position:relative;top: 3px;
 }

 div #buttonz .wrapButtons div #wrapMilitary .resLeft fleft IEinline h3{
  display:none;
 }

 /*300*/
 div.detail_screen{
  background-image:url(http://forcetree.redio.de/DarknessV2.0/detail-bg300a.gif) !important;
 }

 /*250*/
 #research div.detail_screen,
 #shipyard div.detail_screen,
 #defense div.detail_screen{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/detail-bg300a.gif) !important;
 }

 .fleetStatus{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/fleetStatus-bg.gif) !important;
 }

 .boxWrapper .header,
 #resourceSettings .headerRS{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-header.gif)  !important;
 }

 .boxWrapper .content,
 #preferences .contentzs .content,
 #resourceSettings .mainRS{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-body.gif)  !important;
 }

 .boxWrapper .footer,
 #resourceSettings .footerRS,
 #preferences .contentzs .footer{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-footer.gif) !important;
 }

 tr.alt td{
  background-color: #111111 !important;
 }

 /*Hintergrund "Planet aufgeben/umbenennen"*/
 div#abandonplanet{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/box_h375.gif)  !important;
 }

  /*#######################################################
                       DETAILS
####################################################### */

 #spacer{
  background-image: none !important;
 }
 a.build-it,
 a.build-it_disabled,
 a.build-it:hover,
 a.build-it_disabled:hover,
 li.techtree a span.pic,
 li.techtree a span.disabled,
 li.techtree a span.disabled,
 li.techtree a:hover span.disabled,
 li.techtree a:hover span.pic {
  background-image: none !important;
 }

 a.build-it_disabled,
 a.build-it_disabled:hover {
  color: #D43635 !important;
 }

 a.help,
 a.help:link{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/spriteset_detail.gif) !important;
 }

 a.help:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/spriteset_detail.gif) !important;
  opacity: 0.4 !important;
 }

 /*Fragezeichen*/
 div#description p a.help{
  background:transparent url(http://forcetree.redio.de/DarknessV2.0/spriteset_detail.gif) -207px -34px no-repeat !

important;
  display:block !important;
  float:left !important;
  height:18px !important;
  width:18px !important;
  margin: 0px 5px 18px 0px !important;
 }

 div#description p a.help:hover {
  background:transparent url(http://forcetree.redio.de/DarknessV2.0/spriteset_detail.gif) -207px -52px no-repeat !

important;
 }

 /*Abreißen*/
 li.demolish a span.pic,
 li.demolish a span.disabled,
 li.demolish a:hover span.pic,
 li.demolish a:hover span.disabled {
  background-image: none !important;
 }

 #errorBoxDecision #response a:link,
 #errorBoxDecision #response a:visited,
 #errorBoxDecision #response a:hover,
 #errorBoxDecision #response a:active,
 #errorBoxNotify #response a:link,
 #errorBoxNotify #response a:visited,
 #errorBoxNotify #response a:hover,
 #errorBoxNotify #response a:active,
 #globalError a.button,
 #fleet1 a#continue:link,
 #fleet1 a#continue:visited,
 #fleet1 a#continue:active,
 #fleet2 a#continue:link,
 #fleet2 a#continue:visited,
 #fleet2 a#continue:active,
 #fleet2 a#back:link,
 #fleet2 a#back:visited,
 #fleet2 a#back:active,
 #fleet3 a#back:link,
 #fleet3 a#back:visited,
 #fleet3 a#back:active,
 #station #jumpgate a#continue:link,
 #station #jumpgate a#continue:visited,
 #station #jumpgate a#continue:active,
 #station-moon #jumpgate a#continue:link,
 #station-moon #jumpgate a#continue:visited,
 #station-moon #jumpgate a#continue:active,
 #fleet1 a#continue:hover,
 #fleet2 a#continue:hover,
 #station #jumpgate a#continue:hover,
 #station-moon #jumpgate a#continue:hover,
 #fleet2 a#back:link,
 #fleet2 a#back:visited,
 #fleet2 a#back:active,
 #fleet3 a#back:link,
 #fleet3 a#back:visited,
 #fleet3 a#back:active,
 #fleet2 a#back:hover,
 #fleet3 a#back:hover{
  border: 2px solid #000 !important;
  background-image: none !important;
  opacity: 0.4 !important;
 }
 /*#######################################################
                   	Flottenübersicht
#######################################################*/

 #eventListWrap {
  border: 2px solid #000 !important;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/1px.png)  !important;
 }

 #eventListWrap #eventHeader,
 #eventListWrap #eventContent,
 #eventListWrap #eventFooter {
  background-image: none !important;
 }

 #eventListWrap #eventHeader {
  border-bottom: 2px solid #000 !important;
 }

 #eventListWrap .eventFleet,
 #eventListWrap .partnerInfo {
  background-color: transparent !important;
  border: 1px solid #000 !important;
  margin: 5px 0 5px 20px !important;
 }

 #eventListWrap #eventFooter {
  display: none !important;
 }

 #eventListWrap #eventHeader .close_details{
  right: 30px !important;
  top: 9px !important;
 }
 IMG[src="img/navigation/close-details.jpg"] {
  opacity: 0.0;
 }

 #cluetip-close,
 .close_details{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/close_a.gif) !important;
  background-position: 0px 0px !important;
 }
 #cluetip-close:hover,
 .close_details:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/close_b.gif)  !important;
 }

 /*#######################################################
                       Flottenmenü
####################################################### */

 /*Part by Mic2003*/
 input.fleetValues{
  color: #000000 !important;
  opacity: 0.3;
 }

 #allornone, .allornonewrap, .secondcol.fleft{
  position: relative !important;
  top: -10px;
  background-color: transparent !important;
  border: 0px !important;
 }

 #allornone #sendall{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/all1.gif)  !important;
 }

 #allornone #sendall:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/all2.gif)  !important;
  background-position: 0px 0px !important;
 }

 #allornone .send_none a{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/nul1.gif)  !important;
 }

 #allornone .send_none a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/nul2.gif)  !important;
  background-position: 0px 0px !important;
 }

 #allornone #sendall,
 #allornone .send_none a{
  opacity: 0.4  !important;
  position: relative !important;
  top: 50px;
  left: 505px  !important;
 }

 /*Enterfernen der >> << Button*/
/* #resources .res a img{
  opacity: 0.0 !important;
 }
*/
 #resources .res input{
  background-color: #000000 !important;
  color: #FFFFFF !important;
  opacity: 0.7 !important;
 }

 #resources .res a{
  background-repeat: no-repeat;
 }
/*
 #resources .res .min{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/min1.gif)  !important;
  opacity: 0.4  !important;
 }

 #resources .res .min:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/min2.gif)  !important;
 }

 #resources .res .max{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/max1.gif)  !important;
  opacity: 0.4  !important;
 }

 #resources .res .max:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/max2.gif)  !important;
 }
*/
 #allresources{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/all1.gif)  !important;
  opacity: 0.4  !important;
 }

 #allresources:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/all2.gif)  !important;
  background-position: 0px 0px  !important;
 }

 #mission th, .fleetStatus span,
 .fleetStatus span span {
  color: #848484 !important;
 }

 .fleetDetails{
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000000 !important;
 }

 .fleetDetails .starStreak {
  background-image: none !important;
 }

 .fleetDetails .starStreak .route{
  margin-top: 2px !important;
 }

 /*spezielle Färbungseinstellungen*/
 /*"Auftrag"*/
 #inhalt > DIV:first-child + DIV + DIV + DIV > UL > LI:first-child > SPAN{
  color: #848484 !important;
 }

 /*"Ziel"*/
 #inhalt > DIV:first-child + DIV + DIV + DIV > UL > LI:first-child + LI > SPAN{
  color: #DDFF00 !important;
 }
 /*"Spielername"*/
 #inhalt > DIV:first-child + DIV + DIV + DIV > UL > LI:last-child > SPAN{
  color: #BDA844 !important;
 }

 /*"Abflugsort" / "Zielort" verkleinern*/
 #mission > TBODY > TR:first-child {
  font-size: 10px !important;
 }

 #buttonz > DIV > H3 {visibility: hidden !important;}
 #roundup .value,
 .topPadding .value {
  color: #848484 !important;
 }

 #maxspeed,
 #duration.value,
 #arrivalTime,
 #returnTime,
 #durationAKS,
 #fleetBriefingPart1 .undermark,
 #fleetBriefingPart1_2 .undermark {
  color: #CEFF68 !important;
 }

 #holdtimeline > SELECT,
 #expeditiontimeline > SELECT{
  color: #848484 !important;
  background-color: #000 !important;
 }

 #fleet3 a#start:link,
 #fleet3 a#start:visited,
 #fleet3 a#start:hover,
 #fleet3 a#start:active,
 #fleet3 a#start.off:link,
 #fleet3 a#start.off:visited, fleetsend.png
 #fleet3 a#start.off:hover,
 #fleet3 a#start.off:active{
  background-image: none !important;
  border: 2px solid #000 !important;
  opacity: 0.4  !important;
 }

 div .extra_background{
  display:none !important;
 }

 #fleet2 #buttonz{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/box_h300-fleet.gif) !important;
 }
 #fleet3 #sendfleet{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/box_fleet_send.gif) !important;
 }

 #fleet3 #sendfleet #resources .res{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/send-resource-bg.jpg) !important;
 }

 #fleet3 #sendfleet #resources #capbg{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/fleet-storage-capacity-bg.jpg) !important;
 }

 /*#######################################################
                PICSETS/RAHMEN
####################################################### */
 /*Part by FS.Ironman*/
#buttonz ul#building li.on div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/buildings-on.jpg) 

!important;}
#buttonz ul#building li div.buildingimg div.construction div.pusher{background-image:url

(http://forcetree.redio.de/DarknessV2.0/buildings-on.jpg) !important;}
#buttonz ul#building li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/buildings-off.jpg) 

!important;}
#buttonz ul#building li.disabled div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/buildings-

disabled.jpg) !important;}
#buttonz ul#stationbuilding li.on div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/station-

on.jpg) !important;}
#buttonz ul#stationbuilding li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/station-

off.jpg) !important;}
#station-moon #buttonz ul#stationbuilding li.disabled div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/spriteset-moon-station.jpg) !important;}
#station-moon #buttonz ul#stationbuilding li.on div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/spriteset-moon-station.jpg) !important;}
#station-moon #buttonz ul#stationbuilding li.off div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/spriteset-moon-station.jpg) !important;}
#station #buttonz ul#stationbuilding li.disabled div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/station-disabled.jpg) !important;}

/*Speicher*/
ul#storage li.on div.buildingimg,
ul#storage li div.pusher{background-image:url(http://forcetree.redio.de/DarknessV2.0/storage-on.jpg) !important;}
ul#storage li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/storage-off.jpg) !

important;}
ul#storage li.disabled div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/storage-disabled.jpg) 

!important;}
/**/
#buttonz ul#building li a.detail_button:link,
#buttonz ul#building li a.detail_button:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100.gif) !important;}
#buttonz ul#building li a.detail_button:hover,
#buttonz ul#building li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100_mo.gif) !

important;}
#buttonz ul#building li a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100.gif) !

important;}
/*Speicher*/
ul#storage li a:link,
ul#storage li a:visited{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !important;}
ul#storage li a:hover,
ul#storage li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !important;}
ul#storage li a:focus,
ul#storage li a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !important;}
ul#storage{background-image:url(http://forcetree.redio.de/DarknessV2.0/bg-storagebuttons.gif) !important;}
#buttonz ul#stationbuilding li a.detail_button:link,
#buttonz ul#stationbuilding li a.detail_button:link,
#buttonz ul#stationbuilding li a.detail_button:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !important;}
#buttonz ul#stationbuilding li a.detail_button:hover,
#buttonz ul#stationbuilding li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !

important;}
#buttonz ul#stationbuilding li a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !

important;}
img[src*="sofort_bauen2.gif"]{position:relative;top: 1px;left:1px;}
img[src*="sofort_bauen2.gif"]:hover{position:relative;top: 2px;left:2px;}
/*Händler*/
#trader #buttonz a.active,
#trader #buttonz a:hover{background-image:url(http://forcetree.redio.de/DarknessV2.0/rahmen-80x80.gif) !important;}
#trader ul.merchList li span{background-image: url(http://forcetree.redio.de/DarknessV2.0/spriteset.jpg) !important;}
/*Kasino*/
#premium ul#building li#button1 div.buildingimg,
#premium ul#building li#button2 div.buildingimg,
#premium ul#building li#button3 div.buildingimg,
#premium ul#building li#button4 div.buildingimg,
#premium ul#building li#button5 div.buildingimg,
#premium ul#building li#button6 div.buildingimg,
#premium div#detail1 div#pic,
#premium div#detail2 div#pic,
#premium div#detail3 div#pic,
#premium div#detail4 div#pic,
#premium div#detail5 div#pic,
#premium div#detail6 div#pic{background-image:url(http://forcetree.redio.de/DarknessV2.0/premium-sprites.jpg) !important;}
/*Forschung*/
#research li.on div.buildingimg,
#research li div.pusher{background-image:url(http://forcetree.redio.de/DarknessV2.0/research-on.jpg) !important;}
#research li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/research-off.jpg) !

important;}
#research li.disabled div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/research-disabled.jpg) 

!important;}
#research #buttonz li a:link,
#research #buttonz li a:visited{background-image:url(http://forcetree.redio.de/DarknessV2.0//ecke_neu_80.gif) !important;}
#research #buttonz li a:hover,
#research #buttonz li a:active,
#research #buttonz li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !

important;}
#research div.construction a:link,
#research div.construction a:visited{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !

important;}
#research div.construction a:hover,
#research div.construction a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b_mo.gif) !

important;}
#research div.construction a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !

important;}
#research div.research109 div#b_research106,
#research div.research109 div#b_research108,
#research div.research109 div#b_research109,
#research div.research109 div#b_research110,
#research div.research109 div#b_research111,
#research div.research109 div#b_research113,
#research div.research109 div#b_research114,
#research div.research109 div#b_research115,
#research div.research109 div#b_research117,
#research div.research109 div#b_research118,
#research div.research109 div#b_research120,
#research div.research109 div#b_research121,
#research div.research109 div#b_research122,
#research div.research109 div#b_research123,
#research div.research109 div#b_research124,
#research div.research109 div#b_research199{background-image:url(http://forcetree.redio.de/DarknessV2.0/research-on.jpg) 

!important;}
/*####################################################################*/
#buttonz ul#building li a.detail_button:link,
#buttonz ul#building li a.detail_button:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100.gif) !important;}
#buttonz ul#building li a.detail_button:hover,
#buttonz ul#building li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100_mo.gif) !

important;}
#buttonz ul#building li a:active{display:block;height:100px;width:100px;background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100.gif) !important;}
#buttonz ul#building li div.construction a:link,
#buttonz ul#building li div.construction a:visited,
#buttonz ul#building li div.construction a:active{display:block;height:100px;width:100px;background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100b.gif) !important;}
#buttonz ul#building li div.construction a:hover,
#buttonz ul#building li div.construction a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_100b_mo.gif) !important;}
/*Speicher*/
#buttonz ul#storage li div.construction a:link,
#buttonz ul#storage li div.construction a:visited,
#buttonz ul#storage li div.construction a:active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
#buttonz ul#storage li div.construction a:hover,
#buttonz ul#storage li div.construction a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b_mo.gif) !important;}
/*Anlagen*/
#station #buttonz ul#stationbuilding li div.construction a:link,
#station #buttonz ul#stationbuilding li div.construction a:visited,
/*Anlagen Mond*/
#station-moon #buttonz ul#stationbuilding li div.construction a:link,
#station-moon #buttonz ul#stationbuilding li div.construction a:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
#station #buttonz ul#stationbuilding li div.construction a:hover,
#station #buttonz ul#stationbuilding li div.construction a.active,
#station-moon #buttonz ul#stationbuilding li div.construction a:hover,
#station-moon #buttonz ul#stationbuilding li div.construction a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b_mo.gif) !important;}
#station #buttonz ul#stationbuilding li div.construction a:active,
#station-moon #buttonz ul#stationbuilding li div.construction a:active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
/*Schiffswerft*/
#shipyard #buttonz ul#military li.on div.buildingimg,
#shipyard #buttonz ul#civil li.on div.buildingimg,
#shipyard #buttonz ul li div.pusher{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships-on.jpg) !important;}
#shipyard #buttonz ul#military li.off div.buildingimg,
#shipyard #buttonz ul#civil li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships-

off.jpg)  !important;}
#shipyard #buttonz ul#military li.disabled div.buildingimg,
#shipyard #buttonz ul#civil li.disabled div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships

-disabled.jpg) !important;}
#shipyard #buttonz ul#military li a:link,
#shipyard #buttonz ul#military li a:visited,
#shipyard #buttonz ul#civil li a:link,
#shipyard #buttonz ul#civil li a:visited{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !

important;}
#shipyard #buttonz ul#military li a:hover,#shipyard #buttonz ul#military li a.active,
#shipyard #buttonz ul#civil li a:hover,#shipyard #buttonz ul#civil li a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !important;}
#shipyard #buttonz ul#military li a:active,
#shipyard #buttonz ul#civil li a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !

important;}
#shipyard #buttonz ul#military li div.construction a:link,
#shipyard #buttonz ul#military li div.construction a:visited,
#shipyard #buttonz ul#civil li div.construction a:link,
#shipyard #buttonz ul#civil li div.construction a:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
#shipyard #buttonz ul#military li div.construction a:hover,#shipyard #buttonz ul#military li div.construction a.active,
#shipyard #buttonz ul#civil li div.construction a:hover,
#shipyard #buttonz ul#civil li div.construction a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b_mo.gif) !important;}
#shipyard #buttonz ul#military li div.construction a:active,
#shipyard #buttonz ul#civil li div.construction a:active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
/*1. Flottenseite*/
#fleet1 #buttonz ul#military li a:link,
#fleet1 #buttonz ul#military li a:visited,
#fleet1 #buttonz ul#civil li a:link,
#fleet1 #buttonz ul#civil li a:visited{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !

important;}
#fleet1 #buttonz ul#military li.on div.buildingimg,
#fleet1 #buttonz ul#civil li.on div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships-on.jpg) 

!important;}
#fleet1 #buttonz ul#military li.off div.buildingimg,
#fleet1 #buttonz ul#civil li.off div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships-

off.jpg) !important;}
#fleet1 #buttonz ul#military li.disabled div.buildingimg,
#fleet1 #buttonz ul#civil li.disabled div.buildingimg{background-image:url(http://forcetree.redio.de/DarknessV2.0/ships-

disabled.jpg) !important;}
#fleet1 #buttonz ul#military li a:hover,
#fleet1 #buttonz ul#military li a:focus,
#fleet1 #buttonz ul#military li a.active,
#fleet1 #buttonz ul#civil li a:hover,
#fleet1 #buttonz ul#civil li a:focus,
#fleet1 #buttonz ul#civil li a.active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !

important;}
#fleet1 #buttonz ul#military li a:active,
#fleet1 #buttonz ul#civil li a:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !

important;}
#fleet1 #buttonz div ul#military li a.max:link,
#fleet1 #buttonz div ul#military li a.max:visited,
#fleet1 #buttonz div ul#military li a.max:hover,
#fleet1 #buttonz div ul#military li a.max:active,
#fleet1 #buttonz div ul#civil li a.max:link,
#fleet1 #buttonz div ul#civil li a.max:visited,
#fleet1 #buttonz div ul#civil li a.max:hover,
#fleet1 #buttonz div ul#civil li a.max:active{background-image:url(http://forcetree.redio.de/DarknessV2.0/icon-max-small-

hover.gif) !important;}
/*Verteidigung*/
#defense #buttonz ul#defensebuilding li.on div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/defense-on.jpg) !important;}
#defense #buttonz ul#defensebuilding li.off div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/defense-off.jpg) !important;}
#defense #buttonz ul#defensebuilding li.disabled div.buildingimg{background-image:url

(http://forcetree.redio.de/DarknessV2.0/defense-disabled.jpg) !important;}
#defense #buttonz ul#defensebuilding li div.pusher{background-image:url(http://forcetree.redio.de/DarknessV2.0/defense-

on.jpg) !important;}
#defense #buttonz ul#defensebuilding li a:link,
#defense #buttonz ul#defensebuilding li a:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !important;}
#defense #buttonz ul#defensebuilding li a:hover,
#defense #buttonz ul#defensebuilding li a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80_mo.gif) !important;}
#defense #buttonz ul#defensebuilding li a:active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80.gif) !important;}
#defense #buttonz ul#defensebuilding li div.construction a:link,
#defense #buttonz ul#defensebuilding li div.construction a:visited{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
#defense #buttonz ul#defensebuilding li div.construction a:hover,
#defense #buttonz ul#defensebuilding li div.construction a.active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b_mo.gif) !important;}
#defense #buttonz ul#defensebuilding li div.construction a:active{background-image:url

(http://forcetree.redio.de/DarknessV2.0/ecke_neu_80b.gif) !important;}
.eckeoben{position:relative;top:2px;}
div #pqueue{position:relative;top:-5px;}
div #pqueue .header{background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-header-435.gif) !important;}
div #pqueue .body{background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-body-435.gif) !important;}
div #pqueue .footer{background-image: url(http://forcetree.redio.de/DarknessV2.0/wrap-footer-435.gif) !important;}
.row{background-image: url(http://forcetree.redio.de/DarknessV2.0/row-bg2.png)!important;}
#boxBG{background:none !important;}
.pic{position:relative !important;top: 3px !important; left: 1px !important;}
.pic .abort{position:relative !important;top: 164px !important; left: 166px !important;}
div#content h2,div#content .level,.close_details{position:relative; top: 5px;}
div#content .level .undermark{position:relative !important; top: 95px !important;left: 5px;}
div#content .level .overmark{position:relative !important; top: 160px !important;left: -35px;}
#pic1,#pic2,#pic3,#pic4,#pic5,#pic6{position:relative !important;top: 3px !important; left: 1px !important;}


 /*#######################################################
                   	SONSTIGES
####################################################### */

 /*blaue Schrift ersetzen*/
 #resourceSettings td.label, /*Rohstoffseite*/
 #legendTT > DIV > TABLE > TBODY > TR:first-child > TH,  /*"Legende"*/
 #description > P, /*Premiumbeschreibung*/
 .desc { /*Beschreibungs Text in den 3 Kästen*/
  color: #848484 !important;
 }

 /*Verdunkelt alle kleinen i Symbole in der Technikseite*/
 IMG[width="16"][height="16"][src="img/icons/info.gif"] {
  opacity: 0.2 !important;
 }

 /*Ersetzen der Rohstoffbilder*/
 #resources IMG[src*="metall.gif"][alt="Metall"],
 #resources IMG[src*="kristal.gif"][alt="Kristall"],
 #resources IMG[src*="deuterium.gif"][alt="Deuterium"],
 #resources IMG[src*="energie.gif"][alt="Energie"] {
  height: 0px !important;
  width: 0px !important;
  padding-left: 42px !important;
  padding-top: 22px !important;
 }

 #resources IMG[src*="metall.gif"][alt="Metall"] {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/metall.gif) !important;
 }
 #resources IMG[src*="kristal.gif"][alt="Kristall"] {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/kristall.gif) !important;
 }

 #resources IMG[src*="deuterium.gif"][alt="Deuterium"]  {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/deuterium.gif) !important;
 }

 #resources IMG[src*="energie.gif"][alt="Energie"] {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/energie.gif) !important;
 }

 /*Upside-down Menüs*/
 #resources #buttonz,
/* #station #buttonz,*/
 #station-moon #buttonz {
  position: relative !important;
  top: -300px !important;
  left: 0px !important;
 }

 #research #buttonz,
 #shipyard #buttonz,
 #defense #buttonz {
  position: relative !important;
  top: -255px !important;
  left: 0px !important;
 }

 #resources #planet{
  position: relative !important;
  top: 196px !important;
  left: 0px !important;
 }
/*
 #station #planet{
  position: relative !important;
  top: 157px !important;
  left: 0px !important;
 }
*/
 #shipyard #planet,
 #defense #planet {
  position: relative !important;
  top: 215px !important;
  left: 0px !important;
 }

 #research #planet {
  position: relative !important;
  top: 235px !important;
  left: 0px !important;
 }

 #station-moon #planet {
  position: relative !important;
  top: 127px !important;
  left: 0px !important;
 }


 #premium #buttonz {
  position: relative !important;
  top: -253px !important;
  left: 0px !important;
 }

 #premium #planet {
  position: relative !important;
  top: 215px !important;
  left: 0px !important;
 }

 #defense #header_text,
 #resources #header_text,
 #station #header_text,
 #research #header_text,
 #shipyard #header_text,
 #station-moon #header_text,
 #premium #header_text {
  display: none !important;
 }

 /*Versorungseinst.*/
 #resources #slot01 {
  position: relative !important;
  top: -5px !important;
  left: 411px !important;
 }

 /*Allianzdepot*/
/* #station #slot01 {
  position: relative !important;
  top: -6px !important;
  left: 411px !important;
 }
*/
 /*Sprungtor*/
 #station-moon #slot01 {
  position: relative !important;
  top: -6px !important;
  left: 411px !important;
 }

 #fleet1 #planet,
 #fleet2 #planet,
 #fleet3 #planet,
 #movement #planet,
 #alliance #planet,
 #messages #planet,
 #preferences #planet {
  display: none !important;
 }

 #errorBoxNotify,
 #errorBoxDecision {
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 1px solid #fff !important;
  height: 142px !important;
 }

 #errorBoxNotifyHead,
 #errorBoxDecisionHead{
  border: 1px solid #000 !important;
 }

 #errorBoxNotifyHead,
 #errorBoxDecisionHead {
  text-transform: uppercase !important;
 }

 #errorBoxNotifyHead:before,
 #errorBoxDecisionHead:before {
  content: "- ";
 }

 #errorBoxNotifyHead:after,
 #errorBoxDecisionHead:after {
  content: " -";
 }

 #sftcontainer {
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 1px solid #fff !important;
 }

 #unionform .wrap,
 #searchFed .wrap{
  background: none !important;
 }
 SELECT[class="dropdown"][name="buddyselect"],
 SELECT[name="participantselect"][class="dropdown"] {
  color: #848484 !important;
  background-color: #000 !important;
 }

 /*Werftbilder durch Tooltip ersetzen*/
 .queue :after {
  content: attr(title);
 }
 #pqueue :after{
  content: attr(title);
 }
 #pqueue .tipsStandard {
  width: 350px !important;
  height: 25px !important;
 }
 #pqueue .slideIn {
  display: none !important;
 }

 /*#######################################################
                   	 ADDONS
####################################################### */

 /*InfoCompte*/
 #IFC_top,
 #IFC_mid {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000 !important;
 }

 #IFC_top {
  width: 657px !important;
 }

 #IFC_top > TBODY > TR > TH,
 .styled.textBeefy,
 .thefield {
  color: #848484 !important;
 }

 #IFC_top > TBODY > TR > TH {
  background: none !important;
 }

 #IFC_down{
  display: none !important;
 }

 /*Antigame*/
 /*FleetI*/
 .capacity_href{
  color: #848484 !important;
  font-style: normal !important;
 }

 .fleft.total_capacity {
  position: relative !important;
  top: -23px !important;
 }
 /*FleetII*/
 #buttonz .topPadding {
  position: relative !important;
  left: 10px !important;
 }
 /*MissingRes*/
 #deficient > TABLE:first-child > TBODY > TR:first-child > TH,
 #deficient > TABLE:first-child > TBODY > TR:first-child + TR > TD:first-child,
 #deficient .metal,
 #deficient > TABLE:first-child > TBODY > TR:first-child + TR + TR > TD:first-child,
 #deficient .crystal,
 #deficient > TABLE:first-child > TBODY > TR:last-child > TD:first-child,
 #deficient .deuterium,
 #deficient > TABLE:last-child > TBODY > TR:first-child + TR> TD:first-child,
 #deficient > TABLE:last-child > TBODY > TR:first-child + TR > TD:last-child,
 #deficient > TABLE:last-child > TBODY > TR:last-child > TD:first-child,
 #deficient > TABLE:last-child > TBODY > TR:last-child > TD:last-child {
  color: #848484 !important;
 }

 .antires {
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000 !important;
 }

 /*Galaxietool*/
 #galaxytool_status {
  display: none !important;
 }
/*
 #galaxytool_status {
  position: absolute !important;
  top: 0 !important;
  left: -5px !important;
 }
*/
 /*COGame*/
 /* #overview #inhalt > DIV:first-child,
 #overview #inhalt > DIV:first-child + DIV,
 #overview #inhalt > DIV:first-child + DIV + DIV{
 background:none !important;
 }

 #cogame_overview {
  border: 2px solid #000 !important;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/1px.png)  !important;
 }

 #allornone, .allornonewrap, .secondcol.fleft{
  top: 0px !important;
 }
*/

 /*TROC*/
 TABLE[cellspacing="10px"][cellpadding="5px"][style="border: 1px solid yellow; color: limegreen; text-align: right; font-

size: 8pt;"] {
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000 !important;
  color: #848484 !important;
 }

 /*#######################################################
                       STATISTIK
####################################################### */
 /*Part by Mic2003*/

 #statistics .contentbox div.header,
 #statistics .contentbox div.footer{
  display: none !important;
 }

 #statistics .contentbox div.content{
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
  border: 2px solid #000 !important;
 }

 #statistics .contentbox .buttons{
  border-bottom: 1px solid #404040 !important;
  position: relative;
  top: 5px;
 }

 #statistics #row div.rightCol{
  width:200px !important;
  margin: 6px 0px 0px 6px !important;
 }

 #statistics .contentbox .buttons a{
  background-color: transparent !important;
  width:54px !important;
  position: relative;
  top: -4px;
 }

 #statistics .contentbox .buttons a.active span.marker{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/stat_border_akt.gif) !important;
 }

 #statistics .contentbox .parameter{
  position: relative;
  left: 50px;
 }

 #statistics .contentbox .leftcol #claim{
  background-color: transparent !important;
  border: 1px #000000 solid !important;
  text-align: center !important;
 }

 #statistics table#ranks{
  background-color: transparent !important;
  width: 429px !important;
  margin: 0px 0px 0px 1px !important;
  border-bottom: 1px #000000 solid !important;
 }

 #statistics table#ranks th{
  border: 1px #000000 solid !important;
  border-top: 0px;
  background-color: transparent !important;
 }

 #statistics table#ranks td.sendmsg a img{
  opacity: 0.0;
 }

 #statistics table#ranks td.sendmsg a{
  display: block;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/msg1.gif) !important;
  background-position: center !important;
  background-repeat:no-repeat !important;
 }

 #statistics table#ranks td.sendmsg a:hover{
  display: block;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/msg2.gif) !important;
  background-position: center !important;
  background-repeat:no-repeat !important;
 }

 #statistics .rightcol{
  position: relative;
  top: 0px;
  left: 5px;
 }

 .claimsmall{
  border: 1px #000 solid !important;
  border-bottom: 0px !important;
  background-color: transparent !important;
 }

 #statistics .rightcol .top10{
  border: 1px #000 solid !important;
 }

 #statistics .rightcol .top10 td.rankcol,
 #statistics .rightcol .top10 td.namecol{
  background-color: transparent !important;
  border-left: 1px #000 solid !important;
 }

  /*Selectbox*/
 #statistics .contentbox div.content select{
  opacity: 0.5 !important;
  color: #ffffff !important;
  background-color: #1D1D1D !important;
 }

 /*Eigener Rang*/
 #statistics table#ranks .myrank td{
  background-color: #354B15 !important;
  border-bottom: 2px solid #CEFF68 !important;
  border-top: 2px solid #CEFF68 !important;
  font-weight: bold !important;
 }

 /*Eigene Allianz*/
 A[href*="index.php?page=network&session="] {
  color: #CEFF68 !important;
  font-weight: bold !important;
 }

 /*Allianztags färben*/
 #statistics span.ally-tag a:link,
 #statistics span.ally-tag a:visited,
 #statistics span.ally-tag a:hover,
 #statistics span.ally-tag a:active{
  color: #92662E !important;
 }

 #claim,
 /*<< >>*/
 #paging > A:first-child > SPAN,
 #paging > A:last-child > SPAN{
  color: #848484 !important;
 }

 #paging > A:first-child > SPAN:hover,
 #paging > A:last-child > SPAN:hover{
  color: #CEFF68 !important;
 }

 /*#######################################################
                   	GALAXY
####################################################### */
 /*Part by FS.Ironman*/

 #galaxyscroll,#solarscroll{
  position:relative !important; left: 150px !important;}

 #showbutton{
  position:relative !important; left: 150px !important; top:25px !important;}
 #expeditionbutton{
  position:relative !important; left: 56px !important; top:0px !important;}


 #galaxyheadbg{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/kopf1-bg.gif) !important;}

 #galaxyheadbg2,
 #galaxy #galaxytable tr.info,
 #galaxy #galaxytableHead tr.info,
 #fleetstatusrow{
  background-image : url(http://forcetree.redio.de/DarknessV2.0/kopf2-bg.gif) !important;}


 .TTInner h4,
 .TTInner table th{
   background-image : url(http://forcetree.redio.de/DarknessV2.0/ttheader.gif) !important;}

 .TTInner .body{
   background-image : url(http://forcetree.redio.de/DarknessV2.0/ttbody.gif) !important;}

 .TTInner .footer{
   background-image : url(http://forcetree.redio.de/DarknessV2.0/ttfooter.gif) !important;}

 /*Part by Mic2003*/
 /*Ausblenden der alten Symbole*/
/* td.action a img{
    opacity: 0.0 !important;
 }*/

 td.action a{
  background-repeat: no-repeat;
 }

 /*Einblenden der neuen Symbole*/
 /*Nachrichtensymbol*/
 td.action a[href*="writemessage"]{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/msg1.gif) !important;
 }

 td.action a[href*="writemessage"]:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/msg2.gif) !important;
 }

 /*Spionagesymbol*/
 td.action a[href="#"][onclick*="sendShips"]{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/spy1.gif) !important;
 }

 td.action a[href="#"][onclick*="sendShips"]:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/spy2.gif) !important;
 }

 /*Bodysymbol*/
 td.action a[href*="buddies"]{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/bdy1.gif) !important;
 }

 td.action a[href*="buddies"]:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/bdy2.gif) !important;
 }

 /*Info*/
 td.action a[href*="info"]{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/inf1.gif) !important;
 }

 td.action a[href*="info"]:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/inf2.gif) !important;
 }

 /*Ausblenden des alten Legendensymbols*/
 #legend a img{
  opacity: 0.0 !important;
 }

 /*Einblenden des neuen Symbols*/
 #legend a{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/inf1.gif) !important;
  height: 16px !important;
  display: block !important;
  background-position: bottom !important;
 }

 #legend a:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/inf2.gif) !important;
 }

 /*Besiedelte Planeten*/
 #colonized{
  color: #848484 !important;
 }

 /* #######################################################
                       OPTIONEN
#######################################################  */
 /*Part by Mic2003*/
 #preferences .tabwrapper {
  background-image : url(http://forcetree.redio.de/DarknessV2.0/DarknessV2.0/header_tab.gif) !important;
 }

 #preferences .tabwrapper .tabsbelow li a {
  background-image : none !important;
 }

 #preferences .tabwrapper .tabsbelow .ui-tabs-selected {
  background-image : url(http://forcetree.redio.de/DarknessV2.0/tab_top_1.gif) !important;
  background-position: center !important;
  position: relative;
  top: 1px;
 }

 #preferences .content {
  background-image : url(http://forcetree.redio.de/DarknessV2.0/wrap-body.gif) !important;
 }

 #preferences .fieldwrapper.bar {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/toggle_head_a.gif) !important;
  background-color: #111111 !important;
  border: 1px #000000 solid !important;
 }

 #preferences .fieldwrapper.bar label.styled {
  color: #c7c7c7 !important;
 }

 #preferences .fieldwrapper.bar-hover {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/toggle_head_b.gif) !important;
  background-color: #191919 !important;
 }

 #preferences .group .fieldwrapper,
 #preferences .group .fieldwrapper label {
  color: #c7c7c7 !important;
 }

 #preferences  form .footer {
  background-image : url(http://forcetree.redio.de/DarknessV2.0/wrap_footer.gif) !important;
 }


 /*#######################################################
                       SUCHE
####################################################### */
 /*Part by Mic2003*/

 #search #messagebox{
  background-color:#2f2f2f !important;
  border: 1px solid #000000 !important;
 }

 #search #messagebox .closeTB img{
  opacity: 0.0;
 }

 #search #messagebox .closeTB{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/close_a.gif) !important;
  background-position: 0 0 !important;
 }

 #search #messagebox .closeTB:hover{
  background-image: url(http://forcetree.redio.de/DarknessV2.0/close_b.gif) !important;
  background-position: 0 0 !important;
 }

 #search #vier, #search .contentz{
  background-image: none !important;
 }

 #search .contentz div#search{
  background-color:#2f2f2f !important;
 }

 #search .contentz div#search input.textInput{
  background-color: #111111 !important;
  border: 1px solid #000000 !important;
 }

 #search .contentz div#search input.textInput:hover,
 #search .contentz div#search input.textInput:focus{
  background-color: #1F1F1F !important;
 }

 #search .contentz .searchTabs{
  background-color: transparent !important;
  background-image: url(http://forcetree.redio.de/DarknessV2.0/search_tab_header.gif) !important;
 }

 #search .contentz .searchTabs .tab span{
  position: relative;
  top: -3px;
 }

 #search .contentz #ajaxContent{
  background-color: #262626 !important;
 }

 #search .contentz .searchresults th{
  background-color: #2f2f2f !important;
  padding: 2px !important;
  color: #cfcfcf !important;
  border: 1px #000000 solid !important;
 }

 #search .contentz .searchresults td{
  background-color: #262626 !important;
  padding: 2px !important;
  color: #cfcfcf !important;
  border: 1px #000000 solid !important;
 }

 #search .contentz .searchresults .alt td{
  background-color: #292929 !important;
  padding: 2px !important;
  color: #cfcfcf !important;
  border: 1px #000000 solid !important;
 }

 #search .contentz .searchresults .undermark{
  color: #6CA705 !important;
 }

 #search .contentz .searchresults .pagebar a{
  padding: 0px 4px 0px 4px !important;
 }

 #search .contentz .searchresults .pagebar a:hover{
  background-color: #292929 !important;
 }

 /* #######################################################
                       RESSCOURCEN Settings
#######################################################  */

 #factor .secondcol {
  background-color: transparent !important;
 }

 /* #######################################################
                       CLUETIP
#######################################################  */

 #cluetip-outer,
 #cluetip-title {
  color: #848484 !important;
  background: url(http://forcetree.redio.de/DarknessV2.0/1px.png) !important;
 }
/*
 .clue-right-default .cluetip-arrows,
 .clue-right-jtip .cluetip-arrows,
 .clue-right-event .cluetip-arrows {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/darrowleft.png) !important;
}

 .clue-left-default .cluetip-arrows,
 .clue-left-jtip .cluetip-arrows
 .clue-left-event .cluetip-arrows {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/darrowright.png) !important;
}

 .clue-top-default .cluetip-arrows,
 .clue-top-jtip .cluetip-arrows,
 .clue-top-event .cluetip-arrows {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/darrowdown.png) !important;
}

 .clue-bottom-default .cluetip-arrows,
 .clue-bottom-jtip .cluetip-arrows,
 .clue-bottom-event .cluetip-arrows  {
  background-image: url(http://forcetree.redio.de/DarknessV2.0/darrowup.png) !important;
}
*/
 .fleetinfo .value{
  color: #CEFF68 !important;
 }

 #cluetip-inner .fleetinfo th{
  color: #BDA844 !important;
 }

 /*#######################################################
                   	AUSBLENDUNGEN
####################################################### */

 /*großes Bild in den Details*/
 [id*="Xlarge"][class*="pic"],

 /*große Headergrafik*/
 #planet {
  background-image: none !important;
 }
 /*Patchlink ausblenden*/
 #changelog_link,

 /*Animierte Sterne*/
 #star,
 #star1,
 #star2,

 /*Bild im Forschungskasten*/
 #inhalt > DIV:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV > TABLE > TBODY > TR:first-child + TR > 

TD:first-child > A:first-child,

 /*Bild im Gebäudekasten*/
 #inhalt > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > TABLE > TBODY > TR:first-child + TR > TD:first-

child > A:first-child,

 /*erstes Bild in der Schiffswerft*/
 #inhalt > DIV:first-child + DIV + DIV + DIV + DIV + DIV > DIV:first-child + DIV > TABLE > TBODY > TR:first-child + TR > 

TD:first-child > A,

 /*Beschreibungstexte in der Detailansicht*/
 #description > P > SPAN,

 /*kleine Bilder auf der "Technik"-Seite und in der Schwiffswerftwarteliste*/
 IMG[width="28"][height="28"][src*="img/tiny/tiny"],

 /*kleine Bilder auf der Schiffswerftproduktionsliste*/
 IMG[width="40"][height="40"][src*="img/small"],

 /*Tutorialbutton*/
 #helper > A,

 /*Planetenanzeige*/
 /*#countColonies, */

 /*Loader Allianzseite*/
 #ajaxLoad,

 /*Loader Overview*/
 #cluetip-waitimage,

 /*Loader Galaxy*/
 #galaxyLoading,

 /*Loader Details*/
 #techDetailLoading,

 #eventboxLoading,

 /*Loader Statistics*/
 #statisticsLoading,

 /*http://*.ogame.de/game/img/ajax-loader.gif*/
 IMG[src*="img/ajax-loader.gif"],

 /*http://*.ogame.de/game/img/cluetip/wait.gif*/
 IMG[src*="img/cluetip/wait.gif"],

 /*http://*.ogame.de/game/img/galaxy/ajax_indicator.gif*/
 IMG[src*="img/galaxy/ajax_indicator.gif"] {
  visibility:hidden !important;
 }

}