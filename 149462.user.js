// ==UserScript==
// @version		1.17
// @author		TheBronx
// @date		2011-07-02
// @name		TravianKit
// @namespace	traviankit
// @description	Script para travian
// @include		http://*.travian.*/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require		http://sizzlemctwizzle.com/updater.php?id=118440
// ==/UserScript==

var version = '1.17';

/**
 * Almacenes, produccion y recursos actuales
 */
var aMadera; var pMadera; var madera;
var aBarro; var pBarro; var barro;
var aMetal; var pMetal; var metal;
var aGrano; var pGrano; var grano;

/**
 * Produccion diaria
 */
var maderaAlDia; var barroAlDia; var metalAlDia; var granoAlDia;

/**
 * Coordenadas de la aldea actual
 */
var coords;

/**
 * Lista de aldeas del usuario (array de strings tipo "x:y")
 */
var aldeas;
var linksAldeas;

/**
 * Tiempos de llenado de almacenes
 */
var tAlmMadera; var tAlmBarro; var tAlmMetal; var tGranero;

/**
 * Misc
 */
var dominio;
var paginaActual;
var divClear = '<div style="clear:both;height:4px;"></div>';
var hr = '<hr style="margin:8px 0;border-top-color:#111;border-bottom-color:#444;border-width:1px 0;border-style:solid;display:block;">';

/**
 * Opciones
 */
