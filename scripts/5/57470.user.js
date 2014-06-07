// ==UserScript==
// @name	SLZ Tuning
// @version	Beta (3 rok forum!)
// @author	Nitrol
// @description	Tuning SLZ: Obrazki z TLK, nowe buttony na ugu, TLKFAA na slz
// @include        *stadolwiejziemi.pun.pl/*
// ==/UserScript==

//antysoda
var words = {
'Stodolatest - źle wybrałeś? Sprawdź nasze poradniki zakupowe.' : '',
'Stodolatest - recenzje opinie, porady - wszystko o sprzęcie.' : '',
'Stodolatest' : '',
'codbgth4u':'Wielkie, naprawdę wielkie dzięki! :)'};
// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}

//nowe emotki
//authors: Nitrol<Swashata<abhishek orkut don<Praveen, OD & Fenil
//Thx 4: BiTi22, Kiara 0
//ikonki
addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("title");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_012_nala_wow.gif"]="http://img138.imageshack.us/img138/6283/46200430.gif";	
smileyarr["http://lh6.ggpht.com/_M0X9MzkzNXE/SavBv10_eWI/AAAAAAAABT4/pcX5J8cwULA/Animal_21.gif"]="http://img339.imageshack.us/img339/9085/88329120.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_023_cub_simba_laughing.gif"]="http://img695.imageshack.us/img695/1237/40360496.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_003_ed_laughing.gif"]="http://img695.imageshack.us/img695/4100/29138139.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_020_ed_laughing_crazy.gif"]="http://img245.imageshack.us/img245/7042/58167136.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_009_hyena_trio.gif"]="http://img412.imageshack.us/img412/9766/60012200.gif";1
smileyarr["http://lh4.ggpht.com/_M0X9MzkzNXE/Sau_lMjk8NI/AAAAAAAABRc/2J9VQqcxJYc/Animal_60.gif"]="http://img245.imageshack.us/img245/8574/90593353.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_054_simba_looking.gif"]="http://img513.imageshack.us/img513/103/simbalooking.gif";
smileyarr["http://www.mylionking.com/resources/site_images/animated_gif_025_hug.gif"]="http://img695.imageshack.us/img695/3783/hugm.gif";
smileyarr["http://lh5.ggpht.com/_M0X9MzkzNXE/Sau_qSb8YII/AAAAAAAABRk/a1GUO5VSsZs/Animal_58.gif"]="http://img148.imageshack.us/img148/1165/58233881.gif";

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

//emotki 1 - punowe
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
smileyarr[":D"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5DD";
smileyarr[":P"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5DP";
smileyarr[":p"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5Dp";
smileyarr[":|"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bpion%5D";
smileyarr[":("]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D(";
smileyarr[":["]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5B";
smileyarr[":/"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bslash%5D";
smileyarr[":*"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5D%5Bstar%5D";
smileyarr[":o"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bdblpt%5Do";
smileyarr["poklon"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/poklon";
smileyarr[";("]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5D(";
smileyarr[";)"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5D)";
smileyarr[";oh;"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bsred%5Doh%5Bsred%5D";
smileyarr["aniol"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/aniol";
smileyarr["aplaus"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/aplaus";
smileyarr["ble"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/ble";
smileyarr["cool"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/cool";
smileyarr["zdziiwiony"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/zdziiwiony";
smileyarr["aj"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Daj%5Bspace%5D";
smileyarr["zaciesz"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/zaciesz";
smileyarr["offtop"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/offtop";

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

//emotki 2 - z gg
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
smileyarr["jupi!"]="http://img686.imageshack.us/img686/9775/jupi.gif";
smileyarr["diabełek"]="http://img442.imageshack.us/img442/7387/diabelekq.gif";
smileyarr["co jest"]="http://img685.imageshack.us/img685/8379/cojest.gif";
smileyarr["co?"]="http://img442.imageshack.us/img442/3224/62151230.gif";
smileyarr["cisza!"]="http://img339.imageshack.us/img339/3921/cisza.gif";
smileyarr["chytry"]="http://img109.imageshack.us/img109/326/chytryg.gif";
smileyarr["fiu"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dfiu%5Bspace%5D";
smileyarr["he"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dhe%5Bspace%5D";
smileyarr["lol"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dlol%5Bspace%5D";
smileyarr["ok"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dok%5Bspace%5D";
smileyarr["papa"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dpapa%5Bspace%5D";
smileyarr["wow"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dwow%5Bspace%5D";
smileyarr["you"]="http://stadolwiejziemi.pun.pl/_fora/stadolwiejziemi/smilies/%5Bspace%5Dyou%5Bspace%5D";
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
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://fanart.lionking.org/" width="816" height="100%" frameborder="0" allowtransparency="true" ></iframe>';
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