// ==UserScript==
// @name          inci sözlük ok tuşları
// @description   inci sözlükte entryler arasında ok tuşları ile sayfa değiştirmeye yarar
// @include       http://inci.sozlukspot.com/*
// ==/UserScript==
document.addEventListener('keydown',kpressed_others,false);
function kpressed_others(e){
	if (e.keyCode == 39){
		location.href = "javascript:spot_fw_page();";
	}
	if (e.keyCode == 37){
		location.href = "javascript:spot_back_page();";
	}
	else return
}