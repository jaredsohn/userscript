// ==UserScript==
// @name	Orkut Animated king of fighter's collection
// @version	1.00
// @author	HOD
// @namespace	ODPE
// @description	Use Animated king of fighter's in your ScrapBook and HTML community Forums. Just click on a smiley to insert. Enjoy
// @include     http*://*.orkut.*/*
// @exclude     http://*.orkut.*/Main#*
// @exclude     http://*.orkut.gmodules.*

// ==/UserScript==

/**************************************

//Script Template by Hod [Team ODPE]

***************************************/

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
        smileyarr["yurikoufire"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47Yx2_oL3I/AAAAAAAAAPQ/LReAKqTAzJo/yurikoufire.gif";
        smileyarr["yuricvsshok"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Yzgx623I/AAAAAAAAAPU/sJ7vB3l4D7E/yuricvsshok.gif";
        smileyarr["yukiiceglacierlb2"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y0oL3X7I/AAAAAAAAAPY/T_hP8SHTipU/yukiiceglacierlb2.gif";
        smileyarr["yamazakire"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y1k9DhdI/AAAAAAAAAPc/KZXTSxpvHCc/yamazakire.gif";
        smileyarr["yamazakidmmattack"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y2mbndDI/AAAAAAAAAPg/PleSQ-dCJOo/yamazakidmmattack.gif";
        smileyarr["yamazakire"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y1k9DhdI/AAAAAAAAAPc/KZXTSxpvHCc/yamazakire.gif";
        smileyarr["xiangfeikofwilderhands"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Y4_hzS4I/AAAAAAAAAPk/ZHBTj3lyqp0/xiangfeikofwilderhands.gif";
        smileyarr["xiangfeijumpfliprbff2"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y5_liqKI/AAAAAAAAAPo/NEA3ZDSyvT4/xiangfeijumpfliprbff2.gif";
        smileyarr["warmachinefireball"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Y60ftHCI/AAAAAAAAAPs/3xRHdfpguiM/warmachinefireball.gif";
        smileyarr["V"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Y9PhxPLI/AAAAAAAAAPw/h3XYzfoSpuc/V.gif";
        smileyarr["todoryuhyakuattack"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Y-H8qxSI/AAAAAAAAAP0/0RvcwIzdhXg/todoryuhyakuattack2000.gif";
	smileyarr["Mongolian"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Y-6ShQ5I/AAAAAAAAAP4/jYGEFRHrzqo/The%20King%20Of%20Fighters%201999_Maxima%20-%20Mongolian.gif";
	smileyarr["terrygarouwinjacket"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZAdE9BuI/AAAAAAAAAQA/vPhLSQF0zfA/terrygarouwinjacket.gif";
	smileyarr["terry"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZDTR6cYI/AAAAAAAAAQE/kU0ltgXIQRI/terrybusterwolffix.gif";
	smileyarr["terry99powerwave"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZERTllqI/AAAAAAAAAQM/0VpMiosIXxU/terry99powerwave.gif";
	smileyarr["subzerofreeze"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZFQYOO4I/AAAAAAAAAQQ/p5TklwJKIaM/subzerofreeze.gif";
	smileyarr["subtitleen"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZGep2jkI/AAAAAAAAAQU/Bmeb09-1wN8/sub_title_en.gif";
	smileyarr["streetfighter"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47ZHCqMycI/AAAAAAAAAQY/vYbn9Vo_MP8/street_fighter_032.gif";
	smileyarr["streetfighter"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZH4tk3eI/AAAAAAAAAQc/SYTG4BG2Weo/street_fighter_016.gif";
	smileyarr["sodomjump"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZJOAZYKI/AAAAAAAAAQg/ZJ5X70RSkdo/sodomjump.gif";
	smileyarr["shermieoroslices"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZJ2QzIJI/AAAAAAAAAQk/tkiwTIBLGMo/shermieoroslices.gif";
	smileyarr["shermieankokouraikoken"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZLtuJewI/AAAAAAAAAQo/dr14n7DRBuE/shermieankokouraikoken.gif";
	smileyarr["sdasd342"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZNBAlHlI/AAAAAAAAAQw/AEqe1ZA4ZhE/sdasd342.gif";
	smileyarr["sakurasuper"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZQ6aodPI/AAAAAAAAAQ0/Xf0TQFC_pRw/sakurasuper.gif";
	smileyarr["Jsaisyuspecial"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZR0V4KjI/AAAAAAAAAQ4/Jsn2iuhCWQM/saisyuspecial.gif";
	smileyarr["saisyukusanagi"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZTAwdX1I/AAAAAAAAAQ8/ICgS9IE8XTM/saisyukusanagi.gif";
	smileyarr["ryucvshadokena"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZTwvcWJI/AAAAAAAAARA/HocXLIVRgIA/ryucvshadokena.gif";
	smileyarr["ryohaohshokoken"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZVfJ2hiI/AAAAAAAAARE/OqiykButWiM/ryohaohshokoken.gif";
	smileyarr["ryosuperfireball"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZWmphNDI/AAAAAAAAARI/ZGRbE2fC1Kw/ryo-superfireball.gif";
	smileyarr["roseproject"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZXcA61FI/AAAAAAAAARM/JZlO2PzA-Vw/roseproject.gif";
	smileyarr["roberthaoh"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZYYkdciI/AAAAAAAAARQ/fQM0jIcs3L8/roberthaoh.gif";
	smileyarr["robert99ryuugekiken"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47ZZWQzYVI/AAAAAAAAARU/1k4sB9HUvhY/robert99ryuugekiken.gif";
	smileyarr["orochicide"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZaaPVODI/AAAAAAAAARY/2ZwD4hsFyq0/orochicide.gif";
	smileyarr["MACHO"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Zazyml9I/AAAAAAAAARc/_0G613c4HrA/MACHO.gif";
	smileyarr["luckyballred"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZbtuLyFI/AAAAAAAAARg/vJjrbtl1gPA/luckyballred.gif";
	smileyarr["kyok97dm2a"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZdaelE4I/AAAAAAAAARk/7ks7nU92eOs/kyok97dm2a.gif";
	smileyarr["kojiroushot2lb2"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Zet3W8lI/AAAAAAAAARo/d9iGdkZjzyM/kojiroushot2lb2.gif";
	smileyarr["kim_attack32_02"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Zg7lfMnI/AAAAAAAAARs/tHV0y3G9pQM/kim_attack32_02.gif";
	smileyarr["kevinsmash"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47ZhnpKNPI/AAAAAAAAARw/2v6z1YcQB1g/kevinsmash.gif";
	smileyarr["kagamifirehand"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47Ziuwd0dI/AAAAAAAAAR0/TwZKR2y_Jzk/kagamifirehand.gif";
	smileyarr["kagamicharge"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47ZjiW6ViI/AAAAAAAAAR4/Jr08q4IgmQw/kagamicharge.gif";
	smileyarr["kaedeshotlb2"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZkSda-XI/AAAAAAAAAR8/YliypNc1Dcw/kaedeshotlb2.gif";
	smileyarr["joeougonnokakatokof99"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZlWM-hII/AAAAAAAAASA/xHavN_rTY7M/joeougonnokakatokof99.gif";
	smileyarr["joehurricaneupperkof99"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Zm9Oi9cI/AAAAAAAAASE/JnyghQAMFqk/joehurricaneupperkof99.gif";
	smileyarr["jhun2snkwilderkick"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZopFTqhI/AAAAAAAAASI/McJVlK_TJ_4/jhun2snkwilderkick.gif";
	smileyarr["jaohoonrisingkick"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47ZpSHiBII/AAAAAAAAASM/-z8c1HGM9SE/jaohoonrisingkick.gif";
	smileyarr["ioriwilder1"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Zqux_CzI/AAAAAAAAASQ/L_hdrAaDK4Y/ioriwilder1.gif";
	smileyarr["iorishikioniyakikof99"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZruKMwRI/AAAAAAAAASU/yzyLbOpLmiU/iorishikioniyakikof99.gif";
	smileyarr["iorisfiredm"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Ztf-B7II/AAAAAAAAASY/7YW2M-WlMuc/iorisfiredm.gif";
	smileyarr["iorimaidenmasher98"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47ZvHOu1zI/AAAAAAAAASc/yDjSyygw64I/iorimaidenmasher98.gif";
	smileyarr["ioriattackonryo"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZxQCQHRI/AAAAAAAAASg/61oiEjczXCQ/iori_attack_on_ryo.gif";
	smileyarr["iori98kuzuscratch"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZyHlVN9I/AAAAAAAAASk/K1PotMdjF-M/iori98kuzuscratch.gif";
	smileyarr["iori98jumpkick"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47ZywfahYI/AAAAAAAAASo/tGKeIXA7s7s/iori98jumpkick.gif";
	smileyarr["iori8gobletssdm"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Z0lkLtfI/AAAAAAAAASs/Wb5MndApAHo/iori8gobletssdm.gif";
	smileyarr["heiderncoaton"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Z1VrkajI/AAAAAAAAASw/XC4njA_r1gU/heiderncoaton.gif";
	smileyarr["hanzoninpodblast"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Z2eQLHlI/AAAAAAAAAS0/RCvGv6ghAAY/hanzoninpodblast.gif";	
	smileyarr["064778c0"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47aJ2hpzHI/AAAAAAAAAUM/ph1SZ7bIIyk/064778c0.gif";
	smileyarr["Deadpool_on_motor_bike_by_jaredjlee"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S4-SXfRatOI/AAAAAAAAAUw/SAkI0XVICUQ/Deadpool_on_motor_bike_by_jaredjlee.gif";	
	smileyarr["geesedm1kof98"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Z3xnHJRI/AAAAAAAAAS4/kBnzsk-EHso/geesedm1kof98.gif";
	smileyarr["gambitcard"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Z41l3zII/AAAAAAAAAS8/-BFrBFw9Bhs/gambitcard.gif";
	smileyarr["drdoompowerball"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Z5hCHiTI/AAAAAAAAATA/R_74Qf1AwMA/drdoompowerball.gif";
	smileyarr["donghwanaerosuperkick"]="http://lh6.ggpht.com/_jiBvVxb0Db4/S47Z6hUBbhI/AAAAAAAAATE/G_ftoTAUBfA/donghwanaerosuperkick.gif";
	smileyarr["dhalsimyogafire1"]="http://lh4.ggpht.com/_jiBvVxb0Db4/S47Z7Wjg9tI/AAAAAAAAATI/5x9vSmHWgL0/dhalsimyogafire1.gif";
	smileyarr["ddpowerattack"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47Z8UzLaPI/AAAAAAAAATM/UWNUd_MMYyE/ddpowerattack.gif";
	smileyarr["changvchoi"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47Z-ZwFehI/AAAAAAAAATQ/CjkUWV-tJZM/changvchoi.gif";
	smileyarr["changvchoi"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47aAp3SNVI/AAAAAAAAATY/WTB1qrueOnk/benimarudmlightnngkof99.gif";
	smileyarr["athena99psyreflb"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47aDFWqjwI/AAAAAAAAAT0/PkSQzPWOtz0/athena99psyreflb.gif";
	smileyarr["aswq2332"]="http://lh3.ggpht.com/_jiBvVxb0Db4/S47aF0dhObI/AAAAAAAAAT4/fSkSDaVgp08/aswq2332.gif";
	smileyarr["0926b950"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47aHPGCegI/AAAAAAAAAT8/pxcZFU7wmas/0926b950.gif";
	smileyarr["06574a70"]="http://lh5.ggpht.com/_jiBvVxb0Db4/S47aJBRecOI/AAAAAAAAAUI/XEkKu8vpjhI/06574a70.gif";
        smileyarr["TheKingOfFightersIX"]="http://lh5.ggpht.com/_62ZUnk3zUto/S7w7u2_pYiI/AAAAAAAAAII/XkWJ8iMzH5o/TheKingOfFightersIX.gif";
        smileyarr["TKOF39"]="http://lh3.ggpht.com/_62ZUnk3zUto/S7w7u6zH1wI/AAAAAAAAAIM/tbyDfClpOsk/TKOF39.gif";
	smileyarr["k9999windcape"]="http://lh4.ggpht.com/_62ZUnk3zUto/S7w7vdCSCVI/AAAAAAAAAIY/feck4zlBHuA/k9999windcape.gif";
	smileyarr["TKOF6"]="http://lh3.ggpht.com/_62ZUnk3zUto/S7w8bIXWh3I/AAAAAAAAAIc/9yI648VisUk/TKOF6.gif";
	smileyarr["batmanrun"]="http://lh4.ggpht.com/_62ZUnk3zUto/S7w7vOnn_mI/AAAAAAAAAIQ/h7h89UBGE8A/batmanrun.gif";





	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);