var links;
var travianWS = new Array();
//Argentina
travianWS["s1.travian.com.ar"]="ar1";travianWS["s2.travian.com.ar"]="ar2";travianWS["s3.travian.com.ar"]="ar3";travianWS["s4.travian.com.ar"]="ar4";travianWS["speed.travian.cl"]="arx";
//Australia
travianWS["ts1.travian.com.au"]="au1";travianWS["s2.travian.com.au"]="au2";travianWS["ts3.travian.com.au"]="au3";travianWS["s4.travian.com.au"]="au4";travianWS["ts5.travian.com.au"]="au5";travianWS["tx3.travian.com.au"]="aux";
//Bosnia
travianWS["ts1.travian.ba"]="ba1";travianWS["ts2.travian.ba"]="ba2";travianWS["ts3.travian.ba"]="ba3";travianWS["tc4.travian.ba"]="ba4";travianWS["tx3.travian.ba"]="bax";
//Brazil
travianWS["s1.travian.com.br"]="br1";travianWS["s2.travian.com.br"]="br2";travianWS["ts3.travian.com.br"]="br3";travianWS["ts4.travian.com.br"]="br4";travianWS["tc5.travian.com.br"]="br5";travianWS["ts6.travian.com.br"]="br6";travianWS["ts7.travian.com.br"]="br7";travianWS["tx3.travian.com.br"]="brx";
//Bulgaria
travianWS["ts1.travian.bg"]="bg1";travianWS["ts2.travian.bg"]="bg2";travianWS["s3.travian.bg"]="bg3";travianWS["tc4.travian.bg"]="bg4";travianWS["ts5.travian.bg"]="bg5";travianWS["ts6.travian.bg"]="bg6";travianWS["tcx3.travian.bg"]="bgx";
//Chile
travianWS["s1.travian.cl"]="cl1";travianWS["ts2.travian.cl"]="cl2";travianWS["tc3.travian.cl"]="cl3";travianWS["s4.travian.cl"]="cl4";travianWS["ts5.travian.cl"]="cl5";travianWS["s6.travian.cl"]="cl6";travianWS["s7.travian.cl"]="cl7";travianWS["ts8.travian.cl"]="cl8";travianWS["s9.travian.cl"]="cl9";travianWS["speed.travian.cl"]="clx";travianWS["x2.travian.cl"]="clx2";
//China
travianWS["s3.travian.cn"]="cn3";
//Croatia
travianWS["s1.travian.com.hr"]="hr1";travianWS["ts2.travian.com.hr"]="hr2";travianWS["ts3.travian.com.hr"]="hr3";travianWS["ts4.travian.com.hr"]="hr4";travianWS["tc5.travian.com.hr"]="hr5";travianWS["tx3.travian.com.hr"]="hrx";
//Czech
travianWS["ts1.travian.cz"]="cz1";travianWS["ts2.travian.cz"]="cz2";travianWS["ts3.travian.cz"]="cz3";travianWS["ts4.travian.cz"]="cz4";travianWS["s5.travian.cz"]="cz5";travianWS["ts6.travian.cz"]="cz6";travianWS["tc7.travian.cz"]="cz7";travianWS["ts8.travian.cz"]="cz8";travianWS["tx3.travian.cz"]="czx";
//Denmark
travianWS["ts1.travian.dk"]="dk1";travianWS["ts2.travian.dk"]="dk2";travianWS["s3.travian.dk"]="dk3";travianWS["tc4.travian.dk"]="dk4";travianWS["ts5.travian.dk"]="dk5";travianWS["tx3.travian.dk"]="dkx";
//Egypt
travianWS["s1.travian.com.eg"]="eg1";travianWS["s2.travian.com.eg"]="eg2";
//Estonia
travianWS["ts1.travian.co.ee"]="ee1";travianWS["tc2.travian.co.ee"]="ee2";travianWS["ts3.travian.co.ee"]="ee3";travianWS["ts4.travian.co.ee"]="ee4";travianWS["speed.travian.co.ee"]="eex";
//Finland
travianWS["ts1.travian.fi"]="fi1";travianWS["s2.travian.fi"]="fi2";travianWS["s3.travian.fi"]="fi3";travianWS["ts4.travian.fi"]="fi4";travianWS["ts5.travian.fi"]="fi5";travianWS["tc6.travian.fi"]="fi6";travianWS["s7.travian.fi"]="fi7";travianWS["tx3.travian.fi"]="fix";
//France
travianWS["ts1.travian.fr"]="fr1";travianWS["ts2.travian.fr"]="fr2";travianWS["s3.travian.fr"]="fr3";travianWS["s4.travian.fr"]="fr4";travianWS["s5.travian.fr"]="fr5";travianWS["ts6.travian.fr"]="fr6";travianWS["ts7.travian.fr"]="fr7";travianWS["s8.travian.fr"]="fr8";travianWS["ts9.travian.fr"]="fr9";travianWS["tc10.travian.fr"]="fr10";travianWS["ts11.travian.fr"]="fr11";travianWS["ts12.travian.fr"]="fr12";travianWS["tx3.travian.fr"]="frx";travianWS["tx2.travian.fr"]="frx2";
//Germany
travianWS["www.travian.at"]="at";travianWS["ts1.travian.de"]="de1";travianWS["ts2.travian.de"]="de2";travianWS["welt3.travian.de"]="de3";travianWS["ts4.travian.de"]="de4";travianWS["welt5.travian.de"]="de5";travianWS["ts6.travian.de"]="de6";travianWS["ts7.travian.de"]="de7";travianWS["ts8.travian.de"]="de8";travianWS["welt9.travian.de"]="de9";travianWS["ts10.travian.de"]="de10";travianWS["speed.travian.de"]="dex";travianWS["x2.travian.de"]="dex2";travianWS["www.travian.org"]="org";
//Greece
travianWS["tc1.travian.gr"]="gr1";travianWS["ts2.travian.gr"]="gr2";travianWS["s3.travian.gr"]="gr3";travianWS["ts4.travian.gr"]="gr4";travianWS["ts5.travian.gr"]="gr5";travianWS["tx3.travian.gr"]="grx";
//Hong Kong
travianWS["ts1.travian.hk"]="hk1";travianWS["s2.travian.hk"]="hk2";travianWS["ts3.travian.hk"]="hk3";travianWS["s4.travian.hk"]="hk4";travianWS["s5.travian.hk"]="hk5";travianWS["tcx3.travian.hk"]="hkx";
//Hungary
travianWS["ts1.travian.hu"]="hu1";travianWS["ts2.travian.hu"]="hu2";travianWS["s3.travian.hu"]="hu3";travianWS["ts4.travian.hu"]="hu4";travianWS["ts5.travian.hu"]="hu5";travianWS["ts6.travian.hu"]="hu6";travianWS["tc7.travian.hu"]="hu7";travianWS["tx3.travian.hu"]="hux";
//India
travianWS["s1.travian.in"]="in1";travianWS["tc2.travian.in"]="in2";travianWS["s3.travian.in"]="in3";travianWS["ts4.travian.in"]="in4";travianWS["s5.travian.in"]="in5";travianWS["ts6.travian.in"]="in6";travianWS["tx3.travian.in"]="inx";
//Indonesia
travianWS["ts1.travian.co.id"]="id1";travianWS["s2.travian.co.id"]="id2";travianWS["s3.travian.co.id"]="id3";travianWS["ts4.travian.co.id"]="id4";travianWS["ts5.travian.co.id"]="id5";travianWS["s6.travian.co.id"]="id6";travianWS["tc7.travian.co.id"]="id7";travianWS["ts8.travian.co.id"]="id8";travianWS["s9.travian.co.id"]="id9";travianWS["tx3.travian.co.id"]="idx";
//International
travianWS["ts1.travian.com"]="com1";travianWS["ts2.travian.com"]="com2";travianWS["s3.travian.com"]="com3";travianWS["ts4.travian.com"]="com4";travianWS["ts5.travian.com"]="com5";travianWS["tc6.travian.com"]="com6";travianWS["ts7.travian.com"]="com7";travianWS["s8.travian.com"]="com8";travianWS["ts9.travian.com"]="com9";travianWS["t1.travian.com"]="com01";travianWS["ts10.travian.com"]="com10";travianWS["tx3.travian.com"]="comx";
//Iran
travianWS["ts1.travian.ir"]="ir1";travianWS["tc2.travian.ir"]="ir2";travianWS["ts3.travian.ir"]="ir3";travianWS["ts4.travian.ir"]="ir4";travianWS["s5.travian.ir"]="ir5";travianWS["s6.travian.ir"]="ir6";travianWS["ts7.travian.ir"]="ir7";travianWS["ts8.travian.ir"]="ir8";travianWS["ts9.travian.ir"]="ir9";travianWS["tx3.travian.ir"]="irx";
//Israel
travianWS["ts1.travian.co.il"]="il1";travianWS["s2.travian.co.il"]="il2";travianWS["s3.travian.co.il"]="il3";travianWS["s4.travian.co.il"]="il4";travianWS["ts5.travian.co.il"]="il5";travianWS["tc6.travian.co.il"]="il6";travianWS["speed.travian.co.il"]="ilx";
//Italy
travianWS["ts1.travian.it"]="it1";travianWS["ts2.travian.it"]="it2";travianWS["ts3.travian.it"]="it3";travianWS["ts4.travian.it"]="it4";travianWS["tc5.travian.it"]="it5";travianWS["ts6.travian.it"]="it6";travianWS["s7.travian.it"]="it7";travianWS["s8.travian.it"]="it8";travianWS["ts9.travian.it"]="it9";travianWS["ts10.travian.it"]="it10";travianWS["tx3.travian.it"]="itx";
//Japan
travianWS["s1.travian.jp"]="jp1";travianWS["s2.travian.jp"]="jp2";travianWS["s3.travian.jp"]="jp3";travianWS["s4.travian.jp"]="jp4";travianWS["s5.travian.jp"]="jp5";travianWS["speed.travian.jp"]="jpx";
//Latvia
travianWS["s1.travian.lv"]="lv1";travianWS["s2.travian.lv"]="lv2";travianWS["s3.travian.lv"]="lv3";travianWS["ts4.travian.lv"]="lv4";travianWS["tcx3.travian.lv"]="lvx";
//Lithuania
travianWS["s1.travian.lt"]="lt1";travianWS["ts2.travian.lt"]="lt2";travianWS["tc3.travian.lt"]="lt3";travianWS["ts4.travian.lt"]="lt4";travianWS["ts5.travian.lt"]="lt5";travianWS["ts6.travian.lt"]="lt6";travianWS["s7.travian.lt"]="lt7";travianWS["speed.travian.lt"]="ltx";
//Malaysia
travianWS["s1.travian.com.my"]="my1";travianWS["s2.travian.com.my"]="my2";travianWS["s3.travian.com.my"]="my3";travianWS["s4.travian.com.my"]="my4";travianWS["s5.travian.com.my"]="my5";travianWS["ts6.travian.com.my"]="my6";travianWS["tcx3.travian.com.my"]="myx";
//Mexico
travianWS["s1.travian.cl"]="mx1";travianWS["s2.travian.cl"]="mx2";travianWS["s3.travian.com.mx"]="mx3";travianWS["s4.travian.cl"]="mx4";travianWS["s5.travian.cl"]="mx5";
//Morocco
travianWS["s1.travian.ma"]="ma1";travianWS["s2.travian.ma"]="ma2";travianWS["s3.travian.ma"]="ma3";
//Netherland
travianWS["s1.travian.nl"]="nl1";travianWS["ts2.travian.nl"]="nl2";travianWS["ts3.travian.nl"]="nl3";travianWS["tc4.travian.nl"]="nl4";travianWS["ts5.travian.nl"]="nl5";travianWS["ts6.travian.nl"]="nl6";travianWS["s7.travian.nl"]="nl7";travianWS["s8.travian.nl"]="nl8";travianWS["tx3.travian.nl"]="nlx";
//Norway
travianWS["ts1.travian.no"]="no1";travianWS["s2.travian.no"]="no2";travianWS["ts3.travian.no"]="no3";travianWS["ts4.travian.no"]="no4";travianWS["tcx3.travian.no"]="nox";
//Pakistan
travianWS["tc1.travian.pk"]="pk1";travianWS["s2.travian.pk"]="pk2";travianWS["ts3.travian.pk"]="pk3";travianWS["ts4.travian.pk"]="pk4";
//Philippines
travianWS["tc1.travian.ph"]="ph1";travianWS["s2.travian.ph"]="ph2";travianWS["s4.travian.ph"]="ph3";travianWS["tcx3.travian.ph"]="phx";
//Poland
travianWS["ts1.travian.pl"]="pl1";travianWS["ts2.travian.pl"]="pl2";travianWS["ts3.travian.pl"]="pl3";travianWS["ts4.travian.pl"]="pl4";travianWS["s5.travian.pl"]="pl5";travianWS["s6.travian.pl"]="pl6";travianWS["tc7.travian.pl"]="pl7";travianWS["ts8.travian.pl"]="pl8";travianWS["tcx3.travian.pl"]="plx";
//Portugal
travianWS["s1.travian.pt"]="pt1";travianWS["ts2.travian.pt"]="pt2";travianWS["ts3.travian.pt"]="pt3";travianWS["ts4.travian.pt"]="pt4";travianWS["s5.travian.pt"]="pt5";travianWS["ts6.travian.pt"]="pt6";travianWS["tc7.travian.pt"]="pt7";travianWS["ts8.travian.pt"]="pt8";travianWS["s9.travian.pt"]="pt9";travianWS["tx3.travian.pt"]="ptx";travianWS["x2.travian.pt"]="ptx2";
//Romania
travianWS["tc1.travian.ro"]="ro1";travianWS["ts2.travian.ro"]="ro2";travianWS["s3.travian.ro"]="ro3";travianWS["ts4.travian.ro"]="ro4";travianWS["ts5.travian.ro"]="ro5";travianWS["ts6.travian.ro"]="ro6";travianWS["s7.travian.ro"]="ro7";travianWS["tx3.travian.ro"]="rox";
//Russia
travianWS["ts1.travian.ru"]="ru1";travianWS["ts2.travian.ru"]="ru2";travianWS["ts3.travian.ru"]="ru3";travianWS["ts4.travian.ru"]="ru4";travianWS["s5.travian.ru"]="ru5";travianWS["ts6.travian.ru"]="ru6";travianWS["tc7.travian.ru"]="ru7";travianWS["ts8.travian.ru"]="ru8";travianWS["ts9.travian.ru"]="ru9";travianWS["ts10.travian.ru"]="ru10";travianWS["test.travian.ru"]="rutest";travianWS["tx3.travian.ru"]="rux";
//Saudi Arabia
travianWS["s1.travian.com.sa"]="sa1";travianWS["ts2.travian.com.sa"]="sa2";travianWS["ts3.travian.com.sa"]="sa3";travianWS["ts4.travian.com.sa"]="sa4";travianWS["s5.travian.com.sa"]="sa5";travianWS["s6.travian.com.sa"]="sa6";travianWS["s7.travian.com.sa"]="sa7";travianWS["ts8.travian.com.sa"]="sa8";travianWS["tc9.travian.com.sa"]="sa9";travianWS["ts10.travian.com.sa"]="sa10";travianWS["ts11.travian.com.sa"]="sa11";travianWS["tx3.travian.com.sa"]="sax";
//Serbia
travianWS["s1.travian.rs"]="rs1";travianWS["ts2.travian.rs"]="rs2";travianWS["ts3.travian.rs"]="rs3";travianWS["ts4.travian.rs"]="rs4";travianWS["tc5.travian.rs"]="rs5";travianWS["tcx3.travian.rs"]="rsx";
//Slovakia
travianWS["ts1.travian.sk"]="sk1";travianWS["s2.travian.sk"]="sk2";travianWS["ts3.travian.sk"]="sk3";travianWS["tc4.travian.sk"]="sk4";travianWS["ts5.travian.sk"]="sk5";travianWS["ts6.travian.sk"]="sk6";travianWS["s7.travian.sk"]="sk7";travianWS["s8.travian.sk"]="sk8";travianWS["speed.travian.sk"]="skx";
//Slovenia
travianWS["ts1.travian.si"]="si1";travianWS["ts2.travian.si"]="si2";travianWS["ts3.travian.si"]="si3";travianWS["s4.travian.si"]="si4";travianWS["tc5.travian.si"]="si5";travianWS["s6.travian.si"]="si6";travianWS["s7.travian.si"]="si7";travianWS["tcx3.travian.si"]="six";
//South Africa
travianWS["ts1.travian.co.za"]="za1";travianWS["s2.travian.co.za"]="za2";travianWS["ts3.travian.co.za"]="za3";travianWS["tc4.travian.co.za"]="za4";travianWS["ts5.travian.co.za"]="za5";
//South Korea
travianWS["s1.travian.co.kr"]="kr1";travianWS["s2.travian.co.kr"]="kr2";
//Spain
travianWS["ts1.travian.net"]="net1";travianWS["s2.travian.net"]="net2";travianWS["ts3.travian.net"]="net3";travianWS["tc4.travian.net"]="net4";travianWS["s5.travian.net"]="net5";travianWS["s6.travian.net"]="net6";travianWS["ts7.travian.net"]="net7";travianWS["ts8.travian.net"]="net8";travianWS["ts9.travian.net"]="net9";travianWS["ts10.travian.net"]="net10";travianWS["tx3.travian.net"]="netx";travianWS["x2.travian.net"]="netx2";
//Sweden
travianWS["s1.travian.se"]="se1";travianWS["ts2.travian.se"]="se2";travianWS["s3.travian.se"]="se3";travianWS["ts4.travian.se"]="se4";travianWS["ts5.travian.se"]="se5";travianWS["tc6.travian.se"]="se6";travianWS["s7.travian.se"]="se7";travianWS["tcx3.travian.se"]="sez";
//Syria
travianWS["sy1.travian.com"]="sy1";travianWS["sy2.travian.com"]="sy2";travianWS["sy3.travian.com"]="sy3";travianWS["syx.travian.com"]="syx";
//Taiwan
travianWS["s1.travian.tw"]="tw1";travianWS["s2.travian.tw"]="tw2";travianWS["s3.travian.tw"]="tw3";travianWS["s4.travian.tw"]="tw4";travianWS["s5.travian.tw"]="tw5";travianWS["s6.travian.tw"]="tw6";travianWS["speed.travian.tw"]="twx";
//Thailand
travianWS["ts1.travian.asia"]="th1";travianWS["ts2.travian.asia"]="th2";travianWS["ts3.travian.asia"]="th3";travianWS["s4.travian.asia"]="th4";travianWS["s5.travian.asia"]="th5";travianWS["ts6.travian.asia"]="th6";travianWS["tc7.travian.asia"]="th7";travianWS["tx3.travian.asia"]="thx";
//Turkey
travianWS["ts1.travian.com.tr"]="tr1";travianWS["s2.travian.com.tr"]="tr2";travianWS["ts3.travian.com.tr"]="tr3";travianWS["s4.travian.com.tr"]="tr4";travianWS["s5.travian.com.tr"]="tr5";travianWS["s6.travian.com.tr"]="tr6";travianWS["ts7.travian.com.tr"]="tr7";travianWS["ts8.travian.com.tr"]="tr8";travianWS["tc9.travian.com.tr"]="tr9";travianWS["ts10.travian.com.tr"]="tr10";travianWS["ts11.travian.com.tr"]="tr11";travianWS["tx3.travian.com.tr"]="trx";
//Ukraine
travianWS["s1.travian.com.ua"]="ua1";travianWS["ts2.travian.com.ua"]="ua2";travianWS["ts3.travian.com.ua"]="ua3";travianWS["s4.travian.com.ua"]="ua4";travianWS["ts5.travian.com.ua"]="ua5";travianWS["tc6.travian.com.ua"]="ua6";travianWS["ts7.travian.com.ua"]="ua7";travianWS["tcx3.travian.com.ua"]="uax";
//United Arab Emirates
travianWS["tc1.travian.ae"]="ae1";travianWS["ts2.travian.ae"]="ae2";travianWS["ts3.travian.ae"]="ae3";travianWS["s4.travian.ae"]="ae4";travianWS["ts5.travian.ae"]="ae5";travianWS["s6.travian.ae"]="ae6";travianWS["s7.travian.ae"]="ae7";travianWS["s8.travian.ae"]="ae8";travianWS["s9.travian.ae"]="ae9";travianWS["ts10.travian.ae"]="ae10";travianWS["tx3.travian.ae"]="aex";
//United Kingdom
travianWS["tc1.travian.co.uk"]="uk1";travianWS["s2.travian.co.uk"]="uk2";travianWS["s3.travian.co.uk"]="uk3";travianWS["ts4.travian.co.uk"]="uk4";travianWS["ts5.travian.co.uk"]="uk5";travianWS["s6.travian.co.uk"]="uk6";travianWS["ts7.travian.co.uk"]="uk7";travianWS["tx3.travian.co.uk"]="ukx";
//United States
travianWS["ts1.travian.us"]="us1";travianWS["ts2.travian.us"]="us2";travianWS["s3.travian.us"]="us3";travianWS["ts4.travian.us"]="us4";travianWS["tc5.travian.us"]="us5";travianWS["s6.travian.us"]="us6";travianWS["ts7.travian.us"]="us7";travianWS["s8.travian.us"]="us8";travianWS["tx3.travian.us"]="usx";
//Vietnam
travianWS["s1.travian.com.vn"]="vn1";travianWS["s2.travian.com.vn"]="vn2";travianWS["s3.travian.com.vn"]="vn3";


