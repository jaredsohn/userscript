// ==UserScript==
// @name           Old + Old Animated + New Orkut Smileys (By-HB)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=563787369546797333
// @author	HB
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
*********************************************************/

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
	smileyarr["lol"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S58fHkzoTRI/AAAAAAAAA_o/yCpmHNIscRo/s800/face%20lol.gif";
	smileyarr["Old Cool"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94aMOxSwI/AAAAAAAAAoY/w3dnZepZLtI/s800/o_cool.gif";
	smileyarr["Old Cool(A)"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx92UMQ-ZvI/AAAAAAAAAnE/KNYGYpIB2J4/s800/oa_cool.gif";
	smileyarr["Old Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94j8K894I/AAAAAAAAAo4/XA6qtDzth6I/s800/o_sad.gif";
	smileyarr["Old Sad (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92uz9lJ8I/AAAAAAAAAnk/c8y0TapKgl8/s800/oa_sad.gif";
	smileyarr["Old Angry"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94Zn4CGSI/AAAAAAAAAoM/l0C5mb-UnK4/s800/o_angry.gif";
	smileyarr["Old Angry (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92TiJLUMI/AAAAAAAAAm4/yTzhpitw1jc/s800/oa_angry.gif";
	smileyarr["Old Smile"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/Sx94jwq3ejI/AAAAAAAAAo8/PAnSwgo_Umc/s800/o_smile.gif";
	smileyarr["Old Smile (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92u3WFPeI/AAAAAAAAAno/NrjBokyUxMM/s800/oa_smile.gif";
	smileyarr["Old Wink"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94kKUxU2I/AAAAAAAAApE/XMVPHWXyayU/s800/o_wink.gif";
	smileyarr["Old Wink (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92vBd41OI/AAAAAAAAAnw/r5FHJNE1KvI/s800/oa_wink.gif";
	smileyarr["Old Big Smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8DunzI/AAAAAAAAAoQ/CyQ1YXaqrZY/s800/o_bigsmile.gif";
	smileyarr["Old Big Smile (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92Tmf3vxI/AAAAAAAAAm8/Js-F-OYG41o/s800/oa_bigsmile.gif";
	smileyarr["Old Surprise"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx94jyDkA6I/AAAAAAAAApA/P_tc4GOkcHc/s800/o_surprise.gif";
	smileyarr["Old Surprise (A)"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx92vCzVKpI/AAAAAAAAAns/0qck22nQ-PA/s800/oa_surprise.gif";
	smileyarr["Old Funny"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx94aFPA4_I/AAAAAAAAAoc/lGMca0uPo1Y/s800/o_funny.gif";
	smileyarr["Old Funny (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92UVTLLII/AAAAAAAAAnI/sjEX3nz4n3A/s800/oa_funny.gif";
	smileyarr["Old Confuse"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx94Z8XKMZI/AAAAAAAAAoU/76WoFzQ11RQ/s800/o_confuse.gif";
	smileyarr["Old Confuse (A)"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx92UBrIEHI/AAAAAAAAAnA/e_OobdFEWCA/s800/oa_confuse.gif";

	smileyarr["New Heart"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWO6gUVI/AAAAAAAAAyU/vLqvnhb8UVk/s800/n_heart.png";
	smileyarr["New Smile"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWZZz0PI/AAAAAAAAAyg/hpGq5OpGmSA/s800/n_smile.png";
	smileyarr["New Wink"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-Cbb20yoI/AAAAAAAAAzE/mSjQgpPB6WQ/s800/n_wink.png";
	smileyarr["New Big Smile"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CO2yOr3I/AAAAAAAAAxs/u6cUBZPDla4/s800/n_big%20smile.png";
	smileyarr["New Surprise"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CbDAxXzI/AAAAAAAAAzA/Zl5Zt7wRVW8/s800/n_surprise.png";
	smileyarr["New Funny"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CPCtgoaI/AAAAAAAAAx4/E29wxYpLBrc/s800/n_funny.png";
	smileyarr["New Cool"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx-CPEfv7mI/AAAAAAAAAxw/NiKyeGu4YBk/s800/n_cool.png";
	smileyarr["New Straightface"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CWY3g5pI/AAAAAAAAAyk/1CMozYSy2OE/s800/n_straightface.png";
	smileyarr["New Slant"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/Sx-CWMV4-1I/AAAAAAAAAyc/EZjLe-2ucAI/s800/n_slant.png";
	smileyarr["New Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/Sx-CWOIvtWI/AAAAAAAAAyY/YuuaeOJHQOs/s800/n_sad.png";
	smileyarr["New Cry"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CPAAxR5I/AAAAAAAAAx0/UP01oA1GYRY/s800/n_cry.png";
	smileyarr["New Angry"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/Sx-CO-bqNJI/AAAAAAAAAxo/tl1gWokCm9c/s800/n_angry.png";





	





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

// HB's script