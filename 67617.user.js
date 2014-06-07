// ==UserScript==
// @name           okaerinasai_fullwindow
// @namespace      okaerinasai_fullwindow
// @description    トップをねらえ！をwindowいっぱいに拡大します
// @include        http://okaerinasai.jp/contents/gorannasite*
// ==/UserScript==
try{
var DIVs = document.getElementsByTagName("DIV");
var OBJECTs = document.getElementsByTagName("OBJECT");
var EMBEDs = document.getElementsByTagName("EMBED");

for(i=0; DIVs.length>i; i++){
	DIVs[i].style.width="100%";
	DIVs[i].style.height="100%";
	DIVs[i].style.margin="0";
	DIVs[i].style.border="none";
}

for(i=1; OBJECTs.length>i; i++){
	OBJECTs[i].style.display="none";
}
for(i=0; EMBEDs.length>i; i++){
	if(i==0){
		EMBEDs[i].style.display="none";
	}
	EMBEDs[i].style.width="100%";
	EMBEDs[i].style.height="100%";
	EMBEDs[i].width="100%";
	EMBEDs[i].height="100%";
}

}catch(err){
	alert(err);
}