/**
 * Lenguaje en uso (dependiendo el idioma en opciones se usa uno u otro)
 */
//var LANG;
//var $2; //for ajax success events.

function main()
{
	paginaActual = getPaginaActual();
	if (paginaActual != "home")
	{
		initialize();
		calculateCostsAndTime();
		addLinks();
		
		if (paginaActual == "berichte") //reportes
		{
			addReportsInfo();
		}
		else if (paginaActual == "build") //residencia
		{
			calculateCulture();
			addVillagesToMarket();
		}
		else if (paginaActual == "spieler") //perfil jugador
		{
			addTravianWSLinks();
		}
		
		convertCoords();
		
		addShortCuts();
	}
}

//inicializa variables
function initialize()
{
	dominio = document.domain;
    addStyles();
	//cargamos las opciones
	loadOptions();
	//cargamos produccion
	pMadera = parseInt(unsafeWindow.resources.production['l1']); maderaAlDia = pMadera * 24;
	pBarro = parseInt(unsafeWindow.resources.production['l2']); barroAlDia = pBarro * 24;
	pMetal = parseInt(unsafeWindow.resources.production['l3']); metalAlDia = pMetal * 24;
	pGrano = parseInt(unsafeWindow.resources.production['l4']); granoAlDia = pGrano * 24;
	
	//cargamos capacidad total almacen y ocupacion actual
	//ejemplo: <span>125/1200</span>
	var split = $('ul#res li.r1 span').html().split('/');
	aMadera = aBarro = aMetal = split[1];
	madera = parseInt(split[0]);
	var barr = $('ul#res li.r2 span').html().split('/');
	barro = parseInt(barr[0]);
	var met = $('ul#res li.r3 span').html().split('/');
	metal = parseInt(met[0]);
	var gra = $('ul#res li.r4 span').html().split('/');
	grano = parseInt(gra[0]);
	
	aldeas = new Array();
	linksAldeas = new Array();
	$('#villageList .list ul li a').each(function () {
		aldeas.push( $(this).html() );
		linksAldeas.push( $(this).attr('href') );
	});
	
	addTravianKitInfo();
}

