// ==UserScript==
// @name          Orkut Smileys 
// @credits	  HB
// @description   Not mine!!
// @include       htt*://*.orkut.*/*
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

	smileyarr["Lol"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S58fHkzoTRI/AAAAAAAAA_o/yCpmHNIscRo/s800/face%20lol.gif";
	smileyarr["Lol1"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S7hqOap-1pI/AAAAAAAABMw/2qkhWbOEfME/s800/Lol.gif";
	smileyarr["Lol2"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64ubOVYOfI/AAAAAAAABHI/bTtQYOvYV0w/s800/Lol1.gif";
	smileyarr["Lol3"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64ubXD1SoI/AAAAAAAABHM/LSTmSkKA3BI/s800/lol2.gif";
	smileyarr["Lol4"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64ubd1oOdI/AAAAAAAABHQ/lWSIYwLp1Vs/s800/lol3.gif";
	smileyarr["Lol5"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64ubr9SGtI/AAAAAAAABHU/qFf4KspvHJw/s800/lol4.gif";
	smileyarr["Funny1"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64vrhv3u_I/AAAAAAAABHY/o9NQcLb4aHQ/s800/Funny1.gif";
	smileyarr["Funny2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64vrr98UxI/AAAAAAAABHc/77s1M0o6nbA/s800/Funny2.gif";
	smileyarr["Funny3"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64vr9NzKrI/AAAAAAAABHg/UaKhO3kTCUQ/s800/Funny3.gif";
	smileyarr["Crazy"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S_AhxxRwrxI/AAAAAAAABPc/lshC1F-cw8w/s800/crazy.gif";
	smileyarr["Sporty"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/TADpPsdKQhI/AAAAAAAABRI/f6ahUWOKoiI/s800/sporty1.gif";
	smileyarr["Dance1"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64vsEZzBiI/AAAAAAAABHk/uGcMQuZuPRQ/s800/Dance.gif";
	smileyarr["Dance2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64vsfit9FI/AAAAAAAABHo/X5SWH-lihGo/s800/Dance2.gif";
	smileyarr["Dance3"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64vv8LN_SI/AAAAAAAABHs/wu5QH81NgpY/s800/Dance3.gif";
	smileyarr["Dance4"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S_F07gCWECI/AAAAAAAABQA/8jQPQ3Mw0p0/s800/Dance4.gif";
	smileyarr["Dance5"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S_vgjkrm97I/AAAAAAAABQc/UFqRazIwm-E/s800/Dance5.gif";
	smileyarr["Agreement"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64w6IWLTtI/AAAAAAAABHw/o6ZaiEo5AK8/s800/Agreement.gif";
	smileyarr["Blush"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64xd6tEOGI/AAAAAAAABH0/Gm5DcITbUsU/s800/blush.gif";
	smileyarr["Love"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64xdwqyQBI/AAAAAAAABH4/JZdV9ZzUW7E/s800/Love.gif";
	smileyarr["Love2"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/TADnGgCUJKI/AAAAAAAABQ4/RbN2wNjxbsw/s800/love2.gif";
	smileyarr["Love3"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/TADnG_ZNlYI/AAAAAAAABQ8/HVQygT3dMZw/s800/love3.gif";
	smileyarr["Hug"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64xePCsbFI/AAAAAAAABH8/gc7ioHRRoTc/s800/hug.gif";
	smileyarr["Kiss"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64xec52KJI/AAAAAAAABIA/qYfOBkjZNrE/s800/kiss.gif";
	smileyarr["Kiss1"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64xeerzEpI/AAAAAAAABIE/SzTyyW8CcNg/s800/Kiss1.gif";
	smileyarr["Kiss2"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64yFhsph6I/AAAAAAAABIM/yqqD3tUFv3w/s800/Kiss2.gif";
	smileyarr["Kiss3"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64yFjcrlaI/AAAAAAAABIQ/feMasHJwvLs/s800/Kiss3.gif";
	smileyarr["Girl1"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64yFyfBJVI/AAAAAAAABIU/iO2yRSkuZ_k/s800/Girl1.gif";
	smileyarr["Girl2"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64yGFLVHjI/AAAAAAAABIY/xzaM57Xu_c4/s800/Girl2.gif";
	smileyarr["Girl3"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64yGKScfsI/AAAAAAAABIc/Qeg43xEDNmc/s800/Girl3.gif";
	smileyarr["Rose"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S64yQbfo7lI/AAAAAAAABIg/16Iv9VLPupM/s800/Rose.gif";
	smileyarr["Singing For GF"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64yQZq5MDI/AAAAAAAABIk/r0znIrpdaWg/s800/Singing.gif";
	smileyarr["Angel1"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64yQqZ56OI/AAAAAAAABIo/0R7i-qiap6A/s800/Angel1.gif";
	smileyarr["Angel2"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64yQycRtnI/AAAAAAAABIs/n34AmXY9zyc/s800/Angel2.gif";
	smileyarr["No Idea"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64zqNRTZ4I/AAAAAAAABIw/46zL2oaz-eA/s800/No%20Idea.gif";
	smileyarr["Confused"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S64zqZqWQvI/AAAAAAAABI0/UzeEQ81l2sA/s800/confused010.gif";
	smileyarr["Sad"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64zqXOH0tI/AAAAAAAABI4/kVEI2qCg87g/s800/Sad.gif";
	smileyarr["Sad2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S64zqgbQzXI/AAAAAAAABI8/FClcux22hJ0/s800/Sad2.gif";
	smileyarr["Dead"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S641ZxGqOQI/AAAAAAAABJs/3MiuG9_tFNs/s800/Dead.gif";
	smileyarr["Not Talking"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S641Z0DkyzI/AAAAAAAABJo/AMUgXYTdKIQ/s800/Not%20Talking.gif";
	smileyarr["Party"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S_vgju73oMI/AAAAAAAABQY/M8Mi6nn4u2E/s800/Party.gif";
	smileyarr["Welcome"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S643oSheNKI/AAAAAAAABKY/5UmGO2miarA/s800/Welcome.gif";
	smileyarr["Help"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S644Dn_EuUI/AAAAAAAABKk/S5zjCfQeu_E/s800/Help.gif";
	smileyarr["Please"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S64zq_tBShI/AAAAAAAABJA/dN-fgM1Z8a0/s800/Please.gif";
	smileyarr["What The Fuck"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S-l6AvB8N3I/AAAAAAAABOQ/l0EbmpHlmkA/s800/WTF.gif";
	smileyarr["Shut Up"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641GO-wM2I/AAAAAAAABJY/MvkxQYvECG4/s800/Shut%20Up.gif";
	smileyarr["Banned"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641GqxqDnI/AAAAAAAABJc/8kmTJK7KSzg/s800/Banned.gif";
	smileyarr["Admin"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S-l6A2lvImI/AAAAAAAABOU/zKrguJ052kg/s800/admin.gif";
	smileyarr["Spam"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S641Gp7xuzI/AAAAAAAABJg/r74imYYwn68/s800/Spam.gif";
	smileyarr["Censored"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641Hp3mZyI/AAAAAAAABJk/7STtK-SiBjs/s800/Censored.gif";
	smileyarr["Angry"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641sY3Ds8I/AAAAAAAABJ0/Sxxyv6dOIug/s800/Angry.gif";
	smileyarr["Angry01"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/TADnGhzPumI/AAAAAAAABQ0/jvrtvwjM8Q8/s800/angry1.gif";
	smileyarr["Angry1"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S641sl4cHrI/AAAAAAAABJ4/Eu9dzOS8Isw/s800/Angry1.gif";
	smileyarr["Angry2"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641s3qJgzI/AAAAAAAABJ8/XHLUmAUXGKM/s800/Angry2.gif";
	smileyarr["Angry3"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S641tIrcDHI/AAAAAAAABKA/nIYWATv9CWs/s800/Angry3.gif";
	smileyarr["Angry4"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S641tCojAFI/AAAAAAAABKE/kUIu4_BImas/s800/Angry4.gif";
	smileyarr["Back"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S7hyM2OQPJI/AAAAAAAABNc/WLt4DBozzT0/s800/Back.gif";
	smileyarr["Back2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S7hyNdSfZsI/AAAAAAAABNg/eLLo_Z8GYOU/s800/Back2.gif";
	smileyarr["Back3"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S7hyNuR9ucI/AAAAAAAABNk/l1ok5_NihOk/s800/Back3.gif";
	smileyarr["Fight1"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S641zLWV-RI/AAAAAAAABKI/OdGUr_5j7Pk/s800/Fight1.gif";
	smileyarr["Fight2"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S641zW8GiPI/AAAAAAAABKM/Ue794NcTEwY/s800/Fight2.gif";
	smileyarr["Fight3"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S641ziJIl9I/AAAAAAAABKQ/nJcJ_99PsX4/s800/Fight3.gif";
	smileyarr["Fight4"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S641z5JmsxI/AAAAAAAABKU/lrM7ujdlY18/s800/Fight4.gif";
	smileyarr["Beer"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S67gFwFpHbI/AAAAAAAABKw/7VarN8XBPfM/s800/beer.gif";
	smileyarr["Pepsi"]="http://lh6.ggpht.com/_UDJ56KWhcrQ/S67gFwn4GlI/AAAAAAAABK0/qLWce3HAlf4/s800/pepsi.gif";
	smileyarr["Potty"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gGObJNOI/AAAAAAAABK4/NU06xrhgiF0/s800/potty.gif";
	smileyarr["Potty2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S67gGf7lMwI/AAAAAAAABK8/WGUIa-MJIi4/s800/potty2.gif";
	smileyarr["smoke"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S_Af3vroTWI/AAAAAAAABO8/uxDFF88yE7U/s800/smoke.gif";
	smileyarr["Bath"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gGaf0_9I/AAAAAAAABLA/QnwWcZSre4g/s800/bath.gif";
	smileyarr["Singing"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S67gY7p377I/AAAAAAAABLE/OixX8PY-o5E/s800/singing.gif";
	smileyarr["Scooter"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gZGkVXTI/AAAAAAAABLI/tUocRVcWGkc/s800/scooter.gif";
	smileyarr["Dog"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gZCN1nGI/AAAAAAAABLM/-EQCIQwIhWU/s800/dog.gif";
	smileyarr["Donkey"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S67gZXprkAI/AAAAAAAABLQ/a5pzdEf1dCI/s800/donkey.gif";
	smileyarr["Ill"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S67gZTybYtI/AAAAAAAABLU/hPQ3kMJj8Bo/s800/Ill.gif";
	smileyarr["Ill2"]="http://lh3.ggpht.com/_UDJ56KWhcrQ/S67gmjsS7TI/AAAAAAAABLY/6F2sJ4SCA0I/s800/Ill2.gif";
	smileyarr["Bye"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S67gmt1wkmI/AAAAAAAABLc/NCIjxOzd3pE/s800/bye.gif";
	smileyarr["Good Night"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gm1xKk2I/AAAAAAAABLg/RV2Iz0TRIDE/s800/Good%20Night.gif";
	smileyarr["Sleeping"]="http://lh4.ggpht.com/_UDJ56KWhcrQ/S67gmxFKD0I/AAAAAAAABLk/gBhmu7MCE9k/s800/Sleeping%20%281%29.gif";
	smileyarr["Sleeping2"]="http://lh5.ggpht.com/_UDJ56KWhcrQ/S67gnFo2kRI/AAAAAAAABLo/FNZgfTRFB7I/s800/Sleeping%20%282%29.gif";	





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

