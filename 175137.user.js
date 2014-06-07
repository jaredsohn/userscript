// ==UserScript==
// @name          cosPlayer Image Downloader(move)               
// @namespace     http://shioneko.sakura.ne.jp/   
// @description   Download Linker   
// @include       http://www.cosp.jp/view_photo.aspx?id=*                        
// @exclude       http://www.cosp.jp/photo_search.aspx* 
// ==/UserScript==



var Eimg = document.getElementsByTagName("img"); // img抜き出し
var Iimg = Eimg.length; // 画像の枚数

/*数あるImageからコスプレイヤーさんの画像だけ取得*/

for (var i = 0 ; i<=Iimg ; i++){
	if (i == 0){
		var url = Eimg[i].src;
	}
}

var PresKey = "s"; // keyconfig

/* Key処理 */
document.addEventListener('keydown',function (e) {
var pressed = String.fromCharCode(e.which).toLowerCase();
	if (PresKey == pressed){
		location.href = url; 
	}
	
},false);

