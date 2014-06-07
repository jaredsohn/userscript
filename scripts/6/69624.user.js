// ==UserScript==
// @name             RGD2M
// @namespace        VSOPGW
// @description      Удобная продажа ргд2м
// @include          http://*ganjawars.ru/items.php*
// @version          1.0
// @author           VSOP_juDGe (модифицированно pestO)
// ==/UserScript==

(function ss() 
{
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	var doc = root.document;
	var $ = root.$;
	var $A = root.$A;
	
	var tlist = $("itemsbody").getElementsByTagName("table");
	
	// Вставим кнопку
	var alist = tlist[3].getElementsByTagName("a");
	var a = $A(alist).find(function(a) { return a.innerHTML == "Комплекты"; });
	var td = a.parentNode;
	
	//добавляю галочку для цикла (pest)
		var p=document.createElement('input')
		p.id = 'mfilter'
		if(getCookie('is_ch')=='true')
			p.checked=true;
		p.addEventListener("click", f, false)
		p.setAttribute('TYPE','checkbox')
	
	var bRgd = doc.createElement("b");
	bRgd.innerHTML = '<input type="button" name="bRgd" value="Продать РГД-2М" id="bRgd" onclick = "">'
	td.insertBefore(bRgd, a)
	//галку до кнопки
	td.insertBefore(p, a)

	// Поищем грены
	var aRgd = $A(tlist[7].getElementsByTagName("a")).find(function(a) { return a.href.indexOf('item.php?item_id=rgd2m') > 0; });
	
	if(aRgd == null)
	{
		bRgd.childNodes[0].setAttribute('disabled','disabled');
	}
	else // Нашли
	{
		var alist = aRgd.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("a");
		var a = $A(alist).find(function(a) { return a.innerHTML == "Продать"; });
		if(a == null)
			a = $A(aRgd.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.getElementsByTagName("a")).find(function(a) { return a.innerHTML == "Продать"; });
		
		var sellstring = a.getAttribute('onclick');
		sellstring = sellstring.replace(/item_[0-9][0-9]?_td/, 'bRgd');
		sellstring = sellstring.replace('return false;','var aa = $A($(\'js_window\').getElementsByTagName(\'a\')).find(function(a) { return a.innerHTML == \'<b>Да</b>\'; }); run_sell_submit() ;return false;')
		bRgd.childNodes[0].setAttribute('onclick',sellstring);
		//если стоит галочка продать к чертям собачим =)
		if(document.getElementById ( 'mfilter' ).checked==true)
			{
			document.getElementById("bRgd").click()
			}
	}
	
	bRgd.childNodes[0].focus();
})();

//ф-ция обарботки нажатия галки
function f()
{
var q = document.getElementById ( 'mfilter' );
setCookie('is_ch',q.checked,'','','','')
}

function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
//дял кукей
function getCookie(name) {
try
{
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
				}
			setStr = unescape(cookie.substring(offset, end));
			}
		}
	if(setStr == null) return 'false'
	return setStr;
}
catch(err) { return 'false' }
}