function addStyles()
{
	GM_addStyle('#tk-box { background-color:rgba(255,255,255,0.9);border-radius:5px;padding:5px;margin:4px auto;width:160px;box-shadow:0 0 2px #222; }'+
	'#tk-box h1 {font-size:12px;color:#333;text-align:left;}'+
	'#tk-box span.edit {float:right;cursor:pointer;}'+
	'#tk-box ul {margin:0;padding:0;}'+
	'#tk-box li {list-style:none;padding-left:5px;} #tk-box li a {color:#555;}'+
	'#tk-box input {font-size:9px;} #tk-box input.name {width:30px;}'+
	'#tk-info {font-size: 11px; position: absolute; top: 0pt; left: 0pt; padding: 3px;z-index:1;} #tk-info a {color:#eee}'+
	'#tk-tooltip-text {display:none;background-color:rgba(0,0,0,0.7);color:#ccc;border-radius:4px;position:absolute;padding:4px;z-index:99;font-size:11px;}');

}

function addTravianKitInfo()
{
	$('#wrapper').prepend('<div id="tk-info"><a href="http://userscripts.org/scripts/show/118440" class="tk-tooltip" title="Do you like TravianKit? write a review!" target="_blank">TravianKit v'+version+'</a></div>');
	$('body').append('<span id="tk-tooltip-text"></span>');
	$('.tk-tooltip').each(function(){		
		$(this).mouseenter(function(event){
			var span = $('#tk-tooltip-text');
			span.html($(this).attr('title')); $(this).attr('title', '');
			span.css({top: event.pageY+10, left: event.pageX+10});
			span.fadeIn(500);
		});
		$(this).mouseleave(function(event){
			var span = $('#tk-tooltip-text');
			span.fadeOut(100);
			$(this).attr('title', span.html());
		});
	});
}

