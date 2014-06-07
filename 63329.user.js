// ==UserScript==
// @name           Emoticon Extender
// @namespace      http://userscripts.org/users/120212
// @description    Adds hundreds of extra emoticons for virtually any websites.
// @include        http://warez-bb.org/*
// @include        http://www.warez-bb.org/*
// ==/UserScript==

// **************************************************************
// The script is free for use and distribution in its original state from the creator.
// Should not be intergreated in any comercial activities such as reselling or any activity 
// that in any way creates an income from part, full or any work created from the original 
// script.
// Modification of the script is only alowed for personal use, this means that the 
// modification cannot  be distributed as a work of your own or the creator, any 
// modification is solely for personal use any atempt to distribute, pass on in any 
// other way this modified script to anyone will result in legal action.
// ***************************************************************

var EXlibC = new Array()
	EXlibC[1]="EXlibC1";
	EXlibC[2]="EXlibC2";
	EXlibC[3]="EXlibC3";
	EXlibC[4]="EXlibC4";
	EXlibC[5]="EXlibC5";
	EXlibC[6]="EXlibC6";
	EXlibC[7]="EXlibC7";
	EXlibC[8]="EXlibC8";
	EXlibC[9]="EXlibC9";
	EXlibC[10]="EXlibC10";
	EXlibC[11]="EXlibC11";
	EXlibC[12]="EXlibC12";
	EXlibC[13]="EXlibC13";
	EXlibC[14]="EXlibC14";
	EXlibC[15]="EXlibC15";
	EXlibC[16]="EXlibC16";
	EXlibC[17]="EXlibC17";
	EXlibC[18]="EXlibC18";
	EXlibC[19]="EXlibC19";
	EXlibC[20]="EXlibC20";
	
var EXcSumTemp = new Array();
var EXcSumN = new Array();
	EXcSumN[1]="EXcSum1";
	EXcSumN[2]="EXcSum2";
	EXcSumN[3]="EXcSum3";
	EXcSumN[4]="EXcSum4";
	EXcSumN[5]="EXcSum5";
	EXcSumN[6]="EXcSum6";
	EXcSumN[7]="EXcSum7";
	EXcSumN[8]="EXcSum8";
	EXcSumN[9]="EXcSum9";
	EXcSumN[10]="EXcSum10";
	EXcSumN[11]="EXcSum11";
	EXcSumN[12]="EXcSum12";
	EXcSumN[13]="EXcSum13";
	EXcSumN[14]="EXcSum14";
	EXcSumN[15]="EXcSum15";
	EXcSumN[16]="EXcSum16";
	EXcSumN[17]="EXcSum17";
	EXcSumN[18]="EXcSum18";
	EXcSumN[19]="EXcSum19";
	EXcSumN[20]="EXcSum20";
	
	
var EXcSum = new Array();

	for(i=1;i<21;i++)
	{
		EXcSum[i]=GM_getValue(EXcSumN[i],0);
	}



var tabContent = new Array()

// My collection
	tabContent[0]=GM_getValue("EXmyCollection", "");

// My favorites
	tabContent[1]=GM_getValue("EXmyFav", "");

// Emotion
	tabContent[2]="http://i48.tinypic.com/b4ga4g.gif;http://i49.tinypic.com/aaxcva.gif;http://i48.tinypic.com/fmkz9x.gif;http://i47.tinypic.com/rky9g3.gif;http://i50.tinypic.com/2euk7l1.gif;http://i47.tinypic.com/rky9g3.gif;http://i49.tinypic.com/2vi2dya.gif;http://i49.tinypic.com/2vi2dya.gif;http://i46.tinypic.com/2ls7hgp.gif;http://i47.tinypic.com/2duffv6.gif;http://i50.tinypic.com/2mgwg0o.gif;http://i45.tinypic.com/2rfyg6o.gif;http://image-bb.com/out.php/i2138_Allerlei30.gif;http://image-bb.com/out.php/i2122_Allerlei15.gif;http://image-bb.com/out.php/i2126_Allerlei19.gif;http://image-bb.com/out.php/i2127_Allerlei20.gif;http://i50.tinypic.com/b51oy1.gif";
	tabContent[2]+=GM_getValue(EXlibC[1],"");

// Holiday
	tabContent[3]="http://i45.tinypic.com/116qq0m.gif;http://i46.tinypic.com/4tsuhw.gif;http://i46.tinypic.com/i24ygw.gif;http://i50.tinypic.com/28so4l1.gif;http://i50.tinypic.com/2qsnk0o.gif;http://i46.tinypic.com/fc4qkx.gif;http://i46.tinypic.com/5lcdnq.gif;http://i48.tinypic.com/2dgjbit.gif;http://i45.tinypic.com/2eealjq.gif;http://i45.tinypic.com/2j0ihpd.gif;http://i46.tinypic.com/2gwhxs6.gif";
	tabContent[3]+=GM_getValue(EXlibC[2],"");

// Action
	tabContent[4]="http://i50.tinypic.com/2psol55.gif;http://i46.tinypic.com/jqolf6.gif;http://i45.tinypic.com/2ly08br.gif;http://i47.tinypic.com/148d8r6.gif;http://image-bb.com/out.php/i2119_Allerlei12.gif;http://image-bb.com/out.php/i2129_Allerlei22.gif;http://image-bb.com/out.php/i2130_Allerlei23.gif;http://i45.tinypic.com/2w5lxeo.gif;http://image-bb.com/out.php/i2131_Allerlei24.gif";
	tabContent[4]+=GM_getValue(EXlibC[3],"");

// Greetings
	tabContent[5]="http://i45.tinypic.com/344p0e8.gif;http://image-bb.com/out.php/i2128_Allerlei21.gif;http://image-bb.com/out.php/i2139_Allerlei31.gif";
	tabContent[5]+=GM_getValue(EXlibC[4],"");

// Dance
	tabContent[6]="http://i44.tinypic.com/15f3dd5.jpg;http://image-bb.com/out.php/i2121_Allerlei14.gif;http://image-bb.com/out.php/i2123_Allerlei16.gif;http://image-bb.com/out.php/i2124_Allerlei17.gif;http://image-bb.com/out.php/i2125_Allerlei18.gif";
	tabContent[6]+=GM_getValue(EXlibC[5],"");

