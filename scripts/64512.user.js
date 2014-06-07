// ==UserScript==
// @name	SLZ Tuning
// @version	4.4.4
// @author	Nitrol
// @description	Tuning SLZ: Obrazki z TLK, nowe buttony na ugu, TLKFAA na slz
// @include     http://*.stadolwiejziemi.pun.pl/*
// ==/UserScript==
//nowe emotki
//authors: Nitrol<Swashata<abhishek orkut don<Praveen, OD & Fenil
//Thx 4: BiTi22, Kiara 0
//ikonki
//emotki - punowe
addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}
function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("title");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += ""+image+"";
}
function dip() {
	var smileyarr = new Array();
smileyarr[":)"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D)";
smileyarr[";)"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5D)";
smileyarr[":D"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5DD";
smileyarr[":P"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5DP";
smileyarr[":|"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bpion%5D";
smileyarr[":("]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D(";
smileyarr[":p"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5Dp";
smileyarr[":["]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5B";
smileyarr[":/"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bslash%5D";
smileyarr[":*"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bstar%5D";
smileyarr[":o"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5Do";
smileyarr["poklon"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/poklon";
smileyarr[";("]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5D(";
smileyarr[";oh;"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5Doh%5Bsred%5D";
smileyarr["aniol"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/aniol";
smileyarr["aplaus"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/aplaus";
smileyarr["ble"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/ble";
smileyarr["cool"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/cool";
smileyarr["zdziiwiony"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/zdziiwiony";
smileyarr["zaciesz"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/zaciesz";
smileyarr["offtop"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/offtop";
smileyarr[":chytry:"]="http://img109.imageshack.us/img109/326/chytryg.gif";
smileyarr[":cisza:"]="http://img339.imageshack.us/img339/3921/cisza.gif";
smileyarr[":co:"]="http://img442.imageshack.us/img442/3224/62151230.gif";
smileyarr[":co jest:"]="http://img685.imageshack.us/img685/8379/cojest.gif";
smileyarr[":cisza:"]="http://img339.imageshack.us/img339/3921/cisza.gif";
smileyarr[":C"]="http://img442.imageshack.us/img442/7387/diabelekq.gif";

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

//tlkfaa na slz
//author: Enven2
//zmiany: Nitrol
var version="2.0";
var displayedflag = 0;

unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://www.proxy.xaa.pl/index.php?q=www.stadolwiejziemi.pun.pl" width="816" height="100%" frameborder="0" allowtransparency="true" ></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-832px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img230.imageshack.us/img230/9431/tlonowe.gif);">'
	+ '</div>'
	+ '<div id="shoutframe" style="position:absolute;top:3px;bottom:3px;righ:3px;" onmouseover="displayshout()"><center>Najedź kursorem by pokazać stronę TLKFAA</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px></div>';

GM_addStyle("#shoutbar { background:url(http://img230.imageshack.us/img230/9431/tlonowe.gif); padding-top:33px; width:826px; position:absolute; left:-832px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img148.imageshack.us/img148/5397/tlkfaau.gif); width:39px; height:177px; position:absolute; right:-41px; top:0px; } "); 
GM_addStyle("#shouttab:click { left: 0px; } ");