//inserta la capa de links a la derecha
function loadOptions()
{
	links = new Array();
	var link = new Array();
	link[0] = GM_getValue(document.domain+"-link1_name", "TravianKit");
	link[1] = GM_getValue(document.domain+"-link1_href", "http://userscripts.org/scripts/show/118440");
	links.push(link);link = new Array(); //si no redeclaro, los valores no se sobreescriben...
	link[0] = GM_getValue(document.domain+"-link2_name", "TravianKit");
	link[1] = GM_getValue(document.domain+"-link2_href", "http://userscripts.org/scripts/show/118440");
	links.push(link);link = new Array();
	link[0] = GM_getValue(document.domain+"-link3_name", "TravianKit");
	link[1] = GM_getValue(document.domain+"-link3_href", "http://userscripts.org/scripts/show/118440");
	links.push(link);link = new Array();
	link[0] = GM_getValue(document.domain+"-link4_name", "TravianKit");
	link[1] = GM_getValue(document.domain+"-link4_href", "http://userscripts.org/scripts/show/118440");
	links.push(link);
}

//busca todas las capas ".showCosts" y agrega informacion
function calculateCostsAndTime()
{
	$('.showCosts').each( function() {
		var mad = parseInt($(this).find('span.resources.r1').html().replace(/<img .+>/i, ""));
		var barr = parseInt($(this).find('span.resources.r2').html().replace(/<img .+>/i, ""));
		var met = parseInt($(this).find('span.resources.r3').html().replace(/<img .+>/i, ""));
		var gra = parseInt($(this).find('span.resources.r4').html().replace(/<img .+>/i, ""));
		var hMadera, hBarro, hMetal, hGrano = 0;
		if (mad>madera)
		{
			$(this).find('span.resources.r1').css('color','red');
			hMadera = (mad-madera)/pMadera;
		}
		else
		{
			$(this).find('span.resources.r1').css('color','green') ;
		}
		if (barr>barro)
		{
			$(this).find('span.resources.r2').css('color','red');
			hBarro = (barr-barro)/pBarro;
		}
		else
		{
			$(this).find('span.resources.r2').css('color','green') ;
		}
		if (met>metal)
		{
			$(this).find('span.resources.r3').css('color','red');
			hMetal = (met-metal)/pMetal;
		}
		else
		{
			$(this).find('span.resources.r3').css('color','green') ;
		}
		if (gra>grano)
		{
			$(this).find('span.resources.r4').css('color','red');
			hGrano = (gra-grano)/pGrano;
		}
		else
		{
			$(this).find('span.resources.r4').css('color','green') ;
		}

		//pasamos el maximo a HH:MM:SS
		var tiempos = new Array(hMadera, hBarro, hMetal, hGrano);
		max = getMax(tiempos);
		if (max>-1) 
		{
			$(this).find('span.resources.r'+(max+1)).css('font-weight','bold');
			hms = hToDHMS(tiempos[max]);
			$(this).append('<span class="clocks wait"><img alt="duration" src="img/x.gif" class="clock">Wait: '+hms+'</span><br/>');
		}
	});
}

