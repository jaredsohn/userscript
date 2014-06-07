// Habracut Unfolder
// version 0.10
// 2008-10-31
// Copyright (c) 2008, indalive
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Habracut Unfolder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Habracut Unfolder
// @namespace      habracutunfolder
// @description    разворачивает хаброкаты без излишних изысков
// @include        http://habrahabr.ru/*
// ==/UserScript==

// Preferenses
textbutton  = "&#247;";  // текст кнопочки разворачивотеля
colorbutton = "#79B1D4";  // цвет кнопочки разворачивотеля
buttonBefore = "true";  // кнопка расположена перед катом, иначе - после ката
buttoncursor = "row-resize";  // курсор при наведении на кнопку
//
function getElementsByClassName(strClass, strTag, objContElm) {
// http://muffinresearch.co.uk/archives/2006/04/29/getelementsbyclassname-deluxe-edition/
  strTag = strTag || "*";
  objContElm = objContElm || document;
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
  var arrClass = strClass.split(delim);
  for (var i = 0, j = objColl.length; i < j; i++) {
    var arrObjClass = objColl[i].className.split(' ');
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if (( delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]);
          break comparisonLoop;
        }
      }
    }
  }
  return arr;
}
function gonah(obj,textdoc) {
	elemAdd = document.createElement('DIV');
	elemAdd.innerHTML = "<a name=\"habracut\"" + textdoc.split("<a name=\"habracut\"")[1].split("</div>")[0];
	obj.parentNode.parentNode.insertBefore(elemAdd,obj.parentNode);
	obj.parentNode.removeChild(obj.nextSibling);
	obj.parentNode.removeChild(obj);
}
function alertContents(obj,httpRequest) {
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            textdoc = httpRequest.responseText;
            return gonah(obj,textdoc);
        } else {
            alert('Произошла проблема  запросом к habrahabr.ru');
        }
    }
}

function expandThis(event) {
	clckObj = event.target ? event.target : event.target.parentNode;
	obj = clckObj;
	adres = clckObj.getAttribute("ahref");
	var httpRequest;
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
		}
	} 
	if (!httpRequest) {
		alert('Не могу создать\' XMLHTTP');
		return false;
	}
	httpRequest.onreadystatechange = function() { alertContents(obj,httpRequest); };
	httpRequest.open('GET', adres, true);
	httpRequest.send('');
}

habracutArray = getElementsByClassName("habracut","a",document.body);
for (iCut = 0; iCut < habracutArray.length; iCut++) {
	elemCut = habracutArray[iCut];
	elemNew = document.createElement("SPAN");
	elemNew.addEventListener("click", expandThis, true);
	elemNew.style.cursor=buttoncursor;
	elemNew.style.color=colorbutton;
	elemNew.style.position="relative";
	if (!buttonBefore) elemNew.style.left=elemCut.offsetWidth+20+"px";
	cutHref = elemCut.getAttribute("href");
	var reg = new RegExp("http:\\/\\/([\\w-]+)\\.habrahabr\\.ru\\/blog\\/(\\d+)\\/.*","gi");  // для вытаскивания данных из ссылкм
	var reg2 = new RegExp("http:\\/\\/([\\w-]+)\\.habrahabr\\.ru\\/blog\\/.*","gi");  // для вытаскивания данных из дресной строки
	arrResp = reg.exec(cutHref);
	isUserPage = reg2.exec(location.href.toString());
	if (isUserPage!=null) {
		elemNew.setAttribute("ahref","http://"+arrResp[1] +".habrahabr.ru/blog/"+arrResp[2]+"/");
	} else {
		if (null!=arrResp) {
			elemNew.setAttribute("ahref","http://habrahabr.ru/users/"+arrResp[1]+"/blog/"+arrResp[2]+"/");
		} else {
			elemNew.setAttribute("ahref",cutHref);
		}
	}
	elemNew.innerHTML=textbutton + "&nbsp;";
	elemCut.parentNode.insertBefore(elemNew,elemCut);
}
