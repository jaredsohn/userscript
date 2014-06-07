// ==UserScript==
// @name             zamazka
// @namespace        http://ganjawars.ru
// @description      Замазывает недоступные для клика клетки на ауте.
// @include          http://*ganjawars.ru/*
// @version          1.0
// @author           Yago
// ==/UserScript==

function zamazka() {
  var imgList = document.getElementsByTagName("IMG");
  for(var i=0;i<imgList.length;i++)
	if(imgList[i].src=="http://images.ganjawars.ru/q-new/t_nw.gif") 
		imgList[i].src="http://i.ganjafoto.ru/1/65/79/1657988.jpg"; 
}

zamazka();