//inserta la capa de links a la derecha
function addLinks()
{
	var str = '<div id="tk-box"><h1>Links</h1><ul>';
	for(i=0;i<links.length;i++)
		str += '<li><a href="'+links[i][1]+'">'+links[i][0]+'</a></li>';
	
	str += '</ul></div>';
	$('#villageList').after(str);
	
	//edit links
	$('#tk-box h1').append('<span class="edit">Edit</span>');
	$('#tk-box span.edit').click(function() {
		if ( $(this).html() == "Edit")
		{
			$(this).html("Save");
			$('#tk-box ul li').each(function(index) {
				$(this).html('<input class="name" type="text" value="'+links[index][0]+'"><input class="href" type="text" value="'+links[index][1]+'">');
			});
		}
		else
		{
			$(this).html("Edit");
			$('#tk-box ul li').each(function(index) {
				links[index][0] = $(this).find('input.name').val();
				links[index][1] = $(this).find('input.href').val();
				$(this).html('<a href="'+links[index][1]+'">'+links[index][0]+'</a>');
				GM_setValue(document.domain+'-link'+(index+1)+'_name', links[index][0]);
				GM_setValue(document.domain+'-link'+(index+1)+'_href', links[index][1]);
			});
		}
	});
}

function calculateCulture()
{
	var residencia = $('#content a.build_logo img.g25');
	var palacio = $('#content a.build_logo img.g26');
	if ( (residencia.length > 0 ) || (palacio.length > 0) )
	{
		var url = window.location + "";
		if (url.search('&s=2') > 0 )
		{
			//estamos en el apartado de cultura
			var prodTotalCultura;
			$('#build_value td b').each(function (index) {
				if (index==1) prodTotalCultura = parseInt( $(this).html() );
				if (index==2) prodTotalCultura += parseInt( $(this).html() );
			});
			//var prodTotalCultura = parseInt( $('#build_value td b').filter(":last").html() );
			var size = $('#build p b').length;
			$('#build p b').each( function(index) {
				if (index==size-2) culturaActual = parseInt($(this).html());
				if (index==size-1) culturaNecesaria = parseInt($(this).html());
			});
			
			if (culturaNecesaria>culturaActual)
			{
				var horas = (culturaNecesaria-culturaActual) / (prodTotalCultura/24);
				$('#build p').after('<span class="clocks wait"><img alt="duration" src="img/x.gif" class="clock">  Wait: <b>'+hToDHMS(horas)+'</b></span><br/>');
			}
		}
	}
}

