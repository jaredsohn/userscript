// ==UserScript==
// @name          Facebook Tum Arkadaslarinizi Sec
// @description	  Kolayca fan sayfalari, gruplara, ve Facebookta bazi uygulamalara butun arkadaslari davet ediyoruz. Varsayilan olarak, tumunu ekler, ancak yalnizca arkadaslarinizi belirli sayida eklemek istediginiz bir dizi secebilirsiniz.
// @namespace     http://sehitlerolmezvatanbolunmez.org/
// @include       http://www.facebook.com/*

// Originally developed by Mayank Singhal
// Updated & Modified by Makis Arvo TURKCE modifiye Ozay DEMIR
// ==/UserScript==

(function() {
	inter = 0;
	function startit() {
		if (inter != 0)
			return;
		buts = document.getElementById('fb_multi_friend_selector_wrapper');
		if (buts) {
			Others = '<div style="border:1px solid #C1C1C1; padding:5px; margin-top: 10px;"><label>Baslat #:</label> <input class="inputtext" type="text" value="0" id="startpt" size="5"/>&nbsp;&nbsp;&nbsp;&nbsp;<label>Son #:</label> <input class="inputtext" type="text" value="'+document.getElementById('friends').childNodes.length+'" id="end"  size="5"/>&nbsp;&nbsp;'
			Link = '<span class="UIButton UIButton_Blue UIFormButton"><input class="UIButton_Text" type="button" onclick="start=document.getElementById(\'startpt\').value;howmany=document.getElementById(\'end\').value - start;j=0;cont=document.getElementById(\'friends\').childNodes; for ( i=start; i<cont.length; i++) {temp = cont[i].childNodes; temp1 = temp[0]; temp1.onclick();j++; if (j>=howmany) break;}; return false;" href="Javascript:void(0)" value="Arkadaslarini Sec"/></span></div>';
			parent = document.getElementById('fb_multi_friend_selector_wrapper');
			buts = document.createElement('div');
			buts.innerHTML = Others + Link;
			parent.appendChild(buts);
		
			inter = 1;
		}
		//alert(buts.length);
		setTimeout(startit, 2000);
	}
	setTimeout(startit, 100);
})();