// Weird
	tabContent[7]="http://i45.tinypic.com/s4an40.gif;http://i45.tinypic.com/334ow2f.gif;http://i48.tinypic.com/2v3kn0g.gif;http://i47.tinypic.com/v2yd05.gif;http://i46.tinypic.com/mkvxgz.gif;http://image-bb.com/out.php/i2120_Allerlei13.gif";
	tabContent[7]+=GM_getValue(EXlibC[6],"");

// Bannana
	tabContent[8]="http://i48.tinypic.com/ibduzc.gif;http://image-bb.com/out.php/i2153_Banaan13.gif;http://image-bb.com/out.php/i2154_Banaan14.gif;http://image-bb.com/out.php/i2155_Banaan15.gif;http://image-bb.com/out.php/i2157_Banaan17.gif;http://image-bb.com/out.php/i2158_Banaan18.gif;http://image-bb.com/out.php/i2159_Banaan19.gif;http://image-bb.com/out.php/i2160_Banaan20.gif;http://image-bb.com/out.php/i2161_Banaan21.gif;http://image-bb.com/out.php/i2162_Banaan22.gif;http://image-bb.com/out.php/i2148_Banaan8.gif;http://image-bb.com/out.php/i2147_Banaan7.gif;http://image-bb.com/out.php/i2146_Banaan6.gif;http://image-bb.com/out.php/i2145_Banaan5.gif;http://image-bb.com/out.php/i2144_Banaan4.gif;http://image-bb.com/out.php/i2142_Banaan2.gif;http://image-bb.com/out.php/i2141_Banaan1.gif";
	tabContent[8]+=GM_getValue(EXlibC[7],"");

// 3D
	tabContent[9]="http://i45.tinypic.com/ngrlgg.jpg;http://i48.tinypic.com/axump.gif;http://i50.tinypic.com/23w5zt3.gif;http://i49.tinypic.com/126fuqw.gif;http://i50.tinypic.com/2v2k21l.gif;http://i49.tinypic.com/miykjq.jpg;http://i49.tinypic.com/2ywafjq.gif;http://i46.tinypic.com/17d7pc.gif;http://i45.tinypic.com/112bdxw.gif;http://i46.tinypic.com/mb5stg.gif";
	tabContent[9]+=GM_getValue(EXlibC[8],"");

// Retro
	tabContent[10]="http://i47.tinypic.com/npnm2x.gif;http://www.facepunch.com/fp/emoot/cawg.gif;http://i45.tinypic.com/hvp6qt.gif;http://i49.tinypic.com/2ykc6tt.gif;http://i47.tinypic.com/11bqk9d.gif;http://i47.tinypic.com/nosy9y.gif;http://i47.tinypic.com/la693.gif;http://i45.tinypic.com/2z52hba.gif;http://i45.tinypic.com/15x06mb.gif;http://i50.tinypic.com/2rfzjit.gif;http://i48.tinypic.com/f2lnqp.gif;http://i45.tinypic.com/amfwk.gif;http://i50.tinypic.com/raqpg3.gif;http://i45.tinypic.com/2w658ib.gif;http://i45.tinypic.com/331ov29.gif;http://i46.tinypic.com/2s80cwo.gif;http://i47.tinypic.com/2uqdcuf.gif;http://i46.tinypic.com/6y05e0.gif;http://i48.tinypic.com/2rnh7c2.gif";
	tabContent[10]+=";http://i46.tinypic.com/10gxncm.gif;http://i49.tinypic.com/xc2gw4.gif;http://i45.tinypic.com/2hx93s2.gif;http://i47.tinypic.com/2n21y0y.gif;http://i45.tinypic.com/25fj60n.gif;http://i45.tinypic.com/2cqzfk2.gif;http://i46.tinypic.com/wwkraq.gif;http://i49.tinypic.com/2uzz578.gif;http://i46.tinypic.com/zjzarp.gif;http://i45.tinypic.com/28b4tc0.gif;http://i45.tinypic.com/qrby4z.gif;http://i45.tinypic.com/9863yt.gif;http://i49.tinypic.com/2mc7e3b.gif";
	tabContent[10]+=";http://i45.tinypic.com/vfgmza.gif;http://i50.tinypic.com/651yx5.gif;http://i49.tinypic.com/30041fp.gif";
	tabContent[10]+=GM_getValue(EXlibC[9],"");

// Video Games
	tabContent[11]="http://i48.tinypic.com/2vtwmxv.gif;http://i50.tinypic.com/2w7n6mv.gif;http://i49.tinypic.com/2r2u2bl.gif;http://i49.tinypic.com/14j2gbk.gif";
	tabContent[11]+=GM_getValue(EXlibC[10],"");

// Anime
	tabContent[12]="http://i46.tinypic.com/15gw54w.gif;http://i47.tinypic.com/2jc7q0p.gif";
	tabContent[12]+=GM_getValue(EXlibC[11],"");

