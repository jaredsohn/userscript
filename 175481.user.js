// ==UserScript==
// @name          Pixiv target blank               
// @namespace     http://shioneko.sakura.ne.jp/   
// @description   a tag blank
// @include       http://www.pixiv.net/*
// @exclude       http://www.pixiv.net/member_illust.php?mode*                        
// ==/UserScript==



var ATar = document.getElementsByTagName("a"); // aタグ抜き出し
var Alen = ATar.length; // 画像の枚数


for (var i = 0 ; i<=Alen ; i++){

//alert(ATar);
a = ATar[i];
Ahref = a.href; 

	 if (Ahref.match(/member_illust*/)){
		//alert(Ahref);
		a.target = "_blank";
	} 
}