function addShortCuts()
{
	for (i=0;i<aldeas.length;i++)
	{
		$(document).bind('keydown', 'alt+'+(i+1), function (event){ 
			//el 1 tiene codigo 49, el 2 es 50, etc etc.
			var aldea = event.which-49;
			openVillage(aldea);
		});
	}
	
}

function openVillage(i)
{
	window.location.href = 'http://'+document.domain+'/'+paginaActual+'.php'+linksAldeas[i];
}

function addVillagesToMarket()
{
	var mercado = $('#content a.build_logo img.g17');
	if (mercado.length > 0 )
	{
		var url = window.location + "";
		if (url.search('&t') < 0 )
		{
			//estamos en el apartado de envio de recursos (first tab)			
			var select = '<select id="tk-villageSelect">';
			select += '<option selected="selected" value="-1">Choose...</option>';
			for (i=0;i<aldeas.length;i++)
				select += '<option value="'+i+'">'+aldeas[i]+'</option>';
			select += '</select>';
			
			$('form div.boxes-contents').prepend('<b>Own villages:</b> '+select);
			
			$('#tk-villageSelect').change(function() {
				var val = $("#tk-villageSelect option:selected").val();
				if (val>=0)
					$('form div.boxes-contents #enterVillageName').val( aldeas[val] );
				else
					$('form div.boxes-contents #enterVillageName').val("");
			});
		}
	}
}