// Violent
	tabContent[13]="http://image-bb.com/out.php/i2432_sterb082.gif;http://image-bb.com/out.php/i2431_sterb070.gif;http://image-bb.com/out.php/i2430_sterb053.gif;http://image-bb.com/out.php/i2429_sterb049.gif;http://image-bb.com/out.php/i2428_sterb047.gif;http://image-bb.com/out.php/i2427_sterb054.gif;http://image-bb.com/out.php/i2426_sterb050.gif;http://image-bb.com/out.php/i2425_sterb051.gif;http://image-bb.com/out.php/i2424_sterb030.gif;http://image-bb.com/out.php/i2423_sterb040.gif;http://image-bb.com/out.php/i2422_sterb039.gif;http://image-bb.com/out.php/i2421_sterb037.gif;http://image-bb.com/out.php/i2420_sterb029.gif;http://image-bb.com/out.php/i2419_sterb036.gif;http://image-bb.com/out.php/i2418_sterb034.gif;http://image-bb.com/out.php/i2417_sterb035.gif;http://image-bb.com/out.php/i2416_sterb028.gif;http://image-bb.com/out.php/i2415_sterb023.gif;http://image-bb.com/out.php/i2414_sterb025.gif;http://image-bb.com/out.php/i2413_sterb026.gif;http://image-bb.com/out.php/i2412_sterb022.gif;http://image-bb.com/out.php/i2411_sterb020.gif;http://image-bb.com/out.php/i2410_sterb016.gif;http://image-bb.com/out.php/i2409_sterb015.gif;http://image-bb.com/out.php/i2408_sterb008.gif;http://image-bb.com/out.php/i2407_sterb007.gif;http://image-bb.com/out.php/i2406_sterb006.gif;http://image-bb.com/out.php/i2405_sterb003.gif;http://image-bb.com/out.php/i2447_sterb142.gif;http://image-bb.com/out.php/i2446_sterb131.gif;http://image-bb.com/out.php/i2445_sterb120.gif;http://image-bb.com/out.php/i2444_sterb133.gif;http://image-bb.com/out.php/i2443_sterb123.gif;http://image-bb.com/out.php/i2442_sterb126.gif;http://image-bb.com/out.php/i2441_sterb089.gif;http://image-bb.com/out.php/i2440_sterb108.gif;http://image-bb.com/out.php/i2439_sterb104.gif;http://image-bb.com/out.php/i2438_sterb117.gif;http://image-bb.com/out.php/i2437_sterb103.gif;http://image-bb.com/out.php/i2436_sterb107.gif;http://image-bb.com/out.php/i2435_sterb090.gif;http://image-bb.com/out.php/i2434_sterb119.gif;http://image-bb.com/out.php/i2433_sterb079.gif";
	tabContent[13]+=GM_getValue(EXlibC[12],"");

// Creepy
	tabContent[14]="http://i49.tinypic.com/2uiauc6.gif;http://i48.tinypic.com/30c0ryh.gif;http://i49.tinypic.com/2uiauc6.gif;http://i46.tinypic.com/1418w0k.gif;http://i49.tinypic.com/4vmuiw.gif;http://i47.tinypic.com/rsv7ra.gif;http://i45.tinypic.com/33vdthf.gif;http://i50.tinypic.com/2d1llpg.gif;http://i49.tinypic.com/2pqmetd.gif;http://i50.tinypic.com/4r2uxe.gif;http://i45.tinypic.com/2v354xw.gif;http://i46.tinypic.com/qy7rtg.gif;http://i48.tinypic.com/34i5vyp.gif;http://i49.tinypic.com/fwkp61.gif;http://i46.tinypic.com/ak7cdd.gif;http://i47.tinypic.com/1sifs1.gif;http://i47.tinypic.com/i4hdaa.gif;http://i49.tinypic.com/e8kaxl.gif;http://i45.tinypic.com/28wlt2.gif;http://i50.tinypic.com/drbj92.gif;http://i45.tinypic.com/24axxtd.gif;http://i45.tinypic.com/2uzfr4k.gif";
	tabContent[14]+=GM_getValue(EXlibC[13],"");

// Words
	tabContent[15]="http://i50.tinypic.com/9u7xjm.gif;http://i49.tinypic.com/11cdu21.gif;http://i47.tinypic.com/2b5wts.gif;http://i46.tinypic.com/2empwy0.gif;http://i45.tinypic.com/2qcf30n.gif;http://i48.tinypic.com/fbjegw.gif;http://i45.tinypic.com/2uemcty.gif;http://i49.tinypic.com/2co52rt.gif;http://i48.tinypic.com/i3xezs.gif;http://i50.tinypic.com/s2b3o4.gif;http://i49.tinypic.com/290x3xv.gif;http://i49.tinypic.com/2lszk1c.gif;http://i46.tinypic.com/17phzm.jpg;http://i48.tinypic.com/2ztfv2r.gif;http://i46.tinypic.com/w0hnwp.gif;http://i45.tinypic.com/21nmg0n.gif;http://i47.tinypic.com/28cgegj.gif;http://i47.tinypic.com/mv6f88.gif;http://i50.tinypic.com/mt592r.gif;http://i46.tinypic.com/1zn4tpf.gif;http://i47.tinypic.com/244pfrp.gif;http://i48.tinypic.com/2aadg2h.gif;http://i45.tinypic.com/2lxwhsh.gif";
	tabContent[15]+=GM_getValue(EXlibC[14],"");

// Music
	tabContent[16]="http://i48.tinypic.com/9rr1w5.gif;http://i48.tinypic.com/ld6xg.gif;http://i45.tinypic.com/2ivcja0.gif;http://i50.tinypic.com/5jwn5x.gif;http://i47.tinypic.com/kesup3.gif";
	tabContent[16]+=GM_getValue(EXlibC[15],"");

// Transport
	tabContent[17]="http://i48.tinypic.com/149z7dv.gif;http://i49.tinypic.com/2ugnl7s.gif;http://i50.tinypic.com/ek22df.gif;http://i46.tinypic.com/2nbdreo.gif;http://i50.tinypic.com/144b990.gif;http://i47.tinypic.com/30iujqh.gif";
	tabContent[17]+=GM_getValue(EXlibC[16],"");

// Technology
	tabContent[18]="http://i48.tinypic.com/o73its.gif;http://i49.tinypic.com/142vleq.gif;http://i48.tinypic.com/2l8wznq.gif;http://i47.tinypic.com/zinhbq.gif;http://i50.tinypic.com/15oxit1.gif;http://i46.tinypic.com/dm7db5.gif;http://i45.tinypic.com/106deua.gif;http://i49.tinypic.com/2pqu7na.gif;http://i47.tinypic.com/5lpd21.gif;http://i45.tinypic.com/2ywad06.gif;http://i45.tinypic.com/r6wqz9.gif";
	tabContent[18]+=GM_getValue(EXlibC[17],"");

// Dress up
	tabContent[19]="http://i45.tinypic.com/skx43o.gif;http://i46.tinypic.com/2qtbuk5.gif;http://i45.tinypic.com/2li97qu.gif;http://i49.tinypic.com/fmhund.gif;http://i48.tinypic.com/x10gb5.gif;http://i49.tinypic.com/2dujb41.gif;http://i50.tinypic.com/2s7gfhy.gif;http://i46.tinypic.com/14dk85w.gif;http://i47.tinypic.com/2w6cj7o.gif;http://i49.tinypic.com/ff7by9.gif;http://i47.tinypic.com/2n65di1.gif;http://i48.tinypic.com/dr37e0.gif;http://i46.tinypic.com/6gle2g.gif;http://i50.tinypic.com/116kyvo.gif;http://i45.tinypic.com/293x0fa.gif;http://i46.tinypic.com/2nvqi4o.gif;http://i45.tinypic.com/v66xyx.gif;http://i48.tinypic.com/11aiqv4.gif;http://i48.tinypic.com/2ajtn9d.gif";
	tabContent[19]+=GM_getValue(EXlibC[18],"");

// Symbols
	tabContent[20]="http://i49.tinypic.com/f23m87.gif;http://i48.tinypic.com/448hx.gif;http://i45.tinypic.com/2s1vcrc.gif;http://i49.tinypic.com/2uiyjgj.gif;http://i49.tinypic.com/11kyxqp.gif;http://i49.tinypic.com/2rpegjs.gif;http://i45.tinypic.com/orii2u.gif;http://i45.tinypic.com/2ecg9sk.gif;http://i45.tinypic.com/ztj879.gif;http://i45.tinypic.com/ztj879.gif";
	tabContent[20]+=GM_getValue(EXlibC[19],"");

// Others
	tabContent[21]="http://i48.tinypic.com/34sfayt.gif";
	tabContent[21]+=GM_getValue(EXlibC[20],"");

var tabName = new Array()
	tabName[0]="<span style='color:red;'>My Collection</span></u>";
	tabName[1]="<span style='color:green;'>My Favorite</span></u>";
	tabName[2]="Emotion";
	tabName[3]="Holiday";
	tabName[4]="Action";
	tabName[5]="Greetings";
	tabName[6]="Dance";
	tabName[7]="Weird";
	tabName[8]="Bannana";
	tabName[9]="3D";
	tabName[10]="Retro";
	tabName[11]="Video Games";
	tabName[12]="Anime";
	tabName[13]="Violent";
	tabName[14]="Creepy";
	tabName[15]="Words";
	tabName[16]="Music";
	tabName[17]="Transport";
	tabName[18]="Technology";
	tabName[19]="Dress Up";
	tabName[20]="Symbols";
	tabName[21]="Others";


	var baseURL="http://user-emoticon.comli.com/get.php";
	var minUpdate=1;
	var curUpdate=1;
	var maxUpdate=20;
	var timeElapsed=0;
	var timeLeft=0;
	var EXLibrary=GM_getValue("EXLibrary", "0");
	var curVersion="1.8.0";
	var rSplit;
	var totalE=0;
	var maxItems=GM_getValue("EXmaxItems", 25);
	var fastUpdate=GM_getValue("EXfastUpdate",true);
	var coll=GM_getValue("EXcoll", 5);
	var height=GM_getValue("EXheight", 270);
	var curTab=0;
	var curPage=0;
	var EXvisible=false;
	var tempC='';
	var warning=" ";
	var posObjEX=document.getElementsByTagName("textarea")[0];
	var posObjEXB=posObjEX;
	var EXImgCode=GM_getValue("EXImgCode", 1);
	

//*************************************************************** 

if(EXLibrary==0)
{
	var warning = "<div>It is recommended that you update your emoticon library</div>";
}

for(h=0;h<=tabContent.length-1;h++)
{
	countItem=tabContent[h].split(";");
	totalE=totalE+countItem.length;
}

function renderTab()
{
	var tabSplit=tabContent[curTab].split(";");
	var firstItem=curPage*maxItems;
	var totalItem=tabSplit.length-1;
	firstItem=parseInt(firstItem);
	totalItem=parseInt(totalItem);
	maxItems=parseInt(maxItems);
	var lastItem=(firstItem+maxItems)-1;
	var m=0;
	tempC='';
	if(lastItem>totalItem)
	{
		lastItem=totalItem;
	}
	maxPage=totalItem/maxItems;
	document.getElementById('EXnextB').disabled='';
	document.getElementById('EXprevB').disabled='';
	if((curPage+1)>maxPage)
	{
		document.getElementById('EXnextB').disabled='disabled';
	}
	if(curPage<=0)
	{
		document.getElementById('EXprevB').disabled='disabled';
	}
	tempC="<div style='font-weight:bold;text-align:center;padding:2px;'>Viewing "+tabName[curTab]+" Emotes</div><table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	if(curTab==0)
	{
		tempC+="<input style='margin:4px;' type='button' id='EXaddNew' value=' Add New ' class='button' />";
		tempC+="<input style='margin:4px;' type='button' id='EXreset' value=' Clear All ' class='button' /><br/>";
	}
	else if(curTab==1)
	{
		tempC+="<input style='margin:4px;' type='button' id='EXfav' value=' Clear All ' class='button' /><br/>";
	}
	tempC+="<table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	for(i=firstItem;i<=lastItem;i++)
	{
		if(m==0)
		{
			tempC+="<tr>";
		}
		if(tabSplit[i]!="")
		{
			if(curTab==0)
			{
				tempC+="<td  style='v-align:bottom;-moz-border-radius: 5px;-webkit-border-radius: 5px;width:50px;border:1px #3C526B solid;'><a style='font-size:10px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href=\"javascript:;\"><img id='EXIMG"+i+"' src='"+tabSplit[i]+"' /img></a>";
				tempC+="<br/><br/><a href='javascript:;' style='font-size:10px' id='EX_"+tabSplit[i]+"'> Remove </a>";
				tempC+="</td>";
			}
			else if(curTab==1)
			{
				tempC+="<td style='v-align:bottom;-moz-border-radius: 5px;-webkit-border-radius: 5px;width:50px;border:1px #3C526B solid;'><a style='font-size:10px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href=\"javascript:;\"><img id='EXIMG"+i+"' src='"+tabSplit[i]+"' /img></a>";
				tempC+="<br/><br/><a href='javascript:;' style='font-size:10px' id='EXRF_"+tabSplit[i]+"'> Remove </a>";
				tempC+="</td>";
			}
			else
			{
			
				tempC+="<td style='vertical-align:bottom;-moz-border-radius: 5px;-webkit-border-radius: 5px;width:50px;border:1px #3C526B solid;'><a style='font-size:10px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href=\"javascript:;\"><img id='EXIMG"+i+"' src='"+tabSplit[i]+"' /img></a>";
				
				tempD=tabContent[1];
				urlExist=new RegExp(tabSplit[i],"gi");
				if(!urlExist.test(tempD))
				{
					tempC+="<br/><br/><a class='Exb' href='javascript:;' style='font-size:10px' id='EXAF_"+tabSplit[i]+"'> Add Favorite </a>";
				}
				else
				{
					tempC+="<br/><br/><a class='Exb' href='javascript:;' style='font-size:10px' id='EXRF_"+tabSplit[i]+"'> Remove Favorite </a>";
				}
				
				tempC+="</td>";				
			}
		}
		else
		{	
			tempC+="<div>There are no images in this category.</div>";
		}	
		m++;
		if(m>=coll||i>=lastItem)
		{
			tempC+="</tr>";
			m=0;
		}
	}
	tempC+="</table>";
	document.getElementById('EXcontent').innerHTML=tempC;
	
	if(document.getElementById('EXaddNew')!=null)
	{
		document.getElementById('EXaddNew').addEventListener('click',addNew,false);
	}
	
	if(document.getElementById('EXreset')!=null)
	{
		document.getElementById('EXreset').addEventListener('click',resetEmote,false);
	}
	
	if(document.getElementById('EXfav')!=null)
	{
		document.getElementById('EXfav').addEventListener('click',resetFavE,false);
	}

	for(i=firstItem;i<=lastItem;i++)
	{
		docId="EX_"+tabSplit[i];
		if(document.getElementById(docId)!=null)
		document.getElementById(docId).addEventListener("click",function(){remove(this.id);},true);
	}
	
	for(i=firstItem;i<=lastItem;i++)
	{
		docId="EXIMG"+i;
		if(docId)
		document.getElementById(docId).addEventListener("click",function(){pasteEmote(this.src);},true);
	}
	
	for(i=firstItem;i<=lastItem;i++)
	{
		docId="EXAF_"+tabSplit[i];
		if(document.getElementById(docId)!=null)
		document.getElementById(docId).addEventListener("click",function(){addFav(this.id);},true);
	}
	
	for(i=firstItem;i<=lastItem;i++)
	{
		docId="EXRF_"+tabSplit[i];
		if(document.getElementById(docId)!=null)
		document.getElementById(docId).addEventListener("click",function(){remFav(this.id);},true);
	}
}

