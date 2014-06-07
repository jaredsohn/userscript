// ==UserScript==
// @author Chamie (chamie.habrahabr.ru)
// @name GOST free view
// @include http://protect.gost.ru/v.aspx*
// @description Открывает "защищённые" документы ГОСТа одной страницей, позволяя сохранить их.
// @version 1.0.2
// ==/UserScript==
function fixGreed(){
	td=document.getElementsByClassName("download")[0].getElementsByTagName("table")[1].getElementsByTagName("td")[1];
	td.innerHTML+="<button id='showall'>Показать все</button>";
	document.getElementById('showall').addEventListener("click",showAll,true);
	debugger
}
function showAll(){
	td=document.getElementsByClassName("download")[0].getElementsByTagName("table")[1].getElementsByTagName("td")[1];
	lnks=td.getElementsByTagName("a");
	wnd = window.open();
	wnd.focus();
	wnd.document.open();
	txt="<html><head><title>Все страницы</title></head><body>";
	for(i=0;i<lnks.length;i++)
		txt+="<img src='http://protect.gost.ru/image.ashx?page="+lnks[i].href.split("pageK=")[1]+"'><br>";
	txt+="</body></html>";
	wnd.document.write(txt);
	wnd.document.close();
}
fixGreed();