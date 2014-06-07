// ==UserScript==
// @name	smileys14
// @version	1.00
// @author	Devjmi
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	
smileyarr["36_9_4"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZC_ATlKSI/AAAAAAAAAbw/uVzKz7zWBOQ/36_9_4.gif";
smileyarr["36_9_3"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZC_lQZCTI/AAAAAAAAAb0/JvkhgTqCPlQ/36_9_3.gif";
smileyarr["36_9_2"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDAJAw5DI/AAAAAAAAAb4/a7TQaqNWBs8/36_9_2.gif";
smileyarr["36_9_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDA0HQYCI/AAAAAAAAAb8/lURZqQjzf2Y/36_9_1.gif";
smileyarr["36_7_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDBloFcsI/AAAAAAAAAcA/ZtyIlI6rJjY/36_7_6.gif";
smileyarr["36_7_5"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDCX2JMaI/AAAAAAAAAcE/r8fVBsAOnA4/36_7_5.gif";
smileyarr["36_6_9"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDDFuSwJI/AAAAAAAAAcI/Q48AHs7pK6A/36_6_9.gif";
smileyarr["36_6_8"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDEVsS17I/AAAAAAAAAcM/-aCPHoitm1c/36_6_8.gif";
smileyarr["36_6_5"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDE43ngrI/AAAAAAAAAcQ/WmPUySKVMws/36_6_5.gif";
smileyarr["36_6_4"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDFk8XAcI/AAAAAAAAAcU/GPscDg9VD5U/36_6_4.gif";
smileyarr["36_6_3"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDGGIipgI/AAAAAAAAAcY/5fRVpl2SRq8/36_6_3.gif";
smileyarr["36_6_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDG_uzwRI/AAAAAAAAAcc/YzFq_krNEkw/36_6_2.gif";
smileyarr["36_6_1"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDHdzrBlI/AAAAAAAAAcg/_DXNo1MTQgY/36_6_1.gif";
smileyarr["36_3_2"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDIE3knHI/AAAAAAAAAck/_pp8jsxY_bo/36_3_2.gif";
smileyarr["36_3_15"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDIrCcDkI/AAAAAAAAAco/rQBvkGi-oxA/36_3_15.gif";
smileyarr["36_3_14"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDJcIHaiI/AAAAAAAAAcs/6eyMqAEQFdc/36_3_14.gif";
smileyarr["36_1_9"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDJ8GebFI/AAAAAAAAAcw/Xt-XbRWwq1s/36_1_9.gif";
smileyarr["36_1_8"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDKX4yBcI/AAAAAAAAAc0/FDCpCfcfhwI/36_1_8.gif";
smileyarr["36_1_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDK3vs34I/AAAAAAAAAc4/Jll0AIn30pc/36_1_6.gif";
smileyarr["36_1_5F40"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDLoFOROI/AAAAAAAAAc8/nh311Tngvpc/36_1_5F40.gif";
smileyarr["36_1_5F25"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDMAfJOcI/AAAAAAAAAdA/PtRq8BJijpM/36_1_5F25.gif";
smileyarr["36_1_54"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDMson46I/AAAAAAAAAdE/OIWV1LFaQ3k/36_1_54.gif";
smileyarr["36_1_53"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDNXILDgI/AAAAAAAAAdI/EjbefsX0RAk/36_1_53.gif";
smileyarr["36_1_52"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDOEUM9UI/AAAAAAAAAdM/dXHbFJIigek/36_1_52.gif";
smileyarr["36_1_51"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDO_2t5uI/AAAAAAAAAdQ/dFZaT7w87AI/36_1_51.gif";
smileyarr["36_1_50"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDPfhl7BI/AAAAAAAAAdU/v5pMpk5k2S0/36_1_50.gif";
smileyarr["36_1_5"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDP88x9cI/AAAAAAAAAdY/73EKl4wzVpk/36_1_5.gif";
smileyarr["36_1_49"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDQombrXI/AAAAAAAAAdc/OjCUNP0b-hA/36_1_49.gif";
smileyarr["36_1_47"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDRFkKXKI/AAAAAAAAAdg/zi7edV-wono/36_1_47.gif";
smileyarr["36_1_46"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDSF40_LI/AAAAAAAAAdk/HQIeN4ldC6Y/36_1_46.gif";
smileyarr["36_1_44"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDShQr0DI/AAAAAAAAAdo/sObiW26R23s/36_1_44.gif";
smileyarr["36_1_42"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDTV_QedI/AAAAAAAAAds/YUpDRKv172A/36_1_42.gif";
smileyarr["36_1_41"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDTxSYMRI/AAAAAAAAAdw/QR_muI96Pmw/36_1_41.gif";
smileyarr["36_1_4"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDUcGFoOI/AAAAAAAAAd0/NxSqswbc0zg/36_1_4.gif";
smileyarr["36_1_39"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDVPQdK6I/AAAAAAAAAd4/FjLs462vN_g/36_1_39.gif";
smileyarr["36_1_38"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDVrhTmlI/AAAAAAAAAd8/IcA3CGt5kpk/36_1_38.gif";
smileyarr["36_1_37"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDWSLBWxI/AAAAAAAAAeA/sKw1_tPnjZ0/36_1_37.gif";
smileyarr["36_1_35"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDXAWq0PI/AAAAAAAAAeE/g66LWLaAAXg/36_1_35.gif";
smileyarr["36_1_32"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDXprk92I/AAAAAAAAAeI/zTrPg9mFq64/36_1_32.gif";
smileyarr["36_1_31"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDYOcysKI/AAAAAAAAAeM/oX4awRB6M-8/36_1_31.gif";
smileyarr["36_1_30"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDYl3C4QI/AAAAAAAAAeQ/73OtASTB6BQ/36_1_30.gif";
smileyarr["36_1_29"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDZdxYMbI/AAAAAAAAAeU/i9KT6tW_Uic/36_1_29.gif";
smileyarr["36_1_28"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDaKiCvyI/AAAAAAAAAeY/kbBrEqd6ynQ/36_1_28.gif";
smileyarr["36_1_26"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDaq7U4cI/AAAAAAAAAec/E4sUAzRfbbM/36_1_26.gif";
smileyarr["36_1_21"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDbf3LfnI/AAAAAAAAAeg/mLyXoTARcQ4/36_1_21.gif";
smileyarr["36_1_2"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDb8OKfhI/AAAAAAAAAek/QSuOcDD8B5E/36_1_2.gif";
smileyarr["36_1_19"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDcpbvFDI/AAAAAAAAAeo/6GFck-L9u7s/36_1_19.gif";
smileyarr["36_1_16"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDdGqaePI/AAAAAAAAAes/YR6uZ2Wb9ss/36_1_16.gif";
smileyarr["36_1_15"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDdx4vBBI/AAAAAAAAAew/FSovSOaKU7g/36_1_15.gif";
smileyarr["36_1_14"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDegqQgMI/AAAAAAAAAe0/fWg3fRWuiUk/36_1_14.gif";
smileyarr["36_1_13"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDfFW5_8I/AAAAAAAAAe4/IrbArjs7DKI/36_1_13.gif";
smileyarr["36_1_12"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDft9HyOI/AAAAAAAAAe8/aLVgdJ1foLQ/36_1_12.gif";
smileyarr["36_1_11"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDgfuCcMI/AAAAAAAAAfA/ORnF5QvyAtY/36_1_11.gif";
smileyarr["36_1_10"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDg9RhaZI/AAAAAAAAAfE/RUXhaj_H2rA/36_1_10.gif";
smileyarr["36_1_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDhrcVQfI/AAAAAAAAAfI/EKI1NmUdwvs/36_1_1.gif";
smileyarr["36_15_26"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDiLaY9xI/AAAAAAAAAfM/xSsydF2S2Ns/36_15_26.gif";
smileyarr["36_15_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDi0EfrLI/AAAAAAAAAfQ/cqbaMr3t9go/36_15_2.gif";
smileyarr["36_15_19"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDjtrzcHI/AAAAAAAAAfU/vuqoJ5Nz6yE/36_15_19.gif";
smileyarr["36_15_13"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDkYb_xqI/AAAAAAAAAfY/rJT0J1Cq6ow/36_15_13.gif";
smileyarr["36_15_11"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDk5dyR1I/AAAAAAAAAfc/DTAWNe1kWp4/36_15_11.gif";
smileyarr["36_15_1"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDljNLPuI/AAAAAAAAAfk/YiDqCCcOVAM/36_15_1.gif";
smileyarr["36_13_5"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDmBHx81I/AAAAAAAAAfo/raN9QQ88g48/36_13_5.gif";
smileyarr["36_13_4"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDm-MrrXI/AAAAAAAAAfs/sIBqALOX1OE/36_13_4.gif";
smileyarr["36_13_3"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDnU1gfXI/AAAAAAAAAfw/wXp9nByKq3g/36_13_3.gif";
smileyarr["36_13_2"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDoSjw34I/AAAAAAAAAf0/_mlW9EL5ZzY/36_13_2.gif";
smileyarr["36_13_1"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDpG-vfSI/AAAAAAAAAf4/6c5GtszhVEU/36_13_1.gif";
smileyarr["36_11_6"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDp0nI_qI/AAAAAAAAAf8/Mdu8QqdZZ5c/36_11_6.gif";
smileyarr["36_11_5"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDqkYNx7I/AAAAAAAAAgA/oMFvyBqxIl4/36_11_5.gif";
smileyarr["36_11_3"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDrNtCDUI/AAAAAAAAAgE/lbIIbOL0PNM/36_11_3.gif";
smileyarr["36_11_2"]="http://lh5.ggpht.com/_Nhh98Ix90W8/ScZDr7Vv6II/AAAAAAAAAgI/qItlE6S_3EY/36_11_2.gif";
smileyarr["36_11_15"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDsnRVRgI/AAAAAAAAAgM/wKkCGMbSCEs/36_11_15.gif";
smileyarr["36_11_14"]="http://lh4.ggpht.com/_Nhh98Ix90W8/ScZDtG1hsYI/AAAAAAAAAgQ/tNJrbncHWXM/36_11_14.gif";
smileyarr["36_11_13"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDtwFo40I/AAAAAAAAAgU/balCRHLfYH8/36_11_13.gif";
smileyarr["36_11_11"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDuu4aIBI/AAAAAAAAAgY/OEdj3dZ-jqk/36_11_11.gif";
smileyarr["36_11_10"]="http://lh6.ggpht.com/_Nhh98Ix90W8/ScZDvVa6RXI/AAAAAAAAAgc/e92jvqtYNYE/36_11_10.gif";
smileyarr["36_11_1"]="http://lh3.ggpht.com/_Nhh98Ix90W8/ScZDw9JZPbI/AAAAAAAAAgg/JOWW-u8UNco/36_11_1.gif";
	



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