function pasteEmote(c)
{
	if(EXImgCode==1)
	{
		posObjEXB.value += " [IMG]"+c+"[/IMG] ";
	}
	else if(EXImgCode==2)
	{
		posObjEXB.value += " <IMG src=\""+c+"\" /> ";
	}
	else
	{
		posObjEXB.value += " "+c+" ";
	}
}

function remove(url)
{
	url=url.replace(/\?/gi,"@@");
	tempC=GM_getValue("EXmyCollection","");
	tempC=tempC.replace(/\?/gi,"@@");
	url=url.substring(3,url.length);
	tempC=tempC.replace(new RegExp(";"+url,"gi"),"");
	tempC=tempC.replace(new RegExp(url,"gi"),"");
	tempC=tempC.replace(/@@/gi,"?");
	if(tempC.substring(0,1)==";")
	{
		tempC=tempC.substring(1,tempC.length);
	}
	GM_setValue("EXmyCollection",tempC);
	tabContent[0]=tempC;
	renderTab();
}

function remFav(url)
{
	url=url.replace(/\?/gi,"@@");
	tempC=GM_getValue("EXmyFav","");
	tempC=tempC.replace(/\?/gi,"@@");
	url=url.substring(5,url.length);
	tempC=tempC.replace(new RegExp(";"+url,"gi"),"");
	tempC=tempC.replace(new RegExp(url,"gi"),"");
	tempC=tempC.replace(/@@/gi,"?");
	if(tempC.substring(0,1)==";")
	{
		tempC=tempC.substring(1,tempC.length);
	}
	GM_setValue("EXmyFav",tempC);
	tabContent[1]=tempC;
	renderTab();
}

function addFav(url)
{
	url=url.replace(/\?/gi,"@@");
		newEmote=url.substring(5,url.length);
		tempC=tabContent[1];
		urlExist=new RegExp(newEmote,"gi");
		if(!urlExist.test(tempC))
		{
			newEmote=newEmote.replace(/@@/gi,"?");
			tempC=GM_getValue("EXmyFav","");
			if(tempC!="")
			{
				tempC=tempC+";"+newEmote;
			}
			else
			{
			tempC=newEmote;
			}
		GM_setValue("EXmyFav",tempC);
		tabContent[1]=GM_getValue("EXmyFav", "");
		renderTab();
		}
		else
		{
			alert("That emote already exists in your list");
		}	
	
	
	
	
	
	renderTab();
}

function addNew()
{
	var newEmote=prompt("Enter the direct URL to the image");
	if(newEmote!=null)
	{
		newEmote=newEmote.replace(/\?/gi,"@@");
		tempC=tabContent[0].replace(/\?/gi,"@@");
		urlExist=new RegExp(newEmote,"gi");
		if(!urlExist.test(tempC))
		{
			newEmote=newEmote.replace(/@@/gi,"?");
			tempC=GM_getValue("EXmyCollection","");
			if(tempC!="")
			{
				tempC=tempC+";"+newEmote;
			}
			else
			{
			tempC=newEmote;
			}
		GM_setValue("EXmyCollection",tempC);
		tabContent[0]=GM_getValue("EXmyCollection", "");
		renderTab();
		}
		else
		{
			alert("That emote already exists in your list");
		}
	}
	urlExist=null;
}

function resetFavE()
{
	confirmReset=confirm("All of your emotes from ' My Favorites ' will be cleared! are you sure that you wish to procceed?");
	if(confirmReset)
	{
		GM_setValue("EXmyFav","");
		tabContent[1]=GM_getValue("EXmyFav", "");
		renderTab();
	}
}

function resetEmote()
{
	confirmReset=confirm("All of your emotes from ' My Collection ' will be cleared! are you sure that you wish to procceed?");
	if(confirmReset)
	{
		GM_setValue("EXmyCollection","");
		tabContent[0]=GM_getValue("EXmyCollection", "");
		renderTab();
	}
}

function changeTab(id)
{
	curTab=id;
	renderTab();
}