function addReportsInfo ()
{
	roboTotal = -1;
	$('table#overview td.sub').each( function (index) {
		robo = $(this).find('a.reportInfoIcon img.carry').attr('alt'); // xxx/xxx
		if (robo != undefined)
		{
			if ( ($(this).find('img.iReport1').length>0) || ($(this).find('img.iReport2').length>0) || ($(this).find('img.iReport21').length>0 ) )
			{
				parts = robo.split('/');
				(roboTotal==-1) ? roboTotal = parseInt(parts[0]) : roboTotal += parseInt(parts[0]);
			}
		}
	});
	if (roboTotal!=-1)
	{
		//alert(roboTotal);
		$('table#overview').after('<div style="margin:10px 0;float:left;">Total stolen resources: <img class="carry" src="img/x.gif"> <b>'+roboTotal+'</b></div>');
	}
}

function addTravianWSLinks()
{
	var url = window.location + "";
	var userID;
	//http://tx3.travian.us/spieler.php?uid=12345
	if (url.indexOf('uid=') > -1 )
	{
		userID = parseInt( url.substring( url.indexOf('uid=')+4, url.length ) );
		
		var href = 'http://travian.ws/analyser.pl?s='+travianWS[document.domain]+'&uid='+userID;
		$('#details tr').filter(':last').after('<tr><td colspan="2"><a href="'+href+'" class="arrow" target="blank">See profile in Travian WS</a></td></tr>');
	}
}

function getMax(array)
{
	max = 0; ret = -1;
	for(i=0;i<array.length;i++)
	{
		if (array[i]>max)
		{
			max = array[i];
			ret = i;
		}
	}
	return ret;
}
//pasa a dd & HH:MM:SS la cantidad q nos pasan (q son numero de horas) ej: 1.06532
function hToDHMS(max)
{	
	if (max==0) return 0;
	else
	{
		segundos = max*60*60;
		minutos = Math.floor(segundos/60); segundos = Math.floor(segundos%60);
		horas = Math.floor(minutos/60); minutos = minutos%60;
		dias = Math.floor(horas/24); horas = horas%24;
		
		if (minutos<10) minutos = '0' + minutos;
		if (segundos<10) segundos = '0' + segundos;
		
		if (dias>0) return dias+'d & '+horas+':'+minutos+':'+segundos;
		else return ''+horas+':'+minutos+':'+segundos;
	}
}

function getPaginaActual()
{
	url = window.location + "";
	url = url.replace('http://','');
	var partes = url.split('/');
	if (partes.length<2)
	{
		paginaActual = "home";
	}
	else if (partes[1].length == 0)
	{
		paginaActual = "home";
	}
	else
	{
		paginaActual = partes[1].substring(0,partes[1].indexOf('.php'));
	}
	return paginaActual;
}

function convertCoords()
{
	var x,y;
	$('span.coordinates').each(function() {
		if ( $(this).parents('a').length < 1 )
		{
			x = parseInt( $(this).find('span.coordinateX').html().replace('(','') );
			y = parseInt( $(this).find('span.coordinateY').html().replace(')','') );
			
			$(this).html( '<a href="'+getMapLink(x,y)+'">'+$(this).html()+'</a>' );
		}
	});
}

//converts 2 coords into a map link to that coords
function getMapLink(x,y)
{
	link = 'http://' + dominio + '/position_details.php?x='+x+'&y='+y;
	return link;
}

if (document.domain!="travian.ws")
	window.addEventListener('load',main,true);

/*
* jQuery Hotkeys Plugin
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Based upon the plugin by Tzury Bar Yochay:
* http://github.com/tzuryby/hotkeys
*
* Original idea by:
* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){

	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
		8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
		20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
		37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
		96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
		104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
		112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
		120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},

		shiftNums: {
		"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
		"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
		".": ">", "/": "?", "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}

		var origHandler = handleObj.handler,
		keys = handleObj.data.toLowerCase().split(" ");

		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) || event.target.type === "text") ) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
			character = String.fromCharCode( event.which ).toLowerCase(),
			key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
			modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
			modif += "ctrl+";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
			modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
			modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;
			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );