// ==UserScript==
// @name			333Alert
// @author			kionec
// @namespace		kionec@msn.com
// @include		http://pertem.kkk.tsk.tr/yedeksubay/AdayNoArama.aspx
// ==/UserScript==

donem = 333;
yenileme_sikligi = 10; // saniye
muzik_linki="http://video.google.com/videoplay?docid=2006472622391404777&hl=en";
aday_no = 40905;

if(document.getElementsByTagName("title")[0].innerHTML.indexOf(""+donem)>=0){
	var elem = document.createElement("iframe");
	elem.setAttribute("src", muzik_linki);
	elem.setAttribute("height", "0px");
	elem.setAttribute("width", "0px");
	elem.setAttribute("id", "muzikFrame");
	document.getElementsByTagName("body")[0].appendChild(elem);
	var susturButonu = document.createElement("input");
	susturButonu.setAttribute("type", "button");
	susturButonu.setAttribute("style", "position: fixed; top: 0px; left; 0px;");
	susturButonu.setAttribute("value", "sustur şunu!!!");
	susturButonu.setAttribute("id", "sustur");
	susturButonu.setAttribute("onclick", "document.getElementsByTagName('body')[0].removeChild(document.getElementById('muzikFrame')); document.getElementsByTagName('body')[0].removeChild(document.getElementById('sustur'));");
	document.getElementsByTagName("body")[0].appendChild(susturButonu);
	var saatLabel = document.createElement("div");
	var d = new Date();
	saatLabel.innerHTML = "Açıklanma Tarihi: "+d.getDate()+"/"+d.getMonth()+"/"+(d.getYear()+1900) + " "+(d.getHours())+":"+(d.getMinutes()<0?"0"+d.getMinutes():d.getMinutes());
	document.getElementsByTagName("body")[0].appendChild(saatLabel);
	document.getElementById("txtAdayNo").value=aday_no+"";
	alert("Sınav sonucu hazır!!!!!!!!!!!");
}
else{
	setTimeout("window.location.reload()", yenileme_sikligi*1000);
}