function home()
{
	resetPage();
	var m=0;
	tempC="<div style='font-family:arial;font-size:10px;text-align:center;padding:2px;'>The library contains <b>"+totalE+"</b> Emotes </div>";
	
	tempC+="<center><table style='text-align:center;width:500px' cellspacing='5px' cellpadding='4px'><tr>";
	for(i=0;i<=1;i++)
	{
		emoteCount=tabContent[i].split(";");
		emoteCount2=emoteCount.length;
		if(emoteCount=="")
		{
			emoteCount2=0;
		}
		if(i==0)
		{
			tempC+="<td><div style='font-size:10px;padding:5px;width:250px;background-color:#FFD8D8;border:1px #E98080 solid;-moz-border-radius: 5px;-webkit-border-radius: 5px;' onmouseout=\"this.style.backgroundColor='#FFD8D8'\" onmouseover=\"this.style.backgroundColor='#FBE2E2'\"><a id='EXmnu"+i+"' style='display:block;width:100%;font-size:12px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href='javascript:;'>"+tabName[i]+" <div style='color:#3C3C3C;font-size:9px;'> "+emoteCount2+" Emotes</div></a></div></td>";
		}
		else if(i==1)
		{
			tempC+="<td><div style='font-size:10px;padding:5px;width:250px;background-color:#B2DBB2;border:1px #449D44 solid;-moz-border-radius: 5px;-webkit-border-radius: 5px;' onmouseout=\"this.style.backgroundColor='#B2DBB2'\" onmouseover=\"this.style.backgroundColor='#AAE5AA'\"><a id='EXmnu"+i+"' style='display:block;width:100%;font-size:12px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href='javascript:;'>"+tabName[i]+" <div style='color:#3C3C3C;font-size:9px;'> "+emoteCount2+" Emotes</div></a></div></td>";
		}
	}
	tempC+="</tr></table></center>";
	
	tempC+="<table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	
	for(i=2;i<=tabName.length-1;i++)
	{
		if(m==0)
		{
			tempC+="<tr>";
		}
		emoteCount=tabContent[i].split(";");
		emoteCount2=emoteCount.length;
		if(emoteCount=="")
		{
			emoteCount2=0;
		}
		if(i==0)
		{
			tempC+="<td style='font-size:10px;width:25%;background-color:#FFD8D8;border:1px #E98080 solid;-moz-border-radius: 5px;-webkit-border-radius: 5px;' onmouseout=\"this.style.backgroundColor='#FFD8D8'\" onmouseover=\"this.style.backgroundColor='#FBBDBD'\"><a id='EXmnu"+i+"' style='display:block;width:100%;font-size:12px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href='javascript:;'>"+tabName[i]+" <div style='color:#3C3C3C;font-size:9px;'> "+emoteCount2+" Emotes</div></a></td>";
		}
		else if(i==1)
		{
			tempC+="<td style='font-size:10px;width:25%;background-color:#B2DBB2;border:1px #449D44 solid;-moz-border-radius: 5px;-webkit-border-radius: 5px;' onmouseout=\"this.style.backgroundColor='#B2DBB2'\" onmouseover=\"this.style.backgroundColor='#92D792'\"><a id='EXmnu"+i+"' style='display:block;width:100%;font-size:12px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href='javascript:;'>"+tabName[i]+" <div style='color:#3C3C3C;font-size:9px;'> "+emoteCount2+" Emotes</div></a></td>";
		}
		else
		{
			tempC+="<td style='font-size:10px;width:25%;background-color:#CAD9EA;border:1px #469DD3 solid;-moz-border-radius: 5px;-webkit-border-radius: 5px;' onmouseout=\"this.style.backgroundColor='#CAD9EA'\" onmouseover=\"this.style.backgroundColor='#B4CFDF'\"><a id='EXmnu"+i+"' style='display:block;width:100%;font-size:12px;color:black;text-decoration:none;font-family:arial;font-weight:bold;' href='javascript:;'>"+tabName[i]+" <div style='color:#3C3C3C;font-size:9px;'> "+emoteCount2+" Emotes</div></a></td>";
		}
		m++;
		if(m==4|| i>=tabName.length-1)
		{
			tempC+="</tr>";
			m=0;
		}
	}
	tempC+="</table>";
	document.getElementById('EXcontent').innerHTML=tempC;
	var mnuName='';
	for(p=0;p<=tabName.length-1;p++)
	{
		mnuName="EXmnu"+p;
		mnuName=document.getElementById(mnuName);
		mnuName.addEventListener("click",function(){changeTab(this.id.match(/\d+/)[0]);}, true);
	}
}

function settings()
{

	tempC="<center><div style='font-weight:bold;text-align:center;padding:5px;font-size:14px;'>Settings</div><table style='text-align:center;width:300px;' cellspacing='2px' cellpadding='2px'>";
	tempC+="<tr><td style='text-align:left'>Emotes per page</td><td><input style='width:80px;text-align:center' type='text' id='EXmaxItems'/></td></tr><tr><td style='text-align:left'>Columns per page</td><td><input style='width:80px;text-align:center' type='text' id='EXcolumns'/></td></tr><tr><td style='text-align:left'>Height</td><td><input style='width:80px;text-align:center' type='text' id='EXheight' /></td></tr><tr><td style='text-align:left'>Image Code</td><td><select id='EXImgCode'><option value='1'>BBCode</option><option value='2'>HTML</option><option value='3'>Plain</option></select></td></tr><tr><td style='text-align:left'>Selective Update</td><td><input name='true' type='checkbox' id='EXfastupdate'/></td></tr></table>";
	tempC+="<br/><div id='EXSettingsOption'></div></center>";

	document.getElementById('EXcontent').innerHTML=tempC;

	var wbbEX=document.createElement("input");
	wbbEX.id="EXsaveB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-left:15px");
	wbbEX.value=" Save Changes ";
	document.getElementById('EXSettingsOption').appendChild(wbbEX);

	var wbbEX=document.createElement("input");
	wbbEX.id="EXeraseB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-left:15px");
	wbbEX.value=" Erase All Downloaded Emotes ";
	document.getElementById('EXSettingsOption').appendChild(wbbEX);

	document.getElementById('EXcolumns').value=coll;
	document.getElementById('EXmaxItems').value=maxItems;
	document.getElementById('EXheight').value=height;
	document.getElementById('EXfastupdate').checked=fastUpdate;
	document.getElementById('EXImgCode').value=EXImgCode;
	document.getElementById('EXsaveB').addEventListener("click",save, true);
	document.getElementById('EXeraseB').addEventListener("click",eraseLib,true);
}

function updateLib()
{

	document.getElementById('EXupdateB').disabled='disabled';

	tempC="<center><br/><br/><table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	tempC+="<table style='text-align:center;'><tr><td><img src='http://i50.tinypic.com/10746mx.jpg'/><br/><br/></td></tr>";
	tempC+="<tr><td>Checking script version</td></tr></table>";
	document.getElementById('EXcontent').innerHTML=tempC;
	curUpdate=1;

	updateURL=baseURL+"?cid=check";

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: updateURL,
		headers: 
		{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
		onload: function(responseDetails)
		{
			if(responseDetails.status==200)
			{
				if(responseDetails.responseText!="")
				{
					rSplit=responseDetails.responseText.split(";");
					if(rSplit[0]==curVersion)
					{
						if(rSplit[1]==EXLibrary)
						{
							confirmUpdate=confirm("Your emote library seems to be the same as the version from the server\n Do you really want to update?");
						}
						else
						{
							confirmUpdate=true;
						}
						if(confirmUpdate)
						{
							requestChk();
						}
						else
						{
							error("Update Cancelled");
						}
					}
					else
					{
						err="Your Emoticon Extender does not match the latest one.<br/><center><table><tr><td>Latest Version</td><td><b>"+rSplit[0];
						err+="</b></td></tr><td>Your Version</td><td><b>"+curVersion+"</b></td></tr></table></center>";
						error(err);
					}
				}
				else
				{
					error("Could not connect to server");	
				}
			}
			else
			{
				error("Could not connect to server");		
			}
		}
	});
}

function requestChk()
{
updateURL=baseURL+"?cid=getsum";
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: updateURL,
		headers: 
		{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
		onload: function(responseDetails)
		{
			if(responseDetails.status==200)
			{
				rSplit2=responseDetails.responseText.split(",");
				if(rSplit2.length==20)
				{
					for(i=1;i<=rSplit2.length;i++)
					{
						EXcSumTemp[i]=rSplit2[i-1];
					}
					window.setTimeout(estimateTime,1500);
					window.setTimeout(function(){getValue();},1000);	
				}
				else
				{
					error("Error in transfer.");
					
				}
			}
		}
	});
}


function error(error)
{
	tempC="<center><br/><br/><table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	tempC+="<table style='text-align:center;'><tr><td><img src='http://i50.tinypic.com/idas9i.png'/><br/><br/></td></tr>";
	tempC+="<tr><td>"+error+"</td></tr></table>";
	document.getElementById('EXcontent').innerHTML=tempC;
	document.getElementById('EXupdateB').disabled='';
	document.getElementById('EXstatus').innerHTML='';
}

function getValue()
{
	updateURL=baseURL+"?cid="+curUpdate;
	var o = true;
	var EXaction = "Downloading";
	if(fastUpdate)
	{
		
		if(EXcSumTemp[curUpdate]!=EXcSum[curUpdate])
		{
		
			var o = true;
		}
		else
		{
			var o = false;
			EXaction = "Excluding";
		}
	}
	
	
	tempC="<center><br/><br/><table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
	tempC+="<table style='text-align:center;'><tr><td><img src='http://i50.tinypic.com/10746mx.jpg'/><br/><br/></td></tr>";
	tempC+="<tr><td>"+EXaction+" pack "+curUpdate+" | "+maxUpdate+" <br/><br/></td></tr></table>";
	
if (o) 
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: updateURL,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
		onload: function(responseDetails)
		{
			if(responseDetails.status==200)
			{
				if(responseDetails.responseText!='')
				{
					checkData=responseDetails.responseText.substring(0,1);
					if(checkData==1)
					{
						checkData=responseDetails.responseText.substring(1,responseDetails.responseText.length);
						if(checkData==null)
						{
							checkData="";
						}						
						GM_setValue(EXcSumN[curUpdate],EXcSumTemp[curUpdate]);
						GM_setValue(EXlibC[curUpdate],checkData);
						nextValue();
					}
					else
					{
						error("Error in transfer");
					}
				}
				else
				{
					error("Error in transfer");
				}
			}
			else
			{
				error("Connection lost");		
			}
		}
	});
}
else
{
	window.setTimeout(nextValue,100);
}
document.getElementById('EXcontent').innerHTML=tempC;
}

function roundNumber(num, dec)
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function estimateTime()
{
	if(curUpdate<maxUpdate)
	{
		timeElapsed+=1;
		averageTime=timeElapsed/curUpdate;
		timeLeft=averageTime*(maxUpdate-curUpdate);
		if(timeLeft<0)
		{
			timeLeft=0;
		}
		timeLeft=roundNumber(timeLeft,0)
		document.getElementById('EXstatus').innerHTML="Estimated time left ( " + timeLeft + " ) Seconds" + " | Elapsed Time ( " + timeElapsed + " ) Seconds";
		window.setTimeout(estimateTime,1000);
	}
}

function eraseLib()
{
	checkConfirm=confirm("This will clear all downloaded emotes permanently. \n Are you sure that you wish to procceed? \n \n You will have to refresh the page to see the changes.");
	if(checkConfirm)
	{
		for(i=minUpdate;i<=maxUpdate;i++)
		{
			GM_setValue(EXlibC[i],"");
		}
		for(i=minUpdate;i<=maxUpdate;i++)
		{
			GM_setValue("EXcSum"+i,0);
		}
		var EXLibrary=GM_getValue("EXLibrary", "0");
		GM_setValue("EXLibrary", "0");
	}
}

function nextValue()
{
	curUpdate = curUpdate + 1;
	if(curUpdate>maxUpdate)
	{
		tempC="<center><br/><br/><table style='text-align:center;width:100%' cellspacing='5px' cellpadding='4px'>";
		tempC+="<table style='text-align:center;'><tr><td><img src='http://i50.tinypic.com/xleddz.png'/><br/><br/></td></tr>";
		tempC+="<tr><td>Refresh the page.</td></tr></table>";
		GM_setValue("EXLibrary",rSplit[1]);
		EXLibrary=rSplit[1];
		document.getElementById('EXcontent').innerHTML=tempC;
		document.getElementById('EXstatus').innerHTML="";
	}
	else
	{
		getValue();
	}
}

function save()
{
	coll=document.getElementById('EXcolumns').value;
	maxItems=document.getElementById('EXmaxItems').value;
	height=document.getElementById('EXheight').value;
	fastUpdate=document.getElementById('EXfastupdate').checked;
	GM_setValue("EXfastUpdate",document.getElementById('EXfastupdate').checked);
	EXImgCode=document.getElementById('EXImgCode').value;
	

	if(height<100)
	{
		height=100;
		alert("The minimum height allowed is 100");
	}
	
	document.getElementById('EXcontent').style.height=height+"px";
	GM_setValue("EXcoll",coll);
	GM_setValue("EXmaxItems",maxItems);
	GM_setValue("EXheight",height);
	GM_setValue("EXImgCode",EXImgCode);
	alert("Settings Saved");
}

function nextPage()
{
	curPage+=1;
	renderTab();
}

function prevPage()
{
	curPage-=1;
	renderTab();
}

function resetPage()
{
	curPage=0;
	document.getElementById('EXnextB').disabled='disabled';
	document.getElementById('EXprevB').disabled='disabled';
}

function swView()
{
	if(EXvisible)
	{
		document.getElementById("EXmainContainer").style.display='none';
		EXvisible=false;
	}
	else
	{
		document.getElementById("EXmainContainer").style.display='block';
		EXvisible=true;
	}
	home();
}

if(posObjEX!=null)
{
	var wbbEX=document.createElement("div");
	wbbEX.id="WbbEX";
	wbbEX.setAttribute("style","cursor: pointer;opacity:0.8;background-image:url('http://i66.servimg.com/u/f66/12/56/08/34/cellpi10.gif');border:1px #0E334A solid;padding:5px;font-size:11px;background-color:#8EAED2;font-weight:bold;text-align:center;");
	wbbEX.innerHTML="<a id=\"WbbEXlink\" style=\"color:black;text-decoration:none;color:#000;\">Emoticon Extender<div style='font-size:8px;text-align:center;'>1 . 8 . 0</div></a>";
	document.body.appendChild(wbbEX);
	posObjEX.parentNode.insertBefore(wbbEX,posObjEX);
	wbbEX.addEventListener("click",swView,false);
	wbbEX.addEventListener("mouseout",function(){this.style.opacity="0.8";},false);
	wbbEX.addEventListener("mouseover",function(){this.style.opacity="1";},false);
	
	var wbbEX=document.createElement("div");
	wbbEX.id="EXmainContainer";
	wbbEX.setAttribute("style","display:none;");
	document.body.appendChild(wbbEX);
	posObjEX=document.getElementById("WbbEX");
	posObjEX.parentNode.insertBefore(wbbEX,posObjEX.nextSibling);

	var wbbEX=document.createElement("div");
	wbbEX.id="EXcontent";
	divCss="height:"+height+"px;overflow:auto;overflow-x:hidden;background-color:#FFFFFF;";
	wbbEX.setAttribute("style",divCss);
	document.getElementById("EXmainContainer").appendChild(wbbEX);


	var wbbEX=document.createElement("div");
	wbbEX.id="EXstatus";
	wbbEX.setAttribute("style","font-family:arial;font-size:10px;text-align:center;background-color:#FFFFFF;");
	wbbEX.innerHTML=warning+"<a href='http://userscripts.org/scripts/show/63329'>WBB-EX Website</a> . Special Thanks: <a href='http://image-bb.com/'>Image Hosting</a>";
	document.getElementById("EXmainContainer").appendChild(wbbEX);

	var wbbEX=document.createElement("div");
	wbbEX.id="EXnavigator";
	wbbEX.setAttribute("style","background-image:url('http://i66.servimg.com/u/f66/12/56/08/34/cellpi10.gif');border:1px #0E334A solid;padding:5px;font-size:11px;background-color:#8EAED2;text-align:center;");
	document.getElementById("EXmainContainer").appendChild(wbbEX);

	var wbbEX=document.createElement("input");
	wbbEX.id="EXupdateB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-right:15px");
	wbbEX.value=" Update Library ";
	document.getElementById('EXnavigator').appendChild(wbbEX);

	var wbbEX=document.createElement("input");
	wbbEX.id="EXprevB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-right:5px");
	wbbEX.value=" < Prev ";
	document.getElementById('EXnavigator').appendChild(wbbEX);
	
	var wbbEX=document.createElement("input");
	wbbEX.id="EXhomeB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-left:2px;rmargin-right:2px");
	wbbEX.value=" Categories ";
	document.getElementById('EXnavigator').appendChild(wbbEX);
	
	var wbbEX=document.createElement("input");
	wbbEX.id="EXnextB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-left:5px");
	wbbEX.value=" Next > ";
	document.getElementById('EXnavigator').appendChild(wbbEX);
	
	var wbbEX=document.createElement("input");
	wbbEX.id="EXsettingsB";
	wbbEX.type='button';
	wbbEX.setAttribute("class","button");
	wbbEX.setAttribute("style","margin-left:15px");
	wbbEX.value=" Settings ";

	document.getElementById('EXnavigator').appendChild(wbbEX);
	document.getElementById('EXupdateB').addEventListener("click",updateLib,true);
	document.getElementById('EXnextB').addEventListener("click",nextPage, true);
	document.getElementById('EXprevB').addEventListener("click",prevPage, true);
	document.getElementById('EXhomeB').addEventListener("click",home, true);
	document.getElementById('EXsettingsB').addEventListener("click",settings, true);
}

// **************************************************************
// The script is free for use and distribution in its original state from the creator.
// Should not be intergreated in any comercial activities such as reselling or any activity 
// that in any way creates an income from part, full or any work created from the original 
// script.
// Modification of the script is only alowed for personal use, this means that the 
// modification cannot  be distributed as a work of your own or the creator, any 
// modification is solely for personal use any atempt to distribute, pass on in any 
// other way this modified script to anyone will result in legal action.
// ***************************************************************